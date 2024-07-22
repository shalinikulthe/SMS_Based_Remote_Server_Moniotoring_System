// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function AddOrganization(props) {
//   const [Id, setId] = useState();
//   const [organizationId, setOrganizationId] = useState();
//   const [organizationName, setOrganizationName] = useState();
//   const [address, setAddress] = useState();
//   const [contact, setContact] = useState();
//   const [status, setStatus] = useState();

//   const [isUpdateButton, setIsUpdateButton] = useState(false);

//   useEffect(() => {
//     if (props.organization.id) {
//       setId(props.organization.id);
//       setOrganizationId(props.organization.OrgId);
//       setOrganizationName(props.organization.OrgName);
//       setAddress(props.organization.Address);
//       setContact(props.organization.Contact);
//       setStatus(props.organization.Status);
//       setIsUpdateButton(true);
//     } else setIsUpdateButton(false);
//   }, [props]);

//   const updateOrganization = async () => {
//     const updatedData = {
//       id:Id,
//       OrgId: organizationId,
//       OrgName: organizationName,
//       Address: address,
//       Contact: contact,
//       Status: status,
//     };
//     const udpatedRecord = await axios.put(
//       "http://127.0.0.1:5000/organization",
//       updatedData
//     );
//     props.updateOrganizationList();
//     resetForm();
//     alert("Product updated successfully!");
//   };

//   const handleInput = (e) => {
//     switch (e.target.id) {
//       case "Id":
//         setId(e.target.value);
//         break;
//       case "organizationId":
//         setOrganizationId(e.target.value);
//         break;
//       case "organizationName":
//         setOrganizationName(e.target.value);
//         break;
//       case "address":
//         setAddress(e.target.value);
//         break;
//       case "contact":
//         setContact(e.target.value);
//         break;
//       case "status":
//         setStatus(e.target.value);
//         break;
//     }
//   };

//   const saveOrganization = async (organization) => {
//     const response = await axios.post(
//       "http://127.0.0.1:5000/organization",
//       organization
//     );
//     if (response.data) {
//       props.updateOrganizationList();
//       resetForm();
//     }
//   };

//   const resetForm = () => {
//     setId("");
//     setOrganizationId("");
//     setOrganizationName("");
//     setAddress("");
//     setContact("");
//     setStatus("");
//     setIsUpdateButton(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const object = {
//       id:Id,
//       OrgId: organizationId,
//       OrgName: organizationName,
//       Address: address,
//       Contact: contact,
//       Status: status,
//     };

//     console.log(object);

//     if (isUpdateButton) {
//       updateOrganization(object);
//     } else {
//       saveOrganization(object);
//     }
//   };

//   return (
//     <form className="row organization-form">
//       <div className="form-group col-4">
//         <label htmlFor="organizationId">Organization ID: </label>
//         <input
//           className="form-control"
//           type="text"
//           id="organizationId"
//           value={organizationId}
//           onChange={handleInput}
//         />
//       </div>
//       <div className="form-group col-4">
//         <label htmlFor="organizationName">Organization Name: </label>
//         <input
//           className="form-control"
//           type="text"
//           id="organizationName"
//           value={organizationName}
//           onChange={handleInput}
//         />
//       </div>
//       <div className="form-group col-4">
//         <label htmlFor="address">Address: </label>
//         <input
//           className="form-control"
//           type="text"
//           id="address"
//           value={address}
//           onChange={handleInput}
//         />
//       </div>
//       <div className="form-group col-4">
//         <label htmlFor="contact">Contact: </label>
//         <input
//           className="form-control"
//           type="text"
//           id="contact"
//           value={contact}
//           onChange={handleInput}
//         />
//       </div>
//       <div className="form-group col-4">
//         <label htmlFor="status">Status: </label>
//         <input
//           className="form-control"
//           type="text"
//           id="status"
//           value={status}
//           onChange={handleInput}
//         />
//       </div>
//       <div className="form-group col-4 organization-btn">
//         <button className="btn btn-secondary" onClick={handleSubmit}>
//           {isUpdateButton ? "Update Organization" : "Save Organization"}
//         </button>
//       </div>
//       <ToastContainer/>
//     </form>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddOrganization(props) {
  const [Id, setId] = useState();
  const [organizationId, setOrganizationId] = useState();
  const [organizationName, setOrganizationName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [status, setStatus] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.organization.id) {
      setId(props.organization.id);
      setOrganizationId(props.organization.OrgId);
      setOrganizationName(props.organization.OrgName);
      setAddress(props.organization.Address);
      setContact(props.organization.Contact);
      setStatus(props.organization.Status);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

  const updateOrganization = async () => {
    const updatedData = {
      id: Id,
      OrgId: organizationId,
      OrgName: organizationName,
      Address: address,
      Contact: contact,
      Status: status,
    };
    try {
      await axios.put("http://127.0.0.1:5000/organization", updatedData);
      props.updateOrganizationList();
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Organization updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update organization.",
      });
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "Id":
        setId(value);
        break;
      case "organizationId":
        setOrganizationId(value);
        break;
      case "organizationName":
        setOrganizationName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "status":
        setStatus(value);
        break;
      default:
        break;
    }
  };

  const saveOrganization = async (organization) => {
    try {
      await axios.post("http://127.0.0.1:5000/organization", organization);
      props.updateOrganizationList();
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Organization saved successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save organization.",
      });
    }
  };

  const resetForm = () => {
    setId("");
    setOrganizationId("");
    setOrganizationName("");
    setAddress("");
    setContact("");
    setStatus("");
    setIsUpdateButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const object = {
      id: Id,
      OrgId: organizationId,
      OrgName: organizationName,
      Address: address,
      Contact: contact,
      Status: status,
    };

    if (isUpdateButton) {
      updateOrganization(object);
    } else {
      saveOrganization(object);
    }
  };

  return (
    <form className="row organization-form">
      <div className="form-group col-4">
        <label htmlFor="organizationId">Organization ID: </label>
        <input
          className="form-control"
          type="text"
          id="organizationId"
          value={organizationId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="organizationName">Organization Name: </label>
        <input
          className="form-control"
          type="text"
          id="organizationName"
          value={organizationName}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="address">Address: </label>
        <input
          className="form-control"
          type="text"
          id="address"
          value={address}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="contact">Contact: </label>
        <input
          className="form-control"
          type="text"
          id="contact"
          value={contact}
          onChange={handleInput}
        />
      </div>
      {/* <div className="form-group col-4">
        <label htmlFor="status">Status: </label>
        <input
          className="form-control"
          type="text"
          id="status"
          value={status}
          onChange={handleInput}
        />
      </div> */}
      <div className="form-group col-4">
        <label htmlFor="status">Status: </label>
            <select
                    className="form-control"
                    id="status"
                    value={status}
                    onChange={handleInput}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
        </div>
      <div className="form-group col-4 organization-btn">
        <button className="btn btn-secondary" onClick={handleSubmit}>
          {isUpdateButton ? "Update Organization" : "Add Organization"}
        </button>
      </div>
    </form>
  );
}
