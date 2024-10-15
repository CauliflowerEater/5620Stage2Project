import { List, ListItem } from "@chakra-ui/react";
import DisplayAndInputField, { FinInform } from "./DisplayAndInputField";
import DisplayAndInputGoals, { GoalInform } from "./DisplayAndInputGoals";

const SetInformation = () => {
  const testInform: FinInform = {
    id: "1",
    description: "Haircut coupons",
    amount: 1000,
  };
  const testGoal: GoalInform = {
    id: "1",
    description: "House",
    amount: 2580000,
    date: "2024-11-11",
  };

  return (
    <List>
      <ListItem>
        <DisplayAndInputGoals CurrentInform={[testGoal, testGoal]} />
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
