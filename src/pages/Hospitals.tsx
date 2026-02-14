import Container from "../components/ui/Container";
import ListNav from "../components/ListNav";
import HospitalComponent from "../components/HospitalsComponent";

const Hospitals = () => {
  return (
    <Container>
      <div className="w-full bg-white p-2 border rounded-sm">
        <ListNav
          searchPlaceholder="Search Hospital..."
          addLabel="New Hospital"
          onAdd={() => console.log("Hospital added")}
        />
        <HospitalComponent/>
      </div>
    </Container>
  );
};

export default Hospitals;
