import React, { createContext, useState, useEffect, useContext } from 'react';
import { Card } from "../classes/card";

type GenericItem = {
  id: string;
  name: string;
  cards: Card[];
};

type GenericListContextType<T extends GenericItem> = {
  items: T[];
  itemCardsRecord: Record<string, Card[]>;
  itemsRecord: Record<string, T>;
  itemOrder: string[];
  refreshItems: () => Promise<void>;
  addCardToItem: (itemId: string, card: Card) => Promise<void>;
  removeCardFromItem: (itemId: string, cardId: string) => Promise<void>;
  createItem: (itemName: string) => Promise<void>;
  deleteItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, item: T) => Promise<void>;
  updateItemOrder: (orderedIds: string[]) => Promise<void>;
};

const createGenericListContext = <T extends GenericItem>() => {
  return createContext<GenericListContextType<T> | undefined>(undefined);
};

export const createGenericListProvider = <T extends GenericItem>(
  fetchAllItems: () => Promise<T[]>,
  getItems: () => Promise<Record<string, T>>,
  getItemOrder: () => Promise<string[]>,
  addCard: (itemId: string, card: Card) => Promise<void>,
  removeCard: (itemId: string, cardId: string) => Promise<void>,
  createItem: (itemName: string) => Promise<void>,
  deleteItem: (itemId: string) => Promise<void>,
  updateItem: (itemId: string, item: T) => Promise<void>,
  updateItemOrder: (orderedIds: string[]) => Promise<void>
) => {
  const GenericListContext = createGenericListContext<T>();

  const GenericListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<T[]>([]);
    const [itemCardsRecord, setItemCardsRecord] = useState<Record<string, Card[]>>({});
    const [itemsRecord, setItemsRecord] = useState<Record<string, T>>({});
    const [itemOrder, setItemOrder] = useState<string[]>([]);

    const loadItems = async () => {
      const fetchedItems = await fetchAllItems();
      const fetchedItemsRecord = await getItems();
      const fetchedItemOrder = await getItemOrder();

      const cards = fetchedItems.reduce((acc: Record<string, Card[]>, wishlist) => {
        for (const card of wishlist.cards) {
          if (acc[card.id]) {
            acc[card.id].push(card);
          } else {
            acc[card.id] = [card];
          }
        }
        return acc;
      }, {});
      
      setItems(fetchedItems);
      setItemCardsRecord(cards);
      setItemsRecord(fetchedItemsRecord);
      setItemOrder(fetchedItemOrder);
    };

    useEffect(() => {
      loadItems();
    }, []);

    const refreshItems = async () => {
      await loadItems();
    };

    const addCardToItem = async (itemId: string, card: Card) => {
      await addCard(itemId, card);
      await refreshItems();
    };

    const removeCardFromItem = async (itemId: string, cardId: string) => {
      await removeCard(itemId, cardId);
      await refreshItems();
    };

    const addItem = async (itemName: string) => {
      await createItem(itemName);
      await refreshItems();
    };

    const deleteItemById = async (itemId: string) => {
      await deleteItem(itemId);
      await refreshItems();
    };

    const updateItemById = async (itemId: string, item: T) => {
      await updateItem(itemId, item);
      await refreshItems();
    };

    const updateOrder = async (orderedIds: string[]) => {
      await updateItemOrder(orderedIds);
      await refreshItems();
    };

    return (
      <GenericListContext.Provider
        value={{
          items,
          itemsRecord, 
          itemCardsRecord,
          itemOrder,
          refreshItems,
          addCardToItem,
          removeCardFromItem,
          createItem: addItem,
          deleteItem: deleteItemById,
          updateItem: updateItemById,
          updateItemOrder: updateOrder,
      }}
  >
    {children}
    </GenericListContext.Provider>
  );
  };

  return { GenericListProvider, GenericListContext };
};
