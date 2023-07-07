import type { AppProps } from 'next/app';
import '@/styles/globals.scss';

import { AuthProvaider } from '@/contexts/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvaider>
      <Component {...pageProps} />
    </AuthProvaider>
  )
}
