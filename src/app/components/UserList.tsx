import React from "react";

type UserListProps = {
  users: { id: number; name: string }[];
  onSelectUser: (id: number) => void;
};

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user.id)}
          className="user-item hover-effect"
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;