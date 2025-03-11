import { useState } from 'react';

const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return {
    email,
    setEmail,
    password,
    setPassword,
  };
};

export default useLogin;
