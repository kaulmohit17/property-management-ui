import React from "react";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Select as ChakraSelect, FormLabel, Textarea, Input, Stack, ButtonGroup, Button, RadioGroup, Radio, FormControl, Box } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useTechnicianContext } from '../../../contexts/TechnicianContext';
import Select from 'react-select';

const MaintenanceRequestForm = ({ tagNumber }) => {
  const { register, control, handleSubmit } = useForm();
  const { technicians } = useTechnicianContext();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const body = {
      ...data, tagNumber,
      requestedDate: format(data.requestedDate, "MM/dd/yyyy"),
      requestedBy: technicians.find((technician) => technician.technicianId === data.requestedBy)
    };
    postLogs(body);
  };

  const postLogs = async (body) => {
    // await axios.post(`http://localhost:8080/api/v1/maintenanceRecords`, body);
    await axios.post(`/api/v1/maintenanceRecords`, body);
    navigate({
      pathname: `/maintenance-logs/${tagNumber}`,
    });
  }

  const onCancel = () => {
    navigate({
      pathname: `/`,
    });
  }

  const technicianOptions = technicians.map((technician) => ({
    value: technician.technicianId,
    label: `${technician.firstName} ${technician.lastName}`
  }));

  return (
    <Box
      padding="1rem"
      width="75%"
    >
      <FormControl>
        <FormLabel>Maintenance Type</FormLabel>
        <ChakraSelect placeholder='Select Maintenance Type'
          mb="1rem"
          borderColor="teal"
          {...register("maintenanceType", { required: true })}>
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
        />
      </FormControl>
      <FormControl>
        <FormLabel>Maintenance Facility Name</FormLabel>
        <Controller
          name="maintenanceFacilityName"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Stack direction='row' mb="1rem" >
                <Radio value='Site_G' borderColor="teal">Site G</Radio>
                <Radio value='SiteM' borderColor="teal">Site M</Radio>
              </Stack>
            </RadioGroup>
          )}
          rules={{ required: { value: true, message: "This is required" } }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Requested By</FormLabel>
        <Controller
          control={control}
          name="requestedBy"
          render={({ field: { onChange, value, name } }) => (
            <Select
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: 'teal',
                  marginBottom: '1rem',
                  backgroundColor: 'inherit'
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 10, // Set a higher zIndex value
                }),
              }}
              isMulti={false}
              isSearchable={true}
              name={name}
              placeholder="Select Requested By"
              options={technicianOptions}
              value={technicianOptions.find(technician => value === technician.value)}
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
          render={({ field }) => (
            <DayPicker
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
            />
          )}
          rules={{ required: { value: true, message: "This is required" } }}
        />
      </FormControl>
      <FormControl>
        <FormLabel >Additional Notes</FormLabel>
        <Textarea borderColor="teal"
          {...register('maintenanceAdditionalNotes')}
        />
      </FormControl>
      <Stack direction='column'>
        <ButtonGroup gap='10' m='auto' mt="1rem">
          <Button
            colorScheme='teal'
            type='submit'
            onClick={handleSubmit(onSubmit)}
          >Add Request</Button>
          <Button
            colorScheme='teal'
            type="submit"
            onClick={() => onCancel()}>Cancel</Button>
        </ButtonGroup>
      </Stack>
    </Box >
  );
}

export default MaintenanceRequestForm;
