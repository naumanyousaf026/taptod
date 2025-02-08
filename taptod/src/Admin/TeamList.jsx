import React, { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';

const usersData = Array.from({ length: 20 }, (_, i) => ({
  id: `UID-${i + 1000}`,
  phone: `+12345678${i}`,
  email: `user${i}@mail.com`,
  balance: `Rs${(i + 1) * 10}.00`,
  status: i % 2 === 0 ? 'Active' : 'Inactive'
}));

export default function User() {
  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Taptod Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-3 text-left">User ID</th>
                <th className="border p-3 text-left">Phone Number</th>
                <th className="border p-3 text-left">Email Address</th>
                <th className="border p-3 text-left">Balance</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border p-3">{user.id}</td>
                  <td className="border p-3">{user.phone}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.balance}</td>
                  <td className={`border p-3 font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{user.status}</td>
                  <td className="border p-3 text-center">
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                  

                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span>Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, users.length)} of {users.length}</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1} 
              className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages} 
              className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
