import { useEffect, useState } from 'react';
import './album.css';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../../types';
import MusicCard from './CardMusic';
import getMusics from '../../services/musicsAPI';
import LoadingMessage from '../Login/Loading';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

function Album() {
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = useState<AlbumType>();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleGetMusic() {
      if (id) {
        setLoading(true);
        const [albumInf, ...musicsArray] = await getMusics(id);
        const favoriteMusicsList = await getFavoriteSongs();

        setLoading(false);
        setAlbumInfo(albumInf);
        setMusics(musicsArray);
        setFavoriteSongs(favoriteMusicsList);
      }
    }
    handleGetMusic();
  }, [id]);

  return (
    <div className="album-details">
      {loading && <LoadingMessage />}
      <section className="section-artist">
        <img
          src={ albumInfo?.artworkUrl100 }
          alt={ albumInfo?.collectionName }
          id="music-photo"
        />
        <p
          data-testid="album-name"
          id="album-name-details"
        >
          {albumInfo?.collectionName}
        </p>
        <p data-testid="artist-name" id="artist-name-details">{albumInfo?.artistName}</p>
      </section>
      <section className="section-music">
        {!loading && musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackId={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            isAlreadyFav={ favoriteSongs.some((fav) => fav.trackId === music.trackId) }
          />

        ))}
      </section>
    </div>
  );
}

export default Album;
