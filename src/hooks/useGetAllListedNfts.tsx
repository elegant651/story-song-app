import {
  getAllListingObjectAddresses,
  getMusesong,
  getListingObjectAndSeller,
  getListingObjectPrice,
  getMusesongWithTokenAddr,
} from "~/aptos/contracts";
import { useEffect, useState } from "react";
import { useGetAllSellers } from "./useGetAllSellers";
import { MuseNft } from "./music/useGetAllMuseNfts";

export const useGetAllListedNfts = () => {
  const sellers = useGetAllSellers();
  const [nfts, setNfts] = useState<MuseNft[]>();
  useEffect(() => {
    if (!sellers) return;
    (async () => {
      const musesongs = [];
      for (const seller of sellers) {
        const listingObjectAddresses = await getAllListingObjectAddresses(
          seller
        );
        for (const listingObjectAddress of listingObjectAddresses) {
          const [nftAddress, sellerAddress] = await getListingObjectAndSeller(
            listingObjectAddress
          );
          const price = await getListingObjectPrice(listingObjectAddress);
          const musesong = await getMusesongWithTokenAddr(nftAddress);
          musesongs.push({
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
      }
      setNfts(musesongs);
    })();
  }, [sellers]);
  return nfts;
};
