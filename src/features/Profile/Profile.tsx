import { Bolt, User } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchBar from "../shared/SearchBar";
import { useState } from "react";
import ButtonHoverPromptModal from "../shared/ButtonHoverPromptModal";

export default function Profile() {
  const [role, setRole] = useState("seller");

  return (
    <section>
      <Header />
      <div className="flex flex-col p-[1rem]">
        <div className="self-end">
          <ButtonHoverPromptModal
            className="bg-neutral-magnolia m-0 shadow-md hover:bg-primary-orange font-medium text-[1.5rem]"
            contentName="Configure Products"
            showModal={false}
            variant="rectangleWithShadow"
          >
            <Link to="/configure/products">
              <Bolt />
            </Link>
          </ButtonHoverPromptModal>
        </div>

        <div className="flex gap-[4rem]">
          <div className="flex gap-[3rem] flex-col">
            <div className="border-black border-[3px] p-[1rem] border-double">
              <User className="w-[15rem] h-[20rem] text-primary-orange" />
              <div className="border-b-[1px] border-black border-dotted my-[1rem]"></div>
              <h5>Username</h5>
              <p>Status: Seller</p>
            </div>

            <div
              className={` ${
                role === "seller" ? "block" : "hidden"
              } border-[1px] border-black p-[1rem] `}
            ></div>
          </div>
          <div>
            <SearchBar />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
