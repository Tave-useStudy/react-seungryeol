import { useNavigate, useParams } from "react-router-dom";
function TodoDetail({todos}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
        return <div>할 일을 찾을 수 없습니다.</div>;
    }
    return (
        <div>
            <h2>{todo.text}</h2>
            <p>카테고리: {todo.category}</p>
            <p>우선순위: {todo.priority}</p>
            <p>상태: {todo.done ? '완료' : '미완료'}</p>
            <button onClick={() => navigate('/')}>메인으로</button>
        </div>
    );
}

export default TodoDetail;
