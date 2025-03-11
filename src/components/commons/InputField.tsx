interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    value = '',
    placeholder = '',
    required = false,
    onChange,
  }) => {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  };
  
  export default InputField;
  