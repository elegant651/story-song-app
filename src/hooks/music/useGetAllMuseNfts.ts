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
  id: '849d810a-9cf4-4477-8bf3-de69c40ecc4b',
  title: 'Sky High Dreams',
  image_url: 'https://cdn2.suno.ai/image_849d810a-9cf4-4477-8bf3-de69c40ecc4b.jpeg',
  audio_url: 'https://cdn1.suno.ai/849d810a-9cf4-4477-8bf3-de69c40ecc4b.mp3',
  video_url: 'https://cdn1.suno.ai/849d810a-9cf4-4477-8bf3-de69c40ecc4b.mp4',
  created_at: '2024-10-12T05:53:46.390Z',
  model_name: 'chirp-v3.5',
  status: 'complete',
  gpt_description_prompt: 'Ethereal, Pop-Rock, Piano, Harmonies, Catchy Melodies, Uplifting Rhythm',
  type: 'gen',
  tags: 'piano harmonies catchy melodies pop-rock uplifting rhythm ethereal',
  address: '0xfc1024329f0644a5841e773baacec045',
  prompt: 'easy listening, dreams',
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
