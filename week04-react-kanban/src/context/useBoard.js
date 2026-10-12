import { useContext } from 'react';
import { BoardContext } from './boardContext.js';

export function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error(
      'useBoard는 BoardProvider 내부에서 사용해야 합니다.'
    );
  }

  return context;
}
