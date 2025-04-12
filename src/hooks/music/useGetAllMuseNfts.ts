import { useEffect, useState } from "react";

export type MuseNft = {
  id: string;
  address: string;
  title: string;
  image_url: string;
  audio_url: string;
  prompt: string;
  tags: string;
  price: number;
  seller_address: string;
  listing_address: string;
}

export const NFTs = [{
  id: 'fc102432-9f06-44a5-841e-773baacec045',
  address: '0xfc1024329f0644a5841e773baacec045',
  title: 'After the Thunder',
  image_url: 'https://cdn2.suno.ai/image_fc102432-9f06-44a5-841e-773baacec045.jpeg',
  audio_url: 'https://cdn1.suno.ai/fc102432-9f06-44a5-841e-773baacec045.mp3',
  prompt: 'A popular heavy metal song about war, sung by a deep-voiced male singer, slowly and melodiously. The lyrics depict the sorrow of people after the war.',
  tags: 'heavy metal slow melodic',
  price: 0,
  seller_address: '0xfc1024329f0644a5841e773baacec045'
}]

export const useGetAllMuseNfts = () => {
  const [nfts, setNfts] = useState<MuseNft[]>();
  useEffect(() => {
    setNfts(NFTs)
  }, [])
  return nfts;
};
