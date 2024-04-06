import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";

type RegisterFormInfoProps = {
  currentForm: number;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<{
    username: string;
    password: string;
    confirmPassword: string;
  }>;
  errors: FieldErrors<{
    username: string;
    password: string;
    confirmPassword: string;
  }>;
};

export default function RegisterFormInfo({
  currentForm,
  setCurrentForm,
  errors,
  register,
}: RegisterFormInfoProps) {
  return (
    <div
      className={`${
        currentForm === 1 ? "flex" : "hidden"
      } flex-col bg-neutral-alabaster shadow-inner md:shadow-none md:w-fit w-[95%] gap-3 p-[2rem] rounded-xl md:relative md:h-full`}
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
          {...register("username")}
          aria-describedby="uidnote"
        />
        {errors.username && (
          <span
            id="uidnote"
            className=" text-red-500 font-medium text-[1.2rem]"
          >
            {errors.username?.message}
          </span>
        )}
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
          {...register("password")}
          aria-describedby="pwdnote"
        />
        {errors.password && (
          <span
            id="pwdnote"
            className=" text-red-500 font-medium text-[1.2rem]"
          >
            {errors.password?.message}
          </span>
        )}
        <label
          htmlFor="confirmPassword"
          className="text-primary-marine-blue font-normal text-[2rem]"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          className="p-3 text-[2rem] rounded-xl  outline-none border-[1px] border-black"
          type="password"
          placeholder="Very Strong Password"
          {...register("confirmPassword")}
          aria-describedby="confirmnote"
        />
        {errors.confirmPassword && (
          <span
            id="confirmnote"
            className=" text-red-500 font-medium text-[1.2rem]"
          >
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>

      <button
        onClick={() => setCurrentForm(2)}
        type="button"
        className="hover:bg-primary-purplish-blue hover:text-white self-end mt-[2rem]  bottom-0 bg-primary-marine-blue text-neutral-magnolia py-[1rem] px-[2.5rem] rounded-lg"
      >
        Next Step
      </button>
      <div className="md:absolute md:bottom-0 md:left-0 bottom-5 left-[5rem]">
        <h4>Already have an account?</h4>
        <Link
          to="/login"
          className="hover:text-primary-purplish-blue text-[2rem]"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
