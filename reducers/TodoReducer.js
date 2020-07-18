import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from '../actions/TodoActions';
import * as _ from 'lodash';
import * as immer from 'immer';
import { getTodoIndex } from '../functions/Todo';

let stateInit = {
	todoList: [],
};

export default function TodoReducer(state = stateInit, action) {
	switch (action.type) {
		case 'SET_TODOLIST': {
			let newState = immer.produce(state, (draftState) => {
				draftState.todoList = action.todoList;
			});

			return newState;
		}

		case 'ADD_TODO': {
			let newState = immer.produce(state, (draftState) => {
				draftState.todoList.push({
					id: action.todoInfo.id,
					title: action.todoInfo.title,
					completed: action.todoInfo.completed,
					userId: action.todoInfo.userId,
				});
			});
			return newState;
		}

		case 'CHECK_TODO': {
			let todoIndex = getTodoIndex(action.id, state.todoList),
				newState = immer.produce(state, (draftState) => {
					draftState.todoList[todoIndex].completed = action.status;
				});

			return newState;
		}
		case 'DELETE_TODO': {
			let todoIndex = getTodoIndex(action.id, state.todoList),
				newState = immer.produce(state, (draftState) => {
					draftState.todoList.splice(todoIndex, 1);
				});

			return newState;
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
	composeEnhancers()
	// middlewareEnhancer
	// other store enhancers if any
);

export { store };
