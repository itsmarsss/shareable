import "./style.css";

interface ButtonProps {
  id?: string;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  id,
  onClick,
  children,
  className,
}) => {
  return (
    <button id={id} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
