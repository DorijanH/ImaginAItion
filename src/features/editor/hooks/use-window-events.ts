import { useEvent } from 'react-use';

export function useWindowEvents() {
  /**
   * Handles the before unload event.
   */
  const handleBeforeUnload = (event: any) => {
    (event || window.event).returnValue = 'Are you sure you want to leave?';
  };

  useEvent('beforeunload', handleBeforeUnload);
}