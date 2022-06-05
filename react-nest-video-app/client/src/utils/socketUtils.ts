export const EVENTS = {
	me: 'me',
	callUser: 'callEnded',
	updateMyMedia: 'updateMyMedia',
	updateUserMedia: 'updateUserMedia',
	messageUser: 'messageUser',
	messageReceived: 'messageReceived',
	answerCall: 'answerCall',
	callAccepted: 'callAccepted',
	endCall: 'endCall'
};

export interface MeData {
	socketId: string;
}

export interface CallUserData {
	userToCall: string;
	signalData: any;
	from: string;
	name: string;
}

export interface UpdateMyMediaData {
	type: string;
	currentMediaStatus: any;
}

export interface UpdateUserMediaData {
	type: string;
	currentMediaStatus: any;
}
export interface MessageUserData {
	name: string;
	to: string;
	message: string;
	sender: string;
}

export interface MessageReceivedData {
	name: string;
	message: string;
	sender: string;
}

export interface AnswerCallData {
	signal: any;
	to: string;
	userName: string;
	type: string;
	myMediaStatus: any;
}

export interface CallAcceptedData {
	signal: any;
	to: string;
	userName: string;
	type: string;
	myMediaStatus: any;
}

export interface EndCallData {
	id: string;
}
