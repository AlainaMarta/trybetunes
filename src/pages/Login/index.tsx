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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    createUser({ name: loginName })
      .then(() => {
        setLoading(false);
        navigate('/search');
      });
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
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
    </div>
  );
}

export default Login;
