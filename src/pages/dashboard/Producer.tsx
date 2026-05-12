
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProducerOverview from './producer/Overview';
import ProducerHandlers from './producer/Handlers';
import ProducerMap from './producer/Map';
import ProducerAnalytics from './producer/Analytics';
import ProducerReports from './producer/Reports';

const ProducerDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<ProducerOverview />} />
        <Route path="handlers" element={<ProducerHandlers />} />
        <Route path="map" element={<ProducerMap />} />
        <Route path="analytics" element={<ProducerAnalytics />} />
        <Route path="reports" element={<ProducerReports />} />
        <Route path="*" element={<Navigate to="/dashboard/producer" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ProducerDashboard;
