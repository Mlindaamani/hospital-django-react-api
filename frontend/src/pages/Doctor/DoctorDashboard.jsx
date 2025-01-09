import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Zustand } from "./Zustand";
import { TestModal } from "./TestModal";
import {
  useCartAndThemeStore,
  useModalStore,
  useStore,
} from "../../store/stote";

export const DoctorDashboard = () => {
  const { showModal } = useModalStore((state) => ({
    showModal: state.showModal,
  }));

  const { items, clearCart, subTotal, itemCount } = useStore((state) => ({
    items: state.items,
    clearCart: state.clearCart,
    subTotal: state.getTotalPrice,
    itemCount: state.getTotalItems,
  }));

  const { theme, toggleTheme } = useCartAndThemeStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  return (
    <Container className="mt-5">
      <TestModal />
      <Container
        fluid
        className={`bg-${theme} p-0 d-flex justify-content-end flex-wrap align-items-center mb-5 rounded-5`}
      >
        <h4 className="mt-2 mb-2 p-5 text-start text-light fs-4">Dashbord</h4>
        <button
          className="btn btn-sm btn-light p-2 text-center mt-2 me-3 ms-2 text-light"
          onClick={toggleTheme}
        >
          🌙
        </button>
        <div className="d-flex gap-3 w-50">
          <Button
            onClick={showModal}
            size="sm"
            variant="success p-2 w-25"
            disabled={items.length === 0}
            className="text-nowrap"
          >
            PAY NOW $ {subTotal().toFixed(2)}
          </Button>

          <Button
            onClick={clearCart}
            disabled={items.length === 0}
            className="text-nowrap btn btn-danger btn-sm"
          >
            CLEAR CART
          </Button>

          <Button className="text-nowrap btn btn-primary text-light btn-sm p-2 rounded-5">
            SUBTOTAL: $ {subTotal().toFixed(2)}
          </Button>

          <Button className="text-nowrap btn btn-secondary btn-sm p-2 rounded-5">
            ITEMS: {itemCount()}
          </Button>
        </div>
        <Zustand />
      </Container>
      {/* <Row xs={8} md={12} className="g-5 d-flex flex-row">
        <Col>
          <Card className="mb-4">
            <Card.Header>FMS-2390-2024</Card.Header>
            <Card.Body>
              <Card.Text>Mlindaamani</Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quam
              accusantium labore dolor repellat, aliquam aliquid, consequuntur
              magni facere iure sed quisquam, commodi ut? Earum odio natus illum
              The language models it self will help you analysis the possible
              problemms with your app at the moment you create it as long dolor
              ut.
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>FMS-2390-2024</Card.Header>
            <Card.Body>
              <Card.Text>Mlindaamani</Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quam
              accusantium labore dolor repellat, aliquam aliquid, consequuntur
              magni facere iure sed quisquam, commodi ut? Earum odio natus illum
              dolor ut.
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>FMS-2390-2024</Card.Header>
            <Card.Body>
              <Card.Text>Mlindaamani</Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quam
              accusantium labore dolor repellat, aliquam aliquid, consequuntur
              magni facere iure sed quisquam, commodi ut? Earum odio natus illum
              dolor ut.
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>FMS-2390-2024</Card.Header>
            <Card.Body>
              <Card.Text>Mlindaamani</Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quam
              accusantium labore dolor repellat, aliquam aliquid, consequuntur
              magni facere iure sed quisquam, commodi ut? Earum odio natus illum
              dolor ut.
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>FMS-2390-2024</Card.Header>
            <Card.Body>
              <Card.Text>Mlindaamani</Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quam
              accusantium labore dolor repellat, aliquam aliquid, consequuntur
              magni facere iure sed quisquam, commodi ut? Earum odio natus illum
              dolor ut.
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};
