import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';

import { toggleMenuVisibility } from '../actions';
import Menu from './Menu';

const menu = <Menu/>;

class MenuWrapped extends Component {
	render () {

		const { menuOpen, toggleMenuVisibility, children, orientation } = this.props
		const SCREEN_WIDTH = Dimensions.get('window').width;
		var SIDE_BAR_WIDTH = SCREEN_WIDTH / 2;

		return (
			<SideMenu
				openMenuOffset={SIDE_BAR_WIDTH}
				disableGestures={false}
				menu={menu}
				isOpen={menuOpen}
				onChange={(isOpen) => {
					toggleMenuVisibility({ event: 'onChange', isOpen });
				}}
			>
				{children}
			</SideMenu>
		)
	}
}

const mapStateToProps = ({ menuOpen, orientation }) => {
	return { menuOpen, orientation }
};

export default connect(mapStateToProps, { toggleMenuVisibility })(MenuWrapped);