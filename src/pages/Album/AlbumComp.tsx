import { useEffect, useState } from 'react';
import './album.css';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../../types';
import MusicCard from './CardMusic';
import getMusics from '../../services/musicsAPI';
import LoadingMessage from '../Login/Loading';

function Album() {
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = useState<AlbumType>();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleGetMusic() {
      if (id) {
        setLoading(true);
        const [albumInf, ...musicsArray] = await getMusics(id);
        setLoading(false);
        setAlbumInfo(albumInf);
        setMusics(musicsArray);
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

      {!loading && musics.map((music) => (
        <MusicCard
          key={ music.trackId }
          trackId={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />

      ))}
    </div>
  );
}

export default Album;
