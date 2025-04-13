import { Wishlist } from '@/types/interfaces/wishlist';
import * as wishlistService from '@/services/wishlistService';
import { useContext } from 'react';
import { createGenericListProvider } from './GenericItemContext';

const { GenericListProvider: WishlistProvider, GenericListContext: WishlistContext } =
  createGenericListProvider<Wishlist>(
    wishlistService.fetchAllWishlists,
    wishlistService.getWishlists,
    wishlistService.getWishlistOrder,
    wishlistService.addPokemonCard,
    wishlistService.removePokemonCard,
    wishlistService.createWishlist,
    wishlistService.deleteWishlistById,
    wishlistService.updateWishlistById,
    wishlistService.updateWishlistOrder
  );

export { WishlistProvider, WishlistContext };

export const useWishlists = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlists must be used within a WishlistProvider');
  }
  return context;
};
