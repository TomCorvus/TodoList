import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, Animated, TextInput } from 'react-native';
import Icon from '../Global/Icon';
import HomeTodoImage from './HomeTodoImage';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';
import globalStyles from '../../constants/Styles';

class HomeTodo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.todoData.title,
			errorMessage: null,
			checked: this.props.todoData.completed,
		};
	}

	/**
	 * Set the title in state when the editing status is true
	 * @param {*} text
	 */
	handlerChange = (text) => {
		this.setState({
			title: text.trim(),
		});
	};

	/**
	 * Navigate to Todo view
	 * @param {*} todoID
	 */
	_onPress(todoID) {
		const { navigation, rowMap, todoData, closeRow } = this.props;
		closeRow(rowMap, todoData.key);
		navigation.navigate('Todo', { todoID: todoID });
	}

	/**
	 * Check/uncheck todo
	 */
	_onCheck(todoID) {
		this.setState(
			{
				checked: !this.state.checked,
			},
			() => {
				this.props.checkTodo(todoID, this.state.checked);
			}
		);
	}

	/**
	 * Update todo's title
	 * @param {*} todoID
	 */
	_onEdit(todoID) {
		let validTitle = this.checkTodoTitle(this.state.title);

		// Check if the title is not empty
		if (validTitle) {
			this.props.editTodo(todoID, this.state.title);
		}
	}

	/**
	 * Check if todo title is valid
	 * @param {*} title
	 */
	checkTodoTitle(title) {
		let validTitle = false,
			noSpacesTitle = title.toString().replace(/\s/g, '');

		if (noSpacesTitle !== '') {
			this.setState({
				errorMessage: null,
			});
			validTitle = true;
		} else {
			this.setState({
				errorMessage: 'Le titre ne peut pas être vide.',
			});
		}
		return validTitle;
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		let { todoData } = this.props,
			inputStyle = [styles.input],
			{ errorMessage, isFocused } = this.state;

		if (isFocused) inputStyle.push(styles.focusedInput);
		if (errorMessage) inputStyle.push(styles.errorInput);

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
				<View style={todoData.lastIndex ? [styles.wrapper, styles.lastIndexWrapper] : styles.wrapper}>
					<View style={styles.container}>
						<TouchableHighlight
							style={styles.checkboxAction}
							onPress={() => this._onCheck(todoData.id)}
							activeOpacity={0.2}
							underlayColor="transparent">
							<View
								style={this.state.checked ? [styles.checkbox, styles.activeCheckbox] : styles.checkbox}>
								{this.state.checked && (
									<Icon
										style={styles.checkboxIcon}
										name="check-solid"
										size={globalVariables.globalIconFontSize}
										color={globalColors.validTextColor}
									/>
								)}
							</View>
						</TouchableHighlight>
						<TouchableOpacity
							disabled={todoData.isEditing}
							activeOpacity={0.5}
							onPress={() => this._onPress(todoData.id)}
							style={styles.titleBtn}>
							<View style={styles.titleWrapper}>
								{todoData.isEditing ? (
									<TextInput
										placeholder={errorMessage ? errorMessage : ''}
										placeholderTextColor={
											errorMessage ? globalColors.errorTextColor + 'a8' : 'transparent'
										}
										defaultValue={todoData.title}
										style={inputStyle}
										autoFocus={true}
										returnKeyType="send"
										onSubmitEditing={() => this._onEdit(todoData.id, this.state.title)}
										onChangeText={(text) => this.handlerChange(text)}
									/>
								) : (
									<Text
										numberOfLines={1}
										style={this.state.checked ? [styles.title, styles.checkedTitle] : styles.title}>
										{todoData.title}
									</Text>
								)}
								<HomeTodoImage todoID={todoData.id} todoImage={todoData.image} />
								<Icon
									name="angle-right-solid"
									size={globalVariables.globalIconFontSize}
									color={globalColors.iconDefaultColor}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		...globalStyles.baseRow,
	},
	lastIndexWrapper: {
		borderBottomWidth: 0,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'stretch',
		alignItems: 'center',
	},
	titleWrapper: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 5,
		paddingLeft: 5,
	},
	titleBtn: {
		flex: 1,
	},
	title: {
		fontSize: globalVariables.globalFontSize,
		color: globalColors.textDefaultColor,
		fontWeight: '400',
		flex: 1,
		paddingLeft: 5,
		paddingRight: 5,
		marginRight: 5,
		borderColor: 'transparent',
		borderWidth: 1,
	},
	checkedTitle: {
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
		color: globalColors.disabledTextColor,
	},
	checkboxAction: {
		paddingRight: 5,
		alignContent: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkbox: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#b3b3b3',
	},
	activeCheckbox: {
		backgroundColor: globalColors.validBackgroundColor,
		borderColor: globalColors.validTextColor,
	},
	checkboxIcon: {
		position: 'absolute',
		height: 20,
		width: 20,
		lineHeight: 20,
		top: 4,
		left: 5,
	},
	input: {
		...globalStyles.field,
		height: 40,
		paddingLeft: 5,
		paddingRight: 5,
		marginBottom: 0,
		marginRight: 5,
	},
	focusedInput: {
		...globalStyles.focusedField,
	},
	errorInput: {
		borderColor: globalColors.errorTextColor,
	},
	errorMessage: {
		fontSize: globalVariables.fieldMessage,
		color: globalColors.errorTextColor,
	},
});

export default HomeTodo;
