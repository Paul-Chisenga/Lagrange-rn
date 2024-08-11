import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import PageTitle from "../PageTitle";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export default function CustomDrawerContent() {
  // props: DrawerContentComponentProps
  const backgroundColor = useThemeColor(
    { dark: Colors.dark.background.system },
    "background",
    "default"
  );
  return (
    <DrawerContentScrollView
      // {...props}
      contentContainerStyle={{ backgroundColor, flexGrow: 1, width: "80%" }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <PageTitle>Header</PageTitle>
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>
          <Text>Content</Text>
        </View>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text>Footer</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
  },
  headerContainer: {
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    padding: 20,
  },
});
