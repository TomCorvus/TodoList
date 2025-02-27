import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import TodoScreen from '../../screens/TodoScreen';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export const navigationRef = React.createRef();

export class AppNavigator extends React.Component {
	render() {
		return (
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator
					initialRouteName={INITIAL_ROUTE_NAME}
					screenOptions={{
						gestureEnabled: true,
						gestureDirection: 'horizontal',
					}}
					headerMode="float">
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Todo" component={TodoScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export function navigate(name, params) {
	navigationRef.current?.navigate(name, params);
}
