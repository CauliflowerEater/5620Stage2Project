//未处理GET,POST操作的status,message,error等信息。
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { z } from "zod";
import PostSender from "../PostSender";
import { ReceiptEndPoint } from "../services/Endpoints";

const endpoint = ReceiptEndPoint;

const schema = z.object({
  receipt: z.string().min(1, { message: "Please choose an image" }),
});
type FormData = z.infer<typeof schema>;

const BookKeeping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  //上传图片时触发事件
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //POST
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [err, setError] = useState("");

  const onSubmit = PostSender;
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
      <form
        onSubmit={handleSubmit(() =>
          onSubmit(
            endpoint,
            { receipt: selectedImage }, //上传的requestbody为64位化的图片
            setStatus,
            setMessage,
            setError
          )
        )}
      >
        <h1>BookKeeping</h1>
        <HStack>
          <FormControl mt={5} position="relative" isInvalid={!!errors.receipt}>
            <FormLabel>Goal Description</FormLabel>
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
        <FormControl mt={5} position="relative">
          {selectedImage && <img src={selectedImage} alt="selected" />}
          <FormErrorMessage>{message}</FormErrorMessage>
        </FormControl>
      </form>
    </Box>
  );
};

export default BookKeeping;
