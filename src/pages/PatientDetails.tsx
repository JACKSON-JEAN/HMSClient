import React from "react";
import Container from "../components/ui/Container";
import PatientHeader from "../components/PatientHeader";
import PatientAlertStrip from "../components/PatientAlertStrip";
import PatientDetailTabs from "../components/PatientDetailTabs";


const PatientDetails: React.FC = () => {
  return (
    <Container>
      <div className="space-y-4">
        <PatientHeader />
        <PatientAlertStrip/>
        <PatientDetailTabs/>
      </div>
    </Container>
  );
};

export default PatientDetails;
