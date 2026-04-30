export type Colaborador = {
  id: string;
  nombre: string;
  puesto: string;
  email: string;
  telefono?: string;
  avatar?: string;
  progreso: number; // 0-100
  estado: "activo" | "inactivo";
  ingreso: string; // ISO date
};

export type Puesto = {
  id: string;
  nombre: string;
  descripcion?: string;
  habilidades: string[];
  colaboradores: number;
  creado: string; // ISO date
};

export type Roadmap = {
  id: string;
  titulo: string;
  descripcion?: string;
  pasos: number;
  publicado: boolean;
};

export const colaboradores: Colaborador[] = [
  {
    id: "c-1",
    nombre: "Elena Rojas",
    puesto: "Product Designer",
    email: "elena.rojas@skillpath.ai",
    telefono: "+52 55 1234 5678",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    progreso: 92,
    estado: "activo",
    ingreso: "2025-03-12",
  },
  {
    id: "c-2",
    nombre: "Andrés Pérez",
    puesto: "Desarrollador Front End",
    email: "andres.perez@skillpath.ai",
    telefono: "+52 55 8765 4321",
    avatar: "/user.png",
    progreso: 68,
    estado: "activo",
    ingreso: "2025-02-01",
  },
  {
    id: "c-3",
    nombre: "María Gómez",
    puesto: "Desarrollador Back End",
    email: "maria.gomez@skillpath.ai",
    avatar: "/user.png",
    progreso: 54,
    estado: "inactivo",
    ingreso: "2024-11-20",
  },
];

export const puestos: Puesto[] = [
  {
    id: "p-1",
    nombre: "Desarrollador Front End",
    descripcion: "Desarrollo de interfaces y componentes reutilizables",
    habilidades: ["React", "TypeScript", "Tailwind", "Next.js"],
    colaboradores: 3,
    creado: "2025-01-15",
  },
  {
    id: "p-2",
    nombre: "Desarrollador Back End",
    descripcion: "APIs y arquitectura de servidores",
    habilidades: ["Node.js", "SQL", "Docker"],
    colaboradores: 2,
    creado: "2025-01-10",
  },
  {
    id: "p-3",
    nombre: "Product Designer",
    descripcion: "UX/UI y diseño de productos",
    habilidades: ["Figma", "Prototyping", "Research"],
    colaboradores: 1,
    creado: "2025-01-20",
  },
];

export const roadmaps: Roadmap[] = [
  {
    id: "r-1",
    titulo: "Onboarding Front End",
    descripcion: "Roadmap básico para nuevos desarrolladores front-end",
    pasos: 8,
    publicado: true,
  },
  {
    id: "r-2",
    titulo: "Backend Fundamentals",
    descripcion: "Introducción a servidores, APIs y bases de datos",
    pasos: 12,
    publicado: false,
  },
];
