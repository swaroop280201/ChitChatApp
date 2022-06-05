import React, { createContext } from 'react';
import { CallType, MessageRcvType } from './VideoState';

export interface VideoContextInterface {
	call: CallType | undefined;
	callAccepted: boolean;
	stream: MediaStream | undefined;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	callEnded: boolean;
	me: string;
	callUser: any;
	leaveCall: any;
	answerCall: any;
	sendMsg: any;
	msgRcv: MessageRcvType | undefined;
	chat: MessageRcvType[];
	setChat: React.Dispatch<React.SetStateAction<MessageRcvType[]>>;
	setMsgRcv: React.Dispatch<React.SetStateAction<MessageRcvType | undefined>>;
	setOtherUser: React.Dispatch<React.SetStateAction<string>>;
	leaveCall1: any;
	userName: string;
	myVdoStatus: boolean;
	setMyVdoStatus: React.Dispatch<React.SetStateAction<boolean>>;
	userVdoStatus: any;
	setUserVdoStatus: React.Dispatch<React.SetStateAction<any>>;
	updateVideo: any;
	myMicStatus: boolean;
	userMicStatus: any;
	updateMic: any;
	screenShare: boolean;
	handleScreenSharing: any;
	fullScreen: any;
	otherUserStream: MediaStream | undefined;
	otherUserName: string;
	setOtherUserName: React.Dispatch<React.SetStateAction<string>>;
	isCamAllowed: boolean;
	setIsCamAllowed: React.Dispatch<React.SetStateAction<boolean>>;
	isMicAllowed: boolean;
	setIsMicAllowed: React.Dispatch<React.SetStateAction<boolean>>;
	callOnStart: any;
}

const VideoContext = createContext<VideoContextInterface | undefined>(undefined);
export default VideoContext;
