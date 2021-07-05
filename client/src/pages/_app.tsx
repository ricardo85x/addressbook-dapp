import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import {DappContextProvider } from "../contexts/DappContext"

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider resetCSS theme={theme}>
      <DappContextProvider>
        <Component {...pageProps} />
      </DappContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
