//未处理GET,POST操作的status,message,error等信息。
import { Box, Button, Container, List, ListItem } from "@chakra-ui/react";

import { useState } from "react";
import useGet from "../../hooks/useGet";
import GETSender from "../GETSender";
import PostSender from "../PostSender";
import { AdviceReportEndPoint } from "../services/Endpoints";

const endpoint = AdviceReportEndPoint;

interface report {
  date: Date;
  content: string;
}

const AdviceReport = () => {
  //这里是获取目标的endpoint,同时注意在这里更新useEffect的重加载依赖。
  const { data, error, isLoading } = useGet<report[]>(endpoint);

  const onSubmit = PostSender;
  //这里因为简化省略了对statuscode和error信息的显示.

  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

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
      <h1>Advice Report</h1>
      <Button
        mt={10}
        onClick={() => GETSender(endpoint, setStatus, setMessage, setErr)} //通过GETSender 发送get请求.
      >
        Generate ad advice report.
      </Button>
      <List mt={10}>
        {data?.map((data) => (
          <ListItem mt={1}>
            <Container
              border="1px solid"
              borderColor="whiteAlpha.400"
              borderRadius="md"
            >
              <h1>Report-{data.date.toString()}</h1>
              {data.content}
            </Container>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdviceReport;
