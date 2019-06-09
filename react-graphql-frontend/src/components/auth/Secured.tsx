import * as React from "react";
import {Redirect} from "react-router";
import {useQuery} from "react-apollo-hooks";
import {GET_AUTH_DATA} from "../../query/Queries";

export interface Secured {
    loginPath: string
}

const Secured: React.FC<Secured> = (props) => {

    const {data} = useQuery(GET_AUTH_DATA);

    return (
        <>
            {data.auth.accessToken===null?<Redirect to={props.loginPath}/>:props.children}
            </>
    )
};


export default Secured;