import {
  getAllListingObjectAddresses,
  getMusesong,
  getListingObjectAndSeller,
  getListingObjectPrice,
  getMusesongWithTokenAddr,
} from "~/contract/contracts";
import { useEffect, useState } from "react";
import { MuseNft } from "./music/useGetAllMuseNfts";

export const useGetListedNftsBySeller = (sellerAddr: string | undefined) => {
  const [nfts, setNfts] = useState<MuseNft[]>();
  useEffect(() => {
    if (!sellerAddr) return;
    getAllListingObjectAddresses(sellerAddr).then(
      async (listingObjectAddresses) => {
        const musesongs = [];
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
        setNfts(musesongs);
      }
    );
  }, [sellerAddr]);
  return nfts;
};
