import { getMusesongWithTokenAddr } from "~/aptos/contracts";
import { useEffect, useState } from "react";
import { MuseNft } from "./useGetAllMuseNfts";


export const useGetMyGeneratedNft = (ownerAddress: string, nftTokenAddress: string) => {
  const [nft, setNft] = useState<MuseNft>();
  useEffect(() => {
    if (!nftTokenAddress || !ownerAddress) return;

    const getNft = async () => {
      console.log('getNFT')
      const musesong = await getMusesongWithTokenAddr(nftTokenAddress);
      console.log('m', musesong)
      setNft({
        id: musesong[0],
        title: musesong[1],
        prompt: musesong[2],
        image_url: musesong[3],
        audio_url: musesong[4],
        tags: musesong[5],
        price: 0,
        address: nftTokenAddress,
        seller_address: ownerAddress,
        listing_address: ''
      });
    }
    getNft()
  }, [ownerAddress, nftTokenAddress]);
  return nft;
};
