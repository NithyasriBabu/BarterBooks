import { useState, useEffect } from "react";

import { Text, View, Button } from "../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";

import styles from "../constants/Styles";

type BarCodeScannerViewProps = {
  onScanSuccess: Function;
};

const BarCodeScannerView = (props: BarCodeScannerViewProps) => {
  const { onScanSuccess } = props;
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanOn, setScanOn] = useState<Boolean>(true);
  const [scanned, setScanned] = useState<Boolean>(false);

  const getPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getPermission();
  }, []);

  type BarCodeScannedType = {
    type: string;
    data: string;
  };

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedType) => {
    setScanned(true);
    onScanSuccess(data);
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
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {BarCodeScannerContent()}
      {!scanOn && (
        <Button
          title={"Tap to Scan a Book"}
          onPress={() => {
            setScanOn(true);
            setScanned(false);
          }}
        />
      )}
    </View>
  );
};

export default BarCodeScannerView;
