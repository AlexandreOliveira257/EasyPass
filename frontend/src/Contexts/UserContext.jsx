import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState(undefined);
  const [pedidos,setPedido] = useState([])
  const [movimentos, setMovimentos] = useState([])
  return (
    <UserContext.Provider value={
      { username, setUsername,
        pedidos, setPedido,
      movimentos, setMovimentos }
      }>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
