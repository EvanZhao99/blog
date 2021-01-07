import React from 'react';

interface Props {

}
class Tree extends React.Component {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="tree">tree</div>
        );
    }
};

export default Tree;