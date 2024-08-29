import React, { useState, useEffect } from "react";
import axios from "axios";
import CONST from "../lib/const";
import "./UserList.css";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface UserListProps {
  children: React.ReactNode;
  refreshTrigger: number;
}

const UserList: React.FC<UserListProps> = ({ children, refreshTrigger }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://gorest.co.in/public/v2/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CONST.GOREST_AUTH_TOKEN}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {children}
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserList;
