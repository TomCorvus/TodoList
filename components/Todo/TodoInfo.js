import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, ActivityIndicator } from 'react-native';
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
		};
	}

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
			});
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
					.catch(function (error) {
						console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
					});
			} else {
				this.setState({
					isLoading: false,
				});
			}

			// console.log(result);
		} catch (E) {
			console.log(E);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.todoInfo.image !== prevProps.todoInfo.image && this.state.isLoading) {
			this.setState({
				isLoading: false,
			});
		}
	}

	componentDidMount() {
		this.getPermissionAsync();
	}

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	render() {
		const { id, userId, completed, image } = this.props.todoInfo;

		// fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
		// .then((response) => response.json())
		// .then((json) => console.log(json));

		return (
			<View style={styles.wrapper}>
				<View style={styles.inner}>
					<View style={styles.imageWrapper}>
						<TouchableHighlight
							style={styles.image}
							onPress={() => this._pickImage(id)}
							activeOpacity={0.5}
							underlayColor="transparent">
							<>
								{image ? (
									<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
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
							</>
						</TouchableHighlight>
					</View>

					<Text>Id: {id}</Text>
					<Text>Auteur: {userId}</Text>
					<Text>Terminé: {completed}</Text>
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
	container: {},
	inner: {
		...globalStyles.innerBodyPage,
	},
	imageWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	image: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		height: 200,
		width: 200,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#b3b3b3',
		backgroundColor: '#d9dadb',
		overflow: 'hidden',
	},
	indicator: {
		position: 'absolute',
	},
});

export default connect(null, mapDispatchToProps)(TodoInfo);
