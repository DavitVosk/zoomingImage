import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { connect } from 'react-redux';

import { toggleMenuVisibility, keepOrientation } from '../actions';
import NavBar from './reused/NavBar';
import Blob from './BlobComponent';
import DiagramData from '../util/page-1.json';
import Orientation from 'react-native-orientation';

const BLOBS = DiagramData.diagram.blobs;

class DiagramComponent extends Component {
	constructor (props) {
		super(props);
		this.state = {
			diagramAvailableWidth: 0,
			diagramAvailableHeight: 0,
			updateComponent: true
		}
	}

	componentWillMount () {
		const initial = Orientation.getInitialOrientation();
		this.props.keepOrientation({ orientation: initial })
	}

	componentDidMount () {
		// add listener
		Orientation.addOrientationListener(this._orientationDidChange);
	}

	_orientationDidChange = (orientation) => {
		this.props.keepOrientation({ orientation })
	}

	componentWillUnmount () {
		// remove listener
		Orientation.removeOrientationListener(this._orientationDidChange);
	}

	renderBlobs () {
		const { activeBlob } = this.props;
		const { diagramAvailableWidth, diagramAvailableHeight } = this.state;
		return BLOBS.map((blob, index) => {
			return (
				<Blob
					key={index}
					diagramAvailableWidth={diagramAvailableWidth}
					diagramAvailableHeight={diagramAvailableHeight}
					blob={blob}
					activeBlob={activeBlob}
					forceUpdateDiagaram={() => this.forceUpdate()}/>
			)
		})
	}

	onLayout = (event) => {
		var { width, height, } = event.nativeEvent.layout;
		this.setState({ updateComponent: ! this.state.updateComponent }, () => {
			if ( this.state.updateComponent ) {
				this.setState({ diagramAvailableWidth: width, diagramAvailableHeight: height }, () => {
					this.setState({ updateComponent: false })
				})
			}
		})
	}

	render () {
		const SCREEN_WIDTH = Dimensions.get('window').width;
		// const SCREEN_HEIGHT = Dimensions.get('window').height;
		const SIDE_BAR_WIDTH = SCREEN_WIDTH / 2;
		const { diagramAvailableWidth, diagramAvailableHeight } = this.state;

		const content = (
			<ImageZoom cropWidth={this.props.menuOpen ? diagramAvailableWidth - SIDE_BAR_WIDTH : diagramAvailableWidth}
								 cropHeight={diagramAvailableHeight}
								 imageWidth={diagramAvailableWidth}
								 imageHeight={diagramAvailableHeight}
			>
				<Image
					style={{
						height: diagramAvailableHeight,
						width: diagramAvailableWidth,
						resizeMode: 'stretch'
					}}
					source={require('../util/images/page-1.png')}
				/>
				{this.renderBlobs()}
			</ImageZoom>
		);

		return (
			<View stickyHeaderIndices={[0]} style={{ flex: 1, }}>
				<NavBar title='Diagram' iconName='menu' onPress={() => this.props.toggleMenuVisibility({ event: 'tap' })}/>

				<View style={{ flex: 1 }} onLayout={this.onLayout}>
					{content}
				</View>
			</View>
		)
	}
}

const mapStateToProps = ({ menuOpen, activeBlob, orientation }) => {
	return { menuOpen, activeBlob, orientation }
}

export default connect(mapStateToProps, { toggleMenuVisibility, keepOrientation })(DiagramComponent);