import { useState } from "react";
import { useData } from "@/context/DataContext";

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { students } = useData();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = onLogin(username, password, students);
        if (!success) {
            setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Iniciar Sesión
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-gray-700">
                        Usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full"
                            placeholder="admin o estudiante"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-gray-700">
                        Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
