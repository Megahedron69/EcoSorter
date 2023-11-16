import { CircularProgressBase } from "react-native-circular-progress-indicator";
export default function ActRings({ colos, isclockwise, vals }) {
  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2,
    clockwise: isclockwise,
  };
  return (
    <CircularProgressBase
      {...props}
      value={vals[0]}
      radius={100}
      activeStrokeColor={colos[0]}
      inActiveStrokeColor={colos[0]}
    >
      <CircularProgressBase
        {...props}
        value={vals[1]}
        radius={75}
        activeStrokeColor={colos[1]}
        inActiveStrokeColor={colos[1]}
      >
        <CircularProgressBase
          {...props}
          value={vals[2]}
          radius={50}
          activeStrokeColor={colos[2]}
          inActiveStrokeColor={colos[2]}
        >
          <CircularProgressBase
            {...props}
            value={vals[3]}
            radius={25}
            activeStrokeColor={colos[3]}
            inActiveStrokeColor={colos[3]}
          />
        </CircularProgressBase>
      </CircularProgressBase>
    </CircularProgressBase>
  );
}
