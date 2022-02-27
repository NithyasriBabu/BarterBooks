import { useState } from "react";

import axios from "axios";
import { BookPreviewType } from "../../types";

const unknownBook = {
  kind: "",
  id: "",
  volumeInfo: {
    title: "",
    subtitle: "",
    authors: [""],
    publisher: "",
    publishedDate: "",
    description: "",
    industryIdentifiers: [
      {
        type: "",
        identifier: "",
      }
    ],
    pageCount: 0,
    categories: [""],
    averageRating: 0,
    ratingsCount: 0,
    imageLinks: {
      smallThumbnail: "",
      thumbnail: "",
    },
    language: "",
  },
  searchInfo: {
    textSnippet: "",
  }
};

export default function useFetchBook() {
  const [fetching, setIsFetching] = useState<Boolean>(false);
  const [bookData, setBookData] = useState<BookPreviewType>();

  const url = "https://www.googleapis.com/books/v1/volumes?q=";

  const fetchBookData = (data: {key: string, value: string | undefined }[]) => {
    setIsFetching(true);
    const searchParams = data.map(({key, value}) => ( key + ":" + value)).reduce((prev, curr) => prev + "+" + curr, "");
    axios
      .get(url + searchParams)
      .then((response) => (response.data))
      .then((books) => {
        setIsFetching(false);
        setBookData(books?.items[0]);
      })
      .catch((error) => {
        setIsFetching(false);
        alert(`Unable to find the book.`);
      });
  };

  return { fetching, bookData, fetchBookData };
}