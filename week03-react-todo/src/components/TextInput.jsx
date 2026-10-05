import {useState} from 'react';

function TextInput({addTodo}) {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('공부');
    const [priority, setPriority] = useState('보통');
    const isOverLimit = text.length > 20;
    const handleAdd = () => {
        if(isOverLimit) return;
        addTodo(text, category, priority);
        setText('');
    };
    return(
        <div>
            <input
                value={text}
                onChange={(e)=> setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAdd();
                    }
                }}
                />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="공부">공부</option>
                <option value="개인">개인</option>
                <option value="기타">기타</option>
            </select>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="높음">높음</option>
                <option value="보통">보통</option>
                <option value="낮음">낮음</option>
            </select>
            <button
                disabled = {isOverLimit}
                onClick={handleAdd}>
                추가
            </button>
            <p>{text.length} / 20</p>
            {isOverLimit && <p>20자를 초과했습니다.</p>}
        </div>
    );
}

export default TextInput;
