import { List, Record } from "immutable";

import { Raw } from "slate";
import diffNodes from "./diffNodes";

const DEFAULTS = {
  changes: List(),
};

function serializeNode(node) {
  if (node.kind === "range") {
    return Raw.serializeRange(node, { terse: true });
  } else {
    return Raw.serializeNode(node, { terse: true });
  }
}

class State extends Record(DEFAULTS) {
  /**
   * Create a diff state from two document.
   * @param  {Document} original
   * @param  {Document} modified
   * @return {State}
   */
  public static create(original, modified) {
    const changes = diffNodes(original.nodes, modified.nodes);

    return new State({ changes });
  }

  public serializeToJSON() {
    const { changes } = this as any;
    return {
      changes: changes
        .map((child) => child.serializeToJSON(serializeNode))
        .toArray(),
    };
  }
}

export default State;
