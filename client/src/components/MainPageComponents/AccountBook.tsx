//AccountBook 仅保留的展示功能，没有手动记账的功能。
import { Box, Container, HStack, List, ListItem } from "@chakra-ui/react";

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
      color={"whiteAlpha.900"}
      height="100vh"
    >
      <h1>AccountBook</h1>
      <List mt={10}>
        {data?.map((record) => (
          <ListItem mt={1}>
            <HStack>
              <Container
                border="1px solid"
                borderColor="whiteAlpha.400"
                borderRadius="md"
              >
                {record.title}
              </Container>
              <Container
                border="1px solid"
                borderColor="whiteAlpha.400"
                borderRadius="md"
              >
                ${record.type}
              </Container>
              <Container
                border="1px solid"
                borderColor="whiteAlpha.400"
                borderRadius="md"
              >
                {record.amount}
              </Container>
              <Container
                border="1px solid"
                borderColor="whiteAlpha.400"
                borderRadius="md"
              >
                {record.date}
              </Container>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AccountBook;
