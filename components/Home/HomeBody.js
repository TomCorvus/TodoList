import React from 'react';
import { StyleSheet } from 'react-native';
import HomeFormField from './HomeFormField';
import HomeLists from './HomeList';

class HomeBody extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	render() {
		return (
			<>
				<HomeFormField navigation={this.props.navigation} />
				<HomeLists navigation={this.props.navigation} />
			</>
		);
	}
}

const styles = StyleSheet.create({});

export default HomeBody;
