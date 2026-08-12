import { useState, useEffect } from 'react';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  showAuthModal: boolean;
  isRegistered: boolean;
}

const getSavedToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('gfm_token');
};

const getSavedUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('gfm_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const initialToken = getSavedToken();
const initialUser = getSavedUser();

let state: AuthState = {
  user: initialUser,
  token: initialToken,
  showAuthModal: false,
  isRegistered: !!(initialToken && initialUser),
};

type AuthListener = (s: AuthState) => void;
let listeners: AuthListener[] = [];

function emit() {
  listeners.forEach((fn) => fn(state));
}

export const authStore = {
  setAuth: (user: User, token: string) => {
    localStorage.setItem('gfm_token', token);
    localStorage.setItem('gfm_user', JSON.stringify(user));
    state = { ...state, user, token, isRegistered: true, showAuthModal: false };
    emit();
  },
  logout: () => {
    localStorage.removeItem('gfm_token');
    localStorage.removeItem('gfm_user');
    state = { user: null, token: null, isRegistered: false, showAuthModal: false };
    emit();
  },
  toggleAuthModal: (show?: boolean) => {
    state = { ...state, showAuthModal: show !== undefined ? show : !state.showAuthModal };
    emit();
  },
  init: () => {
    const savedUser = getSavedUser();
    const token = getSavedToken();
    if (savedUser && token) {
      state = { ...state, user: savedUser, token, isRegistered: true };
    } else {
      state = { ...state, user: null, token: null, isRegistered: false };
    }
    emit();
  },
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(state);

  useEffect(() => {
    listeners.push(setAuthState);
    return () => {
      listeners = listeners.filter((fn) => fn !== setAuthState);
    };
  }, []);

  return {
    ...authState,
    setAuth: authStore.setAuth,
    logout: authStore.logout,
    toggleAuthModal: authStore.toggleAuthModal,
  };
}
