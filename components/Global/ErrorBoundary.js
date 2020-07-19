import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import globalStyles from '../../constants/Styles';

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
						<Text>Une erreur est survenue</Text>
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
});

export default ErrorBoundary;
