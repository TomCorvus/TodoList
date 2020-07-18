import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Animated } from 'react-native';
import Icon from '../Global/Icon';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';
import globalStyles from '../../constants/Styles';

class HomeTodo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
		};
	}

	/**
	 * Navigate to List view
	 * @param {*} listID
	 */
	_onPress() {
		const { navigation, rowMap, todoData, closeRow } = this.props;
		closeRow(rowMap, todoData.key);
	}

	/**
	 * Check/uncheck todo
	 */
	_onCheck() {
		this.setState({
			checked: !this.state.checked,
		});
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		let { todoData } = this.props;

		return (
			<Animated.View
				style={[
					{
						position: 'relative',
						overflow: 'hidden',
						height: todoData.animation.interpolate({
							inputRange: [0, 1],
							outputRange: [0, globalVariables.rowHeight],
						}),
					},
				]}>
				<View style={todoData.lastIndex ? [styles.wrapper, styles.lastIndexWrapper] : styles.wrapper}>
					<View style={styles.container}>
						<TouchableHighlight
							style={styles.checkboxAction}
							onPress={() => this._onCheck()}
							activeOpacity={0.5}
							underlayColor="transparent">
							<View
								style={this.state.checked ? [styles.checkbox, styles.activeCheckbox] : styles.checkbox}>
								{this.state.checked && (
									<Icon
										style={styles.checkboxIcon}
										name="check-solid"
										size={globalVariables.globalIconFontSize}
										color={globalColors.validTextColor}
									/>
								)}
							</View>
						</TouchableHighlight>
						<View style={styles.titleWrapper}>
							<Text numberOfLines={1} style={styles.title}>
								{todoData.title}
							</Text>
						</View>
					</View>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		...globalStyles.baseRow,
	},
	lastIndexWrapper: {
		borderBottomWidth: 0,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'stretch',
		alignItems: 'center',
	},
	titleWrapper: {
		flex: 1,
		paddingRight: 10,
	},
	title: {
		fontSize: globalVariables.globalFontSize,
		color: globalColors.textDefaultColor,
		fontWeight: '500',
	},
	checkboxAction: {
		paddingRight: 10,
		alignContent: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkbox: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#b3b3b3',
	},
	activeCheckbox: {
		backgroundColor: globalColors.validBackgroundColor,
		borderColor: globalColors.validTextColor,
	},
	checkboxIcon: {
		position: 'absolute',
		height: 20,
		width: 20,
		lineHeight: 20,
		top: 4,
		left: 5,
	},
});

export default HomeTodo;
