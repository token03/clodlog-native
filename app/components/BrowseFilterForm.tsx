import {Button, Form, XStack} from "tamagui";
import React from "react";

export const BrowseFilterForm = ({setIsFilterOpen}) => {
  return (
    <Form
      alignItems="center"
      minWidth={"100%"}
      gap="$2"
      onSubmit={() => setIsFilterOpen(false)}
      paddingTop={"$2"}
    >
      <XStack justifyContent={"space-between"} width={"100%"}>
        <Button size={"$3"} chromeless>
          Reset
        </Button>
        <Form.Trigger asChild>
          <Button size={"$3"}>
            Filter
          </Button>
        </Form.Trigger>
      </XStack>
    </Form>
  )
}
