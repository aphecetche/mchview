import React from "react";
import OutlineSelectorButton from "./OutlineSelectorButton";

export default {
  component: OutlineSelectorButton,
  title: "Outline/SelectorButton",
  decorators: [storyFn => <div style={{ padding: "10px" }}>{storyFn()}</div>]
};

export const UnselectedDataUnvail = () => (
  <OutlineSelectorButton
    label="An unchecked button"
    value={false}
    onClick={() => {}}
  />
);

export const UnselectedDataAvail = () => (
  <OutlineSelectorButton
    label="A checked button"
    value={false}
    onClick={() => {}}
    avail={true}
  />
);

export const SelectedDataAvail = () => (
  <OutlineSelectorButton
    label="A checked button"
    value={true}
    onClick={() => {}}
    avail={true}
  />
);

export const SelectedDataUnvail = () => (
  <OutlineSelectorButton
    label="A checked button"
    value={true}
    onClick={() => {}}
    avail={false}
  />
);
