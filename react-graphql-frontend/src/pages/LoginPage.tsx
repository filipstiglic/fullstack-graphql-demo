import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as React from "react";
import {useApolloClient, useQuery} from "react-apollo-hooks";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Redirect, withRouter} from "react-router";
import {GET_AUTH_DATA} from "../query/Queries";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }),
);

const LoginPage: React.FunctionComponent<any> = (props) =>{

    const classes = useStyles();
    const {history } = props;

    //Hook to the state and get auth data
    const {data} = useQuery(GET_AUTH_DATA);

    //Appolo client for updating cache(state)
    const client = useApolloClient();

    //Login handler - sets fake token - REST calls can be used
    const loginHandler = () => {
        client.writeData(
            { data: {
                        auth:{
                            __typename: "auth",
                            accessToken: "FAKE_TOKEN"
                        }
                      }
                    }
                    );
        history.push("/secured");
    };

    if (data.auth.accessToken!=null){
        return <Redirect to='/secured'/>;
    }

    return (
        <Button variant="contained" color="primary" className={classes.button} onClick={loginHandler}>
            Log me in!
        </Button>
    );

};


export default withRouter(LoginPage);