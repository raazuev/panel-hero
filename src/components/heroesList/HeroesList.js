import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

import { useGetHeroesQuery, useDeleteHeroesMutation } from "../api/apiSlice";

import { fetchMusic } from "../trackList/TrackSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroesMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
    }, [heroes, activeFilter]);

    const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchMusic(request));
    }, []);

    const onDelete = useCallback(
        (id) => {
            deleteHero(id);
        },
        [request, dispatch]
    );

    const handleTrackPlay = (trackId) => {
        setCurrentPlayingTrack(trackId);
    };

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <h5 className="text-center mt-5">
                    Героев пока нет
                </h5>
            );
        }

        return arr.map(({ id, ...props }) => (
            <li key={id} className="hero">
                <HeroesListItem
                    {...props}
                    onDelete={() => onDelete(id)}
                    onTrackPlay={handleTrackPlay}
                    currentPlayingTrack={currentPlayingTrack}
                />
            </li>
        ));
    };

    const elements = renderHeroesList(filteredHeroes);

    return <ul>{elements}</ul>;
};

export default HeroesList;