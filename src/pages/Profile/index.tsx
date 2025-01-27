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
    <div className="profile-container">
      {loading ? <LoadingMessage /> : (
        <section>
          <img
            src={ userInfo?.image
              ? userInfo.image : '/src/images/icon_profile.svg' }
            alt="profile"
            data-testid="profile-image"
          />
          <Link id="link" to="/profile/edit">Editar perfil </Link>
          <h3 id="name-title">
            Nome:
            {' '}
          </h3>
          <p id="name">{userInfo?.name}</p>
          <h3 id="email-title">
            Email:
            {' '}
          </h3>
          <p id="email">{userInfo?.email}</p>
          <h3 id="description-title">
            Descrição:
            {' '}
          </h3>
          <p id="description">{userInfo?.description}</p>

        </section>
      )}
    </div>
  );
}

export default Profile;
