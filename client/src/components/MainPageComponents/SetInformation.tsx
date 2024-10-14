import { List, ListItem } from "@chakra-ui/react";
import DisplayAndInputField, { FinInform } from "./DisplayAndInputField";
import DisplayAndInputGoals from "./DisplayAndInputGoals";

const SetInformation = () => {
  const testInform: FinInform = {
    id: "1",
    description: "Haircut coupons",
    amount: 1000,
  };

  return (
    <List>
      <ListItem>
        <DisplayAndInputGoals CurrentInform={[testInform]} />
      </ListItem>
      <ListItem mt={5}>
        <DisplayAndInputField
          InformType="Property"
          CurrentInform={[testInform]}
        />
      </ListItem>
      <ListItem mt={5}>
        <DisplayAndInputField
          InformType="Income"
          CurrentInform={[testInform]}
        />
      </ListItem>
      <ListItem mt={5}>
        <DisplayAndInputField InformType="Debt" CurrentInform={[testInform]} />
      </ListItem>
    </List>
  );
};

export default SetInformation;
