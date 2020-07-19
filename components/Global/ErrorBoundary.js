import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
		};
	}
	render() {
		if (this.state.hasError) {
			return (
				<View style={styles.wrapper}>
					<View style={styles.inner}>
						<View style={styles.error}>
							<Text style={styles.errorText}>Une erreur est survenue...</Text>
						</View>
					</View>
				</View>
			);
		}
		return this.props.children;
	}
}

const styles = StyleSheet.create({
	wrapper: {
		...globalStyles.bodyPage,
	},
	inner: {
		...globalStyles.innerBodyPage,
	},
	error: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		marginTop: -globalVariables.headerHeight,
		color: globalColors.attributsColor,
		opacity: 0.5,
	},
});

export default ErrorBoundary;
