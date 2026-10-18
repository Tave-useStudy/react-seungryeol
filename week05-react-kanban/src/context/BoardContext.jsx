import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { BoardStateContext, BoardActionsContext } from './boardContext.js';

const initialCards = [
  {
    id: 1,
    title: 'React 공부하기',
    status: 'todo',
  },
  {
    id: 2,
    title: '과제하기',
    status: 'todo',
  },
  {
    id: 3,
    title: '발표 준비',
    status: 'doing',
  },
  {
    id: 4,
    title: '운동하기',
    status: 'done',
  },
];

export function BoardProvider({ children }) {
  const [cards, setCards] = useState(initialCards);

  const moveCard = useCallback((id, newStatus) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, status: newStatus }
          : card
      )
    );
  }, []);

  const editCard = useCallback((id, newTitle) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, title: newTitle }
          : card
      )
    );
  }, []);

  const actions = useMemo(
    () => ({
      moveCard,
      editCard,
    }),
    [moveCard, editCard]
  );

  return (
    <BoardStateContext.Provider value={cards}>
      <BoardActionsContext.Provider value={actions}>
        {children}
      </BoardActionsContext.Provider>
    </BoardStateContext.Provider>
  );
}
