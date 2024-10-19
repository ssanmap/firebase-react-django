import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

   

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login exitoso");
      navigate("/user-list");
    } catch (error: any) {
        setError("Error en el login: " + (error.message || "Error desconocido"));
    } finally {
      setLoading(false);
    }
  };
  const handleRegisterRedirect = () => {
    navigate("/create-user");
  };
  return (
 
<div className="min-h-screen bg-gray-900 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={handleRegisterRedirect}
                className="text-indigo-600 hover:underline font-medium"
              >
                Regístrate
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
