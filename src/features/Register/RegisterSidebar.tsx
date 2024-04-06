import dekstopBg from "../../assets/images/bg-sidebar-desktop.svg";
import mobileBg from "../../assets/images/bg-sidebar-mobile.svg";

type RegisterSidebarProps = {
  isMobile: boolean;
  currentForm: number;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
};

export default function RegisterSidebar({
  isMobile,
  currentForm,
  setCurrentForm,
}: RegisterSidebarProps) {
  return (
    <div className="md:relative h-full md:flex flex-shrink-0">
      {isMobile ? (
        <img src={mobileBg} className="w-screen md:w-auto" />
      ) : (
        <img src={dekstopBg} className="" />
      )}

      <div className="flex md:flex-col z-[100] absolute top-[2rem] left-[2rem] gap-[1rem]">
        <div className="gap-[1rem] flex items-center">
          <div
            onClick={() => setCurrentForm(1)}
            className={`rounded-full bg-primary-pastel-blue cursor-pointer ${
              currentForm === 1 ? "opacity-100" : "hover:opacity-100 opacity-30"
            }  text-black border-black border-[1px] py-3 px-6 flex items-center`}
          >
            1
          </div>
          <div className="whitespace-nowrap">
            <h4 className="uppercase text-white opacity-70">step 1</h4>
            <h4 className="uppercase text-white font-medium">Your Info</h4>
          </div>
        </div>
        <div className="gap-[1rem] flex items-center">
          <div
            onClick={() => setCurrentForm(2)}
            className={`rounded-full bg-primary-pastel-blue cursor-pointer ${
              currentForm === 2 ? "opacity-100" : "hover:opacity-100 opacity-30"
            }   text-black border-black border-[1px] py-3 px-6 flex items-center`}
          >
            2
          </div>
          <div className="whitespace-nowrap">
            <h4 className="uppercase text-white opacity-70">step 2</h4>
            <h4 className="uppercase text-white font-medium">Select Role</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
