import * as React from "react";

/**
 * Render a table.
 * @type {React}
 */
export default class TableNode extends React.Component<any> {
  // propTypes: {
  //   attributes: React.PropTypes.object.isRequired,
  //   children: React.PropTypes.node.isRequired,
  // },

  public render() {
    const { attributes, children } = this.props;

    return (
      <table {...attributes}>
        <tbody>{children}</tbody>
      </table>
    );
  }
}
