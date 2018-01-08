import React, { Component } from 'react';
import { Header } from 'react-native-elements';

export default ({ title, iconName, onPress }) => {
	return (
		<Header
			backgroundColor='#D5D8DC'
			leftComponent={{ icon: iconName, color: 'black', onPress,}}
			centerComponent={{ text: title, style: { color: 'black', } }}
			outerContainerStyles={{ position: 'relative'}}
			innerContainerStyles={{ alignItems: 'center' }}
		/>
	)
}
