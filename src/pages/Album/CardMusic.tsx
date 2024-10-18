import { useState } from 'react';
import { SongType } from '../../types';

function MusicCard({ trackId, trackName, previewUrl }: SongType) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavoriteChange() {
    setIsFavorite(!isFavorite);
    console.log('foi');
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
      <label htmlFor="heart">
        <input
          type="checkbox"
          name="heart"
          checked={ isFavorite }
          id="heart"
          onChange={ handleFavoriteChange }
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
