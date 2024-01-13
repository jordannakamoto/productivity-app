import { appWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

const setWindowTitleToDate = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const newTitle = formattedDate.replace(',', ' -');
  appWindow.setTitle(newTitle);
};

const InitClient = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.__TAURI__ !== 'undefined') {
      setWindowTitleToDate();
    }
  }, []);

  return null; // This component does not render anything
};

export default InitClient;
