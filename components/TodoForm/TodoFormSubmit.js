import React from 'react';
import { StyleSheet, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class TodoFormSubmit extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	/**
	 * Add list and shelves in database
	 */
	handlerSubmit() {
		this.props._onSubmit();
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		const { isSubmitting } = this.props;

		return (
			<TouchableHighlight
				disabled={isSubmitting}
				style={!isSubmitting ? styles.submitButton : [styles.submitButton, styles.disabledSubmitButton]}
				onPress={() => this.handlerSubmit()}
				underlayColor={globalColors.primaryActiveButtonBackgroundColor}>
				{isSubmitting ? (
					<ActivityIndicator size="small" color={globalColors.primaryDisabledButtonTextColor} />
				) : (
					<Text style={styles.submitButtonText}>Valider</Text>
				)}
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	submitButton: {
		...globalStyles.btn,
		backgroundColor: globalColors.primaryButtonBackgroundColor,
		justifyContent: 'center',
	},
	disabledSubmitButton: {
		backgroundColor: globalColors.primaryDisabledButtonBackgroundColor,
	},
	submitButtonText: {
		color: globalColors.primaryButtonTextColor,
		fontSize: globalVariables.globalFontSize,
		fontWeight: '700',
	},
	disabledSubmitButtonText: {},
});

export default TodoFormSubmit;
