import { useEffect, useState } from "react";
import { MuseNft, NFTs } from "./useGetAllMuseNfts";

export const useGetListedMuseNftsBySeller = (sellerAddr: string | undefined) => {
  const [nfts, setNfts] = useState<MuseNft[]>();
  useEffect(() => {
    setNfts(NFTs)
  }, [])
  return nfts;
};
