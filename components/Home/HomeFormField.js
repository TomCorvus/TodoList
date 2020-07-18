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
import HomeFormTitle from './HomeFormTitle';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class HomeFormField extends React.Component {
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
		this._onSubmit = this._onSubmit.bind(this);
		this.childRef = React.createRef();
	}

	/**
	 * Set todo title in form state
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
	 * Check if todo title is valid
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
	 * Add todo in database
	 */
	_onSubmit() {
		const { title } = this.state;

		this.setState({ isSubmitting: true }, () => {
			let validTitle = this.checkTodoTitle(title);
			if (validTitle) {
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
						this.childRef.current._clearField();
						this.setState({ title: '', isSubmitting: false });
					})
					.catch(function (error) {
						console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
					});
			} else {
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
									<HomeFormTitle
										title={title}
										setTodoTitle={this.setTodoTitle}
										_onSubmit={this._onSubmit}
										ref={this.childRef}
										isSubmitting={isSubmitting}
										errorMessage={titleErrorMessage}
									/>
								</View>
							</TouchableWithoutFeedback>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
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
	keyboardView: {},
	wrapper: {},
	container: {},
	inner: {},
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFormField);
