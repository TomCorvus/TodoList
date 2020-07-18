import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import InsetShadow from 'react-native-inset-shadow';
import Icon from '../Global/Icon';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class HomeTodoHiddenElements extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	/**
	 * Confirm to delete list
	 * @param {*} todoID
	 */
	_confirmDeleteTodo(todoID) {
		Alert.alert(
			'Supprimer cette tâche ?',
			'Cette action est définitive.',
			[
				{
					text: 'Supprimer',
					onPress: () => this._deleteTodo(todoID),
					style: 'destructive',
				},
				{
					text: 'Annuler',
					style: 'cancel',
				},
			],
			{ cancelable: false }
		);
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
		// this.props.navigation.navigate('TodoForm', { todoID: todoID });

this.props.setEditForm(todoID);

	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		const { todoData } = this.props;

		return (
			<Animated.View
				style={[
					{
						position: 'relative',
						overflow: 'hidden',
						height: todoData.animation.interpolate({
							inputRange: [0, 1],
							outputRange: [0, globalVariables.rowHeight],
						}),
					},
				]}>
				<InsetShadow shadowOpacity={0.2} shadowRadius={3}>
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
							onPress={() => {
								Platform.OS === 'web'
									? this._deleteTodo(todoData.id)
									: this._confirmDeleteTodo(todoData.id);
							}}
							activeOpacity={0.5}>
							<Icon
								name="trash-alt"
								size={globalVariables.globalIconFontSize}
								color={globalColors.deleteTextColor}
							/>
						</TouchableOpacity>
					</View>
				</InsetShadow>
			</Animated.View>
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
