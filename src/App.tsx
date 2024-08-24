import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import RoutesComponent from './Routes';

function App() {
  const location = useLocation();
  const classNameLogin = 'login-page';

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add(classNameLogin);
    } else {
      document.body.classList.remove(classNameLogin);
    }

    // Limpar classes ao desmontar o componente
    return () => {
      document.body.classList.remove(classNameLogin);
    };
  }, [location.pathname]);
  return (
    <RoutesComponent />
  );
}

export default App;
