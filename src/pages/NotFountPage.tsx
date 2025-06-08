import { Home } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function NotFoundPage(){
    const navigate = useNavigate();
    const err:any = useRouteError();
    return (
        <section className = "flex flex-col gap-6 items-center p-16" >
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="text-xl text-gray-400">Page Not Found</p>
            {err && err.statusText &&<p className="text-2xl text-gray-400">{err.status}:{err.statusText}</p>}
            <button onClick={()=>navigate("/boards")} className="flex items-center gap-4">
                <Home className="size-12" />
                Back to Boards
            </button>
        </section>
    )
}