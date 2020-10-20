import React from 'react';
import { AppProps } from 'next/app';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps): React.ReactNode {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default App;
