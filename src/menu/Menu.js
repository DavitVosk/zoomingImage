import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { changeActiveBlob } from '../actions';

const BLOB_NUMBERS = ['23', '5002', '28', '15', '39'];

class Menu extends Component {
	renderList () {
		return BLOB_NUMBERS.map((blobNumber, index) => {
			return (
				<TouchableOpacity
					key={index}
					onPress={() => this.props.changeActiveBlob({ activeBlob: blobNumber })}
					style={{ backgroundColor: this.props.activeBlob === blobNumber ? '#808B96' : null, }}
				>
					<View style={styles.rowContainer}>
						<Text style={styles.item}>Activate Blob No.{blobNumber}</Text>
					</View>
				</TouchableOpacity>
			)
		})
	}

	render () {
		return (
			<ScrollView style={styles.menu} contentContainerStyle={styles.contentContainer}>
				{this.renderList()}
			</ScrollView>
		)
	}
}

const styles = {
	menu: {
		flex: 1,
		backgroundColor: '#ABB2B9',
		paddingTop: 20,
	},
	item: {
		color: 'green',
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'notoserif',
	},
	rowContainer: {
		paddingLeft: 20,
		marginVertical: 7,
	},
};

const mapStateToProps = ({ activeBlob }) => {
	return { activeBlob }
}

export default connect(mapStateToProps, { changeActiveBlob })(Menu);

