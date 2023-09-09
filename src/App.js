import { Route, Routes } from 'react-router-dom';
import './App.css';
import EquipmentList from './components/equipment/EquipmentList';
import { EquipmentContextProvider } from './contexts/EquipmentContext';
import MaintenanceRequest from './components/maintenance/maintenanceRequest/MaintenanceRequest';
import MaintenanceLog from './components/maintenance/maintenanceLog/MaintenanceLog';
import { TechnicianContextProvider } from './contexts/TechnicianContext';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  return (
    <EquipmentContextProvider>
      <TechnicianContextProvider>
        <Dashboard />
          <Routes>
            <Route exact path="/" element={<EquipmentList />} />
            <Route path="/maintenance-requests/:tagNumber" element= {<MaintenanceRequest />} />
            <Route path="/maintenance-logs/:tagNumber" element={<MaintenanceLog />} />
            {/* <Route path="/parts" component={Parts} /> */}
            {/* <Route path="/technicians" component={Technicians} /> */}
          </Routes>
      </TechnicianContextProvider>
    </EquipmentContextProvider>
  );
}

export default App;