import { useState } from "react";
import styles from "../constants/Styles";

import { Button, Text, View } from "../components/Themed";
import { RootTabScreenProps, BookPreviewType } from "../../types";
import BarCodeScannerView from "./BarcodeScannerView";

import axios from "axios";
import { AppLoading } from "./AppLoading";

export default function AddBook({ navigation }: RootTabScreenProps<"AddBook">) {
  const [loading, setIsLoading] = useState<Boolean>(false);
  const [scanOn, setScanOn] = useState<Boolean>(false);
  const [bookData, setBookData] = useState<BookPreviewType>(undefined);

  const url = "https://www.googleapis.com/books/v1/volumes?q=";

  const fetchBook = (data: string) => {
    setIsLoading(true);
    setScanOn(false);
    axios
      .get(url + "isbn:" + data)
      .then((response) => {
        setIsLoading(false);
        console.log("Scan Success");
        return response.data;
      })
      .then((data) => {
        setBookData(data?.items[0]);
        navigation.push("BookPreview", { bookData });
      })
      .catch((error) => {
        alert(`Unable to find the book.`);
      });
  };

  if (loading) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {scanOn && <BarCodeScannerView onScanSuccess={fetchBook} />}
      <View style={styles.container}>
        <View style={styles.separator} />
        <Text style={styles.title}>Add your Book</Text>
        <View style={styles.separator} />
        <View style={styles.container}>
          <Button title="Tap to Scan a Book" onPress={() => setScanOn(true)} />
          <Button title="Add a Book Manually" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}
