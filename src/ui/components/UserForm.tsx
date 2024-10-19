import React  from "react";
import { useUser } from "../hooks/useUser";
// import { useUserList } from "../hooks/useUserList";

interface UserFormProps {
  onUserCreated: () => void;  
}

export const UserForm: React.FC<UserFormProps> = ({ onUserCreated })=> {
  // const { fetchUsers } = useUserList(); 
  // const { name, email,  setName, setEmail, setAvatar, createUser, loading, password, setPassword } = useUser(fetchUsers);
  const { name, email, password, setName, setEmail, setPassword, createUser, loading, setAvatar } = useUser();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);  
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser();
    onUserCreated(); 
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Crear Usuario</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Avatar</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
      >
        {loading ? "Creando..." : "Crear Usuario"}
      </button>
    </form>
  );
};
