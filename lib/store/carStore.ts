import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { Car } from '@/types/note'; Replace with your actual import path for Car type

type CarDraftStore = {
  draft: Record<string, string>; // Replace with your actual type for the draft, e.g., Car type
  setDraft: (note: Record<string, string>) => void; // Replace with your actual type for the draft, e.g., Car type
  clearDraft: () => void;
};

const initialDraft: Record<string, string> = { // Replace with your actual initial draft structure, e.g., Car type
  title: '',
  content: '',
  tag: 'Todo',
};

export const useCarDraftStore = create<CarDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (car) => set(() => ({ draft: car })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'car-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);