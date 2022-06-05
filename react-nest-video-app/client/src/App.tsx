import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from './pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Meet from './pages/meet';
import VideoContext from './context/VideoContext';

function App() {
	const vidState = useContext(VideoContext)!;
	useEffect(() => {
		navigator.permissions.query({ name: 'camera' as any }).then((result) => {
			vidState.setIsMicAllowed(result.state === 'granted');
			result.onchange = () => vidState.setIsMicAllowed(result.state === 'granted');
		});
		navigator.permissions.query({ name: 'microphone' as any }).then((result) => {
			vidState.setIsCamAllowed(result.state === 'granted');
			result.onchange = () => vidState.setIsCamAllowed(result.state === 'granted');
		});
		return () => {};
	}, []);
	useEffect(
		() => {
			vidState.callOnStart();
			console.log('Works');
		},
		[
			vidState.isCamAllowed,
			vidState.isMicAllowed
		]
	);
	return (
		<React.Fragment>
			<Router>
				{/* <VideoState> */}
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/meet" component={Meet} exact />
				</Switch>
				{/* </VideoState> */}
			</Router>
		</React.Fragment>
	);
}

export default App;
