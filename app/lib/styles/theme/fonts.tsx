import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-BlackItalic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-BlackItalic.woff') format('woff');
      font-weight: 900;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-BoldItalic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-BoldItalic.woff') format('woff');
      font-weight: bold;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-ExtraBoldItalic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-ExtraBoldItalic.woff') format('woff');
      font-weight: bold;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-SemiBoldItalic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-SemiBoldItalic.woff') format('woff');
      font-weight: 600;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-MediumItalic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-MediumItalic.woff') format('woff');
      font-weight: 500;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-ExtraLightItalic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-ExtraLightItalic.woff') format('woff');
      font-weight: 200;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-LightItalic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-LightItalic.woff') format('woff');
      font-weight: 300;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-Black.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-Black.woff') format('woff');
      font-weight: 900;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-Italic.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-Italic.woff') format('woff');
      font-weight: normal;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-Bold.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-ExtraBold.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-ExtraBold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-Regular.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-Light.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-SemiBold.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-SemiBold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-Medium.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Source Sans 3';
      src: url('/fonts/source-sans/SourceSans3-ExtraLight.woff2') format('woff2'),
          url('/fonts/source-sans/SourceSans3-ExtraLight.woff') format('woff');
      font-weight: 200;
      font-style: normal;
      font-display: swap;
  }


      `}
  />
);

export default Fonts;
