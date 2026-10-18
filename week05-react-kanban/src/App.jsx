import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext.jsx';

const BoardPage = lazy(() => import('./pages/BoardPage.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

function App() {
  return (
    <BoardProvider>
      <Suspense fallback={<p>페이지 불러오는 중...</p>}>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BoardProvider>
  );
}

export default App;