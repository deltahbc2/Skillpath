"use client";

import { Briefcase, LayoutDashboard, LogOut, Route, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type SideBarProps = {
    isCollapsed: boolean;
};

const SideBar = ({ isCollapsed }: SideBarProps) => {
    const pathname = usePathname();
    
    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(href);
    };

    const asideWidthClass = useMemo(() => {
        return isCollapsed ? "w-0 md:w-22" : "fixed inset-y-0 left-0 z-30 w-full md:fixed md:top-0 md:left-0 md:w-72";
    }, [isCollapsed]);

    return (
        <aside className={`${asideWidthClass} bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-300 dark:border-neutral-700 flex flex-col h-screen shrink-0 transition-all duration-300 overflow-hidden`}>
            <div className="h-20 flex items-center px-4 border-b border-neutral-300 dark:border-neutral-700 justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="rounded-lg bg-default-100 flex items-center justify-center p-1 shrink-0">
                        <Route className="size-7 text-white"/>
                    </div>
                    {!isCollapsed && <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-300 tracking-tight truncate">SkillPath</span>}
                </div>
            </div>

            <div className={`flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 ${isCollapsed ? "items-center" : ""}`}>
                {!isCollapsed && <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Menú</p>}

                <Link
                    href="/admin"
                    title={isCollapsed ? "Dashboard": ''}
                    className={`flex items-center rounded-xl font-medium transition-colors ${
                        isActive("/admin")
                            ? "bg-[#5cbb80]/20 text-neutral-900 dark:text-neutral-300"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-[#5cbb80]/20 hover:text-neutral-900 dark:hover:text-neutral-300"
                    } ${isCollapsed ? "justify-center w-12 h-12 p-0" : "gap-3 px-4 py-3"}`}
                >
                    <LayoutDashboard/>
                    {!isCollapsed && <span>Dashboard</span>}
                </Link>
                <Link
                    href="/admin/puestos"
                    title={isCollapsed ? "Puestos" : ''}
                    className={`flex items-center rounded-xl font-medium transition-colors ${
                        isActive("/admin/puestos")
                            ? "bg-[#5cbb80]/20 text-neutral-900 dark:text-neutral-300"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-[#5cbb80]/20 hover:text-neutral-900 dark:hover:text-neutral-300"
                    } ${isCollapsed ? "justify-center w-12 h-12 p-0" : "gap-3 px-4 py-3"}`}
                >
                    <Briefcase/>
                    {!isCollapsed && <span>Puestos</span>}
                </Link>
                <Link
                    href="/admin/colaboradores"
                    title={isCollapsed ? "Colaboradores": ''}
                    className={`flex items-center rounded-xl font-medium transition-colors ${
                        isActive("/admin/colaboradores")
                            ? "bg-[#5cbb80]/20 text-neutral-900 dark:text-neutral-300"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-[#5cbb80]/20 hover:text-neutral-900 dark:hover:text-neutral-300"
                    } ${isCollapsed ? "justify-center w-12 h-12 p-0" : "gap-3 px-4 py-3"}`}
                >
                    <User/>
                    {!isCollapsed && <span>Colaboradores</span>}
                </Link>
                <Link
                    href="/admin/roadmaps"
                    title={isCollapsed ? "Roadmaps" : ''}
                    className={`flex items-center rounded-xl font-medium transition-colors ${
                        isActive("/admin/roadmaps")
                            ? "bg-[#5cbb80]/20 text-neutral-900 dark:text-neutral-300"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-[#5cbb80]/20 hover:text-neutral-900 dark:hover:text-neutral-300"
                    } ${isCollapsed ? "justify-center w-12 h-12 p-0" : "gap-3 px-4 py-3"}`}
                >
                    <Route/>
                    {!isCollapsed && <span>Roadmaps</span>}
                </Link>
            </div>

            <div className={`p-4 border-t border-neutral-300 dark:border-neutral-700 flex flex-col gap-2 ${isCollapsed ? "items-center" : ""}`}>
                <a
                    href="#"
                    title="Cerrar Sesión"
                    className={`flex items-center rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors ${isCollapsed ? "justify-center w-12 h-12 p-0" : "gap-3 px-4 py-2.5"}`}
                >
                    <LogOut/>
                    {!isCollapsed && <span>Cerrar Sesión</span>}
                </a>
            </div>
        </aside>
    );
}
 
export default SideBar;