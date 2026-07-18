import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    createEmployee,
    getEmployee,
    updateEmployee
} from "../services/EmployeeService";

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    useEffect(() => {

    if (id) {
        getEmployee(id)
            .then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            })
            .catch(error => {
                console.error(error);
            });
    }

}, [id]);

    const navigate = useNavigate();

    function validateForm() {

        let valid = true;

        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = "";
        } else {
            errorsCopy.firstName = "First Name is required";
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = "";
        } else {
            errorsCopy.lastName = "Last Name is required";
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }
   

    function saveOrUpdateEmployee(e) {

    e.preventDefault();

    if (validateForm()) {

        const employee = {
            firstName,
            lastName,
            email
        };

        if (id) {

            updateEmployee(id, employee)
                .then((response) => {
                    console.log(response.data);
                    navigate("/employees");
                })
                .catch(error => {
                    console.error(error);
                });

        } else {

            createEmployee(employee)
                .then((response) => {
                    console.log(response.data);
                    navigate("/employees");
                })
                .catch(error => {
                    console.error(error);
                });

        }
    }
}

    return (
        <div className="container mx-auto py-8">

            <div className="max-w-lg mx-auto border rounded-md p-5">

               <h2 className="text-3xl font-bold text-center mb-6">
    {id ? "Update Employee" : "Add Employee"}
</h2>

                {/* First Name */}

                <div className="mb-4">

                    <label className="block text-base font-semibold mb-2">
                        First Name :
                    </label>

                    <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full rounded-md px-3 py-2 border ${
                            errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    {
                        errors.firstName &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.firstName}
                        </p>
                    }

                </div>


                {/* Last Name */}

                <div className="mb-4">

                    <label className="block text-base font-semibold mb-2">
                        Last Name :
                    </label>

                    <input
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full rounded-md px-3 py-2 border ${
                            errors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    {
                        errors.lastName &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.lastName}
                        </p>
                    }

                </div>


                {/* Email */}

                <div className="mb-4">

                    <label className="block text-base font-semibold mb-2">
                        Email :
                    </label>

                    <input
                        type="email"
                        placeholder="Enter email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-md px-3 py-2 border ${
                            errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />

                    {
                        errors.email &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    }

                </div>


                {/* Submit Button */}

                <button
    onClick={saveOrUpdateEmployee}
    className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-900 transition duration-300"
>
    {id ? "Update" : "Submit"}
</button>
                  

            </div>

        </div>
    );
};

export default EmployeeComponent;