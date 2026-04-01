import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./globals.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

import { ThemeProvider } from "@/components/theme-provider"

import { SidebarProvider } from './context/SidebarContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <SidebarProvider>
                    <App />
                </SidebarProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
