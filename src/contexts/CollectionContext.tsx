import { Collection } from '@/types/interfaces/collection';
import * as collectionService from '@/services/collectionService';
import { createGenericListProvider } from './GenericItemContext';
import { useContext } from 'react';

const { GenericListProvider: CollectionProvider, GenericListContext: CollectionContext } =
  createGenericListProvider<Collection>(
    collectionService.fetchAllCollections,
    collectionService.getCollections,
    collectionService.getCollectionOrder,
    collectionService.addPokemonCard,
    collectionService.removePokemonCard,
    collectionService.createCollection,
    collectionService.deleteCollectionById,
    collectionService.updateCollectionById,
    collectionService.updateCollectionOrder
  );

export { CollectionProvider, CollectionContext };

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollections must be used within a CollectionProvider');
  }
  return context;
};
