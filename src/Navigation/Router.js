import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Diagram from '../Components/DiagramComponent';

// import * as NavItems from './NavItems';

const commonProps = {
	hideNavBar: true,
};

// key => component parent
const ScenesStructure = {
	diagram: { component: Diagram, ...commonProps },
};

const Scenes = [];

for (var key in ScenesStructure) {
	const SceneProps = ScenesStructure[key];

	Scenes.push(
		<Scene key={key} {...SceneProps} />
	);
}

export default RouterComponent = (props) => (
	<Router>
		{Scenes}
	</Router>
);
