// tslint:disable:max-classes-per-file

import { List } from "immutable";
import * as React from "react";

import groupChanges from "../diffing/groupChanges";
import TYPES from "../diffing/TYPES";
import Node from "./Node";
import NodeWrapper from "./NodeWrapper";

function classNameForChange(node, change) {
  return `diff-${change.type} diff-${node.kind}-${change.type}`;
}

/**
 * Render a change without changed
 * @type {React}
 */
class IdenticalChange extends React.Component<any> {
  // propTypes: {
  //   change: React.PropTypes.object.isRequired,
  // },

  public render() {
    const { change } = this.props;
    return <Node node={change.original} />;
  }
}

/**
 * Render a change that is being added
 * @type {React}
 */
class AddedRemovedChange extends React.Component<any> {
  // propTypes: {
  //   change: React.PropTypes.object.isRequired,
  // },

  public render() {
    const { change } = this.props;
    const node =
      change.type === TYPES.ADDED ? change.modified : change.original;
    const attributes = {
      className: classNameForChange(node, change),
    };

    return <Node attributes={attributes} node={node} />;
  }
}

/**
 * Render a modification between two nodes.
 * @type {React}
 */
class ModifiedChange extends React.Component<any> {
  // propTypes: {
  //   change: React.PropTypes.object.isRequired,
  // },

  public render() {
    const { change } = this.props;
    const { original, modified } = change;
    const attributes = {
      className: classNameForChange(modified, change),
    };

    return (
      <Changes
        Wrapper={(props) => (
          <NodeWrapper
            node={modified}
            original={original}
            attributes={attributes}
          >
            {props.children}
          </NodeWrapper>
        )}
        changes={change.children}
      />
    );
  }
}

/**
 * Render a change.
 * @type {React}
 */
class Change extends React.Component<any> {
  // propTypes: {
  //   change: React.PropTypes.object.isRequired,
  // },

  public render() {
    const { change } = this.props;

    switch (change.type) {
      case TYPES.IDENTICAL:
        return <IdenticalChange change={change} />;

      case TYPES.MODIFIED:
        return <ModifiedChange change={change} />;

      case TYPES.ADDED:
      case TYPES.REMOVED:
        return <AddedRemovedChange change={change} />;
    }
  }
}

/**
 * Wrap identitcal changes in a toggable div.
 * @type {React}
 */
class ToggableGroup extends React.Component<any, any> {
  // propTypes: {
  //   changes: React.PropTypes.object.isRequired,
  // },

  constructor(props) {
    super(props);

    this.state = { visible: false };

    this.onClick = this.onClick.bind(this);
  }

  public render() {
    const { changes } = this.props;
    const { visible } = this.state;

    if (!visible) {
      return (
        <div className="RichDiff-ToggableGroup" onClick={this.onClick}>
          <i className="octicon octicon-unfold" />
        </div>
      );
    }

    return (
      <Changes
        changes={changes}
        Wrapper={(props) => <div>{props.children}</div>}
      />
    );
  }

  private onClick() {
    this.setState({
      visible: true,
    });
  }
}

/**
 * Render a list of changes.
 * @type {React}
 */
export default class Changes extends React.Component<any> {
  // propTypes: {
  //   changes: React.PropTypes.object.isRequired,
  //   Wrapper: React.PropTypes.func,
  //   minToWrap: React.PropTypes.number,
  // },

  public render() {
    const { Wrapper, changes, minToWrap } = this.props;
    const groups = groupChanges(changes, minToWrap);

    return (
      <Wrapper>
        {groups.map(
          (change, i) =>
            List.isList(change) ? (
              <ToggableGroup key={i} changes={change} />
            ) : (
              <Change key={change.key} change={change} />
            ),
        )}
      </Wrapper>
    );
  }
}
