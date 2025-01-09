import { Form } from "react-bootstrap";

export const SearchComponent = ({
  handleOnChange,
  searchTerm,
  placeholder = "Search...",
  searchStyle = "p-2 mb-3 bg-white text-secondary fw-medium w-50",
}) => {
  return (
    <Form>
      <Form.Control
        placeholder={placeholder}
        onChange={handleOnChange}
        type="search"
        className={searchStyle}
        value={searchTerm}
        autoFocus
      />
    </Form>
  );
};
