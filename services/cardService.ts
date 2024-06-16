import axios from 'axios';
import {API_URL} from "../constants/API";
import {Card, Serie, SerieList, SetList} from "@tcgdex/sdk";
import {Series} from "../constants/enums/Series";

export const getCard = async (cardId: string) : Promise<Card> => {
  const response = await axios.get(`${API_URL}/en/cards/${cardId}`);
  return response.data as Card;
}

