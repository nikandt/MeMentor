import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from '@material-ui/icons/Restore';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            page: "index"
        };
    }

    renderPage() {
        if (this.state.page === 'index') {
            return (
                <Button onClick={() => this.setState({ page: "otherpage" })}>
                    Go to other page
                </Button>
            );
        } else {
            return (
                <Button onClick={() => this.setState({ page: "index" })}>
                    Back to index
                </Button>
            );
        }
    }

    render() {
        return <div>
            { this.renderPage() }
            <BottomNavigation>
                <BottomNavigationAction label="aaaa" icon={<RestoreIcon />}/>
                <BottomNavigationAction label="bbbb" icon={<RestoreIcon />}/>
            </BottomNavigation>
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));
