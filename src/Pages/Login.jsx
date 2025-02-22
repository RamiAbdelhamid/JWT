import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

function Login() {
  // register
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // login
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [loggedInUser, setLoggedInUser] = useState(Cookies.get("user") || null);

  const navigate = useNavigate();

  // handel register
  async function handleRegister(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:9003/register", {
        name: registerName,
        password: registerPassword,
      });
      alert("User registered successfully!");
      setRegisterName("");
      setRegisterPassword("");
    } catch (error) {
      alert("Error registering user: " + error.response?.data?.error);
    }
    setSubmitting(false);
  }

  // handleLogin
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:9003/login", {
        name: loginName,
        password: loginPassword,
      });

      const userToken = response.data.token;

      // save token and user
      Cookies.set("token", userToken, { expires: 1 }); 
      Cookies.set("user", loginName, { expires: 1 });

      setToken(userToken);
      setLoggedInUser(loginName);
      alert("Login successful!");
      navigate("/"); // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setLoggedInUser(null);
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>JWT Authentication</h2>

      {!token ? (
        <>
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit" disabled={submitting}>
              {submitting ? "Registering..." : "Register"}
            </button>
          </form>

          <h3>Login</h3>
          <input
            type="text"
            placeholder="Name"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h3>Welcome, {loggedInUser}!</h3>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Login;
