import React, { useState } from "react";
import Input from "../../components/Input/Input";
import InputRadioButton from "../../components/Input/InputRadioButton";
import loginimg from "../../assets/loginimg.jpg";
import loginimg2 from "../../assets/loginimg2.jpg";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../axios/axios";
import { useDispatch } from "react-redux";
import { setUserAndToken } from "../../redux/authSlice";
import Button from "../../components/Button/Button";
import { auth, provider } from '../../../src/firebase'
import { signInWithPopup } from 'firebase/auth' 
import { async } from "@firebase/util";

const Form = ({ isSignInPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    country: "",
    phonenumber: "",
    dob: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("results in google signin ", result);
       var { user } = result;

      console.log("User:", user);
      console.log(" credliens Token:", user.auth.email);

      

     const response = await publicRequest.post("/auth/google", {
       username: user.auth.displayName,
       email: user.auth.email,
       image: user.metadata.photoURL,
     });
      // var { user , token } = response.data;
       console.log("User g:", user);
       console.log(" credliens Token g:", token);
      
      //  dispatch(setUserAndToken({ user, token }));
       navigate("/home");

      
     

      console.log(
        "Login with Google successful. User data:",
        response.payload.user
      );
      navigate("/home");
    } catch (error) {
      console.error("Error during sign-in with Google:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "password" && formData.confirmPassword) {
      setErrorMessage(
        value !== formData.confirmPassword ? "Passwords do not match" : ""
      );
    } else if (name === "confirmPassword" && formData.password) {
      setErrorMessage(
        value !== formData.password ? "Passwords do not match" : ""
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await publicRequest.post(
        `${!isSignInPage ? "/auth/signup" : "/auth/signin"}`,
        formData
      );

      if (!isSignInPage) {
        console.log("Registration successful:", response.data);
        const { user, token } = response.data;
         dispatch(setUserAndToken({ user, token }));
         navigate("/home");
   

      } else {
        const { user, token } = response.data;
        console.log("Login successful. User data:", user);
        console.log("Token:", token);

        dispatch(setUserAndToken({ user, token }));
        navigate('/home')
      }

      // Clear form data on successful submission
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        country: "",
        phonenumber: "",
        dob: "",
        gender: "",
      });
    } catch (error) {
      console.error(
        `${!isSignInPage ? "signup" : "login"} failed:`,error
      );
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d2cfdf] h-screen w-screen flex justify-center items-center ">
      <div className="h-[700px] w-[1000px] bg-white flex  justify-center items-center md:flex-row scrollbar-hide">
        <div
          className={`${
            !isSignInPage ? "order-1" : "order-2 justify-center"
          } h-[700px] pt-20 w-full flex flex-col overflow-scroll items-center scrollbar-hide`}
        >
          <div>
            <h1 className="text-2xl font-serif font-bold text-red-600 justify-center">
              Welcome Food Hunters
            </h1>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm ">
              {!isSignInPage
                ? "Please register to continue"
                : "Please login to continue."}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="Email id? ex:john@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
            />
            {!isSignInPage ? (
              <div>
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handleInputChange(e); // Trigger validation
                  }}
                />
                <Input
                  label="User Name"
                  name="username"
                  type="text"
                  placeholder="ex: John Koya"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <div className="flex flex-col">
                  <label
                    className="block text-gray-800 text-sm font-bold mb-2 mt-2"
                    htmlFor="country"
                  >
                    Country :
                  </label>
                  <select
                    className="w-60 shadow-md border rounded border-gray-900 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-lg"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="null">select</option>
                    <option value="india">India</option>
                    <option value="china">China</option>
                  </select>
                </div>

                <Input
                  label="Phone Number"
                  name="phonenumber"
                  type="text"
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                />

                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />

                <div className="flex">
                  <InputRadioButton
                    label="Male"
                    name="gender"
                    type="radio"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                  />
                  <div className="ml-2">
                    <InputRadioButton
                      label="Female"
                      name="gender"
                      type="radio"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col justify-center items-center">
              <Button
                type="submit"
                className="p-2"
                label={isSignInPage ? "Register" : "Login"}
                disabled={loading}
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <p
                className="p-2 text-sm text-gray-700 underline"
                onClick={() =>
                  navigate(
                    `${isSignInPage ? "/account/signup" : "/account/signin"}`
                  )
                }
              >
                {isSignInPage
                  ? "New user? Sign in"
                  : " Already have an account? log in"}
              </p>

              <p
                className="p-2 text-sm text-gray-700 underline"
                onClick={signInWithGoogle}
              >
                {isSignInPage
                  ? " Login with Google"
                  : "New user? Sign in with Google"}
              </p>
            </div>
          </form>
        </div>

        <div
          className={`flex  ${
            !isSignInPage ? "order-2" : "order-1"
          } border w-full h-full bg-gray-600 hidden md:block items-center justify-center my-auto`}
        >
          <img className="flex h-[50%] " src={loginimg2} alt="Food Hunters" />
          <img className="flex h-[50%]" src={loginimg} alt="Food Hunters" />
        </div>
      </div>
    </div>
  );
};

export default Form;
