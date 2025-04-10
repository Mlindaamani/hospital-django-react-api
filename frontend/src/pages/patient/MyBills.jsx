import React, { useEffect } from "react";
import { useBilsStore } from "../../store/billsStore";
import { Table } from "react-bootstrap";

export const MyBills = () => {
  const { bills, getBills } = useBilsStore();

  useEffect(() => {
    getBills();
  }, [getBills]);

  return (
    <div className="table-responsive mt-5">
      <Table striped hover borderless className="align-middle">
        <thead className="table-light">
          <tr>
            <th>DoctorName</th>
            <th>Amount</th>
            <th>Specialization</th>
            <th>Specialization Rate($)</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.doctor_name}</td>
              <td>{bill.amount}</td>
              <td>{bill.doctor_specialization}</td>
              <td>{bill.doctor_specialization_rate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
