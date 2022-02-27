import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: 200,
    resizeMode: "stretch"
  },
  scrollView: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  barCodeArea: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%"
  },

});

export default styles;
