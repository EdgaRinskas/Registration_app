import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, deleteUser, updateUser } from '../services/api';
import './UserList.css';

const UserList = () => {
  const queryClient = useQueryClient();

  const { data: users, error, isLoading } = useQuery('users', getUsers);

  const mutationDelete = useMutation((id) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const mutationUpdate = useMutation(({ id, userData }) => updateUser(id, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };

  const handleUpdate = (id, updatedUserData) => {
    mutationUpdate.mutate({ id, userData: updatedUserData });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="user-list-container">
      <table className="user-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Age</th>
            <th className="table-header">Date of Birth</th>
            <th className="table-header">Gender</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.gender}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => {
                    const updatedUserData = prompt(
                      'Enter updated data (e.g., name,email,age,dateOfBirth,gender):'
                    );
                    if (updatedUserData) {
                      try {
                        handleUpdate(user._id, JSON.parse(updatedUserData));
                      } catch (error) {
                        alert('Invalid input format. Please use JSON.');
                      }
                    }
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
