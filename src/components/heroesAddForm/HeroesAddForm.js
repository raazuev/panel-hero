import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation } from '../api/apiSlice';

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTracks, setSelectedTracks] = useState([]);

    const [createHero, {isLoading}] = useCreateHeroMutation();

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const {music} = useSelector(state => state.music);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement,
            music: {
                category: selectedCategory,
                id: uuidv4(),
                tracks: selectedTracks
            }
        }

        createHero(newHero).unwrap();

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
        setSelectedCategory('');
        setSelectedTracks([]);
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    
        const categoryData = music.find(item => item.name === category);
        if (categoryData) {
            setSelectedTracks(categoryData.tracks || []);
        } else {
            setSelectedTracks([]);
        }
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <div className="mb-3">
    <label htmlFor="music-category" className="form-label">Выбрать категорию</label>
    <select
        required
        className="form-select"
        id="music-category"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
    >
        <option value="">Выбери категорию...</option>
        {music.map(({ name, label }) => (
            <option key={name} value={name}>
                {label}
            </option>
        ))}
    </select>
</div>

    <button type="submit" className="btn btn-primary">Создать</button>
    </form>
    )
}

export default HeroesAddForm;