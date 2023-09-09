import React from 'react';
import { useParams } from 'react-router-dom';
import { useEquipmentContext } from '../../../contexts/EquipmentContext';
import MaintenanceRequestForm from '../form/MaintenanceRequestForm';
import EquipmentHeader from '../../equipment/EquipmentHeader'
import { Heading, Flex } from '@chakra-ui/react'

const MaintenanceRequest = () => {
  const { tagNumber } = useParams();
  const { state } = useEquipmentContext();


  const equipment = state.equipments?.find((eq) => eq.tagNumber === tagNumber);

  if (!equipment) return <p>Data not found.</p>;

  return (
    <Flex width="70%"
    margin="auto"
    backgroundColor="gray.100"
    display="flex"
    flexDirection="column"
    alignItems="center">
      <Heading size="xl" textAlign="center" padding="2rem">
        Add Maintenance Service Request
      </Heading>
      <EquipmentHeader equipment={equipment} />
      <MaintenanceRequestForm tagNumber={equipment.tagNumber} />
    </Flex>
  );
};
export default MaintenanceRequest;
