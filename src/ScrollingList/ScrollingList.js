import React, { Component } from 'react';

/*
https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
*/
class ScrollingList extends Component {

    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    state = {
        debugMessages: []
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        if (prevProps.list.length < this.props.list.length) {
            const list = this.listRef.current;
            let snapshot = list.scrollHeight - list.scrollTop;
            return snapshot;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        if (snapshot !== null) {
            const list = this.listRef.current;
            if (this.props.adjustScroll) {
                // Adjust scroll
                list.scrollTop = list.scrollHeight - snapshot;
            }

            // debug
            let debugMessages = [...this.state.debugMessages]
            debugMessages.push('componentDidUpdate list.scrollTop = ' + list.scrollTop);
            this.setState({ debugMessages: debugMessages });
        }
    }

    render() {
        let persons = this.props.list.map((person) => {
            return <li className="list-group-item list-group-item-primary" key={person}>{person}</li>
        });

        let debugMessages = this.state.debugMessages.map(
            msg => <li>{msg}</li>
        );

        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="myDiv" ref={this.listRef}>
                        <ul className="list-group">
                            {persons}
                        </ul>
                    </div>
                </div>
                <div className="col-sm-6">
                    <ul>
                        {debugMessages}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ScrollingList;