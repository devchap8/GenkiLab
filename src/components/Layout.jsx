import { Outlet, ScrollRestoration } from "react-router";
import HeaderBar from "./HeaderBar";

export default function Layout() {
    return (
        <div className="flex flex-col h-full relative bg-bg-main">
            <ScrollRestoration />
            <HeaderBar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}