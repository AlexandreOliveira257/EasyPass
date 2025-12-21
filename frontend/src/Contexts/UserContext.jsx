import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState(undefined);
  const [pedido,setPedido] = useState([])
  return (
    <UserContext.Provider value={{ username, setUsername, pedido, setPedido }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
