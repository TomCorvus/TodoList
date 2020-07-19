import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Icon from '../components/Global/Icon';
import HomeWrapper from '../components/Home/HomeWrapper';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			dataLoaded: false,
		};
	}

	async loadResourcesAndDataAsync() {
		try {
			SplashScreen.preventAutoHideAsync();

			// Load fonts
			await Font.loadAsync({
				...Icon.font,
			});
		} catch (error) {
			Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
		} finally {
			this.setState(
				{
					isLoadingComplete: true,
				},
				() => SplashScreen.hideAsync()
			);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.isLoadingComplete && (
					<>
						<HomeWrapper />
					</>
				)}
			</View>
		);
	}

	componentDidUpdate(prevProps) {}

	async componentDidMount() {
		await this.loadResourcesAndDataAsync();
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
