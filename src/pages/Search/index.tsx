import { useState } from 'react';
import './search.css';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import LoadingMessage from '../Login/Loading';

function Search() {
  const [nameArtistOrBand, setNameArtistOrBAnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [albunsResults, setAlbunsRestults] = useState<AlbumType[]>();
  const [valueInput, setValueInput] = useState('');

  function handleNameArtistOrBand(event: React.ChangeEvent<HTMLInputElement>) {
    setNameArtistOrBAnd(event.target.value);
  }

  function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function handleSearchButton() {
    setNameArtistOrBAnd('');
    setLoading(true);
    const resultsAlbum = await searchAlbumsAPI(nameArtistOrBand);
    setValueInput(nameArtistOrBand);
    setLoading(false);
    setAlbunsRestults(resultsAlbum);
  }

  return (
    <div>
      {loading && <LoadingMessage />}
      {loading === false
       && (
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
             onClick={ handleSearchButton }
           >
             Pesquisar

           </button>
         </form>
       ) }
      { albunsResults
       && (
         <p>{`Resultado de álbuns de: ${valueInput}`}</p>
       )}
      { albunsResults && (
        <ul>
          {albunsResults.map((album: AlbumType) => (
            <li key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{album.artistName}</p>
                <p>{album.collectionName }</p>
              </Link>
            </li>
          ))}
        </ul>

      ) }
      {albunsResults?.length === 0 && <h1>Nenhum álbum foi encontrado</h1>}
    </div>
  );
}

export default Search;
