import React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import { PureCurrentElement } from "./CurrentElement";

storiesOf("CurrentElement", module)
  .addDecorator(story => <div style={{ padding: "10px" }}>{story()}</div>)
  .add("ds", () => <PureCurrentElement type="Dual Sampa" id={42} />)
  .add("de", () => <PureCurrentElement type="DE" id={501} />)
  .add("de (with data)", () => (
    <PureCurrentElement type="DE" id={501} value={1234.42} />
  ))
  .add("nothing", () => <PureCurrentElement />);
