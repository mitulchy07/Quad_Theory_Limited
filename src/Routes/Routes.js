import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import NewItem from "../Components/NewItem/NewItem";
import Main from "../Components/Main/Main";


export const routes = createBrowserRouter([
    {
        path: "/",
    element: <Home></Home>,
    children: [
        {
            path: "/",
            element: <Main></Main>

        },
        {
            path: "/newitem",
            element: <NewItem></NewItem>,
        },
    ]
    },
    {
        path: "*",
        element: <h1 className="text-center text-6xl text-bold">Not found</h1>,
    
    }

])