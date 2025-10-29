// app/(tabs)/(contacts)/edit.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import * as yup from "yup";
import ContactForm from "../../../components/ContactForm";
import { useContactData } from "../../../hooks/useContactData";
import { ContactFormData, ContactTag } from "../../../types";

const phoneRegExp = /^(0|\+84)[3|5|7|8|9|1[2|6|8|9]]+([0-9]{8})$/;
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  phone: yup
    .string()
    .required("SĐT là bắt buộc")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
  tag: yup.string().oneOf(Object.values(ContactTag)).required(),
});

export default function EditContactScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, updateContact } = useContactData();
  const [loading, setLoading] = React.useState(true);
  const [contactToEdit, setContactToEdit] = React.useState<{
    name: string;
    phone: string;
    tag: ContactTag;
  } | null>(null);

  React.useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const data = await getById(id);
        setContactToEdit({ name: data.name, phone: data.phone, tag: data.tag });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: contactToEdit?.name || "",
      phone: contactToEdit?.phone || "",
      tag: contactToEdit?.tag || ContactTag.Friend,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!id) return;
    await updateContact(id, data);
    router.back();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ContactForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isEdit
    />
  );
}
