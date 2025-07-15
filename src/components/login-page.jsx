import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Iniciar Sesión
                </h1>

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
