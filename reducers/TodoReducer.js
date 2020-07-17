import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from '../actions/TodoActions';

let stateInit = {
	todoList: [],
};

export default function TodoReducer(state = stateInit, action) {
	switch (action.type) {
		case 'ADD_TODO': {
			return state;
		}
		default:
			return state;
	}
}

const composeEnhancers = composeWithDevTools({
	actionCreators,
	trace: true,
	traceLimit: 25,
});
const store = createStore(
	TodoReducer,
	composeEnhancers(
		// middlewareEnhancer
		// other store enhancers if any
	)
);

export { store };
