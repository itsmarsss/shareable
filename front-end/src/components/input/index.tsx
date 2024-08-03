import "./style.css";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string; // Optional className
}

const Input: React.FC<InputProps> = ({ value, onChange, id, className }) => {
  return (
    <input value={value} onChange={onChange} id={id} className={className} />
  );
};

export default Input;
