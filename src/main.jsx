import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        containerStyle={{
          zIndex: 99999, // Ensure this is higher than the modal's z-index
        }}
      />
    </QueryClientProvider>
  </ThemeProvider>
  // </StrictMode>
);
