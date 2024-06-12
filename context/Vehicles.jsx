import { createContext, useContext } from 'react';



export const VehicleContext = createContext();

export const useVehicle = () => useContext(VehicleContext);

export const CheckPointContext = createContext();

export const RoundNumContext = createContext();

