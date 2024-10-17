import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <>
      {/* <img className="logo" src="src/images/logo.svg" alt="Logo" /> */}
      <Header />
      <Outlet />
    </>

  );
}

export default Layout;
