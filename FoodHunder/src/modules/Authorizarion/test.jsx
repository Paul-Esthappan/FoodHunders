import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { publicRequest } from "../../axios/axios";

function LoginPages() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setusername] = useState("");
  const [country, setcountry] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setgender] = useState("");
const isSignInPage =true
    const navigate = useNavigate();
    const submit = async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const response = await publicRequest.post(
          `${isSignInPage ? "/login" : "/register"}`,
          {email,password}
        );

        console.log("Response from Server:", response);

        if (isSignInPage) {
            console.log("Registration successful:", response.data);
            console.log("login success", response.data);
            dispatch(setUserAndToken(response.data));
            navigate("/home");
        } else {
          const { data, token } = response.data;
          console.log("Login successful. User data:", data);
          console.log("Token:", token);

          dispatch(setUserAndToken({ data, token }));
        }
      } catch (error) {
        console.error(
          `${isSignInPage ? "Registration" : "Login"} failed:`,
          error.response.data
        );
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

  async function ssubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await publicRequest.post("/login", {
        email,
        password,
      });
      console.log("login success", response.data);
      dispatch(setUserAndToken(response.data));
      navigate("/userpage");
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address abc@email.com"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={submit} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <Link to="/signup">Dont have an account? signup here</Link>
    </div>
  );
}

export default LoginPages;
