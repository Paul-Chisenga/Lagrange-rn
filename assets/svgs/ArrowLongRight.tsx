import Svg, { Path, Rect, SvgProps } from "react-native-svg";
export default function ArrowLongRight(props: SvgProps) {
  return (
    <Svg viewBox="0 0 25 25" {...props}>
      {/* <Rect
        width="24"
        height="24"
        transform="translate(0.0688477 0.0861816)"
        fill="#1467D4"
      /> */}
      <Path d="M23.1365 12.079L18.8867 7.84351L17.4749 9.26011L19.3102 11.0893L1.00119 11.0873L1.00098 13.0873L19.3057 13.0893L17.4842 14.9169L18.9008 16.3288L23.1365 12.079Z" />
    </Svg>
  );
}
