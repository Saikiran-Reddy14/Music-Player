import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

const Player = ({
  songs,
  topTracks,
  currentSong,
  currentTopSong,
  setIndex,
  playing,
  setPlaying,
  playingTopTrack,
  setPlayingTopTrack,
  setCurrentSong,
  setCurrentTopSong,
}) => {
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    if (currentSong) {
      setPlaying(!playing);
    } else if (currentTopSong) {
      setPlayingTopTrack(!playingTopTrack);
    }
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  const handleSeek = (e) => {
    if (playerRef.current) {
      const newTime = (e.target.value / 100) * playerRef.current.getDuration();
      playerRef.current.seekTo(newTime);
    }
  };

  const handlePreviousSong = () => {
    if (currentSong) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? songs.length - 1 : prevIndex - 1;
        setCurrentSong(songs[newIndex]);
        return newIndex;
      });
      setPlaying(true);
    } else if (currentTopSong) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? topTracks.length - 1 : prevIndex - 1;
        setCurrentTopSong(topTracks[newIndex]);
        return newIndex;
      });
      setPlayingTopTrack(true);
    }
  };

  const handleNextSong = () => {
    if (currentSong) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
        setCurrentSong(songs[newIndex]);
        return newIndex;
      });
      setPlaying(true);
    } else if (currentTopSong) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex === topTracks.length - 1 ? 0 : prevIndex + 1;
        setCurrentTopSong(topTracks[newIndex]);
        return newIndex;
      });
      setPlayingTopTrack(true);
    }
  };

  const handleSongEnded = () => {
    if (currentSong) {
      setPlaying(false);
    } else if (currentTopSong) {
      setPlayingTopTrack(false);
    }
  };

  return (
    <div className="player-section">
      {currentSong || currentTopSong ? (
        <div className="player">
          <div className="info">
            <p className="song-name" style={{ color: "white" }}>
              {currentSong ? currentSong.name : currentTopSong.name}
            </p>
            <p className="song-artist" style={{ color: "white" }}>
              {currentSong ? currentSong.artist : currentTopSong.artist}
            </p>
          </div>
          <img
            src={`https://cms.samespace.com/assets/${
              currentSong ? currentSong.cover : currentTopSong.cover
            }`}
            alt={currentSong ? currentSong.name : currentTopSong.name}
            width={"100px"}
            height={"100px"}
          />
          <ReactPlayer
            ref={playerRef}
            url={currentSong ? currentSong.url : currentTopSong.url}
            playing={currentSong ? playing : playingTopTrack}
            onProgress={handleProgress}
            onEnded={handleSongEnded}
            width="0px"
            height="0px"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            style={{ width: "100%" }}
          />
          <div className="buttons">
            <button onClick={handlePreviousSong} className="btn">
              <ion-icon name="play-back-outline"></ion-icon>
            </button>
            <button className="btn" onClick={handlePlayPause}>
              {currentSong ? (
                playing ? (
                  <ion-icon name="pause-outline"></ion-icon>
                ) : (
                  <ion-icon name="play-outline"></ion-icon>
                )
              ) : playingTopTrack ? (
                <ion-icon name="pause-outline"></ion-icon>
              ) : (
                <ion-icon name="play-outline"></ion-icon>
              )}
            </button>
            <button className="btn" onClick={handleNextSong}>
              <ion-icon name="play-forward-outline"></ion-icon>
            </button>
          </div>
        </div>
      ) : (
        <p>Select a song to play</p>
      )}
    </div>
  );
};

export default Player;
