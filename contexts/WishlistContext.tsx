import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  fetchAllWishlists,
  fetchWishlist,
  addPokemonCard,
  removePokemonCard,
  deleteWishlistById, createWishlist, updateWishlistById, updateWishlistOrder, getWishlists, getWishlistOrder
} from '../services/wishlistService';
import {Card} from "../classes/card";
import {Wishlist, WishlistRecord} from "../types/interfaces/wishlist";

type WishlistContextType = {
  wishlists: Wishlist[];
  wishlistRecord: WishlistRecord;
  wishlistOrder: string[];
  refreshWishlists: () => void;
  addCardToWishlist: (wishlistId: string, card: Card) => void;
  removeCardFromWishlist: (wishlistId: string, cardId: string) => void;
  createWishlist: (wishlistName: string) => void;
  deleteWishlist: (wishlistId: string) => void;
  updateWishlistById: (wishlistId: string, wishlist: Wishlist) => void;
  updateWishlistOrder: (orderedIds: string[]) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [wishlistRecord, setWishlistRecord] = useState<WishlistRecord>({});
  const [wishlistOrder, setWishlistOrder] = useState<string[]>([]);

  const loadWishlists = async () => {
    const wishlists = await fetchAllWishlists();
    const wishlistRecord = await getWishlists();
    const wishlistOrder = await getWishlistOrder();
    setWishlists(wishlists);
    setWishlistRecord(wishlistRecord);
    setWishlistOrder(wishlistOrder);
  };

  useEffect(() => {
    loadWishlists();
  }, []);

  const refreshWishlists = async () => {
    await loadWishlists();
  };
  
  const refreshWishlistRecord = async () => {
    const wishlistRecord = await getWishlists();
    setWishlistRecord(wishlistRecord);
  }

  const addCardToWishlist = async (wishlistId: string, card: Card) => {
    await addPokemonCard(wishlistId, card);
    await refreshWishlists();
  };

  const removeCardFromWishlist = async (wishlistId: string, cardId: string) => {
    await removePokemonCard(wishlistId, cardId);
    await refreshWishlists(); 
  };
  
  const addWishlist = async (wishlistName: string) => {
    await createWishlist(wishlistName);
    await refreshWishlists();
  }
  
  const deleteWishlist = async (wishlistId: string) => {
    await deleteWishlistById(wishlistId);
    await refreshWishlists();
  }
  
  const updateWishlist = async (wishlistId: string, wishlist: Wishlist) => {
    await updateWishlistById(wishlistId, wishlist);
    await refreshWishlists();
  }

  const updateOrder = async (orderedIds: string[]) => {
    await updateWishlistOrder(orderedIds);
    await refreshWishlists();
  }

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlists, 
        wishlistRecord,
        wishlistOrder,
        refreshWishlists, 
        addCardToWishlist, 
        removeCardFromWishlist, 
        createWishlist: addWishlist, 
        deleteWishlist, 
        updateWishlistById: updateWishlist,
        updateWishlistOrder: updateOrder
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlists = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlists must be used within a WishlistProvider');
  }
  return context;
};
