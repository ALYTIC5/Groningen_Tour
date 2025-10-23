// src/components/Button.tsx
type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({ label, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-g-primary text-white px-4 py-2 rounded-2xl text-sm font-medium hover:bg-g-success transition"
    >
      {label}
    </button>
  );
}
