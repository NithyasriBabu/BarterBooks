import { StyleSheet } from "react-native";

import { Light } from "./Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: 350,
    margin: 20,
    alignSelf: "stretch",
  },
  barCodeArea: {
    flex: 1,
    width: "100%"
  },
  image: {
    height: 300,
    width: 200,
    resizeMode: "stretch"
  },
  smallImage: {
    height: 115,
    width: 75,
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
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderRadius: 5,
    backgroundColor: Light.background,
    color: Light.text,
    width: 300,
    margin: 20,
    padding: 10,
    borderColor: Light.text,
    borderStyle: "solid",
    borderWidth: 1
  }
});

export default styles;
