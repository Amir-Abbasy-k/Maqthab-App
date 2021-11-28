import React, {createContext, useState, useContext} from 'react';
export const UserContext = createContext();
const UserContextProvider = ({children}) => {
  const [data, setData] = useState({userType: "", prof: {name: "Guest User", pic:"assets/images/ic-user.png"}});
  const state = {
    data,
    setData,  
  };
  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
