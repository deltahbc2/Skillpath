"use client";

import React from "react";

type Props = {
  title?: string;
  description?: string;
  cta?: React.ReactNode;
};

const EmptyState = ({ title = "Sin resultados", description = "No se encontraron elementos.", cta }: Props) => {
  return (
    <div className="p-12 text-center">
      <p className="text-lg font-semibold text-neutral-700 mb-2">{title}</p>
      <p className="text-sm text-neutral-500 mb-4">{description}</p>
      {cta && <div>{cta}</div>}
    </div>
  );
};

export default EmptyState;
