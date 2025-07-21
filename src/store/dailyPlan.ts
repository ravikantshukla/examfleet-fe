import { create } from 'zustand';
import { Topic } from '@/types';
import { mockDailyPlan } from '@/services/mockData';

interface DailyPlanStore {
  plan: Topic[];
  loadPlan: () => void;
}
export const useDailyPlanStore = create<DailyPlanStore>((set) => ({
  plan: [],
  loadPlan: () => set({ plan: mockDailyPlan }),
}));
