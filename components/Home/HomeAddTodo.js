import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Icon from '../Global/Icon';
import globalStyles from '../../constants/Styles';
import globalColors from '../../constants/Colors';
import globalVariables from '../../constants/Variables';

class HomeAddTodo extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	/**
	 * Navigate to AddList view
	 */
	_onPress() {
		this.props.navigation.navigate('TodoForm', {});
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		return (
			<TouchableHighlight
				style={styles.container}
				onPress={() => this._onPress()}
				underlayColor={globalColors.primaryActiveButtonBackgroundColor}>
				<View style={styles.titleWrapper}>
					<Icon
						style={styles.icon}
						name="plus-solid"
						size={globalVariables.primaryButtonIconSize}
						color={globalColors.primaryButtonTextColor}
					/>
					<Text style={styles.title}>Ajouter un ToDo</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...globalStyles.btn,
		backgroundColor: globalColors.primaryButtonBackgroundColor,
	},
	titleWrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		color: globalColors.primaryButtonTextColor,
		fontSize: globalVariables.globalFontSize,
	},
	icon: {
		marginRight: 5,
	},
});

export default HomeAddTodo;
