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

        _this.stages = [React.createElement(CheckOut, { setId: _this.setId.bind(_this), getId: _this.getId.bind(_this), nextStage: _this.nextStage }), React.createElement(SignUpForm, { getId: _this.getId.bind(_this), nextStage: _this.nextStage }), React.createElement(AddressForm, { getId: _this.getId.bind(_this), nextStage: _this.nextStage }), React.createElement(PaymentForm, { getId: _this.getId.bind(_this), nextStage: _this.nextStage })];
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
            if (this.state.stage < 3) {
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

            fetch('/signup', {
                method: 'post',
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

        return _possibleConstructorReturn(this, (AddressForm.__proto__ || Object.getPrototypeOf(AddressForm)).call(this, props));
    }

    _createClass(AddressForm, [{
        key: 'render',
        value: function render() {
            var _this9 = this;

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
                                React.createElement('input', { type: 'text' })
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
                                React.createElement('input', { type: 'text' })
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
                                React.createElement('input', { type: 'text' })
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
                                React.createElement('input', { type: 'text' })
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
                                React.createElement('input', { type: 'text' })
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Phone: '
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement('input', { type: 'text' })
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this9.props.nextStage();
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

        return _possibleConstructorReturn(this, (PaymentForm.__proto__ || Object.getPrototypeOf(PaymentForm)).call(this, props));
    }

    _createClass(PaymentForm, [{
        key: 'render',
        value: function render() {
            var _this11 = this;

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
                                React.createElement('input', { type: 'text' })
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
                                React.createElement('input', { type: 'text' })
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
                                React.createElement('input', { type: 'text' })
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
                                React.createElement('input', { type: 'text' })
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this11.props.nextStage();
                        } },
                    'Submit'
                )
            );
        }
    }]);

    return PaymentForm;
}(React.Component);

ReactDOM.render(React.createElement(Form, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkZvcm0iLCJwcm9wcyIsIm5leHRTdGFnZSIsImJpbmQiLCJzdGF0ZSIsInN0YWdlIiwiaWQiLCJzdGFnZXMiLCJzZXRJZCIsImdldElkIiwic2V0U3RhdGUiLCJuZXdTdGFnZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2hlY2tPdXQiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJ0ZXh0IiwiZGF0YSIsInN0YXJ0Q2hlY2tvdXQiLCJTaWduVXBGb3JtIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlIiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwidXBkYXRlRGF0YSIsImxvYWREYXRhIiwiQWRkcmVzc0Zvcm0iLCJQYXltZW50Rm9ybSIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxJOzs7QUFDRixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGdIQUNUQSxLQURTOztBQUdmLGNBQUtDLFNBQUwsR0FBaUIsTUFBS0EsU0FBTCxDQUFlQyxJQUFmLE9BQWpCOztBQUVBLGNBQUtDLEtBQUwsR0FBYTtBQUNUQyxtQkFBTyxDQURFO0FBRVRDLGdCQUFJLENBQUM7QUFGSSxTQUFiOztBQUtBLGNBQUtDLE1BQUwsR0FBYyxDQUNWLG9CQUFDLFFBQUQsSUFBVSxPQUFPLE1BQUtDLEtBQUwsQ0FBV0wsSUFBWCxPQUFqQixFQUF3QyxPQUFPLE1BQUtNLEtBQUwsQ0FBV04sSUFBWCxPQUEvQyxFQUFzRSxXQUFXLE1BQUtELFNBQXRGLEdBRFUsRUFFVixvQkFBQyxVQUFELElBQVksT0FBTyxNQUFLTyxLQUFMLENBQVdOLElBQVgsT0FBbkIsRUFBMEMsV0FBVyxNQUFLRCxTQUExRCxHQUZVLEVBR1Ysb0JBQUMsV0FBRCxJQUFhLE9B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cmNlc0NvbnRlbnQiOlsiY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMubmV4dFN0YWdlID0gdGhpcy5uZXh0U3RhZ2UuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhZ2U6IDAsXG4gICAgICAgICAgICBpZDogLTFcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN0YWdlcyA9IFtcbiAgICAgICAgICAgIDxDaGVja091dCBzZXRJZD17dGhpcy5zZXRJZC5iaW5kKHRoaXMpfSBnZXRJZD17dGhpcy5nZXRJZC5iaW5kKHRoaXMpfSBuZXh0U3RhZ2U9e3RoaXMubmV4dFN0YWdlfS8+LCBcbiAgICAgICAgICAgIDxTaWduVXBGb3JtIGdldElkPXt0aGlzLmdldElkLmJpbmQodGhpcyl9IG5leHRTdGFnZT17dGhpcy5uZXh0U3RhZ2V9Lz4sIFxuICAgICAgICAgICAgPEFkZHJlc3NGb3JtIGdldElkPXt0aGlzLmdldElkLmJpbmQodGhpcyl9IG5leHRTdGFnZT17dGhpcy5uZXh0U3RhZ2V9Lz4sIFxuICAgICAgICAgICAgPFBheW1lbnRGb3JtIGdldElkPXt0aGlzLmdldElkLmJpbmQodGhpcyl9IG5leHRTdGFnZT17dGhpcy5uZXh0U3RhZ2V9Lz5cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaWQ7XG4gICAgfVxuXG4gICAgc2V0SWQoaWQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpZDogaWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV4dFN0YWdlKCkge1xuICAgICAgICB2YXIgbmV3U3RhZ2UgPSAwO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGFnZSA8IDMpIHtcbiAgICAgICAgICAgIG5ld1N0YWdlID0gdGhpcy5zdGF0ZS5zdGFnZSArIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHN0YWdlOiBuZXdTdGFnZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj57dGhpcy5zdGFnZXNbdGhpcy5zdGF0ZS5zdGFnZV19PC9kaXY+O1xuICAgIH1cbn07XG5cbmNsYXNzIENoZWNrT3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICBzdGFydENoZWNrb3V0KCkge1xuICAgICAgICBmZXRjaCgnL2NoZWNrb3V0Jywge1xuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMudGV4dCgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0SWQoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm5leHRTdGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMuc3RhcnRDaGVja291dCgpfT5DaGVja291dDwvYnV0dG9uPjtcbiAgICB9O1xufVxuXG5jbGFzcyBTaWduVXBGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGZpcnN0TmFtZTogJycsXG4gICAgICAgICAgICBsYXN0TmFtZTogJycsXG4gICAgICAgICAgICBlbWFpbDogJycsXG4gICAgICAgICAgICBwYXNzd29yZDogJydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBmZXRjaCgnL3NpZ251cCcsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSlcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5uZXh0U3RhZ2UoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKGUpIHtcbiAgICAgICAgc3dpdGNoKGUudGFyZ2V0Lm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ZpcnN0TmFtZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xhc3ROYW1lJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2PlxuICAgICAgICAgICAgPGRpdj5FbnRlciByZWdpc3RyYXRpb24gaW5mbzwvZGl2PlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5GaXJzdCBOYW1lOiA8L3RkPjx0ZD48aW5wdXQgbmFtZT1cImZpcnN0TmFtZVwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+TGFzdCBOYW1lOiA8L3RkPjx0ZD48aW5wdXQgbmFtZT1cImxhc3ROYW1lXCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZURhdGEoZSl9IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5FbWFpbDogPC90ZD48dGQ+PGlucHV0IG5hbWU9XCJlbWFpbFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVEYXRhKGUpfSB0eXBlPVwidGV4dFwiLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+UGFzc3dvcmQ6IDwvdGQ+PHRkPjxpbnB1dCBuYW1lPVwicGFzc3dvcmRcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlRGF0YShlKX0gdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMubG9hZERhdGEoKX0+U3VibWl0PC9idXR0b24+XG4gICAgICAgIDwvZGl2Pik7XG4gICAgfVxufTtcblxuY2xhc3MgQWRkcmVzc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKDxkaXY+XG4gICAgICAgICAgICA8ZGl2PkVudGVyIGFkZHJlc3M8L2Rpdj5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+TGluZSAxOiA8L3RkPjx0ZD48aW5wdXQgdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkxpbmUgMjogPC90ZD48dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5DaXR5OiA8L3RkPjx0ZD48aW5wdXQgdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlN0YXRlOiA8L3RkPjx0ZD48aW5wdXQgdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlppcDogPC90ZD48dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5QaG9uZTogPC90ZD48dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm5leHRTdGFnZSgpfT5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+KTtcbiAgICB9XG59O1xuXG5jbGFzcyBQYXltZW50Rm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdj5cbiAgICAgICAgICAgIDxkaXY+RW50ZXIgcGF5bWVudCBpbmZvPC9kaXY+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkNyZWRpdCBDYXJkIE51bWJlcjogPC90ZD48dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5FeHBpcmF0aW9uOiA8L3RkPjx0ZD48aW5wdXQgdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkNWVjogPC90ZD48dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5CaWxsaW5nIFppcCBDb2RlOiA8L3RkPjx0ZD48aW5wdXQgdHlwZT1cInRleHRcIi8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMubmV4dFN0YWdlKCl9PlN1Ym1pdDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj4pO1xuICAgIH1cbn1cblxuXG5cblJlYWN0RE9NLnJlbmRlcig8Rm9ybSAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiXX0=