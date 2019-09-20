import React from "react";
import { storiesOf } from "@storybook/react";
import OutlineSelectorButton from "./OutlineSelectorButton";

storiesOf("OutlineSelectorButton", module)
  .addDecorator(story => <div style={{ padding: "10px" }}>{story()}</div>)
  .add("unselected, data unavail", () => (
    <OutlineSelectorButton
      label="An unchecked button"
      value={false}
      onClick={() => {}}
    />
  ))
  .add("unselected, data avail", () => (
    <OutlineSelectorButton
      label="A checked button"
      value={false}
      onClick={() => {}}
      avail={true}
    />
  ))
  .add("selected, data avail", () => (
    <OutlineSelectorButton
      label="A checked button"
      value={true}
      onClick={() => {}}
      avail={true}
    />
  ))
  .add("selected, data unavail (=invalid state)", () => (
    <OutlineSelectorButton
      label="A checked button"
      value={true}
      onClick={() => {}}
      avail={false}
    />
  ));
