import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");
  const [pedidos,setPedido] = useState([])
  const [movimentos, setMovimentos] = useState([])
  const [passes, setPasses] = useState([])
  const [notifications, setNotifications] = useState([])
  const [idpessoa, setIdPessoa] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <UserContext.Provider value={
      { username, setUsername,
        pedidos, setPedido,
        movimentos, setMovimentos,
        passes, setPasses,
        notifications,setNotifications,
        idpessoa,setIdPessoa,
        loading, setLoading}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
