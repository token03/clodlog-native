import axios from 'axios';
import {API_URL} from "../constants/API";
import {Serie, SerieList, Set, SetList} from "@tcgdex/sdk";
import {Series} from "../constants/enums/Series";

export const getAllSeries = async () : Promise<SerieList> => {
    const response = await axios.get(`${API_URL}/en/series`);
    return response.data as SerieList;
}

export const getAllSeriesDetailed = async () : Promise<Array<Serie>> => {
    const seriesList: Array<Serie> = [];
    for (const value of Object.values(Series).reverse()) {
        const response = await axios.get(`${API_URL}/en/series/${value}`);
        seriesList.push(response.data);
    }
    return seriesList;
}

export const getSet = async (setId: string) : Promise<Set> => {
    const response = await axios.get(`${API_URL}/en/sets/${setId}`);
    return response.data as SetList;
}

export const getAllSetsFromSeries = async (seriesId: string) : Promise<SetList>=> {
    const response = await axios.get(`${API_URL}/en/series/${seriesId}`);
    return response.data.sets as SetList;
}