import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Icon from '../Global/Icon';
import { getTodoInfo, getTodoIndex } from '../../functions/Todo';
import globalStyles from '../../constants/Styles';
import globalColors from '../../constants/Colors';
import globalVariables from '../../constants/Variables';

class TodoFormHeader extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	/**
	 * Retrieve the list's title
	 * @param {*} todoID
	 */
	getTheTitle() {
		let title = 'Ajouter une tâche',
			{ todoID, todoList } = this.props,
			todoIndex = getTodoIndex(todoID, todoList);

		// Si la liste n'existe plus, retour à la page d'accueil
		if (todoIndex === -1 && todoID !== undefined) {
			return this.props.navigation.navigate('Home');
		}

		if (todoID !== undefined) {
			title = getTodoInfo(todoID, todoList).title;
		}

		return title;
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		return (
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
							{this.getTheTitle(this.props.todoID)}
						</Text>
					</View>
				</View>
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
	return {};
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

export default connect(mapStateToProps, null)(TodoFormHeader);
