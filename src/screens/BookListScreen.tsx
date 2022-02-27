import React from "react";
import styles from "../constants/Styles";

import { View } from "../components/Themed";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { BookPreviewType, RootTabScreenProps } from "../../types";
import bookData from "../assets/database/bookData.json";

const BookListScreen = ({ navigation }: RootTabScreenProps<"BookList">) => {
  const bookList = bookData.books;

  const books = bookList.map((book) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push("BookPreview", { bookData: book })}
        key={book?.id}
      >
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>{book?.volumeInfo.title}</Card.Title>
          <Card.Divider />
          <Image
            style={styles.smallImage}
            source={{ uri: book?.volumeInfo.imageLinks.smallThumbnail }}
          />
        </Card>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>{books}</View>
    </ScrollView>
  );
};

export default BookListScreen;
