import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import { UserType } from '../types';
import LoadingMessage from '../pages/Login/Loading';
import LoadingContext from '../context/LoadingContext';

function ProfileEdit() {
  const [userInfo, setUserinfo] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  const [loading, setLoading] = useState<boolean>();
  const { isLoadingName } = useContext(LoadingContext);
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  useEffect(() => {
    async function handleUserInfo() {
      setLoading(true);
      const getUserInfo = await getUser();
      setUserinfo(getUserInfo);
      setLoading(false);
    }
    handleUserInfo();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isOkay = await updateUser(userInfo);
    navigate('/profile');
    console.log(isOkay);
  }

  function handlechangeForm(event:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setUserinfo({
      ...userInfo,
      [name]: value,
    });
  }
  return (
    <div className="edit-profile-div">
      { loading ? <LoadingMessage /> : (
        <form onSubmit={ handleSubmit }>
          <section>
            <img
              alt="profile"
              src={ userInfo.image
                ? userInfo.image : '/src/images/icon_profile.svg' }
            />
            <input
              type="text"
              name="image"
              id="image-link"
              value={ userInfo?.image }
              required
              placeholder="Insira um link"
              data-testid="edit-input-image"
              onChange={ handlechangeForm }
            />
          </section>
          <label>
            Nome:
            <input
              value={ userInfo?.name }
              name="name"
              required
              data-testid="edit-input-name"
              onChange={ handlechangeForm }
            />
          </label>
          <label>
            E-mail:
            <input
              value={ userInfo?.email }
              name="email"
              required
              data-testid="edit-input-email"
              onChange={ handlechangeForm }
            />
          </label>

          <label>
            Descrição:
            <textarea
              value={ userInfo?.description }
              name="description"
              required
              data-testid="edit-input-description"
              onChange={ handlechangeForm }
            />
          </label>
          <button
            data-testid="edit-input-image"
            disabled={ userInfo.name.trim() === ''
            || userInfo.email.trim() === ''
            || userInfo.image.trim() === ''
            || userInfo.description.trim() === ''
            || !regexEmail.test(userInfo.email) }
          >
            SALVAR
          </button>

        </form>) }
      {/* {loading && <LoadingMessage />} */}
      {/* <form onSubmit={ handleSubmit }>
        <section>
          <img
            alt="profile"
            src={ userInfo.image
              ? userInfo.image : '/src/images/icon_profile.svg' }
          />
          <input
            type="text"
            name="image"
            id="image-link"
            value={ userInfo?.image }
            required
            placeholder="Insira um link"
            data-testid="edit-input-image"
            onChange={ handlechangeForm }
          />
        </section>
        <label>
          Nome
          <input
            value={ userInfo?.name }
            name="name"
            required
            data-testid="edit-input-name"
            onChange={ handlechangeForm }
          />
        </label>
        <label>
          E-mail
          <input
            value={ userInfo?.email }
            name="email"
            required
            data-testid="edit-input-email"
            onChange={ handlechangeForm }
          />
        </label>

        <label>
          Descrição
          <textarea
            value={ userInfo?.description }
            name="description"
            required
            data-testid="edit-input-description"
            onChange={ handlechangeForm }
          />
        </label>
        <button
          data-testid="edit-input-image"
          disabled={ userInfo.name.trim() === ''
            || userInfo.email.trim() === ''
            || userInfo.image.trim() === ''
            || userInfo.description.trim() === ''
            || !regexEmail.test(userInfo.email) }
        >
          SALVAR
        </button>
      </form> */}
    </div>
  );
}

export default ProfileEdit;
