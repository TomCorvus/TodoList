import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Icon from '../Global/Icon';
import { getTodoInfo } from '../../functions/Todo';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class TodoHeader extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		const { todoID, todoList } = this.props;

		let todoTitle = getTodoInfo(todoID, todoList).title;

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

export default connect(mapStateToProps, null)(TodoHeader);
