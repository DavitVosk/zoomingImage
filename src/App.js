import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';

import store from './util/store';
import LeftMenu from './menu/MenuWrapped';
import RouterComponent from './Navigation/Router';

class App extends Component {
	constructor (props) {
		super(props)
		this.state = { rehydrated: false }
	}

	componentWillMount () {
		persistStore(store, { storage: AsyncStorage, blacklist: ['menuOpen'] }, () => {
			this.setState({ rehydrated: true });
		});
	}

	render () {
		if ( ! this.state.rehydrated )
			return <View/>;
		return (
			<Provider store={store}>
				<LeftMenu>
					<RouterComponent/>
				</LeftMenu>
			</Provider>
		)
	}
}

export default App;