import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

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

  //暂时输出提交的结果，后续补充账号验证函数.
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.userName}>
        <FormLabel>UserName</FormLabel>
        <Input {...register("userName")} id="username" type="text" />
        <FormErrorMessage>
          {errors.userName && errors.userName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password} mt={4}>
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} id="password" type="password" />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>

        <Button type="submit" mt={4}>
          Login
        </Button>
      </FormControl>
    </form>
  );
};

export default LoginPage;
