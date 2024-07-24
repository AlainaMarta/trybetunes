import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from '../pages/Login/Loading';

function Header() {
  const [userInfo, setUserInfo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleGetUser() {
      setLoading(true);
      const resultName = await getUser();
      const { name } = resultName;
      setLoading(false);
      setUserInfo(name);
    }
    handleGetUser();
  }, []);
  return (
    <div>
      {loading && <LoadingMessage />}
      {loading === false
      && (
        <header data-testid="header-component">
          <nav>
            <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
            {' '}
            <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
            {' '}
            <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
            {' '}
          </nav>
          <p data-testid="header-user-name">
            Olá
            {' '}
            {userInfo}
          </p>
        </header>
      )}
    </div>

  );
}

export default Header;
