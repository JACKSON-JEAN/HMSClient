import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

class ChunkErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    if (error?.message?.includes("Loading chunk")) {
      return { hasError: true };
    }
    return null;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p>App updated. Please reload.</p>
          <button
            className="mt-3 px-4 py-2 bg-black text-white"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className=" bg-slate-100 font-sans">
          <ChunkErrorBoundary>
            <RouterProvider router={router} />
          </ChunkErrorBoundary>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
