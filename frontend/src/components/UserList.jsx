import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, deleteUser } from '../services/api';
import './UserList.css';

const UserList = () => {
  const queryClient = useQueryClient();

  const { data: users } = useQuery('users', getUsers);

  const mutation = useMutation((id) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="user-list-container">
      <table className="user-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Age</th>
            <th className="table-header">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
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
