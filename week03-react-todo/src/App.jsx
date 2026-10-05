import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TodoDetail from './pages/TodoDetail';
import Settings from './pages/Settings';
import useLocalStorage from './hooks/useLocalStorage';

function todoReducer(todos, action) {
  switch (action.type) {
    case 'ADD':
      return [...todos, action.todo];
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'DELETE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'EDIT':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.newText } : todo
      );
    case 'LOAD_API': {
      const existingIds = new Set(todos.map((todo) => todo.id));
      const newTodos = action.todos.filter((todo) => !existingIds.has(todo.id));
      return [...todos, ...newTodos];
    }
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useLocalStorage('todos', todoReducer, []);
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [sortOrder, setSortOrder] = useState('기본');
  const [statusFilter, setStatusFilter] = useState(('전체'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addTodo= (text, category, priority) =>{
    const newTodo={
      id: Date.now(),
      text: text,
      done: false,
      category: category,
      priority: priority
    };
    dispatch({ type: 'ADD', todo: newTodo });
  };
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', id: id });
  };
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE', id: id });
  };
  const editTodo = (id, newText) => {
    dispatch({ type: 'EDIT', id: id, newText: newText });
  };
  const fetchApiTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('할 일을 불러오지 못했습니다');
      }
      const data = await response.json();
      const apiTodos = data.slice(0, 10).map((item) => ({
        id: item.id,
        text: item.title,
        done: item.completed,
        category: '기타',
        priority: '보통'
      }));
      dispatch({ type: 'LOAD_API', todos: apiTodos });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const filteredTodos =
    categoryFilter === '전체'
      ? todos
      : todos.filter((todo) => todo.category === categoryFilter);
  const statusFilteredTodos =
    statusFilter === '전체'
      ? filteredTodos
      : filteredTodos.filter((todo) =>
        statusFilter === '완료' ? todo.done : !todo.done
      );
  const priorityOrder = {
    높음: 3,
    보통: 2,
    낮음: 1
  };
  const sortedTodos =
    sortOrder === '기본'
      ? statusFilteredTodos
      : statusFilteredTodos.toSorted((a, b) => {
        if (sortOrder === '높은순') {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  return(
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            todos={sortedTodos}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setStatusFilter={setStatusFilter}
            fetchApiTodos={fetchApiTodos}
            loading={loading}
            error={error}
          />
        }
      />
      <Route path="/todo/:id" element={<TodoDetail todos={todos} />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
