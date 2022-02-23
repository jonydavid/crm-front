import '../../public/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layouts/default'

import '../../public/styles/custom.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}