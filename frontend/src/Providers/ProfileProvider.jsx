import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useFetch } from "../hooks/useCustomFetch";

export const ProfileProvider = ({ children }) => {
  const { data: profile } = useFetch("/auth/users/me/");

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
