import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList({ todos, toggleTodo, deleteTodo, editTodo }) {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const navigate = useNavigate();
    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };
    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };
    const saveEdit = (id) => {
        editTodo(id, editText);
        setEditingId(null);
        setEditText('');
    };
    return (
    <div>
      할 일 목록
      {todos.map((todo) => (
        <div key={todo.id}>
            {editingId === todo.id ? (
                <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    />
                ) : (
                <span
                    style={{
                        textDecoration: todo.done ? 'line-through' : 'none'
                    }}
                >
                    {todo.text}
                </span>
            )}
            {editingId === todo.id ? (
                <>
                    <button onClick={() => saveEdit(todo.id)}>저장</button>
                    <button onClick={cancelEdit}>취소</button>
                </>
            ) : (
                <>
                    <button onClick={() => toggleTodo(todo.id)}>완료</button>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                    <button onClick={() => startEdit(todo)}>수정</button>
                    <button onClick={() => navigate(`/todo/${todo.id}`)}>상세</button>
                </>
            )}
        </div>
    ))}
    </div>
  );
}

export default TaskList;