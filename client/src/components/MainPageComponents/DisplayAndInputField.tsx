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
  description: string;
  amount: number;
}

const schema = z.object({
  description: z.string().min(1, { message: "Please write some description" }),
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
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data, error, isLoading } = useGet<FinInform[]>(endpoint);

  //POST
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [err, setError] = useState("");

  const onSubmit = PostSender;
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
      <form
        onSubmit={handleSubmit((FromData) =>
          onSubmit(endpoint, FromData, setStatus, setMessage, setError)
        )}
      >
        <h1>{InformType}</h1>
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
                  {Inform.description}
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
          <FormControl mt={5} isInvalid={!!errors.description}>
            <FormLabel>{InformType} Description</FormLabel>
            <Input
              {...register("description")}
              id="description"
              type="text"
              width={300}
            />
            <FormErrorMessage position="absolute" top="100%" left="0">
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={5} isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <Input
              {...register("amount")}
              id="amount"
              type="number"
              width={300}
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
      </form>
    </Box>
  );
};

export default DisplayAndInputField;
