import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';

import { lightTheme } from './index';
import Header from '../Header';
import { baseStyles } from '../styles/GlobalStyles';
import { styles } from '../../custom/styles/styles';

const ThemeProvider = ({ children, location }) => (
  <div>
    <Global styles={[baseStyles, ...styles]} />
    <Header location={location} />
    <EmotionThemeProvider theme={lightTheme}>{children}</EmotionThemeProvider>
  </div>
);

export default ThemeProvider;
