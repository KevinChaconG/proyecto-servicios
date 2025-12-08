import React, { createContext, useContext, useState } from 'react';

export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  rol_usuario: 'CLIENTE' | 'EMPRENDEDOR' | 'ADMIN';
}

interface AuthContextType {
  usuario: Usuario | null;
  setUsuario: (user: Usuario | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  setUsuario: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
