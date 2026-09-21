function TaskList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div>
      할 일 목록
      {todos.map((todo) => (
        <div key={todo.id}>
            <span
            style={{
                textDecoration: todo.done ? 'line-through' : 'none'
                }}
            >
                {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>
                완료
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
                삭제
            </button>
        </div>
    ))}
    </div>
  );
}

export default TaskList;