import { getMusesongWithTokenAddr, getUserOwnedMusesongs } from "~/contract/contracts";
import { useEffect, useState } from "react";
import { MuseNft } from "./music/useGetAllMuseNfts";

export const useGetNftsByOwner = (ownerAddr: string | undefined) => {
  const [nfts, setNfts] = useState<MuseNft[]>();
  useEffect(() => {
    if (!ownerAddr) return;
    getUserOwnedMusesongs(ownerAddr).then(async (res) => {
      const musesongs = [];
      for (const item of res) {
        const musesong = await getMusesongWithTokenAddr(item.token_data_id);
        musesongs.push({
          id: musesong[0],
          title: musesong[1],
          prompt: musesong[2],
          image_url: musesong[3],
          audio_url: musesong[4],
          tags: musesong[5],
          price: 0,
          address: item.token_data_id,
          seller_address: ownerAddr,
          listing_address: ''
        });
      }
      setNfts(musesongs);
    });
  }, [ownerAddr]);
  return nfts;
};
