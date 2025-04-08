import React, { useEffect } from "react";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import { useAuthStore } from "../../store/AuthStore";

export const PatientProfile = () => {
  const { userProfile, profile } = useAuthStore();

  useEffect(() => {
    userProfile();
  }, [userProfile]);


  const profileData = {
    name: profile?.first_name,
    email: profile?.email,
    phone: "+123 456 7890",
    specialization: "Patient",
    address: "123 Oysterbay Street, Wellness City",
    imageUrl: `http://127.0.0.1:8000/${profile?.patient_profile_url}`,
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow rounded-4 border-0 p-4">
            <Row>
              <Col md={4} className="text-center mb-3">
                <Image
                  src={profileData.imageUrl}
                  roundedCircle
                  fluid
                  className="border border-2"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="mt-3 text-primary">{profileData.name}</h5>
                <p className="text-muted">{profileData.specialization}</p>
              </Col>

              <Col md={8}>
                <h5 className="mb-4 text-secondary">Profile Details</h5>
                <div className="mb-2">
                  <strong>Email:</strong>{" "}
                  <span className="text-muted">{profileData.email}</span>
                </div>
                <div className="mb-2">
                  <strong>Phone:</strong>{" "}
                  <span className="text-muted">{profileData.phone}</span>
                </div>
                <div className="mb-2">
                  <strong>Specialization:</strong>{" "}
                  <span className="text-muted">
                    {profileData.specialization}
                  </span>
                </div>
                <div className="mb-4">
                  <strong>Address:</strong>{" "}
                  <span className="text-muted">{profileData.address}</span>
                </div>

                <Button variant="outline-primary" className="rounded-4">
                  Edit Profile
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
