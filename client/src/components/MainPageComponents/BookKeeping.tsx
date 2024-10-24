//未处理GET,POST操作的status,message,error等信息。
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { z } from "zod";
import FileCompresser from "../../toals/FileCompresser";
import PostSender from "../PostSender";
import { ReceiptEndPoint } from "../services/endpoints";

const endpoint = ReceiptEndPoint;

const schema = z.object({
  receipt: z.any().refine((file) => 1 === 1, {
    message: "Please upload a valid file",
  }),
});
type FormData = z.infer<typeof schema>;

const BookKeeping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);

  //Genrate的时候将图片转为strng64
  const String64Transformer = (image: File | null) => {
    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCompressedImage(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  };

  String64Transformer(
    FileCompresser(selectedImage, [selectedImage]).compression
  );

  //上传图片时触发事件
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  //POST
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [err, setError] = useState("");

  const onSubmit = (Data: FormData) => {
    console.log(Data);
    console.log({ receipt: selectedImage });

    const formData = new FormData();
    if (selectedImage) formData.append("receipt", selectedImage);

    PostSender(
      endpoint,
      formData, //上传的requestbody为{receipt:image}
      setStatus,
      setMessage,
      setError
    );
  };
  //这里因为简化省略了对statuscode和error信息的显示.

  return (
    <Box
      w="98%"
      overflow="hidden"
      pl={2}
      pb={10}
      height="100vh"
      borderColor="whiteAlpha.900"
      borderRadius="md"
      color={"whiteAlpha.900"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>BookKeeping</h1>
        <HStack>
          <FormControl mt={5} position="relative" isInvalid={!!errors.receipt}>
            <Input
              {...register("receipt")}
              id="receipt"
              type="file"
              accept="image/"
              onChange={handleImageChange}
            />
            <FormErrorMessage position="absolute" top="100%" left="0">
              {errors.receipt && errors.receipt.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={12}>
            <Button type="submit">Generate Records!</Button>
          </FormControl>
        </HStack>
        <FormControl mt={5} position="relative" marginTop={10}>
          {compressedImage && (
            <img
              src={compressedImage}
              alt="selected"
              width={300}
              height={300}
            />
          )}
          <FormErrorMessage>{message}</FormErrorMessage>
        </FormControl>
      </form>
    </Box>
  );
};

export default BookKeeping;
