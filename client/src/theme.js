import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#ff8181",
      main: "#ff8181",
    },
    secondary: {
      light: "#000000",
      main: "#000000",
    },
    third: {
      light: "#98c6bd",
      main: "#98c6bd",
    },
  },
  typography: {
    fontFamily: `'Pretendard Variable', Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
      'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
});
