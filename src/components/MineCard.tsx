import { StyleSheet, View } from "react-native";
import MineIllustration from "../../assets/svgs/MineIllustration";
import { ThemedButton } from "./ThemedButton";
import { TintColor } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import GlobeIcon from "../../assets/svgs/GlobeIcon";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";

type Mine = {
  id: string;
  title: string;
};

interface Props {
  mine: Mine;
  variant: keyof TintColor;
}
export function MineCard({ mine, variant }: Props) {
  const tintColor = useThemeColor({}, "tint", variant);
  return (
    <View style={[styles.container, { backgroundColor: `${tintColor}33` }]}>
      {/* globe Icon */}
      <GlobeIcon style={styles.globeIcon} fill={tintColor} />
      <ThemedText lightColor="#000" style={styles.title}>
        {mine.title}
      </ThemedText>
      <MineIllustration style={styles.illustration} />
      <View style={styles.btnContainer}>
        <Link href={`/variation-3/mines/${mine.id}`} asChild>
          <ThemedButton
            style={styles.btn}
            textStyle={{ fontSize: 7, lineHeight: 12 }}
            variant={variant}
          >
            Join
          </ThemedButton>
        </Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: "100%",
    width: 133,
    rowGap: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  globeIcon: { marginLeft: "auto" },
  title: {
    width: 68,
    fontFamily: "BebasNeue_400Regular",
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: 12,
  },
  illustration: {
    marginLeft: "auto",
  },
  btnContainer: {
    marginHorizontal: "auto",
  },
  btn: {
    borderRadius: 16,
  },
});
