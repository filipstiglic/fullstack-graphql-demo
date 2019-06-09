import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as React from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {withRouter} from "react-router";

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

const DefaultPage: React.FunctionComponent<any> = (props) =>{

    const classes = useStyles();
    const {history } = props;

    const goToSecuredHandler = () => {
        history.push("/secured");
    };

    return (
        <>
            <h2>Default page!</h2>
            <Button variant="contained" color="primary" className={classes.button} onClick={goToSecuredHandler}>
                View secured content!
            </Button>
        </>
    );

};

export default withRouter(DefaultPage);