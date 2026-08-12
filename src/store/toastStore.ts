import { useState, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

type ToastListener = (toasts: ToastMessage[]) => void;

let toasts: ToastMessage[] = [];
let listeners: ToastListener[] = [];

export const toast = {
  success: (msg: string) => addToast('success', msg),
  error: (msg: string) => addToast('error', msg),
  info: (msg: string) => addToast('info', msg),
};

function addToast(type: 'success' | 'error' | 'info', message: string) {
  const id = Math.random().toString(36).substring(2, 9);
  toasts = [...toasts, { id, type, message }];
  emit();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 4000);
}

function emit() {
  listeners.forEach((fn) => fn(toasts));
}

export function useToast() {
  const [currentToasts, setCurrentToasts] = useState<ToastMessage[]>(toasts);

  useEffect(() => {
    listeners.push(setCurrentToasts);
    return () => {
      listeners = listeners.filter((fn) => fn !== setCurrentToasts);
    };
  }, []);

  return currentToasts;
}
