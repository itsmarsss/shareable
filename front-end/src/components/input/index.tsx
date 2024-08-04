import "./style.css";

interface InputProps {
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    className?: string;
    title?: string;
    placeholder?: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    id,
    className,
    title,
    placeholder,
    type,
}) => {
    return (
        <>
            {title ? <h2>{title}</h2> : null}
            <input
                value={value}
                onChange={onChange}
                id={id}
                className={className}
                placeholder={placeholder}
                type={type}
            />
        </>
    );
};

export default Input;
