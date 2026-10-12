import Column from './Column.jsx';
import Card from './Card.jsx';
import { useBoard } from '../context/useBoard.js';

function Board() {
  const { cards } = useBoard();

  return (
    <div>
      <h1>Kanban Board</h1>

      <Column>
        <Column.Title>할 일</Column.Title>

        <Column.Content>
          {cards
            .filter((card) => card.status === 'todo')
            .map((card) => (
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
          {cards
            .filter((card) => card.status === 'doing')
            .map((card) => (
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
          {cards
            .filter((card) => card.status === 'done')
            .map((card) => (
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
