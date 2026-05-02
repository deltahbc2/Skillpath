"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { ChevronsLeft, Menu } from "lucide-react";
import SideBar from "./_components/sidebar";
import { usePathname } from "next/navigation";

const Layout = ({
    children
}: {
    children: ReactNode;
}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const updateState = () => {
            setIsCollapsed(!mediaQuery.matches);
        };

        updateState();
        mediaQuery.addEventListener("change", updateState);

        return () => mediaQuery.removeEventListener("change", updateState);
    }, []);

    useEffect(() => {
        if (window.matchMedia("(min-width: 768px)").matches) return;

        setIsCollapsed(true);
    }, [pathname]);

    const leftPosClass = useMemo(() => (isCollapsed ? "left-4 md:left-24" : "left-[85%] md:left-[19rem]"), [isCollapsed]);

    return (
        <section className="relative flex overflow-hidden">
            <SideBar isCollapsed={isCollapsed} />

            <button
                type="button"
                onClick={() => setIsCollapsed((prev) => !prev)}
                title={isCollapsed ? "Abrir menú" : "Cerrar menú"}
                aria-label={isCollapsed ? "Abrir menú" : "Cerrar menú"}
                className={`${leftPosClass} fixed top-4 z-100 rounded-lg border border-neutral-200 bg-white p-2 text-neutral-700 hover:bg-neutral-100 transition-colors shadow-sm`}
            >
                {isCollapsed ? <Menu className="size-4" /> : <ChevronsLeft className="size-4" />}
            </button>

            <main className="flex-1 min-w-0 pt-8 md:pt-4 min-h-screen">
                {children}
            </main>
        </section>
    );
}

export default Layout;