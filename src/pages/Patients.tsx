import React from "react";
import Container from "../components/ui/Container";
import { useOutletContext } from "react-router-dom";
import PatientsComponent from "../components/PatientsComponent";
import { patients } from "../components/data/PatientsData";

type LayoutContext = {
  searchQuery: string;
}

const Patients = () => {
  const {searchQuery} = useOutletContext<LayoutContext>();

  return (
    <Container>
      <div className=" w-full">
        <PatientsComponent patients={patients} searchQuery={searchQuery}/>
      </div>
    </Container>
  );
};

export default Patients;
