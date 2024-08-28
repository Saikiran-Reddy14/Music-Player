import axios from "axios";
import React, { useEffect, useState } from "react";
import SongsList from "./SongsList";
import Player from "./Player";
import Logo from "./images/7124272_spotify_logo_icon.png";
import "./App.css";
import Profile from "./images/profile.jpg";

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [playingTopTrack, setPlayingTopTrack] = useState(false);
  const [songs, setSongs] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [index, setIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTopSong, setCurrentTopSong] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "https://cms.samespace.com/items/songs"
        );
        const allSongs = response.data.data;
        setSongs(allSongs);
        setTopTracks(allSongs.filter((song) => song.top_track === true));
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    if (currentSong) {
      setCurrentSong(songs[index]);
    }
    if (currentTopSong) {
      setCurrentTopSong(topTracks[index]);
    }
  }, [index, songs, topTracks]);

  return (
    <div
      className="container"
      style={{
        backgroundColor: currentSong
          ? `${currentSong.accent}`
          : currentTopSong
          ? `${currentTopSong.accent}`
          : "#333",
      }}
    >
      <div className="logo-profile">
        <img className="logo" src={Logo} alt="logo" />
        <img className="profile" src={Profile} alt="profile" />
      </div>
      <div className="main">
        <SongsList
          songs={songs}
          topTracks={topTracks}
          setIndex={setIndex}
          setCurrentSong={setCurrentSong}
          setPlaying={setPlaying}
          setCurrentTopSong={setCurrentTopSong}
          setPlayingTopTrack={setPlayingTopTrack}
          index={index}
          search={search}
          setSearch={setSearch}
        />
        <Player
          songs={songs}
          topTracks={topTracks}
          currentSong={currentSong}
          currentTopSong={currentTopSong}
          setIndex={setIndex}
          playing={playing}
          setPlaying={setPlaying}
          playingTopTrack={playingTopTrack}
          setCurrentSong={setCurrentSong}
          setCurrentTopSong={setCurrentTopSong}
          setPlayingTopTrack={setPlayingTopTrack}
        />
      </div>
    </div>
  );
};

export default App;
