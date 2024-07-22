// import "./SystemPage.css";

// function SystemPage(){
//     return(
//         <div className="container">
//             <div
//                 className="table-responsive"
//             >
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">Admin ID</th>
//                             <th scope="col">Company Name</th>
//                             <th scope="col">Email ID</th>
//                             <th scope="col">Contact</th>
//                             <th scope="col">Delete</th>
//                         </tr>
//                     </thead>
//                 </table>
//             </div>
//         </div>
//     );
// }
// export default SystemPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SystemPage.css";
import AddServer from "../component/AddServer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ServerDetailsPage() {
  const navigate = useNavigate();

  const [adminList, setAdminList] = useState([]);

  const [updateAdmin, setUpdateAdmin] = useState({});

  const getAdmin = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/admin");
      setAdminList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

//   const handleDelete = async (Id) => {
//     console.log("delete : ", typeof Id);
//     const deletedRecords = await axios.delete(
//       `http://127.0.0.1:5000/server/${Id}`
//     );
//     console.log("delete : ", Id);

//     getServers();
//     console.log("delete : ", Id);

//     toast.success('Server deleted successfully');
    
//   };

  const handleUpdateAdmin = (admin) => {
    console.log(admin);
    setUpdateAdmin(admin);
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const handleLogOff = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  
  return (
    <>
      <div className="container">
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <button className="btn btn-secondary" onClick={handleLogOff}>
            Log Off
          </button>
        </div>
        {/* <AddServer
          updateServerList={() => {
            getServers();
            setUpdateServer({});
          }}
          server={updateServer}
        /> */}
        <table className="table table-bordered table-strip">
          <thead>
            <tr>
                <th scope="col">Admin ID</th>
                <th scope="col">Admin Name</th>
                <th scope="col">Email ID</th>
                <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody style={{backgroundColor:"white"}}>
            {adminList.map((adminItem) => {
              return (
                <tr key={adminItem.AdminId}>
                  <td>{adminItem.AdminId}</td>
                  <td>{adminItem.AdminName}</td>
                  <td>{adminItem.EmailID}</td>
                  <td>{adminItem.Contact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ToastContainer/>
      </div>
    </>
  );
}
