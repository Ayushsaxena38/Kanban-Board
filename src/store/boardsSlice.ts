import {createSlice , type PayloadAction} from '@reduxjs/toolkit';
import type { Board } from '../types/index';

interface BoardsState {
    items: Record<string, Board>;
    loading: boolean;
    error: string | null;
}
const initialState:BoardsState = {
    items:{},
    loading:false,
    error:null
}

const BoardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<{ id: string; title: string }>) => {
      state.items[action.payload.id] = {
        id: action.payload.id,
        title: action.payload.title,
        cards: [],
      };
    },
    resetBoards: () => initialState, // ← Add this
  },
});

export const { createBoard, resetBoards } = BoardsSlice.actions;
export default BoardsSlice.reducer;


