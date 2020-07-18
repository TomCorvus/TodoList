/**
 * Get todo index
 * @param {*} todoID
 * @param {*} todoList
 */
export function getTodoIndex(todoID, todoList) {
	let todoIndex = todoList.findIndex(function (todo) {
		return todo.id === todoID;
	});

	return todoIndex;
}

/**
 * Get todo info
 * @param {*} todoID
 * @param {*} todoList
 */
export function getTodoInfo(todoID, todoList) {
	let todoIndex = todoList.findIndex(function (todo) {
		return todo.id === todoID;
	});

	return todoList[todoIndex];
}
