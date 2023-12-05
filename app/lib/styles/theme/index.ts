import { extendTheme } from '~/components';
import { config } from './config';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  canvas: {
    empty: '#f5f5f5',
  },
};

const styles = {
  global: {
    // don't override light/dark mode
    // body: {
    //   bg: 'gray.300',
    //   color: 'gray.800',
    // },
  },
};

export const theme = extendTheme({ colors, styles, config });
