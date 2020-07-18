import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { SplashScreen } from 'expo';
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
			SplashScreen.preventAutoHide();

			// Load fonts
			await Font.loadAsync({
				...Icon.font,
			});
		} catch (e) {
			console.warn(e);
		} finally {
			this.setState(
				{
					isLoadingComplete: true,
				},
				() => SplashScreen.hide()
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
