import endPoints from "@services/api";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "@context/Context";
import { ModalSignUp } from "@components/Signup/ModalSignup";
import Spinner from "@components/Spinner";

const Signup = () => {
  const { setStatusSignup } = useContext(AppContext);

  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [messageSignup, setMessageSignup] = useState(null);

  const loading = (
    <div className="flex justify-center mt-5">
      <Spinner />
    </div>
  );

  // async function fetchSignup() {
  //   const userData = {
  //     names,
  //     lastNames,
  //     username,
  //     password,
  //   };

  //   const options = {
  //     headers: {
  //       accept: "*/*",
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios
  //     .post(endPoints.auth.signup, userData, options)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         const message = res.data.body.message;
  //         setTimeout(function () {
  //           setCreateUser(false);
  //           setNames("");
  //           setLastNames("");
  //           setUsername("");
  //           setPassword("");
  //           setMessageSignup(message);
  //           setStatusSignup(200);
  //           setIsOpenSignup(true);
  //         }, 3000);
  //       }
  //     })
  //     .catch((error) => {
  //       const errorProcess = error.response.data.body.message;
  //       setMessageSignup(errorProcess);
  //       setStatusSignup(400);
  //       setIsOpenSignup(true);
  //       setCreateUser(false);
  //       if (!names || !lastNames || !username || !password) {
  //         setNames(names);
  //         setLastNames(lastNames);
  //         setUsername(username);
  //         setPassword(password);
  //       }
  //     });
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!names || !lastNames || !username || !password) {
      setCreateUser(false);
      setMessageSignup("All fields are required");
      setIsOpenSignup(true);
      setNames(names);
      setLastNames(lastNames);
      setUsername(username);
      setPassword(password);
    } else {
      setMessageSignup("");
      setCreateUser(true);
      setStatusSignup(400);
      window.location.href = "/";
    }

    //Fetching information
    //fetchSignup();
  }

  return (
    <div className="absolute flex flex-col justify-center px-3 py-5 w-72 md:4/12 lg:w-96 lg:px-8 bg-[#F4F6F7] rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h1 className="text-center text-2xl mt-2 font-bold">Create Account</h1>
        <p className="text-center text-sm mt-2">Create a new account</p>
      </div>

      <div className="mt-10 w-full px-2">
        <form className="space-y-6">
          <div className="mt-2">
            <p className="text-sm font-[500]">Names:</p>
            <div className="w-full border-b-[0.5px] border-black hover:scale-[102%] duration-500 shadow-sm">
              <input
                id="names"
                name="names"
                required
                className="block w-full text-sm border-none bg-inherit capitalize"
                value={names}
                onChange={(e) => setNames(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm font-[500]">Last Names:</p>
            <div className="w-full border-b-[0.5px] border-black hover:scale-[102%] duration-500 shadow-sm">
              <input
                id="lastNames"
                name="lastNames"
                required
                className="block w-full text-sm border-none bg-inherit capitalize"
                value={lastNames}
                onChange={(e) => setLastNames(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm font-[500] mt-2">Username:</p>
            <div className="flex justify-between items-center">
              <div className="w-full border-b-[0.5px] border-black hover:scale-[102%] duration-500 shadow-sm">
                <input
                  id="username"
                  name="username"
                  required
                  className="block w-full text-sm border-none bg-inherit"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <i className="absolute right-10 lg:right-12 ri-user-fill text-[20px]"></i>
            </div>
          </div>
          <div className="mt-2 ">
            <p className="text-sm font-[500] mt-2">Password: </p>
            <div className="flex justify-between items-center">
              <div className="w-full border-b-[0.5px] border-black hover:scale-[102%] duration-500 shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full text-sm border-none bg-inherit"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <i className="absolute right-10 lg:right-12 ri-lock-fill text-[20px]"></i>
            </div>
          </div>

          {createUser === false && (
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-1/2 justify-center rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-cyan-600 hover:scale-105 duration-1000"
                onClick={(e) => handleSubmit(e)}
              >
                Create Account
              </button>
            </div>
          )}
        </form>

        {createUser === false && (
          <p className="mt-5 text-center text-black text-sm">
            Already have a account?
            <a href="/" className="ml-2 font-[600] hover:font-[800]">
              Login
            </a>
          </p>
        )}
      </div>
      {createUser && loading}
      {isOpenSignup && (
        <ModalSignUp
          isOpenSignup={isOpenSignup}
          setIsOpenSignup={() => setIsOpenSignup()}
          messageSignup={messageSignup}
          setMessageSignup={() => setMessageSignup()}
        />
      )}
    </div>
  );
};

export default Signup;
