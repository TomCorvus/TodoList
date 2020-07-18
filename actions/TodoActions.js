import { SET_TODOLIST, ADD_TODO, DELETE_TODO } from './TodoActionsTypes';

/**
 * Set todo list
 * @param {*} todoList
 */
export function setTodoList(todoList) {
	return {
		type: SET_TODOLIST,
		todoList: todoList,
	};
}

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

/**
 * Delete todo
 * @param {*} id
 */
export function deleteTodo(id) {
	return {
		type: DELETE_TODO,
		id: id,
	};
}
