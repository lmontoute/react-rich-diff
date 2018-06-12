import { List, Record } from "immutable";

import TYPES from "./TYPES";

let KEY = 0;

const DEFAULTS = {
  key: String(),
  type: String(TYPES.IDENTICAL),
  // Matching score (0 for ADDED/REMOVED, 1 for IDENTICAL, 0 - 1 for MODIFIED)
  score: Number(0),
  original: null,
  modified: null,
  children: null,
};

class Change extends Record(DEFAULTS) {
  public static create(props) {
    return new Change({
      key: `c${KEY++}`,
      ...props,
    });
  }

  public static createIdentity(value) {
    return Change.create({
      type: TYPES.IDENTICAL,
      score: 1,
      original: value,
      modified: value,
    });
  }

  public static createAddition(modified) {
    return Change.create({
      type: TYPES.ADDED,
      score: 0,
      modified,
    });
  }

  public static createRemoval(original) {
    return Change.create({
      type: TYPES.REMOVED,
      score: 0,
      original,
    });
  }

  public static createUpdate(original, modified, score, children) {
    return Change.create({
      type: TYPES.MODIFIED,
      original,
      modified,
      score,
      children: List(children),
    });
  }

  /**
   * Calcul score for a list of changes.
   * @param  {List<Change>} changes
   * @return {Number} score
   */
  public static getScore(changes) {
    if (changes.size === 0) {
      return 1;
    }

    const count = changes.reduce((accu, change) => accu + change.score, 0);

    return count / changes.size;
  }

  private type: any;
  private original: any;
  private modified: any;
  private children: any;

  public serializeToJSON(serializeNode) {
    const { type, original, modified, children } = this;

    switch (type) {
      case TYPES.REMOVED:
      case TYPES.IDENTICAL:
        return {
          type,
          original: serializeNode(original),
        };
      case TYPES.ADDED:
        return {
          type,
          modified: serializeNode(modified),
        };
      case TYPES.MODIFIED:
        return {
          type,
          // score,
          original: serializeNode(original),
          modified: serializeNode(modified),
          children: children
            .map((child) => child.serializeToJSON(serializeNode))
            .toArray(),
        };
    }
  }
}

export default Change;
export { TYPES };
