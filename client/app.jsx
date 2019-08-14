class Form extends React.Component {
    constructor(props) {
        super(props);

        this.nextStage = this.nextStage.bind(this);

        this.state = {
            stage: 0,
            id: -1
        };

        this.stages = [
            <CheckOut setId={this.setId.bind(this)} getId={this.getId.bind(this)} nextStage={this.nextStage}/>, 
            <SignUpForm getId={this.getId.bind(this)} nextStage={this.nextStage}/>, 
            <AddressForm getId={this.getId.bind(this)} nextStage={this.nextStage}/>, 
            <PaymentForm getId={this.getId.bind(this)} nextStage={this.nextStage}/>
        ];
    }

    getId() {
        return this.state.id;
    }

    setId(id) {
        this.setState({
            id: id
        });
    }

    nextStage() {
        var newStage = 0;
        if (this.state.stage < 3) {
            newStage = this.state.stage + 1;
        }

        this.setState({
            stage: newStage,
        });
    }

    render() {
        return <div>{this.stages[this.state.stage]}</div>;
    }
};

class CheckOut extends React.Component {

    constructor(props) {
        super(props);
    }

    startCheckout() {
        fetch('/checkout', {
            method: 'get',
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            this.props.setId(data);
            this.props.nextStage();
        });
    }

    render() {
        return <button onClick={() => this.startCheckout()}>Checkout</button>;
    };
}

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    loadData() {
        fetch('/signup', {
            method: 'post',
            body: JSON.stringify(this.state)
        })
        .then(() => {
            this.props.nextStage();
        })
    }

    updateData(e) {
        switch(e.target.name) {
            case 'firstName':
                this.setState({
                    firstName: e.target.value
                });
                break;
            case 'lastName':
                this.setState({
                    lastName: e.target.value
                })
                break;
            case 'email':
                    this.setState({
                        email: e.target.value
                    })
                    break;
            case 'password':
                    this.setState({
                        password: e.target.value
                    })
                    break;
        }
    }
    
    render() {
        return (<div>
            <div>Enter registration info</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>First Name: </td><td><input name="firstName" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Last Name: </td><td><input name="lastName" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Email: </td><td><input name="email" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Password: </td><td><input name="password" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={() => this.loadData()}>Submit</button>
        </div>);
    }
};

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (<div>
            <div>Enter address</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Line 1: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>Line 2: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>City: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>State: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>Zip: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>Phone: </td><td><input type="text"/></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={() => this.props.nextStage()}>Submit</button>
        </div>);
    }
};

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (<div>
            <div>Enter payment info</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Credit Card Number: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>Expiration: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>CVV: </td><td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td>Billing Zip Code: </td><td><input type="text"/></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={() => this.props.nextStage()}>Submit</button>
        </div>);
    }
}



ReactDOM.render(<Form />, document.getElementById('app'));