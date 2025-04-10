// import React, { useEffect } from "react";
// import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
// import { useAuthStore } from "../../store/AuthStore";

// export const PatientProfile = () => {
//   const { userProfile, profile } = useAuthStore();

//   useEffect(() => {
//     userProfile();
//   }, [userProfile]);

//   const profileData = {
//     name: profile?.first_name,
//     email: profile?.email,
//     phone: "+123 456 7890",
//     specialization: "Patient",
//     address: "123 Oysterbay Street, Wellness City",
//     imageUrl: `http://127.0.0.1:8000/${profile?.patient_profile_url}`,
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={10}>
//           <Card className="shadow rounded-4 border-0 p-4">
//             <Row>
//               <Col md={4} className="text-center mb-3">
//                 <Image
//                   src={profileData.imageUrl}
//                   roundedCircle
//                   fluid
//                   className="border border-2"
//                   style={{
//                     width: "150px",
//                     height: "150px",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <h5 className="mt-3 text-primary">{profileData.name}</h5>
//                 <p className="text-muted">{profileData.specialization}</p>
//               </Col>

//               <Col md={8}>
//                 <h5 className="mb-4 text-secondary">Profile Details</h5>
//                 <div className="mb-2">
//                   <strong>Email:</strong>{" "}
//                   <span className="text-muted">{profileData.email}</span>
//                 </div>
//                 <div className="mb-2">
//                   <strong>Phone:</strong>{" "}
//                   <span className="text-muted">{profileData.phone}</span>
//                 </div>
//                 <div className="mb-2">
//                   <strong>Specialization:</strong>{" "}
//                   <span className="text-muted">
//                     {profileData.specialization}
//                   </span>
//                 </div>
//                 <div className="mb-4">
//                   <strong>Address:</strong>{" "}
//                   <span className="text-muted">{profileData.address}</span>
//                 </div>

//                 <Button variant="outline-primary" className="rounded-4">
//                   Edit Profile
//                 </Button>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// SDHASJDGWHQQWDVJWQDJHQW------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
// import { useAuthStore } from "../../store/AuthStore";
// import toast from "react-hot-toast";

// export const PatientProfile = () => {
//   const { userProfile, profile, updateProfile } = useAuthStore();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     specialization: "",
//     address: "",
//     imageUrl: "",
//   });

//   useEffect(() => {
//     userProfile();
//   }, [userProfile]);

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         name: profile.first_name,
//         email: profile.email,
//         phone: "+123 456 7890",
//         specialization: "Patient",
//         address: "123 Oysterbay Street, Wellness City",
//         imageUrl: `http://127.0.0.1:8000/${profile?.patient_profile_url}`,
//       });
//     }
//   }, [profile]);

//   const handleEditProfile = () => {
//     const toastId = `edit-profile-${new Date().getTime()}`;

//     toast.custom(
//       (t) => (
//         <div
//           style={{
//             padding: "20px",
//             backgroundColor: "#f8f9fa",
//             borderRadius: "8px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             width: "300px",
//           }}
//         >
//           <h5>Edit Profile</h5>
//           <div className="mb-2">
//             <strong>Name</strong>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-2">
//             <strong>Email</strong>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-2">
//             <strong>Phone</strong>
//             <input
//               type="text"
//               className="form-control"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-2">
//             <strong>Specialization</strong>
//             <input
//               type="text"
//               className="form-control"
//               name="specialization"
//               value={formData.specialization}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <strong>Address</strong>
//             <input
//               type="text"
//               className="form-control"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="d-flex justify-content-between">
//             <Button
//               variant="secondary"
//               size="sm"
//               onClick={() => toast.dismiss(toastId)}
//             >
//               Cancel
//             </Button>
//             <Button variant="primary" size="sm" onClick={handleSaveProfile}>
//               Save Changes
//             </Button>
//           </div>
//         </div>
//       ),
//       {
//         id: toastId,
//         position: "top-right",
//         duration: Infinity,
//         style: {
//           zIndex: 9999,
//         },
//       }
//     );
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSaveProfile = () => {
//     updateProfile(formData);
//     toast.dismiss();
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={10}>
//           <Card className="shadow rounded-4 border-0 p-4">
//             <Row>
//               <Col md={4} className="text-center mb-3">
//                 <Image
//                   src={formData.imageUrl}
//                   roundedCircle
//                   fluid
//                   className="border border-2"
//                   style={{
//                     width: "150px",
//                     height: "150px",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <h5 className="mt-3 text-primary">{formData.name}</h5>
//                 <p className="text-muted">{formData.specialization}</p>
//               </Col>

//               <Col md={8}>
//                 <h5 className="mb-4 text-secondary">Profile Details</h5>
//                 <div className="mb-2">
//                   <strong>Email:</strong>{" "}
//                   <span className="text-muted">{formData.email}</span>
//                 </div>
//                 <div className="mb-2">
//                   <strong>Phone:</strong>{" "}
//                   <span className="text-muted">{formData.phone}</span>
//                 </div>
//                 <div className="mb-2">
//                   <strong>Specialization:</strong>{" "}
//                   <span className="text-muted">{formData.specialization}</span>
//                 </div>
//                 <div className="mb-4">
//                   <strong>Address:</strong>{" "}
//                   <span className="text-muted">{formData.address}</span>
//                 </div>

//                 <Button
//                   variant="outline-primary"
//                   className="rounded-4"
//                   onClick={handleEditProfile}
//                 >
//                   Edit Profile
//                 </Button>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// DWWEUGWWNEWBDJK....................................................
import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { useAuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";

const toastId = `edit-profile-${new Date().getTime()}`;

export const PatientProfile = () => {
  const { userProfile, profile, updateProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    address: "",
    imageUrl: "",
    profilePicture: null,
  });

  useEffect(() => {
    userProfile();
  }, [userProfile]);


  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.first_name,
        email: profile.email,
        phone: "+123 456 7890",
        specialization: "Patient",
        address: "123 Oysterbay Street, Wellness City",
        imageUrl: `http://127.0.0.1:8000/${profile?.patient_profile_url}`,
        profilePicture: null,
      });
    }
  }, [profile]);

  const handleEditProfile = () => {
    toast.custom(
      (t) => (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "300px",
          }}
        >
          <h5>Edit Profile</h5>
          <div className="mb-2">
            <strong>Name</strong>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-2">
            <strong>Email</strong>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-2">
            <strong>Phone</strong>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-2">
            <strong>Specialization</strong>
            <input
              type="text"
              className="form-control"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-2">
            <strong>Address</strong>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-2">
            <strong>Profile Picture</strong>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            {formData.profilePicture && (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(formData.profilePicture)}
                  roundedCircle
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => toast.dismiss(toastId)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </div>
      ),
      {
        id: toastId,
        position: "top-right",
        duration: Infinity,
        style: {
          zIndex: 9999,
        },
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSaveProfile = () => {
    const updatedProfile = { ...formData };
    if (formData.profilePicture) {
      // logic to handle file upload
      const formDataObj = new FormData();
      formDataObj.append("profile_picture", formData.profilePicture);
    }
    // updateProfile(updatedProfile);
    toast.dismiss();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow rounded-4 border-0 p-4">
            <Row>
              <Col md={4} className="text-center mb-3">
                <Image
                  src={formData.imageUrl}
                  roundedCircle
                  fluid
                  className="border border-2"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="mt-3 text-primary">{formData.name}</h5>
                <p className="text-muted">{formData.specialization}</p>
              </Col>

              <Col md={8}>
                <h5 className="mb-4 text-secondary">Profile Details</h5>
                <div className="mb-2">
                  <strong>Email:</strong>{" "}
                  <span className="text-muted">{formData.email}</span>
                </div>
                <div className="mb-2">
                  <strong>Phone:</strong>{" "}
                  <span className="text-muted">{formData.phone}</span>
                </div>
                <div className="mb-2">
                  <strong>Specialization:</strong>{" "}
                  <span className="text-muted">{formData.specialization}</span>
                </div>
                <div className="mb-4">
                  <strong>Address:</strong>{" "}
                  <span className="text-muted">{formData.address}</span>
                </div>

                <Button
                  variant="outline-primary"
                  className="rounded-4"
                  onClick={handleEditProfile}
                >
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
