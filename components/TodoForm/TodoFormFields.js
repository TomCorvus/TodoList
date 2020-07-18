import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { addTodo, editTodo } from '../../actions/TodoActions';
import { getTodoInfo } from '../../functions/Todo';
import TodoFormTitle from './TodoFormTitle';
import TodoFormSubmit from './TodoFormSubmit';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class TodoFormFields extends React.Component {
	constructor(props) {
		super(props);

		let { todoID, todoList } = this.props,
			{ title } = getTodoInfo(todoID, todoList);

		this.state = {
			title: todoID !== undefined ? title : '',
			titleErrorMessage: null,
			isSubmitting: false,
		};
		this.setTodoTitle = this.setTodoTitle.bind(this);
		this.scrollToFormGroup = this.scrollToFormGroup.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	/**
	 * Set list title in form state
	 * @param {*} title
	 */
	setTodoTitle(title) {
		this.setState(
			{
				title: title,
			},
			() => {
				this.checkTodoTitle(this.state.title);
			}
		);
	}

	/**
	 * Check if list title is valid
	 * @param {*} title
	 */
	checkTodoTitle(title) {
		let validTitle = false,
			noSpacesTitle = title.toString().replace(/\s/g, '');

		if (noSpacesTitle !== '') {
			this.setState({
				titleErrorMessage: null,
			});
			validTitle = true;
		} else {
			this.setState({
				titleErrorMessage: 'Le titre ne peut pas être vide.',
			});
		}
		return validTitle;
	}

	/**
	 * Scroll to the focused form group
	 * @param {*} formGroupX
	 * @param {*} formGroupY
	 */
	scrollToFormGroup(formGroupX, formGroupY) {
		setTimeout(() => {
			this.refs._fieldsScrollView.scrollTo({
				x: formGroupX,
				y: formGroupY - 5,
				animated: true,
			});
		}, 280);
	}

	/**
	 * Add list and shelves in database
	 */
	_onSubmit() {
		const { title } = this.state,
			{ todoID } = this.props;

		this.setState({ isSubmitting: true }, () => {
			let validTitle = this.checkTodoTitle(title);
			if (validTitle) {
				if (todoID !== undefined) {
					fetch(`https://jsonplaceholder.typicode.com/todos/${todoID}`, {
						method: 'PATCH',
						body: JSON.stringify({
							title: title,
						}),
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
						},
					})
						.then((response) => response.json())
						.then((json) => {
							this.props.editTodo(json);
							this.props.navigation.goBack();
						})
						.catch(function (error) {
							console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
						});
				} else {
					fetch('https://jsonplaceholder.typicode.com/todos', {
						method: 'POST',
						body: JSON.stringify({
							title: title,
							userId: 1,
							completed: false,
						}),
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
						},
					})
						.then((response) => response.json())
						.then((json) => {
							this.props.addTodo(json);
							this.props.navigation.goBack();
						})
						.catch(function (error) {
							console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
						});
				}
			} else {
				this.refs._fieldsScrollView.scrollTo({
					x: 0,
					y: 0,
					animated: true,
				});
				this.setState({ isSubmitting: false });
			}
		});
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		const { title, titleErrorMessage, isSubmitting } = this.state;

		return (
			<>
				<View style={styles.wrapper}>
					<KeyboardAvoidingView
						behavior={Platform.OS == 'ios' ? 'padding' : null}
						style={styles.keyboardView}
						keyboardVerticalOffset={globalVariables.headerHeight}>
						<ScrollView nestedScrollEnabled={true} style={styles.container} ref={'_fieldsScrollView'}>
							<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
								<View style={styles.inner}>
									<TodoFormTitle
										title={title}
										setTodoTitle={this.setTodoTitle}
										errorMessage={titleErrorMessage}
										scrollToFormGroup={this.scrollToFormGroup}
									/>
								</View>
							</TouchableWithoutFeedback>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
				<TodoFormSubmit _onSubmit={this._onSubmit} isSubmitting={isSubmitting} />
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		todoList: state.todoList,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addTodo: function (todoInfo) {
			var action = addTodo(todoInfo);
			dispatch(action);
		},
		editTodo: function (todoInfo) {
			var action = editTodo(todoInfo);
			dispatch(action);
		},
	};
}

const styles = StyleSheet.create({
	keyboardView: {
		flex: 1,
	},
	wrapper: {
		...globalStyles.bodyPage,
	},
	container: {},
	inner: {
		...globalStyles.innerBodyPage,
	},
	submitButton: {
		...globalStyles.btn,
		backgroundColor: globalColors.primaryButtonBackgroundColor,
		justifyContent: 'center',
	},
	disabledSubmitButton: {
		backgroundColor: globalColors.primaryDisabledButtonBackgroundColor,
	},
	submitButtonText: {
		color: globalColors.primaryButtonTextColor,
		fontSize: globalVariables.globalFontSize,
		fontWeight: '700',
	},
	disabledSubmitButtonText: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoFormFields);
