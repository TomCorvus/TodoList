import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import Icon from '../Global/Icon';
import globalStyles from '../../constants/Styles';
import globalColors from '../../constants/Colors';
import globalVariables from '../../constants/Variables';

class HomeFormTitle extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isFocused: false,
			x: 0,
			y: 0,
		};
	}

	/**
	 * Focus state
	 */
	_onFocus() {
		this.setState({
			isFocused: true,
		});
	}

	/**
	 * Blur state
	 */
	_onBlur() {
		this.setState({
			isFocused: false,
		});
	}

	/**
	 * Set the title in the form state
	 */
	handlerChange = (text) => {
		this.props.setTodoTitle(text.trim());
	};

	/**
	 * Clear the input value
	 */
	_clearField() {
		this.textInput.clear();
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		let inputStyle = [styles.input],
			{ isFocused } = this.state,
			{ errorMessage } = this.props;

		if (isFocused) inputStyle.push(styles.focusedInput);
		if (errorMessage) inputStyle.push(styles.errorInput);

		return (
			<View style={styles.container} onLayout={this._onLayout}>
				<View style={this.state.isFocused ? [styles.inputWrapper, styles.focusedInput] : styles.inputWrapper}>
					<TextInput
						placeholder={"Qu'avez-vous à faire aujourdhui ?"}
						style={inputStyle}
						returnKeyType="go"
						ref={(search) => {
							this.textInput = search;
						}}
						onBlur={() => this._onBlur()}
						onFocus={() => this._onFocus()}
						onSubmitEditing={(event) => this.props._onSubmit()}
						onChangeText={(text) => this.handlerChange(text)}
					/>
					<TouchableHighlight
						style={styles.submitBtn}
						onPress={() => this.props._onSubmit()}
						underlayColor={globalColors.primaryActiveButtonBackgroundColor}
						activeOpacity={0.5}>
						{this.props.isSubmitting ? (
							<ActivityIndicator size="small" color={globalColors.primaryButtonTextColor} />
						) : (
							<Icon
								name="plus-solid"
								size={globalVariables.globalIconFontSize}
								color={globalColors.primaryButtonTextColor}
							/>
						)}
					</TouchableHighlight>
				</View>
				{errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...globalStyles.formGroup,
		marginTop: globalStyles.formGroup.marginBottom,
		paddingLeft: globalStyles.innerBodyPage.padding,
		paddingRight: globalStyles.innerBodyPage.padding,
	},
	label: {
		...globalStyles.label,
	},
	inputWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
	},
	input: {
		...globalStyles.field,
		marginBottom: 0,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 0,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	focusedInput: {
		...globalStyles.focusedField,
	},
	submitBtn: {
		height: globalVariables.fieldHeight,
		width: globalVariables.fieldHeight,
		backgroundColor: globalColors.primaryButtonBackgroundColor,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopRightRadius: globalVariables.fieldBorderRadius,
	},
	errorInput: {
		borderColor: globalColors.errorTextColor,
	},
	errorMessage: {
		fontSize: globalVariables.fieldMessage,
		color: globalColors.errorTextColor,
	},
});

export default HomeFormTitle;
