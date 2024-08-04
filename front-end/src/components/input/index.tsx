import "./style.css";

interface InputProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  title?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  id,
  className,
  title,
  placeholder,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <input
        value={value}
        onChange={onChange}
        id={id}
        className={className}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
