import Svg, { Path, Rect, SvgProps } from "react-native-svg";
export default function RepeatIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 21 20" {...props}>
      <Rect
        width="20"
        height="20"
        transform="matrix(-1 0 0 1 20.5 0)"
        fill={"none"}
      />
      <Path d="M15.8084 6.66665L12.0584 8.83171V7.49998H6.24159V10.8333H4.57492V5.83332H12.0584V4.50159L15.8084 6.66665Z" />
      <Path d="M8.94158 14.1667H16.4251V9.16665H14.7584V12.5H8.94158V11.1683L5.19158 13.3333L8.94158 15.4984V14.1667Z" />
    </Svg>
  );
}
