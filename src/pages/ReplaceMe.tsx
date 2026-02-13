import { View } from "react-native";

import { Typography, useTheme } from "@smartrent/ui";

export default function ReplaceMe() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colors.pageBackground,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>
        edit <code>src/pages/ReplaceMe.tsx</code> to see changes
      </Typography>
    </View>
  );
}
