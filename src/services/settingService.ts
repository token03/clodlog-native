import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings } from "@/types/classes/settings";

const SETTING_KEY = "settings";

export const fetchSettings = async (): Promise<Settings> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTING_KEY);
    if (jsonValue === null) {
      await saveDefaultSettings();
    }
    return new Settings(jsonValue != null ? JSON.parse(jsonValue) : {});
  } catch (e) {
    console.error("Error fetching settings:", e);
    return new Settings();
  }
};

export const saveDefaultSettings = async (): Promise<void> => {
  try {
    const defaultSettings = new Settings();
    await saveSettings(defaultSettings);
  } catch (e) {
    console.error("Error resetting settings:", e);
  }
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTING_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving settings:", e);
  }
};
