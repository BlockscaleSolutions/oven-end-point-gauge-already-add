import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    menu: {
        marginRight: -15
    }
};

export default WrappedComponent => {
    return withStyles(styles)(
        class extends React.Component {
            handleOnClick(action) {
                if (action === "sign-out") {
                    return () => {
                        console.log(this);
                    };
                }
            }

            render() {
                const { classes } = this.props;
                return (
                    <div>
                        <header className={classes.root}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography
                                        variant="title"
                                        color="inherit"
                                        className={classes.flex}
                                    >
                                        USAID DEMO
                                    </Typography>
                                    <IconButton
                                        className={classes.menu}
                                        color="inherit"
                                        aria-label="Menu"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                        </header>

                        <main>
                            <WrappedComponent />
                        </main>
                    </div>
                );
            }
        }
    );
};
