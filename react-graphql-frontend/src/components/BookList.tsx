import {useQuery} from "react-apollo-hooks";
import React from "react";
import {GET_BOOKS_QUERY} from "../query/Queries";
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const BookList : React.FC = () => {

    const { data, error, loading } = useQuery(GET_BOOKS_QUERY);

    const classes = useStyles();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error! {error.message}</div>;
    }

    return (
        <Grid container justify = "center">
        <List className={classes.root}>
            {data.books.map((book: { id: string | number | undefined; title: React.ReactNode; }) => (
                <ListItem>
                    <ListItemText key={book.id} primary={book.title}/>
                </ListItem>
                ))}
        </List>
        </Grid>
    );
};

export default BookList;