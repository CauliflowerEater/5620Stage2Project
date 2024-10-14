import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

import { z } from "zod";
interface Props {
  CurrentInform: FinInform[] | null;
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

const DisplayAndInputField = ({ CurrentInform, InformType }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <Box bg="green.300" w="98%" overflow="hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{InformType}</h1>
        <List>
          {CurrentInform?.map((Inform) => (
            <ListItem paddingY="5px">
              <HStack>
                <p>{Inform.description}</p>
                <p>${Inform.amount}</p>
              </HStack>
            </ListItem>
          ))}
        </List>
        <FormControl mt={5} isInvalid={!!errors.description}>
          <FormLabel>{InformType} Description</FormLabel>
          <Input {...register("description")} id="description" type="text" />
          <FormErrorMessage position="absolute" top="100%" left="0">
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={5} isInvalid={!!errors.amount}>
          <FormLabel>Amount</FormLabel>
          <Input {...register("amount")} id="amount" type="number" />
          <FormErrorMessage position="absolute" top="100%" left="0">
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={10} type="submit">
          Submit new inform
        </Button>
      </form>
    </Box>
  );
};

export default DisplayAndInputField;
