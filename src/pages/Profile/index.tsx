import { useEffect, useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import LoadingMessage from '../Login/Loading';

function Profile() {
  const [userInfo, setUserinfo] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    async function handleUserInfo() {
      setLoading(true);
      const getUserInfo = await getUser();
      setUserinfo(getUserInfo);
      setLoading(false);
    }
    handleUserInfo();
  }, []);

  return (
    <div className="profile-section">
      {loading && <LoadingMessage />}
      <h1>{userInfo?.name}</h1>
      <h2>{userInfo?.email}</h2>
      <h3>{userInfo?.description}</h3>
      <img src={ userInfo?.image } alt="profile" data-testid="profile-image" />
      <Link to="/profile/edit">Editar perfil </Link>
    </div>
  );
}

export default Profile;
