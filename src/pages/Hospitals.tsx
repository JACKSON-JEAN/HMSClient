import Container from "../components/ui/Container";
import HospitalComponent from "../components/HospitalsComponent";
import { hospitals } from "../components/data/HospitalData";

const Hospitals = () => {
  return (
    <Container>
      <div className="w-full bg-white p-4 border rounded-sm">
        <HospitalComponent hospitals={hospitals}/>
      </div>
    </Container>
  );
};

export default Hospitals;
