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
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //控制刷新控件的useState
  const [refresh, setRefresh] = useState(false);

  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data, error, isLoading } = useGet<FinInform[]>(endpoint, undefined, [
    refresh,
  ]);

  //POST
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [err, setError] = useState("");

  //刷新按钮事件
  const refreshButton = () => {
    setRefresh(!refresh);
    setMessage(null);
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
      pl={2}
      pb={10}
      border="2px solid"
      borderColor="whiteAlpha.900"
      borderRadius="md"
      color={"whiteAlpha.900"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack justifyContent={"space-between"}>
          <h1>{InformType}</h1>
          <Button mt={5} mr={5} onClick={refreshButton}>
            Refresh
          </Button>
        </HStack>

        <List mt={10}>
          <FormControl>
            <FormLabel>Current {InformType}</FormLabel>
          </FormControl>
          {data?.map((Inform) => (
            <ListItem mt={1}>
              <HStack>
                <Container
                  border="1px solid"
                  borderColor="whiteAlpha.400"
                  borderRadius="md"
                >
                  {Inform.title}
                </Container>
                <Container
                  border="1px solid"
                  borderColor="whiteAlpha.400"
                  borderRadius="md"
                >
                  ${Inform.amount}
                </Container>
              </HStack>
            </ListItem>
          ))}
        </List>
        <HStack>
          <FormControl mt={5} isInvalid={!!errors.title}>
            <FormLabel>{InformType} title</FormLabel>
            <Input {...register("title")} id="title" type="text" width={300} />
            <FormErrorMessage position="absolute" top="100%" left="0">
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={5} isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <Input
              {...register("amount", { valueAsNumber: true })}
              id="amount"
              type="number"
              width={300}
              defaultValue={0}
            />
            <FormErrorMessage position="absolute" top="100%" left="0">
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <Button mt={12} type="submit">
              Submit new inform
            </Button>
          </FormControl>
        </HStack>
        <FormLabel position={"absolute"} color="red.200">
          {message ? message : ""}
        </FormLabel>
      </form>
    </Box>
  );
};

export default DisplayAndInputField;
