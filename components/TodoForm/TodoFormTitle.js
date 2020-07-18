import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import globalStyles from '../../constants/Styles';
import globalColors from '../../constants/Colors';
import globalVariables from '../../constants/Variables';

class TodoFormTitle extends React.PureComponent {
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
		this.setState(
			{
				isFocused: true,
			},
			() => {
				this.props.scrollToFormGroup(this.state.x, this.state.y);
			}
		);
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
	 * Get form group position on layout
	 */
	_onLayout = (e) => {
		this.setState({
			x: e.nativeEvent.layout.x,
			y: e.nativeEvent.layout.y,
		});
	};

	/**
	 * Set the title in the form state
	 */
	handlerChange = (text) => {
		this.props.setTodoTitle(text.trim());
	};

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		let inputStyle = [styles.input],
			{ isFocused } = this.state,
			{ title, errorMessage } = this.props;

		if (isFocused) inputStyle.push(styles.focusedInput);
		if (errorMessage) inputStyle.push(styles.errorInput);

		return (
			<View style={styles.container} onLayout={this._onLayout}>
				<Text style={styles.label}>Titre</Text>
				<TextInput
					defaultValue={title}
					style={inputStyle}
					onBlur={() => this._onBlur()}
					onFocus={() => this._onFocus()}
					onChangeText={(text) => this.handlerChange(text)}
				/>
				{errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...globalStyles.formGroup,
	},
	label: {
		...globalStyles.label,
	},
	input: {
		...globalStyles.field,
	},
	focusedInput: {
		...globalStyles.focusedField,
	},
	errorInput: {
		borderColor: globalColors.errorTextColor,
	},
	errorMessage: {
		fontSize: globalVariables.fieldMessage,
		color: globalColors.errorTextColor,
	},
});

export default TodoFormTitle;
