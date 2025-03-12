import React from 'react';
import useLogin from '../../hooks/useLogin';
import InputField from '../commons/InputField';
import Button from '../commons/Button';


interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading:boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const { email, setEmail, password, setPassword } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
       <InputField
        id="loginEmail"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        id="loginPassword"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
  <Button label="Login" type="submit" isLoading={isLoading} />
    </form>
  );
};

export default LoginForm;
