import { useEffect, useState } from "react";
import API from "../services/api";

function Login({ onSelectUser }) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [isRegister,setIsRegister]=useState(false);

   // instead of showingall users for direct login adding password based login method 
  const handleSubmit = async () => {
  try {
    if (isRegister) {
      // REGISTER
      if (!name || !email || !password) {
        alert("Enter all fields");
        return;
      }

      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      onSelectUser(res.data);
    } else {
      // LOGIN
      if (!email || !password) {
        alert("Enter email and password");
        return;
      }

      const res = await API.post("/auth/login", {
        email,
        password,
      });
      onSelectUser(res.data);
    }
  } catch (err) {
    alert(err.response?.data?.error || "Something went wrong");
  }
};



  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
            color: "#1e293b",
          }}
        >
          Split App
        </h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: "#475569",
            fontSize: "14px",
          }}
        >
         {isRegister ? "Create an account" : "Login to continue"} 
        </p>

        

        {/* Create User */}
        <h3 style={{ marginBottom: "10px", color: "#334155" }}>
          Create New User
        </h3>
        
        {isRegister &&(
          <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        />
        )}
        

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
         }}
       />


        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p
            style={{
            marginTop: "12px",
            textAlign: "center",
            cursor: "pointer",
            color: "#2563eb",
            fontSize: "14px",
          }}
          onClick={() => setIsRegister(!isRegister)}
       >
        {isRegister
          ? "Already have an account? Login": "New user? Register"}
           </p>

      </div>
    </div>
  );
}

export default Login;