import React from 'react';
import { Box,Stack, Heading, Divider, Flex, Button} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import EquipmentHeader from './EquipmentHeader';

const Equipment = ({ equipment }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" bg="gray.100" width="80%" m="20px auto">
      <Stack mt="6" spacing="3">
        <Heading size="md">
          <EquipmentHeader equipment={equipment} />
        </Heading>
      </Stack>
      <Divider />
      <Box p="4">
        <Flex justifyContent="space-around" alignItems="center">
          <Link to={`/maintenance-requests/${equipment.tagNumber}`}>
            <Button variant="solid" colorScheme="teal">
              Maintenance Service Request
            </Button>
          </Link>
          <Link to={`/maintenance-logs/${equipment.tagNumber}`}>
            <Button variant="solid" colorScheme="teal">
              View Maintenance Logs
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Equipment;


