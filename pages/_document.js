import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full">
      <Head>
        <style>
          {`
            body {
              background-image: url('globalmod.png'); 
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
        body {
              height: 100%;
              margin: 0;
            }
          `}
        </style>
      </Head>
      <body className="bg-llama bg-cover bg-center bg-no-repeat h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
