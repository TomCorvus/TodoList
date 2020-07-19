import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import appInfo from '../../app.json';
import globalStyles from '../../constants/Styles';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';

class HomeHeader extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps) {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.container}>
					<View style={styles.titleWrapper}>
						<Text style={styles.title}>{appInfo.expo.name}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		...globalStyles.headerPage,
	},
	container: {
		...globalStyles.innerHeaderPage,
	},
	titleWrapper: {
		...globalStyles.headerPageTitle,
		alignItems: 'center',
		paddingRight: 0,
	},
	title: {
		fontSize: globalVariables.headerTitleFontSize,
		color: globalColors.headerTitleColor,
	},
});

export default HomeHeader;
