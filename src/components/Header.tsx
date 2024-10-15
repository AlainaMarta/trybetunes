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
    <div className="header-div">
      <img className="logo" src="/src/images/logo.svg" alt="Logo" />
      {isLoadingName ? <LoadingMessage />
        : (
          <header className="side-bar" data-testid="header-component">
            <p data-testid="header-user-name">
              Olá,
              {' '}
              {userInfo}
            </p>
            <nav>
              <NavLink
                to="/search"
                data-testid="link-to-search"
                className={ ({ isActive }) => (isActive ? 'active' : '') }
              >
                <img src="/src/images/icon_search.svg" alt="icon search" />
                {'  '}
                Pesquisar
              </NavLink>
              {' '}
              <NavLink
                to="/favorites"
                data-testid="link-to-favorites"
                className={ ({ isActive }) => (isActive ? 'active' : '') }
              >
                <img src="/src/images/empty_heart.png" alt="icon heart" />
                {'  '}
                Favoritas
              </NavLink>
              {' '}
              <NavLink
                to="/profile"
                data-testid="link-to-profile"
                className={ ({ isActive }) => (isActive ? 'active' : '') }
              >
                <img src="/src/images/icon_profile.svg" alt="icon profile" />
                {'  '}
                Perfil
                <span />
              </NavLink>
              {' '}
            </nav>
          </header>
        )}
    </div>

  );
}

export default Header;
