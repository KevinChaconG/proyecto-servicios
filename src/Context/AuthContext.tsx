import React, { createContext, useContext, useState } from 'react';

export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  rol_usuario: 'CLIENTE' | 'EMPRENDEDOR' | 'ADMIN';
  id_emprendedor?: number;
}

interface AuthContextType {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return ctx;
};
