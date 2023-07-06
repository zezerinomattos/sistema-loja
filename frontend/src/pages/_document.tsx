import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head >

        {/*-------------- FONTES GOOGLE ----------------*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&family=Ubuntu:ital,wght@0,300;1,400&display=swap" rel="stylesheet" />
        {/*---------------------------------------------*/}

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
