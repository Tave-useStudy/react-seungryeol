import { useNavigate } from 'react-router-dom';
import Board from '../components/Board.jsx';

function BoardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Board />

      <button onClick={() => navigate('/settings')}>
        설정
      </button>
    </div>
  );
}

export default BoardPage;