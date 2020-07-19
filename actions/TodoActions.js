import { SET_TODOLIST, ADD_TODO, EDIT_TODO, CHECK_TODO, DELETE_TODO } from './TodoActionsTypes';

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
 * @param {*} todoInfo
 */
export function addTodo(todoInfo) {
	return {
		type: ADD_TODO,
		todoInfo: todoInfo,
	};
}

/**
 * Edit todo
 * @param {*} todoInfo
 */
export function editTodo(todoInfo) {
	return {
		type: EDIT_TODO,
		todoInfo: todoInfo,
	};
}

/**
 * Check/uncheck todo
 * @param {*} id
 * @param {*} status
 */
export function checkTodo(id, status) {
	return {
		type: CHECK_TODO,
		id: id,
		status: status,
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
