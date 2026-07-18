import React, { useEffect, useState } from 'react'
import { listEmployees ,deleteEmployee} from '../services/EmployeeService';
import {useNavigate} from 'react-router-dom'

const ListEmployeeComponent = () => {
    const navigator=useNavigate();
    const [employees,setEmployees]=useState([]);
    useEffect(() => {
        listEmployees()
        .then((response) => {
            setEmployees(response.data);
        })
        .catch(error=> {
            console.error(error);
        })
        
    },[])
    function updateEmployee(id){
    navigator(`/edit-employee/${id}`);
}

    function addNewEmployee(){
        navigator("/add-employee")
    }
 function removeEmployee(id) {

    deleteEmployee(id)
        .then((response) => {

            console.log(response.data);

            listEmployees()
                .then((response) => {
                    setEmployees(response.data);
                });

        })
        .catch(error => {
            console.error(error);
        });

}


    return (
        <div className="max-w-5xl mx-auto mt-10">

            
<button
    className='border-2 bg-purple-500 text-amber-50 rounded-2xl mb-3 py-2 px-3  hover:bg-purple-700 transition duration-300Q'
    onClick={addNewEmployee}
>
    Add New Employee
</button>

          <div className="max-h-110 overflow-y-auto">
            <table className="w-full border border-gray 300 shadow-md">

                <thead  className="sticky top-0 bg-white z-20 shadow-sm" >
                    <tr>
                        <th className="border p-3 text-left">
                            Employee Id
                        </th>

                        <th className="border p-3 text-left">
                            Employee First Name
                        </th>

                        <th className="border p-3 text-left">
                            Employee Last Name
                        </th>

                        <th className="border p-3 text-left">
                            Employee Email Id
                        </th>
                        <th className="border p-3 text-left">
                           Actions
                       </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className="odd:bg-gray-200"
                            >
                                <td className="border p-3">
                                    {employee.id}
                                </td>

                                <td className="border p-3">
                                    {employee.firstName}
                                </td>

                                <td className="border p-3">
                                    {employee.lastName}
                                </td>

                                <td className="border p-3">
                                    {employee.email}
                                </td>
                                <td className="border p-3">

    <button
        className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
        onClick={() => updateEmployee(employee.id)}
    >
        Update
    </button>

    <button
        className="bg-red-600 text-white px-3 py-2 rounded-md  hover:bg-red-800 transition duration-300"
        onClick={() => removeEmployee(employee.id)}
    >
        Delete
    </button>

</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
            </div>

        </div>
    )
}

export default ListEmployeeComponent