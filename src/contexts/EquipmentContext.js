import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const EquipmentContext = createContext();

export const EquipmentContextProvider = ({ children }) => {
  const [state, setState] = useState({
    equipments: undefined
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    // const response = await axios.get(`http://localhost:8080/api/v1/equipments`);
    const response = await axios.get(`/api/v1/equipments`);
    setState({ ...state, equipments: response.data });
  }

  return (
    <EquipmentContext.Provider value={{ state, setState }}>
      {children}
    </EquipmentContext.Provider>
  );
};


export const useEquipmentContext = () => useContext(EquipmentContext);