import React, { useState } from "react";

const SongsList = ({
  setCurrentTopSong,
  setPlayingTopTrack,
  search,
  setSearch,
  songs,
  topTracks,
  setIndex,
  setCurrentSong,
  setPlaying,
  index,
  currentSong,
  currentTopSong,
}) => {
  const [activeTab, setActiveTab] = useState("default");

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTopTracks = topTracks.filter(
    (song) =>
      song.name.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="songs-list">
        <nav>
          <span
            onClick={() => {
              setActiveTab("default");
              setIndex(null);
              setSearch("");
            }}
            style={{ opacity: activeTab !== "default" ? 0.6 : 1 }}
          >
            For You
          </span>
          <span
            onClick={() => {
              setActiveTab("top");
              setIndex(null);
              setSearch("");
            }}
            style={{ opacity: activeTab !== "top" ? 0.6 : 1 }}
          >
            Top Tracks
          </span>
        </nav>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Song, Artist"
        />
        <ul className="songs">
          {activeTab === "default" && filteredSongs.length > 0 ? (
            filteredSongs.map((song, ind) => (
              <li
                key={song.id}
                className="song-card"
                onClick={() => {
                  setIndex(ind);
                  setCurrentSong(song);
                  setPlaying(true);
                  setSearch("");
                }}
              >
                <img
                  src={`https://cms.samespace.com/assets/${song.cover}`}
                  alt={song.name}
                  width={"50px"}
                  height={"50px"}
                />
                <div className="about-song">
                  <p className="name">{song.name}</p>
                  <p className="artist">{song.artist}</p>
                </div>
              </li>
            ))
          ) : activeTab === "top" && filteredTopTracks.length > 0 ? (
            filteredTopTracks.map((song, ind) => (
              <li
                key={song.id}
                className="song-card"
                onClick={() => {
                  setIndex(ind);
                  setCurrentTopSong(song);
                  setPlayingTopTrack(true);
                  setSearch("");
                }}
              >
                <img
                  src={`https://cms.samespace.com/assets/${song.cover}`}
                  alt={song.name}
                  width={"50px"}
                  height={"50px"}
                />
                <div className="about-song">
                  <p className="name">{song.name}</p>
                  <p className="artist">{song.artist}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No songs found...</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default SongsList;
