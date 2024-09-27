import React from "react";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6337E6",
            colorLink: "#6337E6",
            borderRadius: 0,
          },
          components: {
            Menu: {
              itemColor: "#fff",
              itemHoverColor: "#fff",
              horizontalItemHoverColor: "#fff",
              horizontalItemSelectedColor: "#fff",
              activeBarBorderWidth: 2,
              popupBg: "#6337E6",
              itemActiveBg: "red",
              itemSelectedColor: "red",
              itemSelectedBg: "red",
              // darkItemHoverColor: "#fff",
            },
            Button: {},
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
