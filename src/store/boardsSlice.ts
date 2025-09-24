import {createSlice , type PayloadAction} from '@reduxjs/toolkit';
import type { BoardsState, Card } from '../types/index';

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
    resetBoards: () => initialState, // ← Add this,
    addCart:(state, action:PayloadAction<{cart:Card,boardId:string}>) => {
      const board = state.items[action.payload.boardId];
      board.cards.push(action.payload.cart);
    },
    deleteThisBoard : (state , action: PayloadAction<string>)=>{
      delete state.items[action.payload];
    },
    updateCard:(state , action:PayloadAction<{boardId:string , updatedCard:Card}>)=>{
      const board = state.items[action.payload.boardId];
      let cardIndex = board.cards.findIndex(ele=>ele.id == action.payload.updatedCard.id);
      board.cards[cardIndex] = {...action.payload.updatedCard};
    },
    deleteCard : (state , action:PayloadAction<{boardId : string , cardId : string}>)=>{
      const board = state.items[action.payload.boardId];
      board.cards = board.cards.filter(card => card.id !== action.payload.cardId);
    }
  },
});

export const { createBoard, resetBoards , addCart , deleteThisBoard , updateCard , deleteCard} = BoardsSlice.actions;
export default BoardsSlice.reducer;


