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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import PostSender from "./PostSender";

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
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //用useEffect检测更新登录状态
  useEffect(() => {
    if (status != 0) console.log(status);
    if (message) console.log(message);
    if (error) console.log(error);
  }, [status, message, error]);
  //用纯method的交互方案
  const onSubmit = PostSender;
  //用useEffect的交互方案
  // const { status, message, error } = usePost("login", postData, undefined, [
  //   postData,
  // ]);

  // const onSubmit = (data: FormData) => {
  //   console.log(data);
  //   setPostData(data);
  //   if (status === 200) {
  //     console.log("执行页面跳转和主页status变换");
  //     console.log(message);
  //   }
  //   if (!(status === 200) && !(status === 0)) {
  //     console.log("登录失败");
  //     console.log(message);
  //   }
  // };

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
        Sign In
      </Heading>

      <form
        onSubmit={handleSubmit((formData) => {
          onSubmit("login", formData, setStatus, setMessage, setError);
          if (isValid) {
            navigate("/mainpage");
          }
        })}
      >
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

          {error && (
            <FormErrorMessage color="red.300" fontSize="sm" textAlign="center">
              {error}
            </FormErrorMessage>
          )}

          <HStack justifyContent="center" w="full" pt={4}>
            <Button type="submit" colorScheme="teal" w="full">
              Login
            </Button>
            <Button
              colorScheme="teal"
              w="full"
              onClick={() => {
                navigate("/signuppage");
              }}
            >
              SignUp
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
