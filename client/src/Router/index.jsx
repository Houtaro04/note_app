import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../Pages/ErrorPage";
import NoteList from "../../components/NoteList";
import Note from "../../components/Note";
import { addNewNote, noteLoader, notesLoader, updateNote } from "../../utils/noteUtils";
import { foldersLoader } from "../../utils/folderUtils";

const AuthLayout = () => {
    return <AuthProvider><Outlet /></AuthProvider>
}

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Login />,
                path: '/login',
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                    element: <Home />, 
                    path: '/',
                    loader: foldersLoader,
                    children: [
                        {
                            element: <NoteList />,
                            path: `folders/:folderId`,
                            action: addNewNote,
                            loader: notesLoader,
                            children: [
                                {
                                    element: <Note />,
                                    path: `note/:noteId`,
                                    action: updateNote,
                                    loader: noteLoader,
                                }
                            ]
                        }
                    ]
                    }
                ]
            }
        ]
    }
])