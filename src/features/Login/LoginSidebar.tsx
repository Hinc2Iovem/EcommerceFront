import dekstopBg from "../../assets/images/bg-sidebar-desktop.svg";
import mobileBg from "../../assets/images/bg-sidebar-mobile.svg";

type LoginSidebarProps = {
  isMobile: boolean;
};

export default function LoginSidebar({ isMobile }: LoginSidebarProps) {
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
            className={`rounded-full bg-primary-pastel-blue cursor-pointer text-black border-black border-[1px] py-3 px-6 flex items-center`}
          >
            1
          </div>
          <div className="whitespace-nowrap">
            <h4 className="uppercase text-white opacity-70">step 1</h4>
            <h4 className="uppercase text-white font-medium">Your Info</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
