import {createContext, useContext, useState} from 'react';

export const TripContext = createContext();

const TripContextProvider = ({children}) => {
  const [tripData, setTripData] = useState([]);

  const tripValues = {
    tripData,
    setTripData,
  };

  return <TripContext.Provider value={tripValues}>{children}</TripContext.Provider>;
};
export default TripContextProvider;

export function useTripContext() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('context must be used in context provider');
  }
  return context;
}
