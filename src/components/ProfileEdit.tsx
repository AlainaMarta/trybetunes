import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import LoadingMessage from '../pages/Login/Loading';

function ProfileEdit() {
  const [userInfo, setUserinfo] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    async function handleUserInfo() {
      setLoading(true);
      const getUserInfo = await getUser();
      setUserinfo(getUserInfo);
      setLoading(false);
    }
    handleUserInfo();
  }, []);

  function handlechangeForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserinfo({
      ...userInfo,
      [name]: value,
    });
  }
  return (
    <div className="edit-profile-div">
      {loading && <LoadingMessage />}
      <form>
        <label>
          Nome
          <input
            value={ userInfo?.name }
            name="name"
            required
            data-testid="edit-input-name"
          />
        </label>
        <label>
          E-mail
          <input
            value={ userInfo?.email }
            name="email"
            required
            data-testid="edit-input-email"
          />
        </label>
        <label>
          Descrição
          <textarea
            value={ userInfo?.description }
            name="description"
            required
            data-testid="edit-input-description"
          />
        </label>
        <input
          type="text"
          name="image"
          id="image-link"
          value={ userInfo?.image }
          required
          placeholder="Insira um link"
          data-testid="edit-input-image"
        />
        <button data-testid="edit-input-image" disabled>SALVAR</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
