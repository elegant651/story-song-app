import { useEffect, useState } from "react";
import { MuseNft, NFTs } from "./useGetAllMuseNfts";

export const useGetMuseNft = (nftAddress: string) => {
  const [nft, setNft] = useState<MuseNft>();
  useEffect(() => {
    setNft(NFTs[0])
  }, [])
  return nft;
};
