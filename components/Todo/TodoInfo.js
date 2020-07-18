import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getTodoInfo } from '../../functions/Todo';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';
import globalStyles from '../../constants/Styles';

class TodoInfo extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {

	}

	render() {
		const { id, userId, completed } = this.props.todoInfo;

		// fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
		// .then((response) => response.json())
		// .then((json) => console.log(json));

		return (
			<View style={styles.wrapper}>
				<View style={styles.inner}>
					<Text>Id: {id}</Text>
					<Text>Auteur: {userId}</Text>
					<Text>Terminé: {completed}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		...globalStyles.bodyPage,
	},
	container: {},
	inner: {
		...globalStyles.innerBodyPage,
	},
});

export default TodoInfo;
