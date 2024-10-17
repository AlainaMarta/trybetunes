import { SongType } from '../../types';

function MusicCard({ trackName, previewUrl }: SongType) {
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
      <button className="heart-button">
        <img src="/src/images/empty_heart.png" alt="heart" />
      </button>
    </div>
  );
}

export default MusicCard;
