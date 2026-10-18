import { useMemo, useState, useTransition } from 'react';
import Column from './Column.jsx';
import Card from './Card.jsx';
import { useBoardState } from '../context/useBoard.js';

function Board() {
  const cards = useBoardState();

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchInput(value);

    startTransition(() => {
      setSearchTerm(value);
    });
  };

  const cardsByStatus = useMemo(() => {
    const grouped = {
      todo: [],
      doing: [],
      done: [],
    };

    const filteredCards = cards.filter((card) =>
      card.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    filteredCards.forEach((card) => {
      grouped[card.status].push(card);
    });

    return grouped;
  }, [cards, searchTerm]);

  return (
    <div>
      <h1>Kanban Board</h1>

      <input
        type="text"
        placeholder="카드 검색"
        value={searchInput}
        onChange={handleSearch}
      />

      {isPending && <p>검색 중...</p>}

      <Column>
        <Column.Title>할 일</Column.Title>

        <Column.Content>
          {cardsByStatus.todo.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              status={card.status}
            />
          ))}
        </Column.Content>
      </Column>

      <Column>
        <Column.Title>진행 중</Column.Title>

        <Column.Content>
          {cardsByStatus.doing.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              status={card.status}
            />
          ))}
        </Column.Content>
      </Column>

      <Column>
        <Column.Title>완료</Column.Title>

        <Column.Content>
          {cardsByStatus.done.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              status={card.status}
            />
          ))}
        </Column.Content>
      </Column>
    </div>
  );
}

export default Board;
