import * as React from "react";
import NodeWrapper from "./NodeWrapper";
import TextRange from "./TextRange";

/**
 * Render an entire slate node and its children.
 * @type {React}
 */
export default class Node extends React.Component<any> {
  // propTypes: {
  //   node: React.PropTypes.object.isRequired,
  //   attributes: React.PropTypes.object,
  // },

  public static defaultProps = {
    attributes: {},
  };

  public render() {
    const { node, attributes } = this.props;

    if (node.kind === "range") {
      return <TextRange attributes={attributes} range={node} />;
    } else if (node.kind === "text") {
      return (
        <NodeWrapper attributes={attributes} node={node}>
          {node.getRanges().map((c, i) => <Node key={i} node={c} />)}
        </NodeWrapper>
      );
    } else {
      return (
        <NodeWrapper attributes={attributes} node={node}>
          {node.nodes.map((c) => <Node key={c.key} node={c} />)}
        </NodeWrapper>
      );
    }
  }
}
