'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.nextStage = _this.nextStage.bind(_this);

        _this.state = {
            stage: 0,
            id: -1
        };

        _this.stages = [React.createElement(CheckOut, { setId: _this.setId.bind(_this), getId: _this.getId.bind(_this), nextStage: _this.nextStage }), React.createElement(SignUpForm, { getId: _this.getId.bind(_this), nextStage: _this.nextStage }), React.createElement(AddressForm, { getId: _this.getId.bind(_this), nextStage: _this.nextStage }), React.createElement(PaymentForm, { getId: _this.getId.bind(_this), nextStage: _this.nextStage }), React.createElement(Results, { getId: _this.getId.bind(_this), nextStage: _this.nextStage })];
        return _this;
    }

    _createClass(Form, [{
        key: 'getId',
        value: function getId() {
            return this.state.id;
        }
    }, {
        key: 'setId',
        value: function setId(id) {
            this.setState({
                id: id
            });
        }
    }, {
        key: 'nextStage',
        value: function nextStage() {
            var newStage = 0;
            if (this.state.stage < this.stages.length - 1) {
                newStage = this.state.stage + 1;
            }

            this.setState({
                stage: newStage
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.stages[this.state.stage]
            );
        }
    }]);

    return Form;
}(React.Component);

;

var CheckOut = function (_React$Component2) {
    _inherits(CheckOut, _React$Component2);

    function CheckOut(props) {
        _classCallCheck(this, CheckOut);

        return _possibleConstructorReturn(this, (CheckOut.__proto__ || Object.getPrototypeOf(CheckOut)).call(this, props));
    }

    _createClass(CheckOut, [{
        key: 'startCheckout',
        value: function startCheckout() {
            var _this3 = this;

            fetch('/checkout', {
                method: 'get'
            }).then(function (res) {
                return res.text();
            }).then(function (data) {
                _this3.props.setId(data);
                _this3.props.nextStage();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'button',
                { onClick: function onClick() {
                        return _this4.startCheckout();
                    } },
                'Checkout'
            );
        }
    }]);

    return CheckOut;
}(React.Component);

var SignUpForm = function (_React$Component3) {
    _inherits(SignUpForm, _React$Component3);

    function SignUpForm(props) {
        _classCallCheck(this, SignUpForm);

        var _this5 = _possibleConstructorReturn(this, (SignUpForm.__proto__ || Object.getPrototypeOf(SignUpForm)).call(this, props));

        _this5.state = {
            checkoutId: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
        return _this5;
    }

    _createClass(SignUpForm, [{
        key: 'loadData',
        value: function loadData() {
            var _this6 = this;

            fetch('/person', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(function () {
                _this6.props.nextStage();
            });
        }
    }, {
        key: 'updateData',
        value: function updateData(e) {
            switch (e.target.name) {
                case 'firstName':
                    this.setState({
                        firstName: e.target.value
                    });
                    break;
                case 'lastName':
                    this.setState({
                        lastName: e.target.value
                    });
                    break;
                case 'email':
                    this.setState({
                        email: e.target.value
                    });
                    break;
                case 'password':
                    this.setState({
                        password: e.target.value
                    });
                    break;
            }

            this.setState({
                checkoutId: this.props.getId()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    'Enter registration info'
                ),
                React.createElement('br', null),
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'First Name: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'firstName', onChange: function onChange(e) {
                                        return _this7.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Last Name: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'lastName', onChange: function onChange(e) {
                                        return _this7.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Email: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'email', onChange: function onChange(e) {
                                        return _this7.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Password: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'password', onChange: function onChange(e) {
                                        return _this7.updateData(e);
                                    }, type: 'text' })
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this7.loadData();
                        } },
                    'Submit'
                )
            );
        }
    }]);

    return SignUpForm;
}(React.Component);

;

var AddressForm = function (_React$Component4) {
    _inherits(AddressForm, _React$Component4);

    function AddressForm(props) {
        _classCallCheck(this, AddressForm);

        var _this8 = _possibleConstructorReturn(this, (AddressForm.__proto__ || Object.getPrototypeOf(AddressForm)).call(this, props));

        _this8.state = {
            checkoutId: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: ''
        };
        return _this8;
    }

    _createClass(AddressForm, [{
        key: 'loadData',
        value: function loadData() {
            var _this9 = this;

            fetch('/address', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(function () {
                _this9.props.nextStage();
            });
        }
    }, {
        key: 'updateData',
        value: function updateData(e) {
            switch (e.target.name) {
                case 'line1':
                    this.setState({
                        line1: e.target.value
                    });
                    break;
                case 'line2':
                    this.setState({
                        line2: e.target.value
                    });
                    break;
                case 'city':
                    this.setState({
                        city: e.target.value
                    });
                    break;
                case 'state':
                    this.setState({
                        state: e.target.value
                    });
                    break;
                case 'zip':
                    this.setState({
                        zip: e.target.value
                    });
                    break;
            }

            this.setState({
                checkoutId: this.props.getId()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this10 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    'Enter address'
                ),
                React.createElement('br', null),
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Line 1: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'line1', onChange: function onChange(e) {
                                        return _this10.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Line 2: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'line2', onChange: function onChange(e) {
                                        return _this10.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'City: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'city', onChange: function onChange(e) {
                                        return _this10.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'State: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'state', onChange: function onChange(e) {
                                        return _this10.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Zip: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'zip', onChange: function onChange(e) {
                                        return _this10.updateData(e);
                                    }, type: 'text' })
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this10.loadData();
                        } },
                    'Submit'
                )
            );
        }
    }]);

    return AddressForm;
}(React.Component);

;

var PaymentForm = function (_React$Component5) {
    _inherits(PaymentForm, _React$Component5);

    function PaymentForm(props) {
        _classCallCheck(this, PaymentForm);

        var _this11 = _possibleConstructorReturn(this, (PaymentForm.__proto__ || Object.getPrototypeOf(PaymentForm)).call(this, props));

        _this11.state = {
            checkoutId: '',
            creditCardNumber: '',
            expiration: '',
            cvv: '',
            zip: ''
        };
        return _this11;
    }

    _createClass(PaymentForm, [{
        key: 'loadData',
        value: function loadData() {
            var _this12 = this;

            fetch('/payment', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(function () {
                _this12.props.nextStage();
            });
        }
    }, {
        key: 'updateData',
        value: function updateData(e) {
            switch (e.target.name) {
                case 'creditCardNumber':
                    this.setState({
                        creditCardNumber: e.target.value
                    });
                    break;
                case 'expiration':
                    this.setState({
                        expiration: e.target.value
                    });
                    break;
                case 'cvv':
                    this.setState({
                        cvv: e.target.value
                    });
                    break;
                case 'zip':
                    this.setState({
                        zip: e.target.value
                    });
                    break;
            }

            this.setState({
                checkoutId: this.props.getId()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this13 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    'Enter payment info'
                ),
                React.createElement('br', null),
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Credit Card Number: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'creditCardNumber', onChange: function onChange(e) {
                                        return _this13.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Expiration: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'expiration', onChange: function onChange(e) {
                                        return _this13.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'CVV: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'cvv', onChange: function onChange(e) {
                                        return _this13.updateData(e);
                                    }, type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Billing Zip Code: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { name: 'zip', onChange: function onChange(e) {
                                        return _this13.updateData(e);
                                    }, type: 'text' })
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this13.loadData();
                        } },
                    'Submit'
                )
            );
        }
    }]);

    return PaymentForm;
}(React.Component);

var Results = function (_React$Component6) {
    _inherits(Results, _React$Component6);

    function Results(props) {
        _classCallCheck(this, Results);

        var _this14 = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

        _this14.state = {
            results: '',
            id: ''
        };
        return _this14;
    }

    _createClass(Results, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this15 = this;

            fetch('/results', {
                headers: {
                    id: this.props.getId()
                }
            }).then(function (data) {
                return data.text();
            }).then(function (data) {
                _this15.setState({
                    results: data
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this16 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    this.state.results
                ),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this16.props.nextStage();
                        } },
                    'Submit'
                )
            );
        }
    }]);

    return Results;
}(React.Component);

ReactDOM.render(React.createElement(Form, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkZvcm0iLCJwcm9wcyIsIm5leHRTdGFnZSIsImJpbmQiLCJzdGF0ZSIsInN0YWdlIiwiaWQiLCJzdGFnZXMiLCJzZXRJZCIsImdldElkIiwic2V0U3RhdGUiLCJuZXdTdGFnZSIsImxlbmd0aCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2hlY2tPdXQiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJ0ZXh0IiwiZGF0YSIsInN0YXJ0Q2hlY2tvdXQiLCJTaWduVXBGb3JtIiwiY2hlY2tvdXRJZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImUiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJ1cGRhdGVEYXRhIiwibG9hZERhdGEiLCJBZGRyZXNzRm9ybSIsImxpbmUxIiwibGluZTIiLCJjaXR5IiwiemlwIiwiUGF5bWVudEZvcm0iLCJjcmVkaXRDYXJkTnVtYmVyIiwiZXhwaXJhdGlvbiIsImN2diIsIlJlc3VsdHMiLCJyZXN1bHRzIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEk7OztBQUNGLGtCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1RBLEtBRFM7O0FBR2YsY0FBS0MsU0FBTCxHQUFpQixNQUFLQSxTQUFMLENBQWVDLElBQWYsT0FBakI7O0FBRUEsY0FBS0MsS0FBTCxHQUFhO0FBQ1RDLG1CQUFPLENBREU7QUFFVEMsZ0JBQUksQ0FBQztBQUZJLFNBQWI7O0FBS0EsY0FBS0MsTUFBTCxHQUFjLENBQ1Ysb0JBQUMsUUFBRCxJQUFVLE9BQU8sTUFBS0MsS0FBTCxDQUFXTCxJQUFYLE9BQWpCLEVBQXdDLE9BQU8sTUFBS00sS0FBTCxDQUFXTixJQUFYLE9BQS9DLEVBQXNFLFdBQVcsTUFB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QUFZL0MsS0FBWixFQUFtQjtBQUFBOztBQUFBLHdIQUNUQSxLQURTOztBQUdmLGdCQUFLRyxLQUFMLEdBQWE7QUFDVDZDLHFCQUFTLEVBREE7QUFFVDNDLGdCQUFJO0FBRkssU0FBYjtBQUhlO0FBT2xCOzs7OzRDQUVrQjtBQUFBOztBQUVmVSxrQkFBTSxVQUFOLEVBQWtCO0FBQ2RhLHlCQUFTO0FBQ0x2Qix3QkFBSSxLQUFLTCxLQUFMLENBQVdRLEtBQVg7QUFEQztBQURLLGFBQWxCLEVBS0NTLElBTEQsQ0FLTSxnQkFBUTtBQUNWLHVCQUFPRyxLQUFLRCxJQUFMLEVBQVA7QUFDSCxhQVBELEVBUUNGLElBUkQsQ0FRTSxnQkFBUTtBQUNWLHdCQUFLUixRQUFMLENBQWM7QUFDVnVDLDZCQUFTNUI7QUFEQyxpQkFBZDtBQUdILGFBWkQ7QUFhSDs7O2lDQUVRO0FBQUE7O0FBQ0wsbUJBQVE7QUFBQTtBQUFBO0FBQ0o7QUFBQTtBQUFBO0FBQU0seUJBQUtqQixLQUFMLENBQVc2QztBQUFqQixpQkFESTtBQUVKO0FBQUE7QUFBQSxzQkFBUSxTQUFTO0FBQUEsbUNBQU0sUUFBS2hELEtBQUwsQ0FBV0MsU0FBWCxFQUFOO0FBQUEseUJBQWpCO0FBQUE7QUFBQTtBQUZJLGFBQVI7QUFJSDs7OztFQWpDaUJXLE1BQU1DLFM7O0FBcUM1Qm9DLFNBQVNDLE1BQVQsQ0FBZ0Isb0JBQUMsSUFBRCxPQUFoQixFQUEwQkMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUExQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5uZXh0U3RhZ2UgPSB0aGlzLm5leHRTdGFnZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGFnZTogMCxcbiAgICAgICAgICAgIGlkOiAtMVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc3RhZ2VzID0gW1xuICAgICAgICAgICAgPENoZWNrT3V0IHNldElkPXt0aGlzLnNldElkLmJpbmQodGhpcyl9IGdldElkPXt0aGlzLmdldElkLmJpbmQodGhpcyl9IG5leHRTdGFnZT17dGhpcy5uZXh0U3RhZ2V9Lz4sIFxuICAgICAgICAgICAgPFNpZ25VcEZvcm0gZ2V0SWQ9e3RoaXMuZ2V0SWQuYmluZCh0aGlzKX0gbmV4dFN0YWdlPXt0aGlzLm5leHRTdGFnZX0vPiwgXG4gICAgICAgICAgICA8QWRkcmVzc0Zvcm0gZ2V0SWQ9e3RoaXMuZ2V0SWQuYmluZCh0aGlzKX0gbmV4dFN0YWdlPXt0aGlzLm5leHRTdGFnZX0vPiwgXG4gICAgICAgICAgICA8UGF5bWVudEZvcm0gZ2V0SWQ9e3RoaXMuZ2V0SWQuYmluZCh0aGlzKX0gbmV4dFN0YWdlPXt0aGlzLm5leHRTdGFnZX0vPixcbiAgICAgICAgICAgIDxSZXN1bHRzIGdldElkPXt0aGlzLmdldElkLmJpbmQodGhpcyl9IG5leHRTdGFnZT17dGhpcy5uZXh0U3RhZ2V9Lz5cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaWQ7XG4gICAgfVxuXG4gICAgc2V0SWQoaWQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpZDogaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV4dFN0YWdlKCkge1xuICAgICAgICB2YXIgbmV3U3RhZ2UgPSAwO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGFnZSA8ICh0aGlzLnN0YWdlcy5sZW5ndGgtMSkpe1xuICAgICAgICAgICAgbmV3U3RhZ2UgPSB0aGlzLnN0YXRlLnN0YWdlICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhZ2U6IG5ld1N0YWdlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2Pnt0aGlzLnN0YWdlc1t0aGlzLnN0YXRlLnN0YWdlXX08L2Rpdj47XG4gICAgfVxufTtcblxuY2xhc3MgQ2hlY2tPdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH1cblxuICAgIHN0YXJ0Q2hlY2tvdXQoKSB7XG4gICAgICAgIGZldGNoKCcvY2hlY2tvdXQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZXRJZChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMubmV4dFN0YWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5zdGFydENoZWNrb3V0KCl9PkNoZWNrb3V0PC9idXR0b24+O1xuICAgIH07XG59XG5cbmNsYXNzIFNpZ25VcEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY2hlY2tvdXRJZDogJycsXG4gICAgICAgICAgICBmaXJzdE5hbWU6ICcnLFxuICAgICAgICAgICAgbGFzdE5hbWU6ICcnLFxuICAgICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgZmV0Y2goJy9wZXJzb24nLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5uZXh0U3RhZ2UoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKGUpIHtcbiAgICAgICAgc3dpdGNoKGUudGFyZ2V0Lm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ZpcnN0TmFtZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xhc3ROYW1lJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjaGVja291dElkOiB0aGlzLnByb3BzLmdldElkKClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2PlxuICAgICAgICAgICAgPGRpdj5FbnRlciByZWdpc3RyYXRpb24gaW5mbzwvZGl2PlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5GaXJzdCBOYW1lOiA8L3RkPjx0ZD48aW5wdXQgbmFtZT1cImZpcnN0TmFtZVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+TGFzdCBOYW1lOiA8L3RkPjx0ZD48aW5wdXQgbmFtZT1cImxhc3ROYW1lXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZURhdGEoZSl9IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5FbWFpbDogPC90ZD48dGQ+PGlucHV0IG5hbWU9XCJlbWFpbFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+UGFzc3dvcmQ6IDwvdGQ+PHRkPjxpbnB1dCBuYW1lPVwicGFzc3dvcmRcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlRGF0YShlKX0gdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMubG9hZERhdGEoKX0+U3VibWl0PC9idXR0b24+XG4gICAgICAgIDwvZGl2Pik7XG4gICAgfVxufTtcblxuY2xhc3MgQWRkcmVzc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjaGVja291dElkOiAnJyxcbiAgICAgICAgICAgIGxpbmUxOiAnJyxcbiAgICAgICAgICAgIGxpbmUyOiAnJyxcbiAgICAgICAgICAgIGNpdHk6ICcnLFxuICAgICAgICAgICAgc3RhdGU6ICcnLFxuICAgICAgICAgICAgemlwOiAnJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIGZldGNoKCcvYWRkcmVzcycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm5leHRTdGFnZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoZSkge1xuICAgICAgICBzd2l0Y2goZS50YXJnZXQubmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnbGluZTEnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBsaW5lMTogZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xpbmUyJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbGluZTI6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NpdHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHk6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3RhdGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3ppcCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgemlwOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2hlY2tvdXRJZDogdGhpcy5wcm9wcy5nZXRJZCgpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdj5cbiAgICAgICAgICAgIDxkaXY+RW50ZXIgYWRkcmVzczwvZGl2PlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5MaW5lIDE6IDwvdGQ+PHRkPjxpbnB1dCBuYW1lPVwibGluZTFcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlRGF0YShlKX0gdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkxpbmUgMjogPC90ZD48dGQ+PGlucHV0IG5hbWU9XCJsaW5lMlwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+Q2l0eTogPC90ZD48dGQ+PGlucHV0IG5hbWU9XCJjaXR5XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZURhdGEoZSl9IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5TdGF0ZTogPC90ZD48dGQ+PGlucHV0IG5hbWU9XCJzdGF0ZVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+WmlwOiA8L3RkPjx0ZD48aW5wdXQgbmFtZT1cInppcFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5sb2FkRGF0YSgpfT5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+KTtcbiAgICB9XG59O1xuXG5jbGFzcyBQYXltZW50Rm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjaGVja291dElkOiAnJyxcbiAgICAgICAgICAgIGNyZWRpdENhcmROdW1iZXI6ICcnLFxuICAgICAgICAgICAgZXhwaXJhdGlvbjogJycsXG4gICAgICAgICAgICBjdnY6ICcnLFxuICAgICAgICAgICAgemlwOiAnJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBmZXRjaCgnL3BheW1lbnQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5uZXh0U3RhZ2UoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKGUpIHtcbiAgICAgICAgc3dpdGNoKGUudGFyZ2V0Lm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NyZWRpdENhcmROdW1iZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBjcmVkaXRDYXJkTnVtYmVyOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZXhwaXJhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJhdGlvbjogZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY3Z2JzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgY3Z2OiBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd6aXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHppcDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNoZWNrb3V0SWQ6IHRoaXMucHJvcHMuZ2V0SWQoKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXY+XG4gICAgICAgICAgICA8ZGl2PkVudGVyIHBheW1lbnQgaW5mbzwvZGl2PlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5DcmVkaXQgQ2FyZCBOdW1iZXI6IDwvdGQ+PHRkPjxpbnB1dCBuYW1lPVwiY3JlZGl0Q2FyZE51bWJlclwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+RXhwaXJhdGlvbjogPC90ZD48dGQ+PGlucHV0IG5hbWU9XCJleHBpcmF0aW9uXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZURhdGEoZSl9IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5DVlY6IDwvdGQ+PHRkPjxpbnB1dCBuYW1lPVwiY3Z2XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZURhdGEoZSl9IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5CaWxsaW5nIFppcCBDb2RlOiA8L3RkPjx0ZD48aW5wdXQgbmFtZT1cInppcFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5sb2FkRGF0YSgpfT5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+KTtcbiAgICB9XG59XG5cbmNsYXNzIFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHJlc3VsdHM6ICcnLFxuICAgICAgICAgICAgaWQ6ICcnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXG4gICAgICAgIGZldGNoKCcvcmVzdWx0cycsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5nZXRJZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEudGV4dCgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdHM6IGRhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdj5cbiAgICAgICAgICAgIDxkaXY+e3RoaXMuc3RhdGUucmVzdWx0c308L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5uZXh0U3RhZ2UoKX0+U3VibWl0PC9idXR0b24+XG4gICAgICAgIDwvZGl2Pik7XG4gICAgfVxufVxuXG5cblJlYWN0RE9NLnJlbmRlcig8Rm9ybSAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiXX0=