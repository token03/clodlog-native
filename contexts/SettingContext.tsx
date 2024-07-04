import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchSettings, saveSettings } from "../services/settingService";
import { Settings } from "../classes/settings";

interface SettingContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);


export const SettingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(new Settings());

  const loadSettings = async () => {
    const fetchedSettings = await fetchSettings();
    setSettings(fetchedSettings);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const updateSetting = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const updatedSettings = new Settings({ ...settings, [key]: value });
    setSettings(updatedSettings);
    await saveSettings(updatedSettings);
  };

  return (
    <SettingContext.Provider
      value={{
        settings,
        updateSetting,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingProvider');
  }
  return context;
};