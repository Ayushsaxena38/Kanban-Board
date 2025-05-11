import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFoundPage from "./pages/NotFountPage";


const routes = [
  {
    path:"/",
    element : <Layout />,
    errorElement : <NotFoundPage />,
    children : [
      // {
      //   path:"/",
      //   element : <BoardList />
      // },
      // {
      //   path:"/boards",
      //   element : <BoardLIst />
      // },
      // {
      //   path:"/boards/:boardId",
      //   element: <boardDetail />
      // },
      // {
      //   path:"/boards/:boardId/card/:cardId",
      //   element:<cardDetail />
      // }
    ]
  }
]

const router = createBrowserRouter(routes);

export default function App(){
  return <RouterProvider router = {router} />
}