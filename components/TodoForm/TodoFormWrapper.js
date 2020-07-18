import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import TodoFormHeader from './TodoFormHeader';
import TodoFormBody from './TodoFormBody';
import globalColors from '../../constants/Colors';

class TodoFormWrapper extends React.PureComponent {
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
				<TodoFormHeader todoID={this.props.route.params.todoID} navigation={this.props.navigation} />
				<TodoFormBody todoID={this.props.route.params.todoID} navigation={this.props.navigation} />
			</SafeAreaView>
		);
	}
}

function TodoFormRenderer(props) {
	const route = useRoute();
	const navigation = useNavigation();
	return <TodoFormWrapper {...props} route={route} navigation={navigation} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default TodoFormRenderer;
