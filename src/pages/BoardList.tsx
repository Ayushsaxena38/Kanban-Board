import { Layout, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardList() {
    const navigate = useNavigate();
    const [newBoardTitle, setNewBoardTitle] = useState<string>("");
    const [isCreating , setIsCreating] = useState<boolean>(false);
    function handleCreateBoard(){
        if(newBoardTitle.trim()){
            const id:string = crypto.randomUUID();
            //TODO 1: send title and id to redux
            setNewBoardTitle("");
            setIsCreating(false);
            navigate(`/boards/${id}`);

        }
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
      {isCreating && <form className="flex flex-col gap-4 max-w-screen-500px ">
        <input
          className="bg-primary text-dark px-4 py-2 rounded-sm placeholder:text-gray-600 outline-none"
          type="text"
          placeholder="Board title"
          onChange={(e)=> setNewBoardTitle(e.target.value)}
          value={newBoardTitle}
          onSubmit={()=> handleCreateBoard()}
        />
        <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
          <button type="button" onClick={()=> setIsCreating(false)}>Cancle</button>
          <button type="submit">Create</button>
        </div>
      </form>}
      <div>
        <div className="grid grid-cols-1 gap-4 500px:grid-cols-2 md:grid-cols-3 ls:grid-cols-4">
          <div className="cursor-pointer flex flex-col items-center gap-4 bg-primary text-dark rounded-sm px-6 py-2">
            <div className="flex flex-col items-center gap-4">
              <Layout className="size-8" />
              <h2 className="text-xl font-semibold">Board Title</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
