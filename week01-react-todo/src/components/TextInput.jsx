import {useState} from 'react';

function TextInput({addTodo}) {
    const [text, setText] = useState('');
    const isOverLimit = text.length > 20;
    const handleAdd = () => {
        if(isOverLimit) return;
        addTodo(text);
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