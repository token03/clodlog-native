import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@/types/classes/card";
import { Wishlist, WishlistRecord } from "@/types/interfaces/wishlist";

const WISHLIST_KEY = "@Wishlist";
const WISHLIST_ORDER_KEY = "@WishlistOrder";

export const getWishlists = async (): Promise<WishlistRecord> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WISHLIST_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error("Error fetching wishlists:", e);
    return {};
  }
};

export const saveWishlists = async (wishlists: WishlistRecord) => {
  try {
    const jsonValue = JSON.stringify(wishlists);
    await AsyncStorage.setItem(WISHLIST_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving wishlists:", e);
  }
};

export const getWishlistOrder = async (): Promise<string[]> => {
  try {
    const order = await AsyncStorage.getItem(WISHLIST_ORDER_KEY);
    return order ? JSON.parse(order) : [];
  } catch (e) {
    console.error("Error getting wishlist order:", e);
    return [];
  }
};

export const saveWishlistOrder = async (order: string[]) => {
  try {
    await AsyncStorage.setItem(WISHLIST_ORDER_KEY, JSON.stringify(order));
  } catch (e) {
    console.error("Error saving wishlist order:", e);
  }
};

export const generateWishlistId = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
};

export const createWishlist = async (wishlistName: string) => {
  try {
    const wishlistId = generateWishlistId(wishlistName);
    const wishlists = await getWishlists();
    const order = await getWishlistOrder();

    if (!wishlists[wishlistId]) {
      const newWishlist: Wishlist = {
        id: wishlistId,
        name: wishlistName,
        cards: [],
        dateCreated: new Date().toISOString(),
      };
      wishlists[wishlistId] = newWishlist;
      await saveWishlists(wishlists);

      order.push(wishlistId);
      await saveWishlistOrder(order);
      return newWishlist;
    } else {
      console.warn("Wishlist with the same ID already exists.");
    }
  } catch (e) {
    console.error("Error creating new wishlist:", e);
  }
};

export const updateWishlistOrder = async (orderedIds: string[]) => {
  try {
    await saveWishlistOrder(orderedIds);
  } catch (e) {
    console.error("Error updating wishlist order:", e);
  }
};

export const updateWishlistById = async (
  wishlistId: string,
  wishlist: Wishlist
) => {
  try {
    const wishlists = await getWishlists();
    wishlists[wishlistId] = wishlist;
    await saveWishlists(wishlists);
  } catch (e) {
    console.error("Error updating wishlist:", e);
  }
};

export const deleteWishlistById = async (wishlistId: string) => {
  try {
    const wishlists = await getWishlists();
    const order = await getWishlistOrder();

    if (Object.keys(wishlists).length <= 1) {
      console.warn("Cannot delete the only wishlist.");
      return;
    }

    delete wishlists[wishlistId];
    await saveWishlists(wishlists);

    const newOrder = order.filter((id) => id !== wishlistId);
    await saveWishlistOrder(newOrder);
  } catch (e) {
    console.error("Error deleting wishlist:", e);
  }
};

export const fetchAllWishlists = async (): Promise<Wishlist[]> => {
  try {
    let wishlists = await getWishlists();

    if (Object.keys(wishlists).length === 0) {
      await createWishlist("Main");
      wishlists = await getWishlists();
    }

    const order = await getWishlistOrder();

    return order.map((id) => wishlists[id]);
  } catch (e) {
    console.error("Error fetching all wishlists:", e);
    return [];
  }
};

export const fetchWishlist = async (
  wishlistId: string
): Promise<Wishlist | null> => {
  try {
    const wishlists = await getWishlists();
    return wishlists[wishlistId] || null;
  } catch (e) {
    console.error("Error fetching wishlist:", e);
    return null;
  }
};

export const addPokemonCard = async (wishlistId: string, card: Card) => {
  try {
    const wishlists = await getWishlists();
    if (wishlists[wishlistId]) {
      wishlists[wishlistId].cards.push(card);
      await saveWishlists(wishlists);
    } else {
      console.warn("Wishlist not found.");
    }
  } catch (e) {
    console.error("Error adding Pokémon card to wishlist:", e);
  }
};

export const removePokemonCard = async (wishlistId: string, cardId: string) => {
  try {
    const wishlists = await getWishlists();
    if (wishlists[wishlistId]) {
      wishlists[wishlistId].cards = wishlists[wishlistId].cards.filter(
        (card: Card) => card.id !== cardId
      );
      await saveWishlists(wishlists);
    } else {
      console.warn("Wishlist not found.");
    }
  } catch (e) {
    console.error("Error removing Pokémon card from wishlist:", e);
  }
};
