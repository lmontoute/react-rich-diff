import * as React from "react";
import schema from "../schema";

/**
 * Rendering for a slate node. It doesn't consider children.
 *
 * @type {React}
 */
export default class NodeWrapper extends React.Component<any> {
  // propTypes: {
  //   node: React.PropTypes.object.isRequired,
  //   attributes: React.PropTypes.object.isRequired,
  //   original: React.PropTypes.object,
  //   children: React.PropTypes.node,
  // },

  public render() {
    const { node, attributes, original, children } = this.props;

    const Renderer =
      schema.nodes[node.type] ||
      (node.kind === "block" ? schema.defaultBlock : schema.defaultInline);

    return (
      <Renderer node={node} attributes={attributes} original={original}>
        {children}
      </Renderer>
    );
  }
}
