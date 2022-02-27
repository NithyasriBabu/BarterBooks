import { Button, View } from "../components/Themed";
import styles from "../constants/Styles";
import { RootTabScreenProps } from "../../types";

import BookPreviewScreen from "./BookPreviewScreen";

const AddToCollectionScreen = ({
  route,
  navigation,
}: RootTabScreenProps<"BookPreview">) => {
  const bookData = route.params;
  return (
    <View style={styles.container}>
      <BookPreviewScreen bookData={bookData} />
      <Button
        title={"Add to Your Collection"}
        onPress={() => {
          alert(`${bookData?.volumeInfo?.title} was added to your collection.`);
        }}
      />
    </View>
  );
};

export default AddToCollectionScreen;
