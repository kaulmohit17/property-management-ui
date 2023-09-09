import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const TechnicianContext = createContext();

export const TechnicianContextProvider = ({ children }) => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    // const response = await axios.get(`http://localhost:8080/api/v1/technicians`);
    const response = await axios.get(`/api/v1/technicians`);
    setTechnicians(response.data );
  }

  return (
    <TechnicianContext.Provider value={{ technicians, setTechnicians }}>
      {children}
    </TechnicianContext.Provider>
  );
};


export const useTechnicianContext = () => useContext(TechnicianContext);