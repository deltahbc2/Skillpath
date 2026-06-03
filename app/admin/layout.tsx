"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ChevronsLeft, Menu } from "lucide-react";
import SideBar from "./_components/sidebar";
import { usePathname } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import AccessGateLoading from "./_components/AccessGateLoading";
import AccessDeniedState from "./_components/AccessDeniedState";
import { useUser } from "@clerk/react";

const Layout = ({
    children
}: {
    children: ReactNode;
}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();
    const { isLoaded, isSignedIn, user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase();
    const canLookupUser = isLoaded && isSignedIn && Boolean(email);
    const currentUser = useQuery(
        api.users.getCurrentUserByEmail,
        canLookupUser ? { email: email! } : "skip"
    );
    const leftPosClass = useMemo(() => (isCollapsed ? "left-4 md:left-24" : "left-[85%] md:left-[19rem]"), [isCollapsed]);

    const mainClass = useMemo(() => {
        return `flex-1 min-w-0 pt-8 md:pt-4 min-h-screen ${isCollapsed ? 'md:ml-24' : 'md:ml-[19rem]'}`;
    }, [isCollapsed]);

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

    if (!isLoaded || (canLookupUser && currentUser === undefined)) {
        return <AccessGateLoading />;
    }

    if (!isSignedIn || !email || !currentUser) {
        return <AccessDeniedState />;
    }

    return (
        <section className="relative flex overflow-hidden">
            <SideBar isCollapsed={isCollapsed} />

            <button
                type="button"
                onClick={() => setIsCollapsed((prev) => !prev)}
                title={isCollapsed ? "Abrir menú" : "Cerrar menú"}
                aria-label={isCollapsed ? "Abrir menú" : "Cerrar menú"}
                className={`${leftPosClass} fixed top-4 z-50 rounded-lg border border-neutral-200 bg-white p-2 text-neutral-700 hover:bg-neutral-100 transition-colors shadow-sm`}
            >
                {isCollapsed ? <Menu className="size-4" /> : <ChevronsLeft className="size-4" />}
            </button>

            <main className={mainClass}>
                {children}
            </main>
        </section>
    );
}

export default Layout;