import React from 'react';
import { TreeData } from '../typings/treeData';

interface Props {
    data: TreeData
}

interface State {

}

class Tree extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log();
        
    }

    render() {
        return (
            <div className="tree">
                <div className="tree-nodes">
                    <TreeNode></TreeNode>
                </div>
            </div>
        );
    }
};

export default Tree;