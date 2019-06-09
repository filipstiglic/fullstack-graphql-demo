import * as React from "react";
import {withRouter} from "react-router";
import BookList from "../../components/BookList";


const SecuredPage: React.FunctionComponent<any> = () =>{

    return (
        <>
            <h2>Secured page with books!</h2>
            <BookList/>
        </>
    );

};

export default withRouter(SecuredPage);