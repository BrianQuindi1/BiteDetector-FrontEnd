import { createContext, useState } from 'react';

export const HistorialContext = createContext();

 const HistorialProvider = ({ children }) => {
  const [actualizarHistorial, setActualizarHistorial] = useState(0);

  return (
    <HistorialContext.Provider value={{ actualizarHistorial, setActualizarHistorial }}>
      {children}
    </HistorialContext.Provider>
  );
};

export {HistorialProvider};  