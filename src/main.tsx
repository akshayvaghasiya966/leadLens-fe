import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
     <PersistGate loading={null} persistor={persistor}>
    <App />
    <Toaster position="top-center" /> 
     </PersistGate>
  </StrictMode>
  </Provider>
)
