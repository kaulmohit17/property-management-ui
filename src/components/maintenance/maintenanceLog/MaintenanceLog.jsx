import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import MaintenanceLogUpdateForm from '../form/MaintenanceLogUpdateForm';
import { useEquipmentContext } from '../../../contexts/EquipmentContext';
import EquipmentHeader from '../../equipment/EquipmentHeader'
import { Box, Heading, Stack, Text, Flex, Button, ButtonGroup, HStack, Badge } from '@chakra-ui/react';

const MaintenanceLog = () => {
  const { tagNumber } = useParams();
  const [logs, setLogs] = useState([])
  const [showUpdatedForm, setShowUpdatedForm] = useState(false);
  const [selectedLog, setSelectedLog] = useState();

  const { state } = useEquipmentContext();

  const equipment = state.equipments?.find((eq) => eq.tagNumber === tagNumber);

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLogs = async () => {
    const response = await axios.get(`/api/v1/maintenanceRecords/equipments/${tagNumber}`)
    // const response = await axios.get(`http://localhost:8080/api/v1/maintenanceRecords/equipments/${tagNumber}`)
    // Assuming `response` is the array received from the backend, sorting on the request date
    Object.values(response).sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
    setLogs(response.data);
  }

  const handleMaintenanceLogDelete = async (maintenanceRecordId) => {
    await axios.delete(`/api/v1/maintenanceRecords/${maintenanceRecordId}`)
    // await axios.delete(`http://localhost:8080/api/v1/maintenanceRecords/${maintenanceRecordId}`)
    setLogs(prevLogs => prevLogs.filter(logId => logId.maintenanceRecordId !== maintenanceRecordId));
  }

  const handleMaintenanceLogUpdate = (selectedLog) => {
    setSelectedLog(selectedLog);
    setShowUpdatedForm(true);
  }

  const updateLog = () => {
    fetchLogs();
    setShowUpdatedForm(false);
  }

  const generateMaintenanceLogFields = (data, index) => {
    return (
      <Flex direction="column"
        key={index}
        margin="20px auto"
        bg="gray.100"
        borderRadius="md"
        width="70%">
        {Object.entries(data).map(([key, value]) => {
          if (key === "maintenanceType") {
            return (
              <Box key={index}
                p="1rem"
                display="flex"
                justifyContent="space-between"
              >
                <HStack spacing={2} key={key + value}>
                  <Badge fontSize="1.2rem"
                    variant="outline"
                    colorScheme="teal"
                    borderRadius="md"
                    key={index}>
                    {value}
                  </Badge>
                  {data.completionDate ? <Badge fontSize="lg"
                    colorScheme="teal"
                    variant="outline"
                    borderRadius="md"
                    key={index}>
                    COMPLETED
                  </Badge> : (
                    <Badge fontSize="1.2rem"
                      colorScheme="teal"
                      variant="outline"
                      borderRadius="md"
                      key={index}>
                      PENDING
                    </Badge>)}
                </HStack>
                <ButtonGroup>
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => handleMaintenanceLogUpdate(data)} >UPDATE</Button>
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => handleMaintenanceLogDelete(data.maintenanceRecordId)} >DELETE</Button>
                </ButtonGroup>
              </Box>
            )
          }
          if (value &&
            !(Array.isArray(value) && value.length === 0) &&
            key !== "maintenanceRecordId" &&
            key !== "maintenanceType" &&
            !(key === "maintenanceCost" && value === "0.0")) {
            return (
              <Box key={key + value} p="0.5rem">
                <Text fontWeight="bold">{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Text>
                <Text>{key === "requestedBy" ? value.firstName + value.lastName :
                  key === "technicians" ? value.map(technician => technician.firstName + " " + technician.lastName).join(", ") :
                    value}</Text>
              </Box>
            )
          }
          return null;
        })}
      </Flex>
    );
  }

  if (!equipment) return <p>Data not found.</p>;
  return (
    <Box w="90%" m="auto">
      {showUpdatedForm ?
        (<MaintenanceLogUpdateForm
          log={selectedLog}
          onUpdate={() => updateLog()}
          onCancel={() => setShowUpdatedForm(false)}
        />)
        :
        (
          <>
            <Heading size='xl'
              textAlign="center"
              padding="2rem">Maintenance Log/Logs
            </Heading>
            <Stack justify="center"
              bg="gray.100"
              borderRadius="md"
              width="70%"
              margin="auto">
              <EquipmentHeader equipment={equipment} />
            </Stack>
            {logs?.map((log, index) => (
              generateMaintenanceLogFields(log, index)
            ))};
          </>)
      }
    </Box>
  );
}

export default MaintenanceLog;