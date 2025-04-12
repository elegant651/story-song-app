import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

// replace your vercel domain
const baseUrl = "http://localhost:4500";

async function customGenerateAudio(payload: string) {
  const url = `${baseUrl}/api/custom_generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function generateAudioByPrompt(payload: any) {
  const url = `${baseUrl}/api/generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  console.log('response.data', response.data)
  return response.data;
}

async function extendAudio(payload: any) {
  const url = `${baseUrl}/api/extend_audio`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}


async function getAudioInformation(audioIds: string) {
  const url = `${baseUrl}/api/get?ids=${audioIds}`;
  const response = await axios.get(url);
  console.log('response.data', response.data)
  return response.data;
}

async function getQuotaInformation() {
  const url = `${baseUrl}/api/get_limit`;
  const response = await axios.get(url);
  return response.data;
}

async function getClipInformation(clipId: string) {
  const url = `${baseUrl}/api/clip?id=${clipId}`;
  const response = await axios.get(url);
  return response.data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { prompt } = req.body
    console.log('prompt', prompt)

    // const data = await generateAudioByPrompt({
    //   prompt: prompt,
    //   //"A popular heavy metal song about war, sung by a deep-voiced male singer, slowly and melodiously. The lyrics depict the sorrow of people after the war.",
    //   make_instrumental: false,
    //   wait_audio: true,
    // });

    // // console.log('generatedData', data)
    // const ids = `${data[0].id},${data[1].id}`; //8292d764-4d24-4413-8b80-b16da72562ed,6bb05e78-6646-42be-a3da-896a8b95d119

    const dataId1 = '7f3e9b5e-c529-43ee-9efd-0dc1f036c8f4'
    const dataId2 = '7f3e9b5e-c529-43ee-9efd-0dc1f036c8f4'
    const ids = `${dataId1},${dataId2}`;
    console.log(`ids: ${ids}`);

    // let audio_data1;
    // let audio_data2;

    // const dataInfo = await getAudioInformation(ids);
    // audio_data1 = dataInfo[0]
    // audio_data2 = dataInfo[1]

    const audio_data1 = {
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
      duration: 138.64
    }

    return res.json({ result: true, audio_data1 })
  }
}
