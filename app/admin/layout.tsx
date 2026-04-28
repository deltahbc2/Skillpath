"use client";

import { ReactNode, useMemo, useState } from "react";
import { ChevronsLeft, Menu } from "lucide-react";
import SideBar from "./_components/sidebar";

const Layout = ({
    children
}: {
    children: ReactNode;
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const leftPosClass = useMemo(() => (isCollapsed ? "left-4 md:left-24" : "left-[85%] md:left-[19rem]"), [isCollapsed]);

    return (
        <section className="relative flex min-h-screen overflow-hidden">
            <SideBar isCollapsed={isCollapsed} />

            <button
                type="button"
                onClick={() => setIsCollapsed((prev) => !prev)}
                title={isCollapsed ? "Abrir menú" : "Cerrar menú"}
                aria-label={isCollapsed ? "Abrir menú" : "Cerrar menú"}
                className={`${leftPosClass} absolute top-4 z-20 rounded-lg border border-neutral-200 bg-white p-2 text-neutral-700 hover:bg-neutral-100 transition-colors shadow-sm`}
            >
                {isCollapsed ? <Menu className="size-4" /> : <ChevronsLeft className="size-4" />}
            </button>

            <main className="flex-1 min-w-0">
                {children}
            </main>
        </section>
    );
}

export default Layout;