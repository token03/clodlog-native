import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  fetchAllWishlists,
  fetchWishlist,
  addPokemonCard,
  removePokemonCard,
  deleteWishlistById, createWishlist, updateWishlistById
} from '../services/wishlistService';
import { Wishlist } from "../types/WishlistTypes";
import { CardResume } from "@tcgdex/sdk";

type WishlistContextType = {
  wishlists: Wishlist[];
  refreshWishlists: () => void;
  addCardToWishlist: (wishlistId: string, card: CardResume) => void;
  removeCardFromWishlist: (wishlistId: string, cardId: string) => void;
  createWishlist: (wishlistName: string) => void;
  deleteWishlist: (wishlistId: string) => void;
  updateWishlistById: (wishlistId: string, wishlist: Wishlist) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  const loadWishlists = async () => {
    const wishlists = await fetchAllWishlists();
    setWishlists(new Array(...wishlists));
  };

  useEffect(() => {
    loadWishlists();
  }, []);

  const refreshWishlists = async () => {
    await loadWishlists();
  };

  const addCardToWishlist = async (wishlistId: string, card: CardResume) => {
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

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlists, 
        refreshWishlists, 
        addCardToWishlist, 
        removeCardFromWishlist, 
        createWishlist: addWishlist, 
        deleteWishlist, 
        updateWishlistById: updateWishlist
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
