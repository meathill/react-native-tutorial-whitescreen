import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type Props = {
  currentColor: string;
  customColor: string;
  init: () => Promise<void>;
  setCurrentColor: (color: string) => void;
  setCustomColor: (color: string) => void;
}
const useStore = create<Props>((set, get) => {
  function setCurrentColor(color: string) {
    set({ currentColor: color });
    AsyncStorage.setItem('currentColor', color);
  }
  function setCustomColor(color: string) {
    set({ customColor: color });
    AsyncStorage.setItem('customColor', color);
  }

  async function init() {
    const color = await AsyncStorage.getItem('currentColor');
    set({ currentColor: color || 'white' });
    const customColor = await AsyncStorage.getItem('customColor');
    set({ customColor: customColor || '#ffffff' });
  }

  return {
    currentColor: '',
    customColor: '#ffffff',

    init,
    setCurrentColor,
    setCustomColor,
  }
});

export default useStore;
