import { useState } from 'react';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';
import UserProfile from './components/Userprofile';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo= (text) =>{
    const newTodo={
      id: Date.now(),
      text: text,
      done:false
    };
    setTodos([...todos, newTodo]);
  };
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
        ? {...todo, done: !todo.done}
        : todo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    );
  };
  return(
    <div>
      투두리스트
      <TextInput addTodo={addTodo} />
      <TaskList todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo} 
      />
      <UserProfile />
    </div>
  );
}

export default App;