import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../services/api/config";
import { Form } from "react-bootstrap";

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
