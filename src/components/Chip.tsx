// src/components/Chip.tsx
type ChipProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Chip({ label, isActive, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition 
        ${
          isActive
            ? "bg-g-terracotta/20 text-g-brick border border-g-brick"
            : "bg-g-bg-alt text-g-muted border border-g-border"
        }`}
    >
      {label}
    </button>
  );
}
