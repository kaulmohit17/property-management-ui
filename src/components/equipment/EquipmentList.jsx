import React, { useEffect, useState } from 'react';
import * as S from './EquipmentList.styles';
import Equipment from './Equipment'
import { useEquipmentContext } from '../../contexts/EquipmentContext';
import Fuse from 'fuse.js';
import { InputGroup } from "@chakra-ui/react";


const EquipmentList = () => {
  const { state } = useEquipmentContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(state.equipments);
  }, [state.equipments]);

  const fuseOptions = {
    keys: ['manufacturer', 'equipmentType', 'equipmentModel', 'tagNumber'],
    threshold: 0.5,
  };

  const fuse = new Fuse(state.equipments, fuseOptions);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    if (event.target.value.trim() !== "") {
      const results = fuse.search(event.target.value);
      setSearchResults(results.map((result) => result.item));
    } else {
      setSearchResults(state.equipments);
    }
  };

  return (
    <div>
      <S.PageTitle>Equipment List</S.PageTitle>
      <InputGroup width="30%" ml="50%" mb="1rem">
        <S.SearchInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Equipment..."
        />
      </InputGroup>
      {searchResults?.map((equipment, index) => (
        <Equipment key={index} equipment={equipment} />
      ))}
    </div>
  );
};

export default EquipmentList;