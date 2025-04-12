import { getAllMusesongs, getMusesong, getMusesongWithTokenAddr } from "~/aptos/contracts";
import { useEffect, useState } from "react";
import { MuseNft } from "./music/useGetAllMuseNfts";

export const useGetAllNfts = () => {
  const [nfts, setNfts] = useState<MuseNft[]>();
  useEffect(() => {
    getAllMusesongs().then(async (res) => {
      const musesongs = [];
      for (const item of res) {
        const musesong = await getMusesongWithTokenAddr(item.address);
        musesongs.push({
          id: musesong[0],
          title: musesong[1],
          prompt: musesong[2],
          image_url: musesong[3],
          audio_url: musesong[4],
          tags: musesong[5],
          price: 0,
          address: item.address,
          seller_address: '',
        });
      }
      setNfts(musesongs);
    });
  }, []);
  return nfts;
};
