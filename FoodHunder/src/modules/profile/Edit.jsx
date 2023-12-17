import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../../axios/axios';
import { clearUserAndToken, setUserAndToken } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import InputRadioButton from '../../components/Input/InputRadioButton';
import Button from '../../components/Button/Button';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import app from '../../firebase';


const Edit = ({ setopenUpload }) => {
  const currentUser = useSelector((state) => state.auth.user);
  console.log("current id", currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    email: currentUser.email,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await userRequest.put(
        `/user/find/${currentUser._id}`,
        formData
      );
      console.log("res data", response.data);
      const { user, token } = response.data;
      dispatch(setUserAndToken({ user, token }));
      navigate("/profile"); // Redirect to the profile page on success
      console.log("Edit successful. User data:", user);
    } catch (error) {
      console.error("Edit failed:", error);
      setErrorMessage("Edit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const storage = getStorage(app);
    const respos = await userRequest.delete(`/user/find/${currentUser._id}`);
    console.log("res", respos);
    setopenUpload(false);

    dispatch(clearUserAndToken());

    // Create a reference to the file to delete
    const desertRef = ref(storage, "profileimages/" + currentUser._id);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("deleted");
        // File deleted successfully
      })
      .catch((error) => {
        console.error("cant delete");
      });
    navigate('/home')
  };

  return (
    <div className="fixed top-0 right-[15%] left-[15%] m-auto  ">
      <div className="w-full h-full flex justify-center items-center mt-20  ">
        <div className="w-[800px] h-[600px] bg-slate-50 rounded-lg from-neutral-50 p-5 flex flex-col relative  overflow-scroll scrollbar-hide">
          <div className="flex justify-end text-white cursor-pointer">
            <button
              onClick={() => setopenUpload(false)}
              className="flex text-white mx-4 px-4  bg-neutral-950 "
            >
              close X
            </button>
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-start">
                <div className="flex flex-col mx-5 justify-center items-center  ">
                  <Input
                    label="User Name"
                    name="username"
                    type="text"
                    placeholder="ex: John Koya"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email id? ex:john@email.com"
                    value={currentUser.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Phone Number"
                    name="phonenumber"
                    type="text"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col mx-5 justify-center items-start">
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={currentUser.password}
                    onChange={handleInputChange}
                  />
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
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />

                    <div className="flex">
                      <div className="ml-2">
                        <InputRadioButton
                          label="Male"
                          name="gender"
                          type="radio"
                          value="male"
                          onChange={handleInputChange}
                          checked={formData.gender === "male"}
                        />
                      </div>
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

                  <div className="flex flex-col justify-center items-center w-full ">
                    <Button
                      type="submit"
                      className="p-2 justify-center"
                      label={"UPDATE"}
                      disabled={loading}
                    />
                  </div>
                </div>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
            </form>
          </div>
          <div className='flex justify-center'>
            <button onClick={handleDelete} className="flex px-4 m-4 bg-red-400">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit