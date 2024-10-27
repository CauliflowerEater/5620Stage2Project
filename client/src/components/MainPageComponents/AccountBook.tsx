//AccountBook 仅保留的展示功能，没有手动记账的功能。
import {
  Box,
  Container,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";

import useGet from "../../hooks/useGet";
import { TransactionRecordEndPoint } from "../services/endpoints";

export interface TransactionRecord {
  id: string;
  title: string;
  type: string;
  amount: number;
  date: Date;
}
const endpoint = TransactionRecordEndPoint;

const AccountBook = () => {
  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data, error, isLoading } = useGet<TransactionRecord[]>(endpoint);

  //测试数据
  //   const testRecord = {
  //     title: "shit",
  //     type: "food",
  //     amount: 10000,
  //     date: new Date().toString(),
  //   };
  //   const testData = [testRecord, testRecord];

  return (
    <Box
      w="98%"
      overflow="hidden"
      pl={2}
      pb={10}
      borderColor="whiteAlpha.900"
      borderRadius="md"
      color="whiteAlpha.900"
      width="100%"
      bg="gray.800"
      p={5}
    >
      <Heading size="lg" color="whiteAlpha.900" mb={5} textAlign="center">
        AccountBook
      </Heading>

      <List mt={10} spacing={4}>
        {data
          ?.slice()
          .reverse()
          .map((record, index) => (
            <ListItem key={index}>
              <Container
                border="1px solid"
                borderColor="whiteAlpha.400"
                borderRadius="md"
                p={4}
                bg="gray.700"
                color="whiteAlpha.900"
                shadow="md"
                width="100%"
              >
                <VStack align="start" spacing={2}>
                  <Text fontWeight="bold">
                    Title:{" "}
                    <Text as="span" fontWeight="normal">
                      {record.title}
                    </Text>
                  </Text>
                  <HStack justify="space-between" width="100%">
                    <Text>Type: {record.type}</Text>
                    <Text>Amount: ${record.amount}</Text>
                    <Text>Date: {record.date}</Text>
                  </HStack>
                </VStack>
              </Container>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default AccountBook;
