import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Slide from "./Slide";
import IntroImage1 from "../../../assets/svgs/IntroImage1";
import IntroImage2 from "../../../assets/svgs/IntroImage2";
import IntroImage3 from "../../../assets/svgs/IntroImage3";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

interface SliderProps {
  onNext: () => void;
}

export default function Slider({ onNext }: SliderProps) {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { currentPage: pageIndex } = sliderState;

  const scrollVewRef = useRef<ScrollView>(null);

  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  async function handleNextPage() {
    const newPageIndex = pageIndex + 1;
    scrollVewRef.current?.scrollTo({
      x: width * newPageIndex,
      animated: true,
    });
  }

  async function handleGoToPage(pIndex: number) {
    scrollVewRef.current?.scrollTo({
      x: width * pIndex,
      animated: true,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollVewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{}}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={setSliderPage}
        scrollEnabled={false}
      >
        <Slide
          pagesNo={3}
          currentPageIndex={pageIndex}
          text_1="Turning your environmental actions into a tangible asset."
          text_2="Receive carbon credits for every tree planted sell or trade your
          earned carbon credits"
          IllustratorImg={IntroImage1}
          onNextPage={handleNextPage}
          onGoToPage={handleGoToPage}
        />
        <Slide
          pagesNo={3}
          currentPageIndex={pageIndex}
          text_1="Turning your environmental actions into a tangible asset."
          text_2="our platform allows users to mine carbon credits from their climate action"
          IllustratorImg={IntroImage2}
          onNextPage={handleNextPage}
          onGoToPage={handleGoToPage}
        />
        <Slide
          pagesNo={3}
          currentPageIndex={pageIndex}
          text_1="Turning your environmental actions into a tangible asset."
          text_2="To achieve net zero we must convert our climate action into a circular economy"
          IllustratorImg={IntroImage3}
          onNextPage={onNext}
          onGoToPage={handleGoToPage}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
