import { Pencil, Trash2, User2 } from "lucide-react";
import SearchBar from "../shared/SearchBar";

type ProfileProductsSideTypes = {
  role: string;
};

export default function ProfileProductsSide({
  role,
}: ProfileProductsSideTypes) {
  return (
    <div className="flex-grow">
      <SearchBar />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3 justify-items-center items-center">
        <div className="bg-white w-full h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between">
          <User2 className="self-center h-[5rem] w-[5rem]" />
          <div className="flex flex-col gap-[.3rem]">
            <div className="mb-[3rem] font-medium">
              <h5>Title</h5>
              <h5>Price</h5>
            </div>
            <div
              className={`${
                role === "seller" ? "flex flex-col gap-[.5rem]" : "hidden"
              }`}
            >
              <h4 className="font-medium">Id</h4>
              <div className="flex items-center gap-[1px]">
                <button className="w-[50%] self-center border-[1px] transition-all border-black hover:text-white p-[.1rem] active:scale-[.97] rounded-md hover:bg-red-300">
                  <Trash2 className="m-auto" />
                </button>
                <button className="w-[50%] border-[1px] border-black transition-all hover:text-white p-[.1rem] active:scale-[.97] rounded-md hover:bg-orange-300">
                  <Pencil className="m-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
