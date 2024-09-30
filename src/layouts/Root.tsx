import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
// import { self } from "../http/api";
import { useAuthStore } from "../store";
// import { AxiosError } from "axios";

// const getSelf = async () => {
//   const { data } = await self();
//   return data;
// };

const Root = () => {
  const { setUser } = useAuthStore();
  const data = {
    id: 1,
    name: "ankit",
    firstName: "ankit",
    lastName: "bharvad",
    email: "ankit@gmail.com",
    balance: 5000,
    currencyCode: "EUR",
    role: "manager",
  };

  // const { data, isLoading } = useQuery({
  //   queryKey: ["self"],
  //   queryFn: getSelf,
  //   retry: (failureCount: number, error) => {
  //     if (error instanceof AxiosError && error.response?.status === 401) {
  //       return false;
  //     }
  //     return failureCount < 3;
  //   },
  // });

  // useEffect(() => {
  //   if (data) {
  //     setUser(data);
  //   }
  // }, [data, setUser]);

  useEffect(() => {
    // is temporory useEffect
    if (data) {
      setUser(data);
    }
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return <Outlet />;
};

export default Root;
