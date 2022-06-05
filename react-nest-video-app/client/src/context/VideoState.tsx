import { CallAcceptedData } from '../utils/socketUtils';
import { CallUserData } from '../../../server/dist/chat/types';
import { UpdateUserMediaData, MessageReceivedData } from '../../../server/src/chat/types';
import React, { useState, useEffect, useRef } from 'react';
import VideoContext from './VideoContext';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { message } from 'antd';
import { EVENTS, MeData } from '../utils/socketUtils';

const SERVER_URL = 'http://localhost:5000/';

export interface MessageRcvType {
	value: string;
	sender: string;
}

export interface CallType {
	isReceivingCall: true;
	from: string;
	name: string;
	signal: any;
}

export const socket = io(SERVER_URL);

const VideoState = ({ children }: any) => {
	const [
		callAccepted,
		setCallAccepted
	] = useState(false);
	const [
		callEnded,
		setCallEnded
	] = useState(false);
	const [
		stream,
		setStream
	] = useState<MediaStream | undefined>();
	const [
		otherUserStream,
		setOtherUserStream
	] = useState<MediaStream | undefined>();
	const [
		chat,
		setChat
	] = useState<MessageRcvType[]>([]);
	const [
		name,
		setName
	] = useState('');
	const [
		call,
		setCall
	] = useState<CallType | undefined>();
	const [
		me,
		setMe
	] = useState('');
	const [
		userName,
		setUserName
	] = useState('');
	const [
		otherUser,
		setOtherUser
	] = useState('');
	const [
		myVdoStatus,
		setMyVdoStatus
	] = useState(true);
	const [
		userVdoStatus,
		setUserVdoStatus
	] = useState();
	const [
		myMicStatus,
		setMyMicStatus
	] = useState(true);
	const [
		userMicStatus,
		setUserMicStatus
	] = useState();
	const [
		msgRcv,
		setMsgRcv
	] = useState<MessageRcvType | undefined>();
	const [
		screenShare,
		setScreenShare
	] = useState(false);
	const [
		otherUserName,
		setOtherUserName
	] = useState('');
	const [
		isCamAllowed,
		setIsCamAllowed
	] = useState(false);
	const [
		isMicAllowed,
		setIsMicAllowed
	] = useState(false);

	const connectionRef: any = useRef();
	const screenTrackRef: any = useRef();

	const callOnStart = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
			setStream(currentStream);
		});
		// if (localStorage.getItem("name")) {
		//   setName(localStorage.getItem("name"));
		// }
		socket.on(EVENTS.me, ({ socketId }: MeData) => setMe(socketId));
		socket.on(EVENTS.endCall, () => {
			message.error('Call Ended !!!', 2000);
			window.location.reload();
			window.location.replace('http://localhost:3000/');
		});

		socket.on(EVENTS.updateUserMedia, ({ type, currentMediaStatus }: UpdateUserMediaData) => {
			if (currentMediaStatus !== null || currentMediaStatus !== []) {
				switch (type) {
					case 'video':
						setUserVdoStatus(currentMediaStatus);
						break;
					case 'mic':
						setUserMicStatus(currentMediaStatus);
						break;
					default:
						setUserMicStatus(currentMediaStatus[0]);
						setUserVdoStatus(currentMediaStatus[1]);
						break;
				}
			}
		});

		socket.on(EVENTS.callUser, ({ from, name: callerName, signalData, userToCall }: CallUserData) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal: signalData });
		});

		socket.on(EVENTS.messageReceived, ({ name, message: value, sender }: MessageReceivedData) => {
			setMsgRcv({ value, sender });
			setTimeout(() => {
				setMsgRcv(undefined);
			}, 2000);
		});
	};

	useEffect(() => {
		callOnStart();
	}, []);

	const answerCall = () => {
		setCallAccepted(true);
		setOtherUser(call!.from);
		setOtherUserName(call!.name);
		const peer = new Peer({ initiator: false, trickle: false, stream });
		peer.on('signal', (data) => {
			socket.emit(EVENTS.answerCall, {
				signal: data,
				to: call!.from,
				userName: name,
				type: 'both',
				myMediaStatus:
					[
						myMicStatus,
						myVdoStatus
					]
			});
		});

		peer.on('stream', (currentStream) => {
			setOtherUserStream(currentStream);
		});
		peer.signal(call!.signal);
		connectionRef.current = peer;
	};

	const callUser = (id: string) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });
		setOtherUser(id);
		peer.on('signal', (data) => {
			socket.emit(EVENTS.callUser, {
				userToCall: id,
				signalData: data,
				from: me,
				name
			});
		});
		peer.on('stream', (currentStream) => {
			setOtherUserStream(currentStream);
		});
		socket.on(EVENTS.callAccepted, ({ signal, userName }: CallAcceptedData) => {
			setCallAccepted(true);
			setUserName(userName);
			peer.signal(signal);
			socket.emit(EVENTS.updateMyMedia, {
				type: 'both',
				currentMediaStatus:
					[
						myMicStatus,
						myVdoStatus
					]
			});
		});

		connectionRef.current = peer;
	};

	const updateVideo = () => {
		setMyVdoStatus((currentStatus) => {
			socket.emit(EVENTS.updateMyMedia, {
				type: 'video',
				currentMediaStatus: !currentStatus
			});
			stream!.getVideoTracks()[0].enabled = !currentStatus;
			setStream(stream);
			return !currentStatus;
		});
	};

	const updateMic = () => {
		setMyMicStatus((currentStatus) => {
			socket.emit(EVENTS.updateMyMedia, {
				type: 'mic',
				currentMediaStatus: !currentStatus
			});
			stream!.getAudioTracks()[0].enabled = !currentStatus;
			return !currentStatus;
		});
	};

	//SCREEN SHARING
	const handleScreenSharing = () => {
		if (!myVdoStatus) {
			message.error('Turn on your video to share the content', 2);
			return;
		}

		if (!screenShare) {
			navigator.mediaDevices
				.getDisplayMedia({})
				.then((currentStream) => {
					const screenTrack = currentStream.getTracks()[0];

					// replaceTrack (oldTrack, newTrack, oldStream);
					connectionRef.current.replaceTrack(
						connectionRef.current.streams[0].getTracks().find((track: any) => track.kind === 'video'),
						screenTrack,
						stream
					);

					// Listen click end
					screenTrack.onended = () => {
						connectionRef.current.replaceTrack(
							screenTrack,
							connectionRef.current.streams[0].getTracks().find((track: any) => track.kind === 'video'),
							stream
						);

						// myVideo.current.srcObject = stream;
						setStream(stream);
						setScreenShare(false);
					};
					// myVideo.current.srcObject = currentStream;
					setStream(currentStream);
					screenTrackRef.current = screenTrack;
					setScreenShare(true);
				})
				.catch((error) => {
					console.log('No stream for sharing');
				});
		}
		else {
			screenTrackRef.current.onended();
		}
	};

	//full screen
	const fullScreen = (e: any) => {
		const elem = e.target;

		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		}
		else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		}
		else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		}
		else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	};

	const leaveCall = () => {
		setCallEnded(true);
		if (connectionRef && connectionRef.current) {
			connectionRef.current.destroy();
		}
		socket.emit(EVENTS.endCall, { id: otherUser });
		window.location.reload();
		window.location.replace('http://localhost:3000/');
	};

	const leaveCall1 = () => {
		socket.emit(EVENTS.endCall, { id: otherUser });
	};
	const sendMsg = (value: any) => {
		socket.emit(EVENTS.messageUser, { name, to: otherUser, message: value, sender: name });
		let msg: any = {};
		msg.message = value;
		msg.type = 'sent';
		msg.timestamp = Date.now();
		msg.sender = name;
		setChat([
			...chat,
			msg
		]);
	};

	return (
		<VideoContext.Provider
			value={{
				call,
				callAccepted,
				stream,
				name,
				setName,
				callEnded,
				me,
				callUser,
				leaveCall,
				answerCall,
				sendMsg,
				msgRcv,
				chat,
				setChat,
				setMsgRcv,
				setOtherUser,
				leaveCall1,
				userName,
				myVdoStatus,
				setMyVdoStatus,
				userVdoStatus,
				setUserVdoStatus,
				updateVideo,
				myMicStatus,
				userMicStatus,
				updateMic,
				screenShare,
				handleScreenSharing,
				fullScreen,
				otherUserStream,
				otherUserName,
				setOtherUserName,
				isMicAllowed,
				setIsMicAllowed,
				isCamAllowed,
				setIsCamAllowed,
				callOnStart
			}}
		>
			{children}
		</VideoContext.Provider>
	);
};

export default VideoState;
