import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const {
    isPending,
    data: cart = [],
    refetch,
  } = useQuery({
    queryKey: ["ProductAddToCart", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_DataHost}/ProductAddToCart/${user?.email}`
      );
      return response.json();
    },
  })

  return [cart, isPending, refetch];
};

export default useCart;
