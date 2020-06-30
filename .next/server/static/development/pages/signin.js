module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"static\\development\\pages\\signin.js": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "./components/Link.jsx":
/*!*****************************!*\
  !*** ./components/Link.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "clsx");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Link */ "@material-ui/core/Link");
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\components\\Link.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable jsx-a11y/anchor-has-content */






const NextComposed = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function NextComposed(props, ref) {
  const {
    as,
    href
  } = props,
        other = _objectWithoutProperties(props, ["as", "href"]);

  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    href: href,
    as: as,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, __jsx("a", _extends({
    ref: ref
  }, other, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  })));
});
NextComposed.propTypes = {
  as: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  href: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  prefetch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
}; // A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link

function Link(props) {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    innerRef,
    naked
  } = props,
        other = _objectWithoutProperties(props, ["href", "activeClassName", "className", "innerRef", "naked"]);

  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx__WEBPACK_IMPORTED_MODULE_2___default()(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  });

  if (naked) {
    return __jsx(NextComposed, _extends({
      className: className,
      ref: innerRef,
      href: href
    }, other, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 7
      }
    }));
  }

  return __jsx(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_5___default.a, _extends({
    component: NextComposed,
    className: className,
    ref: innerRef,
    href: href
  }, other, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 5
    }
  }));
}

Link.propTypes = {
  activeClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  as: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  href: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  innerRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  naked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  prefetch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
}; // export default React.forwardRef((props, ref) => (
//   <Link {...props} innerRef={ref} />
// ))

/* harmony default export */ __webpack_exports__["default"] = (Link);

/***/ }),

/***/ "./components/buttons/ClassicButton.jsx":
/*!**********************************************!*\
  !*** ./components/buttons/ClassicButton.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "clsx");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);



const ClassicButton = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["styled"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Button"])({
  // width:'100%',
  textTransform: 'none',
  background: '#25AAA4',
  color: 'white',
  borderRadius: '8px',
  paddingTop: '12px',
  paddingBottom: '12px',
  marginBottom: '16px',
  '&:hover': {
    background: '#25AAA4'
  },
  '&.Mui-disabled': {
    background: '#E0E0E0'
  }
}); // const useStyles = makeStyles((theme) => ({
//     root : {
//         // width:'100%',
//         textTransform:'none',
//         background:'#25AAA4',
//         color:'white',
//         borderRadius:'8px',
//         paddingTop:'12px',
//         paddingBottom:'12px',
//         marginBottom:'16px',
//         '&:hover': {
//             background:'#25AAA4',
//         }
//     }
// }))
// const ClassicButton = ({children, className,...props}) => {
//     const styles = useStyles()
//     return (
//         <Button className={clsx(className,styles.root)} {...props}>
//             {children}
//         </Button>
//     )
// }

/* harmony default export */ __webpack_exports__["default"] = (ClassicButton);

/***/ }),

/***/ "./components/controllers/FormController.tsx":
/*!***************************************************!*\
  !*** ./components/controllers/FormController.tsx ***!
  \***************************************************/
/*! exports provided: ValidationRuleType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationRuleType", function() { return ValidationRuleType; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! notistack */ "notistack");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var utils_omitTypename__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils/omitTypename */ "./utils/omitTypename.js");
/* harmony import */ var utils_validateEmailFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! utils/validateEmailFormat */ "./utils/validateEmailFormat.tsx");
/* harmony import */ var utils_validatePasswordFormat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utils/validatePasswordFormat */ "./utils/validatePasswordFormat.tsx");
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\components\\controllers\\FormController.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








let ValidationRuleType;

(function (ValidationRuleType) {
  ValidationRuleType["password"] = "password";
  ValidationRuleType["equalTo"] = "equalTo";
  ValidationRuleType["required"] = "required";
  ValidationRuleType["email"] = "email";
  ValidationRuleType["only"] = "only";
})(ValidationRuleType || (ValidationRuleType = {}));

const withMutation = FormComponent => props => {
  const {
    formValues,
    setFormValue,
    queryOptions,
    setInitialFormValues
  } = props;
  const scnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_2__["useSnackbar"])();
  const [update, {
    data,
    loading,
    error
  }] = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useMutation"])(queryOptions.query, {
    variables: {
      formValues
    }
  });
  const submitHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    update();
  }, [update]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    // if (!error) {
    let next = false;

    if (queryOptions.mutationResultControl == "builtin") {
      if ((data === null || data === void 0 ? void 0 : data[queryOptions.resultLabel]) && !error) next = true;
    } else if (queryOptions.mutationResultControl && queryOptions.mutationResultControl(formValues, data, error)) next = true;

    if (next) {
      setInitialFormValues(Object(utils_omitTypename__WEBPACK_IMPORTED_MODULE_3__["default"])(data === null || data === void 0 ? void 0 : data[queryOptions.resultLabel]));
      if (queryOptions.snackbarSucceedMessage) scnackbar.enqueueSnackbar(queryOptions.snackbarSucceedMessage);
      if (queryOptions.afterResultControlCallback) queryOptions.afterResultControlCallback(formValues, data, error);

      if (queryOptions.clearFormvaluesAfterControl) {
        const keys = Object.keys(formValues);
        let formValuesTemp = {};
        keys.forEach(key => {
          formValuesTemp = _objectSpread(_objectSpread({}, formValuesTemp), {}, {
            [key]: ""
          });
        });
        setFormValue(formValuesTemp);
      }
    } else if (data) throw new Error(`No data for the result label: ${queryOptions.resultLabel}`); // }

  }, [data, error]);
  return __jsx(FormComponent, _extends({}, props, {
    submitHandler: submitHandler,
    loading: loading,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 5
    }
  }));
};

const FormController = (props, ...otherprops) => {
  const {
    initValues,
    render,
    withQuery = false,
    queryOptions,
    validationRules = null
  } = props;
  const {
    0: formValues,
    1: setFormValue
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_objectSpread({}, initValues));
  const {
    0: initialFormValues,
    1: setInitialFormValues
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_objectSpread({}, initValues));
  const {
    0: validationResult,
    1: setValidationResult
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const formChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(e => {
    // if there an only rule on the field
    const rule = validationRules === null || validationRules === void 0 ? void 0 : validationRules[e.target.name];

    if ((rule === null || rule === void 0 ? void 0 : rule.rule) === ValidationRuleType.only) {
      if (rule.type === "number") {
        const isnum = /^\d+$/.test(e.target.value);
        if (isnum) setFormValue(_objectSpread(_objectSpread({}, formValues), {}, {
          [e.target.name]: e.target.value
        }));
      }

      if (rule.type === "string") {
        const ischar = /^[a-zA-Z]+$/.test(e.target.value);
        if (ischar) setFormValue(_objectSpread(_objectSpread({}, formValues), {}, {
          [e.target.name]: e.target.value
        }));
      }
    } else {
      setFormValue(_objectSpread(_objectSpread({}, formValues), {}, {
        [e.target.name]: e.target.value
      }));
    }
  }, [setFormValue, formValues, validationRules]);
  /* a revoir */

  const isModified = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (JSON.stringify(formValues) == JSON.stringify(initialFormValues)) return false;
    return true;
  }, [formValues, initialFormValues]);
  const clearFormvalues = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    setFormValue({});
    setInitialFormValues({});
  }, [setFormValue]);
  /* validation : a revoir / compléter .. */

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (validationRules) {
      let validationResultTemp = {
        global: true,
        result: {}
      };
      const keys = Object.keys(validationRules);
      keys.forEach(key => {
        const field = validationRules[key];
        /* password rule handler */

        if (field.rule == ValidationRuleType.password) {
          const result = Object(utils_validatePasswordFormat__WEBPACK_IMPORTED_MODULE_5__["default"])(formValues === null || formValues === void 0 ? void 0 : formValues[key]);
          /* if the password format is validated, update the result for the concerned field */

          if (result.length !== 0) {
            const newKeyValue = validationResultTemp.result[key] ? validationResultTemp.result[key].concat(result) : result;
            validationResultTemp = {
              result: _objectSpread(_objectSpread({}, validationResultTemp.result), {}, {
                [key]: newKeyValue
              }),
              global: false
            };
          }
        }
        /* equalTo rule handler */


        if (field.rule == ValidationRuleType.equalTo) {
          /* test if the 2 fields are equals */
          const result = formValues[key] == formValues[field.field];
          /* if the test result is false, update the result for the concerned field */

          if (!result) {
            const newKeyValue = validationResultTemp.result[key] ? validationResultTemp.result[key].concat("equalTo") : ["equalTo"];
            validationResultTemp = {
              result: _objectSpread(_objectSpread({}, validationResultTemp.result), {}, {
                [key]: newKeyValue
              }),
              global: false
            };
          }
        }
        /* required rule handler */


        if (field.rule == ValidationRuleType.required) {
          var _formValues$key;

          /* test if there is a value in the formValues array */
          const result = ((_formValues$key = formValues[key]) === null || _formValues$key === void 0 ? void 0 : _formValues$key.length) == 0;
          /* if the test result is true, update the result for the concerned field */

          if (result) {
            const newKeyValue = validationResultTemp.result[key] ? validationResultTemp.result[key].concat("required") : ["required"];
            validationResultTemp = {
              result: _objectSpread(_objectSpread({}, validationResultTemp.result), {}, {
                [key]: newKeyValue
              }),
              global: false
            };
          }
        }
        /* email rule handler */


        if (field.rule == ValidationRuleType.email) {
          const result = Object(utils_validateEmailFormat__WEBPACK_IMPORTED_MODULE_4__["default"])(formValues === null || formValues === void 0 ? void 0 : formValues[key]);
          /* if the email format is validated, update the result for the concerned field */

          if (!result) {
            const newKeyValue = validationResultTemp.result[key] ? validationResultTemp.result[key].concat("email") : ["email"];
            validationResultTemp = {
              result: _objectSpread(_objectSpread({}, validationResultTemp.result), {}, {
                [key]: newKeyValue
              }),
              global: false
            };
          }
        }
      });
      setValidationResult(validationResultTemp);
    }
  }, [formValues, validationRules]);
  const withMutationProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return {
      formChangeHandler: formChangeHandler,
      isModified,
      formValues,
      validationResult,
      queryOptions,
      setInitialFormValues,
      setFormValue,
      clearFormvalues
    };
  }, [formChangeHandler, isModified, formValues, validationResult, queryOptions, withQuery, setInitialFormValues, setFormValue]);
  const renderProps = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return _objectSpread({
      formChangeHandler: formChangeHandler,
      isModified,
      formValues,
      validationResult,
      clearFormvalues
    }, otherprops);
  }, [formChangeHandler, isModified, formValues, validationResult // queryOptions,
  ]);

  if (withQuery) {
    if (!queryOptions) throw new Error("queryOption prop must be provided when withQuery prop is true."); // @ts-ignore

    return withMutation(render)(withMutationProps);
  }

  return render(renderProps);
};

/* harmony default export */ __webpack_exports__["default"] = (FormController);

/***/ }),

/***/ "./containers/fallbacks/FallbackAlreadyConnected.jsx":
/*!***********************************************************!*\
  !*** ./containers/fallbacks/FallbackAlreadyConnected.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var containers_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! containers/layouts/AppLayout */ "./containers/layouts/AppLayout.jsx");
/* harmony import */ var containers_layouts_AppContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! containers/layouts/AppContainer */ "./containers/layouts/AppContainer.jsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\containers\\fallbacks\\FallbackAlreadyConnected.jsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const FallbackAlreadyConnected = () => {
  return __jsx(containers_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 9
    }
  }, __jsx(containers_layouts_AppContainer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Grid"], {
    container: true,
    justify: "center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], {
    variant: "h6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 21
    }
  }, "Vous ne pouvez pas acc\xE9der \xE0 cette page car vous \xEAtes d\xE9ja identifi\xE9s."))));
};

/* harmony default export */ __webpack_exports__["default"] = (FallbackAlreadyConnected);

/***/ }),

/***/ "./containers/forms/SigninForm.tsx":
/*!*****************************************!*\
  !*** ./containers/forms/SigninForm.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hoc_withApollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hoc/withApollo */ "./hoc/withApollo.jsx");
/* harmony import */ var components_controllers_FormController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/controllers/FormController */ "./components/controllers/FormController.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "@material-ui/icons/LockOutlined");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_buttons_ClassicButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/buttons/ClassicButton */ "./components/buttons/ClassicButton.jsx");
/* harmony import */ var components_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Link */ "./components/Link.jsx");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var context_session_session__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! context/session/session */ "./context/session/session.js");
/* harmony import */ var utils_omitTypename__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! utils/omitTypename */ "./utils/omitTypename.js");
/* harmony import */ var hooks_useGraphQLErrorDisplay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! hooks/useGraphQLErrorDisplay */ "./hooks/useGraphQLErrorDisplay.js");
/* harmony import */ var hooks_useCookieRedirection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! hooks/useCookieRedirection */ "./hooks/useCookieRedirection.js");
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\containers\\forms\\SigninForm.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;















const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["makeStyles"])(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  box: {
    width: "100%",
    // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const SIGNIN = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default.a`
  mutation login(
    $email: String!
    $password: String!
    $persistentConnection: Boolean!
  ) {
    login(
      email: $email
      password: $password
      persistentConnection: $persistentConnection
    ) {
      id
      surname
      lastname
      email
      role
      phone
      address
      postCode
      city
    }
  }
`;
const validationRules = {
  email: {
    rule: components_controllers_FormController__WEBPACK_IMPORTED_MODULE_3__["ValidationRuleType"].required
  },
  password: {
    rule: components_controllers_FormController__WEBPACK_IMPORTED_MODULE_3__["ValidationRuleType"].required
  }
};

const SigninForm = () => {
  const Form = props => {
    const {
      formChangeHandler,
      formValues,
      validationResult
    } = props;
    const [signin, {
      data,
      error
    }] = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__["useMutation"])(SIGNIN);
    Object(hooks_useGraphQLErrorDisplay__WEBPACK_IMPORTED_MODULE_11__["default"])(error);
    const styles = useStyles();
    const {
      0: checkBoxChecked,
      1: setCheckBoxChecked
    } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
    const sessionDispatch = Object(context_session_session__WEBPACK_IMPORTED_MODULE_9__["useSessionDispatch"])();
    const redirect = Object(hooks_useCookieRedirection__WEBPACK_IMPORTED_MODULE_12__["default"])();
    const checkBoxChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(e => {
      setCheckBoxChecked(e.target.checked);
    }, [setCheckBoxChecked]);
    const submitHandler2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
      signin({
        variables: {
          email: formValues.email,
          password: formValues.password,
          persistentConnection: checkBoxChecked
        }
      });
    }, [checkBoxChecked, formValues, signin]);
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      var _data$login;

      if (data === null || data === void 0 ? void 0 : (_data$login = data.login) === null || _data$login === void 0 ? void 0 : _data$login.id) {
        sessionDispatch({
          type: "login",
          payload: Object(utils_omitTypename__WEBPACK_IMPORTED_MODULE_10__["default"])(data.login)
        });
        redirect();
      }
    }, [data, sessionDispatch, redirect]);
    return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Container"], {
      component: "main",
      maxWidth: "xs",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 7
      }
    }, __jsx("div", {
      className: styles.paper,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }
    }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Avatar"], {
      className: styles.avatar,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 11
      }
    }, __jsx(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_5___default.a, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 13
      }
    })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
      component: "h1",
      variant: "h5",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 11
      }
    }, "Connexion"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["TextField"], {
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      label: "Email Address",
      name: "email",
      autoComplete: "current-email",
      autoFocus: true,
      defaultValue: "",
      value: formValues === null || formValues === void 0 ? void 0 : formValues.email,
      onChange: formChangeHandler,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 11
      }
    }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["TextField"], {
      variant: "outlined",
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "password",
      label: "Password",
      type: "password",
      autoComplete: "current-password",
      defaultValue: "",
      value: formValues === null || formValues === void 0 ? void 0 : formValues.password,
      onChange: formChangeHandler,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 142,
        columnNumber: 11
      }
    }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Box"], {
      className: styles.box,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 11
      }
    }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["FormControlLabel"], {
      control: __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Checkbox"], {
        value: "remember",
        color: "primary",
        onChange: checkBoxChangeHandler,
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 17
        }
      }),
      label: "Se souvenir de moi",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 13
      }
    })), __jsx(components_buttons_ClassicButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
      fullWidth: true,
      variant: "contained",
      className: styles.submit,
      onClick: submitHandler2,
      disabled: !(validationResult === null || validationResult === void 0 ? void 0 : validationResult.global),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 167,
        columnNumber: 11
      }
    }, "Se connecter"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Grid"], {
      container: true,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 176,
        columnNumber: 11
      }
    }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Grid"], {
      item: true,
      xs: true,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 177,
        columnNumber: 13
      }
    }, __jsx(components_Link__WEBPACK_IMPORTED_MODULE_7__["default"], {
      href: "/forgotPassword",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 179,
        columnNumber: 15
      }
    }, "Mot de passe oubli\xE9 ?")), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Grid"], {
      item: true,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 181,
        columnNumber: 13
      }
    }, __jsx(components_Link__WEBPACK_IMPORTED_MODULE_7__["default"], {
      href: "/signup",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 183,
        columnNumber: 15
      }
    }, "Cr\xE9er un compte")))));
  };

  return __jsx(components_controllers_FormController__WEBPACK_IMPORTED_MODULE_3__["default"], {
    render: Form,
    validationRules: validationRules,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 10
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Object(hoc_withApollo__WEBPACK_IMPORTED_MODULE_2__["withApollo"])()(SigninForm));

/***/ }),

/***/ "./containers/layouts/AppContainer.jsx":
/*!*********************************************!*\
  !*** ./containers/layouts/AppContainer.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\containers\\layouts\\AppContainer.jsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(theme => ({
  withMaxWidth: {
    marginTop: theme.spacing(6),
    maxWidth: '1120px'
  },
  noMaxWidth: {
    marginTop: theme.spacing(6)
  }
}));

const AppContainer = (_ref) => {
  let {
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children"]);

  const styles = useStyles();

  if (props === null || props === void 0 ? void 0 : props.maxWidth) {
    return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Container"], _extends({
      className: styles.noMaxWidth
    }, props, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 13
      }
    }), children);
  }

  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Container"], _extends({
    className: styles.withMaxWidth
  }, props, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (AppContainer);

/***/ }),

/***/ "./containers/layouts/AppLayout.jsx":
/*!******************************************!*\
  !*** ./containers/layouts/AppLayout.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var containers_layouts_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! containers/layouts/NavBar */ "./containers/layouts/NavBar.jsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\containers\\layouts\\AppLayout.jsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(theme => ({
  root: {
    backgroundColor: '#FFFFFF'
  }
}));

const AppLayout = ({
  children
}) => {
  const styles = useStyles();
  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Box"], {
    className: styles.root,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 9
    }
  }, __jsx(containers_layouts_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 13
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (AppLayout);

/***/ }),

/***/ "./containers/layouts/NavBar.jsx":
/*!***************************************!*\
  !*** ./containers/layouts/NavBar.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "@material-ui/core/Toolbar");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_buttons_ClassicButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/buttons/ClassicButton */ "./components/buttons/ClassicButton.jsx");
/* harmony import */ var components_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Link */ "./components/Link.jsx");
/* harmony import */ var context_session_session__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! context/session/session */ "./context/session/session.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-cookie */ "react-cookie");
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var hoc_withApollo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! hoc/withApollo */ "./hoc/withApollo.jsx");
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\containers\\layouts\\NavBar.jsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;















const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(theme => ({
  navbar: {
    backgroundColor: 'white',
    boxShadow: 'none'
  },
  buttontest: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    // background:'red',
    marginBottom: '0px'
  },
  avatar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  popoverPaper: {
    marginTop: theme.spacing(2),
    width: '250px'
  },
  listItemTypo: {
    fontWeight: '450'
  }
}));
const SIGNOUT = graphql_tag__WEBPACK_IMPORTED_MODULE_10___default.a`
    mutation logout{
      logout
    }
`;

const NavBar = () => {
  const styles = useStyles();
  const user = Object(context_session_session__WEBPACK_IMPORTED_MODULE_8__["useSessionState"])();
  const sessionDispatch = Object(context_session_session__WEBPACK_IMPORTED_MODULE_8__["useSessionDispatch"])();
  const [cookies, setCookie, removeCookie] = Object(react_cookie__WEBPACK_IMPORTED_MODULE_11__["useCookies"])();
  const [signout, {
    data
  }] = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_9__["useMutation"])(SIGNOUT);
  const theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["useTheme"])();
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_12__["useRouter"])();
  const signoutHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    signout();
  }, [signout]);
  const signinClickHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    setCookie('redirect_url', router.asPath, {
      path: '/'
    });
  }, [setCookie, router.asPath]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (data === null || data === void 0 ? void 0 : data.logout) sessionDispatch({
      type: "logout"
    });
  }, [data, sessionDispatch]);
  const [anchorEl, setAnchorEl] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default.a, {
    position: "static",
    className: styles.navbar,
    color: "inherit",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 9
    }
  }, __jsx(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 11
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    container: true,
    direction: "row",
    justify: "space-between",
    alignItems: "center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    item: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 15
    }
  }, __jsx(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 17
    }
  }, "Title")), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    item: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 15
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    container: true,
    spacing: 3,
    alignItems: "center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 17
    }
  }, !user && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    item: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 23
    }
  }, __jsx(components_Link__WEBPACK_IMPORTED_MODULE_7__["default"], {
    href: "/signup",
    underline: "none",
    color: "textPrimary",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 25
    }
  }, "S'inscrire")), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    item: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 23
    }
  }, __jsx(components_Link__WEBPACK_IMPORTED_MODULE_7__["default"], {
    href: "/signin",
    underline: "none",
    color: "textPrimary",
    onClick: signinClickHandler,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 25
    }
  }, "Se connecter"))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Grid"], {
    item: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 19
    }
  }, __jsx(_components_buttons_ClassicButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: styles.buttontest,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 21
    }
  }, "Donner une formation")), user && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Avatar"], {
    className: styles.avatar,
    onClick: handleClick,
    "aria-controls": "popover-menu",
    "aria-haspopup": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 23
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Menu"], {
    id: "popover-menu",
    open: open,
    anchorEl: anchorEl,
    onClose: handleClose,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    getContentAnchorEl: null,
    classes: {
      paper: styles.popoverPaper
    },
    TransitionComponent: _material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Fade"],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 23
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["MenuItem"], {
    button: true,
    component: components_Link__WEBPACK_IMPORTED_MODULE_7__["default"],
    href: "/account",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 25
    }
  }, "Mon compte"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["MenuItem"], {
    onClick: signoutHandler,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 25
    }
  }, "Se d\xE9connecter")))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(hoc_withApollo__WEBPACK_IMPORTED_MODULE_13__["withApollo"])()(NavBar));

/***/ }),

/***/ "./context/session/session.js":
/*!************************************!*\
  !*** ./context/session/session.js ***!
  \************************************/
/*! exports provided: SessionProvider, useSessionState, useSessionDispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionProvider", function() { return SessionProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSessionState", function() { return useSessionState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSessionDispatch", function() { return useSessionDispatch; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\context\\session\\session.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const SessionStateContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
const SessionDispatchContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      {
        return _objectSpread({}, action.payload);
      }

    case "logout":
      {
        return null;
      }

    default:
      {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
  }
}

function SessionProvider({
  children,
  init = null
}) {
  const [state, dispatch] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useReducer(authReducer, init);
  return __jsx(SessionStateContext.Provider, {
    value: state,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 5
    }
  }, __jsx(SessionDispatchContext.Provider, {
    value: dispatch,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }, children));
}

function useSessionState() {
  const context = react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(SessionStateContext);

  if (context === undefined) {
    throw new Error("useSessionState must be used within a SessionProvider");
  }

  return context;
}

function useSessionDispatch() {
  const context = react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(SessionDispatchContext);

  if (context === undefined) {
    throw new Error("useSessionDispatch must be used within a SessionProvider");
  }

  return context;
}



/***/ }),

/***/ "./hoc/withApollo.jsx":
/*!****************************!*\
  !*** ./hoc/withApollo.jsx ***!
  \****************************/
/*! exports provided: initOnContext, withApollo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initOnContext", function() { return initOnContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withApollo", function() { return withApollo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_apolloClient_apolloClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/apolloClient/apolloClient */ "./lib/apolloClient/apolloClient.js");
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\hoc\\withApollo.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





 // On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.

let globalApolloClient = null;
/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */

const initOnContext = ctx => {
  const inAppContext = Boolean(ctx.ctx); // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.

  if (true) {
    if (inAppContext) {
      console.warn('Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' + 'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n');
    }
  } // Initialize ApolloClient if not already done


  const apolloClient = ctx.apolloClient || initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx); // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.

  apolloClient.toJSON = () => null; // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.


  ctx.apolloClient = apolloClient;

  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */

const initApolloClient = (initialState, ctx) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (true) {
    return Object(_lib_apolloClient_apolloClient__WEBPACK_IMPORTED_MODULE_4__["default"])(initialState, ctx);
  } // Reuse client on the client-side


  if (!globalApolloClient) {
    globalApolloClient = Object(_lib_apolloClient_apolloClient__WEBPACK_IMPORTED_MODULE_4__["default"])(initialState, ctx);
  }

  return globalApolloClient;
};
/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */


const withApollo = ({
  ssr = false
} = {}) => PageComponent => {
  const WithApollo = (_ref) => {
    let {
      apolloClient,
      apolloState
    } = _ref,
        pageProps = _objectWithoutProperties(_ref, ["apolloClient", "apolloState"]);

    let client;

    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient;
    } else {
      // Happens on: next.js csr
      client = initApolloClient(apolloState, undefined);
    }

    return __jsx(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_3__["ApolloProvider"], {
      client: client,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 7
      }
    }, __jsx(PageComponent, _extends({}, pageProps, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }
    })));
  }; // Set the correct displayName in development


  if (true) {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const inAppContext = Boolean(ctx.ctx);
      const {
        apolloClient
      } = initOnContext(ctx); // Run wrapped getInitialProps methods

      let pageProps = {};

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      } else if (inAppContext) {
        pageProps = await next_app__WEBPACK_IMPORTED_MODULE_1___default.a.getInitialProps(ctx);
      } // Only on the server:


      if (true) {
        const {
          AppTree
        } = ctx; // When redirecting, the response is finished.
        // No point in continuing to render

        if (ctx.res && ctx.res.finished) {
          return pageProps;
        } // Only if dataFromTree is enabled


        if (ssr && AppTree) {
          try {
            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            const {
              getDataFromTree
            } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! @apollo/react-ssr */ "@apollo/react-ssr", 7)); // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.

            let props;

            if (inAppContext) {
              props = _objectSpread(_objectSpread({}, pageProps), {}, {
                apolloClient
              });
            } else {
              props = {
                pageProps: _objectSpread(_objectSpread({}, pageProps), {}, {
                  apolloClient
                })
              };
            } // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/


            await getDataFromTree(__jsx(AppTree, _extends({}, props, {
              __self: undefined,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 152,
                columnNumber: 35
              }
            })));
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          } // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually


          next_head__WEBPACK_IMPORTED_MODULE_2___default.a.rewind();
        }
      }

      return _objectSpread(_objectSpread({}, pageProps), {}, {
        // Extract query data from the Apollo store
        apolloState: apolloClient.cache.extract(),
        // Provide the client for ssr. As soon as this payload
        // gets JSON.stringified it will remove itself.
        apolloClient: ctx.apolloClient
      });
    };
  }

  return WithApollo;
};

/***/ }),

/***/ "./hooks/useCookieRedirection.js":
/*!***************************************!*\
  !*** ./hooks/useCookieRedirection.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-cookie */ "react-cookie");
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);




const useCookieRedirection = options => {
  const cookieKey = (options === null || options === void 0 ? void 0 : options.cookieKey) || 'redirect_url';
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const [cookies, setCookie, removeCookie] = Object(react_cookie__WEBPACK_IMPORTED_MODULE_1__["useCookies"])();
  const redirect = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    if ((cookies === null || cookies === void 0 ? void 0 : cookies[cookieKey]) && (cookies === null || cookies === void 0 ? void 0 : cookies[cookieKey]) != router.asPath) {
      router.push(cookies === null || cookies === void 0 ? void 0 : cookies[cookieKey]);
      removeCookie(cookieKey, {
        path: '/'
      });
    } else {
      router.push('/');
      removeCookie(cookieKey, {
        path: '/'
      });
    }
  }, [cookies, cookieKey, removeCookie, router]);
  return redirect;
};

/* harmony default export */ __webpack_exports__["default"] = (useCookieRedirection);

/***/ }),

/***/ "./hooks/useGraphQLErrorDisplay.js":
/*!*****************************************!*\
  !*** ./hooks/useGraphQLErrorDisplay.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! notistack */ "notistack");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_1__);



const useGraphQLErrorDisplay = error => {
  const scnackbar = Object(notistack__WEBPACK_IMPORTED_MODULE_1__["useSnackbar"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (error) {
      error.graphQLErrors.map(err => {
        scnackbar.enqueueSnackbar(err.message, {
          variant: 'error'
        });
      });
    }
  }, [error, scnackbar]);
};

/* harmony default export */ __webpack_exports__["default"] = (useGraphQLErrorDisplay);

/***/ }),

/***/ "./lib/apolloClient/apolloClient.js":
/*!******************************************!*\
  !*** ./lib/apolloClient/apolloClient.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createApolloClient; });
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-client */ "apollo-client");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-cache-inmemory */ "apollo-cache-inmemory");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-link-http */ "apollo-link-http");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_link_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // import { SchemaLink } from 'apollo-link-schema';
// import {schema} from 'lib/server/apolloServer/schema'

function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  const enchancedFetch = (url, init) => isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default()(url, _objectSpread(_objectSpread({}, init), {}, {
    headers: _objectSpread(_objectSpread({}, init.headers), {}, {
      Cookie: ctx.req.headers.cookie
    })
  })).then(response => {
    return response;
  });

  return new apollo_client__WEBPACK_IMPORTED_MODULE_0__["ApolloClient"]({
    ssrMode: Boolean(ctx),
    link: new apollo_link_http__WEBPACK_IMPORTED_MODULE_2__["HttpLink"]({
      uri: "http://localhost:8080/api/graphql",
      // Server URL (must be absolute)
      // uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
      credentials: "include",
      // Additional fetch() options like `credentials` or `headers`
      fetch: ctx ? enchancedFetch : isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default.a
    }),
    // link:new SchemaLink({schema}),
    cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_1__["InMemoryCache"]().restore(initialState)
  });
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _url = __webpack_require__(/*! url */ "url");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js"));

var _router2 = __webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js");

function isLocal(href) {
  const url = (0, _url.parse)(href, false, true);
  const origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  let lastHref = null;
  let lastAs = null;
  let lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    const result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

let cachedObserver;
const listeners = new Map();
const IntersectionObserver = false ? undefined : null;
const prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (cachedObserver) {
    return cachedObserver;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return cachedObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      const cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        cachedObserver.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

const listenToIntersections = (el, cb) => {
  const observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: (0, _router2.addBasePath)(formatUrl(href)),
        as: asHref ? (0, _router2.addBasePath)(formatUrl(asHref)) : asHref
      };
    });

    this.linkClicked = e => {
      const {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      let {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      const {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      let {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/vercel/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    const {
      pathname
    } = window.location;
    const {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    const resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      const isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    const paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (true) {
        // rethrow to show invalid URL errors
        throw err;
      }
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    let {
      children
    } = this.props;
    const {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = /*#__PURE__*/_react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    const child = _react.Children.only(children);

    const props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) {}

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  const warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  const PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  const exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      const value = props[propName];

      if (typeof value === 'string') {
        warn(`Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>`);
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "../next-server/lib/router-context");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error(`Error when running the Router event: ${eventField}`); // tslint:disable-next-line:no-console

          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = `withRouter(${name})`;
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.default = void 0;

var _url2 = __webpack_require__(/*! url */ "url");

var _mitt = _interopRequireDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _isDynamic = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

var _routeMatcher = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

var _routeRegex = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* global __NEXT_DATA__ */
// tslint:disable:no-console


const basePath =  false || '';

function addBasePath(path) {
  return path.indexOf(basePath) !== 0 ? basePath + path : path;
}

function delBasePath(path) {
  return path.indexOf(basePath) === 0 ? path.substr(basePath.length) || '/' : path;
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch((0, _utils.formatWithValidation)({
      pathname: addBasePath( // @ts-ignore __NEXT_DATA__
      `/_next/data/${__NEXT_DATA__.buildId}${delBasePath(pathname)}.json`),
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  constructor(_pathname, _query, _as2, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname,
          query
        }), (0, _utils.getURL)());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && (0, _url2.parse)(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/vercel/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute((0, _url2.parse)(asPath).pathname);
      return  false ? undefined : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = (0, _url2.parse)(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    (0, _isDynamic.isDynamicRoute)(_pathname) && __NEXT_DATA__.autoExport ? _pathname : _as2;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign({}, data, {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (_utils.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      let url = typeof _url === 'object' ? (0, _utils.formatWithValidation)(_url) : _url;
      let as = typeof _as === 'object' ? (0, _utils.formatWithValidation)(_as) : _as;
      url = addBasePath(url);
      as = addBasePath(as); // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, as, options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = (0, _url2.parse)(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/vercel/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if ((0, _isDynamic.isDynamicRoute)(route)) {
        const {
          pathname: asPathname
        } = (0, _url2.parse)(as);
        const routeRegex = (0, _routeRegex.getRouteRegex)(route);
        const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/vercel/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, as, options);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }

        this.set(route, pathname, query, as, routeInfo).then(() => {
          if (error) {
            Router.events.emit('routeChangeError', error, as);
            throw error;
          }

          Router.events.emit('routeChangeComplete', as);
          return resolve(true);
        });
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolveRouteInfo => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolveRouteInfo(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolveRouteInfo(routeInfo);
            });
          });
        }).catch(routeInfoErr => handleError(routeInfoErr, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = (0, _url2.parse)(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/vercel/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      }

      const route = delBasePath(toRoute(pathname));
      Promise.all([this.pageLoader.prefetchData(url, delBasePath(asPath)), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    route = delBasePath(route);
    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    return this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = escapeRegex(normalizedRoute.replace(/\/$/, '') || '/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isOptional = /^\\\[.*\\\]$/.test($1);

    if (isOptional) {
      $1 = $1.slice(2, -2);
    }

    const isCatchAll = /^(\\\.){3}/.test($1);

    if (isCatchAll) {
      $1 = $1.slice(6);
    }

    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll,
      optional: isOptional
    };
    return isCatchAll ? isOptional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
  });
  let namedParameterizedRoute; // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    namedParameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
      const isCatchAll = /^(\\\.){3}/.test($1);
      const key = $1 // Un-escape key
      .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '');
      return isCatchAll ? `/(?<${escapeRegex(key)}>.+?)` : `/(?<${escapeRegex(key)}>[^/]+?)`;
    });
  }

  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups,
    namedRegex: namedParameterizedRoute ? `^${namedParameterizedRoute}(?:/)?$` : undefined
  };
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _url = __webpack_require__(/*! url */ "url");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (true) {
    var _App$prototype;

    if ((_App$prototype = App.prototype) === null || _App$prototype === void 0 ? void 0 : _App$prototype.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/vercel/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/vercel/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return (0, _url.format)(url, options);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.AppInitialProps = _utils.AppInitialProps;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps({
  Component,
  ctx
}) {
  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    const {
      router,
      Component,
      pageProps,
      __N_SSG,
      __N_SSP
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
    // methods like getStaticProps and getServerSideProps
    !(__N_SSG || __N_SSP) ? {
      url: createUrl(router)
    } : {}));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
let warnContainer;
let warnUrl;

if (true) {
  warnContainer = (0, _utils.execOnce)(() => {
    console.warn(`Warning: the \`Container\` in \`_app\` has been deprecated and should be removed. https://err.sh/vercel/next.js/app-container-deprecated`);
  });
  warnUrl = (0, _utils.execOnce)(() => {
    console.error(`Warning: the 'url' property is deprecated. https://err.sh/vercel/next.js/url-deprecated`);
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  const {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (true) warnUrl();
      return query;
    },

    get pathname() {
      if (true) warnUrl();
      return pathname;
    },

    get asPath() {
      if (true) warnUrl();
      return asPath;
    },

    back: () => {
      if (true) warnUrl();
      router.back();
    },
    push: (url, as) => {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (true) warnUrl();
      const pushRoute = as ? href : '';
      const pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (true) warnUrl();
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./pages/signin.jsx":
/*!**************************!*\
  !*** ./pages/signin.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hoc_withApollo_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hoc/withApollo.jsx */ "./hoc/withApollo.jsx");
/* harmony import */ var containers_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! containers/layouts/AppLayout */ "./containers/layouts/AppLayout.jsx");
/* harmony import */ var context_session_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! context/session/session */ "./context/session/session.js");
/* harmony import */ var containers_fallbacks_FallbackAlreadyConnected__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! containers/fallbacks/FallbackAlreadyConnected */ "./containers/fallbacks/FallbackAlreadyConnected.jsx");
/* harmony import */ var containers_forms_SigninForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! containers/forms/SigninForm */ "./containers/forms/SigninForm.tsx");
var _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\pages\\signin.jsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const SignIn = () => {
  const user = Object(context_session_session__WEBPACK_IMPORTED_MODULE_3__["useSessionState"])();
  if (user) return __jsx(containers_fallbacks_FallbackAlreadyConnected__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 19
    }
  });
  return __jsx(containers_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  }, __jsx(containers_forms_SigninForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(hoc_withApollo_jsx__WEBPACK_IMPORTED_MODULE_1__["withApollo"])()(SignIn));

/***/ }),

/***/ "./utils/omitTypename.js":
/*!*******************************!*\
  !*** ./utils/omitTypename.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const omitTypename = object => {
  const omitTypename = (key, value) => key === '__typename' ? undefined : value;

  return JSON.parse(JSON.stringify(object), omitTypename);
};

/* harmony default export */ __webpack_exports__["default"] = (omitTypename);

/***/ }),

/***/ "./utils/validateEmailFormat.tsx":
/*!***************************************!*\
  !*** ./utils/validateEmailFormat.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*eslint no-useless-escape: 0*/
const validateEmailFormat = email => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

/* harmony default export */ __webpack_exports__["default"] = (validateEmailFormat); // const validateEmailFormat = (email ) => {
//     const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     return re.test(String(email).toLowerCase());
// };
// export default validateEmailFormat

/***/ }),

/***/ "./utils/validatePasswordFormat.tsx":
/*!******************************************!*\
  !*** ./utils/validatePasswordFormat.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! password-validator */ "password-validator");
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(password_validator__WEBPACK_IMPORTED_MODULE_0__);


const validatePasswordFormat = password => {
  let passwordToValidate = !password ? ' ' : password;
  var schema = new password_validator__WEBPACK_IMPORTED_MODULE_0___default.a();
  schema.is().min(8).is().max(15).has().uppercase().has().lowercase().has().digits().has().symbols().has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123']);
  const result = schema.validate(passwordToValidate, {
    list: true
  });

  if (typeof result === "boolean") {
    throw new Error("schema validate returned a boolean instead of a string array");
  }

  return result;
};

/* harmony default export */ __webpack_exports__["default"] = (validatePasswordFormat); // const validatePasswordFormat = (password ) => {
//     let passwordToValidate =(!password) ? ' ' : password
//     var schema = new passwordValidator();
//     schema
//     .is().min(8)                                    
//     .is().max(15)                                  
//     .has().uppercase()                              
//     .has().lowercase()                             
//     .has().digits()                                
//     .has().symbols()                          
//     .has().not().spaces()                           
//     .is().not().oneOf(['Passw0rd', 'Password123']); 
//     return schema.validate(passwordToValidate,{ list: true })
// }
// export default validatePasswordFormat

/***/ }),

/***/ 5:
/*!********************************!*\
  !*** multi ./pages/signin.jsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\skaPy\IdeaProjects\Next.js-boilerplate\oozie-client\pages\signin.jsx */"./pages/signin.jsx");


/***/ }),

/***/ "@apollo/react-hooks":
/*!**************************************!*\
  !*** external "@apollo/react-hooks" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/react-hooks");

/***/ }),

/***/ "@apollo/react-ssr":
/*!************************************!*\
  !*** external "@apollo/react-ssr" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/react-ssr");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/AppBar":
/*!*******************************************!*\
  !*** external "@material-ui/core/AppBar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),

/***/ "@material-ui/core/Link":
/*!*****************************************!*\
  !*** external "@material-ui/core/Link" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Link");

/***/ }),

/***/ "@material-ui/core/Toolbar":
/*!********************************************!*\
  !*** external "@material-ui/core/Toolbar" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/icons/LockOutlined":
/*!**************************************************!*\
  !*** external "@material-ui/icons/LockOutlined" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LockOutlined");

/***/ }),

/***/ "apollo-cache-inmemory":
/*!****************************************!*\
  !*** external "apollo-cache-inmemory" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-cache-inmemory");

/***/ }),

/***/ "apollo-client":
/*!********************************!*\
  !*** external "apollo-client" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),

/***/ "apollo-link-http":
/*!***********************************!*\
  !*** external "apollo-link-http" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-link-http");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("clsx");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "notistack":
/*!****************************!*\
  !*** external "notistack" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("notistack");

/***/ }),

/***/ "password-validator":
/*!*************************************!*\
  !*** external "password-validator" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("password-validator");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-cookie":
/*!*******************************!*\
  !*** external "react-cookie" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-cookie");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xpbmsuanN4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvYnV0dG9ucy9DbGFzc2ljQnV0dG9uLmpzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NvbnRyb2xsZXJzL0Zvcm1Db250cm9sbGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9jb250YWluZXJzL2ZhbGxiYWNrcy9GYWxsYmFja0FscmVhZHlDb25uZWN0ZWQuanN4Iiwid2VicGFjazovLy8uL2NvbnRhaW5lcnMvZm9ybXMvU2lnbmluRm9ybS50c3giLCJ3ZWJwYWNrOi8vLy4vY29udGFpbmVycy9sYXlvdXRzL0FwcENvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vY29udGFpbmVycy9sYXlvdXRzL0FwcExheW91dC5qc3giLCJ3ZWJwYWNrOi8vLy4vY29udGFpbmVycy9sYXlvdXRzL05hdkJhci5qc3giLCJ3ZWJwYWNrOi8vLy4vY29udGV4dC9zZXNzaW9uL3Nlc3Npb24uanMiLCJ3ZWJwYWNrOi8vLy4vaG9jL3dpdGhBcG9sbG8uanN4Iiwid2VicGFjazovLy8uL2hvb2tzL3VzZUNvb2tpZVJlZGlyZWN0aW9uLmpzIiwid2VicGFjazovLy8uL2hvb2tzL3VzZUdyYXBoUUxFcnJvckRpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2Fwb2xsb0NsaWVudC9hcG9sbG9DbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZXh0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vY2xpZW50L2xpbmsudHN4Iiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvcm91dGVyLnRzIiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvd2l0aC1yb3V0ZXIudHN4Iiwid2VicGFjazovLy8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvbWl0dC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvaXMtZHluYW1pYy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9yb3V0ZS1tYXRjaGVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3JvdXRlLXJlZ2V4LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9uZXh0LXNlcnZlci9saWIvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZXh0L2xpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvc2lnbmluLmpzeCIsIndlYnBhY2s6Ly8vLi91dGlscy9vbWl0VHlwZW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvdmFsaWRhdGVFbWFpbEZvcm1hdC50c3giLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvdmFsaWRhdGVQYXNzd29yZEZvcm1hdC50c3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFwb2xsby9yZWFjdC1ob29rc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBhcG9sbG8vcmVhY3Qtc3NyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG1hdGVyaWFsLXVpL2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvY29yZS9MaW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG1hdGVyaWFsLXVpL2NvcmUvVG9vbGJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvaWNvbnMvTG9ja091dGxpbmVkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLWNhY2hlLWlubWVtb3J5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLWNsaWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1saW5rLWh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbHN4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ3JhcGhxbC10YWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpc29tb3JwaGljLXVuZmV0Y2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vdGlzdGFja1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3N3b3JkLXZhbGlkYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcm9wLXR5cGVzLWV4YWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1jb29raWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1pc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIl0sIm5hbWVzIjpbIk5leHRDb21wb3NlZCIsIlJlYWN0IiwiZm9yd2FyZFJlZiIsInByb3BzIiwicmVmIiwiYXMiLCJocmVmIiwib3RoZXIiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJvYmplY3QiLCJwcmVmZXRjaCIsImJvb2wiLCJMaW5rIiwiYWN0aXZlQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiY2xhc3NOYW1lUHJvcHMiLCJpbm5lclJlZiIsIm5ha2VkIiwicm91dGVyIiwidXNlUm91dGVyIiwicGF0aG5hbWUiLCJjbHN4IiwiZnVuYyIsIm9uQ2xpY2siLCJDbGFzc2ljQnV0dG9uIiwic3R5bGVkIiwiQnV0dG9uIiwidGV4dFRyYW5zZm9ybSIsImJhY2tncm91bmQiLCJjb2xvciIsImJvcmRlclJhZGl1cyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luQm90dG9tIiwiVmFsaWRhdGlvblJ1bGVUeXBlIiwid2l0aE11dGF0aW9uIiwiRm9ybUNvbXBvbmVudCIsImZvcm1WYWx1ZXMiLCJzZXRGb3JtVmFsdWUiLCJxdWVyeU9wdGlvbnMiLCJzZXRJbml0aWFsRm9ybVZhbHVlcyIsInNjbmFja2JhciIsInVzZVNuYWNrYmFyIiwidXBkYXRlIiwiZGF0YSIsImxvYWRpbmciLCJlcnJvciIsInVzZU11dGF0aW9uIiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJzdWJtaXRIYW5kbGVyIiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJuZXh0IiwibXV0YXRpb25SZXN1bHRDb250cm9sIiwicmVzdWx0TGFiZWwiLCJvbWl0VHlwZW5hbWUiLCJzbmFja2JhclN1Y2NlZWRNZXNzYWdlIiwiZW5xdWV1ZVNuYWNrYmFyIiwiYWZ0ZXJSZXN1bHRDb250cm9sQ2FsbGJhY2siLCJjbGVhckZvcm12YWx1ZXNBZnRlckNvbnRyb2wiLCJrZXlzIiwiT2JqZWN0IiwiZm9ybVZhbHVlc1RlbXAiLCJmb3JFYWNoIiwia2V5IiwiRXJyb3IiLCJGb3JtQ29udHJvbGxlciIsIm90aGVycHJvcHMiLCJpbml0VmFsdWVzIiwicmVuZGVyIiwid2l0aFF1ZXJ5IiwidmFsaWRhdGlvblJ1bGVzIiwidXNlU3RhdGUiLCJpbml0aWFsRm9ybVZhbHVlcyIsInZhbGlkYXRpb25SZXN1bHQiLCJzZXRWYWxpZGF0aW9uUmVzdWx0IiwiZm9ybUNoYW5nZUhhbmRsZXIiLCJlIiwicnVsZSIsInRhcmdldCIsIm5hbWUiLCJvbmx5IiwidHlwZSIsImlzbnVtIiwidGVzdCIsInZhbHVlIiwiaXNjaGFyIiwiaXNNb2RpZmllZCIsInVzZU1lbW8iLCJKU09OIiwic3RyaW5naWZ5IiwiY2xlYXJGb3JtdmFsdWVzIiwidmFsaWRhdGlvblJlc3VsdFRlbXAiLCJnbG9iYWwiLCJyZXN1bHQiLCJmaWVsZCIsInBhc3N3b3JkIiwidmFsaWRhdGVQYXNzd29yZEZvcm1hdCIsImxlbmd0aCIsIm5ld0tleVZhbHVlIiwiY29uY2F0IiwiZXF1YWxUbyIsInJlcXVpcmVkIiwiZW1haWwiLCJ2YWxpZGF0ZUVtYWlsRm9ybWF0Iiwid2l0aE11dGF0aW9uUHJvcHMiLCJyZW5kZXJQcm9wcyIsIkZhbGxiYWNrQWxyZWFkeUNvbm5lY3RlZCIsInVzZVN0eWxlcyIsIm1ha2VTdHlsZXMiLCJ0aGVtZSIsInBhcGVyIiwibWFyZ2luVG9wIiwic3BhY2luZyIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImF2YXRhciIsIm1hcmdpbiIsImJhY2tncm91bmRDb2xvciIsInBhbGV0dGUiLCJzZWNvbmRhcnkiLCJtYWluIiwiYm94Iiwid2lkdGgiLCJzdWJtaXQiLCJTSUdOSU4iLCJncWwiLCJTaWduaW5Gb3JtIiwiRm9ybSIsInNpZ25pbiIsInVzZUdyYXBoUUxFcnJvckRpc3BsYXkiLCJzdHlsZXMiLCJjaGVja0JveENoZWNrZWQiLCJzZXRDaGVja0JveENoZWNrZWQiLCJzZXNzaW9uRGlzcGF0Y2giLCJ1c2VTZXNzaW9uRGlzcGF0Y2giLCJyZWRpcmVjdCIsInVzZUNvb2tpZVJlZGlyZWN0aW9uIiwiY2hlY2tCb3hDaGFuZ2VIYW5kbGVyIiwiY2hlY2tlZCIsInN1Ym1pdEhhbmRsZXIyIiwicGVyc2lzdGVudENvbm5lY3Rpb24iLCJsb2dpbiIsImlkIiwicGF5bG9hZCIsIndpdGhBcG9sbG8iLCJ3aXRoTWF4V2lkdGgiLCJtYXhXaWR0aCIsIm5vTWF4V2lkdGgiLCJBcHBDb250YWluZXIiLCJjaGlsZHJlbiIsInJvb3QiLCJBcHBMYXlvdXQiLCJuYXZiYXIiLCJib3hTaGFkb3ciLCJidXR0b250ZXN0IiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwicG9wb3ZlclBhcGVyIiwibGlzdEl0ZW1UeXBvIiwiZm9udFdlaWdodCIsIlNJR05PVVQiLCJOYXZCYXIiLCJ1c2VyIiwidXNlU2Vzc2lvblN0YXRlIiwiY29va2llcyIsInNldENvb2tpZSIsInJlbW92ZUNvb2tpZSIsInVzZUNvb2tpZXMiLCJzaWdub3V0IiwidXNlVGhlbWUiLCJzaWdub3V0SGFuZGxlciIsInNpZ25pbkNsaWNrSGFuZGxlciIsImFzUGF0aCIsInBhdGgiLCJsb2dvdXQiLCJhbmNob3JFbCIsInNldEFuY2hvckVsIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJoYW5kbGVDbG9zZSIsIm9wZW4iLCJCb29sZWFuIiwidmVydGljYWwiLCJob3Jpem9udGFsIiwiRmFkZSIsIlNlc3Npb25TdGF0ZUNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiU2Vzc2lvbkRpc3BhdGNoQ29udGV4dCIsImF1dGhSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJTZXNzaW9uUHJvdmlkZXIiLCJpbml0IiwiZGlzcGF0Y2giLCJ1c2VSZWR1Y2VyIiwiY29udGV4dCIsInVzZUNvbnRleHQiLCJ1bmRlZmluZWQiLCJnbG9iYWxBcG9sbG9DbGllbnQiLCJpbml0T25Db250ZXh0IiwiY3R4IiwiaW5BcHBDb250ZXh0IiwiY29uc29sZSIsIndhcm4iLCJhcG9sbG9DbGllbnQiLCJpbml0QXBvbGxvQ2xpZW50IiwiYXBvbGxvU3RhdGUiLCJ0b0pTT04iLCJpbml0aWFsU3RhdGUiLCJjcmVhdGVBcG9sbG9DbGllbnQiLCJzc3IiLCJQYWdlQ29tcG9uZW50IiwiV2l0aEFwb2xsbyIsInBhZ2VQcm9wcyIsImNsaWVudCIsImRpc3BsYXlOYW1lIiwiZ2V0SW5pdGlhbFByb3BzIiwiQXBwIiwiQXBwVHJlZSIsInJlcyIsImZpbmlzaGVkIiwiZ2V0RGF0YUZyb21UcmVlIiwiSGVhZCIsInJld2luZCIsImNhY2hlIiwiZXh0cmFjdCIsIm9wdGlvbnMiLCJjb29raWVLZXkiLCJwdXNoIiwiZ3JhcGhRTEVycm9ycyIsIm1hcCIsImVyciIsIm1lc3NhZ2UiLCJ2YXJpYW50IiwiZW5jaGFuY2VkRmV0Y2giLCJ1cmwiLCJmZXRjaCIsImhlYWRlcnMiLCJDb29raWUiLCJyZXEiLCJjb29raWUiLCJ0aGVuIiwicmVzcG9uc2UiLCJBcG9sbG9DbGllbnQiLCJzc3JNb2RlIiwibGluayIsIkh0dHBMaW5rIiwidXJpIiwiY3JlZGVudGlhbHMiLCJJbk1lbW9yeUNhY2hlIiwicmVzdG9yZSIsIm9yaWdpbiIsImxhc3RIcmVmIiwibGFzdEFzIiwibGFzdFJlc3VsdCIsImZvcm1hdEZ1bmMiLCJsaXN0ZW5lcnMiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIndpbmRvdyIsInByZWZldGNoZWQiLCJjYWNoZWRPYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImNiIiwicm9vdE1hcmdpbiIsImxpc3RlblRvSW50ZXJzZWN0aW9ucyIsIm9ic2VydmVyIiwiZ2V0T2JzZXJ2ZXIiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInAiLCJtZW1vaXplZEZvcm1hdFVybCIsImZvcm1hdFVybCIsImFzSHJlZiIsIm5vZGVOYW1lIiwiaXNMb2NhbCIsInNjcm9sbCIsIlJvdXRlciIsInNoYWxsb3ciLCJzdWNjZXNzIiwiZG9jdW1lbnQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImdldFBhdGhzIiwicmVzb2x2ZWRIcmVmIiwicGFyc2VkQXMiLCJoYW5kbGVSZWYiLCJpc1ByZWZldGNoZWQiLCJwYXRocyIsImNoaWxkIiwiQ2hpbGRyZW4iLCJlbCIsIm9uTW91c2VFbnRlciIsInByaW9yaXR5IiwicHJvY2VzcyIsInJlcXVpcmUiLCJleGFjdCIsInJlcGxhY2UiLCJwYXNzSHJlZiIsInNpbmdsZXRvblJvdXRlciIsInJlYWR5Q2FsbGJhY2tzIiwicmVhZHkiLCJ1cmxQcm9wZXJ0eUZpZWxkcyIsInJvdXRlckV2ZW50cyIsImNvcmVNZXRob2RGaWVsZHMiLCJnZXQiLCJnZXRSb3V0ZXIiLCJldmVudEZpZWxkIiwiX3NpbmdsZXRvblJvdXRlciIsInN0YWNrIiwiUm91dGVyQ29udGV4dCIsImNyZWF0ZVJvdXRlciIsIl9yb3V0ZXIiLCJpbnN0YW5jZSIsIkNvbXBvc2VkQ29tcG9uZW50IiwiV2l0aFJvdXRlcldyYXBwZXIiLCJhbGwiLCJvbiIsIm9mZiIsImVtaXQiLCJoYW5kbGVyIiwiYmFzZVBhdGgiLCJwcmVwYXJlUm91dGUiLCJ0b1JvdXRlIiwiYXR0ZW1wdHMiLCJpc1NlcnZlclJlbmRlciIsImFkZEJhc2VQYXRoIiwiX19ORVhUX0RBVEFfXyIsImJ1aWxkSWQiLCJkZWxCYXNlUGF0aCIsImdldFJlc3BvbnNlIiwicm91dGUiLCJjb21wb25lbnRzIiwic2RjIiwic3ViIiwiY2xjIiwicGFnZUxvYWRlciIsIl9icHMiLCJldmVudHMiLCJfd3JhcEFwcCIsImlzU3NyIiwiaXNGYWxsYmFjayIsIlByb21pc2UiLCJmZXRjaE5leHREYXRhIiwiX19OX1NTRyIsImluaXRpYWxQcm9wcyIsIl9fTl9TU1AiLCJtb2QiLCJuZXdEYXRhIiwicmVsb2FkIiwiYmFjayIsImNoYW5nZSIsIlNUIiwicGVyZm9ybWFuY2UiLCJyZXNvbHZlIiwibWV0aG9kIiwicm91dGVSZWdleCIsInJvdXRlTWF0Y2giLCJtaXNzaW5nUGFyYW1zIiwicGFyYW0iLCJyZWplY3QiLCJhc1BhdGhuYW1lIiwicm91dGVJbmZvIiwiYXBwQ29tcCIsImNoYW5nZVN0YXRlIiwiZ2V0Um91dGVJbmZvIiwiY2FjaGVkUm91dGVJbmZvIiwiaGFuZGxlRXJyb3IiLCJwYWdlIiwicmVzb2x2ZVJvdXRlSW5mbyIsImdpcEVyciIsInJvdXRlSW5mb0VyciIsImlzVmFsaWRFbGVtZW50VHlwZSIsInNldCIsImJlZm9yZVBvcFN0YXRlIiwib25seUFIYXNoQ2hhbmdlIiwibmV3SGFzaCIsIm9sZFVybE5vSGFzaCIsIm9sZEhhc2giLCJzY3JvbGxUb0hhc2giLCJoYXNoIiwiaWRFbCIsIm5hbWVFbCIsInVybElzTmV3IiwiY2FuY2VsbGVkIiwiY2FuY2VsIiwiY29tcG9uZW50UmVzdWx0IiwiX2dldERhdGEiLCJmbiIsImFib3J0Q29tcG9uZW50TG9hZCIsIm5vdGlmeSIsIlRFU1RfUk9VVEUiLCJyZSIsImRlY29kZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcmFtcyIsInNsdWdOYW1lIiwiZyIsImdyb3VwcyIsIm0iLCJzdHIiLCJlc2NhcGVkUm91dGUiLCJlc2NhcGVSZWdleCIsIm5vcm1hbGl6ZWRSb3V0ZSIsImdyb3VwSW5kZXgiLCJwYXJhbWV0ZXJpemVkUm91dGUiLCJpc09wdGlvbmFsIiwiJDEiLCJpc0NhdGNoQWxsIiwicG9zIiwicmVwZWF0Iiwib3B0aW9uYWwiLCJuYW1lZFBhcmFtZXRlcml6ZWRSb3V0ZSIsIm5hbWVkUmVnZXgiLCJ1c2VkIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInBvcnQiLCJnZXRMb2NhdGlvbk9yaWdpbiIsImdldERpc3BsYXlOYW1lIiwibG9hZEdldEluaXRpYWxQcm9wcyIsImlzUmVzU2VudCIsInVybE9iamVjdEtleXMiLCJTUCIsImNvbXBvbmVudERpZENhdGNoIiwiY3JlYXRlVXJsIiwib3JpZ0dldEluaXRpYWxQcm9wcyIsImFwcEdldEluaXRpYWxQcm9wcyIsIndhcm5Db250YWluZXIiLCJ3YXJuVXJsIiwicHVzaFRvIiwicHVzaFJvdXRlIiwicHVzaFVybCIsInJlcGxhY2VUbyIsInJlcGxhY2VSb3V0ZSIsInJlcGxhY2VVcmwiLCJTaWduSW4iLCJwYXJzZSIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwicGFzc3dvcmRUb1ZhbGlkYXRlIiwic2NoZW1hIiwicGFzc3dvcmRWYWxpZGF0b3IiLCJpcyIsIm1pbiIsIm1heCIsImhhcyIsInVwcGVyY2FzZSIsImxvd2VyY2FzZSIsImRpZ2l0cyIsInN5bWJvbHMiLCJub3QiLCJzcGFjZXMiLCJvbmVPZiIsInZhbGlkYXRlIiwibGlzdCJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLGNBQWM7UUFDZCxJQUFJO1FBQ0o7OztRQUdB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QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUEsd0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERBLGdEOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHFEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLHNEOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLHFEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6InN0YXRpY1xcZGV2ZWxvcG1lbnRcXHBhZ2VzXFxzaWduaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJzdGF0aWNcXFxcZGV2ZWxvcG1lbnRcXFxccGFnZXNcXFxcc2lnbmluLmpzXCI6IDBcbiBcdH07XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gdW5jYXVnaHQgZXJyb3IgaGFuZGxlciBmb3Igd2VicGFjayBydW50aW1lXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7XG4gXHRcdHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gXHRcdFx0dGhyb3cgZXJyOyAvLyBjYXRjaCB0aGlzIGVycm9yIGJ5IHVzaW5nIGltcG9ydCgpLmNhdGNoKClcbiBcdFx0fSk7XG4gXHR9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvdXRpbHMuanNcIik7IiwiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvYW5jaG9yLWhhcy1jb250ZW50ICovXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCJcclxuaW1wb3J0IGNsc3ggZnJvbSBcImNsc3hcIlxyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIlxyXG5pbXBvcnQgTmV4dExpbmsgZnJvbSBcIm5leHQvbGlua1wiXHJcbmltcG9ydCBNdWlMaW5rIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaW5rXCJcclxuXHJcbmNvbnN0IE5leHRDb21wb3NlZCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gTmV4dENvbXBvc2VkKHByb3BzLCByZWYpIHtcclxuICBjb25zdCB7IGFzLCBocmVmLCAuLi5vdGhlciB9ID0gcHJvcHNcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxOZXh0TGluayBocmVmPXtocmVmfSBhcz17YXN9PlxyXG4gICAgICA8YSByZWY9e3JlZn0gey4uLm90aGVyfSAvPlxyXG4gICAgPC9OZXh0TGluaz5cclxuICApXHJcbn0pXHJcblxyXG5OZXh0Q29tcG9zZWQucHJvcFR5cGVzID0ge1xyXG4gIGFzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSksXHJcbiAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pLFxyXG4gIHByZWZldGNoOiBQcm9wVHlwZXMuYm9vbCxcclxufVxyXG5cclxuLy8gQSBzdHlsZWQgdmVyc2lvbiBvZiB0aGUgTmV4dC5qcyBMaW5rIGNvbXBvbmVudDpcclxuLy8gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvI3dpdGgtbGlua1xyXG5mdW5jdGlvbiBMaW5rKHByb3BzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgaHJlZixcclxuICAgIGFjdGl2ZUNsYXNzTmFtZSA9IFwiYWN0aXZlXCIsXHJcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVByb3BzLFxyXG4gICAgaW5uZXJSZWYsXHJcbiAgICBuYWtlZCxcclxuICAgIC4uLm90aGVyXHJcbiAgfSA9IHByb3BzXHJcblxyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXHJcbiAgY29uc3QgcGF0aG5hbWUgPSB0eXBlb2YgaHJlZiA9PT0gXCJzdHJpbmdcIiA/IGhyZWYgOiBocmVmLnBhdGhuYW1lXHJcbiAgY29uc3QgY2xhc3NOYW1lID0gY2xzeChjbGFzc05hbWVQcm9wcywge1xyXG4gICAgW2FjdGl2ZUNsYXNzTmFtZV06IHJvdXRlci5wYXRobmFtZSA9PT0gcGF0aG5hbWUgJiYgYWN0aXZlQ2xhc3NOYW1lLFxyXG4gIH0pXHJcblxyXG4gIGlmIChuYWtlZCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPE5leHRDb21wb3NlZFxyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICAgIHJlZj17aW5uZXJSZWZ9XHJcbiAgICAgICAgaHJlZj17aHJlZn1cclxuICAgICAgICB7Li4ub3RoZXJ9XHJcbiAgICAgIC8+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPE11aUxpbmtcclxuICAgICAgY29tcG9uZW50PXtOZXh0Q29tcG9zZWR9XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICByZWY9e2lubmVyUmVmfVxyXG4gICAgICBocmVmPXtocmVmfVxyXG4gICAgICB7Li4ub3RoZXJ9XHJcbiAgICAvPlxyXG4gIClcclxufVxyXG5cclxuTGluay5wcm9wVHlwZXMgPSB7XHJcbiAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGFzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSksXHJcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKSxcclxuICBpbm5lclJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5vYmplY3RdKSxcclxuICBuYWtlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgcHJlZmV0Y2g6IFByb3BUeXBlcy5ib29sLFxyXG59XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiAoXHJcbi8vICAgPExpbmsgey4uLnByb3BzfSBpbm5lclJlZj17cmVmfSAvPlxyXG4vLyApKVxyXG5leHBvcnQgZGVmYXVsdCBMaW5rXHJcbiIsImltcG9ydCB7IEJ1dHRvbix3aXRoU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlXCJcclxuaW1wb3J0IHsgc3R5bGVkLCBtYWtlU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcclxuaW1wb3J0IGNsc3ggZnJvbSAnY2xzeCdcclxuXHJcbmNvbnN0IENsYXNzaWNCdXR0b24gPSBzdHlsZWQoQnV0dG9uKSh7XHJcbiAgICAvLyB3aWR0aDonMTAwJScsXHJcbiAgICB0ZXh0VHJhbnNmb3JtOidub25lJyxcclxuICAgIGJhY2tncm91bmQ6JyMyNUFBQTQnLFxyXG4gICAgY29sb3I6J3doaXRlJyxcclxuICAgIGJvcmRlclJhZGl1czonOHB4JyxcclxuICAgIHBhZGRpbmdUb3A6JzEycHgnLFxyXG4gICAgcGFkZGluZ0JvdHRvbTonMTJweCcsXHJcbiAgICBtYXJnaW5Cb3R0b206JzE2cHgnLFxyXG4gICAgJyY6aG92ZXInOiB7XHJcbiAgICAgICAgYmFja2dyb3VuZDonIzI1QUFBNCcsXHJcbiAgICB9LFxyXG4gICAgJyYuTXVpLWRpc2FibGVkJyA6IHtcclxuICAgICAgICBiYWNrZ3JvdW5kOicjRTBFMEUwJyxcclxuICAgIH1cclxufSlcclxuXHJcbi8vIGNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoKHRoZW1lKSA9PiAoe1xyXG4vLyAgICAgcm9vdCA6IHtcclxuLy8gICAgICAgICAvLyB3aWR0aDonMTAwJScsXHJcbi8vICAgICAgICAgdGV4dFRyYW5zZm9ybTonbm9uZScsXHJcbi8vICAgICAgICAgYmFja2dyb3VuZDonIzI1QUFBNCcsXHJcbi8vICAgICAgICAgY29sb3I6J3doaXRlJyxcclxuLy8gICAgICAgICBib3JkZXJSYWRpdXM6JzhweCcsXHJcbi8vICAgICAgICAgcGFkZGluZ1RvcDonMTJweCcsXHJcbi8vICAgICAgICAgcGFkZGluZ0JvdHRvbTonMTJweCcsXHJcbi8vICAgICAgICAgbWFyZ2luQm90dG9tOicxNnB4JyxcclxuLy8gICAgICAgICAnJjpob3Zlcic6IHtcclxuLy8gICAgICAgICAgICAgYmFja2dyb3VuZDonIzI1QUFBNCcsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9KSlcclxuXHJcbi8vIGNvbnN0IENsYXNzaWNCdXR0b24gPSAoe2NoaWxkcmVuLCBjbGFzc05hbWUsLi4ucHJvcHN9KSA9PiB7XHJcblxyXG4vLyAgICAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzKClcclxuXHJcbi8vICAgICByZXR1cm4gKFxyXG4vLyAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPXtjbHN4KGNsYXNzTmFtZSxzdHlsZXMucm9vdCl9IHsuLi5wcm9wc30+XHJcbi8vICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuLy8gICAgICAgICA8L0J1dHRvbj5cclxuLy8gICAgIClcclxuLy8gfVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENsYXNzaWNCdXR0b24iLCJpbXBvcnQgUmVhY3QsIHsgQ2hhbmdlRXZlbnQgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7IHVzZU11dGF0aW9uIH0gZnJvbSBcIkBhcG9sbG8vcmVhY3QtaG9va3NcIlxyXG5pbXBvcnQgeyB1c2VTbmFja2JhciB9IGZyb20gXCJub3Rpc3RhY2tcIlxyXG5pbXBvcnQgb21pdFR5cGVuYW1lIGZyb20gXCJ1dGlscy9vbWl0VHlwZW5hbWVcIlxyXG5pbXBvcnQgdmFsaWRhdGVFbWFpbEZvcm1hdCBmcm9tIFwidXRpbHMvdmFsaWRhdGVFbWFpbEZvcm1hdFwiXHJcbmltcG9ydCB2YWxpZGF0ZVBhc3N3b3JkRm9ybWF0IGZyb20gXCJ1dGlscy92YWxpZGF0ZVBhc3N3b3JkRm9ybWF0XCJcclxuaW1wb3J0IHsgRG9jdW1lbnROb2RlIH0gZnJvbSBcImdyYXBocWxcIlxyXG5cclxudHlwZSBGb3JtVmFsdWVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfVxyXG5cclxuZXhwb3J0IHR5cGUgUXVlcnlPcHRpb25zID0ge1xyXG4gIHF1ZXJ5OiBEb2N1bWVudE5vZGVcclxuICByZXN1bHRMYWJlbDogc3RyaW5nXHJcbiAgbXV0YXRpb25SZXN1bHRDb250cm9sPzpcclxuICAgIHwgKChmb3JtVmFsdWVzOiBGb3JtVmFsdWVzLCBkYXRhOiBhbnksIGVycm9yOiBhbnkpID0+IGJvb2xlYW4pXHJcbiAgICB8IFwiYnVpbHRpblwiXHJcbiAgY2xlYXJGb3JtdmFsdWVzQWZ0ZXJDb250cm9sPzogYm9vbGVhblxyXG4gIGFmdGVyUmVzdWx0Q29udHJvbENhbGxiYWNrPzogKFxyXG4gICAgZm9ybVZhbHVlczogRm9ybVZhbHVlcyxcclxuICAgIGRhdGE6IGFueSxcclxuICAgIGVycm9yOiBhbnlcclxuICApID0+IHZvaWRcclxuICBzbmFja2JhclN1Y2NlZWRNZXNzYWdlPzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZhbGlkYXRpb25SdWxlVHlwZSB7XHJcbiAgcGFzc3dvcmQgPSBcInBhc3N3b3JkXCIsXHJcbiAgZXF1YWxUbyA9IFwiZXF1YWxUb1wiLFxyXG4gIHJlcXVpcmVkID0gXCJyZXF1aXJlZFwiLFxyXG4gIGVtYWlsID0gXCJlbWFpbFwiLFxyXG4gIG9ubHkgPSBcIm9ubHlcIixcclxufVxyXG5cclxudHlwZSBSdWxlID1cclxuICB8IHtcclxuICAgICAgcnVsZTogVmFsaWRhdGlvblJ1bGVUeXBlLnBhc3N3b3JkXHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHJ1bGU6IFZhbGlkYXRpb25SdWxlVHlwZS5lcXVhbFRvXHJcbiAgICAgIGZpZWxkOiBzdHJpbmdcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgcnVsZTogVmFsaWRhdGlvblJ1bGVUeXBlLnJlcXVpcmVkXHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHJ1bGU6IFZhbGlkYXRpb25SdWxlVHlwZS5lbWFpbFxyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICBydWxlOiBWYWxpZGF0aW9uUnVsZVR5cGUub25seVxyXG4gICAgICB0eXBlOiBcIm51bWJlclwiIHwgXCJzdHJpbmdcIlxyXG4gICAgfVxyXG5cclxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblJ1bGVzID0geyBba2V5OiBzdHJpbmddOiBSdWxlIH1cclxuXHJcbnR5cGUgVmFsaWRhdGlvblJlc3VsdCA9IHtcclxuICByZXN1bHQ6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfVxyXG4gIGdsb2JhbDogYm9vbGVhblxyXG59XHJcblxyXG50eXBlIFdpdGhNdXRhdGlvblByb3BzID0ge1xyXG4gIGZvcm1WYWx1ZXM6IEZvcm1WYWx1ZXNcclxuICBmb3JtQ2hhbmdlSGFuZGxlcjogKGV2ZW50OiBDaGFuZ2VFdmVudCkgPT4gdm9pZFxyXG4gIHZhbGlkYXRpb25SZXN1bHQ/OiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAgc2V0Rm9ybVZhbHVlOiAoZm9ybVZhbHVlczogRm9ybVZhbHVlcykgPT4gdm9pZFxyXG4gIHF1ZXJ5T3B0aW9uczogUXVlcnlPcHRpb25zXHJcbiAgc2V0SW5pdGlhbEZvcm1WYWx1ZXM6IChmb3JtVmFsdWVzOiBGb3JtVmFsdWVzKSA9PiB2b2lkXHJcbiAgY2xlYXJGb3JtdmFsdWVzOiAoKSA9PiB2b2lkXHJcbn1cclxuXHJcbnR5cGUgUmVuZGVyQ2FsbGJhY2tQcm9wcyA9IHtcclxuICBmb3JtVmFsdWVzOiBGb3JtVmFsdWVzXHJcbiAgZm9ybUNoYW5nZUhhbmRsZXI6IChldmVudDogQ2hhbmdlRXZlbnQpID0+IHZvaWRcclxuICBjbGVhckZvcm12YWx1ZXM6ICgpID0+IHZvaWRcclxuICB2YWxpZGF0aW9uUmVzdWx0PzogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHN1Ym1pdEhhbmRsZXI/OiAoKSA9PiB2b2lkXHJcbiAgbG9hZGluZz86IGJvb2xlYW5cclxuICBpc01vZGlmaWVkPzogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBSZW5kZXJDYWxsYmFjayA9IChwcm9wczogUmVuZGVyQ2FsbGJhY2tQcm9wcykgPT4gSlNYLkVsZW1lbnRcclxuXHJcbnR5cGUgRm9ybUNvbnRyb2xsZXJQcm9wcyA9IHtcclxuICBpbml0VmFsdWVzPzogRm9ybVZhbHVlc1xyXG4gIHJlbmRlcjogUmVuZGVyQ2FsbGJhY2tcclxuICB3aXRoUXVlcnk/OiBib29sZWFuXHJcbiAgcXVlcnlPcHRpb25zPzogUXVlcnlPcHRpb25zXHJcbiAgdmFsaWRhdGlvblJ1bGVzPzogVmFsaWRhdGlvblJ1bGVzXHJcbn1cclxuXHJcbmNvbnN0IHdpdGhNdXRhdGlvbiA9IChGb3JtQ29tcG9uZW50OiBSZW5kZXJDYWxsYmFjaykgPT4gKFxyXG4gIHByb3BzOiBXaXRoTXV0YXRpb25Qcm9wc1xyXG4pID0+IHtcclxuICBjb25zdCB7IGZvcm1WYWx1ZXMsIHNldEZvcm1WYWx1ZSwgcXVlcnlPcHRpb25zLCBzZXRJbml0aWFsRm9ybVZhbHVlcyB9ID0gcHJvcHNcclxuICBjb25zdCBzY25hY2tiYXIgPSB1c2VTbmFja2JhcigpXHJcblxyXG4gIGNvbnN0IFt1cGRhdGUsIHsgZGF0YSwgbG9hZGluZywgZXJyb3IgfV0gPSB1c2VNdXRhdGlvbihxdWVyeU9wdGlvbnMucXVlcnksIHtcclxuICAgIHZhcmlhYmxlczoge1xyXG4gICAgICBmb3JtVmFsdWVzLFxyXG4gICAgfSxcclxuICB9KVxyXG5cclxuICBjb25zdCBzdWJtaXRIYW5kbGVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgdXBkYXRlKClcclxuICB9LCBbdXBkYXRlXSlcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIGlmICghZXJyb3IpIHtcclxuICAgIGxldCBuZXh0ID0gZmFsc2VcclxuICAgIGlmIChxdWVyeU9wdGlvbnMubXV0YXRpb25SZXN1bHRDb250cm9sID09IFwiYnVpbHRpblwiKSB7XHJcbiAgICAgIGlmIChkYXRhPy5bcXVlcnlPcHRpb25zLnJlc3VsdExhYmVsXSAmJiAhZXJyb3IpIG5leHQgPSB0cnVlXHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBxdWVyeU9wdGlvbnMubXV0YXRpb25SZXN1bHRDb250cm9sICYmXHJcbiAgICAgIHF1ZXJ5T3B0aW9ucy5tdXRhdGlvblJlc3VsdENvbnRyb2woZm9ybVZhbHVlcywgZGF0YSwgZXJyb3IpXHJcbiAgICApXHJcbiAgICAgIG5leHQgPSB0cnVlXHJcblxyXG4gICAgaWYgKG5leHQpIHtcclxuICAgICAgc2V0SW5pdGlhbEZvcm1WYWx1ZXMob21pdFR5cGVuYW1lKGRhdGE/LltxdWVyeU9wdGlvbnMucmVzdWx0TGFiZWxdKSlcclxuXHJcbiAgICAgIGlmIChxdWVyeU9wdGlvbnMuc25hY2tiYXJTdWNjZWVkTWVzc2FnZSlcclxuICAgICAgICBzY25hY2tiYXIuZW5xdWV1ZVNuYWNrYmFyKHF1ZXJ5T3B0aW9ucy5zbmFja2JhclN1Y2NlZWRNZXNzYWdlKVxyXG5cclxuICAgICAgaWYgKHF1ZXJ5T3B0aW9ucy5hZnRlclJlc3VsdENvbnRyb2xDYWxsYmFjaylcclxuICAgICAgICBxdWVyeU9wdGlvbnMuYWZ0ZXJSZXN1bHRDb250cm9sQ2FsbGJhY2soZm9ybVZhbHVlcywgZGF0YSwgZXJyb3IpXHJcblxyXG4gICAgICBpZiAocXVlcnlPcHRpb25zLmNsZWFyRm9ybXZhbHVlc0FmdGVyQ29udHJvbCkge1xyXG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhmb3JtVmFsdWVzKVxyXG4gICAgICAgIGxldCBmb3JtVmFsdWVzVGVtcCA9IHt9XHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgIGZvcm1WYWx1ZXNUZW1wID0geyAuLi5mb3JtVmFsdWVzVGVtcCwgW2tleV06IFwiXCIgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2V0Rm9ybVZhbHVlKGZvcm1WYWx1ZXNUZW1wKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEpXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgTm8gZGF0YSBmb3IgdGhlIHJlc3VsdCBsYWJlbDogJHtxdWVyeU9wdGlvbnMucmVzdWx0TGFiZWx9YFxyXG4gICAgICApXHJcbiAgICAvLyB9XHJcbiAgfSwgW2RhdGEsIGVycm9yXSlcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtQ29tcG9uZW50IHsuLi5wcm9wc30gc3VibWl0SGFuZGxlcj17c3VibWl0SGFuZGxlcn0gbG9hZGluZz17bG9hZGluZ30gLz5cclxuICApXHJcbn1cclxuXHJcbmNvbnN0IEZvcm1Db250cm9sbGVyID0gKHByb3BzOiBGb3JtQ29udHJvbGxlclByb3BzLCAuLi5vdGhlcnByb3BzOiBhbnlbXSkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGluaXRWYWx1ZXMsXHJcbiAgICByZW5kZXIsXHJcbiAgICB3aXRoUXVlcnkgPSBmYWxzZSxcclxuICAgIHF1ZXJ5T3B0aW9ucyxcclxuICAgIHZhbGlkYXRpb25SdWxlcyA9IG51bGwsXHJcbiAgfSA9IHByb3BzXHJcblxyXG4gIGNvbnN0IFtmb3JtVmFsdWVzLCBzZXRGb3JtVmFsdWVdID0gdXNlU3RhdGUoeyAuLi5pbml0VmFsdWVzIH0pXHJcbiAgY29uc3QgW2luaXRpYWxGb3JtVmFsdWVzLCBzZXRJbml0aWFsRm9ybVZhbHVlc10gPSB1c2VTdGF0ZSh7IC4uLmluaXRWYWx1ZXMgfSlcclxuICBjb25zdCBbdmFsaWRhdGlvblJlc3VsdCwgc2V0VmFsaWRhdGlvblJlc3VsdF0gPSB1c2VTdGF0ZTxWYWxpZGF0aW9uUmVzdWx0PigpXHJcblxyXG4gIGNvbnN0IGZvcm1DaGFuZ2VIYW5kbGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZSkgPT4ge1xyXG4gICAgICAvLyBpZiB0aGVyZSBhbiBvbmx5IHJ1bGUgb24gdGhlIGZpZWxkXHJcbiAgICAgIGNvbnN0IHJ1bGUgPSB2YWxpZGF0aW9uUnVsZXM/LltlLnRhcmdldC5uYW1lXVxyXG4gICAgICBpZiAocnVsZT8ucnVsZSA9PT0gVmFsaWRhdGlvblJ1bGVUeXBlLm9ubHkpIHtcclxuICAgICAgICBpZiAocnVsZS50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICBjb25zdCBpc251bSA9IC9eXFxkKyQvLnRlc3QoZS50YXJnZXQudmFsdWUpXHJcblxyXG4gICAgICAgICAgaWYgKGlzbnVtKVxyXG4gICAgICAgICAgICBzZXRGb3JtVmFsdWUoeyAuLi5mb3JtVmFsdWVzLCBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChydWxlLnR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgIGNvbnN0IGlzY2hhciA9IC9eW2EtekEtWl0rJC8udGVzdChlLnRhcmdldC52YWx1ZSlcclxuICAgICAgICAgIGlmIChpc2NoYXIpXHJcbiAgICAgICAgICAgIHNldEZvcm1WYWx1ZSh7IC4uLmZvcm1WYWx1ZXMsIFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0Rm9ybVZhbHVlKHsgLi4uZm9ybVZhbHVlcywgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW3NldEZvcm1WYWx1ZSwgZm9ybVZhbHVlcywgdmFsaWRhdGlvblJ1bGVzXVxyXG4gIClcclxuXHJcbiAgLyogYSByZXZvaXIgKi9cclxuICBjb25zdCBpc01vZGlmaWVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkoZm9ybVZhbHVlcykgPT0gSlNPTi5zdHJpbmdpZnkoaW5pdGlhbEZvcm1WYWx1ZXMpKVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfSwgW2Zvcm1WYWx1ZXMsIGluaXRpYWxGb3JtVmFsdWVzXSlcclxuXHJcbiAgY29uc3QgY2xlYXJGb3JtdmFsdWVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0Rm9ybVZhbHVlKHt9KVxyXG4gICAgc2V0SW5pdGlhbEZvcm1WYWx1ZXMoe30pXHJcbiAgfSwgW3NldEZvcm1WYWx1ZV0pXHJcblxyXG4gIC8qIHZhbGlkYXRpb24gOiBhIHJldm9pciAvIGNvbXBsw6l0ZXIgLi4gKi9cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHZhbGlkYXRpb25SdWxlcykge1xyXG4gICAgICBsZXQgdmFsaWRhdGlvblJlc3VsdFRlbXA6IFZhbGlkYXRpb25SZXN1bHQgPSB7IGdsb2JhbDogdHJ1ZSwgcmVzdWx0OiB7fSB9XHJcblxyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsaWRhdGlvblJ1bGVzKVxyXG5cclxuICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IHZhbGlkYXRpb25SdWxlc1trZXldXHJcblxyXG4gICAgICAgIC8qIHBhc3N3b3JkIHJ1bGUgaGFuZGxlciAqL1xyXG4gICAgICAgIGlmIChmaWVsZC5ydWxlID09IFZhbGlkYXRpb25SdWxlVHlwZS5wYXNzd29yZCkge1xyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsaWRhdGVQYXNzd29yZEZvcm1hdChmb3JtVmFsdWVzPy5ba2V5XSlcclxuXHJcbiAgICAgICAgICAvKiBpZiB0aGUgcGFzc3dvcmQgZm9ybWF0IGlzIHZhbGlkYXRlZCwgdXBkYXRlIHRoZSByZXN1bHQgZm9yIHRoZSBjb25jZXJuZWQgZmllbGQgKi9cclxuICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleVZhbHVlID0gdmFsaWRhdGlvblJlc3VsdFRlbXAucmVzdWx0W2tleV1cclxuICAgICAgICAgICAgICA/IHZhbGlkYXRpb25SZXN1bHRUZW1wLnJlc3VsdFtrZXldLmNvbmNhdChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgOiByZXN1bHRcclxuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdFRlbXAgPSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAuLi52YWxpZGF0aW9uUmVzdWx0VGVtcC5yZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBba2V5XTogbmV3S2V5VmFsdWUsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnbG9iYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBlcXVhbFRvIHJ1bGUgaGFuZGxlciAqL1xyXG4gICAgICAgIGlmIChmaWVsZC5ydWxlID09IFZhbGlkYXRpb25SdWxlVHlwZS5lcXVhbFRvKSB7XHJcbiAgICAgICAgICAvKiB0ZXN0IGlmIHRoZSAyIGZpZWxkcyBhcmUgZXF1YWxzICovXHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3JtVmFsdWVzW2tleV0gPT0gZm9ybVZhbHVlc1tmaWVsZC5maWVsZF1cclxuXHJcbiAgICAgICAgICAvKiBpZiB0aGUgdGVzdCByZXN1bHQgaXMgZmFsc2UsIHVwZGF0ZSB0aGUgcmVzdWx0IGZvciB0aGUgY29uY2VybmVkIGZpZWxkICovXHJcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdLZXlWYWx1ZSA9IHZhbGlkYXRpb25SZXN1bHRUZW1wLnJlc3VsdFtrZXldXHJcbiAgICAgICAgICAgICAgPyB2YWxpZGF0aW9uUmVzdWx0VGVtcC5yZXN1bHRba2V5XS5jb25jYXQoXCJlcXVhbFRvXCIpXHJcbiAgICAgICAgICAgICAgOiBbXCJlcXVhbFRvXCJdXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHRUZW1wID0ge1xyXG4gICAgICAgICAgICAgIHJlc3VsdDoge1xyXG4gICAgICAgICAgICAgICAgLi4udmFsaWRhdGlvblJlc3VsdFRlbXAucmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgW2tleV06IG5ld0tleVZhbHVlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogcmVxdWlyZWQgcnVsZSBoYW5kbGVyICovXHJcbiAgICAgICAgaWYgKGZpZWxkLnJ1bGUgPT0gVmFsaWRhdGlvblJ1bGVUeXBlLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAvKiB0ZXN0IGlmIHRoZXJlIGlzIGEgdmFsdWUgaW4gdGhlIGZvcm1WYWx1ZXMgYXJyYXkgKi9cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1WYWx1ZXNba2V5XT8ubGVuZ3RoID09IDBcclxuXHJcbiAgICAgICAgICAvKiBpZiB0aGUgdGVzdCByZXN1bHQgaXMgdHJ1ZSwgdXBkYXRlIHRoZSByZXN1bHQgZm9yIHRoZSBjb25jZXJuZWQgZmllbGQgKi9cclxuICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3S2V5VmFsdWUgPSB2YWxpZGF0aW9uUmVzdWx0VGVtcC5yZXN1bHRba2V5XVxyXG4gICAgICAgICAgICAgID8gdmFsaWRhdGlvblJlc3VsdFRlbXAucmVzdWx0W2tleV0uY29uY2F0KFwicmVxdWlyZWRcIilcclxuICAgICAgICAgICAgICA6IFtcInJlcXVpcmVkXCJdXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHRUZW1wID0ge1xyXG4gICAgICAgICAgICAgIHJlc3VsdDoge1xyXG4gICAgICAgICAgICAgICAgLi4udmFsaWRhdGlvblJlc3VsdFRlbXAucmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgW2tleV06IG5ld0tleVZhbHVlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogZW1haWwgcnVsZSBoYW5kbGVyICovXHJcbiAgICAgICAgaWYgKGZpZWxkLnJ1bGUgPT0gVmFsaWRhdGlvblJ1bGVUeXBlLmVtYWlsKSB7XHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZUVtYWlsRm9ybWF0KGZvcm1WYWx1ZXM/LltrZXldKVxyXG5cclxuICAgICAgICAgIC8qIGlmIHRoZSBlbWFpbCBmb3JtYXQgaXMgdmFsaWRhdGVkLCB1cGRhdGUgdGhlIHJlc3VsdCBmb3IgdGhlIGNvbmNlcm5lZCBmaWVsZCAqL1xyXG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3S2V5VmFsdWUgPSB2YWxpZGF0aW9uUmVzdWx0VGVtcC5yZXN1bHRba2V5XVxyXG4gICAgICAgICAgICAgID8gdmFsaWRhdGlvblJlc3VsdFRlbXAucmVzdWx0W2tleV0uY29uY2F0KFwiZW1haWxcIilcclxuICAgICAgICAgICAgICA6IFtcImVtYWlsXCJdXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHRUZW1wID0ge1xyXG4gICAgICAgICAgICAgIHJlc3VsdDoge1xyXG4gICAgICAgICAgICAgICAgLi4udmFsaWRhdGlvblJlc3VsdFRlbXAucmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgW2tleV06IG5ld0tleVZhbHVlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHNldFZhbGlkYXRpb25SZXN1bHQodmFsaWRhdGlvblJlc3VsdFRlbXApXHJcbiAgICB9XHJcbiAgfSwgW2Zvcm1WYWx1ZXMsIHZhbGlkYXRpb25SdWxlc10pXHJcblxyXG4gIGNvbnN0IHdpdGhNdXRhdGlvblByb3BzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmb3JtQ2hhbmdlSGFuZGxlcjogZm9ybUNoYW5nZUhhbmRsZXIsXHJcbiAgICAgIGlzTW9kaWZpZWQsXHJcbiAgICAgIGZvcm1WYWx1ZXMsXHJcbiAgICAgIHZhbGlkYXRpb25SZXN1bHQsXHJcbiAgICAgIHF1ZXJ5T3B0aW9ucyxcclxuICAgICAgc2V0SW5pdGlhbEZvcm1WYWx1ZXMsXHJcbiAgICAgIHNldEZvcm1WYWx1ZSxcclxuICAgICAgY2xlYXJGb3JtdmFsdWVzLFxyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGZvcm1DaGFuZ2VIYW5kbGVyLFxyXG4gICAgaXNNb2RpZmllZCxcclxuICAgIGZvcm1WYWx1ZXMsXHJcbiAgICB2YWxpZGF0aW9uUmVzdWx0LFxyXG4gICAgcXVlcnlPcHRpb25zLFxyXG4gICAgd2l0aFF1ZXJ5LFxyXG4gICAgc2V0SW5pdGlhbEZvcm1WYWx1ZXMsXHJcbiAgICBzZXRGb3JtVmFsdWUsXHJcbiAgXSlcclxuXHJcbiAgY29uc3QgcmVuZGVyUHJvcHMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvcm1DaGFuZ2VIYW5kbGVyOiBmb3JtQ2hhbmdlSGFuZGxlcixcclxuICAgICAgaXNNb2RpZmllZCxcclxuICAgICAgZm9ybVZhbHVlcyxcclxuICAgICAgdmFsaWRhdGlvblJlc3VsdCxcclxuICAgICAgY2xlYXJGb3JtdmFsdWVzLFxyXG4gICAgICAuLi5vdGhlcnByb3BzLFxyXG4gICAgICAvLyBxdWVyeU9wdGlvbnM6IHF1ZXJ5T3B0aW9ucyxcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBmb3JtQ2hhbmdlSGFuZGxlcixcclxuICAgIGlzTW9kaWZpZWQsXHJcbiAgICBmb3JtVmFsdWVzLFxyXG4gICAgdmFsaWRhdGlvblJlc3VsdCxcclxuICAgIC8vIHF1ZXJ5T3B0aW9ucyxcclxuICBdKVxyXG5cclxuICBpZiAod2l0aFF1ZXJ5KSB7XHJcbiAgICBpZiAoIXF1ZXJ5T3B0aW9ucylcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIFwicXVlcnlPcHRpb24gcHJvcCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gd2l0aFF1ZXJ5IHByb3AgaXMgdHJ1ZS5cIlxyXG4gICAgICApXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByZXR1cm4gd2l0aE11dGF0aW9uKHJlbmRlcikod2l0aE11dGF0aW9uUHJvcHMpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVuZGVyKHJlbmRlclByb3BzKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JtQ29udHJvbGxlclxyXG4iLCJpbXBvcnQgQXBwTGF5b3V0IGZyb20gXCJjb250YWluZXJzL2xheW91dHMvQXBwTGF5b3V0XCJcclxuaW1wb3J0IEFwcENvbnRhaW5lciBmcm9tIFwiY29udGFpbmVycy9sYXlvdXRzL0FwcENvbnRhaW5lclwiXHJcbmltcG9ydCB7IFR5cG9ncmFwaHksIEdyaWQgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmVcIlxyXG5cclxuY29uc3QgRmFsbGJhY2tBbHJlYWR5Q29ubmVjdGVkID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8QXBwTGF5b3V0PlxyXG4gICAgICAgICAgICA8QXBwQ29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPEdyaWQgY29udGFpbmVyIGp1c3RpZnk9J2NlbnRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD0naDYnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWb3VzIG5lIHBvdXZleiBwYXMgYWNjw6lkZXIgw6AgY2V0dGUgcGFnZSBjYXIgdm91cyDDqnRlcyBkw6lqYSBpZGVudGlmacOpcy5cclxuICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICAgICAgICA8L0dyaWQ+XHJcbiAgICAgICAgICAgIDwvQXBwQ29udGFpbmVyPlxyXG4gICAgICAgIDwvQXBwTGF5b3V0PlxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGYWxsYmFja0FscmVhZHlDb25uZWN0ZWQiLCJpbXBvcnQgZ3FsIGZyb20gXCJncmFwaHFsLXRhZ1wiXHJcbmltcG9ydCB7IHdpdGhBcG9sbG8gfSBmcm9tIFwiaG9jL3dpdGhBcG9sbG9cIlxyXG5pbXBvcnQgRm9ybUNvbnRyb2xsZXIgZnJvbSBcImNvbXBvbmVudHMvY29udHJvbGxlcnMvRm9ybUNvbnRyb2xsZXJcIlxyXG5pbXBvcnQgeyBtYWtlU3R5bGVzLCBCb3ggfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmVcIlxyXG5pbXBvcnQge1xyXG4gIENvbnRhaW5lcixcclxuICBBdmF0YXIsXHJcbiAgVHlwb2dyYXBoeSxcclxuICBUZXh0RmllbGQsXHJcbiAgRm9ybUNvbnRyb2xMYWJlbCxcclxuICBDaGVja2JveCxcclxuICBHcmlkLFxyXG59IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZVwiXHJcbmltcG9ydCBMb2NrT3V0bGluZWRJY29uIGZyb20gXCJAbWF0ZXJpYWwtdWkvaWNvbnMvTG9ja091dGxpbmVkXCJcclxuaW1wb3J0IENsYXNzaWNCdXR0b24gZnJvbSBcImNvbXBvbmVudHMvYnV0dG9ucy9DbGFzc2ljQnV0dG9uXCJcclxuaW1wb3J0IExpbmsgZnJvbSBcImNvbXBvbmVudHMvTGlua1wiXHJcbmltcG9ydCB7IHVzZU11dGF0aW9uIH0gZnJvbSBcIkBhcG9sbG8vcmVhY3QtaG9va3NcIlxyXG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7IHVzZVNlc3Npb25EaXNwYXRjaCB9IGZyb20gXCJjb250ZXh0L3Nlc3Npb24vc2Vzc2lvblwiXHJcbmltcG9ydCBvbWl0VHlwZW5hbWUgZnJvbSBcInV0aWxzL29taXRUeXBlbmFtZVwiXHJcbmltcG9ydCB1c2VHcmFwaFFMRXJyb3JEaXNwbGF5IGZyb20gXCJob29rcy91c2VHcmFwaFFMRXJyb3JEaXNwbGF5XCJcclxuaW1wb3J0IHVzZUNvb2tpZVJlZGlyZWN0aW9uIGZyb20gXCJob29rcy91c2VDb29raWVSZWRpcmVjdGlvblwiXHJcbmltcG9ydCB7XHJcbiAgVmFsaWRhdGlvblJ1bGVUeXBlLFxyXG4gIFZhbGlkYXRpb25SdWxlcyxcclxuICBSZW5kZXJDYWxsYmFjayxcclxufSBmcm9tIFwiY29tcG9uZW50cy9jb250cm9sbGVycy9Gb3JtQ29udHJvbGxlclwiXHJcblxyXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKCh0aGVtZSkgPT4gKHtcclxuICBwYXBlcjoge1xyXG4gICAgbWFyZ2luVG9wOiB0aGVtZS5zcGFjaW5nKDgpLFxyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxyXG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcclxuICB9LFxyXG4gIGF2YXRhcjoge1xyXG4gICAgbWFyZ2luOiB0aGVtZS5zcGFjaW5nKDEpLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnNlY29uZGFyeS5tYWluLFxyXG4gIH0sXHJcbiAgYm94OiB7XHJcbiAgICB3aWR0aDogXCIxMDAlXCIsIC8vIEZpeCBJRSAxMSBpc3N1ZS5cclxuICAgIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZygxKSxcclxuICB9LFxyXG4gIHN1Ym1pdDoge1xyXG4gICAgbWFyZ2luOiB0aGVtZS5zcGFjaW5nKDMsIDAsIDIpLFxyXG4gIH0sXHJcbn0pKVxyXG5cclxuY29uc3QgU0lHTklOID0gZ3FsYFxyXG4gIG11dGF0aW9uIGxvZ2luKFxyXG4gICAgJGVtYWlsOiBTdHJpbmchXHJcbiAgICAkcGFzc3dvcmQ6IFN0cmluZyFcclxuICAgICRwZXJzaXN0ZW50Q29ubmVjdGlvbjogQm9vbGVhbiFcclxuICApIHtcclxuICAgIGxvZ2luKFxyXG4gICAgICBlbWFpbDogJGVtYWlsXHJcbiAgICAgIHBhc3N3b3JkOiAkcGFzc3dvcmRcclxuICAgICAgcGVyc2lzdGVudENvbm5lY3Rpb246ICRwZXJzaXN0ZW50Q29ubmVjdGlvblxyXG4gICAgKSB7XHJcbiAgICAgIGlkXHJcbiAgICAgIHN1cm5hbWVcclxuICAgICAgbGFzdG5hbWVcclxuICAgICAgZW1haWxcclxuICAgICAgcm9sZVxyXG4gICAgICBwaG9uZVxyXG4gICAgICBhZGRyZXNzXHJcbiAgICAgIHBvc3RDb2RlXHJcbiAgICAgIGNpdHlcclxuICAgIH1cclxuICB9XHJcbmBcclxuXHJcbmNvbnN0IHZhbGlkYXRpb25SdWxlczogVmFsaWRhdGlvblJ1bGVzID0ge1xyXG4gIGVtYWlsOiB7XHJcbiAgICBydWxlOiBWYWxpZGF0aW9uUnVsZVR5cGUucmVxdWlyZWQsXHJcbiAgfSxcclxuICBwYXNzd29yZDoge1xyXG4gICAgcnVsZTogVmFsaWRhdGlvblJ1bGVUeXBlLnJlcXVpcmVkLFxyXG4gIH0sXHJcbn1cclxuXHJcbmNvbnN0IFNpZ25pbkZvcm0gPSAoKSA9PiB7XHJcbiAgY29uc3QgRm9ybTogUmVuZGVyQ2FsbGJhY2sgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgZm9ybUNoYW5nZUhhbmRsZXIsIGZvcm1WYWx1ZXMsIHZhbGlkYXRpb25SZXN1bHQgfSA9IHByb3BzXHJcblxyXG4gICAgY29uc3QgW3NpZ25pbiwgeyBkYXRhLCBlcnJvciB9XSA9IHVzZU11dGF0aW9uKFNJR05JTilcclxuICAgIHVzZUdyYXBoUUxFcnJvckRpc3BsYXkoZXJyb3IpXHJcbiAgICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMoKVxyXG4gICAgY29uc3QgW2NoZWNrQm94Q2hlY2tlZCwgc2V0Q2hlY2tCb3hDaGVja2VkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3Qgc2Vzc2lvbkRpc3BhdGNoID0gdXNlU2Vzc2lvbkRpc3BhdGNoKClcclxuICAgIGNvbnN0IHJlZGlyZWN0ID0gdXNlQ29va2llUmVkaXJlY3Rpb24oKVxyXG5cclxuICAgIGNvbnN0IGNoZWNrQm94Q2hhbmdlSGFuZGxlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgICAoZSkgPT4ge1xyXG4gICAgICAgIHNldENoZWNrQm94Q2hlY2tlZChlLnRhcmdldC5jaGVja2VkKVxyXG4gICAgICB9LFxyXG4gICAgICBbc2V0Q2hlY2tCb3hDaGVja2VkXVxyXG4gICAgKVxyXG5cclxuICAgIGNvbnN0IHN1Ym1pdEhhbmRsZXIyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgICBzaWduaW4oe1xyXG4gICAgICAgIHZhcmlhYmxlczoge1xyXG4gICAgICAgICAgZW1haWw6IGZvcm1WYWx1ZXMuZW1haWwsXHJcbiAgICAgICAgICBwYXNzd29yZDogZm9ybVZhbHVlcy5wYXNzd29yZCxcclxuICAgICAgICAgIHBlcnNpc3RlbnRDb25uZWN0aW9uOiBjaGVja0JveENoZWNrZWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH0sIFtjaGVja0JveENoZWNrZWQsIGZvcm1WYWx1ZXMsIHNpZ25pbl0pXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgaWYgKGRhdGE/LmxvZ2luPy5pZCkge1xyXG4gICAgICAgIHNlc3Npb25EaXNwYXRjaCh7XHJcbiAgICAgICAgICB0eXBlOiBcImxvZ2luXCIsXHJcbiAgICAgICAgICBwYXlsb2FkOiBvbWl0VHlwZW5hbWUoZGF0YS5sb2dpbiksXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZWRpcmVjdCgpXHJcbiAgICAgIH1cclxuICAgIH0sIFtkYXRhLCBzZXNzaW9uRGlzcGF0Y2gsIHJlZGlyZWN0XSlcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Q29udGFpbmVyIGNvbXBvbmVudD1cIm1haW5cIiBtYXhXaWR0aD1cInhzXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wYXBlcn0+XHJcbiAgICAgICAgICA8QXZhdGFyIGNsYXNzTmFtZT17c3R5bGVzLmF2YXRhcn0+XHJcbiAgICAgICAgICAgIDxMb2NrT3V0bGluZWRJY29uIC8+XHJcbiAgICAgICAgICA8L0F2YXRhcj5cclxuICAgICAgICAgIDxUeXBvZ3JhcGh5IGNvbXBvbmVudD1cImgxXCIgdmFyaWFudD1cImg1XCI+XHJcbiAgICAgICAgICAgIENvbm5leGlvblxyXG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAgPFRleHRGaWVsZFxyXG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZWRcIlxyXG4gICAgICAgICAgICBtYXJnaW49XCJub3JtYWxcIlxyXG4gICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgICAgbGFiZWw9XCJFbWFpbCBBZGRyZXNzXCJcclxuICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwiY3VycmVudC1lbWFpbFwiXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJcIlxyXG4gICAgICAgICAgICB2YWx1ZT17Zm9ybVZhbHVlcz8uZW1haWx9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtmb3JtQ2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8VGV4dEZpZWxkXHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXHJcbiAgICAgICAgICAgIG1hcmdpbj1cIm5vcm1hbFwiXHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICBsYWJlbD1cIlBhc3N3b3JkXCJcclxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwiY3VycmVudC1wYXNzd29yZFwiXHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtVmFsdWVzPy5wYXNzd29yZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2Zvcm1DaGFuZ2VIYW5kbGVyfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxCb3ggY2xhc3NOYW1lPXtzdHlsZXMuYm94fT5cclxuICAgICAgICAgICAgPEZvcm1Db250cm9sTGFiZWxcclxuICAgICAgICAgICAgICBjb250cm9sPXtcclxuICAgICAgICAgICAgICAgIDxDaGVja2JveFxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT1cInJlbWVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2NoZWNrQm94Q2hhbmdlSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiU2Ugc291dmVuaXIgZGUgbW9pXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPENsYXNzaWNCdXR0b25cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJjb250YWluZWRcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zdWJtaXR9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3N1Ym1pdEhhbmRsZXIyfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IXZhbGlkYXRpb25SZXN1bHQ/Lmdsb2JhbH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgU2UgY29ubmVjdGVyXHJcbiAgICAgICAgICA8L0NsYXNzaWNCdXR0b24+XHJcbiAgICAgICAgICA8R3JpZCBjb250YWluZXI+XHJcbiAgICAgICAgICAgIDxHcmlkIGl0ZW0geHM+XHJcbiAgICAgICAgICAgICAgey8qIEB0cy1pZ25vcmUgKi99XHJcbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9mb3Jnb3RQYXNzd29yZFwiPk1vdCBkZSBwYXNzZSBvdWJsacOpID88L0xpbms+XHJcbiAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgPEdyaWQgaXRlbT5cclxuICAgICAgICAgICAgICB7LyogQHRzLWlnbm9yZSAqL31cclxuICAgICAgICAgICAgICA8TGluayBocmVmPVwiL3NpZ251cFwiPkNyw6llciB1biBjb21wdGU8L0xpbms+XHJcbiAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9Db250YWluZXI+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICByZXR1cm4gPEZvcm1Db250cm9sbGVyIHJlbmRlcj17Rm9ybX0gdmFsaWRhdGlvblJ1bGVzPXt2YWxpZGF0aW9uUnVsZXN9IC8+XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhBcG9sbG8oKShTaWduaW5Gb3JtKVxyXG4iLCJpbXBvcnQgeyBDb250YWluZXIgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmVcIlxyXG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJ1xyXG5cclxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcygodGhlbWUpID0+ICh7XHJcbiAgICB3aXRoTWF4V2lkdGggOiB7XHJcbiAgICAgICAgbWFyZ2luVG9wIDogdGhlbWUuc3BhY2luZyg2KSxcclxuICAgICAgICBtYXhXaWR0aCA6ICcxMTIwcHgnXHJcbiAgICB9LFxyXG4gICAgbm9NYXhXaWR0aCA6IHtcclxuICAgICAgICBtYXJnaW5Ub3AgOiB0aGVtZS5zcGFjaW5nKDYpXHJcbiAgICB9LFxyXG59KSlcclxuXHJcbmNvbnN0IEFwcENvbnRhaW5lciA9ICh7Y2hpbGRyZW4sLi4ucHJvcHN9KSA9PiB7XHJcblxyXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzKCk7XHJcblxyXG4gICAgaWYocHJvcHM/Lm1heFdpZHRoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e3N0eWxlcy5ub01heFdpZHRofSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtzdHlsZXMud2l0aE1heFdpZHRofSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9Db250YWluZXI+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcENvbnRhaW5lclxyXG4iLCJpbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvbGF5b3V0cy9OYXZCYXInXHJcbmltcG9ydCB7IEJveCwgbWFrZVN0eWxlcyB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlJ1xyXG5cclxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcygodGhlbWUpID0+ICh7XHJcbiAgICByb290IDoge1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvciA6ICcjRkZGRkZGJ1xyXG4gICAgfVxyXG59KSlcclxuXHJcbmNvbnN0IEFwcExheW91dCA9ICh7Y2hpbGRyZW59KSA9PiB7XHJcblxyXG4gICAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzKClcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCb3ggY2xhc3NOYW1lPXtzdHlsZXMucm9vdH0+XHJcbiAgICAgICAgICAgIDxOYXZCYXIgLz5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBMYXlvdXQiLCJpbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcclxuaW1wb3J0IEFwcEJhciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXInO1xyXG5pbXBvcnQgVG9vbGJhciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyJztcclxuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeSc7XHJcbmltcG9ydCB7IEdyaWQsIEF2YXRhciwgTWVudUl0ZW0sIEZhZGUgLCBNZW51IH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xyXG5pbXBvcnQgQ2xhc3NpY0J1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2J1dHRvbnMvQ2xhc3NpY0J1dHRvbic7XHJcbmltcG9ydCBMaW5rIGZyb20gJ2NvbXBvbmVudHMvTGluaydcclxuaW1wb3J0IHsgdXNlU2Vzc2lvblN0YXRlLCB1c2VTZXNzaW9uRGlzcGF0Y2ggfSBmcm9tICdjb250ZXh0L3Nlc3Npb24vc2Vzc2lvbic7XHJcbmltcG9ydCB7IHVzZUNhbGxiYWNrICx1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZU11dGF0aW9uIH0gZnJvbSAnQGFwb2xsby9yZWFjdC1ob29rcyc7XHJcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnXHJcbmltcG9ydCB7dXNlQ29va2llc30gZnJvbSAncmVhY3QtY29va2llJ1xyXG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3N0eWxlcyc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xyXG5pbXBvcnQge3dpdGhBcG9sbG99IGZyb20gJ2hvYy93aXRoQXBvbGxvJ1xyXG5cclxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcygodGhlbWUpID0+ICh7XHJcbiAgbmF2YmFyOiB7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3IgOiAnd2hpdGUnLFxyXG4gICAgYm94U2hhZG93Oidub25lJ1xyXG4gIH0sXHJcbiAgYnV0dG9udGVzdCA6IHtcclxuICAgIHBhZGRpbmdUb3AgOiB0aGVtZS5zcGFjaW5nKDEpLFxyXG4gICAgcGFkZGluZ0JvdHRvbTp0aGVtZS5zcGFjaW5nKDEpLFxyXG4gICAgLy8gYmFja2dyb3VuZDoncmVkJyxcclxuICAgIG1hcmdpbkJvdHRvbTonMHB4JyxcclxuICB9LFxyXG4gIGF2YXRhcjp7XHJcbiAgICBtYXJnaW5MZWZ0IDogdGhlbWUuc3BhY2luZygxKSxcclxuICAgIG1hcmdpblJpZ2h0IDogdGhlbWUuc3BhY2luZygxKVxyXG4gIH0sXHJcbiAgcG9wb3ZlclBhcGVyIDp7XHJcbiAgICBtYXJnaW5Ub3AgOiB0aGVtZS5zcGFjaW5nKDIpLFxyXG4gICAgd2lkdGggOiAnMjUwcHgnXHJcbiAgfSxcclxuICBsaXN0SXRlbVR5cG8gOiB7XHJcbiAgICBmb250V2VpZ2h0IDogJzQ1MCdcclxuICB9XHJcbn0pKTtcclxuXHJcbmNvbnN0IFNJR05PVVQgPSBncWxgXHJcbiAgICBtdXRhdGlvbiBsb2dvdXR7XHJcbiAgICAgIGxvZ291dFxyXG4gICAgfVxyXG5gXHJcblxyXG5jb25zdCBOYXZCYXIgPSAoKSA9PiB7XHJcbiAgXHJcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzKCk7XHJcbiAgY29uc3QgdXNlciA9IHVzZVNlc3Npb25TdGF0ZSgpXHJcbiAgY29uc3Qgc2Vzc2lvbkRpc3BhdGNoID0gdXNlU2Vzc2lvbkRpc3BhdGNoKClcclxuICBjb25zdCBbY29va2llcywgc2V0Q29va2llLCByZW1vdmVDb29raWVdID0gdXNlQ29va2llcygpO1xyXG4gIGNvbnN0IFtzaWdub3V0LHtkYXRhfV0gPSB1c2VNdXRhdGlvbihTSUdOT1VUKVxyXG4gIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG5cclxuICBjb25zdCBzaWdub3V0SGFuZGxlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNpZ25vdXQoKVxyXG4gIH0sW3NpZ25vdXRdKVxyXG5cclxuICBjb25zdCBzaWduaW5DbGlja0hhbmRsZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRDb29raWUoJ3JlZGlyZWN0X3VybCcsIHJvdXRlci5hc1BhdGgsIHsgcGF0aDogJy8nIH0pXHJcbiAgfSxbc2V0Q29va2llLHJvdXRlci5hc1BhdGhdKVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYoZGF0YT8ubG9nb3V0KVxyXG4gICAgICBzZXNzaW9uRGlzcGF0Y2goeyBcclxuICAgICAgICB0eXBlOiBcImxvZ291dFwiIFxyXG4gICAgICB9KVxyXG4gIH0sW2RhdGEsc2Vzc2lvbkRpc3BhdGNoXSlcclxuXHJcbiAgY29uc3QgW2FuY2hvckVsLCBzZXRBbmNob3JFbF0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgc2V0QW5jaG9yRWwoZXZlbnQuY3VycmVudFRhcmdldClcclxuICB9O1xyXG4gIGNvbnN0IGhhbmRsZUNsb3NlID0gKCkgPT4ge1xyXG4gICAgc2V0QW5jaG9yRWwobnVsbClcclxuICB9O1xyXG4gIGNvbnN0IG9wZW4gPSBCb29sZWFuKGFuY2hvckVsKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgICA8PlxyXG4gICAgICAgIDxBcHBCYXIgcG9zaXRpb249XCJzdGF0aWNcIiBjbGFzc05hbWU9e3N0eWxlcy5uYXZiYXJ9IGNvbG9yPSdpbmhlcml0Jz5cclxuICAgICAgICAgIDxUb29sYmFyPlxyXG4gICAgICAgICAgICA8R3JpZFxyXG4gICAgICAgICAgICAgIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgIGRpcmVjdGlvbj0ncm93J1xyXG4gICAgICAgICAgICAgIGp1c3RpZnk9J3NwYWNlLWJldHdlZW4nXHJcbiAgICAgICAgICAgICAgYWxpZ25JdGVtcz0nY2VudGVyJ1xyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPEdyaWQgaXRlbT5cclxuICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5PlRpdGxlPC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICA8R3JpZCBpdGVtPlxyXG4gICAgICAgICAgICAgICAgPEdyaWQgXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICBzcGFjaW5nPXszfVxyXG4gICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPSdjZW50ZXInXHJcbiAgICAgICAgICAgICAgICA+IFxyXG4gICAgICAgICAgICAgICAgICB7IXVzZXIgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL3NpZ251cFwiIHVuZGVybGluZT0nbm9uZScgY29sb3I9J3RleHRQcmltYXJ5Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBTJ2luc2NyaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxHcmlkIGl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8TGluayBocmVmPXtgJHtyb3V0ZXIuYXNQYXRofT9tb2RhbD10cnVlfWB9IGFzPScvc2lnbmluJyB1bmRlcmxpbmU9J25vbmUnIGNvbG9yPSd0ZXh0UHJpbWFyeSc+ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPScvc2lnbmluJyB1bmRlcmxpbmU9J25vbmUnIGNvbG9yPSd0ZXh0UHJpbWFyeScgb25DbGljaz17c2lnbmluQ2xpY2tIYW5kbGVyfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBTZSBjb25uZWN0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8R3JpZCBpdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDbGFzc2ljQnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbnRlc3R9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgRG9ubmVyIHVuZSBmb3JtYXRpb25cclxuICAgICAgICAgICAgICAgICAgICA8L0NsYXNzaWNCdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAge3VzZXIgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8QXZhdGFyIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hdmF0YXJ9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz1cInBvcG92ZXItbWVudVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwicG9wb3Zlci1tZW51XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbj17b3Blbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yRWw9e2FuY2hvckVsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXtoYW5kbGVDbG9zZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yT3JpZ2luPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWw6ICdib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbj17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRDb250ZW50QW5jaG9yRWw9e251bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgPXt7cGFwZXIgOiBzdHlsZXMucG9wb3ZlclBhcGVyfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbkNvbXBvbmVudD17RmFkZX1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIDxNZW51SXRlbSBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaCgnL2FjY291bnQnKX0gY29tcG9uZW50PXtMaW5rfSA+TW9uIGNvbXB0ZTwvTWVudUl0ZW0+ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gYnV0dG9uIGNvbXBvbmVudD17TGlua30gaHJlZj0nL2FjY291bnQnID5Nb24gY29tcHRlPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e3NpZ25vdXRIYW5kbGVyfT5TZSBkw6ljb25uZWN0ZXI8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgICAgPC9Ub29sYmFyPlxyXG4gICAgICAgIDwvQXBwQmFyPlxyXG4gICAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhBcG9sbG8oKShOYXZCYXIpIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgU2Vzc2lvblN0YXRlQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoKTtcclxuY29uc3QgU2Vzc2lvbkRpc3BhdGNoQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoKTtcclxuXHJcbmZ1bmN0aW9uIGF1dGhSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwibG9naW5cIjoge1xyXG4gICAgICByZXR1cm4gey4uLmFjdGlvbi5wYXlsb2FkfTtcclxuICAgIH1cclxuICAgIGNhc2UgXCJsb2dvdXRcIjoge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGRlZmF1bHQ6IHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmhhbmRsZWQgYWN0aW9uIHR5cGU6ICR7YWN0aW9uLnR5cGV9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBTZXNzaW9uUHJvdmlkZXIoeyBjaGlsZHJlbiwgaW5pdD1udWxsIH0pIHtcclxuXHJcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSBSZWFjdC51c2VSZWR1Y2VyKGF1dGhSZWR1Y2VyLCBpbml0KTtcclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgPFNlc3Npb25TdGF0ZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3N0YXRlfT5cclxuICAgICAgPFNlc3Npb25EaXNwYXRjaENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2Rpc3BhdGNofT5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDwvU2Vzc2lvbkRpc3BhdGNoQ29udGV4dC5Qcm92aWRlcj5cclxuICAgIDwvU2Vzc2lvblN0YXRlQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VTZXNzaW9uU3RhdGUoKSB7XHJcbiAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoU2Vzc2lvblN0YXRlQ29udGV4dCk7XHJcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXNlU2Vzc2lvblN0YXRlIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBTZXNzaW9uUHJvdmlkZXJcIik7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VTZXNzaW9uRGlzcGF0Y2goKSB7XHJcbiAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoU2Vzc2lvbkRpc3BhdGNoQ29udGV4dCk7XHJcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXNlU2Vzc2lvbkRpc3BhdGNoIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBTZXNzaW9uUHJvdmlkZXJcIik7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZXh0O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgU2Vzc2lvblByb3ZpZGVyLCB1c2VTZXNzaW9uU3RhdGUsIHVzZVNlc3Npb25EaXNwYXRjaCB9O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBBcHAgZnJvbSAnbmV4dC9hcHAnXHJcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcclxuaW1wb3J0IHsgQXBvbGxvUHJvdmlkZXIgfSBmcm9tICdAYXBvbGxvL3JlYWN0LWhvb2tzJ1xyXG5pbXBvcnQgY3JlYXRlQXBvbGxvQ2xpZW50IGZyb20gJy4uL2xpYi9hcG9sbG9DbGllbnQvYXBvbGxvQ2xpZW50J1xyXG5cclxuLy8gT24gdGhlIGNsaWVudCwgd2Ugc3RvcmUgdGhlIEFwb2xsbyBDbGllbnQgaW4gdGhlIGZvbGxvd2luZyB2YXJpYWJsZS5cclxuLy8gVGhpcyBwcmV2ZW50cyB0aGUgY2xpZW50IGZyb20gcmVpbml0aWFsaXppbmcgYmV0d2VlbiBwYWdlIHRyYW5zaXRpb25zLlxyXG5sZXQgZ2xvYmFsQXBvbGxvQ2xpZW50ID0gbnVsbFxyXG5cclxuLyoqXHJcbiAqIEluc3RhbGxzIHRoZSBBcG9sbG8gQ2xpZW50IG9uIE5leHRQYWdlQ29udGV4dFxyXG4gKiBvciBOZXh0QXBwQ29udGV4dC4gVXNlZnVsIGlmIHlvdSB3YW50IHRvIHVzZSBhcG9sbG9DbGllbnRcclxuICogaW5zaWRlIGdldFN0YXRpY1Byb3BzLCBnZXRTdGF0aWNQYXRocyBvciBnZXRTZXJ2ZXJTaWRlUHJvcHNcclxuICogQHBhcmFtIHtOZXh0UGFnZUNvbnRleHQgfCBOZXh0QXBwQ29udGV4dH0gY3R4XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5pdE9uQ29udGV4dCA9IGN0eCA9PiB7XHJcbiAgY29uc3QgaW5BcHBDb250ZXh0ID0gQm9vbGVhbihjdHguY3R4KVxyXG5cclxuICAvLyBXZSBjb25zaWRlciBpbnN0YWxsaW5nIGB3aXRoQXBvbGxvKHsgc3NyOiB0cnVlIH0pYCBvbiBnbG9iYWwgQXBwIGxldmVsXHJcbiAgLy8gYXMgYW50aXBhdHRlcm4gc2luY2UgaXQgZGlzYWJsZXMgcHJvamVjdCB3aWRlIEF1dG9tYXRpYyBTdGF0aWMgT3B0aW1pemF0aW9uLlxyXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgaWYgKGluQXBwQ29udGV4dCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgJ1dhcm5pbmc6IFlvdSBoYXZlIG9wdGVkLW91dCBvZiBBdXRvbWF0aWMgU3RhdGljIE9wdGltaXphdGlvbiBkdWUgdG8gYHdpdGhBcG9sbG9gIGluIGBwYWdlcy9fYXBwYC5cXG4nICtcclxuICAgICAgICAgICdSZWFkIG1vcmU6IGh0dHBzOi8vZXJyLnNoL25leHQuanMvb3B0LW91dC1hdXRvLXN0YXRpYy1vcHRpbWl6YXRpb25cXG4nXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEluaXRpYWxpemUgQXBvbGxvQ2xpZW50IGlmIG5vdCBhbHJlYWR5IGRvbmVcclxuICBjb25zdCBhcG9sbG9DbGllbnQgPVxyXG4gICAgY3R4LmFwb2xsb0NsaWVudCB8fFxyXG4gICAgaW5pdEFwb2xsb0NsaWVudChjdHguYXBvbGxvU3RhdGUgfHwge30sIGluQXBwQ29udGV4dCA/IGN0eC5jdHggOiBjdHgpXHJcblxyXG4gIC8vIFdlIHNlbmQgdGhlIEFwb2xsbyBDbGllbnQgYXMgYSBwcm9wIHRvIHRoZSBjb21wb25lbnQgdG8gYXZvaWQgY2FsbGluZyBpbml0QXBvbGxvKCkgdHdpY2UgaW4gdGhlIHNlcnZlci5cclxuICAvLyBPdGhlcndpc2UsIHRoZSBjb21wb25lbnQgd291bGQgaGF2ZSB0byBjYWxsIGluaXRBcG9sbG8oKSBhZ2FpbiBidXQgdGhpc1xyXG4gIC8vIHRpbWUgd2l0aG91dCB0aGUgY29udGV4dC4gT25jZSB0aGF0IGhhcHBlbnMsIHRoZSBmb2xsb3dpbmcgY29kZSB3aWxsIG1ha2Ugc3VyZSB3ZSBzZW5kXHJcbiAgLy8gdGhlIHByb3AgYXMgYG51bGxgIHRvIHRoZSBicm93c2VyLlxyXG4gIGFwb2xsb0NsaWVudC50b0pTT04gPSAoKSA9PiBudWxsXHJcblxyXG4gIC8vIEFkZCBhcG9sbG9DbGllbnQgdG8gTmV4dFBhZ2VDb250ZXh0ICYgTmV4dEFwcENvbnRleHQuXHJcbiAgLy8gVGhpcyBhbGxvd3MgdXMgdG8gY29uc3VtZSB0aGUgYXBvbGxvQ2xpZW50IGluc2lkZSBvdXJcclxuICAvLyBjdXN0b20gYGdldEluaXRpYWxQcm9wcyh7IGFwb2xsb0NsaWVudCB9KWAuXHJcbiAgY3R4LmFwb2xsb0NsaWVudCA9IGFwb2xsb0NsaWVudFxyXG4gIGlmIChpbkFwcENvbnRleHQpIHtcclxuICAgIGN0eC5jdHguYXBvbGxvQ2xpZW50ID0gYXBvbGxvQ2xpZW50XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY3R4XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbHdheXMgY3JlYXRlcyBhIG5ldyBhcG9sbG8gY2xpZW50IG9uIHRoZSBzZXJ2ZXJcclxuICogQ3JlYXRlcyBvciByZXVzZXMgYXBvbGxvIGNsaWVudCBpbiB0aGUgYnJvd3Nlci5cclxuICogQHBhcmFtICB7Tm9ybWFsaXplZENhY2hlT2JqZWN0fSBpbml0aWFsU3RhdGVcclxuICogQHBhcmFtICB7TmV4dFBhZ2VDb250ZXh0fSBjdHhcclxuICovXHJcbmNvbnN0IGluaXRBcG9sbG9DbGllbnQgPSAoaW5pdGlhbFN0YXRlLCBjdHgpID0+IHtcclxuICAvLyBNYWtlIHN1cmUgdG8gY3JlYXRlIGEgbmV3IGNsaWVudCBmb3IgZXZlcnkgc2VydmVyLXNpZGUgcmVxdWVzdCBzbyB0aGF0IGRhdGFcclxuICAvLyBpc24ndCBzaGFyZWQgYmV0d2VlbiBjb25uZWN0aW9ucyAod2hpY2ggd291bGQgYmUgYmFkKVxyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUFwb2xsb0NsaWVudChpbml0aWFsU3RhdGUsIGN0eClcclxuICB9XHJcblxyXG4gIC8vIFJldXNlIGNsaWVudCBvbiB0aGUgY2xpZW50LXNpZGVcclxuICBpZiAoIWdsb2JhbEFwb2xsb0NsaWVudCkge1xyXG4gICAgZ2xvYmFsQXBvbGxvQ2xpZW50ID0gY3JlYXRlQXBvbGxvQ2xpZW50KGluaXRpYWxTdGF0ZSwgY3R4KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGdsb2JhbEFwb2xsb0NsaWVudFxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHdpdGhBcG9sbG8gSE9DXHJcbiAqIHRoYXQgcHJvdmlkZXMgdGhlIGFwb2xsb0NvbnRleHRcclxuICogdG8gYSBuZXh0LmpzIFBhZ2Ugb3IgQXBwVHJlZS5cclxuICogQHBhcmFtICB7T2JqZWN0fSB3aXRoQXBvbGxvT3B0aW9uc1xyXG4gKiBAcGFyYW0gIHtCb29sZWFufSBbd2l0aEFwb2xsb09wdGlvbnMuc3NyPWZhbHNlXVxyXG4gKiBAcmV0dXJucyB7KFBhZ2VDb21wb25lbnQ6IFJlYWN0Tm9kZSkgPT4gUmVhY3ROb2RlfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdpdGhBcG9sbG8gPSAoeyBzc3IgPSBmYWxzZSB9ID0ge30pID0+IFBhZ2VDb21wb25lbnQgPT4ge1xyXG4gXHJcbiAgY29uc3QgV2l0aEFwb2xsbyA9ICh7IGFwb2xsb0NsaWVudCwgYXBvbGxvU3RhdGUsIC4uLnBhZ2VQcm9wcyB9KSA9PiB7XHJcbiAgICBsZXQgY2xpZW50XHJcbiAgICBpZiAoYXBvbGxvQ2xpZW50KSB7XHJcbiAgICAgIC8vIEhhcHBlbnMgb246IGdldERhdGFGcm9tVHJlZSAmIG5leHQuanMgc3NyXHJcbiAgICAgIGNsaWVudCA9IGFwb2xsb0NsaWVudFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gSGFwcGVucyBvbjogbmV4dC5qcyBjc3JcclxuICAgICAgY2xpZW50ID0gaW5pdEFwb2xsb0NsaWVudChhcG9sbG9TdGF0ZSwgdW5kZWZpbmVkKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxBcG9sbG9Qcm92aWRlciBjbGllbnQ9e2NsaWVudH0+XHJcbiAgICAgICAgPFBhZ2VDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgPC9BcG9sbG9Qcm92aWRlcj5cclxuICAgIClcclxuICB9XHJcblxyXG4gIC8vIFNldCB0aGUgY29ycmVjdCBkaXNwbGF5TmFtZSBpbiBkZXZlbG9wbWVudFxyXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9XHJcbiAgICAgIFBhZ2VDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgUGFnZUNvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnXHJcbiAgICBXaXRoQXBvbGxvLmRpc3BsYXlOYW1lID0gYHdpdGhBcG9sbG8oJHtkaXNwbGF5TmFtZX0pYFxyXG4gIH1cclxuXHJcblxyXG4gIGlmIChzc3IgfHwgUGFnZUNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMpIHtcclxuICAgIFdpdGhBcG9sbG8uZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgY3R4ID0+IHtcclxuICAgICAgY29uc3QgaW5BcHBDb250ZXh0ID0gQm9vbGVhbihjdHguY3R4KVxyXG4gICAgICBjb25zdCB7IGFwb2xsb0NsaWVudCB9ID0gaW5pdE9uQ29udGV4dChjdHgpXHJcblxyXG4gICAgICAvLyBSdW4gd3JhcHBlZCBnZXRJbml0aWFsUHJvcHMgbWV0aG9kc1xyXG4gICAgICBsZXQgcGFnZVByb3BzID0ge31cclxuICAgICAgaWYgKFBhZ2VDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKSB7XHJcbiAgICAgICAgcGFnZVByb3BzID0gYXdhaXQgUGFnZUNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMoY3R4KVxyXG4gICAgICB9IGVsc2UgaWYgKGluQXBwQ29udGV4dCkge1xyXG4gICAgICAgIHBhZ2VQcm9wcyA9IGF3YWl0IEFwcC5nZXRJbml0aWFsUHJvcHMoY3R4KVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBPbmx5IG9uIHRoZSBzZXJ2ZXI6XHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnN0IHsgQXBwVHJlZSB9ID0gY3R4XHJcbiAgICAgICAgLy8gV2hlbiByZWRpcmVjdGluZywgdGhlIHJlc3BvbnNlIGlzIGZpbmlzaGVkLlxyXG4gICAgICAgIC8vIE5vIHBvaW50IGluIGNvbnRpbnVpbmcgdG8gcmVuZGVyXHJcbiAgICAgICAgaWYgKGN0eC5yZXMgJiYgY3R4LnJlcy5maW5pc2hlZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHBhZ2VQcm9wc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT25seSBpZiBkYXRhRnJvbVRyZWUgaXMgZW5hYmxlZFxyXG4gICAgICAgIGlmIChzc3IgJiYgQXBwVHJlZSkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gSW1wb3J0IGBAYXBvbGxvL3JlYWN0LXNzcmAgZHluYW1pY2FsbHkuXHJcbiAgICAgICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gaGF2ZSB0aGlzIGluIG91ciBjbGllbnQgYnVuZGxlLlxyXG4gICAgICAgICAgICBjb25zdCB7IGdldERhdGFGcm9tVHJlZSB9ID0gYXdhaXQgaW1wb3J0KCdAYXBvbGxvL3JlYWN0LXNzcicpXHJcblxyXG4gICAgICAgICAgICAvLyBTaW5jZSBBcHBDb21wb25lbnRzIGFuZCBQYWdlQ29tcG9uZW50cyBoYXZlIGRpZmZlcmVudCBjb250ZXh0IHR5cGVzXHJcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gbW9kaWZ5IHRoZWlyIHByb3BzIGEgbGl0dGxlLlxyXG4gICAgICAgICAgICBsZXQgcHJvcHNcclxuICAgICAgICAgICAgaWYgKGluQXBwQ29udGV4dCkge1xyXG4gICAgICAgICAgICAgIHByb3BzID0geyAuLi5wYWdlUHJvcHMsIGFwb2xsb0NsaWVudCB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcHJvcHMgPSB7IHBhZ2VQcm9wczogeyAuLi5wYWdlUHJvcHMsIGFwb2xsb0NsaWVudCB9IH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVGFrZSB0aGUgTmV4dC5qcyBBcHBUcmVlLCBkZXRlcm1pbmUgd2hpY2ggcXVlcmllcyBhcmUgbmVlZGVkIHRvIHJlbmRlcixcclxuICAgICAgICAgICAgLy8gYW5kIGZldGNoIHRoZW0uIFRoaXMgbWV0aG9kIGNhbiBiZSBwcmV0dHkgc2xvdyBzaW5jZSBpdCByZW5kZXJzXHJcbiAgICAgICAgICAgIC8vIHlvdXIgZW50aXJlIEFwcFRyZWUgb25jZSBmb3IgZXZlcnkgcXVlcnkuIENoZWNrIG91dCBhcG9sbG8gZnJhZ21lbnRzXHJcbiAgICAgICAgICAgIC8vIGlmIHlvdSB3YW50IHRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHJlcmVuZGVycy5cclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cuYXBvbGxvZ3JhcGhxbC5jb20vZG9jcy9yZWFjdC9kYXRhL2ZyYWdtZW50cy9cclxuICAgICAgICAgICAgYXdhaXQgZ2V0RGF0YUZyb21UcmVlKDxBcHBUcmVlIHsuLi5wcm9wc30gLz4pXHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IEFwb2xsbyBDbGllbnQgR3JhcGhRTCBlcnJvcnMgZnJvbSBjcmFzaGluZyBTU1IuXHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGVtIGluIGNvbXBvbmVudHMgdmlhIHRoZSBkYXRhLmVycm9yIHByb3A6XHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvcmVhY3QvYXBpL3JlYWN0LWFwb2xsby5odG1sI2dyYXBocWwtcXVlcnktZGF0YS1lcnJvclxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSBydW5uaW5nIGBnZXREYXRhRnJvbVRyZWVgJywgZXJyb3IpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gZ2V0RGF0YUZyb21UcmVlIGRvZXMgbm90IGNhbGwgY29tcG9uZW50V2lsbFVubW91bnRcclxuICAgICAgICAgIC8vIGhlYWQgc2lkZSBlZmZlY3QgdGhlcmVmb3JlIG5lZWQgdG8gYmUgY2xlYXJlZCBtYW51YWxseVxyXG4gICAgICAgICAgSGVhZC5yZXdpbmQoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5wYWdlUHJvcHMsXHJcbiAgICAgICAgLy8gRXh0cmFjdCBxdWVyeSBkYXRhIGZyb20gdGhlIEFwb2xsbyBzdG9yZVxyXG4gICAgICAgIGFwb2xsb1N0YXRlOiBhcG9sbG9DbGllbnQuY2FjaGUuZXh0cmFjdCgpLFxyXG4gICAgICAgIC8vIFByb3ZpZGUgdGhlIGNsaWVudCBmb3Igc3NyLiBBcyBzb29uIGFzIHRoaXMgcGF5bG9hZFxyXG4gICAgICAgIC8vIGdldHMgSlNPTi5zdHJpbmdpZmllZCBpdCB3aWxsIHJlbW92ZSBpdHNlbGYuXHJcbiAgICAgICAgYXBvbGxvQ2xpZW50OiBjdHguYXBvbGxvQ2xpZW50LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gV2l0aEFwb2xsb1xyXG59XHJcbiIsImltcG9ydCB7dXNlQ2FsbGJhY2t9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7dXNlQ29va2llc30gZnJvbSAncmVhY3QtY29va2llJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIlxyXG5cclxuXHJcbmNvbnN0IHVzZUNvb2tpZVJlZGlyZWN0aW9uID0gKG9wdGlvbnMpID0+IHtcclxuXHJcbiAgICBjb25zdCBjb29raWVLZXkgPSBvcHRpb25zPy5jb29raWVLZXkgfHwgJ3JlZGlyZWN0X3VybCdcclxuXHJcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG5cclxuICAgIGNvbnN0IFtjb29raWVzLCBzZXRDb29raWUsIHJlbW92ZUNvb2tpZV0gPSB1c2VDb29raWVzKCk7XHJcblxyXG4gICAgY29uc3QgcmVkaXJlY3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAgICAgaWYoY29va2llcz8uW2Nvb2tpZUtleV0gJiYgY29va2llcz8uW2Nvb2tpZUtleV0gIT0gcm91dGVyLmFzUGF0aCkge1xyXG4gICAgICAgICAgICByb3V0ZXIucHVzaChjb29raWVzPy5bY29va2llS2V5XSkgIFxyXG4gICAgICAgICAgICByZW1vdmVDb29raWUoY29va2llS2V5LHsgcGF0aDogJy8nIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcm91dGVyLnB1c2goJy8nKVxyXG4gICAgICAgICAgICByZW1vdmVDb29raWUoY29va2llS2V5LHsgcGF0aDogJy8nIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfSxbY29va2llcyxjb29raWVLZXkscmVtb3ZlQ29va2llLHJvdXRlcl0pXHJcblxyXG4gICAgcmV0dXJuIHJlZGlyZWN0XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VDb29raWVSZWRpcmVjdGlvbiIsImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7IHVzZVNuYWNrYmFyIH0gZnJvbSBcIm5vdGlzdGFja1wiXHJcblxyXG5jb25zdCB1c2VHcmFwaFFMRXJyb3JEaXNwbGF5ID0gKGVycm9yKSA9PiB7XHJcblxyXG4gICAgY29uc3Qgc2NuYWNrYmFyID0gdXNlU25hY2tiYXIoKVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYoZXJyb3IpIHtcclxuICAgICAgICAgICAgZXJyb3IuZ3JhcGhRTEVycm9ycy5tYXAoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2NuYWNrYmFyLmVucXVldWVTbmFja2JhcihlcnIubWVzc2FnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQgOiAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFtlcnJvcixzY25hY2tiYXJdKVxyXG59IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlR3JhcGhRTEVycm9yRGlzcGxheSIsImltcG9ydCB7IEFwb2xsb0NsaWVudCB9IGZyb20gXCJhcG9sbG8tY2xpZW50XCJcclxuaW1wb3J0IHsgSW5NZW1vcnlDYWNoZSB9IGZyb20gXCJhcG9sbG8tY2FjaGUtaW5tZW1vcnlcIlxyXG5pbXBvcnQgeyBIdHRwTGluayB9IGZyb20gXCJhcG9sbG8tbGluay1odHRwXCJcclxuaW1wb3J0IGZldGNoIGZyb20gXCJpc29tb3JwaGljLXVuZmV0Y2hcIlxyXG4vLyBpbXBvcnQgeyBTY2hlbWFMaW5rIH0gZnJvbSAnYXBvbGxvLWxpbmstc2NoZW1hJztcclxuLy8gaW1wb3J0IHtzY2hlbWF9IGZyb20gJ2xpYi9zZXJ2ZXIvYXBvbGxvU2VydmVyL3NjaGVtYSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUFwb2xsb0NsaWVudChpbml0aWFsU3RhdGUsIGN0eCkge1xyXG4gIC8vIFRoZSBgY3R4YCAoTmV4dFBhZ2VDb250ZXh0KSB3aWxsIG9ubHkgYmUgcHJlc2VudCBvbiB0aGUgc2VydmVyLlxyXG4gIC8vIHVzZSBpdCB0byBleHRyYWN0IGF1dGggaGVhZGVycyAoY3R4LnJlcSkgb3Igc2ltaWxhci5cclxuXHJcbiAgY29uc3QgZW5jaGFuY2VkRmV0Y2ggPSAodXJsLCBpbml0KSA9PlxyXG4gICAgZmV0Y2godXJsLCB7XHJcbiAgICAgIC4uLmluaXQsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAuLi5pbml0LmhlYWRlcnMsXHJcbiAgICAgICAgQ29va2llOiBjdHgucmVxLmhlYWRlcnMuY29va2llLFxyXG4gICAgICB9LFxyXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICB9KVxyXG5cclxuICByZXR1cm4gbmV3IEFwb2xsb0NsaWVudCh7XHJcbiAgICBzc3JNb2RlOiBCb29sZWFuKGN0eCksXHJcbiAgICBsaW5rOiBuZXcgSHR0cExpbmsoe1xyXG4gICAgICB1cmk6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9ncmFwaHFsXCIsIC8vIFNlcnZlciBVUkwgKG11c3QgYmUgYWJzb2x1dGUpXHJcbiAgICAgIC8vIHVyaTogJ2h0dHBzOi8vYXBpLmdyYXBoLmNvb2wvc2ltcGxlL3YxL2NpeG1rdDJ1bDAxcTAwMTIybWtzZzgycG4nLCAvLyBTZXJ2ZXIgVVJMIChtdXN0IGJlIGFic29sdXRlKVxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsIC8vIEFkZGl0aW9uYWwgZmV0Y2goKSBvcHRpb25zIGxpa2UgYGNyZWRlbnRpYWxzYCBvciBgaGVhZGVyc2BcclxuICAgICAgZmV0Y2g6IGN0eCA/IGVuY2hhbmNlZEZldGNoIDogZmV0Y2gsXHJcbiAgICB9KSxcclxuICAgIC8vIGxpbms6bmV3IFNjaGVtYUxpbmsoe3NjaGVtYX0pLFxyXG4gICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKCkucmVzdG9yZShpbml0aWFsU3RhdGUpLFxyXG4gIH0pXHJcbn1cclxuIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gIHZhciBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICAgIHJldHVybiBjYWNoZTtcbiAgfTtcblxuICByZXR1cm4gY2FjaGU7XG59XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikge1xuICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB7XG4gICAgICBcImRlZmF1bHRcIjogb2JqXG4gICAgfTtcbiAgfVxuXG4gIHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpO1xuXG4gIGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkge1xuICAgIHJldHVybiBjYWNoZS5nZXQob2JqKTtcbiAgfVxuXG4gIHZhciBuZXdPYmogPSB7fTtcbiAgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7XG5cbiAgICAgIGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajtcblxuICBpZiAoY2FjaGUpIHtcbiAgICBjYWNoZS5zZXQob2JqLCBuZXdPYmopO1xuICB9XG5cbiAgcmV0dXJuIG5ld09iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZDsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvcGFnZXMvX2FwcCcpXG4iLCJkZWNsYXJlIGNvbnN0IF9fTkVYVF9EQVRBX186IGFueVxuXG5pbXBvcnQgUmVhY3QsIHsgQ2hpbGRyZW4sIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcGFyc2UsIHJlc29sdmUsIFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IFByZWZldGNoT3B0aW9ucyB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvcm91dGVyJ1xuaW1wb3J0IHtcbiAgZXhlY09uY2UsXG4gIGZvcm1hdFdpdGhWYWxpZGF0aW9uLFxuICBnZXRMb2NhdGlvbk9yaWdpbixcbn0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3V0aWxzJ1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlcidcbmltcG9ydCB7IGFkZEJhc2VQYXRoIH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXInXG5cbmZ1bmN0aW9uIGlzTG9jYWwoaHJlZjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHVybCA9IHBhcnNlKGhyZWYsIGZhbHNlLCB0cnVlKVxuICBjb25zdCBvcmlnaW4gPSBwYXJzZShnZXRMb2NhdGlvbk9yaWdpbigpLCBmYWxzZSwgdHJ1ZSlcblxuICByZXR1cm4gKFxuICAgICF1cmwuaG9zdCB8fCAodXJsLnByb3RvY29sID09PSBvcmlnaW4ucHJvdG9jb2wgJiYgdXJsLmhvc3QgPT09IG9yaWdpbi5ob3N0KVxuICApXG59XG5cbnR5cGUgVXJsID0gc3RyaW5nIHwgVXJsT2JqZWN0XG50eXBlIEZvcm1hdFJlc3VsdCA9IHsgaHJlZjogc3RyaW5nOyBhcz86IHN0cmluZyB9XG5cbmZ1bmN0aW9uIG1lbW9pemVkRm9ybWF0VXJsKGZvcm1hdEZ1bmM6IChocmVmOiBVcmwsIGFzPzogVXJsKSA9PiBGb3JtYXRSZXN1bHQpIHtcbiAgbGV0IGxhc3RIcmVmOiBudWxsIHwgVXJsID0gbnVsbFxuICBsZXQgbGFzdEFzOiB1bmRlZmluZWQgfCBudWxsIHwgVXJsID0gbnVsbFxuICBsZXQgbGFzdFJlc3VsdDogbnVsbCB8IEZvcm1hdFJlc3VsdCA9IG51bGxcbiAgcmV0dXJuIChocmVmOiBVcmwsIGFzPzogVXJsKSA9PiB7XG4gICAgaWYgKGxhc3RSZXN1bHQgJiYgaHJlZiA9PT0gbGFzdEhyZWYgJiYgYXMgPT09IGxhc3RBcykge1xuICAgICAgcmV0dXJuIGxhc3RSZXN1bHRcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBmb3JtYXRGdW5jKGhyZWYsIGFzKVxuICAgIGxhc3RIcmVmID0gaHJlZlxuICAgIGxhc3RBcyA9IGFzXG4gICAgbGFzdFJlc3VsdCA9IHJlc3VsdFxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRVcmwodXJsOiBVcmwpOiBzdHJpbmcge1xuICByZXR1cm4gdXJsICYmIHR5cGVvZiB1cmwgPT09ICdvYmplY3QnID8gZm9ybWF0V2l0aFZhbGlkYXRpb24odXJsKSA6IHVybFxufVxuXG5leHBvcnQgdHlwZSBMaW5rUHJvcHMgPSB7XG4gIGhyZWY6IFVybFxuICBhcz86IFVybFxuICByZXBsYWNlPzogYm9vbGVhblxuICBzY3JvbGw/OiBib29sZWFuXG4gIHNoYWxsb3c/OiBib29sZWFuXG4gIHBhc3NIcmVmPzogYm9vbGVhblxuICBwcmVmZXRjaD86IGJvb2xlYW5cbn1cblxubGV0IGNhY2hlZE9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuY29uc3QgbGlzdGVuZXJzID0gbmV3IE1hcDxFbGVtZW50LCAoKSA9PiB2b2lkPigpXG5jb25zdCBJbnRlcnNlY3Rpb25PYnNlcnZlciA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyIDogbnVsbFxuY29uc3QgcHJlZmV0Y2hlZDogeyBbY2FjaGVLZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9XG5cbmZ1bmN0aW9uIGdldE9ic2VydmVyKCk6IEludGVyc2VjdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkIHtcbiAgLy8gUmV0dXJuIHNoYXJlZCBpbnN0YW5jZSBvZiBJbnRlcnNlY3Rpb25PYnNlcnZlciBpZiBhbHJlYWR5IGNyZWF0ZWRcbiAgaWYgKGNhY2hlZE9ic2VydmVyKSB7XG4gICAgcmV0dXJuIGNhY2hlZE9ic2VydmVyXG4gIH1cblxuICAvLyBPbmx5IGNyZWF0ZSBzaGFyZWQgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgaWYgc3VwcG9ydGVkIGluIGJyb3dzZXJcbiAgaWYgKCFJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHJldHVybiAoY2FjaGVkT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgKGVudHJpZXMpID0+IHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMuaGFzKGVudHJ5LnRhcmdldCkpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNiID0gbGlzdGVuZXJzLmdldChlbnRyeS50YXJnZXQpIVxuICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcgfHwgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwKSB7XG4gICAgICAgICAgY2FjaGVkT2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldClcbiAgICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGVudHJ5LnRhcmdldClcbiAgICAgICAgICBjYigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICB7IHJvb3RNYXJnaW46ICcyMDBweCcgfVxuICApKVxufVxuXG5jb25zdCBsaXN0ZW5Ub0ludGVyc2VjdGlvbnMgPSAoZWw6IEVsZW1lbnQsIGNiOiAoKSA9PiB2b2lkKSA9PiB7XG4gIGNvbnN0IG9ic2VydmVyID0gZ2V0T2JzZXJ2ZXIoKVxuICBpZiAoIW9ic2VydmVyKSB7XG4gICAgcmV0dXJuICgpID0+IHt9XG4gIH1cblxuICBvYnNlcnZlci5vYnNlcnZlKGVsKVxuICBsaXN0ZW5lcnMuc2V0KGVsLCBjYilcbiAgcmV0dXJuICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgfVxuICAgIGxpc3RlbmVycy5kZWxldGUoZWwpXG4gIH1cbn1cblxuY2xhc3MgTGluayBleHRlbmRzIENvbXBvbmVudDxMaW5rUHJvcHM+IHtcbiAgcDogYm9vbGVhblxuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBMaW5rUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHByb3BzLnByZWZldGNoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnTmV4dC5qcyBhdXRvLXByZWZldGNoZXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiB2aWV3cG9ydC4gVGhlIHByZWZldGNoIGF0dHJpYnV0ZSBpcyBubyBsb25nZXIgbmVlZGVkLiBNb3JlOiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9wcmVmZXRjaC10cnVlLWRlcHJlY2F0ZWQnXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wID0gcHJvcHMucHJlZmV0Y2ggIT09IGZhbHNlXG4gIH1cblxuICBjbGVhblVwTGlzdGVuZXJzID0gKCkgPT4ge31cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFuVXBMaXN0ZW5lcnMoKVxuICB9XG5cbiAgZ2V0UGF0aHMoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHdpbmRvdy5sb2NhdGlvblxuICAgIGNvbnN0IHsgaHJlZjogcGFyc2VkSHJlZiwgYXM6IHBhcnNlZEFzIH0gPSB0aGlzLmZvcm1hdFVybHMoXG4gICAgICB0aGlzLnByb3BzLmhyZWYsXG4gICAgICB0aGlzLnByb3BzLmFzXG4gICAgKVxuICAgIGNvbnN0IHJlc29sdmVkSHJlZiA9IHJlc29sdmUocGF0aG5hbWUsIHBhcnNlZEhyZWYpXG4gICAgcmV0dXJuIFtyZXNvbHZlZEhyZWYsIHBhcnNlZEFzID8gcmVzb2x2ZShwYXRobmFtZSwgcGFyc2VkQXMpIDogcmVzb2x2ZWRIcmVmXVxuICB9XG5cbiAgaGFuZGxlUmVmKHJlZjogRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnAgJiYgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgJiYgcmVmICYmIHJlZi50YWdOYW1lKSB7XG4gICAgICB0aGlzLmNsZWFuVXBMaXN0ZW5lcnMoKVxuXG4gICAgICBjb25zdCBpc1ByZWZldGNoZWQgPVxuICAgICAgICBwcmVmZXRjaGVkW1xuICAgICAgICAgIHRoaXMuZ2V0UGF0aHMoKS5qb2luKFxuICAgICAgICAgICAgLy8gSm9pbiBvbiBhbiBpbnZhbGlkIFVSSSBjaGFyYWN0ZXJcbiAgICAgICAgICAgICclJ1xuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgICAgaWYgKCFpc1ByZWZldGNoZWQpIHtcbiAgICAgICAgdGhpcy5jbGVhblVwTGlzdGVuZXJzID0gbGlzdGVuVG9JbnRlcnNlY3Rpb25zKHJlZiwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJlZmV0Y2goKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFRoZSBmdW5jdGlvbiBpcyBtZW1vaXplZCBzbyB0aGF0IG5vIGV4dHJhIGxpZmVjeWNsZXMgYXJlIG5lZWRlZFxuICAvLyBhcyBwZXIgaHR0cHM6Ly9yZWFjdGpzLm9yZy9ibG9nLzIwMTgvMDYvMDcveW91LXByb2JhYmx5LWRvbnQtbmVlZC1kZXJpdmVkLXN0YXRlLmh0bWxcbiAgZm9ybWF0VXJscyA9IG1lbW9pemVkRm9ybWF0VXJsKChocmVmLCBhc0hyZWYpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaHJlZjogYWRkQmFzZVBhdGgoZm9ybWF0VXJsKGhyZWYpKSxcbiAgICAgIGFzOiBhc0hyZWYgPyBhZGRCYXNlUGF0aChmb3JtYXRVcmwoYXNIcmVmKSkgOiBhc0hyZWYsXG4gICAgfVxuICB9KVxuXG4gIGxpbmtDbGlja2VkID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IG5vZGVOYW1lLCB0YXJnZXQgfSA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MQW5jaG9yRWxlbWVudFxuICAgIGlmIChcbiAgICAgIG5vZGVOYW1lID09PSAnQScgJiZcbiAgICAgICgodGFyZ2V0ICYmIHRhcmdldCAhPT0gJ19zZWxmJykgfHxcbiAgICAgICAgZS5tZXRhS2V5IHx8XG4gICAgICAgIGUuY3RybEtleSB8fFxuICAgICAgICBlLnNoaWZ0S2V5IHx8XG4gICAgICAgIChlLm5hdGl2ZUV2ZW50ICYmIGUubmF0aXZlRXZlbnQud2hpY2ggPT09IDIpKVxuICAgICkge1xuICAgICAgLy8gaWdub3JlIGNsaWNrIGZvciBuZXcgdGFiIC8gbmV3IHdpbmRvdyBiZWhhdmlvclxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHsgaHJlZiwgYXMgfSA9IHRoaXMuZm9ybWF0VXJscyh0aGlzLnByb3BzLmhyZWYsIHRoaXMucHJvcHMuYXMpXG5cbiAgICBpZiAoIWlzTG9jYWwoaHJlZikpIHtcbiAgICAgIC8vIGlnbm9yZSBjbGljayBpZiBpdCdzIG91dHNpZGUgb3VyIHNjb3BlIChlLmcuIGh0dHBzOi8vZ29vZ2xlLmNvbSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHdpbmRvdy5sb2NhdGlvblxuICAgIGhyZWYgPSByZXNvbHZlKHBhdGhuYW1lLCBocmVmKVxuICAgIGFzID0gYXMgPyByZXNvbHZlKHBhdGhuYW1lLCBhcykgOiBocmVmXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIC8vICBhdm9pZCBzY3JvbGwgZm9yIHVybHMgd2l0aCBhbmNob3IgcmVmc1xuICAgIGxldCB7IHNjcm9sbCB9ID0gdGhpcy5wcm9wc1xuICAgIGlmIChzY3JvbGwgPT0gbnVsbCkge1xuICAgICAgc2Nyb2xsID0gYXMuaW5kZXhPZignIycpIDwgMFxuICAgIH1cblxuICAgIC8vIHJlcGxhY2Ugc3RhdGUgaW5zdGVhZCBvZiBwdXNoIGlmIHByb3AgaXMgcHJlc2VudFxuICAgIFJvdXRlclt0aGlzLnByb3BzLnJlcGxhY2UgPyAncmVwbGFjZScgOiAncHVzaCddKGhyZWYsIGFzLCB7XG4gICAgICBzaGFsbG93OiB0aGlzLnByb3BzLnNoYWxsb3csXG4gICAgfSkudGhlbigoc3VjY2VzczogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKCFzdWNjZXNzKSByZXR1cm5cbiAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcmVmZXRjaChvcHRpb25zPzogUHJlZmV0Y2hPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnAgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVyblxuICAgIC8vIFByZWZldGNoIHRoZSBKU09OIHBhZ2UgaWYgYXNrZWQgKG9ubHkgaW4gdGhlIGNsaWVudClcbiAgICBjb25zdCBwYXRocyA9IHRoaXMuZ2V0UGF0aHMoKVxuICAgIC8vIFdlIG5lZWQgdG8gaGFuZGxlIGEgcHJlZmV0Y2ggZXJyb3IgaGVyZSBzaW5jZSB3ZSBtYXkgYmVcbiAgICAvLyBsb2FkaW5nIHdpdGggcHJpb3JpdHkgd2hpY2ggY2FuIHJlamVjdCBidXQgd2UgZG9uJ3RcbiAgICAvLyB3YW50IHRvIGZvcmNlIG5hdmlnYXRpb24gc2luY2UgdGhpcyBpcyBvbmx5IGEgcHJlZmV0Y2hcbiAgICBSb3V0ZXIucHJlZmV0Y2gocGF0aHNbLyogaHJlZiAqLyAwXSwgcGF0aHNbLyogYXNQYXRoICovIDFdLCBvcHRpb25zKS5jYXRjaChcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAvLyByZXRocm93IHRvIHNob3cgaW52YWxpZCBVUkwgZXJyb3JzXG4gICAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gICAgcHJlZmV0Y2hlZFtcbiAgICAgIHBhdGhzLmpvaW4oXG4gICAgICAgIC8vIEpvaW4gb24gYW4gaW52YWxpZCBVUkkgY2hhcmFjdGVyXG4gICAgICAgICclJ1xuICAgICAgKVxuICAgIF0gPSB0cnVlXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IGhyZWYsIGFzIH0gPSB0aGlzLmZvcm1hdFVybHModGhpcy5wcm9wcy5ocmVmLCB0aGlzLnByb3BzLmFzKVxuICAgIC8vIERlcHJlY2F0ZWQuIFdhcm5pbmcgc2hvd24gYnkgcHJvcFR5cGUgY2hlY2suIElmIHRoZSBjaGlsZHJlbiBwcm92aWRlZCBpcyBhIHN0cmluZyAoPExpbms+ZXhhbXBsZTwvTGluaz4pIHdlIHdyYXAgaXQgaW4gYW4gPGE+IHRhZ1xuICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICBjaGlsZHJlbiA9IDxhPntjaGlsZHJlbn08L2E+XG4gICAgfVxuXG4gICAgLy8gVGhpcyB3aWxsIHJldHVybiB0aGUgZmlyc3QgY2hpbGQsIGlmIG11bHRpcGxlIGFyZSBwcm92aWRlZCBpdCB3aWxsIHRocm93IGFuIGVycm9yXG4gICAgY29uc3QgY2hpbGQ6IGFueSA9IENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pXG4gICAgY29uc3QgcHJvcHM6IHtcbiAgICAgIG9uTW91c2VFbnRlcjogUmVhY3QuTW91c2VFdmVudEhhbmRsZXJcbiAgICAgIG9uQ2xpY2s6IFJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyXG4gICAgICBocmVmPzogc3RyaW5nXG4gICAgICByZWY/OiBhbnlcbiAgICB9ID0ge1xuICAgICAgcmVmOiAoZWw6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZVJlZihlbClcblxuICAgICAgICBpZiAoY2hpbGQgJiYgdHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JyAmJiBjaGlsZC5yZWYpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkLnJlZiA9PT0gJ2Z1bmN0aW9uJykgY2hpbGQucmVmKGVsKVxuICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZC5yZWYgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjaGlsZC5yZWYuY3VycmVudCA9IGVsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25Nb3VzZUVudGVyOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQucHJvcHMgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlcihlKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlZmV0Y2goeyBwcmlvcml0eTogdHJ1ZSB9KVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC5wcm9wcyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNoaWxkLnByb3BzLm9uQ2xpY2soZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgIHRoaXMubGlua0NsaWNrZWQoZSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG5cbiAgICAvLyBJZiBjaGlsZCBpcyBhbiA8YT4gdGFnIGFuZCBkb2Vzbid0IGhhdmUgYSBocmVmIGF0dHJpYnV0ZSwgb3IgaWYgdGhlICdwYXNzSHJlZicgcHJvcGVydHkgaXNcbiAgICAvLyBkZWZpbmVkLCB3ZSBzcGVjaWZ5IHRoZSBjdXJyZW50ICdocmVmJywgc28gdGhhdCByZXBldGl0aW9uIGlzIG5vdCBuZWVkZWQgYnkgdGhlIHVzZXJcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLnBhc3NIcmVmIHx8XG4gICAgICAoY2hpbGQudHlwZSA9PT0gJ2EnICYmICEoJ2hyZWYnIGluIGNoaWxkLnByb3BzKSlcbiAgICApIHtcbiAgICAgIHByb3BzLmhyZWYgPSBhcyB8fCBocmVmXG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBlbmRpbmcgc2xhc2ggdG8gdGhlIHBhdGhzLiBTbywgd2UgY2FuIHNlcnZlIHRoZVxuICAgIC8vIFwiPHBhZ2U+L2luZGV4Lmh0bWxcIiBkaXJlY3RseS5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0VYUE9SVF9UUkFJTElOR19TTEFTSCkge1xuICAgICAgY29uc3QgcmV3cml0ZVVybEZvck5leHRFeHBvcnQgPSByZXF1aXJlKCcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3Jld3JpdGUtdXJsLWZvci1leHBvcnQnKVxuICAgICAgICAucmV3cml0ZVVybEZvck5leHRFeHBvcnRcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMuaHJlZiAmJlxuICAgICAgICB0eXBlb2YgX19ORVhUX0RBVEFfXyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgX19ORVhUX0RBVEFfXy5uZXh0RXhwb3J0XG4gICAgICApIHtcbiAgICAgICAgcHJvcHMuaHJlZiA9IHJld3JpdGVVcmxGb3JOZXh0RXhwb3J0KHByb3BzLmhyZWYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwgcHJvcHMpXG4gIH1cbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIGNvbnN0IHdhcm4gPSBleGVjT25jZShjb25zb2xlLmVycm9yKVxuXG4gIC8vIFRoaXMgbW9kdWxlIGdldHMgcmVtb3ZlZCBieSB3ZWJwYWNrLklnbm9yZVBsdWdpblxuICBjb25zdCBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJylcbiAgY29uc3QgZXhhY3QgPSByZXF1aXJlKCdwcm9wLXR5cGVzLWV4YWN0JylcbiAgLy8gQHRzLWlnbm9yZSB0aGUgcHJvcGVydHkgaXMgc3VwcG9ydGVkLCB3aGVuIGRlY2xhcmluZyBpdCBvbiB0aGUgY2xhc3MgaXQgb3V0cHV0cyBhbiBleHRyYSBiaXQgb2YgY29kZSB3aGljaCBpcyBub3QgbmVlZGVkLlxuICBMaW5rLnByb3BUeXBlcyA9IGV4YWN0KHtcbiAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSkuaXNSZXF1aXJlZCxcbiAgICBhczogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pLFxuICAgIHByZWZldGNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXBsYWNlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaGFsbG93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBwYXNzSHJlZjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2Nyb2xsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgIChwcm9wczogYW55LCBwcm9wTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNbcHJvcE5hbWVdXG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgYFdhcm5pbmc6IFlvdSdyZSB1c2luZyBhIHN0cmluZyBkaXJlY3RseSBpbnNpZGUgPExpbms+LiBUaGlzIHVzYWdlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFBsZWFzZSBhZGQgYW4gPGE+IHRhZyBhcyBjaGlsZCBvZiA8TGluaz5gXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH0sXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlua1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJvdXRlciwgeyBOZXh0Um91dGVyIH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXInXG5pbXBvcnQgeyBSb3V0ZXJDb250ZXh0IH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0J1xuXG50eXBlIENsYXNzQXJndW1lbnRzPFQ+ID0gVCBleHRlbmRzIG5ldyAoLi4uYXJnczogaW5mZXIgVSkgPT4gYW55ID8gVSA6IGFueVxuXG50eXBlIFJvdXRlckFyZ3MgPSBDbGFzc0FyZ3VtZW50czx0eXBlb2YgUm91dGVyPlxuXG50eXBlIFNpbmdsZXRvblJvdXRlckJhc2UgPSB7XG4gIHJvdXRlcjogUm91dGVyIHwgbnVsbFxuICByZWFkeUNhbGxiYWNrczogQXJyYXk8KCkgPT4gYW55PlxuICByZWFkeShjYjogKCkgPT4gYW55KTogdm9pZFxufVxuXG5leHBvcnQgeyBSb3V0ZXIsIE5leHRSb3V0ZXIgfVxuXG5leHBvcnQgdHlwZSBTaW5nbGV0b25Sb3V0ZXIgPSBTaW5nbGV0b25Sb3V0ZXJCYXNlICYgTmV4dFJvdXRlclxuXG5jb25zdCBzaW5nbGV0b25Sb3V0ZXI6IFNpbmdsZXRvblJvdXRlckJhc2UgPSB7XG4gIHJvdXRlcjogbnVsbCwgLy8gaG9sZHMgdGhlIGFjdHVhbCByb3V0ZXIgaW5zdGFuY2VcbiAgcmVhZHlDYWxsYmFja3M6IFtdLFxuICByZWFkeShjYjogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnJvdXRlcikgcmV0dXJuIGNiKClcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucmVhZHlDYWxsYmFja3MucHVzaChjYilcbiAgICB9XG4gIH0sXG59XG5cbi8vIENyZWF0ZSBwdWJsaWMgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgcm91dGVyIGluIHRoZSBzaW5nbGV0b25Sb3V0ZXJcbmNvbnN0IHVybFByb3BlcnR5RmllbGRzID0gW1xuICAncGF0aG5hbWUnLFxuICAncm91dGUnLFxuICAncXVlcnknLFxuICAnYXNQYXRoJyxcbiAgJ2NvbXBvbmVudHMnLFxuICAnaXNGYWxsYmFjaycsXG4gICdiYXNlUGF0aCcsXG5dXG5jb25zdCByb3V0ZXJFdmVudHMgPSBbXG4gICdyb3V0ZUNoYW5nZVN0YXJ0JyxcbiAgJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLFxuICAncm91dGVDaGFuZ2VDb21wbGV0ZScsXG4gICdyb3V0ZUNoYW5nZUVycm9yJyxcbiAgJ2hhc2hDaGFuZ2VTdGFydCcsXG4gICdoYXNoQ2hhbmdlQ29tcGxldGUnLFxuXVxuY29uc3QgY29yZU1ldGhvZEZpZWxkcyA9IFtcbiAgJ3B1c2gnLFxuICAncmVwbGFjZScsXG4gICdyZWxvYWQnLFxuICAnYmFjaycsXG4gICdwcmVmZXRjaCcsXG4gICdiZWZvcmVQb3BTdGF0ZScsXG5dXG5cbi8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsICdldmVudHMnLCB7XG4gIGdldCgpIHtcbiAgICByZXR1cm4gUm91dGVyLmV2ZW50c1xuICB9LFxufSlcblxudXJsUHJvcGVydHlGaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgLy8gSGVyZSB3ZSBuZWVkIHRvIHVzZSBPYmplY3QuZGVmaW5lUHJvcGVydHkgYmVjYXVzZSwgd2UgbmVlZCB0byByZXR1cm5cbiAgLy8gdGhlIHByb3BlcnR5IGFzc2lnbmVkIHRvIHRoZSBhY3R1YWwgcm91dGVyXG4gIC8vIFRoZSB2YWx1ZSBtaWdodCBnZXQgY2hhbmdlZCBhcyB3ZSBjaGFuZ2Ugcm91dGVzIGFuZCB0aGlzIGlzIHRoZVxuICAvLyBwcm9wZXIgd2F5IHRvIGFjY2VzcyBpdFxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2luZ2xldG9uUm91dGVyLCBmaWVsZCwge1xuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IHJvdXRlciA9IGdldFJvdXRlcigpIGFzIGFueVxuICAgICAgcmV0dXJuIHJvdXRlcltmaWVsZF0gYXMgc3RyaW5nXG4gICAgfSxcbiAgfSlcbn0pXG5cbmNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgLy8gV2UgZG9uJ3QgcmVhbGx5IGtub3cgdGhlIHR5cGVzIGhlcmUsIHNvIHdlIGFkZCB0aGVtIGxhdGVyIGluc3RlYWRcbiAgOyhzaW5nbGV0b25Sb3V0ZXIgYXMgYW55KVtmaWVsZF0gPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKSBhcyBhbnlcbiAgICByZXR1cm4gcm91dGVyW2ZpZWxkXSguLi5hcmdzKVxuICB9XG59KVxuXG5yb3V0ZXJFdmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5KCgpID0+IHtcbiAgICBSb3V0ZXIuZXZlbnRzLm9uKGV2ZW50LCAoLi4uYXJncykgPT4ge1xuICAgICAgY29uc3QgZXZlbnRGaWVsZCA9IGBvbiR7ZXZlbnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtldmVudC5zdWJzdHJpbmcoXG4gICAgICAgIDFcbiAgICAgICl9YFxuICAgICAgY29uc3QgX3NpbmdsZXRvblJvdXRlciA9IHNpbmdsZXRvblJvdXRlciBhcyBhbnlcbiAgICAgIGlmIChfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgX3NpbmdsZXRvblJvdXRlcltldmVudEZpZWxkXSguLi5hcmdzKVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoZW4gcnVubmluZyB0aGUgUm91dGVyIGV2ZW50OiAke2V2ZW50RmllbGR9YClcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7ZXJyLm1lc3NhZ2V9XFxuJHtlcnIuc3RhY2t9YClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59KVxuXG5mdW5jdGlvbiBnZXRSb3V0ZXIoKTogUm91dGVyIHtcbiAgaWYgKCFzaW5nbGV0b25Sb3V0ZXIucm91dGVyKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAnTm8gcm91dGVyIGluc3RhbmNlIGZvdW5kLlxcbicgK1xuICAgICAgJ1lvdSBzaG91bGQgb25seSB1c2UgXCJuZXh0L3JvdXRlclwiIGluc2lkZSB0aGUgY2xpZW50IHNpZGUgb2YgeW91ciBhcHAuXFxuJ1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICB9XG4gIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyXG59XG5cbi8vIEV4cG9ydCB0aGUgc2luZ2xldG9uUm91dGVyIGFuZCB0aGlzIGlzIHRoZSBwdWJsaWMgQVBJLlxuZXhwb3J0IGRlZmF1bHQgc2luZ2xldG9uUm91dGVyIGFzIFNpbmdsZXRvblJvdXRlclxuXG4vLyBSZWV4cG9ydCB0aGUgd2l0aFJvdXRlIEhPQ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoUm91dGVyIH0gZnJvbSAnLi93aXRoLXJvdXRlcidcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpOiBOZXh0Um91dGVyIHtcbiAgcmV0dXJuIFJlYWN0LnVzZUNvbnRleHQoUm91dGVyQ29udGV4dClcbn1cblxuLy8gSU5URVJOQUwgQVBJU1xuLy8gLS0tLS0tLS0tLS0tLVxuLy8gKGRvIG5vdCB1c2UgZm9sbG93aW5nIGV4cG9ydHMgaW5zaWRlIHRoZSBhcHApXG5cbi8vIENyZWF0ZSBhIHJvdXRlciBhbmQgYXNzaWduIGl0IGFzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2UuXG4vLyBUaGlzIGlzIHVzZWQgaW4gY2xpZW50IHNpZGUgd2hlbiB3ZSBhcmUgaW5pdGlsaXppbmcgdGhlIGFwcC5cbi8vIFRoaXMgc2hvdWxkICoqbm90KiogdXNlIGluc2lkZSB0aGUgc2VydmVyLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJvdXRlciA9ICguLi5hcmdzOiBSb3V0ZXJBcmdzKTogUm91dGVyID0+IHtcbiAgc2luZ2xldG9uUm91dGVyLnJvdXRlciA9IG5ldyBSb3V0ZXIoLi4uYXJncylcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5Q2FsbGJhY2tzLmZvckVhY2goKGNiKSA9PiBjYigpKVxuICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MgPSBbXVxuXG4gIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBjcmVhdGUgdGhlIGB3aXRoUm91dGVyYCByb3V0ZXIgaW5zdGFuY2VcbmV4cG9ydCBmdW5jdGlvbiBtYWtlUHVibGljUm91dGVySW5zdGFuY2Uocm91dGVyOiBSb3V0ZXIpOiBOZXh0Um91dGVyIHtcbiAgY29uc3QgX3JvdXRlciA9IHJvdXRlciBhcyBhbnlcbiAgY29uc3QgaW5zdGFuY2UgPSB7fSBhcyBhbnlcblxuICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHVybFByb3BlcnR5RmllbGRzKSB7XG4gICAgaWYgKHR5cGVvZiBfcm91dGVyW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IE9iamVjdC5hc3NpZ24oe30sIF9yb3V0ZXJbcHJvcGVydHldKSAvLyBtYWtlcyBzdXJlIHF1ZXJ5IGlzIG5vdCBzdGF0ZWZ1bFxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBfcm91dGVyW3Byb3BlcnR5XVxuICB9XG5cbiAgLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuICBpbnN0YW5jZS5ldmVudHMgPSBSb3V0ZXIuZXZlbnRzXG5cbiAgY29yZU1ldGhvZEZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgIGluc3RhbmNlW2ZpZWxkXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgcmV0dXJuIF9yb3V0ZXJbZmllbGRdKC4uLmFyZ3MpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBpbnN0YW5jZVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTmV4dENvbXBvbmVudFR5cGUsIE5leHRQYWdlQ29udGV4dCB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi91dGlscydcbmltcG9ydCB7IE5leHRSb3V0ZXIsIHVzZVJvdXRlciB9IGZyb20gJy4vcm91dGVyJ1xuXG5leHBvcnQgdHlwZSBXaXRoUm91dGVyUHJvcHMgPSB7XG4gIHJvdXRlcjogTmV4dFJvdXRlclxufVxuXG5leHBvcnQgdHlwZSBFeGNsdWRlUm91dGVyUHJvcHM8UD4gPSBQaWNrPFxuICBQLFxuICBFeGNsdWRlPGtleW9mIFAsIGtleW9mIFdpdGhSb3V0ZXJQcm9wcz5cbj5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2l0aFJvdXRlcjxcbiAgUCBleHRlbmRzIFdpdGhSb3V0ZXJQcm9wcyxcbiAgQyA9IE5leHRQYWdlQ29udGV4dFxuPihcbiAgQ29tcG9zZWRDb21wb25lbnQ6IE5leHRDb21wb25lbnRUeXBlPEMsIGFueSwgUD5cbik6IFJlYWN0LkNvbXBvbmVudFR5cGU8RXhjbHVkZVJvdXRlclByb3BzPFA+PiB7XG4gIGZ1bmN0aW9uIFdpdGhSb3V0ZXJXcmFwcGVyKHByb3BzOiBhbnkpIHtcbiAgICByZXR1cm4gPENvbXBvc2VkQ29tcG9uZW50IHJvdXRlcj17dXNlUm91dGVyKCl9IHsuLi5wcm9wc30gLz5cbiAgfVxuXG4gIFdpdGhSb3V0ZXJXcmFwcGVyLmdldEluaXRpYWxQcm9wcyA9IENvbXBvc2VkQ29tcG9uZW50LmdldEluaXRpYWxQcm9wc1xuICAvLyBUaGlzIGlzIG5lZWRlZCB0byBhbGxvdyBjaGVja2luZyBmb3IgY3VzdG9tIGdldEluaXRpYWxQcm9wcyBpbiBfYXBwXG4gIDsoV2l0aFJvdXRlcldyYXBwZXIgYXMgYW55KS5vcmlnR2V0SW5pdGlhbFByb3BzID0gKENvbXBvc2VkQ29tcG9uZW50IGFzIGFueSkub3JpZ0dldEluaXRpYWxQcm9wc1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNvbnN0IG5hbWUgPVxuICAgICAgQ29tcG9zZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9zZWRDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bidcbiAgICBXaXRoUm91dGVyV3JhcHBlci5kaXNwbGF5TmFtZSA9IGB3aXRoUm91dGVyKCR7bmFtZX0pYFxuICB9XG5cbiAgcmV0dXJuIFdpdGhSb3V0ZXJXcmFwcGVyXG59XG4iLCIvKlxuTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSBKYXNvbiBNaWxsZXIgKGh0dHBzOi8vamFzb25mb3JtYXQuY29tLylcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8gVGhpcyBmaWxlIGlzIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvbWl0dC9ibG9iL3YxLjEuMy9zcmMvaW5kZXguanNcbi8vIEl0J3MgYmVlbiBlZGl0ZWQgZm9yIHRoZSBuZWVkcyBvZiB0aGlzIHNjcmlwdFxuLy8gU2VlIHRoZSBMSUNFTlNFIGF0IHRoZSB0b3Agb2YgdGhlIGZpbGVcblxudHlwZSBIYW5kbGVyID0gKC4uLmV2dHM6IGFueVtdKSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIE1pdHRFbWl0dGVyID0ge1xuICBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpOiB2b2lkXG4gIG9mZih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpOiB2b2lkXG4gIGVtaXQodHlwZTogc3RyaW5nLCAuLi5ldnRzOiBhbnlbXSk6IHZvaWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWl0dCgpOiBNaXR0RW1pdHRlciB7XG4gIGNvbnN0IGFsbDogeyBbczogc3RyaW5nXTogSGFuZGxlcltdIH0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgcmV0dXJuIHtcbiAgICBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEhhbmRsZXIpIHtcbiAgICAgIDsoYWxsW3R5cGVdIHx8IChhbGxbdHlwZV0gPSBbXSkpLnB1c2goaGFuZGxlcilcbiAgICB9LFxuXG4gICAgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcikge1xuICAgICAgaWYgKGFsbFt0eXBlXSkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxuICAgICAgICBhbGxbdHlwZV0uc3BsaWNlKGFsbFt0eXBlXS5pbmRleE9mKGhhbmRsZXIpID4+PiAwLCAxKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBlbWl0KHR5cGU6IHN0cmluZywgLi4uZXZ0czogYW55W10pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgICAgIDsoYWxsW3R5cGVdIHx8IFtdKS5zbGljZSgpLm1hcCgoaGFuZGxlcjogSGFuZGxlcikgPT4ge1xuICAgICAgICBoYW5kbGVyKC4uLmV2dHMpXG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBfX05FWFRfREFUQV9fICovXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1jb25zb2xlXG5pbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcGFyc2UsIFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCBtaXR0LCB7IE1pdHRFbWl0dGVyIH0gZnJvbSAnLi4vbWl0dCdcbmltcG9ydCB7XG4gIEFwcENvbnRleHRUeXBlLFxuICBmb3JtYXRXaXRoVmFsaWRhdGlvbixcbiAgZ2V0VVJMLFxuICBsb2FkR2V0SW5pdGlhbFByb3BzLFxuICBOZXh0UGFnZUNvbnRleHQsXG4gIFNULFxufSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGlzRHluYW1pY1JvdXRlIH0gZnJvbSAnLi91dGlscy9pcy1keW5hbWljJ1xuaW1wb3J0IHsgZ2V0Um91dGVNYXRjaGVyIH0gZnJvbSAnLi91dGlscy9yb3V0ZS1tYXRjaGVyJ1xuaW1wb3J0IHsgZ2V0Um91dGVSZWdleCB9IGZyb20gJy4vdXRpbHMvcm91dGUtcmVnZXgnXG5cbmNvbnN0IGJhc2VQYXRoID0gKHByb2Nlc3MuZW52Ll9fTkVYVF9ST1VURVJfQkFTRVBBVEggYXMgc3RyaW5nKSB8fCAnJ1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQmFzZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGguaW5kZXhPZihiYXNlUGF0aCkgIT09IDAgPyBiYXNlUGF0aCArIHBhdGggOiBwYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxCYXNlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5pbmRleE9mKGJhc2VQYXRoKSA9PT0gMFxuICAgID8gcGF0aC5zdWJzdHIoYmFzZVBhdGgubGVuZ3RoKSB8fCAnLydcbiAgICA6IHBhdGhcbn1cblxuZnVuY3Rpb24gdG9Sb3V0ZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC8kLywgJycpIHx8ICcvJ1xufVxuXG5jb25zdCBwcmVwYXJlUm91dGUgPSAocGF0aDogc3RyaW5nKSA9PlxuICB0b1JvdXRlKCFwYXRoIHx8IHBhdGggPT09ICcvJyA/ICcvaW5kZXgnIDogcGF0aClcblxudHlwZSBVcmwgPSBVcmxPYmplY3QgfCBzdHJpbmdcblxudHlwZSBDb21wb25lbnRSZXMgPSB7IHBhZ2U6IENvbXBvbmVudFR5cGU7IG1vZDogYW55IH1cblxuZXhwb3J0IHR5cGUgQmFzZVJvdXRlciA9IHtcbiAgcm91dGU6IHN0cmluZ1xuICBwYXRobmFtZTogc3RyaW5nXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICBhc1BhdGg6IHN0cmluZ1xuICBiYXNlUGF0aDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIE5leHRSb3V0ZXIgPSBCYXNlUm91dGVyICZcbiAgUGljazxcbiAgICBSb3V0ZXIsXG4gICAgfCAncHVzaCdcbiAgICB8ICdyZXBsYWNlJ1xuICAgIHwgJ3JlbG9hZCdcbiAgICB8ICdiYWNrJ1xuICAgIHwgJ3ByZWZldGNoJ1xuICAgIHwgJ2JlZm9yZVBvcFN0YXRlJ1xuICAgIHwgJ2V2ZW50cydcbiAgICB8ICdpc0ZhbGxiYWNrJ1xuICA+XG5cbmV4cG9ydCB0eXBlIFByZWZldGNoT3B0aW9ucyA9IHtcbiAgcHJpb3JpdHk/OiBib29sZWFuXG59XG5cbnR5cGUgUm91dGVJbmZvID0ge1xuICBDb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgX19OX1NTRz86IGJvb2xlYW5cbiAgX19OX1NTUD86IGJvb2xlYW5cbiAgcHJvcHM/OiBhbnlcbiAgZXJyPzogRXJyb3JcbiAgZXJyb3I/OiBhbnlcbn1cblxudHlwZSBTdWJzY3JpcHRpb24gPSAoZGF0YTogUm91dGVJbmZvLCBBcHA/OiBDb21wb25lbnRUeXBlKSA9PiBQcm9taXNlPHZvaWQ+XG5cbnR5cGUgQmVmb3JlUG9wU3RhdGVDYWxsYmFjayA9IChzdGF0ZTogYW55KSA9PiBib29sZWFuXG5cbnR5cGUgQ29tcG9uZW50TG9hZENhbmNlbCA9ICgoKSA9PiB2b2lkKSB8IG51bGxcblxudHlwZSBIaXN0b3J5TWV0aG9kID0gJ3JlcGxhY2VTdGF0ZScgfCAncHVzaFN0YXRlJ1xuXG5mdW5jdGlvbiBmZXRjaE5leHREYXRhKFxuICBwYXRobmFtZTogc3RyaW5nLFxuICBxdWVyeTogUGFyc2VkVXJsUXVlcnkgfCBudWxsLFxuICBpc1NlcnZlclJlbmRlcjogYm9vbGVhbixcbiAgY2I/OiAoLi4uYXJnczogYW55KSA9PiBhbnlcbikge1xuICBsZXQgYXR0ZW1wdHMgPSBpc1NlcnZlclJlbmRlciA/IDMgOiAxXG4gIGZ1bmN0aW9uIGdldFJlc3BvbnNlKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGZldGNoKFxuICAgICAgZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICBwYXRobmFtZTogYWRkQmFzZVBhdGgoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZSBfX05FWFRfREFUQV9fXG4gICAgICAgICAgYC9fbmV4dC9kYXRhLyR7X19ORVhUX0RBVEFfXy5idWlsZElkfSR7ZGVsQmFzZVBhdGgocGF0aG5hbWUpfS5qc29uYFxuICAgICAgICApLFxuICAgICAgICBxdWVyeSxcbiAgICAgIH0pLFxuICAgICAge1xuICAgICAgICAvLyBDb29raWVzIGFyZSByZXF1aXJlZCB0byBiZSBwcmVzZW50IGZvciBOZXh0LmpzJyBTU0cgXCJQcmV2aWV3IE1vZGVcIi5cbiAgICAgICAgLy8gQ29va2llcyBtYXkgYWxzbyBiZSByZXF1aXJlZCBmb3IgYGdldFNlcnZlclNpZGVQcm9wc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vID4gYGZldGNoYCB3b27igJl0IHNlbmQgY29va2llcywgdW5sZXNzIHlvdSBzZXQgdGhlIGNyZWRlbnRpYWxzIGluaXRcbiAgICAgICAgLy8gPiBvcHRpb24uXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAgICAgICAgLy9cbiAgICAgICAgLy8gPiBGb3IgbWF4aW11bSBicm93c2VyIGNvbXBhdGliaWxpdHkgd2hlbiBpdCBjb21lcyB0byBzZW5kaW5nICZcbiAgICAgICAgLy8gPiByZWNlaXZpbmcgY29va2llcywgYWx3YXlzIHN1cHBseSB0aGUgYGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nYFxuICAgICAgICAvLyA+IG9wdGlvbiBpbnN0ZWFkIG9mIHJlbHlpbmcgb24gdGhlIGRlZmF1bHQuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gjY2F2ZWF0c1xuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgIH1cbiAgICApLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgaWYgKC0tYXR0ZW1wdHMgPiAwICYmIHJlcy5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgcmV0dXJuIGdldFJlc3BvbnNlKClcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0YXRpYyBwcm9wc2ApXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gZ2V0UmVzcG9uc2UoKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICByZXR1cm4gY2IgPyBjYihkYXRhKSA6IGRhdGFcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgLy8gV2Ugc2hvdWxkIG9ubHkgdHJpZ2dlciBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb24gaWYgdGhpcyB3YXMgY2F1c2VkXG4gICAgICAvLyBvbiBhIGNsaWVudC1zaWRlIHRyYW5zaXRpb24uIE90aGVyd2lzZSwgd2UnZCBnZXQgaW50byBhbiBpbmZpbml0ZVxuICAgICAgLy8gbG9vcC5cbiAgICAgIGlmICghaXNTZXJ2ZXJSZW5kZXIpIHtcbiAgICAgICAgOyhlcnIgYXMgYW55KS5jb2RlID0gJ1BBR0VfTE9BRF9FUlJPUidcbiAgICAgIH1cbiAgICAgIHRocm93IGVyclxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciBpbXBsZW1lbnRzIEJhc2VSb3V0ZXIge1xuICByb3V0ZTogc3RyaW5nXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIGFzUGF0aDogc3RyaW5nXG4gIGJhc2VQYXRoOiBzdHJpbmdcblxuICAvKipcbiAgICogTWFwIG9mIGFsbCBjb21wb25lbnRzIGxvYWRlZCBpbiBgUm91dGVyYFxuICAgKi9cbiAgY29tcG9uZW50czogeyBbcGF0aG5hbWU6IHN0cmluZ106IFJvdXRlSW5mbyB9XG4gIC8vIFN0YXRpYyBEYXRhIENhY2hlXG4gIHNkYzogeyBbYXNQYXRoOiBzdHJpbmddOiBvYmplY3QgfSA9IHt9XG4gIHN1YjogU3Vic2NyaXB0aW9uXG4gIGNsYzogQ29tcG9uZW50TG9hZENhbmNlbFxuICBwYWdlTG9hZGVyOiBhbnlcbiAgX2JwczogQmVmb3JlUG9wU3RhdGVDYWxsYmFjayB8IHVuZGVmaW5lZFxuICBldmVudHM6IE1pdHRFbWl0dGVyXG4gIF93cmFwQXBwOiAoQXBwOiBDb21wb25lbnRUeXBlKSA9PiBhbnlcbiAgaXNTc3I6IGJvb2xlYW5cbiAgaXNGYWxsYmFjazogYm9vbGVhblxuXG4gIHN0YXRpYyBldmVudHM6IE1pdHRFbWl0dGVyID0gbWl0dCgpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gICAgYXM6IHN0cmluZyxcbiAgICB7XG4gICAgICBpbml0aWFsUHJvcHMsXG4gICAgICBwYWdlTG9hZGVyLFxuICAgICAgQXBwLFxuICAgICAgd3JhcEFwcCxcbiAgICAgIENvbXBvbmVudCxcbiAgICAgIGVycixcbiAgICAgIHN1YnNjcmlwdGlvbixcbiAgICAgIGlzRmFsbGJhY2ssXG4gICAgfToge1xuICAgICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb25cbiAgICAgIGluaXRpYWxQcm9wczogYW55XG4gICAgICBwYWdlTG9hZGVyOiBhbnlcbiAgICAgIENvbXBvbmVudDogQ29tcG9uZW50VHlwZVxuICAgICAgQXBwOiBDb21wb25lbnRUeXBlXG4gICAgICB3cmFwQXBwOiAoQXBwOiBDb21wb25lbnRUeXBlKSA9PiBhbnlcbiAgICAgIGVycj86IEVycm9yXG4gICAgICBpc0ZhbGxiYWNrOiBib29sZWFuXG4gICAgfVxuICApIHtcbiAgICAvLyByZXByZXNlbnRzIHRoZSBjdXJyZW50IGNvbXBvbmVudCBrZXlcbiAgICB0aGlzLnJvdXRlID0gdG9Sb3V0ZShwYXRobmFtZSlcblxuICAgIC8vIHNldCB1cCB0aGUgY29tcG9uZW50IGNhY2hlIChieSByb3V0ZSBrZXlzKVxuICAgIHRoaXMuY29tcG9uZW50cyA9IHt9XG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBrZWVwIHRoZSBjYWNoZSwgaWYgdGhlcmUncyBhbiBlcnJvclxuICAgIC8vIE90aGVyd2lzZSwgdGhpcyBjYXVzZSBpc3N1ZXMgd2hlbiB3aGVuIGdvaW5nIGJhY2sgYW5kXG4gICAgLy8gY29tZSBhZ2FpbiB0byB0aGUgZXJyb3JlZCBwYWdlLlxuICAgIGlmIChwYXRobmFtZSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0gPSB7XG4gICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgcHJvcHM6IGluaXRpYWxQcm9wcyxcbiAgICAgICAgZXJyLFxuICAgICAgICBfX05fU1NHOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU0csXG4gICAgICAgIF9fTl9TU1A6IGluaXRpYWxQcm9wcyAmJiBpbml0aWFsUHJvcHMuX19OX1NTUCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10gPSB7IENvbXBvbmVudDogQXBwIH1cblxuICAgIC8vIEJhY2t3YXJkcyBjb21wYXQgZm9yIFJvdXRlci5yb3V0ZXIuZXZlbnRzXG4gICAgLy8gVE9ETzogU2hvdWxkIGJlIHJlbW92ZSB0aGUgZm9sbG93aW5nIG1ham9yIHZlcnNpb24gYXMgaXQgd2FzIG5ldmVyIGRvY3VtZW50ZWRcbiAgICB0aGlzLmV2ZW50cyA9IFJvdXRlci5ldmVudHNcblxuICAgIHRoaXMucGFnZUxvYWRlciA9IHBhZ2VMb2FkZXJcbiAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlcbiAgICAvLyBpZiBhdXRvIHByZXJlbmRlcmVkIGFuZCBkeW5hbWljIHJvdXRlIHdhaXQgdG8gdXBkYXRlIGFzUGF0aFxuICAgIC8vIHVudGlsIGFmdGVyIG1vdW50IHRvIHByZXZlbnQgaHlkcmF0aW9uIG1pc21hdGNoXG4gICAgdGhpcy5hc1BhdGggPVxuICAgICAgLy8gQHRzLWlnbm9yZSB0aGlzIGlzIHRlbXBvcmFyaWx5IGdsb2JhbCAoYXR0YWNoZWQgdG8gd2luZG93KVxuICAgICAgaXNEeW5hbWljUm91dGUocGF0aG5hbWUpICYmIF9fTkVYVF9EQVRBX18uYXV0b0V4cG9ydCA/IHBhdGhuYW1lIDogYXNcbiAgICB0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGhcbiAgICB0aGlzLnN1YiA9IHN1YnNjcmlwdGlvblxuICAgIHRoaXMuY2xjID0gbnVsbFxuICAgIHRoaXMuX3dyYXBBcHAgPSB3cmFwQXBwXG4gICAgLy8gbWFrZSBzdXJlIHRvIGlnbm9yZSBleHRyYSBwb3BTdGF0ZSBpbiBzYWZhcmkgb24gbmF2aWdhdGluZ1xuICAgIC8vIGJhY2sgZnJvbSBleHRlcm5hbCBzaXRlXG4gICAgdGhpcy5pc1NzciA9IHRydWVcblxuICAgIHRoaXMuaXNGYWxsYmFjayA9IGlzRmFsbGJhY2tcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gbWFrZSBzdXJlIFwiYXNcIiBkb2Vzbid0IHN0YXJ0IHdpdGggZG91YmxlIHNsYXNoZXMgb3IgZWxzZSBpdCBjYW5cbiAgICAgIC8vIHRocm93IGFuIGVycm9yIGFzIGl0J3MgY29uc2lkZXJlZCBpbnZhbGlkXG4gICAgICBpZiAoYXMuc3Vic3RyKDAsIDIpICE9PSAnLy8nKSB7XG4gICAgICAgIC8vIGluIG9yZGVyIGZvciBgZS5zdGF0ZWAgdG8gd29yayBvbiB0aGUgYG9ucG9wc3RhdGVgIGV2ZW50XG4gICAgICAgIC8vIHdlIGhhdmUgdG8gcmVnaXN0ZXIgdGhlIGluaXRpYWwgcm91dGUgdXBvbiBpbml0aWFsaXphdGlvblxuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKFxuICAgICAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgICAgIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHsgcGF0aG5hbWUsIHF1ZXJ5IH0pLFxuICAgICAgICAgIGFzXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKVxuICAgIH1cbiAgfVxuXG4gIC8vIEBkZXByZWNhdGVkIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IGV2ZW4gdGhvdWdoIGl0J3MgYSBwcml2YXRlIG1ldGhvZC5cbiAgc3RhdGljIF9yZXdyaXRlVXJsRm9yTmV4dEV4cG9ydCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9FWFBPUlRfVFJBSUxJTkdfU0xBU0gpIHtcbiAgICAgIGNvbnN0IHJld3JpdGVVcmxGb3JOZXh0RXhwb3J0ID0gcmVxdWlyZSgnLi9yZXdyaXRlLXVybC1mb3ItZXhwb3J0JylcbiAgICAgICAgLnJld3JpdGVVcmxGb3JOZXh0RXhwb3J0XG4gICAgICByZXR1cm4gcmV3cml0ZVVybEZvck5leHRFeHBvcnQodXJsKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXJsXG4gICAgfVxuICB9XG5cbiAgb25Qb3BTdGF0ZSA9IChlOiBQb3BTdGF0ZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKCFlLnN0YXRlKSB7XG4gICAgICAvLyBXZSBnZXQgc3RhdGUgYXMgdW5kZWZpbmVkIGZvciB0d28gcmVhc29ucy5cbiAgICAgIC8vICAxLiBXaXRoIG9sZGVyIHNhZmFyaSAoPCA4KSBhbmQgb2xkZXIgY2hyb21lICg8IDM0KVxuICAgICAgLy8gIDIuIFdoZW4gdGhlIFVSTCBjaGFuZ2VkIHdpdGggI1xuICAgICAgLy9cbiAgICAgIC8vIEluIHRoZSBib3RoIGNhc2VzLCB3ZSBkb24ndCBuZWVkIHRvIHByb2NlZWQgYW5kIGNoYW5nZSB0aGUgcm91dGUuXG4gICAgICAvLyAoYXMgaXQncyBhbHJlYWR5IGNoYW5nZWQpXG4gICAgICAvLyBCdXQgd2UgY2FuIHNpbXBseSByZXBsYWNlIHRoZSBzdGF0ZSB3aXRoIHRoZSBuZXcgY2hhbmdlcy5cbiAgICAgIC8vIEFjdHVhbGx5LCBmb3IgKDEpIHdlIGRvbid0IG5lZWQgdG8gbm90aGluZy4gQnV0IGl0J3MgaGFyZCB0byBkZXRlY3QgdGhhdCBldmVudC5cbiAgICAgIC8vIFNvLCBkb2luZyB0aGUgZm9sbG93aW5nIGZvciAoMSkgZG9lcyBubyBoYXJtLlxuICAgICAgY29uc3QgeyBwYXRobmFtZSwgcXVlcnkgfSA9IHRoaXNcbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUoXG4gICAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgICBmb3JtYXRXaXRoVmFsaWRhdGlvbih7IHBhdGhuYW1lLCBxdWVyeSB9KSxcbiAgICAgICAgZ2V0VVJMKClcbiAgICAgIClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBkb24ndCByZS1yZW5kZXIgb24gaW5pdGlhbCBsb2FkLFxuICAgIC8vIGNhbiBiZSBjYXVzZWQgYnkgbmF2aWdhdGluZyBiYWNrIGZyb20gYW4gZXh0ZXJuYWwgc2l0ZVxuICAgIGlmIChcbiAgICAgIGUuc3RhdGUgJiZcbiAgICAgIHRoaXMuaXNTc3IgJiZcbiAgICAgIGUuc3RhdGUuYXMgPT09IHRoaXMuYXNQYXRoICYmXG4gICAgICBwYXJzZShlLnN0YXRlLnVybCkucGF0aG5hbWUgPT09IHRoaXMucGF0aG5hbWVcbiAgICApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIElmIHRoZSBkb3duc3RyZWFtIGFwcGxpY2F0aW9uIHJldHVybnMgZmFsc3ksIHJldHVybi5cbiAgICAvLyBUaGV5IHdpbGwgdGhlbiBiZSByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgdGhlIGV2ZW50LlxuICAgIGlmICh0aGlzLl9icHMgJiYgIXRoaXMuX2JwcyhlLnN0YXRlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyB1cmwsIGFzLCBvcHRpb25zIH0gPSBlLnN0YXRlXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgdXJsID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgYXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnYHBvcHN0YXRlYCBldmVudCB0cmlnZ2VyZWQgYnV0IGBldmVudC5zdGF0ZWAgZGlkIG5vdCBoYXZlIGB1cmxgIG9yIGBhc2AgaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvcG9wc3RhdGUtc3RhdGUtZW1wdHknXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZXBsYWNlKHVybCwgYXMsIG9wdGlvbnMpXG4gIH1cblxuICB1cGRhdGUocm91dGU6IHN0cmluZywgbW9kOiBhbnkpIHtcbiAgICBjb25zdCBDb21wb25lbnQ6IENvbXBvbmVudFR5cGUgPSBtb2QuZGVmYXVsdCB8fCBtb2RcbiAgICBjb25zdCBkYXRhID0gdGhpcy5jb21wb25lbnRzW3JvdXRlXVxuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdXBkYXRlIHVuYXZhaWxhYmxlIHJvdXRlOiAke3JvdXRlfWApXG4gICAgfVxuXG4gICAgY29uc3QgbmV3RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcbiAgICAgIENvbXBvbmVudCxcbiAgICAgIF9fTl9TU0c6IG1vZC5fX05fU1NHLFxuICAgICAgX19OX1NTUDogbW9kLl9fTl9TU1AsXG4gICAgfSlcbiAgICB0aGlzLmNvbXBvbmVudHNbcm91dGVdID0gbmV3RGF0YVxuXG4gICAgLy8gcGFnZXMvX2FwcC5qcyB1cGRhdGVkXG4gICAgaWYgKHJvdXRlID09PSAnL19hcHAnKSB7XG4gICAgICB0aGlzLm5vdGlmeSh0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0pXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocm91dGUgPT09IHRoaXMucm91dGUpIHtcbiAgICAgIHRoaXMubm90aWZ5KG5ld0RhdGEpXG4gICAgfVxuICB9XG5cbiAgcmVsb2FkKCk6IHZvaWQge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEdvIGJhY2sgaW4gaGlzdG9yeVxuICAgKi9cbiAgYmFjaygpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGBwdXNoU3RhdGVgIHdpdGggYXJndW1lbnRzXG4gICAqIEBwYXJhbSB1cmwgb2YgdGhlIHJvdXRlXG4gICAqIEBwYXJhbSBhcyBtYXNrcyBgdXJsYCBmb3IgdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgb2JqZWN0IHlvdSBjYW4gZGVmaW5lIGBzaGFsbG93YCBhbmQgb3RoZXIgb3B0aW9uc1xuICAgKi9cbiAgcHVzaCh1cmw6IFVybCwgYXM6IFVybCA9IHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdwdXNoU3RhdGUnLCB1cmwsIGFzLCBvcHRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgYHJlcGxhY2VTdGF0ZWAgd2l0aCBhcmd1bWVudHNcbiAgICogQHBhcmFtIHVybCBvZiB0aGUgcm91dGVcbiAgICogQHBhcmFtIGFzIG1hc2tzIGB1cmxgIGZvciB0aGUgYnJvd3NlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBvYmplY3QgeW91IGNhbiBkZWZpbmUgYHNoYWxsb3dgIGFuZCBvdGhlciBvcHRpb25zXG4gICAqL1xuICByZXBsYWNlKHVybDogVXJsLCBhczogVXJsID0gdXJsLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3JlcGxhY2VTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpXG4gIH1cblxuICBjaGFuZ2UoXG4gICAgbWV0aG9kOiBIaXN0b3J5TWV0aG9kLFxuICAgIF91cmw6IFVybCxcbiAgICBfYXM6IFVybCxcbiAgICBvcHRpb25zOiBhbnlcbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghb3B0aW9ucy5faCkge1xuICAgICAgICB0aGlzLmlzU3NyID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIC8vIG1hcmtpbmcgcm91dGUgY2hhbmdlcyBhcyBhIG5hdmlnYXRpb24gc3RhcnQgZW50cnlcbiAgICAgIGlmIChTVCkge1xuICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdyb3V0ZUNoYW5nZScpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHVybCBhbmQgYXMgcHJvdmlkZWQgYXMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uLFxuICAgICAgLy8gd2UnbGwgZm9ybWF0IHRoZW0gaW50byB0aGUgc3RyaW5nIHZlcnNpb24gaGVyZS5cbiAgICAgIGxldCB1cmwgPSB0eXBlb2YgX3VybCA9PT0gJ29iamVjdCcgPyBmb3JtYXRXaXRoVmFsaWRhdGlvbihfdXJsKSA6IF91cmxcbiAgICAgIGxldCBhcyA9IHR5cGVvZiBfYXMgPT09ICdvYmplY3QnID8gZm9ybWF0V2l0aFZhbGlkYXRpb24oX2FzKSA6IF9hc1xuXG4gICAgICB1cmwgPSBhZGRCYXNlUGF0aCh1cmwpXG4gICAgICBhcyA9IGFkZEJhc2VQYXRoKGFzKVxuXG4gICAgICAvLyBBZGQgdGhlIGVuZGluZyBzbGFzaCB0byB0aGUgcGF0aHMuIFNvLCB3ZSBjYW4gc2VydmUgdGhlXG4gICAgICAvLyBcIjxwYWdlPi9pbmRleC5odG1sXCIgZGlyZWN0bHkgZm9yIHRoZSBTU1IgcGFnZS5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfRVhQT1JUX1RSQUlMSU5HX1NMQVNIKSB7XG4gICAgICAgIGNvbnN0IHJld3JpdGVVcmxGb3JOZXh0RXhwb3J0ID0gcmVxdWlyZSgnLi9yZXdyaXRlLXVybC1mb3ItZXhwb3J0JylcbiAgICAgICAgICAucmV3cml0ZVVybEZvck5leHRFeHBvcnRcbiAgICAgICAgLy8gQHRzLWlnbm9yZSB0aGlzIGlzIHRlbXBvcmFyaWx5IGdsb2JhbCAoYXR0YWNoZWQgdG8gd2luZG93KVxuICAgICAgICBpZiAoX19ORVhUX0RBVEFfXy5uZXh0RXhwb3J0KSB7XG4gICAgICAgICAgYXMgPSByZXdyaXRlVXJsRm9yTmV4dEV4cG9ydChhcylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFib3J0Q29tcG9uZW50TG9hZChhcylcblxuICAgICAgLy8gSWYgdGhlIHVybCBjaGFuZ2UgaXMgb25seSByZWxhdGVkIHRvIGEgaGFzaCBjaGFuZ2VcbiAgICAgIC8vIFdlIHNob3VsZCBub3QgcHJvY2VlZC4gV2Ugc2hvdWxkIG9ubHkgY2hhbmdlIHRoZSBzdGF0ZS5cblxuICAgICAgLy8gV0FSTklORzogYF9oYCBpcyBhbiBpbnRlcm5hbCBvcHRpb24gZm9yIGhhbmRpbmcgTmV4dC5qcyBjbGllbnQtc2lkZVxuICAgICAgLy8gaHlkcmF0aW9uLiBZb3VyIGFwcCBzaG91bGQgX25ldmVyXyB1c2UgdGhpcyBwcm9wZXJ0eS4gSXQgbWF5IGNoYW5nZSBhdFxuICAgICAgLy8gYW55IHRpbWUgd2l0aG91dCBub3RpY2UuXG4gICAgICBpZiAoIW9wdGlvbnMuX2ggJiYgdGhpcy5vbmx5QUhhc2hDaGFuZ2UoYXMpKSB7XG4gICAgICAgIHRoaXMuYXNQYXRoID0gYXNcbiAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdoYXNoQ2hhbmdlU3RhcnQnLCBhcylcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9IYXNoKGFzKVxuICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2hhc2hDaGFuZ2VDb21wbGV0ZScsIGFzKVxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHBhdGhuYW1lLCBxdWVyeSwgcHJvdG9jb2wgfSA9IHBhcnNlKHVybCwgdHJ1ZSlcblxuICAgICAgaWYgKCFwYXRobmFtZSB8fCBwcm90b2NvbCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBJbnZhbGlkIGhyZWYgcGFzc2VkIHRvIHJvdXRlcjogJHt1cmx9IGh0dHBzOi8vZXJyLnNoL3ZlcmNlbC9uZXh0LmpzL2ludmFsaWQtaHJlZi1wYXNzZWRgXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKGZhbHNlKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBhc2tlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgVVJMIHdlIHNob3VsZCByZWxvYWQgdGhlIGN1cnJlbnQgcGFnZVxuICAgICAgLy8gKG5vdCBsb2NhdGlvbi5yZWxvYWQoKSBidXQgcmVsb2FkIGdldEluaXRpYWxQcm9wcyBhbmQgb3RoZXIgTmV4dC5qcyBzdHVmZnMpXG4gICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gc2V0IHRoZSBtZXRob2QgPSByZXBsYWNlU3RhdGUgYWx3YXlzXG4gICAgICAvLyBhcyB0aGlzIHNob3VsZCBub3QgZ28gaW50byB0aGUgaGlzdG9yeSAoVGhhdCdzIGhvdyBicm93c2VycyB3b3JrKVxuICAgICAgLy8gV2Ugc2hvdWxkIGNvbXBhcmUgdGhlIG5ldyBhc1BhdGggdG8gdGhlIGN1cnJlbnQgYXNQYXRoLCBub3QgdGhlIHVybFxuICAgICAgaWYgKCF0aGlzLnVybElzTmV3KGFzKSkge1xuICAgICAgICBtZXRob2QgPSAncmVwbGFjZVN0YXRlJ1xuICAgICAgfVxuXG4gICAgICBjb25zdCByb3V0ZSA9IHRvUm91dGUocGF0aG5hbWUpXG4gICAgICBjb25zdCB7IHNoYWxsb3cgPSBmYWxzZSB9ID0gb3B0aW9uc1xuXG4gICAgICBpZiAoaXNEeW5hbWljUm91dGUocm91dGUpKSB7XG4gICAgICAgIGNvbnN0IHsgcGF0aG5hbWU6IGFzUGF0aG5hbWUgfSA9IHBhcnNlKGFzKVxuICAgICAgICBjb25zdCByb3V0ZVJlZ2V4ID0gZ2V0Um91dGVSZWdleChyb3V0ZSlcbiAgICAgICAgY29uc3Qgcm91dGVNYXRjaCA9IGdldFJvdXRlTWF0Y2hlcihyb3V0ZVJlZ2V4KShhc1BhdGhuYW1lKVxuICAgICAgICBpZiAoIXJvdXRlTWF0Y2gpIHtcbiAgICAgICAgICBjb25zdCBtaXNzaW5nUGFyYW1zID0gT2JqZWN0LmtleXMocm91dGVSZWdleC5ncm91cHMpLmZpbHRlcihcbiAgICAgICAgICAgIChwYXJhbSkgPT4gIXF1ZXJ5W3BhcmFtXVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChtaXNzaW5nUGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBgTWlzbWF0Y2hpbmcgXFxgYXNcXGAgYW5kIFxcYGhyZWZcXGAgZmFpbGVkIHRvIG1hbnVhbGx5IHByb3ZpZGUgYCArXG4gICAgICAgICAgICAgICAgICBgdGhlIHBhcmFtczogJHttaXNzaW5nUGFyYW1zLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgICcsICdcbiAgICAgICAgICAgICAgICAgICl9IGluIHRoZSBcXGBocmVmXFxgJ3MgXFxgcXVlcnlcXGBgXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChcbiAgICAgICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBUaGUgcHJvdmlkZWQgXFxgYXNcXGAgdmFsdWUgKCR7YXNQYXRobmFtZX0pIGlzIGluY29tcGF0aWJsZSB3aXRoIHRoZSBcXGBocmVmXFxgIHZhbHVlICgke3JvdXRlfSkuIGAgK1xuICAgICAgICAgICAgICAgICAgYFJlYWQgbW9yZTogaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvaW5jb21wYXRpYmxlLWhyZWYtYXNgXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTWVyZ2UgcGFyYW1zIGludG8gYHF1ZXJ5YCwgb3ZlcndyaXRpbmcgYW55IHNwZWNpZmllZCBpbiBzZWFyY2hcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHF1ZXJ5LCByb3V0ZU1hdGNoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VTdGFydCcsIGFzKVxuXG4gICAgICAvLyBJZiBzaGFsbG93IGlzIHRydWUgYW5kIHRoZSByb3V0ZSBleGlzdHMgaW4gdGhlIHJvdXRlciBjYWNoZSB3ZSByZXVzZSB0aGUgcHJldmlvdXMgcmVzdWx0XG4gICAgICB0aGlzLmdldFJvdXRlSW5mbyhyb3V0ZSwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgc2hhbGxvdykudGhlbihcbiAgICAgICAgKHJvdXRlSW5mbykgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IHJvdXRlSW5mb1xuXG4gICAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdiZWZvcmVIaXN0b3J5Q2hhbmdlJywgYXMpXG4gICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpXG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgY29uc3QgYXBwQ29tcDogYW55ID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddLkNvbXBvbmVudFxuICAgICAgICAgICAgOyh3aW5kb3cgYXMgYW55KS5uZXh0LmlzUHJlcmVuZGVyZWQgPVxuICAgICAgICAgICAgICBhcHBDb21wLmdldEluaXRpYWxQcm9wcyA9PT0gYXBwQ29tcC5vcmlnR2V0SW5pdGlhbFByb3BzICYmXG4gICAgICAgICAgICAgICEocm91dGVJbmZvLkNvbXBvbmVudCBhcyBhbnkpLmdldEluaXRpYWxQcm9wc1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc2V0KHJvdXRlLCBwYXRobmFtZSwgcXVlcnksIGFzLCByb3V0ZUluZm8pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VFcnJvcicsIGVycm9yLCBhcylcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgYXMpXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHJlamVjdFxuICAgICAgKVxuICAgIH0pXG4gIH1cblxuICBjaGFuZ2VTdGF0ZShcbiAgICBtZXRob2Q6IEhpc3RvcnlNZXRob2QsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYXM6IHN0cmluZyxcbiAgICBvcHRpb25zID0ge31cbiAgKTogdm9pZCB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmhpc3RvcnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFdhcm5pbmc6IHdpbmRvdy5oaXN0b3J5IGlzIG5vdCBhdmFpbGFibGUuYClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmhpc3RvcnlbbWV0aG9kXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkuJHttZXRob2R9IGlzIG5vdCBhdmFpbGFibGVgKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWV0aG9kICE9PSAncHVzaFN0YXRlJyB8fCBnZXRVUkwoKSAhPT0gYXMpIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5W21ldGhvZF0oXG4gICAgICAgIHtcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgYXMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gTW9zdCBicm93c2VycyBjdXJyZW50bHkgaWdub3JlcyB0aGlzIHBhcmFtZXRlciwgYWx0aG91Z2ggdGhleSBtYXkgdXNlIGl0IGluIHRoZSBmdXR1cmUuXG4gICAgICAgIC8vIFBhc3NpbmcgdGhlIGVtcHR5IHN0cmluZyBoZXJlIHNob3VsZCBiZSBzYWZlIGFnYWluc3QgZnV0dXJlIGNoYW5nZXMgdG8gdGhlIG1ldGhvZC5cbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hpc3RvcnkvcmVwbGFjZVN0YXRlXG4gICAgICAgICcnLFxuICAgICAgICBhc1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGdldFJvdXRlSW5mbyhcbiAgICByb3V0ZTogc3RyaW5nLFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk6IGFueSxcbiAgICBhczogc3RyaW5nLFxuICAgIHNoYWxsb3c6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBQcm9taXNlPFJvdXRlSW5mbz4ge1xuICAgIGNvbnN0IGNhY2hlZFJvdXRlSW5mbyA9IHRoaXMuY29tcG9uZW50c1tyb3V0ZV1cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgc2hhbGxvdyByb3V0ZSB0cmFuc2l0aW9uIHBvc3NpYmxlXG4gICAgLy8gSWYgdGhlIHJvdXRlIGlzIGFscmVhZHkgcmVuZGVyZWQgb24gdGhlIHNjcmVlbi5cbiAgICBpZiAoc2hhbGxvdyAmJiBjYWNoZWRSb3V0ZUluZm8gJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVkUm91dGVJbmZvKVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUVycm9yID0gKFxuICAgICAgZXJyOiBFcnJvciAmIHsgY29kZTogYW55OyBjYW5jZWxsZWQ6IGJvb2xlYW4gfSxcbiAgICAgIGxvYWRFcnJvckZhaWw/OiBib29sZWFuXG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnUEFHRV9MT0FEX0VSUk9SJyB8fCBsb2FkRXJyb3JGYWlsKSB7XG4gICAgICAgICAgLy8gSWYgd2UgY2FuJ3QgbG9hZCB0aGUgcGFnZSBpdCBjb3VsZCBiZSBvbmUgb2YgZm9sbG93aW5nIHJlYXNvbnNcbiAgICAgICAgICAvLyAgMS4gUGFnZSBkb2Vzbid0IGV4aXN0c1xuICAgICAgICAgIC8vICAyLiBQYWdlIGRvZXMgZXhpc3QgaW4gYSBkaWZmZXJlbnQgem9uZVxuICAgICAgICAgIC8vICAzLiBJbnRlcm5hbCBlcnJvciB3aGlsZSBsb2FkaW5nIHRoZSBwYWdlXG5cbiAgICAgICAgICAvLyBTbywgZG9pbmcgYSBoYXJkIHJlbG9hZCBpcyB0aGUgcHJvcGVyIHdheSB0byBkZWFsIHdpdGggdGhpcy5cbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG5cbiAgICAgICAgICAvLyBDaGFuZ2luZyB0aGUgVVJMIGRvZXNuJ3QgYmxvY2sgZXhlY3V0aW5nIHRoZSBjdXJyZW50IGNvZGUgcGF0aC5cbiAgICAgICAgICAvLyBTbywgd2UgbmVlZCB0byBtYXJrIGl0IGFzIGEgY2FuY2VsbGVkIGVycm9yIGFuZCBzdG9wIHRoZSByb3V0aW5nIGxvZ2ljLlxuICAgICAgICAgIGVyci5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZSBUT0RPOiBmaXggdGhlIGNvbnRyb2wgZmxvdyBoZXJlXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoeyBlcnJvcjogZXJyIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyLmNhbmNlbGxlZCkge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmUgVE9ETzogZml4IHRoZSBjb250cm9sIGZsb3cgaGVyZVxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHsgZXJyb3I6IGVyciB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICB0aGlzLmZldGNoQ29tcG9uZW50KCcvX2Vycm9yJylcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBwYWdlOiBDb21wb25lbnQgfSA9IHJlc1xuICAgICAgICAgICAgICBjb25zdCByb3V0ZUluZm86IFJvdXRlSW5mbyA9IHsgQ29tcG9uZW50LCBlcnIgfVxuICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmVSb3V0ZUluZm8pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEluaXRpYWxQcm9wcyhDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgIGVycixcbiAgICAgICAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgfSBhcyBhbnkpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAocHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gcHJvcHNcbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvLmVycm9yID0gZXJyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVSb3V0ZUluZm8ocm91dGVJbmZvKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIChnaXBFcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAnRXJyb3IgaW4gZXJyb3IgcGFnZSBgZ2V0SW5pdGlhbFByb3BzYDogJyxcbiAgICAgICAgICAgICAgICAgICAgICBnaXBFcnJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICByb3V0ZUluZm8uZXJyb3IgPSBlcnJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvLnByb3BzID0ge31cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVJvdXRlSW5mbyhyb3V0ZUluZm8pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSBhcyBQcm9taXNlPFJvdXRlSW5mbz5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKHJvdXRlSW5mb0VycikgPT4gaGFuZGxlRXJyb3Iocm91dGVJbmZvRXJyLCB0cnVlKSlcbiAgICAgICAgKVxuICAgICAgfSkgYXMgUHJvbWlzZTxSb3V0ZUluZm8+XG4gICAgfVxuXG4gICAgcmV0dXJuIChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoY2FjaGVkUm91dGVJbmZvKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKGNhY2hlZFJvdXRlSW5mbylcbiAgICAgIH1cblxuICAgICAgdGhpcy5mZXRjaENvbXBvbmVudChyb3V0ZSkudGhlbihcbiAgICAgICAgKHJlcykgPT5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIENvbXBvbmVudDogcmVzLnBhZ2UsXG4gICAgICAgICAgICBfX05fU1NHOiByZXMubW9kLl9fTl9TU0csXG4gICAgICAgICAgICBfX05fU1NQOiByZXMubW9kLl9fTl9TU1AsXG4gICAgICAgICAgfSksXG4gICAgICAgIHJlamVjdFxuICAgICAgKVxuICAgIH0pIGFzIFByb21pc2U8Um91dGVJbmZvPilcbiAgICAgIC50aGVuKChyb3V0ZUluZm86IFJvdXRlSW5mbykgPT4ge1xuICAgICAgICBjb25zdCB7IENvbXBvbmVudCwgX19OX1NTRywgX19OX1NTUCB9ID0gcm91dGVJbmZvXG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBjb25zdCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9ID0gcmVxdWlyZSgncmVhY3QtaXMnKVxuICAgICAgICAgIGlmICghaXNWYWxpZEVsZW1lbnRUeXBlKENvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYFRoZSBkZWZhdWx0IGV4cG9ydCBpcyBub3QgYSBSZWFjdCBDb21wb25lbnQgaW4gcGFnZTogXCIke3BhdGhuYW1lfVwiYFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREYXRhPFJvdXRlSW5mbz4oKCkgPT5cbiAgICAgICAgICBfX05fU1NHXG4gICAgICAgICAgICA/IHRoaXMuX2dldFN0YXRpY0RhdGEoYXMpXG4gICAgICAgICAgICA6IF9fTl9TU1BcbiAgICAgICAgICAgID8gdGhpcy5fZ2V0U2VydmVyRGF0YShhcylcbiAgICAgICAgICAgIDogdGhpcy5nZXRJbml0aWFsUHJvcHMoXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIC8vIHdlIHByb3ZpZGUgQXBwVHJlZSBsYXRlciBzbyB0aGlzIG5lZWRzIHRvIGJlIGBhbnlgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICAgIGFzUGF0aDogYXMsXG4gICAgICAgICAgICAgICAgfSBhcyBhbnlcbiAgICAgICAgICAgICAgKVxuICAgICAgICApLnRoZW4oKHByb3BzKSA9PiB7XG4gICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gcHJvcHNcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudHNbcm91dGVdID0gcm91dGVJbmZvXG4gICAgICAgICAgcmV0dXJuIHJvdXRlSW5mb1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChoYW5kbGVFcnJvcilcbiAgfVxuXG4gIHNldChcbiAgICByb3V0ZTogc3RyaW5nLFxuICAgIHBhdGhuYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk6IGFueSxcbiAgICBhczogc3RyaW5nLFxuICAgIGRhdGE6IFJvdXRlSW5mb1xuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmlzRmFsbGJhY2sgPSBmYWxzZVxuXG4gICAgdGhpcy5yb3V0ZSA9IHJvdXRlXG4gICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5XG4gICAgdGhpcy5hc1BhdGggPSBhc1xuICAgIHJldHVybiB0aGlzLm5vdGlmeShkYXRhKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGV4ZWN1dGUgYmVmb3JlIHJlcGxhY2luZyByb3V0ZXIgc3RhdGVcbiAgICogQHBhcmFtIGNiIGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkXG4gICAqL1xuICBiZWZvcmVQb3BTdGF0ZShjYjogQmVmb3JlUG9wU3RhdGVDYWxsYmFjaykge1xuICAgIHRoaXMuX2JwcyA9IGNiXG4gIH1cblxuICBvbmx5QUhhc2hDaGFuZ2UoYXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hc1BhdGgpIHJldHVybiBmYWxzZVxuICAgIGNvbnN0IFtvbGRVcmxOb0hhc2gsIG9sZEhhc2hdID0gdGhpcy5hc1BhdGguc3BsaXQoJyMnKVxuICAgIGNvbnN0IFtuZXdVcmxOb0hhc2gsIG5ld0hhc2hdID0gYXMuc3BsaXQoJyMnKVxuXG4gICAgLy8gTWFrZXMgc3VyZSB3ZSBzY3JvbGwgdG8gdGhlIHByb3ZpZGVkIGhhc2ggaWYgdGhlIHVybC9oYXNoIGFyZSB0aGUgc2FtZVxuICAgIGlmIChuZXdIYXNoICYmIG9sZFVybE5vSGFzaCA9PT0gbmV3VXJsTm9IYXNoICYmIG9sZEhhc2ggPT09IG5ld0hhc2gpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHVybHMgYXJlIGNoYW5nZSwgdGhlcmUncyBtb3JlIHRoYW4gYSBoYXNoIGNoYW5nZVxuICAgIGlmIChvbGRVcmxOb0hhc2ggIT09IG5ld1VybE5vSGFzaCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGhhc2ggaGFzIGNoYW5nZWQsIHRoZW4gaXQncyBhIGhhc2ggb25seSBjaGFuZ2UuXG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWNlc3NhcnkgdG8gaGFuZGxlIGJvdGggdGhlIGVudGVyIGFuZFxuICAgIC8vIGxlYXZlIGhhc2ggPT09ICcnIGNhc2VzLiBUaGUgaWRlbnRpdHkgY2FzZSBmYWxscyB0aHJvdWdoXG4gICAgLy8gYW5kIGlzIHRyZWF0ZWQgYXMgYSBuZXh0IHJlbG9hZC5cbiAgICByZXR1cm4gb2xkSGFzaCAhPT0gbmV3SGFzaFxuICB9XG5cbiAgc2Nyb2xsVG9IYXNoKGFzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBbLCBoYXNoXSA9IGFzLnNwbGl0KCcjJylcbiAgICAvLyBTY3JvbGwgdG8gdG9wIGlmIHRoZSBoYXNoIGlzIGp1c3QgYCNgIHdpdGggbm8gdmFsdWVcbiAgICBpZiAoaGFzaCA9PT0gJycpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gRmlyc3Qgd2UgY2hlY2sgaWYgdGhlIGVsZW1lbnQgYnkgaWQgaXMgZm91bmRcbiAgICBjb25zdCBpZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaClcbiAgICBpZiAoaWRFbCkge1xuICAgICAgaWRFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBubyBlbGVtZW50IHdpdGggdGhlIGlkLCB3ZSBjaGVjayB0aGUgYG5hbWVgIHByb3BlcnR5XG4gICAgLy8gVG8gbWlycm9yIGJyb3dzZXJzXG4gICAgY29uc3QgbmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoaGFzaClbMF1cbiAgICBpZiAobmFtZUVsKSB7XG4gICAgICBuYW1lRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgIH1cbiAgfVxuXG4gIHVybElzTmV3KGFzUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXNQYXRoICE9PSBhc1BhdGhcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVmZXRjaCBwYWdlIGNvZGUsIHlvdSBtYXkgd2FpdCBmb3IgdGhlIGRhdGEgZHVyaW5nIHBhZ2UgcmVuZGVyaW5nLlxuICAgKiBUaGlzIGZlYXR1cmUgb25seSB3b3JrcyBpbiBwcm9kdWN0aW9uIVxuICAgKiBAcGFyYW0gdXJsIHRoZSBocmVmIG9mIHByZWZldGNoZWQgcGFnZVxuICAgKiBAcGFyYW0gYXNQYXRoIHRoZSBhcyBwYXRoIG9mIHRoZSBwcmVmZXRjaGVkIHBhZ2VcbiAgICovXG4gIHByZWZldGNoKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGFzUGF0aDogc3RyaW5nID0gdXJsLFxuICAgIG9wdGlvbnM6IFByZWZldGNoT3B0aW9ucyA9IHt9XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB7IHBhdGhuYW1lLCBwcm90b2NvbCB9ID0gcGFyc2UodXJsKVxuXG4gICAgICBpZiAoIXBhdGhuYW1lIHx8IHByb3RvY29sKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEludmFsaWQgaHJlZiBwYXNzZWQgdG8gcm91dGVyOiAke3VybH0gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvaW52YWxpZC1ocmVmLXBhc3NlZGBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFByZWZldGNoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZGV2ZWxvcG1lbnQgbW9kZSBiZWNhdXNlIGl0IHdvdWxkIHRyaWdnZXIgb24tZGVtYW5kLWVudHJpZXNcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3Qgcm91dGUgPSBkZWxCYXNlUGF0aCh0b1JvdXRlKHBhdGhuYW1lKSlcbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5wYWdlTG9hZGVyLnByZWZldGNoRGF0YSh1cmwsIGRlbEJhc2VQYXRoKGFzUGF0aCkpLFxuICAgICAgICB0aGlzLnBhZ2VMb2FkZXJbb3B0aW9ucy5wcmlvcml0eSA/ICdsb2FkUGFnZScgOiAncHJlZmV0Y2gnXShyb3V0ZSksXG4gICAgICBdKS50aGVuKCgpID0+IHJlc29sdmUoKSwgcmVqZWN0KVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBmZXRjaENvbXBvbmVudChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTxDb21wb25lbnRSZXM+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2VcbiAgICBjb25zdCBjYW5jZWwgPSAodGhpcy5jbGMgPSAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgfSlcbiAgICByb3V0ZSA9IGRlbEJhc2VQYXRoKHJvdXRlKVxuXG4gICAgY29uc3QgY29tcG9uZW50UmVzdWx0ID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmxvYWRQYWdlKHJvdXRlKVxuXG4gICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IG5ldyBFcnJvcihcbiAgICAgICAgYEFib3J0IGZldGNoaW5nIGNvbXBvbmVudCBmb3Igcm91dGU6IFwiJHtyb3V0ZX1cImBcbiAgICAgIClcbiAgICAgIGVycm9yLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuXG4gICAgaWYgKGNhbmNlbCA9PT0gdGhpcy5jbGMpIHtcbiAgICAgIHRoaXMuY2xjID0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnRSZXN1bHRcbiAgfVxuXG4gIF9nZXREYXRhPFQ+KGZuOiAoKSA9PiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlXG4gICAgY29uc3QgY2FuY2VsID0gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLmNsYyA9IGNhbmNlbFxuICAgIHJldHVybiBmbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmIChjYW5jZWwgPT09IHRoaXMuY2xjKSB7XG4gICAgICAgIHRoaXMuY2xjID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgIGNvbnN0IGVycjogYW55ID0gbmV3IEVycm9yKCdMb2FkaW5nIGluaXRpYWwgcHJvcHMgY2FuY2VsbGVkJylcbiAgICAgICAgZXJyLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSlcbiAgfVxuXG4gIF9nZXRTdGF0aWNEYXRhID0gKGFzUGF0aDogc3RyaW5nKTogUHJvbWlzZTxvYmplY3Q+ID0+IHtcbiAgICBjb25zdCBwYXRobmFtZSA9IHByZXBhcmVSb3V0ZShwYXJzZShhc1BhdGgpLnBhdGhuYW1lISlcblxuICAgIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nICYmIHRoaXMuc2RjW3BhdGhuYW1lXVxuICAgICAgPyBQcm9taXNlLnJlc29sdmUodGhpcy5zZGNbcGF0aG5hbWVdKVxuICAgICAgOiBmZXRjaE5leHREYXRhKFxuICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgdGhpcy5pc1NzcixcbiAgICAgICAgICAoZGF0YSkgPT4gKHRoaXMuc2RjW3BhdGhuYW1lXSA9IGRhdGEpXG4gICAgICAgIClcbiAgfVxuXG4gIF9nZXRTZXJ2ZXJEYXRhID0gKGFzUGF0aDogc3RyaW5nKTogUHJvbWlzZTxvYmplY3Q+ID0+IHtcbiAgICBsZXQgeyBwYXRobmFtZSwgcXVlcnkgfSA9IHBhcnNlKGFzUGF0aCwgdHJ1ZSlcbiAgICBwYXRobmFtZSA9IHByZXBhcmVSb3V0ZShwYXRobmFtZSEpXG4gICAgcmV0dXJuIGZldGNoTmV4dERhdGEocGF0aG5hbWUsIHF1ZXJ5LCB0aGlzLmlzU3NyKVxuICB9XG5cbiAgZ2V0SW5pdGlhbFByb3BzKFxuICAgIENvbXBvbmVudDogQ29tcG9uZW50VHlwZSxcbiAgICBjdHg6IE5leHRQYWdlQ29udGV4dFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgQ29tcG9uZW50OiBBcHAgfSA9IHRoaXMuY29tcG9uZW50c1snL19hcHAnXVxuICAgIGNvbnN0IEFwcFRyZWUgPSB0aGlzLl93cmFwQXBwKEFwcClcbiAgICBjdHguQXBwVHJlZSA9IEFwcFRyZWVcbiAgICByZXR1cm4gbG9hZEdldEluaXRpYWxQcm9wczxBcHBDb250ZXh0VHlwZTxSb3V0ZXI+PihBcHAsIHtcbiAgICAgIEFwcFRyZWUsXG4gICAgICBDb21wb25lbnQsXG4gICAgICByb3V0ZXI6IHRoaXMsXG4gICAgICBjdHgsXG4gICAgfSlcbiAgfVxuXG4gIGFib3J0Q29tcG9uZW50TG9hZChhczogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xjKSB7XG4gICAgICBjb25zdCBlID0gbmV3IEVycm9yKCdSb3V0ZSBDYW5jZWxsZWQnKVxuICAgICAgOyhlIGFzIGFueSkuY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZSwgYXMpXG4gICAgICB0aGlzLmNsYygpXG4gICAgICB0aGlzLmNsYyA9IG51bGxcbiAgICB9XG4gIH1cblxuICBub3RpZnkoZGF0YTogUm91dGVJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViKGRhdGEsIHRoaXMuY29tcG9uZW50c1snL19hcHAnXS5Db21wb25lbnQpXG4gIH1cbn1cbiIsIi8vIElkZW50aWZ5IC9bcGFyYW1dLyBpbiByb3V0ZSBzdHJpbmdcbmNvbnN0IFRFU1RfUk9VVEUgPSAvXFwvXFxbW14vXSs/XFxdKD89XFwvfCQpL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEeW5hbWljUm91dGUocm91dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gVEVTVF9ST1VURS50ZXN0KHJvdXRlKVxufVxuIiwiaW1wb3J0IHsgZ2V0Um91dGVSZWdleCB9IGZyb20gJy4vcm91dGUtcmVnZXgnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3V0ZU1hdGNoZXIocm91dGVSZWdleDogUmV0dXJuVHlwZTx0eXBlb2YgZ2V0Um91dGVSZWdleD4pIHtcbiAgY29uc3QgeyByZSwgZ3JvdXBzIH0gPSByb3V0ZVJlZ2V4XG4gIHJldHVybiAocGF0aG5hbWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICBjb25zdCByb3V0ZU1hdGNoID0gcmUuZXhlYyhwYXRobmFtZSEpXG4gICAgaWYgKCFyb3V0ZU1hdGNoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBkZWNvZGUgPSAocGFyYW06IHN0cmluZykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYXJhbSlcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgY29uc3QgZXJyOiBFcnJvciAmIHsgY29kZT86IHN0cmluZyB9ID0gbmV3IEVycm9yKFxuICAgICAgICAgICdmYWlsZWQgdG8gZGVjb2RlIHBhcmFtJ1xuICAgICAgICApXG4gICAgICAgIGVyci5jb2RlID0gJ0RFQ09ERV9GQUlMRUQnXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IHsgW3BhcmFtTmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfSA9IHt9XG5cbiAgICBPYmplY3Qua2V5cyhncm91cHMpLmZvckVhY2goKHNsdWdOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGcgPSBncm91cHNbc2x1Z05hbWVdXG4gICAgICBjb25zdCBtID0gcm91dGVNYXRjaFtnLnBvc11cbiAgICAgIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zW3NsdWdOYW1lXSA9IH5tLmluZGV4T2YoJy8nKVxuICAgICAgICAgID8gbS5zcGxpdCgnLycpLm1hcCgoZW50cnkpID0+IGRlY29kZShlbnRyeSkpXG4gICAgICAgICAgOiBnLnJlcGVhdFxuICAgICAgICAgID8gW2RlY29kZShtKV1cbiAgICAgICAgICA6IGRlY29kZShtKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBhcmFtc1xuICB9XG59XG4iLCIvLyB0aGlzIGlzbid0IGltcG9ydGluZyB0aGUgZXNjYXBlLXN0cmluZy1yZWdleCBtb2R1bGVcbi8vIHRvIHJlZHVjZSBieXRlc1xuZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2csICdcXFxcJCYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um91dGVSZWdleChcbiAgbm9ybWFsaXplZFJvdXRlOiBzdHJpbmdcbik6IHtcbiAgcmU6IFJlZ0V4cFxuICBuYW1lZFJlZ2V4Pzogc3RyaW5nXG4gIGdyb3Vwczoge1xuICAgIFtncm91cE5hbWU6IHN0cmluZ106IHsgcG9zOiBudW1iZXI7IHJlcGVhdDogYm9vbGVhbjsgb3B0aW9uYWw6IGJvb2xlYW4gfVxuICB9XG59IHtcbiAgLy8gRXNjYXBlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgY291bGQgYmUgY29uc2lkZXJlZCBSZWdFeFxuICBjb25zdCBlc2NhcGVkUm91dGUgPSBlc2NhcGVSZWdleChub3JtYWxpemVkUm91dGUucmVwbGFjZSgvXFwvJC8sICcnKSB8fCAnLycpXG5cbiAgY29uc3QgZ3JvdXBzOiB7XG4gICAgW2dyb3VwTmFtZTogc3RyaW5nXTogeyBwb3M6IG51bWJlcjsgcmVwZWF0OiBib29sZWFuOyBvcHRpb25hbDogYm9vbGVhbiB9XG4gIH0gPSB7fVxuICBsZXQgZ3JvdXBJbmRleCA9IDFcblxuICBjb25zdCBwYXJhbWV0ZXJpemVkUm91dGUgPSBlc2NhcGVkUm91dGUucmVwbGFjZShcbiAgICAvXFwvXFxcXFxcWyhbXi9dKz8pXFxcXFxcXSg/PVxcL3wkKS9nLFxuICAgIChfLCAkMSkgPT4ge1xuICAgICAgY29uc3QgaXNPcHRpb25hbCA9IC9eXFxcXFxcWy4qXFxcXFxcXSQvLnRlc3QoJDEpXG4gICAgICBpZiAoaXNPcHRpb25hbCkge1xuICAgICAgICAkMSA9ICQxLnNsaWNlKDIsIC0yKVxuICAgICAgfVxuICAgICAgY29uc3QgaXNDYXRjaEFsbCA9IC9eKFxcXFxcXC4pezN9Ly50ZXN0KCQxKVxuICAgICAgaWYgKGlzQ2F0Y2hBbGwpIHtcbiAgICAgICAgJDEgPSAkMS5zbGljZSg2KVxuICAgICAgfVxuICAgICAgZ3JvdXBzW1xuICAgICAgICAkMVxuICAgICAgICAgIC8vIFVuLWVzY2FwZSBrZXlcbiAgICAgICAgICAucmVwbGFjZSgvXFxcXChbfFxcXFx7fSgpW1xcXV4kKyo/Li1dKS9nLCAnJDEnKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VxdWVuY2VzXG4gICAgICBdID0geyBwb3M6IGdyb3VwSW5kZXgrKywgcmVwZWF0OiBpc0NhdGNoQWxsLCBvcHRpb25hbDogaXNPcHRpb25hbCB9XG4gICAgICByZXR1cm4gaXNDYXRjaEFsbCA/IChpc09wdGlvbmFsID8gJyg/Oi8oLis/KSk/JyA6ICcvKC4rPyknKSA6ICcvKFteL10rPyknXG4gICAgfVxuICApXG5cbiAgbGV0IG5hbWVkUGFyYW1ldGVyaXplZFJvdXRlOiBzdHJpbmcgfCB1bmRlZmluZWRcblxuICAvLyBkZWFkIGNvZGUgZWxpbWluYXRlIGZvciBicm93c2VyIHNpbmNlIGl0J3Mgb25seSBuZWVkZWRcbiAgLy8gd2hpbGUgZ2VuZXJhdGluZyByb3V0ZXMtbWFuaWZlc3RcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmFtZWRQYXJhbWV0ZXJpemVkUm91dGUgPSBlc2NhcGVkUm91dGUucmVwbGFjZShcbiAgICAgIC9cXC9cXFxcXFxbKFteL10rPylcXFxcXFxdKD89XFwvfCQpL2csXG4gICAgICAoXywgJDEpID0+IHtcbiAgICAgICAgY29uc3QgaXNDYXRjaEFsbCA9IC9eKFxcXFxcXC4pezN9Ly50ZXN0KCQxKVxuICAgICAgICBjb25zdCBrZXkgPSAkMVxuICAgICAgICAgIC8vIFVuLWVzY2FwZSBrZXlcbiAgICAgICAgICAucmVwbGFjZSgvXFxcXChbfFxcXFx7fSgpW1xcXV4kKyo/Li1dKS9nLCAnJDEnKVxuICAgICAgICAgIC5yZXBsYWNlKC9eXFwuezN9LywgJycpXG5cbiAgICAgICAgcmV0dXJuIGlzQ2F0Y2hBbGxcbiAgICAgICAgICA/IGAvKD88JHtlc2NhcGVSZWdleChrZXkpfT4uKz8pYFxuICAgICAgICAgIDogYC8oPzwke2VzY2FwZVJlZ2V4KGtleSl9PlteL10rPylgXG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZTogbmV3IFJlZ0V4cCgnXicgKyBwYXJhbWV0ZXJpemVkUm91dGUgKyAnKD86Lyk/JCcsICdpJyksXG4gICAgZ3JvdXBzLFxuICAgIG5hbWVkUmVnZXg6IG5hbWVkUGFyYW1ldGVyaXplZFJvdXRlXG4gICAgICA/IGBeJHtuYW1lZFBhcmFtZXRlcml6ZWRSb3V0ZX0oPzovKT8kYFxuICAgICAgOiB1bmRlZmluZWQsXG4gIH1cbn1cbiIsImltcG9ydCB7IEluY29taW5nTWVzc2FnZSwgU2VydmVyUmVzcG9uc2UgfSBmcm9tICdodHRwJ1xuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGZvcm1hdCwgVVJMRm9ybWF0T3B0aW9ucywgVXJsT2JqZWN0IH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgTWFuaWZlc3RJdGVtIH0gZnJvbSAnLi4vc2VydmVyL2xvYWQtY29tcG9uZW50cydcbmltcG9ydCB7IE5leHRSb3V0ZXIgfSBmcm9tICcuL3JvdXRlci9yb3V0ZXInXG5pbXBvcnQgeyBFbnYgfSBmcm9tICcuLi8uLi9saWIvbG9hZC1lbnYtY29uZmlnJ1xuXG4vKipcbiAqIFR5cGVzIHVzZWQgYnkgYm90aCBuZXh0IGFuZCBuZXh0LXNlcnZlclxuICovXG5cbmV4cG9ydCB0eXBlIE5leHRDb21wb25lbnRUeXBlPFxuICBDIGV4dGVuZHMgQmFzZUNvbnRleHQgPSBOZXh0UGFnZUNvbnRleHQsXG4gIElQID0ge30sXG4gIFAgPSB7fVxuPiA9IENvbXBvbmVudFR5cGU8UD4gJiB7XG4gIC8qKlxuICAgKiBVc2VkIGZvciBpbml0aWFsIHBhZ2UgbG9hZCBkYXRhIHBvcHVsYXRpb24uIERhdGEgcmV0dXJuZWQgZnJvbSBgZ2V0SW5pdGlhbFByb3BzYCBpcyBzZXJpYWxpemVkIHdoZW4gc2VydmVyIHJlbmRlcmVkLlxuICAgKiBNYWtlIHN1cmUgdG8gcmV0dXJuIHBsYWluIGBPYmplY3RgIHdpdGhvdXQgdXNpbmcgYERhdGVgLCBgTWFwYCwgYFNldGAuXG4gICAqIEBwYXJhbSBjdHggQ29udGV4dCBvZiBgcGFnZWBcbiAgICovXG4gIGdldEluaXRpYWxQcm9wcz8oY29udGV4dDogQyk6IElQIHwgUHJvbWlzZTxJUD5cbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRUeXBlID0gTmV4dENvbXBvbmVudFR5cGU8XG4gIERvY3VtZW50Q29udGV4dCxcbiAgRG9jdW1lbnRJbml0aWFsUHJvcHMsXG4gIERvY3VtZW50UHJvcHNcbj4gJiB7XG4gIHJlbmRlckRvY3VtZW50KFxuICAgIERvY3VtZW50OiBEb2N1bWVudFR5cGUsXG4gICAgcHJvcHM6IERvY3VtZW50UHJvcHNcbiAgKTogUmVhY3QuUmVhY3RFbGVtZW50XG59XG5cbmV4cG9ydCB0eXBlIEFwcFR5cGUgPSBOZXh0Q29tcG9uZW50VHlwZTxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlXG4+XG5cbmV4cG9ydCB0eXBlIEFwcFRyZWVUeXBlID0gQ29tcG9uZW50VHlwZTxcbiAgQXBwSW5pdGlhbFByb3BzICYgeyBbbmFtZTogc3RyaW5nXTogYW55IH1cbj5cblxuZXhwb3J0IHR5cGUgRW5oYW5jZXI8Qz4gPSAoQ29tcG9uZW50OiBDKSA9PiBDXG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudHNFbmhhbmNlciA9XG4gIHwge1xuICAgICAgZW5oYW5jZUFwcD86IEVuaGFuY2VyPEFwcFR5cGU+XG4gICAgICBlbmhhbmNlQ29tcG9uZW50PzogRW5oYW5jZXI8TmV4dENvbXBvbmVudFR5cGU+XG4gICAgfVxuICB8IEVuaGFuY2VyPE5leHRDb21wb25lbnRUeXBlPlxuXG5leHBvcnQgdHlwZSBSZW5kZXJQYWdlUmVzdWx0ID0ge1xuICBodG1sOiBzdHJpbmdcbiAgaGVhZD86IEFycmF5PEpTWC5FbGVtZW50IHwgbnVsbD5cbn1cblxuZXhwb3J0IHR5cGUgUmVuZGVyUGFnZSA9IChcbiAgb3B0aW9ucz86IENvbXBvbmVudHNFbmhhbmNlclxuKSA9PiBSZW5kZXJQYWdlUmVzdWx0IHwgUHJvbWlzZTxSZW5kZXJQYWdlUmVzdWx0PlxuXG5leHBvcnQgdHlwZSBCYXNlQ29udGV4dCA9IHtcbiAgcmVzPzogU2VydmVyUmVzcG9uc2VcbiAgW2s6IHN0cmluZ106IGFueVxufVxuXG5leHBvcnQgdHlwZSBORVhUX0RBVEEgPSB7XG4gIHByb3BzOiBhbnlcbiAgcGFnZTogc3RyaW5nXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICBidWlsZElkOiBzdHJpbmdcbiAgYXNzZXRQcmVmaXg/OiBzdHJpbmdcbiAgcnVudGltZUNvbmZpZz86IHsgW2tleTogc3RyaW5nXTogYW55IH1cbiAgbmV4dEV4cG9ydD86IGJvb2xlYW5cbiAgYXV0b0V4cG9ydD86IGJvb2xlYW5cbiAgaXNGYWxsYmFjaz86IGJvb2xlYW5cbiAgZHluYW1pY0lkcz86IHN0cmluZ1tdXG4gIGVycj86IEVycm9yICYgeyBzdGF0dXNDb2RlPzogbnVtYmVyIH1cbiAgZ3NwPzogYm9vbGVhblxuICBnc3NwPzogYm9vbGVhblxuICBjdXN0b21TZXJ2ZXI/OiBib29sZWFuXG4gIGdpcD86IGJvb2xlYW5cbiAgYXBwR2lwPzogYm9vbGVhblxufVxuXG4vKipcbiAqIGBOZXh0YCBjb250ZXh0XG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBpbnRlcmZhY2UtbmFtZVxuZXhwb3J0IGludGVyZmFjZSBOZXh0UGFnZUNvbnRleHQge1xuICAvKipcbiAgICogRXJyb3Igb2JqZWN0IGlmIGVuY291bnRlcmVkIGR1cmluZyByZW5kZXJpbmdcbiAgICovXG4gIGVycj86IChFcnJvciAmIHsgc3RhdHVzQ29kZT86IG51bWJlciB9KSB8IG51bGxcbiAgLyoqXG4gICAqIGBIVFRQYCByZXF1ZXN0IG9iamVjdC5cbiAgICovXG4gIHJlcT86IEluY29taW5nTWVzc2FnZVxuICAvKipcbiAgICogYEhUVFBgIHJlc3BvbnNlIG9iamVjdC5cbiAgICovXG4gIHJlcz86IFNlcnZlclJlc3BvbnNlXG4gIC8qKlxuICAgKiBQYXRoIHNlY3Rpb24gb2YgYFVSTGAuXG4gICAqL1xuICBwYXRobmFtZTogc3RyaW5nXG4gIC8qKlxuICAgKiBRdWVyeSBzdHJpbmcgc2VjdGlvbiBvZiBgVVJMYCBwYXJzZWQgYXMgYW4gb2JqZWN0LlxuICAgKi9cbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4gIC8qKlxuICAgKiBgU3RyaW5nYCBvZiB0aGUgYWN0dWFsIHBhdGggaW5jbHVkaW5nIHF1ZXJ5LlxuICAgKi9cbiAgYXNQYXRoPzogc3RyaW5nXG4gIC8qKlxuICAgKiBgQ29tcG9uZW50YCB0aGUgdHJlZSBvZiB0aGUgQXBwIHRvIHVzZSBpZiBuZWVkaW5nIHRvIHJlbmRlciBzZXBhcmF0ZWx5XG4gICAqL1xuICBBcHBUcmVlOiBBcHBUcmVlVHlwZVxufVxuXG5leHBvcnQgdHlwZSBBcHBDb250ZXh0VHlwZTxSIGV4dGVuZHMgTmV4dFJvdXRlciA9IE5leHRSb3V0ZXI+ID0ge1xuICBDb21wb25lbnQ6IE5leHRDb21wb25lbnRUeXBlPE5leHRQYWdlQ29udGV4dD5cbiAgQXBwVHJlZTogQXBwVHJlZVR5cGVcbiAgY3R4OiBOZXh0UGFnZUNvbnRleHRcbiAgcm91dGVyOiBSXG59XG5cbmV4cG9ydCB0eXBlIEFwcEluaXRpYWxQcm9wcyA9IHtcbiAgcGFnZVByb3BzOiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHNUeXBlPFxuICBSIGV4dGVuZHMgTmV4dFJvdXRlciA9IE5leHRSb3V0ZXIsXG4gIFAgPSB7fVxuPiA9IEFwcEluaXRpYWxQcm9wcyAmIHtcbiAgQ29tcG9uZW50OiBOZXh0Q29tcG9uZW50VHlwZTxOZXh0UGFnZUNvbnRleHQsIGFueSwgUD5cbiAgcm91dGVyOiBSXG4gIF9fTl9TU0c/OiBib29sZWFuXG4gIF9fTl9TU1A/OiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50Q29udGV4dCA9IE5leHRQYWdlQ29udGV4dCAmIHtcbiAgcmVuZGVyUGFnZTogUmVuZGVyUGFnZVxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudEluaXRpYWxQcm9wcyA9IFJlbmRlclBhZ2VSZXN1bHQgJiB7XG4gIHN0eWxlcz86IFJlYWN0LlJlYWN0RWxlbWVudFtdIHwgUmVhY3QuUmVhY3RGcmFnbWVudFxufVxuXG5leHBvcnQgdHlwZSBEb2N1bWVudFByb3BzID0gRG9jdW1lbnRJbml0aWFsUHJvcHMgJiB7XG4gIF9fTkVYVF9EQVRBX186IE5FWFRfREFUQVxuICBkYW5nZXJvdXNBc1BhdGg6IHN0cmluZ1xuICBhbXBQYXRoOiBzdHJpbmdcbiAgaW5BbXBNb2RlOiBib29sZWFuXG4gIGh5YnJpZEFtcDogYm9vbGVhblxuICBzdGF0aWNNYXJrdXA6IGJvb2xlYW5cbiAgaXNEZXZlbG9wbWVudDogYm9vbGVhblxuICBkZXZGaWxlczogc3RyaW5nW11cbiAgZmlsZXM6IHN0cmluZ1tdXG4gIGxvd1ByaW9yaXR5RmlsZXM6IHN0cmluZ1tdXG4gIHBvbHlmaWxsRmlsZXM6IHN0cmluZ1tdXG4gIGR5bmFtaWNJbXBvcnRzOiBNYW5pZmVzdEl0ZW1bXVxuICBhc3NldFByZWZpeD86IHN0cmluZ1xuICBjYW5vbmljYWxCYXNlOiBzdHJpbmdcbiAgaHRtbFByb3BzOiBhbnlcbiAgYm9keVRhZ3M6IGFueVtdXG4gIGhlYWRUYWdzOiBhbnlbXVxuICB1bnN0YWJsZV9ydW50aW1lSlM/OiBmYWxzZVxufVxuXG4vKipcbiAqIE5leHQgYEFQSWAgcm91dGUgcmVxdWVzdFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5leHRBcGlSZXF1ZXN0IGV4dGVuZHMgSW5jb21pbmdNZXNzYWdlIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiBgcXVlcnlgIHZhbHVlcyBmcm9tIHVybFxuICAgKi9cbiAgcXVlcnk6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXVxuICB9XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgYGNvb2tpZXNgIGZyb20gaGVhZGVyXG4gICAqL1xuICBjb29raWVzOiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nXG4gIH1cblxuICBib2R5OiBhbnlcblxuICBlbnY6IEVudlxufVxuXG4vKipcbiAqIFNlbmQgYm9keSBvZiByZXNwb25zZVxuICovXG50eXBlIFNlbmQ8VD4gPSAoYm9keTogVCkgPT4gdm9pZFxuXG4vKipcbiAqIE5leHQgYEFQSWAgcm91dGUgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dEFwaVJlc3BvbnNlPFQgPSBhbnk+ID0gU2VydmVyUmVzcG9uc2UgJiB7XG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgYGFueWAgZGF0YSBpbiByZXNwb25zZVxuICAgKi9cbiAgc2VuZDogU2VuZDxUPlxuICAvKipcbiAgICogU2VuZCBkYXRhIGBqc29uYCBkYXRhIGluIHJlc3BvbnNlXG4gICAqL1xuICBqc29uOiBTZW5kPFQ+XG4gIHN0YXR1czogKHN0YXR1c0NvZGU6IG51bWJlcikgPT4gTmV4dEFwaVJlc3BvbnNlPFQ+XG5cbiAgLyoqXG4gICAqIFNldCBwcmV2aWV3IGRhdGEgZm9yIE5leHQuanMnIHByZXJlbmRlciBtb2RlXG4gICAqL1xuICBzZXRQcmV2aWV3RGF0YTogKFxuICAgIGRhdGE6IG9iamVjdCB8IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgdGhlIG51bWJlciAoaW4gc2Vjb25kcykgZm9yIHRoZSBwcmV2aWV3IHNlc3Npb24gdG8gbGFzdCBmb3IuXG4gICAgICAgKiBUaGUgZ2l2ZW4gbnVtYmVyIHdpbGwgYmUgY29udmVydGVkIHRvIGFuIGludGVnZXIgYnkgcm91bmRpbmcgZG93bi5cbiAgICAgICAqIEJ5IGRlZmF1bHQsIG5vIG1heGltdW0gYWdlIGlzIHNldCBhbmQgdGhlIHByZXZpZXcgc2Vzc2lvbiBmaW5pc2hlc1xuICAgICAgICogd2hlbiB0aGUgY2xpZW50IHNodXRzIGRvd24gKGJyb3dzZXIgaXMgY2xvc2VkKS5cbiAgICAgICAqL1xuICAgICAgbWF4QWdlPzogbnVtYmVyXG4gICAgfVxuICApID0+IE5leHRBcGlSZXNwb25zZTxUPlxuICBjbGVhclByZXZpZXdEYXRhOiAoKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbn1cblxuLyoqXG4gKiBOZXh0IGBBUElgIHJvdXRlIGhhbmRsZXJcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dEFwaUhhbmRsZXI8VCA9IGFueT4gPSAoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlPFQ+XG4pID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XG5cbi8qKlxuICogVXRpbHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNPbmNlPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IFJldHVyblR5cGU8VD4+KFxuICBmbjogVFxuKTogVCB7XG4gIGxldCB1c2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdDogUmV0dXJuVHlwZTxUPlxuXG4gIHJldHVybiAoKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgaWYgKCF1c2VkKSB7XG4gICAgICB1c2VkID0gdHJ1ZVxuICAgICAgcmVzdWx0ID0gZm4oLi4uYXJncylcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KSBhcyBUXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbk9yaWdpbigpIHtcbiAgY29uc3QgeyBwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnQgfSA9IHdpbmRvdy5sb2NhdGlvblxuICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cG9ydCA/ICc6JyArIHBvcnQgOiAnJ31gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVUkwoKSB7XG4gIGNvbnN0IHsgaHJlZiB9ID0gd2luZG93LmxvY2F0aW9uXG4gIGNvbnN0IG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcbiAgcmV0dXJuIGhyZWYuc3Vic3RyaW5nKG9yaWdpbi5sZW5ndGgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZTxQPihDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UD4pIHtcbiAgcmV0dXJuIHR5cGVvZiBDb21wb25lbnQgPT09ICdzdHJpbmcnXG4gICAgPyBDb21wb25lbnRcbiAgICA6IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVzU2VudChyZXM6IFNlcnZlclJlc3BvbnNlKSB7XG4gIHJldHVybiByZXMuZmluaXNoZWQgfHwgcmVzLmhlYWRlcnNTZW50XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkR2V0SW5pdGlhbFByb3BzPFxuICBDIGV4dGVuZHMgQmFzZUNvbnRleHQsXG4gIElQID0ge30sXG4gIFAgPSB7fVxuPihBcHA6IE5leHRDb21wb25lbnRUeXBlPEMsIElQLCBQPiwgY3R4OiBDKTogUHJvbWlzZTxJUD4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChBcHAucHJvdG90eXBlPy5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgXCIke2dldERpc3BsYXlOYW1lKFxuICAgICAgICBBcHBcbiAgICAgICl9LmdldEluaXRpYWxQcm9wcygpXCIgaXMgZGVmaW5lZCBhcyBhbiBpbnN0YW5jZSBtZXRob2QgLSB2aXNpdCBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9nZXQtaW5pdGlhbC1wcm9wcy1hcy1hbi1pbnN0YW5jZS1tZXRob2QgZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gICAgfVxuICB9XG4gIC8vIHdoZW4gY2FsbGVkIGZyb20gX2FwcCBgY3R4YCBpcyBuZXN0ZWQgaW4gYGN0eGBcbiAgY29uc3QgcmVzID0gY3R4LnJlcyB8fCAoY3R4LmN0eCAmJiBjdHguY3R4LnJlcylcblxuICBpZiAoIUFwcC5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICBpZiAoY3R4LmN0eCAmJiBjdHguQ29tcG9uZW50KSB7XG4gICAgICAvLyBAdHMtaWdub3JlIHBhZ2VQcm9wcyBkZWZhdWx0XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWdlUHJvcHM6IGF3YWl0IGxvYWRHZXRJbml0aWFsUHJvcHMoY3R4LkNvbXBvbmVudCwgY3R4LmN0eCksXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBJUFxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBhd2FpdCBBcHAuZ2V0SW5pdGlhbFByb3BzKGN0eClcblxuICBpZiAocmVzICYmIGlzUmVzU2VudChyZXMpKSB7XG4gICAgcmV0dXJuIHByb3BzXG4gIH1cblxuICBpZiAoIXByb3BzKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBcIiR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICBBcHBcbiAgICApfS5nZXRJbml0aWFsUHJvcHMoKVwiIHNob3VsZCByZXNvbHZlIHRvIGFuIG9iamVjdC4gQnV0IGZvdW5kIFwiJHtwcm9wc31cIiBpbnN0ZWFkLmBcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BzKS5sZW5ndGggPT09IDAgJiYgIWN0eC5jdHgpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYCR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICAgICAgQXBwXG4gICAgICAgICl9IHJldHVybmVkIGFuIGVtcHR5IG9iamVjdCBmcm9tIFxcYGdldEluaXRpYWxQcm9wc1xcYC4gVGhpcyBkZS1vcHRpbWl6ZXMgYW5kIHByZXZlbnRzIGF1dG9tYXRpYyBzdGF0aWMgb3B0aW1pemF0aW9uLiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9lbXB0eS1vYmplY3QtZ2V0SW5pdGlhbFByb3BzYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcm9wc1xufVxuXG5leHBvcnQgY29uc3QgdXJsT2JqZWN0S2V5cyA9IFtcbiAgJ2F1dGgnLFxuICAnaGFzaCcsXG4gICdob3N0JyxcbiAgJ2hvc3RuYW1lJyxcbiAgJ2hyZWYnLFxuICAncGF0aCcsXG4gICdwYXRobmFtZScsXG4gICdwb3J0JyxcbiAgJ3Byb3RvY29sJyxcbiAgJ3F1ZXJ5JyxcbiAgJ3NlYXJjaCcsXG4gICdzbGFzaGVzJyxcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFdpdGhWYWxpZGF0aW9uKFxuICB1cmw6IFVybE9iamVjdCxcbiAgb3B0aW9ucz86IFVSTEZvcm1hdE9wdGlvbnNcbik6IHN0cmluZyB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIGlmICh1cmwgIT09IG51bGwgJiYgdHlwZW9mIHVybCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKHVybCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICh1cmxPYmplY3RLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVW5rbm93biBrZXkgcGFzc2VkIHZpYSB1cmxPYmplY3QgaW50byB1cmwuZm9ybWF0OiAke2tleX1gXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmb3JtYXQodXJsIGFzIFVSTCwgb3B0aW9ucylcbn1cblxuZXhwb3J0IGNvbnN0IFNQID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSAndW5kZWZpbmVkJ1xuZXhwb3J0IGNvbnN0IFNUID1cbiAgU1AgJiZcbiAgdHlwZW9mIHBlcmZvcm1hbmNlLm1hcmsgPT09ICdmdW5jdGlvbicgJiZcbiAgdHlwZW9mIHBlcmZvcm1hbmNlLm1lYXN1cmUgPT09ICdmdW5jdGlvbidcbiIsImltcG9ydCBSZWFjdCwgeyBFcnJvckluZm8gfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7XG4gIGV4ZWNPbmNlLFxuICBsb2FkR2V0SW5pdGlhbFByb3BzLFxuICBBcHBDb250ZXh0VHlwZSxcbiAgQXBwSW5pdGlhbFByb3BzLFxuICBBcHBQcm9wc1R5cGUsXG59IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi91dGlscydcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJy4uL2NsaWVudC9yb3V0ZXInXG5cbmV4cG9ydCB7IEFwcEluaXRpYWxQcm9wcyB9XG5cbmV4cG9ydCB0eXBlIEFwcENvbnRleHQgPSBBcHBDb250ZXh0VHlwZTxSb3V0ZXI+XG5cbmV4cG9ydCB0eXBlIEFwcFByb3BzPFAgPSB7fT4gPSBBcHBQcm9wc1R5cGU8Um91dGVyLCBQPlxuXG4vKipcbiAqIGBBcHBgIGNvbXBvbmVudCBpcyB1c2VkIGZvciBpbml0aWFsaXplIG9mIHBhZ2VzLiBJdCBhbGxvd3MgZm9yIG92ZXJ3cml0aW5nIGFuZCBmdWxsIGNvbnRyb2wgb2YgdGhlIGBwYWdlYCBpbml0aWFsaXphdGlvbi5cbiAqIFRoaXMgYWxsb3dzIGZvciBrZWVwaW5nIHN0YXRlIGJldHdlZW4gbmF2aWdhdGlvbiwgY3VzdG9tIGVycm9yIGhhbmRsaW5nLCBpbmplY3RpbmcgYWRkaXRpb25hbCBkYXRhLlxuICovXG5hc3luYyBmdW5jdGlvbiBhcHBHZXRJbml0aWFsUHJvcHMoe1xuICBDb21wb25lbnQsXG4gIGN0eCxcbn06IEFwcENvbnRleHQpOiBQcm9taXNlPEFwcEluaXRpYWxQcm9wcz4ge1xuICBjb25zdCBwYWdlUHJvcHMgPSBhd2FpdCBsb2FkR2V0SW5pdGlhbFByb3BzKENvbXBvbmVudCwgY3R4KVxuICByZXR1cm4geyBwYWdlUHJvcHMgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHA8UCA9IHt9LCBDUCA9IHt9LCBTID0ge30+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFxuICBQICYgQXBwUHJvcHM8Q1A+LFxuICBTXG4+IHtcbiAgc3RhdGljIG9yaWdHZXRJbml0aWFsUHJvcHMgPSBhcHBHZXRJbml0aWFsUHJvcHNcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wc1xuXG4gIC8vIEtlcHQgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIC8vIFdoZW4gc29tZW9uZSBlbmRlZCBBcHAgdGhleSBjb3VsZCBjYWxsIGBzdXBlci5jb21wb25lbnREaWRDYXRjaGAuXG4gIC8vIEBkZXByZWNhdGVkIFRoaXMgbWV0aG9kIGlzIG5vIGxvbmdlciBuZWVkZWQuIEVycm9ycyBhcmUgY2F1Z2h0IGF0IHRoZSB0b3AgbGV2ZWxcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3I6IEVycm9yLCBfZXJyb3JJbmZvOiBFcnJvckluZm8pOiB2b2lkIHtcbiAgICB0aHJvdyBlcnJvclxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcm91dGVyLCBDb21wb25lbnQsIHBhZ2VQcm9wcywgX19OX1NTRywgX19OX1NTUCB9ID0gdGhpc1xuICAgICAgLnByb3BzIGFzIEFwcFByb3BzPENQPlxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgey4uLnBhZ2VQcm9wc31cbiAgICAgICAge1xuICAgICAgICAgIC8vIHdlIGRvbid0IGFkZCB0aGUgbGVnYWN5IFVSTCBwcm9wIGlmIGl0J3MgdXNpbmcgbm9uLWxlZ2FjeVxuICAgICAgICAgIC8vIG1ldGhvZHMgbGlrZSBnZXRTdGF0aWNQcm9wcyBhbmQgZ2V0U2VydmVyU2lkZVByb3BzXG4gICAgICAgICAgLi4uKCEoX19OX1NTRyB8fCBfX05fU1NQKSA/IHsgdXJsOiBjcmVhdGVVcmwocm91dGVyKSB9IDoge30pXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgKVxuICB9XG59XG5cbmxldCB3YXJuQ29udGFpbmVyOiAoKSA9PiB2b2lkXG5sZXQgd2FyblVybDogKCkgPT4gdm9pZFxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuQ29udGFpbmVyID0gZXhlY09uY2UoKCkgPT4ge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBXYXJuaW5nOiB0aGUgXFxgQ29udGFpbmVyXFxgIGluIFxcYF9hcHBcXGAgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgc2hvdWxkIGJlIHJlbW92ZWQuIGh0dHBzOi8vZXJyLnNoL3ZlcmNlbC9uZXh0LmpzL2FwcC1jb250YWluZXItZGVwcmVjYXRlZGBcbiAgICApXG4gIH0pXG5cbiAgd2FyblVybCA9IGV4ZWNPbmNlKCgpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYFdhcm5pbmc6IHRoZSAndXJsJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy91cmwtZGVwcmVjYXRlZGBcbiAgICApXG4gIH0pXG59XG5cbi8vIEBkZXByZWNhdGVkIG5vb3AgZm9yIG5vdyB1bnRpbCByZW1vdmFsXG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHA6IGFueSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FybkNvbnRhaW5lcigpXG4gIHJldHVybiBwLmNoaWxkcmVuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVcmwocm91dGVyOiBSb3V0ZXIpIHtcbiAgLy8gVGhpcyBpcyB0byBtYWtlIHN1cmUgd2UgZG9uJ3QgcmVmZXJlbmNlcyB0aGUgcm91dGVyIG9iamVjdCBhdCBjYWxsIHRpbWVcbiAgY29uc3QgeyBwYXRobmFtZSwgYXNQYXRoLCBxdWVyeSB9ID0gcm91dGVyXG4gIHJldHVybiB7XG4gICAgZ2V0IHF1ZXJ5KCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHF1ZXJ5XG4gICAgfSxcbiAgICBnZXQgcGF0aG5hbWUoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcGF0aG5hbWVcbiAgICB9LFxuICAgIGdldCBhc1BhdGgoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gYXNQYXRoXG4gICAgfSxcbiAgICBiYWNrOiAoKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByb3V0ZXIuYmFjaygpXG4gICAgfSxcbiAgICBwdXNoOiAodXJsOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcm91dGVyLnB1c2godXJsLCBhcylcbiAgICB9LFxuICAgIHB1c2hUbzogKGhyZWY6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIGNvbnN0IHB1c2hSb3V0ZSA9IGFzID8gaHJlZiA6ICcnXG4gICAgICBjb25zdCBwdXNoVXJsID0gYXMgfHwgaHJlZlxuXG4gICAgICByZXR1cm4gcm91dGVyLnB1c2gocHVzaFJvdXRlLCBwdXNoVXJsKVxuICAgIH0sXG4gICAgcmVwbGFjZTogKHVybDogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHJvdXRlci5yZXBsYWNlKHVybCwgYXMpXG4gICAgfSxcbiAgICByZXBsYWNlVG86IChocmVmOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICBjb25zdCByZXBsYWNlUm91dGUgPSBhcyA/IGhyZWYgOiAnJ1xuICAgICAgY29uc3QgcmVwbGFjZVVybCA9IGFzIHx8IGhyZWZcblxuICAgICAgcmV0dXJuIHJvdXRlci5yZXBsYWNlKHJlcGxhY2VSb3V0ZSwgcmVwbGFjZVVybClcbiAgICB9LFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvbGluaycpXG4iLCJpbXBvcnQgeyB3aXRoQXBvbGxvIH0gZnJvbSAnaG9jL3dpdGhBcG9sbG8uanN4JztcclxuaW1wb3J0IEFwcExheW91dCBmcm9tICdjb250YWluZXJzL2xheW91dHMvQXBwTGF5b3V0JztcclxuaW1wb3J0IHsgdXNlU2Vzc2lvblN0YXRlIH0gZnJvbSAnY29udGV4dC9zZXNzaW9uL3Nlc3Npb24nO1xyXG5pbXBvcnQgRmFsbGJhY2tBbHJlYWR5Q29ubmVjdGVkIGZyb20gJ2NvbnRhaW5lcnMvZmFsbGJhY2tzL0ZhbGxiYWNrQWxyZWFkeUNvbm5lY3RlZCc7XHJcbmltcG9ydCBTaWduaW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvZm9ybXMvU2lnbmluRm9ybSc7XHJcblxyXG5jb25zdCBTaWduSW4gPSAoKSA9PiB7XHJcblxyXG4gIGNvbnN0IHVzZXIgPSB1c2VTZXNzaW9uU3RhdGUoKVxyXG4gXHJcbiAgaWYodXNlcikgcmV0dXJuIDxGYWxsYmFja0FscmVhZHlDb25uZWN0ZWQgLz5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxBcHBMYXlvdXQ+XHJcbiAgICAgIDxTaWduaW5Gb3JtIC8+XHJcbiAgICA8L0FwcExheW91dD5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoQXBvbGxvKCkoU2lnbkluKSIsImNvbnN0IG9taXRUeXBlbmFtZSA9IChvYmplY3QpID0+IHtcclxuICAgIGNvbnN0IG9taXRUeXBlbmFtZSA9IChrZXksIHZhbHVlKSA9PiAoa2V5ID09PSAnX190eXBlbmFtZScgPyB1bmRlZmluZWQgOiB2YWx1ZSk7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmplY3QpLCBvbWl0VHlwZW5hbWUpO1xyXG4gIH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvbWl0VHlwZW5hbWUiLCIvKmVzbGludCBuby11c2VsZXNzLWVzY2FwZTogMCovXHJcblxyXG5jb25zdCB2YWxpZGF0ZUVtYWlsRm9ybWF0ID0gKGVtYWlsIDogc3RyaW5nKSA6IGJvb2xlYW4gPT4ge1xyXG4gICAgY29uc3QgcmUgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xyXG4gICAgcmV0dXJuIHJlLnRlc3QoU3RyaW5nKGVtYWlsKS50b0xvd2VyQ2FzZSgpKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlRW1haWxGb3JtYXRcclxuXHJcbi8vIGNvbnN0IHZhbGlkYXRlRW1haWxGb3JtYXQgPSAoZW1haWwgKSA9PiB7XHJcbi8vICAgICBjb25zdCByZSA9IC9eKChbXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFtePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl0rXFwuKStbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdezIsfSkkL2k7XHJcbi8vICAgICByZXR1cm4gcmUudGVzdChTdHJpbmcoZW1haWwpLnRvTG93ZXJDYXNlKCkpO1xyXG4vLyB9O1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVFbWFpbEZvcm1hdFxyXG4iLCJpbXBvcnQgcGFzc3dvcmRWYWxpZGF0b3IgZnJvbSAncGFzc3dvcmQtdmFsaWRhdG9yJ1xyXG5cclxuY29uc3QgdmFsaWRhdGVQYXNzd29yZEZvcm1hdCA9IChwYXNzd29yZCA6IHN0cmluZykgOiBzdHJpbmdbXSA9PiB7XHJcblxyXG4gICAgbGV0IHBhc3N3b3JkVG9WYWxpZGF0ZSA9KCFwYXNzd29yZCkgPyAnICcgOiBwYXNzd29yZFxyXG5cclxuICAgIHZhciBzY2hlbWEgPSBuZXcgcGFzc3dvcmRWYWxpZGF0b3IoKTtcclxuXHJcbiAgICBzY2hlbWFcclxuICAgIC5pcygpLm1pbig4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLmlzKCkubWF4KDE1KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC5oYXMoKS51cHBlcmNhc2UoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLmhhcygpLmxvd2VyY2FzZSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC5oYXMoKS5kaWdpdHMoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAuaGFzKCkuc3ltYm9scygpICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC5oYXMoKS5ub3QoKS5zcGFjZXMoKSAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLmlzKCkubm90KCkub25lT2YoWydQYXNzdzByZCcsICdQYXNzd29yZDEyMyddKTsgXHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gc2NoZW1hLnZhbGlkYXRlKHBhc3N3b3JkVG9WYWxpZGF0ZSx7IGxpc3Q6IHRydWUgfSlcclxuICAgIFxyXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIHZhbGlkYXRlIHJldHVybmVkIGEgYm9vbGVhbiBpbnN0ZWFkIG9mIGEgc3RyaW5nIGFycmF5XCIpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVQYXNzd29yZEZvcm1hdFxyXG5cclxuLy8gY29uc3QgdmFsaWRhdGVQYXNzd29yZEZvcm1hdCA9IChwYXNzd29yZCApID0+IHtcclxuXHJcbi8vICAgICBsZXQgcGFzc3dvcmRUb1ZhbGlkYXRlID0oIXBhc3N3b3JkKSA/ICcgJyA6IHBhc3N3b3JkXHJcblxyXG4vLyAgICAgdmFyIHNjaGVtYSA9IG5ldyBwYXNzd29yZFZhbGlkYXRvcigpO1xyXG5cclxuLy8gICAgIHNjaGVtYVxyXG4vLyAgICAgLmlzKCkubWluKDgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAuaXMoKS5tYXgoMTUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgLmhhcygpLnVwcGVyY2FzZSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAuaGFzKCkubG93ZXJjYXNlKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgLmhhcygpLmRpZ2l0cygpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuLy8gICAgIC5oYXMoKS5zeW1ib2xzKCkgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgLmhhcygpLm5vdCgpLnNwYWNlcygpICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAuaXMoKS5ub3QoKS5vbmVPZihbJ1Bhc3N3MHJkJywgJ1Bhc3N3b3JkMTIzJ10pOyBcclxuXHJcbi8vICAgICByZXR1cm4gc2NoZW1hLnZhbGlkYXRlKHBhc3N3b3JkVG9WYWxpZGF0ZSx7IGxpc3Q6IHRydWUgfSlcclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVQYXNzd29yZEZvcm1hdFxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFwb2xsby9yZWFjdC1ob29rc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYXBvbGxvL3JlYWN0LXNzclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9Mb2NrT3V0bGluZWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLWNhY2hlLWlubWVtb3J5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1jbGllbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLWxpbmstaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbHN4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtdGFnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlzb21vcnBoaWMtdW5mZXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2hlYWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm90aXN0YWNrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3N3b3JkLXZhbGlkYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXMtZXhhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtY29va2llXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiXSwic291cmNlUm9vdCI6IiJ9