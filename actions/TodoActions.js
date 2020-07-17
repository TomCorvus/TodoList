import { ADD_TODO } from './TodoActionsTypes';

/**
 * Add todo
 * @param {*} todo
 */
export function addTodo(todo) {
	return {
		type: ADD_TODO,
		todo: todo,
	};
}
