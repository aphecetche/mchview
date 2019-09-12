import React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import CurrentElement from "./CurrentElement";

storiesOf("CurrentElement", module)
  .addDecorator(story => <div style={{ padding: "10px" }}>{story()}</div>)
  .add("ds", () => <CurrentElement type="Dual Sampa" id={42} />)
  .add("de", () => <CurrentElement type="DE" id={501} />);
