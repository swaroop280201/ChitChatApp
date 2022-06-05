import React from 'react';
import Lottie, { Options } from 'react-lottie';

import animationData from '../data/videoChat.json';

const defaultOptions: Options = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings:
		{
			preserveAspectRatio: 'xMidYMid slice'
		}
};

interface LoaderProps {
	height?: number;
	width?: number;
}

const VideoChatIllustration: React.FC<LoaderProps> = ({ height = 300, width = 300 }) => {
	return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default VideoChatIllustration;
