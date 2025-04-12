import { getAllMusesongs, getMusesong, getListingObjectAndSeller, getListingObjectPrice, getMusesongWithTokenAddr } from "~/aptos/contracts";
import { useEffect, useState } from "react";
import { MuseNft } from "./music/useGetAllMuseNfts";

export const useGetNft = (listingObjectAddress: string, nftAddress: string) => {
  const [nft, setNft] = useState<MuseNft>();
  useEffect(() => {
    if (!nftAddress || !listingObjectAddress) return;
    const getNFT = async () => {
      const [_, sellerAddress] = await getListingObjectAndSeller(
        listingObjectAddress
      );
      const price = await getListingObjectPrice(listingObjectAddress);
      const musesong = await getMusesongWithTokenAddr(nftAddress);
      setNft({
        id: musesong[0],
        title: musesong[1],
        prompt: musesong[2],
        image_url: musesong[3],
        audio_url: musesong[4],
        tags: musesong[5],
        price: price,
        address: nftAddress,
        seller_address: sellerAddress,
        listing_address: listingObjectAddress
      });
    }
    getNFT()
  }, [nftAddress]);
  return nft;
};
