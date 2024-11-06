import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album/AlbumComp';
import Layout from './components/LayoutComp';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Route>
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default RoutesComponent;
