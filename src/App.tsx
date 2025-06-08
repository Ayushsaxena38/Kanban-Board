import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFoundPage from "./pages/NotFountPage";
import BoardList from "./pages/BoardList";
import BoardDetails from "./pages/BoardDetails";
import CardDetails from "./pages/CardDetails";
import {store} from "./store";
import { Provider } from "react-redux";


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
  return (<Provider store={store}><RouterProvider router = {router} /></Provider>)
}