import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TodoDetail from './pages/TodoDetail';
import Settings from './pages/Settings';

function App() {
  const [todos, setTodos] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [sortOrder, setSortOrder] = useState('기본');
  const [statusFilter, setStatusFilter] = useState(('전체'));
  const addTodo= (text, category, priority) =>{
    const newTodo={
      id: Date.now(),
      text: text,
      done: false,
      category: category,
      priority: priority
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };
  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText }
          : todo
      )
    );
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
          />
        }
      />
      <Route path="/todo/:id" element={<TodoDetail todos={todos} />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
