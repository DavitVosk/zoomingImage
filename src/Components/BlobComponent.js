import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { changeActiveBlob } from '../actions';
import {
	ORIGINAL_DIAGRAM_WIDTH,
	ORIGINAL_DIAGRAM_HEIGHT,
} from '../util/consts';

class Blob extends Component {
	constructor (props) {
		super(props);
		this.state = { showGif: true }
	}

	componentDidMount () {
		if ( this.props.blob.number === this.props.activeBlob ) {
			setTimeout(() => {
				this.setState({ showGif: false })
			}, 3000)
		}
	}

	componentWillReceiveProps (nextProps) {
		if ( this.props.blob.number === nextProps.activeBlob ) {
			this.setState({ showGif: true }, () => {
				setTimeout(() => {
					this.setState({ showGif: false })
				}, 3000)
			})
		}
	}

	onTouch (blobId) {
		this.props.changeActiveBlob({ activeBlob: blobId })
		if ( blobId === this.props.activeBlob ) {
			this.props.forceUpdateDiagaram();
		}
	}

	render () {
		const { blob, activeBlob, orientation } = this.props;
		const SCREEN_WIDTH = Dimensions.get('window').width;
		// const SCREEN_HEIGHT = Dimensions.get('window').height;
		const { diagramAvailableWidth, diagramAvailableHeight } = this.props;

		return (
			blob.number === activeBlob && this.state.showGif ? (
					<Image source={require('../util/images/Ripple-Dispart.gif')}
								 style={{
									 height: 40,
									 width: 40,
									 position: 'absolute',
									 left: ((blob.coords.x) / ORIGINAL_DIAGRAM_WIDTH) * diagramAvailableWidth - 18,
									 top: (blob.coords.y / ORIGINAL_DIAGRAM_HEIGHT) * diagramAvailableHeight - 18,
								 }}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => this.onTouch(blob.number)}
							style={{
								height: orientation === 'PORTRAIT' ?
									(blob.height / ORIGINAL_DIAGRAM_HEIGHT) * diagramAvailableHeight
									: (blob.height / ORIGINAL_DIAGRAM_HEIGHT) * diagramAvailableHeight + 5,
								width: (blob.width / ORIGINAL_DIAGRAM_WIDTH) * diagramAvailableWidth + 5,
								backgroundColor: this.props.activeBlob === blob.number ? '#3498DB' : '#D0D3D4',
								opacity: .5,
								borderRadius: 50,
								left: 18,
								top: 18,
								position: 'absolute',
								justifyContent: 'center'
							}}/>
					</Image>
				)
				:
				(<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => this.onTouch(blob.number)}
						style={{
							height: orientation === 'PORTRAIT' ?
								(blob.height / ORIGINAL_DIAGRAM_HEIGHT) * diagramAvailableHeight
								: (blob.height / ORIGINAL_DIAGRAM_HEIGHT) * diagramAvailableHeight + 5,
							width: (blob.width / ORIGINAL_DIAGRAM_WIDTH) * diagramAvailableWidth + 5,
							backgroundColor: this.props.activeBlob === blob.number ? '#3498DB' : '#D0D3D4',
							opacity: .5,
							borderRadius: 50,
							left: ((blob.coords.x) / ORIGINAL_DIAGRAM_WIDTH) * diagramAvailableWidth,
							top: (blob.coords.y / ORIGINAL_DIAGRAM_HEIGHT) * diagramAvailableHeight,
							position: 'absolute',
							justifyContent: 'center'
						}}/>
				)
		)
	}
}

const mapStateToProps = ({ menuOpen, orientation }) => {
	return { menuOpen, orientation }
}

export default connect(mapStateToProps, { changeActiveBlob })(Blob);