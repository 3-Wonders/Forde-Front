import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isLocalHistory: boolean;
  setIsLocalHistory: (value: boolean) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLocalHistory: true, // 기본값은 true로 설정
      setIsLocalHistory: (value: boolean) => set({ isLocalHistory: value }),
    }),
    {
      name: 'app-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useAppStore;
