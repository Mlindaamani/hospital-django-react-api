import React from "react";
import { useStore } from "../../store/stote";
import { Button, Container } from "react-bootstrap";
import { NoOrder } from "./NoOrder";

export const Order = () => {
  const { items, removeItem } = useStore((state) => ({
    items: state.items,
    removeItem: state.removeItem,
  }));

  if (items.length === 0) return <NoOrder />;

  return (
    <Container>
      <table className="table table-borderless border-light table-hover table-success">
        <caption className="caption-top text-bg-light p-2 rounded-4 text-center mb-2 fw-bold">Your Cart</caption>
        <thead>
          <tr>
            <th className="text-bg-success">🛒</th>
            <th className="text-bg-success">🤑</th>
            <th className="text-bg-success">🔢</th>
            <th className="text-end text-bg-success">🛑</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="text-secondary">{item.name}</td>
              <td>{item.price}</td>
              <td className="text-end">{item.quantity}</td>
              <td className="text-end">
                <Button
                  variant=" p-1 btn-sm text-bg-danger"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
