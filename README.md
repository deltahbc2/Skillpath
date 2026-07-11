# Skillpath

Skillpath es una plataforma web de aprendizaje y capacitacion para puestos de trabajo. Combina un landing page publico con un panel de administracion para gestionar colaboradores, puestos, habilidades y roadmaps de aprendizaje generados con IA.

## Que hace

- Presenta una landing page para el acceso y la propuesta de valor del producto.
- Permite autenticacion con Clerk.
- Guarda y consulta datos en Convex.
- Administra colaboradores, puestos, habilidades, lecciones y quizzes.
- Genera roadmaps de aprendizaje con Groq a partir de una habilidad, un rol y una descripcion.
- Extrae texto desde archivos PDF para cargar informacion de forma mas rapida.
- Sube archivos publicos con EdgeStore.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Convex
- Clerk
- EdgeStore
- Groq SDK
- pdfjs-dist
- Sonner
- Zod

## Requisitos

- Node.js 20 o superior
- npm
- Cuenta y proyecto en Convex
- Cuenta y aplicacion en Clerk
- API key de Groq

## Variables de entorno

Crea un archivo `.env.local` en la raiz del proyecto con, al menos, estas variables:

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
GROQ_API_KEY=
```

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre `http://localhost:3000` para ver la aplicacion.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo
- `npm run build`: construye la aplicacion para produccion
- `npm run start`: levanta la aplicacion compilada
- `npm run lint`: ejecuta ESLint

## Convex

Este proyecto usa Convex como backend principal. Si cambias el schema o las funciones, sincroniza el despliegue con la CLI de Convex.

```bash
npx convex dev
```

## Rutas principales

- `/`: landing page publica
- `/roadmap`: vista de roadmap de aprendizaje
- `/admin`: panel de administracion
- `/admin/colaboradores`: listado de colaboradores
- `/admin/puestos`: listado de puestos
- `/api/generate-roadmap`: genera roadmaps con IA
- `/api/extractTextPDF`: extrae texto desde un PDF

## Estructura del proyecto

- `app/`: paginas, layouts y rutas API
- `components/`: componentes reutilizables
- `convex/`: schema, queries y mutations
- `providers/`: providers globales
- `lib/`: utilidades e integraciones
- `data/`: datos de apoyo y fixtures
- `utils/`: helpers de negocio
- `public/`: assets estaticos

## Notas

- El acceso al panel admin depende de Clerk y del usuario interno en Convex.
- La generacion de roadmaps usa el modelo configurado en `app/api/generate-roadmap/route.ts`.
- La extraccion de PDF se procesa del lado del servidor con `pdfjs-dist`.