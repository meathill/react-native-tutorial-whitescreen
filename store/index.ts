import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type Props = {
  currentColor: string;
  init: () => Promise<void>;
  setCurrentColor: (color: string) => void;
}
const useStore = create<Props>((set, get) => {
  function setCurrentColor(color: string) {
    set({ currentColor: color });
    AsyncStorage.setItem('currentColor', color);
  }

  async function init() {
    const color = await AsyncStorage.getItem('currentColor');
    set({ currentColor: color || 'white' });
  }

  return {
    currentColor: '',

    init,
    setCurrentColor,
  }
});

export default useStore;
