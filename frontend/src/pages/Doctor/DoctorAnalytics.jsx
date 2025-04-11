import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = ["#0d6efd", "#198754", "#dc3545"];

export const DoctorAnalytics = () => {
  const analyticsData = {
    totalAppointments: 120,
    completedAppointments: 90,
    cancelledAppointments: 10,
    patients: 65,
  };

  const chartData = [
    { name: "Completed", value: analyticsData.completedAppointments },
    { name: "Cancelled", value: analyticsData.cancelledAppointments },
    {
      name: "Pending",
      value:
        analyticsData.totalAppointments -
        analyticsData.completedAppointments -
        analyticsData.cancelledAppointments,
    },
  ];

  const lineChartData = [
    { date: "2025-04-01", appointments: 10 },
    { date: "2025-04-02", appointments: 20 },
    { date: "2025-04-03", appointments: 5 },
    { date: "2025-04-04", appointments: 15 },
  ];

  const handleExportCSV = () => {
    console.log("Export CSV triggered");
    // Use a library like 'xlsx' or manually create a CSV blob
  };

  const handleExportPDF = () => {
    console.log("Export PDF triggered");
    // Use a library like 'jsPDF'
  };

  return (
    <Container className="mt-5">
      <h3
        className="mb-4 fw-semibold"
        style={{
          color: "#2D4263",
        }}
      >
        Doctor Analytics
      </h3>

      <div className="d-flex justify-content-end gap-2 mb-3">
        <Button variant="outline-secondary rounded-4" onClick={handleExportCSV}>
          Export as CSV
        </Button>
        <Button variant="outline-secondary rounded-4" onClick={handleExportPDF}>
          Export as PDF
        </Button>
      </div>

      <Row className="g-4">
        <Col md={3}>
          <Card className="shadow-lg border-0 rounded-4 p-3">
            <h6 className="text-muted">Total Appointments</h6>
            <h2 className="text-primary">{analyticsData.totalAppointments}</h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-lg border-0 rounded-4 p-3">
            <h6 className="text-muted">Completed</h6>
            <h2 className="text-success">
              {analyticsData.completedAppointments}
            </h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-lg border-0 rounded-4 p-3">
            <h6 className="text-muted">Cancelled</h6>
            <h2 className="text-danger">
              {analyticsData.cancelledAppointments}
            </h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-lg border-0 rounded-4 p-3">
            <h6 className="text-muted">Total Patients</h6>
            <h2 className="text-info">{analyticsData.patients}</h2>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 g-4">
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 p-4">
            <h6
              className="mb-3"
              style={{
                color: "#2D4263",
              }}
            >
              Appointment Breakdown
            </h6>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 p-4">
            <h6
              className="mb-3"
              style={{
                color: "#2D4263",
              }}
            >
              Appointments Over Time
            </h6>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#0d6efd"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
