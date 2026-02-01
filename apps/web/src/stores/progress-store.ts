import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VideoProgressState {
  positions: Record<string, number>; // lessonId -> seconds
  lastLesson: Record<string, string>; // courseId -> lessonId
}

interface VideoProgressActions {
  setPosition: (lessonId: string, seconds: number) => void;
  getPosition: (lessonId: string) => number;
  setLastLesson: (courseId: string, lessonId: string) => void;
  getLastLesson: (courseId: string) => string | null;
  clearProgress: () => void;
}

type VideoProgressStore = VideoProgressState & VideoProgressActions;

export const useVideoProgressStore = create<VideoProgressStore>()(
  persist(
    (set, get) => ({
      positions: {},
      lastLesson: {},

      setPosition: (lessonId, seconds) => {
        set((state) => ({
          positions: {
            ...state.positions,
            [lessonId]: seconds,
          },
        }));
      },

      getPosition: (lessonId) => {
        return get().positions[lessonId] || 0;
      },

      setLastLesson: (courseId, lessonId) => {
        set((state) => ({
          lastLesson: {
            ...state.lastLesson,
            [courseId]: lessonId,
          },
        }));
      },

      getLastLesson: (courseId) => {
        return get().lastLesson[courseId] || null;
      },

      clearProgress: () => {
        set({ positions: {}, lastLesson: {} });
      },
    }),
    {
      name: 'siolabs-video-progress',
    }
  )
);
