import { Text, View } from "../components/Themed";
import { Image, ScrollView } from "react-native";
import styles from "../constants/Styles";
import { BookPreviewType } from "../../types";

const BookPreviewScreen = (props: { bookData: BookPreviewType }) => {
  console.log("BookScreenProps", props);
  const { bookData } = props;
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>{bookData.volumeInfo?.title}</Text>
        <View style={styles.separator} />
        <Image
          style={styles.image}
          source={{
            uri: bookData?.volumeInfo?.imageLinks?.thumbnail,
          }}
        />
        <View style={styles.separator} />
        <Text style={styles.title}>{bookData?.searchInfo?.textSnippet}</Text>
        <View style={styles.separator} />
      </View>
    </ScrollView>
  );
};

export default BookPreviewScreen;
