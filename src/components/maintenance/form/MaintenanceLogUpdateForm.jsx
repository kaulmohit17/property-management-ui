import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Select as ChakraSelect, FormLabel, Heading, Textarea, Input, Stack, ButtonGroup, Button, RadioGroup, Radio, FormControl, Box, InputGroup, InputRightElement, IconButton, VStack } from '@chakra-ui/react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useTechnicianContext } from '../../../contexts/TechnicianContext';
import Select from 'react-select';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const MaintenanceLogUpdateForm = ({ log, onUpdate, onCancel }) => {
  const { register, control, handleSubmit, watch, reset } = useForm();
  const { technicians } = useTechnicianContext();
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState('');


  const onSubmit = async (updatedLog) => {
    updatedLog = {
      ...updatedLog,
      requestedDate: updatedLog.requestedDate && format(updatedLog.requestedDate, "MM/dd/yyyy"),
      startDate: updatedLog.startDate && format(updatedLog.startDate, "MM/dd/yyyy"),
      completionDate: updatedLog.completionDate && format(updatedLog.completionDate, "MM/dd/yyyy"),
      requestedBy: technicians.find((technician) => technician.technicianId === updatedLog.requestedBy),
      technicians: updatedLog.technicians.map(technicianId => technicians.find(technician => technician.technicianId === technicianId))
    }
    await axios.put(`/api/v1/maintenanceRecords/${log.maintenanceRecordId}`, updatedLog);
    onUpdate();
  }

  function formattedString(log) {
    const lowerCaseString = log.maintenanceType.toLowerCase();
    return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1)
  }

  const technicianOptions = technicians.map((technician) => ({
    value: technician.technicianId,
    label: `${technician.firstName} ${technician.lastName}`
  }));

  const handleAddPart = () => {
    if (newPart.trim() !== '') {
      setParts([...parts, newPart]);
      setNewPart('');
    }
  };

  const handleRemovePart = (index) => {
    // Logic to remove the part from the addedParts array
    const updatedParts = [...parts];
    updatedParts.splice(index, 1);
    setParts(updatedParts);
  };


  if (!log) return <p>Data not found.</p>;
  return (
    <Box padding="1rem"
      width="75%"
      margin="auto">
      <Heading align="center">Update Log </Heading>
      <FormControl>
        <FormLabel>Maintenance Type</FormLabel>
        <ChakraSelect
          placeholder='Select Maintenance Type'
          mb="1rem"
          borderColor="teal"
          defaultValue={formattedString(log)}
          {...register("maintenanceType", { required: true })}
        >
          <option value='Preventive'>Preventive</option>
          <option value='Repair'>Repair</option>
          <option value='Service'>Service</option>
          <option value='Greece'>Greece</option>
        </ChakraSelect>
      </FormControl>
      <FormControl>
        <FormLabel>Equipment Issue</FormLabel>
        <Input
          type="text"
          mb="1rem"
          borderColor="teal"
          {...register('equipmentIssue')}
          defaultValue={log.equipmentIssue}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Maintenance Cost:</FormLabel>
        <Input
          type="text"
          mb="1rem"
          borderColor="teal"
          {...register('maintenanceCost')}
          defaultValue={log.maintenanceCost}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Maintenance Facility Name</FormLabel>
        <Controller
          name="maintenanceFacilityName"
          control={control}
          defaultValue={log.maintenanceFacilityName}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Stack direction='row' mb="1rem">
                <Radio value='Site_G' borderColor="teal">Site G</Radio>
                <Radio value='Site_M' borderColor="teal">Site M</Radio>
              </Stack>
            </RadioGroup>
          )}
          rules={{ required: { value: true, message: "This is required" } }}
        />
      </FormControl>
      <FormControl style={{ position: 'relative', zIndex: 2 }}>
        <FormLabel>Requested By</FormLabel>
        <Controller
          control={control}
          name="requestedBy"
          defaultValue={log.requestedBy.technicianId}
          render={({ field: { onChange, value, name } }) => (
            <Select
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: 'teal',
                  marginBottom: '1rem',
                  zIndex: 10000
                }),
              }}
              isMulti={false}
              isSearchable={true}
              name={name}
              placeholder="Select Requested By"
              options={technicianOptions}
              value={technicianOptions.filter(technician => value.includes(technician.value))}
              onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : null)}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Requested Date</FormLabel>
        <Controller
          name="requestedDate"
          control={control}
          defaultValue={new Date(log.requestedDate)}
          render={({ field }) => (
            <DayPicker
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              formatDate={date => format(date, "MM/dd/yyyy")}
            />
          )}
          rules={{ required: { value: true, message: "This is required" } }}
        />
      </FormControl>
      <FormControl style={{ position: 'relative', zIndex: 2 }}>
        <FormLabel>Technician(s):</FormLabel>
        <Controller
          control={control}
          name="technicians"
          defaultValue={log.technicians.map((technician) => technician.technicianId)}
          render={({ field: { onChange, value, name } }) => (
            <Select
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: 'teal',
                  marginBottom: '1rem'
                }),
              }}
              isMulti={true}
              isSearchable={true}
              name={name}
              placeholder="Select Technicians"
              options={technicianOptions}
              value={technicianOptions.find(e => e.value === value)}
              onChange={e => onChange(e.map((technician) => technician.value))}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel mt="1rem">Add Parts</FormLabel>
        <VStack spacing={4}>
          <InputGroup>
            <InputRightElement>
              <IconButton
                aria-label="Add Part"
                icon={<AddIcon />}
                onClick={handleAddPart}
                colorScheme="teal"
              />
            </InputRightElement>
            <Input
              placeholder="Enter Part Name"
              mb="1rem"
              value={newPart}
              onChange={(e) => setNewPart(e.target.value)}
              borderColor="teal" />
          </InputGroup>
          {parts?.map((part, index) => (
            <InputGroup key={index}>
              <Input
                value={part}
                isReadOnly
                paddingRight="0"
                _focus={{ boxShadow: 'none' }}
                mb="1rem"
                borderColor="teal"
              />
              <InputRightElement>
                <IconButton
                  aria-label="Remove Part"
                  icon={<MinusIcon />}
                  onClick={() => handleRemovePart(index)}
                  colorScheme="teal"
                />
              </InputRightElement>
            </InputGroup>
          ))}
        </VStack>
      </FormControl>
      <FormControl>
        <FormLabel>Start Date</FormLabel>
        <Controller
          name="startDate"
          control={control}
          defaultValue={log.startDate ? new Date(log.startDate) : null}
          render={({ field }) => (
            <DayPicker
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date(watch("requestedDate"))}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Completion Date</FormLabel>
        <Controller
          name="completionDate"
          control={control}
          defaultValue={log.completionDate ? new Date(log.completionDate) : null}
          render={({ field }) => (
            <DayPicker
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date < new Date(watch("requestedDate"))}
            />
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel mt="1rem">Additional Notes</FormLabel>
        <Textarea
          borderColor="teal"
          {...register('maintenanceAdditionalNotes')}
          defaultValue={log.maintenanceAdditionalNotes}
        />
      </FormControl>
      <Stack direction='column'>
        <ButtonGroup gap='10' m='auto' mt="1rem">
          <Button
            colorScheme='teal'
            type='submit'
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
          <Button
            colorScheme='teal'
            type="submit"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}

export default MaintenanceLogUpdateForm;