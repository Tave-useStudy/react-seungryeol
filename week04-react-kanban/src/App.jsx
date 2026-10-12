import { Routes, Route } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext.jsx';
import BoardPage from './pages/BoardPage.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  return (
    <BoardProvider>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BoardProvider>
  );
}

export default App;