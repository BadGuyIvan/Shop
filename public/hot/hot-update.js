webpackHotUpdate("main",{

/***/ "./src/components/SizePage/SizePage.js":
/*!*********************************************!*\
  !*** ./src/components/SizePage/SizePage.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ \"./node_modules/babel-runtime/helpers/defineProperty.js\");\n\nvar _defineProperty3 = _interopRequireDefault(_defineProperty2);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _styles = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n\nvar _Input = __webpack_require__(/*! @material-ui/core/Input */ \"./node_modules/@material-ui/core/Input/index.js\");\n\nvar _Input2 = _interopRequireDefault(_Input);\n\nvar _InputLabel = __webpack_require__(/*! @material-ui/core/InputLabel */ \"./node_modules/@material-ui/core/InputLabel/index.js\");\n\nvar _InputLabel2 = _interopRequireDefault(_InputLabel);\n\nvar _FormControl = __webpack_require__(/*! @material-ui/core/FormControl */ \"./node_modules/@material-ui/core/FormControl/index.js\");\n\nvar _FormControl2 = _interopRequireDefault(_FormControl);\n\nvar _NativeSelect = __webpack_require__(/*! @material-ui/core/NativeSelect */ \"./node_modules/@material-ui/core/NativeSelect/index.js\");\n\nvar _NativeSelect2 = _interopRequireDefault(_NativeSelect);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar _actions = __webpack_require__(/*! ../../redux/actions */ \"./src/redux/actions/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar styles = function styles(theme) {\n  return {\n    root: {\n      display: 'flex',\n      flexWrap: 'wrap'\n    },\n    formControl: {\n      margin: theme.spacing.unit,\n      minWidth: 120\n    },\n    selectEmpty: {\n      marginTop: theme.spacing.unit * 2\n    }\n  };\n};\n\nvar NativeSelects = function (_React$Component) {\n  (0, _inherits3.default)(NativeSelects, _React$Component);\n\n  function NativeSelects() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    (0, _classCallCheck3.default)(this, NativeSelects);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = NativeSelects.__proto__ || Object.getPrototypeOf(NativeSelects)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, 'state', {\n      enumerable: true,\n      writable: true,\n      value: {\n        sizePage: 4\n      }\n    }), Object.defineProperty(_this, 'handleChange', {\n      enumerable: true,\n      writable: true,\n      value: function value(event) {\n        _this.props.changedSizePage(Number(event.target.value));\n        _this.setState((0, _defineProperty3.default)({}, event.target.name, event.target.value));\n      }\n    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);\n  }\n\n  (0, _createClass3.default)(NativeSelects, [{\n    key: 'render',\n    value: function render() {\n      var classes = this.props.classes;\n\n\n      return _react2.default.createElement(\n        'div',\n        { className: classes.root },\n        _react2.default.createElement(\n          _FormControl2.default,\n          { className: classes.formControl },\n          _react2.default.createElement(\n            _InputLabel2.default,\n            { shrink: true, htmlFor: 'sizePage-label-placeholder' },\n            'SizePage'\n          ),\n          _react2.default.createElement(\n            _NativeSelect2.default,\n            {\n              value: this.state.sizePage,\n              onChange: this.handleChange,\n              input: _react2.default.createElement(_Input2.default, { name: 'sizePage', id: 'sizePage-label-placeholder' })\n            },\n            _react2.default.createElement(\n              'option',\n              { value: 4 },\n              '4'\n            ),\n            _react2.default.createElement(\n              'option',\n              { value: 8 },\n              '8'\n            ),\n            _react2.default.createElement(\n              'option',\n              { value: 12 },\n              '12'\n            )\n          )\n        )\n      );\n    }\n  }]);\n  return NativeSelects;\n}(_react2.default.Component);\n\nNativeSelects.propTypes = {\n  classes: _propTypes2.default.object.isRequired\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    category: state.filter.category,\n    search: state.filter.search,\n    sizePage: state.filter.sizePage,\n    page: state.filter.page,\n    price: state.filter.price\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return (0, _redux.bindActionCreators)({ changedSizePage: _actions.changedSizePage }, dispatch);\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _styles.withStyles)(styles)(NativeSelects));\n\n//# sourceURL=webpack:///./src/components/SizePage/SizePage.js?");

/***/ })

})