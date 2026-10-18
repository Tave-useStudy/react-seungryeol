import { memo, useState } from 'react';
import { useBoardActions } from '../context/useBoard.js';
import Modal from './Modal.jsx';

const cardActions = {
  todo: [
    {
      label: '진행 중으로',
      nextStatus: 'doing',
    },
  ],

  doing: [
    {
      label: '할 일로',
      nextStatus: 'todo',
    },
    {
      label: '완료로',
      nextStatus: 'done',
    },
  ],

  done: [
    {
      label: '진행 중으로',
      nextStatus: 'doing',
    },
  ],
};

function Card({ id, title, status }) {
  const { moveCard, editCard } = useBoardActions();

  const [isOpen, setIsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const openModal = () => {
    setEditTitle(title);
    setIsOpen(true);
  };

  const saveEdit = () => {
    editCard(id, editTitle);
    setIsOpen(false);
  };

  return (
    <div>
      <p onClick={openModal}>
        {title}
      </p>

      {cardActions[status].map((action) => (
        <button
          key={action.nextStatus}
          onClick={() => moveCard(id, action.nextStatus)}
        >
          {action.label}
        </button>
      ))}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h2>카드 상세</h2>

          <p>상태: {status}</p>

          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <button onClick={saveEdit}>
            저장
          </button>
        </Modal>
      )}
    </div>
  );
}

export default memo(Card);
