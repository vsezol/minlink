interface InputTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputText = ({ value, onChange, placeholder }: InputTextProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full mb-4 text-white"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
