import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AppNavigator } from './components/Navigation/AppNavigator';
import { store } from './reducers/TodoReducer';
import globalColors from './constants/Colors';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<Provider store={store}>
				{Platform.OS === 'ios' && (
					<>
						<View style={styles.appBar}></View>
						<StatusBar barStyle="light-content" />
					</>
				)}
				<View style={styles.container}>
					<AppNavigator />
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: globalColors.bodyLightBackgroundColor,
	},
	appBar: {
		height: getStatusBarHeight(),
		backgroundColor: globalColors.headerBackgroundColor,
	},
});

export default App;
