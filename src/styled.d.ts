import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      poppins: string;
      lato: string;
      roboto: string;
    };

    fontWeights: {
      think: number;
      extraLight: number;
      light: number;
      medium: number;
      semiBold: number;
      bold: number;
      extraBold: number;
      black: number;
      regular: number;
    };

    color: {
      black: string;
      black1: string;
      black2: string;
      black3: string;
      black4: string;
      black5: string;
      white: string;
      blue: string;
      blueDark: string;
      green: string;
      greenDark: string;
      gray: string;
      grayDark: string;
      grayText: string;
      grayTextDark: string;
      red: string;
      redDark: string;
      redError: string;
    };
  }
}
