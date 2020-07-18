import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import Icon from '../Global/Icon';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class HomeTodoHiddenElements extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	/**
	 *
	 * @param {*} todoID
	 */
	_deleteTodo(todoID) {
		if (!this.animationIsRunning) {
			Animated.timing(this.props.todoData.animation, {
				toValue: 0,
				duration: 200,
				useNativeDriver: false,
			}).start(() => {
				this.props.deleteTodo(todoID);
				this.animationIsRunning = false;
			});
		}
	}

	/**
	 * Navigate to ProductForm view
	 * @param {*} todoID
	 */
	editTodo(todoID) {
		this.props.closeRow(this.props.rowMap, this.props.todoData.key);
		this.props.navigation.navigate('TodoForm', { todoID: todoID });
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		const { todoData } = this.props;

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={[styles.backRightBtn, styles.backRightBtnLeft]}
					onPress={() => this.editTodo(todoData.id)}
					activeOpacity={0.5}>
					<Icon
						name="pen-solid"
						size={globalVariables.globalIconFontSize}
						color={globalColors.editTextColor}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.backRightBtn, styles.backRightBtnRight]}
					onPress={() => this._deleteTodo(todoData.id)}
					activeOpacity={0.5}>
					<Icon
						name="trash-alt"
						size={globalVariables.globalIconFontSize}
						color={globalColors.deleteTextColor}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: globalColors.bodyLightBackgroundColor,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	backRightBtnLeft: {
		backgroundColor: globalColors.editBackgroundColor,
		right: 75,
	},
	backRightBtnRight: {
		backgroundColor: globalColors.deleteBackgroundColor,
		right: 0,
	},
});

export default connect(null, mapDispatchToProps)(HomeTodoHiddenElements);
