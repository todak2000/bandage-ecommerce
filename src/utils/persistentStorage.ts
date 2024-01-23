/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line prettier/prettier
import localForage from "localforage";

// Save data to IndexedDB
export const saveData = async (key: string, data: any): Promise<any> => {
  try {
    await localForage.setItem(key, data);
    return true;
  } catch (err) {
    return null;
  }
};

// Load data from IndexedDB
export const loadData = async (key: string): Promise<any> => {
  try {
    const data = await localForage.getItem(key);
    return data;
  } catch (err) {
    return [];
  }
};

export const clearStorage = async (): Promise<any> => {
  try {
    await localForage.clear();
    return true;
  } catch (err) {
    return null;
  }
};
