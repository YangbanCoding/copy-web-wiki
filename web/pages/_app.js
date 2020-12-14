import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import MainLayout from 'components/Layout/MainLayout'
import '../styles/global.scss'
import s from 'styles/App.module.scss'

export default function App ({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <MainLayout>
        <div className={s.container}>
          <Component {...pageProps} />
        </div>
      </MainLayout>
    </ApolloProvider>
  )
}
