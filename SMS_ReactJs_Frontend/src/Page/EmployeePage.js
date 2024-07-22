import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeePage.css";
import Employee from "../component/Employee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [empNotificationList, setEmpNotificationList] = useState([]);
  const [updateEmpNotification, setUpdateEmpNotification] = useState({});

  const getEmpNotifications = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/join-tables-empid/${state.empId}`
      );
      console.log(response.data); // Log the response data
      setEmpNotificationList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (Id) => {
    console.log("delete : ", typeof Id);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:5000/delete-record/${Id}`
    );
    console.log("delete : ", Id);

    getEmpNotifications();
    console.log("delete : ", Id);

    //alert(`Organization deleted successfully`);
    toast.success("Organization deleted successfully");
  };
  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Make a request to the backend to logout
      const response = await axios.post("http://127.0.0.1:5000/emplogout");
      // Clear user session on successful logout
      if (response.status === 200) {
        // Perform any additional cleanup or actions after logout if needed

        console.log("Logout successful");
        navigate("/");
        // Redirect to login page or perform any other action
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error
    }
  };


  useEffect(() => {
    getEmpNotifications();
  }, []);

  return (
    <>
      <div className="form-group col-4 emp-btn mt-3">
        <button className="btn btn-success" onClick={handleLogout}>
          LogOut
        </button>
      </div>
      <div className="container">
        <Employee
          updateEmpNotificationList={() => {
            getEmpNotifications();
            setUpdateEmpNotification({});
          }}
          empNotification={updateEmpNotification}
        />

        <table className="table table-bordered table-strip">
          <thead>
            <tr>
              <th>Id</th>
              <th>Server Id</th>
              <th>Employee Id</th>
              <th>Organization Id</th>
              <th>Server Name</th>
              <th>IPAddress</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Notification ID</th>
              <th>Notification Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "white" }}>
            {empNotificationList.map((empItem) => {
              return (
                <tr key={empItem.empId}>
                  <td>{empItem.id}</td>
                  <td>{empItem.ServerId}</td>
                  <td>{empItem.EmpId}</td>
                  <td>{empItem.OrgId}</td>
                  <td>{empItem.ServerName}</td>
                  <td>{empItem.IPAddress}</td>
                  <td>{empItem.Status}</td>
                  <td>{empItem.Reason}</td>
                  <td>{empItem.NotificationId}</td>
                  <td>{empItem.Date}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => setUpdateEmpNotification(empItem)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(empItem.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
