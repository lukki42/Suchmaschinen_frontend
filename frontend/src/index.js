import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.ticker = setInterval(()=> this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.ticker);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Aktuelle Uhrzeit: {new Date().toLocaleTimeString()}</h1>
            </div>
        )
    }
}

class MagicButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {render: true};
    }

    deleteMe(){
        this.setState({
            render : false
        })
    }

    render() {
        if (this.state.render) {
            return (
                <tr><td><Clock/><button onClick={(e) => this.deleteMe(e)}>
                    Delete Me
                </button></td></tr>
            )
        }
        else{
            return null;
        }
    }
}

class MagicTable extends React.Component{
    constructor(props) {
        super(props);
    }

    createTable(){
        let table = []
        for(let i = 0; i < 10; i++){
            let children = [];
            table.push(<MagicButton/>);
        }

        return table;
    }

    render(){
        return(
            <table>
                {this.createTable()}
            </table>
        );
    }
}

ReactDOM.render(
  <MagicTable/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
