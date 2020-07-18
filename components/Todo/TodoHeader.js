import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions/TodoActions';
import Icon from '../Global/Icon';
import { getTodoInfo } from '../../functions/Todo';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class TodoHeader extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	/**
	 * Confirm to delete todo
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
	 *	Delete todo
	 * @param {*} todoID
	 */
	_deleteTodo(todoID) {
		this.props.navigation.goBack();
		this.props.deleteTodo(todoID);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		const { todoID, todoList } = this.props,
			todoTitle = getTodoInfo(todoID, todoList).title;

		return (
			<>
				<View style={styles.wrapper}>
					<View style={styles.container}>
						<View style={styles.actionsButtonContainer}>
							<TouchableHighlight
								style={styles.actionsButton}
								onPress={() => this.props.navigation.goBack()}
								underlayColor="transparent"
								activeOpacity={0.5}>
								<Icon
									name="arrow-left-solid"
									size={globalVariables.headerIconFontSize}
									color={globalColors.headerIconColor}
								/>
							</TouchableHighlight>
						</View>
						<View style={styles.titleWrapper}>
							<Text style={styles.title} numberOfLines={1}>
								{todoTitle}
							</Text>
						</View>
						<View style={styles.actionsButtonContainer}>
							<TouchableOpacity
								style={styles.actionsButton}
								onPress={() => {
									Platform.OS === 'web' ? this._deleteTodo(todoID) : this._confirmDeleteTodo(todoID);
								}}
								activeOpacity={0.5}>
								<Icon
									name="trash-alt"
									size={globalVariables.headerIconFontSize}
									color={globalColors.headerIconColor}
								/>
							</TouchableOpacity>
						</View>
					</View>
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
		deleteTodo: function (id) {
			var action = deleteTodo(id);
			dispatch(action);
		},
	};
}

const styles = StyleSheet.create({
	wrapper: {
		...globalStyles.headerPage,
	},
	container: {
		...globalStyles.innerHeaderPage,
	},
	actionsButtonContainer: {
		...globalStyles.headerPageActionBtnContainer,
	},
	actionsButton: {
		...globalStyles.headerPageActionBtn,
	},
	titleWrapper: {
		...globalStyles.headerPageTitle,
	},
	title: {
		fontSize: globalVariables.headerTitleFontSize,
		color: globalColors.headerTitleColor,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoHeader);
