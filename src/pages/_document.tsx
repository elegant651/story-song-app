import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>StorySong - AI music NFT marketplace powered by Story</title>
        <meta name="description" content="AI music NFT marketplace powered by aptos" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta property="og:title" content="StorySong - AI music NFT marketplace powered by aptos" />
        <meta property="og:url" content="https://storysong.vercel.app/" />
        <meta property="og:image:alt" content="StorySong" />
        <meta
          property="og:description"
          content="StorySong - AI music NFT marketplace powered by aptos"
        />
        <meta httpEquiv="X-Frame-Options" content="deny" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}