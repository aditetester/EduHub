import { Board, BoardType } from '../types';

export const convertToDisplayBoard = (board: Board): BoardType => {
  return {
    ...board,
    id: board._id,
    description: board.description || '',
    imageUrl: board.imageUrl || ''
  };
}; 