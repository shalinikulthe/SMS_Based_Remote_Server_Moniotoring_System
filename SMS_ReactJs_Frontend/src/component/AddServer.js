import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

// import 'react-toastify/dist/ReactToastify.css';

export default function AddServer(props) {
    const [Id, setId] = useState("");
    const [serverId, setServerId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [serverName, setServerName] = useState("");
    const [serverIPAddress, setIPAddress] = useState("");
    const [serverStatus, setStatus] = useState("active"); // Default status set to "active"
    const [serverReason, setReason] = useState("");

    const [isUpdateButton, setIsUpdateButton] = useState(false);

    useEffect(() => {
        if (props.server.id) {
            setId(props.server.id)
            setServerId(props.server.ServerId);
            setEmployeeId(props.server.EmpId);
            setOrganizationId(props.server.OrgId);
            setServerName(props.server.ServerName);
            setIPAddress(props.server.IPAddress);
            setStatus(props.server.Status);
            setReason(props.server.Reason);
            setIsUpdateButton(true);
        } else setIsUpdateButton(false);
    }, [props]);

    const updateServer = async () => {
      try {
          const updatedData = {
              id: Id,
              ServerId: serverId,
              EmpId: employeeId,
              OrgId: organizationId,
              ServerName: serverName,
              IPAddress: serverIPAddress,
              Status: serverStatus,
              Reason: serverReason,
          };
          const updatedRecord = await axios.put(
              "http://127.0.0.1:5000/server",
              updatedData
          );
          props.updateServerList();
          resetForm();
          Swal.fire({
              icon: 'success',
              title: 'Server updated successfully!',
          });
      } catch (error) {
          console.error("Error updating server:", error);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occurred while updating the server. Please try again later.',
          });
      }
  };
    const handleInput = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case "serverId":
                setServerId(value);
                break;
            case "employeeId":
                setEmployeeId(value);
                break;
            case "organizationId":
                setOrganizationId(value);
                break;
            case "serverName":
                setServerName(value);
                break;
            case "serverIPAddress":
                setIPAddress(value);
                break;
            case "serverStatus":
                setStatus(value);
                break;
            case "serverReason":
                setReason(value);
                break;
            default:
                break;
        }
    };

    const saveServer = async (server) => {
      try {
          const response = await axios.post(
              "http://127.0.0.1:5000/server",
              server
          );
          if (response.data) {
              props.updateServerList();
              resetForm();
              Swal.fire({
                  icon: 'success',
                  title: 'Server saved successfully!',
              });
          }
      } catch (error) {
          console.error("Error saving server:", error);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occurred while saving the server. Please try again later.',
          });
      }
  };

    const resetForm = () => {
        setId("");
        setServerId("");
        setEmployeeId("");
        setOrganizationId("");
        setServerName("");
        setIPAddress("");
        setStatus("active"); // Reset status to default "active"
        setReason("");
        setIsUpdateButton(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validations
        if (!serverId || !employeeId || !organizationId) {
            toast.error('Please provide Server ID, Employee ID, and Organization ID.');
            return;
        }
        const object = {
            id: Id,
            ServerId: serverId,
            EmpId: employeeId,
            OrgId: organizationId,
            ServerName: serverName,
            IPAddress: serverIPAddress,
            Status: serverStatus,
            Reason: serverReason,
        };

        // call API to save or update server
        if (isUpdateButton) {
            updateServer(object);
        } else {
            saveServer(object);
        }
    };

    return (
        <form className="row server-form">
            <div className="form-group col-4">
                <label htmlFor="serverId">Server Id: </label>
                <input
                    className="form-control"
                    type="text"
                    id="serverId"
                    value={serverId}
                    onChange={handleInput}
                />
            </div>
            <div className="form-group col-4">
                <label htmlFor="employeeId">Employee ID: </label>
                <input
                    className="form-control"
                    type="text"
                    id="employeeId"
                    value={employeeId}
                    onChange={handleInput}
                />
            </div>
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
                <label htmlFor="serverName">Server Name: </label>
                <input
                    className="form-control"
                    type="text"
                    id="serverName"
                    value={serverName}
                    onChange={handleInput}
                />
            </div>
            <div className="form-group col-4">
                <label htmlFor="serverIPAddress">Server IPAddress: </label>
                <input
                    className="form-control"
                    type="text"
                    id="serverIPAddress"
                    value={serverIPAddress}
                    onChange={handleInput}
                />
            </div>
            <div className="form-group col-4">
                <label htmlFor="serverStatus">Status: </label>
                <select
                    className="form-control"
                    id="serverStatus"
                    value={serverStatus}
                    onChange={handleInput}
                >
                    <option >Chose Value</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div className="form-group col-4">
                <label htmlFor="serverReason">Reason: </label>
                <input
                    className="form-control"
                    type="text"
                    id="serverReason"
                    value={serverReason}
                    onChange={handleInput}
                />
            </div>
            <div className="form-group col-4 server-btn">
                <button className="btn btn-success" onClick={handleSubmit}>
                    {isUpdateButton ? "Update Server" : "Save Server"}
                </button>
            </div>
            <ToastContainer />
        </form>
    );
}
