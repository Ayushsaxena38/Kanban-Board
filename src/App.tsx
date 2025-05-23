import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFoundPage from "./pages/NotFountPage";
import BoardList from "./pages/BoardList";
import BoardDetails from "./pages/BoardDetails";
import CardDetails from "./pages/CardDetails";


const routes = [
  {
    path:"/",
    element : <Layout />,
    errorElement : <NotFoundPage />,
    children : [
      {
        path:"/",
        element : <BoardList />
      },
      {
        path:"/boards",
        element : <BoardList />
      },
      {
        path:"/boards/:boardId",
        element: <BoardDetails />
      },
      {
        path:"/boards/:boardId/card/:cardId",
        element:<CardDetails />
      }
    ]
  }
]

const router = createBrowserRouter(routes);

export default function App(){
  return <RouterProvider router = {router} />
}