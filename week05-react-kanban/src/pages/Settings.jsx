import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>설정 페이지</h1>

      <button onClick={() => navigate('/')}>
        보드로 돌아가기
      </button>
    </div>
  );
}

export default Settings;