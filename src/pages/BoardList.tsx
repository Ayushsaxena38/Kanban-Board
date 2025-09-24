import { Layout, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../store/boardsSlice";
import { useDispatch , useSelector } from "react-redux";
import type { RootState } from "../types";

export default function BoardList() {

    const dispatch = useDispatch();
    const boards = useSelector((state:RootState) => state.boards.items);
    const navigate = useNavigate();
    const [newBoardTitle, setNewBoardTitle] = useState<string>("");
    const [isCreating , setIsCreating] = useState<boolean>(false);
    function handleCreateBoard(e:React.FormEvent){
      e.preventDefault();
        if(newBoardTitle.trim()){
            const id:string = crypto.randomUUID();
            dispatch(createBoard({id,title: newBoardTitle}));
            setNewBoardTitle("");
            setIsCreating(false);
            navigate(`/boards/${id}`);
        }
    }
    function moveToBoard(id : string){
      navigate(`/boards/${id}`);
    }
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 500px:flex-row 500px:justify-between">
        <h1 className="text-5xl font-bold text-primary text-center">
          My Boards
        </h1>
        <button className="flex items-center justify-center gap-4 p-4 rounded-md border border-primary font-bold" onClick={()=>setIsCreating(true)}>
          <Plus className="size-5" /> New Board
        </button>
      </div>
      {isCreating && <form className="flex flex-col gap-4 max-w-screen-500px " onSubmit={(e)=> handleCreateBoard(e)}>
        <input
          className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none"
          type="text"
          placeholder="Board title"
          onChange={(e)=> setNewBoardTitle(e.target.value)}
          value={newBoardTitle}
          // onSubmit={(e)=> handleCreateBoard(e)}
        />
        <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
          <button type="button" onClick={()=> setIsCreating(false)}>cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>}
      <div>
        <div className="grid grid-cols-1 gap-4 500px:grid-cols-2 md:grid-cols-3 ls:grid-cols-4">
          {Object.values(boards).map((board)=>{
            return(<div className="cursor-pointer flex flex-col items-center gap-4 bg-primary text-dark rounded-sm px-6 py-2" key = {board.id} onClick = {()=> moveToBoard(board.id)}>
            <div className="flex flex-col items-center gap-4">
              <Layout className="size-8" />
              <h2 className="text-xl font-semibold">{board.title}</h2>
            </div>
            <p>{board.cards.length} cards</p>
          </div>)
          })}
        </div>
      </div>
    </section>
  );
}
