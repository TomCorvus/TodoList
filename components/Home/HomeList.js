import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import HomeTodo from './HomeTodo';
import HomeTodoHiddenElements from './HomeTodoHiddenElements';
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
				json.forEach((todo) => {
					todo.key = `${todo.id}`;
				});
				this.setState({ todoList: json, dataLoaded: true });
			});
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {
		this.getDatas();
	}

	render() {
		// Récupération des données construites pour la FlatList
		let todoList = this.state.todoList,
			keyForSwipePreview = '1';

		return (
			<View style={styles.wrapper}>
				{this.state.dataLoaded ? (
					<>
						<View style={styles.container}>
							{todoList.length > 0 ? (
								<SwipeListView
									data={todoList}
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
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
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
