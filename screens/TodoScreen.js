import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import TodoWrapper from '../components/Todo/TodoWrapper';

class TodoScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<TodoWrapper />
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen);
