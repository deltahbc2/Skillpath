import { LoaderCircle } from "lucide-react";

type SpinnerProps = {
  className?: string;
  label?: string;
};

const Spinner = ({ className = "size-5", label = "Cargando" }: SpinnerProps) => {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`inline-flex items-center justify-center text-neutral-500 ${className}`}
    >
      <LoaderCircle className="size-full animate-spin" />
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Spinner;