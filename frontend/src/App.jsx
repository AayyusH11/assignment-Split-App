import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const logout=()=>{
    setCurrentUser(null);   
  };


  if (!currentUser) {
    return <Login onSelectUser={setCurrentUser} />;
  }

  return <Dashboard user={currentUser} onLogout={logout} />;
}

export default App;
