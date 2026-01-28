import { useContext } from 'react';
import { TrackingContext } from './TrackingContext';

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;x  
};