import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedView } from "../ThemedView";
import WelcomePageLogo from "../../../assets/svgs/WelcomePageLogo";
import WelcomePageSvg from "../../../assets/svgs/IntroImage1";
import { ModalCard } from "../ModalCard";
import { ThemedButton } from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import Constants from "expo-constants";
import { Colors } from "@/constants/Colors";
import { FC } from "react";
import { SvgProps } from "react-native-svg";

const { width, height } = Dimensions.get("window");

interface SlideProps {
  pagesNo: number;
  currentPageIndex: number;
  text_1: string;
  text_2: string;
  IllustratorImg: FC<SvgProps>;
  onNextPage: () => void;
  onGoToPage: (pageIndex: number) => void;
}

export default function Slide({
  pagesNo,
  currentPageIndex,
  text_1,
  text_2,
  IllustratorImg,
  onNextPage,
  onGoToPage,
}: SlideProps) {
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background.default}
    >
      {/* Images */}
      <View style={styles.logoContainer}>
        <WelcomePageLogo style={styles.logo} />
        <IllustratorImg style={styles.illustration} />
      </View>
      <ModalCard style={styles.modal}>
        {/* HEADER- Handle */}
        <View style={styles.handleContainer}>
          {Array.from(Array(pagesNo).keys()).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: 2,
              }}
              onPress={() => onGoToPage(index)}
            >
              <View
                style={[
                  styles.handleBar,
                  {
                    backgroundColor:
                      currentPageIndex === index
                        ? Colors.light.background.default
                        : "#D9D9D9",
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        {/* CONTENT */}
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <ThemedText style={styles.text1} type="subtitle">
            {text_1}
          </ThemedText>
          <ThemedText
            style={styles.text2}
            type="subtitle"
            lightColor={"#818181"}
          >
            {text_2}
          </ThemedText>
        </ScrollView>
        {/* FOOTER */}
        <View style={styles.footer}>
          <ThemedButton
            icon={{ name: "arrow-forward" }}
            variant="default"
            onPress={onNextPage}
          />
        </View>
      </ModalCard>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 15 + Constants.statusBarHeight,
  },
  logo: {
    marginLeft: "auto",
  },
  illustration: {
    flexShrink: 1,
    maxWidth: "100%",
    marginHorizontal: "auto",
  },
  modal: {
    maxHeight: height - Constants.statusBarHeight - 60 - 30,
    paddingHorizontal: 31,
  },
  handleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 7,
  },
  handleBubble: {
    width: 11,
    height: 11,
    borderRadius: 11,
    backgroundColor: "#D9D9D9",
  },
  handleBar: {
    width: 43,
    height: 5,
    borderRadius: 10,
  },
  text1: {
    maxWidth: 270,
    textAlign: "center",
    marginTop: 32,
    marginHorizontal: "auto",
  },
  text2: {
    marginVertical: 32,
    maxWidth: 341,
    textAlign: "center",
    marginHorizontal: "auto",
  },
  footer: {
    paddingBottom: 10,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
