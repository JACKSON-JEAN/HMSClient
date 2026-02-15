import Container from "../components/ui/Container";
import HospitalComponent from "../components/HospitalsComponent";

const Hospitals = () => {
  return (
    <Container>
      <div className="w-full bg-white p-4 border rounded-sm">
        {/* <ListNav
          searchPlaceholder="Search Hospital..."
          addLabel="New Hospital"
          onAdd={() => console.log("Hospital added")}
        /> */}
        <HospitalComponent/>
      </div>
    </Container>
  );
};

export default Hospitals;
