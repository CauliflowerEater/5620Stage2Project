import { List, ListItem } from "@chakra-ui/react";
import {
  DebtEndPoint,
  IncomeEndPoint,
  PropertyEndPoint,
} from "../services/endpoints";
import DisplayAndInputField from "./DisplayAndInputField";
import DisplayAndInputGoals from "./DisplayAndInputGoals";

const SetInformation = () => {
  return (
    <List>
      <ListItem>
        <DisplayAndInputGoals />
      </ListItem>
      <ListItem mt={5}>
        <DisplayAndInputField
          endpoint={PropertyEndPoint}
          InformType="Property"
        />
      </ListItem>
      <ListItem mt={5}>
        <DisplayAndInputField endpoint={IncomeEndPoint} InformType="Income" />
      </ListItem>
      <ListItem mt={5}>
        <DisplayAndInputField endpoint={DebtEndPoint} InformType="Debt" />
      </ListItem>
    </List>
  );
};

export default SetInformation;
