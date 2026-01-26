import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {client} from './client/client.gen.ts';
import Layout from './pages/Layout.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const ServerBaseUrl = import.meta.env.VITE_BASE_URL;
console.log("ServerBaseUrl:", ServerBaseUrl);
// configure internal service client
client.setConfig({
  // set default base url for requests
  baseUrl: ServerBaseUrl,
  // set default headers for requests
  headers: {
    Authorization: 'Bearer <token_from_service_client>',
  },
});
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
        </QueryClientProvider>
  </StrictMode>,
)
