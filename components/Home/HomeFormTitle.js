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
	_onChange = (text) => {
		this.props.setTodoTitle(text.trim());
	};

	/**
	 * Clear the input value
	 */
	_onClear() {
		this.textInput.clear();
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		let inputStyle = [styles.input],
			{ isFocused } = this.state,
			{ isSubmitting, errorMessage } = this.props;

		if (isFocused) inputStyle.push(styles.focusedInput);
		if (errorMessage) inputStyle.push(styles.errorInput);

		return (
			<View style={styles.container}>
				<View style={this.state.isFocused ? [styles.inputWrapper, styles.focusedInput] : styles.inputWrapper}>
					<TextInput
						placeholder={"Qu'avez-vous à faire aujourdhui ?"}
						style={inputStyle}
						returnKeyType="send"
						ref={(search) => {
							this.textInput = search;
						}}
						onBlur={() => this._onBlur()}
						onFocus={() => this._onFocus()}
						onChangeText={(text) => this._onChange(text)}
						onSubmitEditing={() => this.props._onSubmit()}
					/>
					<TouchableHighlight
						disabled={isSubmitting}
						style={!isSubmitting ? styles.submitButton : [styles.submitButton, styles.disabledSubmitButton]}
						onPress={() => this.props._onSubmit()}
						underlayColor={globalColors.primaryActiveButtonBackgroundColor}
						activeOpacity={0.5}>
						{isSubmitting ? (
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
		marginTop: 0,
		marginBottom: 0,
	},
	inputWrapper: {
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
		borderBottomRightRadius: 0,
	},
	focusedInput: {
		...globalStyles.focusedField,
	},
	submitButton: {
		height: globalVariables.fieldHeight,
		width: globalVariables.fieldHeight,
		backgroundColor: globalColors.primaryButtonBackgroundColor,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopRightRadius: globalVariables.fieldBorderRadius,
		borderBottomRightRadius: globalVariables.fieldBorderRadius,
	},
	disabledSubmitButton: {
		backgroundColor: globalColors.primaryDisabledButtonBackgroundColor,
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
