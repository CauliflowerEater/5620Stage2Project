//未处理GET,POST操作的status,message,error等信息。
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
  CurrentInform: GoalInform[] | null;
}

export interface GoalInform {
  id: string;
  description: string;
  amount: number;
  date: string;
}
const endpoint = "goals";

const schema = z.object({
  description: z.string().min(1, { message: "Please write some description" }),
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
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data, error, isLoading } = useGet<GoalInform[]>(endpoint);

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
        onSubmit={handleSubmit((FormData) =>
          onSubmit(endpoint, FormData, setStatus, setMessage, setError)
        )}
      >
        <h1>Goal</h1>
        <List mt={10}>
          <FormControl>
            <FormLabel>Current Goal</FormLabel>
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
                <Container
                  border="1px solid"
                  borderColor="whiteAlpha.400"
                  borderRadius="md"
                >
                  {Inform.date}
                </Container>
              </HStack>
            </ListItem>
          ))}
        </List>

        <HStack>
          <FormControl
            mt={5}
            position="relative"
            isInvalid={!!errors.description}
          >
            <FormLabel>Goal Description</FormLabel>
            <Input {...register("description")} id="description" type="text" />
            <FormErrorMessage position="absolute" top="100%" left="0">
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={5} position="relative" isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <Input
              {...register("amount")}
              id="amount"
              type="number"
              defaultValue={0}
            />
            <FormErrorMessage position="absolute" top="100%" left="0">
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Date</FormLabel>
            <Input {...register("date")} id="date" type="date" w={200} />
          </FormControl>
          <FormControl mt={12}>
            <Button type="submit">Submit new inform</Button>
          </FormControl>
        </HStack>
      </form>
    </Box>
  );
};

export default DisplayAndInputGoals;
