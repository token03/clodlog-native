import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  fetchAllCollections,
  fetchCollection,
  addPokemonCard,
  removePokemonCard,
  deleteCollectionById, createCollection, updateCollectionById, updateCollectionOrder, getCollections, getCollectionOrder
} from '../services/collectionService';
import {Card} from "../classes/card";
import {Collection, CollectionRecord} from "../types/interfaces/collection";

type CollectionContextType = {
  collections: Collection[];
  collectionRecord: CollectionRecord;
  collectionOrder: string[];
  refreshCollections: () => void;
  addCardToCollection: (collectionId: string, card: Card) => void;
  removeCardFromCollection: (collectionId: string, cardId: string) => void;
  createCollection: (collectionName: string) => void;
  deleteCollection: (collectionId: string) => void;
  updateCollectionById: (collectionId: string, collection: Collection) => void;
  updateCollectionOrder: (orderedIds: string[]) => void;
};

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionRecord, setCollectionRecord] = useState<CollectionRecord>({});
  const [collectionOrder, setCollectionOrder] = useState<string[]>([]);

  const loadCollections = async () => {
    const collections = await fetchAllCollections();
    const collectionRecord = await getCollections();
    const collectionOrder = await getCollectionOrder();
    setCollections(collections);
    setCollectionRecord(collectionRecord);
    setCollectionOrder(collectionOrder);
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const refreshCollections = async () => {
    await loadCollections();
  };
  
  const refreshCollectionRecord = async () => {
    const collectionRecord = await getCollections();
    setCollectionRecord(collectionRecord);
  }

  const addCardToCollection = async (collectionId: string, card: Card) => {
    await addPokemonCard(collectionId, card);
    await refreshCollections();
  };

  const removeCardFromCollection = async (collectionId: string, cardId: string) => {
    await removePokemonCard(collectionId, cardId);
    await refreshCollections(); 
  };
  
  const addCollection = async (collectionName: string) => {
    await createCollection(collectionName);
    await refreshCollections();
  }
  
  const deleteCollection = async (collectionId: string) => {
    await deleteCollectionById(collectionId);
    await refreshCollections();
  }
  
  const updateCollection = async (collectionId: string, collection: Collection) => {
    await updateCollectionById(collectionId, collection);
    await refreshCollections();
  }

  const updateOrder = async (orderedIds: string[]) => {
    await updateCollectionOrder(orderedIds);
    await refreshCollections();
  }

  return (
    <CollectionContext.Provider 
      value={{ 
        collections, 
        collectionRecord,
        collectionOrder,
        refreshCollections, 
        addCardToCollection, 
        removeCardFromCollection, 
        createCollection: addCollection, 
        deleteCollection, 
        updateCollectionById: updateCollection,
        updateCollectionOrder: updateOrder
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollections must be used within a CollectionProvider');
  }
  return context;
};
