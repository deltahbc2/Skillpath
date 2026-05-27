"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import KpiCard from "./_components/KpiCard";
import SearchInput from "./_components/SearchInput";
import EmptyState from "./_components/EmptyState";
import Spinner from "@/components/Spinner";
import { colaboradores as colaboradoresFixture } from "../../data/fixtures";
import { Users, Briefcase, Calendar, UserPlus } from "lucide-react";
import Skeleton from "@/components/Skeleton";

const RoleRow = ({ role }: { role: any }) => {
    const skills = useQuery(api.skills.getSkillsByRoleId, { roleId: role._id });

    return (
        <>
            {skills === undefined ? (
                <Spinner/>
            ) : (
                // cambiar por cantidad de colaboradores
                <span className="px-2 py-1 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 text-neutral-700 text-xs rounded-full">{skills.length}</span>
            )}
        </>
    )
};

const AdminPage = () => {
    const roles = useQuery(api.roles.getRoles);
    
    const [q, setQ] = useState("");

    const totalColaboradores = colaboradoresFixture.length;

    const promedioProgreso = useMemo(() => {
        if (colaboradoresFixture.length === 0) return 0;
        const sum = colaboradoresFixture.reduce((s, c) => s + c.progreso, 0);
        return Math.round(sum / colaboradoresFixture.length);
    }, []);

    const nuevasIncorporaciones = useMemo(() => {
        const now = new Date();
        const days30 = new Date(now);
        days30.setDate(now.getDate() - 30);
        return colaboradoresFixture.filter(c => new Date(c.ingreso) >= days30).length;
    }, []);

    const colaboradoresFiltrados = colaboradoresFixture.filter(c =>
        c.nombre.toLowerCase().includes(q.toLowerCase()) || c.puesto.toLowerCase().includes(q.toLowerCase())
    );

    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4">
                <div className="flex flex-col mb-4 md:mb-0">
                    <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-200">Panel de Administración</h2>
                    <h3 className="text-md font-medium text-neutral-500">Resumen general de colaboradores, puestos y roadmaps.</h3>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/colaboradores/nuevo" className="py-2 px-3 bg-default-300 hover:bg-[#30aa8580] text-white rounded-md">Añadir Colaborador</Link>
                    <Link href="/admin/puestos/nuevo" className="py-2 px-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 rounded-md">Añadir Puesto</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <KpiCard title="Total Colaboradores" value={totalColaboradores} icon={<Users className="size-5"/>} />

                {roles === undefined ? (
                    <div className="w-full flex items-center justify-center">
                        <Spinner label="Cargando puestos..." className="size-8"/>
                    </div>
                ) : (
                    <KpiCard title="Total Puestos" value={roles.length} icon={<Briefcase className="size-5"/>} />
                )}

                <KpiCard title="Promedio Progreso" value={`${promedioProgreso}%`} icon={<Calendar className="size-5"/>} />
                <KpiCard title="Nuevas incorporaciones (30d)" value={nuevasIncorporaciones} icon={<UserPlus className="size-5"/>} />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-800 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Colaboradores</h4>
                        <div className="w-64"><SearchInput value={q} onChange={setQ} placeholder="Buscar por nombre o puesto..." /></div>
                    </div>

                    {colaboradoresFiltrados.length === 0 ? (
                        <EmptyState title="No hay colaboradores" description="No se encontraron colaboradores con esos criterios." cta={<Link href="/admin/colaboradores/nuevo" className="text-default-300">Crear colaborador</Link>} />
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {colaboradoresFiltrados.map(c => (
                                <li key={c.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <img src={c.avatar ?? ''} alt={c.nombre} className="size-10 rounded-xl object-cover border border-neutral-200" />
                                        <div className="flex flex-col">
                                            <div className="font-semibold text-neutral-900 dark:text-neutral-200">{c.nombre}</div>
                                            <div className="text-xs text-neutral-500 dark:text-neutral-400">{c.puesto} — {c.email}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">{c.progreso}%</div>
                                        <Link href={`/admin/colaboradores/${c.id}`} className="text-sm text-default-300">Ver</Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="md:w-96 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-800 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Puestos</h4>
                        <Link href="/admin/puestos" className="text-sm text-neutral-500 dark:text-neutral-400">Ver todos</Link>
                    </div>

                    <ul className="flex flex-col gap-3">
                        {roles === undefined ? (
                            <div className="w-full flex items-center justify-center">
                                <Skeleton/>
                            </div>
                        ) : (
                            <>
                                {roles.map(role => (
                                    <li key={role._id} className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="font-semibold text-neutral-900 dark:text-neutral-200">{role.name}</div>
                                            <div className="text-xs text-neutral-500 dark:text-neutral-400">{role.description}</div>
                                    </div>
                                    <div className="text-right">
                                        <RoleRow role={role} />
                                        {/* <div className="text-sm font-medium">{role.colaboradores}</div> */}
                                    </div>
                                </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
 
export default AdminPage;