import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { editTodo } from '../../actions/TodoActions';
import Icon from '../Global/Icon';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';
import globalStyles from '../../constants/Styles';

class TodoInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			userName: null,
		};
	}

	/**
	 * Get user's permission to access to his library
	 */
	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	/**
	 * Pick an image and save it in the dabase
	 * @param {*} todoID
	 */
	async _pickImage(todoID) {
		this.setState({
			isLoading: true,
		});

		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			})
			if (!result.cancelled) {
				fetch(`https://jsonplaceholder.typicode.com/todos/${todoID}`, {
					method: 'PATCH',
					body: JSON.stringify({
						image: result.uri,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				})
					.then((response) => response.json())
					.then((json) => {
						this.props.editTodo(json);
					})
					.catch(() => {
						Alert.alert('Il y a eu un problème', "Une erreur est survenue.");
					})
			} else {
				this.setState({
					isLoading: false,
				});
			}

		} catch (error) {
			Alert.alert('Il y a eu un problème', "Une erreur est survenue.");
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.todoInfo.image !== prevProps.todoInfo.image) {
			this.setState({
				isLoading: false,
			});
		}
	}

	componentDidMount() {
		this.getPermissionAsync();

		fetch(`https://jsonplaceholder.typicode.com/users/${this.props.todoInfo.userId}`)
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					userName: json.name,
				});
			});
	}

	render() {
		const { id, completed, image } = this.props.todoInfo;

		return (
			<View style={styles.wrapper}>
				<View style={styles.inner}>
					<View style={styles.todoInfoWrapper}>
						<TouchableHighlight
							style={styles.image}
							onPress={() => this._pickImage(id)}
							activeOpacity={0.5}
							underlayColor="transparent">
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								{image ? (
									<Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
								) : (
									<Icon
										style={styles.checkboxIcon}
										name="camera-solid"
										size={globalVariables.bigIconFontSize}
										color={globalColors.attributsColor}
									/>
								)}
								{this.state.isLoading && (
									<ActivityIndicator
										style={styles.indicator}
										size="small"
										color={globalColors.headerBackgroundColor}
									/>
								)}
							</View>
						</TouchableHighlight>
						<View style={styles.info}>
							<View style={styles.infoRow}>
								<Text style={styles.label}>ID : </Text>
								<Text>{id}</Text>
							</View>
							<View style={styles.infoRow}>
								<Text style={styles.label}>Auteur : </Text>
								{this.state.userName && <Text>{this.state.userName}</Text>}
							</View>
							<View style={styles.infoRow}>
								<Text style={styles.label}>Complétée : </Text>
								{completed ? <Text>Oui</Text> : <Text>Non</Text>}
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		editTodo: function (todoInfo) {
			var action = editTodo(todoInfo);
			dispatch(action);
		},
	};
}

const styles = StyleSheet.create({
	wrapper: {
		...globalStyles.bodyPage,
	},
	inner: {
		...globalStyles.innerBodyPage,
	},
	todoInfoWrapper: {
		flexDirection: 'row',
	},
	image: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		height: 100,
		width: 100,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: '#b3b3b3',
		backgroundColor: '#d9dadb',
		overflow: 'hidden',
	},
	indicator: {
		position: 'absolute',
	},
	info: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 10,
	},
	infoRow: {
		flexDirection: 'row',
	},
	label: {
		...globalStyles.label,
	},
});

export default connect(null, mapDispatchToProps)(TodoInfo);
