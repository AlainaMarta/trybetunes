import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import LoadingMessage from '../Login/Loading';
import MusicCard from '../Album/CardMusic';

function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleFavoriteSongs() {
      setLoading(true);
      const favoriteListSongs = await getFavoriteSongs();
      setLoading(false);
      setFavoriteSongs(favoriteListSongs);
    }
    handleFavoriteSongs();
  }, []);

  async function handleUnfavoriteSong(song : SongType) {
    await removeSong(song);
    setFavoriteSongs((prevSongs = []) => prevSongs
      .filter((favSong) => favSong.trackId !== song.trackId));
  }

  return (
    <div>
      {loading && <LoadingMessage />}
      {loading === false && favoriteSongs?.map((favSong) => (
        <MusicCard
          key={ favSong.trackId }
          trackId={ favSong.trackId }
          trackName={ favSong.trackName }
          previewUrl={ favSong.previewUrl }
          isAlreadyFav
          unFavorite={ () => handleUnfavoriteSong(favSong) }
        />
      ))}
    </div>
  );
}

export default Favorites;
