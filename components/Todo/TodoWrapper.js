import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';

class TodoWrapper extends React.PureComponent {
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
				<TodoHeader todoID={this.props.route.params.todoID} navigation={this.props.navigation} />
				<TodoBody todoID={this.props.route.params.todoID} navigation={this.props.navigation} />
			</SafeAreaView>
		);
	}
}

function HomeRenderer(props) {
	const route = useRoute();
	const navigation = useNavigation();
	return <TodoWrapper {...props} route={route} navigation={navigation} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default HomeRenderer;
