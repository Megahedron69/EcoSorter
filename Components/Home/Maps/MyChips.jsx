import { Chip } from "react-native-paper";
const MyChips = ({ iconName, selected, chipText, onPress }) => {
  return (
    <Chip
      type="flat"
      icon={iconName}
      selected={selected}
      showSelectedOverlay={true}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        marginRight: 15,
      }}
      elevated={true}
      onPress={onPress}
    >
      {chipText}
    </Chip>
  );
};
export default MyChips;
