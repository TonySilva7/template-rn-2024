import 'styled-components/native';
import {myTheme} from '../theme';

declare module 'styled-components/native' {
  type CustomTheme = typeof myTheme;

  export interface DefaultTheme extends CustomTheme {}
}
