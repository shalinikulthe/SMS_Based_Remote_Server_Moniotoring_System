import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
//import 'sweetalert2/src/sweetalert2.scss';

export default function AddEmployee(props) {
    const [Id, setId] = useState();
    const [employeeId, setEmployeeId] = useState();
    const [organizationId, setOrganizationId] = useState();
    const [employeeName, setEmployeeName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();


    const [isUpdateButton, setIsUpdateButton] = useState(false);

    useEffect(() => {
        if (props.employee.id) {
            setId(props.employee.id);
            setEmployeeId(props.employee.employeeId);
            setOrganizationId(props.employee.OrgId);
            setEmployeeName(props.employee.EmpName);
            setPassword(props.employee.Password);
            setEmail(props.employee.EmailId);
            setContact(props.employee.Contact);
            setAddress(props.employee.Address);
            setIsUpdateButton(true);
        } else setIsUpdateButton(false);
    }, [props]);

    // const updateEmployee = async () => {
    //     try {
    //         const updatedData = {
    //             id: Id,
    //             EmpId: employeeId,
    //             OrgId: organizationId,
    //             EmpName: employeeName,
    //             Password: password,
    //             EmailId: email,
    //             Contact: contact,
    //             Address: address,
    //         };
    
    //         const response = await axios.put(
    //             "http://127.0.0.1:5000/employee",
    //             updatedData
    //         );
    
    //         // Check if the request was successful
    //         if (response.status === 200) {
    //             // Call the parent component's function to update the employee list
    //             props.updateEmployeeList();
    //             // Reset the form fields
    //             resetForm();
    //             // Show a success toast
    //             toast.success('Employee updated successfully!');
    //         } else {
    //             // If the request was not successful, show an error toast
    //             toast.error('Failed to update employee. Please try again.');
    //         }
    //     } catch (error) {
    //         // Handle any errors that occur during the request
    //         console.error('Error updating employee:', error);
    //         // Show an error toast
    //         toast.error('An error occurred while updating employee. Please try again.');
    //     }
    // };

    const updateEmployee = async () => {
        try {
            const updatedData = {
                id: Id,
                EmpId: employeeId,
                OrgId: organizationId,
                EmpName: employeeName,
                Password: password,
                EmailId: email,
                Contact: contact,
                Address: address,
            };
    
            const response = await axios.put(
                "http://127.0.0.1:5000/employee",
                updatedData
            );
    
            // Check if the request was successful
            if (response.status === 200) {
                // Call the parent component's function to update the employee list
                props.updateEmployeeList();
                // Reset the form fields
                resetForm();
                // Show a success SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Employee updated successfully!',
                });
            } else {
                // If the request was not successful, show an error SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update employee. Please try again.',
                });
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error updating employee:', error);
            // Show an error SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating employee. Please try again.',
            });
        }
    };
    

    const handleInput = (e) => {
        switch (e.target.id) {
            case "Id":
                setId(e.target.value);
                break;
            case "employeeId":
                setEmployeeId(e.target.value);
                break;
            case "organizationId":
                setOrganizationId(e.target.value);
                break;
            case "employeeName":
                setEmployeeName(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "contact":
                setContact(e.target.value);
                break;
            case "address":
                setAddress(e.target.value);
                break;
        }
    };

    const saveEmployee = async (employee) => {
        const response = await axios.post(
        "http://127.0.0.1:5000/employee",
        employee
        );
        if (response.data) {
            props.updateEmployeeList();
            resetForm();
            // Show a success SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Employee saved successfully!',
            });
        }
    };

    // const saveEmployee = async (employee) => {
    //     const response = await axios.post(
    //     "http://127.0.0.1:5000/employee",
    //     employee
    //     );
    //     if (response.data) {
    //         props.updateEmployeeList();
    //         resetForm();
    //     }
    // };

    const resetForm = () => {
        setId("");
        setEmployeeId("");
        setOrganizationId("");
        setEmployeeName("");
        setPassword("");
        setEmail("");
        setContact("");
        setAddress("");
        setIsUpdateButton(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const object = {
            id:Id,
            EmpId: employeeId,
            OrgId: organizationId,
            EmpName: employeeName,
            Password: password,
            EmailId: email,
            Contact: contact,
            Address: address,
        };

        console.log(object);

        if (isUpdateButton) {
            updateEmployee(object);
        } else {
            saveEmployee(object);
        }
    };

    return (
        <>
        <form className="row employee-form">
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
                <label htmlFor="employeeName">Employee Name: </label>
                <input
                    className="form-control"
                    type="text"
                    id="employeeName"
                    value={employeeName}
                    onChange={handleInput}
                />
            </div>
            <div className="form-group col-4">
                <label htmlFor="password">Password: </label>
                <input
                    className="form-control"
                    type="text"
                    id="password"
                    value={password}
                    onChange={handleInput}
            />
            </div>
            <div className="form-group col-4">
                <label htmlFor="email">Email Id: </label>
                <input
                    className="form-control"
                    type="text"
                    id="email"
                    value={email}
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
            <div className="form-group col-4 organization-btn">
                <button className="btn btn-secondary" onClick={handleSubmit}>
                    {isUpdateButton ? "Update Employee" : "Add Employee"}
                </button>
            </div>
        </form>
        </>
    );
}
