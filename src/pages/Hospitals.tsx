import Container from "../components/ui/Container";
import HospitalComponent from "../components/HospitalsComponent";
import { hospitals } from "../components/data/HospitalData";
import {useOutletContext} from "react-router-dom"

type LayoutContext = {
  searchQuery: string;
}

const Hospitals = () => {
  const {searchQuery} = useOutletContext<LayoutContext>();
  return (
    <Container>
      <div className="w-full">
        <HospitalComponent hospitals={hospitals} searchQuery={searchQuery}/>
      </div>
    </Container>
  );
};

export default Hospitals;
