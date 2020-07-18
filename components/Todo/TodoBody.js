import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getTodoInfo } from '../../functions/Todo';
import TodoInfo from './TodoInfo';

class TodoBody extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		const { todoID, todoList } = this.props;

		let todoInfo = getTodoInfo(todoID, todoList);

		return <TodoInfo todoInfo={todoInfo} navigation={this.props.navigation} />;
	}
}

function mapStateToProps(state) {
	return {
		todoList: state.todoList,
	};
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps, null)(TodoBody);
