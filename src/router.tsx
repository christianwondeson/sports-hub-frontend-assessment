import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { MatchDetail } from "./pages/MatchDetail"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/match/:eventId",
        element: <MatchDetail />,
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
