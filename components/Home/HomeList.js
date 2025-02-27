import React from 'react';
import {
	StyleSheet,
	View,
	Alert,
	Text,
	ActivityIndicator,
	Animated,
	Platform,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as immer from 'immer';
import { setTodoList, editTodo, checkTodo, deleteTodo } from '../../actions/TodoActions';
import HomeTodo from './HomeTodo';
import HomeTodoHiddenElements from './HomeTodoHiddenElements';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class HomeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: false,
			todoList: this.props.todoList,
		};
		this.editTodo = this.editTodo.bind(this);
		this.checkTodo = this.checkTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.setEditForm = this.setEditForm.bind(this);
		this.closeRow = this.closeRow.bind(this);
	}

	/**
	 * Close specfic row
	 * @param {*} rowMap
	 * @param {*} rowKey
	 */
	closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) rowMap[rowKey].closeRow();
	};

	/**
	 * Render each todo
	 * @param {*} rowData
	 * @param {*} rowMap
	 */
	_renderTodo = (rowData, rowMap) => {
		return (
			<HomeTodo
				todoData={rowData.item}
				rowMap={rowMap}
				checkTodo={this.checkTodo}
				editTodo={this.editTodo}
				closeRow={this.closeRow}
				navigation={this.props.navigation}
			/>
		);
	};

	/**
	 * Render hidden actions behind each todo
	 * @param {*} rowData
	 * @param {*} rowMap
	 */
	_renderHiddenProductActions = (rowData, rowMap) => {
		return (
			<HomeTodoHiddenElements
				todoData={rowData.item}
				rowMap={rowMap}
				setEditForm={this.setEditForm}
				deleteTodo={this.deleteTodo}
				closeRow={this.closeRow}
				navigation={this.props.navigation}
			/>
		);
	};

	/**
	 * Retrieve todos
	 */
	getTodo() {
		fetch('https://jsonplaceholder.typicode.com/todos/')
			.then((response) => response.json())
			.then((json) => {
				// Add some attributs on each object for RN operation
				let newTodoList = immer.produce(json, (draftTodoList) => {
					draftTodoList.forEach((todo) => {
						todo.isEditing = false;
					});
				});

				// Save data in Redux state and display results
				this.props.setTodoList(newTodoList);
				this.setState({ dataLoaded: true });
			})
			.catch(function () {
				Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
			});
	}

	/**
	 * Edit title of the todo (image in parameters in only here to avoid
	 * to delete it because it's not save on the server)
	 * @param {*} id
	 * @param {*} title
	 * @param {*} image
	 */
	editTodo(id, title, image) {
		// Save modifications on the server
		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				title: title,
				image: image,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				// Update Redux state
				this.props.editTodo(json);
			})
			.catch(function () {
				Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
			});
	}

	/**
	 * Check todo by ID
	 * @param {*} id
	 * @param {*} status
	 */
	checkTodo(id, status) {
		// Save modifications on the server
		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				completed: status,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				// Update Redux state
				this.props.checkTodo(id, status);
			})
			.catch(function () {
				Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
			});
	}

	/**
	 * Delete todo by ID
	 * @param {*} id
	 */
	deleteTodo(id) {
		// Delete todo on the server
		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				// Update Redux state
				this.props.deleteTodo(id);
			})
			.catch(function () {
				Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
			});
	}

	/**
	 * Set editing status to todo
	 * @param {*} id
	 */
	setEditForm(id) {
		let { todoList } = this.props,
			todoIndex = todoList.findIndex(function (todo) {
				return todo.id === id;
			});

		if (todoIndex !== -1) {
			let newTodoList = immer.produce(todoList, (draftTodoList) => {
				draftTodoList[todoIndex].isEditing = true;
			});

			this.props.editTodo(newTodoList[todoIndex]);
		}
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {
		this.getTodo();
	}

	render() {
		let todoList = this.props.todoList,
			keyForSwipePreview = '1',
			newTodoList = immer.produce(todoList, (draftTodoList) => {
				draftTodoList.forEach((todo) => {
					todo.key = `${todo.id}`;
					todo.animation = new Animated.Value(1);
				});
			});

		return (
			<View style={styles.wrapper}>
				{this.state.dataLoaded ? (
					<>
						<View style={styles.container}>
							<KeyboardAvoidingView
								behavior={Platform.OS == 'ios' ? 'padding' : null}
								style={styles.keyboardView}
								keyboardVerticalOffset={globalVariables.headerHeight + 90}>
								<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
									{todoList.length > 0 ? (
										<SwipeListView
											data={newTodoList}
											renderItem={this._renderTodo}
											renderHiddenItem={this._renderHiddenProductActions}
											rightOpenValue={-150}
											previewRowKey={keyForSwipePreview}
											previewOpenValue={-50}
											previewOpenDelay={800}
											previewDuration={400}
											useNativeDriver={false}
											disableRightSwipe
											recalculateHiddenLayout={true}
										/>
									) : (
										<View style={styles.emptyList}>
											<Text style={styles.emptyListText}>Aucun todo</Text>
										</View>
									)}
								</TouchableWithoutFeedback>
							</KeyboardAvoidingView>
						</View>
					</>
				) : (
					<View style={styles.loaderContainer}>
						<ActivityIndicator size="small" color={globalColors.headerBackgroundColor} />
						<Text style={styles.loaderMessage}>Récupération des Todos...</Text>
					</View>
				)}
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
		setTodoList: function (todoList) {
			var action = setTodoList(todoList);
			dispatch(action);
		},
		editTodo: function (todoInfo) {
			var action = editTodo(todoInfo);
			dispatch(action);
		},
		checkTodo: function (id, status) {
			var action = checkTodo(id, status);
			dispatch(action);
		},
		deleteTodo: function (id) {
			var action = deleteTodo(id);
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
	container: {
		...globalStyles.innerBodyPage,
		padding: 0,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loaderMessage: {
		marginTop: 5,
		color: globalColors.attributsColor,
	},
	emptyList: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyListText: {
		marginTop: -globalVariables.headerHeight,
		color: globalColors.attributsColor,
		opacity: 0.5,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeList);
