import { useState, useEffect } from "react";

import { Text, View } from "../components/Themed";
import { Camera } from "expo-camera";

import { TouchableOpacity } from "react-native";

import styles from "../constants/Styles";

import useFetchBook from "../hooks/useFetchBook";
import { RootTabScreenProps } from "../../types";

const BarCodeScannerScreen = ({
  navigation,
}: RootTabScreenProps<"ScanBook">) => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanned, setScanned] = useState<Boolean>(false);

  const { fetching, fetchBookData, bookData } = useFetchBook();

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    if (!fetching && bookData) {
      navigation.push("AddToCollection", { bookData: bookData });
    }
  }, [fetching, bookData]);

  type BarCodeScannedType = {
    type: string;
    data: string;
  };

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedType) => {
    setScanned(true);
    fetchBookData([{ key: "isbn", value: data }]);
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
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barCodeArea}
          type={type}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.title}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      );
    }
  };

  return <View style={styles.container}>{BarCodeScannerContent()}</View>;
};

export default BarCodeScannerScreen;
