import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Axios from "axios";
import reportWebVitals from './reportWebVitals';

const apiurl = "http://ec2-35-171-147-180.compute-1.amazonaws.com/api"

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

class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalReactPackages: null
        };
    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('http://ec2-35-171-147-180.compute-1.amazonaws.com/api/helloWorld', {
            mode: "cors",
            method: "GET",
            headers: {
                "loo": "loo"
            },
        })
          .then(response => response.json())
          .then((data) => console.log('This is your data: ', data));
    }

    render() {
        //const { totalReactPackages } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Simple GET Request</h5>
                <div className="card-body">
                </div>
            </div>
        );
    }
}

class POSTRequest extends React.Component{
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        const response = await fetch(apiurl + "/helloWorld", requestOptions);
        const data = await response.json();
        this.setState({ postId: data.id });
    }

    render() {
        return (
            <div/>
            );
    }
}

class Filter extends React.Component{
    constructor(props) {
        super(props);
    }

    mydata;

    myFetch = () => {
        /*
        fetch('http://127.0.0.1:8000/api/app/document/filters', {
            mode: "cors",
            method: "GET",
            headers: {
                "loo": "loo",
                "filter": this.filterBy
            },
        })
            .then(response => {
                console.log(response)
            });
            //.then((data) => console.log('This is your data: ', data));*/

            /*
            ("http://127.0.0.1:8000/api/app/document/filters").then(
                (response) => {
                    console.log(response);
                }
            );*/

            Axios.get("http://127.0.0.1:8000/api/app/document/filters").then(
                (response) => {
                    //console.log(response);
                    this.mydata = response.data;
                }
            );


    }

    componentDidMount() {
        this.myFetch();
        console.log(this.mydata);
    }

    render() {
        return(
            <div>
                LOO
            </div>
        );
    }
}

class SearchApp extends React.Component{
    constructor(props) {
        super(props);

        this.state = {value: ''}

        this.handleChange = this.handleChange.bind(this);
    }

    textInput = "";
    filterBy = "";

    handleChange(event){
        this.setState({value: event.target.value});
        this.textInput = event.target.value;
    }

    getSearchedItems(textBox){

        fetch('http://127.0.0.1:8000/api/app/documents/search/' + this.textInput, {
            mode: "cors",
            method: "GET",
            headers: {
                "loo": "loo",
                "filter": this.filterBy
            },
        })
            .then(response => response.json())
            .then((data) => console.log('This is your data: ', data));
    }

    render(){
        return(
            <div id="test12">
                <h1>Welcome to the Games search app</h1>

                <input name="textBox" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search" />

                <button onClick={(e) => this.getSearchedItems(e)}>Search</button>

                <GetIndexButton/>

                  <Filter/>
            </div>
        );
    }
}

class GetIndexButton extends React.Component{
    constructor(props) {
        super(props);
    }

    getIndex(){
        fetch('http://127.0.0.1:8000/api/app/index', {
            mode: "cors",
            method: "GET",
            headers: {
                "loo": "loo"
            },
        })
            .then(response => response.json())
            .then((data) => console.log('This is your data: ', data));
    }

    render(){
        return(
            <button onClick={(e) => this.getIndex(e)}>
                Get Index
            </button>
        );
    }
}

//export { GetRequest };

ReactDOM.render(
    <SearchApp/>,
    document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
