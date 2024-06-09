import { SubmitHandler, useForm } from "react-hook-form";
import { userSchema, userSchemaTypes } from "../../../models/Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate, axiosPublic } from "../../../api/axios";
import axios from "axios";
import RegisterFormCredentials from "./RegisterFormCredentials";
import RegisterFormRoles from "./RegisterFormRoles";

type AuthFormProps = {
  isMobile: boolean;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
  currentForm: number;
};

export default function RegisterForm({
  currentForm,
  isMobile,
  setCurrentForm,
}: AuthFormProps) {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<userSchemaTypes>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [errMsg, setErrMsg] = useState("");
  const [chosenRole, setChosenRole] = useState("Customer");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/shop";

  const onSubmit: SubmitHandler<userSchemaTypes> = async (data) => {
    if (isValid) {
      const registerObj = {
        username: data.username,
        password: data.password,
        roles: [chosenRole],
      };
      try {
        const res = await axiosPrivate.post("/auth/register", registerObj);
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
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        isMobile
          ? ""
          : "justify-center relative top-0 w-auto px-20 bg-neutral-alabaster"
      } flex flex-col z-[100] w-full items-center`}
    >
      <RegisterFormCredentials
        isMobile={isMobile}
        currentForm={currentForm}
        errors={errors}
        register={register}
        setCurrentForm={setCurrentForm}
      />
      <RegisterFormRoles
        chosenRole={chosenRole}
        currentForm={currentForm}
        isValid={isValid}
        isMobile={isMobile}
        setChosenRole={setChosenRole}
        setCurrentForm={setCurrentForm}
      />
    </form>
  );
}
