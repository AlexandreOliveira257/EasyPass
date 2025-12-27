import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState(undefined);
  const [pedidos,setPedido] = useState([])
  const [movimentos, setMovimentos] = useState([])
  const [passes, setPasses] = useState([])
  const [notifications, setNotifications] = useState([])
  const [idpessoa, setIdPessoa] = useState(null)

  return (
    <UserContext.Provider value={
      { username, setUsername,
        pedidos, setPedido,
        movimentos, setMovimentos,
        passes, setPasses,
        notifications,setNotifications,
        idpessoa,setIdPessoa}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
