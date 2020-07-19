import * as React from 'react';
import { Image, View, StyleSheet, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { editTodo } from '../../actions/TodoActions';
import Icon from '../Global/Icon';
import globalVariables from '../../constants/Variables';
import globalColors from '../../constants/Colors';
import globalStyles from '../../constants/Styles';

class HomeTodoImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: this.props.todoImage,
			isLoading: false,
		};
	}

	/**
	 * Get user's permission to access to his library
	 */
	getCameraRollPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	/**
	 * Get user's permission to access to his camera
	 */
	getCameraPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			if (status !== 'granted') {
				alert('Sorry, we need camera permissions to make this work!');
			}
		}
	};

	/**
	 * Ask to the user which system he wants to use to take the photo
	 */
	_onSelectImagePicker() {
		Alert.alert(
			'Sélectionnez une image',
			"Accédez votre bibliothèque ou lancez l'appareil photo.",
			[
				{
					text: 'Appareil photo',
					onPress: () => this._launchCamera(),
				},
				{ text: 'Bibliothèque', onPress: () => this._pickImage() },
				{
					text: 'Annuler',
					onPress: () => {},
					style: 'cancel',
				},
			],
			{ cancelable: false }
		);
	}

	/**
	 * Launch camera and save image in database
	 * @param {*} todoID
	 */
	async _launchCamera(todoID) {
		this.setState({
			isLoading: true,
		});

		try {
			let result = await ImagePicker.launchCameraAsync({
				storageOptions: {
					skipBackup: true,
					path: 'images',
				},
			});
			if (!result.cancelled) {
				fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.todoID}`, {
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
						// Update Redux state
						this.props.editTodo(json);
					})
					.catch(() => {
						Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
					});
			} else {
				this.setState({
					isLoading: false,
				});
			}
		} catch (error) {
			Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
		}
	}

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
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!result.cancelled) {
				fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.todoID}`, {
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
						// Update Redux state
						this.props.editTodo(json);
					})
					.catch(() => {
						Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
					});
			} else {
				this.setState({
					isLoading: false,
				});
			}
		} catch (error) {
			Alert.alert('Il y a eu un problème', 'Une erreur est survenue.');
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.todoImage !== this.props.todoImage) {
			this.setState({
				image: this.props.todoImage,
				isLoading: false,
			});
		}
	}

	componentDidMount() {
		this.getCameraRollPermissionAsync();
		this.getCameraPermissionAsync();
	}

	render() {
		let { image } = this.state;

		return (
			<View style={styles.container}>
				<TouchableHighlight
					style={styles.imagePickerButton}
					onPress={() => this._onSelectImagePicker()}
					activeOpacity={0.5}
					underlayColor="transparent">
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						{image ? (
							<Image source={{ uri: image }} style={{ width: 30, height: 30 }} />
						) : (
							<Icon
								style={styles.checkboxIcon}
								name="camera-solid"
								size={globalVariables.globalIconFontSize}
								color={'#969696'}
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
		...globalStyles.baseRow,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#b3b3b3',
		backgroundColor: '#f0f0f0',
		overflow: 'hidden',
		marginRight: 5,
	},
	imagePickerButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	indicator: {
		position: 'absolute',
	},
});

export default connect(null, mapDispatchToProps)(HomeTodoImage);
