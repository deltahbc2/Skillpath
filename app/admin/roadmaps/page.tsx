const AdminRoadmapsPage = () => {
  return (
    <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-neutral-900">Roadmaps (Administración)</h2>
          <p className="text-sm text-neutral-500">Gestiona los roadmaps de formación para la organización.</p>
        </div>

        <a href="#" className="py-2 px-3 bg-default-300 hover:bg-[#30aa8580] text-white rounded-md">Crear Roadmap</a>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6">
        <p className="text-sm text-neutral-600">Placeholder: aquí iría la lista de roadmaps con opciones de edición y publicación.</p>
      </div>
    </section>
  );
};

export default AdminRoadmapsPage;
