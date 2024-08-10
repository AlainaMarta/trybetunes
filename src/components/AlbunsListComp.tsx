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
             <main>
               <p>{`Resultado de álbuns de: ${valueInputAlbuns}`}</p>

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
             </main>
           )
}
      {albunsResults?.length === 0 && <h1>Nenhum álbum foi encontrado</h1>}
    </>
  );
}

export default AlbunsListComp;
