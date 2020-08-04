import React, {PropsWithChildren} from 'react';
import {connect} from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
interface Params {};
type Props = PropsWithChildren<RouteComponentProps<Params>>;
function Profile(props: Props) {
    return (
        <div>Profile</div>
    )
}
export default connect()(Profile);