import type { Dispatch} from 'react';
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue = ''
): [string, Dispatch<string>] {
  const [value, setValue] = useState<string>(
    () => {
        const item = window.localStorage.getItem(key);
        return ((item === null || item === "") ? initialValue : item);
    });

  const setItem = (newValue: string): void => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  };

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (value !== newValue) {
      setValue((newValue === null || newValue === "") ? initialValue : newValue);
    }
  }, [initialValue, key, value]);

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue((event.newValue === null || event.newValue === "") ? initialValue : event.newValue);
      }
    },
    [initialValue, key, value]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => { window.removeEventListener('storage', handleStorage); };
  }, [handleStorage]);

  return [value, setItem];
}