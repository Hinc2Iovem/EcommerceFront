import { axiosPrivate } from "../../api/axios";
import useAuth from "../useAuth";

type GetRefreshTypes = {
  accessToken: string;
};

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const res = await axiosPrivate.get<GetRefreshTypes>("/auth/refresh");
    setAuth(() => {
      return {
        accessToken: res.data.accessToken,
      };
    });
    return res.data.accessToken;
  };
  return refresh;
}
