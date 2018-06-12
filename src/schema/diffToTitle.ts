const NONE = "<None>";

/**
 * Compare two nodes according to some criterias and return a tooltip message.
 */
export default function diffToTitle(
  original: Node,
  node: Node,
  criterias: any[],
): string {
  return criterias.reduce((title, criteria) => {
    const originalValue = original ? criteria.value(original) : null;
    const modifiedValue = criteria.value(node);

    if (
      originalValue === modifiedValue ||
      (criteria.ignoreUnset && !original)
    ) {
      return title;
    }

    title = title ? `${title}, ` : "";

    if (originalValue) {
      title += `${criteria.label}: ${originalValue ||
        NONE} => ${modifiedValue || NONE}`;
    } else {
      title += `${criteria.label}: ${modifiedValue}`;
    }

    return title;
  }, "");
}
