import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { axiosInstance } from "../../config/config";

export const MedicineSelect = ({
  title = "Select Medicines",
  hanleMedicineSelect,
}) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedines = async () => {
      try {
        const response = await axiosInstance.get("/medicines/");
        setMedicines(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedines();
  }, []);

  return (
    <Form.Select onChange={hanleMedicineSelect} size="lg" name="medicines">
      <option>{title}</option>
      {medicines.map((medicine) => (
        <option value={medicine.id} key={medicine.id}>
          {medicine.name}
        </option>
      ))}
    </Form.Select>
  );
};
