import { useEffect, useState } from "react";
import { getUser } from "../../features/Profile/profileQueries";
import { UserTypes } from "../../types/ProfileTypes";

export default function useGetUser() {
  const [user, setUser] = useState<UserTypes | object>({});
  useEffect(() => {
    let preventRerenders = true;
    if (preventRerenders) {
      getUser({ userId: JSON.stringify(localStorage.getItem("userId")) }).then(
        (r) => {
          if (r !== undefined) {
            setUser(r);
          }
        }
      );
    }
    return () => {
      preventRerenders = false;
    };
  }, []);

  return user as UserTypes;
}
