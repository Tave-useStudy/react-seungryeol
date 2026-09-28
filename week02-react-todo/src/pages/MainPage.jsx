import TextInput from '../components/TextInput';
import TaskList from '../components/TaskList';
import UserProfile from '../components/Userprofile';
import { useNavigate } from 'react-router-dom';
function MainPage({
  todos,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  categoryFilter,
  setCategoryFilter,
  sortOrder,
  setSortOrder,
  setStatusFilter
})
{
    const navigate = useNavigate();

    return (
    <div>
        <h1>투두리스트</h1>

        <TextInput addTodo={addTodo} />
        <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
        >
            <option value="전체">전체</option>
            <option value="공부">공부</option>
            <option value="개인">개인</option>
            <option value="기타">기타</option>
        </select>
        <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
        >
            <option value="기본">기본</option>
            <option value="높은순">우선순위 높은순</option>
            <option value="낮은순">우선순위 낮은순</option>
        </select>
        <button onClick={() => setStatusFilter('전체')}>전체</button>
        <button onClick={() => setStatusFilter('완료')}>완료</button>
        <button onClick={() => setStatusFilter('미완료')}>미완료</button>

        <TaskList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
        />

        <UserProfile />

        <button onClick={() => navigate('/settings')}>설정</button>
    </div>
    );
}

export default MainPage;
