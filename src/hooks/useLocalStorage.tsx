import { useState } from 'react';


const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);

      if (!v) localStorage.setItem(key, JSON.stringify(defaultValue));

      return v ? JSON.parse(v) : defaultValue;

    } catch (err) {
      console.log(err);
      return defaultValue;
    }
  });

  const setLocalStorageStateValue = (v: string) => {
    let newValue = v;
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }

  return [value, setLocalStorageStateValue];
}

export default useLocalStorage;
