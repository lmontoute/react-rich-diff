import * as React from "react";
import schema from "../schema";

/**
 * Leaf of a document: text range
 * @type {React}
 */
export default class TextRange extends React.Component<any> {
  // propTypes: {
  //   range: React.PropTypes.object.isRequired,
  //   attributes: React.PropTypes.object,
  // },

  public static defaultProps = {
    attributes: {},
  };

  public render() {
    const { range, attributes } = this.props;
    const { marks, text } = range;

    if (marks.isEmpty()) {
      return <span {...attributes}>{range.text}</span>;
    }

    let i = 0;
    return marks.reduce((children, mark) => {
      i++;
      const Wrapper = schema.marks[mark.type];

      if (i === marks.size) {
        return <Wrapper attributes={attributes}>{children}</Wrapper>;
      }

      return <Wrapper>{children}</Wrapper>;
    }, text);
  }
}
