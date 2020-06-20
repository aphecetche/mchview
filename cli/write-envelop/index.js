import { actions, selectors } from "../../src/ducks/envelop";
import { describe } from "../../src/categories";
import configureStore from "../../src/configureStore";
import * as fs from "fs";
import * as yargs from "yargs";

const store = configureStore();

let id = { deid: yargs.argv.deid };

if (yargs.argv.dsid) {
  id = { ...id, dsid: yargs.argv.dsid };
}
store.subscribe(() => {
  const state = store.getState().envelop;
  if (!selectors.isLoading(state, id)) {
    const json = JSON.stringify(state);
    const filename =
      describe(id)
        .toLowerCase()
        .replace(/ /g, "-") + ".json";
    console.log(filename, json.length);
    fs.writeFileSync(filename, json);
  }
});
const fa = actions.fetch(id);
if (Array.isArray(fa)) {
  fa.map(a => store.dispatch(a));
} else {
  store.dispatch(fa);
}
