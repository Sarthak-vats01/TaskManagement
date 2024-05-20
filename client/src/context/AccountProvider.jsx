import React, { createContext, useState } from "react";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [list, setList] = useState({});
  const [account, setAccount] = useState(null);
  return (
    <AccountContext.Provider value={{ list, setList, account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export { AccountContext };
export default AccountProvider;
