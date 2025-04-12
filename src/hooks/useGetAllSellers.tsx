import { getAllSellers } from "~/aptos/contracts";
import { useEffect, useState } from "react";

export const useGetAllSellers = () => {
  const [sellers, setSellers] = useState<string[]>();
  useEffect(() => {
    getAllSellers().then((res) => {
      setSellers(res);
    });
  }, []);
  return sellers;
};
