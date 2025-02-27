import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
			isMounted: false,
			isLoading: false,
			userName: null,
		};
	}

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
	async _launchCamera() {
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
				fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.todoInfo.id}`, {
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
	async _pickImage() {
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
				fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.todoInfo.id}`, {
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
		if (this.props.todoInfo.image !== prevProps.todoInfo.image) {
			this.setState({
				isLoading: false,
			});
		}
	}

	componentDidMount() {
		this.setState(
			{
				isMounted: true,
			},
			() => {
				// Retrieve author's name of the todo (Bonus)
				fetch(`https://jsonplaceholder.typicode.com/users/${this.props.todoInfo.userId}`)
					.then((response) => response.json())
					.then((json) => {
						if (this.state.isMounted) {
							this.setState({
								userName: json.name,
							});
						}
					});
			}
		);
	}

	componentWillUnmount() {
		this.setState({
			isMounted: false,
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
