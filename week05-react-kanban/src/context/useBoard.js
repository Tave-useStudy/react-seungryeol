import { useContext } from 'react';
import { BoardStateContext, BoardActionsContext } from './boardContext.js';

export function useBoardState() {
  const context = useContext(BoardStateContext);

  if (!context) {
    throw new Error(
      'useBoardState는 BoardProvider 내부에서 사용해야 합니다.'
    );
  }

  return context;
}

export function useBoardActions() {
  const context = useContext(BoardActionsContext);

  if (!context) {
    throw new Error(
      'useBoardActions는 BoardProvider 내부에서 사용해야 합니다.'
    );
  }

  return context;
}
