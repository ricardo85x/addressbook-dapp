import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import {DappContextProvider } from "../contexts/DappContext"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider resetCSS theme={theme}>
      <DappContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </DappContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
