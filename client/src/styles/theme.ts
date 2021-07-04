import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    colors: {
        orange: {
            600: "#FFB038"
        },
        brand: {
  
            500: "#FFB038",
            600: "#DD6B20",

        }
    },
    fonts: {
        body: "Roboto",
        heading: "Roboto"
    },
    styles: {
        global: {
            body: {
                color: 'orange.600',
                bg: 'orange.50'
            }
        }
    }
})