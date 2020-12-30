import React from 'react'
import {Link} from ''

export default class MenuLink extends Link{

    render() {
        return (
            <route exact={this.props.xact} path={this.props.path} render={props => (
                <Link className={props.match?'active':''}></Link>
            )}/>
        )
    }
}