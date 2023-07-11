import type { AppProps } from 'next/app';
import '@/styles/globals.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvaider } from '@/contexts/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvaider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvaider>
  )
}
