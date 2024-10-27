import { Box, Button, List, ListItem } from "@chakra-ui/react";

interface Props {
  onSelectedPage: (page: string) => void;
  selectedPage: string | null;
}

const NavBar = ({ selectedPage, onSelectedPage }: Props) => {
  return (
    <Box minHeight="90vh">
      <List>
        {[
          "SetInformation",
          "BookKeeping",
          "AccountBook",
          "ConditionReport",
          "AdviceReport",
        ].map((buttonId) => (
          <ListItem paddingY="5px">
            <Button
              key={buttonId}
              fontWeight={buttonId === selectedPage ? "bold" : "normal"}
              bg={buttonId === selectedPage ? "whiteAlpha.900" : "yellow.900"}
              onClick={() => onSelectedPage(buttonId)}
              fontSize="lg"
              width="90%"
            >
              {buttonId}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavBar;
