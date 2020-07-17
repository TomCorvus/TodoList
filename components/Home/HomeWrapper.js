import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

class HomeWrapper extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {
		this.props.navigation.setOptions({
			headerShown: false,
		});
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<HomeHeader navigation={this.props.navigation} />
				<HomeBody navigation={this.props.navigation} dataLoaded={this.props.dataLoaded} />
			</SafeAreaView>
		);
	}
}

function HomeRenderer(props) {
	const route = useRoute();
	const navigation = useNavigation();
	return <HomeWrapper {...props} route={route} navigation={navigation} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default HomeRenderer;
