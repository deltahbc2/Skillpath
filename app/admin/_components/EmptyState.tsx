"use client";

import React from "react";

type Props = {
  title?: string;
  description?: string;
  cta?: React.ReactNode;
};

const EmptyState = ({ title = "Sin resultados", description = "No se encontraron elementos.", cta }: Props) => {
  return (
    <div className="bg-white dark:bg-neutral-800 p-12 text-center rounded-3xl border border-neutral-100 dark:border-neutral-700">
      <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{title}</p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{description}</p>
      {cta && <div>{cta}</div>}
    </div>
  );
};

export default EmptyState;
