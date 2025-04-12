import React, { createContext, useState, useEffect, useContext } from "react";
import { Meta } from "@/types/classes/meta";

interface MetaContextType {
  hp: string[];
  artists: string[];
  rarities: string[];
  supertypes: string[];
  subtypes: string[];
  types: string[];
  sets: string[];
  series: string[];
}

const MetaContext = createContext<MetaContextType | undefined>(undefined);

export const MetaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hp, setHp] = useState<string[]>([]);
  const [artists, setArtists] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [supertypes, setSupertypes] = useState<string[]>([]);
  const [subtypes, setSubtypes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [sets, setSets] = useState<string[]>([]);
  const [series, setSeries] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetMeta = async (
      fetchMethod: () => Promise<string[]>,
      setMethod: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      const data = await fetchMethod();
      setMethod(data);
    };

    // Fetch and set all metadata
    fetchAndSetMeta(Meta.allHp, setHp);
    fetchAndSetMeta(Meta.allArtists, setArtists);
    fetchAndSetMeta(Meta.allRarities, setRarities);
    fetchAndSetMeta(Meta.allSupertypes, setSupertypes);
    fetchAndSetMeta(Meta.allSubtypes, setSubtypes);
    fetchAndSetMeta(Meta.allTypes, setTypes);
    fetchAndSetMeta(Meta.allSets, setSets);
    fetchAndSetMeta(Meta.allSeries, setSeries);
  }, []);

  return (
    <MetaContext.Provider
      value={{
        hp,
        artists,
        rarities,
        supertypes,
        subtypes,
        types,
        series,
        sets,
      }}
    >
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => {
  const context = useContext(MetaContext);
  if (context === undefined) {
    throw new Error("useMeta must be used within a MetaProvider");
  }
  return context;
};
