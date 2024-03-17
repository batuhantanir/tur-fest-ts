import { User } from '@/types/user';
import { produce } from 'immer';
import { create } from 'zustand';

type State = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type Actions = {
  login: (user: User) => void
  setLoading: (bool: Boolean) => void
  logout: () => void
}

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => {
    set(
      produce((state) => {
        state.isAuthenticated = true;
        state.user = user;
        state.isLoading = false;
      })
    );
  },
  setLoading: (bool) => {
    set(
      produce((state) => {
        state.isLoading = bool;
      })
    );
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set(
      produce((state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
    );
  },
}));

