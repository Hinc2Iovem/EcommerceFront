import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { axiosPrivate, axiosPublic } from "../../../api/axios";
import axios from "axios";
import LoginFormCredentials from "./LoginFormCredentials";

type AuthFormProps = {
  isMobile: boolean;
};

export default function LoginForm({ isMobile }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/shop";

  const canSubmit = [username, password].every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      const loginObj = {
        username,
        password,
      };

      try {
        const res = await axiosPrivate.post("/auth", loginObj);
        const accessToken = res.data?.accessToken;
        setAuth({ accessToken });
        navigate(from, { replace: true });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setErrMsg("No Serve Response");
          } else if (error.response?.status === 400) {
            setErrMsg("Username or Password is missing");
          } else if (error.response?.status === 401) {
            setErrMsg("Wrong Username or Password");
          } else {
            setErrMsg("Something Went Wrong");
          }
        }
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        isMobile
          ? ""
          : "justify-center relative top-0 w-auto px-20 bg-neutral-alabaster"
      } flex flex-col z-[100] w-full items-center`}
    >
      <LoginFormCredentials
        setUsername={setUsername}
        username={username}
        password={password}
        setPassword={setPassword}
        isMobile={isMobile}
      />
    </form>
  );
}
