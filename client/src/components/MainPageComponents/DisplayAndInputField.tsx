import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { z } from "zod";
import useGet from "../../hooks/useGet";
import PostSender from "../PostSender";
interface Props {
  endpoint: string;
  InformType: string;
}

export interface FinInform {
  id: string;
  title: string;
  amount: number;
}

const schema = z.object({
  title: z.string().min(1, { message: "Please write some title" }),
  amount: z
    .number()
    .min(0, { message: "The value must be larger or equal to 0." })
    .default(0),
});
type FormData = z.infer<typeof schema>;

const DisplayAndInputField = ({ endpoint, InformType }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //控制刷新控件的useState
  const [refresh, setRefresh] = useState(false);

  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data } = useGet<FinInform[]>(endpoint, undefined, [refresh]);

  //POST
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [err, setError] = useState("");

  //刷新按钮事件
  const refreshButton = () => {
    setRefresh(!refresh);
    setMessage(null);
    console.log(status);
    console.log(err);
  };
  const onSubmit = (Data: FormData) => {
    console.log(Data);
    PostSender(endpoint, Data, setStatus, setMessage, setError);
    reset();
  };
  //这里因为简化省略了对statuscode和error信息的显示.

  return (
    <Box
      w="98%"
      p={6}
      border="2px solid"
      borderColor="whiteAlpha.900"
      borderRadius="md"
      color="whiteAlpha.900"
      bg="gray.800"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack justifyContent="space-between" mb={5}>
          <Text fontSize="2xl" fontWeight="bold" color="whiteAlpha.900">
            {InformType}
          </Text>
          <Button colorScheme="teal" onClick={refreshButton}>
            Refresh
          </Button>
        </HStack>

        <VStack align="start" spacing={6} mb={8}>
          <FormControl>
            <FormLabel fontSize="lg" color="whiteAlpha.800">
              Current {InformType}
            </FormLabel>
            <List spacing={3} w="full">
              {data?.map((Inform, index) => (
                <ListItem key={index} w="full">
                  <HStack spacing={4}>
                    <Container
                      border="1px solid"
                      borderColor="whiteAlpha.400"
                      borderRadius="md"
                      p={2}
                      bg="gray.700"
                      color="whiteAlpha.900"
                      textAlign="center"
                      w="50%"
                    >
                      {Inform.title}
                    </Container>
                    <Container
                      border="1px solid"
                      borderColor="whiteAlpha.400"
                      borderRadius="md"
                      p={2}
                      bg="gray.700"
                      color="whiteAlpha.900"
                      textAlign="center"
                      w="50%"
                    >
                      ${Inform.amount}
                    </Container>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </FormControl>
        </VStack>

        <VStack spacing={4} align="start">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel color="whiteAlpha.800">{InformType} Title</FormLabel>
            <Input {...register("title")} id="title" type="text" width={300} />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.amount}>
            <FormLabel color="whiteAlpha.800">Amount</FormLabel>
            <Input
              {...register("amount", { valueAsNumber: true })}
              id="amount"
              type="number"
              width={300}
              defaultValue={0}
            />
            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" mt={4} alignSelf="flex-end">
            Submit New Inform
          </Button>
        </VStack>

        {message && (
          <Text mt={4} color="red.200" fontSize="sm">
            {message}
          </Text>
        )}
      </form>
    </Box>
  );
};

export default DisplayAndInputField;
