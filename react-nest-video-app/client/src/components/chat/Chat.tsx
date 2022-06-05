import { MessageOutlined, SendOutlined } from '@ant-design/icons';
import { Col, Input, notification } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MessageReceivedData } from '../../../../server/dist/chat/types';
import VideoContext from '../../context/VideoContext';
import { socket } from '../../context/VideoState';
import { EVENTS } from '../../utils/socketUtils';
import Msg_Illu from '../../assets/msg_illu.svg';
import './chat.css';

const Chat = () => {
	const [
		message,
		setMessage
	] = useState<string>('');

	const vidState = useContext(VideoContext)!;

	const sendMessage = () => {
		if (message === '' || message.trim() === '') return;

		vidState.sendMsg(message);

		setMessage('');
	};

	socket.on(EVENTS.messageReceived, ({ name, message: value, sender }: MessageReceivedData) => {
		let msg: any = {};
		msg.message = value;
		msg.type = 'rcv';
		msg.sender = sender;
		msg.timestamp = Date.now();
		vidState.setChat([
			...vidState.chat,
			msg
		]);
	});

	const dummy = useRef<any>();

	useEffect(
		() => {
			if (dummy && dummy.current) dummy.current.scrollIntoView({ behavior: 'smooth' });
		},
		[
			vidState.chat
		]
	);

	useEffect(
		() => {
			if (vidState.msgRcv && vidState.msgRcv.value) {
				notification.open({
					message: '',
					description: `${vidState.msgRcv.sender}: ${vidState.msgRcv.value}`,
					icon: <MessageOutlined style={{ color: '#108ee9' }} />
				});
			}
		},
		[
			vidState.msgRcv
		]
	);

	return (
		<Col
			style={{
				backgroundColor: '#d9d9d9',
				borderRadius: 15,
				height: '95%',
				position: 'relative',
				padding: 0,
				marginTop:

						vidState.chat.length ? 25 :
						0
			}}
			span={6}
		>
			<div
				style={{
					height: 'calc(100% - 90px)',
					// backgroundColor: 'red',
					overflowY: 'scroll',
					overflowX: 'hidden',
					padding: 10
				}}
				className="chat_container"
			>
				{
					vidState.chat.length ? <div className="msg_flex">
						{vidState.chat.map((msg: any) => (
							<div
								key={msg.timestamp}
								className={

										msg.type === 'sent' ? 'msg_sent' :
										'msg_rcv'
								}
							>
								{msg.message}
							</div>
						))}
						<div ref={dummy} id="no_border" />
					</div> :
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%'
						}}
					>
						<img src={Msg_Illu} alt="msg_illus" style={{ width: '80%' }} />
					</div>}
			</div>
			<div
				style={{
					height: 60,
					width: '90%',
					borderRadius: 5,
					backgroundColor: 'white',
					position: 'absolute',
					bottom: 0,
					margin: 10,
					marginBottom: 15,
					marginTop: 15,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Input
					value={message}
					placeholder="Write your message"
					onChange={(e) => setMessage(e.target.value)}
					style={{ width: '70%', height: 35, marginRight: 12, borderRadius: 10 }}
				/>
				<div
					style={{
						backgroundColor: 'blue',
						width: 35,
						height: 35,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 10,
						cursor: 'pointer'
					}}
					onClick={sendMessage}
				>
					<SendOutlined style={{ fontSize: 15, color: 'white' }} />
				</div>
			</div>
		</Col>
	);
};

export default Chat;
