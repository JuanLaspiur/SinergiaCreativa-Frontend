import InputField from "../commons/InputField";

const RegisterForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Aquí iría la lógica para enviar el registro
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <InputField
        id="registerEmail"
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <InputField
        id="registerPassword"
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
      />
        <button type="submit" className="btn btn-primary w-100">Regístrate</button>
      </form>
    );
  };
  
  export default RegisterForm;
  