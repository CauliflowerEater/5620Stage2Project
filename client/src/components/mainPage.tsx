import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import Logo from "./Logo";
import AccountBook from "./MainPageComponents/AccountBook";
import AdviceReport from "./MainPageComponents/AdviceReport";
import BookKeeping from "./MainPageComponents/BookKeeping";
import ConditionReport from "./MainPageComponents/ConditionReport";
import NavBar from "./MainPageComponents/NavBar";
import SetInformation from "./MainPageComponents/SetInformation";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState("SetInformation");

  let mainContent;
  if (currentPage === "SetInformation") {
    mainContent = <SetInformation />;
  } else if (currentPage === "AccountBook") {
    mainContent = <AccountBook />;
  } else if (currentPage === "BookKeeping") {
    mainContent = <BookKeeping />;
  } else if (currentPage === "ConditionReport") {
    mainContent = <ConditionReport />;
  } else if (currentPage === "AdviceReport") {
    mainContent = <AdviceReport />;
  }

  return (
    <Grid
      templateAreas={`"header header""nav main"`}
      gridTemplateRows={"50px 1fr"}
      gridTemplateColumns={"200px 1fr"}
      gap={1}
      w="100vw"
      color="blackAlpha.700"
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        <Logo />
      </GridItem>
      <GridItem pl="2" bg="gray.800" area={"nav"}>
        <NavBar
          onSelectedPage={(buttonId) => setCurrentPage(buttonId)}
          selectedPage={currentPage}
        />
      </GridItem>
      <GridItem area={"main"} maxWidth="100%">
        {mainContent}
      </GridItem>
    </Grid>
  );
};

export default MainPage;
