import React, { useContext, useState } from "react";
import { AppContext } from "@context/Context";
import axios from "../../api/axios";
import Spinner from "@components/Spinner";
import endPoints from "@services/api";
import { ModalLogin } from "@components/Login/ModalLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUserCategories, setIsOpenWelcome } = useContext(AppContext);
  const route = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sendInfo, setSendInfo] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [messageLogin, setMessageLogin] = useState(null);

  const loading = (
    <div className="flex justify-center mt-5">
      <Spinner />
    </div>
  );

  async function fetchLogin() {
    const userData = {
      username,
      password,
    };

    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(endPoints.auth.login, userData, options)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.body.body));
        localStorage.setItem("token", res.data.body.token);
        setUserCategories(
          JSON.parse(localStorage.getItem("user")).tasksCategories
        );
        setIsOpenWelcome(true);
        if (res.status === 200) {
          setTimeout(function () {
            setSendInfo(false);
            setUsername("");
            setPassword("");
            route("/dashboard");
          }, 3000);
        } else {
          setMessage(res.data.body.message);
          setSendInfo(false);
          setIsOpenLogin(true);
        }
      })
      .catch((error) => {
        const errorData = error.response.data.body.message;
        setMessageLogin(errorData);
        setSendInfo(false);
        setIsOpenLogin(true);
        if (!username || !password) {
          setUsername(username);
          setPassword(password);
        }
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setMessageLogin("All fields are required");
      setIsOpenLogin(true);
      setUsername(username);
      setPassword(password);
      setSendInfo(false);
    } else {
      setSendInfo(true);
    }

    fetchLogin();
  }

  return (
    <div className="absolute flex flex-col justify-center px-8 py-8 lg:w-80 lg:px-8 bg-[#F4F6F7] rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <img
          className="mx-auto h-16  w-auto"
          src="./icons/notes-logo.png"
          alt="Notes App"
        />
        <h1 className="text-center text-md mt-5 font-bold">Welcome</h1>
        <p className="text-center text-sm mt-2">Sign to continue</p>
      </div>

      <div className="mt-10 lg:w-full">
        <form className="space-y-6">
          <div>
            <p className="text-sm font-[500]">Username</p>
            <div className="flex justify-between items-center">
              <div className="w-full border-b-[0.5px] border-black hover:scale-[102%] duration-500 shadow-sm">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full text-sm border-none bg-inherit"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <i className="absolute right-10 ri-user-fill text-[20px]"></i>
            </div>
          </div>
          <div>
            <p className="text-sm font-[500]">Password</p>
            <div className="flex justify-between items-center">
              <div className="w-full border-b-[0.5px] border-black hover:scale-[102%] duration-500 shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full text-sm border-none bg-inherit"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <i className="absolute right-10 ri-lock-fill text-[20px]"></i>
            </div>
          </div>

          <div
            className={`flex justify-center mt-2 ${
              sendInfo ? "hidden" : "block"
            }`}
          >
            <button
              type="submit"
              className="flex w-1/3 justify-center rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-xl hover:bg-cyan-600  hover:scale-105 duration-1000"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
          </div>
          <p className="flex justify-center items-center gap-2 mt-10 text-sm text-gray-500">
            Not registered yet?
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </a>
          </p>
        </form>
      </div>
      {sendInfo && loading}
      {isOpenLogin && (
        <ModalLogin
          isOpenLogin={isOpenLogin}
          setIsOpenLogin={() => setIsOpenLogin()}
          messageLogin={messageLogin}
          setMessageLogin={() => setMessageLogin()}
        />
      )}
    </div>
  );
};

export default Login;
