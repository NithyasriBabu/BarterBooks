import { useEffect } from "react";
import styles from "../constants/Styles";

import { TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Button, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import useFetchBook from "../hooks/useFetchBook";

import { AppLoading } from "./AppLoading";
import { Light } from "../constants/Colors";

export default function AddBook({ navigation }: RootTabScreenProps<"AddBook">) {
  const { fetching, bookData, fetchBookData } = useFetchBook();
  const { control, handleSubmit } = useForm({ mode: "onBlur" });
  const fields = [
    {
      name: "intitle",
      placeholder: "Search with title or parital title",
      defaultValue: "",
    },
    {
      name: "inauthor",
      placeholder: "Search with author name",
      defaultValue: "",
    },
    {
      name: "inpublisher",
      placeholder: "Search with publisher name",
      defaultValue: "",
    },
    {
      name: "subject",
      placeholder: "Search the book's premise",
      defaultValue: "",
    },
    {
      name: "isbn",
      placeholder: "Enter your book's ISBN here",
      defaultValue: "",
    },
  ];

  type formSubmitType = {
    intitle?: string;
    inauthor?: string;
    inpublisher?: string;
    subject?: string;
    isbn?: string;
  };

  const onSubmit = (data: formSubmitType) => {
    fetchBookData(
      Object.entries(data)
        .filter(([_, value]) => value !== undefined || "")
        .map(([key, value]) => ({ key: key, value: value ? value : "" }))
    );
  };

  useEffect(() => {
    if (!fetching && bookData) {
      console.log("AddBook", bookData.id);
      navigation.push("BookPreview", { bookData });
    }
  }, [fetching, bookData]);

  if (fetching) return <AppLoading />;

  const fieldList = fields.map((field) => (
    <Controller
      key={field.name}
      control={control}
      name={field.name}
      render={({ field: { onChange, value, onBlur } }) => (
        <TextInput
          style={styles.input}
          placeholderTextColor={Light.text}
          placeholder={field.placeholder}
          value={value}
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
        />
      )}
    />
  ));

  return (
    <View style={styles.container}>
      {fieldList}
      <View style={styles.separator}></View>
      <Button title="Search my Book" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
