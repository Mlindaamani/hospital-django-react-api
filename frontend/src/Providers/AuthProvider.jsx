import { authContext } from "../context/AuthContext";

export const useAuthContext = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (credentials) => {
    setUser(credentials);
  };

  const isAuthenticated = () => {
    return token != null ? true : false;
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <authContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </authContext.Provider>
  );
};
