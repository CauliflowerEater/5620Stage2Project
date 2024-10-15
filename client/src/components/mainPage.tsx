import { Grid, GridItem } from "@chakra-ui/react";
import Logo from "./Logo";
import NavBar from "./MainPageComponents/NavBar";
import SetInformation from "./MainPageComponents/SetInformation";

const MainPage = () => {
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
      <GridItem pl="2" bg="pink.400" area={"nav"}>
        <NavBar
          onSelectedPage={(buttonId) => console.log(buttonId)}
          selectedPage={null}
        />
      </GridItem>
      <GridItem area={"main"} maxWidth="100%">
        <SetInformation />
      </GridItem>
    </Grid>
  );
};

export default MainPage;
