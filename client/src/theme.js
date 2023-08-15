import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#ff8181",
      main: "#ff8181",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#FFFFFF",
    },
    third: {
      light: "#98c6bd",
      main: "#98c6bd",
    },
  },
  typography: {
    fontFamily: `'omu','Pretendard Variable', Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
      'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
});
