import { useNavigate, useParams } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import type { Card, RootState } from "../types";
import {useState } from "react";
import{ ArrowLeft, Plus, Trash } from "lucide-react"; 
import { addCart, deleteThisBoard, updateCard } from "../store/boardsSlice";
export default function BoardDetails(){
    const dispatch = useDispatch();
    const [addingCart , setaddingCart] = useState<boolean>(false)
    const [newCartTitle , setNewCartTitle] = useState<string>("");
    const [draggingCart , setDraggingCart] = useState<Card | null>(null);
    const navigate = useNavigate();
    const {boardId} = useParams();
    const board = useSelector((state:RootState)=> boardId ? state.boards.items[boardId] : null );
    const columns = [
        {id: "todo", title: "To Do"},
        {id: "in-progress", title: "In Progress"},
        {id: "done", title: "Done"}
    ]
    function handleCreateCart(e : React.FormEvent){
        e.preventDefault();
        //write the code for the handle create cart 
        if(!newCartTitle.trim()) return;
        if(!boardId) return;
        const cart:Card = {
            id: crypto.randomUUID(),
            title:newCartTitle,
            description:"",
            status :"todo",
            createAt: new Date().toISOString()
        }
        // dispatch the action to add the new card to the board
        dispatch(addCart({cart , boardId}));
        //empty the title
        setNewCartTitle("");
        setaddingCart(false);
    }
    function deleteBoard(){
        if(boardId && window.confirm("Are you sure you want to delete this board")){
            dispatch(deleteThisBoard(boardId));
            navigate('/boards')
        }
    }
    //start the drag
    function handleDragStart(card:Card){
        setDraggingCart(card);
    }
    // allow to drop
    function handleDragOver(e:React.DragEvent){
        e.preventDefault();//preventing the browser default behaviour to allow the drag drop
    }
    //drag/drop functionality
    function handleDrop(status:Card["status"]){
        if(draggingCart && boardId && status !== draggingCart.status){
            const updatedCard : Card = {
                ...draggingCart,
                status
            }
            // Replace 'updatedCard' with the correct action creator, e.g., 'updateCard'
            // Make sure to import 'updateCard' from your boardsSlice
            dispatch(updateCard({ boardId, updatedCard }))
        }
        setDraggingCart(null);
    }
    return board ? (
    <section className="flex flex-col gap-2">
        {/* board Details */}
        <div className="gap-4">
            {/* board name and create and delete board part */}
            <div>
                <button className="bg-primary text-dark border rounded-xl text-1px" onClick={()=>navigate("/boards")}><ArrowLeft /></button>
            </div>
            <h1>{board.title}</h1>
            <div className="flex flex-col py-2 500px:flex-row md:self-center gap-4 *:px-4 *:py-2 *:rounded-sm *:border *:border-primary *:flex *:gap-4 *:justify-center">
                <button onClick={()=>setaddingCart(true)}> <Plus /> Add Card</button>
                <button onClick={()=>deleteBoard()}> <Trash /> Delete Board</button>
            </div>
            {/* create Cart form */}
            {addingCart && (
                    <form onSubmit={(e)=>handleCreateCart(e)} className = "flex flex-col gap-4 max-w-screen-500px">
                        <input className="bg-primary text-dark px-2 py-1 rounded-sm placeholder:text-gray-600 outline-none" onChange={(e)=>setNewCartTitle(e.target.value)} placeholder="Card Title" value={newCartTitle} />
                        <div className="flex gap-2 *:grow *:px-4 *:py-2 *:rounded-sm *:border *:border-primary">
                            <button type="button" onClick={()=>setaddingCart(false)}>cancle</button>
                            <button type="submit" >submit</button>
                        </div>
                    </form>
            )}
        </div>
        {/* cart list  */}
        <div className = "grid gap-2 grid-cols-1 500px:grid-cols-2 md:grid-cols-3">
            {
                columns.map((column)=>(
                    <div className={`flex flex-col flex-wrap gap-4 items-start bg-dark-lighter rounded-sm p-4 ${draggingCart ? "border-2 border-dashed border-primary/50" : ""}`} key={column.id} onDragOver={handleDragOver} onDrop={()=>handleDrop(column.id as Card["status"])}>
                        <h2 className="text-primary text-2xl font-extrabold">{column.title}</h2>
                        <div className = "flex flex-wrap gap-2 *:bg-primary-light *:text-dark *:p-4 *:rounded-sm *:space-y-2">
                            {board && board.cards && board.cards.filter(card=>card.status === column.id).map((card)=>(
                                <div key = {card.id} draggable onDragStart={()=>handleDragStart(card)} onClick={()=>navigate(`/boards/${boardId}/card/${card.id}`)} className={`cursor-move ${draggingCart?.id === card.id ? "opacity-50" : ""}` }>
                                    <h3>{card.title}</h3>
                                    <p>{new Date(card.createAt).toLocaleDateString()}</p>
                                    {/* Add more card details here */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
            {/* { cards && cards.map((cart)=>{})} */}
        </div>
    </section>) : (
    <section className="grid justify-center gap-8">
        <h1 className="text-2xl text-primary font-bold text-center">Board not found!</h1>
        <button className="border border-primary px-4 py-2 rounded-sm" onClick={()=>navigate("/boards")}>Go to Home</button>
    </section>)
}