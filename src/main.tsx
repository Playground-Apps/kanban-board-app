import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {client} from './client/client.gen.ts';
import KanbanBoard from './pages/KanbanBoardView.tsx';
import Layout from './pages/Layout.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditTaskView } from './pages/EditTaskView.tsx';
import Backlog from './pages/Backlog.tsx';
import { BoardView } from './pages/BoardView.tsx';
import EditBoardView from './pages/EditBoardView.tsx';
import PageNotFound from './pages/404Page.tsx';
import PhaseMovements from './pages/PhaseMovements.tsx';

const queryClient = new QueryClient();
const ServerBaseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
// configure internal service client
client.setConfig({
  // set default base url for requests
  baseUrl: ServerBaseUrl+"/api/kanban_board",
  // set default headers for requests
  headers: {
    Authorization: 'Bearer <token_from_service_client>',
  },
});
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
        <BrowserRouter>
         <Routes>
           <Route element={<Layout />}>
            <Route path="/ActiveSprint" element={<KanbanBoard />} />
            <Route path="/EditTask/:id" element={<EditTaskView />} />
            <Route path="/Backlog" element={<Backlog />} />
            <Route path="/ViewBoards" element={<BoardView />} />
            <Route path="/EditBoard/:id" element={<EditBoardView />} />
            <Route path="*" element={<PageNotFound />} />
           </Route>
         </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
        </QueryClientProvider>
  </StrictMode>,
)
