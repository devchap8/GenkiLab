import { Outlet } from "react-router";
import HeaderBar from "./HeaderBar";

export default function Layout() {
    return (
        <div className="flex flex-col h-full">
            <HeaderBar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}