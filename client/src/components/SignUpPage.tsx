import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    userName: z
      .string()
      .min(4, { message: "userName should be at least 4 characters." }),
    password: z
      .string()
      .min(6, { message: "password should be at least 6 characters." }),
    confirmPassword: z.string().min(1, { message: "please confirm password" }),
    email: z.string().email({ message: "Please enter a valid email address." }),
  })
  //重复输入密码校验
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  //提交后逻辑，后续补足
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={!!errors.userName}
        position="relative"
        width={300}
      >
        <FormLabel>UserName</FormLabel>
        <Input {...register("userName")} id="username" type="text"></Input>
        <FormErrorMessage position="absolute" top="100%" left={0}>
          {errors.userName && errors.userName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password} position="relative" mt={10}>
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} id="password" type="password"></Input>
        <FormErrorMessage position="absolute" top="100%" left={0}>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors.confirmPassword}
        position="relative"
        mt={10}
      >
        <FormLabel>Condirm Password</FormLabel>
        <Input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
        />
        <FormErrorMessage position="absolute" top="100%" left={0}>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email} position="relative" mt={10}>
        <FormLabel>Email</FormLabel>
        <Input {...register("email")} id="email" type="email" />
        <FormErrorMessage position="absolute" top="100%" left={0}>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <HStack mt={10} width="100%" justify="center">
        <Button type="submit">Create Account</Button>
      </HStack>
    </form>
  );
};

export default SignUpPage;
