import { Button, Text, View } from "../components/Themed";
import { Image, ScrollView } from "react-native";
import styles from "../constants/Styles";
import { RootTabScreenProps } from "../../types";

const BookPreviewScreen = ({
  route,
  navigation,
}: RootTabScreenProps<"BookPreview">) => {
  const { bookData } = route.params;
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>{bookData?.volumeInfo?.title}</Text>
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
        <Button title={"Add to Your Collection"} onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

export default BookPreviewScreen;
