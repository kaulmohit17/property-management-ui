import React from "react";
import { Box, Flex, Text } from '@chakra-ui/react'

const EquipmentHeader = ({ equipment }) => {

  if (!equipment) return <p>Data not found.</p>;

  return (
    <Box margin="auto" width="80%">
      {console.log("inside equipment header for equipment: ", equipment)}
      <Flex px="10" py="2">
        <Text width="25%" fontWeight="bold">Manufacturer</Text>
        <Text width="25%" fontWeight="bold">Equipment Type</Text>
        <Text width="25%" fontWeight="bold">Equipment Model</Text>
        <Text width="25%" fontWeight="bold">TAG Number</Text>
      </Flex>
      <Flex px="10" py="2">
        <Box
          width="25%"
          title={equipment.manufacturer}
        >
          {equipment.manufacturer}
        </Box>
        <Box
          width="25%"
          title={equipment.equipmentType}
        >
          {equipment.equipmentType}
        </Box>
        <Box
          width="25%"
          title={equipment.equipmentModel}
        >
          {equipment.equipmentModel}
        </Box>
        <Box
          width="25%"
          title={equipment.tagNumber}
        >
          {equipment.tagNumber}
        </Box>
      </Flex>
    </Box>
  );
}

export default EquipmentHeader;