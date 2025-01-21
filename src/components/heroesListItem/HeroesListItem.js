import React from "react";
import "./HeroesListItem.scss";
import TracksList from "../trackList/TrackList";

const HeroesListItem = ({
    name,
    description,
    element,
    music,
    onDelete,
    onTrackPlay,
    currentPlayingTrack,
}) => {
    const elementClasses = {
        fire: "bg-danger bg-gradient",
        water: "bg-primary bg-gradient",
        wind: "bg-success bg-gradient",
        earth: "bg-secondary bg-gradient",
    };
    const elementClassName = elementClasses[element] || "bg-warning bg-gradient";

    const imageUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg";

    return (
        <li className={`card mb-4 shadow-lg text-white ${elementClassName}`}>
            <img
                src={imageUrl}
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ objectFit: "cover" }}
            />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <TracksList
                tracks={music?.tracks ?? []}
                onTrackPlay={onTrackPlay}
                currentPlayingTrack={currentPlayingTrack}
            />
            <span
                onClick={onDelete}
                className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
            >
                <button
                    type="button"
                    className="btn-close btn-close"
                    aria-label="Close"
                ></button>
            </span>
        </li>
    );
};

HeroesListItem.defaultProps = {
    onDelete: () => console.warn("onDelete not provided"),
};

export default HeroesListItem;
