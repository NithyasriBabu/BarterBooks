import { useState, useEffect } from "react";

import { Text, View, Button } from "../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";

import styles from "../constants/Styles";

import { StyleSheet } from "react-native";

const BarCodeScannerView = () => {
  console.log(StyleSheet.absoluteFillObject);
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState<Boolean>(false);

  const getPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const BarCodeScannerContent = () => {
    if (hasPermission === null) {
      return <Text style={styles.title}>Requesting Permission for Camera</Text>;
    } else if (hasPermission === false) {
      return (
        <Text style={styles.title}>
          No Access to the Camera, Use our manual form
        </Text>
      );
    } else {
      return (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ ...styles.barCodeArea, ...styles.container }}
          />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </>
      );
    }
  };

  return <View style={styles.container}>{BarCodeScannerContent()}</View>;
};

export default BarCodeScannerView;
