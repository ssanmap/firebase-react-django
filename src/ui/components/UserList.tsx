
import React from "react";
import { User } from "../../domain/entities/User";

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {

  return (
    <div className="max-w-4xl mx-auto mt-10">
    <h1 className="text-3xl font-bold mb-4 ">Lista de Usuarios</h1>
    <ul className="space-y-4">
      {users.map((user, index) => (
        <li key={user.id || index} className="p-4 bg-white shadow-md rounded-md">
          <p className="text-lg font-semibold">{user.name}</p>
          <p>{user.email}</p>
          {user.avatarUrl && (
            <div className="w-12 h-12">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full mt-4 object-cover"
            />
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};
