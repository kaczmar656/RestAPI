import React from 'react';


class App extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            items: [],
            isLoaded: false
        }
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true,
                })
            }).catch((err) => {
                console.log(err);
            });

    }
    sortBy(event, sortKey) {
        const items = this.state.items;
        items.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({ items })
    }

    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            <div className="App">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            
                            <th><button onClick={e => this.sortBy(e, 'name')}>Name</button></th>
                            <th><button onClick={e => this.sortBy(e, 'username')}>Username</button></th>
                            <th><button onClick={e => this.sortBy(e, 'email')}>Email</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td> {item.id} </td>
                                <td> {item.name} </td>
                                <td> {item.username} </td>
                                <td> {item.email} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

    }

}

export default App;