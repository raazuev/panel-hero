import React, { useState, useEffect, useRef } from "react";
import styles from './TrackList.module.sass';

const TracksList = ({ tracks = [] }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handleSpanPlayPause = (index) => {
        if (currentTrackIndex === index) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch((error) => console.log(error));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex]);

    const handleTrackEnded = () => {
        if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
            setIsPlaying(true); 
        } else {
            setIsPlaying(false);
        }
    };

    return (
        <div className={styles.trackList}>
            <h5>Плейлист:</h5>
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                    marginBottom: "10px",
                    padding: "10px 20px",
                    background: isPlaying ? "red" : "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                >
                {isPlaying ? "Pause Playlist" : "Play Playlist"}
            </button>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {tracks.map((track, index) => (
                    <li
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            background: currentTrackIndex === index ? "#f0f8ff" : "#fff",
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <span
                                className={styles.spanTrack}
                                onClick={() => handleSpanPlayPause(index)}>
                                {index} - {track.name}
                            </span>
                        </div>
                        {currentTrackIndex === index && (
                            <audio
                                controls
                                ref={audioRef}
                                src={track.url}
                                onEnded={handleTrackEnded}
                            ></audio>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TracksList;
