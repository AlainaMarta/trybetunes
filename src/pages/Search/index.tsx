import { useContext, useState } from 'react';
import './search.css';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import LoadingMessage from '../Login/Loading';
import AlbunsListComp from '../../components/AlbunsListComp';
import LoadingContext from '../../context/LoadingContext';

function Search() {
  const [nameArtistOrBand, setNameArtistOrBAnd] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoadingName } = useContext(LoadingContext);
  const [albunsResults, setAlbunsRestults] = useState<AlbumType[]>();
  const [valueInput, setValueInput] = useState('');

  function handleNameArtistOrBand(event: React.ChangeEvent<HTMLInputElement>) {
    setNameArtistOrBAnd(event.target.value);
  }

  async function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameArtistOrBAnd('');
    setLoading(true);
    const resultsAlbum = await searchAlbumsAPI(nameArtistOrBand);
    setValueInput(nameArtistOrBand);
    setLoading(false);
    setAlbunsRestults(resultsAlbum);
  }

  // async function handleSearchButton() {
  //   setNameArtistOrBAnd('');
  //   setLoading(true);
  //   const resultsAlbum = await searchAlbumsAPI(nameArtistOrBand);
  //   setValueInput(nameArtistOrBand);
  //   setLoading(false);
  //   setAlbunsRestults(resultsAlbum);
  // }

  return (
    <section className="search-bar">
      {isLoadingName ? <LoadingMessage /> : (
        <div className="form-div">

          <form onSubmit={ handleSubmitSearch }>
            <input
              type="text"
              id="search-artist"
              data-testid="search-artist-input"
              placeholder="Nome do artista/banda"
              value={ nameArtistOrBand }
              onChange={ handleNameArtistOrBand }
            />
            <button
              data-testid="search-artist-button"
              disabled={ nameArtistOrBand.length < 2 }
              type="submit"
            >
              Pesquisar

            </button>
          </form>

        </div>
      )}
      {/* <LoadingMessage /> */}
      {/* { loading && <LoadingMessage /> } */}
      { albunsResults && <AlbunsListComp
        albunsResults={ albunsResults }
        valueInputAlbuns={ valueInput }
      />}
    </section>
  );
}

export default Search;
