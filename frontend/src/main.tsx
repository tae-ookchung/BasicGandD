import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', //TODO: set var
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
