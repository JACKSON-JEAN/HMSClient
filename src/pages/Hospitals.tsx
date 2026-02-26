import Container from "../components/ui/Container";
import HospitalComponent from "../components/HospitalsComponent";
import { hospitals } from "../components/data/HospitalData";

const Hospitals = () => {
  return (
    <Container>
      <div className="w-full">
        <HospitalComponent hospitals={hospitals}/>
      </div>
    </Container>
  );
};

export default Hospitals;
