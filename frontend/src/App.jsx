import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const logout=()=>{
    setCurrentUser(null);   
  };


  return (
    <div style={{ fontSize: "0.8rem" }}> {/* 🔽 GLOBAL SCALE */}
      {!currentUser ? (
        <Login onSelectUser={setCurrentUser} />
      ) : (
        <Dashboard user={currentUser} onLogout={logout} />
      )}
    </div>
  );
  
}

export default App;
