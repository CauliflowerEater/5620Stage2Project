import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePost from "../hooks/UsePost";

const schema = z.object({
  userName: z
    .string()
    .min(4, { message: "userName should be at least 4 characters" }),
  password: z.string().min(1, { message: "Please input the password" }),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [postData, setPostData] = useState<FormData | null>(null);
  //记得后续补上后端api。

  const { data, error, isLoading } = usePost("后端endpoint", postData);

  const onSubmit = (data: FormData) => {
    setPostData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.userName} position="relative">
        <FormLabel>UserName</FormLabel>
        <Input {...register("userName")} id="username" type="text" />
        <FormErrorMessage position="absolute" top="100%" left="0">
          {errors.userName && errors.userName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors.password}
        mt={10}
        position="relative"
        width={300}
      >
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} id="password" type="password" />
        <FormErrorMessage position="absolute" top="100%" left="0">
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <HStack mt={10} spacing={135}>
        <Button type="submit">Login</Button>
        <Button>Sign Up</Button>
      </HStack>
    </form>
  );
};

export default LoginPage;
