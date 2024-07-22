import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default function Employee(props) {
    const [Id, setId] = useState();
    const [serverId, setServerId] = useState();
    const [employeeId, setEmployeeId] = useState();
    const [organizationId, setOrganizationId] = useState();
    const [serverName, setServerName] = useState();
    const [serverIPAddress, setIPAddress] = useState();
    const [serverStatus, setStatus] = useState();
    const [serverReason, setReason] = useState();
    const [NotifId, setNotifId] = useState();
    const [NDate, setNDate] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.empNotification.id) {
        setId(props.empNotification.id)
        setServerId(props.empNotification.ServerId);
        setEmployeeId(props.empNotification.EmpId);
        setOrganizationId(props.empNotification.OrgId);
        setServerName(props.empNotification.ServerName);
        setIPAddress(props.empNotification.IPAddress);
        setStatus(props.empNotification.Status);
        setReason(props.empNotification.Reason);
        setNotifId(props.empNotification.NotificationId);
        setNDate(props.empNotification.Data);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

  const updateEmpNotification = async () => {
    const updatedData = {
        id: Id,
        ServerId: serverId,
        EmpId: employeeId,
        OrgId: organizationId,
        ServerName: serverName,
        IPAddress: serverIPAddress,
        Status: serverStatus,
        Reason: serverReason,
        NotificationId: NotifId,
        Date: NDate,
    };
    const udpatedRecord = await axios.put(
      "http://127.0.0.1:5000/updatenotificationandserverdetails",
      updatedData
    );
    props.updateEmpNotificationList();
    resetForm();
    //toast.success(`Server updated successfully!`);
    //alert(`Server updated successfully! ${udpatedRecord}`);
    Swal.fire({
      icon: 'success',
      title: 'Updated Successfully!',
      showConfirmButton: false,
      timer: 1500
  });
  };

  const handleInput = (e) => {
    switch (e.target.id) {
        case "Id":
            setId(e.target.value);
            break;
        case "serverId":
            setServerId(e.target.value);
            break;
        case "employeeId":
            setEmployeeId(e.target.value);
            break;
        case "organizationId":
            setOrganizationId(e.target.value);
            break;
        case "serverName":
            setServerName(e.target.value);
            break;
        case "serverIPAddress":
            setIPAddress(e.target.value);
            break;
        case "serverStatus":
            setStatus(e.target.value);
            break;
        case "serverReason":
            setReason(e.target.value);
            break;
        case "NotifId":
            setNotifId(e.target.value);
            break;
        case "NDate":
            setNDate(e.target.value);
            break;
    }
  };

  const resetForm = () => {
    setId("");
    setServerId("");
    setEmployeeId("");
    setOrganizationId("");
    setServerName("");
    setIPAddress("");
    setStatus("");
    setReason("");
    setNotifId("");
    setNDate("");
    setIsUpdateButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const object = {
        id: Id,
        ServerId: serverId,
        EmpId: employeeId,
        OrgId: organizationId,
        ServerName: serverName,
        IPAddress: serverIPAddress,
        Status: serverStatus,
        Reason: serverReason,
        NotificationId: NotifId,
        Date: NDate,
    };

    console.log(object);

    // call api to save product
    updateEmpNotification(object);
  };

  return (
    <>
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
        <input
          className="form-control"
          type="text"
          id="serverStatus"
          value={serverStatus}
          onChange={handleInput}
        />
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
      <div className="form-group col-4">
        <label htmlFor="NotifId">Notification Id: </label>
        <input
          className="form-control"
          type="text"
          id="NotifId"
          value={NotifId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="NDate">Date: </label>
        <input
          className="form-control"
          type="text"
          id="NDate"
          value={NDate}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4 server-btn">
        <button className="btn btn-success" onClick={handleSubmit}>
          Update Server
        </button>
      </div>
    </form>
    <ToastContainer/>
    </>
  );
}
