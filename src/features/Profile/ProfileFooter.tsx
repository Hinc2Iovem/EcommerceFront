import { useState } from "react";
import LightBox from "../shared/LightBox";
import SellerAgreement from "./ForSellers/SellerAgreement";

type ProfileFooterTypes = {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProfileFooter({ role, setRole }: ProfileFooterTypes) {
  const [isLightBox, setIsLightBox] = useState(false);

  return (
    <>
      <SellerAgreement
        setRole={setRole}
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
      />
      <LightBox isLightBox={isLightBox} setIsLightBox={setIsLightBox} />

      <footer
        className={` ${
          role !== "seller" ? "visible" : "hidden"
        } w-full bg-white p-[.5rem] mt-auto`}
      >
        <div className="max-w-[146rem] m-auto p-[1rem] flex items-center justify-between">
          <h3>Want to try yourself as a seller?</h3>
          <button
            className="border-black border-[1px] px-[1rem] py-[1rem] rounded-md hover:border-none hover:bg-green-400 hover:text-white transition-colors"
            onClick={() => setIsLightBox(true)}
          >
            Become a seller
          </button>
        </div>
      </footer>
    </>
  );
}
