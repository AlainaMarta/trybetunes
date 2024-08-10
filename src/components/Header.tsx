import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from '../pages/Login/Loading';
import LoadingContext from '../context/LoadingContext';

function Header() {
  const [userInfo, setUserInfo] = useState('');
  const { isLoadingName, changeIsloadingName } = useContext(LoadingContext);

  useEffect(() => {
    async function handleGetUser() {
      changeIsloadingName(true);
      const resultName = await getUser();
      const { name } = resultName;
      changeIsloadingName(false);
      setUserInfo(name);
    }
    handleGetUser();
  }, []);

  return (
    <div>
      {/* <img className="logo" src="src/images/logo.svg" alt="Logo" /> */}
      {isLoadingName ? <LoadingMessage />
        : (
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
