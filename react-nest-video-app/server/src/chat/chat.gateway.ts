import { Logger } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EVENTS } from './constants';
import { AnswerCallData, CallUserData, UpdateMyMediaData, MessageUserData, EndCallData } from './types';
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('ChatGateway');

	@WebSocketServer() server: Server;

	afterInit(server: Server) {
		this.logger.log('Initialized .....');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
		client.emit(EVENTS.me, { socketId: client.id });
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage(EVENTS.callUser)
	handleCallUser(@MessageBody() data: CallUserData, @ConnectedSocket() socket: Socket) {
		const { from, name, signalData, userToCall } = data;
		this.server.to(userToCall).emit(EVENTS.callUser, { signalData, from, name });
	}

	@SubscribeMessage(EVENTS.updateMyMedia)
	handleUpdateMyMedia(@MessageBody() data: UpdateMyMediaData, @ConnectedSocket() socket: Socket) {
		const { currentMediaStatus, type } = data;
		socket.broadcast.emit(EVENTS.updateUserMedia, data);
	}

	@SubscribeMessage(EVENTS.messageUser)
	handleMessageUser(@MessageBody() data: MessageUserData, @ConnectedSocket() socket: Socket) {
		const { message, name, to, sender } = data;
		this.server.to(to).emit(EVENTS.messageReceived, { message, name, sender });
		console.log(data);
	}

	@SubscribeMessage(EVENTS.answerCall)
	handleAnswerCall(@MessageBody() data: AnswerCallData, @ConnectedSocket() socket: Socket) {
		socket.broadcast.emit(EVENTS.updateUserMedia, { type: data.userName, currentMediaStatus: data.myMediaStatus });
		console.log('Answering call on server and emitting callAccepted');
		this.server.to(data.to).emit(EVENTS.callAccepted, data);
	}

	@SubscribeMessage(EVENTS.endCall)
	handleEndCall(@MessageBody() data: EndCallData, @ConnectedSocket() socket: Socket) {
		this.server.to(data.id).emit(EVENTS.endCall);
	}
}
