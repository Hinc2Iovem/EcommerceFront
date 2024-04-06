import { useLocation, useNavigate } from "react-router-dom";
import RegisterFormInfo from "./RegisterFormInfo";
import RegisterFormRoles from "./RegisterFormRoles";
import useAuth from "../../hooks/useAuth";
import { userSchema, userSchemaTypes } from "../../models/Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { axiosPublic } from "../../api/axios";
import axios from "axios";

type RegisterFormProps = {
  currentForm: number;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
};

export default function RegisterForm({
  currentForm,
  setCurrentForm,
}: RegisterFormProps) {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<userSchemaTypes>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/shop";
  const [errMsg, setErrMsg] = useState("");

  const onSubmit: SubmitHandler<userSchemaTypes> = async (data) => {
    if (isValid) {
      try {
        const res = await axiosPublic.post(
          "/register",
          JSON.stringify({ user: data.username, pwd: data.password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const accessToken = res.data?.accessToken;
        setAuth({ user: data.username, accessToken });
        navigate(from, { replace: true });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setErrMsg("No Serve Response");
          } else if (error.response?.status === 409) {
            setErrMsg("This Username Taken");
          } else {
            setErrMsg("Something Went Wrong");
          }
        }
      }
    }
  };

  const [chosenRole, setChosenRole] = useState("User");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:justify-center z-[100] fixed top-[10rem] md:relative md:top-0 w-full  md:w-auto items-center md:px-20 md:bg-neutral-alabaster"
    >
      <RegisterFormInfo
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        register={register}
        errors={errors}
      />
      <RegisterFormRoles
        chosenRole={chosenRole}
        currentForm={currentForm}
        setChosenRole={setChosenRole}
        setCurrentForm={setCurrentForm}
        isValid={isValid}
      />
    </form>
  );
}
