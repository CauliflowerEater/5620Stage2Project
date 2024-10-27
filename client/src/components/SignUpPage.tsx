import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  //提交后逻辑，后续补足
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <Box
      w="100%"
      maxW="400px"
      mx="auto"
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="gray.700"
      color="whiteAlpha.900"
    >
      <Heading size="lg" mb={6} textAlign="center">
        Create Account
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} align="stretch">
          <FormControl isInvalid={!!errors.userName}>
            <FormLabel>UserName</FormLabel>
            <Input {...register("userName")} id="username" type="text" />
            <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input {...register("password")} id="password" type="password" />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} id="email" type="email" />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <HStack width="100%" justify="center">
            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              onClick={() => {
                navigate("/");
              }}
            >
              Create Account
            </Button>
            <Button
              colorScheme="teal"
              w="full"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUpPage;
