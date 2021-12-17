import { pink } from "@mui/material/colors";
import { createTheme,} from "@mui/material/styles";

const theme =createTheme({
   palette: {
     primary: {
       light: '#E2E2E2',
       main: '#000000',
       dark: '#494949'
     },
     secondary:{
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#FFFFFF'
     }
   },
 })

export {
   theme
}