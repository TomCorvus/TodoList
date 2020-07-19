import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/TodoActions';
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
	 * Set todo title in state
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

		// Set the submitting status to the form
		this.setState({ isSubmitting: true }, () => {
			let validTitle = this.checkTodoTitle(title);

			// Check if the title is not empty
			if (validTitle) {
				// POST the todo to the server
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
						// Add the todo in Redux state
						this.props.addTodo(json);

						// Clear the field
						this.childRef.current._clearField();

						// Empty the form state and disable the submitting status
						this.setState({ title: '', isSubmitting: false });
					})
					.catch(function () {
						Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
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
			<View style={styles.container}>
				<HomeFormTitle
					title={title}
					ref={this.childRef}
					setTodoTitle={this.setTodoTitle}
					_onSubmit={this._onSubmit}
					isSubmitting={isSubmitting}
					errorMessage={titleErrorMessage}
				/>
			</View>
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
	};
}

const styles = StyleSheet.create({
	container: {
		padding: globalStyles.innerBodyPage.padding,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFormField);
