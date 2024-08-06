import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingMessage from './Loading';
import { createUser } from '../../services/userAPI';
import './login.css';

function Login() {
  const [loginName, setLoginName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const result = await createUser({ name: loginName });
    if (result === 'OK') {
      setLoading(false);
      navigate('/search');
    }
  };

  return (
    <>
      <form onSubmit={ handleSubmit } className="formLogin">
        <input
          type="text"
          id="login-name"
          data-testid="login-name-input"
          placeholder="Nome"
          value={ loginName }
          onChange={ handleLoginChange }
        />
        <button
          type="submit"
          disabled={ loginName.length < 3 }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
      {loading && <LoadingMessage />}
    </>
  );
}

export default Login;
