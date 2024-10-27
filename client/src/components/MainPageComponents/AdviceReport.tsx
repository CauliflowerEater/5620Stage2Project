//未处理GET,POST操作的status,message,error等信息。
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import useGet from "../../hooks/useGet";
import GETSender from "../GETSender";
import { AdviceReportEndPoint } from "../services/endpoints";

const endpoint = AdviceReportEndPoint;

interface report {
  date: Date;
  content: string;
}

const AdviceReport = () => {
  //控制刷新控件的useState
  const [refresh, setRefresh] = useState(false);

  const refreshButton = () => {
    console.log(endpoint);
    setRefresh(!refresh);
    setMessage("");
  };

  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data, error, isLoading } = useGet<report[]>(endpoint, undefined, [
    refresh,
  ]);

  //这里因为简化省略了对statuscode和error信息的显示.

  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  return (
    <Box
      w="100%"
      p={5}
      borderColor="whiteAlpha.900"
      borderRadius="md"
      color="whiteAlpha.900"
      minHeight="100vh"
      bg="gray.800"
    >
      <Flex justify="space-between" align="center" mb={5}>
        <Heading size="lg" color="whiteAlpha.900" textAlign="center" w="full">
          Advice Report
        </Heading>
        <Button colorScheme="gray" onClick={refreshButton}>
          Refresh
        </Button>
      </Flex>

      <VStack spacing={6} align="stretch" width="100%">
        <Button
          colorScheme="teal"
          width="100%"
          onClick={() =>
            GETSender(endpoint + "/generate", setStatus, setMessage, setErr)
          }
        >
          Generate an Advice Report
        </Button>

        {isLoading ? (
          <Center>
            <Spinner size="xl" color="teal.500" />
          </Center>
        ) : (
          <List w="100%" spacing={4}>
            {data
              ?.slice()
              .reverse()
              .map((report, index) => (
                <ListItem key={index} w="100%">
                  <Container
                    border="1px solid"
                    borderColor="whiteAlpha.400"
                    borderRadius="md"
                    p={4}
                    bg="gray.700"
                    shadow="md"
                    color="whiteAlpha.900"
                    maxW="none"
                    w="100%"
                  >
                    <Text fontWeight="bold" fontSize="lg">
                      Report - {new Date(report.date).toLocaleDateString()}
                    </Text>
                    <Text whiteSpace="pre-wrap">{report.content}</Text>
                  </Container>
                </ListItem>
              ))}
          </List>
        )}

        {/* 显示状态和错误信息 */}
        {status !== 0 && (
          <Text color="green.300" width="100%">
            Status: {status}
          </Text>
        )}
        {message && (
          <Text color="green.300" width="100%">
            {message}
          </Text>
        )}
        {err && (
          <Text color="red.500" width="100%">
            Error: {err}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default AdviceReport;
