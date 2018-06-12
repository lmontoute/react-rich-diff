import * as React from "react";

/**
 * Render an image node.
 * @type {React}
 */
export default class ImageNode extends React.Component<any> {
  // propTypes: {
  //   attributes: React.PropTypes.object.isRequired,
  //   node: React.PropTypes.object.isRequired,
  // },

  public render() {
    const { attributes, node } = this.props;

    return <img {...attributes} src={node.data.get("src")} />;
  }
}
