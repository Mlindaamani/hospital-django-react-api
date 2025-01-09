import { Card, ListGroup } from "react-bootstrap";
import { Order } from "./Order";
import { useStore } from "../../store/stote";
import { medicines } from "../../schema/data";

export const Zustand = () => {
  const addItem = useStore((state) => state.addItem);

  return (
    <div className="d-flex flex-column p-3 rounded-top-5">
      <div className="order">
        <div className="items">
          {medicines.map((medicine) => (
            <Card
              style={{ width: "18rem" }}
              bg="success"
              text="light"
              key={medicine.id}
              onClick={() => addItem(medicine)}
              className="med-card"
            >
              <Card.Header>{medicine.name}</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>{medicine.description}</ListGroup.Item>
                <ListGroup.Item className="text-success fw-bold">
                  $ {medicine.price}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          ))}
        </div>
        <Order />
      </div>
    </div>
  );
};
