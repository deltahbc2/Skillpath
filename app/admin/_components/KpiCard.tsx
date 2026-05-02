"use client";

import React from "react";

type Props = {
  title: string;
  value: string | number;
  delta?: string | number;
  icon?: React.ReactNode;
};

const KpiCard = ({ title, value, delta, icon }: Props) => {
  return (
    <div className="rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-800 p-4 shadow-sm flex items-center gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-default-100/10 text-default-300">{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold">{title}</div>
        <div className="text-lg font-bold text-neutral-900 dark:text-neutral-200">{value}</div>
      </div>
      {delta !== undefined && (
        <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{delta}</div>
      )}
    </div>
  );
};

export default KpiCard;
