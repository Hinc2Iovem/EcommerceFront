import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/axios";
import { FormEvent, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [user, setUser] = useLocalStorage("username", "");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  console.log(errMsg);

  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/shop";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosPublic.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = res.data?.accessToken;
      setAuth({ user, accessToken });
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
  };

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:justify-center z-[100] fixed top-[10rem] md:relative md:top-0 w-full md:w-auto items-center md:px-20 md:bg-neutral-alabaster"
    >
      <div
        className={`flex flex-col bg-neutral-alabaster shadow-inner md:shadow-none md:w-fit w-[95%] gap-3 p-[2rem] rounded-xl md:relative md:h-full`}
      >
        <div className="md:mb-5 md:mt-[5rem] mb-[1rem] self-start">
          <h2 className="font-bold text-primary-marine-blue text-6xl">
            Personal Info
          </h2>
          <p className="text-neutral-cool-gray md:whitespace-nowrap">
            Please provide your username and password.
          </p>
        </div>

        <div className="flex flex-col gap-[.2rem]">
          <label
            htmlFor="username"
            className="text-primary-marine-blue font-normal text-[2rem] "
          >
            Username
          </label>

          <input
            id="username"
            className="p-3 text-[2rem] rounded-xl outline-none border-[1px] border-black"
            type="text"
            placeholder="Hinc2Iovem"
            aria-describedby="uidnote"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label
            htmlFor="password"
            className="text-primary-marine-blue font-normal text-[2rem]"
          >
            Password
          </label>
          <input
            id="password"
            className="p-3 text-[2rem] rounded-xl outline-none border-[1px] border-black"
            type="password"
            placeholder="Very Strong Password"
            aria-describedby="pwdnote"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="hover:bg-primary-purplish-blue hover:text-white self-end mt-[2rem]  bottom-0 bg-primary-marine-blue text-neutral-magnolia py-[1rem] px-[2.5rem] rounded-lg"
        >
          Submit
        </button>

        <div className="md:bottom-0 md:left-0 bottom-5 left-[5rem] md:absolute">
          <h4>Do not have an account?</h4>
          <Link
            to="/register"
            className="hover:text-primary-purplish-blue text-[2rem]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}
