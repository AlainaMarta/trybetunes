import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type AlbunsListCompProps = {
  albunsResults : AlbumType[],
  valueInputAlbuns: string,
};

function AlbunsListComp(props: AlbunsListCompProps) {
  const { albunsResults, valueInputAlbuns } = props;
  return (
    <>
      {
       albunsResults
           && (
             <main className="main-music-container">
               <p id="result-title">{`Resultado de álbuns de: ${valueInputAlbuns}`}</p>

               <ul>
                 {albunsResults.map((album: AlbumType) => (
                   <li key={ album.collectionId }>
                     <Link
                       className="link-to-music"
                       to={ `/album/${album.collectionId}` }
                       data-testid={ `link-to-album-${album.collectionId}` }
                     >
                       <img
                         src={ album.artworkUrl100 }
                         alt={ album.collectionName }
                         id="music-photo"
                       />
                       <p id="album-name">{album.collectionName }</p>
                       <p id="artist-name">{album.artistName}</p>
                     </Link>
                   </li>
                 ))}
               </ul>
             </main>
           )
}
      {albunsResults?.length === 0 && <h1>Nenhum álbum foi encontrado</h1>}
    </>
  );
}

export default AlbunsListComp;
