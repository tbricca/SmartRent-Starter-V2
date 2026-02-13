import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import loadable from "@loadable/component";

import { reactQueryConfig } from "@smartrent/hooks";
import {
  PlatformProvider,
  ThemeProvider,
  Skeleton,
  ToastProvider,
} from "@smartrent/ui";

import { SentryErrorBoundary } from "./components/Sentry";

// load screen like so
const ReplaceMe = loadable(() => import("./pages/ReplaceMe"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...reactQueryConfig.defaultOptions?.queries,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PlatformProvider>
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <SentryErrorBoundary>
                <Suspense
                  fallback={
                    <View style={styles.loader}>
                      <Skeleton width={20} circle />
                    </View>
                  }
                >
                  <Switch>
                    {/* routes go here */}
                    <Route path="/" component={ReplaceMe} />
                  </Switch>
                </Suspense>
              </SentryErrorBoundary>
            </QueryClientProvider>
          </ToastProvider>
        </PlatformProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignItems: "center",
  },
});

export default App;
