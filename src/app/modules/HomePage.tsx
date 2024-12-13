'use client'
import React, { useState, useEffect } from "react";
import { users } from "../data/users";
import axios from "axios";
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";
import ActionPanel from "../components/ActionPanel";

const Home: React.FC = () => {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) =>
        setUsers(
          response.data.users.map((user: any) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
          }))
        )
      )
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSelectUser = (id: number) => {
    setSelectedUser(id);
  };

  return (
    <div className="main-container">
      <div className="header">
        <h1 className="site-title">User Management App</h1>
      </div>
      <div className="container">
        <div className="user-list-section">
          <UserList users={users} onSelectUser={handleSelectUser} />
        </div>
        <div className="user-detail-section">
          <UserDetails userId={selectedUser} />
        </div>
        <div className="action-section">
          <ActionPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;


