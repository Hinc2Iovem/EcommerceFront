import { User } from "lucide-react";
import Header from "../Header/Header";
import InputLabelGoesDown from "../shared/InputLabelGoesDown";
import { useState } from "react";

const basicRejectionResponse =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis recusandae, voluptas incidunt suscipit voluptate natus?";

export default function Permission() {
  const [rejectionReason, setRejectionReason] = useState("");
  const [value, setValue] = useState("");

  return (
    <>
      <Header setValue={setValue} showPillsOrNot={false} />
      <section className="max-w-[146rem] m-auto p-[1rem]">
        <div className="mt-[3rem] w-full flex flex-col gap-[1rem] p-[1rem]">
          <div className="bg-white flex flex-col gap-[.5rem] p-[1rem] rounded-lg shadow-sm shadow-black">
            <div className="flex items-center">
              <User className="w-[4rem] h-[4rem]" />
              <div className="flex flex-col">
                <h3>Username</h3>
                <p>id 23456432456754367865436</p>
              </div>
            </div>
            <form>
              <InputLabelGoesDown
                htmlFor="reasonForRejection"
                id="reasonForRejection"
                placeHolder="Request is denied because of...."
                type="text"
                value={rejectionReason}
                setValue={setRejectionReason}
                className="my-[1rem]"
              />

              <div className="flex items-center gap-[.5rem]">
                <label htmlFor="confirmUserUserId">Confirm request?</label>
                <input id="confirmUserUserId" type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="my-[1rem] active:scale-[.97] shadow-sm shadow-black p-[1rem] outline-none hover:bg-primary-orange hover:text-white rounded-md transition-all hover:translate-x-1"
                  type="button"
                  onClick={() => setRejectionReason(basicRejectionResponse)}
                >
                  Give basic response for rejection
                </button>
                <button className="my-[1rem] active:scale-[.97] shadow-sm shadow-black p-[1rem] outline-none hover:bg-green-400 hover:text-white rounded-md transition-all hover:translate-x-1">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
