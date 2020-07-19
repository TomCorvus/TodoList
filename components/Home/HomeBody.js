import React from 'react';
import { StyleSheet } from 'react-native';
import HomeFormField from './HomeFormField';
import ErrorBoundary from '../Global/ErrorBoundary';
import HomeLists from './HomeList';

class HomeBody extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		return (
			<ErrorBoundary>
				<HomeFormField navigation={this.props.navigation} />
				<HomeLists navigation={this.props.navigation} />
			</ErrorBoundary>
		);
	}
}

const styles = StyleSheet.create({});

export default HomeBody;
