import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@/types/classes/card';
import { Collection, CollectionRecord } from '@/types/interfaces/collection';

const COLLECTION_KEY = '@Collection';
const COLLECTION_ORDER_KEY = '@CollectionOrder';

export const getCollections = async (): Promise<CollectionRecord> => {
    try {
        const jsonValue = await AsyncStorage.getItem(COLLECTION_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (e) {
        console.error('Error fetching collections:', e);
        return {};
    }
};

export const saveCollections = async (collections: CollectionRecord) => {
    try {
        const jsonValue = JSON.stringify(collections);
        await AsyncStorage.setItem(COLLECTION_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving collections:', e);
    }
};

export const getCollectionOrder = async (): Promise<string[]> => {
    try {
        const order = await AsyncStorage.getItem(COLLECTION_ORDER_KEY);
        return order ? JSON.parse(order) : [];
    } catch (e) {
        console.error('Error getting collection order:', e);
        return [];
    }
};

export const saveCollectionOrder = async (order: string[]) => {
    try {
        await AsyncStorage.setItem(COLLECTION_ORDER_KEY, JSON.stringify(order));
    } catch (e) {
        console.error('Error saving collection order:', e);
    }
};

export const generateCollectionId = (name: string): string => {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
};

export const createCollection = async (collectionName: string) => {
    try {
        const collectionId = generateCollectionId(collectionName);
        const collections = await getCollections();
        const order = await getCollectionOrder();

        if (!collections[collectionId]) {
            const newCollection: Collection = {
                id: collectionId,
                name: collectionName,
                cards: [],
                dateCreated: new Date().toISOString(),
            };
            collections[collectionId] = newCollection;
            await saveCollections(collections);

            order.push(collectionId);
            await saveCollectionOrder(order);
            return newCollection;
        } else {
            console.warn('Collection with the same ID already exists.');
        }
    } catch (e) {
        console.error('Error creating new collection:', e);
    }
};

export const updateCollectionOrder = async (orderedIds: string[]) => {
    try {
        await saveCollectionOrder(orderedIds);
    } catch (e) {
        console.error('Error updating collection order:', e);
    }
};

export const updateCollectionById = async (collectionId: string, collection: Collection) => {
    try {
        const collections = await getCollections();
        collections[collectionId] = collection;
        await saveCollections(collections);
    } catch (e) {
        console.error('Error updating collection:', e);
    }
};

export const deleteCollectionById = async (collectionId: string) => {
    try {
        const collections = await getCollections();
        const order = await getCollectionOrder();

        if (Object.keys(collections).length <= 1) {
            console.warn('Cannot delete the only collection.');
            return;
        }

        delete collections[collectionId];
        await saveCollections(collections);

        const newOrder = order.filter(id => id !== collectionId);
        await saveCollectionOrder(newOrder);
    } catch (e) {
        console.error('Error deleting collection:', e);
    }
};

export const fetchAllCollections = async (): Promise<Collection[]> => {
    try {
        let collections = await getCollections();

        if (Object.keys(collections).length === 0) {
            await createCollection('Main');
            collections = await getCollections();
        }

        const order = await getCollectionOrder();

        return order.map(id => collections[id]);
    } catch (e) {
        console.error('Error fetching all collections:', e);
        return [];
    }
};

export const fetchCollection = async (collectionId: string): Promise<Collection | null> => {
    try {
        const collections = await getCollections();
        return collections[collectionId] || null;
    } catch (e) {
        console.error('Error fetching collection:', e);
        return null;
    }
};

export const addPokemonCard = async (collectionId: string, card: Card) => {
    try {
        const collections = await getCollections();
        if (collections[collectionId]) {
            collections[collectionId].cards.push(card);
            await saveCollections(collections);
        } else {
            console.warn('Collection not found.');
        }
    } catch (e) {
        console.error('Error adding Pokémon card to collection:', e);
    }
};

export const removePokemonCard = async (collectionId: string, cardId: string) => {
    try {
        const collections = await getCollections();
        if (collections[collectionId]) {
            collections[collectionId].cards = collections[collectionId].cards.filter(
                (card: Card) => card.id !== cardId
            );
            await saveCollections(collections);
        } else {
            console.warn('Collection not found.');
        }
    } catch (e) {
        console.error('Error removing Pokémon card from collection:', e);
    }
};
