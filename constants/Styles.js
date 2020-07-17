import { Platform, StatusBar } from 'react-native';
import globalVariables from './Variables';
import globalColors from './Colors';

export default {
	// Header
	headerPage: {
		position: 'relative',
		zIndex: 1,
		height:
			Platform.OS === 'android'
				? StatusBar.currentHeight + globalVariables.headerHeight
				: globalVariables.headerHeight,
		backgroundColor: globalColors.headerBackgroundColor,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
		paddingBottom: 10,
		shadowColor: '#000',
		flexDirection: 'row',
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	innerHeaderPage: {
		flex: 1,
		flexDirection: 'row',
	},
	headerPageTitle: {
		flex: 1,
		alignContent: 'stretch',
		justifyContent: 'center',
		paddingRight: 20,
	},
	headerPageActionBtnContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		width: globalVariables.headerHeight,
	},
	headerPageActionBtn: {
		width: globalVariables.headerHeight,
		height: globalVariables.headerHeight,
		justifyContent: 'center',
		alignItems: 'center',
	},

	// Body
	bodyPage: {
		flex: 1,
		backgroundColor: globalColors.bodyLightBackgroundColor,
	},
	innerBodyPage: {
		flex: 1,
		padding: 10,
	},

	// Form
	formGroup: {
		position: 'relative',
		marginBottom: 10,
	},
	label: {
		fontSize: globalVariables.globalFontSize,
		color: globalColors.fieldLabelColor,
		fontWeight: '400',
		marginBottom: 5,
	},
	information: {
		color: globalColors.attributsColor,
		fontSize: 12,
		marginBottom: 10,
	},
	field: {
		flex: 1,
		fontSize: globalVariables.globalFontSize,
		height: globalVariables.fieldHeight,
		borderColor: globalColors.fieldBorderColor,
		borderWidth: 1,
		padding: 10,
		backgroundColor: globalColors.fieldBackgroundColor,
		borderRadius: globalVariables.fieldBorderRadius,
		marginBottom: 5,
	},
	focusedField: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2.65,
		elevation: 4,
	},
	btn: {
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		height: 60,
		alignItems: 'center',
	},

	// Others
	baseRow: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: globalColors.separatorColor,
		borderBottomWidth: 1,
		height: globalVariables.rowHeight,
		paddingLeft: 15,
		paddingRight: 10,
	},

	// Message Box
	messageBox: {
		padding: 10,
		marginBottom: 5,
	},
};
