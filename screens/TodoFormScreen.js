import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import TodoFormWrapper from '../components/TodoForm/TodoFormWrapper';

class TodoFormScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TodoFormWrapper />
			</View>
		);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoFormScreen);
