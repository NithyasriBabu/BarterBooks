import styles from "../constants/Styles";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import BarCodeScannerView from "./BarcodeScannerView";

export default function AddBook({ navigation }: RootTabScreenProps<"AddBook">) {
  return (
    <View style={styles.container}>
      {BarCodeScannerView()}
      <View style={styles.container}>
        <View style={styles.separator} />
        <Text style={styles.title}>Add your Book</Text>
        <View style={styles.separator} />
      </View>
    </View>
  );
}
