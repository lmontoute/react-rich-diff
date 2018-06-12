import * as React from "react";
import State from "../diffing/State";
import Changes from "./Changes";

/**
 * Render an entire diff from a state.
 * @type {React}
 */
export default class RichDiff extends React.Component<any> {
  // propTypes: {
  //   className: React.PropTypes.string,
  //   state: React.PropTypes.object.isRequired,
  //   minToWrap: React.PropTypes.number,
  // },

  public static State = State;

  public static defaultProps = {
    className: "",
    minToWrap: 3,
  };

  public render() {
    const { state, className, minToWrap } = this.props;

    return (
      <Changes
        Wrapper={(props) => (
          <div className={"RichDiff " + className}>{props.children}</div>
        )}
        changes={state.changes}
        minToWrap={minToWrap}
      />
    );
  }
}
