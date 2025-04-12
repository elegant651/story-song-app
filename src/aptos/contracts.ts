// import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
export const MUSESONG_CONTRACT_ADDRESS =
  "0x8e9ca6ae761c8b89c140d73d85ce2c6a8a8066d4ebf33bae0f92a8ba264c04ad";

//marketplace
// export const MARKETPLACE_CONTRACT_ADDRESS = "0xaca573fbecfceb40c4b89448c6e2d284479eae59992f967552fbcc7e8633bf53";
export const COLLECTION_ID = "0xbcbf7cfa9d9c89b3f846801a1765e700cf2c3843f2053e48521ea0127bd919bd"; // retrieve from get_musesong_collection_address() at musenft contract
export const COLLECTION_CREATOR_ADDRESS = "0x6a54ac5beae5658d8236589332ff1b6fb25ce1eabe0601dacff64189f5d89bd6"; // retrieve from profile when deploying it to testnet
export const COLLECTION_NAME = "MUSESONG Collection";

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;

// const config = new AptosConfig({
//   network: Network.TESTNET,
// });
// export const aptos = new Aptos(config);

export const getMusesong = async (
  nftObjectAddr: string
): Promise<[string, string, string, string, string, string, number]> => {
  console.log("nftObjectAddr", nftObjectAddr);
  // const musesong = await aptos.view({
  //   payload: {
  //     function: `${MUSESONG_CONTRACT_ADDRESS}::main::get_musesong`,
  //     typeArguments: [],
  //     functionArguments: [nftObjectAddr],
  //   },
  // });
  // console.log(musesong);
  // return [musesong[0] as string, musesong[1] as string, musesong[2] as string, musesong[3] as string, musesong[4] as string, musesong[5] as string, musesong[6] as number];
  //musesong.id, musesong.title, musesong.prompt, musesong.image_url, musesong.audio_url, musesong.tags, musesong.points
  return ["", "", "", "", "", "", 0]
};

export const getMusesongWithTokenAddr = async (
  tokenAddr: string
): Promise<[string, string, string, string, string, string, number]> => {
  console.log("tokenAddr", tokenAddr);
  // const musesong = await aptos.view({
  //   payload: {
  //     function: `${MUSESONG_CONTRACT_ADDRESS}::main::get_musesong_with_token_address`,
  //     typeArguments: [],
  //     functionArguments: [tokenAddr],
  //   },
  // });
  // console.log(musesong);
  // return [musesong[0] as string, musesong[1] as string, musesong[2] as string, musesong[3] as string, musesong[4] as string, musesong[5] as string, musesong[6] as number];
  //musesong.id, musesong.title, musesong.prompt, musesong.image_url, musesong.audio_url, musesong.tags, musesong.points
  return ["", "", "", "", "", "", 0]
};

export const getAptBalance = async (addr: string) => {
  // const result = await aptos.getAccountCoinAmount({
  //   accountAddress: addr,
  //   coinType: APT,
  // });

  // console.log("APT balance", result);
  // return result / APT_UNIT;
  return 0
};

export const getUserOwnedMusesongs = async (ownerAddr: string) => {
  // const result = await aptos.getAccountOwnedTokensFromCollectionAddress({
  //   accountAddress: ownerAddr,
  //   collectionAddress: COLLECTION_ID,
  // });

  // console.log("my musesongs", result);
  // return result;
  return []
};

export const getAllMusesongs = async () => {
  // const result: {
  //   current_token_datas_v2: MuseNft[];
  // } = await aptos.queryIndexer({
  //   query: {
  //     query: `
  //       query MyQuery($collectionId: String) {
  //         current_token_datas_v2(
  //           where: {collection_id: {_eq: $collectionId}}
  //         ) {
  //           name: token_name
  //           address: token_data_id
  //         }
  //       }
  //     `,
  //     variables: { collectionId: COLLECTION_ID },
  //   },
  // });

  // return result.current_token_datas_v2;
  return []
};

export const getAllListingObjectAddresses = async (sellerAddr: string) => {
  // const allListings: [string[]] = await aptos.view({
  //   payload: {
  //     function: `${ABI.address}::marketplace::get_seller_listings`,
  //     typeArguments: [],
  //     functionArguments: [sellerAddr],
  //   },
  // });
  // console.log("all listings", allListings);
  // return allListings[0];
  return []
};

export const getAllSellers = async () => {
  // const allSellers: [string[]] = await aptos.view({
  //   payload: {
  //     function: `${ABI.address}::marketplace::get_sellers`,
  //     typeArguments: [],
  //     functionArguments: [],
  //   },
  // });
  // console.log("all sellers", allSellers);
  // return allSellers[0];
  return []
};

export const getListingObjectAndSeller = async (
  listingObjectAddr: string
): Promise<[string, string]> => {
  // const listingObjectAndSeller = await aptos.view({
  //   payload: {
  //     function: `${ABI.address}::marketplace::listing`,
  //     typeArguments: [],
  //     functionArguments: [listingObjectAddr],
  //   },
  // });
  // console.log("listing object and seller", listingObjectAndSeller);
  // return [
  //   // @ts-ignore
  //   listingObjectAndSeller[0]["inner"] as string,
  //   listingObjectAndSeller[1] as string,
  // ];
  return ["", ""]
};

export const getListingObjectPrice = async (
  listingObjectAddr: string
): Promise<number> => {
  // const listingObjectPrice = await aptos.view({
  //   payload: {
  //     function: `${ABI.address}::marketplace::price`,
  //     typeArguments: [APT],
  //     functionArguments: [listingObjectAddr],
  //   },
  // });
  // console.log("listing object price", JSON.stringify(listingObjectPrice));
  // // @ts-ignore
  // return (listingObjectPrice[0]["vec"] as number) / APT_UNIT;
  return 0
};
