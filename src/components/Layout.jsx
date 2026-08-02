import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <div className="flex flex-col h-full">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}