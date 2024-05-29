import { useEffect, useState } from "react";
import { getUser } from "../../features/Profile/profileQueries";
import { UserTypes } from "../../types/ProfileTypes";

export default function useGetUser({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserTypes | object>({});
  useEffect(() => {
    getUser({ userId }).then((r) => {
      if (r) {
        setUser(r);
      }
    });
  }, [userId]);

  return user as UserTypes;
}
