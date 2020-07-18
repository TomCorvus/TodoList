import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Animated } from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as immer from 'immer';
import { setTodoList, checkTodo, deleteTodo } from '../../actions/TodoActions';
import HomeTodo from './HomeTodo';
import HomeTodoHiddenElements from './HomeTodoHiddenElements';
import HomeAddTodo from './HomeAddTodo';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class HomeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			dataLoaded: false,
		};
		this.deleteTodo = this.deleteTodo.bind(this);
		this.checkTodo = this.checkTodo.bind(this);
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
	 * Render todo list
	 * @param {*} list
	 */
	_renderList = (rowData, rowMap) => {
		return (
			<HomeTodo
				todoData={rowData.item}
				rowMap={rowMap}
				checkTodo={this.checkTodo}
				closeRow={this.closeRow}
				navigation={this.props.navigation}
			/>
		);
	};

	/**
	 * Render hidden actions behind each todo row
	 * @param {*} rowData
	 * @param {*} rowMap
	 */
	_renderHiddenProductActions = (rowData, rowMap) => {
		return (
			<HomeTodoHiddenElements
				todoData={rowData.item}
				rowMap={rowMap}
				deleteTodo={this.deleteTodo}
				closeRow={this.closeRow}
				navigation={this.props.navigation}
			/>
		);
	};

	/**
	 * Retrieve todos
	 */
	getDatas() {
		fetch('https://jsonplaceholder.typicode.com/todos/')
			.then((response) => response.json())
			.then((json) => {
				this.props.setTodoList(json);
				this.setState({ dataLoaded: true });
			})
			.catch(function (error) {
				console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
			});
	}

	/**
	 * Delete todo by ID
	 * @param {*} id
	 */
	deleteTodo(id) {
		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				this.props.deleteTodo(id);
			})
			.catch(function (error) {
				console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
			});
	}

	/**
	 * Delete todo by ID
	 * @param {*} id
	 */
	checkTodo(id, status) {
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
				this.props.checkTodo(id, status);
			})
			.catch(function (error) {
				console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
			});
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {
		this.getDatas();
	}

	render() {
		// Récupération des données construites pour la FlatList
		let todoList = this.props.todoList,
			keyForSwipePreview = '1';

		let newTodoList = immer.produce(todoList, (draftTodoList) => {
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
							{todoList.length > 0 ? (
								<SwipeListView
									data={newTodoList}
									renderItem={this._renderList}
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
						</View>
						<HomeAddTodo navigation={this.props.navigation} />
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
		color: globalColors.headerBackgroundColor,
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
