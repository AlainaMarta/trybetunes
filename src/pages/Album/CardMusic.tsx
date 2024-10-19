import { useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

function MusicCard({ trackId, trackName, previewUrl }: SongType) {
  const [isFavorite, setIsFavorite] = useState(false);

  async function handleFavoriteChange() {
    const favoriteSongs = await getFavoriteSongs();
    const isSongFavorite = favoriteSongs.some((song) => song.trackId === trackId);

    if (isSongFavorite) {
      await removeSong({ trackId, trackName, previewUrl });
    } else {
      await addSong({ trackId, trackName, previewUrl });
    }
    const updatedFavoriteSongs = await getFavoriteSongs();
    setIsFavorite(updatedFavoriteSongs.some((song) => song.trackId === trackId));
  }

  return (
    <div className="music-card">
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label style={ { cursor: 'pointer' } }>
        <input
          type="checkbox"
          name="heart"
          checked={ isFavorite }
          id="heart"
          onChange={ handleFavoriteChange }
          style={ { display: 'none' } }
        />
        <img
          src={ isFavorite
            ? '/src/images/checked_heart.png' : '/src/images/empty_heart.png' }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
