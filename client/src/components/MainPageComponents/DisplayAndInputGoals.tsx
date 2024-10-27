//未处理GET,POST操作的status,message,error等信息。
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
import { GoalEndPoint } from "../services/endpoints";

export interface GoalInform {
  id: string;
  title: string;
  amount: number;
  date: string;
}
const endpoint = GoalEndPoint;

const schema = z.object({
  title: z.string().min(1, { message: "Please write some title" }),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "The value must be larger or equal to 0." })
  ),
  date: z.preprocess(
    (val) => (val ? new Date(val as string) : new Date()),
    z.date()
  ),
});
type FormData = z.infer<typeof schema>;

const DisplayAndInputGoals = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //刷新按钮
  const [refresh, setRefresh] = useState(false);

  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data } = useGet<GoalInform[]>(endpoint, undefined, [refresh]);

  //POST
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [err, setError] = useState("");

  const refreshButton = () => {
    setRefresh(!refresh);
    setMessage(null);
    console.log(status, err);
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
      overflow="hidden"
      p={6}
      border="2px solid"
      borderColor="whiteAlpha.900"
      borderRadius="md"
      color="whiteAlpha.900"
      bg="gray.800"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading as="h2" size="md" color="whiteAlpha.900">
            Goal
          </Heading>
          <Button onClick={refreshButton} colorScheme="teal">
            Refresh
          </Button>
        </HStack>

        <VStack align="start" spacing={6} mb={8}>
          <FormControl>
            <FormLabel fontSize="lg" color="whiteAlpha.800">
              Current Goals
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
                      w="full"
                      textAlign="center"
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
                      w="full"
                      textAlign="center"
                    >
                      ${Inform.amount}
                    </Container>
                    <Container
                      border="1px solid"
                      borderColor="whiteAlpha.400"
                      borderRadius="md"
                      p={2}
                      bg="gray.700"
                      color="whiteAlpha.900"
                      w="full"
                      textAlign="center"
                    >
                      {new Date(Inform.date).toLocaleDateString()}
                    </Container>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </FormControl>
        </VStack>

        <VStack spacing={4} align="start">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel color="whiteAlpha.800">Goal Title</FormLabel>
            <Input {...register("title")} id="title" type="text" />
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
              defaultValue={0}
            />
            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel color="whiteAlpha.800">Date</FormLabel>
            <Input
              {...register("date", { valueAsDate: true })}
              id="date"
              type="date"
              w={200}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" mt={4} alignSelf="flex-end">
            Submit New Goal
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

export default DisplayAndInputGoals;
