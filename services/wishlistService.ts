import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardResume } from '@tcgdex/sdk';
import {Wishlist} from "../types/WishlistTypes";

const WISHLIST_PREFIX = '@pokemon_wishlist_';

const getWishlist = async (wishlistId: string): Promise<Wishlist | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WISHLIST_PREFIX + wishlistId);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error fetching wishlist:', e);
    return null;
  }
};

const saveWishlist = async (wishlistId: string, wishlist: Wishlist) => {
  try {
    const jsonValue = JSON.stringify(wishlist);
    await AsyncStorage.setItem(WISHLIST_PREFIX + wishlistId, jsonValue);
  } catch (e) {
    console.error('Error saving wishlist:', e);
  }
};

const generateWishlistId = (name: string): string => {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const ensureMainWishlistExists = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const wishlistKeys = keys.filter(key => key.startsWith(WISHLIST_PREFIX));
    if (wishlistKeys.length === 0) {
      await createWishlist('Main');
    }
  } catch (e) {
    console.error('Error ensuring main wishlist exists:', e);
  }
};

const getWishlistByName = async (wishlistName: string): Promise<Wishlist | null> => {
  try {
    const wishlistId = generateWishlistId(wishlistName);
    return await getWishlist(wishlistId);
  } catch (e) {
    console.error('Error fetching wishlist by name:', e);
    return null;
  }
};

export const createWishlist = async (wishlistName: string) => {
  try {
    const wishlistId = generateWishlistId(wishlistName);
    const existingWishlist = await getWishlist(wishlistId);

    if (!existingWishlist) {
      await saveWishlist(wishlistId, {
        id: wishlistId,
        name: wishlistName,
        cards: [],
        dateCreated: new Date().toISOString()
      });
    } else {
      console.warn('Wishlist with the same ID already exists.');
    }
  } catch (e) {
    console.error('Error creating new wishlist:', e);
  }
};

export const updateWishlistById = async (wishlistId: string, wishlist: Wishlist) => {
  try {
    await saveWishlist(wishlistId, wishlist);
  } catch (e) {
    console.error('Error updating wishlist:', e);
  }
};

export const updateWishlistByName = async (wishlistName: string, wishlist: Wishlist) => {
  try {
    const wishlistId = generateWishlistId(wishlistName);
    await updateWishlistById(wishlistId, wishlist);
  } catch (e) {
    console.error('Error updating wishlist by name:', e);
  }
};

export const deleteWishlistById = async (wishlistId: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const wishlistKeys = keys.filter(key => key.startsWith(WISHLIST_PREFIX));

    if (wishlistKeys.length <= 1) {
      console.warn('Cannot delete the only wishlist.');
      return;
    }

    await AsyncStorage.removeItem(WISHLIST_PREFIX + wishlistId);
  } catch (e) {
    console.error('Error deleting wishlist:', e);
  }
};

export const deleteWishlistByName = async (wishlistName: string) => {
  try {
    const wishlistId = generateWishlistId(wishlistName);
    await deleteWishlistById(wishlistId);
  } catch (e) {
    console.error('Error deleting wishlist by name:', e);
  }
};

export const fetchAllWishlistKeys= async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const wishlistKeys = keys.filter(key => key.startsWith(WISHLIST_PREFIX));
    return wishlistKeys.map(key => key.replace(WISHLIST_PREFIX, ''));
  } catch (e) {
    console.error('Error fetching all wishlists:', e);
    return [];
  }
};

export const fetchWishlist = async (wishlistId: string): Promise<Wishlist | null> => {
  try {
    return await getWishlist(wishlistId);
  } catch (e) {
    console.error('Error fetching wishlist:', e);
    return null;
  }
};

export const fetchAllWishlists = async (): Promise<Wishlist[]> => {
  try {
    const keys = await fetchAllWishlistKeys();
    const wishlists = await Promise.all(keys.map(key => getWishlist(key)));
    return wishlists.filter(wishlist => wishlist !== null) as Wishlist[];
  } catch (e) {
    console.error('Error fetching all wishlists:', e);
    return [];
  }
}

export const addPokemonCard = async (wishlistId: string, card: CardResume) => {
  try {
    const wishlist = await getWishlist(wishlistId);
    if (wishlist) {
      wishlist.cards.push(card);
      await saveWishlist(wishlistId, wishlist);
    } else {
      console.warn('Wishlist not found.');
    }
  } catch (e) {
    console.error('Error adding Pokémon card to wishlist:', e);
  }
};

export const removePokemonCard = async (wishlistId: string, cardId: string) => {
  try {
    const wishlist = await getWishlist(wishlistId);
    if (wishlist) {
      wishlist.cards = wishlist.cards.filter((card: CardResume) => card.id !== cardId);
      await saveWishlist(wishlistId, wishlist);
    } else {
      console.warn('Wishlist not found.');
    }
  } catch (e) {
    console.error('Error removing Pokémon card from wishlist:', e);
  }
};

// Ensure the main wishlist exists on initial load
ensureMainWishlistExists();
