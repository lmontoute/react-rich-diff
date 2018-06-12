import * as classNames from "classnames";
import * as React from "react";
import diffToTitle from "./diffToTitle";

const CRITERIAS = [
  {
    label: "Link",
    value: (node) => node.data.get("href"),
  },
  {
    label: "Title",
    value: (node) => node.data.get("title"),
  },
];

/**
 * Render a link with a tooltip to signal the change.
 * @type {React}
 */
export default class LinkNode extends React.Component<any> {
  // propTypes: {
  //   attributes: React.PropTypes.object.isRequired,
  //   node: React.PropTypes.object.isRequired,
  //   original: React.PropTypes.object,
  //   children: React.PropTypes.node,
  // },

  public render() {
    const { children, attributes, node, original } = this.props;

    const title = diffToTitle(original, node, CRITERIAS);

    return (
      <a
        {...attributes}
        className={classNames(attributes.className, {
          tooltipped: !!title,
        })}
        href={node.data.get("href")}
        aria-label={title}
      >
        {children}
      </a>
    );
  }
}
