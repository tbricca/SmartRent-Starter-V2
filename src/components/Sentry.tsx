import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import * as Sentry from "@sentry/react";

import { Button } from "@smartrent/ui";

export const SentryErrorBoundary: React.FC = ({ children }) => {
  if (!process.env.SENTRY_ENABLED) {
    return <>{children}</>;
  }

  return (
    <Sentry.ErrorBoundary fallback={<SentryError />}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

const SentryError: React.FC = () => {
  const handleReload = useCallback(() => {
    window.location.reload();

    return false;
  }, []);

  return (
    <View style={styles.error}>
      <Button onPress={handleReload}>Reload Page</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
