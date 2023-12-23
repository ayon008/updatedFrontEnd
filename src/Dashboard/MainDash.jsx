import React from 'react';
import DashboardResponsive from './DashboardResponsive';
import Dashboard from './Dashboard';

const MainDash = () => {
  return (
    <div className="flex">
      <div>
        <DashboardResponsive></DashboardResponsive>
      </div>
     <Dashboard></Dashboard>
    </div>
  );
};

export default MainDash;