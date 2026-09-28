import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>설정 페이지</h2>
      <button onClick={() => navigate('/')}>
        메인으로
      </button>
    </div>
  );
}

export default Settings;