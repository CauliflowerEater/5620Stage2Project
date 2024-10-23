import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    <form
      onSubmit={handleSubmit((FormData) =>
        onSubmit("login", FormData, setStatus, setMessage, setError)
      )}
    >
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
        <FormErrorMessage position="absolute" top="100%" left="0">
          {error}
        </FormErrorMessage>
      </HStack>
    </form>
  );
};

export default LoginPage;
