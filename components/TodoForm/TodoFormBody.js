import React from 'react';
import { StyleSheet } from 'react-native';
import TodoFormFields from './TodoFormFields';
import globalColors from '../../constants/Colors';
import globalStyles from '../../constants/Styles';

class TodoFormBody extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		return <TodoFormFields todoID={this.props.todoID} navigation={this.props.navigation} />;
	}
}

const styles = StyleSheet.create({});

export default TodoFormBody;
