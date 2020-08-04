import React, {PropsWithChildren} from 'react';
import {connect} from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
interface Params {};
type Props = PropsWithChildren<RouteComponentProps<Params>>;
function Home(props: Props) {
    return (
        <div>Home</div>
    )
}
export default connect()(Home);