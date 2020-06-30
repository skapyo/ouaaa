(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./hoc/withApollo.jsx":
/*!****************************!*\
  !*** ./hoc/withApollo.jsx ***!
  \****************************/
/*! exports provided: initOnContext, withApollo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initOnContext", function() { return initOnContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withApollo", function() { return withApollo; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/lib/react-hooks.esm.js");
/* harmony import */ var _lib_apolloClient_apolloClient__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/apolloClient/apolloClient */ "./lib/apolloClient/apolloClient.js");






var _this = undefined,
    _jsxFileName = "C:\\Users\\skaPy\\IdeaProjects\\Next.js-boilerplate\\oozie-client\\hoc\\withApollo.jsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





 // On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.

var globalApolloClient = null;
/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */

var initOnContext = function initOnContext(ctx) {
  var inAppContext = Boolean(ctx.ctx); // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.

  if (true) {
    if (inAppContext) {
      console.warn('Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' + 'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n');
    }
  } // Initialize ApolloClient if not already done


  var apolloClient = ctx.apolloClient || initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx); // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.

  apolloClient.toJSON = function () {
    return null;
  }; // Add apolloClient to NextPageContext & NextAppContext.
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

var initApolloClient = function initApolloClient(initialState, ctx) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (false) {} // Reuse client on the client-side


  if (!globalApolloClient) {
    globalApolloClient = Object(_lib_apolloClient_apolloClient__WEBPACK_IMPORTED_MODULE_9__["default"])(initialState, ctx);
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


var withApollo = function withApollo() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$ssr = _ref.ssr,
      ssr = _ref$ssr === void 0 ? false : _ref$ssr;

  return function (PageComponent) {
    var WithApollo = function WithApollo(_ref2) {
      var apolloClient = _ref2.apolloClient,
          apolloState = _ref2.apolloState,
          pageProps = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref2, ["apolloClient", "apolloState"]);

      var client;

      if (apolloClient) {
        // Happens on: getDataFromTree & next.js ssr
        client = apolloClient;
      } else {
        // Happens on: next.js csr
        client = initApolloClient(apolloState, undefined);
      }

      return __jsx(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__["ApolloProvider"], {
        client: client,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 7
        }
      }, __jsx(PageComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, pageProps, {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 9
        }
      })));
    }; // Set the correct displayName in development


    if (true) {
      var displayName = PageComponent.displayName || PageComponent.name || 'Component';
      WithApollo.displayName = "withApollo(".concat(displayName, ")");
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps = /*#__PURE__*/function () {
        var _ref3 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx) {
          var inAppContext, _initOnContext, apolloClient, pageProps, AppTree, _yield$import, getDataFromTree, props;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  inAppContext = Boolean(ctx.ctx);
                  _initOnContext = initOnContext(ctx), apolloClient = _initOnContext.apolloClient; // Run wrapped getInitialProps methods

                  pageProps = {};

                  if (!PageComponent.getInitialProps) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 6;
                  return PageComponent.getInitialProps(ctx);

                case 6:
                  pageProps = _context.sent;
                  _context.next = 13;
                  break;

                case 9:
                  if (!inAppContext) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 12;
                  return next_app__WEBPACK_IMPORTED_MODULE_6___default.a.getInitialProps(ctx);

                case 12:
                  pageProps = _context.sent;

                case 13:
                  if (true) {
                    _context.next = 32;
                    break;
                  }

                  AppTree = ctx.AppTree; // When redirecting, the response is finished.
                  // No point in continuing to render

                  if (!(ctx.res && ctx.res.finished)) {
                    _context.next = 17;
                    break;
                  }

                  return _context.abrupt("return", pageProps);

                case 17:
                  if (!(ssr && AppTree)) {
                    _context.next = 32;
                    break;
                  }

                  _context.prev = 18;
                  _context.next = 21;
                  return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! @apollo/react-ssr */ "./node_modules/@apollo/react-ssr/lib/react-ssr.esm.js"));

                case 21:
                  _yield$import = _context.sent;
                  getDataFromTree = _yield$import.getDataFromTree;

                  if (inAppContext) {
                    props = _objectSpread(_objectSpread({}, pageProps), {}, {
                      apolloClient: apolloClient
                    });
                  } else {
                    props = {
                      pageProps: _objectSpread(_objectSpread({}, pageProps), {}, {
                        apolloClient: apolloClient
                      })
                    };
                  } // Take the Next.js AppTree, determine which queries are needed to render,
                  // and fetch them. This method can be pretty slow since it renders
                  // your entire AppTree once for every query. Check out apollo fragments
                  // if you want to reduce the number of rerenders.
                  // https://www.apollographql.com/docs/react/data/fragments/


                  _context.next = 26;
                  return getDataFromTree(__jsx(AppTree, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, props, {
                    __self: _this,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 152,
                      columnNumber: 35
                    }
                  })));

                case 26:
                  _context.next = 31;
                  break;

                case 28:
                  _context.prev = 28;
                  _context.t0 = _context["catch"](18);
                  // Prevent Apollo Client GraphQL errors from crashing SSR.
                  // Handle them in components via the data.error prop:
                  // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                  console.error('Error while running `getDataFromTree`', _context.t0);

                case 31:
                  // getDataFromTree does not call componentWillUnmount
                  // head side effect therefore need to be cleared manually
                  next_head__WEBPACK_IMPORTED_MODULE_7___default.a.rewind();

                case 32:
                  return _context.abrupt("return", _objectSpread(_objectSpread({}, pageProps), {}, {
                    // Extract query data from the Apollo store
                    apolloState: apolloClient.cache.extract(),
                    // Provide the client for ssr. As soon as this payload
                    // gets JSON.stringified it will remove itself.
                    apolloClient: ctx.apolloClient
                  }));

                case 33:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[18, 28]]);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }();
    }

    return WithApollo;
  };
};

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./lib/apolloClient/apolloClient.js":
/*!******************************************!*\
  !*** ./lib/apolloClient/apolloClient.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createApolloClient; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/next/dist/build/polyfills/fetch/index.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




 // import { SchemaLink } from 'apollo-link-schema';
// import {schema} from 'lib/server/apolloServer/schema'

function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  var enchancedFetch = function enchancedFetch(url, init) {
    return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default()(url, _objectSpread(_objectSpread({}, init), {}, {
      headers: _objectSpread(_objectSpread({}, init.headers), {}, {
        Cookie: ctx.req.headers.cookie
      })
    })).then(function (response) {
      return response;
    });
  };

  return new apollo_client__WEBPACK_IMPORTED_MODULE_1__["ApolloClient"]({
    ssrMode: Boolean(ctx),
    link: new apollo_link_http__WEBPACK_IMPORTED_MODULE_3__["HttpLink"]({
      uri: "http://localhost:8080/api/graphql",
      // Server URL (must be absolute)
      // uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
      credentials: "include",
      // Additional fetch() options like `credentials` or `headers`
      fetch: ctx ? enchancedFetch : isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default.a
    }),
    // link:new SchemaLink({schema}),
    cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"]().restore(initialState)
  });
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/@apollo/react-common/lib/react-common.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/react-common/lib/react-common.esm.js ***!
  \*******************************************************************/
/*! exports provided: ApolloConsumer, ApolloProvider, DocumentType, getApolloContext, operationName, parser, resetApolloContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloConsumer", function() { return ApolloConsumer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloProvider", function() { return ApolloProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentType", function() { return DocumentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApolloContext", function() { return getApolloContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operationName", function() { return operationName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parser", function() { return parser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetApolloContext", function() { return resetApolloContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.esm.js");



var apolloContext;
function getApolloContext() {
    if (!apolloContext) {
        apolloContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});
    }
    return apolloContext;
}
function resetApolloContext() {
    apolloContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});
}

var ApolloProvider = function (_a) {
    var client = _a.client, children = _a.children;
    var ApolloContext = getApolloContext();
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ApolloContext.Consumer, null, function (context) {
        if (context === void 0) { context = {}; }
        if (client && context.client !== client) {
            context = Object.assign({}, context, { client: client });
        }
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(context.client, 'ApolloProvider was not passed a client instance. Make ' +
            'sure you pass in your client via the "client" prop.');
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ApolloContext.Provider, { value: context }, children));
    });
};

var ApolloConsumer = function (props) {
    var ApolloContext = getApolloContext();
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ApolloContext.Consumer, null, function (context) {
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(context && context.client, 'Could not find "client" in the context of ApolloConsumer. ' +
            'Wrap the root component in an <ApolloProvider>.');
        return props.children(context.client);
    });
};

var DocumentType;
(function (DocumentType) {
    DocumentType[DocumentType["Query"] = 0] = "Query";
    DocumentType[DocumentType["Mutation"] = 1] = "Mutation";
    DocumentType[DocumentType["Subscription"] = 2] = "Subscription";
})(DocumentType || (DocumentType = {}));
var cache = new Map();
function operationName(type) {
    var name;
    switch (type) {
        case DocumentType.Query:
            name = 'Query';
            break;
        case DocumentType.Mutation:
            name = 'Mutation';
            break;
        case DocumentType.Subscription:
            name = 'Subscription';
            break;
    }
    return name;
}
function parser(document) {
    var cached = cache.get(document);
    if (cached)
        return cached;
    var variables, type, name;
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(!!document && !!document.kind, "Argument of " + document + " passed to parser was not a valid GraphQL " +
        "DocumentNode. You may need to use 'graphql-tag' or another method " +
        "to convert your operation into a document");
    var fragments = document.definitions.filter(function (x) { return x.kind === 'FragmentDefinition'; });
    var queries = document.definitions.filter(function (x) {
        return x.kind === 'OperationDefinition' && x.operation === 'query';
    });
    var mutations = document.definitions.filter(function (x) {
        return x.kind === 'OperationDefinition' && x.operation === 'mutation';
    });
    var subscriptions = document.definitions.filter(function (x) {
        return x.kind === 'OperationDefinition' && x.operation === 'subscription';
    });
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(!fragments.length ||
        (queries.length || mutations.length || subscriptions.length), "Passing only a fragment to 'graphql' is not yet supported. " +
        "You must include a query, subscription or mutation as well");
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(queries.length + mutations.length + subscriptions.length <= 1, "react-apollo only supports a query, subscription, or a mutation per HOC. " +
        (document + " had " + queries.length + " queries, " + subscriptions.length + " ") +
        ("subscriptions and " + mutations.length + " mutations. ") +
        "You can use 'compose' to join multiple operation types to a component");
    type = queries.length ? DocumentType.Query : DocumentType.Mutation;
    if (!queries.length && !mutations.length)
        type = DocumentType.Subscription;
    var definitions = queries.length
        ? queries
        : mutations.length
            ? mutations
            : subscriptions;
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(definitions.length === 1, "react-apollo only supports one definition per HOC. " + document + " had " +
        (definitions.length + " definitions. ") +
        "You can use 'compose' to join multiple operation types to a component");
    var definition = definitions[0];
    variables = definition.variableDefinitions || [];
    if (definition.name && definition.name.kind === 'Name') {
        name = definition.name.value;
    }
    else {
        name = 'data';
    }
    var payload = { name: name, type: type, variables: variables };
    cache.set(document, payload);
    return payload;
}


//# sourceMappingURL=react-common.esm.js.map


/***/ }),

/***/ "./node_modules/@apollo/react-hooks/lib/react-hooks.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@apollo/react-hooks/lib/react-hooks.esm.js ***!
  \*****************************************************************/
/*! exports provided: ApolloConsumer, ApolloProvider, getApolloContext, resetApolloContext, RenderPromises, useApolloClient, useLazyQuery, useMutation, useQuery, useSubscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPromises", function() { return RenderPromises; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useApolloClient", function() { return useApolloClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLazyQuery", function() { return useLazyQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMutation", function() { return useMutation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useQuery", function() { return useQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSubscription", function() { return useSubscription; });
/* harmony import */ var _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/react-common */ "./node_modules/@apollo/react-common/lib/react-common.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApolloConsumer", function() { return _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["ApolloConsumer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApolloProvider", function() { return _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["ApolloProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getApolloContext", function() { return _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["getApolloContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetApolloContext", function() { return _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["resetApolloContext"]; });

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/equality.esm.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.esm.js");








var OperationData = (function () {
    function OperationData(options, context) {
        this.isMounted = false;
        this.previousOptions = {};
        this.context = {};
        this.options = {};
        this.options = options || {};
        this.context = context || {};
    }
    OperationData.prototype.getOptions = function () {
        return this.options;
    };
    OperationData.prototype.setOptions = function (newOptions, storePrevious) {
        if (storePrevious === void 0) { storePrevious = false; }
        if (storePrevious && !Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(this.options, newOptions)) {
            this.previousOptions = this.options;
        }
        this.options = newOptions;
    };
    OperationData.prototype.unmount = function () {
        this.isMounted = false;
    };
    OperationData.prototype.refreshClient = function () {
        var client = (this.options && this.options.client) ||
            (this.context && this.context.client);
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_5__["invariant"])(!!client, 'Could not find "client" in the context or passed in as an option. ' +
            'Wrap the root component in an <ApolloProvider>, or pass an ' +
            'ApolloClient instance in via options.');
        var isNew = false;
        if (client !== this.client) {
            isNew = true;
            this.client = client;
            this.cleanup();
        }
        return {
            client: this.client,
            isNew: isNew
        };
    };
    OperationData.prototype.verifyDocumentType = function (document, type) {
        var operation = Object(_apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["parser"])(document);
        var requiredOperationName = Object(_apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["operationName"])(type);
        var usedOperationName = Object(_apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["operationName"])(operation.type);
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_5__["invariant"])(operation.type === type, "Running a " + requiredOperationName + " requires a graphql " +
            (requiredOperationName + ", but a " + usedOperationName + " was used instead."));
    };
    return OperationData;
}());

var QueryData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(QueryData, _super);
    function QueryData(_a) {
        var options = _a.options, context = _a.context, onNewData = _a.onNewData;
        var _this = _super.call(this, options, context) || this;
        _this.previousData = {};
        _this.currentObservable = {};
        _this.runLazy = false;
        _this.runLazyQuery = function (options) {
            _this.cleanup();
            _this.runLazy = true;
            _this.lazyOptions = options;
            _this.onNewData();
        };
        _this.getExecuteResult = function () {
            var result = _this.getQueryResult();
            _this.startQuerySubscription();
            return result;
        };
        _this.obsRefetch = function (variables) {
            return _this.currentObservable.query.refetch(variables);
        };
        _this.obsFetchMore = function (fetchMoreOptions) { return _this.currentObservable.query.fetchMore(fetchMoreOptions); };
        _this.obsUpdateQuery = function (mapFn) { return _this.currentObservable.query.updateQuery(mapFn); };
        _this.obsStartPolling = function (pollInterval) {
            _this.currentObservable &&
                _this.currentObservable.query &&
                _this.currentObservable.query.startPolling(pollInterval);
        };
        _this.obsStopPolling = function () {
            _this.currentObservable &&
                _this.currentObservable.query &&
                _this.currentObservable.query.stopPolling();
        };
        _this.obsSubscribeToMore = function (options) { return _this.currentObservable.query.subscribeToMore(options); };
        _this.onNewData = onNewData;
        return _this;
    }
    QueryData.prototype.execute = function () {
        this.refreshClient();
        var _a = this.getOptions(), skip = _a.skip, query = _a.query;
        if (skip || query !== this.previousData.query) {
            this.removeQuerySubscription();
            this.previousData.query = query;
        }
        this.updateObservableQuery();
        if (this.isMounted)
            this.startQuerySubscription();
        return this.getExecuteSsrResult() || this.getExecuteResult();
    };
    QueryData.prototype.executeLazy = function () {
        return !this.runLazy
            ? [
                this.runLazyQuery,
                {
                    loading: false,
                    networkStatus: apollo_client__WEBPACK_IMPORTED_MODULE_3__["NetworkStatus"].ready,
                    called: false,
                    data: undefined,
                },
            ]
            : [this.runLazyQuery, this.execute()];
    };
    QueryData.prototype.fetchData = function () {
        var options = this.getOptions();
        if (options.skip || options.ssr === false)
            return false;
        var obs = this.currentObservable.query;
        var currentResult = obs.getCurrentResult();
        return currentResult.loading ? obs.result() : false;
    };
    QueryData.prototype.afterExecute = function (_a) {
        var _b = (_a === void 0 ? {} : _a).lazy, lazy = _b === void 0 ? false : _b;
        this.isMounted = true;
        if (!lazy || this.runLazy) {
            this.handleErrorOrCompleted();
        }
        this.previousOptions = this.getOptions();
        return this.unmount.bind(this);
    };
    QueryData.prototype.cleanup = function () {
        this.removeQuerySubscription();
        delete this.currentObservable.query;
        delete this.previousData.result;
    };
    QueryData.prototype.getOptions = function () {
        var options = _super.prototype.getOptions.call(this);
        if (this.lazyOptions) {
            options.variables = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, options.variables), this.lazyOptions.variables);
            options.context = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, options.context), this.lazyOptions.context);
        }
        if (this.runLazy) {
            delete options.skip;
        }
        return options;
    };
    QueryData.prototype.ssrInitiated = function () {
        return this.context && this.context.renderPromises;
    };
    QueryData.prototype.getExecuteSsrResult = function () {
        var ssrDisabled = this.getOptions().ssr === false;
        var fetchDisabled = this.refreshClient().client.disableNetworkFetches;
        var ssrLoading = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({ loading: true, networkStatus: apollo_client__WEBPACK_IMPORTED_MODULE_3__["NetworkStatus"].loading, called: true, data: undefined, stale: false, client: this.client }, this.observableQueryFields());
        if (ssrDisabled && (this.ssrInitiated() || fetchDisabled)) {
            this.previousData.result = ssrLoading;
            return ssrLoading;
        }
        var result;
        if (this.ssrInitiated()) {
            result =
                this.context.renderPromises.addQueryPromise(this, this.getExecuteResult) || ssrLoading;
        }
        return result;
    };
    QueryData.prototype.prepareObservableQueryOptions = function () {
        var options = this.getOptions();
        this.verifyDocumentType(options.query, _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["DocumentType"].Query);
        var displayName = options.displayName || 'Query';
        if (this.ssrInitiated() &&
            (options.fetchPolicy === 'network-only' ||
                options.fetchPolicy === 'cache-and-network')) {
            options.fetchPolicy = 'cache-first';
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, options), { displayName: displayName, context: options.context, metadata: { reactComponent: { displayName: displayName } } });
    };
    QueryData.prototype.initializeObservableQuery = function () {
        var _a, _b;
        if (this.ssrInitiated()) {
            this.currentObservable.query = this.context.renderPromises.getSSRObservable(this.getOptions());
        }
        if (!this.currentObservable.query) {
            var observableQueryOptions = this.prepareObservableQueryOptions();
            this.previousData.observableQueryOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, observableQueryOptions), { children: null });
            this.currentObservable.query = this.refreshClient().client.watchQuery(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, observableQueryOptions));
            if (this.ssrInitiated()) {
                (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.renderPromises) === null || _b === void 0 ? void 0 : _b.registerSSRObservable(this.currentObservable.query, observableQueryOptions);
            }
        }
    };
    QueryData.prototype.updateObservableQuery = function () {
        if (!this.currentObservable.query) {
            this.initializeObservableQuery();
            return;
        }
        var newObservableQueryOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, this.prepareObservableQueryOptions()), { children: null });
        if (!Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(newObservableQueryOptions, this.previousData.observableQueryOptions)) {
            this.previousData.observableQueryOptions = newObservableQueryOptions;
            this.currentObservable
                .query.setOptions(newObservableQueryOptions)
                .catch(function () { });
        }
    };
    QueryData.prototype.startQuerySubscription = function () {
        var _this = this;
        if (this.currentObservable.subscription || this.getOptions().skip)
            return;
        var obsQuery = this.currentObservable.query;
        this.currentObservable.subscription = obsQuery.subscribe({
            next: function (_a) {
                var loading = _a.loading, networkStatus = _a.networkStatus, data = _a.data;
                var previousResult = _this.previousData.result;
                if (previousResult &&
                    previousResult.loading === loading &&
                    previousResult.networkStatus === networkStatus &&
                    Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(previousResult.data, data)) {
                    return;
                }
                _this.onNewData();
            },
            error: function (error) {
                _this.resubscribeToQuery();
                if (!error.hasOwnProperty('graphQLErrors'))
                    throw error;
                var previousResult = _this.previousData.result;
                if ((previousResult && previousResult.loading) ||
                    !Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(error, _this.previousData.error)) {
                    _this.previousData.error = error;
                    _this.onNewData();
                }
            },
        });
    };
    QueryData.prototype.resubscribeToQuery = function () {
        this.removeQuerySubscription();
        var lastError = this.currentObservable.query.getLastError();
        var lastResult = this.currentObservable.query.getLastResult();
        this.currentObservable.query.resetLastResults();
        this.startQuerySubscription();
        Object.assign(this.currentObservable.query, {
            lastError: lastError,
            lastResult: lastResult,
        });
    };
    QueryData.prototype.getQueryResult = function () {
        var result = this.observableQueryFields();
        var options = this.getOptions();
        if (options.skip) {
            result = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, result), { data: undefined, error: undefined, loading: false, called: true });
        }
        else {
            var currentResult = this.currentObservable.query.getCurrentResult();
            var loading = currentResult.loading, partial = currentResult.partial, networkStatus = currentResult.networkStatus, errors = currentResult.errors;
            var error = currentResult.error, data = currentResult.data;
            if (errors && errors.length > 0) {
                error = new apollo_client__WEBPACK_IMPORTED_MODULE_3__["ApolloError"]({ graphQLErrors: errors });
            }
            result = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, result), { loading: loading,
                networkStatus: networkStatus,
                error: error, called: true });
            if (loading) {
                var previousData = this.previousData.result && this.previousData.result.data;
                result.data =
                    previousData && data
                        ? Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, previousData), data) : previousData || data;
            }
            else if (error) {
                Object.assign(result, {
                    data: (this.currentObservable.query.getLastResult() || {})
                        .data,
                });
            }
            else {
                var fetchPolicy = this.currentObservable.query.options.fetchPolicy;
                var partialRefetch = options.partialRefetch;
                if (partialRefetch &&
                    !data &&
                    partial &&
                    fetchPolicy !== 'cache-only') {
                    Object.assign(result, {
                        loading: true,
                        networkStatus: apollo_client__WEBPACK_IMPORTED_MODULE_3__["NetworkStatus"].loading,
                    });
                    result.refetch();
                    return result;
                }
                result.data = data;
            }
        }
        result.client = this.client;
        this.previousData.loading =
            (this.previousData.result && this.previousData.result.loading) || false;
        this.previousData.result = result;
        this.currentObservable.query &&
            this.currentObservable.query.resetQueryStoreErrors();
        return result;
    };
    QueryData.prototype.handleErrorOrCompleted = function () {
        var obsQuery = this.currentObservable.query;
        if (!obsQuery || !this.previousData.result)
            return;
        var _a = this.previousData.result, data = _a.data, loading = _a.loading, error = _a.error;
        if (!loading) {
            var _b = this.getOptions(), query = _b.query, variables = _b.variables, onCompleted = _b.onCompleted, onError = _b.onError;
            if (this.previousOptions &&
                !this.previousData.loading &&
                Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(this.previousOptions.query, query) &&
                Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(this.previousOptions.variables, variables)) {
                return;
            }
            if (onCompleted && !error) {
                onCompleted(data);
            }
            else if (onError && error) {
                onError(error);
            }
        }
    };
    QueryData.prototype.removeQuerySubscription = function () {
        if (this.currentObservable.subscription) {
            this.currentObservable.subscription.unsubscribe();
            delete this.currentObservable.subscription;
        }
    };
    QueryData.prototype.observableQueryFields = function () {
        var observable = this.currentObservable.query;
        return {
            variables: observable.variables,
            refetch: this.obsRefetch,
            fetchMore: this.obsFetchMore,
            updateQuery: this.obsUpdateQuery,
            startPolling: this.obsStartPolling,
            stopPolling: this.obsStopPolling,
            subscribeToMore: this.obsSubscribeToMore,
        };
    };
    return QueryData;
}(OperationData));

function useDeepMemo(memoFn, key) {
    var ref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
    if (!ref.current || !Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(key, ref.current.key)) {
        ref.current = { key: key, value: memoFn() };
    }
    return ref.current.value;
}

function useBaseQuery(query, options, lazy) {
    if (lazy === void 0) { lazy = false; }
    var context = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(Object(_apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["getApolloContext"])());
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_2__["useReducer"])(function (x) { return x + 1; }, 0), tick = _a[0], forceUpdate = _a[1];
    var updatedOptions = options ? Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, options), { query: query }) : { query: query };
    var queryDataRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
    var queryData = queryDataRef.current ||
        new QueryData({
            options: updatedOptions,
            context: context,
            onNewData: function () {
                if (!queryData.ssrInitiated()) {
                    Promise.resolve().then(forceUpdate);
                }
                else {
                    forceUpdate();
                }
            },
        });
    queryData.setOptions(updatedOptions);
    queryData.context = context;
    if (queryData.ssrInitiated() && !queryDataRef.current) {
        queryDataRef.current = queryData;
    }
    var memo = {
        options: Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, updatedOptions), { onError: undefined, onCompleted: undefined }),
        context: context,
        tick: tick,
    };
    var result = useDeepMemo(function () { return (lazy ? queryData.executeLazy() : queryData.execute()); }, memo);
    var queryResult = lazy
        ? result[1]
        : result;
    Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
        if (!queryDataRef.current) {
            queryDataRef.current = queryData;
        }
        return function () { return queryData.cleanup(); };
    }, []);
    Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () { return queryData.afterExecute({ lazy: lazy }); }, [
        queryResult.loading,
        queryResult.networkStatus,
        queryResult.error,
        queryResult.data,
    ]);
    return result;
}

function useQuery(query, options) {
    return useBaseQuery(query, options, false);
}

function useLazyQuery(query, options) {
    return useBaseQuery(query, options, true);
}

var MutationData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(MutationData, _super);
    function MutationData(_a) {
        var options = _a.options, context = _a.context, result = _a.result, setResult = _a.setResult;
        var _this = _super.call(this, options, context) || this;
        _this.runMutation = function (mutationFunctionOptions) {
            if (mutationFunctionOptions === void 0) { mutationFunctionOptions = {}; }
            _this.onMutationStart();
            var mutationId = _this.generateNewMutationId();
            return _this.mutate(mutationFunctionOptions)
                .then(function (response) {
                _this.onMutationCompleted(response, mutationId);
                return response;
            })
                .catch(function (error) {
                _this.onMutationError(error, mutationId);
                if (!_this.getOptions().onError)
                    throw error;
            });
        };
        _this.verifyDocumentType(options.mutation, _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["DocumentType"].Mutation);
        _this.result = result;
        _this.setResult = setResult;
        _this.mostRecentMutationId = 0;
        return _this;
    }
    MutationData.prototype.execute = function (result) {
        this.isMounted = true;
        this.verifyDocumentType(this.getOptions().mutation, _apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["DocumentType"].Mutation);
        result.client = this.refreshClient().client;
        return [this.runMutation, result];
    };
    MutationData.prototype.afterExecute = function () {
        this.isMounted = true;
        return this.unmount.bind(this);
    };
    MutationData.prototype.cleanup = function () {
    };
    MutationData.prototype.mutate = function (mutationFunctionOptions) {
        var _a = this.getOptions(), mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, update = _a.update, _b = _a.context, mutationContext = _b === void 0 ? {} : _b, _c = _a.awaitRefetchQueries, awaitRefetchQueries = _c === void 0 ? false : _c, fetchPolicy = _a.fetchPolicy;
        var mutateOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, mutationFunctionOptions);
        var mutateVariables = Object.assign({}, variables, mutateOptions.variables);
        delete mutateOptions.variables;
        return this.refreshClient().client.mutate(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({ mutation: mutation,
            optimisticResponse: optimisticResponse, refetchQueries: mutateOptions.refetchQueries || this.getOptions().refetchQueries, awaitRefetchQueries: awaitRefetchQueries,
            update: update, context: mutationContext, fetchPolicy: fetchPolicy, variables: mutateVariables }, mutateOptions));
    };
    MutationData.prototype.onMutationStart = function () {
        if (!this.result.loading && !this.getOptions().ignoreResults) {
            this.updateResult({
                loading: true,
                error: undefined,
                data: undefined,
                called: true
            });
        }
    };
    MutationData.prototype.onMutationCompleted = function (response, mutationId) {
        var _a = this.getOptions(), onCompleted = _a.onCompleted, ignoreResults = _a.ignoreResults;
        var data = response.data, errors = response.errors;
        var error = errors && errors.length > 0
            ? new apollo_client__WEBPACK_IMPORTED_MODULE_3__["ApolloError"]({ graphQLErrors: errors })
            : undefined;
        var callOncomplete = function () {
            return onCompleted ? onCompleted(data) : null;
        };
        if (this.isMostRecentMutation(mutationId) && !ignoreResults) {
            this.updateResult({
                called: true,
                loading: false,
                data: data,
                error: error
            });
        }
        callOncomplete();
    };
    MutationData.prototype.onMutationError = function (error, mutationId) {
        var onError = this.getOptions().onError;
        if (this.isMostRecentMutation(mutationId)) {
            this.updateResult({
                loading: false,
                error: error,
                data: undefined,
                called: true
            });
        }
        if (onError) {
            onError(error);
        }
    };
    MutationData.prototype.generateNewMutationId = function () {
        return ++this.mostRecentMutationId;
    };
    MutationData.prototype.isMostRecentMutation = function (mutationId) {
        return this.mostRecentMutationId === mutationId;
    };
    MutationData.prototype.updateResult = function (result) {
        if (this.isMounted &&
            (!this.previousResult || !Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(this.previousResult, result))) {
            this.setResult(result);
            this.previousResult = result;
        }
    };
    return MutationData;
}(OperationData));

function useMutation(mutation, options) {
    var context = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(Object(_apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["getApolloContext"])());
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({ called: false, loading: false }), result = _a[0], setResult = _a[1];
    var updatedOptions = options ? Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, options), { mutation: mutation }) : { mutation: mutation };
    var mutationDataRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
    function getMutationDataRef() {
        if (!mutationDataRef.current) {
            mutationDataRef.current = new MutationData({
                options: updatedOptions,
                context: context,
                result: result,
                setResult: setResult
            });
        }
        return mutationDataRef.current;
    }
    var mutationData = getMutationDataRef();
    mutationData.setOptions(updatedOptions);
    mutationData.context = context;
    Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () { return mutationData.afterExecute(); });
    return mutationData.execute(result);
}

var SubscriptionData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(SubscriptionData, _super);
    function SubscriptionData(_a) {
        var options = _a.options, context = _a.context, setResult = _a.setResult;
        var _this = _super.call(this, options, context) || this;
        _this.currentObservable = {};
        _this.setResult = setResult;
        _this.initialize(options);
        return _this;
    }
    SubscriptionData.prototype.execute = function (result) {
        if (this.getOptions().skip === true) {
            this.cleanup();
            return {
                loading: false,
                error: undefined,
                data: undefined,
                variables: this.getOptions().variables
            };
        }
        var currentResult = result;
        if (this.refreshClient().isNew) {
            currentResult = this.getLoadingResult();
        }
        var shouldResubscribe = this.getOptions().shouldResubscribe;
        if (typeof shouldResubscribe === 'function') {
            shouldResubscribe = !!shouldResubscribe(this.getOptions());
        }
        if (shouldResubscribe !== false &&
            this.previousOptions &&
            Object.keys(this.previousOptions).length > 0 &&
            (this.previousOptions.subscription !== this.getOptions().subscription ||
                !Object(_wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"])(this.previousOptions.variables, this.getOptions().variables) ||
                this.previousOptions.skip !== this.getOptions().skip)) {
            this.cleanup();
            currentResult = this.getLoadingResult();
        }
        this.initialize(this.getOptions());
        this.startSubscription();
        this.previousOptions = this.getOptions();
        return Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, currentResult), { variables: this.getOptions().variables });
    };
    SubscriptionData.prototype.afterExecute = function () {
        this.isMounted = true;
    };
    SubscriptionData.prototype.cleanup = function () {
        this.endSubscription();
        delete this.currentObservable.query;
    };
    SubscriptionData.prototype.initialize = function (options) {
        if (this.currentObservable.query || this.getOptions().skip === true)
            return;
        this.currentObservable.query = this.refreshClient().client.subscribe({
            query: options.subscription,
            variables: options.variables,
            fetchPolicy: options.fetchPolicy
        });
    };
    SubscriptionData.prototype.startSubscription = function () {
        if (this.currentObservable.subscription)
            return;
        this.currentObservable.subscription = this.currentObservable.query.subscribe({
            next: this.updateCurrentData.bind(this),
            error: this.updateError.bind(this),
            complete: this.completeSubscription.bind(this)
        });
    };
    SubscriptionData.prototype.getLoadingResult = function () {
        return {
            loading: true,
            error: undefined,
            data: undefined
        };
    };
    SubscriptionData.prototype.updateResult = function (result) {
        if (this.isMounted) {
            this.setResult(result);
        }
    };
    SubscriptionData.prototype.updateCurrentData = function (result) {
        var onSubscriptionData = this.getOptions().onSubscriptionData;
        this.updateResult({
            data: result.data,
            loading: false,
            error: undefined
        });
        if (onSubscriptionData) {
            onSubscriptionData({
                client: this.refreshClient().client,
                subscriptionData: result
            });
        }
    };
    SubscriptionData.prototype.updateError = function (error) {
        this.updateResult({
            error: error,
            loading: false
        });
    };
    SubscriptionData.prototype.completeSubscription = function () {
        var onSubscriptionComplete = this.getOptions().onSubscriptionComplete;
        if (onSubscriptionComplete)
            onSubscriptionComplete();
        this.endSubscription();
    };
    SubscriptionData.prototype.endSubscription = function () {
        if (this.currentObservable.subscription) {
            this.currentObservable.subscription.unsubscribe();
            delete this.currentObservable.subscription;
        }
    };
    return SubscriptionData;
}(OperationData));

function useSubscription(subscription, options) {
    var context = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(Object(_apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["getApolloContext"])());
    var updatedOptions = options
        ? Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, options), { subscription: subscription }) : { subscription: subscription };
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
        loading: !updatedOptions.skip,
        error: undefined,
        data: undefined
    }), result = _a[0], setResult = _a[1];
    var subscriptionDataRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
    function getSubscriptionDataRef() {
        if (!subscriptionDataRef.current) {
            subscriptionDataRef.current = new SubscriptionData({
                options: updatedOptions,
                context: context,
                setResult: setResult
            });
        }
        return subscriptionDataRef.current;
    }
    var subscriptionData = getSubscriptionDataRef();
    subscriptionData.setOptions(updatedOptions, true);
    subscriptionData.context = context;
    Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () { return subscriptionData.afterExecute(); });
    Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () { return subscriptionData.cleanup.bind(subscriptionData); }, []);
    return subscriptionData.execute(result);
}

function useApolloClient() {
    var client = react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(Object(_apollo_react_common__WEBPACK_IMPORTED_MODULE_0__["getApolloContext"])()).client;
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_5__["invariant"])(client, 'No Apollo Client instance can be found. Please ensure that you ' +
        'have called `ApolloProvider` higher up in your tree.');
    return client;
}

function makeDefaultQueryInfo() {
    return {
        seen: false,
        observable: null
    };
}
var RenderPromises = (function () {
    function RenderPromises() {
        this.queryPromises = new Map();
        this.queryInfoTrie = new Map();
    }
    RenderPromises.prototype.registerSSRObservable = function (observable, props) {
        this.lookupQueryInfo(props).observable = observable;
    };
    RenderPromises.prototype.getSSRObservable = function (props) {
        return this.lookupQueryInfo(props).observable;
    };
    RenderPromises.prototype.addQueryPromise = function (queryInstance, finish) {
        var info = this.lookupQueryInfo(queryInstance.getOptions());
        if (!info.seen) {
            this.queryPromises.set(queryInstance.getOptions(), new Promise(function (resolve) {
                resolve(queryInstance.fetchData());
            }));
            return null;
        }
        return finish();
    };
    RenderPromises.prototype.hasPromises = function () {
        return this.queryPromises.size > 0;
    };
    RenderPromises.prototype.consumeAndAwaitPromises = function () {
        var _this = this;
        var promises = [];
        this.queryPromises.forEach(function (promise, queryInstance) {
            _this.lookupQueryInfo(queryInstance).seen = true;
            promises.push(promise);
        });
        this.queryPromises.clear();
        return Promise.all(promises);
    };
    RenderPromises.prototype.lookupQueryInfo = function (props) {
        var queryInfoTrie = this.queryInfoTrie;
        var query = props.query, variables = props.variables;
        var varMap = queryInfoTrie.get(query) || new Map();
        if (!queryInfoTrie.has(query))
            queryInfoTrie.set(query, varMap);
        var variablesString = JSON.stringify(variables);
        var info = varMap.get(variablesString) || makeDefaultQueryInfo();
        if (!varMap.has(variablesString))
            varMap.set(variablesString, info);
        return info;
    };
    return RenderPromises;
}());


//# sourceMappingURL=react-hooks.esm.js.map


/***/ }),

/***/ "./node_modules/@wry/context/lib/context.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/@wry/context/lib/context.esm.js ***!
  \******************************************************/
/*! exports provided: Slot, asyncFromGen, bind, noContext, setTimeout, wrapYieldingFiberMethods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slot", function() { return Slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncFromGen", function() { return asyncFromGen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noContext", function() { return noContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return setTimeoutWithContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapYieldingFiberMethods", function() { return wrapYieldingFiberMethods; });
// This currentContext variable will only be used if the makeSlotClass
// function is called, which happens only if this is the first copy of the
// @wry/context package to be imported.
var currentContext = null;
// This unique internal object is used to denote the absence of a value
// for a given Slot, and is never exposed to outside code.
var MISSING_VALUE = {};
var idCounter = 1;
// Although we can't do anything about the cost of duplicated code from
// accidentally bundling multiple copies of the @wry/context package, we can
// avoid creating the Slot class more than once using makeSlotClass.
var makeSlotClass = function () { return /** @class */ (function () {
    function Slot() {
        // If you have a Slot object, you can find out its slot.id, but you cannot
        // guess the slot.id of a Slot you don't have access to, thanks to the
        // randomized suffix.
        this.id = [
            "slot",
            idCounter++,
            Date.now(),
            Math.random().toString(36).slice(2),
        ].join(":");
    }
    Slot.prototype.hasValue = function () {
        for (var context_1 = currentContext; context_1; context_1 = context_1.parent) {
            // We use the Slot object iself as a key to its value, which means the
            // value cannot be obtained without a reference to the Slot object.
            if (this.id in context_1.slots) {
                var value = context_1.slots[this.id];
                if (value === MISSING_VALUE)
                    break;
                if (context_1 !== currentContext) {
                    // Cache the value in currentContext.slots so the next lookup will
                    // be faster. This caching is safe because the tree of contexts and
                    // the values of the slots are logically immutable.
                    currentContext.slots[this.id] = value;
                }
                return true;
            }
        }
        if (currentContext) {
            // If a value was not found for this Slot, it's never going to be found
            // no matter how many times we look it up, so we might as well cache
            // the absence of the value, too.
            currentContext.slots[this.id] = MISSING_VALUE;
        }
        return false;
    };
    Slot.prototype.getValue = function () {
        if (this.hasValue()) {
            return currentContext.slots[this.id];
        }
    };
    Slot.prototype.withValue = function (value, callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        var _a;
        var slots = (_a = {
                __proto__: null
            },
            _a[this.id] = value,
            _a);
        var parent = currentContext;
        currentContext = { parent: parent, slots: slots };
        try {
            // Function.prototype.apply allows the arguments array argument to be
            // omitted or undefined, so args! is fine here.
            return callback.apply(thisArg, args);
        }
        finally {
            currentContext = parent;
        }
    };
    // Capture the current context and wrap a callback function so that it
    // reestablishes the captured context when called.
    Slot.bind = function (callback) {
        var context = currentContext;
        return function () {
            var saved = currentContext;
            try {
                currentContext = context;
                return callback.apply(this, arguments);
            }
            finally {
                currentContext = saved;
            }
        };
    };
    // Immediately run a callback function without any captured context.
    Slot.noContext = function (callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        if (currentContext) {
            var saved = currentContext;
            try {
                currentContext = null;
                // Function.prototype.apply allows the arguments array argument to be
                // omitted or undefined, so args! is fine here.
                return callback.apply(thisArg, args);
            }
            finally {
                currentContext = saved;
            }
        }
        else {
            return callback.apply(thisArg, args);
        }
    };
    return Slot;
}()); };
// We store a single global implementation of the Slot class as a permanent
// non-enumerable symbol property of the Array constructor. This obfuscation
// does nothing to prevent access to the Slot class, but at least it ensures
// the implementation (i.e. currentContext) cannot be tampered with, and all
// copies of the @wry/context package (hopefully just one) will share the
// same Slot implementation. Since the first copy of the @wry/context package
// to be imported wins, this technique imposes a very high cost for any
// future breaking changes to the Slot class.
var globalKey = "@wry/context:Slot";
var host = Array;
var Slot = host[globalKey] || function () {
    var Slot = makeSlotClass();
    try {
        Object.defineProperty(host, globalKey, {
            value: host[globalKey] = Slot,
            enumerable: false,
            writable: false,
            configurable: false,
        });
    }
    finally {
        return Slot;
    }
}();

var bind = Slot.bind, noContext = Slot.noContext;
function setTimeoutWithContext(callback, delay) {
    return setTimeout(bind(callback), delay);
}
// Turn any generator function into an async function (using yield instead
// of await), with context automatically preserved across yields.
function asyncFromGen(genFn) {
    return function () {
        var gen = genFn.apply(this, arguments);
        var boundNext = bind(gen.next);
        var boundThrow = bind(gen.throw);
        return new Promise(function (resolve, reject) {
            function invoke(method, argument) {
                try {
                    var result = method.call(gen, argument);
                }
                catch (error) {
                    return reject(error);
                }
                var next = result.done ? resolve : invokeNext;
                if (isPromiseLike(result.value)) {
                    result.value.then(next, result.done ? reject : invokeThrow);
                }
                else {
                    next(result.value);
                }
            }
            var invokeNext = function (value) { return invoke(boundNext, value); };
            var invokeThrow = function (error) { return invoke(boundThrow, error); };
            invokeNext();
        });
    };
}
function isPromiseLike(value) {
    return value && typeof value.then === "function";
}
// If you use the fibers npm package to implement coroutines in Node.js,
// you should call this function at least once to ensure context management
// remains coherent across any yields.
var wrappedFibers = [];
function wrapYieldingFiberMethods(Fiber) {
    // There can be only one implementation of Fiber per process, so this array
    // should never grow longer than one element.
    if (wrappedFibers.indexOf(Fiber) < 0) {
        var wrap = function (obj, method) {
            var fn = obj[method];
            obj[method] = function () {
                return noContext(fn, arguments, this);
            };
        };
        // These methods can yield, according to
        // https://github.com/laverdet/node-fibers/blob/ddebed9b8ae3883e57f822e2108e6943e5c8d2a8/fibers.js#L97-L100
        wrap(Fiber, "yield");
        wrap(Fiber.prototype, "run");
        wrap(Fiber.prototype, "throwInto");
        wrappedFibers.push(Fiber);
    }
    return Fiber;
}


//# sourceMappingURL=context.esm.js.map


/***/ }),

/***/ "./node_modules/@wry/equality/lib/equality.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/@wry/equality/lib/equality.esm.js ***!
  \********************************************************/
/*! exports provided: default, equal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equal", function() { return equal; });
var _a = Object.prototype, toString = _a.toString, hasOwnProperty = _a.hasOwnProperty;
var previousComparisons = new Map();
/**
 * Performs a deep equality check on two JavaScript values, tolerating cycles.
 */
function equal(a, b) {
    try {
        return check(a, b);
    }
    finally {
        previousComparisons.clear();
    }
}
function check(a, b) {
    // If the two values are strictly equal, our job is easy.
    if (a === b) {
        return true;
    }
    // Object.prototype.toString returns a representation of the runtime type of
    // the given value that is considerably more precise than typeof.
    var aTag = toString.call(a);
    var bTag = toString.call(b);
    // If the runtime types of a and b are different, they could maybe be equal
    // under some interpretation of equality, but for simplicity and performance
    // we just return false instead.
    if (aTag !== bTag) {
        return false;
    }
    switch (aTag) {
        case '[object Array]':
            // Arrays are a lot like other objects, but we can cheaply compare their
            // lengths as a short-cut before comparing their elements.
            if (a.length !== b.length)
                return false;
        // Fall through to object case...
        case '[object Object]': {
            if (previouslyCompared(a, b))
                return true;
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            // If `a` and `b` have a different number of enumerable keys, they
            // must be different.
            var keyCount = aKeys.length;
            if (keyCount !== bKeys.length)
                return false;
            // Now make sure they have the same keys.
            for (var k = 0; k < keyCount; ++k) {
                if (!hasOwnProperty.call(b, aKeys[k])) {
                    return false;
                }
            }
            // Finally, check deep equality of all child properties.
            for (var k = 0; k < keyCount; ++k) {
                var key = aKeys[k];
                if (!check(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        case '[object Error]':
            return a.name === b.name && a.message === b.message;
        case '[object Number]':
            // Handle NaN, which is !== itself.
            if (a !== a)
                return b !== b;
        // Fall through to shared +a === +b case...
        case '[object Boolean]':
        case '[object Date]':
            return +a === +b;
        case '[object RegExp]':
        case '[object String]':
            return a == "" + b;
        case '[object Map]':
        case '[object Set]': {
            if (a.size !== b.size)
                return false;
            if (previouslyCompared(a, b))
                return true;
            var aIterator = a.entries();
            var isMap = aTag === '[object Map]';
            while (true) {
                var info = aIterator.next();
                if (info.done)
                    break;
                // If a instanceof Set, aValue === aKey.
                var _a = info.value, aKey = _a[0], aValue = _a[1];
                // So this works the same way for both Set and Map.
                if (!b.has(aKey)) {
                    return false;
                }
                // However, we care about deep equality of values only when dealing
                // with Map structures.
                if (isMap && !check(aValue, b.get(aKey))) {
                    return false;
                }
            }
            return true;
        }
    }
    // Otherwise the values are not equal.
    return false;
}
function previouslyCompared(a, b) {
    // Though cyclic references can make an object graph appear infinite from the
    // perspective of a depth-first traversal, the graph still contains a finite
    // number of distinct object references. We use the previousComparisons cache
    // to avoid comparing the same pair of object references more than once, which
    // guarantees termination (even if we end up comparing every object in one
    // graph to every object in the other graph, which is extremely unlikely),
    // while still allowing weird isomorphic structures (like rings with different
    // lengths) a chance to pass the equality test.
    var bSet = previousComparisons.get(a);
    if (bSet) {
        // Return true here because we can be sure false will be returned somewhere
        // else if the objects are not equivalent.
        if (bSet.has(b))
            return true;
    }
    else {
        previousComparisons.set(a, bSet = new Set);
    }
    bSet.add(b);
    return false;
}

/* harmony default export */ __webpack_exports__["default"] = (equal);

//# sourceMappingURL=equality.esm.js.map


/***/ }),

/***/ "./node_modules/apollo-cache-inmemory/lib/bundle.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/apollo-cache-inmemory/lib/bundle.esm.js ***!
  \**************************************************************/
/*! exports provided: HeuristicFragmentMatcher, InMemoryCache, IntrospectionFragmentMatcher, ObjectCache, StoreReader, StoreWriter, WriteError, assertIdValue, defaultDataIdFromObject, defaultNormalizedCacheFactory, enhanceErrorWithDocument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeuristicFragmentMatcher", function() { return HeuristicFragmentMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InMemoryCache", function() { return InMemoryCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntrospectionFragmentMatcher", function() { return IntrospectionFragmentMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectCache", function() { return ObjectCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreReader", function() { return StoreReader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreWriter", function() { return StoreWriter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WriteError", function() { return WriteError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertIdValue", function() { return assertIdValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultDataIdFromObject", function() { return defaultDataIdFromObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultNormalizedCacheFactory", function() { return defaultNormalizedCacheFactory$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enhanceErrorWithDocument", function() { return enhanceErrorWithDocument; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var apollo_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-cache */ "./node_modules/apollo-cache/lib/bundle.esm.js");
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-utilities */ "./node_modules/apollo-utilities/lib/bundle.esm.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! optimism */ "./node_modules/optimism/lib/bundle.esm.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.esm.js");






var haveWarned = false;
function shouldWarn() {
    var answer = !haveWarned;
    if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isTest"])()) {
        haveWarned = true;
    }
    return answer;
}
var HeuristicFragmentMatcher = (function () {
    function HeuristicFragmentMatcher() {
    }
    HeuristicFragmentMatcher.prototype.ensureReady = function () {
        return Promise.resolve();
    };
    HeuristicFragmentMatcher.prototype.canBypassInit = function () {
        return true;
    };
    HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        var obj = context.store.get(idValue.id);
        var isRootQuery = idValue.id === 'ROOT_QUERY';
        if (!obj) {
            return isRootQuery;
        }
        var _a = obj.__typename, __typename = _a === void 0 ? isRootQuery && 'Query' : _a;
        if (!__typename) {
            if (shouldWarn()) {
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments.");
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn('Could not find __typename on Fragment ', typeCondition, obj);
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior " +
                    "and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now.");
            }
            return 'heuristic';
        }
        if (__typename === typeCondition) {
            return true;
        }
        if (shouldWarn()) {
             false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error('You are using the simple (heuristic) fragment matcher, but your ' +
                'queries contain union or interface types. Apollo Client will not be ' +
                'able to accurately map fragments. To make this error go away, use ' +
                'the `IntrospectionFragmentMatcher` as described in the docs: ' +
                'https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher');
        }
        return 'heuristic';
    };
    return HeuristicFragmentMatcher;
}());
var IntrospectionFragmentMatcher = (function () {
    function IntrospectionFragmentMatcher(options) {
        if (options && options.introspectionQueryResultData) {
            this.possibleTypesMap = this.parseIntrospectionResult(options.introspectionQueryResultData);
            this.isReady = true;
        }
        else {
            this.isReady = false;
        }
        this.match = this.match.bind(this);
    }
    IntrospectionFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(this.isReady, 'FragmentMatcher.match() was called before FragmentMatcher.init()');
        var obj = context.store.get(idValue.id);
        var isRootQuery = idValue.id === 'ROOT_QUERY';
        if (!obj) {
            return isRootQuery;
        }
        var _a = obj.__typename, __typename = _a === void 0 ? isRootQuery && 'Query' : _a;
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(__typename, "Cannot match fragment because __typename property is missing: " + JSON.stringify(obj));
        if (__typename === typeCondition) {
            return true;
        }
        var implementingTypes = this.possibleTypesMap[typeCondition];
        if (__typename &&
            implementingTypes &&
            implementingTypes.indexOf(__typename) > -1) {
            return true;
        }
        return false;
    };
    IntrospectionFragmentMatcher.prototype.parseIntrospectionResult = function (introspectionResultData) {
        var typeMap = {};
        introspectionResultData.__schema.types.forEach(function (type) {
            if (type.kind === 'UNION' || type.kind === 'INTERFACE') {
                typeMap[type.name] = type.possibleTypes.map(function (implementingType) { return implementingType.name; });
            }
        });
        return typeMap;
    };
    return IntrospectionFragmentMatcher;
}());

var hasOwn = Object.prototype.hasOwnProperty;
var DepTrackingCache = (function () {
    function DepTrackingCache(data) {
        var _this = this;
        if (data === void 0) { data = Object.create(null); }
        this.data = data;
        this.depend = Object(optimism__WEBPACK_IMPORTED_MODULE_3__["wrap"])(function (dataId) { return _this.data[dataId]; }, {
            disposable: true,
            makeCacheKey: function (dataId) {
                return dataId;
            },
        });
    }
    DepTrackingCache.prototype.toObject = function () {
        return this.data;
    };
    DepTrackingCache.prototype.get = function (dataId) {
        this.depend(dataId);
        return this.data[dataId];
    };
    DepTrackingCache.prototype.set = function (dataId, value) {
        var oldValue = this.data[dataId];
        if (value !== oldValue) {
            this.data[dataId] = value;
            this.depend.dirty(dataId);
        }
    };
    DepTrackingCache.prototype.delete = function (dataId) {
        if (hasOwn.call(this.data, dataId)) {
            delete this.data[dataId];
            this.depend.dirty(dataId);
        }
    };
    DepTrackingCache.prototype.clear = function () {
        this.replace(null);
    };
    DepTrackingCache.prototype.replace = function (newData) {
        var _this = this;
        if (newData) {
            Object.keys(newData).forEach(function (dataId) {
                _this.set(dataId, newData[dataId]);
            });
            Object.keys(this.data).forEach(function (dataId) {
                if (!hasOwn.call(newData, dataId)) {
                    _this.delete(dataId);
                }
            });
        }
        else {
            Object.keys(this.data).forEach(function (dataId) {
                _this.delete(dataId);
            });
        }
    };
    return DepTrackingCache;
}());
function defaultNormalizedCacheFactory(seed) {
    return new DepTrackingCache(seed);
}

var StoreReader = (function () {
    function StoreReader(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.cacheKeyRoot, cacheKeyRoot = _c === void 0 ? new optimism__WEBPACK_IMPORTED_MODULE_3__["KeyTrie"](apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["canUseWeakMap"]) : _c, _d = _b.freezeResults, freezeResults = _d === void 0 ? false : _d;
        var _e = this, executeStoreQuery = _e.executeStoreQuery, executeSelectionSet = _e.executeSelectionSet, executeSubSelectedArray = _e.executeSubSelectedArray;
        this.freezeResults = freezeResults;
        this.executeStoreQuery = Object(optimism__WEBPACK_IMPORTED_MODULE_3__["wrap"])(function (options) {
            return executeStoreQuery.call(_this, options);
        }, {
            makeCacheKey: function (_a) {
                var query = _a.query, rootValue = _a.rootValue, contextValue = _a.contextValue, variableValues = _a.variableValues, fragmentMatcher = _a.fragmentMatcher;
                if (contextValue.store instanceof DepTrackingCache) {
                    return cacheKeyRoot.lookup(contextValue.store, query, fragmentMatcher, JSON.stringify(variableValues), rootValue.id);
                }
            }
        });
        this.executeSelectionSet = Object(optimism__WEBPACK_IMPORTED_MODULE_3__["wrap"])(function (options) {
            return executeSelectionSet.call(_this, options);
        }, {
            makeCacheKey: function (_a) {
                var selectionSet = _a.selectionSet, rootValue = _a.rootValue, execContext = _a.execContext;
                if (execContext.contextValue.store instanceof DepTrackingCache) {
                    return cacheKeyRoot.lookup(execContext.contextValue.store, selectionSet, execContext.fragmentMatcher, JSON.stringify(execContext.variableValues), rootValue.id);
                }
            }
        });
        this.executeSubSelectedArray = Object(optimism__WEBPACK_IMPORTED_MODULE_3__["wrap"])(function (options) {
            return executeSubSelectedArray.call(_this, options);
        }, {
            makeCacheKey: function (_a) {
                var field = _a.field, array = _a.array, execContext = _a.execContext;
                if (execContext.contextValue.store instanceof DepTrackingCache) {
                    return cacheKeyRoot.lookup(execContext.contextValue.store, field, array, JSON.stringify(execContext.variableValues));
                }
            }
        });
    }
    StoreReader.prototype.readQueryFromStore = function (options) {
        return this.diffQueryAgainstStore(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { returnPartialData: false })).result;
    };
    StoreReader.prototype.diffQueryAgainstStore = function (_a) {
        var store = _a.store, query = _a.query, variables = _a.variables, previousResult = _a.previousResult, _b = _a.returnPartialData, returnPartialData = _b === void 0 ? true : _b, _c = _a.rootId, rootId = _c === void 0 ? 'ROOT_QUERY' : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction, config = _a.config;
        var queryDefinition = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getQueryDefinition"])(query);
        variables = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["assign"])({}, Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getDefaultValues"])(queryDefinition), variables);
        var context = {
            store: store,
            dataIdFromObject: config && config.dataIdFromObject,
            cacheRedirects: (config && config.cacheRedirects) || {},
        };
        var execResult = this.executeStoreQuery({
            query: query,
            rootValue: {
                type: 'id',
                id: rootId,
                generated: true,
                typename: 'Query',
            },
            contextValue: context,
            variableValues: variables,
            fragmentMatcher: fragmentMatcherFunction,
        });
        var hasMissingFields = execResult.missing && execResult.missing.length > 0;
        if (hasMissingFields && !returnPartialData) {
            execResult.missing.forEach(function (info) {
                if (info.tolerable)
                    return;
                throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]("Can't find field " + info.fieldName + " on object " + JSON.stringify(info.object, null, 2) + ".");
            });
        }
        if (previousResult) {
            if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(previousResult, execResult.result)) {
                execResult.result = previousResult;
            }
        }
        return {
            result: execResult.result,
            complete: !hasMissingFields,
        };
    };
    StoreReader.prototype.executeStoreQuery = function (_a) {
        var query = _a.query, rootValue = _a.rootValue, contextValue = _a.contextValue, variableValues = _a.variableValues, _b = _a.fragmentMatcher, fragmentMatcher = _b === void 0 ? defaultFragmentMatcher : _b;
        var mainDefinition = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getMainDefinition"])(query);
        var fragments = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getFragmentDefinitions"])(query);
        var fragmentMap = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["createFragmentMap"])(fragments);
        var execContext = {
            query: query,
            fragmentMap: fragmentMap,
            contextValue: contextValue,
            variableValues: variableValues,
            fragmentMatcher: fragmentMatcher,
        };
        return this.executeSelectionSet({
            selectionSet: mainDefinition.selectionSet,
            rootValue: rootValue,
            execContext: execContext,
        });
    };
    StoreReader.prototype.executeSelectionSet = function (_a) {
        var _this = this;
        var selectionSet = _a.selectionSet, rootValue = _a.rootValue, execContext = _a.execContext;
        var fragmentMap = execContext.fragmentMap, contextValue = execContext.contextValue, variables = execContext.variableValues;
        var finalResult = { result: null };
        var objectsToMerge = [];
        var object = contextValue.store.get(rootValue.id);
        var typename = (object && object.__typename) ||
            (rootValue.id === 'ROOT_QUERY' && 'Query') ||
            void 0;
        function handleMissing(result) {
            var _a;
            if (result.missing) {
                finalResult.missing = finalResult.missing || [];
                (_a = finalResult.missing).push.apply(_a, result.missing);
            }
            return result.result;
        }
        selectionSet.selections.forEach(function (selection) {
            var _a;
            if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["shouldInclude"])(selection, variables)) {
                return;
            }
            if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isField"])(selection)) {
                var fieldResult = handleMissing(_this.executeField(object, typename, selection, execContext));
                if (typeof fieldResult !== 'undefined') {
                    objectsToMerge.push((_a = {},
                        _a[Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["resultKeyNameFromField"])(selection)] = fieldResult,
                        _a));
                }
            }
            else {
                var fragment = void 0;
                if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isInlineFragment"])(selection)) {
                    fragment = selection;
                }
                else {
                    fragment = fragmentMap[selection.name.value];
                    if (!fragment) {
                        throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]("No fragment named " + selection.name.value);
                    }
                }
                var typeCondition = fragment.typeCondition && fragment.typeCondition.name.value;
                var match = !typeCondition ||
                    execContext.fragmentMatcher(rootValue, typeCondition, contextValue);
                if (match) {
                    var fragmentExecResult = _this.executeSelectionSet({
                        selectionSet: fragment.selectionSet,
                        rootValue: rootValue,
                        execContext: execContext,
                    });
                    if (match === 'heuristic' && fragmentExecResult.missing) {
                        fragmentExecResult = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, fragmentExecResult), { missing: fragmentExecResult.missing.map(function (info) {
                                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, info), { tolerable: true });
                            }) });
                    }
                    objectsToMerge.push(handleMissing(fragmentExecResult));
                }
            }
        });
        finalResult.result = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["mergeDeepArray"])(objectsToMerge);
        if (this.freezeResults && "development" !== 'production') {
            Object.freeze(finalResult.result);
        }
        return finalResult;
    };
    StoreReader.prototype.executeField = function (object, typename, field, execContext) {
        var variables = execContext.variableValues, contextValue = execContext.contextValue;
        var fieldName = field.name.value;
        var args = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["argumentsObjectFromField"])(field, variables);
        var info = {
            resultKey: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["resultKeyNameFromField"])(field),
            directives: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getDirectiveInfoFromField"])(field, variables),
        };
        var readStoreResult = readStoreResolver(object, typename, fieldName, args, contextValue, info);
        if (Array.isArray(readStoreResult.result)) {
            return this.combineExecResults(readStoreResult, this.executeSubSelectedArray({
                field: field,
                array: readStoreResult.result,
                execContext: execContext,
            }));
        }
        if (!field.selectionSet) {
            assertSelectionSetForIdValue(field, readStoreResult.result);
            if (this.freezeResults && "development" !== 'production') {
                Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["maybeDeepFreeze"])(readStoreResult);
            }
            return readStoreResult;
        }
        if (readStoreResult.result == null) {
            return readStoreResult;
        }
        return this.combineExecResults(readStoreResult, this.executeSelectionSet({
            selectionSet: field.selectionSet,
            rootValue: readStoreResult.result,
            execContext: execContext,
        }));
    };
    StoreReader.prototype.combineExecResults = function () {
        var execResults = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            execResults[_i] = arguments[_i];
        }
        var missing;
        execResults.forEach(function (execResult) {
            if (execResult.missing) {
                missing = missing || [];
                missing.push.apply(missing, execResult.missing);
            }
        });
        return {
            result: execResults.pop().result,
            missing: missing,
        };
    };
    StoreReader.prototype.executeSubSelectedArray = function (_a) {
        var _this = this;
        var field = _a.field, array = _a.array, execContext = _a.execContext;
        var missing;
        function handleMissing(childResult) {
            if (childResult.missing) {
                missing = missing || [];
                missing.push.apply(missing, childResult.missing);
            }
            return childResult.result;
        }
        array = array.map(function (item) {
            if (item === null) {
                return null;
            }
            if (Array.isArray(item)) {
                return handleMissing(_this.executeSubSelectedArray({
                    field: field,
                    array: item,
                    execContext: execContext,
                }));
            }
            if (field.selectionSet) {
                return handleMissing(_this.executeSelectionSet({
                    selectionSet: field.selectionSet,
                    rootValue: item,
                    execContext: execContext,
                }));
            }
            assertSelectionSetForIdValue(field, item);
            return item;
        });
        if (this.freezeResults && "development" !== 'production') {
            Object.freeze(array);
        }
        return { result: array, missing: missing };
    };
    return StoreReader;
}());
function assertSelectionSetForIdValue(field, value) {
    if (!field.selectionSet && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isIdValue"])(value)) {
        throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]("Missing selection set for object of type " + value.typename + " returned for query field " + field.name.value);
    }
}
function defaultFragmentMatcher() {
    return true;
}
function assertIdValue(idValue) {
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isIdValue"])(idValue), "Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue.");
}
function readStoreResolver(object, typename, fieldName, args, context, _a) {
    var resultKey = _a.resultKey, directives = _a.directives;
    var storeKeyName = fieldName;
    if (args || directives) {
        storeKeyName = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getStoreKeyName"])(storeKeyName, args, directives);
    }
    var fieldValue = void 0;
    if (object) {
        fieldValue = object[storeKeyName];
        if (typeof fieldValue === 'undefined' &&
            context.cacheRedirects &&
            typeof typename === 'string') {
            var type = context.cacheRedirects[typename];
            if (type) {
                var resolver = type[fieldName];
                if (resolver) {
                    fieldValue = resolver(object, args, {
                        getCacheKey: function (storeObj) {
                            var id = context.dataIdFromObject(storeObj);
                            return id && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["toIdValue"])({
                                id: id,
                                typename: storeObj.__typename,
                            });
                        },
                    });
                }
            }
        }
    }
    if (typeof fieldValue === 'undefined') {
        return {
            result: fieldValue,
            missing: [{
                    object: object,
                    fieldName: storeKeyName,
                    tolerable: false,
                }],
        };
    }
    if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isJsonValue"])(fieldValue)) {
        fieldValue = fieldValue.json;
    }
    return {
        result: fieldValue,
    };
}

var ObjectCache = (function () {
    function ObjectCache(data) {
        if (data === void 0) { data = Object.create(null); }
        this.data = data;
    }
    ObjectCache.prototype.toObject = function () {
        return this.data;
    };
    ObjectCache.prototype.get = function (dataId) {
        return this.data[dataId];
    };
    ObjectCache.prototype.set = function (dataId, value) {
        this.data[dataId] = value;
    };
    ObjectCache.prototype.delete = function (dataId) {
        this.data[dataId] = void 0;
    };
    ObjectCache.prototype.clear = function () {
        this.data = Object.create(null);
    };
    ObjectCache.prototype.replace = function (newData) {
        this.data = newData || Object.create(null);
    };
    return ObjectCache;
}());
function defaultNormalizedCacheFactory$1(seed) {
    return new ObjectCache(seed);
}

var WriteError = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(WriteError, _super);
    function WriteError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'WriteError';
        return _this;
    }
    return WriteError;
}(Error));
function enhanceErrorWithDocument(error, document) {
    var enhancedError = new WriteError("Error writing result to store for query:\n " + JSON.stringify(document));
    enhancedError.message += '\n' + error.message;
    enhancedError.stack = error.stack;
    return enhancedError;
}
var StoreWriter = (function () {
    function StoreWriter() {
    }
    StoreWriter.prototype.writeQueryToStore = function (_a) {
        var query = _a.query, result = _a.result, _b = _a.store, store = _b === void 0 ? defaultNormalizedCacheFactory() : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
        return this.writeResultToStore({
            dataId: 'ROOT_QUERY',
            result: result,
            document: query,
            store: store,
            variables: variables,
            dataIdFromObject: dataIdFromObject,
            fragmentMatcherFunction: fragmentMatcherFunction,
        });
    };
    StoreWriter.prototype.writeResultToStore = function (_a) {
        var dataId = _a.dataId, result = _a.result, document = _a.document, _b = _a.store, store = _b === void 0 ? defaultNormalizedCacheFactory() : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
        var operationDefinition = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getOperationDefinition"])(document);
        try {
            return this.writeSelectionSetToStore({
                result: result,
                dataId: dataId,
                selectionSet: operationDefinition.selectionSet,
                context: {
                    store: store,
                    processedData: {},
                    variables: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["assign"])({}, Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getDefaultValues"])(operationDefinition), variables),
                    dataIdFromObject: dataIdFromObject,
                    fragmentMap: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["createFragmentMap"])(Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["getFragmentDefinitions"])(document)),
                    fragmentMatcherFunction: fragmentMatcherFunction,
                },
            });
        }
        catch (e) {
            throw enhanceErrorWithDocument(e, document);
        }
    };
    StoreWriter.prototype.writeSelectionSetToStore = function (_a) {
        var _this = this;
        var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, context = _a.context;
        var variables = context.variables, store = context.store, fragmentMap = context.fragmentMap;
        selectionSet.selections.forEach(function (selection) {
            var _a;
            if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["shouldInclude"])(selection, variables)) {
                return;
            }
            if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isField"])(selection)) {
                var resultFieldKey = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["resultKeyNameFromField"])(selection);
                var value = result[resultFieldKey];
                if (typeof value !== 'undefined') {
                    _this.writeFieldToStore({
                        dataId: dataId,
                        value: value,
                        field: selection,
                        context: context,
                    });
                }
                else {
                    var isDefered = false;
                    var isClient = false;
                    if (selection.directives && selection.directives.length) {
                        isDefered = selection.directives.some(function (directive) { return directive.name && directive.name.value === 'defer'; });
                        isClient = selection.directives.some(function (directive) { return directive.name && directive.name.value === 'client'; });
                    }
                    if (!isDefered && !isClient && context.fragmentMatcherFunction) {
                         false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn("Missing field " + resultFieldKey + " in " + JSON.stringify(result, null, 2).substring(0, 100));
                    }
                }
            }
            else {
                var fragment = void 0;
                if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isInlineFragment"])(selection)) {
                    fragment = selection;
                }
                else {
                    fragment = (fragmentMap || {})[selection.name.value];
                     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(fragment, "No fragment named " + selection.name.value + ".");
                }
                var matches = true;
                if (context.fragmentMatcherFunction && fragment.typeCondition) {
                    var id = dataId || 'self';
                    var idValue = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["toIdValue"])({ id: id, typename: undefined });
                    var fakeContext = {
                        store: new ObjectCache((_a = {}, _a[id] = result, _a)),
                        cacheRedirects: {},
                    };
                    var match = context.fragmentMatcherFunction(idValue, fragment.typeCondition.name.value, fakeContext);
                    if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isProduction"])() && match === 'heuristic') {
                         false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error('WARNING: heuristic fragment matching going on!');
                    }
                    matches = !!match;
                }
                if (matches) {
                    _this.writeSelectionSetToStore({
                        result: result,
                        selectionSet: fragment.selectionSet,
                        dataId: dataId,
                        context: context,
                    });
                }
            }
        });
        return store;
    };
    StoreWriter.prototype.writeFieldToStore = function (_a) {
        var _b;
        var field = _a.field, value = _a.value, dataId = _a.dataId, context = _a.context;
        var variables = context.variables, dataIdFromObject = context.dataIdFromObject, store = context.store;
        var storeValue;
        var storeObject;
        var storeFieldName = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["storeKeyNameFromField"])(field, variables);
        if (!field.selectionSet || value === null) {
            storeValue =
                value != null && typeof value === 'object'
                    ?
                        { type: 'json', json: value }
                    :
                        value;
        }
        else if (Array.isArray(value)) {
            var generatedId = dataId + "." + storeFieldName;
            storeValue = this.processArrayValue(value, generatedId, field.selectionSet, context);
        }
        else {
            var valueDataId = dataId + "." + storeFieldName;
            var generated = true;
            if (!isGeneratedId(valueDataId)) {
                valueDataId = '$' + valueDataId;
            }
            if (dataIdFromObject) {
                var semanticId = dataIdFromObject(value);
                 false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!semanticId || !isGeneratedId(semanticId), 'IDs returned by dataIdFromObject cannot begin with the "$" character.');
                if (semanticId ||
                    (typeof semanticId === 'number' && semanticId === 0)) {
                    valueDataId = semanticId;
                    generated = false;
                }
            }
            if (!isDataProcessed(valueDataId, field, context.processedData)) {
                this.writeSelectionSetToStore({
                    dataId: valueDataId,
                    result: value,
                    selectionSet: field.selectionSet,
                    context: context,
                });
            }
            var typename = value.__typename;
            storeValue = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["toIdValue"])({ id: valueDataId, typename: typename }, generated);
            storeObject = store.get(dataId);
            var escapedId = storeObject && storeObject[storeFieldName];
            if (escapedId !== storeValue && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isIdValue"])(escapedId)) {
                var hadTypename = escapedId.typename !== undefined;
                var hasTypename = typename !== undefined;
                var typenameChanged = hadTypename && hasTypename && escapedId.typename !== typename;
                 false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!generated || escapedId.generated || typenameChanged, "Store error: the application attempted to write an object with no provided id but the store already contains an id of " + escapedId.id + " for this object. The selectionSet that was trying to be written is:\n" + JSON.stringify(field));
                 false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!hadTypename || hasTypename, "Store error: the application attempted to write an object with no provided typename but the store already contains an object with typename of " + escapedId.typename + " for the object of id " + escapedId.id + ". The selectionSet that was trying to be written is:\n" + JSON.stringify(field));
                if (escapedId.generated) {
                    if (typenameChanged) {
                        if (!generated) {
                            store.delete(escapedId.id);
                        }
                    }
                    else {
                        mergeWithGenerated(escapedId.id, storeValue.id, store);
                    }
                }
            }
        }
        storeObject = store.get(dataId);
        if (!storeObject || !Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(storeValue, storeObject[storeFieldName])) {
            store.set(dataId, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, storeObject), (_b = {}, _b[storeFieldName] = storeValue, _b)));
        }
    };
    StoreWriter.prototype.processArrayValue = function (value, generatedId, selectionSet, context) {
        var _this = this;
        return value.map(function (item, index) {
            if (item === null) {
                return null;
            }
            var itemDataId = generatedId + "." + index;
            if (Array.isArray(item)) {
                return _this.processArrayValue(item, itemDataId, selectionSet, context);
            }
            var generated = true;
            if (context.dataIdFromObject) {
                var semanticId = context.dataIdFromObject(item);
                if (semanticId) {
                    itemDataId = semanticId;
                    generated = false;
                }
            }
            if (!isDataProcessed(itemDataId, selectionSet, context.processedData)) {
                _this.writeSelectionSetToStore({
                    dataId: itemDataId,
                    result: item,
                    selectionSet: selectionSet,
                    context: context,
                });
            }
            return Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["toIdValue"])({ id: itemDataId, typename: item.__typename }, generated);
        });
    };
    return StoreWriter;
}());
function isGeneratedId(id) {
    return id[0] === '$';
}
function mergeWithGenerated(generatedKey, realKey, cache) {
    if (generatedKey === realKey) {
        return false;
    }
    var generated = cache.get(generatedKey);
    var real = cache.get(realKey);
    var madeChanges = false;
    Object.keys(generated).forEach(function (key) {
        var value = generated[key];
        var realValue = real[key];
        if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isIdValue"])(value) &&
            isGeneratedId(value.id) &&
            Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isIdValue"])(realValue) &&
            !Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(value, realValue) &&
            mergeWithGenerated(value.id, realValue.id, cache)) {
            madeChanges = true;
        }
    });
    cache.delete(generatedKey);
    var newRealValue = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, generated), real);
    if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(newRealValue, real)) {
        return madeChanges;
    }
    cache.set(realKey, newRealValue);
    return true;
}
function isDataProcessed(dataId, field, processedData) {
    if (!processedData) {
        return false;
    }
    if (processedData[dataId]) {
        if (processedData[dataId].indexOf(field) >= 0) {
            return true;
        }
        else {
            processedData[dataId].push(field);
        }
    }
    else {
        processedData[dataId] = [field];
    }
    return false;
}

var defaultConfig = {
    fragmentMatcher: new HeuristicFragmentMatcher(),
    dataIdFromObject: defaultDataIdFromObject,
    addTypename: true,
    resultCaching: true,
    freezeResults: false,
};
function defaultDataIdFromObject(result) {
    if (result.__typename) {
        if (result.id !== undefined) {
            return result.__typename + ":" + result.id;
        }
        if (result._id !== undefined) {
            return result.__typename + ":" + result._id;
        }
    }
    return null;
}
var hasOwn$1 = Object.prototype.hasOwnProperty;
var OptimisticCacheLayer = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(OptimisticCacheLayer, _super);
    function OptimisticCacheLayer(optimisticId, parent, transaction) {
        var _this = _super.call(this, Object.create(null)) || this;
        _this.optimisticId = optimisticId;
        _this.parent = parent;
        _this.transaction = transaction;
        return _this;
    }
    OptimisticCacheLayer.prototype.toObject = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.parent.toObject()), this.data);
    };
    OptimisticCacheLayer.prototype.get = function (dataId) {
        return hasOwn$1.call(this.data, dataId)
            ? this.data[dataId]
            : this.parent.get(dataId);
    };
    return OptimisticCacheLayer;
}(ObjectCache));
var InMemoryCache = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InMemoryCache, _super);
    function InMemoryCache(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.watches = new Set();
        _this.typenameDocumentCache = new Map();
        _this.cacheKeyRoot = new optimism__WEBPACK_IMPORTED_MODULE_3__["KeyTrie"](apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["canUseWeakMap"]);
        _this.silenceBroadcast = false;
        _this.config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultConfig), config);
        if (_this.config.customResolvers) {
             false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn('customResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating customResolvers in the next major version.');
            _this.config.cacheRedirects = _this.config.customResolvers;
        }
        if (_this.config.cacheResolvers) {
             false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn('cacheResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating cacheResolvers in the next major version.');
            _this.config.cacheRedirects = _this.config.cacheResolvers;
        }
        _this.addTypename = !!_this.config.addTypename;
        _this.data = _this.config.resultCaching
            ? new DepTrackingCache()
            : new ObjectCache();
        _this.optimisticData = _this.data;
        _this.storeWriter = new StoreWriter();
        _this.storeReader = new StoreReader({
            cacheKeyRoot: _this.cacheKeyRoot,
            freezeResults: config.freezeResults,
        });
        var cache = _this;
        var maybeBroadcastWatch = cache.maybeBroadcastWatch;
        _this.maybeBroadcastWatch = Object(optimism__WEBPACK_IMPORTED_MODULE_3__["wrap"])(function (c) {
            return maybeBroadcastWatch.call(_this, c);
        }, {
            makeCacheKey: function (c) {
                if (c.optimistic) {
                    return;
                }
                if (c.previousResult) {
                    return;
                }
                if (cache.data instanceof DepTrackingCache) {
                    return cache.cacheKeyRoot.lookup(c.query, JSON.stringify(c.variables));
                }
            }
        });
        return _this;
    }
    InMemoryCache.prototype.restore = function (data) {
        if (data)
            this.data.replace(data);
        return this;
    };
    InMemoryCache.prototype.extract = function (optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return (optimistic ? this.optimisticData : this.data).toObject();
    };
    InMemoryCache.prototype.read = function (options) {
        if (typeof options.rootId === 'string' &&
            typeof this.data.get(options.rootId) === 'undefined') {
            return null;
        }
        var fragmentMatcher = this.config.fragmentMatcher;
        var fragmentMatcherFunction = fragmentMatcher && fragmentMatcher.match;
        return this.storeReader.readQueryFromStore({
            store: options.optimistic ? this.optimisticData : this.data,
            query: this.transformDocument(options.query),
            variables: options.variables,
            rootId: options.rootId,
            fragmentMatcherFunction: fragmentMatcherFunction,
            previousResult: options.previousResult,
            config: this.config,
        }) || null;
    };
    InMemoryCache.prototype.write = function (write) {
        var fragmentMatcher = this.config.fragmentMatcher;
        var fragmentMatcherFunction = fragmentMatcher && fragmentMatcher.match;
        this.storeWriter.writeResultToStore({
            dataId: write.dataId,
            result: write.result,
            variables: write.variables,
            document: this.transformDocument(write.query),
            store: this.data,
            dataIdFromObject: this.config.dataIdFromObject,
            fragmentMatcherFunction: fragmentMatcherFunction,
        });
        this.broadcastWatches();
    };
    InMemoryCache.prototype.diff = function (query) {
        var fragmentMatcher = this.config.fragmentMatcher;
        var fragmentMatcherFunction = fragmentMatcher && fragmentMatcher.match;
        return this.storeReader.diffQueryAgainstStore({
            store: query.optimistic ? this.optimisticData : this.data,
            query: this.transformDocument(query.query),
            variables: query.variables,
            returnPartialData: query.returnPartialData,
            previousResult: query.previousResult,
            fragmentMatcherFunction: fragmentMatcherFunction,
            config: this.config,
        });
    };
    InMemoryCache.prototype.watch = function (watch) {
        var _this = this;
        this.watches.add(watch);
        return function () {
            _this.watches.delete(watch);
        };
    };
    InMemoryCache.prototype.evict = function (query) {
        throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]("eviction is not implemented on InMemory Cache");
    };
    InMemoryCache.prototype.reset = function () {
        this.data.clear();
        this.broadcastWatches();
        return Promise.resolve();
    };
    InMemoryCache.prototype.removeOptimistic = function (idToRemove) {
        var toReapply = [];
        var removedCount = 0;
        var layer = this.optimisticData;
        while (layer instanceof OptimisticCacheLayer) {
            if (layer.optimisticId === idToRemove) {
                ++removedCount;
            }
            else {
                toReapply.push(layer);
            }
            layer = layer.parent;
        }
        if (removedCount > 0) {
            this.optimisticData = layer;
            while (toReapply.length > 0) {
                var layer_1 = toReapply.pop();
                this.performTransaction(layer_1.transaction, layer_1.optimisticId);
            }
            this.broadcastWatches();
        }
    };
    InMemoryCache.prototype.performTransaction = function (transaction, optimisticId) {
        var _a = this, data = _a.data, silenceBroadcast = _a.silenceBroadcast;
        this.silenceBroadcast = true;
        if (typeof optimisticId === 'string') {
            this.data = this.optimisticData = new OptimisticCacheLayer(optimisticId, this.optimisticData, transaction);
        }
        try {
            transaction(this);
        }
        finally {
            this.silenceBroadcast = silenceBroadcast;
            this.data = data;
        }
        this.broadcastWatches();
    };
    InMemoryCache.prototype.recordOptimisticTransaction = function (transaction, id) {
        return this.performTransaction(transaction, id);
    };
    InMemoryCache.prototype.transformDocument = function (document) {
        if (this.addTypename) {
            var result = this.typenameDocumentCache.get(document);
            if (!result) {
                result = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_2__["addTypenameToDocument"])(document);
                this.typenameDocumentCache.set(document, result);
                this.typenameDocumentCache.set(result, result);
            }
            return result;
        }
        return document;
    };
    InMemoryCache.prototype.broadcastWatches = function () {
        var _this = this;
        if (!this.silenceBroadcast) {
            this.watches.forEach(function (c) { return _this.maybeBroadcastWatch(c); });
        }
    };
    InMemoryCache.prototype.maybeBroadcastWatch = function (c) {
        c.callback(this.diff({
            query: c.query,
            variables: c.variables,
            previousResult: c.previousResult && c.previousResult(),
            optimistic: c.optimistic,
        }));
    };
    return InMemoryCache;
}(apollo_cache__WEBPACK_IMPORTED_MODULE_1__["ApolloCache"]));


//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/apollo-cache/lib/bundle.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/apollo-cache/lib/bundle.esm.js ***!
  \*****************************************************/
/*! exports provided: ApolloCache, Cache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloCache", function() { return ApolloCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cache", function() { return Cache; });
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-utilities */ "./node_modules/apollo-utilities/lib/bundle.esm.js");


function queryFromPojo(obj) {
    var op = {
        kind: 'OperationDefinition',
        operation: 'query',
        name: {
            kind: 'Name',
            value: 'GeneratedClientQuery',
        },
        selectionSet: selectionSetFromObj(obj),
    };
    var out = {
        kind: 'Document',
        definitions: [op],
    };
    return out;
}
function fragmentFromPojo(obj, typename) {
    var frag = {
        kind: 'FragmentDefinition',
        typeCondition: {
            kind: 'NamedType',
            name: {
                kind: 'Name',
                value: typename || '__FakeType',
            },
        },
        name: {
            kind: 'Name',
            value: 'GeneratedClientQuery',
        },
        selectionSet: selectionSetFromObj(obj),
    };
    var out = {
        kind: 'Document',
        definitions: [frag],
    };
    return out;
}
function selectionSetFromObj(obj) {
    if (typeof obj === 'number' ||
        typeof obj === 'boolean' ||
        typeof obj === 'string' ||
        typeof obj === 'undefined' ||
        obj === null) {
        return null;
    }
    if (Array.isArray(obj)) {
        return selectionSetFromObj(obj[0]);
    }
    var selections = [];
    Object.keys(obj).forEach(function (key) {
        var nestedSelSet = selectionSetFromObj(obj[key]);
        var field = {
            kind: 'Field',
            name: {
                kind: 'Name',
                value: key,
            },
            selectionSet: nestedSelSet || undefined,
        };
        selections.push(field);
    });
    var selectionSet = {
        kind: 'SelectionSet',
        selections: selections,
    };
    return selectionSet;
}
var justTypenameQuery = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: null,
            variableDefinitions: null,
            directives: [],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        alias: null,
                        name: {
                            kind: 'Name',
                            value: '__typename',
                        },
                        arguments: [],
                        directives: [],
                        selectionSet: null,
                    },
                ],
            },
        },
    ],
};

var ApolloCache = (function () {
    function ApolloCache() {
    }
    ApolloCache.prototype.transformDocument = function (document) {
        return document;
    };
    ApolloCache.prototype.transformForLink = function (document) {
        return document;
    };
    ApolloCache.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: options.query,
            variables: options.variables,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_0__["getFragmentQueryDocument"])(options.fragment, options.fragmentName),
            variables: options.variables,
            rootId: options.id,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.writeQuery = function (options) {
        this.write({
            dataId: 'ROOT_QUERY',
            result: options.data,
            query: options.query,
            variables: options.variables,
        });
    };
    ApolloCache.prototype.writeFragment = function (options) {
        this.write({
            dataId: options.id,
            result: options.data,
            variables: options.variables,
            query: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_0__["getFragmentQueryDocument"])(options.fragment, options.fragmentName),
        });
    };
    ApolloCache.prototype.writeData = function (_a) {
        var id = _a.id, data = _a.data;
        if (typeof id !== 'undefined') {
            var typenameResult = null;
            try {
                typenameResult = this.read({
                    rootId: id,
                    optimistic: false,
                    query: justTypenameQuery,
                });
            }
            catch (e) {
            }
            var __typename = (typenameResult && typenameResult.__typename) || '__ClientData';
            var dataToWrite = Object.assign({ __typename: __typename }, data);
            this.writeFragment({
                id: id,
                fragment: fragmentFromPojo(dataToWrite, __typename),
                data: dataToWrite,
            });
        }
        else {
            this.writeQuery({ query: queryFromPojo(data), data: data });
        }
    };
    return ApolloCache;
}());

var Cache;
(function (Cache) {
})(Cache || (Cache = {}));


//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/apollo-client/bundle.esm.js":
/*!**************************************************!*\
  !*** ./node_modules/apollo-client/bundle.esm.js ***!
  \**************************************************/
/*! exports provided: default, ApolloClient, ApolloError, FetchType, NetworkStatus, ObservableQuery, isApolloError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloClient", function() { return ApolloClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloError", function() { return ApolloError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchType", function() { return FetchType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkStatus", function() { return NetworkStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableQuery", function() { return ObservableQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isApolloError", function() { return isApolloError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-utilities */ "./node_modules/apollo-utilities/lib/bundle.esm.js");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-link */ "./node_modules/apollo-link/lib/bundle.esm.js");
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql/language/visitor */ "./node_modules/graphql/language/visitor.mjs");







var NetworkStatus;
(function (NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus < 7;
}

var Observable = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Observable, _super);
    function Observable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Observable.prototype[symbol_observable__WEBPACK_IMPORTED_MODULE_3__["default"]] = function () {
        return this;
    };
    Observable.prototype['@@observable'] = function () {
        return this;
    };
    return Observable;
}(apollo_link__WEBPACK_IMPORTED_MODULE_2__["Observable"]));

function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
}

function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
}
var generateErrorMessage = function (err) {
    var message = '';
    if (isNonEmptyArray(err.graphQLErrors)) {
        err.graphQLErrors.forEach(function (graphQLError) {
            var errorMessage = graphQLError
                ? graphQLError.message
                : 'Error message not found.';
            message += "GraphQL error: " + errorMessage + "\n";
        });
    }
    if (err.networkError) {
        message += 'Network error: ' + err.networkError.message + '\n';
    }
    message = message.replace(/\n$/, '');
    return message;
};
var ApolloError = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ApolloError, _super);
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.networkError = networkError || null;
        if (!errorMessage) {
            _this.message = generateErrorMessage(_this);
        }
        else {
            _this.message = errorMessage;
        }
        _this.extraInfo = extraInfo;
        _this.__proto__ = ApolloError.prototype;
        return _this;
    }
    return ApolloError;
}(Error));

var FetchType;
(function (FetchType) {
    FetchType[FetchType["normal"] = 1] = "normal";
    FetchType[FetchType["refetch"] = 2] = "refetch";
    FetchType[FetchType["poll"] = 3] = "poll";
})(FetchType || (FetchType = {}));

var hasError = function (storeValue, policy) {
    if (policy === void 0) { policy = 'none'; }
    return storeValue && (storeValue.networkError ||
        (policy === 'none' && isNonEmptyArray(storeValue.graphQLErrors)));
};
var ObservableQuery = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var queryManager = _a.queryManager, options = _a.options, _b = _a.shouldSubscribe, shouldSubscribe = _b === void 0 ? true : _b;
        var _this = _super.call(this, function (observer) {
            return _this.onSubscribe(observer);
        }) || this;
        _this.observers = new Set();
        _this.subscriptions = new Set();
        _this.isTornDown = false;
        _this.options = options;
        _this.variables = options.variables || {};
        _this.queryId = queryManager.generateQueryId();
        _this.shouldSubscribe = shouldSubscribe;
        var opDef = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationDefinition"])(options.query);
        _this.queryName = opDef && opDef.name && opDef.name.value;
        _this.queryManager = queryManager;
        return _this;
    }
    ObservableQuery.prototype.result = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var observer = {
                next: function (result) {
                    resolve(result);
                    _this.observers.delete(observer);
                    if (!_this.observers.size) {
                        _this.queryManager.removeQuery(_this.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: reject,
            };
            var subscription = _this.subscribe(observer);
        });
    };
    ObservableQuery.prototype.currentResult = function () {
        var result = this.getCurrentResult();
        if (result.data === undefined) {
            result.data = {};
        }
        return result;
    };
    ObservableQuery.prototype.getCurrentResult = function () {
        if (this.isTornDown) {
            var lastResult = this.lastResult;
            return {
                data: !this.lastError && lastResult && lastResult.data || void 0,
                error: this.lastError,
                loading: false,
                networkStatus: NetworkStatus.error,
            };
        }
        var _a = this.queryManager.getCurrentQueryResult(this), data = _a.data, partial = _a.partial;
        var queryStoreValue = this.queryManager.queryStore.get(this.queryId);
        var result;
        var fetchPolicy = this.options.fetchPolicy;
        var isNetworkFetchPolicy = fetchPolicy === 'network-only' ||
            fetchPolicy === 'no-cache';
        if (queryStoreValue) {
            var networkStatus = queryStoreValue.networkStatus;
            if (hasError(queryStoreValue, this.options.errorPolicy)) {
                return {
                    data: void 0,
                    loading: false,
                    networkStatus: networkStatus,
                    error: new ApolloError({
                        graphQLErrors: queryStoreValue.graphQLErrors,
                        networkError: queryStoreValue.networkError,
                    }),
                };
            }
            if (queryStoreValue.variables) {
                this.options.variables = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options.variables), queryStoreValue.variables);
                this.variables = this.options.variables;
            }
            result = {
                data: data,
                loading: isNetworkRequestInFlight(networkStatus),
                networkStatus: networkStatus,
            };
            if (queryStoreValue.graphQLErrors && this.options.errorPolicy === 'all') {
                result.errors = queryStoreValue.graphQLErrors;
            }
        }
        else {
            var loading = isNetworkFetchPolicy ||
                (partial && fetchPolicy !== 'cache-only');
            result = {
                data: data,
                loading: loading,
                networkStatus: loading ? NetworkStatus.loading : NetworkStatus.ready,
            };
        }
        if (!partial) {
            this.updateLastResult(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), { stale: false }));
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), { partial: partial });
    };
    ObservableQuery.prototype.isDifferentFromLastResult = function (newResult) {
        var snapshot = this.lastResultSnapshot;
        return !(snapshot &&
            newResult &&
            snapshot.networkStatus === newResult.networkStatus &&
            snapshot.stale === newResult.stale &&
            Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(snapshot.data, newResult.data));
    };
    ObservableQuery.prototype.getLastResult = function () {
        return this.lastResult;
    };
    ObservableQuery.prototype.getLastError = function () {
        return this.lastError;
    };
    ObservableQuery.prototype.resetLastResults = function () {
        delete this.lastResult;
        delete this.lastResultSnapshot;
        delete this.lastError;
        this.isTornDown = false;
    };
    ObservableQuery.prototype.resetQueryStoreErrors = function () {
        var queryStore = this.queryManager.queryStore.get(this.queryId);
        if (queryStore) {
            queryStore.networkError = null;
            queryStore.graphQLErrors = [];
        }
    };
    ObservableQuery.prototype.refetch = function (variables) {
        var fetchPolicy = this.options.fetchPolicy;
        if (fetchPolicy === 'cache-only') {
            return Promise.reject( false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]('cache-only fetchPolicy option should not be used together with query refetch.'));
        }
        if (fetchPolicy !== 'no-cache' &&
            fetchPolicy !== 'cache-and-network') {
            fetchPolicy = 'network-only';
        }
        if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(this.variables, variables)) {
            this.variables = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.variables), variables);
        }
        if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(this.options.variables, this.variables)) {
            this.options.variables = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options.variables), this.variables);
        }
        return this.queryManager.fetchQuery(this.queryId, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options), { fetchPolicy: fetchPolicy }), FetchType.refetch);
    };
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(fetchMoreOptions.updateQuery, 'updateQuery option is required. This function defines how to update the query data with the new results.');
        var combinedOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, (fetchMoreOptions.query ? fetchMoreOptions : Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options), fetchMoreOptions), { variables: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.variables), fetchMoreOptions.variables) }))), { fetchPolicy: 'network-only' });
        var qid = this.queryManager.generateQueryId();
        return this.queryManager
            .fetchQuery(qid, combinedOptions, FetchType.normal, this.queryId)
            .then(function (fetchMoreResult) {
            _this.updateQuery(function (previousResult) {
                return fetchMoreOptions.updateQuery(previousResult, {
                    fetchMoreResult: fetchMoreResult.data,
                    variables: combinedOptions.variables,
                });
            });
            _this.queryManager.stopQuery(qid);
            return fetchMoreResult;
        }, function (error) {
            _this.queryManager.stopQuery(qid);
            throw error;
        });
    };
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var subscription = this.queryManager
            .startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
        })
            .subscribe({
            next: function (subscriptionData) {
                var updateQuery = options.updateQuery;
                if (updateQuery) {
                    _this.updateQuery(function (previous, _a) {
                        var variables = _a.variables;
                        return updateQuery(previous, {
                            subscriptionData: subscriptionData,
                            variables: variables,
                        });
                    });
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                    return;
                }
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error('Unhandled GraphQL subscription error', err);
            },
        });
        this.subscriptions.add(subscription);
        return function () {
            if (_this.subscriptions.delete(subscription)) {
                subscription.unsubscribe();
            }
        };
    };
    ObservableQuery.prototype.setOptions = function (opts) {
        var oldFetchPolicy = this.options.fetchPolicy;
        this.options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options), opts);
        if (opts.pollInterval) {
            this.startPolling(opts.pollInterval);
        }
        else if (opts.pollInterval === 0) {
            this.stopPolling();
        }
        var fetchPolicy = opts.fetchPolicy;
        return this.setVariables(this.options.variables, oldFetchPolicy !== fetchPolicy && (oldFetchPolicy === 'cache-only' ||
            oldFetchPolicy === 'standby' ||
            fetchPolicy === 'network-only'), opts.fetchResults);
    };
    ObservableQuery.prototype.setVariables = function (variables, tryFetch, fetchResults) {
        if (tryFetch === void 0) { tryFetch = false; }
        if (fetchResults === void 0) { fetchResults = true; }
        this.isTornDown = false;
        variables = variables || this.variables;
        if (!tryFetch && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(variables, this.variables)) {
            return this.observers.size && fetchResults
                ? this.result()
                : Promise.resolve();
        }
        this.variables = this.options.variables = variables;
        if (!this.observers.size) {
            return Promise.resolve();
        }
        return this.queryManager.fetchQuery(this.queryId, this.options);
    };
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var queryManager = this.queryManager;
        var _a = queryManager.getQueryWithPreviousResult(this.queryId), previousResult = _a.previousResult, variables = _a.variables, document = _a.document;
        var newResult = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["tryFunctionOrLogError"])(function () {
            return mapFn(previousResult, { variables: variables });
        });
        if (newResult) {
            queryManager.dataStore.markUpdateQueryResult(document, variables, newResult);
            queryManager.broadcastQueries();
        }
    };
    ObservableQuery.prototype.stopPolling = function () {
        this.queryManager.stopPollingQuery(this.queryId);
        this.options.pollInterval = undefined;
    };
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        assertNotCacheFirstOrOnly(this);
        this.options.pollInterval = pollInterval;
        this.queryManager.startPollingQuery(this.options, this.queryId);
    };
    ObservableQuery.prototype.updateLastResult = function (newResult) {
        var previousResult = this.lastResult;
        this.lastResult = newResult;
        this.lastResultSnapshot = this.queryManager.assumeImmutableResults
            ? newResult
            : Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(newResult);
        return previousResult;
    };
    ObservableQuery.prototype.onSubscribe = function (observer) {
        var _this = this;
        try {
            var subObserver = observer._subscription._observer;
            if (subObserver && !subObserver.error) {
                subObserver.error = defaultSubscriptionObserverErrorCallback;
            }
        }
        catch (_a) { }
        var first = !this.observers.size;
        this.observers.add(observer);
        if (observer.next && this.lastResult)
            observer.next(this.lastResult);
        if (observer.error && this.lastError)
            observer.error(this.lastError);
        if (first) {
            this.setUpQuery();
        }
        return function () {
            if (_this.observers.delete(observer) && !_this.observers.size) {
                _this.tearDownQuery();
            }
        };
    };
    ObservableQuery.prototype.setUpQuery = function () {
        var _this = this;
        var _a = this, queryManager = _a.queryManager, queryId = _a.queryId;
        if (this.shouldSubscribe) {
            queryManager.addObservableQuery(queryId, this);
        }
        if (this.options.pollInterval) {
            assertNotCacheFirstOrOnly(this);
            queryManager.startPollingQuery(this.options, queryId);
        }
        var onError = function (error) {
            _this.updateLastResult(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.lastResult), { errors: error.graphQLErrors, networkStatus: NetworkStatus.error, loading: false }));
            iterateObserversSafely(_this.observers, 'error', _this.lastError = error);
        };
        queryManager.observeQuery(queryId, this.options, {
            next: function (result) {
                if (_this.lastError || _this.isDifferentFromLastResult(result)) {
                    var previousResult_1 = _this.updateLastResult(result);
                    var _a = _this.options, query_1 = _a.query, variables = _a.variables, fetchPolicy_1 = _a.fetchPolicy;
                    if (queryManager.transform(query_1).hasClientExports) {
                        queryManager.getLocalState().addExportedVariables(query_1, variables).then(function (variables) {
                            var previousVariables = _this.variables;
                            _this.variables = _this.options.variables = variables;
                            if (!result.loading &&
                                previousResult_1 &&
                                fetchPolicy_1 !== 'cache-only' &&
                                queryManager.transform(query_1).serverQuery &&
                                !Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(previousVariables, variables)) {
                                _this.refetch();
                            }
                            else {
                                iterateObserversSafely(_this.observers, 'next', result);
                            }
                        });
                    }
                    else {
                        iterateObserversSafely(_this.observers, 'next', result);
                    }
                }
            },
            error: onError,
        }).catch(onError);
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        var queryManager = this.queryManager;
        this.isTornDown = true;
        queryManager.stopPollingQuery(this.queryId);
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptions.clear();
        queryManager.removeObservableQuery(this.queryId);
        queryManager.stopQuery(this.queryId);
        this.observers.clear();
    };
    return ObservableQuery;
}(Observable));
function defaultSubscriptionObserverErrorCallback(error) {
     false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error('Unhandled error', error.message, error.stack);
}
function iterateObserversSafely(observers, method, argument) {
    var observersWithMethod = [];
    observers.forEach(function (obs) { return obs[method] && observersWithMethod.push(obs); });
    observersWithMethod.forEach(function (obs) { return obs[method](argument); });
}
function assertNotCacheFirstOrOnly(obsQuery) {
    var fetchPolicy = obsQuery.options.fetchPolicy;
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(fetchPolicy !== 'cache-first' && fetchPolicy !== 'cache-only', 'Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
}

var MutationStore = (function () {
    function MutationStore() {
        this.store = {};
    }
    MutationStore.prototype.getStore = function () {
        return this.store;
    };
    MutationStore.prototype.get = function (mutationId) {
        return this.store[mutationId];
    };
    MutationStore.prototype.initMutation = function (mutationId, mutation, variables) {
        this.store[mutationId] = {
            mutation: mutation,
            variables: variables || {},
            loading: true,
            error: null,
        };
    };
    MutationStore.prototype.markMutationError = function (mutationId, error) {
        var mutation = this.store[mutationId];
        if (mutation) {
            mutation.loading = false;
            mutation.error = error;
        }
    };
    MutationStore.prototype.markMutationResult = function (mutationId) {
        var mutation = this.store[mutationId];
        if (mutation) {
            mutation.loading = false;
            mutation.error = null;
        }
    };
    MutationStore.prototype.reset = function () {
        this.store = {};
    };
    return MutationStore;
}());

var QueryStore = (function () {
    function QueryStore() {
        this.store = {};
    }
    QueryStore.prototype.getStore = function () {
        return this.store;
    };
    QueryStore.prototype.get = function (queryId) {
        return this.store[queryId];
    };
    QueryStore.prototype.initQuery = function (query) {
        var previousQuery = this.store[query.queryId];
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!previousQuery ||
            previousQuery.document === query.document ||
            Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(previousQuery.document, query.document), 'Internal Error: may not update existing query string in store');
        var isSetVariables = false;
        var previousVariables = null;
        if (query.storePreviousVariables &&
            previousQuery &&
            previousQuery.networkStatus !== NetworkStatus.loading) {
            if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(previousQuery.variables, query.variables)) {
                isSetVariables = true;
                previousVariables = previousQuery.variables;
            }
        }
        var networkStatus;
        if (isSetVariables) {
            networkStatus = NetworkStatus.setVariables;
        }
        else if (query.isPoll) {
            networkStatus = NetworkStatus.poll;
        }
        else if (query.isRefetch) {
            networkStatus = NetworkStatus.refetch;
        }
        else {
            networkStatus = NetworkStatus.loading;
        }
        var graphQLErrors = [];
        if (previousQuery && previousQuery.graphQLErrors) {
            graphQLErrors = previousQuery.graphQLErrors;
        }
        this.store[query.queryId] = {
            document: query.document,
            variables: query.variables,
            previousVariables: previousVariables,
            networkError: null,
            graphQLErrors: graphQLErrors,
            networkStatus: networkStatus,
            metadata: query.metadata,
        };
        if (typeof query.fetchMoreForQueryId === 'string' &&
            this.store[query.fetchMoreForQueryId]) {
            this.store[query.fetchMoreForQueryId].networkStatus =
                NetworkStatus.fetchMore;
        }
    };
    QueryStore.prototype.markQueryResult = function (queryId, result, fetchMoreForQueryId) {
        if (!this.store || !this.store[queryId])
            return;
        this.store[queryId].networkError = null;
        this.store[queryId].graphQLErrors = isNonEmptyArray(result.errors) ? result.errors : [];
        this.store[queryId].previousVariables = null;
        this.store[queryId].networkStatus = NetworkStatus.ready;
        if (typeof fetchMoreForQueryId === 'string' &&
            this.store[fetchMoreForQueryId]) {
            this.store[fetchMoreForQueryId].networkStatus = NetworkStatus.ready;
        }
    };
    QueryStore.prototype.markQueryError = function (queryId, error, fetchMoreForQueryId) {
        if (!this.store || !this.store[queryId])
            return;
        this.store[queryId].networkError = error;
        this.store[queryId].networkStatus = NetworkStatus.error;
        if (typeof fetchMoreForQueryId === 'string') {
            this.markQueryResultClient(fetchMoreForQueryId, true);
        }
    };
    QueryStore.prototype.markQueryResultClient = function (queryId, complete) {
        var storeValue = this.store && this.store[queryId];
        if (storeValue) {
            storeValue.networkError = null;
            storeValue.previousVariables = null;
            if (complete) {
                storeValue.networkStatus = NetworkStatus.ready;
            }
        }
    };
    QueryStore.prototype.stopQuery = function (queryId) {
        delete this.store[queryId];
    };
    QueryStore.prototype.reset = function (observableQueryIds) {
        var _this = this;
        Object.keys(this.store).forEach(function (queryId) {
            if (observableQueryIds.indexOf(queryId) < 0) {
                _this.stopQuery(queryId);
            }
            else {
                _this.store[queryId].networkStatus = NetworkStatus.loading;
            }
        });
    };
    return QueryStore;
}());

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var LocalState = (function () {
    function LocalState(_a) {
        var cache = _a.cache, client = _a.client, resolvers = _a.resolvers, fragmentMatcher = _a.fragmentMatcher;
        this.cache = cache;
        if (client) {
            this.client = client;
        }
        if (resolvers) {
            this.addResolvers(resolvers);
        }
        if (fragmentMatcher) {
            this.setFragmentMatcher(fragmentMatcher);
        }
    }
    LocalState.prototype.addResolvers = function (resolvers) {
        var _this = this;
        this.resolvers = this.resolvers || {};
        if (Array.isArray(resolvers)) {
            resolvers.forEach(function (resolverGroup) {
                _this.resolvers = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeDeep"])(_this.resolvers, resolverGroup);
            });
        }
        else {
            this.resolvers = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeDeep"])(this.resolvers, resolvers);
        }
    };
    LocalState.prototype.setResolvers = function (resolvers) {
        this.resolvers = {};
        this.addResolvers(resolvers);
    };
    LocalState.prototype.getResolvers = function () {
        return this.resolvers || {};
    };
    LocalState.prototype.runResolvers = function (_a) {
        var document = _a.document, remoteResult = _a.remoteResult, context = _a.context, variables = _a.variables, _b = _a.onlyRunForcedResolvers, onlyRunForcedResolvers = _b === void 0 ? false : _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                if (document) {
                    return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function (localResult) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, remoteResult), { data: localResult.result })); })];
                }
                return [2, remoteResult];
            });
        });
    };
    LocalState.prototype.setFragmentMatcher = function (fragmentMatcher) {
        this.fragmentMatcher = fragmentMatcher;
    };
    LocalState.prototype.getFragmentMatcher = function () {
        return this.fragmentMatcher;
    };
    LocalState.prototype.clientQuery = function (document) {
        if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["hasDirectives"])(['client'], document)) {
            if (this.resolvers) {
                return document;
            }
             false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn('Found @client directives in a query but no ApolloClient resolvers ' +
                'were specified. This means ApolloClient local resolver handling ' +
                'has been disabled, and @client directives will be passed through ' +
                'to your link chain.');
        }
        return null;
    };
    LocalState.prototype.serverQuery = function (document) {
        return this.resolvers ? Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClientSetsFromDocument"])(document) : document;
    };
    LocalState.prototype.prepareContext = function (context) {
        if (context === void 0) { context = {}; }
        var cache = this.cache;
        var newContext = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), { cache: cache, getCacheKey: function (obj) {
                if (cache.config) {
                    return cache.config.dataIdFromObject(obj);
                }
                else {
                     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(false, 'To use context.getCacheKey, you need to use a cache that has ' +
                        'a configurable dataIdFromObject, like apollo-cache-inmemory.');
                }
            } });
        return newContext;
    };
    LocalState.prototype.addExportedVariables = function (document, variables, context) {
        if (variables === void 0) { variables = {}; }
        if (context === void 0) { context = {}; }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (document) {
                    return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function (data) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, variables), data.exportedVariables)); })];
                }
                return [2, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, variables)];
            });
        });
    };
    LocalState.prototype.shouldForceResolvers = function (document) {
        var forceResolvers = false;
        Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__["visit"])(document, {
            Directive: {
                enter: function (node) {
                    if (node.name.value === 'client' && node.arguments) {
                        forceResolvers = node.arguments.some(function (arg) {
                            return arg.name.value === 'always' &&
                                arg.value.kind === 'BooleanValue' &&
                                arg.value.value === true;
                        });
                        if (forceResolvers) {
                            return graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__["BREAK"];
                        }
                    }
                },
            },
        });
        return forceResolvers;
    };
    LocalState.prototype.buildRootValueFromCache = function (document, variables) {
        return this.cache.diff({
            query: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["buildQueryFromSelectionSet"])(document),
            variables: variables,
            returnPartialData: true,
            optimistic: false,
        }).result;
    };
    LocalState.prototype.resolveDocument = function (document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
        if (context === void 0) { context = {}; }
        if (variables === void 0) { variables = {}; }
        if (fragmentMatcher === void 0) { fragmentMatcher = function () { return true; }; }
        if (onlyRunForcedResolvers === void 0) { onlyRunForcedResolvers = false; }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a, cache, client, execContext;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                mainDefinition = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getMainDefinition"])(document);
                fragments = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getFragmentDefinitions"])(document);
                fragmentMap = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["createFragmentMap"])(fragments);
                definitionOperation = mainDefinition
                    .operation;
                defaultOperationType = definitionOperation
                    ? capitalizeFirstLetter(definitionOperation)
                    : 'Query';
                _a = this, cache = _a.cache, client = _a.client;
                execContext = {
                    fragmentMap: fragmentMap,
                    context: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), { cache: cache,
                        client: client }),
                    variables: variables,
                    fragmentMatcher: fragmentMatcher,
                    defaultOperationType: defaultOperationType,
                    exportedVariables: {},
                    onlyRunForcedResolvers: onlyRunForcedResolvers,
                };
                return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function (result) { return ({
                        result: result,
                        exportedVariables: execContext.exportedVariables,
                    }); })];
            });
        });
    };
    LocalState.prototype.resolveSelectionSet = function (selectionSet, rootValue, execContext) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var fragmentMap, context, variables, resultsToMerge, execute;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
                resultsToMerge = [rootValue];
                execute = function (selection) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
                    var fragment, typeCondition;
                    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                        if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["shouldInclude"])(selection, variables)) {
                            return [2];
                        }
                        if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isField"])(selection)) {
                            return [2, this.resolveField(selection, rootValue, execContext).then(function (fieldResult) {
                                    var _a;
                                    if (typeof fieldResult !== 'undefined') {
                                        resultsToMerge.push((_a = {},
                                            _a[Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["resultKeyNameFromField"])(selection)] = fieldResult,
                                            _a));
                                    }
                                })];
                        }
                        if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isInlineFragment"])(selection)) {
                            fragment = selection;
                        }
                        else {
                            fragment = fragmentMap[selection.name.value];
                             false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(fragment, "No fragment named " + selection.name.value);
                        }
                        if (fragment && fragment.typeCondition) {
                            typeCondition = fragment.typeCondition.name.value;
                            if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                                return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function (fragmentResult) {
                                        resultsToMerge.push(fragmentResult);
                                    })];
                            }
                        }
                        return [2];
                    });
                }); };
                return [2, Promise.all(selectionSet.selections.map(execute)).then(function () {
                        return Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeDeepArray"])(resultsToMerge);
                    })];
            });
        });
    };
    LocalState.prototype.resolveField = function (field, rootValue, execContext) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                variables = execContext.variables;
                fieldName = field.name.value;
                aliasedFieldName = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["resultKeyNameFromField"])(field);
                aliasUsed = fieldName !== aliasedFieldName;
                defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
                resultPromise = Promise.resolve(defaultResult);
                if (!execContext.onlyRunForcedResolvers ||
                    this.shouldForceResolvers(field)) {
                    resolverType = rootValue.__typename || execContext.defaultOperationType;
                    resolverMap = this.resolvers && this.resolvers[resolverType];
                    if (resolverMap) {
                        resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
                        if (resolve) {
                            resultPromise = Promise.resolve(resolve(rootValue, Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["argumentsObjectFromField"])(field, variables), execContext.context, { field: field, fragmentMap: execContext.fragmentMap }));
                        }
                    }
                }
                return [2, resultPromise.then(function (result) {
                        if (result === void 0) { result = defaultResult; }
                        if (field.directives) {
                            field.directives.forEach(function (directive) {
                                if (directive.name.value === 'export' && directive.arguments) {
                                    directive.arguments.forEach(function (arg) {
                                        if (arg.name.value === 'as' && arg.value.kind === 'StringValue') {
                                            execContext.exportedVariables[arg.value.value] = result;
                                        }
                                    });
                                }
                            });
                        }
                        if (!field.selectionSet) {
                            return result;
                        }
                        if (result == null) {
                            return result;
                        }
                        if (Array.isArray(result)) {
                            return _this.resolveSubSelectedArray(field, result, execContext);
                        }
                        if (field.selectionSet) {
                            return _this.resolveSelectionSet(field.selectionSet, result, execContext);
                        }
                    })];
            });
        });
    };
    LocalState.prototype.resolveSubSelectedArray = function (field, result, execContext) {
        var _this = this;
        return Promise.all(result.map(function (item) {
            if (item === null) {
                return null;
            }
            if (Array.isArray(item)) {
                return _this.resolveSubSelectedArray(field, item, execContext);
            }
            if (field.selectionSet) {
                return _this.resolveSelectionSet(field.selectionSet, item, execContext);
            }
        }));
    };
    return LocalState;
}());

function multiplex(inner) {
    var observers = new Set();
    var sub = null;
    return new Observable(function (observer) {
        observers.add(observer);
        sub = sub || inner.subscribe({
            next: function (value) {
                observers.forEach(function (obs) { return obs.next && obs.next(value); });
            },
            error: function (error) {
                observers.forEach(function (obs) { return obs.error && obs.error(error); });
            },
            complete: function () {
                observers.forEach(function (obs) { return obs.complete && obs.complete(); });
            },
        });
        return function () {
            if (observers.delete(observer) && !observers.size && sub) {
                sub.unsubscribe();
                sub = null;
            }
        };
    });
}
function asyncMap(observable, mapFn) {
    return new Observable(function (observer) {
        var next = observer.next, error = observer.error, complete = observer.complete;
        var activeNextCount = 0;
        var completed = false;
        var handler = {
            next: function (value) {
                ++activeNextCount;
                new Promise(function (resolve) {
                    resolve(mapFn(value));
                }).then(function (result) {
                    --activeNextCount;
                    next && next.call(observer, result);
                    completed && handler.complete();
                }, function (e) {
                    --activeNextCount;
                    error && error.call(observer, e);
                });
            },
            error: function (e) {
                error && error.call(observer, e);
            },
            complete: function () {
                completed = true;
                if (!activeNextCount) {
                    complete && complete.call(observer);
                }
            },
        };
        var sub = observable.subscribe(handler);
        return function () { return sub.unsubscribe(); };
    });
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var QueryManager = (function () {
    function QueryManager(_a) {
        var link = _a.link, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, store = _a.store, _c = _a.onBroadcast, onBroadcast = _c === void 0 ? function () { return undefined; } : _c, _d = _a.ssrMode, ssrMode = _d === void 0 ? false : _d, _e = _a.clientAwareness, clientAwareness = _e === void 0 ? {} : _e, localState = _a.localState, assumeImmutableResults = _a.assumeImmutableResults;
        this.mutationStore = new MutationStore();
        this.queryStore = new QueryStore();
        this.clientAwareness = {};
        this.idCounter = 1;
        this.queries = new Map();
        this.fetchQueryRejectFns = new Map();
        this.transformCache = new (apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["canUseWeakMap"] ? WeakMap : Map)();
        this.inFlightLinkObservables = new Map();
        this.pollingInfoByQueryId = new Map();
        this.link = link;
        this.queryDeduplication = queryDeduplication;
        this.dataStore = store;
        this.onBroadcast = onBroadcast;
        this.clientAwareness = clientAwareness;
        this.localState = localState || new LocalState({ cache: store.getCache() });
        this.ssrMode = ssrMode;
        this.assumeImmutableResults = !!assumeImmutableResults;
    }
    QueryManager.prototype.stop = function () {
        var _this = this;
        this.queries.forEach(function (_info, queryId) {
            _this.stopQueryNoBroadcast(queryId);
        });
        this.fetchQueryRejectFns.forEach(function (reject) {
            reject( false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]('QueryManager stopped while query was in flight'));
        });
    };
    QueryManager.prototype.mutate = function (_a) {
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, _c = _a.awaitRefetchQueries, awaitRefetchQueries = _c === void 0 ? false : _c, updateWithProxyFn = _a.update, _d = _a.errorPolicy, errorPolicy = _d === void 0 ? 'none' : _d, fetchPolicy = _a.fetchPolicy, _e = _a.context, context = _e === void 0 ? {} : _e;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var mutationId, generateUpdateQueriesInfo, self;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_f) {
                switch (_f.label) {
                    case 0:
                         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(mutation, 'mutation option is required. You must specify your GraphQL document in the mutation option.');
                         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!fetchPolicy || fetchPolicy === 'no-cache', "Mutations only support a 'no-cache' fetchPolicy. If you don't want to disable the cache, remove your fetchPolicy setting to proceed with the default mutation behavior.");
                        mutationId = this.generateQueryId();
                        mutation = this.transform(mutation).document;
                        this.setQuery(mutationId, function () { return ({ document: mutation }); });
                        variables = this.getVariables(mutation, variables);
                        if (!this.transform(mutation).hasClientExports) return [3, 2];
                        return [4, this.localState.addExportedVariables(mutation, variables, context)];
                    case 1:
                        variables = _f.sent();
                        _f.label = 2;
                    case 2:
                        generateUpdateQueriesInfo = function () {
                            var ret = {};
                            if (updateQueriesByName) {
                                _this.queries.forEach(function (_a, queryId) {
                                    var observableQuery = _a.observableQuery;
                                    if (observableQuery) {
                                        var queryName = observableQuery.queryName;
                                        if (queryName &&
                                            hasOwnProperty.call(updateQueriesByName, queryName)) {
                                            ret[queryId] = {
                                                updater: updateQueriesByName[queryName],
                                                query: _this.queryStore.get(queryId),
                                            };
                                        }
                                    }
                                });
                            }
                            return ret;
                        };
                        this.mutationStore.initMutation(mutationId, mutation, variables);
                        this.dataStore.markMutationInit({
                            mutationId: mutationId,
                            document: mutation,
                            variables: variables,
                            updateQueries: generateUpdateQueriesInfo(),
                            update: updateWithProxyFn,
                            optimisticResponse: optimisticResponse,
                        });
                        this.broadcastQueries();
                        self = this;
                        return [2, new Promise(function (resolve, reject) {
                                var storeResult;
                                var error;
                                self.getObservableFromLink(mutation, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), { optimisticResponse: optimisticResponse }), variables, false).subscribe({
                                    next: function (result) {
                                        if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result) && errorPolicy === 'none') {
                                            error = new ApolloError({
                                                graphQLErrors: result.errors,
                                            });
                                            return;
                                        }
                                        self.mutationStore.markMutationResult(mutationId);
                                        if (fetchPolicy !== 'no-cache') {
                                            self.dataStore.markMutationResult({
                                                mutationId: mutationId,
                                                result: result,
                                                document: mutation,
                                                variables: variables,
                                                updateQueries: generateUpdateQueriesInfo(),
                                                update: updateWithProxyFn,
                                            });
                                        }
                                        storeResult = result;
                                    },
                                    error: function (err) {
                                        self.mutationStore.markMutationError(mutationId, err);
                                        self.dataStore.markMutationComplete({
                                            mutationId: mutationId,
                                            optimisticResponse: optimisticResponse,
                                        });
                                        self.broadcastQueries();
                                        self.setQuery(mutationId, function () { return ({ document: null }); });
                                        reject(new ApolloError({
                                            networkError: err,
                                        }));
                                    },
                                    complete: function () {
                                        if (error) {
                                            self.mutationStore.markMutationError(mutationId, error);
                                        }
                                        self.dataStore.markMutationComplete({
                                            mutationId: mutationId,
                                            optimisticResponse: optimisticResponse,
                                        });
                                        self.broadcastQueries();
                                        if (error) {
                                            reject(error);
                                            return;
                                        }
                                        if (typeof refetchQueries === 'function') {
                                            refetchQueries = refetchQueries(storeResult);
                                        }
                                        var refetchQueryPromises = [];
                                        if (isNonEmptyArray(refetchQueries)) {
                                            refetchQueries.forEach(function (refetchQuery) {
                                                if (typeof refetchQuery === 'string') {
                                                    self.queries.forEach(function (_a) {
                                                        var observableQuery = _a.observableQuery;
                                                        if (observableQuery &&
                                                            observableQuery.queryName === refetchQuery) {
                                                            refetchQueryPromises.push(observableQuery.refetch());
                                                        }
                                                    });
                                                }
                                                else {
                                                    var queryOptions = {
                                                        query: refetchQuery.query,
                                                        variables: refetchQuery.variables,
                                                        fetchPolicy: 'network-only',
                                                    };
                                                    if (refetchQuery.context) {
                                                        queryOptions.context = refetchQuery.context;
                                                    }
                                                    refetchQueryPromises.push(self.query(queryOptions));
                                                }
                                            });
                                        }
                                        Promise.all(awaitRefetchQueries ? refetchQueryPromises : []).then(function () {
                                            self.setQuery(mutationId, function () { return ({ document: null }); });
                                            if (errorPolicy === 'ignore' &&
                                                storeResult &&
                                                Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(storeResult)) {
                                                delete storeResult.errors;
                                            }
                                            resolve(storeResult);
                                        });
                                    },
                                });
                            })];
                }
            });
        });
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, metadata, _b, fetchPolicy, _c, context, query, variables, storeResult, isNetworkOnly, needToFetch, _d, complete, result, shouldFetch, requestId, cancel, networkResult;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = options.metadata, metadata = _a === void 0 ? null : _a, _b = options.fetchPolicy, fetchPolicy = _b === void 0 ? 'cache-first' : _b, _c = options.context, context = _c === void 0 ? {} : _c;
                        query = this.transform(options.query).document;
                        variables = this.getVariables(query, options.variables);
                        if (!this.transform(query).hasClientExports) return [3, 2];
                        return [4, this.localState.addExportedVariables(query, variables, context)];
                    case 1:
                        variables = _e.sent();
                        _e.label = 2;
                    case 2:
                        options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { variables: variables });
                        isNetworkOnly = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
                        needToFetch = isNetworkOnly;
                        if (!isNetworkOnly) {
                            _d = this.dataStore.getCache().diff({
                                query: query,
                                variables: variables,
                                returnPartialData: true,
                                optimistic: false,
                            }), complete = _d.complete, result = _d.result;
                            needToFetch = !complete || fetchPolicy === 'cache-and-network';
                            storeResult = result;
                        }
                        shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
                        if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["hasDirectives"])(['live'], query))
                            shouldFetch = true;
                        requestId = this.idCounter++;
                        cancel = fetchPolicy !== 'no-cache'
                            ? this.updateQueryWatch(queryId, query, options)
                            : undefined;
                        this.setQuery(queryId, function () { return ({
                            document: query,
                            lastRequestId: requestId,
                            invalidated: true,
                            cancel: cancel,
                        }); });
                        this.invalidate(fetchMoreForQueryId);
                        this.queryStore.initQuery({
                            queryId: queryId,
                            document: query,
                            storePreviousVariables: shouldFetch,
                            variables: variables,
                            isPoll: fetchType === FetchType.poll,
                            isRefetch: fetchType === FetchType.refetch,
                            metadata: metadata,
                            fetchMoreForQueryId: fetchMoreForQueryId,
                        });
                        this.broadcastQueries();
                        if (shouldFetch) {
                            networkResult = this.fetchRequest({
                                requestId: requestId,
                                queryId: queryId,
                                document: query,
                                options: options,
                                fetchMoreForQueryId: fetchMoreForQueryId,
                            }).catch(function (error) {
                                if (isApolloError(error)) {
                                    throw error;
                                }
                                else {
                                    if (requestId >= _this.getQuery(queryId).lastRequestId) {
                                        _this.queryStore.markQueryError(queryId, error, fetchMoreForQueryId);
                                        _this.invalidate(queryId);
                                        _this.invalidate(fetchMoreForQueryId);
                                        _this.broadcastQueries();
                                    }
                                    throw new ApolloError({ networkError: error });
                                }
                            });
                            if (fetchPolicy !== 'cache-and-network') {
                                return [2, networkResult];
                            }
                            networkResult.catch(function () { });
                        }
                        this.queryStore.markQueryResultClient(queryId, !shouldFetch);
                        this.invalidate(queryId);
                        this.invalidate(fetchMoreForQueryId);
                        if (this.transform(query).hasForcedResolvers) {
                            return [2, this.localState.runResolvers({
                                    document: query,
                                    remoteResult: { data: storeResult },
                                    context: context,
                                    variables: variables,
                                    onlyRunForcedResolvers: true,
                                }).then(function (result) {
                                    _this.markQueryResult(queryId, result, options, fetchMoreForQueryId);
                                    _this.broadcastQueries();
                                    return result;
                                })];
                        }
                        this.broadcastQueries();
                        return [2, { data: storeResult }];
                }
            });
        });
    };
    QueryManager.prototype.markQueryResult = function (queryId, result, _a, fetchMoreForQueryId) {
        var fetchPolicy = _a.fetchPolicy, variables = _a.variables, errorPolicy = _a.errorPolicy;
        if (fetchPolicy === 'no-cache') {
            this.setQuery(queryId, function () { return ({
                newData: { result: result.data, complete: true },
            }); });
        }
        else {
            this.dataStore.markQueryResult(result, this.getQuery(queryId).document, variables, fetchMoreForQueryId, errorPolicy === 'ignore' || errorPolicy === 'all');
        }
    };
    QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
        var _this = this;
        function invoke(method, argument) {
            if (observer[method]) {
                try {
                    observer[method](argument);
                }
                catch (e) {
                     false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error(e);
                }
            }
            else if (method === 'error') {
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error(argument);
            }
        }
        return function (queryStoreValue, newData) {
            _this.invalidate(queryId, false);
            if (!queryStoreValue)
                return;
            var _a = _this.getQuery(queryId), observableQuery = _a.observableQuery, document = _a.document;
            var fetchPolicy = observableQuery
                ? observableQuery.options.fetchPolicy
                : options.fetchPolicy;
            if (fetchPolicy === 'standby')
                return;
            var loading = isNetworkRequestInFlight(queryStoreValue.networkStatus);
            var lastResult = observableQuery && observableQuery.getLastResult();
            var networkStatusChanged = !!(lastResult &&
                lastResult.networkStatus !== queryStoreValue.networkStatus);
            var shouldNotifyIfLoading = options.returnPartialData ||
                (!newData && queryStoreValue.previousVariables) ||
                (networkStatusChanged && options.notifyOnNetworkStatusChange) ||
                fetchPolicy === 'cache-only' ||
                fetchPolicy === 'cache-and-network';
            if (loading && !shouldNotifyIfLoading) {
                return;
            }
            var hasGraphQLErrors = isNonEmptyArray(queryStoreValue.graphQLErrors);
            var errorPolicy = observableQuery
                && observableQuery.options.errorPolicy
                || options.errorPolicy
                || 'none';
            if (errorPolicy === 'none' && hasGraphQLErrors || queryStoreValue.networkError) {
                return invoke('error', new ApolloError({
                    graphQLErrors: queryStoreValue.graphQLErrors,
                    networkError: queryStoreValue.networkError,
                }));
            }
            try {
                var data = void 0;
                var isMissing = void 0;
                if (newData) {
                    if (fetchPolicy !== 'no-cache' && fetchPolicy !== 'network-only') {
                        _this.setQuery(queryId, function () { return ({ newData: null }); });
                    }
                    data = newData.result;
                    isMissing = !newData.complete;
                }
                else {
                    var lastError = observableQuery && observableQuery.getLastError();
                    var errorStatusChanged = errorPolicy !== 'none' &&
                        (lastError && lastError.graphQLErrors) !==
                            queryStoreValue.graphQLErrors;
                    if (lastResult && lastResult.data && !errorStatusChanged) {
                        data = lastResult.data;
                        isMissing = false;
                    }
                    else {
                        var diffResult = _this.dataStore.getCache().diff({
                            query: document,
                            variables: queryStoreValue.previousVariables ||
                                queryStoreValue.variables,
                            returnPartialData: true,
                            optimistic: true,
                        });
                        data = diffResult.result;
                        isMissing = !diffResult.complete;
                    }
                }
                var stale = isMissing && !(options.returnPartialData ||
                    fetchPolicy === 'cache-only');
                var resultFromStore = {
                    data: stale ? lastResult && lastResult.data : data,
                    loading: loading,
                    networkStatus: queryStoreValue.networkStatus,
                    stale: stale,
                };
                if (errorPolicy === 'all' && hasGraphQLErrors) {
                    resultFromStore.errors = queryStoreValue.graphQLErrors;
                }
                invoke('next', resultFromStore);
            }
            catch (networkError) {
                invoke('error', new ApolloError({ networkError: networkError }));
            }
        };
    };
    QueryManager.prototype.transform = function (document) {
        var transformCache = this.transformCache;
        if (!transformCache.has(document)) {
            var cache = this.dataStore.getCache();
            var transformed = cache.transformDocument(document);
            var forLink = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["removeConnectionDirectiveFromDocument"])(cache.transformForLink(transformed));
            var clientQuery = this.localState.clientQuery(transformed);
            var serverQuery = this.localState.serverQuery(forLink);
            var cacheEntry_1 = {
                document: transformed,
                hasClientExports: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["hasClientExports"])(transformed),
                hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
                clientQuery: clientQuery,
                serverQuery: serverQuery,
                defaultVars: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getDefaultValues"])(Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationDefinition"])(transformed)),
            };
            var add = function (doc) {
                if (doc && !transformCache.has(doc)) {
                    transformCache.set(doc, cacheEntry_1);
                }
            };
            add(document);
            add(transformed);
            add(clientQuery);
            add(serverQuery);
        }
        return transformCache.get(document);
    };
    QueryManager.prototype.getVariables = function (document, variables) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.transform(document).defaultVars), variables);
    };
    QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
        if (shouldSubscribe === void 0) { shouldSubscribe = true; }
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.fetchPolicy !== 'standby', 'client.watchQuery cannot be called with fetchPolicy set to "standby"');
        options.variables = this.getVariables(options.query, options.variables);
        if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
            options.notifyOnNetworkStatusChange = false;
        }
        var transformedOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options);
        return new ObservableQuery({
            queryManager: this,
            options: transformedOptions,
            shouldSubscribe: shouldSubscribe,
        });
    };
    QueryManager.prototype.query = function (options) {
        var _this = this;
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.query, 'query option is required. You must specify your GraphQL document ' +
            'in the query option.');
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.query.kind === 'Document', 'You must wrap the query string in a "gql" tag.');
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!options.returnPartialData, 'returnPartialData option only supported on watchQuery.');
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!options.pollInterval, 'pollInterval option only supported on watchQuery.');
        return new Promise(function (resolve, reject) {
            var watchedQuery = _this.watchQuery(options, false);
            _this.fetchQueryRejectFns.set("query:" + watchedQuery.queryId, reject);
            watchedQuery
                .result()
                .then(resolve, reject)
                .then(function () {
                return _this.fetchQueryRejectFns.delete("query:" + watchedQuery.queryId);
            });
        });
    };
    QueryManager.prototype.generateQueryId = function () {
        return String(this.idCounter++);
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.stopQueryInStoreNoBroadcast = function (queryId) {
        this.stopPollingQuery(queryId);
        this.queryStore.stopQuery(queryId);
        this.invalidate(queryId);
    };
    QueryManager.prototype.addQueryListener = function (queryId, listener) {
        this.setQuery(queryId, function (_a) {
            var listeners = _a.listeners;
            listeners.add(listener);
            return { invalidated: false };
        });
    };
    QueryManager.prototype.updateQueryWatch = function (queryId, document, options) {
        var _this = this;
        var cancel = this.getQuery(queryId).cancel;
        if (cancel)
            cancel();
        var previousResult = function () {
            var previousResult = null;
            var observableQuery = _this.getQuery(queryId).observableQuery;
            if (observableQuery) {
                var lastResult = observableQuery.getLastResult();
                if (lastResult) {
                    previousResult = lastResult.data;
                }
            }
            return previousResult;
        };
        return this.dataStore.getCache().watch({
            query: document,
            variables: options.variables,
            optimistic: true,
            previousResult: previousResult,
            callback: function (newData) {
                _this.setQuery(queryId, function () { return ({ invalidated: true, newData: newData }); });
            },
        });
    };
    QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
        this.setQuery(queryId, function () { return ({ observableQuery: observableQuery }); });
    };
    QueryManager.prototype.removeObservableQuery = function (queryId) {
        var cancel = this.getQuery(queryId).cancel;
        this.setQuery(queryId, function () { return ({ observableQuery: null }); });
        if (cancel)
            cancel();
    };
    QueryManager.prototype.clearStore = function () {
        this.fetchQueryRejectFns.forEach(function (reject) {
            reject( false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]('Store reset while query was in flight (not completed in link chain)'));
        });
        var resetIds = [];
        this.queries.forEach(function (_a, queryId) {
            var observableQuery = _a.observableQuery;
            if (observableQuery)
                resetIds.push(queryId);
        });
        this.queryStore.reset(resetIds);
        this.mutationStore.reset();
        return this.dataStore.reset();
    };
    QueryManager.prototype.resetStore = function () {
        var _this = this;
        return this.clearStore().then(function () {
            return _this.reFetchObservableQueries();
        });
    };
    QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
        var _this = this;
        if (includeStandby === void 0) { includeStandby = false; }
        var observableQueryPromises = [];
        this.queries.forEach(function (_a, queryId) {
            var observableQuery = _a.observableQuery;
            if (observableQuery) {
                var fetchPolicy = observableQuery.options.fetchPolicy;
                observableQuery.resetLastResults();
                if (fetchPolicy !== 'cache-only' &&
                    (includeStandby || fetchPolicy !== 'standby')) {
                    observableQueryPromises.push(observableQuery.refetch());
                }
                _this.setQuery(queryId, function () { return ({ newData: null }); });
                _this.invalidate(queryId);
            }
        });
        this.broadcastQueries();
        return Promise.all(observableQueryPromises);
    };
    QueryManager.prototype.observeQuery = function (queryId, options, observer) {
        this.addQueryListener(queryId, this.queryListenerForObserver(queryId, options, observer));
        return this.fetchQuery(queryId, options);
    };
    QueryManager.prototype.startQuery = function (queryId, options, listener) {
         false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn("The QueryManager.startQuery method has been deprecated");
        this.addQueryListener(queryId, listener);
        this.fetchQuery(queryId, options)
            .catch(function () { return undefined; });
        return queryId;
    };
    QueryManager.prototype.startGraphQLSubscription = function (_a) {
        var _this = this;
        var query = _a.query, fetchPolicy = _a.fetchPolicy, variables = _a.variables;
        query = this.transform(query).document;
        variables = this.getVariables(query, variables);
        var makeObservable = function (variables) {
            return _this.getObservableFromLink(query, {}, variables, false).map(function (result) {
                if (!fetchPolicy || fetchPolicy !== 'no-cache') {
                    _this.dataStore.markSubscriptionResult(result, query, variables);
                    _this.broadcastQueries();
                }
                if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result)) {
                    throw new ApolloError({
                        graphQLErrors: result.errors,
                    });
                }
                return result;
            });
        };
        if (this.transform(query).hasClientExports) {
            var observablePromise_1 = this.localState.addExportedVariables(query, variables).then(makeObservable);
            return new Observable(function (observer) {
                var sub = null;
                observablePromise_1.then(function (observable) { return sub = observable.subscribe(observer); }, observer.error);
                return function () { return sub && sub.unsubscribe(); };
            });
        }
        return makeObservable(variables);
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.stopQueryNoBroadcast(queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.stopQueryNoBroadcast = function (queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.removeQuery(queryId);
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        this.fetchQueryRejectFns.delete("query:" + queryId);
        this.fetchQueryRejectFns.delete("fetchRequest:" + queryId);
        this.getQuery(queryId).subscriptions.forEach(function (x) { return x.unsubscribe(); });
        this.queries.delete(queryId);
    };
    QueryManager.prototype.getCurrentQueryResult = function (observableQuery, optimistic) {
        if (optimistic === void 0) { optimistic = true; }
        var _a = observableQuery.options, variables = _a.variables, query = _a.query, fetchPolicy = _a.fetchPolicy, returnPartialData = _a.returnPartialData;
        var lastResult = observableQuery.getLastResult();
        var newData = this.getQuery(observableQuery.queryId).newData;
        if (newData && newData.complete) {
            return { data: newData.result, partial: false };
        }
        if (fetchPolicy === 'no-cache' || fetchPolicy === 'network-only') {
            return { data: undefined, partial: false };
        }
        var _b = this.dataStore.getCache().diff({
            query: query,
            variables: variables,
            previousResult: lastResult ? lastResult.data : undefined,
            returnPartialData: true,
            optimistic: optimistic,
        }), result = _b.result, complete = _b.complete;
        return {
            data: (complete || returnPartialData) ? result : void 0,
            partial: !complete,
        };
    };
    QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable) {
        var observableQuery;
        if (typeof queryIdOrObservable === 'string') {
            var foundObserveableQuery = this.getQuery(queryIdOrObservable).observableQuery;
             false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(foundObserveableQuery, "ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
            observableQuery = foundObserveableQuery;
        }
        else {
            observableQuery = queryIdOrObservable;
        }
        var _a = observableQuery.options, variables = _a.variables, query = _a.query;
        return {
            previousResult: this.getCurrentQueryResult(observableQuery, false).data,
            variables: variables,
            document: query,
        };
    };
    QueryManager.prototype.broadcastQueries = function () {
        var _this = this;
        this.onBroadcast();
        this.queries.forEach(function (info, id) {
            if (info.invalidated) {
                info.listeners.forEach(function (listener) {
                    if (listener) {
                        listener(_this.queryStore.get(id), info.newData);
                    }
                });
            }
        });
    };
    QueryManager.prototype.getLocalState = function () {
        return this.localState;
    };
    QueryManager.prototype.getObservableFromLink = function (query, context, variables, deduplication) {
        var _this = this;
        if (deduplication === void 0) { deduplication = this.queryDeduplication; }
        var observable;
        var serverQuery = this.transform(query).serverQuery;
        if (serverQuery) {
            var _a = this, inFlightLinkObservables_1 = _a.inFlightLinkObservables, link = _a.link;
            var operation = {
                query: serverQuery,
                variables: variables,
                operationName: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationName"])(serverQuery) || void 0,
                context: this.prepareContext(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), { forceFetch: !deduplication })),
            };
            context = operation.context;
            if (deduplication) {
                var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || new Map();
                inFlightLinkObservables_1.set(serverQuery, byVariables_1);
                var varJson_1 = JSON.stringify(variables);
                observable = byVariables_1.get(varJson_1);
                if (!observable) {
                    byVariables_1.set(varJson_1, observable = multiplex(Object(apollo_link__WEBPACK_IMPORTED_MODULE_2__["execute"])(link, operation)));
                    var cleanup = function () {
                        byVariables_1.delete(varJson_1);
                        if (!byVariables_1.size)
                            inFlightLinkObservables_1.delete(serverQuery);
                        cleanupSub_1.unsubscribe();
                    };
                    var cleanupSub_1 = observable.subscribe({
                        next: cleanup,
                        error: cleanup,
                        complete: cleanup,
                    });
                }
            }
            else {
                observable = multiplex(Object(apollo_link__WEBPACK_IMPORTED_MODULE_2__["execute"])(link, operation));
            }
        }
        else {
            observable = Observable.of({ data: {} });
            context = this.prepareContext(context);
        }
        var clientQuery = this.transform(query).clientQuery;
        if (clientQuery) {
            observable = asyncMap(observable, function (result) {
                return _this.localState.runResolvers({
                    document: clientQuery,
                    remoteResult: result,
                    context: context,
                    variables: variables,
                });
            });
        }
        return observable;
    };
    QueryManager.prototype.fetchRequest = function (_a) {
        var _this = this;
        var requestId = _a.requestId, queryId = _a.queryId, document = _a.document, options = _a.options, fetchMoreForQueryId = _a.fetchMoreForQueryId;
        var variables = options.variables, _b = options.errorPolicy, errorPolicy = _b === void 0 ? 'none' : _b, fetchPolicy = options.fetchPolicy;
        var resultFromStore;
        var errorsFromStore;
        return new Promise(function (resolve, reject) {
            var observable = _this.getObservableFromLink(document, options.context, variables);
            var fqrfId = "fetchRequest:" + queryId;
            _this.fetchQueryRejectFns.set(fqrfId, reject);
            var cleanup = function () {
                _this.fetchQueryRejectFns.delete(fqrfId);
                _this.setQuery(queryId, function (_a) {
                    var subscriptions = _a.subscriptions;
                    subscriptions.delete(subscription);
                });
            };
            var subscription = observable.map(function (result) {
                if (requestId >= _this.getQuery(queryId).lastRequestId) {
                    _this.markQueryResult(queryId, result, options, fetchMoreForQueryId);
                    _this.queryStore.markQueryResult(queryId, result, fetchMoreForQueryId);
                    _this.invalidate(queryId);
                    _this.invalidate(fetchMoreForQueryId);
                    _this.broadcastQueries();
                }
                if (errorPolicy === 'none' && isNonEmptyArray(result.errors)) {
                    return reject(new ApolloError({
                        graphQLErrors: result.errors,
                    }));
                }
                if (errorPolicy === 'all') {
                    errorsFromStore = result.errors;
                }
                if (fetchMoreForQueryId || fetchPolicy === 'no-cache') {
                    resultFromStore = result.data;
                }
                else {
                    var _a = _this.dataStore.getCache().diff({
                        variables: variables,
                        query: document,
                        optimistic: false,
                        returnPartialData: true,
                    }), result_1 = _a.result, complete = _a.complete;
                    if (complete || options.returnPartialData) {
                        resultFromStore = result_1;
                    }
                }
            }).subscribe({
                error: function (error) {
                    cleanup();
                    reject(error);
                },
                complete: function () {
                    cleanup();
                    resolve({
                        data: resultFromStore,
                        errors: errorsFromStore,
                        loading: false,
                        networkStatus: NetworkStatus.ready,
                        stale: false,
                    });
                },
            });
            _this.setQuery(queryId, function (_a) {
                var subscriptions = _a.subscriptions;
                subscriptions.add(subscription);
            });
        });
    };
    QueryManager.prototype.getQuery = function (queryId) {
        return (this.queries.get(queryId) || {
            listeners: new Set(),
            invalidated: false,
            document: null,
            newData: null,
            lastRequestId: 1,
            observableQuery: null,
            subscriptions: new Set(),
        });
    };
    QueryManager.prototype.setQuery = function (queryId, updater) {
        var prev = this.getQuery(queryId);
        var newInfo = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prev), updater(prev));
        this.queries.set(queryId, newInfo);
    };
    QueryManager.prototype.invalidate = function (queryId, invalidated) {
        if (invalidated === void 0) { invalidated = true; }
        if (queryId) {
            this.setQuery(queryId, function () { return ({ invalidated: invalidated }); });
        }
    };
    QueryManager.prototype.prepareContext = function (context) {
        if (context === void 0) { context = {}; }
        var newContext = this.localState.prepareContext(context);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, newContext), { clientAwareness: this.clientAwareness });
    };
    QueryManager.prototype.checkInFlight = function (queryId) {
        var query = this.queryStore.get(queryId);
        return (query &&
            query.networkStatus !== NetworkStatus.ready &&
            query.networkStatus !== NetworkStatus.error);
    };
    QueryManager.prototype.startPollingQuery = function (options, queryId, listener) {
        var _this = this;
        var pollInterval = options.pollInterval;
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(pollInterval, 'Attempted to start a polling query without a polling interval.');
        if (!this.ssrMode) {
            var info = this.pollingInfoByQueryId.get(queryId);
            if (!info) {
                this.pollingInfoByQueryId.set(queryId, (info = {}));
            }
            info.interval = pollInterval;
            info.options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { fetchPolicy: 'network-only' });
            var maybeFetch_1 = function () {
                var info = _this.pollingInfoByQueryId.get(queryId);
                if (info) {
                    if (_this.checkInFlight(queryId)) {
                        poll_1();
                    }
                    else {
                        _this.fetchQuery(queryId, info.options, FetchType.poll).then(poll_1, poll_1);
                    }
                }
            };
            var poll_1 = function () {
                var info = _this.pollingInfoByQueryId.get(queryId);
                if (info) {
                    clearTimeout(info.timeout);
                    info.timeout = setTimeout(maybeFetch_1, info.interval);
                }
            };
            if (listener) {
                this.addQueryListener(queryId, listener);
            }
            poll_1();
        }
        return queryId;
    };
    QueryManager.prototype.stopPollingQuery = function (queryId) {
        this.pollingInfoByQueryId.delete(queryId);
    };
    return QueryManager;
}());

var DataStore = (function () {
    function DataStore(initialCache) {
        this.cache = initialCache;
    }
    DataStore.prototype.getCache = function () {
        return this.cache;
    };
    DataStore.prototype.markQueryResult = function (result, document, variables, fetchMoreForQueryId, ignoreErrors) {
        if (ignoreErrors === void 0) { ignoreErrors = false; }
        var writeWithErrors = !Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result);
        if (ignoreErrors && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result) && result.data) {
            writeWithErrors = true;
        }
        if (!fetchMoreForQueryId && writeWithErrors) {
            this.cache.write({
                result: result.data,
                dataId: 'ROOT_QUERY',
                query: document,
                variables: variables,
            });
        }
    };
    DataStore.prototype.markSubscriptionResult = function (result, document, variables) {
        if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result)) {
            this.cache.write({
                result: result.data,
                dataId: 'ROOT_SUBSCRIPTION',
                query: document,
                variables: variables,
            });
        }
    };
    DataStore.prototype.markMutationInit = function (mutation) {
        var _this = this;
        if (mutation.optimisticResponse) {
            var optimistic_1;
            if (typeof mutation.optimisticResponse === 'function') {
                optimistic_1 = mutation.optimisticResponse(mutation.variables);
            }
            else {
                optimistic_1 = mutation.optimisticResponse;
            }
            this.cache.recordOptimisticTransaction(function (c) {
                var orig = _this.cache;
                _this.cache = c;
                try {
                    _this.markMutationResult({
                        mutationId: mutation.mutationId,
                        result: { data: optimistic_1 },
                        document: mutation.document,
                        variables: mutation.variables,
                        updateQueries: mutation.updateQueries,
                        update: mutation.update,
                    });
                }
                finally {
                    _this.cache = orig;
                }
            }, mutation.mutationId);
        }
    };
    DataStore.prototype.markMutationResult = function (mutation) {
        var _this = this;
        if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(mutation.result)) {
            var cacheWrites_1 = [{
                    result: mutation.result.data,
                    dataId: 'ROOT_MUTATION',
                    query: mutation.document,
                    variables: mutation.variables,
                }];
            var updateQueries_1 = mutation.updateQueries;
            if (updateQueries_1) {
                Object.keys(updateQueries_1).forEach(function (id) {
                    var _a = updateQueries_1[id], query = _a.query, updater = _a.updater;
                    var _b = _this.cache.diff({
                        query: query.document,
                        variables: query.variables,
                        returnPartialData: true,
                        optimistic: false,
                    }), currentQueryResult = _b.result, complete = _b.complete;
                    if (complete) {
                        var nextQueryResult = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["tryFunctionOrLogError"])(function () {
                            return updater(currentQueryResult, {
                                mutationResult: mutation.result,
                                queryName: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationName"])(query.document) || undefined,
                                queryVariables: query.variables,
                            });
                        });
                        if (nextQueryResult) {
                            cacheWrites_1.push({
                                result: nextQueryResult,
                                dataId: 'ROOT_QUERY',
                                query: query.document,
                                variables: query.variables,
                            });
                        }
                    }
                });
            }
            this.cache.performTransaction(function (c) {
                cacheWrites_1.forEach(function (write) { return c.write(write); });
                var update = mutation.update;
                if (update) {
                    Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["tryFunctionOrLogError"])(function () { return update(c, mutation.result); });
                }
            });
        }
    };
    DataStore.prototype.markMutationComplete = function (_a) {
        var mutationId = _a.mutationId, optimisticResponse = _a.optimisticResponse;
        if (optimisticResponse) {
            this.cache.removeOptimistic(mutationId);
        }
    };
    DataStore.prototype.markUpdateQueryResult = function (document, variables, newResult) {
        this.cache.write({
            result: newResult,
            dataId: 'ROOT_QUERY',
            variables: variables,
            query: document,
        });
    };
    DataStore.prototype.reset = function () {
        return this.cache.reset();
    };
    return DataStore;
}());

var version = "2.6.10";

var hasSuggestedDevtools = false;
var ApolloClient = (function () {
    function ApolloClient(options) {
        var _this = this;
        this.defaultOptions = {};
        this.resetStoreCallbacks = [];
        this.clearStoreCallbacks = [];
        var cache = options.cache, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, connectToDevTools = options.connectToDevTools, _c = options.queryDeduplication, queryDeduplication = _c === void 0 ? true : _c, defaultOptions = options.defaultOptions, _d = options.assumeImmutableResults, assumeImmutableResults = _d === void 0 ? false : _d, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version;
        var link = options.link;
        if (!link && resolvers) {
            link = apollo_link__WEBPACK_IMPORTED_MODULE_2__["ApolloLink"].empty();
        }
        if (!link || !cache) {
            throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]("In order to initialize Apollo Client, you must specify 'link' and 'cache' properties in the options object.\n" +
                "These options are part of the upgrade requirements when migrating from Apollo Client 1.x to Apollo Client 2.x.\n" +
                "For more information, please visit: https://www.apollographql.com/docs/tutorial/client.html#apollo-client-setup");
        }
        this.link = link;
        this.cache = cache;
        this.store = new DataStore(cache);
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.queryDeduplication = queryDeduplication;
        this.defaultOptions = defaultOptions || {};
        this.typeDefs = typeDefs;
        if (ssrForceFetchDelay) {
            setTimeout(function () { return (_this.disableNetworkFetches = false); }, ssrForceFetchDelay);
        }
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.resetStore = this.resetStore.bind(this);
        this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
        var defaultConnectToDevTools =  true &&
            typeof window !== 'undefined' &&
            !window.__APOLLO_CLIENT__;
        if (typeof connectToDevTools === 'undefined'
            ? defaultConnectToDevTools
            : connectToDevTools && typeof window !== 'undefined') {
            window.__APOLLO_CLIENT__ = this;
        }
        if (!hasSuggestedDevtools && "development" !== 'production') {
            hasSuggestedDevtools = true;
            if (typeof window !== 'undefined' &&
                window.document &&
                window.top === window.self) {
                if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    if (window.navigator &&
                        window.navigator.userAgent &&
                        window.navigator.userAgent.indexOf('Chrome') > -1) {
                        console.debug('Download the Apollo DevTools ' +
                            'for a better development experience: ' +
                            'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                    }
                }
            }
        }
        this.version = version;
        this.localState = new LocalState({
            cache: cache,
            client: this,
            resolvers: resolvers,
            fragmentMatcher: fragmentMatcher,
        });
        this.queryManager = new QueryManager({
            link: this.link,
            store: this.store,
            queryDeduplication: queryDeduplication,
            ssrMode: ssrMode,
            clientAwareness: {
                name: clientAwarenessName,
                version: clientAwarenessVersion,
            },
            localState: this.localState,
            assumeImmutableResults: assumeImmutableResults,
            onBroadcast: function () {
                if (_this.devToolsHookCb) {
                    _this.devToolsHookCb({
                        action: {},
                        state: {
                            queries: _this.queryManager.queryStore.getStore(),
                            mutations: _this.queryManager.mutationStore.getStore(),
                        },
                        dataWithOptimisticResults: _this.cache.extract(true),
                    });
                }
            },
        });
    }
    ApolloClient.prototype.stop = function () {
        this.queryManager.stop();
    };
    ApolloClient.prototype.watchQuery = function (options) {
        if (this.defaultOptions.watchQuery) {
            options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.defaultOptions.watchQuery), options);
        }
        if (this.disableNetworkFetches &&
            (options.fetchPolicy === 'network-only' ||
                options.fetchPolicy === 'cache-and-network')) {
            options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.watchQuery(options);
    };
    ApolloClient.prototype.query = function (options) {
        if (this.defaultOptions.query) {
            options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.defaultOptions.query), options);
        }
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.fetchPolicy !== 'cache-and-network', 'The cache-and-network fetchPolicy does not work with client.query, because ' +
            'client.query can only return a single result. Please use client.watchQuery ' +
            'to receive multiple results from the cache and the network, or consider ' +
            'using a different fetchPolicy, such as cache-first or network-only.');
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.query(options);
    };
    ApolloClient.prototype.mutate = function (options) {
        if (this.defaultOptions.mutate) {
            options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.defaultOptions.mutate), options);
        }
        return this.queryManager.mutate(options);
    };
    ApolloClient.prototype.subscribe = function (options) {
        return this.queryManager.startGraphQLSubscription(options);
    };
    ApolloClient.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.cache.readQuery(options, optimistic);
    };
    ApolloClient.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.cache.readFragment(options, optimistic);
    };
    ApolloClient.prototype.writeQuery = function (options) {
        var result = this.cache.writeQuery(options);
        this.queryManager.broadcastQueries();
        return result;
    };
    ApolloClient.prototype.writeFragment = function (options) {
        var result = this.cache.writeFragment(options);
        this.queryManager.broadcastQueries();
        return result;
    };
    ApolloClient.prototype.writeData = function (options) {
        var result = this.cache.writeData(options);
        this.queryManager.broadcastQueries();
        return result;
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.__requestRaw = function (payload) {
        return Object(apollo_link__WEBPACK_IMPORTED_MODULE_2__["execute"])(this.link, payload);
    };
    ApolloClient.prototype.initQueryManager = function () {
         false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn('Calling the initQueryManager method is no longer necessary, ' +
            'and it will be removed from ApolloClient in version 3.0.');
        return this.queryManager;
    };
    ApolloClient.prototype.resetStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () { return _this.queryManager.clearStore(); })
            .then(function () { return Promise.all(_this.resetStoreCallbacks.map(function (fn) { return fn(); })); })
            .then(function () { return _this.reFetchObservableQueries(); });
    };
    ApolloClient.prototype.clearStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () { return _this.queryManager.clearStore(); })
            .then(function () { return Promise.all(_this.clearStoreCallbacks.map(function (fn) { return fn(); })); });
    };
    ApolloClient.prototype.onResetStore = function (cb) {
        var _this = this;
        this.resetStoreCallbacks.push(cb);
        return function () {
            _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    ApolloClient.prototype.onClearStore = function (cb) {
        var _this = this;
        this.clearStoreCallbacks.push(cb);
        return function () {
            _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
        return this.queryManager.reFetchObservableQueries(includeStandby);
    };
    ApolloClient.prototype.extract = function (optimistic) {
        return this.cache.extract(optimistic);
    };
    ApolloClient.prototype.restore = function (serializedState) {
        return this.cache.restore(serializedState);
    };
    ApolloClient.prototype.addResolvers = function (resolvers) {
        this.localState.addResolvers(resolvers);
    };
    ApolloClient.prototype.setResolvers = function (resolvers) {
        this.localState.setResolvers(resolvers);
    };
    ApolloClient.prototype.getResolvers = function () {
        return this.localState.getResolvers();
    };
    ApolloClient.prototype.setLocalStateFragmentMatcher = function (fragmentMatcher) {
        this.localState.setFragmentMatcher(fragmentMatcher);
    };
    return ApolloClient;
}());

/* harmony default export */ __webpack_exports__["default"] = (ApolloClient);

//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/apollo-link-http-common/lib/bundle.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/apollo-link-http-common/lib/bundle.esm.js ***!
  \****************************************************************/
/*! exports provided: checkFetcher, createSignalIfSupported, fallbackHttpConfig, parseAndCheckHttpResponse, selectHttpOptionsAndBody, selectURI, serializeFetchParameter, throwServerError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkFetcher", function() { return checkFetcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSignalIfSupported", function() { return createSignalIfSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fallbackHttpConfig", function() { return fallbackHttpConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAndCheckHttpResponse", function() { return parseAndCheckHttpResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectHttpOptionsAndBody", function() { return selectHttpOptionsAndBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectURI", function() { return selectURI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeFetchParameter", function() { return serializeFetchParameter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwServerError", function() { return throwServerError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_language_printer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql/language/printer */ "./node_modules/graphql/language/printer.mjs");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.esm.js");




var defaultHttpOptions = {
    includeQuery: true,
    includeExtensions: false,
};
var defaultHeaders = {
    accept: '*/*',
    'content-type': 'application/json',
};
var defaultOptions = {
    method: 'POST',
};
var fallbackHttpConfig = {
    http: defaultHttpOptions,
    headers: defaultHeaders,
    options: defaultOptions,
};
var throwServerError = function (response, result, message) {
    var error = new Error(message);
    error.name = 'ServerError';
    error.response = response;
    error.statusCode = response.status;
    error.result = result;
    throw error;
};
var parseAndCheckHttpResponse = function (operations) { return function (response) {
    return (response
        .text()
        .then(function (bodyText) {
        try {
            return JSON.parse(bodyText);
        }
        catch (err) {
            var parseError = err;
            parseError.name = 'ServerParseError';
            parseError.response = response;
            parseError.statusCode = response.status;
            parseError.bodyText = bodyText;
            return Promise.reject(parseError);
        }
    })
        .then(function (result) {
        if (response.status >= 300) {
            throwServerError(response, result, "Response not successful: Received status code " + response.status);
        }
        if (!Array.isArray(result) &&
            !result.hasOwnProperty('data') &&
            !result.hasOwnProperty('errors')) {
            throwServerError(response, result, "Server response was missing for query '" + (Array.isArray(operations)
                ? operations.map(function (op) { return op.operationName; })
                : operations.operationName) + "'.");
        }
        return result;
    }));
}; };
var checkFetcher = function (fetcher) {
    if (!fetcher && typeof fetch === 'undefined') {
        var library = 'unfetch';
        if (typeof window === 'undefined')
            library = 'node-fetch';
        throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_2__["InvariantError"]("\nfetch is not found globally and no fetcher passed, to fix pass a fetch for\nyour environment like https://www.npmjs.com/package/" + library + ".\n\nFor example:\nimport fetch from '" + library + "';\nimport { createHttpLink } from 'apollo-link-http';\n\nconst link = createHttpLink({ uri: '/graphql', fetch: fetch });");
    }
};
var createSignalIfSupported = function () {
    if (typeof AbortController === 'undefined')
        return { controller: false, signal: false };
    var controller = new AbortController();
    var signal = controller.signal;
    return { controller: controller, signal: signal };
};
var selectHttpOptionsAndBody = function (operation, fallbackConfig) {
    var configs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
    }
    var options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, fallbackConfig.options, { headers: fallbackConfig.headers, credentials: fallbackConfig.credentials });
    var http = fallbackConfig.http;
    configs.forEach(function (config) {
        options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options, config.options, { headers: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.headers, config.headers) });
        if (config.credentials)
            options.credentials = config.credentials;
        http = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, http, config.http);
    });
    var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
    var body = { operationName: operationName, variables: variables };
    if (http.includeExtensions)
        body.extensions = extensions;
    if (http.includeQuery)
        body.query = Object(graphql_language_printer__WEBPACK_IMPORTED_MODULE_1__["print"])(query);
    return {
        options: options,
        body: body,
    };
};
var serializeFetchParameter = function (p, label) {
    var serialized;
    try {
        serialized = JSON.stringify(p);
    }
    catch (e) {
        var parseError =  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_2__["InvariantError"]("Network request failed. " + label + " is not serializable: " + e.message);
        parseError.parseError = e;
        throw parseError;
    }
    return serialized;
};
var selectURI = function (operation, fallbackURI) {
    var context = operation.getContext();
    var contextURI = context.uri;
    if (contextURI) {
        return contextURI;
    }
    else if (typeof fallbackURI === 'function') {
        return fallbackURI(operation);
    }
    else {
        return fallbackURI || '/graphql';
    }
};


//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/apollo-link-http/lib/bundle.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/apollo-link-http/lib/bundle.esm.js ***!
  \*********************************************************/
/*! exports provided: HttpLink, createHttpLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLink", function() { return HttpLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHttpLink", function() { return createHttpLink; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-link */ "./node_modules/apollo-link/lib/bundle.esm.js");
/* harmony import */ var apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-link-http-common */ "./node_modules/apollo-link-http-common/lib/bundle.esm.js");




var createHttpLink = function (linkOptions) {
    if (linkOptions === void 0) { linkOptions = {}; }
    var _a = linkOptions.uri, uri = _a === void 0 ? '/graphql' : _a, fetcher = linkOptions.fetch, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, requestOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(linkOptions, ["uri", "fetch", "includeExtensions", "useGETForQueries"]);
    Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["checkFetcher"])(fetcher);
    if (!fetcher) {
        fetcher = fetch;
    }
    var linkConfig = {
        http: { includeExtensions: includeExtensions },
        options: requestOptions.fetchOptions,
        credentials: requestOptions.credentials,
        headers: requestOptions.headers,
    };
    return new apollo_link__WEBPACK_IMPORTED_MODULE_1__["ApolloLink"](function (operation) {
        var chosenURI = Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["selectURI"])(operation, uri);
        var context = operation.getContext();
        var clientAwarenessHeaders = {};
        if (context.clientAwareness) {
            var _a = context.clientAwareness, name_1 = _a.name, version = _a.version;
            if (name_1) {
                clientAwarenessHeaders['apollographql-client-name'] = name_1;
            }
            if (version) {
                clientAwarenessHeaders['apollographql-client-version'] = version;
            }
        }
        var contextHeaders = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, clientAwarenessHeaders, context.headers);
        var contextConfig = {
            http: context.http,
            options: context.fetchOptions,
            credentials: context.credentials,
            headers: contextHeaders,
        };
        var _b = Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["selectHttpOptionsAndBody"])(operation, apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["fallbackHttpConfig"], linkConfig, contextConfig), options = _b.options, body = _b.body;
        var controller;
        if (!options.signal) {
            var _c = Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["createSignalIfSupported"])(), _controller = _c.controller, signal = _c.signal;
            controller = _controller;
            if (controller)
                options.signal = signal;
        }
        var definitionIsMutation = function (d) {
            return d.kind === 'OperationDefinition' && d.operation === 'mutation';
        };
        if (useGETForQueries &&
            !operation.query.definitions.some(definitionIsMutation)) {
            options.method = 'GET';
        }
        if (options.method === 'GET') {
            var _d = rewriteURIForGET(chosenURI, body), newURI = _d.newURI, parseError = _d.parseError;
            if (parseError) {
                return Object(apollo_link__WEBPACK_IMPORTED_MODULE_1__["fromError"])(parseError);
            }
            chosenURI = newURI;
        }
        else {
            try {
                options.body = Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["serializeFetchParameter"])(body, 'Payload');
            }
            catch (parseError) {
                return Object(apollo_link__WEBPACK_IMPORTED_MODULE_1__["fromError"])(parseError);
            }
        }
        return new apollo_link__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (observer) {
            fetcher(chosenURI, options)
                .then(function (response) {
                operation.setContext({ response: response });
                return response;
            })
                .then(Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["parseAndCheckHttpResponse"])(operation))
                .then(function (result) {
                observer.next(result);
                observer.complete();
                return result;
            })
                .catch(function (err) {
                if (err.name === 'AbortError')
                    return;
                if (err.result && err.result.errors && err.result.data) {
                    observer.next(err.result);
                }
                observer.error(err);
            });
            return function () {
                if (controller)
                    controller.abort();
            };
        });
    });
};
function rewriteURIForGET(chosenURI, body) {
    var queryParams = [];
    var addQueryParam = function (key, value) {
        queryParams.push(key + "=" + encodeURIComponent(value));
    };
    if ('query' in body) {
        addQueryParam('query', body.query);
    }
    if (body.operationName) {
        addQueryParam('operationName', body.operationName);
    }
    if (body.variables) {
        var serializedVariables = void 0;
        try {
            serializedVariables = Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["serializeFetchParameter"])(body.variables, 'Variables map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('variables', serializedVariables);
    }
    if (body.extensions) {
        var serializedExtensions = void 0;
        try {
            serializedExtensions = Object(apollo_link_http_common__WEBPACK_IMPORTED_MODULE_2__["serializeFetchParameter"])(body.extensions, 'Extensions map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('extensions', serializedExtensions);
    }
    var fragment = '', preFragment = chosenURI;
    var fragmentStart = chosenURI.indexOf('#');
    if (fragmentStart !== -1) {
        fragment = chosenURI.substr(fragmentStart);
        preFragment = chosenURI.substr(0, fragmentStart);
    }
    var queryParamsPrefix = preFragment.indexOf('?') === -1 ? '?' : '&';
    var newURI = preFragment + queryParamsPrefix + queryParams.join('&') + fragment;
    return { newURI: newURI };
}
var HttpLink = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(HttpLink, _super);
    function HttpLink(opts) {
        return _super.call(this, createHttpLink(opts).request) || this;
    }
    return HttpLink;
}(apollo_link__WEBPACK_IMPORTED_MODULE_1__["ApolloLink"]));


//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/apollo-link/lib/bundle.esm.js":
/*!****************************************************!*\
  !*** ./node_modules/apollo-link/lib/bundle.esm.js ***!
  \****************************************************/
/*! exports provided: Observable, getOperationName, ApolloLink, concat, createOperation, empty, execute, from, fromError, fromPromise, makePromise, split, toPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloLink", function() { return ApolloLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return concat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOperation", function() { return createOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "execute", function() { return execute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromError", function() { return fromError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return fromPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePromise", function() { return makePromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "split", function() { return split; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPromise", function() { return toPromise; });
/* harmony import */ var zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable-ts */ "./node_modules/zen-observable-ts/lib/bundle.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-utilities */ "./node_modules/apollo-utilities/lib/bundle.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOperationName", function() { return apollo_utilities__WEBPACK_IMPORTED_MODULE_3__["getOperationName"]; });








function validateOperation(operation) {
    var OPERATION_FIELDS = [
        'query',
        'operationName',
        'variables',
        'extensions',
        'context',
    ];
    for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
            throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("illegal argument: " + key);
        }
    }
    return operation;
}
var LinkError = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__extends"])(LinkError, _super);
    function LinkError(message, link) {
        var _this = _super.call(this, message) || this;
        _this.link = link;
        return _this;
    }
    return LinkError;
}(Error));
function isTerminating(link) {
    return link.request.length <= 1;
}
function toPromise(observable) {
    var completed = false;
    return new Promise(function (resolve, reject) {
        observable.subscribe({
            next: function (data) {
                if (completed) {
                     false || ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"].warn("Promise Wrapper does not support multiple results from Observable");
                }
                else {
                    completed = true;
                    resolve(data);
                }
            },
            error: reject,
        });
    });
}
var makePromise = toPromise;
function fromPromise(promise) {
    return new zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"](function (observer) {
        promise
            .then(function (value) {
            observer.next(value);
            observer.complete();
        })
            .catch(observer.error.bind(observer));
    });
}
function fromError(errorValue) {
    return new zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"](function (observer) {
        observer.error(errorValue);
    });
}
function transformOperation(operation) {
    var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query,
    };
    if (!transformedOperation.operationName) {
        transformedOperation.operationName =
            typeof transformedOperation.query !== 'string'
                ? Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_3__["getOperationName"])(transformedOperation.query)
                : '';
    }
    return transformedOperation;
}
function createOperation(starting, operation) {
    var context = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, starting);
    var setContext = function (next) {
        if (typeof next === 'function') {
            context = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, context, next(context));
        }
        else {
            context = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, context, next);
        }
    };
    var getContext = function () { return (Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, context)); };
    Object.defineProperty(operation, 'setContext', {
        enumerable: false,
        value: setContext,
    });
    Object.defineProperty(operation, 'getContext', {
        enumerable: false,
        value: getContext,
    });
    Object.defineProperty(operation, 'toKey', {
        enumerable: false,
        value: function () { return getKey(operation); },
    });
    return operation;
}
function getKey(operation) {
    var query = operation.query, variables = operation.variables, operationName = operation.operationName;
    return JSON.stringify([operationName, query, variables]);
}

function passthrough(op, forward) {
    return forward ? forward(op) : zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of();
}
function toLink(handler) {
    return typeof handler === 'function' ? new ApolloLink(handler) : handler;
}
function empty() {
    return new ApolloLink(function () { return zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of(); });
}
function from(links) {
    if (links.length === 0)
        return empty();
    return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
}
function split(test, left, right) {
    var leftLink = toLink(left);
    var rightLink = toLink(right || new ApolloLink(passthrough));
    if (isTerminating(leftLink) && isTerminating(rightLink)) {
        return new ApolloLink(function (operation) {
            return test(operation)
                ? leftLink.request(operation) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of()
                : rightLink.request(operation) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return test(operation)
                ? leftLink.request(operation, forward) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of()
                : rightLink.request(operation, forward) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of();
        });
    }
}
var concat = function (first, second) {
    var firstLink = toLink(first);
    if (isTerminating(firstLink)) {
         false || ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"].warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
        return firstLink;
    }
    var nextLink = toLink(second);
    if (isTerminating(nextLink)) {
        return new ApolloLink(function (operation) {
            return firstLink.request(operation, function (op) { return nextLink.request(op) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of(); }) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return (firstLink.request(operation, function (op) {
                return nextLink.request(op, forward) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of();
            }) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of());
        });
    }
};
var ApolloLink = (function () {
    function ApolloLink(request) {
        if (request)
            this.request = request;
    }
    ApolloLink.prototype.split = function (test, left, right) {
        return this.concat(split(test, left, right || new ApolloLink(passthrough)));
    };
    ApolloLink.prototype.concat = function (next) {
        return concat(this, next);
    };
    ApolloLink.prototype.request = function (operation, forward) {
        throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]('request is not implemented');
    };
    ApolloLink.empty = empty;
    ApolloLink.from = from;
    ApolloLink.split = split;
    ApolloLink.execute = execute;
    return ApolloLink;
}());
function execute(link, operation) {
    return (link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || zen_observable_ts__WEBPACK_IMPORTED_MODULE_0__["default"].of());
}


//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/apollo-utilities/lib/bundle.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/apollo-utilities/lib/bundle.esm.js ***!
  \*********************************************************/
/*! exports provided: isEqual, addTypenameToDocument, argumentsObjectFromField, assign, buildQueryFromSelectionSet, canUseWeakMap, checkDocument, cloneDeep, createFragmentMap, getDefaultValues, getDirectiveInfoFromField, getDirectiveNames, getDirectivesFromDocument, getEnv, getFragmentDefinition, getFragmentDefinitions, getFragmentQueryDocument, getInclusionDirectives, getMainDefinition, getMutationDefinition, getOperationDefinition, getOperationDefinitionOrDie, getOperationName, getQueryDefinition, getStoreKeyName, graphQLResultHasError, hasClientExports, hasDirectives, isDevelopment, isEnv, isField, isIdValue, isInlineFragment, isJsonValue, isNumberValue, isProduction, isScalarValue, isTest, maybeDeepFreeze, mergeDeep, mergeDeepArray, removeArgumentsFromDocument, removeClientSetsFromDocument, removeConnectionDirectiveFromDocument, removeDirectivesFromDocument, removeFragmentSpreadFromDocument, resultKeyNameFromField, shouldInclude, storeKeyNameFromField, stripSymbols, toIdValue, tryFunctionOrLogError, valueFromNode, valueToObjectRepresentation, variablesInOperation, warnOnceInDevelopment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTypenameToDocument", function() { return addTypenameToDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "argumentsObjectFromField", function() { return argumentsObjectFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildQueryFromSelectionSet", function() { return buildQueryFromSelectionSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canUseWeakMap", function() { return canUseWeakMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkDocument", function() { return checkDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneDeep", function() { return cloneDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFragmentMap", function() { return createFragmentMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultValues", function() { return getDefaultValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDirectiveInfoFromField", function() { return getDirectiveInfoFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDirectiveNames", function() { return getDirectiveNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDirectivesFromDocument", function() { return getDirectivesFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEnv", function() { return getEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentDefinition", function() { return getFragmentDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentDefinitions", function() { return getFragmentDefinitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentQueryDocument", function() { return getFragmentQueryDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInclusionDirectives", function() { return getInclusionDirectives; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMainDefinition", function() { return getMainDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMutationDefinition", function() { return getMutationDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOperationDefinition", function() { return getOperationDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOperationDefinitionOrDie", function() { return getOperationDefinitionOrDie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOperationName", function() { return getOperationName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryDefinition", function() { return getQueryDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoreKeyName", function() { return getStoreKeyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphQLResultHasError", function() { return graphQLResultHasError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClientExports", function() { return hasClientExports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDirectives", function() { return hasDirectives; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDevelopment", function() { return isDevelopment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnv", function() { return isEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isField", function() { return isField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIdValue", function() { return isIdValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInlineFragment", function() { return isInlineFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isJsonValue", function() { return isJsonValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberValue", function() { return isNumberValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProduction", function() { return isProduction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScalarValue", function() { return isScalarValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTest", function() { return isTest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maybeDeepFreeze", function() { return maybeDeepFreeze; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeep", function() { return mergeDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeepArray", function() { return mergeDeepArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeArgumentsFromDocument", function() { return removeArgumentsFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClientSetsFromDocument", function() { return removeClientSetsFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeConnectionDirectiveFromDocument", function() { return removeConnectionDirectiveFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDirectivesFromDocument", function() { return removeDirectivesFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFragmentSpreadFromDocument", function() { return removeFragmentSpreadFromDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resultKeyNameFromField", function() { return resultKeyNameFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldInclude", function() { return shouldInclude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeKeyNameFromField", function() { return storeKeyNameFromField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripSymbols", function() { return stripSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toIdValue", function() { return toIdValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryFunctionOrLogError", function() { return tryFunctionOrLogError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueFromNode", function() { return valueFromNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueToObjectRepresentation", function() { return valueToObjectRepresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variablesInOperation", function() { return variablesInOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warnOnceInDevelopment", function() { return warnOnceInDevelopment; });
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql/language/visitor */ "./node_modules/graphql/language/visitor.mjs");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fast-json-stable-stringify */ "./node_modules/fast-json-stable-stringify/index.js");
/* harmony import */ var fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/equality.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEqual", function() { return _wry_equality__WEBPACK_IMPORTED_MODULE_4__["equal"]; });







function isScalarValue(value) {
    return ['StringValue', 'BooleanValue', 'EnumValue'].indexOf(value.kind) > -1;
}
function isNumberValue(value) {
    return ['IntValue', 'FloatValue'].indexOf(value.kind) > -1;
}
function isStringValue(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue(value) {
    return value.kind === 'IntValue';
}
function isFloatValue(value) {
    return value.kind === 'FloatValue';
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObjectValue(value) {
    return value.kind === 'ObjectValue';
}
function isListValue(value) {
    return value.kind === 'ListValue';
}
function isEnumValue(value) {
    return value.kind === 'EnumValue';
}
function isNullValue(value) {
    return value.kind === 'NullValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) {
            return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isNullValue(value)) {
        argObj[name.value] = null;
    }
    else {
        throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" +
            'is not supported. Use variables instead of inline arguments to ' +
            'overcome this limitation.');
    }
}
function storeKeyNameFromField(field, variables) {
    var directivesObj = null;
    if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function (directive) {
            directivesObj[directive.name.value] = {};
            if (directive.arguments) {
                directive.arguments.forEach(function (_a) {
                    var name = _a.name, value = _a.value;
                    return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
                });
            }
        });
    }
    var argObj = null;
    if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj, name, value, variables);
        });
    }
    return getStoreKeyName(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES = [
    'connection',
    'include',
    'skip',
    'client',
    'rest',
    'export',
];
function getStoreKeyName(fieldName, args, directives) {
    if (directives &&
        directives['connection'] &&
        directives['connection']['key']) {
        if (directives['connection']['filter'] &&
            directives['connection']['filter'].length > 0) {
            var filterKeys = directives['connection']['filter']
                ? directives['connection']['filter']
                : [];
            filterKeys.sort();
            var queryArgs_1 = args;
            var filteredArgs_1 = {};
            filterKeys.forEach(function (key) {
                filteredArgs_1[key] = queryArgs_1[key];
            });
            return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
        }
        else {
            return directives['connection']['key'];
        }
    }
    var completeFieldName = fieldName;
    if (args) {
        var stringifiedArgs = fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_3___default()(args);
        completeFieldName += "(" + stringifiedArgs + ")";
    }
    if (directives) {
        Object.keys(directives).forEach(function (key) {
            if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
                return;
            if (directives[key] && Object.keys(directives[key]).length) {
                completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
            }
            else {
                completeFieldName += "@" + key;
            }
        });
    }
    return completeFieldName;
}
function argumentsObjectFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
    }
    return null;
}
function resultKeyNameFromField(field) {
    return field.alias ? field.alias.value : field.name.value;
}
function isField(selection) {
    return selection.kind === 'Field';
}
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}
function isIdValue(idObject) {
    return idObject &&
        idObject.type === 'id' &&
        typeof idObject.generated === 'boolean';
}
function toIdValue(idConfig, generated) {
    if (generated === void 0) { generated = false; }
    return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({ type: 'id', generated: generated }, (typeof idConfig === 'string'
        ? { id: idConfig, typename: undefined }
        : idConfig));
}
function isJsonValue(jsonObject) {
    return (jsonObject != null &&
        typeof jsonObject === 'object' &&
        jsonObject.type === 'json');
}
function defaultValueFromVariable(node) {
    throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("Variable nodes are not supported by valueFromNode");
}
function valueFromNode(node, onVariable) {
    if (onVariable === void 0) { onVariable = defaultValueFromVariable; }
    switch (node.kind) {
        case 'Variable':
            return onVariable(node);
        case 'NullValue':
            return null;
        case 'IntValue':
            return parseInt(node.value, 10);
        case 'FloatValue':
            return parseFloat(node.value);
        case 'ListValue':
            return node.values.map(function (v) { return valueFromNode(v, onVariable); });
        case 'ObjectValue': {
            var value = {};
            for (var _i = 0, _a = node.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                value[field.name.value] = valueFromNode(field.value, onVariable);
            }
            return value;
        }
        default:
            return node.value;
    }
}

function getDirectiveInfoFromField(field, variables) {
    if (field.directives && field.directives.length) {
        var directiveObj_1 = {};
        field.directives.forEach(function (directive) {
            directiveObj_1[directive.name.value] = argumentsObjectFromField(directive, variables);
        });
        return directiveObj_1;
    }
    return null;
}
function shouldInclude(selection, variables) {
    if (variables === void 0) { variables = {}; }
    return getInclusionDirectives(selection.directives).every(function (_a) {
        var directive = _a.directive, ifArgument = _a.ifArgument;
        var evaledValue = false;
        if (ifArgument.value.kind === 'Variable') {
            evaledValue = variables[ifArgument.value.name.value];
             false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(evaledValue !== void 0, "Invalid variable referenced in @" + directive.name.value + " directive.");
        }
        else {
            evaledValue = ifArgument.value.value;
        }
        return directive.name.value === 'skip' ? !evaledValue : evaledValue;
    });
}
function getDirectiveNames(doc) {
    var names = [];
    Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
        Directive: function (node) {
            names.push(node.name.value);
        },
    });
    return names;
}
function hasDirectives(names, doc) {
    return getDirectiveNames(doc).some(function (name) { return names.indexOf(name) > -1; });
}
function hasClientExports(document) {
    return (document &&
        hasDirectives(['client'], document) &&
        hasDirectives(['export'], document));
}
function isInclusionDirective(_a) {
    var value = _a.name.value;
    return value === 'skip' || value === 'include';
}
function getInclusionDirectives(directives) {
    return directives ? directives.filter(isInclusionDirective).map(function (directive) {
        var directiveArguments = directive.arguments;
        var directiveName = directive.name.value;
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @" + directiveName + " directive.");
        var ifArgument = directiveArguments[0];
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(ifArgument.name && ifArgument.name.value === 'if', "Invalid argument for the @" + directiveName + " directive.");
        var ifValue = ifArgument.value;
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(ifValue &&
            (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), "Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
        return { directive: directive, ifArgument: ifArgument };
    }) : [];
}

function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        }
        if (definition.kind === 'FragmentDefinition') {
            fragments.push(definition);
        }
    });
    if (typeof actualFragmentName === 'undefined') {
         false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(fragments.length === 1, "Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
        actualFragmentName = fragments[0].name.value;
    }
    var query = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, document), { definitions: Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spreadArrays"])([
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'FragmentSpread',
                            name: {
                                kind: 'Name',
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ], document.definitions) });
    return query;
}

function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (typeof source === 'undefined' || source === null) {
            return;
        }
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}

function getMutationDefinition(doc) {
    checkDocument(doc);
    var mutationDef = doc.definitions.filter(function (definition) {
        return definition.kind === 'OperationDefinition' &&
            definition.operation === 'mutation';
    })[0];
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(mutationDef, 'Must contain a mutation definition.');
    return mutationDef;
}
function checkDocument(doc) {
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(doc && doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    var operations = doc.definitions
        .filter(function (d) { return d.kind !== 'FragmentDefinition'; })
        .map(function (definition) {
        if (definition.kind !== 'OperationDefinition') {
            throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
        return definition;
    });
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(operations.length <= 1, "Ambiguous GraphQL document: contains " + operations.length + " operations");
    return doc;
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    return doc.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; })[0];
}
function getOperationDefinitionOrDie(document) {
    var def = getOperationDefinition(document);
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(def, "GraphQL document is missing an operation");
    return def;
}
function getOperationName(doc) {
    return (doc.definitions
        .filter(function (definition) {
        return definition.kind === 'OperationDefinition' && definition.name;
    })
        .map(function (x) { return x.name.value; })[0] || null);
}
function getFragmentDefinitions(doc) {
    return doc.definitions.filter(function (definition) { return definition.kind === 'FragmentDefinition'; });
}
function getQueryDefinition(doc) {
    var queryDef = getOperationDefinition(doc);
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(queryDef && queryDef.operation === 'query', 'Must contain a query definition.');
    return queryDef;
}
function getFragmentDefinition(doc) {
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(doc.definitions.length <= 1, 'Fragment must have exactly one definition.');
    var fragmentDef = doc.definitions[0];
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"])(fragmentDef.kind === 'FragmentDefinition', 'Must be a fragment definition.');
    return fragmentDef;
}
function getMainDefinition(queryDoc) {
    checkDocument(queryDoc);
    var fragmentDefinition;
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'OperationDefinition') {
            var operation = definition.operation;
            if (operation === 'query' ||
                operation === 'mutation' ||
                operation === 'subscription') {
                return definition;
            }
        }
        if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
            fragmentDefinition = definition;
        }
    }
    if (fragmentDefinition) {
        return fragmentDefinition;
    }
    throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__["InvariantError"]('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getDefaultValues(definition) {
    if (definition &&
        definition.variableDefinitions &&
        definition.variableDefinitions.length) {
        var defaultValues = definition.variableDefinitions
            .filter(function (_a) {
            var defaultValue = _a.defaultValue;
            return defaultValue;
        })
            .map(function (_a) {
            var variable = _a.variable, defaultValue = _a.defaultValue;
            var defaultValueObj = {};
            valueToObjectRepresentation(defaultValueObj, variable.name, defaultValue);
            return defaultValueObj;
        });
        return assign.apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spreadArrays"])([{}], defaultValues));
    }
    return {};
}
function variablesInOperation(operation) {
    var names = new Set();
    if (operation.variableDefinitions) {
        for (var _i = 0, _a = operation.variableDefinitions; _i < _a.length; _i++) {
            var definition = _a[_i];
            names.add(definition.variable.name.value);
        }
    }
    return names;
}

function filterInPlace(array, test, context) {
    var target = 0;
    array.forEach(function (elem, i) {
        if (test.call(this, elem, i, array)) {
            array[target++] = elem;
        }
    }, context);
    array.length = target;
    return array;
}

var TYPENAME_FIELD = {
    kind: 'Field',
    name: {
        kind: 'Name',
        value: '__typename',
    },
};
function isEmpty(op, fragments) {
    return op.selectionSet.selections.every(function (selection) {
        return selection.kind === 'FragmentSpread' &&
            isEmpty(fragments[selection.name.value], fragments);
    });
}
function nullIfDocIsEmpty(doc) {
    return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc)))
        ? null
        : doc;
}
function getDirectiveMatcher(directives) {
    return function directiveMatcher(directive) {
        return directives.some(function (dir) {
            return (dir.name && dir.name === directive.name.value) ||
                (dir.test && dir.test(directive));
        });
    };
}
function removeDirectivesFromDocument(directives, doc) {
    var variablesInUse = Object.create(null);
    var variablesToRemove = [];
    var fragmentSpreadsInUse = Object.create(null);
    var fragmentSpreadsToRemove = [];
    var modifiedDoc = nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
        Variable: {
            enter: function (node, _key, parent) {
                if (parent.kind !== 'VariableDefinition') {
                    variablesInUse[node.name.value] = true;
                }
            },
        },
        Field: {
            enter: function (node) {
                if (directives && node.directives) {
                    var shouldRemoveField = directives.some(function (directive) { return directive.remove; });
                    if (shouldRemoveField &&
                        node.directives &&
                        node.directives.some(getDirectiveMatcher(directives))) {
                        if (node.arguments) {
                            node.arguments.forEach(function (arg) {
                                if (arg.value.kind === 'Variable') {
                                    variablesToRemove.push({
                                        name: arg.value.name.value,
                                    });
                                }
                            });
                        }
                        if (node.selectionSet) {
                            getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function (frag) {
                                fragmentSpreadsToRemove.push({
                                    name: frag.name.value,
                                });
                            });
                        }
                        return null;
                    }
                }
            },
        },
        FragmentSpread: {
            enter: function (node) {
                fragmentSpreadsInUse[node.name.value] = true;
            },
        },
        Directive: {
            enter: function (node) {
                if (getDirectiveMatcher(directives)(node)) {
                    return null;
                }
            },
        },
    }));
    if (modifiedDoc &&
        filterInPlace(variablesToRemove, function (v) { return !variablesInUse[v.name]; }).length) {
        modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
    }
    if (modifiedDoc &&
        filterInPlace(fragmentSpreadsToRemove, function (fs) { return !fragmentSpreadsInUse[fs.name]; })
            .length) {
        modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
    }
    return modifiedDoc;
}
function addTypenameToDocument(doc) {
    return Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(checkDocument(doc), {
        SelectionSet: {
            enter: function (node, _key, parent) {
                if (parent &&
                    parent.kind === 'OperationDefinition') {
                    return;
                }
                var selections = node.selections;
                if (!selections) {
                    return;
                }
                var skip = selections.some(function (selection) {
                    return (isField(selection) &&
                        (selection.name.value === '__typename' ||
                            selection.name.value.lastIndexOf('__', 0) === 0));
                });
                if (skip) {
                    return;
                }
                var field = parent;
                if (isField(field) &&
                    field.directives &&
                    field.directives.some(function (d) { return d.name.value === 'export'; })) {
                    return;
                }
                return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), { selections: Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spreadArrays"])(selections, [TYPENAME_FIELD]) });
            },
        },
    });
}
var connectionRemoveConfig = {
    test: function (directive) {
        var willRemove = directive.name.value === 'connection';
        if (willRemove) {
            if (!directive.arguments ||
                !directive.arguments.some(function (arg) { return arg.name.value === 'key'; })) {
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_1__["invariant"].warn('Removing an @connection directive even though it does not have a key. ' +
                    'You may want to use the key parameter to specify a store key.');
            }
        }
        return willRemove;
    },
};
function removeConnectionDirectiveFromDocument(doc) {
    return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
}
function hasDirectivesInSelectionSet(directives, selectionSet, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    return (selectionSet &&
        selectionSet.selections &&
        selectionSet.selections.some(function (selection) {
            return hasDirectivesInSelection(directives, selection, nestedCheck);
        }));
}
function hasDirectivesInSelection(directives, selection, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    if (!isField(selection)) {
        return true;
    }
    if (!selection.directives) {
        return false;
    }
    return (selection.directives.some(getDirectiveMatcher(directives)) ||
        (nestedCheck &&
            hasDirectivesInSelectionSet(directives, selection.selectionSet, nestedCheck)));
}
function getDirectivesFromDocument(directives, doc) {
    checkDocument(doc);
    var parentPath;
    return nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
        SelectionSet: {
            enter: function (node, _key, _parent, path) {
                var currentPath = path.join('-');
                if (!parentPath ||
                    currentPath === parentPath ||
                    !currentPath.startsWith(parentPath)) {
                    if (node.selections) {
                        var selectionsWithDirectives = node.selections.filter(function (selection) { return hasDirectivesInSelection(directives, selection); });
                        if (hasDirectivesInSelectionSet(directives, node, false)) {
                            parentPath = currentPath;
                        }
                        return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), { selections: selectionsWithDirectives });
                    }
                    else {
                        return null;
                    }
                }
            },
        },
    }));
}
function getArgumentMatcher(config) {
    return function argumentMatcher(argument) {
        return config.some(function (aConfig) {
            return argument.value &&
                argument.value.kind === 'Variable' &&
                argument.value.name &&
                (aConfig.name === argument.value.name.value ||
                    (aConfig.test && aConfig.test(argument)));
        });
    };
}
function removeArgumentsFromDocument(config, doc) {
    var argMatcher = getArgumentMatcher(config);
    return nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
        OperationDefinition: {
            enter: function (node) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), { variableDefinitions: node.variableDefinitions.filter(function (varDef) {
                        return !config.some(function (arg) { return arg.name === varDef.variable.name.value; });
                    }) });
            },
        },
        Field: {
            enter: function (node) {
                var shouldRemoveField = config.some(function (argConfig) { return argConfig.remove; });
                if (shouldRemoveField) {
                    var argMatchCount_1 = 0;
                    node.arguments.forEach(function (arg) {
                        if (argMatcher(arg)) {
                            argMatchCount_1 += 1;
                        }
                    });
                    if (argMatchCount_1 === 1) {
                        return null;
                    }
                }
            },
        },
        Argument: {
            enter: function (node) {
                if (argMatcher(node)) {
                    return null;
                }
            },
        },
    }));
}
function removeFragmentSpreadFromDocument(config, doc) {
    function enter(node) {
        if (config.some(function (def) { return def.name === node.name.value; })) {
            return null;
        }
    }
    return nullIfDocIsEmpty(Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(doc, {
        FragmentSpread: { enter: enter },
        FragmentDefinition: { enter: enter },
    }));
}
function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
    var allFragments = [];
    selectionSet.selections.forEach(function (selection) {
        if ((isField(selection) || isInlineFragment(selection)) &&
            selection.selectionSet) {
            getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function (frag) { return allFragments.push(frag); });
        }
        else if (selection.kind === 'FragmentSpread') {
            allFragments.push(selection);
        }
    });
    return allFragments;
}
function buildQueryFromSelectionSet(document) {
    var definition = getMainDefinition(document);
    var definitionOperation = definition.operation;
    if (definitionOperation === 'query') {
        return document;
    }
    var modifiedDoc = Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(document, {
        OperationDefinition: {
            enter: function (node) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({}, node), { operation: 'query' });
            },
        },
    });
    return modifiedDoc;
}
function removeClientSetsFromDocument(document) {
    checkDocument(document);
    var modifiedDoc = removeDirectivesFromDocument([
        {
            test: function (directive) { return directive.name.value === 'client'; },
            remove: true,
        },
    ], document);
    if (modifiedDoc) {
        modifiedDoc = Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_0__["visit"])(modifiedDoc, {
            FragmentDefinition: {
                enter: function (node) {
                    if (node.selectionSet) {
                        var isTypenameOnly = node.selectionSet.selections.every(function (selection) {
                            return isField(selection) && selection.name.value === '__typename';
                        });
                        if (isTypenameOnly) {
                            return null;
                        }
                    }
                },
            },
        });
    }
    return modifiedDoc;
}

var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' &&
    navigator.product === 'ReactNative');

var toString = Object.prototype.toString;
function cloneDeep(value) {
    return cloneDeepHelper(value, new Map());
}
function cloneDeepHelper(val, seen) {
    switch (toString.call(val)) {
        case "[object Array]": {
            if (seen.has(val))
                return seen.get(val);
            var copy_1 = val.slice(0);
            seen.set(val, copy_1);
            copy_1.forEach(function (child, i) {
                copy_1[i] = cloneDeepHelper(child, seen);
            });
            return copy_1;
        }
        case "[object Object]": {
            if (seen.has(val))
                return seen.get(val);
            var copy_2 = Object.create(Object.getPrototypeOf(val));
            seen.set(val, copy_2);
            Object.keys(val).forEach(function (key) {
                copy_2[key] = cloneDeepHelper(val[key], seen);
            });
            return copy_2;
        }
        default:
            return val;
    }
}

function getEnv() {
    if (typeof process !== 'undefined' && "development") {
        return "development";
    }
    return 'development';
}
function isEnv(env) {
    return getEnv() === env;
}
function isProduction() {
    return isEnv('production') === true;
}
function isDevelopment() {
    return isEnv('development') === true;
}
function isTest() {
    return isEnv('test') === true;
}

function tryFunctionOrLogError(f) {
    try {
        return f();
    }
    catch (e) {
        if (console.error) {
            console.error(e);
        }
    }
}
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}

function deepFreeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o[prop] !== null &&
            (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
            !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });
    return o;
}
function maybeDeepFreeze(obj) {
    if (isDevelopment() || isTest()) {
        var symbolIsPolyfilled = typeof Symbol === 'function' && typeof Symbol('') === 'string';
        if (!symbolIsPolyfilled) {
            return deepFreeze(obj);
        }
    }
    return obj;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function mergeDeep() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return mergeDeepArray(sources);
}
function mergeDeepArray(sources) {
    var target = sources[0] || {};
    var count = sources.length;
    if (count > 1) {
        var pastCopies = [];
        target = shallowCopyForMerge(target, pastCopies);
        for (var i = 1; i < count; ++i) {
            target = mergeHelper(target, sources[i], pastCopies);
        }
    }
    return target;
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
function mergeHelper(target, source, pastCopies) {
    if (isObject(source) && isObject(target)) {
        if (Object.isExtensible && !Object.isExtensible(target)) {
            target = shallowCopyForMerge(target, pastCopies);
        }
        Object.keys(source).forEach(function (sourceKey) {
            var sourceValue = source[sourceKey];
            if (hasOwnProperty.call(target, sourceKey)) {
                var targetValue = target[sourceKey];
                if (sourceValue !== targetValue) {
                    target[sourceKey] = mergeHelper(shallowCopyForMerge(targetValue, pastCopies), sourceValue, pastCopies);
                }
            }
            else {
                target[sourceKey] = sourceValue;
            }
        });
        return target;
    }
    return source;
}
function shallowCopyForMerge(value, pastCopies) {
    if (value !== null &&
        typeof value === 'object' &&
        pastCopies.indexOf(value) < 0) {
        if (Array.isArray(value)) {
            value = value.slice(0);
        }
        else {
            value = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__assign"])({ __proto__: Object.getPrototypeOf(value) }, value);
        }
        pastCopies.push(value);
    }
    return value;
}

var haveWarned = Object.create({});
function warnOnceInDevelopment(msg, type) {
    if (type === void 0) { type = 'warn'; }
    if (!isProduction() && !haveWarned[msg]) {
        if (!isTest()) {
            haveWarned[msg] = true;
        }
        if (type === 'error') {
            console.error(msg);
        }
        else {
            console.warn(msg);
        }
    }
}

function stripSymbols(data) {
    return JSON.parse(JSON.stringify(data));
}


//# sourceMappingURL=bundle.esm.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/fast-json-stable-stringify/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/fast-json-stable-stringify/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) return;
        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
        if (typeof node !== 'object') return JSON.stringify(node);

        var i, out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = '';
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    })(data);
};


/***/ }),

/***/ "./node_modules/graphql/language/printer.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/printer.mjs ***!
  \***************************************************/
/*! exports provided: print */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "print", function() { return print; });
/* harmony import */ var _visitor_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visitor.mjs */ "./node_modules/graphql/language/visitor.mjs");
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blockString.mjs */ "./node_modules/graphql/language/blockString.mjs");


/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return Object(_visitor_mjs__WEBPACK_IMPORTED_MODULE_0__["visit"])(ast, {
    leave: printDocASTReducer
  });
} // TODO: provide better type coverage in future

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
    // the query short form.

    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue,
        directives = _ref.directives;
    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (// Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? Object(_blockString_mjs__WEBPACK_IMPORTED_MODULE_1__["printBlockString"])(value, key === 'description' ? '' : '  ') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? 'true' : 'false';
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },
  // Type System Definitions
  SchemaDefinition: addDescription(function (_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },
  ScalarTypeDefinition: addDescription(function (_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  }),
  ObjectTypeDefinition: addDescription(function (_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  FieldDefinition: addDescription(function (_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + ': ' + type + wrap(' ', join(directives, ' '));
  }),
  InputValueDefinition: addDescription(function (_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  }),
  InterfaceTypeDefinition: addDescription(function (_ref26) {
    var name = _ref26.name,
        interfaces = _ref26.interfaces,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  UnionTypeDefinition: addDescription(function (_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  }),
  EnumTypeDefinition: addDescription(function (_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  }),
  EnumValueDefinition: addDescription(function (_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  }),
  InputObjectTypeDefinition: addDescription(function (_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  }),
  DirectiveDefinition: addDescription(function (_ref31) {
    var name = _ref31.name,
        args = _ref31.arguments,
        repeatable = _ref31.repeatable,
        locations = _ref31.locations;
    return 'directive @' + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + (repeatable ? ' repeatable' : '') + ' on ' + join(locations, ' | ');
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives,
        operationTypes = _ref32.operationTypes;
    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name,
        interfaces = _ref34.interfaces,
        directives = _ref34.directives,
        fields = _ref34.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name,
        interfaces = _ref35.interfaces,
        directives = _ref35.directives,
        fields = _ref35.fields;
    return join(['extend interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        types = _ref36.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name,
        directives = _ref37.directives,
        values = _ref37.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name,
        directives = _ref38.directives,
        fields = _ref38.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  }
};

function addDescription(cb) {
  return function (node) {
    return join([node.description, cb(node)], '\n');
  };
}
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */


function join(maybeArray) {
  var _maybeArray$filter$jo;

  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function (x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : '';
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */


function block(array) {
  return array && array.length !== 0 ? '{\n' + indent(join(array, '\n')) + '\n}' : '';
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */


function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return maybeString ? start + maybeString + end : '';
}

function indent(maybeString) {
  return maybeString && '  ' + maybeString.replace(/\n/g, '\n  ');
}

function isMultiline(string) {
  return string.indexOf('\n') !== -1;
}

function hasMultilineItems(maybeArray) {
  return maybeArray && maybeArray.some(isMultiline);
}


/***/ }),

/***/ "./node_modules/graphql/language/visitor.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/visitor.mjs ***!
  \***************************************************/
/*! exports provided: QueryDocumentKeys, BREAK, visit, visitInParallel, getVisitFn */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryDocumentKeys", function() { return QueryDocumentKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BREAK", function() { return BREAK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visit", function() { return visit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visitInParallel", function() { return visitInParallel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisitFn", function() { return getVisitFn; });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "./node_modules/graphql/jsutils/inspect.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");


/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
var BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

  /* eslint-disable no-undef-init */
  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};

          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }

          node = clone;
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

          if (inArray) {
            editKey -= editOffset;
          }

          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!Object(_ast_mjs__WEBPACK_IMPORTED_MODULE_1__["isNode"])(node)) {
        throw new Error("Invalid AST Node: ".concat(Object(_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(node), "."));
      }

      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);

          if (!isLeaving) {
            if (Object(_ast_mjs__WEBPACK_IMPORTED_MODULE_1__["isNode"])(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;

      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */

function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          false);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          true);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */

function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];

  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }

    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificKindVisitor = specificVisitor[kind];

      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./node_modules/next/dist/build/polyfills/fetch/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/next/dist/build/polyfills/fetch/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals self */var fetch=self.fetch.bind(self);module.exports=fetch;module.exports.default=module.exports;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");

var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");

var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");

var _inherits = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");

var _possibleConstructorReturn = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");

var _getPrototypeOf = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

exports.AppInitialProps = _utils.AppInitialProps;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

function appGetInitialProps(_x) {
  return _appGetInitialProps.apply(this, arguments);
}

function _appGetInitialProps() {
  _appGetInitialProps = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var Component, ctx, pageProps;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Component = _ref.Component, ctx = _ref.ctx;
            _context.next = 3;
            return (0, _utils.loadGetInitialProps)(Component, ctx);

          case 3:
            pageProps = _context.sent;
            return _context.abrupt("return", {
              pageProps: pageProps
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _appGetInitialProps.apply(this, arguments);
}

var App = /*#__PURE__*/function (_react$default$Compon) {
  _inherits(App, _react$default$Compon);

  var _super = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super.apply(this, arguments);
  }

  _createClass(App, [{
    key: "componentDidCatch",
    // Kept here for backwards compatibility.
    // When someone ended App they could call `super.componentDidCatch`.
    // @deprecated This method is no longer needed. Errors are caught at the top level
    value: function componentDidCatch(error, _errorInfo) {
      throw error;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          router = _this$props.router,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps,
          __N_SSG = _this$props.__N_SSG,
          __N_SSP = _this$props.__N_SSP;
      return /*#__PURE__*/_react["default"].createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
      // methods like getStaticProps and getServerSideProps
      !(__N_SSG || __N_SSP) ? {
        url: createUrl(router)
      } : {}));
    }
  }]);

  return App;
}(_react["default"].Component);

exports["default"] = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
var warnContainer;
var warnUrl;

if (true) {
  warnContainer = (0, _utils.execOnce)(function () {
    console.warn("Warning: the `Container` in `_app` has been deprecated and should be removed. https://err.sh/vercel/next.js/app-container-deprecated");
  });
  warnUrl = (0, _utils.execOnce)(function () {
    console.error("Warning: the 'url' property is deprecated. https://err.sh/vercel/next.js/url-deprecated");
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
  return p.children;
}

_c = Container;

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  var pathname = router.pathname,
      asPath = router.asPath,
      query = router.query;
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

    back: function back() {
      if (true) warnUrl();
      router.back();
    },
    push: function push(url, as) {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: function pushTo(href, as) {
      if (true) warnUrl();
      var pushRoute = as ? href : '';
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: function replace(url, as) {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: function replaceTo(href, as) {
      if (true) warnUrl();
      var replaceRoute = as ? href : '';
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

var _c;

$RefreshReg$(_c, "Container");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/optimism/lib/bundle.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/optimism/lib/bundle.esm.js ***!
  \*************************************************/
/*! exports provided: asyncFromGen, bindContext, noContext, setTimeout, KeyTrie, defaultMakeCacheKey, wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyTrie", function() { return KeyTrie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMakeCacheKey", function() { return defaultMakeCacheKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony import */ var _wry_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/context */ "./node_modules/@wry/context/lib/context.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncFromGen", function() { return _wry_context__WEBPACK_IMPORTED_MODULE_0__["asyncFromGen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bindContext", function() { return _wry_context__WEBPACK_IMPORTED_MODULE_0__["bind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noContext", function() { return _wry_context__WEBPACK_IMPORTED_MODULE_0__["noContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _wry_context__WEBPACK_IMPORTED_MODULE_0__["setTimeout"]; });




function defaultDispose() { }
var Cache = /** @class */ (function () {
    function Cache(max, dispose) {
        if (max === void 0) { max = Infinity; }
        if (dispose === void 0) { dispose = defaultDispose; }
        this.max = max;
        this.dispose = dispose;
        this.map = new Map();
        this.newest = null;
        this.oldest = null;
    }
    Cache.prototype.has = function (key) {
        return this.map.has(key);
    };
    Cache.prototype.get = function (key) {
        var entry = this.getEntry(key);
        return entry && entry.value;
    };
    Cache.prototype.getEntry = function (key) {
        var entry = this.map.get(key);
        if (entry && entry !== this.newest) {
            var older = entry.older, newer = entry.newer;
            if (newer) {
                newer.older = older;
            }
            if (older) {
                older.newer = newer;
            }
            entry.older = this.newest;
            entry.older.newer = entry;
            entry.newer = null;
            this.newest = entry;
            if (entry === this.oldest) {
                this.oldest = newer;
            }
        }
        return entry;
    };
    Cache.prototype.set = function (key, value) {
        var entry = this.getEntry(key);
        if (entry) {
            return entry.value = value;
        }
        entry = {
            key: key,
            value: value,
            newer: null,
            older: this.newest
        };
        if (this.newest) {
            this.newest.newer = entry;
        }
        this.newest = entry;
        this.oldest = this.oldest || entry;
        this.map.set(key, entry);
        return entry.value;
    };
    Cache.prototype.clean = function () {
        while (this.oldest && this.map.size > this.max) {
            this.delete(this.oldest.key);
        }
    };
    Cache.prototype.delete = function (key) {
        var entry = this.map.get(key);
        if (entry) {
            if (entry === this.newest) {
                this.newest = entry.older;
            }
            if (entry === this.oldest) {
                this.oldest = entry.newer;
            }
            if (entry.newer) {
                entry.newer.older = entry.older;
            }
            if (entry.older) {
                entry.older.newer = entry.newer;
            }
            this.map.delete(key);
            this.dispose(entry.value, key);
            return true;
        }
        return false;
    };
    return Cache;
}());

var parentEntrySlot = new _wry_context__WEBPACK_IMPORTED_MODULE_0__["Slot"]();

var reusableEmptyArray = [];
var emptySetPool = [];
var POOL_TARGET_SIZE = 100;
// Since this package might be used browsers, we should avoid using the
// Node built-in assert module.
function assert(condition, optionalMessage) {
    if (!condition) {
        throw new Error(optionalMessage || "assertion failure");
    }
}
function valueIs(a, b) {
    var len = a.length;
    return (
    // Unknown values are not equal to each other.
    len > 0 &&
        // Both values must be ordinary (or both exceptional) to be equal.
        len === b.length &&
        // The underlying value or exception must be the same.
        a[len - 1] === b[len - 1]);
}
function valueGet(value) {
    switch (value.length) {
        case 0: throw new Error("unknown value");
        case 1: return value[0];
        case 2: throw value[1];
    }
}
function valueCopy(value) {
    return value.slice(0);
}
var Entry = /** @class */ (function () {
    function Entry(fn, args) {
        this.fn = fn;
        this.args = args;
        this.parents = new Set();
        this.childValues = new Map();
        // When this Entry has children that are dirty, this property becomes
        // a Set containing other Entry objects, borrowed from emptySetPool.
        // When the set becomes empty, it gets recycled back to emptySetPool.
        this.dirtyChildren = null;
        this.dirty = true;
        this.recomputing = false;
        this.value = [];
        ++Entry.count;
    }
    // This is the most important method of the Entry API, because it
    // determines whether the cached this.value can be returned immediately,
    // or must be recomputed. The overall performance of the caching system
    // depends on the truth of the following observations: (1) this.dirty is
    // usually false, (2) this.dirtyChildren is usually null/empty, and thus
    // (3) valueGet(this.value) is usually returned without recomputation.
    Entry.prototype.recompute = function () {
        assert(!this.recomputing, "already recomputing");
        if (!rememberParent(this) && maybeReportOrphan(this)) {
            // The recipient of the entry.reportOrphan callback decided to dispose
            // of this orphan entry by calling entry.dispose(), so we don't need to
            // (and should not) proceed with the recomputation.
            return void 0;
        }
        return mightBeDirty(this)
            ? reallyRecompute(this)
            : valueGet(this.value);
    };
    Entry.prototype.setDirty = function () {
        if (this.dirty)
            return;
        this.dirty = true;
        this.value.length = 0;
        reportDirty(this);
        // We can go ahead and unsubscribe here, since any further dirty
        // notifications we receive will be redundant, and unsubscribing may
        // free up some resources, e.g. file watchers.
        maybeUnsubscribe(this);
    };
    Entry.prototype.dispose = function () {
        var _this = this;
        forgetChildren(this).forEach(maybeReportOrphan);
        maybeUnsubscribe(this);
        // Because this entry has been kicked out of the cache (in index.js),
        // we've lost the ability to find out if/when this entry becomes dirty,
        // whether that happens through a subscription, because of a direct call
        // to entry.setDirty(), or because one of its children becomes dirty.
        // Because of this loss of future information, we have to assume the
        // worst (that this entry might have become dirty very soon), so we must
        // immediately mark this entry's parents as dirty. Normally we could
        // just call entry.setDirty() rather than calling parent.setDirty() for
        // each parent, but that would leave this entry in parent.childValues
        // and parent.dirtyChildren, which would prevent the child from being
        // truly forgotten.
        this.parents.forEach(function (parent) {
            parent.setDirty();
            forgetChild(parent, _this);
        });
    };
    Entry.count = 0;
    return Entry;
}());
function rememberParent(child) {
    var parent = parentEntrySlot.getValue();
    if (parent) {
        child.parents.add(parent);
        if (!parent.childValues.has(child)) {
            parent.childValues.set(child, []);
        }
        if (mightBeDirty(child)) {
            reportDirtyChild(parent, child);
        }
        else {
            reportCleanChild(parent, child);
        }
        return parent;
    }
}
function reallyRecompute(entry) {
    // Since this recomputation is likely to re-remember some of this
    // entry's children, we forget our children here but do not call
    // maybeReportOrphan until after the recomputation finishes.
    var originalChildren = forgetChildren(entry);
    // Set entry as the parent entry while calling recomputeNewValue(entry).
    parentEntrySlot.withValue(entry, recomputeNewValue, [entry]);
    if (maybeSubscribe(entry)) {
        // If we successfully recomputed entry.value and did not fail to
        // (re)subscribe, then this Entry is no longer explicitly dirty.
        setClean(entry);
    }
    // Now that we've had a chance to re-remember any children that were
    // involved in the recomputation, we can safely report any orphan
    // children that remain.
    originalChildren.forEach(maybeReportOrphan);
    return valueGet(entry.value);
}
function recomputeNewValue(entry) {
    entry.recomputing = true;
    // Set entry.value as unknown.
    entry.value.length = 0;
    try {
        // If entry.fn succeeds, entry.value will become a normal Value.
        entry.value[0] = entry.fn.apply(null, entry.args);
    }
    catch (e) {
        // If entry.fn throws, entry.value will become exceptional.
        entry.value[1] = e;
    }
    // Either way, this line is always reached.
    entry.recomputing = false;
}
function mightBeDirty(entry) {
    return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
    entry.dirty = false;
    if (mightBeDirty(entry)) {
        // This Entry may still have dirty children, in which case we can't
        // let our parents know we're clean just yet.
        return;
    }
    reportClean(entry);
}
function reportDirty(child) {
    child.parents.forEach(function (parent) { return reportDirtyChild(parent, child); });
}
function reportClean(child) {
    child.parents.forEach(function (parent) { return reportCleanChild(parent, child); });
}
// Let a parent Entry know that one of its children may be dirty.
function reportDirtyChild(parent, child) {
    // Must have called rememberParent(child) before calling
    // reportDirtyChild(parent, child).
    assert(parent.childValues.has(child));
    assert(mightBeDirty(child));
    if (!parent.dirtyChildren) {
        parent.dirtyChildren = emptySetPool.pop() || new Set;
    }
    else if (parent.dirtyChildren.has(child)) {
        // If we already know this child is dirty, then we must have already
        // informed our own parents that we are dirty, so we can terminate
        // the recursion early.
        return;
    }
    parent.dirtyChildren.add(child);
    reportDirty(parent);
}
// Let a parent Entry know that one of its children is no longer dirty.
function reportCleanChild(parent, child) {
    // Must have called rememberChild(child) before calling
    // reportCleanChild(parent, child).
    assert(parent.childValues.has(child));
    assert(!mightBeDirty(child));
    var childValue = parent.childValues.get(child);
    if (childValue.length === 0) {
        parent.childValues.set(child, valueCopy(child.value));
    }
    else if (!valueIs(childValue, child.value)) {
        parent.setDirty();
    }
    removeDirtyChild(parent, child);
    if (mightBeDirty(parent)) {
        return;
    }
    reportClean(parent);
}
function removeDirtyChild(parent, child) {
    var dc = parent.dirtyChildren;
    if (dc) {
        dc.delete(child);
        if (dc.size === 0) {
            if (emptySetPool.length < POOL_TARGET_SIZE) {
                emptySetPool.push(dc);
            }
            parent.dirtyChildren = null;
        }
    }
}
// If the given entry has a reportOrphan method, and no remaining parents,
// call entry.reportOrphan and return true iff it returns true. The
// reportOrphan function should return true to indicate entry.dispose()
// has been called, and the entry has been removed from any other caches
// (see index.js for the only current example).
function maybeReportOrphan(entry) {
    return entry.parents.size === 0 &&
        typeof entry.reportOrphan === "function" &&
        entry.reportOrphan() === true;
}
// Removes all children from this entry and returns an array of the
// removed children.
function forgetChildren(parent) {
    var children = reusableEmptyArray;
    if (parent.childValues.size > 0) {
        children = [];
        parent.childValues.forEach(function (_value, child) {
            forgetChild(parent, child);
            children.push(child);
        });
    }
    // After we forget all our children, this.dirtyChildren must be empty
    // and therefore must have been reset to null.
    assert(parent.dirtyChildren === null);
    return children;
}
function forgetChild(parent, child) {
    child.parents.delete(parent);
    parent.childValues.delete(child);
    removeDirtyChild(parent, child);
}
function maybeSubscribe(entry) {
    if (typeof entry.subscribe === "function") {
        try {
            maybeUnsubscribe(entry); // Prevent double subscriptions.
            entry.unsubscribe = entry.subscribe.apply(null, entry.args);
        }
        catch (e) {
            // If this Entry has a subscribe function and it threw an exception
            // (or an unsubscribe function it previously returned now throws),
            // return false to indicate that we were not able to subscribe (or
            // unsubscribe), and this Entry should remain dirty.
            entry.setDirty();
            return false;
        }
    }
    // Returning true indicates either that there was no entry.subscribe
    // function or that it succeeded.
    return true;
}
function maybeUnsubscribe(entry) {
    var unsubscribe = entry.unsubscribe;
    if (typeof unsubscribe === "function") {
        entry.unsubscribe = void 0;
        unsubscribe();
    }
}

// A trie data structure that holds object keys weakly, yet can also hold
// non-object keys, unlike the native `WeakMap`.
var KeyTrie = /** @class */ (function () {
    function KeyTrie(weakness) {
        this.weakness = weakness;
    }
    KeyTrie.prototype.lookup = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        return this.lookupArray(array);
    };
    KeyTrie.prototype.lookupArray = function (array) {
        var node = this;
        array.forEach(function (key) { return node = node.getChildTrie(key); });
        return node.data || (node.data = Object.create(null));
    };
    KeyTrie.prototype.getChildTrie = function (key) {
        var map = this.weakness && isObjRef(key)
            ? this.weak || (this.weak = new WeakMap())
            : this.strong || (this.strong = new Map());
        var child = map.get(key);
        if (!child)
            map.set(key, child = new KeyTrie(this.weakness));
        return child;
    };
    return KeyTrie;
}());
function isObjRef(value) {
    switch (typeof value) {
        case "object":
            if (value === null)
                break;
        // Fall through to return true...
        case "function":
            return true;
    }
    return false;
}

// The defaultMakeCacheKey function is remarkably powerful, because it gives
// a unique object for any shallow-identical list of arguments. If you need
// to implement a custom makeCacheKey function, you may find it helpful to
// delegate the final work to defaultMakeCacheKey, which is why we export it
// here. However, you may want to avoid defaultMakeCacheKey if your runtime
// does not support WeakMap, or you have the ability to return a string key.
// In those cases, just write your own custom makeCacheKey functions.
var keyTrie = new KeyTrie(typeof WeakMap === "function");
function defaultMakeCacheKey() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return keyTrie.lookupArray(args);
}
var caches = new Set();
function wrap(originalFunction, options) {
    if (options === void 0) { options = Object.create(null); }
    var cache = new Cache(options.max || Math.pow(2, 16), function (entry) { return entry.dispose(); });
    var disposable = !!options.disposable;
    var makeCacheKey = options.makeCacheKey || defaultMakeCacheKey;
    function optimistic() {
        if (disposable && !parentEntrySlot.hasValue()) {
            // If there's no current parent computation, and this wrapped
            // function is disposable (meaning we don't care about entry.value,
            // just dependency tracking), then we can short-cut everything else
            // in this function, because entry.recompute() is going to recycle
            // the entry object without recomputing anything, anyway.
            return void 0;
        }
        var key = makeCacheKey.apply(null, arguments);
        if (key === void 0) {
            return originalFunction.apply(null, arguments);
        }
        var args = Array.prototype.slice.call(arguments);
        var entry = cache.get(key);
        if (entry) {
            entry.args = args;
        }
        else {
            entry = new Entry(originalFunction, args);
            cache.set(key, entry);
            entry.subscribe = options.subscribe;
            if (disposable) {
                entry.reportOrphan = function () { return cache.delete(key); };
            }
        }
        var value = entry.recompute();
        // Move this entry to the front of the least-recently used queue,
        // since we just finished computing its value.
        cache.set(key, entry);
        caches.add(cache);
        // Clean up any excess entries in the cache, but only if there is no
        // active parent entry, meaning we're not in the middle of a larger
        // computation that might be flummoxed by the cleaning.
        if (!parentEntrySlot.hasValue()) {
            caches.forEach(function (cache) { return cache.clean(); });
            caches.clear();
        }
        // If options.disposable is truthy, the caller of wrap is telling us
        // they don't care about the result of entry.recompute(), so we should
        // avoid returning the value, so it won't be accidentally used.
        return disposable ? void 0 : value;
    }
    optimistic.dirty = function () {
        var key = makeCacheKey.apply(null, arguments);
        var child = key !== void 0 && cache.get(key);
        if (child) {
            child.setDirty();
        }
    };
    return optimistic;
}


//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/ts-invariant/lib/invariant.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/ts-invariant/lib/invariant.esm.js ***!
  \********************************************************/
/*! exports provided: default, InvariantError, invariant, process */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvariantError", function() { return InvariantError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invariant", function() { return invariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "process", function() { return processStub; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");


var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf, setPrototypeOf = _a === void 0 ? function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
} : _a;
var InvariantError = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InvariantError, _super);
    function InvariantError(message) {
        if (message === void 0) { message = genericMessage; }
        var _this = _super.call(this, typeof message === "number"
            ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)"
            : message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError.prototype);
        return _this;
    }
    return InvariantError;
}(Error));
function invariant(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
function wrapConsoleMethod(method) {
    return function () {
        return console[method].apply(console, arguments);
    };
}
(function (invariant) {
    invariant.warn = wrapConsoleMethod("warn");
    invariant.error = wrapConsoleMethod("error");
})(invariant || (invariant = {}));
// Code that uses ts-invariant with rollup-plugin-invariant may want to
// import this process stub to avoid errors evaluating process.env.NODE_ENV.
// However, because most ESM-to-CJS compilers will rewrite the process import
// as tsInvariant.process, which prevents proper replacement by minifiers, we
// also attempt to define the stub globally when it is not already defined.
var processStub = { env: {} };
if (typeof process === "object") {
    processStub = process;
}
else
    try {
        // Using Function to evaluate this assignment in global scope also escapes
        // the strict mode of the current module, thereby allowing the assignment.
        // Inspired by https://github.com/facebook/regenerator/pull/369.
        Function("stub", "process = stub")(processStub);
    }
    catch (atLeastWeTried) {
        // The assignment can fail if a Content Security Policy heavy-handedly
        // forbids Function usage. In those environments, developers should take
        // extra care to replace process.env.NODE_ENV in their production builds,
        // or define an appropriate global.process polyfill.
    }
var invariant$1 = invariant;

/* harmony default export */ __webpack_exports__["default"] = (invariant$1);

//# sourceMappingURL=invariant.esm.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/zen-observable-ts/lib/bundle.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/zen-observable-ts/lib/bundle.esm.js ***!
  \**********************************************************/
/*! exports provided: default, Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return Observable; });
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ "./node_modules/zen-observable/index.js");
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);


var Observable = zen_observable__WEBPACK_IMPORTED_MODULE_0___default.a;

/* harmony default export */ __webpack_exports__["default"] = (Observable);

//# sourceMappingURL=bundle.esm.js.map


/***/ }),

/***/ "./node_modules/zen-observable/index.js":
/*!**********************************************!*\
  !*** ./node_modules/zen-observable/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/Observable.js */ "./node_modules/zen-observable/lib/Observable.js").Observable;


/***/ }),

/***/ "./node_modules/zen-observable/lib/Observable.js":
/*!*******************************************************!*\
  !*** ./node_modules/zen-observable/lib/Observable.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// === Symbol Support ===
var hasSymbols = function () {
  return typeof Symbol === 'function';
};

var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};

var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return undefined;
  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;

  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];

    if (ctor === null) {
      ctor = undefined;
    }
  }

  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;
  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');

      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;

  if (!queue) {
    return;
  }

  subscription._queue = undefined;
  subscription._state = 'ready';

  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';
  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);

    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;

      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;

      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({
      type: type,
      value: value
    });

    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{
      type: type,
      value: value
    }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription =
/*#__PURE__*/
function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription);

    // ASSERT: observer is an object
    // ASSERT: subscriber is callable
    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';
    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: "unsubscribe",
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: "closed",
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver =
/*#__PURE__*/
function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: "next",
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: "error",
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: "complete",
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: "closed",
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable =
/*#__PURE__*/
function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }

      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: "map",
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "reduce",
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;
      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "concat",
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);
      return new C(function (observer) {
        var subscription;
        var index = 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (index === sources.length) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources[index++]));
              }
            }
          });
        }

        startNext(_this5);
        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });
            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: SymbolObservable,
    value: function () {
      return this;
    }
  }], [{
    key: "from",
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;
      if (x == null) throw new TypeError(x + ' is not an object');
      var method = getMethod(x, SymbolObservable);

      if (method) {
        var observable = method.call(x);
        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
        if (isObservable(observable) && observable.constructor === C) return observable;
        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, SymbolIterator);

        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _item = _step.value;
                  observer.next(_item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;
      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;

          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }

          observer.complete();
        });
      });
    }
  }, {
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

exports.Observable = Observable;

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ob2Mvd2l0aEFwb2xsby5qc3giLCJ3ZWJwYWNrOi8vLy4vbGliL2Fwb2xsb0NsaWVudC9hcG9sbG9DbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhcG9sbG8vcmVhY3QtY29tbW9uL2xpYi9yZWFjdC1jb21tb24uZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYXBvbGxvL3JlYWN0LWhvb2tzL2xpYi9yZWFjdC1ob29rcy5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3cnkvY29udGV4dC9saWIvY29udGV4dC5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B3cnkvZXF1YWxpdHkvbGliL2VxdWFsaXR5LmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNhY2hlLWlubWVtb3J5L2xpYi9idW5kbGUuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2FjaGUvbGliL2J1bmRsZS5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvYnVuZGxlLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWxpbmstaHR0cC1jb21tb24vbGliL2J1bmRsZS5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1saW5rLWh0dHAvbGliL2J1bmRsZS5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1saW5rL2xpYi9idW5kbGUuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tdXRpbGl0aWVzL2xpYi9idW5kbGUuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYXN0LWpzb24tc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhcGhxbC9sYW5ndWFnZS9wcmludGVyLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JhcGhxbC9sYW5ndWFnZS92aXNpdG9yLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC9wb2x5ZmlsbHMvZmV0Y2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcHRpbWlzbS9saWIvYnVuZGxlLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RzLWludmFyaWFudC9saWIvaW52YXJpYW50LmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3plbi1vYnNlcnZhYmxlLXRzL2xpYi9idW5kbGUuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy96ZW4tb2JzZXJ2YWJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvemVuLW9ic2VydmFibGUvbGliL09ic2VydmFibGUuanMiXSwibmFtZXMiOlsiZ2xvYmFsQXBvbGxvQ2xpZW50IiwiaW5pdE9uQ29udGV4dCIsImN0eCIsImluQXBwQ29udGV4dCIsIkJvb2xlYW4iLCJjb25zb2xlIiwid2FybiIsImFwb2xsb0NsaWVudCIsImluaXRBcG9sbG9DbGllbnQiLCJhcG9sbG9TdGF0ZSIsInRvSlNPTiIsImluaXRpYWxTdGF0ZSIsImNyZWF0ZUFwb2xsb0NsaWVudCIsIndpdGhBcG9sbG8iLCJzc3IiLCJQYWdlQ29tcG9uZW50IiwiV2l0aEFwb2xsbyIsInBhZ2VQcm9wcyIsImNsaWVudCIsInVuZGVmaW5lZCIsImRpc3BsYXlOYW1lIiwibmFtZSIsImdldEluaXRpYWxQcm9wcyIsIkFwcCIsIkFwcFRyZWUiLCJyZXMiLCJmaW5pc2hlZCIsImdldERhdGFGcm9tVHJlZSIsInByb3BzIiwiZXJyb3IiLCJIZWFkIiwicmV3aW5kIiwiY2FjaGUiLCJleHRyYWN0IiwiZW5jaGFuY2VkRmV0Y2giLCJ1cmwiLCJpbml0IiwiZmV0Y2giLCJoZWFkZXJzIiwiQ29va2llIiwicmVxIiwiY29va2llIiwidGhlbiIsInJlc3BvbnNlIiwiQXBvbGxvQ2xpZW50Iiwic3NyTW9kZSIsImxpbmsiLCJIdHRwTGluayIsInVyaSIsImNyZWRlbnRpYWxzIiwiSW5NZW1vcnlDYWNoZSIsInJlc3RvcmUiLCJyZW5kZXIiLCJfX05fU1NHIiwiY3JlYXRlVXJsIiwiUmVhY3QiLCJDb21wb25lbnQiLCJvcmlnR2V0SW5pdGlhbFByb3BzIiwiYXBwR2V0SW5pdGlhbFByb3BzIiwid2FybkNvbnRhaW5lciIsIndhcm5VcmwiLCJwIiwiYmFjayIsInJvdXRlciIsInB1c2giLCJwdXNoVG8iLCJwdXNoUm91dGUiLCJhcyIsInB1c2hVcmwiLCJyZXBsYWNlIiwicmVwbGFjZVRvIiwicmVwbGFjZVJvdXRlIiwicmVwbGFjZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Q0FHQTtBQUNBOztBQUNBLElBQUlBLGtCQUFrQixHQUFHLElBQXpCO0FBRUE7Ozs7Ozs7QUFNTyxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUFDLEdBQUcsRUFBSTtBQUNsQyxNQUFNQyxZQUFZLEdBQUdDLE9BQU8sQ0FBQ0YsR0FBRyxDQUFDQSxHQUFMLENBQTVCLENBRGtDLENBR2xDO0FBQ0E7O0FBQ0EsWUFBNEM7QUFDMUMsUUFBSUMsWUFBSixFQUFrQjtBQUNoQkUsYUFBTyxDQUFDQyxJQUFSLENBQ0Usd0dBQ0Usc0VBRko7QUFJRDtBQUNGLEdBWmlDLENBY2xDOzs7QUFDQSxNQUFNQyxZQUFZLEdBQ2hCTCxHQUFHLENBQUNLLFlBQUosSUFDQUMsZ0JBQWdCLENBQUNOLEdBQUcsQ0FBQ08sV0FBSixJQUFtQixFQUFwQixFQUF3Qk4sWUFBWSxHQUFHRCxHQUFHLENBQUNBLEdBQVAsR0FBYUEsR0FBakQsQ0FGbEIsQ0Fma0MsQ0FtQmxDO0FBQ0E7QUFDQTtBQUNBOztBQUNBSyxjQUFZLENBQUNHLE1BQWIsR0FBc0I7QUFBQSxXQUFNLElBQU47QUFBQSxHQUF0QixDQXZCa0MsQ0F5QmxDO0FBQ0E7QUFDQTs7O0FBQ0FSLEtBQUcsQ0FBQ0ssWUFBSixHQUFtQkEsWUFBbkI7O0FBQ0EsTUFBSUosWUFBSixFQUFrQjtBQUNoQkQsT0FBRyxDQUFDQSxHQUFKLENBQVFLLFlBQVIsR0FBdUJBLFlBQXZCO0FBQ0Q7O0FBRUQsU0FBT0wsR0FBUDtBQUNELENBbENNO0FBb0NQOzs7Ozs7O0FBTUEsSUFBTU0sZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDRyxZQUFELEVBQWVULEdBQWYsRUFBdUI7QUFDOUM7QUFDQTtBQUNBLGFBQW1DLEVBSFcsQ0FPOUM7OztBQUNBLE1BQUksQ0FBQ0Ysa0JBQUwsRUFBeUI7QUFDdkJBLHNCQUFrQixHQUFHWSw4RUFBa0IsQ0FBQ0QsWUFBRCxFQUFlVCxHQUFmLENBQXZDO0FBQ0Q7O0FBRUQsU0FBT0Ysa0JBQVA7QUFDRCxDQWJEO0FBZUE7Ozs7Ozs7Ozs7QUFRTyxJQUFNYSxVQUFVLEdBQUcsU0FBYkEsVUFBYTtBQUFBLGlGQUFtQixFQUFuQjtBQUFBLHNCQUFHQyxHQUFIO0FBQUEsTUFBR0EsR0FBSCx5QkFBUyxLQUFUOztBQUFBLFNBQTBCLFVBQUFDLGFBQWEsRUFBSTtBQUVuRSxRQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxRQUFpRDtBQUFBLFVBQTlDVCxZQUE4QyxTQUE5Q0EsWUFBOEM7QUFBQSxVQUFoQ0UsV0FBZ0MsU0FBaENBLFdBQWdDO0FBQUEsVUFBaEJRLFNBQWdCOztBQUNsRSxVQUFJQyxNQUFKOztBQUNBLFVBQUlYLFlBQUosRUFBa0I7QUFDaEI7QUFDQVcsY0FBTSxHQUFHWCxZQUFUO0FBQ0QsT0FIRCxNQUdPO0FBQ0w7QUFDQVcsY0FBTSxHQUFHVixnQkFBZ0IsQ0FBQ0MsV0FBRCxFQUFjVSxTQUFkLENBQXpCO0FBQ0Q7O0FBRUQsYUFDRSxNQUFDLGtFQUFEO0FBQWdCLGNBQU0sRUFBRUQsTUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFLE1BQUMsYUFBRCx5RkFBbUJELFNBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERixDQURGO0FBS0QsS0FmRCxDQUZtRSxDQW1CbkU7OztBQUNBLGNBQTJDO0FBQ3pDLFVBQU1HLFdBQVcsR0FDZkwsYUFBYSxDQUFDSyxXQUFkLElBQTZCTCxhQUFhLENBQUNNLElBQTNDLElBQW1ELFdBRHJEO0FBRUFMLGdCQUFVLENBQUNJLFdBQVgsd0JBQXVDQSxXQUF2QztBQUNEOztBQUdELFFBQUlOLEdBQUcsSUFBSUMsYUFBYSxDQUFDTyxlQUF6QixFQUEwQztBQUN4Q04sZ0JBQVUsQ0FBQ00sZUFBWDtBQUFBLHFNQUE2QixpQkFBTXBCLEdBQU47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNyQkMsOEJBRHFCLEdBQ05DLE9BQU8sQ0FBQ0YsR0FBRyxDQUFDQSxHQUFMLENBREQ7QUFBQSxtQ0FFRkQsYUFBYSxDQUFDQyxHQUFELENBRlgsRUFFbkJLLFlBRm1CLGtCQUVuQkEsWUFGbUIsRUFJM0I7O0FBQ0lVLDJCQUx1QixHQUtYLEVBTFc7O0FBQUEsdUJBTXZCRixhQUFhLENBQUNPLGVBTlM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx5QkFPUFAsYUFBYSxDQUFDTyxlQUFkLENBQThCcEIsR0FBOUIsQ0FQTzs7QUFBQTtBQU96QmUsMkJBUHlCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHVCQVFoQmQsWUFSZ0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx5QkFTUG9CLCtDQUFHLENBQUNELGVBQUosQ0FBb0JwQixHQUFwQixDQVRPOztBQUFBO0FBU3pCZSwyQkFUeUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjakJPLHlCQWRpQixHQWNMdEIsR0FkSyxDQWNqQnNCLE9BZGlCLEVBZXpCO0FBQ0E7O0FBaEJ5Qix3QkFpQnJCdEIsR0FBRyxDQUFDdUIsR0FBSixJQUFXdkIsR0FBRyxDQUFDdUIsR0FBSixDQUFRQyxRQWpCRTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxtREFrQmhCVCxTQWxCZ0I7O0FBQUE7QUFBQSx3QkFzQnJCSCxHQUFHLElBQUlVLE9BdEJjO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx5QkEwQmEsK0pBMUJiOztBQUFBO0FBQUE7QUEwQmJHLGlDQTFCYSxpQkEwQmJBLGVBMUJhOztBQStCckIsc0JBQUl4QixZQUFKLEVBQWtCO0FBQ2hCeUIseUJBQUssbUNBQVFYLFNBQVI7QUFBbUJWLGtDQUFZLEVBQVpBO0FBQW5CLHNCQUFMO0FBQ0QsbUJBRkQsTUFFTztBQUNMcUIseUJBQUssR0FBRztBQUFFWCwrQkFBUyxrQ0FBT0EsU0FBUDtBQUFrQlYsb0NBQVksRUFBWkE7QUFBbEI7QUFBWCxxQkFBUjtBQUNELG1CQW5Db0IsQ0FxQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQXpDcUI7QUFBQSx5QkEwQ2ZvQixlQUFlLENBQUMsTUFBQyxPQUFELHlGQUFhQyxLQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQUQsQ0ExQ0E7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQTRDckI7QUFDQTtBQUNBO0FBQ0F2Qix5QkFBTyxDQUFDd0IsS0FBUixDQUFjLHVDQUFkOztBQS9DcUI7QUFrRHZCO0FBQ0E7QUFDQUMsa0VBQUksQ0FBQ0MsTUFBTDs7QUFwRHVCO0FBQUEsbUZBeUR0QmQsU0F6RHNCO0FBMER6QjtBQUNBUiwrQkFBVyxFQUFFRixZQUFZLENBQUN5QixLQUFiLENBQW1CQyxPQUFuQixFQTNEWTtBQTREekI7QUFDQTtBQUNBMUIsZ0NBQVksRUFBRUwsR0FBRyxDQUFDSztBQTlETzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUE3Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlFRDs7QUFFRCxXQUFPUyxVQUFQO0FBQ0QsR0FoR3lCO0FBQUEsQ0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZQO0FBQ0E7QUFDQTtDQUVBO0FBQ0E7O0FBRWUsU0FBU0osa0JBQVQsQ0FBNEJELFlBQTVCLEVBQTBDVCxHQUExQyxFQUErQztBQUM1RDtBQUNBO0FBRUEsTUFBTWdDLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsR0FBRCxFQUFNQyxJQUFOO0FBQUEsV0FDckJDLHlEQUFLLENBQUNGLEdBQUQsa0NBQ0FDLElBREE7QUFFSEUsYUFBTyxrQ0FDRkYsSUFBSSxDQUFDRSxPQURIO0FBRUxDLGNBQU0sRUFBRXJDLEdBQUcsQ0FBQ3NDLEdBQUosQ0FBUUYsT0FBUixDQUFnQkc7QUFGbkI7QUFGSixPQUFMLENBTUdDLElBTkgsQ0FNUSxVQUFDQyxRQUFELEVBQWM7QUFDcEIsYUFBT0EsUUFBUDtBQUNELEtBUkQsQ0FEcUI7QUFBQSxHQUF2Qjs7QUFXQSxTQUFPLElBQUlDLDBEQUFKLENBQWlCO0FBQ3RCQyxXQUFPLEVBQUV6QyxPQUFPLENBQUNGLEdBQUQsQ0FETTtBQUV0QjRDLFFBQUksRUFBRSxJQUFJQyx5REFBSixDQUFhO0FBQ2pCQyxTQUFHLEVBQUUsbUNBRFk7QUFDeUI7QUFDMUM7QUFDQUMsaUJBQVcsRUFBRSxTQUhJO0FBR087QUFDeEJaLFdBQUssRUFBRW5DLEdBQUcsR0FBR2dDLGNBQUgsR0FBb0JHLHlEQUFLQTtBQUpsQixLQUFiLENBRmdCO0FBUXRCO0FBQ0FMLFNBQUssRUFBRSxJQUFJa0IsbUVBQUosR0FBb0JDLE9BQXBCLENBQTRCeEMsWUFBNUI7QUFUZSxHQUFqQixDQUFQO0FBV0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBCO0FBQ2U7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0Q0FBSyxpQkFBaUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNENBQUssaUJBQWlCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNENBQUs7QUFDaEIsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQSxzQ0FBc0MsWUFBWSxpQkFBaUI7QUFDbkU7QUFDQSxRQUFRLE1BQXFDLEdBQUcsU0FBNEIsR0FBRyw4REFBUztBQUN4RjtBQUNBLGdCQUFnQiw0Q0FBSyx3Q0FBd0MsaUJBQWlCO0FBQzlFLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBSztBQUNoQixRQUFRLE1BQXFDLEdBQUcsU0FBdUMsR0FBRyw4REFBUztBQUNuRztBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE1BQXFDLEdBQUcsU0FBMkMsR0FBRyw4REFBUztBQUNuRztBQUNBO0FBQ0EsOERBQThELHdDQUF3QyxFQUFFO0FBQ3hHO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksTUFBcUMsR0FBRyxTQUM0QixHQUFHLDhEQUFTO0FBQ3BGO0FBQ0E7QUFDQSxJQUFJLE1BQXFDLEdBQUcsU0FBMkUsR0FBRyw4REFBUztBQUNuSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxNQUFxQyxHQUFHLFNBQXNDLEdBQUcsOERBQVM7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOztBQUVxSDtBQUNySDs7Ozs7Ozs7Ozs7OztBQzlHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2RjtBQUNlO0FBQ2hFO0FBQ3VDO0FBQ3hCO0FBQ3JCO0FBQ0c7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHVCQUF1QjtBQUM5RCw4QkFBOEIsMkRBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLE1BQXFDLEdBQUcsU0FBc0IsR0FBRyw4REFBUztBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1FQUFNO0FBQzlCLG9DQUFvQywwRUFBYTtBQUNqRCxnQ0FBZ0MsMEVBQWE7QUFDN0MsUUFBUSxNQUFxQyxHQUFHLFNBQXFDLEdBQUcsOERBQVM7QUFDakc7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLElBQUksdURBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELGtFQUFrRTtBQUM1SCxpREFBaUQseURBQXlEO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELCtEQUErRDtBQUN0SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMkRBQWE7QUFDaEQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHNEQUFRLENBQUMsc0RBQVEsR0FBRztBQUNwRCw4QkFBOEIsc0RBQVEsQ0FBQyxzREFBUSxHQUFHO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzREFBUSxFQUFFLCtCQUErQiwyREFBYSw0RUFBNEU7QUFDM0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsaUVBQVk7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzREFBUSxDQUFDLHNEQUFRLEdBQUcsYUFBYSxnRUFBZ0Usa0JBQWtCLDJCQUEyQixFQUFFLEVBQUU7QUFDaks7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxzREFBUSxDQUFDLHNEQUFRLEdBQUcsNEJBQTRCLGlCQUFpQjtBQUN4SCxrRkFBa0Ysc0RBQVEsR0FBRztBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxzREFBUSxDQUFDLHNEQUFRLEdBQUcsMENBQTBDLGlCQUFpQjtBQUN2SCxhQUFhLDJEQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxFQUFFO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyREFBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0RBQVEsQ0FBQyxzREFBUSxHQUFHLFlBQVksa0VBQWtFO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5REFBVyxFQUFFLHdCQUF3QjtBQUNqRTtBQUNBLHFCQUFxQixzREFBUSxDQUFDLHNEQUFRLEdBQUcsWUFBWTtBQUNyRDtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzREFBUSxDQUFDLHNEQUFRLEdBQUc7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFO0FBQzdFO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDJEQUFhO0FBQ3BELHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJEQUFLO0FBQ3JCLGdCQUFnQiwyREFBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGNBQWMsb0RBQU07QUFDcEIseUJBQXlCLDJEQUFLO0FBQzlCLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsY0FBYztBQUN4QyxrQkFBa0Isd0RBQVUsQ0FBQyw2RUFBZ0I7QUFDN0MsYUFBYSx3REFBVSxlQUFlLGNBQWMsRUFBRTtBQUN0RCxtQ0FBbUMsc0RBQVEsQ0FBQyxzREFBUSxHQUFHLGFBQWEsZUFBZSxLQUFLO0FBQ3hGLHVCQUF1QixvREFBTTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0RBQVEsQ0FBQyxzREFBUSxHQUFHLG9CQUFvQiw2Q0FBNkM7QUFDdEc7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLCtEQUErRCxFQUFFO0FBQzNHO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNEJBQTRCO0FBQ3hELEtBQUs7QUFDTCxJQUFJLHVEQUFTLGNBQWMsZ0NBQWdDLGFBQWEsRUFBRSxFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHVEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsOEJBQThCO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLG1EQUFtRCxpRUFBWTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxpRUFBWTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJNQUEyTTtBQUMzTSw0QkFBNEIsc0RBQVEsR0FBRztBQUN2Qyw4Q0FBOEM7QUFDOUM7QUFDQSxrREFBa0Qsc0RBQVEsRUFBRTtBQUM1RDtBQUNBLDRHQUE0RztBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix5REFBVyxFQUFFLHdCQUF3QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDJEQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0Esa0JBQWtCLHdEQUFVLENBQUMsNkVBQWdCO0FBQzdDLGFBQWEsc0RBQVEsRUFBRSxnQ0FBZ0M7QUFDdkQsbUNBQW1DLHNEQUFRLENBQUMsc0RBQVEsR0FBRyxhQUFhLHFCQUFxQixLQUFLO0FBQzlGLDBCQUEwQixvREFBTTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVEQUFTLGNBQWMsb0NBQW9DLEVBQUU7QUFDakU7QUFDQTs7QUFFQTtBQUNBLElBQUksdURBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMkRBQUs7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNEQUFRLENBQUMsc0RBQVEsR0FBRyxtQkFBbUIseUNBQXlDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGtCQUFrQix3REFBVSxDQUFDLDZFQUFnQjtBQUM3QztBQUNBLFVBQVUsc0RBQVEsQ0FBQyxzREFBUSxHQUFHLGFBQWEsNkJBQTZCLEtBQUs7QUFDN0UsYUFBYSxzREFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsOEJBQThCLG9EQUFNO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVEQUFTLGNBQWMsd0NBQXdDLEVBQUU7QUFDckUsSUFBSSx1REFBUyxjQUFjLHdEQUF3RCxFQUFFO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsNENBQUssWUFBWSw2RUFBZ0I7QUFDbEQsSUFBSSxNQUFxQyxHQUFHLFNBQW9CLEdBQUcsOERBQVM7QUFDNUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFZ0c7QUFDakc7Ozs7Ozs7Ozs7Ozs7QUN2dUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsV0FBVztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsSUFBSTtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGlDQUFpQztBQUNoRixnREFBZ0Qsa0NBQWtDO0FBQ2xGO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU4RztBQUM5Rzs7Ozs7Ozs7Ozs7OztBQ3RNQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUVBQWdCO0FBQzNDLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxhQUFhLDJCQUEyQjtBQUN4QyxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUF3Q0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFDb0Q7O0FBRXhGLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsNkJBQTZCLGdCQUFnQjtBQUM3QyxpQ0FBaUMsMEJBQTBCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCwwQkFBMEIsaURBQUk7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsd0NBQXdDLEVBQUU7QUFDdkY7QUFDQTtBQUNBLDZDQUE2Qyx3Q0FBd0MsRUFBRTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msc0NBQXNDLEVBQUU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwrQkFBK0I7QUFDNUQsNEVBQTRFLHdCQUF3QixFQUFFO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELDBCQUEwQjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLHNCQUFzQixFQUFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU4QztBQUM5Qzs7Ozs7Ozs7Ozs7O0FDOWRBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztB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QTs7QUFFQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZFQUE2RSxlQUFlO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLGtCQUFrQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxDIiwiZmlsZSI6InN0YXRpYy9jaHVua3MvMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IEFwcCBmcm9tICduZXh0L2FwcCdcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5pbXBvcnQgeyBBcG9sbG9Qcm92aWRlciB9IGZyb20gJ0BhcG9sbG8vcmVhY3QtaG9va3MnXHJcbmltcG9ydCBjcmVhdGVBcG9sbG9DbGllbnQgZnJvbSAnLi4vbGliL2Fwb2xsb0NsaWVudC9hcG9sbG9DbGllbnQnXHJcblxyXG4vLyBPbiB0aGUgY2xpZW50LCB3ZSBzdG9yZSB0aGUgQXBvbGxvIENsaWVudCBpbiB0aGUgZm9sbG93aW5nIHZhcmlhYmxlLlxyXG4vLyBUaGlzIHByZXZlbnRzIHRoZSBjbGllbnQgZnJvbSByZWluaXRpYWxpemluZyBiZXR3ZWVuIHBhZ2UgdHJhbnNpdGlvbnMuXHJcbmxldCBnbG9iYWxBcG9sbG9DbGllbnQgPSBudWxsXHJcblxyXG4vKipcclxuICogSW5zdGFsbHMgdGhlIEFwb2xsbyBDbGllbnQgb24gTmV4dFBhZ2VDb250ZXh0XHJcbiAqIG9yIE5leHRBcHBDb250ZXh0LiBVc2VmdWwgaWYgeW91IHdhbnQgdG8gdXNlIGFwb2xsb0NsaWVudFxyXG4gKiBpbnNpZGUgZ2V0U3RhdGljUHJvcHMsIGdldFN0YXRpY1BhdGhzIG9yIGdldFNlcnZlclNpZGVQcm9wc1xyXG4gKiBAcGFyYW0ge05leHRQYWdlQ29udGV4dCB8IE5leHRBcHBDb250ZXh0fSBjdHhcclxuICovXHJcbmV4cG9ydCBjb25zdCBpbml0T25Db250ZXh0ID0gY3R4ID0+IHtcclxuICBjb25zdCBpbkFwcENvbnRleHQgPSBCb29sZWFuKGN0eC5jdHgpXHJcblxyXG4gIC8vIFdlIGNvbnNpZGVyIGluc3RhbGxpbmcgYHdpdGhBcG9sbG8oeyBzc3I6IHRydWUgfSlgIG9uIGdsb2JhbCBBcHAgbGV2ZWxcclxuICAvLyBhcyBhbnRpcGF0dGVybiBzaW5jZSBpdCBkaXNhYmxlcyBwcm9qZWN0IHdpZGUgQXV0b21hdGljIFN0YXRpYyBPcHRpbWl6YXRpb24uXHJcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBpZiAoaW5BcHBDb250ZXh0KSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAnV2FybmluZzogWW91IGhhdmUgb3B0ZWQtb3V0IG9mIEF1dG9tYXRpYyBTdGF0aWMgT3B0aW1pemF0aW9uIGR1ZSB0byBgd2l0aEFwb2xsb2AgaW4gYHBhZ2VzL19hcHBgLlxcbicgK1xyXG4gICAgICAgICAgJ1JlYWQgbW9yZTogaHR0cHM6Ly9lcnIuc2gvbmV4dC5qcy9vcHQtb3V0LWF1dG8tc3RhdGljLW9wdGltaXphdGlvblxcbidcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gSW5pdGlhbGl6ZSBBcG9sbG9DbGllbnQgaWYgbm90IGFscmVhZHkgZG9uZVxyXG4gIGNvbnN0IGFwb2xsb0NsaWVudCA9XHJcbiAgICBjdHguYXBvbGxvQ2xpZW50IHx8XHJcbiAgICBpbml0QXBvbGxvQ2xpZW50KGN0eC5hcG9sbG9TdGF0ZSB8fCB7fSwgaW5BcHBDb250ZXh0ID8gY3R4LmN0eCA6IGN0eClcclxuXHJcbiAgLy8gV2Ugc2VuZCB0aGUgQXBvbGxvIENsaWVudCBhcyBhIHByb3AgdG8gdGhlIGNvbXBvbmVudCB0byBhdm9pZCBjYWxsaW5nIGluaXRBcG9sbG8oKSB0d2ljZSBpbiB0aGUgc2VydmVyLlxyXG4gIC8vIE90aGVyd2lzZSwgdGhlIGNvbXBvbmVudCB3b3VsZCBoYXZlIHRvIGNhbGwgaW5pdEFwb2xsbygpIGFnYWluIGJ1dCB0aGlzXHJcbiAgLy8gdGltZSB3aXRob3V0IHRoZSBjb250ZXh0LiBPbmNlIHRoYXQgaGFwcGVucywgdGhlIGZvbGxvd2luZyBjb2RlIHdpbGwgbWFrZSBzdXJlIHdlIHNlbmRcclxuICAvLyB0aGUgcHJvcCBhcyBgbnVsbGAgdG8gdGhlIGJyb3dzZXIuXHJcbiAgYXBvbGxvQ2xpZW50LnRvSlNPTiA9ICgpID0+IG51bGxcclxuXHJcbiAgLy8gQWRkIGFwb2xsb0NsaWVudCB0byBOZXh0UGFnZUNvbnRleHQgJiBOZXh0QXBwQ29udGV4dC5cclxuICAvLyBUaGlzIGFsbG93cyB1cyB0byBjb25zdW1lIHRoZSBhcG9sbG9DbGllbnQgaW5zaWRlIG91clxyXG4gIC8vIGN1c3RvbSBgZ2V0SW5pdGlhbFByb3BzKHsgYXBvbGxvQ2xpZW50IH0pYC5cclxuICBjdHguYXBvbGxvQ2xpZW50ID0gYXBvbGxvQ2xpZW50XHJcbiAgaWYgKGluQXBwQ29udGV4dCkge1xyXG4gICAgY3R4LmN0eC5hcG9sbG9DbGllbnQgPSBhcG9sbG9DbGllbnRcclxuICB9XHJcblxyXG4gIHJldHVybiBjdHhcclxufVxyXG5cclxuLyoqXHJcbiAqIEFsd2F5cyBjcmVhdGVzIGEgbmV3IGFwb2xsbyBjbGllbnQgb24gdGhlIHNlcnZlclxyXG4gKiBDcmVhdGVzIG9yIHJldXNlcyBhcG9sbG8gY2xpZW50IGluIHRoZSBicm93c2VyLlxyXG4gKiBAcGFyYW0gIHtOb3JtYWxpemVkQ2FjaGVPYmplY3R9IGluaXRpYWxTdGF0ZVxyXG4gKiBAcGFyYW0gIHtOZXh0UGFnZUNvbnRleHR9IGN0eFxyXG4gKi9cclxuY29uc3QgaW5pdEFwb2xsb0NsaWVudCA9IChpbml0aWFsU3RhdGUsIGN0eCkgPT4ge1xyXG4gIC8vIE1ha2Ugc3VyZSB0byBjcmVhdGUgYSBuZXcgY2xpZW50IGZvciBldmVyeSBzZXJ2ZXItc2lkZSByZXF1ZXN0IHNvIHRoYXQgZGF0YVxyXG4gIC8vIGlzbid0IHNoYXJlZCBiZXR3ZWVuIGNvbm5lY3Rpb25zICh3aGljaCB3b3VsZCBiZSBiYWQpXHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICByZXR1cm4gY3JlYXRlQXBvbGxvQ2xpZW50KGluaXRpYWxTdGF0ZSwgY3R4KVxyXG4gIH1cclxuXHJcbiAgLy8gUmV1c2UgY2xpZW50IG9uIHRoZSBjbGllbnQtc2lkZVxyXG4gIGlmICghZ2xvYmFsQXBvbGxvQ2xpZW50KSB7XHJcbiAgICBnbG9iYWxBcG9sbG9DbGllbnQgPSBjcmVhdGVBcG9sbG9DbGllbnQoaW5pdGlhbFN0YXRlLCBjdHgpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZ2xvYmFsQXBvbGxvQ2xpZW50XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgd2l0aEFwb2xsbyBIT0NcclxuICogdGhhdCBwcm92aWRlcyB0aGUgYXBvbGxvQ29udGV4dFxyXG4gKiB0byBhIG5leHQuanMgUGFnZSBvciBBcHBUcmVlLlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IHdpdGhBcG9sbG9PcHRpb25zXHJcbiAqIEBwYXJhbSAge0Jvb2xlYW59IFt3aXRoQXBvbGxvT3B0aW9ucy5zc3I9ZmFsc2VdXHJcbiAqIEByZXR1cm5zIHsoUGFnZUNvbXBvbmVudDogUmVhY3ROb2RlKSA9PiBSZWFjdE5vZGV9XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgd2l0aEFwb2xsbyA9ICh7IHNzciA9IGZhbHNlIH0gPSB7fSkgPT4gUGFnZUNvbXBvbmVudCA9PiB7XHJcbiBcclxuICBjb25zdCBXaXRoQXBvbGxvID0gKHsgYXBvbGxvQ2xpZW50LCBhcG9sbG9TdGF0ZSwgLi4ucGFnZVByb3BzIH0pID0+IHtcclxuICAgIGxldCBjbGllbnRcclxuICAgIGlmIChhcG9sbG9DbGllbnQpIHtcclxuICAgICAgLy8gSGFwcGVucyBvbjogZ2V0RGF0YUZyb21UcmVlICYgbmV4dC5qcyBzc3JcclxuICAgICAgY2xpZW50ID0gYXBvbGxvQ2xpZW50XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBIYXBwZW5zIG9uOiBuZXh0LmpzIGNzclxyXG4gICAgICBjbGllbnQgPSBpbml0QXBvbGxvQ2xpZW50KGFwb2xsb1N0YXRlLCB1bmRlZmluZWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEFwb2xsb1Byb3ZpZGVyIGNsaWVudD17Y2xpZW50fT5cclxuICAgICAgICA8UGFnZUNvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICA8L0Fwb2xsb1Byb3ZpZGVyPlxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgLy8gU2V0IHRoZSBjb3JyZWN0IGRpc3BsYXlOYW1lIGluIGRldmVsb3BtZW50XHJcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgIGNvbnN0IGRpc3BsYXlOYW1lID1cclxuICAgICAgUGFnZUNvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBQYWdlQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCdcclxuICAgIFdpdGhBcG9sbG8uZGlzcGxheU5hbWUgPSBgd2l0aEFwb2xsbygke2Rpc3BsYXlOYW1lfSlgXHJcbiAgfVxyXG5cclxuXHJcbiAgaWYgKHNzciB8fCBQYWdlQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcykge1xyXG4gICAgV2l0aEFwb2xsby5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyBjdHggPT4ge1xyXG4gICAgICBjb25zdCBpbkFwcENvbnRleHQgPSBCb29sZWFuKGN0eC5jdHgpXHJcbiAgICAgIGNvbnN0IHsgYXBvbGxvQ2xpZW50IH0gPSBpbml0T25Db250ZXh0KGN0eClcclxuXHJcbiAgICAgIC8vIFJ1biB3cmFwcGVkIGdldEluaXRpYWxQcm9wcyBtZXRob2RzXHJcbiAgICAgIGxldCBwYWdlUHJvcHMgPSB7fVxyXG4gICAgICBpZiAoUGFnZUNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMpIHtcclxuICAgICAgICBwYWdlUHJvcHMgPSBhd2FpdCBQYWdlQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyhjdHgpXHJcbiAgICAgIH0gZWxzZSBpZiAoaW5BcHBDb250ZXh0KSB7XHJcbiAgICAgICAgcGFnZVByb3BzID0gYXdhaXQgQXBwLmdldEluaXRpYWxQcm9wcyhjdHgpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE9ubHkgb24gdGhlIHNlcnZlcjpcclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY29uc3QgeyBBcHBUcmVlIH0gPSBjdHhcclxuICAgICAgICAvLyBXaGVuIHJlZGlyZWN0aW5nLCB0aGUgcmVzcG9uc2UgaXMgZmluaXNoZWQuXHJcbiAgICAgICAgLy8gTm8gcG9pbnQgaW4gY29udGludWluZyB0byByZW5kZXJcclxuICAgICAgICBpZiAoY3R4LnJlcyAmJiBjdHgucmVzLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gcGFnZVByb3BzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPbmx5IGlmIGRhdGFGcm9tVHJlZSBpcyBlbmFibGVkXHJcbiAgICAgICAgaWYgKHNzciAmJiBBcHBUcmVlKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBJbXBvcnQgYEBhcG9sbG8vcmVhY3Qtc3NyYCBkeW5hbWljYWxseS5cclxuICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBoYXZlIHRoaXMgaW4gb3VyIGNsaWVudCBidW5kbGUuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgZ2V0RGF0YUZyb21UcmVlIH0gPSBhd2FpdCBpbXBvcnQoJ0BhcG9sbG8vcmVhY3Qtc3NyJylcclxuXHJcbiAgICAgICAgICAgIC8vIFNpbmNlIEFwcENvbXBvbmVudHMgYW5kIFBhZ2VDb21wb25lbnRzIGhhdmUgZGlmZmVyZW50IGNvbnRleHQgdHlwZXNcclxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBtb2RpZnkgdGhlaXIgcHJvcHMgYSBsaXR0bGUuXHJcbiAgICAgICAgICAgIGxldCBwcm9wc1xyXG4gICAgICAgICAgICBpZiAoaW5BcHBDb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgcHJvcHMgPSB7IC4uLnBhZ2VQcm9wcywgYXBvbGxvQ2xpZW50IH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBwcm9wcyA9IHsgcGFnZVByb3BzOiB7IC4uLnBhZ2VQcm9wcywgYXBvbGxvQ2xpZW50IH0gfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBUYWtlIHRoZSBOZXh0LmpzIEFwcFRyZWUsIGRldGVybWluZSB3aGljaCBxdWVyaWVzIGFyZSBuZWVkZWQgdG8gcmVuZGVyLFxyXG4gICAgICAgICAgICAvLyBhbmQgZmV0Y2ggdGhlbS4gVGhpcyBtZXRob2QgY2FuIGJlIHByZXR0eSBzbG93IHNpbmNlIGl0IHJlbmRlcnNcclxuICAgICAgICAgICAgLy8geW91ciBlbnRpcmUgQXBwVHJlZSBvbmNlIGZvciBldmVyeSBxdWVyeS4gQ2hlY2sgb3V0IGFwb2xsbyBmcmFnbWVudHNcclxuICAgICAgICAgICAgLy8gaWYgeW91IHdhbnQgdG8gcmVkdWNlIHRoZSBudW1iZXIgb2YgcmVyZW5kZXJzLlxyXG4gICAgICAgICAgICAvLyBodHRwczovL3d3dy5hcG9sbG9ncmFwaHFsLmNvbS9kb2NzL3JlYWN0L2RhdGEvZnJhZ21lbnRzL1xyXG4gICAgICAgICAgICBhd2FpdCBnZXREYXRhRnJvbVRyZWUoPEFwcFRyZWUgey4uLnByb3BzfSAvPilcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIFByZXZlbnQgQXBvbGxvIENsaWVudCBHcmFwaFFMIGVycm9ycyBmcm9tIGNyYXNoaW5nIFNTUi5cclxuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZW0gaW4gY29tcG9uZW50cyB2aWEgdGhlIGRhdGEuZXJyb3IgcHJvcDpcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cuYXBvbGxvZ3JhcGhxbC5jb20vZG9jcy9yZWFjdC9hcGkvcmVhY3QtYXBvbGxvLmh0bWwjZ3JhcGhxbC1xdWVyeS1kYXRhLWVycm9yXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIHJ1bm5pbmcgYGdldERhdGFGcm9tVHJlZWAnLCBlcnJvcilcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBnZXREYXRhRnJvbVRyZWUgZG9lcyBub3QgY2FsbCBjb21wb25lbnRXaWxsVW5tb3VudFxyXG4gICAgICAgICAgLy8gaGVhZCBzaWRlIGVmZmVjdCB0aGVyZWZvcmUgbmVlZCB0byBiZSBjbGVhcmVkIG1hbnVhbGx5XHJcbiAgICAgICAgICBIZWFkLnJld2luZCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnBhZ2VQcm9wcyxcclxuICAgICAgICAvLyBFeHRyYWN0IHF1ZXJ5IGRhdGEgZnJvbSB0aGUgQXBvbGxvIHN0b3JlXHJcbiAgICAgICAgYXBvbGxvU3RhdGU6IGFwb2xsb0NsaWVudC5jYWNoZS5leHRyYWN0KCksXHJcbiAgICAgICAgLy8gUHJvdmlkZSB0aGUgY2xpZW50IGZvciBzc3IuIEFzIHNvb24gYXMgdGhpcyBwYXlsb2FkXHJcbiAgICAgICAgLy8gZ2V0cyBKU09OLnN0cmluZ2lmaWVkIGl0IHdpbGwgcmVtb3ZlIGl0c2VsZi5cclxuICAgICAgICBhcG9sbG9DbGllbnQ6IGN0eC5hcG9sbG9DbGllbnQsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBXaXRoQXBvbGxvXHJcbn1cclxuIiwiaW1wb3J0IHsgQXBvbGxvQ2xpZW50IH0gZnJvbSBcImFwb2xsby1jbGllbnRcIlxyXG5pbXBvcnQgeyBJbk1lbW9yeUNhY2hlIH0gZnJvbSBcImFwb2xsby1jYWNoZS1pbm1lbW9yeVwiXHJcbmltcG9ydCB7IEh0dHBMaW5rIH0gZnJvbSBcImFwb2xsby1saW5rLWh0dHBcIlxyXG5pbXBvcnQgZmV0Y2ggZnJvbSBcImlzb21vcnBoaWMtdW5mZXRjaFwiXHJcbi8vIGltcG9ydCB7IFNjaGVtYUxpbmsgfSBmcm9tICdhcG9sbG8tbGluay1zY2hlbWEnO1xyXG4vLyBpbXBvcnQge3NjaGVtYX0gZnJvbSAnbGliL3NlcnZlci9hcG9sbG9TZXJ2ZXIvc2NoZW1hJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXBvbGxvQ2xpZW50KGluaXRpYWxTdGF0ZSwgY3R4KSB7XHJcbiAgLy8gVGhlIGBjdHhgIChOZXh0UGFnZUNvbnRleHQpIHdpbGwgb25seSBiZSBwcmVzZW50IG9uIHRoZSBzZXJ2ZXIuXHJcbiAgLy8gdXNlIGl0IHRvIGV4dHJhY3QgYXV0aCBoZWFkZXJzIChjdHgucmVxKSBvciBzaW1pbGFyLlxyXG5cclxuICBjb25zdCBlbmNoYW5jZWRGZXRjaCA9ICh1cmwsIGluaXQpID0+XHJcbiAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgLi4uaW5pdCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC4uLmluaXQuaGVhZGVycyxcclxuICAgICAgICBDb29raWU6IGN0eC5yZXEuaGVhZGVycy5jb29raWUsXHJcbiAgICAgIH0sXHJcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgIH0pXHJcblxyXG4gIHJldHVybiBuZXcgQXBvbGxvQ2xpZW50KHtcclxuICAgIHNzck1vZGU6IEJvb2xlYW4oY3R4KSxcclxuICAgIGxpbms6IG5ldyBIdHRwTGluayh7XHJcbiAgICAgIHVyaTogXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2dyYXBocWxcIiwgLy8gU2VydmVyIFVSTCAobXVzdCBiZSBhYnNvbHV0ZSlcclxuICAgICAgLy8gdXJpOiAnaHR0cHM6Ly9hcGkuZ3JhcGguY29vbC9zaW1wbGUvdjEvY2l4bWt0MnVsMDFxMDAxMjJta3NnODJwbicsIC8vIFNlcnZlciBVUkwgKG11c3QgYmUgYWJzb2x1dGUpXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIiwgLy8gQWRkaXRpb25hbCBmZXRjaCgpIG9wdGlvbnMgbGlrZSBgY3JlZGVudGlhbHNgIG9yIGBoZWFkZXJzYFxyXG4gICAgICBmZXRjaDogY3R4ID8gZW5jaGFuY2VkRmV0Y2ggOiBmZXRjaCxcclxuICAgIH0pLFxyXG4gICAgLy8gbGluazpuZXcgU2NoZW1hTGluayh7c2NoZW1hfSksXHJcbiAgICBjYWNoZTogbmV3IEluTWVtb3J5Q2FjaGUoKS5yZXN0b3JlKGluaXRpYWxTdGF0ZSksXHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgaW52YXJpYW50IH0gZnJvbSAndHMtaW52YXJpYW50JztcblxudmFyIGFwb2xsb0NvbnRleHQ7XG5mdW5jdGlvbiBnZXRBcG9sbG9Db250ZXh0KCkge1xuICAgIGlmICghYXBvbGxvQ29udGV4dCkge1xuICAgICAgICBhcG9sbG9Db250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7fSk7XG4gICAgfVxuICAgIHJldHVybiBhcG9sbG9Db250ZXh0O1xufVxuZnVuY3Rpb24gcmVzZXRBcG9sbG9Db250ZXh0KCkge1xuICAgIGFwb2xsb0NvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KHt9KTtcbn1cblxudmFyIEFwb2xsb1Byb3ZpZGVyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIGNsaWVudCA9IF9hLmNsaWVudCwgY2hpbGRyZW4gPSBfYS5jaGlsZHJlbjtcbiAgICB2YXIgQXBvbGxvQ29udGV4dCA9IGdldEFwb2xsb0NvbnRleHQoKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChBcG9sbG9Db250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSB7IGNvbnRleHQgPSB7fTsgfVxuICAgICAgICBpZiAoY2xpZW50ICYmIGNvbnRleHQuY2xpZW50ICE9PSBjbGllbnQpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LCB7IGNsaWVudDogY2xpZW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChjb250ZXh0LmNsaWVudCwgNSkgOiBpbnZhcmlhbnQoY29udGV4dC5jbGllbnQsICdBcG9sbG9Qcm92aWRlciB3YXMgbm90IHBhc3NlZCBhIGNsaWVudCBpbnN0YW5jZS4gTWFrZSAnICtcbiAgICAgICAgICAgICdzdXJlIHlvdSBwYXNzIGluIHlvdXIgY2xpZW50IHZpYSB0aGUgXCJjbGllbnRcIiBwcm9wLicpO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBvbGxvQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogY29udGV4dCB9LCBjaGlsZHJlbikpO1xuICAgIH0pO1xufTtcblxudmFyIEFwb2xsb0NvbnN1bWVyID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgdmFyIEFwb2xsb0NvbnRleHQgPSBnZXRBcG9sbG9Db250ZXh0KCk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBvbGxvQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGNvbnRleHQgJiYgY29udGV4dC5jbGllbnQsIDYpIDogaW52YXJpYW50KGNvbnRleHQgJiYgY29udGV4dC5jbGllbnQsICdDb3VsZCBub3QgZmluZCBcImNsaWVudFwiIGluIHRoZSBjb250ZXh0IG9mIEFwb2xsb0NvbnN1bWVyLiAnICtcbiAgICAgICAgICAgICdXcmFwIHRoZSByb290IGNvbXBvbmVudCBpbiBhbiA8QXBvbGxvUHJvdmlkZXI+LicpO1xuICAgICAgICByZXR1cm4gcHJvcHMuY2hpbGRyZW4oY29udGV4dC5jbGllbnQpO1xuICAgIH0pO1xufTtcblxudmFyIERvY3VtZW50VHlwZTtcbihmdW5jdGlvbiAoRG9jdW1lbnRUeXBlKSB7XG4gICAgRG9jdW1lbnRUeXBlW0RvY3VtZW50VHlwZVtcIlF1ZXJ5XCJdID0gMF0gPSBcIlF1ZXJ5XCI7XG4gICAgRG9jdW1lbnRUeXBlW0RvY3VtZW50VHlwZVtcIk11dGF0aW9uXCJdID0gMV0gPSBcIk11dGF0aW9uXCI7XG4gICAgRG9jdW1lbnRUeXBlW0RvY3VtZW50VHlwZVtcIlN1YnNjcmlwdGlvblwiXSA9IDJdID0gXCJTdWJzY3JpcHRpb25cIjtcbn0pKERvY3VtZW50VHlwZSB8fCAoRG9jdW1lbnRUeXBlID0ge30pKTtcbnZhciBjYWNoZSA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIG9wZXJhdGlvbk5hbWUodHlwZSkge1xuICAgIHZhciBuYW1lO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIERvY3VtZW50VHlwZS5RdWVyeTpcbiAgICAgICAgICAgIG5hbWUgPSAnUXVlcnknO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRG9jdW1lbnRUeXBlLk11dGF0aW9uOlxuICAgICAgICAgICAgbmFtZSA9ICdNdXRhdGlvbic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBEb2N1bWVudFR5cGUuU3Vic2NyaXB0aW9uOlxuICAgICAgICAgICAgbmFtZSA9ICdTdWJzY3JpcHRpb24nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBuYW1lO1xufVxuZnVuY3Rpb24gcGFyc2VyKGRvY3VtZW50KSB7XG4gICAgdmFyIGNhY2hlZCA9IGNhY2hlLmdldChkb2N1bWVudCk7XG4gICAgaWYgKGNhY2hlZClcbiAgICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICB2YXIgdmFyaWFibGVzLCB0eXBlLCBuYW1lO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudCghIWRvY3VtZW50ICYmICEhZG9jdW1lbnQua2luZCwgMSkgOiBpbnZhcmlhbnQoISFkb2N1bWVudCAmJiAhIWRvY3VtZW50LmtpbmQsIFwiQXJndW1lbnQgb2YgXCIgKyBkb2N1bWVudCArIFwiIHBhc3NlZCB0byBwYXJzZXIgd2FzIG5vdCBhIHZhbGlkIEdyYXBoUUwgXCIgK1xuICAgICAgICBcIkRvY3VtZW50Tm9kZS4gWW91IG1heSBuZWVkIHRvIHVzZSAnZ3JhcGhxbC10YWcnIG9yIGFub3RoZXIgbWV0aG9kIFwiICtcbiAgICAgICAgXCJ0byBjb252ZXJ0IHlvdXIgb3BlcmF0aW9uIGludG8gYSBkb2N1bWVudFwiKTtcbiAgICB2YXIgZnJhZ21lbnRzID0gZG9jdW1lbnQuZGVmaW5pdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmtpbmQgPT09ICdGcmFnbWVudERlZmluaXRpb24nOyB9KTtcbiAgICB2YXIgcXVlcmllcyA9IGRvY3VtZW50LmRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicgJiYgeC5vcGVyYXRpb24gPT09ICdxdWVyeSc7XG4gICAgfSk7XG4gICAgdmFyIG11dGF0aW9ucyA9IGRvY3VtZW50LmRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicgJiYgeC5vcGVyYXRpb24gPT09ICdtdXRhdGlvbic7XG4gICAgfSk7XG4gICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBkb2N1bWVudC5kZWZpbml0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nICYmIHgub3BlcmF0aW9uID09PSAnc3Vic2NyaXB0aW9uJztcbiAgICB9KTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoIWZyYWdtZW50cy5sZW5ndGggfHxcbiAgICAgICAgKHF1ZXJpZXMubGVuZ3RoIHx8IG11dGF0aW9ucy5sZW5ndGggfHwgc3Vic2NyaXB0aW9ucy5sZW5ndGgpLCAyKSA6IGludmFyaWFudCghZnJhZ21lbnRzLmxlbmd0aCB8fFxuICAgICAgICAocXVlcmllcy5sZW5ndGggfHwgbXV0YXRpb25zLmxlbmd0aCB8fCBzdWJzY3JpcHRpb25zLmxlbmd0aCksIFwiUGFzc2luZyBvbmx5IGEgZnJhZ21lbnQgdG8gJ2dyYXBocWwnIGlzIG5vdCB5ZXQgc3VwcG9ydGVkLiBcIiArXG4gICAgICAgIFwiWW91IG11c3QgaW5jbHVkZSBhIHF1ZXJ5LCBzdWJzY3JpcHRpb24gb3IgbXV0YXRpb24gYXMgd2VsbFwiKTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQocXVlcmllcy5sZW5ndGggKyBtdXRhdGlvbnMubGVuZ3RoICsgc3Vic2NyaXB0aW9ucy5sZW5ndGggPD0gMSwgMykgOiBpbnZhcmlhbnQocXVlcmllcy5sZW5ndGggKyBtdXRhdGlvbnMubGVuZ3RoICsgc3Vic2NyaXB0aW9ucy5sZW5ndGggPD0gMSwgXCJyZWFjdC1hcG9sbG8gb25seSBzdXBwb3J0cyBhIHF1ZXJ5LCBzdWJzY3JpcHRpb24sIG9yIGEgbXV0YXRpb24gcGVyIEhPQy4gXCIgK1xuICAgICAgICAoZG9jdW1lbnQgKyBcIiBoYWQgXCIgKyBxdWVyaWVzLmxlbmd0aCArIFwiIHF1ZXJpZXMsIFwiICsgc3Vic2NyaXB0aW9ucy5sZW5ndGggKyBcIiBcIikgK1xuICAgICAgICAoXCJzdWJzY3JpcHRpb25zIGFuZCBcIiArIG11dGF0aW9ucy5sZW5ndGggKyBcIiBtdXRhdGlvbnMuIFwiKSArXG4gICAgICAgIFwiWW91IGNhbiB1c2UgJ2NvbXBvc2UnIHRvIGpvaW4gbXVsdGlwbGUgb3BlcmF0aW9uIHR5cGVzIHRvIGEgY29tcG9uZW50XCIpO1xuICAgIHR5cGUgPSBxdWVyaWVzLmxlbmd0aCA/IERvY3VtZW50VHlwZS5RdWVyeSA6IERvY3VtZW50VHlwZS5NdXRhdGlvbjtcbiAgICBpZiAoIXF1ZXJpZXMubGVuZ3RoICYmICFtdXRhdGlvbnMubGVuZ3RoKVxuICAgICAgICB0eXBlID0gRG9jdW1lbnRUeXBlLlN1YnNjcmlwdGlvbjtcbiAgICB2YXIgZGVmaW5pdGlvbnMgPSBxdWVyaWVzLmxlbmd0aFxuICAgICAgICA/IHF1ZXJpZXNcbiAgICAgICAgOiBtdXRhdGlvbnMubGVuZ3RoXG4gICAgICAgICAgICA/IG11dGF0aW9uc1xuICAgICAgICAgICAgOiBzdWJzY3JpcHRpb25zO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChkZWZpbml0aW9ucy5sZW5ndGggPT09IDEsIDQpIDogaW52YXJpYW50KGRlZmluaXRpb25zLmxlbmd0aCA9PT0gMSwgXCJyZWFjdC1hcG9sbG8gb25seSBzdXBwb3J0cyBvbmUgZGVmaW5pdGlvbiBwZXIgSE9DLiBcIiArIGRvY3VtZW50ICsgXCIgaGFkIFwiICtcbiAgICAgICAgKGRlZmluaXRpb25zLmxlbmd0aCArIFwiIGRlZmluaXRpb25zLiBcIikgK1xuICAgICAgICBcIllvdSBjYW4gdXNlICdjb21wb3NlJyB0byBqb2luIG11bHRpcGxlIG9wZXJhdGlvbiB0eXBlcyB0byBhIGNvbXBvbmVudFwiKTtcbiAgICB2YXIgZGVmaW5pdGlvbiA9IGRlZmluaXRpb25zWzBdO1xuICAgIHZhcmlhYmxlcyA9IGRlZmluaXRpb24udmFyaWFibGVEZWZpbml0aW9ucyB8fCBbXTtcbiAgICBpZiAoZGVmaW5pdGlvbi5uYW1lICYmIGRlZmluaXRpb24ubmFtZS5raW5kID09PSAnTmFtZScpIHtcbiAgICAgICAgbmFtZSA9IGRlZmluaXRpb24ubmFtZS52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG5hbWUgPSAnZGF0YSc7XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0geyBuYW1lOiBuYW1lLCB0eXBlOiB0eXBlLCB2YXJpYWJsZXM6IHZhcmlhYmxlcyB9O1xuICAgIGNhY2hlLnNldChkb2N1bWVudCwgcGF5bG9hZCk7XG4gICAgcmV0dXJuIHBheWxvYWQ7XG59XG5cbmV4cG9ydCB7IEFwb2xsb0NvbnN1bWVyLCBBcG9sbG9Qcm92aWRlciwgRG9jdW1lbnRUeXBlLCBnZXRBcG9sbG9Db250ZXh0LCBvcGVyYXRpb25OYW1lLCBwYXJzZXIsIHJlc2V0QXBvbGxvQ29udGV4dCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3QtY29tbW9uLmVzbS5qcy5tYXBcbiIsImltcG9ydCB7IHBhcnNlciwgb3BlcmF0aW9uTmFtZSwgRG9jdW1lbnRUeXBlLCBnZXRBcG9sbG9Db250ZXh0IH0gZnJvbSAnQGFwb2xsby9yZWFjdC1jb21tb24nO1xuZXhwb3J0IHsgQXBvbGxvQ29uc3VtZXIsIEFwb2xsb1Byb3ZpZGVyLCBnZXRBcG9sbG9Db250ZXh0LCByZXNldEFwb2xsb0NvbnRleHQgfSBmcm9tICdAYXBvbGxvL3JlYWN0LWNvbW1vbic7XG5pbXBvcnQgeyBfX2V4dGVuZHMsIF9fYXNzaWduIH0gZnJvbSAndHNsaWInO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlQ29udGV4dCwgdXNlUmVkdWNlciwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5ldHdvcmtTdGF0dXMsIEFwb2xsb0Vycm9yIH0gZnJvbSAnYXBvbGxvLWNsaWVudCc7XG5pbXBvcnQgeyBlcXVhbCB9IGZyb20gJ0B3cnkvZXF1YWxpdHknO1xuaW1wb3J0IHsgaW52YXJpYW50IH0gZnJvbSAndHMtaW52YXJpYW50JztcblxudmFyIE9wZXJhdGlvbkRhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9wZXJhdGlvbkRhdGEob3B0aW9ucywgY29udGV4dCkge1xuICAgICAgICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByZXZpb3VzT3B0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB7fTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQgfHwge307XG4gICAgfVxuICAgIE9wZXJhdGlvbkRhdGEucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gICAgfTtcbiAgICBPcGVyYXRpb25EYXRhLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKG5ld09wdGlvbnMsIHN0b3JlUHJldmlvdXMpIHtcbiAgICAgICAgaWYgKHN0b3JlUHJldmlvdXMgPT09IHZvaWQgMCkgeyBzdG9yZVByZXZpb3VzID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHN0b3JlUHJldmlvdXMgJiYgIWVxdWFsKHRoaXMub3B0aW9ucywgbmV3T3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG5ld09wdGlvbnM7XG4gICAgfTtcbiAgICBPcGVyYXRpb25EYXRhLnByb3RvdHlwZS51bm1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgIH07XG4gICAgT3BlcmF0aW9uRGF0YS5wcm90b3R5cGUucmVmcmVzaENsaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsaWVudCA9ICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmNsaWVudCkgfHxcbiAgICAgICAgICAgICh0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LmNsaWVudCk7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudCghIWNsaWVudCwgMikgOiBpbnZhcmlhbnQoISFjbGllbnQsICdDb3VsZCBub3QgZmluZCBcImNsaWVudFwiIGluIHRoZSBjb250ZXh0IG9yIHBhc3NlZCBpbiBhcyBhbiBvcHRpb24uICcgK1xuICAgICAgICAgICAgJ1dyYXAgdGhlIHJvb3QgY29tcG9uZW50IGluIGFuIDxBcG9sbG9Qcm92aWRlcj4sIG9yIHBhc3MgYW4gJyArXG4gICAgICAgICAgICAnQXBvbGxvQ2xpZW50IGluc3RhbmNlIGluIHZpYSBvcHRpb25zLicpO1xuICAgICAgICB2YXIgaXNOZXcgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNsaWVudCAhPT0gdGhpcy5jbGllbnQpIHtcbiAgICAgICAgICAgIGlzTmV3ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNsaWVudDogdGhpcy5jbGllbnQsXG4gICAgICAgICAgICBpc05ldzogaXNOZXdcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE9wZXJhdGlvbkRhdGEucHJvdG90eXBlLnZlcmlmeURvY3VtZW50VHlwZSA9IGZ1bmN0aW9uIChkb2N1bWVudCwgdHlwZSkge1xuICAgICAgICB2YXIgb3BlcmF0aW9uID0gcGFyc2VyKGRvY3VtZW50KTtcbiAgICAgICAgdmFyIHJlcXVpcmVkT3BlcmF0aW9uTmFtZSA9IG9wZXJhdGlvbk5hbWUodHlwZSk7XG4gICAgICAgIHZhciB1c2VkT3BlcmF0aW9uTmFtZSA9IG9wZXJhdGlvbk5hbWUob3BlcmF0aW9uLnR5cGUpO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQob3BlcmF0aW9uLnR5cGUgPT09IHR5cGUsIDMpIDogaW52YXJpYW50KG9wZXJhdGlvbi50eXBlID09PSB0eXBlLCBcIlJ1bm5pbmcgYSBcIiArIHJlcXVpcmVkT3BlcmF0aW9uTmFtZSArIFwiIHJlcXVpcmVzIGEgZ3JhcGhxbCBcIiArXG4gICAgICAgICAgICAocmVxdWlyZWRPcGVyYXRpb25OYW1lICsgXCIsIGJ1dCBhIFwiICsgdXNlZE9wZXJhdGlvbk5hbWUgKyBcIiB3YXMgdXNlZCBpbnN0ZWFkLlwiKSk7XG4gICAgfTtcbiAgICByZXR1cm4gT3BlcmF0aW9uRGF0YTtcbn0oKSk7XG5cbnZhciBRdWVyeURhdGEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhRdWVyeURhdGEsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUXVlcnlEYXRhKF9hKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gX2Eub3B0aW9ucywgY29udGV4dCA9IF9hLmNvbnRleHQsIG9uTmV3RGF0YSA9IF9hLm9uTmV3RGF0YTtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0aW9ucywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucHJldmlvdXNEYXRhID0ge307XG4gICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZhYmxlID0ge307XG4gICAgICAgIF90aGlzLnJ1bkxhenkgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMucnVuTGF6eVF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIF90aGlzLmNsZWFudXAoKTtcbiAgICAgICAgICAgIF90aGlzLnJ1bkxhenkgPSB0cnVlO1xuICAgICAgICAgICAgX3RoaXMubGF6eU9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgX3RoaXMub25OZXdEYXRhKCk7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmdldEV4ZWN1dGVSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gX3RoaXMuZ2V0UXVlcnlSZXN1bHQoKTtcbiAgICAgICAgICAgIF90aGlzLnN0YXJ0UXVlcnlTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLm9ic1JlZmV0Y2ggPSBmdW5jdGlvbiAodmFyaWFibGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkucmVmZXRjaCh2YXJpYWJsZXMpO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5vYnNGZXRjaE1vcmUgPSBmdW5jdGlvbiAoZmV0Y2hNb3JlT3B0aW9ucykgeyByZXR1cm4gX3RoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkuZmV0Y2hNb3JlKGZldGNoTW9yZU9wdGlvbnMpOyB9O1xuICAgICAgICBfdGhpcy5vYnNVcGRhdGVRdWVyeSA9IGZ1bmN0aW9uIChtYXBGbikgeyByZXR1cm4gX3RoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkudXBkYXRlUXVlcnkobWFwRm4pOyB9O1xuICAgICAgICBfdGhpcy5vYnNTdGFydFBvbGxpbmcgPSBmdW5jdGlvbiAocG9sbEludGVydmFsKSB7XG4gICAgICAgICAgICBfdGhpcy5jdXJyZW50T2JzZXJ2YWJsZSAmJlxuICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5ICYmXG4gICAgICAgICAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkuc3RhcnRQb2xsaW5nKHBvbGxJbnRlcnZhbCk7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLm9ic1N0b3BQb2xsaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuY3VycmVudE9ic2VydmFibGUgJiZcbiAgICAgICAgICAgICAgICBfdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeSAmJlxuICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5LnN0b3BQb2xsaW5nKCk7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLm9ic1N1YnNjcmliZVRvTW9yZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiBfdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeS5zdWJzY3JpYmVUb01vcmUob3B0aW9ucyk7IH07XG4gICAgICAgIF90aGlzLm9uTmV3RGF0YSA9IG9uTmV3RGF0YTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBRdWVyeURhdGEucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaENsaWVudCgpO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLmdldE9wdGlvbnMoKSwgc2tpcCA9IF9hLnNraXAsIHF1ZXJ5ID0gX2EucXVlcnk7XG4gICAgICAgIGlmIChza2lwIHx8IHF1ZXJ5ICE9PSB0aGlzLnByZXZpb3VzRGF0YS5xdWVyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVRdWVyeVN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c0RhdGEucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU9ic2VydmFibGVRdWVyeSgpO1xuICAgICAgICBpZiAodGhpcy5pc01vdW50ZWQpXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UXVlcnlTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXhlY3V0ZVNzclJlc3VsdCgpIHx8IHRoaXMuZ2V0RXhlY3V0ZVJlc3VsdCgpO1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5leGVjdXRlTGF6eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnJ1bkxhenlcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIHRoaXMucnVuTGF6eVF1ZXJ5LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IE5ldHdvcmtTdGF0dXMucmVhZHksXG4gICAgICAgICAgICAgICAgICAgIGNhbGxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgOiBbdGhpcy5ydW5MYXp5UXVlcnksIHRoaXMuZXhlY3V0ZSgpXTtcbiAgICB9O1xuICAgIFF1ZXJ5RGF0YS5wcm90b3R5cGUuZmV0Y2hEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuICAgICAgICBpZiAob3B0aW9ucy5za2lwIHx8IG9wdGlvbnMuc3NyID09PSBmYWxzZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIG9icyA9IHRoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnk7XG4gICAgICAgIHZhciBjdXJyZW50UmVzdWx0ID0gb2JzLmdldEN1cnJlbnRSZXN1bHQoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRSZXN1bHQubG9hZGluZyA/IG9icy5yZXN1bHQoKSA6IGZhbHNlO1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5hZnRlckV4ZWN1dGUgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF9iID0gKF9hID09PSB2b2lkIDAgPyB7fSA6IF9hKS5sYXp5LCBsYXp5ID0gX2IgPT09IHZvaWQgMCA/IGZhbHNlIDogX2I7XG4gICAgICAgIHRoaXMuaXNNb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFsYXp5IHx8IHRoaXMucnVuTGF6eSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvck9yQ29tcGxldGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2aW91c09wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5tb3VudC5iaW5kKHRoaXMpO1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlbW92ZVF1ZXJ5U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5O1xuICAgICAgICBkZWxldGUgdGhpcy5wcmV2aW91c0RhdGEucmVzdWx0O1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF9zdXBlci5wcm90b3R5cGUuZ2V0T3B0aW9ucy5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5sYXp5T3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucy52YXJpYWJsZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucy52YXJpYWJsZXMpLCB0aGlzLmxhenlPcHRpb25zLnZhcmlhYmxlcyk7XG4gICAgICAgICAgICBvcHRpb25zLmNvbnRleHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucy5jb250ZXh0KSwgdGhpcy5sYXp5T3B0aW9ucy5jb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ydW5MYXp5KSB7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5za2lwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5zc3JJbml0aWF0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LnJlbmRlclByb21pc2VzO1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5nZXRFeGVjdXRlU3NyUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3NyRGlzYWJsZWQgPSB0aGlzLmdldE9wdGlvbnMoKS5zc3IgPT09IGZhbHNlO1xuICAgICAgICB2YXIgZmV0Y2hEaXNhYmxlZCA9IHRoaXMucmVmcmVzaENsaWVudCgpLmNsaWVudC5kaXNhYmxlTmV0d29ya0ZldGNoZXM7XG4gICAgICAgIHZhciBzc3JMb2FkaW5nID0gX19hc3NpZ24oeyBsb2FkaW5nOiB0cnVlLCBuZXR3b3JrU3RhdHVzOiBOZXR3b3JrU3RhdHVzLmxvYWRpbmcsIGNhbGxlZDogdHJ1ZSwgZGF0YTogdW5kZWZpbmVkLCBzdGFsZTogZmFsc2UsIGNsaWVudDogdGhpcy5jbGllbnQgfSwgdGhpcy5vYnNlcnZhYmxlUXVlcnlGaWVsZHMoKSk7XG4gICAgICAgIGlmIChzc3JEaXNhYmxlZCAmJiAodGhpcy5zc3JJbml0aWF0ZWQoKSB8fCBmZXRjaERpc2FibGVkKSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c0RhdGEucmVzdWx0ID0gc3NyTG9hZGluZztcbiAgICAgICAgICAgIHJldHVybiBzc3JMb2FkaW5nO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIGlmICh0aGlzLnNzckluaXRpYXRlZCgpKSB7XG4gICAgICAgICAgICByZXN1bHQgPVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yZW5kZXJQcm9taXNlcy5hZGRRdWVyeVByb21pc2UodGhpcywgdGhpcy5nZXRFeGVjdXRlUmVzdWx0KSB8fCBzc3JMb2FkaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBRdWVyeURhdGEucHJvdG90eXBlLnByZXBhcmVPYnNlcnZhYmxlUXVlcnlPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuICAgICAgICB0aGlzLnZlcmlmeURvY3VtZW50VHlwZShvcHRpb25zLnF1ZXJ5LCBEb2N1bWVudFR5cGUuUXVlcnkpO1xuICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSBvcHRpb25zLmRpc3BsYXlOYW1lIHx8ICdRdWVyeSc7XG4gICAgICAgIGlmICh0aGlzLnNzckluaXRpYXRlZCgpICYmXG4gICAgICAgICAgICAob3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScgfHxcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtYW5kLW5ldHdvcmsnKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5mZXRjaFBvbGljeSA9ICdjYWNoZS1maXJzdCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBkaXNwbGF5TmFtZTogZGlzcGxheU5hbWUsIGNvbnRleHQ6IG9wdGlvbnMuY29udGV4dCwgbWV0YWRhdGE6IHsgcmVhY3RDb21wb25lbnQ6IHsgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lIH0gfSB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5RGF0YS5wcm90b3R5cGUuaW5pdGlhbGl6ZU9ic2VydmFibGVRdWVyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKHRoaXMuc3NySW5pdGlhdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkgPSB0aGlzLmNvbnRleHQucmVuZGVyUHJvbWlzZXMuZ2V0U1NST2JzZXJ2YWJsZSh0aGlzLmdldE9wdGlvbnMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5T3B0aW9ucyA9IHRoaXMucHJlcGFyZU9ic2VydmFibGVRdWVyeU9wdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNEYXRhLm9ic2VydmFibGVRdWVyeU9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb2JzZXJ2YWJsZVF1ZXJ5T3B0aW9ucyksIHsgY2hpbGRyZW46IG51bGwgfSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5ID0gdGhpcy5yZWZyZXNoQ2xpZW50KCkuY2xpZW50LndhdGNoUXVlcnkoX19hc3NpZ24oe30sIG9ic2VydmFibGVRdWVyeU9wdGlvbnMpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNzckluaXRpYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgKF9iID0gKF9hID0gdGhpcy5jb250ZXh0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVuZGVyUHJvbWlzZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZWdpc3RlclNTUk9ic2VydmFibGUodGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeSwgb2JzZXJ2YWJsZVF1ZXJ5T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5RGF0YS5wcm90b3R5cGUudXBkYXRlT2JzZXJ2YWJsZVF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZU9ic2VydmFibGVRdWVyeSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdPYnNlcnZhYmxlUXVlcnlPcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMucHJlcGFyZU9ic2VydmFibGVRdWVyeU9wdGlvbnMoKSksIHsgY2hpbGRyZW46IG51bGwgfSk7XG4gICAgICAgIGlmICghZXF1YWwobmV3T2JzZXJ2YWJsZVF1ZXJ5T3B0aW9ucywgdGhpcy5wcmV2aW91c0RhdGEub2JzZXJ2YWJsZVF1ZXJ5T3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNEYXRhLm9ic2VydmFibGVRdWVyeU9wdGlvbnMgPSBuZXdPYnNlcnZhYmxlUXVlcnlPcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50T2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC5xdWVyeS5zZXRPcHRpb25zKG5ld09ic2VydmFibGVRdWVyeU9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5RGF0YS5wcm90b3R5cGUuc3RhcnRRdWVyeVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE9ic2VydmFibGUuc3Vic2NyaXB0aW9uIHx8IHRoaXMuZ2V0T3B0aW9ucygpLnNraXApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBvYnNRdWVyeSA9IHRoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnk7XG4gICAgICAgIHRoaXMuY3VycmVudE9ic2VydmFibGUuc3Vic2NyaXB0aW9uID0gb2JzUXVlcnkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHZhciBsb2FkaW5nID0gX2EubG9hZGluZywgbmV0d29ya1N0YXR1cyA9IF9hLm5ldHdvcmtTdGF0dXMsIGRhdGEgPSBfYS5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1Jlc3VsdCA9IF90aGlzLnByZXZpb3VzRGF0YS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzUmVzdWx0ICYmXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzUmVzdWx0LmxvYWRpbmcgPT09IGxvYWRpbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNSZXN1bHQubmV0d29ya1N0YXR1cyA9PT0gbmV0d29ya1N0YXR1cyAmJlxuICAgICAgICAgICAgICAgICAgICBlcXVhbChwcmV2aW91c1Jlc3VsdC5kYXRhLCBkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLm9uTmV3RGF0YSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXN1YnNjcmliZVRvUXVlcnkoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yLmhhc093blByb3BlcnR5KCdncmFwaFFMRXJyb3JzJykpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1Jlc3VsdCA9IF90aGlzLnByZXZpb3VzRGF0YS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKChwcmV2aW91c1Jlc3VsdCAmJiBwcmV2aW91c1Jlc3VsdC5sb2FkaW5nKSB8fFxuICAgICAgICAgICAgICAgICAgICAhZXF1YWwoZXJyb3IsIF90aGlzLnByZXZpb3VzRGF0YS5lcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucHJldmlvdXNEYXRhLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9uTmV3RGF0YSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5yZXN1YnNjcmliZVRvUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUXVlcnlTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgdmFyIGxhc3RFcnJvciA9IHRoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkuZ2V0TGFzdEVycm9yKCk7XG4gICAgICAgIHZhciBsYXN0UmVzdWx0ID0gdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeS5nZXRMYXN0UmVzdWx0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkucmVzZXRMYXN0UmVzdWx0cygpO1xuICAgICAgICB0aGlzLnN0YXJ0UXVlcnlTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5LCB7XG4gICAgICAgICAgICBsYXN0RXJyb3I6IGxhc3RFcnJvcixcbiAgICAgICAgICAgIGxhc3RSZXN1bHQ6IGxhc3RSZXN1bHQsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5nZXRRdWVyeVJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMub2JzZXJ2YWJsZVF1ZXJ5RmllbGRzKCk7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLnNraXApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXN1bHQpLCB7IGRhdGE6IHVuZGVmaW5lZCwgZXJyb3I6IHVuZGVmaW5lZCwgbG9hZGluZzogZmFsc2UsIGNhbGxlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UmVzdWx0ID0gdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeS5nZXRDdXJyZW50UmVzdWx0KCk7XG4gICAgICAgICAgICB2YXIgbG9hZGluZyA9IGN1cnJlbnRSZXN1bHQubG9hZGluZywgcGFydGlhbCA9IGN1cnJlbnRSZXN1bHQucGFydGlhbCwgbmV0d29ya1N0YXR1cyA9IGN1cnJlbnRSZXN1bHQubmV0d29ya1N0YXR1cywgZXJyb3JzID0gY3VycmVudFJlc3VsdC5lcnJvcnM7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBjdXJyZW50UmVzdWx0LmVycm9yLCBkYXRhID0gY3VycmVudFJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEFwb2xsb0Vycm9yKHsgZ3JhcGhRTEVycm9yczogZXJyb3JzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3VsdCksIHsgbG9hZGluZzogbG9hZGluZyxcbiAgICAgICAgICAgICAgICBuZXR3b3JrU3RhdHVzOiBuZXR3b3JrU3RhdHVzLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvciwgY2FsbGVkOiB0cnVlIH0pO1xuICAgICAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNEYXRhID0gdGhpcy5wcmV2aW91c0RhdGEucmVzdWx0ICYmIHRoaXMucHJldmlvdXNEYXRhLnJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRhID1cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNEYXRhICYmIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZpb3VzRGF0YSksIGRhdGEpIDogcHJldmlvdXNEYXRhIHx8IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICh0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5LmdldExhc3RSZXN1bHQoKSB8fCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZldGNoUG9saWN5ID0gdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeS5vcHRpb25zLmZldGNoUG9saWN5O1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0aWFsUmVmZXRjaCA9IG9wdGlvbnMucGFydGlhbFJlZmV0Y2g7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRpYWxSZWZldGNoICYmXG4gICAgICAgICAgICAgICAgICAgICFkYXRhICYmXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpYWwgJiZcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5Jykge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IE5ldHdvcmtTdGF0dXMubG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZWZldGNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXN1bHQuY2xpZW50ID0gdGhpcy5jbGllbnQ7XG4gICAgICAgIHRoaXMucHJldmlvdXNEYXRhLmxvYWRpbmcgPVxuICAgICAgICAgICAgKHRoaXMucHJldmlvdXNEYXRhLnJlc3VsdCAmJiB0aGlzLnByZXZpb3VzRGF0YS5yZXN1bHQubG9hZGluZykgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucHJldmlvdXNEYXRhLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeSAmJlxuICAgICAgICAgICAgdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeS5yZXNldFF1ZXJ5U3RvcmVFcnJvcnMoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFF1ZXJ5RGF0YS5wcm90b3R5cGUuaGFuZGxlRXJyb3JPckNvbXBsZXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic1F1ZXJ5ID0gdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeTtcbiAgICAgICAgaWYgKCFvYnNRdWVyeSB8fCAhdGhpcy5wcmV2aW91c0RhdGEucmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnByZXZpb3VzRGF0YS5yZXN1bHQsIGRhdGEgPSBfYS5kYXRhLCBsb2FkaW5nID0gX2EubG9hZGluZywgZXJyb3IgPSBfYS5lcnJvcjtcbiAgICAgICAgaWYgKCFsb2FkaW5nKSB7XG4gICAgICAgICAgICB2YXIgX2IgPSB0aGlzLmdldE9wdGlvbnMoKSwgcXVlcnkgPSBfYi5xdWVyeSwgdmFyaWFibGVzID0gX2IudmFyaWFibGVzLCBvbkNvbXBsZXRlZCA9IF9iLm9uQ29tcGxldGVkLCBvbkVycm9yID0gX2Iub25FcnJvcjtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzT3B0aW9ucyAmJlxuICAgICAgICAgICAgICAgICF0aGlzLnByZXZpb3VzRGF0YS5sb2FkaW5nICYmXG4gICAgICAgICAgICAgICAgZXF1YWwodGhpcy5wcmV2aW91c09wdGlvbnMucXVlcnksIHF1ZXJ5KSAmJlxuICAgICAgICAgICAgICAgIGVxdWFsKHRoaXMucHJldmlvdXNPcHRpb25zLnZhcmlhYmxlcywgdmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlZCAmJiAhZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9uRXJyb3IgJiYgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBvbkVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlEYXRhLnByb3RvdHlwZS5yZW1vdmVRdWVyeVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE9ic2VydmFibGUuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY3VycmVudE9ic2VydmFibGUuc3Vic2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRdWVyeURhdGEucHJvdG90eXBlLm9ic2VydmFibGVRdWVyeUZpZWxkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFyaWFibGVzOiBvYnNlcnZhYmxlLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIHJlZmV0Y2g6IHRoaXMub2JzUmVmZXRjaCxcbiAgICAgICAgICAgIGZldGNoTW9yZTogdGhpcy5vYnNGZXRjaE1vcmUsXG4gICAgICAgICAgICB1cGRhdGVRdWVyeTogdGhpcy5vYnNVcGRhdGVRdWVyeSxcbiAgICAgICAgICAgIHN0YXJ0UG9sbGluZzogdGhpcy5vYnNTdGFydFBvbGxpbmcsXG4gICAgICAgICAgICBzdG9wUG9sbGluZzogdGhpcy5vYnNTdG9wUG9sbGluZyxcbiAgICAgICAgICAgIHN1YnNjcmliZVRvTW9yZTogdGhpcy5vYnNTdWJzY3JpYmVUb01vcmUsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gUXVlcnlEYXRhO1xufShPcGVyYXRpb25EYXRhKSk7XG5cbmZ1bmN0aW9uIHVzZURlZXBNZW1vKG1lbW9Gbiwga2V5KSB7XG4gICAgdmFyIHJlZiA9IHVzZVJlZigpO1xuICAgIGlmICghcmVmLmN1cnJlbnQgfHwgIWVxdWFsKGtleSwgcmVmLmN1cnJlbnQua2V5KSkge1xuICAgICAgICByZWYuY3VycmVudCA9IHsga2V5OiBrZXksIHZhbHVlOiBtZW1vRm4oKSB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVmLmN1cnJlbnQudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVzZUJhc2VRdWVyeShxdWVyeSwgb3B0aW9ucywgbGF6eSkge1xuICAgIGlmIChsYXp5ID09PSB2b2lkIDApIHsgbGF6eSA9IGZhbHNlOyB9XG4gICAgdmFyIGNvbnRleHQgPSB1c2VDb250ZXh0KGdldEFwb2xsb0NvbnRleHQoKSk7XG4gICAgdmFyIF9hID0gdXNlUmVkdWNlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geCArIDE7IH0sIDApLCB0aWNrID0gX2FbMF0sIGZvcmNlVXBkYXRlID0gX2FbMV07XG4gICAgdmFyIHVwZGF0ZWRPcHRpb25zID0gb3B0aW9ucyA/IF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBxdWVyeTogcXVlcnkgfSkgOiB7IHF1ZXJ5OiBxdWVyeSB9O1xuICAgIHZhciBxdWVyeURhdGFSZWYgPSB1c2VSZWYoKTtcbiAgICB2YXIgcXVlcnlEYXRhID0gcXVlcnlEYXRhUmVmLmN1cnJlbnQgfHxcbiAgICAgICAgbmV3IFF1ZXJ5RGF0YSh7XG4gICAgICAgICAgICBvcHRpb25zOiB1cGRhdGVkT3B0aW9ucyxcbiAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICBvbk5ld0RhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXF1ZXJ5RGF0YS5zc3JJbml0aWF0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZvcmNlVXBkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgcXVlcnlEYXRhLnNldE9wdGlvbnModXBkYXRlZE9wdGlvbnMpO1xuICAgIHF1ZXJ5RGF0YS5jb250ZXh0ID0gY29udGV4dDtcbiAgICBpZiAocXVlcnlEYXRhLnNzckluaXRpYXRlZCgpICYmICFxdWVyeURhdGFSZWYuY3VycmVudCkge1xuICAgICAgICBxdWVyeURhdGFSZWYuY3VycmVudCA9IHF1ZXJ5RGF0YTtcbiAgICB9XG4gICAgdmFyIG1lbW8gPSB7XG4gICAgICAgIG9wdGlvbnM6IF9fYXNzaWduKF9fYXNzaWduKHt9LCB1cGRhdGVkT3B0aW9ucyksIHsgb25FcnJvcjogdW5kZWZpbmVkLCBvbkNvbXBsZXRlZDogdW5kZWZpbmVkIH0pLFxuICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICB0aWNrOiB0aWNrLFxuICAgIH07XG4gICAgdmFyIHJlc3VsdCA9IHVzZURlZXBNZW1vKGZ1bmN0aW9uICgpIHsgcmV0dXJuIChsYXp5ID8gcXVlcnlEYXRhLmV4ZWN1dGVMYXp5KCkgOiBxdWVyeURhdGEuZXhlY3V0ZSgpKTsgfSwgbWVtbyk7XG4gICAgdmFyIHF1ZXJ5UmVzdWx0ID0gbGF6eVxuICAgICAgICA/IHJlc3VsdFsxXVxuICAgICAgICA6IHJlc3VsdDtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXF1ZXJ5RGF0YVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBxdWVyeURhdGFSZWYuY3VycmVudCA9IHF1ZXJ5RGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gcXVlcnlEYXRhLmNsZWFudXAoKTsgfTtcbiAgICB9LCBbXSk7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHF1ZXJ5RGF0YS5hZnRlckV4ZWN1dGUoeyBsYXp5OiBsYXp5IH0pOyB9LCBbXG4gICAgICAgIHF1ZXJ5UmVzdWx0LmxvYWRpbmcsXG4gICAgICAgIHF1ZXJ5UmVzdWx0Lm5ldHdvcmtTdGF0dXMsXG4gICAgICAgIHF1ZXJ5UmVzdWx0LmVycm9yLFxuICAgICAgICBxdWVyeVJlc3VsdC5kYXRhLFxuICAgIF0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHVzZVF1ZXJ5KHF1ZXJ5LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHVzZUJhc2VRdWVyeShxdWVyeSwgb3B0aW9ucywgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiB1c2VMYXp5UXVlcnkocXVlcnksIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdXNlQmFzZVF1ZXJ5KHF1ZXJ5LCBvcHRpb25zLCB0cnVlKTtcbn1cblxudmFyIE11dGF0aW9uRGF0YSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE11dGF0aW9uRGF0YSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNdXRhdGlvbkRhdGEoX2EpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBfYS5vcHRpb25zLCBjb250ZXh0ID0gX2EuY29udGV4dCwgcmVzdWx0ID0gX2EucmVzdWx0LCBzZXRSZXN1bHQgPSBfYS5zZXRSZXN1bHQ7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdGlvbnMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJ1bk11dGF0aW9uID0gZnVuY3Rpb24gKG11dGF0aW9uRnVuY3Rpb25PcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAobXV0YXRpb25GdW5jdGlvbk9wdGlvbnMgPT09IHZvaWQgMCkgeyBtdXRhdGlvbkZ1bmN0aW9uT3B0aW9ucyA9IHt9OyB9XG4gICAgICAgICAgICBfdGhpcy5vbk11dGF0aW9uU3RhcnQoKTtcbiAgICAgICAgICAgIHZhciBtdXRhdGlvbklkID0gX3RoaXMuZ2VuZXJhdGVOZXdNdXRhdGlvbklkKCk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubXV0YXRlKG11dGF0aW9uRnVuY3Rpb25PcHRpb25zKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTXV0YXRpb25Db21wbGV0ZWQocmVzcG9uc2UsIG11dGF0aW9uSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTXV0YXRpb25FcnJvcihlcnJvciwgbXV0YXRpb25JZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5nZXRPcHRpb25zKCkub25FcnJvcilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMudmVyaWZ5RG9jdW1lbnRUeXBlKG9wdGlvbnMubXV0YXRpb24sIERvY3VtZW50VHlwZS5NdXRhdGlvbik7XG4gICAgICAgIF90aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgX3RoaXMuc2V0UmVzdWx0ID0gc2V0UmVzdWx0O1xuICAgICAgICBfdGhpcy5tb3N0UmVjZW50TXV0YXRpb25JZCA9IDA7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTXV0YXRpb25EYXRhLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICB0aGlzLmlzTW91bnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudmVyaWZ5RG9jdW1lbnRUeXBlKHRoaXMuZ2V0T3B0aW9ucygpLm11dGF0aW9uLCBEb2N1bWVudFR5cGUuTXV0YXRpb24pO1xuICAgICAgICByZXN1bHQuY2xpZW50ID0gdGhpcy5yZWZyZXNoQ2xpZW50KCkuY2xpZW50O1xuICAgICAgICByZXR1cm4gW3RoaXMucnVuTXV0YXRpb24sIHJlc3VsdF07XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLmFmdGVyRXhlY3V0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc01vdW50ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy51bm1vdW50LmJpbmQodGhpcyk7XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLm11dGF0ZSA9IGZ1bmN0aW9uIChtdXRhdGlvbkZ1bmN0aW9uT3B0aW9ucykge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLmdldE9wdGlvbnMoKSwgbXV0YXRpb24gPSBfYS5tdXRhdGlvbiwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBvcHRpbWlzdGljUmVzcG9uc2UgPSBfYS5vcHRpbWlzdGljUmVzcG9uc2UsIHVwZGF0ZSA9IF9hLnVwZGF0ZSwgX2IgPSBfYS5jb250ZXh0LCBtdXRhdGlvbkNvbnRleHQgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYiwgX2MgPSBfYS5hd2FpdFJlZmV0Y2hRdWVyaWVzLCBhd2FpdFJlZmV0Y2hRdWVyaWVzID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2MsIGZldGNoUG9saWN5ID0gX2EuZmV0Y2hQb2xpY3k7XG4gICAgICAgIHZhciBtdXRhdGVPcHRpb25zID0gX19hc3NpZ24oe30sIG11dGF0aW9uRnVuY3Rpb25PcHRpb25zKTtcbiAgICAgICAgdmFyIG11dGF0ZVZhcmlhYmxlcyA9IE9iamVjdC5hc3NpZ24oe30sIHZhcmlhYmxlcywgbXV0YXRlT3B0aW9ucy52YXJpYWJsZXMpO1xuICAgICAgICBkZWxldGUgbXV0YXRlT3B0aW9ucy52YXJpYWJsZXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2hDbGllbnQoKS5jbGllbnQubXV0YXRlKF9fYXNzaWduKHsgbXV0YXRpb246IG11dGF0aW9uLFxuICAgICAgICAgICAgb3B0aW1pc3RpY1Jlc3BvbnNlOiBvcHRpbWlzdGljUmVzcG9uc2UsIHJlZmV0Y2hRdWVyaWVzOiBtdXRhdGVPcHRpb25zLnJlZmV0Y2hRdWVyaWVzIHx8IHRoaXMuZ2V0T3B0aW9ucygpLnJlZmV0Y2hRdWVyaWVzLCBhd2FpdFJlZmV0Y2hRdWVyaWVzOiBhd2FpdFJlZmV0Y2hRdWVyaWVzLFxuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGUsIGNvbnRleHQ6IG11dGF0aW9uQ29udGV4dCwgZmV0Y2hQb2xpY3k6IGZldGNoUG9saWN5LCB2YXJpYWJsZXM6IG11dGF0ZVZhcmlhYmxlcyB9LCBtdXRhdGVPcHRpb25zKSk7XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLm9uTXV0YXRpb25TdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc3VsdC5sb2FkaW5nICYmICF0aGlzLmdldE9wdGlvbnMoKS5pZ25vcmVSZXN1bHRzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdCh7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGRhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjYWxsZWQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLm9uTXV0YXRpb25Db21wbGV0ZWQgPSBmdW5jdGlvbiAocmVzcG9uc2UsIG11dGF0aW9uSWQpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRPcHRpb25zKCksIG9uQ29tcGxldGVkID0gX2Eub25Db21wbGV0ZWQsIGlnbm9yZVJlc3VsdHMgPSBfYS5pZ25vcmVSZXN1bHRzO1xuICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGEsIGVycm9ycyA9IHJlc3BvbnNlLmVycm9ycztcbiAgICAgICAgdmFyIGVycm9yID0gZXJyb3JzICYmIGVycm9ycy5sZW5ndGggPiAwXG4gICAgICAgICAgICA/IG5ldyBBcG9sbG9FcnJvcih7IGdyYXBoUUxFcnJvcnM6IGVycm9ycyB9KVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBjYWxsT25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBvbkNvbXBsZXRlZCA/IG9uQ29tcGxldGVkKGRhdGEpIDogbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3N0UmVjZW50TXV0YXRpb24obXV0YXRpb25JZCkgJiYgIWlnbm9yZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUmVzdWx0KHtcbiAgICAgICAgICAgICAgICBjYWxsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxPbmNvbXBsZXRlKCk7XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLm9uTXV0YXRpb25FcnJvciA9IGZ1bmN0aW9uIChlcnJvciwgbXV0YXRpb25JZCkge1xuICAgICAgICB2YXIgb25FcnJvciA9IHRoaXMuZ2V0T3B0aW9ucygpLm9uRXJyb3I7XG4gICAgICAgIGlmICh0aGlzLmlzTW9zdFJlY2VudE11dGF0aW9uKG11dGF0aW9uSWQpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdCh7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgIGRhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjYWxsZWQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICBvbkVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTXV0YXRpb25EYXRhLnByb3RvdHlwZS5nZW5lcmF0ZU5ld011dGF0aW9uSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiArK3RoaXMubW9zdFJlY2VudE11dGF0aW9uSWQ7XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLmlzTW9zdFJlY2VudE11dGF0aW9uID0gZnVuY3Rpb24gKG11dGF0aW9uSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9zdFJlY2VudE11dGF0aW9uSWQgPT09IG11dGF0aW9uSWQ7XG4gICAgfTtcbiAgICBNdXRhdGlvbkRhdGEucHJvdG90eXBlLnVwZGF0ZVJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3VudGVkICYmXG4gICAgICAgICAgICAoIXRoaXMucHJldmlvdXNSZXN1bHQgfHwgIWVxdWFsKHRoaXMucHJldmlvdXNSZXN1bHQsIHJlc3VsdCkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1Jlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE11dGF0aW9uRGF0YTtcbn0oT3BlcmF0aW9uRGF0YSkpO1xuXG5mdW5jdGlvbiB1c2VNdXRhdGlvbihtdXRhdGlvbiwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0ID0gdXNlQ29udGV4dChnZXRBcG9sbG9Db250ZXh0KCkpO1xuICAgIHZhciBfYSA9IHVzZVN0YXRlKHsgY2FsbGVkOiBmYWxzZSwgbG9hZGluZzogZmFsc2UgfSksIHJlc3VsdCA9IF9hWzBdLCBzZXRSZXN1bHQgPSBfYVsxXTtcbiAgICB2YXIgdXBkYXRlZE9wdGlvbnMgPSBvcHRpb25zID8gX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG11dGF0aW9uOiBtdXRhdGlvbiB9KSA6IHsgbXV0YXRpb246IG11dGF0aW9uIH07XG4gICAgdmFyIG11dGF0aW9uRGF0YVJlZiA9IHVzZVJlZigpO1xuICAgIGZ1bmN0aW9uIGdldE11dGF0aW9uRGF0YVJlZigpIHtcbiAgICAgICAgaWYgKCFtdXRhdGlvbkRhdGFSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgbXV0YXRpb25EYXRhUmVmLmN1cnJlbnQgPSBuZXcgTXV0YXRpb25EYXRhKHtcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB1cGRhdGVkT3B0aW9ucyxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgIHNldFJlc3VsdDogc2V0UmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXV0YXRpb25EYXRhUmVmLmN1cnJlbnQ7XG4gICAgfVxuICAgIHZhciBtdXRhdGlvbkRhdGEgPSBnZXRNdXRhdGlvbkRhdGFSZWYoKTtcbiAgICBtdXRhdGlvbkRhdGEuc2V0T3B0aW9ucyh1cGRhdGVkT3B0aW9ucyk7XG4gICAgbXV0YXRpb25EYXRhLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7IHJldHVybiBtdXRhdGlvbkRhdGEuYWZ0ZXJFeGVjdXRlKCk7IH0pO1xuICAgIHJldHVybiBtdXRhdGlvbkRhdGEuZXhlY3V0ZShyZXN1bHQpO1xufVxuXG52YXIgU3Vic2NyaXB0aW9uRGF0YSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YnNjcmlwdGlvbkRhdGEsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uRGF0YShfYSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIGNvbnRleHQgPSBfYS5jb250ZXh0LCBzZXRSZXN1bHQgPSBfYS5zZXRSZXN1bHQ7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdGlvbnMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmN1cnJlbnRPYnNlcnZhYmxlID0ge307XG4gICAgICAgIF90aGlzLnNldFJlc3VsdCA9IHNldFJlc3VsdDtcbiAgICAgICAgX3RoaXMuaW5pdGlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJzY3JpcHRpb25EYXRhLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBpZiAodGhpcy5nZXRPcHRpb25zKCkuc2tpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdGhpcy5nZXRPcHRpb25zKCkudmFyaWFibGVzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICBpZiAodGhpcy5yZWZyZXNoQ2xpZW50KCkuaXNOZXcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRSZXN1bHQgPSB0aGlzLmdldExvYWRpbmdSZXN1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvdWxkUmVzdWJzY3JpYmUgPSB0aGlzLmdldE9wdGlvbnMoKS5zaG91bGRSZXN1YnNjcmliZTtcbiAgICAgICAgaWYgKHR5cGVvZiBzaG91bGRSZXN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc2hvdWxkUmVzdWJzY3JpYmUgPSAhIXNob3VsZFJlc3Vic2NyaWJlKHRoaXMuZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvdWxkUmVzdWJzY3JpYmUgIT09IGZhbHNlICYmXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzT3B0aW9ucyAmJlxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcmV2aW91c09wdGlvbnMpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICh0aGlzLnByZXZpb3VzT3B0aW9ucy5zdWJzY3JpcHRpb24gIT09IHRoaXMuZ2V0T3B0aW9ucygpLnN1YnNjcmlwdGlvbiB8fFxuICAgICAgICAgICAgICAgICFlcXVhbCh0aGlzLnByZXZpb3VzT3B0aW9ucy52YXJpYWJsZXMsIHRoaXMuZ2V0T3B0aW9ucygpLnZhcmlhYmxlcykgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzT3B0aW9ucy5za2lwICE9PSB0aGlzLmdldE9wdGlvbnMoKS5za2lwKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgICAgICBjdXJyZW50UmVzdWx0ID0gdGhpcy5nZXRMb2FkaW5nUmVzdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0aWFsaXplKHRoaXMuZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgdGhpcy5zdGFydFN1YnNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnByZXZpb3VzT3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIGN1cnJlbnRSZXN1bHQpLCB7IHZhcmlhYmxlczogdGhpcy5nZXRPcHRpb25zKCkudmFyaWFibGVzIH0pO1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uRGF0YS5wcm90b3R5cGUuYWZ0ZXJFeGVjdXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzTW91bnRlZCA9IHRydWU7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb25EYXRhLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVuZFN1YnNjcmlwdGlvbigpO1xuICAgICAgICBkZWxldGUgdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeTtcbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbkRhdGEucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5xdWVyeSB8fCB0aGlzLmdldE9wdGlvbnMoKS5za2lwID09PSB0cnVlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnF1ZXJ5ID0gdGhpcy5yZWZyZXNoQ2xpZW50KCkuY2xpZW50LnN1YnNjcmliZSh7XG4gICAgICAgICAgICBxdWVyeTogb3B0aW9ucy5zdWJzY3JpcHRpb24sXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG9wdGlvbnMudmFyaWFibGVzLFxuICAgICAgICAgICAgZmV0Y2hQb2xpY3k6IG9wdGlvbnMuZmV0Y2hQb2xpY3lcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb25EYXRhLnByb3RvdHlwZS5zdGFydFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE9ic2VydmFibGUuc3Vic2NyaXB0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnN1YnNjcmlwdGlvbiA9IHRoaXMuY3VycmVudE9ic2VydmFibGUucXVlcnkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IHRoaXMudXBkYXRlQ3VycmVudERhdGEuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGVycm9yOiB0aGlzLnVwZGF0ZUVycm9yLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjb21wbGV0ZTogdGhpcy5jb21wbGV0ZVN1YnNjcmlwdGlvbi5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uRGF0YS5wcm90b3R5cGUuZ2V0TG9hZGluZ1Jlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGF0YTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb25EYXRhLnByb3RvdHlwZS51cGRhdGVSZXN1bHQgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzTW91bnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uRGF0YS5wcm90b3R5cGUudXBkYXRlQ3VycmVudERhdGEgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHZhciBvblN1YnNjcmlwdGlvbkRhdGEgPSB0aGlzLmdldE9wdGlvbnMoKS5vblN1YnNjcmlwdGlvbkRhdGE7XG4gICAgICAgIHRoaXMudXBkYXRlUmVzdWx0KHtcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdC5kYXRhLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob25TdWJzY3JpcHRpb25EYXRhKSB7XG4gICAgICAgICAgICBvblN1YnNjcmlwdGlvbkRhdGEoe1xuICAgICAgICAgICAgICAgIGNsaWVudDogdGhpcy5yZWZyZXNoQ2xpZW50KCkuY2xpZW50LFxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkRhdGE6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbkRhdGEucHJvdG90eXBlLnVwZGF0ZUVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUmVzdWx0KHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uRGF0YS5wcm90b3R5cGUuY29tcGxldGVTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvblN1YnNjcmlwdGlvbkNvbXBsZXRlID0gdGhpcy5nZXRPcHRpb25zKCkub25TdWJzY3JpcHRpb25Db21wbGV0ZTtcbiAgICAgICAgaWYgKG9uU3Vic2NyaXB0aW9uQ29tcGxldGUpXG4gICAgICAgICAgICBvblN1YnNjcmlwdGlvbkNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZW5kU3Vic2NyaXB0aW9uKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb25EYXRhLnByb3RvdHlwZS5lbmRTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50T2JzZXJ2YWJsZS5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnRPYnNlcnZhYmxlLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbkRhdGE7XG59KE9wZXJhdGlvbkRhdGEpKTtcblxuZnVuY3Rpb24gdXNlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0ID0gdXNlQ29udGV4dChnZXRBcG9sbG9Db250ZXh0KCkpO1xuICAgIHZhciB1cGRhdGVkT3B0aW9ucyA9IG9wdGlvbnNcbiAgICAgICAgPyBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgc3Vic2NyaXB0aW9uOiBzdWJzY3JpcHRpb24gfSkgOiB7IHN1YnNjcmlwdGlvbjogc3Vic2NyaXB0aW9uIH07XG4gICAgdmFyIF9hID0gdXNlU3RhdGUoe1xuICAgICAgICBsb2FkaW5nOiAhdXBkYXRlZE9wdGlvbnMuc2tpcCxcbiAgICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICAgICAgZGF0YTogdW5kZWZpbmVkXG4gICAgfSksIHJlc3VsdCA9IF9hWzBdLCBzZXRSZXN1bHQgPSBfYVsxXTtcbiAgICB2YXIgc3Vic2NyaXB0aW9uRGF0YVJlZiA9IHVzZVJlZigpO1xuICAgIGZ1bmN0aW9uIGdldFN1YnNjcmlwdGlvbkRhdGFSZWYoKSB7XG4gICAgICAgIGlmICghc3Vic2NyaXB0aW9uRGF0YVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb25EYXRhUmVmLmN1cnJlbnQgPSBuZXcgU3Vic2NyaXB0aW9uRGF0YSh7XG4gICAgICAgICAgICAgICAgb3B0aW9uczogdXBkYXRlZE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICBzZXRSZXN1bHQ6IHNldFJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbkRhdGFSZWYuY3VycmVudDtcbiAgICB9XG4gICAgdmFyIHN1YnNjcmlwdGlvbkRhdGEgPSBnZXRTdWJzY3JpcHRpb25EYXRhUmVmKCk7XG4gICAgc3Vic2NyaXB0aW9uRGF0YS5zZXRPcHRpb25zKHVwZGF0ZWRPcHRpb25zLCB0cnVlKTtcbiAgICBzdWJzY3JpcHRpb25EYXRhLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpcHRpb25EYXRhLmFmdGVyRXhlY3V0ZSgpOyB9KTtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaXB0aW9uRGF0YS5jbGVhbnVwLmJpbmQoc3Vic2NyaXB0aW9uRGF0YSk7IH0sIFtdKTtcbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uRGF0YS5leGVjdXRlKHJlc3VsdCk7XG59XG5cbmZ1bmN0aW9uIHVzZUFwb2xsb0NsaWVudCgpIHtcbiAgICB2YXIgY2xpZW50ID0gUmVhY3QudXNlQ29udGV4dChnZXRBcG9sbG9Db250ZXh0KCkpLmNsaWVudDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoY2xpZW50LCAxKSA6IGludmFyaWFudChjbGllbnQsICdObyBBcG9sbG8gQ2xpZW50IGluc3RhbmNlIGNhbiBiZSBmb3VuZC4gUGxlYXNlIGVuc3VyZSB0aGF0IHlvdSAnICtcbiAgICAgICAgJ2hhdmUgY2FsbGVkIGBBcG9sbG9Qcm92aWRlcmAgaGlnaGVyIHVwIGluIHlvdXIgdHJlZS4nKTtcbiAgICByZXR1cm4gY2xpZW50O1xufVxuXG5mdW5jdGlvbiBtYWtlRGVmYXVsdFF1ZXJ5SW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZWVuOiBmYWxzZSxcbiAgICAgICAgb2JzZXJ2YWJsZTogbnVsbFxuICAgIH07XG59XG52YXIgUmVuZGVyUHJvbWlzZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlbmRlclByb21pc2VzKCkge1xuICAgICAgICB0aGlzLnF1ZXJ5UHJvbWlzZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucXVlcnlJbmZvVHJpZSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgUmVuZGVyUHJvbWlzZXMucHJvdG90eXBlLnJlZ2lzdGVyU1NST2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlLCBwcm9wcykge1xuICAgICAgICB0aGlzLmxvb2t1cFF1ZXJ5SW5mbyhwcm9wcykub2JzZXJ2YWJsZSA9IG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBSZW5kZXJQcm9taXNlcy5wcm90b3R5cGUuZ2V0U1NST2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb29rdXBRdWVyeUluZm8ocHJvcHMpLm9ic2VydmFibGU7XG4gICAgfTtcbiAgICBSZW5kZXJQcm9taXNlcy5wcm90b3R5cGUuYWRkUXVlcnlQcm9taXNlID0gZnVuY3Rpb24gKHF1ZXJ5SW5zdGFuY2UsIGZpbmlzaCkge1xuICAgICAgICB2YXIgaW5mbyA9IHRoaXMubG9va3VwUXVlcnlJbmZvKHF1ZXJ5SW5zdGFuY2UuZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgaWYgKCFpbmZvLnNlZW4pIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlQcm9taXNlcy5zZXQocXVlcnlJbnN0YW5jZS5nZXRPcHRpb25zKCksIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShxdWVyeUluc3RhbmNlLmZldGNoRGF0YSgpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaW5pc2goKTtcbiAgICB9O1xuICAgIFJlbmRlclByb21pc2VzLnByb3RvdHlwZS5oYXNQcm9taXNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlQcm9taXNlcy5zaXplID4gMDtcbiAgICB9O1xuICAgIFJlbmRlclByb21pc2VzLnByb3RvdHlwZS5jb25zdW1lQW5kQXdhaXRQcm9taXNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHByb21pc2VzID0gW107XG4gICAgICAgIHRoaXMucXVlcnlQcm9taXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9taXNlLCBxdWVyeUluc3RhbmNlKSB7XG4gICAgICAgICAgICBfdGhpcy5sb29rdXBRdWVyeUluZm8ocXVlcnlJbnN0YW5jZSkuc2VlbiA9IHRydWU7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5xdWVyeVByb21pc2VzLmNsZWFyKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfTtcbiAgICBSZW5kZXJQcm9taXNlcy5wcm90b3R5cGUubG9va3VwUXVlcnlJbmZvID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHZhciBxdWVyeUluZm9UcmllID0gdGhpcy5xdWVyeUluZm9UcmllO1xuICAgICAgICB2YXIgcXVlcnkgPSBwcm9wcy5xdWVyeSwgdmFyaWFibGVzID0gcHJvcHMudmFyaWFibGVzO1xuICAgICAgICB2YXIgdmFyTWFwID0gcXVlcnlJbmZvVHJpZS5nZXQocXVlcnkpIHx8IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKCFxdWVyeUluZm9UcmllLmhhcyhxdWVyeSkpXG4gICAgICAgICAgICBxdWVyeUluZm9UcmllLnNldChxdWVyeSwgdmFyTWFwKTtcbiAgICAgICAgdmFyIHZhcmlhYmxlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KHZhcmlhYmxlcyk7XG4gICAgICAgIHZhciBpbmZvID0gdmFyTWFwLmdldCh2YXJpYWJsZXNTdHJpbmcpIHx8IG1ha2VEZWZhdWx0UXVlcnlJbmZvKCk7XG4gICAgICAgIGlmICghdmFyTWFwLmhhcyh2YXJpYWJsZXNTdHJpbmcpKVxuICAgICAgICAgICAgdmFyTWFwLnNldCh2YXJpYWJsZXNTdHJpbmcsIGluZm8pO1xuICAgICAgICByZXR1cm4gaW5mbztcbiAgICB9O1xuICAgIHJldHVybiBSZW5kZXJQcm9taXNlcztcbn0oKSk7XG5cbmV4cG9ydCB7IFJlbmRlclByb21pc2VzLCB1c2VBcG9sbG9DbGllbnQsIHVzZUxhenlRdWVyeSwgdXNlTXV0YXRpb24sIHVzZVF1ZXJ5LCB1c2VTdWJzY3JpcHRpb24gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LWhvb2tzLmVzbS5qcy5tYXBcbiIsIi8vIFRoaXMgY3VycmVudENvbnRleHQgdmFyaWFibGUgd2lsbCBvbmx5IGJlIHVzZWQgaWYgdGhlIG1ha2VTbG90Q2xhc3NcclxuLy8gZnVuY3Rpb24gaXMgY2FsbGVkLCB3aGljaCBoYXBwZW5zIG9ubHkgaWYgdGhpcyBpcyB0aGUgZmlyc3QgY29weSBvZiB0aGVcclxuLy8gQHdyeS9jb250ZXh0IHBhY2thZ2UgdG8gYmUgaW1wb3J0ZWQuXHJcbnZhciBjdXJyZW50Q29udGV4dCA9IG51bGw7XHJcbi8vIFRoaXMgdW5pcXVlIGludGVybmFsIG9iamVjdCBpcyB1c2VkIHRvIGRlbm90ZSB0aGUgYWJzZW5jZSBvZiBhIHZhbHVlXHJcbi8vIGZvciBhIGdpdmVuIFNsb3QsIGFuZCBpcyBuZXZlciBleHBvc2VkIHRvIG91dHNpZGUgY29kZS5cclxudmFyIE1JU1NJTkdfVkFMVUUgPSB7fTtcclxudmFyIGlkQ291bnRlciA9IDE7XHJcbi8vIEFsdGhvdWdoIHdlIGNhbid0IGRvIGFueXRoaW5nIGFib3V0IHRoZSBjb3N0IG9mIGR1cGxpY2F0ZWQgY29kZSBmcm9tXHJcbi8vIGFjY2lkZW50YWxseSBidW5kbGluZyBtdWx0aXBsZSBjb3BpZXMgb2YgdGhlIEB3cnkvY29udGV4dCBwYWNrYWdlLCB3ZSBjYW5cclxuLy8gYXZvaWQgY3JlYXRpbmcgdGhlIFNsb3QgY2xhc3MgbW9yZSB0aGFuIG9uY2UgdXNpbmcgbWFrZVNsb3RDbGFzcy5cclxudmFyIG1ha2VTbG90Q2xhc3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTbG90KCkge1xyXG4gICAgICAgIC8vIElmIHlvdSBoYXZlIGEgU2xvdCBvYmplY3QsIHlvdSBjYW4gZmluZCBvdXQgaXRzIHNsb3QuaWQsIGJ1dCB5b3UgY2Fubm90XHJcbiAgICAgICAgLy8gZ3Vlc3MgdGhlIHNsb3QuaWQgb2YgYSBTbG90IHlvdSBkb24ndCBoYXZlIGFjY2VzcyB0bywgdGhhbmtzIHRvIHRoZVxyXG4gICAgICAgIC8vIHJhbmRvbWl6ZWQgc3VmZml4LlxyXG4gICAgICAgIHRoaXMuaWQgPSBbXHJcbiAgICAgICAgICAgIFwic2xvdFwiLFxyXG4gICAgICAgICAgICBpZENvdW50ZXIrKyxcclxuICAgICAgICAgICAgRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiksXHJcbiAgICAgICAgXS5qb2luKFwiOlwiKTtcclxuICAgIH1cclxuICAgIFNsb3QucHJvdG90eXBlLmhhc1ZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGNvbnRleHRfMSA9IGN1cnJlbnRDb250ZXh0OyBjb250ZXh0XzE7IGNvbnRleHRfMSA9IGNvbnRleHRfMS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgLy8gV2UgdXNlIHRoZSBTbG90IG9iamVjdCBpc2VsZiBhcyBhIGtleSB0byBpdHMgdmFsdWUsIHdoaWNoIG1lYW5zIHRoZVxyXG4gICAgICAgICAgICAvLyB2YWx1ZSBjYW5ub3QgYmUgb2J0YWluZWQgd2l0aG91dCBhIHJlZmVyZW5jZSB0byB0aGUgU2xvdCBvYmplY3QuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlkIGluIGNvbnRleHRfMS5zbG90cykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY29udGV4dF8xLnNsb3RzW3RoaXMuaWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBNSVNTSU5HX1ZBTFVFKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfMSAhPT0gY3VycmVudENvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDYWNoZSB0aGUgdmFsdWUgaW4gY3VycmVudENvbnRleHQuc2xvdHMgc28gdGhlIG5leHQgbG9va3VwIHdpbGxcclxuICAgICAgICAgICAgICAgICAgICAvLyBiZSBmYXN0ZXIuIFRoaXMgY2FjaGluZyBpcyBzYWZlIGJlY2F1c2UgdGhlIHRyZWUgb2YgY29udGV4dHMgYW5kXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHZhbHVlcyBvZiB0aGUgc2xvdHMgYXJlIGxvZ2ljYWxseSBpbW11dGFibGUuXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQuc2xvdHNbdGhpcy5pZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJyZW50Q29udGV4dCkge1xyXG4gICAgICAgICAgICAvLyBJZiBhIHZhbHVlIHdhcyBub3QgZm91bmQgZm9yIHRoaXMgU2xvdCwgaXQncyBuZXZlciBnb2luZyB0byBiZSBmb3VuZFxyXG4gICAgICAgICAgICAvLyBubyBtYXR0ZXIgaG93IG1hbnkgdGltZXMgd2UgbG9vayBpdCB1cCwgc28gd2UgbWlnaHQgYXMgd2VsbCBjYWNoZVxyXG4gICAgICAgICAgICAvLyB0aGUgYWJzZW5jZSBvZiB0aGUgdmFsdWUsIHRvby5cclxuICAgICAgICAgICAgY3VycmVudENvbnRleHQuc2xvdHNbdGhpcy5pZF0gPSBNSVNTSU5HX1ZBTFVFO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgU2xvdC5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudENvbnRleHQuc2xvdHNbdGhpcy5pZF07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNsb3QucHJvdG90eXBlLndpdGhWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY2FsbGJhY2ssIFxyXG4gICAgLy8gR2l2ZW4gdGhlIHByZXZhbGVuY2Ugb2YgYXJyb3cgZnVuY3Rpb25zLCBzcGVjaWZ5aW5nIGFyZ3VtZW50cyBpcyBsaWtlbHlcclxuICAgIC8vIHRvIGJlIG11Y2ggbW9yZSBjb21tb24gdGhhbiBzcGVjaWZ5aW5nIGB0aGlzYCwgaGVuY2UgdGhpcyBvcmRlcmluZzpcclxuICAgIGFyZ3MsIHRoaXNBcmcpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdmFyIHNsb3RzID0gKF9hID0ge1xyXG4gICAgICAgICAgICAgICAgX19wcm90b19fOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9hW3RoaXMuaWRdID0gdmFsdWUsXHJcbiAgICAgICAgICAgIF9hKTtcclxuICAgICAgICB2YXIgcGFyZW50ID0gY3VycmVudENvbnRleHQ7XHJcbiAgICAgICAgY3VycmVudENvbnRleHQgPSB7IHBhcmVudDogcGFyZW50LCBzbG90czogc2xvdHMgfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkgYWxsb3dzIHRoZSBhcmd1bWVudHMgYXJyYXkgYXJndW1lbnQgdG8gYmVcclxuICAgICAgICAgICAgLy8gb21pdHRlZCBvciB1bmRlZmluZWQsIHNvIGFyZ3MhIGlzIGZpbmUgaGVyZS5cclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBwYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vIENhcHR1cmUgdGhlIGN1cnJlbnQgY29udGV4dCBhbmQgd3JhcCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHNvIHRoYXQgaXRcclxuICAgIC8vIHJlZXN0YWJsaXNoZXMgdGhlIGNhcHR1cmVkIGNvbnRleHQgd2hlbiBjYWxsZWQuXHJcbiAgICBTbG90LmJpbmQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IGN1cnJlbnRDb250ZXh0O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzYXZlZCA9IGN1cnJlbnRDb250ZXh0O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IHNhdmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICAvLyBJbW1lZGlhdGVseSBydW4gYSBjYWxsYmFjayBmdW5jdGlvbiB3aXRob3V0IGFueSBjYXB0dXJlZCBjb250ZXh0LlxyXG4gICAgU2xvdC5ub0NvbnRleHQgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIFxyXG4gICAgLy8gR2l2ZW4gdGhlIHByZXZhbGVuY2Ugb2YgYXJyb3cgZnVuY3Rpb25zLCBzcGVjaWZ5aW5nIGFyZ3VtZW50cyBpcyBsaWtlbHlcclxuICAgIC8vIHRvIGJlIG11Y2ggbW9yZSBjb21tb24gdGhhbiBzcGVjaWZ5aW5nIGB0aGlzYCwgaGVuY2UgdGhpcyBvcmRlcmluZzpcclxuICAgIGFyZ3MsIHRoaXNBcmcpIHtcclxuICAgICAgICBpZiAoY3VycmVudENvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHNhdmVkID0gY3VycmVudENvbnRleHQ7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkgYWxsb3dzIHRoZSBhcmd1bWVudHMgYXJyYXkgYXJndW1lbnQgdG8gYmVcclxuICAgICAgICAgICAgICAgIC8vIG9taXR0ZWQgb3IgdW5kZWZpbmVkLCBzbyBhcmdzISBpcyBmaW5lIGhlcmUuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpc0FyZywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IHNhdmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpc0FyZywgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBTbG90O1xyXG59KCkpOyB9O1xyXG4vLyBXZSBzdG9yZSBhIHNpbmdsZSBnbG9iYWwgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNsb3QgY2xhc3MgYXMgYSBwZXJtYW5lbnRcclxuLy8gbm9uLWVudW1lcmFibGUgc3ltYm9sIHByb3BlcnR5IG9mIHRoZSBBcnJheSBjb25zdHJ1Y3Rvci4gVGhpcyBvYmZ1c2NhdGlvblxyXG4vLyBkb2VzIG5vdGhpbmcgdG8gcHJldmVudCBhY2Nlc3MgdG8gdGhlIFNsb3QgY2xhc3MsIGJ1dCBhdCBsZWFzdCBpdCBlbnN1cmVzXHJcbi8vIHRoZSBpbXBsZW1lbnRhdGlvbiAoaS5lLiBjdXJyZW50Q29udGV4dCkgY2Fubm90IGJlIHRhbXBlcmVkIHdpdGgsIGFuZCBhbGxcclxuLy8gY29waWVzIG9mIHRoZSBAd3J5L2NvbnRleHQgcGFja2FnZSAoaG9wZWZ1bGx5IGp1c3Qgb25lKSB3aWxsIHNoYXJlIHRoZVxyXG4vLyBzYW1lIFNsb3QgaW1wbGVtZW50YXRpb24uIFNpbmNlIHRoZSBmaXJzdCBjb3B5IG9mIHRoZSBAd3J5L2NvbnRleHQgcGFja2FnZVxyXG4vLyB0byBiZSBpbXBvcnRlZCB3aW5zLCB0aGlzIHRlY2huaXF1ZSBpbXBvc2VzIGEgdmVyeSBoaWdoIGNvc3QgZm9yIGFueVxyXG4vLyBmdXR1cmUgYnJlYWtpbmcgY2hhbmdlcyB0byB0aGUgU2xvdCBjbGFzcy5cclxudmFyIGdsb2JhbEtleSA9IFwiQHdyeS9jb250ZXh0OlNsb3RcIjtcclxudmFyIGhvc3QgPSBBcnJheTtcclxudmFyIFNsb3QgPSBob3N0W2dsb2JhbEtleV0gfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIFNsb3QgPSBtYWtlU2xvdENsYXNzKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShob3N0LCBnbG9iYWxLZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IGhvc3RbZ2xvYmFsS2V5XSA9IFNsb3QsXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICByZXR1cm4gU2xvdDtcclxuICAgIH1cclxufSgpO1xuXG52YXIgYmluZCA9IFNsb3QuYmluZCwgbm9Db250ZXh0ID0gU2xvdC5ub0NvbnRleHQ7XHJcbmZ1bmN0aW9uIHNldFRpbWVvdXRXaXRoQ29udGV4dChjYWxsYmFjaywgZGVsYXkpIHtcclxuICAgIHJldHVybiBzZXRUaW1lb3V0KGJpbmQoY2FsbGJhY2spLCBkZWxheSk7XHJcbn1cclxuLy8gVHVybiBhbnkgZ2VuZXJhdG9yIGZ1bmN0aW9uIGludG8gYW4gYXN5bmMgZnVuY3Rpb24gKHVzaW5nIHlpZWxkIGluc3RlYWRcclxuLy8gb2YgYXdhaXQpLCB3aXRoIGNvbnRleHQgYXV0b21hdGljYWxseSBwcmVzZXJ2ZWQgYWNyb3NzIHlpZWxkcy5cclxuZnVuY3Rpb24gYXN5bmNGcm9tR2VuKGdlbkZuKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBnZW4gPSBnZW5Gbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIHZhciBib3VuZE5leHQgPSBiaW5kKGdlbi5uZXh0KTtcclxuICAgICAgICB2YXIgYm91bmRUaHJvdyA9IGJpbmQoZ2VuLnRocm93KTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmd1bWVudCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gbWV0aG9kLmNhbGwoZ2VuLCBhcmd1bWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gcmVzdWx0LmRvbmUgPyByZXNvbHZlIDogaW52b2tlTmV4dDtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKHJlc3VsdC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudmFsdWUudGhlbihuZXh0LCByZXN1bHQuZG9uZSA/IHJlamVjdCA6IGludm9rZVRocm93KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaW52b2tlTmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaW52b2tlKGJvdW5kTmV4dCwgdmFsdWUpOyB9O1xyXG4gICAgICAgICAgICB2YXIgaW52b2tlVGhyb3cgPSBmdW5jdGlvbiAoZXJyb3IpIHsgcmV0dXJuIGludm9rZShib3VuZFRocm93LCBlcnJvcik7IH07XHJcbiAgICAgICAgICAgIGludm9rZU5leHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gaXNQcm9taXNlTGlrZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XHJcbn1cclxuLy8gSWYgeW91IHVzZSB0aGUgZmliZXJzIG5wbSBwYWNrYWdlIHRvIGltcGxlbWVudCBjb3JvdXRpbmVzIGluIE5vZGUuanMsXHJcbi8vIHlvdSBzaG91bGQgY2FsbCB0aGlzIGZ1bmN0aW9uIGF0IGxlYXN0IG9uY2UgdG8gZW5zdXJlIGNvbnRleHQgbWFuYWdlbWVudFxyXG4vLyByZW1haW5zIGNvaGVyZW50IGFjcm9zcyBhbnkgeWllbGRzLlxyXG52YXIgd3JhcHBlZEZpYmVycyA9IFtdO1xyXG5mdW5jdGlvbiB3cmFwWWllbGRpbmdGaWJlck1ldGhvZHMoRmliZXIpIHtcclxuICAgIC8vIFRoZXJlIGNhbiBiZSBvbmx5IG9uZSBpbXBsZW1lbnRhdGlvbiBvZiBGaWJlciBwZXIgcHJvY2Vzcywgc28gdGhpcyBhcnJheVxyXG4gICAgLy8gc2hvdWxkIG5ldmVyIGdyb3cgbG9uZ2VyIHRoYW4gb25lIGVsZW1lbnQuXHJcbiAgICBpZiAod3JhcHBlZEZpYmVycy5pbmRleE9mKEZpYmVyKSA8IDApIHtcclxuICAgICAgICB2YXIgd3JhcCA9IGZ1bmN0aW9uIChvYmosIG1ldGhvZCkge1xyXG4gICAgICAgICAgICB2YXIgZm4gPSBvYmpbbWV0aG9kXTtcclxuICAgICAgICAgICAgb2JqW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9Db250ZXh0KGZuLCBhcmd1bWVudHMsIHRoaXMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gVGhlc2UgbWV0aG9kcyBjYW4geWllbGQsIGFjY29yZGluZyB0b1xyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sYXZlcmRldC9ub2RlLWZpYmVycy9ibG9iL2RkZWJlZDliOGFlMzg4M2U1N2Y4MjJlMjEwOGU2OTQzZTVjOGQyYTgvZmliZXJzLmpzI0w5Ny1MMTAwXHJcbiAgICAgICAgd3JhcChGaWJlciwgXCJ5aWVsZFwiKTtcclxuICAgICAgICB3cmFwKEZpYmVyLnByb3RvdHlwZSwgXCJydW5cIik7XHJcbiAgICAgICAgd3JhcChGaWJlci5wcm90b3R5cGUsIFwidGhyb3dJbnRvXCIpO1xyXG4gICAgICAgIHdyYXBwZWRGaWJlcnMucHVzaChGaWJlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRmliZXI7XHJcbn1cblxuZXhwb3J0IHsgU2xvdCwgYXN5bmNGcm9tR2VuLCBiaW5kLCBub0NvbnRleHQsIHNldFRpbWVvdXRXaXRoQ29udGV4dCBhcyBzZXRUaW1lb3V0LCB3cmFwWWllbGRpbmdGaWJlck1ldGhvZHMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRleHQuZXNtLmpzLm1hcFxuIiwidmFyIF9hID0gT2JqZWN0LnByb3RvdHlwZSwgdG9TdHJpbmcgPSBfYS50b1N0cmluZywgaGFzT3duUHJvcGVydHkgPSBfYS5oYXNPd25Qcm9wZXJ0eTtcclxudmFyIHByZXZpb3VzQ29tcGFyaXNvbnMgPSBuZXcgTWFwKCk7XHJcbi8qKlxyXG4gKiBQZXJmb3JtcyBhIGRlZXAgZXF1YWxpdHkgY2hlY2sgb24gdHdvIEphdmFTY3JpcHQgdmFsdWVzLCB0b2xlcmF0aW5nIGN5Y2xlcy5cclxuICovXHJcbmZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrKGEsIGIpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgcHJldmlvdXNDb21wYXJpc29ucy5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrKGEsIGIpIHtcclxuICAgIC8vIElmIHRoZSB0d28gdmFsdWVzIGFyZSBzdHJpY3RseSBlcXVhbCwgb3VyIGpvYiBpcyBlYXN5LlxyXG4gICAgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgcmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBydW50aW1lIHR5cGUgb2ZcclxuICAgIC8vIHRoZSBnaXZlbiB2YWx1ZSB0aGF0IGlzIGNvbnNpZGVyYWJseSBtb3JlIHByZWNpc2UgdGhhbiB0eXBlb2YuXHJcbiAgICB2YXIgYVRhZyA9IHRvU3RyaW5nLmNhbGwoYSk7XHJcbiAgICB2YXIgYlRhZyA9IHRvU3RyaW5nLmNhbGwoYik7XHJcbiAgICAvLyBJZiB0aGUgcnVudGltZSB0eXBlcyBvZiBhIGFuZCBiIGFyZSBkaWZmZXJlbnQsIHRoZXkgY291bGQgbWF5YmUgYmUgZXF1YWxcclxuICAgIC8vIHVuZGVyIHNvbWUgaW50ZXJwcmV0YXRpb24gb2YgZXF1YWxpdHksIGJ1dCBmb3Igc2ltcGxpY2l0eSBhbmQgcGVyZm9ybWFuY2VcclxuICAgIC8vIHdlIGp1c3QgcmV0dXJuIGZhbHNlIGluc3RlYWQuXHJcbiAgICBpZiAoYVRhZyAhPT0gYlRhZykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHN3aXRjaCAoYVRhZykge1xyXG4gICAgICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzpcclxuICAgICAgICAgICAgLy8gQXJyYXlzIGFyZSBhIGxvdCBsaWtlIG90aGVyIG9iamVjdHMsIGJ1dCB3ZSBjYW4gY2hlYXBseSBjb21wYXJlIHRoZWlyXHJcbiAgICAgICAgICAgIC8vIGxlbmd0aHMgYXMgYSBzaG9ydC1jdXQgYmVmb3JlIGNvbXBhcmluZyB0aGVpciBlbGVtZW50cy5cclxuICAgICAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyBGYWxsIHRocm91Z2ggdG8gb2JqZWN0IGNhc2UuLi5cclxuICAgICAgICBjYXNlICdbb2JqZWN0IE9iamVjdF0nOiB7XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c2x5Q29tcGFyZWQoYSwgYikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGFLZXlzID0gT2JqZWN0LmtleXMoYSk7XHJcbiAgICAgICAgICAgIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKGIpO1xyXG4gICAgICAgICAgICAvLyBJZiBgYWAgYW5kIGBiYCBoYXZlIGEgZGlmZmVyZW50IG51bWJlciBvZiBlbnVtZXJhYmxlIGtleXMsIHRoZXlcclxuICAgICAgICAgICAgLy8gbXVzdCBiZSBkaWZmZXJlbnQuXHJcbiAgICAgICAgICAgIHZhciBrZXlDb3VudCA9IGFLZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKGtleUNvdW50ICE9PSBiS2V5cy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIE5vdyBtYWtlIHN1cmUgdGhleSBoYXZlIHRoZSBzYW1lIGtleXMuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwga2V5Q291bnQ7ICsraykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIGFLZXlzW2tdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBGaW5hbGx5LCBjaGVjayBkZWVwIGVxdWFsaXR5IG9mIGFsbCBjaGlsZCBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGtleUNvdW50OyArK2spIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBhS2V5c1trXTtcclxuICAgICAgICAgICAgICAgIGlmICghY2hlY2soYVtrZXldLCBiW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdbb2JqZWN0IEVycm9yXSc6XHJcbiAgICAgICAgICAgIHJldHVybiBhLm5hbWUgPT09IGIubmFtZSAmJiBhLm1lc3NhZ2UgPT09IGIubWVzc2FnZTtcclxuICAgICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgTmFOLCB3aGljaCBpcyAhPT0gaXRzZWxmLlxyXG4gICAgICAgICAgICBpZiAoYSAhPT0gYSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBiICE9PSBiO1xyXG4gICAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byBzaGFyZWQgK2EgPT09ICtiIGNhc2UuLi5cclxuICAgICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcclxuICAgICAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcclxuICAgICAgICAgICAgcmV0dXJuICthID09PSArYjtcclxuICAgICAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxyXG4gICAgICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XHJcbiAgICAgICAgICAgIHJldHVybiBhID09IFwiXCIgKyBiO1xyXG4gICAgICAgIGNhc2UgJ1tvYmplY3QgTWFwXSc6XHJcbiAgICAgICAgY2FzZSAnW29iamVjdCBTZXRdJzoge1xyXG4gICAgICAgICAgICBpZiAoYS5zaXplICE9PSBiLnNpemUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c2x5Q29tcGFyZWQoYSwgYikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGFJdGVyYXRvciA9IGEuZW50cmllcygpO1xyXG4gICAgICAgICAgICB2YXIgaXNNYXAgPSBhVGFnID09PSAnW29iamVjdCBNYXBdJztcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gYUl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLmRvbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBhIGluc3RhbmNlb2YgU2V0LCBhVmFsdWUgPT09IGFLZXkuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSBpbmZvLnZhbHVlLCBhS2V5ID0gX2FbMF0sIGFWYWx1ZSA9IF9hWzFdO1xyXG4gICAgICAgICAgICAgICAgLy8gU28gdGhpcyB3b3JrcyB0aGUgc2FtZSB3YXkgZm9yIGJvdGggU2V0IGFuZCBNYXAuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWIuaGFzKGFLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSG93ZXZlciwgd2UgY2FyZSBhYm91dCBkZWVwIGVxdWFsaXR5IG9mIHZhbHVlcyBvbmx5IHdoZW4gZGVhbGluZ1xyXG4gICAgICAgICAgICAgICAgLy8gd2l0aCBNYXAgc3RydWN0dXJlcy5cclxuICAgICAgICAgICAgICAgIGlmIChpc01hcCAmJiAhY2hlY2soYVZhbHVlLCBiLmdldChhS2V5KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gT3RoZXJ3aXNlIHRoZSB2YWx1ZXMgYXJlIG5vdCBlcXVhbC5cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBwcmV2aW91c2x5Q29tcGFyZWQoYSwgYikge1xyXG4gICAgLy8gVGhvdWdoIGN5Y2xpYyByZWZlcmVuY2VzIGNhbiBtYWtlIGFuIG9iamVjdCBncmFwaCBhcHBlYXIgaW5maW5pdGUgZnJvbSB0aGVcclxuICAgIC8vIHBlcnNwZWN0aXZlIG9mIGEgZGVwdGgtZmlyc3QgdHJhdmVyc2FsLCB0aGUgZ3JhcGggc3RpbGwgY29udGFpbnMgYSBmaW5pdGVcclxuICAgIC8vIG51bWJlciBvZiBkaXN0aW5jdCBvYmplY3QgcmVmZXJlbmNlcy4gV2UgdXNlIHRoZSBwcmV2aW91c0NvbXBhcmlzb25zIGNhY2hlXHJcbiAgICAvLyB0byBhdm9pZCBjb21wYXJpbmcgdGhlIHNhbWUgcGFpciBvZiBvYmplY3QgcmVmZXJlbmNlcyBtb3JlIHRoYW4gb25jZSwgd2hpY2hcclxuICAgIC8vIGd1YXJhbnRlZXMgdGVybWluYXRpb24gKGV2ZW4gaWYgd2UgZW5kIHVwIGNvbXBhcmluZyBldmVyeSBvYmplY3QgaW4gb25lXHJcbiAgICAvLyBncmFwaCB0byBldmVyeSBvYmplY3QgaW4gdGhlIG90aGVyIGdyYXBoLCB3aGljaCBpcyBleHRyZW1lbHkgdW5saWtlbHkpLFxyXG4gICAgLy8gd2hpbGUgc3RpbGwgYWxsb3dpbmcgd2VpcmQgaXNvbW9ycGhpYyBzdHJ1Y3R1cmVzIChsaWtlIHJpbmdzIHdpdGggZGlmZmVyZW50XHJcbiAgICAvLyBsZW5ndGhzKSBhIGNoYW5jZSB0byBwYXNzIHRoZSBlcXVhbGl0eSB0ZXN0LlxyXG4gICAgdmFyIGJTZXQgPSBwcmV2aW91c0NvbXBhcmlzb25zLmdldChhKTtcclxuICAgIGlmIChiU2V0KSB7XHJcbiAgICAgICAgLy8gUmV0dXJuIHRydWUgaGVyZSBiZWNhdXNlIHdlIGNhbiBiZSBzdXJlIGZhbHNlIHdpbGwgYmUgcmV0dXJuZWQgc29tZXdoZXJlXHJcbiAgICAgICAgLy8gZWxzZSBpZiB0aGUgb2JqZWN0cyBhcmUgbm90IGVxdWl2YWxlbnQuXHJcbiAgICAgICAgaWYgKGJTZXQuaGFzKGIpKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHByZXZpb3VzQ29tcGFyaXNvbnMuc2V0KGEsIGJTZXQgPSBuZXcgU2V0KTtcclxuICAgIH1cclxuICAgIGJTZXQuYWRkKGIpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsO1xuZXhwb3J0IHsgZXF1YWwgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVxdWFsaXR5LmVzbS5qcy5tYXBcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2V4dGVuZHMgfSBmcm9tICd0c2xpYic7XG5pbXBvcnQgeyBBcG9sbG9DYWNoZSB9IGZyb20gJ2Fwb2xsby1jYWNoZSc7XG5pbXBvcnQgeyBpc1Rlc3QsIGdldFF1ZXJ5RGVmaW5pdGlvbiwgYXNzaWduLCBnZXREZWZhdWx0VmFsdWVzLCBpc0VxdWFsLCBnZXRNYWluRGVmaW5pdGlvbiwgZ2V0RnJhZ21lbnREZWZpbml0aW9ucywgY3JlYXRlRnJhZ21lbnRNYXAsIHNob3VsZEluY2x1ZGUsIGlzRmllbGQsIHJlc3VsdEtleU5hbWVGcm9tRmllbGQsIGlzSW5saW5lRnJhZ21lbnQsIG1lcmdlRGVlcEFycmF5LCBhcmd1bWVudHNPYmplY3RGcm9tRmllbGQsIGdldERpcmVjdGl2ZUluZm9Gcm9tRmllbGQsIG1heWJlRGVlcEZyZWV6ZSwgaXNJZFZhbHVlLCBnZXRTdG9yZUtleU5hbWUsIHRvSWRWYWx1ZSwgaXNKc29uVmFsdWUsIGNhblVzZVdlYWtNYXAsIGdldE9wZXJhdGlvbkRlZmluaXRpb24sIGlzUHJvZHVjdGlvbiwgc3RvcmVLZXlOYW1lRnJvbUZpZWxkLCBhZGRUeXBlbmFtZVRvRG9jdW1lbnQgfSBmcm9tICdhcG9sbG8tdXRpbGl0aWVzJztcbmltcG9ydCB7IHdyYXAsIEtleVRyaWUgfSBmcm9tICdvcHRpbWlzbSc7XG5pbXBvcnQgeyBpbnZhcmlhbnQsIEludmFyaWFudEVycm9yIH0gZnJvbSAndHMtaW52YXJpYW50JztcblxudmFyIGhhdmVXYXJuZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIHNob3VsZFdhcm4oKSB7XG4gICAgdmFyIGFuc3dlciA9ICFoYXZlV2FybmVkO1xuICAgIGlmICghaXNUZXN0KCkpIHtcbiAgICAgICAgaGF2ZVdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBhbnN3ZXI7XG59XG52YXIgSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIoKSB7XG4gICAgfVxuICAgIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlci5wcm90b3R5cGUuZW5zdXJlUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlci5wcm90b3R5cGUuY2FuQnlwYXNzSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKGlkVmFsdWUsIHR5cGVDb25kaXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIG9iaiA9IGNvbnRleHQuc3RvcmUuZ2V0KGlkVmFsdWUuaWQpO1xuICAgICAgICB2YXIgaXNSb290UXVlcnkgPSBpZFZhbHVlLmlkID09PSAnUk9PVF9RVUVSWSc7XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNSb290UXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gb2JqLl9fdHlwZW5hbWUsIF9fdHlwZW5hbWUgPSBfYSA9PT0gdm9pZCAwID8gaXNSb290UXVlcnkgJiYgJ1F1ZXJ5JyA6IF9hO1xuICAgICAgICBpZiAoIV9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRXYXJuKCkpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgfHwgaW52YXJpYW50Lndhcm4oXCJZb3UncmUgdXNpbmcgZnJhZ21lbnRzIGluIHlvdXIgcXVlcmllcywgYnV0IGVpdGhlciBkb24ndCBoYXZlIHRoZSBhZGRUeXBlbmFtZTpcXG4gIHRydWUgb3B0aW9uIHNldCBpbiBBcG9sbG8gQ2xpZW50LCBvciB5b3UgYXJlIHRyeWluZyB0byB3cml0ZSBhIGZyYWdtZW50IHRvIHRoZSBzdG9yZSB3aXRob3V0IHRoZSBfX3R5cGVuYW1lLlxcbiAgIFBsZWFzZSB0dXJuIG9uIHRoZSBhZGRUeXBlbmFtZSBvcHRpb24gYW5kIGluY2x1ZGUgX190eXBlbmFtZSB3aGVuIHdyaXRpbmcgZnJhZ21lbnRzIHNvIHRoYXQgQXBvbGxvIENsaWVudFxcbiAgIGNhbiBhY2N1cmF0ZWx5IG1hdGNoIGZyYWdtZW50cy5cIik7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiIHx8IGludmFyaWFudC53YXJuKCdDb3VsZCBub3QgZmluZCBfX3R5cGVuYW1lIG9uIEZyYWdtZW50ICcsIHR5cGVDb25kaXRpb24sIG9iaik7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiIHx8IGludmFyaWFudC53YXJuKFwiREVQUkVDQVRJT04gV0FSTklORzogdXNpbmcgZnJhZ21lbnRzIHdpdGhvdXQgX190eXBlbmFtZSBpcyB1bnN1cHBvcnRlZCBiZWhhdmlvciBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmUgdmVyc2lvbnMgb2YgQXBvbGxvIGNsaWVudC4gWW91IHNob3VsZCBmaXggdGhpcyBhbmQgc2V0IGFkZFR5cGVuYW1lIHRvIHRydWUgbm93LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnaGV1cmlzdGljJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoX190eXBlbmFtZSA9PT0gdHlwZUNvbmRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZFdhcm4oKSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiIHx8IGludmFyaWFudC5lcnJvcignWW91IGFyZSB1c2luZyB0aGUgc2ltcGxlIChoZXVyaXN0aWMpIGZyYWdtZW50IG1hdGNoZXIsIGJ1dCB5b3VyICcgK1xuICAgICAgICAgICAgICAgICdxdWVyaWVzIGNvbnRhaW4gdW5pb24gb3IgaW50ZXJmYWNlIHR5cGVzLiBBcG9sbG8gQ2xpZW50IHdpbGwgbm90IGJlICcgK1xuICAgICAgICAgICAgICAgICdhYmxlIHRvIGFjY3VyYXRlbHkgbWFwIGZyYWdtZW50cy4gVG8gbWFrZSB0aGlzIGVycm9yIGdvIGF3YXksIHVzZSAnICtcbiAgICAgICAgICAgICAgICAndGhlIGBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyYCBhcyBkZXNjcmliZWQgaW4gdGhlIGRvY3M6ICcgK1xuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy5hcG9sbG9ncmFwaHFsLmNvbS9kb2NzL3JlYWN0L2FkdmFuY2VkL2ZyYWdtZW50cy5odG1sI2ZyYWdtZW50LW1hdGNoZXInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2hldXJpc3RpYyc7XG4gICAgfTtcbiAgICByZXR1cm4gSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyO1xufSgpKTtcbnZhciBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5pbnRyb3NwZWN0aW9uUXVlcnlSZXN1bHREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnBvc3NpYmxlVHlwZXNNYXAgPSB0aGlzLnBhcnNlSW50cm9zcGVjdGlvblJlc3VsdChvcHRpb25zLmludHJvc3BlY3Rpb25RdWVyeVJlc3VsdERhdGEpO1xuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0Y2ggPSB0aGlzLm1hdGNoLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKGlkVmFsdWUsIHR5cGVDb25kaXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KHRoaXMuaXNSZWFkeSwgMSkgOiBpbnZhcmlhbnQodGhpcy5pc1JlYWR5LCAnRnJhZ21lbnRNYXRjaGVyLm1hdGNoKCkgd2FzIGNhbGxlZCBiZWZvcmUgRnJhZ21lbnRNYXRjaGVyLmluaXQoKScpO1xuICAgICAgICB2YXIgb2JqID0gY29udGV4dC5zdG9yZS5nZXQoaWRWYWx1ZS5pZCk7XG4gICAgICAgIHZhciBpc1Jvb3RRdWVyeSA9IGlkVmFsdWUuaWQgPT09ICdST09UX1FVRVJZJztcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBpc1Jvb3RRdWVyeTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSBvYmouX190eXBlbmFtZSwgX190eXBlbmFtZSA9IF9hID09PSB2b2lkIDAgPyBpc1Jvb3RRdWVyeSAmJiAnUXVlcnknIDogX2E7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChfX3R5cGVuYW1lLCAyKSA6IGludmFyaWFudChfX3R5cGVuYW1lLCBcIkNhbm5vdCBtYXRjaCBmcmFnbWVudCBiZWNhdXNlIF9fdHlwZW5hbWUgcHJvcGVydHkgaXMgbWlzc2luZzogXCIgKyBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgaWYgKF9fdHlwZW5hbWUgPT09IHR5cGVDb25kaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbXBsZW1lbnRpbmdUeXBlcyA9IHRoaXMucG9zc2libGVUeXBlc01hcFt0eXBlQ29uZGl0aW9uXTtcbiAgICAgICAgaWYgKF9fdHlwZW5hbWUgJiZcbiAgICAgICAgICAgIGltcGxlbWVudGluZ1R5cGVzICYmXG4gICAgICAgICAgICBpbXBsZW1lbnRpbmdUeXBlcy5pbmRleE9mKF9fdHlwZW5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLnBhcnNlSW50cm9zcGVjdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChpbnRyb3NwZWN0aW9uUmVzdWx0RGF0YSkge1xuICAgICAgICB2YXIgdHlwZU1hcCA9IHt9O1xuICAgICAgICBpbnRyb3NwZWN0aW9uUmVzdWx0RGF0YS5fX3NjaGVtYS50eXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICBpZiAodHlwZS5raW5kID09PSAnVU5JT04nIHx8IHR5cGUua2luZCA9PT0gJ0lOVEVSRkFDRScpIHtcbiAgICAgICAgICAgICAgICB0eXBlTWFwW3R5cGUubmFtZV0gPSB0eXBlLnBvc3NpYmxlVHlwZXMubWFwKGZ1bmN0aW9uIChpbXBsZW1lbnRpbmdUeXBlKSB7IHJldHVybiBpbXBsZW1lbnRpbmdUeXBlLm5hbWU7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHR5cGVNYXA7XG4gICAgfTtcbiAgICByZXR1cm4gSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlcjtcbn0oKSk7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIERlcFRyYWNraW5nQ2FjaGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlcFRyYWNraW5nQ2FjaGUoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpOyB9XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuZGVwZW5kID0gd3JhcChmdW5jdGlvbiAoZGF0YUlkKSB7IHJldHVybiBfdGhpcy5kYXRhW2RhdGFJZF07IH0sIHtcbiAgICAgICAgICAgIGRpc3Bvc2FibGU6IHRydWUsXG4gICAgICAgICAgICBtYWtlQ2FjaGVLZXk6IGZ1bmN0aW9uIChkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YUlkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIERlcFRyYWNraW5nQ2FjaGUucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgIH07XG4gICAgRGVwVHJhY2tpbmdDYWNoZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRhdGFJZCkge1xuICAgICAgICB0aGlzLmRlcGVuZChkYXRhSWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2RhdGFJZF07XG4gICAgfTtcbiAgICBEZXBUcmFja2luZ0NhY2hlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoZGF0YUlkLCB2YWx1ZSkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLmRhdGFbZGF0YUlkXTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhW2RhdGFJZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGVwZW5kLmRpcnR5KGRhdGFJZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERlcFRyYWNraW5nQ2FjaGUucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChkYXRhSWQpIHtcbiAgICAgICAgaWYgKGhhc093bi5jYWxsKHRoaXMuZGF0YSwgZGF0YUlkKSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVtkYXRhSWRdO1xuICAgICAgICAgICAgdGhpcy5kZXBlbmQuZGlydHkoZGF0YUlkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVwVHJhY2tpbmdDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZShudWxsKTtcbiAgICB9O1xuICAgIERlcFRyYWNraW5nQ2FjaGUucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAobmV3RGF0YSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobmV3RGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0KGRhdGFJZCwgbmV3RGF0YVtkYXRhSWRdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5kYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bi5jYWxsKG5ld0RhdGEsIGRhdGFJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlKGRhdGFJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZShkYXRhSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEZXBUcmFja2luZ0NhY2hlO1xufSgpKTtcbmZ1bmN0aW9uIGRlZmF1bHROb3JtYWxpemVkQ2FjaGVGYWN0b3J5KHNlZWQpIHtcbiAgICByZXR1cm4gbmV3IERlcFRyYWNraW5nQ2FjaGUoc2VlZCk7XG59XG5cbnZhciBTdG9yZVJlYWRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RvcmVSZWFkZXIoX2EpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIF9jID0gX2IuY2FjaGVLZXlSb290LCBjYWNoZUtleVJvb3QgPSBfYyA9PT0gdm9pZCAwID8gbmV3IEtleVRyaWUoY2FuVXNlV2Vha01hcCkgOiBfYywgX2QgPSBfYi5mcmVlemVSZXN1bHRzLCBmcmVlemVSZXN1bHRzID0gX2QgPT09IHZvaWQgMCA/IGZhbHNlIDogX2Q7XG4gICAgICAgIHZhciBfZSA9IHRoaXMsIGV4ZWN1dGVTdG9yZVF1ZXJ5ID0gX2UuZXhlY3V0ZVN0b3JlUXVlcnksIGV4ZWN1dGVTZWxlY3Rpb25TZXQgPSBfZS5leGVjdXRlU2VsZWN0aW9uU2V0LCBleGVjdXRlU3ViU2VsZWN0ZWRBcnJheSA9IF9lLmV4ZWN1dGVTdWJTZWxlY3RlZEFycmF5O1xuICAgICAgICB0aGlzLmZyZWV6ZVJlc3VsdHMgPSBmcmVlemVSZXN1bHRzO1xuICAgICAgICB0aGlzLmV4ZWN1dGVTdG9yZVF1ZXJ5ID0gd3JhcChmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dGVTdG9yZVF1ZXJ5LmNhbGwoX3RoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtYWtlQ2FjaGVLZXk6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IF9hLnF1ZXJ5LCByb290VmFsdWUgPSBfYS5yb290VmFsdWUsIGNvbnRleHRWYWx1ZSA9IF9hLmNvbnRleHRWYWx1ZSwgdmFyaWFibGVWYWx1ZXMgPSBfYS52YXJpYWJsZVZhbHVlcywgZnJhZ21lbnRNYXRjaGVyID0gX2EuZnJhZ21lbnRNYXRjaGVyO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0VmFsdWUuc3RvcmUgaW5zdGFuY2VvZiBEZXBUcmFja2luZ0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZUtleVJvb3QubG9va3VwKGNvbnRleHRWYWx1ZS5zdG9yZSwgcXVlcnksIGZyYWdtZW50TWF0Y2hlciwgSlNPTi5zdHJpbmdpZnkodmFyaWFibGVWYWx1ZXMpLCByb290VmFsdWUuaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXhlY3V0ZVNlbGVjdGlvblNldCA9IHdyYXAoZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBleGVjdXRlU2VsZWN0aW9uU2V0LmNhbGwoX3RoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtYWtlQ2FjaGVLZXk6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb25TZXQgPSBfYS5zZWxlY3Rpb25TZXQsIHJvb3RWYWx1ZSA9IF9hLnJvb3RWYWx1ZSwgZXhlY0NvbnRleHQgPSBfYS5leGVjQ29udGV4dDtcbiAgICAgICAgICAgICAgICBpZiAoZXhlY0NvbnRleHQuY29udGV4dFZhbHVlLnN0b3JlIGluc3RhbmNlb2YgRGVwVHJhY2tpbmdDYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVLZXlSb290Lmxvb2t1cChleGVjQ29udGV4dC5jb250ZXh0VmFsdWUuc3RvcmUsIHNlbGVjdGlvblNldCwgZXhlY0NvbnRleHQuZnJhZ21lbnRNYXRjaGVyLCBKU09OLnN0cmluZ2lmeShleGVjQ29udGV4dC52YXJpYWJsZVZhbHVlcyksIHJvb3RWYWx1ZS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5leGVjdXRlU3ViU2VsZWN0ZWRBcnJheSA9IHdyYXAoZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBleGVjdXRlU3ViU2VsZWN0ZWRBcnJheS5jYWxsKF90aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbWFrZUNhY2hlS2V5OiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBfYS5maWVsZCwgYXJyYXkgPSBfYS5hcnJheSwgZXhlY0NvbnRleHQgPSBfYS5leGVjQ29udGV4dDtcbiAgICAgICAgICAgICAgICBpZiAoZXhlY0NvbnRleHQuY29udGV4dFZhbHVlLnN0b3JlIGluc3RhbmNlb2YgRGVwVHJhY2tpbmdDYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVLZXlSb290Lmxvb2t1cChleGVjQ29udGV4dC5jb250ZXh0VmFsdWUuc3RvcmUsIGZpZWxkLCBhcnJheSwgSlNPTi5zdHJpbmdpZnkoZXhlY0NvbnRleHQudmFyaWFibGVWYWx1ZXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdG9yZVJlYWRlci5wcm90b3R5cGUucmVhZFF1ZXJ5RnJvbVN0b3JlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlmZlF1ZXJ5QWdhaW5zdFN0b3JlKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyByZXR1cm5QYXJ0aWFsRGF0YTogZmFsc2UgfSkpLnJlc3VsdDtcbiAgICB9O1xuICAgIFN0b3JlUmVhZGVyLnByb3RvdHlwZS5kaWZmUXVlcnlBZ2FpbnN0U3RvcmUgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gX2Euc3RvcmUsIHF1ZXJ5ID0gX2EucXVlcnksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgcHJldmlvdXNSZXN1bHQgPSBfYS5wcmV2aW91c1Jlc3VsdCwgX2IgPSBfYS5yZXR1cm5QYXJ0aWFsRGF0YSwgcmV0dXJuUGFydGlhbERhdGEgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBfYyA9IF9hLnJvb3RJZCwgcm9vdElkID0gX2MgPT09IHZvaWQgMCA/ICdST09UX1FVRVJZJyA6IF9jLCBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbiA9IF9hLmZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLCBjb25maWcgPSBfYS5jb25maWc7XG4gICAgICAgIHZhciBxdWVyeURlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ocXVlcnkpO1xuICAgICAgICB2YXJpYWJsZXMgPSBhc3NpZ24oe30sIGdldERlZmF1bHRWYWx1ZXMocXVlcnlEZWZpbml0aW9uKSwgdmFyaWFibGVzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcgJiYgY29uZmlnLmRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICBjYWNoZVJlZGlyZWN0czogKGNvbmZpZyAmJiBjb25maWcuY2FjaGVSZWRpcmVjdHMpIHx8IHt9LFxuICAgICAgICB9O1xuICAgICAgICB2YXIgZXhlY1Jlc3VsdCA9IHRoaXMuZXhlY3V0ZVN0b3JlUXVlcnkoe1xuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgcm9vdFZhbHVlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lkJyxcbiAgICAgICAgICAgICAgICBpZDogcm9vdElkLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlbmFtZTogJ1F1ZXJ5JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250ZXh0VmFsdWU6IGNvbnRleHQsXG4gICAgICAgICAgICB2YXJpYWJsZVZhbHVlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbixcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBoYXNNaXNzaW5nRmllbGRzID0gZXhlY1Jlc3VsdC5taXNzaW5nICYmIGV4ZWNSZXN1bHQubWlzc2luZy5sZW5ndGggPiAwO1xuICAgICAgICBpZiAoaGFzTWlzc2luZ0ZpZWxkcyAmJiAhcmV0dXJuUGFydGlhbERhdGEpIHtcbiAgICAgICAgICAgIGV4ZWNSZXN1bHQubWlzc2luZy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8udG9sZXJhYmxlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhyb3cgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gbmV3IEludmFyaWFudEVycm9yKDgpIDogbmV3IEludmFyaWFudEVycm9yKFwiQ2FuJ3QgZmluZCBmaWVsZCBcIiArIGluZm8uZmllbGROYW1lICsgXCIgb24gb2JqZWN0IFwiICsgSlNPTi5zdHJpbmdpZnkoaW5mby5vYmplY3QsIG51bGwsIDIpICsgXCIuXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZpb3VzUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoaXNFcXVhbChwcmV2aW91c1Jlc3VsdCwgZXhlY1Jlc3VsdC5yZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgZXhlY1Jlc3VsdC5yZXN1bHQgPSBwcmV2aW91c1Jlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0OiBleGVjUmVzdWx0LnJlc3VsdCxcbiAgICAgICAgICAgIGNvbXBsZXRlOiAhaGFzTWlzc2luZ0ZpZWxkcyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFN0b3JlUmVhZGVyLnByb3RvdHlwZS5leGVjdXRlU3RvcmVRdWVyeSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgcXVlcnkgPSBfYS5xdWVyeSwgcm9vdFZhbHVlID0gX2Eucm9vdFZhbHVlLCBjb250ZXh0VmFsdWUgPSBfYS5jb250ZXh0VmFsdWUsIHZhcmlhYmxlVmFsdWVzID0gX2EudmFyaWFibGVWYWx1ZXMsIF9iID0gX2EuZnJhZ21lbnRNYXRjaGVyLCBmcmFnbWVudE1hdGNoZXIgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdEZyYWdtZW50TWF0Y2hlciA6IF9iO1xuICAgICAgICB2YXIgbWFpbkRlZmluaXRpb24gPSBnZXRNYWluRGVmaW5pdGlvbihxdWVyeSk7XG4gICAgICAgIHZhciBmcmFnbWVudHMgPSBnZXRGcmFnbWVudERlZmluaXRpb25zKHF1ZXJ5KTtcbiAgICAgICAgdmFyIGZyYWdtZW50TWFwID0gY3JlYXRlRnJhZ21lbnRNYXAoZnJhZ21lbnRzKTtcbiAgICAgICAgdmFyIGV4ZWNDb250ZXh0ID0ge1xuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgZnJhZ21lbnRNYXA6IGZyYWdtZW50TWFwLFxuICAgICAgICAgICAgY29udGV4dFZhbHVlOiBjb250ZXh0VmFsdWUsXG4gICAgICAgICAgICB2YXJpYWJsZVZhbHVlczogdmFyaWFibGVWYWx1ZXMsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXI6IGZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZVNlbGVjdGlvblNldCh7XG4gICAgICAgICAgICBzZWxlY3Rpb25TZXQ6IG1haW5EZWZpbml0aW9uLnNlbGVjdGlvblNldCxcbiAgICAgICAgICAgIHJvb3RWYWx1ZTogcm9vdFZhbHVlLFxuICAgICAgICAgICAgZXhlY0NvbnRleHQ6IGV4ZWNDb250ZXh0LFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN0b3JlUmVhZGVyLnByb3RvdHlwZS5leGVjdXRlU2VsZWN0aW9uU2V0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzZWxlY3Rpb25TZXQgPSBfYS5zZWxlY3Rpb25TZXQsIHJvb3RWYWx1ZSA9IF9hLnJvb3RWYWx1ZSwgZXhlY0NvbnRleHQgPSBfYS5leGVjQ29udGV4dDtcbiAgICAgICAgdmFyIGZyYWdtZW50TWFwID0gZXhlY0NvbnRleHQuZnJhZ21lbnRNYXAsIGNvbnRleHRWYWx1ZSA9IGV4ZWNDb250ZXh0LmNvbnRleHRWYWx1ZSwgdmFyaWFibGVzID0gZXhlY0NvbnRleHQudmFyaWFibGVWYWx1ZXM7XG4gICAgICAgIHZhciBmaW5hbFJlc3VsdCA9IHsgcmVzdWx0OiBudWxsIH07XG4gICAgICAgIHZhciBvYmplY3RzVG9NZXJnZSA9IFtdO1xuICAgICAgICB2YXIgb2JqZWN0ID0gY29udGV4dFZhbHVlLnN0b3JlLmdldChyb290VmFsdWUuaWQpO1xuICAgICAgICB2YXIgdHlwZW5hbWUgPSAob2JqZWN0ICYmIG9iamVjdC5fX3R5cGVuYW1lKSB8fFxuICAgICAgICAgICAgKHJvb3RWYWx1ZS5pZCA9PT0gJ1JPT1RfUVVFUlknICYmICdRdWVyeScpIHx8XG4gICAgICAgICAgICB2b2lkIDA7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZU1pc3NpbmcocmVzdWx0KSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lm1pc3NpbmcpIHtcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3VsdC5taXNzaW5nID0gZmluYWxSZXN1bHQubWlzc2luZyB8fCBbXTtcbiAgICAgICAgICAgICAgICAoX2EgPSBmaW5hbFJlc3VsdC5taXNzaW5nKS5wdXNoLmFwcGx5KF9hLCByZXN1bHQubWlzc2luZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICghc2hvdWxkSW5jbHVkZShzZWxlY3Rpb24sIHZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNGaWVsZChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkUmVzdWx0ID0gaGFuZGxlTWlzc2luZyhfdGhpcy5leGVjdXRlRmllbGQob2JqZWN0LCB0eXBlbmFtZSwgc2VsZWN0aW9uLCBleGVjQ29udGV4dCkpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGRSZXN1bHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNUb01lcmdlLnB1c2goKF9hID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBfYVtyZXN1bHRLZXlOYW1lRnJvbUZpZWxkKHNlbGVjdGlvbildID0gZmllbGRSZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBfYSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmcmFnbWVudCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBpZiAoaXNJbmxpbmVGcmFnbWVudChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBmcmFnbWVudE1hcFtzZWxlY3Rpb24ubmFtZS52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IG5ldyBJbnZhcmlhbnRFcnJvcig5KSA6IG5ldyBJbnZhcmlhbnRFcnJvcihcIk5vIGZyYWdtZW50IG5hbWVkIFwiICsgc2VsZWN0aW9uLm5hbWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0eXBlQ29uZGl0aW9uID0gZnJhZ21lbnQudHlwZUNvbmRpdGlvbiAmJiBmcmFnbWVudC50eXBlQ29uZGl0aW9uLm5hbWUudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gIXR5cGVDb25kaXRpb24gfHxcbiAgICAgICAgICAgICAgICAgICAgZXhlY0NvbnRleHQuZnJhZ21lbnRNYXRjaGVyKHJvb3RWYWx1ZSwgdHlwZUNvbmRpdGlvbiwgY29udGV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZyYWdtZW50RXhlY1Jlc3VsdCA9IF90aGlzLmV4ZWN1dGVTZWxlY3Rpb25TZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmcmFnbWVudC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICByb290VmFsdWU6IHJvb3RWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWNDb250ZXh0OiBleGVjQ29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gJ2hldXJpc3RpYycgJiYgZnJhZ21lbnRFeGVjUmVzdWx0Lm1pc3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50RXhlY1Jlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmcmFnbWVudEV4ZWNSZXN1bHQpLCB7IG1pc3Npbmc6IGZyYWdtZW50RXhlY1Jlc3VsdC5taXNzaW5nLm1hcChmdW5jdGlvbiAoaW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIGluZm8pLCB7IHRvbGVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzVG9NZXJnZS5wdXNoKGhhbmRsZU1pc3NpbmcoZnJhZ21lbnRFeGVjUmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZmluYWxSZXN1bHQucmVzdWx0ID0gbWVyZ2VEZWVwQXJyYXkob2JqZWN0c1RvTWVyZ2UpO1xuICAgICAgICBpZiAodGhpcy5mcmVlemVSZXN1bHRzICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIE9iamVjdC5mcmVlemUoZmluYWxSZXN1bHQucmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmluYWxSZXN1bHQ7XG4gICAgfTtcbiAgICBTdG9yZVJlYWRlci5wcm90b3R5cGUuZXhlY3V0ZUZpZWxkID0gZnVuY3Rpb24gKG9iamVjdCwgdHlwZW5hbWUsIGZpZWxkLCBleGVjQ29udGV4dCkge1xuICAgICAgICB2YXIgdmFyaWFibGVzID0gZXhlY0NvbnRleHQudmFyaWFibGVWYWx1ZXMsIGNvbnRleHRWYWx1ZSA9IGV4ZWNDb250ZXh0LmNvbnRleHRWYWx1ZTtcbiAgICAgICAgdmFyIGZpZWxkTmFtZSA9IGZpZWxkLm5hbWUudmFsdWU7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzT2JqZWN0RnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpO1xuICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHJlc3VsdEtleTogcmVzdWx0S2V5TmFtZUZyb21GaWVsZChmaWVsZCksXG4gICAgICAgICAgICBkaXJlY3RpdmVzOiBnZXREaXJlY3RpdmVJbmZvRnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVhZFN0b3JlUmVzdWx0ID0gcmVhZFN0b3JlUmVzb2x2ZXIob2JqZWN0LCB0eXBlbmFtZSwgZmllbGROYW1lLCBhcmdzLCBjb250ZXh0VmFsdWUsIGluZm8pO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWFkU3RvcmVSZXN1bHQucmVzdWx0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tYmluZUV4ZWNSZXN1bHRzKHJlYWRTdG9yZVJlc3VsdCwgdGhpcy5leGVjdXRlU3ViU2VsZWN0ZWRBcnJheSh7XG4gICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgIGFycmF5OiByZWFkU3RvcmVSZXN1bHQucmVzdWx0LFxuICAgICAgICAgICAgICAgIGV4ZWNDb250ZXh0OiBleGVjQ29udGV4dCxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZpZWxkLnNlbGVjdGlvblNldCkge1xuICAgICAgICAgICAgYXNzZXJ0U2VsZWN0aW9uU2V0Rm9ySWRWYWx1ZShmaWVsZCwgcmVhZFN0b3JlUmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmVlemVSZXN1bHRzICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBtYXliZURlZXBGcmVlemUocmVhZFN0b3JlUmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWFkU3RvcmVSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWRTdG9yZVJlc3VsdC5yZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRTdG9yZVJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21iaW5lRXhlY1Jlc3VsdHMocmVhZFN0b3JlUmVzdWx0LCB0aGlzLmV4ZWN1dGVTZWxlY3Rpb25TZXQoe1xuICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmaWVsZC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICByb290VmFsdWU6IHJlYWRTdG9yZVJlc3VsdC5yZXN1bHQsXG4gICAgICAgICAgICBleGVjQ29udGV4dDogZXhlY0NvbnRleHQsXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIFN0b3JlUmVhZGVyLnByb3RvdHlwZS5jb21iaW5lRXhlY1Jlc3VsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBleGVjUmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgZXhlY1Jlc3VsdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWlzc2luZztcbiAgICAgICAgZXhlY1Jlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAoZXhlY1Jlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGV4ZWNSZXN1bHQubWlzc2luZykge1xuICAgICAgICAgICAgICAgIG1pc3NpbmcgPSBtaXNzaW5nIHx8IFtdO1xuICAgICAgICAgICAgICAgIG1pc3NpbmcucHVzaC5hcHBseShtaXNzaW5nLCBleGVjUmVzdWx0Lm1pc3NpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdDogZXhlY1Jlc3VsdHMucG9wKCkucmVzdWx0LFxuICAgICAgICAgICAgbWlzc2luZzogbWlzc2luZyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFN0b3JlUmVhZGVyLnByb3RvdHlwZS5leGVjdXRlU3ViU2VsZWN0ZWRBcnJheSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZmllbGQgPSBfYS5maWVsZCwgYXJyYXkgPSBfYS5hcnJheSwgZXhlY0NvbnRleHQgPSBfYS5leGVjQ29udGV4dDtcbiAgICAgICAgdmFyIG1pc3Npbmc7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZU1pc3NpbmcoY2hpbGRSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChjaGlsZFJlc3VsdC5taXNzaW5nKSB7XG4gICAgICAgICAgICAgICAgbWlzc2luZyA9IG1pc3NpbmcgfHwgW107XG4gICAgICAgICAgICAgICAgbWlzc2luZy5wdXNoLmFwcGx5KG1pc3NpbmcsIGNoaWxkUmVzdWx0Lm1pc3NpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkUmVzdWx0LnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBhcnJheSA9IGFycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZU1pc3NpbmcoX3RoaXMuZXhlY3V0ZVN1YlNlbGVjdGVkQXJyYXkoe1xuICAgICAgICAgICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIGFycmF5OiBpdGVtLFxuICAgICAgICAgICAgICAgICAgICBleGVjQ29udGV4dDogZXhlY0NvbnRleHQsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpZWxkLnNlbGVjdGlvblNldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVNaXNzaW5nKF90aGlzLmV4ZWN1dGVTZWxlY3Rpb25TZXQoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25TZXQ6IGZpZWxkLnNlbGVjdGlvblNldCxcbiAgICAgICAgICAgICAgICAgICAgcm9vdFZhbHVlOiBpdGVtLFxuICAgICAgICAgICAgICAgICAgICBleGVjQ29udGV4dDogZXhlY0NvbnRleHQsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXNzZXJ0U2VsZWN0aW9uU2V0Rm9ySWRWYWx1ZShmaWVsZCwgaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmZyZWV6ZVJlc3VsdHMgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgT2JqZWN0LmZyZWV6ZShhcnJheSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcmVzdWx0OiBhcnJheSwgbWlzc2luZzogbWlzc2luZyB9O1xuICAgIH07XG4gICAgcmV0dXJuIFN0b3JlUmVhZGVyO1xufSgpKTtcbmZ1bmN0aW9uIGFzc2VydFNlbGVjdGlvblNldEZvcklkVmFsdWUoZmllbGQsIHZhbHVlKSB7XG4gICAgaWYgKCFmaWVsZC5zZWxlY3Rpb25TZXQgJiYgaXNJZFZhbHVlKHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBuZXcgSW52YXJpYW50RXJyb3IoMTApIDogbmV3IEludmFyaWFudEVycm9yKFwiTWlzc2luZyBzZWxlY3Rpb24gc2V0IGZvciBvYmplY3Qgb2YgdHlwZSBcIiArIHZhbHVlLnR5cGVuYW1lICsgXCIgcmV0dXJuZWQgZm9yIHF1ZXJ5IGZpZWxkIFwiICsgZmllbGQubmFtZS52YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVmYXVsdEZyYWdtZW50TWF0Y2hlcigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGFzc2VydElkVmFsdWUoaWRWYWx1ZSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChpc0lkVmFsdWUoaWRWYWx1ZSksIDExKSA6IGludmFyaWFudChpc0lkVmFsdWUoaWRWYWx1ZSksIFwiRW5jb3VudGVyZWQgYSBzdWItc2VsZWN0aW9uIG9uIHRoZSBxdWVyeSwgYnV0IHRoZSBzdG9yZSBkb2Vzbid0IGhhdmUgYW4gb2JqZWN0IHJlZmVyZW5jZS4gVGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuIGR1cmluZyBub3JtYWwgdXNlIHVubGVzcyB5b3UgaGF2ZSBjdXN0b20gY29kZSB0aGF0IGlzIGRpcmVjdGx5IG1hbmlwdWxhdGluZyB0aGUgc3RvcmU7IHBsZWFzZSBmaWxlIGFuIGlzc3VlLlwiKTtcbn1cbmZ1bmN0aW9uIHJlYWRTdG9yZVJlc29sdmVyKG9iamVjdCwgdHlwZW5hbWUsIGZpZWxkTmFtZSwgYXJncywgY29udGV4dCwgX2EpIHtcbiAgICB2YXIgcmVzdWx0S2V5ID0gX2EucmVzdWx0S2V5LCBkaXJlY3RpdmVzID0gX2EuZGlyZWN0aXZlcztcbiAgICB2YXIgc3RvcmVLZXlOYW1lID0gZmllbGROYW1lO1xuICAgIGlmIChhcmdzIHx8IGRpcmVjdGl2ZXMpIHtcbiAgICAgICAgc3RvcmVLZXlOYW1lID0gZ2V0U3RvcmVLZXlOYW1lKHN0b3JlS2V5TmFtZSwgYXJncywgZGlyZWN0aXZlcyk7XG4gICAgfVxuICAgIHZhciBmaWVsZFZhbHVlID0gdm9pZCAwO1xuICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgZmllbGRWYWx1ZSA9IG9iamVjdFtzdG9yZUtleU5hbWVdO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkVmFsdWUgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBjb250ZXh0LmNhY2hlUmVkaXJlY3RzICYmXG4gICAgICAgICAgICB0eXBlb2YgdHlwZW5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGNvbnRleHQuY2FjaGVSZWRpcmVjdHNbdHlwZW5hbWVdO1xuICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSB0eXBlW2ZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSByZXNvbHZlcihvYmplY3QsIGFyZ3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENhY2hlS2V5OiBmdW5jdGlvbiAoc3RvcmVPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBjb250ZXh0LmRhdGFJZEZyb21PYmplY3Qoc3RvcmVPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpZCAmJiB0b0lkVmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVuYW1lOiBzdG9yZU9iai5fX3R5cGVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZmllbGRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdDogZmllbGRWYWx1ZSxcbiAgICAgICAgICAgIG1pc3Npbmc6IFt7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWU6IHN0b3JlS2V5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdG9sZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGlzSnNvblZhbHVlKGZpZWxkVmFsdWUpKSB7XG4gICAgICAgIGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLmpzb247XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdDogZmllbGRWYWx1ZSxcbiAgICB9O1xufVxuXG52YXIgT2JqZWN0Q2FjaGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9iamVjdENhY2hlKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgfVxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgICBPYmplY3RDYWNoZS5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfTtcbiAgICBPYmplY3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRhdGFJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2RhdGFJZF07XG4gICAgfTtcbiAgICBPYmplY3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGRhdGFJZCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhW2RhdGFJZF0gPSB2YWx1ZTtcbiAgICB9O1xuICAgIE9iamVjdENhY2hlLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoZGF0YUlkKSB7XG4gICAgICAgIHRoaXMuZGF0YVtkYXRhSWRdID0gdm9pZCAwO1xuICAgIH07XG4gICAgT2JqZWN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH07XG4gICAgT2JqZWN0Q2FjaGUucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXdEYXRhIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0Q2FjaGU7XG59KCkpO1xuZnVuY3Rpb24gZGVmYXVsdE5vcm1hbGl6ZWRDYWNoZUZhY3RvcnkkMShzZWVkKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RDYWNoZShzZWVkKTtcbn1cblxudmFyIFdyaXRlRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhXcml0ZUVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFdyaXRlRXJyb3IoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50eXBlID0gJ1dyaXRlRXJyb3InO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBXcml0ZUVycm9yO1xufShFcnJvcikpO1xuZnVuY3Rpb24gZW5oYW5jZUVycm9yV2l0aERvY3VtZW50KGVycm9yLCBkb2N1bWVudCkge1xuICAgIHZhciBlbmhhbmNlZEVycm9yID0gbmV3IFdyaXRlRXJyb3IoXCJFcnJvciB3cml0aW5nIHJlc3VsdCB0byBzdG9yZSBmb3IgcXVlcnk6XFxuIFwiICsgSlNPTi5zdHJpbmdpZnkoZG9jdW1lbnQpKTtcbiAgICBlbmhhbmNlZEVycm9yLm1lc3NhZ2UgKz0gJ1xcbicgKyBlcnJvci5tZXNzYWdlO1xuICAgIGVuaGFuY2VkRXJyb3Iuc3RhY2sgPSBlcnJvci5zdGFjaztcbiAgICByZXR1cm4gZW5oYW5jZWRFcnJvcjtcbn1cbnZhciBTdG9yZVdyaXRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RvcmVXcml0ZXIoKSB7XG4gICAgfVxuICAgIFN0b3JlV3JpdGVyLnByb3RvdHlwZS53cml0ZVF1ZXJ5VG9TdG9yZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgcXVlcnkgPSBfYS5xdWVyeSwgcmVzdWx0ID0gX2EucmVzdWx0LCBfYiA9IF9hLnN0b3JlLCBzdG9yZSA9IF9iID09PSB2b2lkIDAgPyBkZWZhdWx0Tm9ybWFsaXplZENhY2hlRmFjdG9yeSgpIDogX2IsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZGF0YUlkRnJvbU9iamVjdCA9IF9hLmRhdGFJZEZyb21PYmplY3QsIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uID0gX2EuZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb247XG4gICAgICAgIHJldHVybiB0aGlzLndyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LFxuICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBkYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN0b3JlV3JpdGVyLnByb3RvdHlwZS53cml0ZVJlc3VsdFRvU3RvcmUgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGRhdGFJZCA9IF9hLmRhdGFJZCwgcmVzdWx0ID0gX2EucmVzdWx0LCBkb2N1bWVudCA9IF9hLmRvY3VtZW50LCBfYiA9IF9hLnN0b3JlLCBzdG9yZSA9IF9iID09PSB2b2lkIDAgPyBkZWZhdWx0Tm9ybWFsaXplZENhY2hlRmFjdG9yeSgpIDogX2IsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZGF0YUlkRnJvbU9iamVjdCA9IF9hLmRhdGFJZEZyb21PYmplY3QsIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uID0gX2EuZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb247XG4gICAgICAgIHZhciBvcGVyYXRpb25EZWZpbml0aW9uID0gZ2V0T3BlcmF0aW9uRGVmaW5pdGlvbihkb2N1bWVudCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgIGRhdGFJZDogZGF0YUlkLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvblNldDogb3BlcmF0aW9uRGVmaW5pdGlvbi5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZERhdGE6IHt9LFxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhvcGVyYXRpb25EZWZpbml0aW9uKSwgdmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXA6IGNyZWF0ZUZyYWdtZW50TWFwKGdldEZyYWdtZW50RGVmaW5pdGlvbnMoZG9jdW1lbnQpKSxcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgZW5oYW5jZUVycm9yV2l0aERvY3VtZW50KGUsIGRvY3VtZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RvcmVXcml0ZXIucHJvdG90eXBlLndyaXRlU2VsZWN0aW9uU2V0VG9TdG9yZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0ID0gX2EucmVzdWx0LCBkYXRhSWQgPSBfYS5kYXRhSWQsIHNlbGVjdGlvblNldCA9IF9hLnNlbGVjdGlvblNldCwgY29udGV4dCA9IF9hLmNvbnRleHQ7XG4gICAgICAgIHZhciB2YXJpYWJsZXMgPSBjb250ZXh0LnZhcmlhYmxlcywgc3RvcmUgPSBjb250ZXh0LnN0b3JlLCBmcmFnbWVudE1hcCA9IGNvbnRleHQuZnJhZ21lbnRNYXA7XG4gICAgICAgIHNlbGVjdGlvblNldC5zZWxlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKCFzaG91bGRJbmNsdWRlKHNlbGVjdGlvbiwgdmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0ZpZWxkKHNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0RmllbGRLZXkgPSByZXN1bHRLZXlOYW1lRnJvbUZpZWxkKHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0W3Jlc3VsdEZpZWxkS2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy53cml0ZUZpZWxkVG9TdG9yZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhSWQ6IGRhdGFJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBzZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0RlZmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ2xpZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24uZGlyZWN0aXZlcyAmJiBzZWxlY3Rpb24uZGlyZWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRGVmZXJlZCA9IHNlbGVjdGlvbi5kaXJlY3RpdmVzLnNvbWUoZnVuY3Rpb24gKGRpcmVjdGl2ZSkgeyByZXR1cm4gZGlyZWN0aXZlLm5hbWUgJiYgZGlyZWN0aXZlLm5hbWUudmFsdWUgPT09ICdkZWZlcic7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNDbGllbnQgPSBzZWxlY3Rpb24uZGlyZWN0aXZlcy5zb21lKGZ1bmN0aW9uIChkaXJlY3RpdmUpIHsgcmV0dXJuIGRpcmVjdGl2ZS5uYW1lICYmIGRpcmVjdGl2ZS5uYW1lLnZhbHVlID09PSAnY2xpZW50JzsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0RlZmVyZWQgJiYgIWlzQ2xpZW50ICYmIGNvbnRleHQuZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQud2FybihcIk1pc3NpbmcgZmllbGQgXCIgKyByZXN1bHRGaWVsZEtleSArIFwiIGluIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKS5zdWJzdHJpbmcoMCwgMTAwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKGlzSW5saW5lRnJhZ21lbnQoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gKGZyYWdtZW50TWFwIHx8IHt9KVtzZWxlY3Rpb24ubmFtZS52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmcmFnbWVudCwgMykgOiBpbnZhcmlhbnQoZnJhZ21lbnQsIFwiTm8gZnJhZ21lbnQgbmFtZWQgXCIgKyBzZWxlY3Rpb24ubmFtZS52YWx1ZSArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uICYmIGZyYWdtZW50LnR5cGVDb25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gZGF0YUlkIHx8ICdzZWxmJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkVmFsdWUgPSB0b0lkVmFsdWUoeyBpZDogaWQsIHR5cGVuYW1lOiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWtlQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlOiBuZXcgT2JqZWN0Q2FjaGUoKF9hID0ge30sIF9hW2lkXSA9IHJlc3VsdCwgX2EpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlUmVkaXJlY3RzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gY29udGV4dC5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbihpZFZhbHVlLCBmcmFnbWVudC50eXBlQ29uZGl0aW9uLm5hbWUudmFsdWUsIGZha2VDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Byb2R1Y3Rpb24oKSAmJiBtYXRjaCA9PT0gJ2hldXJpc3RpYycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQuZXJyb3IoJ1dBUk5JTkc6IGhldXJpc3RpYyBmcmFnbWVudCBtYXRjaGluZyBnb2luZyBvbiEnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gISFtYXRjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMud3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmcmFnbWVudC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhSWQ6IGRhdGFJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9O1xuICAgIFN0b3JlV3JpdGVyLnByb3RvdHlwZS53cml0ZUZpZWxkVG9TdG9yZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX2I7XG4gICAgICAgIHZhciBmaWVsZCA9IF9hLmZpZWxkLCB2YWx1ZSA9IF9hLnZhbHVlLCBkYXRhSWQgPSBfYS5kYXRhSWQsIGNvbnRleHQgPSBfYS5jb250ZXh0O1xuICAgICAgICB2YXIgdmFyaWFibGVzID0gY29udGV4dC52YXJpYWJsZXMsIGRhdGFJZEZyb21PYmplY3QgPSBjb250ZXh0LmRhdGFJZEZyb21PYmplY3QsIHN0b3JlID0gY29udGV4dC5zdG9yZTtcbiAgICAgICAgdmFyIHN0b3JlVmFsdWU7XG4gICAgICAgIHZhciBzdG9yZU9iamVjdDtcbiAgICAgICAgdmFyIHN0b3JlRmllbGROYW1lID0gc3RvcmVLZXlOYW1lRnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpO1xuICAgICAgICBpZiAoIWZpZWxkLnNlbGVjdGlvblNldCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc3RvcmVWYWx1ZSA9XG4gICAgICAgICAgICAgICAgdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ2pzb24nLCBqc29uOiB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YXIgZ2VuZXJhdGVkSWQgPSBkYXRhSWQgKyBcIi5cIiArIHN0b3JlRmllbGROYW1lO1xuICAgICAgICAgICAgc3RvcmVWYWx1ZSA9IHRoaXMucHJvY2Vzc0FycmF5VmFsdWUodmFsdWUsIGdlbmVyYXRlZElkLCBmaWVsZC5zZWxlY3Rpb25TZXQsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHZhbHVlRGF0YUlkID0gZGF0YUlkICsgXCIuXCIgKyBzdG9yZUZpZWxkTmFtZTtcbiAgICAgICAgICAgIHZhciBnZW5lcmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFpc0dlbmVyYXRlZElkKHZhbHVlRGF0YUlkKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlRGF0YUlkID0gJyQnICsgdmFsdWVEYXRhSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YUlkRnJvbU9iamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBzZW1hbnRpY0lkID0gZGF0YUlkRnJvbU9iamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KCFzZW1hbnRpY0lkIHx8ICFpc0dlbmVyYXRlZElkKHNlbWFudGljSWQpLCA0KSA6IGludmFyaWFudCghc2VtYW50aWNJZCB8fCAhaXNHZW5lcmF0ZWRJZChzZW1hbnRpY0lkKSwgJ0lEcyByZXR1cm5lZCBieSBkYXRhSWRGcm9tT2JqZWN0IGNhbm5vdCBiZWdpbiB3aXRoIHRoZSBcIiRcIiBjaGFyYWN0ZXIuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbWFudGljSWQgfHxcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBzZW1hbnRpY0lkID09PSAnbnVtYmVyJyAmJiBzZW1hbnRpY0lkID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZURhdGFJZCA9IHNlbWFudGljSWQ7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNEYXRhUHJvY2Vzc2VkKHZhbHVlRGF0YUlkLCBmaWVsZCwgY29udGV4dC5wcm9jZXNzZWREYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUlkOiB2YWx1ZURhdGFJZCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmaWVsZC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHlwZW5hbWUgPSB2YWx1ZS5fX3R5cGVuYW1lO1xuICAgICAgICAgICAgc3RvcmVWYWx1ZSA9IHRvSWRWYWx1ZSh7IGlkOiB2YWx1ZURhdGFJZCwgdHlwZW5hbWU6IHR5cGVuYW1lIH0sIGdlbmVyYXRlZCk7XG4gICAgICAgICAgICBzdG9yZU9iamVjdCA9IHN0b3JlLmdldChkYXRhSWQpO1xuICAgICAgICAgICAgdmFyIGVzY2FwZWRJZCA9IHN0b3JlT2JqZWN0ICYmIHN0b3JlT2JqZWN0W3N0b3JlRmllbGROYW1lXTtcbiAgICAgICAgICAgIGlmIChlc2NhcGVkSWQgIT09IHN0b3JlVmFsdWUgJiYgaXNJZFZhbHVlKGVzY2FwZWRJZCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFkVHlwZW5hbWUgPSBlc2NhcGVkSWQudHlwZW5hbWUgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgaGFzVHlwZW5hbWUgPSB0eXBlbmFtZSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHZhciB0eXBlbmFtZUNoYW5nZWQgPSBoYWRUeXBlbmFtZSAmJiBoYXNUeXBlbmFtZSAmJiBlc2NhcGVkSWQudHlwZW5hbWUgIT09IHR5cGVuYW1lO1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudCghZ2VuZXJhdGVkIHx8IGVzY2FwZWRJZC5nZW5lcmF0ZWQgfHwgdHlwZW5hbWVDaGFuZ2VkLCA1KSA6IGludmFyaWFudCghZ2VuZXJhdGVkIHx8IGVzY2FwZWRJZC5nZW5lcmF0ZWQgfHwgdHlwZW5hbWVDaGFuZ2VkLCBcIlN0b3JlIGVycm9yOiB0aGUgYXBwbGljYXRpb24gYXR0ZW1wdGVkIHRvIHdyaXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3ZpZGVkIGlkIGJ1dCB0aGUgc3RvcmUgYWxyZWFkeSBjb250YWlucyBhbiBpZCBvZiBcIiArIGVzY2FwZWRJZC5pZCArIFwiIGZvciB0aGlzIG9iamVjdC4gVGhlIHNlbGVjdGlvblNldCB0aGF0IHdhcyB0cnlpbmcgdG8gYmUgd3JpdHRlbiBpczpcXG5cIiArIEpTT04uc3RyaW5naWZ5KGZpZWxkKSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KCFoYWRUeXBlbmFtZSB8fCBoYXNUeXBlbmFtZSwgNikgOiBpbnZhcmlhbnQoIWhhZFR5cGVuYW1lIHx8IGhhc1R5cGVuYW1lLCBcIlN0b3JlIGVycm9yOiB0aGUgYXBwbGljYXRpb24gYXR0ZW1wdGVkIHRvIHdyaXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3ZpZGVkIHR5cGVuYW1lIGJ1dCB0aGUgc3RvcmUgYWxyZWFkeSBjb250YWlucyBhbiBvYmplY3Qgd2l0aCB0eXBlbmFtZSBvZiBcIiArIGVzY2FwZWRJZC50eXBlbmFtZSArIFwiIGZvciB0aGUgb2JqZWN0IG9mIGlkIFwiICsgZXNjYXBlZElkLmlkICsgXCIuIFRoZSBzZWxlY3Rpb25TZXQgdGhhdCB3YXMgdHJ5aW5nIHRvIGJlIHdyaXR0ZW4gaXM6XFxuXCIgKyBKU09OLnN0cmluZ2lmeShmaWVsZCkpO1xuICAgICAgICAgICAgICAgIGlmIChlc2NhcGVkSWQuZ2VuZXJhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlbmFtZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ2VuZXJhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUuZGVsZXRlKGVzY2FwZWRJZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZVdpdGhHZW5lcmF0ZWQoZXNjYXBlZElkLmlkLCBzdG9yZVZhbHVlLmlkLCBzdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmVPYmplY3QgPSBzdG9yZS5nZXQoZGF0YUlkKTtcbiAgICAgICAgaWYgKCFzdG9yZU9iamVjdCB8fCAhaXNFcXVhbChzdG9yZVZhbHVlLCBzdG9yZU9iamVjdFtzdG9yZUZpZWxkTmFtZV0pKSB7XG4gICAgICAgICAgICBzdG9yZS5zZXQoZGF0YUlkLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc3RvcmVPYmplY3QpLCAoX2IgPSB7fSwgX2Jbc3RvcmVGaWVsZE5hbWVdID0gc3RvcmVWYWx1ZSwgX2IpKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0b3JlV3JpdGVyLnByb3RvdHlwZS5wcm9jZXNzQXJyYXlWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgZ2VuZXJhdGVkSWQsIHNlbGVjdGlvblNldCwgY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpdGVtRGF0YUlkID0gZ2VuZXJhdGVkSWQgKyBcIi5cIiArIGluZGV4O1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvY2Vzc0FycmF5VmFsdWUoaXRlbSwgaXRlbURhdGFJZCwgc2VsZWN0aW9uU2V0LCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBnZW5lcmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZGF0YUlkRnJvbU9iamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBzZW1hbnRpY0lkID0gY29udGV4dC5kYXRhSWRGcm9tT2JqZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChzZW1hbnRpY0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhSWQgPSBzZW1hbnRpY0lkO1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRGF0YVByb2Nlc3NlZChpdGVtRGF0YUlkLCBzZWxlY3Rpb25TZXQsIGNvbnRleHQucHJvY2Vzc2VkRGF0YSkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy53cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhSWQ6IGl0ZW1EYXRhSWQsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBzZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9JZFZhbHVlKHsgaWQ6IGl0ZW1EYXRhSWQsIHR5cGVuYW1lOiBpdGVtLl9fdHlwZW5hbWUgfSwgZ2VuZXJhdGVkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3RvcmVXcml0ZXI7XG59KCkpO1xuZnVuY3Rpb24gaXNHZW5lcmF0ZWRJZChpZCkge1xuICAgIHJldHVybiBpZFswXSA9PT0gJyQnO1xufVxuZnVuY3Rpb24gbWVyZ2VXaXRoR2VuZXJhdGVkKGdlbmVyYXRlZEtleSwgcmVhbEtleSwgY2FjaGUpIHtcbiAgICBpZiAoZ2VuZXJhdGVkS2V5ID09PSByZWFsS2V5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGdlbmVyYXRlZCA9IGNhY2hlLmdldChnZW5lcmF0ZWRLZXkpO1xuICAgIHZhciByZWFsID0gY2FjaGUuZ2V0KHJlYWxLZXkpO1xuICAgIHZhciBtYWRlQ2hhbmdlcyA9IGZhbHNlO1xuICAgIE9iamVjdC5rZXlzKGdlbmVyYXRlZCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdlbmVyYXRlZFtrZXldO1xuICAgICAgICB2YXIgcmVhbFZhbHVlID0gcmVhbFtrZXldO1xuICAgICAgICBpZiAoaXNJZFZhbHVlKHZhbHVlKSAmJlxuICAgICAgICAgICAgaXNHZW5lcmF0ZWRJZCh2YWx1ZS5pZCkgJiZcbiAgICAgICAgICAgIGlzSWRWYWx1ZShyZWFsVmFsdWUpICYmXG4gICAgICAgICAgICAhaXNFcXVhbCh2YWx1ZSwgcmVhbFZhbHVlKSAmJlxuICAgICAgICAgICAgbWVyZ2VXaXRoR2VuZXJhdGVkKHZhbHVlLmlkLCByZWFsVmFsdWUuaWQsIGNhY2hlKSkge1xuICAgICAgICAgICAgbWFkZUNoYW5nZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY2FjaGUuZGVsZXRlKGdlbmVyYXRlZEtleSk7XG4gICAgdmFyIG5ld1JlYWxWYWx1ZSA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBnZW5lcmF0ZWQpLCByZWFsKTtcbiAgICBpZiAoaXNFcXVhbChuZXdSZWFsVmFsdWUsIHJlYWwpKSB7XG4gICAgICAgIHJldHVybiBtYWRlQ2hhbmdlcztcbiAgICB9XG4gICAgY2FjaGUuc2V0KHJlYWxLZXksIG5ld1JlYWxWYWx1ZSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpc0RhdGFQcm9jZXNzZWQoZGF0YUlkLCBmaWVsZCwgcHJvY2Vzc2VkRGF0YSkge1xuICAgIGlmICghcHJvY2Vzc2VkRGF0YSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzZWREYXRhW2RhdGFJZF0pIHtcbiAgICAgICAgaWYgKHByb2Nlc3NlZERhdGFbZGF0YUlkXS5pbmRleE9mKGZpZWxkKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb2Nlc3NlZERhdGFbZGF0YUlkXS5wdXNoKGZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcHJvY2Vzc2VkRGF0YVtkYXRhSWRdID0gW2ZpZWxkXTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgZGVmYXVsdENvbmZpZyA9IHtcbiAgICBmcmFnbWVudE1hdGNoZXI6IG5ldyBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIoKSxcbiAgICBkYXRhSWRGcm9tT2JqZWN0OiBkZWZhdWx0RGF0YUlkRnJvbU9iamVjdCxcbiAgICBhZGRUeXBlbmFtZTogdHJ1ZSxcbiAgICByZXN1bHRDYWNoaW5nOiB0cnVlLFxuICAgIGZyZWV6ZVJlc3VsdHM6IGZhbHNlLFxufTtcbmZ1bmN0aW9uIGRlZmF1bHREYXRhSWRGcm9tT2JqZWN0KHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQuX190eXBlbmFtZSkge1xuICAgICAgICBpZiAocmVzdWx0LmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuX190eXBlbmFtZSArIFwiOlwiICsgcmVzdWx0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQuX2lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuX190eXBlbmFtZSArIFwiOlwiICsgcmVzdWx0Ll9pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbnZhciBoYXNPd24kMSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgT3B0aW1pc3RpY0NhY2hlTGF5ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPcHRpbWlzdGljQ2FjaGVMYXllciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPcHRpbWlzdGljQ2FjaGVMYXllcihvcHRpbWlzdGljSWQsIHBhcmVudCwgdHJhbnNhY3Rpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgT2JqZWN0LmNyZWF0ZShudWxsKSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub3B0aW1pc3RpY0lkID0gb3B0aW1pc3RpY0lkO1xuICAgICAgICBfdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIF90aGlzLnRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb247XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT3B0aW1pc3RpY0NhY2hlTGF5ZXIucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMucGFyZW50LnRvT2JqZWN0KCkpLCB0aGlzLmRhdGEpO1xuICAgIH07XG4gICAgT3B0aW1pc3RpY0NhY2hlTGF5ZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkYXRhSWQpIHtcbiAgICAgICAgcmV0dXJuIGhhc093biQxLmNhbGwodGhpcy5kYXRhLCBkYXRhSWQpXG4gICAgICAgICAgICA/IHRoaXMuZGF0YVtkYXRhSWRdXG4gICAgICAgICAgICA6IHRoaXMucGFyZW50LmdldChkYXRhSWQpO1xuICAgIH07XG4gICAgcmV0dXJuIE9wdGltaXN0aWNDYWNoZUxheWVyO1xufShPYmplY3RDYWNoZSkpO1xudmFyIEluTWVtb3J5Q2FjaGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbk1lbW9yeUNhY2hlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEluTWVtb3J5Q2FjaGUoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy53YXRjaGVzID0gbmV3IFNldCgpO1xuICAgICAgICBfdGhpcy50eXBlbmFtZURvY3VtZW50Q2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIF90aGlzLmNhY2hlS2V5Um9vdCA9IG5ldyBLZXlUcmllKGNhblVzZVdlYWtNYXApO1xuICAgICAgICBfdGhpcy5zaWxlbmNlQnJvYWRjYXN0ID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0Q29uZmlnKSwgY29uZmlnKTtcbiAgICAgICAgaWYgKF90aGlzLmNvbmZpZy5jdXN0b21SZXNvbHZlcnMpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQud2FybignY3VzdG9tUmVzb2x2ZXJzIGhhdmUgYmVlbiByZW5hbWVkIHRvIGNhY2hlUmVkaXJlY3RzLiBQbGVhc2UgdXBkYXRlIHlvdXIgY29uZmlnIGFzIHdlIHdpbGwgYmUgZGVwcmVjYXRpbmcgY3VzdG9tUmVzb2x2ZXJzIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uJyk7XG4gICAgICAgICAgICBfdGhpcy5jb25maWcuY2FjaGVSZWRpcmVjdHMgPSBfdGhpcy5jb25maWcuY3VzdG9tUmVzb2x2ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfdGhpcy5jb25maWcuY2FjaGVSZXNvbHZlcnMpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQud2FybignY2FjaGVSZXNvbHZlcnMgaGF2ZSBiZWVuIHJlbmFtZWQgdG8gY2FjaGVSZWRpcmVjdHMuIFBsZWFzZSB1cGRhdGUgeW91ciBjb25maWcgYXMgd2Ugd2lsbCBiZSBkZXByZWNhdGluZyBjYWNoZVJlc29sdmVycyBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLicpO1xuICAgICAgICAgICAgX3RoaXMuY29uZmlnLmNhY2hlUmVkaXJlY3RzID0gX3RoaXMuY29uZmlnLmNhY2hlUmVzb2x2ZXJzO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLmFkZFR5cGVuYW1lID0gISFfdGhpcy5jb25maWcuYWRkVHlwZW5hbWU7XG4gICAgICAgIF90aGlzLmRhdGEgPSBfdGhpcy5jb25maWcucmVzdWx0Q2FjaGluZ1xuICAgICAgICAgICAgPyBuZXcgRGVwVHJhY2tpbmdDYWNoZSgpXG4gICAgICAgICAgICA6IG5ldyBPYmplY3RDYWNoZSgpO1xuICAgICAgICBfdGhpcy5vcHRpbWlzdGljRGF0YSA9IF90aGlzLmRhdGE7XG4gICAgICAgIF90aGlzLnN0b3JlV3JpdGVyID0gbmV3IFN0b3JlV3JpdGVyKCk7XG4gICAgICAgIF90aGlzLnN0b3JlUmVhZGVyID0gbmV3IFN0b3JlUmVhZGVyKHtcbiAgICAgICAgICAgIGNhY2hlS2V5Um9vdDogX3RoaXMuY2FjaGVLZXlSb290LFxuICAgICAgICAgICAgZnJlZXplUmVzdWx0czogY29uZmlnLmZyZWV6ZVJlc3VsdHMsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY2FjaGUgPSBfdGhpcztcbiAgICAgICAgdmFyIG1heWJlQnJvYWRjYXN0V2F0Y2ggPSBjYWNoZS5tYXliZUJyb2FkY2FzdFdhdGNoO1xuICAgICAgICBfdGhpcy5tYXliZUJyb2FkY2FzdFdhdGNoID0gd3JhcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgcmV0dXJuIG1heWJlQnJvYWRjYXN0V2F0Y2guY2FsbChfdGhpcywgYyk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ha2VDYWNoZUtleTogZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5vcHRpbWlzdGljKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGMucHJldmlvdXNSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2FjaGUuZGF0YSBpbnN0YW5jZW9mIERlcFRyYWNraW5nQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmNhY2hlS2V5Um9vdC5sb29rdXAoYy5xdWVyeSwgSlNPTi5zdHJpbmdpZnkoYy52YXJpYWJsZXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSlcbiAgICAgICAgICAgIHRoaXMuZGF0YS5yZXBsYWNlKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLmV4dHJhY3QgPSBmdW5jdGlvbiAob3B0aW1pc3RpYykge1xuICAgICAgICBpZiAob3B0aW1pc3RpYyA9PT0gdm9pZCAwKSB7IG9wdGltaXN0aWMgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gKG9wdGltaXN0aWMgPyB0aGlzLm9wdGltaXN0aWNEYXRhIDogdGhpcy5kYXRhKS50b09iamVjdCgpO1xuICAgIH07XG4gICAgSW5NZW1vcnlDYWNoZS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yb290SWQgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5kYXRhLmdldChvcHRpb25zLnJvb3RJZCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZnJhZ21lbnRNYXRjaGVyID0gdGhpcy5jb25maWcuZnJhZ21lbnRNYXRjaGVyO1xuICAgICAgICB2YXIgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24gPSBmcmFnbWVudE1hdGNoZXIgJiYgZnJhZ21lbnRNYXRjaGVyLm1hdGNoO1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVJlYWRlci5yZWFkUXVlcnlGcm9tU3RvcmUoe1xuICAgICAgICAgICAgc3RvcmU6IG9wdGlvbnMub3B0aW1pc3RpYyA/IHRoaXMub3B0aW1pc3RpY0RhdGEgOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBxdWVyeTogdGhpcy50cmFuc2Zvcm1Eb2N1bWVudChvcHRpb25zLnF1ZXJ5KSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogb3B0aW9ucy52YXJpYWJsZXMsXG4gICAgICAgICAgICByb290SWQ6IG9wdGlvbnMucm9vdElkLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICAgICAgcHJldmlvdXNSZXN1bHQ6IG9wdGlvbnMucHJldmlvdXNSZXN1bHQsXG4gICAgICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICB9KSB8fCBudWxsO1xuICAgIH07XG4gICAgSW5NZW1vcnlDYWNoZS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAod3JpdGUpIHtcbiAgICAgICAgdmFyIGZyYWdtZW50TWF0Y2hlciA9IHRoaXMuY29uZmlnLmZyYWdtZW50TWF0Y2hlcjtcbiAgICAgICAgdmFyIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uID0gZnJhZ21lbnRNYXRjaGVyICYmIGZyYWdtZW50TWF0Y2hlci5tYXRjaDtcbiAgICAgICAgdGhpcy5zdG9yZVdyaXRlci53cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgZGF0YUlkOiB3cml0ZS5kYXRhSWQsXG4gICAgICAgICAgICByZXN1bHQ6IHdyaXRlLnJlc3VsdCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogd3JpdGUudmFyaWFibGVzLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHRoaXMudHJhbnNmb3JtRG9jdW1lbnQod3JpdGUucXVlcnkpLFxuICAgICAgICAgICAgc3RvcmU6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IHRoaXMuY29uZmlnLmRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJyb2FkY2FzdFdhdGNoZXMoKTtcbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgdmFyIGZyYWdtZW50TWF0Y2hlciA9IHRoaXMuY29uZmlnLmZyYWdtZW50TWF0Y2hlcjtcbiAgICAgICAgdmFyIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uID0gZnJhZ21lbnRNYXRjaGVyICYmIGZyYWdtZW50TWF0Y2hlci5tYXRjaDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVSZWFkZXIuZGlmZlF1ZXJ5QWdhaW5zdFN0b3JlKHtcbiAgICAgICAgICAgIHN0b3JlOiBxdWVyeS5vcHRpbWlzdGljID8gdGhpcy5vcHRpbWlzdGljRGF0YSA6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnRyYW5zZm9ybURvY3VtZW50KHF1ZXJ5LnF1ZXJ5KSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgcmV0dXJuUGFydGlhbERhdGE6IHF1ZXJ5LnJldHVyblBhcnRpYWxEYXRhLFxuICAgICAgICAgICAgcHJldmlvdXNSZXN1bHQ6IHF1ZXJ5LnByZXZpb3VzUmVzdWx0LFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbk1lbW9yeUNhY2hlLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uICh3YXRjaCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLndhdGNoZXMuYWRkKHdhdGNoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLndhdGNoZXMuZGVsZXRlKHdhdGNoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLmV2aWN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHRocm93IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IG5ldyBJbnZhcmlhbnRFcnJvcig3KSA6IG5ldyBJbnZhcmlhbnRFcnJvcihcImV2aWN0aW9uIGlzIG5vdCBpbXBsZW1lbnRlZCBvbiBJbk1lbW9yeSBDYWNoZVwiKTtcbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRhdGEuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXYXRjaGVzKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLnJlbW92ZU9wdGltaXN0aWMgPSBmdW5jdGlvbiAoaWRUb1JlbW92ZSkge1xuICAgICAgICB2YXIgdG9SZWFwcGx5ID0gW107XG4gICAgICAgIHZhciByZW1vdmVkQ291bnQgPSAwO1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLm9wdGltaXN0aWNEYXRhO1xuICAgICAgICB3aGlsZSAobGF5ZXIgaW5zdGFuY2VvZiBPcHRpbWlzdGljQ2FjaGVMYXllcikge1xuICAgICAgICAgICAgaWYgKGxheWVyLm9wdGltaXN0aWNJZCA9PT0gaWRUb1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICsrcmVtb3ZlZENvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9SZWFwcGx5LnB1c2gobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF5ZXIgPSBsYXllci5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbW92ZWRDb3VudCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW1pc3RpY0RhdGEgPSBsYXllcjtcbiAgICAgICAgICAgIHdoaWxlICh0b1JlYXBwbHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBsYXllcl8xID0gdG9SZWFwcGx5LnBvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybVRyYW5zYWN0aW9uKGxheWVyXzEudHJhbnNhY3Rpb24sIGxheWVyXzEub3B0aW1pc3RpY0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0V2F0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJbk1lbW9yeUNhY2hlLnByb3RvdHlwZS5wZXJmb3JtVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIG9wdGltaXN0aWNJZCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBkYXRhID0gX2EuZGF0YSwgc2lsZW5jZUJyb2FkY2FzdCA9IF9hLnNpbGVuY2VCcm9hZGNhc3Q7XG4gICAgICAgIHRoaXMuc2lsZW5jZUJyb2FkY2FzdCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW1pc3RpY0lkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5vcHRpbWlzdGljRGF0YSA9IG5ldyBPcHRpbWlzdGljQ2FjaGVMYXllcihvcHRpbWlzdGljSWQsIHRoaXMub3B0aW1pc3RpY0RhdGEsIHRyYW5zYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnNpbGVuY2VCcm9hZGNhc3QgPSBzaWxlbmNlQnJvYWRjYXN0O1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdhdGNoZXMoKTtcbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLnJlY29yZE9wdGltaXN0aWNUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uLCBpZCk7XG4gICAgfTtcbiAgICBJbk1lbW9yeUNhY2hlLnByb3RvdHlwZS50cmFuc2Zvcm1Eb2N1bWVudCA9IGZ1bmN0aW9uIChkb2N1bWVudCkge1xuICAgICAgICBpZiAodGhpcy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMudHlwZW5hbWVEb2N1bWVudENhY2hlLmdldChkb2N1bWVudCk7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChkb2N1bWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlbmFtZURvY3VtZW50Q2FjaGUuc2V0KGRvY3VtZW50LCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZW5hbWVEb2N1bWVudENhY2hlLnNldChyZXN1bHQsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLmJyb2FkY2FzdFdhdGNoZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5zaWxlbmNlQnJvYWRjYXN0KSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoZXMuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gX3RoaXMubWF5YmVCcm9hZGNhc3RXYXRjaChjKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEluTWVtb3J5Q2FjaGUucHJvdG90eXBlLm1heWJlQnJvYWRjYXN0V2F0Y2ggPSBmdW5jdGlvbiAoYykge1xuICAgICAgICBjLmNhbGxiYWNrKHRoaXMuZGlmZih7XG4gICAgICAgICAgICBxdWVyeTogYy5xdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogYy52YXJpYWJsZXMsXG4gICAgICAgICAgICBwcmV2aW91c1Jlc3VsdDogYy5wcmV2aW91c1Jlc3VsdCAmJiBjLnByZXZpb3VzUmVzdWx0KCksXG4gICAgICAgICAgICBvcHRpbWlzdGljOiBjLm9wdGltaXN0aWMsXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHJldHVybiBJbk1lbW9yeUNhY2hlO1xufShBcG9sbG9DYWNoZSkpO1xuXG5leHBvcnQgeyBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIsIEluTWVtb3J5Q2FjaGUsIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIsIE9iamVjdENhY2hlLCBTdG9yZVJlYWRlciwgU3RvcmVXcml0ZXIsIFdyaXRlRXJyb3IsIGFzc2VydElkVmFsdWUsIGRlZmF1bHREYXRhSWRGcm9tT2JqZWN0LCBkZWZhdWx0Tm9ybWFsaXplZENhY2hlRmFjdG9yeSQxIGFzIGRlZmF1bHROb3JtYWxpemVkQ2FjaGVGYWN0b3J5LCBlbmhhbmNlRXJyb3JXaXRoRG9jdW1lbnQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1bmRsZS5lc20uanMubWFwXG4iLCJpbXBvcnQgeyBnZXRGcmFnbWVudFF1ZXJ5RG9jdW1lbnQgfSBmcm9tICdhcG9sbG8tdXRpbGl0aWVzJztcblxuZnVuY3Rpb24gcXVlcnlGcm9tUG9qbyhvYmopIHtcbiAgICB2YXIgb3AgPSB7XG4gICAgICAgIGtpbmQ6ICdPcGVyYXRpb25EZWZpbml0aW9uJyxcbiAgICAgICAgb3BlcmF0aW9uOiAncXVlcnknLFxuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBraW5kOiAnTmFtZScsXG4gICAgICAgICAgICB2YWx1ZTogJ0dlbmVyYXRlZENsaWVudFF1ZXJ5JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0aW9uU2V0OiBzZWxlY3Rpb25TZXRGcm9tT2JqKG9iaiksXG4gICAgfTtcbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICBraW5kOiAnRG9jdW1lbnQnLFxuICAgICAgICBkZWZpbml0aW9uczogW29wXSxcbiAgICB9O1xuICAgIHJldHVybiBvdXQ7XG59XG5mdW5jdGlvbiBmcmFnbWVudEZyb21Qb2pvKG9iaiwgdHlwZW5hbWUpIHtcbiAgICB2YXIgZnJhZyA9IHtcbiAgICAgICAga2luZDogJ0ZyYWdtZW50RGVmaW5pdGlvbicsXG4gICAgICAgIHR5cGVDb25kaXRpb246IHtcbiAgICAgICAgICAgIGtpbmQ6ICdOYW1lZFR5cGUnLFxuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIGtpbmQ6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHlwZW5hbWUgfHwgJ19fRmFrZVR5cGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAga2luZDogJ05hbWUnLFxuICAgICAgICAgICAgdmFsdWU6ICdHZW5lcmF0ZWRDbGllbnRRdWVyeScsXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGlvblNldDogc2VsZWN0aW9uU2V0RnJvbU9iaihvYmopLFxuICAgIH07XG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAga2luZDogJ0RvY3VtZW50JyxcbiAgICAgICAgZGVmaW5pdGlvbnM6IFtmcmFnXSxcbiAgICB9O1xuICAgIHJldHVybiBvdXQ7XG59XG5mdW5jdGlvbiBzZWxlY3Rpb25TZXRGcm9tT2JqKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25TZXRGcm9tT2JqKG9ialswXSk7XG4gICAgfVxuICAgIHZhciBzZWxlY3Rpb25zID0gW107XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG5lc3RlZFNlbFNldCA9IHNlbGVjdGlvblNldEZyb21PYmoob2JqW2tleV0pO1xuICAgICAgICB2YXIgZmllbGQgPSB7XG4gICAgICAgICAgICBraW5kOiAnRmllbGQnLFxuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIGtpbmQ6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZToga2V5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdGlvblNldDogbmVzdGVkU2VsU2V0IHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZWN0aW9ucy5wdXNoKGZpZWxkKTtcbiAgICB9KTtcbiAgICB2YXIgc2VsZWN0aW9uU2V0ID0ge1xuICAgICAgICBraW5kOiAnU2VsZWN0aW9uU2V0JyxcbiAgICAgICAgc2VsZWN0aW9uczogc2VsZWN0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBzZWxlY3Rpb25TZXQ7XG59XG52YXIganVzdFR5cGVuYW1lUXVlcnkgPSB7XG4gICAga2luZDogJ0RvY3VtZW50JyxcbiAgICBkZWZpbml0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBraW5kOiAnT3BlcmF0aW9uRGVmaW5pdGlvbicsXG4gICAgICAgICAgICBvcGVyYXRpb246ICdxdWVyeScsXG4gICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgdmFyaWFibGVEZWZpbml0aW9uczogbnVsbCxcbiAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiB7XG4gICAgICAgICAgICAgICAga2luZDogJ1NlbGVjdGlvblNldCcsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBraW5kOiAnRmllbGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpYXM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZDogJ05hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnX190eXBlbmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIF0sXG59O1xuXG52YXIgQXBvbGxvQ2FjaGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwb2xsb0NhY2hlKCkge1xuICAgIH1cbiAgICBBcG9sbG9DYWNoZS5wcm90b3R5cGUudHJhbnNmb3JtRG9jdW1lbnQgPSBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH07XG4gICAgQXBvbGxvQ2FjaGUucHJvdG90eXBlLnRyYW5zZm9ybUZvckxpbmsgPSBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH07XG4gICAgQXBvbGxvQ2FjaGUucHJvdG90eXBlLnJlYWRRdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zLCBvcHRpbWlzdGljKSB7XG4gICAgICAgIGlmIChvcHRpbWlzdGljID09PSB2b2lkIDApIHsgb3B0aW1pc3RpYyA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQoe1xuICAgICAgICAgICAgcXVlcnk6IG9wdGlvbnMucXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG9wdGlvbnMudmFyaWFibGVzLFxuICAgICAgICAgICAgb3B0aW1pc3RpYzogb3B0aW1pc3RpYyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBcG9sbG9DYWNoZS5wcm90b3R5cGUucmVhZEZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMsIG9wdGltaXN0aWMpIHtcbiAgICAgICAgaWYgKG9wdGltaXN0aWMgPT09IHZvaWQgMCkgeyBvcHRpbWlzdGljID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZCh7XG4gICAgICAgICAgICBxdWVyeTogZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KG9wdGlvbnMuZnJhZ21lbnQsIG9wdGlvbnMuZnJhZ21lbnROYW1lKSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogb3B0aW9ucy52YXJpYWJsZXMsXG4gICAgICAgICAgICByb290SWQ6IG9wdGlvbnMuaWQsXG4gICAgICAgICAgICBvcHRpbWlzdGljOiBvcHRpbWlzdGljLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwb2xsb0NhY2hlLnByb3RvdHlwZS53cml0ZVF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy53cml0ZSh7XG4gICAgICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgIHJlc3VsdDogb3B0aW9ucy5kYXRhLFxuICAgICAgICAgICAgcXVlcnk6IG9wdGlvbnMucXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG9wdGlvbnMudmFyaWFibGVzLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwb2xsb0NhY2hlLnByb3RvdHlwZS53cml0ZUZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy53cml0ZSh7XG4gICAgICAgICAgICBkYXRhSWQ6IG9wdGlvbnMuaWQsXG4gICAgICAgICAgICByZXN1bHQ6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogb3B0aW9ucy52YXJpYWJsZXMsXG4gICAgICAgICAgICBxdWVyeTogZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KG9wdGlvbnMuZnJhZ21lbnQsIG9wdGlvbnMuZnJhZ21lbnROYW1lKSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBcG9sbG9DYWNoZS5wcm90b3R5cGUud3JpdGVEYXRhID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBpZCA9IF9hLmlkLCBkYXRhID0gX2EuZGF0YTtcbiAgICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciB0eXBlbmFtZVJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHR5cGVuYW1lUmVzdWx0ID0gdGhpcy5yZWFkKHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdElkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW1pc3RpYzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBqdXN0VHlwZW5hbWVRdWVyeSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX190eXBlbmFtZSA9ICh0eXBlbmFtZVJlc3VsdCAmJiB0eXBlbmFtZVJlc3VsdC5fX3R5cGVuYW1lKSB8fCAnX19DbGllbnREYXRhJztcbiAgICAgICAgICAgIHZhciBkYXRhVG9Xcml0ZSA9IE9iamVjdC5hc3NpZ24oeyBfX3R5cGVuYW1lOiBfX3R5cGVuYW1lIH0sIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy53cml0ZUZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IGZyYWdtZW50RnJvbVBvam8oZGF0YVRvV3JpdGUsIF9fdHlwZW5hbWUpLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFUb1dyaXRlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlUXVlcnkoeyBxdWVyeTogcXVlcnlGcm9tUG9qbyhkYXRhKSwgZGF0YTogZGF0YSB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFwb2xsb0NhY2hlO1xufSgpKTtcblxudmFyIENhY2hlO1xuKGZ1bmN0aW9uIChDYWNoZSkge1xufSkoQ2FjaGUgfHwgKENhY2hlID0ge30pKTtcblxuZXhwb3J0IHsgQXBvbGxvQ2FjaGUsIENhY2hlIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idW5kbGUuZXNtLmpzLm1hcFxuIiwiaW1wb3J0IHsgX19leHRlbmRzLCBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gJ3RzbGliJztcbmltcG9ydCB7IGdldE9wZXJhdGlvbkRlZmluaXRpb24sIGlzRXF1YWwsIHRyeUZ1bmN0aW9uT3JMb2dFcnJvciwgY2xvbmVEZWVwLCBtZXJnZURlZXAsIGhhc0RpcmVjdGl2ZXMsIHJlbW92ZUNsaWVudFNldHNGcm9tRG9jdW1lbnQsIGJ1aWxkUXVlcnlGcm9tU2VsZWN0aW9uU2V0LCBnZXRNYWluRGVmaW5pdGlvbiwgZ2V0RnJhZ21lbnREZWZpbml0aW9ucywgY3JlYXRlRnJhZ21lbnRNYXAsIG1lcmdlRGVlcEFycmF5LCByZXN1bHRLZXlOYW1lRnJvbUZpZWxkLCBhcmd1bWVudHNPYmplY3RGcm9tRmllbGQsIHNob3VsZEluY2x1ZGUsIGlzRmllbGQsIGlzSW5saW5lRnJhZ21lbnQsIGNhblVzZVdlYWtNYXAsIGdyYXBoUUxSZXN1bHRIYXNFcnJvciwgcmVtb3ZlQ29ubmVjdGlvbkRpcmVjdGl2ZUZyb21Eb2N1bWVudCwgaGFzQ2xpZW50RXhwb3J0cywgZ2V0RGVmYXVsdFZhbHVlcywgZ2V0T3BlcmF0aW9uTmFtZSB9IGZyb20gJ2Fwb2xsby11dGlsaXRpZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBPYnNlcnZhYmxlJDEsIGV4ZWN1dGUsIEFwb2xsb0xpbmsgfSBmcm9tICdhcG9sbG8tbGluayc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcbmltcG9ydCB7IEludmFyaWFudEVycm9yLCBpbnZhcmlhbnQgfSBmcm9tICd0cy1pbnZhcmlhbnQnO1xuaW1wb3J0IHsgdmlzaXQsIEJSRUFLIH0gZnJvbSAnZ3JhcGhxbC9sYW5ndWFnZS92aXNpdG9yJztcblxudmFyIE5ldHdvcmtTdGF0dXM7XG4oZnVuY3Rpb24gKE5ldHdvcmtTdGF0dXMpIHtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJsb2FkaW5nXCJdID0gMV0gPSBcImxvYWRpbmdcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJzZXRWYXJpYWJsZXNcIl0gPSAyXSA9IFwic2V0VmFyaWFibGVzXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wiZmV0Y2hNb3JlXCJdID0gM10gPSBcImZldGNoTW9yZVwiO1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcInJlZmV0Y2hcIl0gPSA0XSA9IFwicmVmZXRjaFwiO1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcInBvbGxcIl0gPSA2XSA9IFwicG9sbFwiO1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcInJlYWR5XCJdID0gN10gPSBcInJlYWR5XCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wiZXJyb3JcIl0gPSA4XSA9IFwiZXJyb3JcIjtcbn0pKE5ldHdvcmtTdGF0dXMgfHwgKE5ldHdvcmtTdGF0dXMgPSB7fSkpO1xuZnVuY3Rpb24gaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KG5ldHdvcmtTdGF0dXMpIHtcbiAgICByZXR1cm4gbmV0d29ya1N0YXR1cyA8IDc7XG59XG5cbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIE9ic2VydmFibGUucHJvdG90eXBlWyQkb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbJ0BAb2JzZXJ2YWJsZSddID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufShPYnNlcnZhYmxlJDEpKTtcblxuZnVuY3Rpb24gaXNOb25FbXB0eUFycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDA7XG59XG5cbmZ1bmN0aW9uIGlzQXBvbGxvRXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIGVyci5oYXNPd25Qcm9wZXJ0eSgnZ3JhcGhRTEVycm9ycycpO1xufVxudmFyIGdlbmVyYXRlRXJyb3JNZXNzYWdlID0gZnVuY3Rpb24gKGVycikge1xuICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgaWYgKGlzTm9uRW1wdHlBcnJheShlcnIuZ3JhcGhRTEVycm9ycykpIHtcbiAgICAgICAgZXJyLmdyYXBoUUxFcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoZ3JhcGhRTEVycm9yKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ3JhcGhRTEVycm9yXG4gICAgICAgICAgICAgICAgPyBncmFwaFFMRXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgIDogJ0Vycm9yIG1lc3NhZ2Ugbm90IGZvdW5kLic7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiR3JhcGhRTCBlcnJvcjogXCIgKyBlcnJvck1lc3NhZ2UgKyBcIlxcblwiO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGVyci5uZXR3b3JrRXJyb3IpIHtcbiAgICAgICAgbWVzc2FnZSArPSAnTmV0d29yayBlcnJvcjogJyArIGVyci5uZXR3b3JrRXJyb3IubWVzc2FnZSArICdcXG4nO1xuICAgIH1cbiAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKC9cXG4kLywgJycpO1xuICAgIHJldHVybiBtZXNzYWdlO1xufTtcbnZhciBBcG9sbG9FcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFwb2xsb0Vycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFwb2xsb0Vycm9yKF9hKSB7XG4gICAgICAgIHZhciBncmFwaFFMRXJyb3JzID0gX2EuZ3JhcGhRTEVycm9ycywgbmV0d29ya0Vycm9yID0gX2EubmV0d29ya0Vycm9yLCBlcnJvck1lc3NhZ2UgPSBfYS5lcnJvck1lc3NhZ2UsIGV4dHJhSW5mbyA9IF9hLmV4dHJhSW5mbztcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZXJyb3JNZXNzYWdlKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5ncmFwaFFMRXJyb3JzID0gZ3JhcGhRTEVycm9ycyB8fCBbXTtcbiAgICAgICAgX3RoaXMubmV0d29ya0Vycm9yID0gbmV0d29ya0Vycm9yIHx8IG51bGw7XG4gICAgICAgIGlmICghZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICBfdGhpcy5tZXNzYWdlID0gZ2VuZXJhdGVFcnJvck1lc3NhZ2UoX3RoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMubWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5leHRyYUluZm8gPSBleHRyYUluZm87XG4gICAgICAgIF90aGlzLl9fcHJvdG9fXyA9IEFwb2xsb0Vycm9yLnByb3RvdHlwZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQXBvbGxvRXJyb3I7XG59KEVycm9yKSk7XG5cbnZhciBGZXRjaFR5cGU7XG4oZnVuY3Rpb24gKEZldGNoVHlwZSkge1xuICAgIEZldGNoVHlwZVtGZXRjaFR5cGVbXCJub3JtYWxcIl0gPSAxXSA9IFwibm9ybWFsXCI7XG4gICAgRmV0Y2hUeXBlW0ZldGNoVHlwZVtcInJlZmV0Y2hcIl0gPSAyXSA9IFwicmVmZXRjaFwiO1xuICAgIEZldGNoVHlwZVtGZXRjaFR5cGVbXCJwb2xsXCJdID0gM10gPSBcInBvbGxcIjtcbn0pKEZldGNoVHlwZSB8fCAoRmV0Y2hUeXBlID0ge30pKTtcblxudmFyIGhhc0Vycm9yID0gZnVuY3Rpb24gKHN0b3JlVmFsdWUsIHBvbGljeSkge1xuICAgIGlmIChwb2xpY3kgPT09IHZvaWQgMCkgeyBwb2xpY3kgPSAnbm9uZSc7IH1cbiAgICByZXR1cm4gc3RvcmVWYWx1ZSAmJiAoc3RvcmVWYWx1ZS5uZXR3b3JrRXJyb3IgfHxcbiAgICAgICAgKHBvbGljeSA9PT0gJ25vbmUnICYmIGlzTm9uRW1wdHlBcnJheShzdG9yZVZhbHVlLmdyYXBoUUxFcnJvcnMpKSk7XG59O1xudmFyIE9ic2VydmFibGVRdWVyeSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE9ic2VydmFibGVRdWVyeSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlUXVlcnkoX2EpIHtcbiAgICAgICAgdmFyIHF1ZXJ5TWFuYWdlciA9IF9hLnF1ZXJ5TWFuYWdlciwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIF9iID0gX2Euc2hvdWxkU3Vic2NyaWJlLCBzaG91bGRTdWJzY3JpYmUgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5vblN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgICAgIH0pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm9ic2VydmVycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgX3RoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBTZXQoKTtcbiAgICAgICAgX3RoaXMuaXNUb3JuRG93biA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgX3RoaXMudmFyaWFibGVzID0gb3B0aW9ucy52YXJpYWJsZXMgfHwge307XG4gICAgICAgIF90aGlzLnF1ZXJ5SWQgPSBxdWVyeU1hbmFnZXIuZ2VuZXJhdGVRdWVyeUlkKCk7XG4gICAgICAgIF90aGlzLnNob3VsZFN1YnNjcmliZSA9IHNob3VsZFN1YnNjcmliZTtcbiAgICAgICAgdmFyIG9wRGVmID0gZ2V0T3BlcmF0aW9uRGVmaW5pdGlvbihvcHRpb25zLnF1ZXJ5KTtcbiAgICAgICAgX3RoaXMucXVlcnlOYW1lID0gb3BEZWYgJiYgb3BEZWYubmFtZSAmJiBvcERlZi5uYW1lLnZhbHVlO1xuICAgICAgICBfdGhpcy5xdWVyeU1hbmFnZXIgPSBxdWVyeU1hbmFnZXI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5yZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9ic2VydmVycy5kZWxldGUob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm9ic2VydmVycy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5xdWVyeU1hbmFnZXIucmVtb3ZlUXVlcnkoX3RoaXMucXVlcnlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBfdGhpcy5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuY3VycmVudFJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZ2V0Q3VycmVudFJlc3VsdCgpO1xuICAgICAgICBpZiAocmVzdWx0LmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5nZXRDdXJyZW50UmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Rvcm5Eb3duKSB7XG4gICAgICAgICAgICB2YXIgbGFzdFJlc3VsdCA9IHRoaXMubGFzdFJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGF0YTogIXRoaXMubGFzdEVycm9yICYmIGxhc3RSZXN1bHQgJiYgbGFzdFJlc3VsdC5kYXRhIHx8IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBlcnJvcjogdGhpcy5sYXN0RXJyb3IsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmV0d29ya1N0YXR1czogTmV0d29ya1N0YXR1cy5lcnJvcixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0Q3VycmVudFF1ZXJ5UmVzdWx0KHRoaXMpLCBkYXRhID0gX2EuZGF0YSwgcGFydGlhbCA9IF9hLnBhcnRpYWw7XG4gICAgICAgIHZhciBxdWVyeVN0b3JlVmFsdWUgPSB0aGlzLnF1ZXJ5TWFuYWdlci5xdWVyeVN0b3JlLmdldCh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB2YXIgZmV0Y2hQb2xpY3kgPSB0aGlzLm9wdGlvbnMuZmV0Y2hQb2xpY3k7XG4gICAgICAgIHZhciBpc05ldHdvcmtGZXRjaFBvbGljeSA9IGZldGNoUG9saWN5ID09PSAnbmV0d29yay1vbmx5JyB8fFxuICAgICAgICAgICAgZmV0Y2hQb2xpY3kgPT09ICduby1jYWNoZSc7XG4gICAgICAgIGlmIChxdWVyeVN0b3JlVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBuZXR3b3JrU3RhdHVzID0gcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXM7XG4gICAgICAgICAgICBpZiAoaGFzRXJyb3IocXVlcnlTdG9yZVZhbHVlLCB0aGlzLm9wdGlvbnMuZXJyb3JQb2xpY3kpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya1N0YXR1czogbmV0d29ya1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG5ldyBBcG9sbG9FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaFFMRXJyb3JzOiBxdWVyeVN0b3JlVmFsdWUuZ3JhcGhRTEVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtFcnJvcjogcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChxdWVyeVN0b3JlVmFsdWUudmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnZhcmlhYmxlcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMudmFyaWFibGVzKSwgcXVlcnlTdG9yZVZhbHVlLnZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLm9wdGlvbnMudmFyaWFibGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KG5ldHdvcmtTdGF0dXMpLFxuICAgICAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IG5ldHdvcmtTdGF0dXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzICYmIHRoaXMub3B0aW9ucy5lcnJvclBvbGljeSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZXJyb3JzID0gcXVlcnlTdG9yZVZhbHVlLmdyYXBoUUxFcnJvcnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbG9hZGluZyA9IGlzTmV0d29ya0ZldGNoUG9saWN5IHx8XG4gICAgICAgICAgICAgICAgKHBhcnRpYWwgJiYgZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5Jyk7XG4gICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBsb2FkaW5nLFxuICAgICAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IGxvYWRpbmcgPyBOZXR3b3JrU3RhdHVzLmxvYWRpbmcgOiBOZXR3b3JrU3RhdHVzLnJlYWR5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBhcnRpYWwpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGFzdFJlc3VsdChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdWx0KSwgeyBzdGFsZTogZmFsc2UgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdWx0KSwgeyBwYXJ0aWFsOiBwYXJ0aWFsIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5pc0RpZmZlcmVudEZyb21MYXN0UmVzdWx0ID0gZnVuY3Rpb24gKG5ld1Jlc3VsdCkge1xuICAgICAgICB2YXIgc25hcHNob3QgPSB0aGlzLmxhc3RSZXN1bHRTbmFwc2hvdDtcbiAgICAgICAgcmV0dXJuICEoc25hcHNob3QgJiZcbiAgICAgICAgICAgIG5ld1Jlc3VsdCAmJlxuICAgICAgICAgICAgc25hcHNob3QubmV0d29ya1N0YXR1cyA9PT0gbmV3UmVzdWx0Lm5ldHdvcmtTdGF0dXMgJiZcbiAgICAgICAgICAgIHNuYXBzaG90LnN0YWxlID09PSBuZXdSZXN1bHQuc3RhbGUgJiZcbiAgICAgICAgICAgIGlzRXF1YWwoc25hcHNob3QuZGF0YSwgbmV3UmVzdWx0LmRhdGEpKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuZ2V0TGFzdFJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdFJlc3VsdDtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuZ2V0TGFzdEVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0RXJyb3I7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnJlc2V0TGFzdFJlc3VsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmxhc3RSZXN1bHQ7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmxhc3RSZXN1bHRTbmFwc2hvdDtcbiAgICAgICAgZGVsZXRlIHRoaXMubGFzdEVycm9yO1xuICAgICAgICB0aGlzLmlzVG9ybkRvd24gPSBmYWxzZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUucmVzZXRRdWVyeVN0b3JlRXJyb3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcXVlcnlTdG9yZSA9IHRoaXMucXVlcnlNYW5hZ2VyLnF1ZXJ5U3RvcmUuZ2V0KHRoaXMucXVlcnlJZCk7XG4gICAgICAgIGlmIChxdWVyeVN0b3JlKSB7XG4gICAgICAgICAgICBxdWVyeVN0b3JlLm5ldHdvcmtFcnJvciA9IG51bGw7XG4gICAgICAgICAgICBxdWVyeVN0b3JlLmdyYXBoUUxFcnJvcnMgPSBbXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5yZWZldGNoID0gZnVuY3Rpb24gKHZhcmlhYmxlcykge1xuICAgICAgICB2YXIgZmV0Y2hQb2xpY3kgPSB0aGlzLm9wdGlvbnMuZmV0Y2hQb2xpY3k7XG4gICAgICAgIGlmIChmZXRjaFBvbGljeSA9PT0gJ2NhY2hlLW9ubHknKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gbmV3IEludmFyaWFudEVycm9yKDEpIDogbmV3IEludmFyaWFudEVycm9yKCdjYWNoZS1vbmx5IGZldGNoUG9saWN5IG9wdGlvbiBzaG91bGQgbm90IGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBxdWVyeSByZWZldGNoLicpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmV0Y2hQb2xpY3kgIT09ICduby1jYWNoZScgJiZcbiAgICAgICAgICAgIGZldGNoUG9saWN5ICE9PSAnY2FjaGUtYW5kLW5ldHdvcmsnKSB7XG4gICAgICAgICAgICBmZXRjaFBvbGljeSA9ICduZXR3b3JrLW9ubHknO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFcXVhbCh0aGlzLnZhcmlhYmxlcywgdmFyaWFibGVzKSkge1xuICAgICAgICAgICAgdGhpcy52YXJpYWJsZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy52YXJpYWJsZXMpLCB2YXJpYWJsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFcXVhbCh0aGlzLm9wdGlvbnMudmFyaWFibGVzLCB0aGlzLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy52YXJpYWJsZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5vcHRpb25zLnZhcmlhYmxlcyksIHRoaXMudmFyaWFibGVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIuZmV0Y2hRdWVyeSh0aGlzLnF1ZXJ5SWQsIF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMpLCB7IGZldGNoUG9saWN5OiBmZXRjaFBvbGljeSB9KSwgRmV0Y2hUeXBlLnJlZmV0Y2gpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5mZXRjaE1vcmUgPSBmdW5jdGlvbiAoZmV0Y2hNb3JlT3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmV0Y2hNb3JlT3B0aW9ucy51cGRhdGVRdWVyeSwgMikgOiBpbnZhcmlhbnQoZmV0Y2hNb3JlT3B0aW9ucy51cGRhdGVRdWVyeSwgJ3VwZGF0ZVF1ZXJ5IG9wdGlvbiBpcyByZXF1aXJlZC4gVGhpcyBmdW5jdGlvbiBkZWZpbmVzIGhvdyB0byB1cGRhdGUgdGhlIHF1ZXJ5IGRhdGEgd2l0aCB0aGUgbmV3IHJlc3VsdHMuJyk7XG4gICAgICAgIHZhciBjb21iaW5lZE9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgKGZldGNoTW9yZU9wdGlvbnMucXVlcnkgPyBmZXRjaE1vcmVPcHRpb25zIDogX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMub3B0aW9ucyksIGZldGNoTW9yZU9wdGlvbnMpLCB7IHZhcmlhYmxlczogX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMudmFyaWFibGVzKSwgZmV0Y2hNb3JlT3B0aW9ucy52YXJpYWJsZXMpIH0pKSksIHsgZmV0Y2hQb2xpY3k6ICduZXR3b3JrLW9ubHknIH0pO1xuICAgICAgICB2YXIgcWlkID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2VuZXJhdGVRdWVyeUlkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlclxuICAgICAgICAgICAgLmZldGNoUXVlcnkocWlkLCBjb21iaW5lZE9wdGlvbnMsIEZldGNoVHlwZS5ub3JtYWwsIHRoaXMucXVlcnlJZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChmZXRjaE1vcmVSZXN1bHQpIHtcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZVF1ZXJ5KGZ1bmN0aW9uIChwcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaE1vcmVPcHRpb25zLnVwZGF0ZVF1ZXJ5KHByZXZpb3VzUmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoTW9yZVJlc3VsdDogZmV0Y2hNb3JlUmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogY29tYmluZWRPcHRpb25zLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMucXVlcnlNYW5hZ2VyLnN0b3BRdWVyeShxaWQpO1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoTW9yZVJlc3VsdDtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBfdGhpcy5xdWVyeU1hbmFnZXIuc3RvcFF1ZXJ5KHFpZCk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnN1YnNjcmliZVRvTW9yZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLnF1ZXJ5TWFuYWdlclxuICAgICAgICAgICAgLnN0YXJ0R3JhcGhRTFN1YnNjcmlwdGlvbih7XG4gICAgICAgICAgICBxdWVyeTogb3B0aW9ucy5kb2N1bWVudCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogb3B0aW9ucy52YXJpYWJsZXMsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChzdWJzY3JpcHRpb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVF1ZXJ5ID0gb3B0aW9ucy51cGRhdGVRdWVyeTtcbiAgICAgICAgICAgICAgICBpZiAodXBkYXRlUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlUXVlcnkoZnVuY3Rpb24gKHByZXZpb3VzLCBfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVRdWVyeShwcmV2aW91cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkRhdGE6IHN1YnNjcmlwdGlvbkRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMub25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgfHwgaW52YXJpYW50LmVycm9yKCdVbmhhbmRsZWQgR3JhcGhRTCBzdWJzY3JpcHRpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5zdWJzY3JpcHRpb25zLmRlbGV0ZShzdWJzY3JpcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICB2YXIgb2xkRmV0Y2hQb2xpY3kgPSB0aGlzLm9wdGlvbnMuZmV0Y2hQb2xpY3k7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMpLCBvcHRzKTtcbiAgICAgICAgaWYgKG9wdHMucG9sbEludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9sbGluZyhvcHRzLnBvbGxJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0cy5wb2xsSW50ZXJ2YWwgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmV0Y2hQb2xpY3kgPSBvcHRzLmZldGNoUG9saWN5O1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRWYXJpYWJsZXModGhpcy5vcHRpb25zLnZhcmlhYmxlcywgb2xkRmV0Y2hQb2xpY3kgIT09IGZldGNoUG9saWN5ICYmIChvbGRGZXRjaFBvbGljeSA9PT0gJ2NhY2hlLW9ubHknIHx8XG4gICAgICAgICAgICBvbGRGZXRjaFBvbGljeSA9PT0gJ3N0YW5kYnknIHx8XG4gICAgICAgICAgICBmZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScpLCBvcHRzLmZldGNoUmVzdWx0cyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnNldFZhcmlhYmxlcyA9IGZ1bmN0aW9uICh2YXJpYWJsZXMsIHRyeUZldGNoLCBmZXRjaFJlc3VsdHMpIHtcbiAgICAgICAgaWYgKHRyeUZldGNoID09PSB2b2lkIDApIHsgdHJ5RmV0Y2ggPSBmYWxzZTsgfVxuICAgICAgICBpZiAoZmV0Y2hSZXN1bHRzID09PSB2b2lkIDApIHsgZmV0Y2hSZXN1bHRzID0gdHJ1ZTsgfVxuICAgICAgICB0aGlzLmlzVG9ybkRvd24gPSBmYWxzZTtcbiAgICAgICAgdmFyaWFibGVzID0gdmFyaWFibGVzIHx8IHRoaXMudmFyaWFibGVzO1xuICAgICAgICBpZiAoIXRyeUZldGNoICYmIGlzRXF1YWwodmFyaWFibGVzLCB0aGlzLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVycy5zaXplICYmIGZldGNoUmVzdWx0c1xuICAgICAgICAgICAgICAgID8gdGhpcy5yZXN1bHQoKVxuICAgICAgICAgICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLm9wdGlvbnMudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgICBpZiAoIXRoaXMub2JzZXJ2ZXJzLnNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIuZmV0Y2hRdWVyeSh0aGlzLnF1ZXJ5SWQsIHRoaXMub3B0aW9ucyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnVwZGF0ZVF1ZXJ5ID0gZnVuY3Rpb24gKG1hcEZuKSB7XG4gICAgICAgIHZhciBxdWVyeU1hbmFnZXIgPSB0aGlzLnF1ZXJ5TWFuYWdlcjtcbiAgICAgICAgdmFyIF9hID0gcXVlcnlNYW5hZ2VyLmdldFF1ZXJ5V2l0aFByZXZpb3VzUmVzdWx0KHRoaXMucXVlcnlJZCksIHByZXZpb3VzUmVzdWx0ID0gX2EucHJldmlvdXNSZXN1bHQsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudDtcbiAgICAgICAgdmFyIG5ld1Jlc3VsdCA9IHRyeUZ1bmN0aW9uT3JMb2dFcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwRm4ocHJldmlvdXNSZXN1bHQsIHsgdmFyaWFibGVzOiB2YXJpYWJsZXMgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobmV3UmVzdWx0KSB7XG4gICAgICAgICAgICBxdWVyeU1hbmFnZXIuZGF0YVN0b3JlLm1hcmtVcGRhdGVRdWVyeVJlc3VsdChkb2N1bWVudCwgdmFyaWFibGVzLCBuZXdSZXN1bHQpO1xuICAgICAgICAgICAgcXVlcnlNYW5hZ2VyLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5zdG9wUG9sbGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLm9wdGlvbnMucG9sbEludGVydmFsID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5zdGFydFBvbGxpbmcgPSBmdW5jdGlvbiAocG9sbEludGVydmFsKSB7XG4gICAgICAgIGFzc2VydE5vdENhY2hlRmlyc3RPck9ubHkodGhpcyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wb2xsSW50ZXJ2YWwgPSBwb2xsSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyLnN0YXJ0UG9sbGluZ1F1ZXJ5KHRoaXMub3B0aW9ucywgdGhpcy5xdWVyeUlkKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUudXBkYXRlTGFzdFJlc3VsdCA9IGZ1bmN0aW9uIChuZXdSZXN1bHQpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzUmVzdWx0ID0gdGhpcy5sYXN0UmVzdWx0O1xuICAgICAgICB0aGlzLmxhc3RSZXN1bHQgPSBuZXdSZXN1bHQ7XG4gICAgICAgIHRoaXMubGFzdFJlc3VsdFNuYXBzaG90ID0gdGhpcy5xdWVyeU1hbmFnZXIuYXNzdW1lSW1tdXRhYmxlUmVzdWx0c1xuICAgICAgICAgICAgPyBuZXdSZXN1bHRcbiAgICAgICAgICAgIDogY2xvbmVEZWVwKG5ld1Jlc3VsdCk7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Jlc3VsdDtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUub25TdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBzdWJPYnNlcnZlciA9IG9ic2VydmVyLl9zdWJzY3JpcHRpb24uX29ic2VydmVyO1xuICAgICAgICAgICAgaWYgKHN1Yk9ic2VydmVyICYmICFzdWJPYnNlcnZlci5lcnJvcikge1xuICAgICAgICAgICAgICAgIHN1Yk9ic2VydmVyLmVycm9yID0gZGVmYXVsdFN1YnNjcmlwdGlvbk9ic2VydmVyRXJyb3JDYWxsYmFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHsgfVxuICAgICAgICB2YXIgZmlyc3QgPSAhdGhpcy5vYnNlcnZlcnMuc2l6ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMuYWRkKG9ic2VydmVyKTtcbiAgICAgICAgaWYgKG9ic2VydmVyLm5leHQgJiYgdGhpcy5sYXN0UmVzdWx0KVxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLmxhc3RSZXN1bHQpO1xuICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IgJiYgdGhpcy5sYXN0RXJyb3IpXG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcih0aGlzLmxhc3RFcnJvcik7XG4gICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRVcFF1ZXJ5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vYnNlcnZlcnMuZGVsZXRlKG9ic2VydmVyKSAmJiAhX3RoaXMub2JzZXJ2ZXJzLnNpemUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50ZWFyRG93blF1ZXJ5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnNldFVwUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIHF1ZXJ5TWFuYWdlciA9IF9hLnF1ZXJ5TWFuYWdlciwgcXVlcnlJZCA9IF9hLnF1ZXJ5SWQ7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZFN1YnNjcmliZSkge1xuICAgICAgICAgICAgcXVlcnlNYW5hZ2VyLmFkZE9ic2VydmFibGVRdWVyeShxdWVyeUlkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgYXNzZXJ0Tm90Q2FjaGVGaXJzdE9yT25seSh0aGlzKTtcbiAgICAgICAgICAgIHF1ZXJ5TWFuYWdlci5zdGFydFBvbGxpbmdRdWVyeSh0aGlzLm9wdGlvbnMsIHF1ZXJ5SWQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvbkVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBfdGhpcy51cGRhdGVMYXN0UmVzdWx0KF9fYXNzaWduKF9fYXNzaWduKHt9LCBfdGhpcy5sYXN0UmVzdWx0KSwgeyBlcnJvcnM6IGVycm9yLmdyYXBoUUxFcnJvcnMsIG5ldHdvcmtTdGF0dXM6IE5ldHdvcmtTdGF0dXMuZXJyb3IsIGxvYWRpbmc6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIGl0ZXJhdGVPYnNlcnZlcnNTYWZlbHkoX3RoaXMub2JzZXJ2ZXJzLCAnZXJyb3InLCBfdGhpcy5sYXN0RXJyb3IgPSBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIHF1ZXJ5TWFuYWdlci5vYnNlcnZlUXVlcnkocXVlcnlJZCwgdGhpcy5vcHRpb25zLCB7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmxhc3RFcnJvciB8fCBfdGhpcy5pc0RpZmZlcmVudEZyb21MYXN0UmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzUmVzdWx0XzEgPSBfdGhpcy51cGRhdGVMYXN0UmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IF90aGlzLm9wdGlvbnMsIHF1ZXJ5XzEgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBmZXRjaFBvbGljeV8xID0gX2EuZmV0Y2hQb2xpY3k7XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeU1hbmFnZXIudHJhbnNmb3JtKHF1ZXJ5XzEpLmhhc0NsaWVudEV4cG9ydHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TWFuYWdlci5nZXRMb2NhbFN0YXRlKCkuYWRkRXhwb3J0ZWRWYXJpYWJsZXMocXVlcnlfMSwgdmFyaWFibGVzKS50aGVuKGZ1bmN0aW9uICh2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNWYXJpYWJsZXMgPSBfdGhpcy52YXJpYWJsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudmFyaWFibGVzID0gX3RoaXMub3B0aW9ucy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQubG9hZGluZyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1Jlc3VsdF8xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoUG9saWN5XzEgIT09ICdjYWNoZS1vbmx5JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU1hbmFnZXIudHJhbnNmb3JtKHF1ZXJ5XzEpLnNlcnZlclF1ZXJ5ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFpc0VxdWFsKHByZXZpb3VzVmFyaWFibGVzLCB2YXJpYWJsZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlZmV0Y2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVPYnNlcnZlcnNTYWZlbHkoX3RoaXMub2JzZXJ2ZXJzLCAnbmV4dCcsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVyYXRlT2JzZXJ2ZXJzU2FmZWx5KF90aGlzLm9ic2VydmVycywgJ25leHQnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBvbkVycm9yLFxuICAgICAgICB9KS5jYXRjaChvbkVycm9yKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUudGVhckRvd25RdWVyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHF1ZXJ5TWFuYWdlciA9IHRoaXMucXVlcnlNYW5hZ2VyO1xuICAgICAgICB0aGlzLmlzVG9ybkRvd24gPSB0cnVlO1xuICAgICAgICBxdWVyeU1hbmFnZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7IHJldHVybiBzdWIudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5jbGVhcigpO1xuICAgICAgICBxdWVyeU1hbmFnZXIucmVtb3ZlT2JzZXJ2YWJsZVF1ZXJ5KHRoaXMucXVlcnlJZCk7XG4gICAgICAgIHF1ZXJ5TWFuYWdlci5zdG9wUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMuY2xlYXIoKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlUXVlcnk7XG59KE9ic2VydmFibGUpKTtcbmZ1bmN0aW9uIGRlZmF1bHRTdWJzY3JpcHRpb25PYnNlcnZlckVycm9yQ2FsbGJhY2soZXJyb3IpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgfHwgaW52YXJpYW50LmVycm9yKCdVbmhhbmRsZWQgZXJyb3InLCBlcnJvci5tZXNzYWdlLCBlcnJvci5zdGFjayk7XG59XG5mdW5jdGlvbiBpdGVyYXRlT2JzZXJ2ZXJzU2FmZWx5KG9ic2VydmVycywgbWV0aG9kLCBhcmd1bWVudCkge1xuICAgIHZhciBvYnNlcnZlcnNXaXRoTWV0aG9kID0gW107XG4gICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykgeyByZXR1cm4gb2JzW21ldGhvZF0gJiYgb2JzZXJ2ZXJzV2l0aE1ldGhvZC5wdXNoKG9icyk7IH0pO1xuICAgIG9ic2VydmVyc1dpdGhNZXRob2QuZm9yRWFjaChmdW5jdGlvbiAob2JzKSB7IHJldHVybiBvYnNbbWV0aG9kXShhcmd1bWVudCk7IH0pO1xufVxuZnVuY3Rpb24gYXNzZXJ0Tm90Q2FjaGVGaXJzdE9yT25seShvYnNRdWVyeSkge1xuICAgIHZhciBmZXRjaFBvbGljeSA9IG9ic1F1ZXJ5Lm9wdGlvbnMuZmV0Y2hQb2xpY3k7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZldGNoUG9saWN5ICE9PSAnY2FjaGUtZmlyc3QnICYmIGZldGNoUG9saWN5ICE9PSAnY2FjaGUtb25seScsIDMpIDogaW52YXJpYW50KGZldGNoUG9saWN5ICE9PSAnY2FjaGUtZmlyc3QnICYmIGZldGNoUG9saWN5ICE9PSAnY2FjaGUtb25seScsICdRdWVyaWVzIHRoYXQgc3BlY2lmeSB0aGUgY2FjaGUtZmlyc3QgYW5kIGNhY2hlLW9ubHkgZmV0Y2hQb2xpY2llcyBjYW5ub3QgYWxzbyBiZSBwb2xsaW5nIHF1ZXJpZXMuJyk7XG59XG5cbnZhciBNdXRhdGlvblN0b3JlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNdXRhdGlvblN0b3JlKCkge1xuICAgICAgICB0aGlzLnN0b3JlID0ge307XG4gICAgfVxuICAgIE11dGF0aW9uU3RvcmUucHJvdG90eXBlLmdldFN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZTtcbiAgICB9O1xuICAgIE11dGF0aW9uU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChtdXRhdGlvbklkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlW211dGF0aW9uSWRdO1xuICAgIH07XG4gICAgTXV0YXRpb25TdG9yZS5wcm90b3R5cGUuaW5pdE11dGF0aW9uID0gZnVuY3Rpb24gKG11dGF0aW9uSWQsIG11dGF0aW9uLCB2YXJpYWJsZXMpIHtcbiAgICAgICAgdGhpcy5zdG9yZVttdXRhdGlvbklkXSA9IHtcbiAgICAgICAgICAgIG11dGF0aW9uOiBtdXRhdGlvbixcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzIHx8IHt9LFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgTXV0YXRpb25TdG9yZS5wcm90b3R5cGUubWFya011dGF0aW9uRXJyb3IgPSBmdW5jdGlvbiAobXV0YXRpb25JZCwgZXJyb3IpIHtcbiAgICAgICAgdmFyIG11dGF0aW9uID0gdGhpcy5zdG9yZVttdXRhdGlvbklkXTtcbiAgICAgICAgaWYgKG11dGF0aW9uKSB7XG4gICAgICAgICAgICBtdXRhdGlvbi5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtdXRhdGlvbi5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNdXRhdGlvblN0b3JlLnByb3RvdHlwZS5tYXJrTXV0YXRpb25SZXN1bHQgPSBmdW5jdGlvbiAobXV0YXRpb25JZCkge1xuICAgICAgICB2YXIgbXV0YXRpb24gPSB0aGlzLnN0b3JlW211dGF0aW9uSWRdO1xuICAgICAgICBpZiAobXV0YXRpb24pIHtcbiAgICAgICAgICAgIG11dGF0aW9uLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG11dGF0aW9uLmVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTXV0YXRpb25TdG9yZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSB7fTtcbiAgICB9O1xuICAgIHJldHVybiBNdXRhdGlvblN0b3JlO1xufSgpKTtcblxudmFyIFF1ZXJ5U3RvcmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFF1ZXJ5U3RvcmUoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSB7fTtcbiAgICB9XG4gICAgUXVlcnlTdG9yZS5wcm90b3R5cGUuZ2V0U3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlO1xuICAgIH07XG4gICAgUXVlcnlTdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVbcXVlcnlJZF07XG4gICAgfTtcbiAgICBRdWVyeVN0b3JlLnByb3RvdHlwZS5pbml0UXVlcnkgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzUXVlcnkgPSB0aGlzLnN0b3JlW3F1ZXJ5LnF1ZXJ5SWRdO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoIXByZXZpb3VzUXVlcnkgfHxcbiAgICAgICAgICAgIHByZXZpb3VzUXVlcnkuZG9jdW1lbnQgPT09IHF1ZXJ5LmRvY3VtZW50IHx8XG4gICAgICAgICAgICBpc0VxdWFsKHByZXZpb3VzUXVlcnkuZG9jdW1lbnQsIHF1ZXJ5LmRvY3VtZW50KSwgMTkpIDogaW52YXJpYW50KCFwcmV2aW91c1F1ZXJ5IHx8XG4gICAgICAgICAgICBwcmV2aW91c1F1ZXJ5LmRvY3VtZW50ID09PSBxdWVyeS5kb2N1bWVudCB8fFxuICAgICAgICAgICAgaXNFcXVhbChwcmV2aW91c1F1ZXJ5LmRvY3VtZW50LCBxdWVyeS5kb2N1bWVudCksICdJbnRlcm5hbCBFcnJvcjogbWF5IG5vdCB1cGRhdGUgZXhpc3RpbmcgcXVlcnkgc3RyaW5nIGluIHN0b3JlJyk7XG4gICAgICAgIHZhciBpc1NldFZhcmlhYmxlcyA9IGZhbHNlO1xuICAgICAgICB2YXIgcHJldmlvdXNWYXJpYWJsZXMgPSBudWxsO1xuICAgICAgICBpZiAocXVlcnkuc3RvcmVQcmV2aW91c1ZhcmlhYmxlcyAmJlxuICAgICAgICAgICAgcHJldmlvdXNRdWVyeSAmJlxuICAgICAgICAgICAgcHJldmlvdXNRdWVyeS5uZXR3b3JrU3RhdHVzICE9PSBOZXR3b3JrU3RhdHVzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIGlmICghaXNFcXVhbChwcmV2aW91c1F1ZXJ5LnZhcmlhYmxlcywgcXVlcnkudmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgIGlzU2V0VmFyaWFibGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhcmlhYmxlcyA9IHByZXZpb3VzUXVlcnkudmFyaWFibGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBuZXR3b3JrU3RhdHVzO1xuICAgICAgICBpZiAoaXNTZXRWYXJpYWJsZXMpIHtcbiAgICAgICAgICAgIG5ldHdvcmtTdGF0dXMgPSBOZXR3b3JrU3RhdHVzLnNldFZhcmlhYmxlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChxdWVyeS5pc1BvbGwpIHtcbiAgICAgICAgICAgIG5ldHdvcmtTdGF0dXMgPSBOZXR3b3JrU3RhdHVzLnBvbGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocXVlcnkuaXNSZWZldGNoKSB7XG4gICAgICAgICAgICBuZXR3b3JrU3RhdHVzID0gTmV0d29ya1N0YXR1cy5yZWZldGNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV0d29ya1N0YXR1cyA9IE5ldHdvcmtTdGF0dXMubG9hZGluZztcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ3JhcGhRTEVycm9ycyA9IFtdO1xuICAgICAgICBpZiAocHJldmlvdXNRdWVyeSAmJiBwcmV2aW91c1F1ZXJ5LmdyYXBoUUxFcnJvcnMpIHtcbiAgICAgICAgICAgIGdyYXBoUUxFcnJvcnMgPSBwcmV2aW91c1F1ZXJ5LmdyYXBoUUxFcnJvcnM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZVtxdWVyeS5xdWVyeUlkXSA9IHtcbiAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeS5kb2N1bWVudCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgcHJldmlvdXNWYXJpYWJsZXM6IHByZXZpb3VzVmFyaWFibGVzLFxuICAgICAgICAgICAgbmV0d29ya0Vycm9yOiBudWxsLFxuICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogZ3JhcGhRTEVycm9ycyxcbiAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IG5ldHdvcmtTdGF0dXMsXG4gICAgICAgICAgICBtZXRhZGF0YTogcXVlcnkubWV0YWRhdGEsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnkuZmV0Y2hNb3JlRm9yUXVlcnlJZCA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgIHRoaXMuc3RvcmVbcXVlcnkuZmV0Y2hNb3JlRm9yUXVlcnlJZF0pIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVbcXVlcnkuZmV0Y2hNb3JlRm9yUXVlcnlJZF0ubmV0d29ya1N0YXR1cyA9XG4gICAgICAgICAgICAgICAgTmV0d29ya1N0YXR1cy5mZXRjaE1vcmU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5U3RvcmUucHJvdG90eXBlLm1hcmtRdWVyeVJlc3VsdCA9IGZ1bmN0aW9uIChxdWVyeUlkLCByZXN1bHQsIGZldGNoTW9yZUZvclF1ZXJ5SWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0b3JlIHx8ICF0aGlzLnN0b3JlW3F1ZXJ5SWRdKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnN0b3JlW3F1ZXJ5SWRdLm5ldHdvcmtFcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RvcmVbcXVlcnlJZF0uZ3JhcGhRTEVycm9ycyA9IGlzTm9uRW1wdHlBcnJheShyZXN1bHQuZXJyb3JzKSA/IHJlc3VsdC5lcnJvcnMgOiBbXTtcbiAgICAgICAgdGhpcy5zdG9yZVtxdWVyeUlkXS5wcmV2aW91c1ZhcmlhYmxlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RvcmVbcXVlcnlJZF0ubmV0d29ya1N0YXR1cyA9IE5ldHdvcmtTdGF0dXMucmVhZHk7XG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2hNb3JlRm9yUXVlcnlJZCA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgIHRoaXMuc3RvcmVbZmV0Y2hNb3JlRm9yUXVlcnlJZF0pIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVbZmV0Y2hNb3JlRm9yUXVlcnlJZF0ubmV0d29ya1N0YXR1cyA9IE5ldHdvcmtTdGF0dXMucmVhZHk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5U3RvcmUucHJvdG90eXBlLm1hcmtRdWVyeUVycm9yID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIGVycm9yLCBmZXRjaE1vcmVGb3JRdWVyeUlkKSB7XG4gICAgICAgIGlmICghdGhpcy5zdG9yZSB8fCAhdGhpcy5zdG9yZVtxdWVyeUlkXSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zdG9yZVtxdWVyeUlkXS5uZXR3b3JrRXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5zdG9yZVtxdWVyeUlkXS5uZXR3b3JrU3RhdHVzID0gTmV0d29ya1N0YXR1cy5lcnJvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBmZXRjaE1vcmVGb3JRdWVyeUlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5tYXJrUXVlcnlSZXN1bHRDbGllbnQoZmV0Y2hNb3JlRm9yUXVlcnlJZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5U3RvcmUucHJvdG90eXBlLm1hcmtRdWVyeVJlc3VsdENsaWVudCA9IGZ1bmN0aW9uIChxdWVyeUlkLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgc3RvcmVWYWx1ZSA9IHRoaXMuc3RvcmUgJiYgdGhpcy5zdG9yZVtxdWVyeUlkXTtcbiAgICAgICAgaWYgKHN0b3JlVmFsdWUpIHtcbiAgICAgICAgICAgIHN0b3JlVmFsdWUubmV0d29ya0Vycm9yID0gbnVsbDtcbiAgICAgICAgICAgIHN0b3JlVmFsdWUucHJldmlvdXNWYXJpYWJsZXMgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzID0gTmV0d29ya1N0YXR1cy5yZWFkeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlTdG9yZS5wcm90b3R5cGUuc3RvcFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RvcmVbcXVlcnlJZF07XG4gICAgfTtcbiAgICBRdWVyeVN0b3JlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlUXVlcnlJZHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdG9yZSkuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgaWYgKG9ic2VydmFibGVRdWVyeUlkcy5pbmRleE9mKHF1ZXJ5SWQpIDwgMCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnN0b3BRdWVyeShxdWVyeUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlW3F1ZXJ5SWRdLm5ldHdvcmtTdGF0dXMgPSBOZXR3b3JrU3RhdHVzLmxvYWRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXJ5U3RvcmU7XG59KCkpO1xuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxudmFyIExvY2FsU3RhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExvY2FsU3RhdGUoX2EpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gX2EuY2FjaGUsIGNsaWVudCA9IF9hLmNsaWVudCwgcmVzb2x2ZXJzID0gX2EucmVzb2x2ZXJzLCBmcmFnbWVudE1hdGNoZXIgPSBfYS5mcmFnbWVudE1hdGNoZXI7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBjYWNoZTtcbiAgICAgICAgaWYgKGNsaWVudCkge1xuICAgICAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc29sdmVycykge1xuICAgICAgICAgICAgdGhpcy5hZGRSZXNvbHZlcnMocmVzb2x2ZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhZ21lbnRNYXRjaGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZyYWdtZW50TWF0Y2hlcihmcmFnbWVudE1hdGNoZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLmFkZFJlc29sdmVycyA9IGZ1bmN0aW9uIChyZXNvbHZlcnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5yZXNvbHZlcnMgPSB0aGlzLnJlc29sdmVycyB8fCB7fTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb2x2ZXJzKSkge1xuICAgICAgICAgICAgcmVzb2x2ZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlc29sdmVyR3JvdXApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNvbHZlcnMgPSBtZXJnZURlZXAoX3RoaXMucmVzb2x2ZXJzLCByZXNvbHZlckdyb3VwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlcnMgPSBtZXJnZURlZXAodGhpcy5yZXNvbHZlcnMsIHJlc29sdmVycyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLnNldFJlc29sdmVycyA9IGZ1bmN0aW9uIChyZXNvbHZlcnMpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5hZGRSZXNvbHZlcnMocmVzb2x2ZXJzKTtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLmdldFJlc29sdmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZXJzIHx8IHt9O1xuICAgIH07XG4gICAgTG9jYWxTdGF0ZS5wcm90b3R5cGUucnVuUmVzb2x2ZXJzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBkb2N1bWVudCA9IF9hLmRvY3VtZW50LCByZW1vdGVSZXN1bHQgPSBfYS5yZW1vdGVSZXN1bHQsIGNvbnRleHQgPSBfYS5jb250ZXh0LCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIF9iID0gX2Eub25seVJ1bkZvcmNlZFJlc29sdmVycywgb25seVJ1bkZvcmNlZFJlc29sdmVycyA9IF9iID09PSB2b2lkIDAgPyBmYWxzZSA6IF9iO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdGhpcy5yZXNvbHZlRG9jdW1lbnQoZG9jdW1lbnQsIHJlbW90ZVJlc3VsdC5kYXRhLCBjb250ZXh0LCB2YXJpYWJsZXMsIHRoaXMuZnJhZ21lbnRNYXRjaGVyLCBvbmx5UnVuRm9yY2VkUmVzb2x2ZXJzKS50aGVuKGZ1bmN0aW9uIChsb2NhbFJlc3VsdCkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCByZW1vdGVSZXN1bHQpLCB7IGRhdGE6IGxvY2FsUmVzdWx0LnJlc3VsdCB9KSk7IH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCByZW1vdGVSZXN1bHRdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTG9jYWxTdGF0ZS5wcm90b3R5cGUuc2V0RnJhZ21lbnRNYXRjaGVyID0gZnVuY3Rpb24gKGZyYWdtZW50TWF0Y2hlcikge1xuICAgICAgICB0aGlzLmZyYWdtZW50TWF0Y2hlciA9IGZyYWdtZW50TWF0Y2hlcjtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLmdldEZyYWdtZW50TWF0Y2hlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnRNYXRjaGVyO1xuICAgIH07XG4gICAgTG9jYWxTdGF0ZS5wcm90b3R5cGUuY2xpZW50UXVlcnkgPSBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgaWYgKGhhc0RpcmVjdGl2ZXMoWydjbGllbnQnXSwgZG9jdW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXNvbHZlcnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgfHwgaW52YXJpYW50Lndhcm4oJ0ZvdW5kIEBjbGllbnQgZGlyZWN0aXZlcyBpbiBhIHF1ZXJ5IGJ1dCBubyBBcG9sbG9DbGllbnQgcmVzb2x2ZXJzICcgK1xuICAgICAgICAgICAgICAgICd3ZXJlIHNwZWNpZmllZC4gVGhpcyBtZWFucyBBcG9sbG9DbGllbnQgbG9jYWwgcmVzb2x2ZXIgaGFuZGxpbmcgJyArXG4gICAgICAgICAgICAgICAgJ2hhcyBiZWVuIGRpc2FibGVkLCBhbmQgQGNsaWVudCBkaXJlY3RpdmVzIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggJyArXG4gICAgICAgICAgICAgICAgJ3RvIHlvdXIgbGluayBjaGFpbi4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLnNlcnZlclF1ZXJ5ID0gZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVycyA/IHJlbW92ZUNsaWVudFNldHNGcm9tRG9jdW1lbnQoZG9jdW1lbnQpIDogZG9jdW1lbnQ7XG4gICAgfTtcbiAgICBMb2NhbFN0YXRlLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHsgY29udGV4dCA9IHt9OyB9XG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIHZhciBuZXdDb250ZXh0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbnRleHQpLCB7IGNhY2hlOiBjYWNoZSwgZ2V0Q2FjaGVLZXk6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGUuY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5jb25maWcuZGF0YUlkRnJvbU9iamVjdChvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCA2KSA6IGludmFyaWFudChmYWxzZSwgJ1RvIHVzZSBjb250ZXh0LmdldENhY2hlS2V5LCB5b3UgbmVlZCB0byB1c2UgYSBjYWNoZSB0aGF0IGhhcyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhIGNvbmZpZ3VyYWJsZSBkYXRhSWRGcm9tT2JqZWN0LCBsaWtlIGFwb2xsby1jYWNoZS1pbm1lbW9yeS4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IH0pO1xuICAgICAgICByZXR1cm4gbmV3Q29udGV4dDtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLmFkZEV4cG9ydGVkVmFyaWFibGVzID0gZnVuY3Rpb24gKGRvY3VtZW50LCB2YXJpYWJsZXMsIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKHZhcmlhYmxlcyA9PT0gdm9pZCAwKSB7IHZhcmlhYmxlcyA9IHt9OyB9XG4gICAgICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHsgY29udGV4dCA9IHt9OyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLnJlc29sdmVEb2N1bWVudChkb2N1bWVudCwgdGhpcy5idWlsZFJvb3RWYWx1ZUZyb21DYWNoZShkb2N1bWVudCwgdmFyaWFibGVzKSB8fCB7fSwgdGhpcy5wcmVwYXJlQ29udGV4dChjb250ZXh0KSwgdmFyaWFibGVzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHZhcmlhYmxlcyksIGRhdGEuZXhwb3J0ZWRWYXJpYWJsZXMpKTsgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIF9fYXNzaWduKHt9LCB2YXJpYWJsZXMpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLnNob3VsZEZvcmNlUmVzb2x2ZXJzID0gZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gICAgICAgIHZhciBmb3JjZVJlc29sdmVycyA9IGZhbHNlO1xuICAgICAgICB2aXNpdChkb2N1bWVudCwge1xuICAgICAgICAgICAgRGlyZWN0aXZlOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5hbWUudmFsdWUgPT09ICdjbGllbnQnICYmIG5vZGUuYXJndW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZVJlc29sdmVycyA9IG5vZGUuYXJndW1lbnRzLnNvbWUoZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmcubmFtZS52YWx1ZSA9PT0gJ2Fsd2F5cycgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnLnZhbHVlLmtpbmQgPT09ICdCb29sZWFuVmFsdWUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZy52YWx1ZS52YWx1ZSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlUmVzb2x2ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJSRUFLO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZm9yY2VSZXNvbHZlcnM7XG4gICAgfTtcbiAgICBMb2NhbFN0YXRlLnByb3RvdHlwZS5idWlsZFJvb3RWYWx1ZUZyb21DYWNoZSA9IGZ1bmN0aW9uIChkb2N1bWVudCwgdmFyaWFibGVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlLmRpZmYoe1xuICAgICAgICAgICAgcXVlcnk6IGJ1aWxkUXVlcnlGcm9tU2VsZWN0aW9uU2V0KGRvY3VtZW50KSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgcmV0dXJuUGFydGlhbERhdGE6IHRydWUsXG4gICAgICAgICAgICBvcHRpbWlzdGljOiBmYWxzZSxcbiAgICAgICAgfSkucmVzdWx0O1xuICAgIH07XG4gICAgTG9jYWxTdGF0ZS5wcm90b3R5cGUucmVzb2x2ZURvY3VtZW50ID0gZnVuY3Rpb24gKGRvY3VtZW50LCByb290VmFsdWUsIGNvbnRleHQsIHZhcmlhYmxlcywgZnJhZ21lbnRNYXRjaGVyLCBvbmx5UnVuRm9yY2VkUmVzb2x2ZXJzKSB7XG4gICAgICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHsgY29udGV4dCA9IHt9OyB9XG4gICAgICAgIGlmICh2YXJpYWJsZXMgPT09IHZvaWQgMCkgeyB2YXJpYWJsZXMgPSB7fTsgfVxuICAgICAgICBpZiAoZnJhZ21lbnRNYXRjaGVyID09PSB2b2lkIDApIHsgZnJhZ21lbnRNYXRjaGVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTsgfVxuICAgICAgICBpZiAob25seVJ1bkZvcmNlZFJlc29sdmVycyA9PT0gdm9pZCAwKSB7IG9ubHlSdW5Gb3JjZWRSZXNvbHZlcnMgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWFpbkRlZmluaXRpb24sIGZyYWdtZW50cywgZnJhZ21lbnRNYXAsIGRlZmluaXRpb25PcGVyYXRpb24sIGRlZmF1bHRPcGVyYXRpb25UeXBlLCBfYSwgY2FjaGUsIGNsaWVudCwgZXhlY0NvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgbWFpbkRlZmluaXRpb24gPSBnZXRNYWluRGVmaW5pdGlvbihkb2N1bWVudCk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnRzID0gZ2V0RnJhZ21lbnREZWZpbml0aW9ucyhkb2N1bWVudCk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnRNYXAgPSBjcmVhdGVGcmFnbWVudE1hcChmcmFnbWVudHMpO1xuICAgICAgICAgICAgICAgIGRlZmluaXRpb25PcGVyYXRpb24gPSBtYWluRGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICAgICAub3BlcmF0aW9uO1xuICAgICAgICAgICAgICAgIGRlZmF1bHRPcGVyYXRpb25UeXBlID0gZGVmaW5pdGlvbk9wZXJhdGlvblxuICAgICAgICAgICAgICAgICAgICA/IGNhcGl0YWxpemVGaXJzdExldHRlcihkZWZpbml0aW9uT3BlcmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICA6ICdRdWVyeSc7XG4gICAgICAgICAgICAgICAgX2EgPSB0aGlzLCBjYWNoZSA9IF9hLmNhY2hlLCBjbGllbnQgPSBfYS5jbGllbnQ7XG4gICAgICAgICAgICAgICAgZXhlY0NvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50TWFwOiBmcmFnbWVudE1hcCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbnRleHQpLCB7IGNhY2hlOiBjYWNoZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogY2xpZW50IH0pLFxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiBmcmFnbWVudE1hdGNoZXIsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRPcGVyYXRpb25UeXBlOiBkZWZhdWx0T3BlcmF0aW9uVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0ZWRWYXJpYWJsZXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBvbmx5UnVuRm9yY2VkUmVzb2x2ZXJzOiBvbmx5UnVuRm9yY2VkUmVzb2x2ZXJzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLnJlc29sdmVTZWxlY3Rpb25TZXQobWFpbkRlZmluaXRpb24uc2VsZWN0aW9uU2V0LCByb290VmFsdWUsIGV4ZWNDb250ZXh0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHsgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydGVkVmFyaWFibGVzOiBleGVjQ29udGV4dC5leHBvcnRlZFZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLnJlc29sdmVTZWxlY3Rpb25TZXQgPSBmdW5jdGlvbiAoc2VsZWN0aW9uU2V0LCByb290VmFsdWUsIGV4ZWNDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmcmFnbWVudE1hcCwgY29udGV4dCwgdmFyaWFibGVzLCByZXN1bHRzVG9NZXJnZSwgZXhlY3V0ZTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnRNYXAgPSBleGVjQ29udGV4dC5mcmFnbWVudE1hcCwgY29udGV4dCA9IGV4ZWNDb250ZXh0LmNvbnRleHQsIHZhcmlhYmxlcyA9IGV4ZWNDb250ZXh0LnZhcmlhYmxlcztcbiAgICAgICAgICAgICAgICByZXN1bHRzVG9NZXJnZSA9IFtyb290VmFsdWVdO1xuICAgICAgICAgICAgICAgIGV4ZWN1dGUgPSBmdW5jdGlvbiAoc2VsZWN0aW9uKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmcmFnbWVudCwgdHlwZUNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaG91bGRJbmNsdWRlKHNlbGVjdGlvbiwgdmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLnJlc29sdmVGaWVsZChzZWxlY3Rpb24sIHJvb3RWYWx1ZSwgZXhlY0NvbnRleHQpLnRoZW4oZnVuY3Rpb24gKGZpZWxkUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkUmVzdWx0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNUb01lcmdlLnB1c2goKF9hID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hW3Jlc3VsdEtleU5hbWVGcm9tRmllbGQoc2VsZWN0aW9uKV0gPSBmaWVsZFJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5saW5lRnJhZ21lbnQoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBmcmFnbWVudE1hcFtzZWxlY3Rpb24ubmFtZS52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZyYWdtZW50LCA3KSA6IGludmFyaWFudChmcmFnbWVudCwgXCJObyBmcmFnbWVudCBuYW1lZCBcIiArIHNlbGVjdGlvbi5uYW1lLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcmFnbWVudCAmJiBmcmFnbWVudC50eXBlQ29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNvbmRpdGlvbiA9IGZyYWdtZW50LnR5cGVDb25kaXRpb24ubmFtZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhlY0NvbnRleHQuZnJhZ21lbnRNYXRjaGVyKHJvb3RWYWx1ZSwgdHlwZUNvbmRpdGlvbiwgY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLnJlc29sdmVTZWxlY3Rpb25TZXQoZnJhZ21lbnQuc2VsZWN0aW9uU2V0LCByb290VmFsdWUsIGV4ZWNDb250ZXh0KS50aGVuKGZ1bmN0aW9uIChmcmFnbWVudFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNUb01lcmdlLnB1c2goZnJhZ21lbnRSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pOyB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgUHJvbWlzZS5hbGwoc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMubWFwKGV4ZWN1dGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXJnZURlZXBBcnJheShyZXN1bHRzVG9NZXJnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLnJlc29sdmVGaWVsZCA9IGZ1bmN0aW9uIChmaWVsZCwgcm9vdFZhbHVlLCBleGVjQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFibGVzLCBmaWVsZE5hbWUsIGFsaWFzZWRGaWVsZE5hbWUsIGFsaWFzVXNlZCwgZGVmYXVsdFJlc3VsdCwgcmVzdWx0UHJvbWlzZSwgcmVzb2x2ZXJUeXBlLCByZXNvbHZlck1hcCwgcmVzb2x2ZTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgdmFyaWFibGVzID0gZXhlY0NvbnRleHQudmFyaWFibGVzO1xuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSA9IGZpZWxkLm5hbWUudmFsdWU7XG4gICAgICAgICAgICAgICAgYWxpYXNlZEZpZWxkTmFtZSA9IHJlc3VsdEtleU5hbWVGcm9tRmllbGQoZmllbGQpO1xuICAgICAgICAgICAgICAgIGFsaWFzVXNlZCA9IGZpZWxkTmFtZSAhPT0gYWxpYXNlZEZpZWxkTmFtZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0UmVzdWx0ID0gcm9vdFZhbHVlW2FsaWFzZWRGaWVsZE5hbWVdIHx8IHJvb3RWYWx1ZVtmaWVsZE5hbWVdO1xuICAgICAgICAgICAgICAgIHJlc3VsdFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoZGVmYXVsdFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYgKCFleGVjQ29udGV4dC5vbmx5UnVuRm9yY2VkUmVzb2x2ZXJzIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkRm9yY2VSZXNvbHZlcnMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVyVHlwZSA9IHJvb3RWYWx1ZS5fX3R5cGVuYW1lIHx8IGV4ZWNDb250ZXh0LmRlZmF1bHRPcGVyYXRpb25UeXBlO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlck1hcCA9IHRoaXMucmVzb2x2ZXJzICYmIHRoaXMucmVzb2x2ZXJzW3Jlc29sdmVyVHlwZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlck1hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IHJlc29sdmVyTWFwW2FsaWFzVXNlZCA/IGZpZWxkTmFtZSA6IGFsaWFzZWRGaWVsZE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHJlc29sdmUocm9vdFZhbHVlLCBhcmd1bWVudHNPYmplY3RGcm9tRmllbGQoZmllbGQsIHZhcmlhYmxlcyksIGV4ZWNDb250ZXh0LmNvbnRleHQsIHsgZmllbGQ6IGZpZWxkLCBmcmFnbWVudE1hcDogZXhlY0NvbnRleHQuZnJhZ21lbnRNYXAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgcmVzdWx0UHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgeyByZXN1bHQgPSBkZWZhdWx0UmVzdWx0OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQuZGlyZWN0aXZlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLmRpcmVjdGl2ZXMuZm9yRWFjaChmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmUubmFtZS52YWx1ZSA9PT0gJ2V4cG9ydCcgJiYgZGlyZWN0aXZlLmFyZ3VtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlLmFyZ3VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJnLm5hbWUudmFsdWUgPT09ICdhcycgJiYgYXJnLnZhbHVlLmtpbmQgPT09ICdTdHJpbmdWYWx1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY0NvbnRleHQuZXhwb3J0ZWRWYXJpYWJsZXNbYXJnLnZhbHVlLnZhbHVlXSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZC5zZWxlY3Rpb25TZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVzb2x2ZVN1YlNlbGVjdGVkQXJyYXkoZmllbGQsIHJlc3VsdCwgZXhlY0NvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLnNlbGVjdGlvblNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5yZXNvbHZlU2VsZWN0aW9uU2V0KGZpZWxkLnNlbGVjdGlvblNldCwgcmVzdWx0LCBleGVjQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvY2FsU3RhdGUucHJvdG90eXBlLnJlc29sdmVTdWJTZWxlY3RlZEFycmF5ID0gZnVuY3Rpb24gKGZpZWxkLCByZXN1bHQsIGV4ZWNDb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChyZXN1bHQubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVzb2x2ZVN1YlNlbGVjdGVkQXJyYXkoZmllbGQsIGl0ZW0sIGV4ZWNDb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWVsZC5zZWxlY3Rpb25TZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVzb2x2ZVNlbGVjdGlvblNldChmaWVsZC5zZWxlY3Rpb25TZXQsIGl0ZW0sIGV4ZWNDb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIExvY2FsU3RhdGU7XG59KCkpO1xuXG5mdW5jdGlvbiBtdWx0aXBsZXgoaW5uZXIpIHtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gbmV3IFNldCgpO1xuICAgIHZhciBzdWIgPSBudWxsO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgb2JzZXJ2ZXJzLmFkZChvYnNlcnZlcik7XG4gICAgICAgIHN1YiA9IHN1YiB8fCBpbm5lci5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykgeyByZXR1cm4gb2JzLm5leHQgJiYgb2JzLm5leHQodmFsdWUpOyB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykgeyByZXR1cm4gb2JzLmVycm9yICYmIG9icy5lcnJvcihlcnJvcik7IH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykgeyByZXR1cm4gb2JzLmNvbXBsZXRlICYmIG9icy5jb21wbGV0ZSgpOyB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG9ic2VydmVycy5kZWxldGUob2JzZXJ2ZXIpICYmICFvYnNlcnZlcnMuc2l6ZSAmJiBzdWIpIHtcbiAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYXN5bmNNYXAob2JzZXJ2YWJsZSwgbWFwRm4pIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHZhciBuZXh0ID0gb2JzZXJ2ZXIubmV4dCwgZXJyb3IgPSBvYnNlcnZlci5lcnJvciwgY29tcGxldGUgPSBvYnNlcnZlci5jb21wbGV0ZTtcbiAgICAgICAgdmFyIGFjdGl2ZU5leHRDb3VudCA9IDA7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICArK2FjdGl2ZU5leHRDb3VudDtcbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1hcEZuKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIC0tYWN0aXZlTmV4dENvdW50O1xuICAgICAgICAgICAgICAgICAgICBuZXh0ICYmIG5leHQuY2FsbChvYnNlcnZlciwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkICYmIGhhbmRsZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAtLWFjdGl2ZU5leHRDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IuY2FsbChvYnNlcnZlciwgZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IuY2FsbChvYnNlcnZlciwgZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghYWN0aXZlTmV4dENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlICYmIGNvbXBsZXRlLmNhbGwob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHZhciBzdWIgPSBvYnNlcnZhYmxlLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1Yi51bnN1YnNjcmliZSgpOyB9O1xuICAgIH0pO1xufVxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIFF1ZXJ5TWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUXVlcnlNYW5hZ2VyKF9hKSB7XG4gICAgICAgIHZhciBsaW5rID0gX2EubGluaywgX2IgPSBfYS5xdWVyeURlZHVwbGljYXRpb24sIHF1ZXJ5RGVkdXBsaWNhdGlvbiA9IF9iID09PSB2b2lkIDAgPyBmYWxzZSA6IF9iLCBzdG9yZSA9IF9hLnN0b3JlLCBfYyA9IF9hLm9uQnJvYWRjYXN0LCBvbkJyb2FkY2FzdCA9IF9jID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gOiBfYywgX2QgPSBfYS5zc3JNb2RlLCBzc3JNb2RlID0gX2QgPT09IHZvaWQgMCA/IGZhbHNlIDogX2QsIF9lID0gX2EuY2xpZW50QXdhcmVuZXNzLCBjbGllbnRBd2FyZW5lc3MgPSBfZSA9PT0gdm9pZCAwID8ge30gOiBfZSwgbG9jYWxTdGF0ZSA9IF9hLmxvY2FsU3RhdGUsIGFzc3VtZUltbXV0YWJsZVJlc3VsdHMgPSBfYS5hc3N1bWVJbW11dGFibGVSZXN1bHRzO1xuICAgICAgICB0aGlzLm11dGF0aW9uU3RvcmUgPSBuZXcgTXV0YXRpb25TdG9yZSgpO1xuICAgICAgICB0aGlzLnF1ZXJ5U3RvcmUgPSBuZXcgUXVlcnlTdG9yZSgpO1xuICAgICAgICB0aGlzLmNsaWVudEF3YXJlbmVzcyA9IHt9O1xuICAgICAgICB0aGlzLmlkQ291bnRlciA9IDE7XG4gICAgICAgIHRoaXMucXVlcmllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5mZXRjaFF1ZXJ5UmVqZWN0Rm5zID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybUNhY2hlID0gbmV3IChjYW5Vc2VXZWFrTWFwID8gV2Vha01hcCA6IE1hcCkoKTtcbiAgICAgICAgdGhpcy5pbkZsaWdodExpbmtPYnNlcnZhYmxlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5wb2xsaW5nSW5mb0J5UXVlcnlJZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5saW5rID0gbGluaztcbiAgICAgICAgdGhpcy5xdWVyeURlZHVwbGljYXRpb24gPSBxdWVyeURlZHVwbGljYXRpb247XG4gICAgICAgIHRoaXMuZGF0YVN0b3JlID0gc3RvcmU7XG4gICAgICAgIHRoaXMub25Ccm9hZGNhc3QgPSBvbkJyb2FkY2FzdDtcbiAgICAgICAgdGhpcy5jbGllbnRBd2FyZW5lc3MgPSBjbGllbnRBd2FyZW5lc3M7XG4gICAgICAgIHRoaXMubG9jYWxTdGF0ZSA9IGxvY2FsU3RhdGUgfHwgbmV3IExvY2FsU3RhdGUoeyBjYWNoZTogc3RvcmUuZ2V0Q2FjaGUoKSB9KTtcbiAgICAgICAgdGhpcy5zc3JNb2RlID0gc3NyTW9kZTtcbiAgICAgICAgdGhpcy5hc3N1bWVJbW11dGFibGVSZXN1bHRzID0gISFhc3N1bWVJbW11dGFibGVSZXN1bHRzO1xuICAgIH1cbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucXVlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChfaW5mbywgcXVlcnlJZCkge1xuICAgICAgICAgICAgX3RoaXMuc3RvcFF1ZXJ5Tm9Ccm9hZGNhc3QocXVlcnlJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZldGNoUXVlcnlSZWplY3RGbnMuZm9yRWFjaChmdW5jdGlvbiAocmVqZWN0KSB7XG4gICAgICAgICAgICByZWplY3QocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gbmV3IEludmFyaWFudEVycm9yKDgpIDogbmV3IEludmFyaWFudEVycm9yKCdRdWVyeU1hbmFnZXIgc3RvcHBlZCB3aGlsZSBxdWVyeSB3YXMgaW4gZmxpZ2h0JykpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUubXV0YXRlID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBtdXRhdGlvbiA9IF9hLm11dGF0aW9uLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIG9wdGltaXN0aWNSZXNwb25zZSA9IF9hLm9wdGltaXN0aWNSZXNwb25zZSwgdXBkYXRlUXVlcmllc0J5TmFtZSA9IF9hLnVwZGF0ZVF1ZXJpZXMsIF9iID0gX2EucmVmZXRjaFF1ZXJpZXMsIHJlZmV0Y2hRdWVyaWVzID0gX2IgPT09IHZvaWQgMCA/IFtdIDogX2IsIF9jID0gX2EuYXdhaXRSZWZldGNoUXVlcmllcywgYXdhaXRSZWZldGNoUXVlcmllcyA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jLCB1cGRhdGVXaXRoUHJveHlGbiA9IF9hLnVwZGF0ZSwgX2QgPSBfYS5lcnJvclBvbGljeSwgZXJyb3JQb2xpY3kgPSBfZCA9PT0gdm9pZCAwID8gJ25vbmUnIDogX2QsIGZldGNoUG9saWN5ID0gX2EuZmV0Y2hQb2xpY3ksIF9lID0gX2EuY29udGV4dCwgY29udGV4dCA9IF9lID09PSB2b2lkIDAgPyB7fSA6IF9lO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbXV0YXRpb25JZCwgZ2VuZXJhdGVVcGRhdGVRdWVyaWVzSW5mbywgc2VsZjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9mKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQobXV0YXRpb24sIDkpIDogaW52YXJpYW50KG11dGF0aW9uLCAnbXV0YXRpb24gb3B0aW9uIGlzIHJlcXVpcmVkLiBZb3UgbXVzdCBzcGVjaWZ5IHlvdXIgR3JhcGhRTCBkb2N1bWVudCBpbiB0aGUgbXV0YXRpb24gb3B0aW9uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KCFmZXRjaFBvbGljeSB8fCBmZXRjaFBvbGljeSA9PT0gJ25vLWNhY2hlJywgMTApIDogaW52YXJpYW50KCFmZXRjaFBvbGljeSB8fCBmZXRjaFBvbGljeSA9PT0gJ25vLWNhY2hlJywgXCJNdXRhdGlvbnMgb25seSBzdXBwb3J0IGEgJ25vLWNhY2hlJyBmZXRjaFBvbGljeS4gSWYgeW91IGRvbid0IHdhbnQgdG8gZGlzYWJsZSB0aGUgY2FjaGUsIHJlbW92ZSB5b3VyIGZldGNoUG9saWN5IHNldHRpbmcgdG8gcHJvY2VlZCB3aXRoIHRoZSBkZWZhdWx0IG11dGF0aW9uIGJlaGF2aW9yLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uSWQgPSB0aGlzLmdlbmVyYXRlUXVlcnlJZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24gPSB0aGlzLnRyYW5zZm9ybShtdXRhdGlvbikuZG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFF1ZXJ5KG11dGF0aW9uSWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7IGRvY3VtZW50OiBtdXRhdGlvbiB9KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXMgPSB0aGlzLmdldFZhcmlhYmxlcyhtdXRhdGlvbiwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50cmFuc2Zvcm0obXV0YXRpb24pLmhhc0NsaWVudEV4cG9ydHMpIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMubG9jYWxTdGF0ZS5hZGRFeHBvcnRlZFZhcmlhYmxlcyhtdXRhdGlvbiwgdmFyaWFibGVzLCBjb250ZXh0KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlcyA9IF9mLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVVcGRhdGVRdWVyaWVzSW5mbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZVF1ZXJpZXNCeU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucXVlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChfYSwgcXVlcnlJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9ic2VydmFibGVRdWVyeSA9IF9hLm9ic2VydmFibGVRdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnlOYW1lID0gb2JzZXJ2YWJsZVF1ZXJ5LnF1ZXJ5TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlOYW1lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc093blByb3BlcnR5LmNhbGwodXBkYXRlUXVlcmllc0J5TmFtZSwgcXVlcnlOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRbcXVlcnlJZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVyOiB1cGRhdGVRdWVyaWVzQnlOYW1lW3F1ZXJ5TmFtZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogX3RoaXMucXVlcnlTdG9yZS5nZXQocXVlcnlJZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm11dGF0aW9uU3RvcmUuaW5pdE11dGF0aW9uKG11dGF0aW9uSWQsIG11dGF0aW9uLCB2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU3RvcmUubWFya011dGF0aW9uSW5pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25JZDogbXV0YXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogbXV0YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUXVlcmllczogZ2VuZXJhdGVVcGRhdGVRdWVyaWVzSW5mbygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlV2l0aFByb3h5Rm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1pc3RpY1Jlc3BvbnNlOiBvcHRpbWlzdGljUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0UXVlcmllcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0T2JzZXJ2YWJsZUZyb21MaW5rKG11dGF0aW9uLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29udGV4dCksIHsgb3B0aW1pc3RpY1Jlc3BvbnNlOiBvcHRpbWlzdGljUmVzcG9uc2UgfSksIHZhcmlhYmxlcywgZmFsc2UpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYXBoUUxSZXN1bHRIYXNFcnJvcihyZXN1bHQpICYmIGVycm9yUG9saWN5ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogcmVzdWx0LmVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tdXRhdGlvblN0b3JlLm1hcmtNdXRhdGlvblJlc3VsdChtdXRhdGlvbklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmV0Y2hQb2xpY3kgIT09ICduby1jYWNoZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhU3RvcmUubWFya011dGF0aW9uUmVzdWx0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uSWQ6IG11dGF0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBtdXRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUXVlcmllczogZ2VuZXJhdGVVcGRhdGVRdWVyaWVzSW5mbygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVXaXRoUHJveHlGbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tdXRhdGlvblN0b3JlLm1hcmtNdXRhdGlvbkVycm9yKG11dGF0aW9uSWQsIGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhU3RvcmUubWFya011dGF0aW9uQ29tcGxldGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbklkOiBtdXRhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWlzdGljUmVzcG9uc2U6IG9wdGltaXN0aWNSZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFF1ZXJ5KG11dGF0aW9uSWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7IGRvY3VtZW50OiBudWxsIH0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Vycm9yOiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubXV0YXRpb25TdG9yZS5tYXJrTXV0YXRpb25FcnJvcihtdXRhdGlvbklkLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YVN0b3JlLm1hcmtNdXRhdGlvbkNvbXBsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25JZDogbXV0YXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1pc3RpY1Jlc3BvbnNlOiBvcHRpbWlzdGljUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5icm9hZGNhc3RRdWVyaWVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWZldGNoUXVlcmllcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZldGNoUXVlcmllcyA9IHJlZmV0Y2hRdWVyaWVzKHN0b3JlUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZmV0Y2hRdWVyeVByb21pc2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTm9uRW1wdHlBcnJheShyZWZldGNoUXVlcmllcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXRjaFF1ZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAocmVmZXRjaFF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlZmV0Y2hRdWVyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnF1ZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9ic2VydmFibGVRdWVyeSA9IF9hLm9ic2VydmFibGVRdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic2VydmFibGVRdWVyeSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZVF1ZXJ5LnF1ZXJ5TmFtZSA9PT0gcmVmZXRjaFF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZldGNoUXVlcnlQcm9taXNlcy5wdXNoKG9ic2VydmFibGVRdWVyeS5yZWZldGNoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnlPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogcmVmZXRjaFF1ZXJ5LnF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHJlZmV0Y2hRdWVyeS52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZldGNoUXVlcnkuY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU9wdGlvbnMuY29udGV4dCA9IHJlZmV0Y2hRdWVyeS5jb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZldGNoUXVlcnlQcm9taXNlcy5wdXNoKHNlbGYucXVlcnkocXVlcnlPcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChhd2FpdFJlZmV0Y2hRdWVyaWVzID8gcmVmZXRjaFF1ZXJ5UHJvbWlzZXMgOiBbXSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UXVlcnkobXV0YXRpb25JZCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKHsgZG9jdW1lbnQ6IG51bGwgfSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JQb2xpY3kgPT09ICdpZ25vcmUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVJlc3VsdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKHN0b3JlUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0b3JlUmVzdWx0LmVycm9ycztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN0b3JlUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmZldGNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb3B0aW9ucywgZmV0Y2hUeXBlLCBmZXRjaE1vcmVGb3JRdWVyeUlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgbWV0YWRhdGEsIF9iLCBmZXRjaFBvbGljeSwgX2MsIGNvbnRleHQsIHF1ZXJ5LCB2YXJpYWJsZXMsIHN0b3JlUmVzdWx0LCBpc05ldHdvcmtPbmx5LCBuZWVkVG9GZXRjaCwgX2QsIGNvbXBsZXRlLCByZXN1bHQsIHNob3VsZEZldGNoLCByZXF1ZXN0SWQsIGNhbmNlbCwgbmV0d29ya1Jlc3VsdDtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9lKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IG9wdGlvbnMubWV0YWRhdGEsIG1ldGFkYXRhID0gX2EgPT09IHZvaWQgMCA/IG51bGwgOiBfYSwgX2IgPSBvcHRpb25zLmZldGNoUG9saWN5LCBmZXRjaFBvbGljeSA9IF9iID09PSB2b2lkIDAgPyAnY2FjaGUtZmlyc3QnIDogX2IsIF9jID0gb3B0aW9ucy5jb250ZXh0LCBjb250ZXh0ID0gX2MgPT09IHZvaWQgMCA/IHt9IDogX2M7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IHRoaXMudHJhbnNmb3JtKG9wdGlvbnMucXVlcnkpLmRvY3VtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzID0gdGhpcy5nZXRWYXJpYWJsZXMocXVlcnksIG9wdGlvbnMudmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50cmFuc2Zvcm0ocXVlcnkpLmhhc0NsaWVudEV4cG9ydHMpIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMubG9jYWxTdGF0ZS5hZGRFeHBvcnRlZFZhcmlhYmxlcyhxdWVyeSwgdmFyaWFibGVzLCBjb250ZXh0KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlcyA9IF9lLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyB2YXJpYWJsZXM6IHZhcmlhYmxlcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTmV0d29ya09ubHkgPSBmZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScgfHwgZmV0Y2hQb2xpY3kgPT09ICduby1jYWNoZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkVG9GZXRjaCA9IGlzTmV0d29ya09ubHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmV0d29ya09ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZCA9IHRoaXMuZGF0YVN0b3JlLmdldENhY2hlKCkuZGlmZih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWlzdGljOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgY29tcGxldGUgPSBfZC5jb21wbGV0ZSwgcmVzdWx0ID0gX2QucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRUb0ZldGNoID0gIWNvbXBsZXRlIHx8IGZldGNoUG9saWN5ID09PSAnY2FjaGUtYW5kLW5ldHdvcmsnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkRmV0Y2ggPSBuZWVkVG9GZXRjaCAmJiBmZXRjaFBvbGljeSAhPT0gJ2NhY2hlLW9ubHknICYmIGZldGNoUG9saWN5ICE9PSAnc3RhbmRieSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzRGlyZWN0aXZlcyhbJ2xpdmUnXSwgcXVlcnkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZEZldGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZCA9IHRoaXMuaWRDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWwgPSBmZXRjaFBvbGljeSAhPT0gJ25vLWNhY2hlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy51cGRhdGVRdWVyeVdhdGNoKHF1ZXJ5SWQsIHF1ZXJ5LCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRRdWVyeShxdWVyeUlkLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVxdWVzdElkOiByZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZGF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoZmV0Y2hNb3JlRm9yUXVlcnlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U3RvcmUuaW5pdFF1ZXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVByZXZpb3VzVmFyaWFibGVzOiBzaG91bGRGZXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1BvbGw6IGZldGNoVHlwZSA9PT0gRmV0Y2hUeXBlLnBvbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWZldGNoOiBmZXRjaFR5cGUgPT09IEZldGNoVHlwZS5yZWZldGNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaE1vcmVGb3JRdWVyeUlkOiBmZXRjaE1vcmVGb3JRdWVyeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRGZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtSZXN1bHQgPSB0aGlzLmZldGNoUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Fwb2xsb0Vycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdElkID49IF90aGlzLmdldFF1ZXJ5KHF1ZXJ5SWQpLmxhc3RSZXF1ZXN0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5xdWVyeVN0b3JlLm1hcmtRdWVyeUVycm9yKHF1ZXJ5SWQsIGVycm9yLCBmZXRjaE1vcmVGb3JRdWVyeUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkYXRlKHF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmludmFsaWRhdGUoZmV0Y2hNb3JlRm9yUXVlcnlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYnJvYWRjYXN0UXVlcmllcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFwb2xsb0Vycm9yKHsgbmV0d29ya0Vycm9yOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZXRjaFBvbGljeSAhPT0gJ2NhY2hlLWFuZC1uZXR3b3JrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG5ldHdvcmtSZXN1bHRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrUmVzdWx0LmNhdGNoKGZ1bmN0aW9uICgpIHsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U3RvcmUubWFya1F1ZXJ5UmVzdWx0Q2xpZW50KHF1ZXJ5SWQsICFzaG91bGRGZXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGUocXVlcnlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoZmV0Y2hNb3JlRm9yUXVlcnlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm0ocXVlcnkpLmhhc0ZvcmNlZFJlc29sdmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdGhpcy5sb2NhbFN0YXRlLnJ1blJlc29sdmVycyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdGVSZXN1bHQ6IHsgZGF0YTogc3RvcmVSZXN1bHQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ubHlSdW5Gb3JjZWRSZXNvbHZlcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWFya1F1ZXJ5UmVzdWx0KHF1ZXJ5SWQsIHJlc3VsdCwgb3B0aW9ucywgZmV0Y2hNb3JlRm9yUXVlcnlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5icm9hZGNhc3RRdWVyaWVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgeyBkYXRhOiBzdG9yZVJlc3VsdCB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLm1hcmtRdWVyeVJlc3VsdCA9IGZ1bmN0aW9uIChxdWVyeUlkLCByZXN1bHQsIF9hLCBmZXRjaE1vcmVGb3JRdWVyeUlkKSB7XG4gICAgICAgIHZhciBmZXRjaFBvbGljeSA9IF9hLmZldGNoUG9saWN5LCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIGVycm9yUG9saWN5ID0gX2EuZXJyb3JQb2xpY3k7XG4gICAgICAgIGlmIChmZXRjaFBvbGljeSA9PT0gJ25vLWNhY2hlJykge1xuICAgICAgICAgICAgdGhpcy5zZXRRdWVyeShxdWVyeUlkLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgICAgIG5ld0RhdGE6IHsgcmVzdWx0OiByZXN1bHQuZGF0YSwgY29tcGxldGU6IHRydWUgfSxcbiAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN0b3JlLm1hcmtRdWVyeVJlc3VsdChyZXN1bHQsIHRoaXMuZ2V0UXVlcnkocXVlcnlJZCkuZG9jdW1lbnQsIHZhcmlhYmxlcywgZmV0Y2hNb3JlRm9yUXVlcnlJZCwgZXJyb3JQb2xpY3kgPT09ICdpZ25vcmUnIHx8IGVycm9yUG9saWN5ID09PSAnYWxsJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUucXVlcnlMaXN0ZW5lckZvck9ic2VydmVyID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIG9wdGlvbnMsIG9ic2VydmVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZ3VtZW50KSB7XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJbbWV0aG9kXSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyW21ldGhvZF0oYXJndW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgfHwgaW52YXJpYW50LmVycm9yKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1ldGhvZCA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQuZXJyb3IoYXJndW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocXVlcnlTdG9yZVZhbHVlLCBuZXdEYXRhKSB7XG4gICAgICAgICAgICBfdGhpcy5pbnZhbGlkYXRlKHF1ZXJ5SWQsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghcXVlcnlTdG9yZVZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHZhciBfYSA9IF90aGlzLmdldFF1ZXJ5KHF1ZXJ5SWQpLCBvYnNlcnZhYmxlUXVlcnkgPSBfYS5vYnNlcnZhYmxlUXVlcnksIGRvY3VtZW50ID0gX2EuZG9jdW1lbnQ7XG4gICAgICAgICAgICB2YXIgZmV0Y2hQb2xpY3kgPSBvYnNlcnZhYmxlUXVlcnlcbiAgICAgICAgICAgICAgICA/IG9ic2VydmFibGVRdWVyeS5vcHRpb25zLmZldGNoUG9saWN5XG4gICAgICAgICAgICAgICAgOiBvcHRpb25zLmZldGNoUG9saWN5O1xuICAgICAgICAgICAgaWYgKGZldGNoUG9saWN5ID09PSAnc3RhbmRieScpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGxvYWRpbmcgPSBpc05ldHdvcmtSZXF1ZXN0SW5GbGlnaHQocXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMpO1xuICAgICAgICAgICAgdmFyIGxhc3RSZXN1bHQgPSBvYnNlcnZhYmxlUXVlcnkgJiYgb2JzZXJ2YWJsZVF1ZXJ5LmdldExhc3RSZXN1bHQoKTtcbiAgICAgICAgICAgIHZhciBuZXR3b3JrU3RhdHVzQ2hhbmdlZCA9ICEhKGxhc3RSZXN1bHQgJiZcbiAgICAgICAgICAgICAgICBsYXN0UmVzdWx0Lm5ldHdvcmtTdGF0dXMgIT09IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzKTtcbiAgICAgICAgICAgIHZhciBzaG91bGROb3RpZnlJZkxvYWRpbmcgPSBvcHRpb25zLnJldHVyblBhcnRpYWxEYXRhIHx8XG4gICAgICAgICAgICAgICAgKCFuZXdEYXRhICYmIHF1ZXJ5U3RvcmVWYWx1ZS5wcmV2aW91c1ZhcmlhYmxlcykgfHxcbiAgICAgICAgICAgICAgICAobmV0d29ya1N0YXR1c0NoYW5nZWQgJiYgb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UpIHx8XG4gICAgICAgICAgICAgICAgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1vbmx5JyB8fFxuICAgICAgICAgICAgICAgIGZldGNoUG9saWN5ID09PSAnY2FjaGUtYW5kLW5ldHdvcmsnO1xuICAgICAgICAgICAgaWYgKGxvYWRpbmcgJiYgIXNob3VsZE5vdGlmeUlmTG9hZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoYXNHcmFwaFFMRXJyb3JzID0gaXNOb25FbXB0eUFycmF5KHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzKTtcbiAgICAgICAgICAgIHZhciBlcnJvclBvbGljeSA9IG9ic2VydmFibGVRdWVyeVxuICAgICAgICAgICAgICAgICYmIG9ic2VydmFibGVRdWVyeS5vcHRpb25zLmVycm9yUG9saWN5XG4gICAgICAgICAgICAgICAgfHwgb3B0aW9ucy5lcnJvclBvbGljeVxuICAgICAgICAgICAgICAgIHx8ICdub25lJztcbiAgICAgICAgICAgIGlmIChlcnJvclBvbGljeSA9PT0gJ25vbmUnICYmIGhhc0dyYXBoUUxFcnJvcnMgfHwgcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtFcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnZva2UoJ2Vycm9yJywgbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogcXVlcnlTdG9yZVZhbHVlLmdyYXBoUUxFcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtFcnJvcjogcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtFcnJvcixcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHZhciBpc01pc3NpbmcgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZldGNoUG9saWN5ICE9PSAnbm8tY2FjaGUnICYmIGZldGNoUG9saWN5ICE9PSAnbmV0d29yay1vbmx5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0UXVlcnkocXVlcnlJZCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKHsgbmV3RGF0YTogbnVsbCB9KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IG5ld0RhdGEucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpc01pc3NpbmcgPSAhbmV3RGF0YS5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0RXJyb3IgPSBvYnNlcnZhYmxlUXVlcnkgJiYgb2JzZXJ2YWJsZVF1ZXJ5LmdldExhc3RFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JTdGF0dXNDaGFuZ2VkID0gZXJyb3JQb2xpY3kgIT09ICdub25lJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGxhc3RFcnJvciAmJiBsYXN0RXJyb3IuZ3JhcGhRTEVycm9ycykgIT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlTdG9yZVZhbHVlLmdyYXBoUUxFcnJvcnM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0UmVzdWx0ICYmIGxhc3RSZXN1bHQuZGF0YSAmJiAhZXJyb3JTdGF0dXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gbGFzdFJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNNaXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZlJlc3VsdCA9IF90aGlzLmRhdGFTdG9yZS5nZXRDYWNoZSgpLmRpZmYoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHF1ZXJ5U3RvcmVWYWx1ZS5wcmV2aW91c1ZhcmlhYmxlcyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVN0b3JlVmFsdWUudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltaXN0aWM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkaWZmUmVzdWx0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWlzc2luZyA9ICFkaWZmUmVzdWx0LmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzdGFsZSA9IGlzTWlzc2luZyAmJiAhKG9wdGlvbnMucmV0dXJuUGFydGlhbERhdGEgfHxcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1vbmx5Jyk7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEZyb21TdG9yZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc3RhbGUgPyBsYXN0UmVzdWx0ICYmIGxhc3RSZXN1bHQuZGF0YSA6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGFsZTogc3RhbGUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JQb2xpY3kgPT09ICdhbGwnICYmIGhhc0dyYXBoUUxFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0RnJvbVN0b3JlLmVycm9ycyA9IHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnZva2UoJ25leHQnLCByZXN1bHRGcm9tU3RvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKG5ldHdvcmtFcnJvcikge1xuICAgICAgICAgICAgICAgIGludm9rZSgnZXJyb3InLCBuZXcgQXBvbGxvRXJyb3IoeyBuZXR3b3JrRXJyb3I6IG5ldHdvcmtFcnJvciB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uIChkb2N1bWVudCkge1xuICAgICAgICB2YXIgdHJhbnNmb3JtQ2FjaGUgPSB0aGlzLnRyYW5zZm9ybUNhY2hlO1xuICAgICAgICBpZiAoIXRyYW5zZm9ybUNhY2hlLmhhcyhkb2N1bWVudCkpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZSA9IHRoaXMuZGF0YVN0b3JlLmdldENhY2hlKCk7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtZWQgPSBjYWNoZS50cmFuc2Zvcm1Eb2N1bWVudChkb2N1bWVudCk7XG4gICAgICAgICAgICB2YXIgZm9yTGluayA9IHJlbW92ZUNvbm5lY3Rpb25EaXJlY3RpdmVGcm9tRG9jdW1lbnQoY2FjaGUudHJhbnNmb3JtRm9yTGluayh0cmFuc2Zvcm1lZCkpO1xuICAgICAgICAgICAgdmFyIGNsaWVudFF1ZXJ5ID0gdGhpcy5sb2NhbFN0YXRlLmNsaWVudFF1ZXJ5KHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIHZhciBzZXJ2ZXJRdWVyeSA9IHRoaXMubG9jYWxTdGF0ZS5zZXJ2ZXJRdWVyeShmb3JMaW5rKTtcbiAgICAgICAgICAgIHZhciBjYWNoZUVudHJ5XzEgPSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IHRyYW5zZm9ybWVkLFxuICAgICAgICAgICAgICAgIGhhc0NsaWVudEV4cG9ydHM6IGhhc0NsaWVudEV4cG9ydHModHJhbnNmb3JtZWQpLFxuICAgICAgICAgICAgICAgIGhhc0ZvcmNlZFJlc29sdmVyczogdGhpcy5sb2NhbFN0YXRlLnNob3VsZEZvcmNlUmVzb2x2ZXJzKHRyYW5zZm9ybWVkKSxcbiAgICAgICAgICAgICAgICBjbGllbnRRdWVyeTogY2xpZW50UXVlcnksXG4gICAgICAgICAgICAgICAgc2VydmVyUXVlcnk6IHNlcnZlclF1ZXJ5LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYXJzOiBnZXREZWZhdWx0VmFsdWVzKGdldE9wZXJhdGlvbkRlZmluaXRpb24odHJhbnNmb3JtZWQpKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgYWRkID0gZnVuY3Rpb24gKGRvYykge1xuICAgICAgICAgICAgICAgIGlmIChkb2MgJiYgIXRyYW5zZm9ybUNhY2hlLmhhcyhkb2MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybUNhY2hlLnNldChkb2MsIGNhY2hlRW50cnlfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFkZChkb2N1bWVudCk7XG4gICAgICAgICAgICBhZGQodHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgYWRkKGNsaWVudFF1ZXJ5KTtcbiAgICAgICAgICAgIGFkZChzZXJ2ZXJRdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldChkb2N1bWVudCk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChkb2N1bWVudCwgdmFyaWFibGVzKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy50cmFuc2Zvcm0oZG9jdW1lbnQpLmRlZmF1bHRWYXJzKSwgdmFyaWFibGVzKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUud2F0Y2hRdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zLCBzaG91bGRTdWJzY3JpYmUpIHtcbiAgICAgICAgaWYgKHNob3VsZFN1YnNjcmliZSA9PT0gdm9pZCAwKSB7IHNob3VsZFN1YnNjcmliZSA9IHRydWU7IH1cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KG9wdGlvbnMuZmV0Y2hQb2xpY3kgIT09ICdzdGFuZGJ5JywgMTEpIDogaW52YXJpYW50KG9wdGlvbnMuZmV0Y2hQb2xpY3kgIT09ICdzdGFuZGJ5JywgJ2NsaWVudC53YXRjaFF1ZXJ5IGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBmZXRjaFBvbGljeSBzZXQgdG8gXCJzdGFuZGJ5XCInKTtcbiAgICAgICAgb3B0aW9ucy52YXJpYWJsZXMgPSB0aGlzLmdldFZhcmlhYmxlcyhvcHRpb25zLnF1ZXJ5LCBvcHRpb25zLnZhcmlhYmxlcyk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvcHRpb25zLm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lZE9wdGlvbnMgPSBfX2Fzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVF1ZXJ5KHtcbiAgICAgICAgICAgIHF1ZXJ5TWFuYWdlcjogdGhpcyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHRyYW5zZm9ybWVkT3B0aW9ucyxcbiAgICAgICAgICAgIHNob3VsZFN1YnNjcmliZTogc2hvdWxkU3Vic2NyaWJlLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQob3B0aW9ucy5xdWVyeSwgMTIpIDogaW52YXJpYW50KG9wdGlvbnMucXVlcnksICdxdWVyeSBvcHRpb24gaXMgcmVxdWlyZWQuIFlvdSBtdXN0IHNwZWNpZnkgeW91ciBHcmFwaFFMIGRvY3VtZW50ICcgK1xuICAgICAgICAgICAgJ2luIHRoZSBxdWVyeSBvcHRpb24uJyk7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChvcHRpb25zLnF1ZXJ5LmtpbmQgPT09ICdEb2N1bWVudCcsIDEzKSA6IGludmFyaWFudChvcHRpb25zLnF1ZXJ5LmtpbmQgPT09ICdEb2N1bWVudCcsICdZb3UgbXVzdCB3cmFwIHRoZSBxdWVyeSBzdHJpbmcgaW4gYSBcImdxbFwiIHRhZy4nKTtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KCFvcHRpb25zLnJldHVyblBhcnRpYWxEYXRhLCAxNCkgOiBpbnZhcmlhbnQoIW9wdGlvbnMucmV0dXJuUGFydGlhbERhdGEsICdyZXR1cm5QYXJ0aWFsRGF0YSBvcHRpb24gb25seSBzdXBwb3J0ZWQgb24gd2F0Y2hRdWVyeS4nKTtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KCFvcHRpb25zLnBvbGxJbnRlcnZhbCwgMTUpIDogaW52YXJpYW50KCFvcHRpb25zLnBvbGxJbnRlcnZhbCwgJ3BvbGxJbnRlcnZhbCBvcHRpb24gb25seSBzdXBwb3J0ZWQgb24gd2F0Y2hRdWVyeS4nKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciB3YXRjaGVkUXVlcnkgPSBfdGhpcy53YXRjaFF1ZXJ5KG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgICAgIF90aGlzLmZldGNoUXVlcnlSZWplY3RGbnMuc2V0KFwicXVlcnk6XCIgKyB3YXRjaGVkUXVlcnkucXVlcnlJZCwgcmVqZWN0KTtcbiAgICAgICAgICAgIHdhdGNoZWRRdWVyeVxuICAgICAgICAgICAgICAgIC5yZXN1bHQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmZldGNoUXVlcnlSZWplY3RGbnMuZGVsZXRlKFwicXVlcnk6XCIgKyB3YXRjaGVkUXVlcnkucXVlcnlJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdlbmVyYXRlUXVlcnlJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzLmlkQ291bnRlcisrKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RvcFF1ZXJ5SW5TdG9yZSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHRoaXMuc3RvcFF1ZXJ5SW5TdG9yZU5vQnJvYWRjYXN0KHF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RvcFF1ZXJ5SW5TdG9yZU5vQnJvYWRjYXN0ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgdGhpcy5zdG9wUG9sbGluZ1F1ZXJ5KHF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLnF1ZXJ5U3RvcmUuc3RvcFF1ZXJ5KHF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLmludmFsaWRhdGUocXVlcnlJZCk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmFkZFF1ZXJ5TGlzdGVuZXIgPSBmdW5jdGlvbiAocXVlcnlJZCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5zZXRRdWVyeShxdWVyeUlkLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBfYS5saXN0ZW5lcnM7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJldHVybiB7IGludmFsaWRhdGVkOiBmYWxzZSB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUudXBkYXRlUXVlcnlXYXRjaCA9IGZ1bmN0aW9uIChxdWVyeUlkLCBkb2N1bWVudCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY2FuY2VsID0gdGhpcy5nZXRRdWVyeShxdWVyeUlkKS5jYW5jZWw7XG4gICAgICAgIGlmIChjYW5jZWwpXG4gICAgICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgdmFyIHByZXZpb3VzUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlUXVlcnkgPSBfdGhpcy5nZXRRdWVyeShxdWVyeUlkKS5vYnNlcnZhYmxlUXVlcnk7XG4gICAgICAgICAgICBpZiAob2JzZXJ2YWJsZVF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3RSZXN1bHQgPSBvYnNlcnZhYmxlUXVlcnkuZ2V0TGFzdFJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzUmVzdWx0ID0gbGFzdFJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1Jlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVN0b3JlLmdldENhY2hlKCkud2F0Y2goe1xuICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBvcHRpb25zLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIG9wdGltaXN0aWM6IHRydWUsXG4gICAgICAgICAgICBwcmV2aW91c1Jlc3VsdDogcHJldmlvdXNSZXN1bHQsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKG5ld0RhdGEpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRRdWVyeShxdWVyeUlkLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoeyBpbnZhbGlkYXRlZDogdHJ1ZSwgbmV3RGF0YTogbmV3RGF0YSB9KTsgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuYWRkT2JzZXJ2YWJsZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIG9ic2VydmFibGVRdWVyeSkge1xuICAgICAgICB0aGlzLnNldFF1ZXJ5KHF1ZXJ5SWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7IG9ic2VydmFibGVRdWVyeTogb2JzZXJ2YWJsZVF1ZXJ5IH0pOyB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2YWJsZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgdmFyIGNhbmNlbCA9IHRoaXMuZ2V0UXVlcnkocXVlcnlJZCkuY2FuY2VsO1xuICAgICAgICB0aGlzLnNldFF1ZXJ5KHF1ZXJ5SWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7IG9ic2VydmFibGVRdWVyeTogbnVsbCB9KTsgfSk7XG4gICAgICAgIGlmIChjYW5jZWwpXG4gICAgICAgICAgICBjYW5jZWwoKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuY2xlYXJTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5mZXRjaFF1ZXJ5UmVqZWN0Rm5zLmZvckVhY2goZnVuY3Rpb24gKHJlamVjdCkge1xuICAgICAgICAgICAgcmVqZWN0KHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IG5ldyBJbnZhcmlhbnRFcnJvcigxNikgOiBuZXcgSW52YXJpYW50RXJyb3IoJ1N0b3JlIHJlc2V0IHdoaWxlIHF1ZXJ5IHdhcyBpbiBmbGlnaHQgKG5vdCBjb21wbGV0ZWQgaW4gbGluayBjaGFpbiknKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcmVzZXRJZHMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWVyaWVzLmZvckVhY2goZnVuY3Rpb24gKF9hLCBxdWVyeUlkKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5ID0gX2Eub2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICAgICAgaWYgKG9ic2VydmFibGVRdWVyeSlcbiAgICAgICAgICAgICAgICByZXNldElkcy5wdXNoKHF1ZXJ5SWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5xdWVyeVN0b3JlLnJlc2V0KHJlc2V0SWRzKTtcbiAgICAgICAgdGhpcy5tdXRhdGlvblN0b3JlLnJlc2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTdG9yZS5yZXNldCgpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5yZXNldFN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5jbGVhclN0b3JlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucmVGZXRjaE9ic2VydmFibGVRdWVyaWVzKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5yZUZldGNoT2JzZXJ2YWJsZVF1ZXJpZXMgPSBmdW5jdGlvbiAoaW5jbHVkZVN0YW5kYnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGluY2x1ZGVTdGFuZGJ5ID09PSB2b2lkIDApIHsgaW5jbHVkZVN0YW5kYnkgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5UHJvbWlzZXMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWVyaWVzLmZvckVhY2goZnVuY3Rpb24gKF9hLCBxdWVyeUlkKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5ID0gX2Eub2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICAgICAgaWYgKG9ic2VydmFibGVRdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciBmZXRjaFBvbGljeSA9IG9ic2VydmFibGVRdWVyeS5vcHRpb25zLmZldGNoUG9saWN5O1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGVRdWVyeS5yZXNldExhc3RSZXN1bHRzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGZldGNoUG9saWN5ICE9PSAnY2FjaGUtb25seScgJiZcbiAgICAgICAgICAgICAgICAgICAgKGluY2x1ZGVTdGFuZGJ5IHx8IGZldGNoUG9saWN5ICE9PSAnc3RhbmRieScpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGVRdWVyeVByb21pc2VzLnB1c2gob2JzZXJ2YWJsZVF1ZXJ5LnJlZmV0Y2goKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLnNldFF1ZXJ5KHF1ZXJ5SWQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7IG5ld0RhdGE6IG51bGwgfSk7IH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLmludmFsaWRhdGUocXVlcnlJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKG9ic2VydmFibGVRdWVyeVByb21pc2VzKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUub2JzZXJ2ZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIG9wdGlvbnMsIG9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMuYWRkUXVlcnlMaXN0ZW5lcihxdWVyeUlkLCB0aGlzLnF1ZXJ5TGlzdGVuZXJGb3JPYnNlcnZlcihxdWVyeUlkLCBvcHRpb25zLCBvYnNlcnZlcikpO1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaFF1ZXJ5KHF1ZXJ5SWQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zdGFydFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIG9wdGlvbnMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQud2FybihcIlRoZSBRdWVyeU1hbmFnZXIuc3RhcnRRdWVyeSBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZFwiKTtcbiAgICAgICAgdGhpcy5hZGRRdWVyeUxpc3RlbmVyKHF1ZXJ5SWQsIGxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5mZXRjaFF1ZXJ5KHF1ZXJ5SWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9KTtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5SWQ7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnN0YXJ0R3JhcGhRTFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcXVlcnkgPSBfYS5xdWVyeSwgZmV0Y2hQb2xpY3kgPSBfYS5mZXRjaFBvbGljeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICBxdWVyeSA9IHRoaXMudHJhbnNmb3JtKHF1ZXJ5KS5kb2N1bWVudDtcbiAgICAgICAgdmFyaWFibGVzID0gdGhpcy5nZXRWYXJpYWJsZXMocXVlcnksIHZhcmlhYmxlcyk7XG4gICAgICAgIHZhciBtYWtlT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICh2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRPYnNlcnZhYmxlRnJvbUxpbmsocXVlcnksIHt9LCB2YXJpYWJsZXMsIGZhbHNlKS5tYXAoZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmICghZmV0Y2hQb2xpY3kgfHwgZmV0Y2hQb2xpY3kgIT09ICduby1jYWNoZScpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGF0YVN0b3JlLm1hcmtTdWJzY3JpcHRpb25SZXN1bHQocmVzdWx0LCBxdWVyeSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYnJvYWRjYXN0UXVlcmllcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoUUxFcnJvcnM6IHJlc3VsdC5lcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybShxdWVyeSkuaGFzQ2xpZW50RXhwb3J0cykge1xuICAgICAgICAgICAgdmFyIG9ic2VydmFibGVQcm9taXNlXzEgPSB0aGlzLmxvY2FsU3RhdGUuYWRkRXhwb3J0ZWRWYXJpYWJsZXMocXVlcnksIHZhcmlhYmxlcykudGhlbihtYWtlT2JzZXJ2YWJsZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YiA9IG51bGw7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZVByb21pc2VfMS50aGVuKGZ1bmN0aW9uIChvYnNlcnZhYmxlKSB7IHJldHVybiBzdWIgPSBvYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZlcik7IH0sIG9ic2VydmVyLmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3ViICYmIHN1Yi51bnN1YnNjcmliZSgpOyB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ha2VPYnNlcnZhYmxlKHZhcmlhYmxlcyk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnN0b3BRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHRoaXMuc3RvcFF1ZXJ5Tm9Ccm9hZGNhc3QocXVlcnlJZCk7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0UXVlcmllcygpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zdG9wUXVlcnlOb0Jyb2FkY2FzdCA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHRoaXMuc3RvcFF1ZXJ5SW5TdG9yZU5vQnJvYWRjYXN0KHF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLnJlbW92ZVF1ZXJ5KHF1ZXJ5SWQpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHRoaXMuZmV0Y2hRdWVyeVJlamVjdEZucy5kZWxldGUoXCJxdWVyeTpcIiArIHF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLmZldGNoUXVlcnlSZWplY3RGbnMuZGVsZXRlKFwiZmV0Y2hSZXF1ZXN0OlwiICsgcXVlcnlJZCk7XG4gICAgICAgIHRoaXMuZ2V0UXVlcnkocXVlcnlJZCkuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgICAgICB0aGlzLnF1ZXJpZXMuZGVsZXRlKHF1ZXJ5SWQpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5nZXRDdXJyZW50UXVlcnlSZXN1bHQgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZVF1ZXJ5LCBvcHRpbWlzdGljKSB7XG4gICAgICAgIGlmIChvcHRpbWlzdGljID09PSB2b2lkIDApIHsgb3B0aW1pc3RpYyA9IHRydWU7IH1cbiAgICAgICAgdmFyIF9hID0gb2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgcXVlcnkgPSBfYS5xdWVyeSwgZmV0Y2hQb2xpY3kgPSBfYS5mZXRjaFBvbGljeSwgcmV0dXJuUGFydGlhbERhdGEgPSBfYS5yZXR1cm5QYXJ0aWFsRGF0YTtcbiAgICAgICAgdmFyIGxhc3RSZXN1bHQgPSBvYnNlcnZhYmxlUXVlcnkuZ2V0TGFzdFJlc3VsdCgpO1xuICAgICAgICB2YXIgbmV3RGF0YSA9IHRoaXMuZ2V0UXVlcnkob2JzZXJ2YWJsZVF1ZXJ5LnF1ZXJ5SWQpLm5ld0RhdGE7XG4gICAgICAgIGlmIChuZXdEYXRhICYmIG5ld0RhdGEuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG5ld0RhdGEucmVzdWx0LCBwYXJ0aWFsOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmZXRjaFBvbGljeSA9PT0gJ25vLWNhY2hlJyB8fCBmZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHVuZGVmaW5lZCwgcGFydGlhbDogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2IgPSB0aGlzLmRhdGFTdG9yZS5nZXRDYWNoZSgpLmRpZmYoe1xuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBwcmV2aW91c1Jlc3VsdDogbGFzdFJlc3VsdCA/IGxhc3RSZXN1bHQuZGF0YSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiB0cnVlLFxuICAgICAgICAgICAgb3B0aW1pc3RpYzogb3B0aW1pc3RpYyxcbiAgICAgICAgfSksIHJlc3VsdCA9IF9iLnJlc3VsdCwgY29tcGxldGUgPSBfYi5jb21wbGV0ZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IChjb21wbGV0ZSB8fCByZXR1cm5QYXJ0aWFsRGF0YSkgPyByZXN1bHQgOiB2b2lkIDAsXG4gICAgICAgICAgICBwYXJ0aWFsOiAhY29tcGxldGUsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldFF1ZXJ5V2l0aFByZXZpb3VzUmVzdWx0ID0gZnVuY3Rpb24gKHF1ZXJ5SWRPck9ic2VydmFibGUpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGVRdWVyeTtcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeUlkT3JPYnNlcnZhYmxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIGZvdW5kT2JzZXJ2ZWFibGVRdWVyeSA9IHRoaXMuZ2V0UXVlcnkocXVlcnlJZE9yT2JzZXJ2YWJsZSkub2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZvdW5kT2JzZXJ2ZWFibGVRdWVyeSwgMTcpIDogaW52YXJpYW50KGZvdW5kT2JzZXJ2ZWFibGVRdWVyeSwgXCJPYnNlcnZhYmxlUXVlcnkgd2l0aCB0aGlzIGlkIGRvZXNuJ3QgZXhpc3Q6IFwiICsgcXVlcnlJZE9yT2JzZXJ2YWJsZSk7XG4gICAgICAgICAgICBvYnNlcnZhYmxlUXVlcnkgPSBmb3VuZE9ic2VydmVhYmxlUXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlUXVlcnkgPSBxdWVyeUlkT3JPYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IG9ic2VydmFibGVRdWVyeS5vcHRpb25zLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIHF1ZXJ5ID0gX2EucXVlcnk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmV2aW91c1Jlc3VsdDogdGhpcy5nZXRDdXJyZW50UXVlcnlSZXN1bHQob2JzZXJ2YWJsZVF1ZXJ5LCBmYWxzZSkuZGF0YSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LFxuICAgICAgICB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5icm9hZGNhc3RRdWVyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLm9uQnJvYWRjYXN0KCk7XG4gICAgICAgIHRoaXMucXVlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvLCBpZCkge1xuICAgICAgICAgICAgaWYgKGluZm8uaW52YWxpZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICBpbmZvLmxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKF90aGlzLnF1ZXJ5U3RvcmUuZ2V0KGlkKSwgaW5mby5uZXdEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0TG9jYWxTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxTdGF0ZTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0T2JzZXJ2YWJsZUZyb21MaW5rID0gZnVuY3Rpb24gKHF1ZXJ5LCBjb250ZXh0LCB2YXJpYWJsZXMsIGRlZHVwbGljYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGRlZHVwbGljYXRpb24gPT09IHZvaWQgMCkgeyBkZWR1cGxpY2F0aW9uID0gdGhpcy5xdWVyeURlZHVwbGljYXRpb247IH1cbiAgICAgICAgdmFyIG9ic2VydmFibGU7XG4gICAgICAgIHZhciBzZXJ2ZXJRdWVyeSA9IHRoaXMudHJhbnNmb3JtKHF1ZXJ5KS5zZXJ2ZXJRdWVyeTtcbiAgICAgICAgaWYgKHNlcnZlclF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLCBpbkZsaWdodExpbmtPYnNlcnZhYmxlc18xID0gX2EuaW5GbGlnaHRMaW5rT2JzZXJ2YWJsZXMsIGxpbmsgPSBfYS5saW5rO1xuICAgICAgICAgICAgdmFyIG9wZXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBxdWVyeTogc2VydmVyUXVlcnksXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZShzZXJ2ZXJRdWVyeSkgfHwgdm9pZCAwLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHRoaXMucHJlcGFyZUNvbnRleHQoX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbnRleHQpLCB7IGZvcmNlRmV0Y2g6ICFkZWR1cGxpY2F0aW9uIH0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb250ZXh0ID0gb3BlcmF0aW9uLmNvbnRleHQ7XG4gICAgICAgICAgICBpZiAoZGVkdXBsaWNhdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBieVZhcmlhYmxlc18xID0gaW5GbGlnaHRMaW5rT2JzZXJ2YWJsZXNfMS5nZXQoc2VydmVyUXVlcnkpIHx8IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBpbkZsaWdodExpbmtPYnNlcnZhYmxlc18xLnNldChzZXJ2ZXJRdWVyeSwgYnlWYXJpYWJsZXNfMSk7XG4gICAgICAgICAgICAgICAgdmFyIHZhckpzb25fMSA9IEpTT04uc3RyaW5naWZ5KHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IGJ5VmFyaWFibGVzXzEuZ2V0KHZhckpzb25fMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFvYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5VmFyaWFibGVzXzEuc2V0KHZhckpzb25fMSwgb2JzZXJ2YWJsZSA9IG11bHRpcGxleChleGVjdXRlKGxpbmssIG9wZXJhdGlvbikpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBieVZhcmlhYmxlc18xLmRlbGV0ZSh2YXJKc29uXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFieVZhcmlhYmxlc18xLnNpemUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5GbGlnaHRMaW5rT2JzZXJ2YWJsZXNfMS5kZWxldGUoc2VydmVyUXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW51cFN1Yl8xLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGVhbnVwU3ViXzEgPSBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBjbGVhbnVwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGNsZWFudXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogY2xlYW51cCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IG11bHRpcGxleChleGVjdXRlKGxpbmssIG9wZXJhdGlvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IE9ic2VydmFibGUub2YoeyBkYXRhOiB7fSB9KTtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLnByZXBhcmVDb250ZXh0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbGllbnRRdWVyeSA9IHRoaXMudHJhbnNmb3JtKHF1ZXJ5KS5jbGllbnRRdWVyeTtcbiAgICAgICAgaWYgKGNsaWVudFF1ZXJ5KSB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlID0gYXN5bmNNYXAob2JzZXJ2YWJsZSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5sb2NhbFN0YXRlLnJ1blJlc29sdmVycyh7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBjbGllbnRRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3RlUmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmZldGNoUmVxdWVzdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gX2EucmVxdWVzdElkLCBxdWVyeUlkID0gX2EucXVlcnlJZCwgZG9jdW1lbnQgPSBfYS5kb2N1bWVudCwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIGZldGNoTW9yZUZvclF1ZXJ5SWQgPSBfYS5mZXRjaE1vcmVGb3JRdWVyeUlkO1xuICAgICAgICB2YXIgdmFyaWFibGVzID0gb3B0aW9ucy52YXJpYWJsZXMsIF9iID0gb3B0aW9ucy5lcnJvclBvbGljeSwgZXJyb3JQb2xpY3kgPSBfYiA9PT0gdm9pZCAwID8gJ25vbmUnIDogX2IsIGZldGNoUG9saWN5ID0gb3B0aW9ucy5mZXRjaFBvbGljeTtcbiAgICAgICAgdmFyIHJlc3VsdEZyb21TdG9yZTtcbiAgICAgICAgdmFyIGVycm9yc0Zyb21TdG9yZTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlID0gX3RoaXMuZ2V0T2JzZXJ2YWJsZUZyb21MaW5rKGRvY3VtZW50LCBvcHRpb25zLmNvbnRleHQsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICB2YXIgZnFyZklkID0gXCJmZXRjaFJlcXVlc3Q6XCIgKyBxdWVyeUlkO1xuICAgICAgICAgICAgX3RoaXMuZmV0Y2hRdWVyeVJlamVjdEZucy5zZXQoZnFyZklkLCByZWplY3QpO1xuICAgICAgICAgICAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZmV0Y2hRdWVyeVJlamVjdEZucy5kZWxldGUoZnFyZklkKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRRdWVyeShxdWVyeUlkLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBfYS5zdWJzY3JpcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zLmRlbGV0ZShzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLm1hcChmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCA+PSBfdGhpcy5nZXRRdWVyeShxdWVyeUlkKS5sYXN0UmVxdWVzdElkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1hcmtRdWVyeVJlc3VsdChxdWVyeUlkLCByZXN1bHQsIG9wdGlvbnMsIGZldGNoTW9yZUZvclF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5xdWVyeVN0b3JlLm1hcmtRdWVyeVJlc3VsdChxdWVyeUlkLCByZXN1bHQsIGZldGNoTW9yZUZvclF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkYXRlKHF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkYXRlKGZldGNoTW9yZUZvclF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5icm9hZGNhc3RRdWVyaWVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlcnJvclBvbGljeSA9PT0gJ25vbmUnICYmIGlzTm9uRW1wdHlBcnJheShyZXN1bHQuZXJyb3JzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBBcG9sbG9FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaFFMRXJyb3JzOiByZXN1bHQuZXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlcnJvclBvbGljeSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzRnJvbVN0b3JlID0gcmVzdWx0LmVycm9ycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZldGNoTW9yZUZvclF1ZXJ5SWQgfHwgZmV0Y2hQb2xpY3kgPT09ICduby1jYWNoZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0RnJvbVN0b3JlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBfdGhpcy5kYXRhU3RvcmUuZ2V0Q2FjaGUoKS5kaWZmKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1pc3RpYzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5QYXJ0aWFsRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSksIHJlc3VsdF8xID0gX2EucmVzdWx0LCBjb21wbGV0ZSA9IF9hLmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUgfHwgb3B0aW9ucy5yZXR1cm5QYXJ0aWFsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RnJvbVN0b3JlID0gcmVzdWx0XzE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdEZyb21TdG9yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yczogZXJyb3JzRnJvbVN0b3JlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrU3RhdHVzOiBOZXR3b3JrU3RhdHVzLnJlYWR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5zZXRRdWVyeShxdWVyeUlkLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IF9hLnN1YnNjcmlwdGlvbnM7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5hZGQoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0UXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMucXVlcmllcy5nZXQocXVlcnlJZCkgfHwge1xuICAgICAgICAgICAgbGlzdGVuZXJzOiBuZXcgU2V0KCksXG4gICAgICAgICAgICBpbnZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkb2N1bWVudDogbnVsbCxcbiAgICAgICAgICAgIG5ld0RhdGE6IG51bGwsXG4gICAgICAgICAgICBsYXN0UmVxdWVzdElkOiAxLFxuICAgICAgICAgICAgb2JzZXJ2YWJsZVF1ZXJ5OiBudWxsLFxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uczogbmV3IFNldCgpLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc2V0UXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgdXBkYXRlcikge1xuICAgICAgICB2YXIgcHJldiA9IHRoaXMuZ2V0UXVlcnkocXVlcnlJZCk7XG4gICAgICAgIHZhciBuZXdJbmZvID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXYpLCB1cGRhdGVyKHByZXYpKTtcbiAgICAgICAgdGhpcy5xdWVyaWVzLnNldChxdWVyeUlkLCBuZXdJbmZvKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uIChxdWVyeUlkLCBpbnZhbGlkYXRlZCkge1xuICAgICAgICBpZiAoaW52YWxpZGF0ZWQgPT09IHZvaWQgMCkgeyBpbnZhbGlkYXRlZCA9IHRydWU7IH1cbiAgICAgICAgaWYgKHF1ZXJ5SWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UXVlcnkocXVlcnlJZCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKHsgaW52YWxpZGF0ZWQ6IGludmFsaWRhdGVkIH0pOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHsgY29udGV4dCA9IHt9OyB9XG4gICAgICAgIHZhciBuZXdDb250ZXh0ID0gdGhpcy5sb2NhbFN0YXRlLnByZXBhcmVDb250ZXh0KGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIG5ld0NvbnRleHQpLCB7IGNsaWVudEF3YXJlbmVzczogdGhpcy5jbGllbnRBd2FyZW5lc3MgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmNoZWNrSW5GbGlnaHQgPSBmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5U3RvcmUuZ2V0KHF1ZXJ5SWQpO1xuICAgICAgICByZXR1cm4gKHF1ZXJ5ICYmXG4gICAgICAgICAgICBxdWVyeS5uZXR3b3JrU3RhdHVzICE9PSBOZXR3b3JrU3RhdHVzLnJlYWR5ICYmXG4gICAgICAgICAgICBxdWVyeS5uZXR3b3JrU3RhdHVzICE9PSBOZXR3b3JrU3RhdHVzLmVycm9yKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RhcnRQb2xsaW5nUXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucywgcXVlcnlJZCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHBvbGxJbnRlcnZhbCA9IG9wdGlvbnMucG9sbEludGVydmFsO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQocG9sbEludGVydmFsLCAxOCkgOiBpbnZhcmlhbnQocG9sbEludGVydmFsLCAnQXR0ZW1wdGVkIHRvIHN0YXJ0IGEgcG9sbGluZyBxdWVyeSB3aXRob3V0IGEgcG9sbGluZyBpbnRlcnZhbC4nKTtcbiAgICAgICAgaWYgKCF0aGlzLnNzck1vZGUpIHtcbiAgICAgICAgICAgIHZhciBpbmZvID0gdGhpcy5wb2xsaW5nSW5mb0J5UXVlcnlJZC5nZXQocXVlcnlJZCk7XG4gICAgICAgICAgICBpZiAoIWluZm8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbGxpbmdJbmZvQnlRdWVyeUlkLnNldChxdWVyeUlkLCAoaW5mbyA9IHt9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmZvLmludGVydmFsID0gcG9sbEludGVydmFsO1xuICAgICAgICAgICAgaW5mby5vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyB9KTtcbiAgICAgICAgICAgIHZhciBtYXliZUZldGNoXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSBfdGhpcy5wb2xsaW5nSW5mb0J5UXVlcnlJZC5nZXQocXVlcnlJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmNoZWNrSW5GbGlnaHQocXVlcnlJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxfMSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmV0Y2hRdWVyeShxdWVyeUlkLCBpbmZvLm9wdGlvbnMsIEZldGNoVHlwZS5wb2xsKS50aGVuKHBvbGxfMSwgcG9sbF8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcG9sbF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gX3RoaXMucG9sbGluZ0luZm9CeVF1ZXJ5SWQuZ2V0KHF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChpbmZvLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnRpbWVvdXQgPSBzZXRUaW1lb3V0KG1heWJlRmV0Y2hfMSwgaW5mby5pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUXVlcnlMaXN0ZW5lcihxdWVyeUlkLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb2xsXzEoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnlJZDtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RvcFBvbGxpbmdRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHRoaXMucG9sbGluZ0luZm9CeVF1ZXJ5SWQuZGVsZXRlKHF1ZXJ5SWQpO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXJ5TWFuYWdlcjtcbn0oKSk7XG5cbnZhciBEYXRhU3RvcmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGFTdG9yZShpbml0aWFsQ2FjaGUpIHtcbiAgICAgICAgdGhpcy5jYWNoZSA9IGluaXRpYWxDYWNoZTtcbiAgICB9XG4gICAgRGF0YVN0b3JlLnByb3RvdHlwZS5nZXRDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGU7XG4gICAgfTtcbiAgICBEYXRhU3RvcmUucHJvdG90eXBlLm1hcmtRdWVyeVJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQsIGRvY3VtZW50LCB2YXJpYWJsZXMsIGZldGNoTW9yZUZvclF1ZXJ5SWQsIGlnbm9yZUVycm9ycykge1xuICAgICAgICBpZiAoaWdub3JlRXJyb3JzID09PSB2b2lkIDApIHsgaWdub3JlRXJyb3JzID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIHdyaXRlV2l0aEVycm9ycyA9ICFncmFwaFFMUmVzdWx0SGFzRXJyb3IocmVzdWx0KTtcbiAgICAgICAgaWYgKGlnbm9yZUVycm9ycyAmJiBncmFwaFFMUmVzdWx0SGFzRXJyb3IocmVzdWx0KSAmJiByZXN1bHQuZGF0YSkge1xuICAgICAgICAgICAgd3JpdGVXaXRoRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZldGNoTW9yZUZvclF1ZXJ5SWQgJiYgd3JpdGVXaXRoRXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLndyaXRlKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdC5kYXRhLFxuICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRhU3RvcmUucHJvdG90eXBlLm1hcmtTdWJzY3JpcHRpb25SZXN1bHQgPSBmdW5jdGlvbiAocmVzdWx0LCBkb2N1bWVudCwgdmFyaWFibGVzKSB7XG4gICAgICAgIGlmICghZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUud3JpdGUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgZGF0YUlkOiAnUk9PVF9TVUJTQ1JJUFRJT04nLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRhU3RvcmUucHJvdG90eXBlLm1hcmtNdXRhdGlvbkluaXQgPSBmdW5jdGlvbiAobXV0YXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKG11dGF0aW9uLm9wdGltaXN0aWNSZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIG9wdGltaXN0aWNfMTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbXV0YXRpb24ub3B0aW1pc3RpY1Jlc3BvbnNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb3B0aW1pc3RpY18xID0gbXV0YXRpb24ub3B0aW1pc3RpY1Jlc3BvbnNlKG11dGF0aW9uLnZhcmlhYmxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRpbWlzdGljXzEgPSBtdXRhdGlvbi5vcHRpbWlzdGljUmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnJlY29yZE9wdGltaXN0aWNUcmFuc2FjdGlvbihmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHZhciBvcmlnID0gX3RoaXMuY2FjaGU7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2FjaGUgPSBjO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1hcmtNdXRhdGlvblJlc3VsdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbklkOiBtdXRhdGlvbi5tdXRhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB7IGRhdGE6IG9wdGltaXN0aWNfMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IG11dGF0aW9uLmRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiBtdXRhdGlvbi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVRdWVyaWVzOiBtdXRhdGlvbi51cGRhdGVRdWVyaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiBtdXRhdGlvbi51cGRhdGUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2FjaGUgPSBvcmlnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG11dGF0aW9uLm11dGF0aW9uSWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRhU3RvcmUucHJvdG90eXBlLm1hcmtNdXRhdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIWdyYXBoUUxSZXN1bHRIYXNFcnJvcihtdXRhdGlvbi5yZXN1bHQpKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVXcml0ZXNfMSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbXV0YXRpb24ucmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfTVVUQVRJT04nLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogbXV0YXRpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogbXV0YXRpb24udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgdmFyIHVwZGF0ZVF1ZXJpZXNfMSA9IG11dGF0aW9uLnVwZGF0ZVF1ZXJpZXM7XG4gICAgICAgICAgICBpZiAodXBkYXRlUXVlcmllc18xKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModXBkYXRlUXVlcmllc18xKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSB1cGRhdGVRdWVyaWVzXzFbaWRdLCBxdWVyeSA9IF9hLnF1ZXJ5LCB1cGRhdGVyID0gX2EudXBkYXRlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9iID0gX3RoaXMuY2FjaGUuZGlmZih7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkuZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHF1ZXJ5LnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1pc3RpYzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pLCBjdXJyZW50UXVlcnlSZXN1bHQgPSBfYi5yZXN1bHQsIGNvbXBsZXRlID0gX2IuY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRRdWVyeVJlc3VsdCA9IHRyeUZ1bmN0aW9uT3JMb2dFcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZXIoY3VycmVudFF1ZXJ5UmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uUmVzdWx0OiBtdXRhdGlvbi5yZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogZ2V0T3BlcmF0aW9uTmFtZShxdWVyeS5kb2N1bWVudCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVZhcmlhYmxlczogcXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFF1ZXJ5UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXcml0ZXNfMS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBuZXh0UXVlcnlSZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkuZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnBlcmZvcm1UcmFuc2FjdGlvbihmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGNhY2hlV3JpdGVzXzEuZm9yRWFjaChmdW5jdGlvbiAod3JpdGUpIHsgcmV0dXJuIGMud3JpdGUod3JpdGUpOyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlID0gbXV0YXRpb24udXBkYXRlO1xuICAgICAgICAgICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5RnVuY3Rpb25PckxvZ0Vycm9yKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVwZGF0ZShjLCBtdXRhdGlvbi5yZXN1bHQpOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGF0YVN0b3JlLnByb3RvdHlwZS5tYXJrTXV0YXRpb25Db21wbGV0ZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgbXV0YXRpb25JZCA9IF9hLm11dGF0aW9uSWQsIG9wdGltaXN0aWNSZXNwb25zZSA9IF9hLm9wdGltaXN0aWNSZXNwb25zZTtcbiAgICAgICAgaWYgKG9wdGltaXN0aWNSZXNwb25zZSkge1xuICAgICAgICAgICAgdGhpcy5jYWNoZS5yZW1vdmVPcHRpbWlzdGljKG11dGF0aW9uSWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEYXRhU3RvcmUucHJvdG90eXBlLm1hcmtVcGRhdGVRdWVyeVJlc3VsdCA9IGZ1bmN0aW9uIChkb2N1bWVudCwgdmFyaWFibGVzLCBuZXdSZXN1bHQpIHtcbiAgICAgICAgdGhpcy5jYWNoZS53cml0ZSh7XG4gICAgICAgICAgICByZXN1bHQ6IG5ld1Jlc3VsdCxcbiAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBxdWVyeTogZG9jdW1lbnQsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0YVN0b3JlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUucmVzZXQoKTtcbiAgICB9O1xuICAgIHJldHVybiBEYXRhU3RvcmU7XG59KCkpO1xuXG52YXIgdmVyc2lvbiA9IFwiMi42LjEwXCI7XG5cbnZhciBoYXNTdWdnZXN0ZWREZXZ0b29scyA9IGZhbHNlO1xudmFyIEFwb2xsb0NsaWVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBvbGxvQ2xpZW50KG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLnJlc2V0U3RvcmVDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy5jbGVhclN0b3JlQ2FsbGJhY2tzID0gW107XG4gICAgICAgIHZhciBjYWNoZSA9IG9wdGlvbnMuY2FjaGUsIF9hID0gb3B0aW9ucy5zc3JNb2RlLCBzc3JNb2RlID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2EsIF9iID0gb3B0aW9ucy5zc3JGb3JjZUZldGNoRGVsYXksIHNzckZvcmNlRmV0Y2hEZWxheSA9IF9iID09PSB2b2lkIDAgPyAwIDogX2IsIGNvbm5lY3RUb0RldlRvb2xzID0gb3B0aW9ucy5jb25uZWN0VG9EZXZUb29scywgX2MgPSBvcHRpb25zLnF1ZXJ5RGVkdXBsaWNhdGlvbiwgcXVlcnlEZWR1cGxpY2F0aW9uID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgZGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zLCBfZCA9IG9wdGlvbnMuYXNzdW1lSW1tdXRhYmxlUmVzdWx0cywgYXNzdW1lSW1tdXRhYmxlUmVzdWx0cyA9IF9kID09PSB2b2lkIDAgPyBmYWxzZSA6IF9kLCByZXNvbHZlcnMgPSBvcHRpb25zLnJlc29sdmVycywgdHlwZURlZnMgPSBvcHRpb25zLnR5cGVEZWZzLCBmcmFnbWVudE1hdGNoZXIgPSBvcHRpb25zLmZyYWdtZW50TWF0Y2hlciwgY2xpZW50QXdhcmVuZXNzTmFtZSA9IG9wdGlvbnMubmFtZSwgY2xpZW50QXdhcmVuZXNzVmVyc2lvbiA9IG9wdGlvbnMudmVyc2lvbjtcbiAgICAgICAgdmFyIGxpbmsgPSBvcHRpb25zLmxpbms7XG4gICAgICAgIGlmICghbGluayAmJiByZXNvbHZlcnMpIHtcbiAgICAgICAgICAgIGxpbmsgPSBBcG9sbG9MaW5rLmVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFsaW5rIHx8ICFjYWNoZSkge1xuICAgICAgICAgICAgdGhyb3cgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gbmV3IEludmFyaWFudEVycm9yKDQpIDogbmV3IEludmFyaWFudEVycm9yKFwiSW4gb3JkZXIgdG8gaW5pdGlhbGl6ZSBBcG9sbG8gQ2xpZW50LCB5b3UgbXVzdCBzcGVjaWZ5ICdsaW5rJyBhbmQgJ2NhY2hlJyBwcm9wZXJ0aWVzIGluIHRoZSBvcHRpb25zIG9iamVjdC5cXG5cIiArXG4gICAgICAgICAgICAgICAgXCJUaGVzZSBvcHRpb25zIGFyZSBwYXJ0IG9mIHRoZSB1cGdyYWRlIHJlcXVpcmVtZW50cyB3aGVuIG1pZ3JhdGluZyBmcm9tIEFwb2xsbyBDbGllbnQgMS54IHRvIEFwb2xsbyBDbGllbnQgMi54LlxcblwiICtcbiAgICAgICAgICAgICAgICBcIkZvciBtb3JlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlzaXQ6IGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvdHV0b3JpYWwvY2xpZW50Lmh0bWwjYXBvbGxvLWNsaWVudC1zZXR1cFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpbmsgPSBsaW5rO1xuICAgICAgICB0aGlzLmNhY2hlID0gY2FjaGU7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBuZXcgRGF0YVN0b3JlKGNhY2hlKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlTmV0d29ya0ZldGNoZXMgPSBzc3JNb2RlIHx8IHNzckZvcmNlRmV0Y2hEZWxheSA+IDA7XG4gICAgICAgIHRoaXMucXVlcnlEZWR1cGxpY2F0aW9uID0gcXVlcnlEZWR1cGxpY2F0aW9uO1xuICAgICAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gZGVmYXVsdE9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMudHlwZURlZnMgPSB0eXBlRGVmcztcbiAgICAgICAgaWYgKHNzckZvcmNlRmV0Y2hEZWxheSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiAoX3RoaXMuZGlzYWJsZU5ldHdvcmtGZXRjaGVzID0gZmFsc2UpOyB9LCBzc3JGb3JjZUZldGNoRGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2F0Y2hRdWVyeSA9IHRoaXMud2F0Y2hRdWVyeS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm11dGF0ZSA9IHRoaXMubXV0YXRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzZXRTdG9yZSA9IHRoaXMucmVzZXRTdG9yZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlRmV0Y2hPYnNlcnZhYmxlUXVlcmllcyA9IHRoaXMucmVGZXRjaE9ic2VydmFibGVRdWVyaWVzLmJpbmQodGhpcyk7XG4gICAgICAgIHZhciBkZWZhdWx0Q29ubmVjdFRvRGV2VG9vbHMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgIXdpbmRvdy5fX0FQT0xMT19DTElFTlRfXztcbiAgICAgICAgaWYgKHR5cGVvZiBjb25uZWN0VG9EZXZUb29scyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gZGVmYXVsdENvbm5lY3RUb0RldlRvb2xzXG4gICAgICAgICAgICA6IGNvbm5lY3RUb0RldlRvb2xzICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB3aW5kb3cuX19BUE9MTE9fQ0xJRU5UX18gPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzU3VnZ2VzdGVkRGV2dG9vbHMgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaGFzU3VnZ2VzdGVkRGV2dG9vbHMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50ICYmXG4gICAgICAgICAgICAgICAgd2luZG93LnRvcCA9PT0gd2luZG93LnNlbGYpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX0FQT0xMT19ERVZUT09MU19HTE9CQUxfSE9PS19fID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0Rvd25sb2FkIHRoZSBBcG9sbG8gRGV2VG9vbHMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvciBhIGJldHRlciBkZXZlbG9wbWVudCBleHBlcmllbmNlOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9jaHJvbWUuZ29vZ2xlLmNvbS93ZWJzdG9yZS9kZXRhaWwvYXBvbGxvLWNsaWVudC1kZXZlbG9wZXItdC9qZGtrbmtrYmViYmFwaWxnb2VjY2NpZ2xrZmJtYm5mbScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMubG9jYWxTdGF0ZSA9IG5ldyBMb2NhbFN0YXRlKHtcbiAgICAgICAgICAgIGNhY2hlOiBjYWNoZSxcbiAgICAgICAgICAgIGNsaWVudDogdGhpcyxcbiAgICAgICAgICAgIHJlc29sdmVyczogcmVzb2x2ZXJzLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiBmcmFnbWVudE1hdGNoZXIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlciA9IG5ldyBRdWVyeU1hbmFnZXIoe1xuICAgICAgICAgICAgbGluazogdGhpcy5saW5rLFxuICAgICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgICAgICBxdWVyeURlZHVwbGljYXRpb246IHF1ZXJ5RGVkdXBsaWNhdGlvbixcbiAgICAgICAgICAgIHNzck1vZGU6IHNzck1vZGUsXG4gICAgICAgICAgICBjbGllbnRBd2FyZW5lc3M6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBjbGllbnRBd2FyZW5lc3NOYW1lLFxuICAgICAgICAgICAgICAgIHZlcnNpb246IGNsaWVudEF3YXJlbmVzc1ZlcnNpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9jYWxTdGF0ZTogdGhpcy5sb2NhbFN0YXRlLFxuICAgICAgICAgICAgYXNzdW1lSW1tdXRhYmxlUmVzdWx0czogYXNzdW1lSW1tdXRhYmxlUmVzdWx0cyxcbiAgICAgICAgICAgIG9uQnJvYWRjYXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmRldlRvb2xzSG9va0NiKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmRldlRvb2xzSG9va0NiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJpZXM6IF90aGlzLnF1ZXJ5TWFuYWdlci5xdWVyeVN0b3JlLmdldFN0b3JlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25zOiBfdGhpcy5xdWVyeU1hbmFnZXIubXV0YXRpb25TdG9yZS5nZXRTdG9yZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHM6IF90aGlzLmNhY2hlLmV4dHJhY3QodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyLnN0b3AoKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUud2F0Y2hRdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRPcHRpb25zLndhdGNoUXVlcnkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucy53YXRjaFF1ZXJ5KSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZU5ldHdvcmtGZXRjaGVzICYmXG4gICAgICAgICAgICAob3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScgfHxcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtYW5kLW5ldHdvcmsnKSkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBmZXRjaFBvbGljeTogJ2NhY2hlLWZpcnN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIud2F0Y2hRdWVyeShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5kZWZhdWx0T3B0aW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLnF1ZXJ5KSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KG9wdGlvbnMuZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1hbmQtbmV0d29yaycsIDUpIDogaW52YXJpYW50KG9wdGlvbnMuZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1hbmQtbmV0d29yaycsICdUaGUgY2FjaGUtYW5kLW5ldHdvcmsgZmV0Y2hQb2xpY3kgZG9lcyBub3Qgd29yayB3aXRoIGNsaWVudC5xdWVyeSwgYmVjYXVzZSAnICtcbiAgICAgICAgICAgICdjbGllbnQucXVlcnkgY2FuIG9ubHkgcmV0dXJuIGEgc2luZ2xlIHJlc3VsdC4gUGxlYXNlIHVzZSBjbGllbnQud2F0Y2hRdWVyeSAnICtcbiAgICAgICAgICAgICd0byByZWNlaXZlIG11bHRpcGxlIHJlc3VsdHMgZnJvbSB0aGUgY2FjaGUgYW5kIHRoZSBuZXR3b3JrLCBvciBjb25zaWRlciAnICtcbiAgICAgICAgICAgICd1c2luZyBhIGRpZmZlcmVudCBmZXRjaFBvbGljeSwgc3VjaCBhcyBjYWNoZS1maXJzdCBvciBuZXR3b3JrLW9ubHkuJyk7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVOZXR3b3JrRmV0Y2hlcyAmJiBvcHRpb25zLmZldGNoUG9saWN5ID09PSAnbmV0d29yay1vbmx5Jykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBmZXRjaFBvbGljeTogJ2NhY2hlLWZpcnN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIucXVlcnkob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLm11dGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRPcHRpb25zLm11dGF0ZSkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLm11dGF0ZSksIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5tdXRhdGUob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5zdGFydEdyYXBoUUxTdWJzY3JpcHRpb24ob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnJlYWRRdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zLCBvcHRpbWlzdGljKSB7XG4gICAgICAgIGlmIChvcHRpbWlzdGljID09PSB2b2lkIDApIHsgb3B0aW1pc3RpYyA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlLnJlYWRRdWVyeShvcHRpb25zLCBvcHRpbWlzdGljKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVhZEZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMsIG9wdGltaXN0aWMpIHtcbiAgICAgICAgaWYgKG9wdGltaXN0aWMgPT09IHZvaWQgMCkgeyBvcHRpbWlzdGljID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUucmVhZEZyYWdtZW50KG9wdGlvbnMsIG9wdGltaXN0aWMpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53cml0ZVF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2FjaGUud3JpdGVRdWVyeShvcHRpb25zKTtcbiAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuYnJvYWRjYXN0UXVlcmllcygpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53cml0ZUZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY2FjaGUud3JpdGVGcmFnbWVudChvcHRpb25zKTtcbiAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuYnJvYWRjYXN0UXVlcmllcygpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53cml0ZURhdGEgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jYWNoZS53cml0ZURhdGEob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuX19hY3Rpb25Ib29rRm9yRGV2VG9vbHMgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5kZXZUb29sc0hvb2tDYiA9IGNiO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5fX3JlcXVlc3RSYXcgPSBmdW5jdGlvbiAocGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZSh0aGlzLmxpbmssIHBheWxvYWQpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5pbml0UXVlcnlNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgfHwgaW52YXJpYW50Lndhcm4oJ0NhbGxpbmcgdGhlIGluaXRRdWVyeU1hbmFnZXIgbWV0aG9kIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksICcgK1xuICAgICAgICAgICAgJ2FuZCBpdCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBBcG9sbG9DbGllbnQgaW4gdmVyc2lvbiAzLjAuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlcjtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVzZXRTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5xdWVyeU1hbmFnZXIuY2xlYXJTdG9yZSgpOyB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZS5hbGwoX3RoaXMucmVzZXRTdG9yZUNhbGxiYWNrcy5tYXAoZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbigpOyB9KSk7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5yZUZldGNoT2JzZXJ2YWJsZVF1ZXJpZXMoKTsgfSk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLmNsZWFyU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMucXVlcnlNYW5hZ2VyLmNsZWFyU3RvcmUoKTsgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UuYWxsKF90aGlzLmNsZWFyU3RvcmVDYWxsYmFja3MubWFwKGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4oKTsgfSkpOyB9KTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUub25SZXNldFN0b3JlID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucmVzZXRTdG9yZUNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnJlc2V0U3RvcmVDYWxsYmFja3MgPSBfdGhpcy5yZXNldFN0b3JlQ2FsbGJhY2tzLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYyAhPT0gY2I7IH0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5vbkNsZWFyU3RvcmUgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5jbGVhclN0b3JlQ2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuY2xlYXJTdG9yZUNhbGxiYWNrcyA9IF90aGlzLmNsZWFyU3RvcmVDYWxsYmFja3MuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjICE9PSBjYjsgfSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnJlRmV0Y2hPYnNlcnZhYmxlUXVlcmllcyA9IGZ1bmN0aW9uIChpbmNsdWRlU3RhbmRieSkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIucmVGZXRjaE9ic2VydmFibGVRdWVyaWVzKGluY2x1ZGVTdGFuZGJ5KTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuZXh0cmFjdCA9IGZ1bmN0aW9uIChvcHRpbWlzdGljKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlLmV4dHJhY3Qob3B0aW1pc3RpYyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoc2VyaWFsaXplZFN0YXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlLnJlc3RvcmUoc2VyaWFsaXplZFN0YXRlKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuYWRkUmVzb2x2ZXJzID0gZnVuY3Rpb24gKHJlc29sdmVycykge1xuICAgICAgICB0aGlzLmxvY2FsU3RhdGUuYWRkUmVzb2x2ZXJzKHJlc29sdmVycyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnNldFJlc29sdmVycyA9IGZ1bmN0aW9uIChyZXNvbHZlcnMpIHtcbiAgICAgICAgdGhpcy5sb2NhbFN0YXRlLnNldFJlc29sdmVycyhyZXNvbHZlcnMpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5nZXRSZXNvbHZlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsU3RhdGUuZ2V0UmVzb2x2ZXJzKCk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnNldExvY2FsU3RhdGVGcmFnbWVudE1hdGNoZXIgPSBmdW5jdGlvbiAoZnJhZ21lbnRNYXRjaGVyKSB7XG4gICAgICAgIHRoaXMubG9jYWxTdGF0ZS5zZXRGcmFnbWVudE1hdGNoZXIoZnJhZ21lbnRNYXRjaGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBBcG9sbG9DbGllbnQ7XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBBcG9sbG9DbGllbnQ7XG5leHBvcnQgeyBBcG9sbG9DbGllbnQsIEFwb2xsb0Vycm9yLCBGZXRjaFR5cGUsIE5ldHdvcmtTdGF0dXMsIE9ic2VydmFibGVRdWVyeSwgaXNBcG9sbG9FcnJvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVuZGxlLmVzbS5qcy5tYXBcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSAndHNsaWInO1xuaW1wb3J0IHsgcHJpbnQgfSBmcm9tICdncmFwaHFsL2xhbmd1YWdlL3ByaW50ZXInO1xuaW1wb3J0IHsgSW52YXJpYW50RXJyb3IgfSBmcm9tICd0cy1pbnZhcmlhbnQnO1xuXG52YXIgZGVmYXVsdEh0dHBPcHRpb25zID0ge1xuICAgIGluY2x1ZGVRdWVyeTogdHJ1ZSxcbiAgICBpbmNsdWRlRXh0ZW5zaW9uczogZmFsc2UsXG59O1xudmFyIGRlZmF1bHRIZWFkZXJzID0ge1xuICAgIGFjY2VwdDogJyovKicsXG4gICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbn07XG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG59O1xudmFyIGZhbGxiYWNrSHR0cENvbmZpZyA9IHtcbiAgICBodHRwOiBkZWZhdWx0SHR0cE9wdGlvbnMsXG4gICAgaGVhZGVyczogZGVmYXVsdEhlYWRlcnMsXG4gICAgb3B0aW9uczogZGVmYXVsdE9wdGlvbnMsXG59O1xudmFyIHRocm93U2VydmVyRXJyb3IgPSBmdW5jdGlvbiAocmVzcG9uc2UsIHJlc3VsdCwgbWVzc2FnZSkge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICBlcnJvci5uYW1lID0gJ1NlcnZlckVycm9yJztcbiAgICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIGVycm9yLnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgZXJyb3IucmVzdWx0ID0gcmVzdWx0O1xuICAgIHRocm93IGVycm9yO1xufTtcbnZhciBwYXJzZUFuZENoZWNrSHR0cFJlc3BvbnNlID0gZnVuY3Rpb24gKG9wZXJhdGlvbnMpIHsgcmV0dXJuIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIHJldHVybiAocmVzcG9uc2VcbiAgICAgICAgLnRleHQoKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoYm9keVRleHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGJvZHlUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB2YXIgcGFyc2VFcnJvciA9IGVycjtcbiAgICAgICAgICAgIHBhcnNlRXJyb3IubmFtZSA9ICdTZXJ2ZXJQYXJzZUVycm9yJztcbiAgICAgICAgICAgIHBhcnNlRXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICAgIHBhcnNlRXJyb3Iuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgIHBhcnNlRXJyb3IuYm9keVRleHQgPSBib2R5VGV4dDtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChwYXJzZUVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgIHRocm93U2VydmVyRXJyb3IocmVzcG9uc2UsIHJlc3VsdCwgXCJSZXNwb25zZSBub3Qgc3VjY2Vzc2Z1bDogUmVjZWl2ZWQgc3RhdHVzIGNvZGUgXCIgKyByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXN1bHQpICYmXG4gICAgICAgICAgICAhcmVzdWx0Lmhhc093blByb3BlcnR5KCdkYXRhJykgJiZcbiAgICAgICAgICAgICFyZXN1bHQuaGFzT3duUHJvcGVydHkoJ2Vycm9ycycpKSB7XG4gICAgICAgICAgICB0aHJvd1NlcnZlckVycm9yKHJlc3BvbnNlLCByZXN1bHQsIFwiU2VydmVyIHJlc3BvbnNlIHdhcyBtaXNzaW5nIGZvciBxdWVyeSAnXCIgKyAoQXJyYXkuaXNBcnJheShvcGVyYXRpb25zKVxuICAgICAgICAgICAgICAgID8gb3BlcmF0aW9ucy5tYXAoZnVuY3Rpb24gKG9wKSB7IHJldHVybiBvcC5vcGVyYXRpb25OYW1lOyB9KVxuICAgICAgICAgICAgICAgIDogb3BlcmF0aW9ucy5vcGVyYXRpb25OYW1lKSArIFwiJy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KSk7XG59OyB9O1xudmFyIGNoZWNrRmV0Y2hlciA9IGZ1bmN0aW9uIChmZXRjaGVyKSB7XG4gICAgaWYgKCFmZXRjaGVyICYmIHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGxpYnJhcnkgPSAndW5mZXRjaCc7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGxpYnJhcnkgPSAnbm9kZS1mZXRjaCc7XG4gICAgICAgIHRocm93IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IG5ldyBJbnZhcmlhbnRFcnJvcigxKSA6IG5ldyBJbnZhcmlhbnRFcnJvcihcIlxcbmZldGNoIGlzIG5vdCBmb3VuZCBnbG9iYWxseSBhbmQgbm8gZmV0Y2hlciBwYXNzZWQsIHRvIGZpeCBwYXNzIGEgZmV0Y2ggZm9yXFxueW91ciBlbnZpcm9ubWVudCBsaWtlIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL1wiICsgbGlicmFyeSArIFwiLlxcblxcbkZvciBleGFtcGxlOlxcbmltcG9ydCBmZXRjaCBmcm9tICdcIiArIGxpYnJhcnkgKyBcIic7XFxuaW1wb3J0IHsgY3JlYXRlSHR0cExpbmsgfSBmcm9tICdhcG9sbG8tbGluay1odHRwJztcXG5cXG5jb25zdCBsaW5rID0gY3JlYXRlSHR0cExpbmsoeyB1cmk6ICcvZ3JhcGhxbCcsIGZldGNoOiBmZXRjaCB9KTtcIik7XG4gICAgfVxufTtcbnZhciBjcmVhdGVTaWduYWxJZlN1cHBvcnRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIEFib3J0Q29udHJvbGxlciA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiB7IGNvbnRyb2xsZXI6IGZhbHNlLCBzaWduYWw6IGZhbHNlIH07XG4gICAgdmFyIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgdmFyIHNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICAgIHJldHVybiB7IGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsIHNpZ25hbDogc2lnbmFsIH07XG59O1xudmFyIHNlbGVjdEh0dHBPcHRpb25zQW5kQm9keSA9IGZ1bmN0aW9uIChvcGVyYXRpb24sIGZhbGxiYWNrQ29uZmlnKSB7XG4gICAgdmFyIGNvbmZpZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBjb25maWdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IF9fYXNzaWduKHt9LCBmYWxsYmFja0NvbmZpZy5vcHRpb25zLCB7IGhlYWRlcnM6IGZhbGxiYWNrQ29uZmlnLmhlYWRlcnMsIGNyZWRlbnRpYWxzOiBmYWxsYmFja0NvbmZpZy5jcmVkZW50aWFscyB9KTtcbiAgICB2YXIgaHR0cCA9IGZhbGxiYWNrQ29uZmlnLmh0dHA7XG4gICAgY29uZmlncy5mb3JFYWNoKGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKHt9LCBvcHRpb25zLCBjb25maWcub3B0aW9ucywgeyBoZWFkZXJzOiBfX2Fzc2lnbih7fSwgb3B0aW9ucy5oZWFkZXJzLCBjb25maWcuaGVhZGVycykgfSk7XG4gICAgICAgIGlmIChjb25maWcuY3JlZGVudGlhbHMpXG4gICAgICAgICAgICBvcHRpb25zLmNyZWRlbnRpYWxzID0gY29uZmlnLmNyZWRlbnRpYWxzO1xuICAgICAgICBodHRwID0gX19hc3NpZ24oe30sIGh0dHAsIGNvbmZpZy5odHRwKTtcbiAgICB9KTtcbiAgICB2YXIgb3BlcmF0aW9uTmFtZSA9IG9wZXJhdGlvbi5vcGVyYXRpb25OYW1lLCBleHRlbnNpb25zID0gb3BlcmF0aW9uLmV4dGVuc2lvbnMsIHZhcmlhYmxlcyA9IG9wZXJhdGlvbi52YXJpYWJsZXMsIHF1ZXJ5ID0gb3BlcmF0aW9uLnF1ZXJ5O1xuICAgIHZhciBib2R5ID0geyBvcGVyYXRpb25OYW1lOiBvcGVyYXRpb25OYW1lLCB2YXJpYWJsZXM6IHZhcmlhYmxlcyB9O1xuICAgIGlmIChodHRwLmluY2x1ZGVFeHRlbnNpb25zKVxuICAgICAgICBib2R5LmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgIGlmIChodHRwLmluY2x1ZGVRdWVyeSlcbiAgICAgICAgYm9keS5xdWVyeSA9IHByaW50KHF1ZXJ5KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICBib2R5OiBib2R5LFxuICAgIH07XG59O1xudmFyIHNlcmlhbGl6ZUZldGNoUGFyYW1ldGVyID0gZnVuY3Rpb24gKHAsIGxhYmVsKSB7XG4gICAgdmFyIHNlcmlhbGl6ZWQ7XG4gICAgdHJ5IHtcbiAgICAgICAgc2VyaWFsaXplZCA9IEpTT04uc3RyaW5naWZ5KHApO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB2YXIgcGFyc2VFcnJvciA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IG5ldyBJbnZhcmlhbnRFcnJvcigyKSA6IG5ldyBJbnZhcmlhbnRFcnJvcihcIk5ldHdvcmsgcmVxdWVzdCBmYWlsZWQuIFwiICsgbGFiZWwgKyBcIiBpcyBub3Qgc2VyaWFsaXphYmxlOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgIHBhcnNlRXJyb3IucGFyc2VFcnJvciA9IGU7XG4gICAgICAgIHRocm93IHBhcnNlRXJyb3I7XG4gICAgfVxuICAgIHJldHVybiBzZXJpYWxpemVkO1xufTtcbnZhciBzZWxlY3RVUkkgPSBmdW5jdGlvbiAob3BlcmF0aW9uLCBmYWxsYmFja1VSSSkge1xuICAgIHZhciBjb250ZXh0ID0gb3BlcmF0aW9uLmdldENvbnRleHQoKTtcbiAgICB2YXIgY29udGV4dFVSSSA9IGNvbnRleHQudXJpO1xuICAgIGlmIChjb250ZXh0VVJJKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0VVJJO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZmFsbGJhY2tVUkkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrVVJJKG9wZXJhdGlvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsbGJhY2tVUkkgfHwgJy9ncmFwaHFsJztcbiAgICB9XG59O1xuXG5leHBvcnQgeyBjaGVja0ZldGNoZXIsIGNyZWF0ZVNpZ25hbElmU3VwcG9ydGVkLCBmYWxsYmFja0h0dHBDb25maWcsIHBhcnNlQW5kQ2hlY2tIdHRwUmVzcG9uc2UsIHNlbGVjdEh0dHBPcHRpb25zQW5kQm9keSwgc2VsZWN0VVJJLCBzZXJpYWxpemVGZXRjaFBhcmFtZXRlciwgdGhyb3dTZXJ2ZXJFcnJvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVuZGxlLmVzbS5qcy5tYXBcbiIsImltcG9ydCB7IF9fcmVzdCwgX19hc3NpZ24sIF9fZXh0ZW5kcyB9IGZyb20gJ3RzbGliJztcbmltcG9ydCB7IEFwb2xsb0xpbmssIGZyb21FcnJvciwgT2JzZXJ2YWJsZSB9IGZyb20gJ2Fwb2xsby1saW5rJztcbmltcG9ydCB7IGNoZWNrRmV0Y2hlciwgc2VsZWN0VVJJLCBzZWxlY3RIdHRwT3B0aW9uc0FuZEJvZHksIGZhbGxiYWNrSHR0cENvbmZpZywgY3JlYXRlU2lnbmFsSWZTdXBwb3J0ZWQsIHNlcmlhbGl6ZUZldGNoUGFyYW1ldGVyLCBwYXJzZUFuZENoZWNrSHR0cFJlc3BvbnNlIH0gZnJvbSAnYXBvbGxvLWxpbmstaHR0cC1jb21tb24nO1xuXG52YXIgY3JlYXRlSHR0cExpbmsgPSBmdW5jdGlvbiAobGlua09wdGlvbnMpIHtcbiAgICBpZiAobGlua09wdGlvbnMgPT09IHZvaWQgMCkgeyBsaW5rT3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIF9hID0gbGlua09wdGlvbnMudXJpLCB1cmkgPSBfYSA9PT0gdm9pZCAwID8gJy9ncmFwaHFsJyA6IF9hLCBmZXRjaGVyID0gbGlua09wdGlvbnMuZmV0Y2gsIGluY2x1ZGVFeHRlbnNpb25zID0gbGlua09wdGlvbnMuaW5jbHVkZUV4dGVuc2lvbnMsIHVzZUdFVEZvclF1ZXJpZXMgPSBsaW5rT3B0aW9ucy51c2VHRVRGb3JRdWVyaWVzLCByZXF1ZXN0T3B0aW9ucyA9IF9fcmVzdChsaW5rT3B0aW9ucywgW1widXJpXCIsIFwiZmV0Y2hcIiwgXCJpbmNsdWRlRXh0ZW5zaW9uc1wiLCBcInVzZUdFVEZvclF1ZXJpZXNcIl0pO1xuICAgIGNoZWNrRmV0Y2hlcihmZXRjaGVyKTtcbiAgICBpZiAoIWZldGNoZXIpIHtcbiAgICAgICAgZmV0Y2hlciA9IGZldGNoO1xuICAgIH1cbiAgICB2YXIgbGlua0NvbmZpZyA9IHtcbiAgICAgICAgaHR0cDogeyBpbmNsdWRlRXh0ZW5zaW9uczogaW5jbHVkZUV4dGVuc2lvbnMgfSxcbiAgICAgICAgb3B0aW9uczogcmVxdWVzdE9wdGlvbnMuZmV0Y2hPcHRpb25zLFxuICAgICAgICBjcmVkZW50aWFsczogcmVxdWVzdE9wdGlvbnMuY3JlZGVudGlhbHMsXG4gICAgICAgIGhlYWRlcnM6IHJlcXVlc3RPcHRpb25zLmhlYWRlcnMsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IEFwb2xsb0xpbmsoZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgICAgICB2YXIgY2hvc2VuVVJJID0gc2VsZWN0VVJJKG9wZXJhdGlvbiwgdXJpKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBvcGVyYXRpb24uZ2V0Q29udGV4dCgpO1xuICAgICAgICB2YXIgY2xpZW50QXdhcmVuZXNzSGVhZGVycyA9IHt9O1xuICAgICAgICBpZiAoY29udGV4dC5jbGllbnRBd2FyZW5lc3MpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGNvbnRleHQuY2xpZW50QXdhcmVuZXNzLCBuYW1lXzEgPSBfYS5uYW1lLCB2ZXJzaW9uID0gX2EudmVyc2lvbjtcbiAgICAgICAgICAgIGlmIChuYW1lXzEpIHtcbiAgICAgICAgICAgICAgICBjbGllbnRBd2FyZW5lc3NIZWFkZXJzWydhcG9sbG9ncmFwaHFsLWNsaWVudC1uYW1lJ10gPSBuYW1lXzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgIGNsaWVudEF3YXJlbmVzc0hlYWRlcnNbJ2Fwb2xsb2dyYXBocWwtY2xpZW50LXZlcnNpb24nXSA9IHZlcnNpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRleHRIZWFkZXJzID0gX19hc3NpZ24oe30sIGNsaWVudEF3YXJlbmVzc0hlYWRlcnMsIGNvbnRleHQuaGVhZGVycyk7XG4gICAgICAgIHZhciBjb250ZXh0Q29uZmlnID0ge1xuICAgICAgICAgICAgaHR0cDogY29udGV4dC5odHRwLFxuICAgICAgICAgICAgb3B0aW9uczogY29udGV4dC5mZXRjaE9wdGlvbnMsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogY29udGV4dC5jcmVkZW50aWFscyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGNvbnRleHRIZWFkZXJzLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgX2IgPSBzZWxlY3RIdHRwT3B0aW9uc0FuZEJvZHkob3BlcmF0aW9uLCBmYWxsYmFja0h0dHBDb25maWcsIGxpbmtDb25maWcsIGNvbnRleHRDb25maWcpLCBvcHRpb25zID0gX2Iub3B0aW9ucywgYm9keSA9IF9iLmJvZHk7XG4gICAgICAgIHZhciBjb250cm9sbGVyO1xuICAgICAgICBpZiAoIW9wdGlvbnMuc2lnbmFsKSB7XG4gICAgICAgICAgICB2YXIgX2MgPSBjcmVhdGVTaWduYWxJZlN1cHBvcnRlZCgpLCBfY29udHJvbGxlciA9IF9jLmNvbnRyb2xsZXIsIHNpZ25hbCA9IF9jLnNpZ25hbDtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBfY29udHJvbGxlcjtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuc2lnbmFsID0gc2lnbmFsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWZpbml0aW9uSXNNdXRhdGlvbiA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicgJiYgZC5vcGVyYXRpb24gPT09ICdtdXRhdGlvbic7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VHRVRGb3JRdWVyaWVzICYmXG4gICAgICAgICAgICAhb3BlcmF0aW9uLnF1ZXJ5LmRlZmluaXRpb25zLnNvbWUoZGVmaW5pdGlvbklzTXV0YXRpb24pKSB7XG4gICAgICAgICAgICBvcHRpb25zLm1ldGhvZCA9ICdHRVQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICAgIHZhciBfZCA9IHJld3JpdGVVUklGb3JHRVQoY2hvc2VuVVJJLCBib2R5KSwgbmV3VVJJID0gX2QubmV3VVJJLCBwYXJzZUVycm9yID0gX2QucGFyc2VFcnJvcjtcbiAgICAgICAgICAgIGlmIChwYXJzZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21FcnJvcihwYXJzZUVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNob3NlblVSSSA9IG5ld1VSSTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5ib2R5ID0gc2VyaWFsaXplRmV0Y2hQYXJhbWV0ZXIoYm9keSwgJ1BheWxvYWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChwYXJzZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21FcnJvcihwYXJzZUVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBmZXRjaGVyKGNob3NlblVSSSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb24uc2V0Q29udGV4dCh7IHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHBhcnNlQW5kQ2hlY2tIdHRwUmVzcG9uc2Uob3BlcmF0aW9uKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChlcnIucmVzdWx0ICYmIGVyci5yZXN1bHQuZXJyb3JzICYmIGVyci5yZXN1bHQuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGVyci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sbGVyKVxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5mdW5jdGlvbiByZXdyaXRlVVJJRm9yR0VUKGNob3NlblVSSSwgYm9keSkge1xuICAgIHZhciBxdWVyeVBhcmFtcyA9IFtdO1xuICAgIHZhciBhZGRRdWVyeVBhcmFtID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgcXVlcnlQYXJhbXMucHVzaChrZXkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKCdxdWVyeScgaW4gYm9keSkge1xuICAgICAgICBhZGRRdWVyeVBhcmFtKCdxdWVyeScsIGJvZHkucXVlcnkpO1xuICAgIH1cbiAgICBpZiAoYm9keS5vcGVyYXRpb25OYW1lKSB7XG4gICAgICAgIGFkZFF1ZXJ5UGFyYW0oJ29wZXJhdGlvbk5hbWUnLCBib2R5Lm9wZXJhdGlvbk5hbWUpO1xuICAgIH1cbiAgICBpZiAoYm9keS52YXJpYWJsZXMpIHtcbiAgICAgICAgdmFyIHNlcmlhbGl6ZWRWYXJpYWJsZXMgPSB2b2lkIDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXJpYWxpemVkVmFyaWFibGVzID0gc2VyaWFsaXplRmV0Y2hQYXJhbWV0ZXIoYm9keS52YXJpYWJsZXMsICdWYXJpYWJsZXMgbWFwJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKHBhcnNlRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHBhcnNlRXJyb3I6IHBhcnNlRXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBhZGRRdWVyeVBhcmFtKCd2YXJpYWJsZXMnLCBzZXJpYWxpemVkVmFyaWFibGVzKTtcbiAgICB9XG4gICAgaWYgKGJvZHkuZXh0ZW5zaW9ucykge1xuICAgICAgICB2YXIgc2VyaWFsaXplZEV4dGVuc2lvbnMgPSB2b2lkIDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXJpYWxpemVkRXh0ZW5zaW9ucyA9IHNlcmlhbGl6ZUZldGNoUGFyYW1ldGVyKGJvZHkuZXh0ZW5zaW9ucywgJ0V4dGVuc2lvbnMgbWFwJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKHBhcnNlRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHBhcnNlRXJyb3I6IHBhcnNlRXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBhZGRRdWVyeVBhcmFtKCdleHRlbnNpb25zJywgc2VyaWFsaXplZEV4dGVuc2lvbnMpO1xuICAgIH1cbiAgICB2YXIgZnJhZ21lbnQgPSAnJywgcHJlRnJhZ21lbnQgPSBjaG9zZW5VUkk7XG4gICAgdmFyIGZyYWdtZW50U3RhcnQgPSBjaG9zZW5VUkkuaW5kZXhPZignIycpO1xuICAgIGlmIChmcmFnbWVudFN0YXJ0ICE9PSAtMSkge1xuICAgICAgICBmcmFnbWVudCA9IGNob3NlblVSSS5zdWJzdHIoZnJhZ21lbnRTdGFydCk7XG4gICAgICAgIHByZUZyYWdtZW50ID0gY2hvc2VuVVJJLnN1YnN0cigwLCBmcmFnbWVudFN0YXJ0KTtcbiAgICB9XG4gICAgdmFyIHF1ZXJ5UGFyYW1zUHJlZml4ID0gcHJlRnJhZ21lbnQuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJztcbiAgICB2YXIgbmV3VVJJID0gcHJlRnJhZ21lbnQgKyBxdWVyeVBhcmFtc1ByZWZpeCArIHF1ZXJ5UGFyYW1zLmpvaW4oJyYnKSArIGZyYWdtZW50O1xuICAgIHJldHVybiB7IG5ld1VSSTogbmV3VVJJIH07XG59XG52YXIgSHR0cExpbmsgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIdHRwTGluaywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIdHRwTGluayhvcHRzKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBjcmVhdGVIdHRwTGluayhvcHRzKS5yZXF1ZXN0KSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSHR0cExpbms7XG59KEFwb2xsb0xpbmspKTtcblxuZXhwb3J0IHsgSHR0cExpbmssIGNyZWF0ZUh0dHBMaW5rIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idW5kbGUuZXNtLmpzLm1hcFxuIiwiaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnemVuLW9ic2VydmFibGUtdHMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPYnNlcnZhYmxlIH0gZnJvbSAnemVuLW9ic2VydmFibGUtdHMnO1xuaW1wb3J0IHsgaW52YXJpYW50LCBJbnZhcmlhbnRFcnJvciB9IGZyb20gJ3RzLWludmFyaWFudCc7XG5pbXBvcnQgeyBfX2V4dGVuZHMsIF9fYXNzaWduIH0gZnJvbSAndHNsaWInO1xuaW1wb3J0IHsgZ2V0T3BlcmF0aW9uTmFtZSB9IGZyb20gJ2Fwb2xsby11dGlsaXRpZXMnO1xuZXhwb3J0IHsgZ2V0T3BlcmF0aW9uTmFtZSB9IGZyb20gJ2Fwb2xsby11dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZU9wZXJhdGlvbihvcGVyYXRpb24pIHtcbiAgICB2YXIgT1BFUkFUSU9OX0ZJRUxEUyA9IFtcbiAgICAgICAgJ3F1ZXJ5JyxcbiAgICAgICAgJ29wZXJhdGlvbk5hbWUnLFxuICAgICAgICAndmFyaWFibGVzJyxcbiAgICAgICAgJ2V4dGVuc2lvbnMnLFxuICAgICAgICAnY29udGV4dCcsXG4gICAgXTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMob3BlcmF0aW9uKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGtleSA9IF9hW19pXTtcbiAgICAgICAgaWYgKE9QRVJBVElPTl9GSUVMRFMuaW5kZXhPZihrZXkpIDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gbmV3IEludmFyaWFudEVycm9yKDIpIDogbmV3IEludmFyaWFudEVycm9yKFwiaWxsZWdhbCBhcmd1bWVudDogXCIgKyBrZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvcGVyYXRpb247XG59XG52YXIgTGlua0Vycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTGlua0Vycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExpbmtFcnJvcihtZXNzYWdlLCBsaW5rKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2UpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmxpbmsgPSBsaW5rO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBMaW5rRXJyb3I7XG59KEVycm9yKSk7XG5mdW5jdGlvbiBpc1Rlcm1pbmF0aW5nKGxpbmspIHtcbiAgICByZXR1cm4gbGluay5yZXF1ZXN0Lmxlbmd0aCA8PSAxO1xufVxuZnVuY3Rpb24gdG9Qcm9taXNlKG9ic2VydmFibGUpIHtcbiAgICB2YXIgY29tcGxldGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQud2FybihcIlByb21pc2UgV3JhcHBlciBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIHJlc3VsdHMgZnJvbSBPYnNlcnZhYmxlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IHJlamVjdCxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG52YXIgbWFrZVByb21pc2UgPSB0b1Byb21pc2U7XG5mdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChvYnNlcnZlci5lcnJvci5iaW5kKG9ic2VydmVyKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmcm9tRXJyb3IoZXJyb3JWYWx1ZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3JWYWx1ZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XG4gICAgdmFyIHRyYW5zZm9ybWVkT3BlcmF0aW9uID0ge1xuICAgICAgICB2YXJpYWJsZXM6IG9wZXJhdGlvbi52YXJpYWJsZXMgfHwge30sXG4gICAgICAgIGV4dGVuc2lvbnM6IG9wZXJhdGlvbi5leHRlbnNpb25zIHx8IHt9LFxuICAgICAgICBvcGVyYXRpb25OYW1lOiBvcGVyYXRpb24ub3BlcmF0aW9uTmFtZSxcbiAgICAgICAgcXVlcnk6IG9wZXJhdGlvbi5xdWVyeSxcbiAgICB9O1xuICAgIGlmICghdHJhbnNmb3JtZWRPcGVyYXRpb24ub3BlcmF0aW9uTmFtZSkge1xuICAgICAgICB0cmFuc2Zvcm1lZE9wZXJhdGlvbi5vcGVyYXRpb25OYW1lID1cbiAgICAgICAgICAgIHR5cGVvZiB0cmFuc2Zvcm1lZE9wZXJhdGlvbi5xdWVyeSAhPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICA/IGdldE9wZXJhdGlvbk5hbWUodHJhbnNmb3JtZWRPcGVyYXRpb24ucXVlcnkpXG4gICAgICAgICAgICAgICAgOiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkT3BlcmF0aW9uO1xufVxuZnVuY3Rpb24gY3JlYXRlT3BlcmF0aW9uKHN0YXJ0aW5nLCBvcGVyYXRpb24pIHtcbiAgICB2YXIgY29udGV4dCA9IF9fYXNzaWduKHt9LCBzdGFydGluZyk7XG4gICAgdmFyIHNldENvbnRleHQgPSBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICBpZiAodHlwZW9mIG5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBfX2Fzc2lnbih7fSwgY29udGV4dCwgbmV4dChjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gX19hc3NpZ24oe30sIGNvbnRleHQsIG5leHQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0Q29udGV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIChfX2Fzc2lnbih7fSwgY29udGV4dCkpOyB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvcGVyYXRpb24sICdzZXRDb250ZXh0Jywge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNldENvbnRleHQsXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9wZXJhdGlvbiwgJ2dldENvbnRleHQnLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogZ2V0Q29udGV4dCxcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3BlcmF0aW9uLCAndG9LZXknLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0S2V5KG9wZXJhdGlvbik7IH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIG9wZXJhdGlvbjtcbn1cbmZ1bmN0aW9uIGdldEtleShvcGVyYXRpb24pIHtcbiAgICB2YXIgcXVlcnkgPSBvcGVyYXRpb24ucXVlcnksIHZhcmlhYmxlcyA9IG9wZXJhdGlvbi52YXJpYWJsZXMsIG9wZXJhdGlvbk5hbWUgPSBvcGVyYXRpb24ub3BlcmF0aW9uTmFtZTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoW29wZXJhdGlvbk5hbWUsIHF1ZXJ5LCB2YXJpYWJsZXNdKTtcbn1cblxuZnVuY3Rpb24gcGFzc3Rocm91Z2gob3AsIGZvcndhcmQpIHtcbiAgICByZXR1cm4gZm9yd2FyZCA/IGZvcndhcmQob3ApIDogT2JzZXJ2YWJsZS5vZigpO1xufVxuZnVuY3Rpb24gdG9MaW5rKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicgPyBuZXcgQXBvbGxvTGluayhoYW5kbGVyKSA6IGhhbmRsZXI7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gbmV3IEFwb2xsb0xpbmsoZnVuY3Rpb24gKCkgeyByZXR1cm4gT2JzZXJ2YWJsZS5vZigpOyB9KTtcbn1cbmZ1bmN0aW9uIGZyb20obGlua3MpIHtcbiAgICBpZiAobGlua3MubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICByZXR1cm4gbGlua3MubWFwKHRvTGluaykucmVkdWNlKGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiB4LmNvbmNhdCh5KTsgfSk7XG59XG5mdW5jdGlvbiBzcGxpdCh0ZXN0LCBsZWZ0LCByaWdodCkge1xuICAgIHZhciBsZWZ0TGluayA9IHRvTGluayhsZWZ0KTtcbiAgICB2YXIgcmlnaHRMaW5rID0gdG9MaW5rKHJpZ2h0IHx8IG5ldyBBcG9sbG9MaW5rKHBhc3N0aHJvdWdoKSk7XG4gICAgaWYgKGlzVGVybWluYXRpbmcobGVmdExpbmspICYmIGlzVGVybWluYXRpbmcocmlnaHRMaW5rKSkge1xuICAgICAgICByZXR1cm4gbmV3IEFwb2xsb0xpbmsoZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRlc3Qob3BlcmF0aW9uKVxuICAgICAgICAgICAgICAgID8gbGVmdExpbmsucmVxdWVzdChvcGVyYXRpb24pIHx8IE9ic2VydmFibGUub2YoKVxuICAgICAgICAgICAgICAgIDogcmlnaHRMaW5rLnJlcXVlc3Qob3BlcmF0aW9uKSB8fCBPYnNlcnZhYmxlLm9mKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcG9sbG9MaW5rKGZ1bmN0aW9uIChvcGVyYXRpb24sIGZvcndhcmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXN0KG9wZXJhdGlvbilcbiAgICAgICAgICAgICAgICA/IGxlZnRMaW5rLnJlcXVlc3Qob3BlcmF0aW9uLCBmb3J3YXJkKSB8fCBPYnNlcnZhYmxlLm9mKClcbiAgICAgICAgICAgICAgICA6IHJpZ2h0TGluay5yZXF1ZXN0KG9wZXJhdGlvbiwgZm9yd2FyZCkgfHwgT2JzZXJ2YWJsZS5vZigpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG52YXIgY29uY2F0ID0gZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcbiAgICB2YXIgZmlyc3RMaW5rID0gdG9MaW5rKGZpcnN0KTtcbiAgICBpZiAoaXNUZXJtaW5hdGluZyhmaXJzdExpbmspKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiB8fCBpbnZhcmlhbnQud2FybihuZXcgTGlua0Vycm9yKFwiWW91IGFyZSBjYWxsaW5nIGNvbmNhdCBvbiBhIHRlcm1pbmF0aW5nIGxpbmssIHdoaWNoIHdpbGwgaGF2ZSBubyBlZmZlY3RcIiwgZmlyc3RMaW5rKSk7XG4gICAgICAgIHJldHVybiBmaXJzdExpbms7XG4gICAgfVxuICAgIHZhciBuZXh0TGluayA9IHRvTGluayhzZWNvbmQpO1xuICAgIGlmIChpc1Rlcm1pbmF0aW5nKG5leHRMaW5rKSkge1xuICAgICAgICByZXR1cm4gbmV3IEFwb2xsb0xpbmsoZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0TGluay5yZXF1ZXN0KG9wZXJhdGlvbiwgZnVuY3Rpb24gKG9wKSB7IHJldHVybiBuZXh0TGluay5yZXF1ZXN0KG9wKSB8fCBPYnNlcnZhYmxlLm9mKCk7IH0pIHx8IE9ic2VydmFibGUub2YoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IEFwb2xsb0xpbmsoZnVuY3Rpb24gKG9wZXJhdGlvbiwgZm9yd2FyZCkge1xuICAgICAgICAgICAgcmV0dXJuIChmaXJzdExpbmsucmVxdWVzdChvcGVyYXRpb24sIGZ1bmN0aW9uIChvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0TGluay5yZXF1ZXN0KG9wLCBmb3J3YXJkKSB8fCBPYnNlcnZhYmxlLm9mKCk7XG4gICAgICAgICAgICB9KSB8fCBPYnNlcnZhYmxlLm9mKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xudmFyIEFwb2xsb0xpbmsgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwb2xsb0xpbmsocmVxdWVzdCkge1xuICAgICAgICBpZiAocmVxdWVzdClcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIEFwb2xsb0xpbmsucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24gKHRlc3QsIGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmNhdChzcGxpdCh0ZXN0LCBsZWZ0LCByaWdodCB8fCBuZXcgQXBvbGxvTGluayhwYXNzdGhyb3VnaCkpKTtcbiAgICB9O1xuICAgIEFwb2xsb0xpbmsucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgIHJldHVybiBjb25jYXQodGhpcywgbmV4dCk7XG4gICAgfTtcbiAgICBBcG9sbG9MaW5rLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG9wZXJhdGlvbiwgZm9yd2FyZCkge1xuICAgICAgICB0aHJvdyBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBuZXcgSW52YXJpYW50RXJyb3IoMSkgOiBuZXcgSW52YXJpYW50RXJyb3IoJ3JlcXVlc3QgaXMgbm90IGltcGxlbWVudGVkJyk7XG4gICAgfTtcbiAgICBBcG9sbG9MaW5rLmVtcHR5ID0gZW1wdHk7XG4gICAgQXBvbGxvTGluay5mcm9tID0gZnJvbTtcbiAgICBBcG9sbG9MaW5rLnNwbGl0ID0gc3BsaXQ7XG4gICAgQXBvbGxvTGluay5leGVjdXRlID0gZXhlY3V0ZTtcbiAgICByZXR1cm4gQXBvbGxvTGluaztcbn0oKSk7XG5mdW5jdGlvbiBleGVjdXRlKGxpbmssIG9wZXJhdGlvbikge1xuICAgIHJldHVybiAobGluay5yZXF1ZXN0KGNyZWF0ZU9wZXJhdGlvbihvcGVyYXRpb24uY29udGV4dCwgdHJhbnNmb3JtT3BlcmF0aW9uKHZhbGlkYXRlT3BlcmF0aW9uKG9wZXJhdGlvbikpKSkgfHwgT2JzZXJ2YWJsZS5vZigpKTtcbn1cblxuZXhwb3J0IHsgQXBvbGxvTGluaywgY29uY2F0LCBjcmVhdGVPcGVyYXRpb24sIGVtcHR5LCBleGVjdXRlLCBmcm9tLCBmcm9tRXJyb3IsIGZyb21Qcm9taXNlLCBtYWtlUHJvbWlzZSwgc3BsaXQsIHRvUHJvbWlzZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVuZGxlLmVzbS5qcy5tYXBcbiIsImltcG9ydCB7IHZpc2l0IH0gZnJvbSAnZ3JhcGhxbC9sYW5ndWFnZS92aXNpdG9yJztcbmltcG9ydCB7IEludmFyaWFudEVycm9yLCBpbnZhcmlhbnQgfSBmcm9tICd0cy1pbnZhcmlhbnQnO1xuaW1wb3J0IHsgX19hc3NpZ24sIF9fc3ByZWFkQXJyYXlzIH0gZnJvbSAndHNsaWInO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICdmYXN0LWpzb24tc3RhYmxlLXN0cmluZ2lmeSc7XG5leHBvcnQgeyBlcXVhbCBhcyBpc0VxdWFsIH0gZnJvbSAnQHdyeS9lcXVhbGl0eSc7XG5cbmZ1bmN0aW9uIGlzU2NhbGFyVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gWydTdHJpbmdWYWx1ZScsICdCb29sZWFuVmFsdWUnLCAnRW51bVZhbHVlJ10uaW5kZXhPZih2YWx1ZS5raW5kKSA+IC0xO1xufVxuZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiBbJ0ludFZhbHVlJywgJ0Zsb2F0VmFsdWUnXS5pbmRleE9mKHZhbHVlLmtpbmQpID4gLTE7XG59XG5mdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdTdHJpbmdWYWx1ZSc7XG59XG5mdW5jdGlvbiBpc0Jvb2xlYW5WYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnQm9vbGVhblZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzSW50VmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ0ludFZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzRmxvYXRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnRmxvYXRWYWx1ZSc7XG59XG5mdW5jdGlvbiBpc1ZhcmlhYmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdWYXJpYWJsZSc7XG59XG5mdW5jdGlvbiBpc09iamVjdFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdPYmplY3RWYWx1ZSc7XG59XG5mdW5jdGlvbiBpc0xpc3RWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnTGlzdFZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzRW51bVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdFbnVtVmFsdWUnO1xufVxuZnVuY3Rpb24gaXNOdWxsVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ051bGxWYWx1ZSc7XG59XG5mdW5jdGlvbiB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24oYXJnT2JqLCBuYW1lLCB2YWx1ZSwgdmFyaWFibGVzKSB7XG4gICAgaWYgKGlzSW50VmFsdWUodmFsdWUpIHx8IGlzRmxvYXRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gTnVtYmVyKHZhbHVlLnZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNCb29sZWFuVmFsdWUodmFsdWUpIHx8IGlzU3RyaW5nVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhbHVlLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09iamVjdFZhbHVlKHZhbHVlKSkge1xuICAgICAgICB2YXIgbmVzdGVkQXJnT2JqXzEgPSB7fTtcbiAgICAgICAgdmFsdWUuZmllbGRzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKG5lc3RlZEFyZ09ial8xLCBvYmoubmFtZSwgb2JqLnZhbHVlLCB2YXJpYWJsZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gbmVzdGVkQXJnT2JqXzE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVmFyaWFibGUodmFsdWUpKSB7XG4gICAgICAgIHZhciB2YXJpYWJsZVZhbHVlID0gKHZhcmlhYmxlcyB8fCB7fSlbdmFsdWUubmFtZS52YWx1ZV07XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhcmlhYmxlVmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTGlzdFZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSB2YWx1ZS52YWx1ZXMubWFwKGZ1bmN0aW9uIChsaXN0VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBuZXN0ZWRBcmdBcnJheU9iaiA9IHt9O1xuICAgICAgICAgICAgdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKG5lc3RlZEFyZ0FycmF5T2JqLCBuYW1lLCBsaXN0VmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICByZXR1cm4gbmVzdGVkQXJnQXJyYXlPYmpbbmFtZS52YWx1ZV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0VudW1WYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gdmFsdWUudmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTnVsbFZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gbmV3IEludmFyaWFudEVycm9yKDE3KSA6IG5ldyBJbnZhcmlhbnRFcnJvcihcIlRoZSBpbmxpbmUgYXJndW1lbnQgXFxcIlwiICsgbmFtZS52YWx1ZSArIFwiXFxcIiBvZiBraW5kIFxcXCJcIiArIHZhbHVlLmtpbmQgKyBcIlxcXCJcIiArXG4gICAgICAgICAgICAnaXMgbm90IHN1cHBvcnRlZC4gVXNlIHZhcmlhYmxlcyBpbnN0ZWFkIG9mIGlubGluZSBhcmd1bWVudHMgdG8gJyArXG4gICAgICAgICAgICAnb3ZlcmNvbWUgdGhpcyBsaW1pdGF0aW9uLicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN0b3JlS2V5TmFtZUZyb21GaWVsZChmaWVsZCwgdmFyaWFibGVzKSB7XG4gICAgdmFyIGRpcmVjdGl2ZXNPYmogPSBudWxsO1xuICAgIGlmIChmaWVsZC5kaXJlY3RpdmVzKSB7XG4gICAgICAgIGRpcmVjdGl2ZXNPYmogPSB7fTtcbiAgICAgICAgZmllbGQuZGlyZWN0aXZlcy5mb3JFYWNoKGZ1bmN0aW9uIChkaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZXNPYmpbZGlyZWN0aXZlLm5hbWUudmFsdWVdID0ge307XG4gICAgICAgICAgICBpZiAoZGlyZWN0aXZlLmFyZ3VtZW50cykge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5hcmd1bWVudHMuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lLCB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGRpcmVjdGl2ZXNPYmpbZGlyZWN0aXZlLm5hbWUudmFsdWVdLCBuYW1lLCB2YWx1ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBhcmdPYmogPSBudWxsO1xuICAgIGlmIChmaWVsZC5hcmd1bWVudHMgJiYgZmllbGQuYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBhcmdPYmogPSB7fTtcbiAgICAgICAgZmllbGQuYXJndW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGFyZ09iaiwgbmFtZSwgdmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0U3RvcmVLZXlOYW1lKGZpZWxkLm5hbWUudmFsdWUsIGFyZ09iaiwgZGlyZWN0aXZlc09iaik7XG59XG52YXIgS05PV05fRElSRUNUSVZFUyA9IFtcbiAgICAnY29ubmVjdGlvbicsXG4gICAgJ2luY2x1ZGUnLFxuICAgICdza2lwJyxcbiAgICAnY2xpZW50JyxcbiAgICAncmVzdCcsXG4gICAgJ2V4cG9ydCcsXG5dO1xuZnVuY3Rpb24gZ2V0U3RvcmVLZXlOYW1lKGZpZWxkTmFtZSwgYXJncywgZGlyZWN0aXZlcykge1xuICAgIGlmIChkaXJlY3RpdmVzICYmXG4gICAgICAgIGRpcmVjdGl2ZXNbJ2Nvbm5lY3Rpb24nXSAmJlxuICAgICAgICBkaXJlY3RpdmVzWydjb25uZWN0aW9uJ11bJ2tleSddKSB7XG4gICAgICAgIGlmIChkaXJlY3RpdmVzWydjb25uZWN0aW9uJ11bJ2ZpbHRlciddICYmXG4gICAgICAgICAgICBkaXJlY3RpdmVzWydjb25uZWN0aW9uJ11bJ2ZpbHRlciddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJLZXlzID0gZGlyZWN0aXZlc1snY29ubmVjdGlvbiddWydmaWx0ZXInXVxuICAgICAgICAgICAgICAgID8gZGlyZWN0aXZlc1snY29ubmVjdGlvbiddWydmaWx0ZXInXVxuICAgICAgICAgICAgICAgIDogW107XG4gICAgICAgICAgICBmaWx0ZXJLZXlzLnNvcnQoKTtcbiAgICAgICAgICAgIHZhciBxdWVyeUFyZ3NfMSA9IGFyZ3M7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRBcmdzXzEgPSB7fTtcbiAgICAgICAgICAgIGZpbHRlcktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRBcmdzXzFba2V5XSA9IHF1ZXJ5QXJnc18xW2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmVzWydjb25uZWN0aW9uJ11bJ2tleSddICsgXCIoXCIgKyBKU09OLnN0cmluZ2lmeShmaWx0ZXJlZEFyZ3NfMSkgKyBcIilcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmVzWydjb25uZWN0aW9uJ11bJ2tleSddO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjb21wbGV0ZUZpZWxkTmFtZSA9IGZpZWxkTmFtZTtcbiAgICBpZiAoYXJncykge1xuICAgICAgICB2YXIgc3RyaW5naWZpZWRBcmdzID0gc3RyaW5naWZ5KGFyZ3MpO1xuICAgICAgICBjb21wbGV0ZUZpZWxkTmFtZSArPSBcIihcIiArIHN0cmluZ2lmaWVkQXJncyArIFwiKVwiO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aXZlcykge1xuICAgICAgICBPYmplY3Qua2V5cyhkaXJlY3RpdmVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmIChLTk9XTl9ESVJFQ1RJVkVTLmluZGV4T2Yoa2V5KSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZXNba2V5XSAmJiBPYmplY3Qua2V5cyhkaXJlY3RpdmVzW2tleV0pLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlRmllbGROYW1lICs9IFwiQFwiICsga2V5ICsgXCIoXCIgKyBKU09OLnN0cmluZ2lmeShkaXJlY3RpdmVzW2tleV0pICsgXCIpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUZpZWxkTmFtZSArPSBcIkBcIiArIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb21wbGV0ZUZpZWxkTmFtZTtcbn1cbmZ1bmN0aW9uIGFyZ3VtZW50c09iamVjdEZyb21GaWVsZChmaWVsZCwgdmFyaWFibGVzKSB7XG4gICAgaWYgKGZpZWxkLmFyZ3VtZW50cyAmJiBmaWVsZC5hcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBhcmdPYmpfMSA9IHt9O1xuICAgICAgICBmaWVsZC5hcmd1bWVudHMuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gX2EubmFtZSwgdmFsdWUgPSBfYS52YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24oYXJnT2JqXzEsIG5hbWUsIHZhbHVlLCB2YXJpYWJsZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFyZ09ial8xO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIHJlc3VsdEtleU5hbWVGcm9tRmllbGQoZmllbGQpIHtcbiAgICByZXR1cm4gZmllbGQuYWxpYXMgPyBmaWVsZC5hbGlhcy52YWx1ZSA6IGZpZWxkLm5hbWUudmFsdWU7XG59XG5mdW5jdGlvbiBpc0ZpZWxkKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb24ua2luZCA9PT0gJ0ZpZWxkJztcbn1cbmZ1bmN0aW9uIGlzSW5saW5lRnJhZ21lbnQoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvbi5raW5kID09PSAnSW5saW5lRnJhZ21lbnQnO1xufVxuZnVuY3Rpb24gaXNJZFZhbHVlKGlkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGlkT2JqZWN0ICYmXG4gICAgICAgIGlkT2JqZWN0LnR5cGUgPT09ICdpZCcgJiZcbiAgICAgICAgdHlwZW9mIGlkT2JqZWN0LmdlbmVyYXRlZCA9PT0gJ2Jvb2xlYW4nO1xufVxuZnVuY3Rpb24gdG9JZFZhbHVlKGlkQ29uZmlnLCBnZW5lcmF0ZWQpIHtcbiAgICBpZiAoZ2VuZXJhdGVkID09PSB2b2lkIDApIHsgZ2VuZXJhdGVkID0gZmFsc2U7IH1cbiAgICByZXR1cm4gX19hc3NpZ24oeyB0eXBlOiAnaWQnLCBnZW5lcmF0ZWQ6IGdlbmVyYXRlZCB9LCAodHlwZW9mIGlkQ29uZmlnID09PSAnc3RyaW5nJ1xuICAgICAgICA/IHsgaWQ6IGlkQ29uZmlnLCB0eXBlbmFtZTogdW5kZWZpbmVkIH1cbiAgICAgICAgOiBpZENvbmZpZykpO1xufVxuZnVuY3Rpb24gaXNKc29uVmFsdWUoanNvbk9iamVjdCkge1xuICAgIHJldHVybiAoanNvbk9iamVjdCAhPSBudWxsICYmXG4gICAgICAgIHR5cGVvZiBqc29uT2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBqc29uT2JqZWN0LnR5cGUgPT09ICdqc29uJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0VmFsdWVGcm9tVmFyaWFibGUobm9kZSkge1xuICAgIHRocm93IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IG5ldyBJbnZhcmlhbnRFcnJvcigxOCkgOiBuZXcgSW52YXJpYW50RXJyb3IoXCJWYXJpYWJsZSBub2RlcyBhcmUgbm90IHN1cHBvcnRlZCBieSB2YWx1ZUZyb21Ob2RlXCIpO1xufVxuZnVuY3Rpb24gdmFsdWVGcm9tTm9kZShub2RlLCBvblZhcmlhYmxlKSB7XG4gICAgaWYgKG9uVmFyaWFibGUgPT09IHZvaWQgMCkgeyBvblZhcmlhYmxlID0gZGVmYXVsdFZhbHVlRnJvbVZhcmlhYmxlOyB9XG4gICAgc3dpdGNoIChub2RlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnVmFyaWFibGUnOlxuICAgICAgICAgICAgcmV0dXJuIG9uVmFyaWFibGUobm9kZSk7XG4gICAgICAgIGNhc2UgJ051bGxWYWx1ZSc6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgY2FzZSAnSW50VmFsdWUnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG5vZGUudmFsdWUsIDEwKTtcbiAgICAgICAgY2FzZSAnRmxvYXRWYWx1ZSc6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLnZhbHVlKTtcbiAgICAgICAgY2FzZSAnTGlzdFZhbHVlJzpcbiAgICAgICAgICAgIHJldHVybiBub2RlLnZhbHVlcy5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHZhbHVlRnJvbU5vZGUodiwgb25WYXJpYWJsZSk7IH0pO1xuICAgICAgICBjYXNlICdPYmplY3RWYWx1ZSc6IHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IG5vZGUuZmllbGRzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICB2YWx1ZVtmaWVsZC5uYW1lLnZhbHVlXSA9IHZhbHVlRnJvbU5vZGUoZmllbGQudmFsdWUsIG9uVmFyaWFibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERpcmVjdGl2ZUluZm9Gcm9tRmllbGQoZmllbGQsIHZhcmlhYmxlcykge1xuICAgIGlmIChmaWVsZC5kaXJlY3RpdmVzICYmIGZpZWxkLmRpcmVjdGl2ZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmVPYmpfMSA9IHt9O1xuICAgICAgICBmaWVsZC5kaXJlY3RpdmVzLmZvckVhY2goZnVuY3Rpb24gKGRpcmVjdGl2ZSkge1xuICAgICAgICAgICAgZGlyZWN0aXZlT2JqXzFbZGlyZWN0aXZlLm5hbWUudmFsdWVdID0gYXJndW1lbnRzT2JqZWN0RnJvbUZpZWxkKGRpcmVjdGl2ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmVPYmpfMTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBzaG91bGRJbmNsdWRlKHNlbGVjdGlvbiwgdmFyaWFibGVzKSB7XG4gICAgaWYgKHZhcmlhYmxlcyA9PT0gdm9pZCAwKSB7IHZhcmlhYmxlcyA9IHt9OyB9XG4gICAgcmV0dXJuIGdldEluY2x1c2lvbkRpcmVjdGl2ZXMoc2VsZWN0aW9uLmRpcmVjdGl2ZXMpLmV2ZXJ5KGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gX2EuZGlyZWN0aXZlLCBpZkFyZ3VtZW50ID0gX2EuaWZBcmd1bWVudDtcbiAgICAgICAgdmFyIGV2YWxlZFZhbHVlID0gZmFsc2U7XG4gICAgICAgIGlmIChpZkFyZ3VtZW50LnZhbHVlLmtpbmQgPT09ICdWYXJpYWJsZScpIHtcbiAgICAgICAgICAgIGV2YWxlZFZhbHVlID0gdmFyaWFibGVzW2lmQXJndW1lbnQudmFsdWUubmFtZS52YWx1ZV07XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZXZhbGVkVmFsdWUgIT09IHZvaWQgMCwgMTMpIDogaW52YXJpYW50KGV2YWxlZFZhbHVlICE9PSB2b2lkIDAsIFwiSW52YWxpZCB2YXJpYWJsZSByZWZlcmVuY2VkIGluIEBcIiArIGRpcmVjdGl2ZS5uYW1lLnZhbHVlICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV2YWxlZFZhbHVlID0gaWZBcmd1bWVudC52YWx1ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlLm5hbWUudmFsdWUgPT09ICdza2lwJyA/ICFldmFsZWRWYWx1ZSA6IGV2YWxlZFZhbHVlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0RGlyZWN0aXZlTmFtZXMoZG9jKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgdmlzaXQoZG9jLCB7XG4gICAgICAgIERpcmVjdGl2ZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIG5hbWVzLnB1c2gobm9kZS5uYW1lLnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gbmFtZXM7XG59XG5mdW5jdGlvbiBoYXNEaXJlY3RpdmVzKG5hbWVzLCBkb2MpIHtcbiAgICByZXR1cm4gZ2V0RGlyZWN0aXZlTmFtZXMoZG9jKS5zb21lKGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBuYW1lcy5pbmRleE9mKG5hbWUpID4gLTE7IH0pO1xufVxuZnVuY3Rpb24gaGFzQ2xpZW50RXhwb3J0cyhkb2N1bWVudCkge1xuICAgIHJldHVybiAoZG9jdW1lbnQgJiZcbiAgICAgICAgaGFzRGlyZWN0aXZlcyhbJ2NsaWVudCddLCBkb2N1bWVudCkgJiZcbiAgICAgICAgaGFzRGlyZWN0aXZlcyhbJ2V4cG9ydCddLCBkb2N1bWVudCkpO1xufVxuZnVuY3Rpb24gaXNJbmNsdXNpb25EaXJlY3RpdmUoX2EpIHtcbiAgICB2YXIgdmFsdWUgPSBfYS5uYW1lLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJ3NraXAnIHx8IHZhbHVlID09PSAnaW5jbHVkZSc7XG59XG5mdW5jdGlvbiBnZXRJbmNsdXNpb25EaXJlY3RpdmVzKGRpcmVjdGl2ZXMpIHtcbiAgICByZXR1cm4gZGlyZWN0aXZlcyA/IGRpcmVjdGl2ZXMuZmlsdGVyKGlzSW5jbHVzaW9uRGlyZWN0aXZlKS5tYXAoZnVuY3Rpb24gKGRpcmVjdGl2ZSkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlQXJndW1lbnRzID0gZGlyZWN0aXZlLmFyZ3VtZW50cztcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmUubmFtZS52YWx1ZTtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGRpcmVjdGl2ZUFyZ3VtZW50cyAmJiBkaXJlY3RpdmVBcmd1bWVudHMubGVuZ3RoID09PSAxLCAxNCkgOiBpbnZhcmlhbnQoZGlyZWN0aXZlQXJndW1lbnRzICYmIGRpcmVjdGl2ZUFyZ3VtZW50cy5sZW5ndGggPT09IDEsIFwiSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMgZm9yIHRoZSBAXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgdmFyIGlmQXJndW1lbnQgPSBkaXJlY3RpdmVBcmd1bWVudHNbMF07XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChpZkFyZ3VtZW50Lm5hbWUgJiYgaWZBcmd1bWVudC5uYW1lLnZhbHVlID09PSAnaWYnLCAxNSkgOiBpbnZhcmlhbnQoaWZBcmd1bWVudC5uYW1lICYmIGlmQXJndW1lbnQubmFtZS52YWx1ZSA9PT0gJ2lmJywgXCJJbnZhbGlkIGFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgIHZhciBpZlZhbHVlID0gaWZBcmd1bWVudC52YWx1ZTtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGlmVmFsdWUgJiZcbiAgICAgICAgICAgIChpZlZhbHVlLmtpbmQgPT09ICdWYXJpYWJsZScgfHwgaWZWYWx1ZS5raW5kID09PSAnQm9vbGVhblZhbHVlJyksIDE2KSA6IGludmFyaWFudChpZlZhbHVlICYmXG4gICAgICAgICAgICAoaWZWYWx1ZS5raW5kID09PSAnVmFyaWFibGUnIHx8IGlmVmFsdWUua2luZCA9PT0gJ0Jvb2xlYW5WYWx1ZScpLCBcIkFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZSBtdXN0IGJlIGEgdmFyaWFibGUgb3IgYSBib29sZWFuIHZhbHVlLlwiKTtcbiAgICAgICAgcmV0dXJuIHsgZGlyZWN0aXZlOiBkaXJlY3RpdmUsIGlmQXJndW1lbnQ6IGlmQXJndW1lbnQgfTtcbiAgICB9KSA6IFtdO1xufVxuXG5mdW5jdGlvbiBnZXRGcmFnbWVudFF1ZXJ5RG9jdW1lbnQoZG9jdW1lbnQsIGZyYWdtZW50TmFtZSkge1xuICAgIHZhciBhY3R1YWxGcmFnbWVudE5hbWUgPSBmcmFnbWVudE5hbWU7XG4gICAgdmFyIGZyYWdtZW50cyA9IFtdO1xuICAgIGRvY3VtZW50LmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBuZXcgSW52YXJpYW50RXJyb3IoMTEpIDogbmV3IEludmFyaWFudEVycm9yKFwiRm91bmQgYSBcIiArIGRlZmluaXRpb24ub3BlcmF0aW9uICsgXCIgb3BlcmF0aW9uXCIgKyAoZGVmaW5pdGlvbi5uYW1lID8gXCIgbmFtZWQgJ1wiICsgZGVmaW5pdGlvbi5uYW1lLnZhbHVlICsgXCInXCIgOiAnJykgKyBcIi4gXCIgK1xuICAgICAgICAgICAgICAgICdObyBvcGVyYXRpb25zIGFyZSBhbGxvd2VkIHdoZW4gdXNpbmcgYSBmcmFnbWVudCBhcyBhIHF1ZXJ5LiBPbmx5IGZyYWdtZW50cyBhcmUgYWxsb3dlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgICAgICAgZnJhZ21lbnRzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGFjdHVhbEZyYWdtZW50TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZyYWdtZW50cy5sZW5ndGggPT09IDEsIDEyKSA6IGludmFyaWFudChmcmFnbWVudHMubGVuZ3RoID09PSAxLCBcIkZvdW5kIFwiICsgZnJhZ21lbnRzLmxlbmd0aCArIFwiIGZyYWdtZW50cy4gYGZyYWdtZW50TmFtZWAgbXVzdCBiZSBwcm92aWRlZCB3aGVuIHRoZXJlIGlzIG5vdCBleGFjdGx5IDEgZnJhZ21lbnQuXCIpO1xuICAgICAgICBhY3R1YWxGcmFnbWVudE5hbWUgPSBmcmFnbWVudHNbMF0ubmFtZS52YWx1ZTtcbiAgICB9XG4gICAgdmFyIHF1ZXJ5ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGRvY3VtZW50KSwgeyBkZWZpbml0aW9uczogX19zcHJlYWRBcnJheXMoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtpbmQ6ICdPcGVyYXRpb25EZWZpbml0aW9uJyxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdxdWVyeScsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdTZWxlY3Rpb25TZXQnLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZDogJ0ZyYWdtZW50U3ByZWFkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFjdHVhbEZyYWdtZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBdLCBkb2N1bWVudC5kZWZpbml0aW9ucykgfSk7XG4gICAgcmV0dXJuIHF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3VuZGVmaW5lZCcgfHwgc291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGdldE11dGF0aW9uRGVmaW5pdGlvbihkb2MpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvYyk7XG4gICAgdmFyIG11dGF0aW9uRGVmID0gZG9jLmRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicgJiZcbiAgICAgICAgICAgIGRlZmluaXRpb24ub3BlcmF0aW9uID09PSAnbXV0YXRpb24nO1xuICAgIH0pWzBdO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChtdXRhdGlvbkRlZiwgMSkgOiBpbnZhcmlhbnQobXV0YXRpb25EZWYsICdNdXN0IGNvbnRhaW4gYSBtdXRhdGlvbiBkZWZpbml0aW9uLicpO1xuICAgIHJldHVybiBtdXRhdGlvbkRlZjtcbn1cbmZ1bmN0aW9uIGNoZWNrRG9jdW1lbnQoZG9jKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGRvYyAmJiBkb2Mua2luZCA9PT0gJ0RvY3VtZW50JywgMikgOiBpbnZhcmlhbnQoZG9jICYmIGRvYy5raW5kID09PSAnRG9jdW1lbnQnLCBcIkV4cGVjdGluZyBhIHBhcnNlZCBHcmFwaFFMIGRvY3VtZW50LiBQZXJoYXBzIHlvdSBuZWVkIHRvIHdyYXAgdGhlIHF1ZXJ5IHN0cmluZyBpbiBhIFxcXCJncWxcXFwiIHRhZz8gaHR0cDovL2RvY3MuYXBvbGxvc3RhY2suY29tL2Fwb2xsby1jbGllbnQvY29yZS5odG1sI2dxbFwiKTtcbiAgICB2YXIgb3BlcmF0aW9ucyA9IGRvYy5kZWZpbml0aW9uc1xuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nOyB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgIT09ICdPcGVyYXRpb25EZWZpbml0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gbmV3IEludmFyaWFudEVycm9yKDMpIDogbmV3IEludmFyaWFudEVycm9yKFwiU2NoZW1hIHR5cGUgZGVmaW5pdGlvbnMgbm90IGFsbG93ZWQgaW4gcXVlcmllcy4gRm91bmQ6IFxcXCJcIiArIGRlZmluaXRpb24ua2luZCArIFwiXFxcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbjtcbiAgICB9KTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQob3BlcmF0aW9ucy5sZW5ndGggPD0gMSwgNCkgOiBpbnZhcmlhbnQob3BlcmF0aW9ucy5sZW5ndGggPD0gMSwgXCJBbWJpZ3VvdXMgR3JhcGhRTCBkb2N1bWVudDogY29udGFpbnMgXCIgKyBvcGVyYXRpb25zLmxlbmd0aCArIFwiIG9wZXJhdGlvbnNcIik7XG4gICAgcmV0dXJuIGRvYztcbn1cbmZ1bmN0aW9uIGdldE9wZXJhdGlvbkRlZmluaXRpb24oZG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChkb2MpO1xuICAgIHJldHVybiBkb2MuZGVmaW5pdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7IHJldHVybiBkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJzsgfSlbMF07XG59XG5mdW5jdGlvbiBnZXRPcGVyYXRpb25EZWZpbml0aW9uT3JEaWUoZG9jdW1lbnQpIHtcbiAgICB2YXIgZGVmID0gZ2V0T3BlcmF0aW9uRGVmaW5pdGlvbihkb2N1bWVudCk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGRlZiwgNSkgOiBpbnZhcmlhbnQoZGVmLCBcIkdyYXBoUUwgZG9jdW1lbnQgaXMgbWlzc2luZyBhbiBvcGVyYXRpb25cIik7XG4gICAgcmV0dXJuIGRlZjtcbn1cbmZ1bmN0aW9uIGdldE9wZXJhdGlvbk5hbWUoZG9jKSB7XG4gICAgcmV0dXJuIChkb2MuZGVmaW5pdGlvbnNcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicgJiYgZGVmaW5pdGlvbi5uYW1lO1xuICAgIH0pXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubmFtZS52YWx1ZTsgfSlbMF0gfHwgbnVsbCk7XG59XG5mdW5jdGlvbiBnZXRGcmFnbWVudERlZmluaXRpb25zKGRvYykge1xuICAgIHJldHVybiBkb2MuZGVmaW5pdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7IHJldHVybiBkZWZpbml0aW9uLmtpbmQgPT09ICdGcmFnbWVudERlZmluaXRpb24nOyB9KTtcbn1cbmZ1bmN0aW9uIGdldFF1ZXJ5RGVmaW5pdGlvbihkb2MpIHtcbiAgICB2YXIgcXVlcnlEZWYgPSBnZXRPcGVyYXRpb25EZWZpbml0aW9uKGRvYyk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KHF1ZXJ5RGVmICYmIHF1ZXJ5RGVmLm9wZXJhdGlvbiA9PT0gJ3F1ZXJ5JywgNikgOiBpbnZhcmlhbnQocXVlcnlEZWYgJiYgcXVlcnlEZWYub3BlcmF0aW9uID09PSAncXVlcnknLCAnTXVzdCBjb250YWluIGEgcXVlcnkgZGVmaW5pdGlvbi4nKTtcbiAgICByZXR1cm4gcXVlcnlEZWY7XG59XG5mdW5jdGlvbiBnZXRGcmFnbWVudERlZmluaXRpb24oZG9jKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGRvYy5raW5kID09PSAnRG9jdW1lbnQnLCA3KSA6IGludmFyaWFudChkb2Mua2luZCA9PT0gJ0RvY3VtZW50JywgXCJFeHBlY3RpbmcgYSBwYXJzZWQgR3JhcGhRTCBkb2N1bWVudC4gUGVyaGFwcyB5b3UgbmVlZCB0byB3cmFwIHRoZSBxdWVyeSBzdHJpbmcgaW4gYSBcXFwiZ3FsXFxcIiB0YWc/IGh0dHA6Ly9kb2NzLmFwb2xsb3N0YWNrLmNvbS9hcG9sbG8tY2xpZW50L2NvcmUuaHRtbCNncWxcIik7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGRvYy5kZWZpbml0aW9ucy5sZW5ndGggPD0gMSwgOCkgOiBpbnZhcmlhbnQoZG9jLmRlZmluaXRpb25zLmxlbmd0aCA8PSAxLCAnRnJhZ21lbnQgbXVzdCBoYXZlIGV4YWN0bHkgb25lIGRlZmluaXRpb24uJyk7XG4gICAgdmFyIGZyYWdtZW50RGVmID0gZG9jLmRlZmluaXRpb25zWzBdO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmcmFnbWVudERlZi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJywgOSkgOiBpbnZhcmlhbnQoZnJhZ21lbnREZWYua2luZCA9PT0gJ0ZyYWdtZW50RGVmaW5pdGlvbicsICdNdXN0IGJlIGEgZnJhZ21lbnQgZGVmaW5pdGlvbi4nKTtcbiAgICByZXR1cm4gZnJhZ21lbnREZWY7XG59XG5mdW5jdGlvbiBnZXRNYWluRGVmaW5pdGlvbihxdWVyeURvYykge1xuICAgIGNoZWNrRG9jdW1lbnQocXVlcnlEb2MpO1xuICAgIHZhciBmcmFnbWVudERlZmluaXRpb247XG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHF1ZXJ5RG9jLmRlZmluaXRpb25zOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IF9hW19pXTtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nKSB7XG4gICAgICAgICAgICB2YXIgb3BlcmF0aW9uID0gZGVmaW5pdGlvbi5vcGVyYXRpb247XG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAncXVlcnknIHx8XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uID09PSAnbXV0YXRpb24nIHx8XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uID09PSAnc3Vic2NyaXB0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZpbml0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdGcmFnbWVudERlZmluaXRpb24nICYmICFmcmFnbWVudERlZmluaXRpb24pIHtcbiAgICAgICAgICAgIGZyYWdtZW50RGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZyYWdtZW50RGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm4gZnJhZ21lbnREZWZpbml0aW9uO1xuICAgIH1cbiAgICB0aHJvdyBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBuZXcgSW52YXJpYW50RXJyb3IoMTApIDogbmV3IEludmFyaWFudEVycm9yKCdFeHBlY3RlZCBhIHBhcnNlZCBHcmFwaFFMIHF1ZXJ5IHdpdGggYSBxdWVyeSwgbXV0YXRpb24sIHN1YnNjcmlwdGlvbiwgb3IgYSBmcmFnbWVudC4nKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50TWFwKGZyYWdtZW50cykge1xuICAgIGlmIChmcmFnbWVudHMgPT09IHZvaWQgMCkgeyBmcmFnbWVudHMgPSBbXTsgfVxuICAgIHZhciBzeW1UYWJsZSA9IHt9O1xuICAgIGZyYWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICBzeW1UYWJsZVtmcmFnbWVudC5uYW1lLnZhbHVlXSA9IGZyYWdtZW50O1xuICAgIH0pO1xuICAgIHJldHVybiBzeW1UYWJsZTtcbn1cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmaW5pdGlvbikge1xuICAgIGlmIChkZWZpbml0aW9uICYmXG4gICAgICAgIGRlZmluaXRpb24udmFyaWFibGVEZWZpbml0aW9ucyAmJlxuICAgICAgICBkZWZpbml0aW9uLnZhcmlhYmxlRGVmaW5pdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWVzID0gZGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IF9hLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHZhcmlhYmxlID0gX2EudmFyaWFibGUsIGRlZmF1bHRWYWx1ZSA9IF9hLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsdWVPYmogPSB7fTtcbiAgICAgICAgICAgIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihkZWZhdWx0VmFsdWVPYmosIHZhcmlhYmxlLm5hbWUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlT2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFzc2lnbi5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXlzKFt7fV0sIGRlZmF1bHRWYWx1ZXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xufVxuZnVuY3Rpb24gdmFyaWFibGVzSW5PcGVyYXRpb24ob3BlcmF0aW9uKSB7XG4gICAgdmFyIG5hbWVzID0gbmV3IFNldCgpO1xuICAgIGlmIChvcGVyYXRpb24udmFyaWFibGVEZWZpbml0aW9ucykge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gb3BlcmF0aW9uLnZhcmlhYmxlRGVmaW5pdGlvbnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IF9hW19pXTtcbiAgICAgICAgICAgIG5hbWVzLmFkZChkZWZpbml0aW9uLnZhcmlhYmxlLm5hbWUudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYW1lcztcbn1cblxuZnVuY3Rpb24gZmlsdGVySW5QbGFjZShhcnJheSwgdGVzdCwgY29udGV4dCkge1xuICAgIHZhciB0YXJnZXQgPSAwO1xuICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24gKGVsZW0sIGkpIHtcbiAgICAgICAgaWYgKHRlc3QuY2FsbCh0aGlzLCBlbGVtLCBpLCBhcnJheSkpIHtcbiAgICAgICAgICAgIGFycmF5W3RhcmdldCsrXSA9IGVsZW07XG4gICAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgICBhcnJheS5sZW5ndGggPSB0YXJnZXQ7XG4gICAgcmV0dXJuIGFycmF5O1xufVxuXG52YXIgVFlQRU5BTUVfRklFTEQgPSB7XG4gICAga2luZDogJ0ZpZWxkJyxcbiAgICBuYW1lOiB7XG4gICAgICAgIGtpbmQ6ICdOYW1lJyxcbiAgICAgICAgdmFsdWU6ICdfX3R5cGVuYW1lJyxcbiAgICB9LFxufTtcbmZ1bmN0aW9uIGlzRW1wdHkob3AsIGZyYWdtZW50cykge1xuICAgIHJldHVybiBvcC5zZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5ldmVyeShmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb24ua2luZCA9PT0gJ0ZyYWdtZW50U3ByZWFkJyAmJlxuICAgICAgICAgICAgaXNFbXB0eShmcmFnbWVudHNbc2VsZWN0aW9uLm5hbWUudmFsdWVdLCBmcmFnbWVudHMpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbnVsbElmRG9jSXNFbXB0eShkb2MpIHtcbiAgICByZXR1cm4gaXNFbXB0eShnZXRPcGVyYXRpb25EZWZpbml0aW9uKGRvYykgfHwgZ2V0RnJhZ21lbnREZWZpbml0aW9uKGRvYyksIGNyZWF0ZUZyYWdtZW50TWFwKGdldEZyYWdtZW50RGVmaW5pdGlvbnMoZG9jKSkpXG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IGRvYztcbn1cbmZ1bmN0aW9uIGdldERpcmVjdGl2ZU1hdGNoZXIoZGlyZWN0aXZlcykge1xuICAgIHJldHVybiBmdW5jdGlvbiBkaXJlY3RpdmVNYXRjaGVyKGRpcmVjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlcy5zb21lKGZ1bmN0aW9uIChkaXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoZGlyLm5hbWUgJiYgZGlyLm5hbWUgPT09IGRpcmVjdGl2ZS5uYW1lLnZhbHVlKSB8fFxuICAgICAgICAgICAgICAgIChkaXIudGVzdCAmJiBkaXIudGVzdChkaXJlY3RpdmUpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJlbW92ZURpcmVjdGl2ZXNGcm9tRG9jdW1lbnQoZGlyZWN0aXZlcywgZG9jKSB7XG4gICAgdmFyIHZhcmlhYmxlc0luVXNlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgdmFyaWFibGVzVG9SZW1vdmUgPSBbXTtcbiAgICB2YXIgZnJhZ21lbnRTcHJlYWRzSW5Vc2UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBmcmFnbWVudFNwcmVhZHNUb1JlbW92ZSA9IFtdO1xuICAgIHZhciBtb2RpZmllZERvYyA9IG51bGxJZkRvY0lzRW1wdHkodmlzaXQoZG9jLCB7XG4gICAgICAgIFZhcmlhYmxlOiB7XG4gICAgICAgICAgICBlbnRlcjogZnVuY3Rpb24gKG5vZGUsIF9rZXksIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQua2luZCAhPT0gJ1ZhcmlhYmxlRGVmaW5pdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzSW5Vc2Vbbm9kZS5uYW1lLnZhbHVlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgRmllbGQ6IHtcbiAgICAgICAgICAgIGVudGVyOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmVzICYmIG5vZGUuZGlyZWN0aXZlcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2hvdWxkUmVtb3ZlRmllbGQgPSBkaXJlY3RpdmVzLnNvbWUoZnVuY3Rpb24gKGRpcmVjdGl2ZSkgeyByZXR1cm4gZGlyZWN0aXZlLnJlbW92ZTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRSZW1vdmVGaWVsZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kaXJlY3RpdmVzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRpcmVjdGl2ZXMuc29tZShnZXREaXJlY3RpdmVNYXRjaGVyKGRpcmVjdGl2ZXMpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuYXJndW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hcmd1bWVudHMuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmcudmFsdWUua2luZCA9PT0gJ1ZhcmlhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzVG9SZW1vdmUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYXJnLnZhbHVlLm5hbWUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWxsRnJhZ21lbnRTcHJlYWRzRnJvbVNlbGVjdGlvblNldChub2RlLnNlbGVjdGlvblNldCkuZm9yRWFjaChmdW5jdGlvbiAoZnJhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudFNwcmVhZHNUb1JlbW92ZS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZyYWcubmFtZS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEZyYWdtZW50U3ByZWFkOiB7XG4gICAgICAgICAgICBlbnRlcjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudFNwcmVhZHNJblVzZVtub2RlLm5hbWUudmFsdWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIERpcmVjdGl2ZToge1xuICAgICAgICAgICAgZW50ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdldERpcmVjdGl2ZU1hdGNoZXIoZGlyZWN0aXZlcykobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KSk7XG4gICAgaWYgKG1vZGlmaWVkRG9jICYmXG4gICAgICAgIGZpbHRlckluUGxhY2UodmFyaWFibGVzVG9SZW1vdmUsIGZ1bmN0aW9uICh2KSB7IHJldHVybiAhdmFyaWFibGVzSW5Vc2Vbdi5uYW1lXTsgfSkubGVuZ3RoKSB7XG4gICAgICAgIG1vZGlmaWVkRG9jID0gcmVtb3ZlQXJndW1lbnRzRnJvbURvY3VtZW50KHZhcmlhYmxlc1RvUmVtb3ZlLCBtb2RpZmllZERvYyk7XG4gICAgfVxuICAgIGlmIChtb2RpZmllZERvYyAmJlxuICAgICAgICBmaWx0ZXJJblBsYWNlKGZyYWdtZW50U3ByZWFkc1RvUmVtb3ZlLCBmdW5jdGlvbiAoZnMpIHsgcmV0dXJuICFmcmFnbWVudFNwcmVhZHNJblVzZVtmcy5uYW1lXTsgfSlcbiAgICAgICAgICAgIC5sZW5ndGgpIHtcbiAgICAgICAgbW9kaWZpZWREb2MgPSByZW1vdmVGcmFnbWVudFNwcmVhZEZyb21Eb2N1bWVudChmcmFnbWVudFNwcmVhZHNUb1JlbW92ZSwgbW9kaWZpZWREb2MpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kaWZpZWREb2M7XG59XG5mdW5jdGlvbiBhZGRUeXBlbmFtZVRvRG9jdW1lbnQoZG9jKSB7XG4gICAgcmV0dXJuIHZpc2l0KGNoZWNrRG9jdW1lbnQoZG9jKSwge1xuICAgICAgICBTZWxlY3Rpb25TZXQ6IHtcbiAgICAgICAgICAgIGVudGVyOiBmdW5jdGlvbiAobm9kZSwgX2tleSwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJlxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBub2RlLnNlbGVjdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNraXAgPSBzZWxlY3Rpb25zLnNvbWUoZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGlzRmllbGQoc2VsZWN0aW9uKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGlvbi5uYW1lLnZhbHVlID09PSAnX190eXBlbmFtZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24ubmFtZS52YWx1ZS5sYXN0SW5kZXhPZignX18nLCAwKSA9PT0gMCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChza2lwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkKGZpZWxkKSAmJlxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5kaXJlY3RpdmVzICYmXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmRpcmVjdGl2ZXMuc29tZShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5uYW1lLnZhbHVlID09PSAnZXhwb3J0JzsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIG5vZGUpLCB7IHNlbGVjdGlvbnM6IF9fc3ByZWFkQXJyYXlzKHNlbGVjdGlvbnMsIFtUWVBFTkFNRV9GSUVMRF0pIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbnZhciBjb25uZWN0aW9uUmVtb3ZlQ29uZmlnID0ge1xuICAgIHRlc3Q6IGZ1bmN0aW9uIChkaXJlY3RpdmUpIHtcbiAgICAgICAgdmFyIHdpbGxSZW1vdmUgPSBkaXJlY3RpdmUubmFtZS52YWx1ZSA9PT0gJ2Nvbm5lY3Rpb24nO1xuICAgICAgICBpZiAod2lsbFJlbW92ZSkge1xuICAgICAgICAgICAgaWYgKCFkaXJlY3RpdmUuYXJndW1lbnRzIHx8XG4gICAgICAgICAgICAgICAgIWRpcmVjdGl2ZS5hcmd1bWVudHMuc29tZShmdW5jdGlvbiAoYXJnKSB7IHJldHVybiBhcmcubmFtZS52YWx1ZSA9PT0gJ2tleSc7IH0pKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiIHx8IGludmFyaWFudC53YXJuKCdSZW1vdmluZyBhbiBAY29ubmVjdGlvbiBkaXJlY3RpdmUgZXZlbiB0aG91Z2ggaXQgZG9lcyBub3QgaGF2ZSBhIGtleS4gJyArXG4gICAgICAgICAgICAgICAgICAgICdZb3UgbWF5IHdhbnQgdG8gdXNlIHRoZSBrZXkgcGFyYW1ldGVyIHRvIHNwZWNpZnkgYSBzdG9yZSBrZXkuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdpbGxSZW1vdmU7XG4gICAgfSxcbn07XG5mdW5jdGlvbiByZW1vdmVDb25uZWN0aW9uRGlyZWN0aXZlRnJvbURvY3VtZW50KGRvYykge1xuICAgIHJldHVybiByZW1vdmVEaXJlY3RpdmVzRnJvbURvY3VtZW50KFtjb25uZWN0aW9uUmVtb3ZlQ29uZmlnXSwgY2hlY2tEb2N1bWVudChkb2MpKTtcbn1cbmZ1bmN0aW9uIGhhc0RpcmVjdGl2ZXNJblNlbGVjdGlvblNldChkaXJlY3RpdmVzLCBzZWxlY3Rpb25TZXQsIG5lc3RlZENoZWNrKSB7XG4gICAgaWYgKG5lc3RlZENoZWNrID09PSB2b2lkIDApIHsgbmVzdGVkQ2hlY2sgPSB0cnVlOyB9XG4gICAgcmV0dXJuIChzZWxlY3Rpb25TZXQgJiZcbiAgICAgICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMgJiZcbiAgICAgICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuc29tZShmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gaGFzRGlyZWN0aXZlc0luU2VsZWN0aW9uKGRpcmVjdGl2ZXMsIHNlbGVjdGlvbiwgbmVzdGVkQ2hlY2spO1xuICAgICAgICB9KSk7XG59XG5mdW5jdGlvbiBoYXNEaXJlY3RpdmVzSW5TZWxlY3Rpb24oZGlyZWN0aXZlcywgc2VsZWN0aW9uLCBuZXN0ZWRDaGVjaykge1xuICAgIGlmIChuZXN0ZWRDaGVjayA9PT0gdm9pZCAwKSB7IG5lc3RlZENoZWNrID0gdHJ1ZTsgfVxuICAgIGlmICghaXNGaWVsZChzZWxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbi5kaXJlY3RpdmVzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChzZWxlY3Rpb24uZGlyZWN0aXZlcy5zb21lKGdldERpcmVjdGl2ZU1hdGNoZXIoZGlyZWN0aXZlcykpIHx8XG4gICAgICAgIChuZXN0ZWRDaGVjayAmJlxuICAgICAgICAgICAgaGFzRGlyZWN0aXZlc0luU2VsZWN0aW9uU2V0KGRpcmVjdGl2ZXMsIHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQsIG5lc3RlZENoZWNrKSkpO1xufVxuZnVuY3Rpb24gZ2V0RGlyZWN0aXZlc0Zyb21Eb2N1bWVudChkaXJlY3RpdmVzLCBkb2MpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvYyk7XG4gICAgdmFyIHBhcmVudFBhdGg7XG4gICAgcmV0dXJuIG51bGxJZkRvY0lzRW1wdHkodmlzaXQoZG9jLCB7XG4gICAgICAgIFNlbGVjdGlvblNldDoge1xuICAgICAgICAgICAgZW50ZXI6IGZ1bmN0aW9uIChub2RlLCBfa2V5LCBfcGFyZW50LCBwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aC5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJlbnRQYXRoIHx8XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRoID09PSBwYXJlbnRQYXRoIHx8XG4gICAgICAgICAgICAgICAgICAgICFjdXJyZW50UGF0aC5zdGFydHNXaXRoKHBhcmVudFBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnNlbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb25zV2l0aERpcmVjdGl2ZXMgPSBub2RlLnNlbGVjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHsgcmV0dXJuIGhhc0RpcmVjdGl2ZXNJblNlbGVjdGlvbihkaXJlY3RpdmVzLCBzZWxlY3Rpb24pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNEaXJlY3RpdmVzSW5TZWxlY3Rpb25TZXQoZGlyZWN0aXZlcywgbm9kZSwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50UGF0aCA9IGN1cnJlbnRQYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBub2RlKSwgeyBzZWxlY3Rpb25zOiBzZWxlY3Rpb25zV2l0aERpcmVjdGl2ZXMgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSkpO1xufVxuZnVuY3Rpb24gZ2V0QXJndW1lbnRNYXRjaGVyKGNvbmZpZykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcmd1bWVudE1hdGNoZXIoYXJndW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5zb21lKGZ1bmN0aW9uIChhQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnQudmFsdWUgJiZcbiAgICAgICAgICAgICAgICBhcmd1bWVudC52YWx1ZS5raW5kID09PSAnVmFyaWFibGUnICYmXG4gICAgICAgICAgICAgICAgYXJndW1lbnQudmFsdWUubmFtZSAmJlxuICAgICAgICAgICAgICAgIChhQ29uZmlnLm5hbWUgPT09IGFyZ3VtZW50LnZhbHVlLm5hbWUudmFsdWUgfHxcbiAgICAgICAgICAgICAgICAgICAgKGFDb25maWcudGVzdCAmJiBhQ29uZmlnLnRlc3QoYXJndW1lbnQpKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5mdW5jdGlvbiByZW1vdmVBcmd1bWVudHNGcm9tRG9jdW1lbnQoY29uZmlnLCBkb2MpIHtcbiAgICB2YXIgYXJnTWF0Y2hlciA9IGdldEFyZ3VtZW50TWF0Y2hlcihjb25maWcpO1xuICAgIHJldHVybiBudWxsSWZEb2NJc0VtcHR5KHZpc2l0KGRvYywge1xuICAgICAgICBPcGVyYXRpb25EZWZpbml0aW9uOiB7XG4gICAgICAgICAgICBlbnRlcjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIG5vZGUpLCB7IHZhcmlhYmxlRGVmaW5pdGlvbnM6IG5vZGUudmFyaWFibGVEZWZpbml0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKHZhckRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFjb25maWcuc29tZShmdW5jdGlvbiAoYXJnKSB7IHJldHVybiBhcmcubmFtZSA9PT0gdmFyRGVmLnZhcmlhYmxlLm5hbWUudmFsdWU7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEZpZWxkOiB7XG4gICAgICAgICAgICBlbnRlcjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2hvdWxkUmVtb3ZlRmllbGQgPSBjb25maWcuc29tZShmdW5jdGlvbiAoYXJnQ29uZmlnKSB7IHJldHVybiBhcmdDb25maWcucmVtb3ZlOyB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkUmVtb3ZlRmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ01hdGNoQ291bnRfMSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYXJndW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ01hdGNoZXIoYXJnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ01hdGNoQ291bnRfMSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ01hdGNoQ291bnRfMSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBBcmd1bWVudDoge1xuICAgICAgICAgICAgZW50ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ01hdGNoZXIobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KSk7XG59XG5mdW5jdGlvbiByZW1vdmVGcmFnbWVudFNwcmVhZEZyb21Eb2N1bWVudChjb25maWcsIGRvYykge1xuICAgIGZ1bmN0aW9uIGVudGVyKG5vZGUpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5zb21lKGZ1bmN0aW9uIChkZWYpIHsgcmV0dXJuIGRlZi5uYW1lID09PSBub2RlLm5hbWUudmFsdWU7IH0pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbElmRG9jSXNFbXB0eSh2aXNpdChkb2MsIHtcbiAgICAgICAgRnJhZ21lbnRTcHJlYWQ6IHsgZW50ZXI6IGVudGVyIH0sXG4gICAgICAgIEZyYWdtZW50RGVmaW5pdGlvbjogeyBlbnRlcjogZW50ZXIgfSxcbiAgICB9KSk7XG59XG5mdW5jdGlvbiBnZXRBbGxGcmFnbWVudFNwcmVhZHNGcm9tU2VsZWN0aW9uU2V0KHNlbGVjdGlvblNldCkge1xuICAgIHZhciBhbGxGcmFnbWVudHMgPSBbXTtcbiAgICBzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKChpc0ZpZWxkKHNlbGVjdGlvbikgfHwgaXNJbmxpbmVGcmFnbWVudChzZWxlY3Rpb24pKSAmJlxuICAgICAgICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblNldCkge1xuICAgICAgICAgICAgZ2V0QWxsRnJhZ21lbnRTcHJlYWRzRnJvbVNlbGVjdGlvblNldChzZWxlY3Rpb24uc2VsZWN0aW9uU2V0KS5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnKSB7IHJldHVybiBhbGxGcmFnbWVudHMucHVzaChmcmFnKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0aW9uLmtpbmQgPT09ICdGcmFnbWVudFNwcmVhZCcpIHtcbiAgICAgICAgICAgIGFsbEZyYWdtZW50cy5wdXNoKHNlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsRnJhZ21lbnRzO1xufVxuZnVuY3Rpb24gYnVpbGRRdWVyeUZyb21TZWxlY3Rpb25TZXQoZG9jdW1lbnQpIHtcbiAgICB2YXIgZGVmaW5pdGlvbiA9IGdldE1haW5EZWZpbml0aW9uKGRvY3VtZW50KTtcbiAgICB2YXIgZGVmaW5pdGlvbk9wZXJhdGlvbiA9IGRlZmluaXRpb24ub3BlcmF0aW9uO1xuICAgIGlmIChkZWZpbml0aW9uT3BlcmF0aW9uID09PSAncXVlcnknKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICB9XG4gICAgdmFyIG1vZGlmaWVkRG9jID0gdmlzaXQoZG9jdW1lbnQsIHtcbiAgICAgICAgT3BlcmF0aW9uRGVmaW5pdGlvbjoge1xuICAgICAgICAgICAgZW50ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBub2RlKSwgeyBvcGVyYXRpb246ICdxdWVyeScgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiBtb2RpZmllZERvYztcbn1cbmZ1bmN0aW9uIHJlbW92ZUNsaWVudFNldHNGcm9tRG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvY3VtZW50KTtcbiAgICB2YXIgbW9kaWZpZWREb2MgPSByZW1vdmVEaXJlY3RpdmVzRnJvbURvY3VtZW50KFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGVzdDogZnVuY3Rpb24gKGRpcmVjdGl2ZSkgeyByZXR1cm4gZGlyZWN0aXZlLm5hbWUudmFsdWUgPT09ICdjbGllbnQnOyB9LFxuICAgICAgICAgICAgcmVtb3ZlOiB0cnVlLFxuICAgICAgICB9LFxuICAgIF0sIGRvY3VtZW50KTtcbiAgICBpZiAobW9kaWZpZWREb2MpIHtcbiAgICAgICAgbW9kaWZpZWREb2MgPSB2aXNpdChtb2RpZmllZERvYywge1xuICAgICAgICAgICAgRnJhZ21lbnREZWZpbml0aW9uOiB7XG4gICAgICAgICAgICAgICAgZW50ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnNlbGVjdGlvblNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZW5hbWVPbmx5ID0gbm9kZS5zZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5ldmVyeShmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzRmllbGQoc2VsZWN0aW9uKSAmJiBzZWxlY3Rpb24ubmFtZS52YWx1ZSA9PT0gJ19fdHlwZW5hbWUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNUeXBlbmFtZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1vZGlmaWVkRG9jO1xufVxuXG52YXIgY2FuVXNlV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmICEodHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiZcbiAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyk7XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5mdW5jdGlvbiBjbG9uZURlZXAodmFsdWUpIHtcbiAgICByZXR1cm4gY2xvbmVEZWVwSGVscGVyKHZhbHVlLCBuZXcgTWFwKCkpO1xufVxuZnVuY3Rpb24gY2xvbmVEZWVwSGVscGVyKHZhbCwgc2Vlbikge1xuICAgIHN3aXRjaCAodG9TdHJpbmcuY2FsbCh2YWwpKSB7XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IEFycmF5XVwiOiB7XG4gICAgICAgICAgICBpZiAoc2Vlbi5oYXModmFsKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5nZXQodmFsKTtcbiAgICAgICAgICAgIHZhciBjb3B5XzEgPSB2YWwuc2xpY2UoMCk7XG4gICAgICAgICAgICBzZWVuLnNldCh2YWwsIGNvcHlfMSk7XG4gICAgICAgICAgICBjb3B5XzEuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQsIGkpIHtcbiAgICAgICAgICAgICAgICBjb3B5XzFbaV0gPSBjbG9uZURlZXBIZWxwZXIoY2hpbGQsIHNlZW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY29weV8xO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IE9iamVjdF1cIjoge1xuICAgICAgICAgICAgaWYgKHNlZW4uaGFzKHZhbCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlZW4uZ2V0KHZhbCk7XG4gICAgICAgICAgICB2YXIgY29weV8yID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKSk7XG4gICAgICAgICAgICBzZWVuLnNldCh2YWwsIGNvcHlfMik7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh2YWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIGNvcHlfMltrZXldID0gY2xvbmVEZWVwSGVscGVyKHZhbFtrZXldLCBzZWVuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNvcHlfMjtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEVudigpIHtcbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOVjtcbiAgICB9XG4gICAgcmV0dXJuICdkZXZlbG9wbWVudCc7XG59XG5mdW5jdGlvbiBpc0VudihlbnYpIHtcbiAgICByZXR1cm4gZ2V0RW52KCkgPT09IGVudjtcbn1cbmZ1bmN0aW9uIGlzUHJvZHVjdGlvbigpIHtcbiAgICByZXR1cm4gaXNFbnYoJ3Byb2R1Y3Rpb24nKSA9PT0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGlzRGV2ZWxvcG1lbnQoKSB7XG4gICAgcmV0dXJuIGlzRW52KCdkZXZlbG9wbWVudCcpID09PSB0cnVlO1xufVxuZnVuY3Rpb24gaXNUZXN0KCkge1xuICAgIHJldHVybiBpc0VudigndGVzdCcpID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiB0cnlGdW5jdGlvbk9yTG9nRXJyb3IoZikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmKCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQuZXJyb3JzICYmIHJlc3VsdC5lcnJvcnMubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBkZWVwRnJlZXplKG8pIHtcbiAgICBPYmplY3QuZnJlZXplKG8pO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKG9bcHJvcF0gIT09IG51bGwgJiZcbiAgICAgICAgICAgICh0eXBlb2Ygb1twcm9wXSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9bcHJvcF0gPT09ICdmdW5jdGlvbicpICYmXG4gICAgICAgICAgICAhT2JqZWN0LmlzRnJvemVuKG9bcHJvcF0pKSB7XG4gICAgICAgICAgICBkZWVwRnJlZXplKG9bcHJvcF0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBtYXliZURlZXBGcmVlemUob2JqKSB7XG4gICAgaWYgKGlzRGV2ZWxvcG1lbnQoKSB8fCBpc1Rlc3QoKSkge1xuICAgICAgICB2YXIgc3ltYm9sSXNQb2x5ZmlsbGVkID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sKCcnKSA9PT0gJ3N0cmluZyc7XG4gICAgICAgIGlmICghc3ltYm9sSXNQb2x5ZmlsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVlcEZyZWV6ZShvYmopO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5mdW5jdGlvbiBtZXJnZURlZXAoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBtZXJnZURlZXBBcnJheShzb3VyY2VzKTtcbn1cbmZ1bmN0aW9uIG1lcmdlRGVlcEFycmF5KHNvdXJjZXMpIHtcbiAgICB2YXIgdGFyZ2V0ID0gc291cmNlc1swXSB8fCB7fTtcbiAgICB2YXIgY291bnQgPSBzb3VyY2VzLmxlbmd0aDtcbiAgICBpZiAoY291bnQgPiAxKSB7XG4gICAgICAgIHZhciBwYXN0Q29waWVzID0gW107XG4gICAgICAgIHRhcmdldCA9IHNoYWxsb3dDb3B5Rm9yTWVyZ2UodGFyZ2V0LCBwYXN0Q29waWVzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBtZXJnZUhlbHBlcih0YXJnZXQsIHNvdXJjZXNbaV0sIHBhc3RDb3BpZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xufVxuZnVuY3Rpb24gbWVyZ2VIZWxwZXIodGFyZ2V0LCBzb3VyY2UsIHBhc3RDb3BpZXMpIHtcbiAgICBpZiAoaXNPYmplY3Qoc291cmNlKSAmJiBpc09iamVjdCh0YXJnZXQpKSB7XG4gICAgICAgIGlmIChPYmplY3QuaXNFeHRlbnNpYmxlICYmICFPYmplY3QuaXNFeHRlbnNpYmxlKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHNoYWxsb3dDb3B5Rm9yTWVyZ2UodGFyZ2V0LCBwYXN0Q29waWVzKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZUtleSkge1xuICAgICAgICAgICAgdmFyIHNvdXJjZVZhbHVlID0gc291cmNlW3NvdXJjZUtleV07XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIHNvdXJjZUtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0VmFsdWUgPSB0YXJnZXRbc291cmNlS2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlVmFsdWUgIT09IHRhcmdldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VLZXldID0gbWVyZ2VIZWxwZXIoc2hhbGxvd0NvcHlGb3JNZXJnZSh0YXJnZXRWYWx1ZSwgcGFzdENvcGllcyksIHNvdXJjZVZhbHVlLCBwYXN0Q29waWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlS2V5XSA9IHNvdXJjZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbn1cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5Rm9yTWVyZ2UodmFsdWUsIHBhc3RDb3BpZXMpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBwYXN0Q29waWVzLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IF9fYXNzaWduKHsgX19wcm90b19fOiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpIH0sIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBwYXN0Q29waWVzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBoYXZlV2FybmVkID0gT2JqZWN0LmNyZWF0ZSh7fSk7XG5mdW5jdGlvbiB3YXJuT25jZUluRGV2ZWxvcG1lbnQobXNnLCB0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09IHZvaWQgMCkgeyB0eXBlID0gJ3dhcm4nOyB9XG4gICAgaWYgKCFpc1Byb2R1Y3Rpb24oKSAmJiAhaGF2ZVdhcm5lZFttc2ddKSB7XG4gICAgICAgIGlmICghaXNUZXN0KCkpIHtcbiAgICAgICAgICAgIGhhdmVXYXJuZWRbbXNnXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdHJpcFN5bWJvbHMoZGF0YSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn1cblxuZXhwb3J0IHsgYWRkVHlwZW5hbWVUb0RvY3VtZW50LCBhcmd1bWVudHNPYmplY3RGcm9tRmllbGQsIGFzc2lnbiwgYnVpbGRRdWVyeUZyb21TZWxlY3Rpb25TZXQsIGNhblVzZVdlYWtNYXAsIGNoZWNrRG9jdW1lbnQsIGNsb25lRGVlcCwgY3JlYXRlRnJhZ21lbnRNYXAsIGdldERlZmF1bHRWYWx1ZXMsIGdldERpcmVjdGl2ZUluZm9Gcm9tRmllbGQsIGdldERpcmVjdGl2ZU5hbWVzLCBnZXREaXJlY3RpdmVzRnJvbURvY3VtZW50LCBnZXRFbnYsIGdldEZyYWdtZW50RGVmaW5pdGlvbiwgZ2V0RnJhZ21lbnREZWZpbml0aW9ucywgZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50LCBnZXRJbmNsdXNpb25EaXJlY3RpdmVzLCBnZXRNYWluRGVmaW5pdGlvbiwgZ2V0TXV0YXRpb25EZWZpbml0aW9uLCBnZXRPcGVyYXRpb25EZWZpbml0aW9uLCBnZXRPcGVyYXRpb25EZWZpbml0aW9uT3JEaWUsIGdldE9wZXJhdGlvbk5hbWUsIGdldFF1ZXJ5RGVmaW5pdGlvbiwgZ2V0U3RvcmVLZXlOYW1lLCBncmFwaFFMUmVzdWx0SGFzRXJyb3IsIGhhc0NsaWVudEV4cG9ydHMsIGhhc0RpcmVjdGl2ZXMsIGlzRGV2ZWxvcG1lbnQsIGlzRW52LCBpc0ZpZWxkLCBpc0lkVmFsdWUsIGlzSW5saW5lRnJhZ21lbnQsIGlzSnNvblZhbHVlLCBpc051bWJlclZhbHVlLCBpc1Byb2R1Y3Rpb24sIGlzU2NhbGFyVmFsdWUsIGlzVGVzdCwgbWF5YmVEZWVwRnJlZXplLCBtZXJnZURlZXAsIG1lcmdlRGVlcEFycmF5LCByZW1vdmVBcmd1bWVudHNGcm9tRG9jdW1lbnQsIHJlbW92ZUNsaWVudFNldHNGcm9tRG9jdW1lbnQsIHJlbW92ZUNvbm5lY3Rpb25EaXJlY3RpdmVGcm9tRG9jdW1lbnQsIHJlbW92ZURpcmVjdGl2ZXNGcm9tRG9jdW1lbnQsIHJlbW92ZUZyYWdtZW50U3ByZWFkRnJvbURvY3VtZW50LCByZXN1bHRLZXlOYW1lRnJvbUZpZWxkLCBzaG91bGRJbmNsdWRlLCBzdG9yZUtleU5hbWVGcm9tRmllbGQsIHN0cmlwU3ltYm9scywgdG9JZFZhbHVlLCB0cnlGdW5jdGlvbk9yTG9nRXJyb3IsIHZhbHVlRnJvbU5vZGUsIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbiwgdmFyaWFibGVzSW5PcGVyYXRpb24sIHdhcm5PbmNlSW5EZXZlbG9wbWVudCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVuZGxlLmVzbS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSwgb3B0cykge1xuICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykgb3B0cyA9IHsgY21wOiBvcHRzIH07XG4gICAgdmFyIGN5Y2xlcyA9ICh0eXBlb2Ygb3B0cy5jeWNsZXMgPT09ICdib29sZWFuJykgPyBvcHRzLmN5Y2xlcyA6IGZhbHNlO1xuXG4gICAgdmFyIGNtcCA9IG9wdHMuY21wICYmIChmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBhb2JqID0geyBrZXk6IGEsIHZhbHVlOiBub2RlW2FdIH07XG4gICAgICAgICAgICAgICAgdmFyIGJvYmogPSB7IGtleTogYiwgdmFsdWU6IG5vZGVbYl0gfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZihhb2JqLCBib2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSkob3B0cy5jbXApO1xuXG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIHN0cmluZ2lmeSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSAmJiBub2RlLnRvSlNPTiAmJiB0eXBlb2Ygbm9kZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnRvSlNPTigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT0gJ251bWJlcicpIHJldHVybiBpc0Zpbml0ZShub2RlKSA/ICcnICsgbm9kZSA6ICdudWxsJztcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0JykgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5vZGUpO1xuXG4gICAgICAgIHZhciBpLCBvdXQ7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICBvdXQgPSAnWyc7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpKSBvdXQgKz0gJywnO1xuICAgICAgICAgICAgICAgIG91dCArPSBzdHJpbmdpZnkobm9kZVtpXSkgfHwgJ251bGwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dCArICddJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm4gJ251bGwnO1xuXG4gICAgICAgIGlmIChzZWVuLmluZGV4T2Yobm9kZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoY3ljbGVzKSByZXR1cm4gSlNPTi5zdHJpbmdpZnkoJ19fY3ljbGVfXycpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ29udmVydGluZyBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gSlNPTicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ucHVzaChub2RlKSAtIDE7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMobm9kZSkuc29ydChjbXAgJiYgY21wKG5vZGUpKTtcbiAgICAgICAgb3V0ID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHN0cmluZ2lmeShub2RlW2tleV0pO1xuXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChvdXQpIG91dCArPSAnLCc7XG4gICAgICAgICAgICBvdXQgKz0gSlNPTi5zdHJpbmdpZnkoa2V5KSArICc6JyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHNlZW4uc3BsaWNlKHNlZW5JbmRleCwgMSk7XG4gICAgICAgIHJldHVybiAneycgKyBvdXQgKyAnfSc7XG4gICAgfSkoZGF0YSk7XG59O1xuIiwiaW1wb3J0IHsgdmlzaXQgfSBmcm9tIFwiLi92aXNpdG9yLm1qc1wiO1xuaW1wb3J0IHsgcHJpbnRCbG9ja1N0cmluZyB9IGZyb20gXCIuL2Jsb2NrU3RyaW5nLm1qc1wiO1xuLyoqXG4gKiBDb252ZXJ0cyBhbiBBU1QgaW50byBhIHN0cmluZywgdXNpbmcgb25lIHNldCBvZiByZWFzb25hYmxlXG4gKiBmb3JtYXR0aW5nIHJ1bGVzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludChhc3QpIHtcbiAgcmV0dXJuIHZpc2l0KGFzdCwge1xuICAgIGxlYXZlOiBwcmludERvY0FTVFJlZHVjZXJcbiAgfSk7XG59IC8vIFRPRE86IHByb3ZpZGUgYmV0dGVyIHR5cGUgY292ZXJhZ2UgaW4gZnV0dXJlXG5cbnZhciBwcmludERvY0FTVFJlZHVjZXIgPSB7XG4gIE5hbWU6IGZ1bmN0aW9uIE5hbWUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnZhbHVlO1xuICB9LFxuICBWYXJpYWJsZTogZnVuY3Rpb24gVmFyaWFibGUobm9kZSkge1xuICAgIHJldHVybiAnJCcgKyBub2RlLm5hbWU7XG4gIH0sXG4gIC8vIERvY3VtZW50XG4gIERvY3VtZW50OiBmdW5jdGlvbiBEb2N1bWVudChub2RlKSB7XG4gICAgcmV0dXJuIGpvaW4obm9kZS5kZWZpbml0aW9ucywgJ1xcblxcbicpICsgJ1xcbic7XG4gIH0sXG4gIE9wZXJhdGlvbkRlZmluaXRpb246IGZ1bmN0aW9uIE9wZXJhdGlvbkRlZmluaXRpb24obm9kZSkge1xuICAgIHZhciBvcCA9IG5vZGUub3BlcmF0aW9uO1xuICAgIHZhciBuYW1lID0gbm9kZS5uYW1lO1xuICAgIHZhciB2YXJEZWZzID0gd3JhcCgnKCcsIGpvaW4obm9kZS52YXJpYWJsZURlZmluaXRpb25zLCAnLCAnKSwgJyknKTtcbiAgICB2YXIgZGlyZWN0aXZlcyA9IGpvaW4obm9kZS5kaXJlY3RpdmVzLCAnICcpO1xuICAgIHZhciBzZWxlY3Rpb25TZXQgPSBub2RlLnNlbGVjdGlvblNldDsgLy8gQW5vbnltb3VzIHF1ZXJpZXMgd2l0aCBubyBkaXJlY3RpdmVzIG9yIHZhcmlhYmxlIGRlZmluaXRpb25zIGNhbiB1c2VcbiAgICAvLyB0aGUgcXVlcnkgc2hvcnQgZm9ybS5cblxuICAgIHJldHVybiAhbmFtZSAmJiAhZGlyZWN0aXZlcyAmJiAhdmFyRGVmcyAmJiBvcCA9PT0gJ3F1ZXJ5JyA/IHNlbGVjdGlvblNldCA6IGpvaW4oW29wLCBqb2luKFtuYW1lLCB2YXJEZWZzXSksIGRpcmVjdGl2ZXMsIHNlbGVjdGlvblNldF0sICcgJyk7XG4gIH0sXG4gIFZhcmlhYmxlRGVmaW5pdGlvbjogZnVuY3Rpb24gVmFyaWFibGVEZWZpbml0aW9uKF9yZWYpIHtcbiAgICB2YXIgdmFyaWFibGUgPSBfcmVmLnZhcmlhYmxlLFxuICAgICAgICB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgICBkZWZhdWx0VmFsdWUgPSBfcmVmLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYuZGlyZWN0aXZlcztcbiAgICByZXR1cm4gdmFyaWFibGUgKyAnOiAnICsgdHlwZSArIHdyYXAoJyA9ICcsIGRlZmF1bHRWYWx1ZSkgKyB3cmFwKCcgJywgam9pbihkaXJlY3RpdmVzLCAnICcpKTtcbiAgfSxcbiAgU2VsZWN0aW9uU2V0OiBmdW5jdGlvbiBTZWxlY3Rpb25TZXQoX3JlZjIpIHtcbiAgICB2YXIgc2VsZWN0aW9ucyA9IF9yZWYyLnNlbGVjdGlvbnM7XG4gICAgcmV0dXJuIGJsb2NrKHNlbGVjdGlvbnMpO1xuICB9LFxuICBGaWVsZDogZnVuY3Rpb24gRmllbGQoX3JlZjMpIHtcbiAgICB2YXIgYWxpYXMgPSBfcmVmMy5hbGlhcyxcbiAgICAgICAgbmFtZSA9IF9yZWYzLm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMy5hcmd1bWVudHMsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMy5kaXJlY3RpdmVzLFxuICAgICAgICBzZWxlY3Rpb25TZXQgPSBfcmVmMy5zZWxlY3Rpb25TZXQ7XG4gICAgcmV0dXJuIGpvaW4oW3dyYXAoJycsIGFsaWFzLCAnOiAnKSArIG5hbWUgKyB3cmFwKCcoJywgam9pbihhcmdzLCAnLCAnKSwgJyknKSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBzZWxlY3Rpb25TZXRdLCAnICcpO1xuICB9LFxuICBBcmd1bWVudDogZnVuY3Rpb24gQXJndW1lbnQoX3JlZjQpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWY0Lm5hbWUsXG4gICAgICAgIHZhbHVlID0gX3JlZjQudmFsdWU7XG4gICAgcmV0dXJuIG5hbWUgKyAnOiAnICsgdmFsdWU7XG4gIH0sXG4gIC8vIEZyYWdtZW50c1xuICBGcmFnbWVudFNwcmVhZDogZnVuY3Rpb24gRnJhZ21lbnRTcHJlYWQoX3JlZjUpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWY1Lm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmNS5kaXJlY3RpdmVzO1xuICAgIHJldHVybiAnLi4uJyArIG5hbWUgKyB3cmFwKCcgJywgam9pbihkaXJlY3RpdmVzLCAnICcpKTtcbiAgfSxcbiAgSW5saW5lRnJhZ21lbnQ6IGZ1bmN0aW9uIElubGluZUZyYWdtZW50KF9yZWY2KSB7XG4gICAgdmFyIHR5cGVDb25kaXRpb24gPSBfcmVmNi50eXBlQ29uZGl0aW9uLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjYuZGlyZWN0aXZlcyxcbiAgICAgICAgc2VsZWN0aW9uU2V0ID0gX3JlZjYuc2VsZWN0aW9uU2V0O1xuICAgIHJldHVybiBqb2luKFsnLi4uJywgd3JhcCgnb24gJywgdHlwZUNvbmRpdGlvbiksIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgc2VsZWN0aW9uU2V0XSwgJyAnKTtcbiAgfSxcbiAgRnJhZ21lbnREZWZpbml0aW9uOiBmdW5jdGlvbiBGcmFnbWVudERlZmluaXRpb24oX3JlZjcpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWY3Lm5hbWUsXG4gICAgICAgIHR5cGVDb25kaXRpb24gPSBfcmVmNy50eXBlQ29uZGl0aW9uLFxuICAgICAgICB2YXJpYWJsZURlZmluaXRpb25zID0gX3JlZjcudmFyaWFibGVEZWZpbml0aW9ucyxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWY3LmRpcmVjdGl2ZXMsXG4gICAgICAgIHNlbGVjdGlvblNldCA9IF9yZWY3LnNlbGVjdGlvblNldDtcbiAgICByZXR1cm4gKC8vIE5vdGU6IGZyYWdtZW50IHZhcmlhYmxlIGRlZmluaXRpb25zIGFyZSBleHBlcmltZW50YWwgYW5kIG1heSBiZSBjaGFuZ2VkXG4gICAgICAvLyBvciByZW1vdmVkIGluIHRoZSBmdXR1cmUuXG4gICAgICBcImZyYWdtZW50IFwiLmNvbmNhdChuYW1lKS5jb25jYXQod3JhcCgnKCcsIGpvaW4odmFyaWFibGVEZWZpbml0aW9ucywgJywgJyksICcpJyksIFwiIFwiKSArIFwib24gXCIuY29uY2F0KHR5cGVDb25kaXRpb24sIFwiIFwiKS5jb25jYXQod3JhcCgnJywgam9pbihkaXJlY3RpdmVzLCAnICcpLCAnICcpKSArIHNlbGVjdGlvblNldFxuICAgICk7XG4gIH0sXG4gIC8vIFZhbHVlXG4gIEludFZhbHVlOiBmdW5jdGlvbiBJbnRWYWx1ZShfcmVmOCkge1xuICAgIHZhciB2YWx1ZSA9IF9yZWY4LnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgRmxvYXRWYWx1ZTogZnVuY3Rpb24gRmxvYXRWYWx1ZShfcmVmOSkge1xuICAgIHZhciB2YWx1ZSA9IF9yZWY5LnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgU3RyaW5nVmFsdWU6IGZ1bmN0aW9uIFN0cmluZ1ZhbHVlKF9yZWYxMCwga2V5KSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjEwLnZhbHVlLFxuICAgICAgICBpc0Jsb2NrU3RyaW5nID0gX3JlZjEwLmJsb2NrO1xuICAgIHJldHVybiBpc0Jsb2NrU3RyaW5nID8gcHJpbnRCbG9ja1N0cmluZyh2YWx1ZSwga2V5ID09PSAnZGVzY3JpcHRpb24nID8gJycgOiAnICAnKSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgfSxcbiAgQm9vbGVhblZhbHVlOiBmdW5jdGlvbiBCb29sZWFuVmFsdWUoX3JlZjExKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjExLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gIH0sXG4gIE51bGxWYWx1ZTogZnVuY3Rpb24gTnVsbFZhbHVlKCkge1xuICAgIHJldHVybiAnbnVsbCc7XG4gIH0sXG4gIEVudW1WYWx1ZTogZnVuY3Rpb24gRW51bVZhbHVlKF9yZWYxMikge1xuICAgIHZhciB2YWx1ZSA9IF9yZWYxMi52YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIExpc3RWYWx1ZTogZnVuY3Rpb24gTGlzdFZhbHVlKF9yZWYxMykge1xuICAgIHZhciB2YWx1ZXMgPSBfcmVmMTMudmFsdWVzO1xuICAgIHJldHVybiAnWycgKyBqb2luKHZhbHVlcywgJywgJykgKyAnXSc7XG4gIH0sXG4gIE9iamVjdFZhbHVlOiBmdW5jdGlvbiBPYmplY3RWYWx1ZShfcmVmMTQpIHtcbiAgICB2YXIgZmllbGRzID0gX3JlZjE0LmZpZWxkcztcbiAgICByZXR1cm4gJ3snICsgam9pbihmaWVsZHMsICcsICcpICsgJ30nO1xuICB9LFxuICBPYmplY3RGaWVsZDogZnVuY3Rpb24gT2JqZWN0RmllbGQoX3JlZjE1KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMTUubmFtZSxcbiAgICAgICAgdmFsdWUgPSBfcmVmMTUudmFsdWU7XG4gICAgcmV0dXJuIG5hbWUgKyAnOiAnICsgdmFsdWU7XG4gIH0sXG4gIC8vIERpcmVjdGl2ZVxuICBEaXJlY3RpdmU6IGZ1bmN0aW9uIERpcmVjdGl2ZShfcmVmMTYpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYxNi5uYW1lLFxuICAgICAgICBhcmdzID0gX3JlZjE2LmFyZ3VtZW50cztcbiAgICByZXR1cm4gJ0AnICsgbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpO1xuICB9LFxuICAvLyBUeXBlXG4gIE5hbWVkVHlwZTogZnVuY3Rpb24gTmFtZWRUeXBlKF9yZWYxNykge1xuICAgIHZhciBuYW1lID0gX3JlZjE3Lm5hbWU7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH0sXG4gIExpc3RUeXBlOiBmdW5jdGlvbiBMaXN0VHlwZShfcmVmMTgpIHtcbiAgICB2YXIgdHlwZSA9IF9yZWYxOC50eXBlO1xuICAgIHJldHVybiAnWycgKyB0eXBlICsgJ10nO1xuICB9LFxuICBOb25OdWxsVHlwZTogZnVuY3Rpb24gTm9uTnVsbFR5cGUoX3JlZjE5KSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmMTkudHlwZTtcbiAgICByZXR1cm4gdHlwZSArICchJztcbiAgfSxcbiAgLy8gVHlwZSBTeXN0ZW0gRGVmaW5pdGlvbnNcbiAgU2NoZW1hRGVmaW5pdGlvbjogYWRkRGVzY3JpcHRpb24oZnVuY3Rpb24gKF9yZWYyMCkge1xuICAgIHZhciBkaXJlY3RpdmVzID0gX3JlZjIwLmRpcmVjdGl2ZXMsXG4gICAgICAgIG9wZXJhdGlvblR5cGVzID0gX3JlZjIwLm9wZXJhdGlvblR5cGVzO1xuICAgIHJldHVybiBqb2luKFsnc2NoZW1hJywgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayhvcGVyYXRpb25UeXBlcyldLCAnICcpO1xuICB9KSxcbiAgT3BlcmF0aW9uVHlwZURlZmluaXRpb246IGZ1bmN0aW9uIE9wZXJhdGlvblR5cGVEZWZpbml0aW9uKF9yZWYyMSkge1xuICAgIHZhciBvcGVyYXRpb24gPSBfcmVmMjEub3BlcmF0aW9uLFxuICAgICAgICB0eXBlID0gX3JlZjIxLnR5cGU7XG4gICAgcmV0dXJuIG9wZXJhdGlvbiArICc6ICcgKyB0eXBlO1xuICB9LFxuICBTY2FsYXJUeXBlRGVmaW5pdGlvbjogYWRkRGVzY3JpcHRpb24oZnVuY3Rpb24gKF9yZWYyMikge1xuICAgIHZhciBuYW1lID0gX3JlZjIyLm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjIuZGlyZWN0aXZlcztcbiAgICByZXR1cm4gam9pbihbJ3NjYWxhcicsIG5hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKV0sICcgJyk7XG4gIH0pLFxuICBPYmplY3RUeXBlRGVmaW5pdGlvbjogYWRkRGVzY3JpcHRpb24oZnVuY3Rpb24gKF9yZWYyMykge1xuICAgIHZhciBuYW1lID0gX3JlZjIzLm5hbWUsXG4gICAgICAgIGludGVyZmFjZXMgPSBfcmVmMjMuaW50ZXJmYWNlcyxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyMy5kaXJlY3RpdmVzLFxuICAgICAgICBmaWVsZHMgPSBfcmVmMjMuZmllbGRzO1xuICAgIHJldHVybiBqb2luKFsndHlwZScsIG5hbWUsIHdyYXAoJ2ltcGxlbWVudHMgJywgam9pbihpbnRlcmZhY2VzLCAnICYgJykpLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIGJsb2NrKGZpZWxkcyldLCAnICcpO1xuICB9KSxcbiAgRmllbGREZWZpbml0aW9uOiBhZGREZXNjcmlwdGlvbihmdW5jdGlvbiAoX3JlZjI0KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjQubmFtZSxcbiAgICAgICAgYXJncyA9IF9yZWYyNC5hcmd1bWVudHMsXG4gICAgICAgIHR5cGUgPSBfcmVmMjQudHlwZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyNC5kaXJlY3RpdmVzO1xuICAgIHJldHVybiBuYW1lICsgKGhhc011bHRpbGluZUl0ZW1zKGFyZ3MpID8gd3JhcCgnKFxcbicsIGluZGVudChqb2luKGFyZ3MsICdcXG4nKSksICdcXG4pJykgOiB3cmFwKCcoJywgam9pbihhcmdzLCAnLCAnKSwgJyknKSkgKyAnOiAnICsgdHlwZSArIHdyYXAoJyAnLCBqb2luKGRpcmVjdGl2ZXMsICcgJykpO1xuICB9KSxcbiAgSW5wdXRWYWx1ZURlZmluaXRpb246IGFkZERlc2NyaXB0aW9uKGZ1bmN0aW9uIChfcmVmMjUpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyNS5uYW1lLFxuICAgICAgICB0eXBlID0gX3JlZjI1LnR5cGUsXG4gICAgICAgIGRlZmF1bHRWYWx1ZSA9IF9yZWYyNS5kZWZhdWx0VmFsdWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjUuZGlyZWN0aXZlcztcbiAgICByZXR1cm4gam9pbihbbmFtZSArICc6ICcgKyB0eXBlLCB3cmFwKCc9ICcsIGRlZmF1bHRWYWx1ZSksIGpvaW4oZGlyZWN0aXZlcywgJyAnKV0sICcgJyk7XG4gIH0pLFxuICBJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbjogYWRkRGVzY3JpcHRpb24oZnVuY3Rpb24gKF9yZWYyNikge1xuICAgIHZhciBuYW1lID0gX3JlZjI2Lm5hbWUsXG4gICAgICAgIGludGVyZmFjZXMgPSBfcmVmMjYuaW50ZXJmYWNlcyxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyNi5kaXJlY3RpdmVzLFxuICAgICAgICBmaWVsZHMgPSBfcmVmMjYuZmllbGRzO1xuICAgIHJldHVybiBqb2luKFsnaW50ZXJmYWNlJywgbmFtZSwgd3JhcCgnaW1wbGVtZW50cyAnLCBqb2luKGludGVyZmFjZXMsICcgJiAnKSksIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2soZmllbGRzKV0sICcgJyk7XG4gIH0pLFxuICBVbmlvblR5cGVEZWZpbml0aW9uOiBhZGREZXNjcmlwdGlvbihmdW5jdGlvbiAoX3JlZjI3KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjcubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyNy5kaXJlY3RpdmVzLFxuICAgICAgICB0eXBlcyA9IF9yZWYyNy50eXBlcztcbiAgICByZXR1cm4gam9pbihbJ3VuaW9uJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCB0eXBlcyAmJiB0eXBlcy5sZW5ndGggIT09IDAgPyAnPSAnICsgam9pbih0eXBlcywgJyB8ICcpIDogJyddLCAnICcpO1xuICB9KSxcbiAgRW51bVR5cGVEZWZpbml0aW9uOiBhZGREZXNjcmlwdGlvbihmdW5jdGlvbiAoX3JlZjI4KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjgubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyOC5kaXJlY3RpdmVzLFxuICAgICAgICB2YWx1ZXMgPSBfcmVmMjgudmFsdWVzO1xuICAgIHJldHVybiBqb2luKFsnZW51bScsIG5hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2sodmFsdWVzKV0sICcgJyk7XG4gIH0pLFxuICBFbnVtVmFsdWVEZWZpbml0aW9uOiBhZGREZXNjcmlwdGlvbihmdW5jdGlvbiAoX3JlZjI5KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjkubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyOS5kaXJlY3RpdmVzO1xuICAgIHJldHVybiBqb2luKFtuYW1lLCBqb2luKGRpcmVjdGl2ZXMsICcgJyldLCAnICcpO1xuICB9KSxcbiAgSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvbjogYWRkRGVzY3JpcHRpb24oZnVuY3Rpb24gKF9yZWYzMCkge1xuICAgIHZhciBuYW1lID0gX3JlZjMwLm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMzAuZGlyZWN0aXZlcyxcbiAgICAgICAgZmllbGRzID0gX3JlZjMwLmZpZWxkcztcbiAgICByZXR1cm4gam9pbihbJ2lucHV0JywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayhmaWVsZHMpXSwgJyAnKTtcbiAgfSksXG4gIERpcmVjdGl2ZURlZmluaXRpb246IGFkZERlc2NyaXB0aW9uKGZ1bmN0aW9uIChfcmVmMzEpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYzMS5uYW1lLFxuICAgICAgICBhcmdzID0gX3JlZjMxLmFyZ3VtZW50cyxcbiAgICAgICAgcmVwZWF0YWJsZSA9IF9yZWYzMS5yZXBlYXRhYmxlLFxuICAgICAgICBsb2NhdGlvbnMgPSBfcmVmMzEubG9jYXRpb25zO1xuICAgIHJldHVybiAnZGlyZWN0aXZlIEAnICsgbmFtZSArIChoYXNNdWx0aWxpbmVJdGVtcyhhcmdzKSA/IHdyYXAoJyhcXG4nLCBpbmRlbnQoam9pbihhcmdzLCAnXFxuJykpLCAnXFxuKScpIDogd3JhcCgnKCcsIGpvaW4oYXJncywgJywgJyksICcpJykpICsgKHJlcGVhdGFibGUgPyAnIHJlcGVhdGFibGUnIDogJycpICsgJyBvbiAnICsgam9pbihsb2NhdGlvbnMsICcgfCAnKTtcbiAgfSksXG4gIFNjaGVtYUV4dGVuc2lvbjogZnVuY3Rpb24gU2NoZW1hRXh0ZW5zaW9uKF9yZWYzMikge1xuICAgIHZhciBkaXJlY3RpdmVzID0gX3JlZjMyLmRpcmVjdGl2ZXMsXG4gICAgICAgIG9wZXJhdGlvblR5cGVzID0gX3JlZjMyLm9wZXJhdGlvblR5cGVzO1xuICAgIHJldHVybiBqb2luKFsnZXh0ZW5kIHNjaGVtYScsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2sob3BlcmF0aW9uVHlwZXMpXSwgJyAnKTtcbiAgfSxcbiAgU2NhbGFyVHlwZUV4dGVuc2lvbjogZnVuY3Rpb24gU2NhbGFyVHlwZUV4dGVuc2lvbihfcmVmMzMpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYzMy5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjMzLmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuIGpvaW4oWydleHRlbmQgc2NhbGFyJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpXSwgJyAnKTtcbiAgfSxcbiAgT2JqZWN0VHlwZUV4dGVuc2lvbjogZnVuY3Rpb24gT2JqZWN0VHlwZUV4dGVuc2lvbihfcmVmMzQpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYzNC5uYW1lLFxuICAgICAgICBpbnRlcmZhY2VzID0gX3JlZjM0LmludGVyZmFjZXMsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMzQuZGlyZWN0aXZlcyxcbiAgICAgICAgZmllbGRzID0gX3JlZjM0LmZpZWxkcztcbiAgICByZXR1cm4gam9pbihbJ2V4dGVuZCB0eXBlJywgbmFtZSwgd3JhcCgnaW1wbGVtZW50cyAnLCBqb2luKGludGVyZmFjZXMsICcgJiAnKSksIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2soZmllbGRzKV0sICcgJyk7XG4gIH0sXG4gIEludGVyZmFjZVR5cGVFeHRlbnNpb246IGZ1bmN0aW9uIEludGVyZmFjZVR5cGVFeHRlbnNpb24oX3JlZjM1KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMzUubmFtZSxcbiAgICAgICAgaW50ZXJmYWNlcyA9IF9yZWYzNS5pbnRlcmZhY2VzLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjM1LmRpcmVjdGl2ZXMsXG4gICAgICAgIGZpZWxkcyA9IF9yZWYzNS5maWVsZHM7XG4gICAgcmV0dXJuIGpvaW4oWydleHRlbmQgaW50ZXJmYWNlJywgbmFtZSwgd3JhcCgnaW1wbGVtZW50cyAnLCBqb2luKGludGVyZmFjZXMsICcgJiAnKSksIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2soZmllbGRzKV0sICcgJyk7XG4gIH0sXG4gIFVuaW9uVHlwZUV4dGVuc2lvbjogZnVuY3Rpb24gVW5pb25UeXBlRXh0ZW5zaW9uKF9yZWYzNikge1xuICAgIHZhciBuYW1lID0gX3JlZjM2Lm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMzYuZGlyZWN0aXZlcyxcbiAgICAgICAgdHlwZXMgPSBfcmVmMzYudHlwZXM7XG4gICAgcmV0dXJuIGpvaW4oWydleHRlbmQgdW5pb24nLCBuYW1lLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIHR5cGVzICYmIHR5cGVzLmxlbmd0aCAhPT0gMCA/ICc9ICcgKyBqb2luKHR5cGVzLCAnIHwgJykgOiAnJ10sICcgJyk7XG4gIH0sXG4gIEVudW1UeXBlRXh0ZW5zaW9uOiBmdW5jdGlvbiBFbnVtVHlwZUV4dGVuc2lvbihfcmVmMzcpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYzNy5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjM3LmRpcmVjdGl2ZXMsXG4gICAgICAgIHZhbHVlcyA9IF9yZWYzNy52YWx1ZXM7XG4gICAgcmV0dXJuIGpvaW4oWydleHRlbmQgZW51bScsIG5hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2sodmFsdWVzKV0sICcgJyk7XG4gIH0sXG4gIElucHV0T2JqZWN0VHlwZUV4dGVuc2lvbjogZnVuY3Rpb24gSW5wdXRPYmplY3RUeXBlRXh0ZW5zaW9uKF9yZWYzOCkge1xuICAgIHZhciBuYW1lID0gX3JlZjM4Lm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMzguZGlyZWN0aXZlcyxcbiAgICAgICAgZmllbGRzID0gX3JlZjM4LmZpZWxkcztcbiAgICByZXR1cm4gam9pbihbJ2V4dGVuZCBpbnB1dCcsIG5hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2soZmllbGRzKV0sICcgJyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFkZERlc2NyaXB0aW9uKGNiKSB7XG4gIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBqb2luKFtub2RlLmRlc2NyaXB0aW9uLCBjYihub2RlKV0sICdcXG4nKTtcbiAgfTtcbn1cbi8qKlxuICogR2l2ZW4gbWF5YmVBcnJheSwgcHJpbnQgYW4gZW1wdHkgc3RyaW5nIGlmIGl0IGlzIG51bGwgb3IgZW1wdHksIG90aGVyd2lzZVxuICogcHJpbnQgYWxsIGl0ZW1zIHRvZ2V0aGVyIHNlcGFyYXRlZCBieSBzZXBhcmF0b3IgaWYgcHJvdmlkZWRcbiAqL1xuXG5cbmZ1bmN0aW9uIGpvaW4obWF5YmVBcnJheSkge1xuICB2YXIgX21heWJlQXJyYXkkZmlsdGVyJGpvO1xuXG4gIHZhciBzZXBhcmF0b3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xuICByZXR1cm4gKF9tYXliZUFycmF5JGZpbHRlciRqbyA9IG1heWJlQXJyYXkgPT09IG51bGwgfHwgbWF5YmVBcnJheSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWF5YmVBcnJheS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfSkuam9pbihzZXBhcmF0b3IpKSAhPT0gbnVsbCAmJiBfbWF5YmVBcnJheSRmaWx0ZXIkam8gIT09IHZvaWQgMCA/IF9tYXliZUFycmF5JGZpbHRlciRqbyA6ICcnO1xufVxuLyoqXG4gKiBHaXZlbiBhcnJheSwgcHJpbnQgZWFjaCBpdGVtIG9uIGl0cyBvd24gbGluZSwgd3JhcHBlZCBpbiBhblxuICogaW5kZW50ZWQgXCJ7IH1cIiBibG9jay5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJsb2NrKGFycmF5KSB7XG4gIHJldHVybiBhcnJheSAmJiBhcnJheS5sZW5ndGggIT09IDAgPyAne1xcbicgKyBpbmRlbnQoam9pbihhcnJheSwgJ1xcbicpKSArICdcXG59JyA6ICcnO1xufVxuLyoqXG4gKiBJZiBtYXliZVN0cmluZyBpcyBub3QgbnVsbCBvciBlbXB0eSwgdGhlbiB3cmFwIHdpdGggc3RhcnQgYW5kIGVuZCwgb3RoZXJ3aXNlXG4gKiBwcmludCBhbiBlbXB0eSBzdHJpbmcuXG4gKi9cblxuXG5mdW5jdGlvbiB3cmFwKHN0YXJ0LCBtYXliZVN0cmluZykge1xuICB2YXIgZW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAnJztcbiAgcmV0dXJuIG1heWJlU3RyaW5nID8gc3RhcnQgKyBtYXliZVN0cmluZyArIGVuZCA6ICcnO1xufVxuXG5mdW5jdGlvbiBpbmRlbnQobWF5YmVTdHJpbmcpIHtcbiAgcmV0dXJuIG1heWJlU3RyaW5nICYmICcgICcgKyBtYXliZVN0cmluZy5yZXBsYWNlKC9cXG4vZywgJ1xcbiAgJyk7XG59XG5cbmZ1bmN0aW9uIGlzTXVsdGlsaW5lKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmluZGV4T2YoJ1xcbicpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gaGFzTXVsdGlsaW5lSXRlbXMobWF5YmVBcnJheSkge1xuICByZXR1cm4gbWF5YmVBcnJheSAmJiBtYXliZUFycmF5LnNvbWUoaXNNdWx0aWxpbmUpO1xufVxuIiwiaW1wb3J0IGluc3BlY3QgZnJvbSBcIi4uL2pzdXRpbHMvaW5zcGVjdC5tanNcIjtcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gXCIuL2FzdC5tanNcIjtcbi8qKlxuICogQSB2aXNpdG9yIGlzIHByb3ZpZGVkIHRvIHZpc2l0LCBpdCBjb250YWlucyB0aGUgY29sbGVjdGlvbiBvZlxuICogcmVsZXZhbnQgZnVuY3Rpb25zIHRvIGJlIGNhbGxlZCBkdXJpbmcgdGhlIHZpc2l0b3IncyB0cmF2ZXJzYWwuXG4gKi9cblxuZXhwb3J0IHZhciBRdWVyeURvY3VtZW50S2V5cyA9IHtcbiAgTmFtZTogW10sXG4gIERvY3VtZW50OiBbJ2RlZmluaXRpb25zJ10sXG4gIE9wZXJhdGlvbkRlZmluaXRpb246IFsnbmFtZScsICd2YXJpYWJsZURlZmluaXRpb25zJywgJ2RpcmVjdGl2ZXMnLCAnc2VsZWN0aW9uU2V0J10sXG4gIFZhcmlhYmxlRGVmaW5pdGlvbjogWyd2YXJpYWJsZScsICd0eXBlJywgJ2RlZmF1bHRWYWx1ZScsICdkaXJlY3RpdmVzJ10sXG4gIFZhcmlhYmxlOiBbJ25hbWUnXSxcbiAgU2VsZWN0aW9uU2V0OiBbJ3NlbGVjdGlvbnMnXSxcbiAgRmllbGQ6IFsnYWxpYXMnLCAnbmFtZScsICdhcmd1bWVudHMnLCAnZGlyZWN0aXZlcycsICdzZWxlY3Rpb25TZXQnXSxcbiAgQXJndW1lbnQ6IFsnbmFtZScsICd2YWx1ZSddLFxuICBGcmFnbWVudFNwcmVhZDogWyduYW1lJywgJ2RpcmVjdGl2ZXMnXSxcbiAgSW5saW5lRnJhZ21lbnQ6IFsndHlwZUNvbmRpdGlvbicsICdkaXJlY3RpdmVzJywgJ3NlbGVjdGlvblNldCddLFxuICBGcmFnbWVudERlZmluaXRpb246IFsnbmFtZScsIC8vIE5vdGU6IGZyYWdtZW50IHZhcmlhYmxlIGRlZmluaXRpb25zIGFyZSBleHBlcmltZW50YWwgYW5kIG1heSBiZSBjaGFuZ2VkXG4gIC8vIG9yIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZS5cbiAgJ3ZhcmlhYmxlRGVmaW5pdGlvbnMnLCAndHlwZUNvbmRpdGlvbicsICdkaXJlY3RpdmVzJywgJ3NlbGVjdGlvblNldCddLFxuICBJbnRWYWx1ZTogW10sXG4gIEZsb2F0VmFsdWU6IFtdLFxuICBTdHJpbmdWYWx1ZTogW10sXG4gIEJvb2xlYW5WYWx1ZTogW10sXG4gIE51bGxWYWx1ZTogW10sXG4gIEVudW1WYWx1ZTogW10sXG4gIExpc3RWYWx1ZTogWyd2YWx1ZXMnXSxcbiAgT2JqZWN0VmFsdWU6IFsnZmllbGRzJ10sXG4gIE9iamVjdEZpZWxkOiBbJ25hbWUnLCAndmFsdWUnXSxcbiAgRGlyZWN0aXZlOiBbJ25hbWUnLCAnYXJndW1lbnRzJ10sXG4gIE5hbWVkVHlwZTogWyduYW1lJ10sXG4gIExpc3RUeXBlOiBbJ3R5cGUnXSxcbiAgTm9uTnVsbFR5cGU6IFsndHlwZSddLFxuICBTY2hlbWFEZWZpbml0aW9uOiBbJ2Rlc2NyaXB0aW9uJywgJ2RpcmVjdGl2ZXMnLCAnb3BlcmF0aW9uVHlwZXMnXSxcbiAgT3BlcmF0aW9uVHlwZURlZmluaXRpb246IFsndHlwZSddLFxuICBTY2FsYXJUeXBlRGVmaW5pdGlvbjogWydkZXNjcmlwdGlvbicsICduYW1lJywgJ2RpcmVjdGl2ZXMnXSxcbiAgT2JqZWN0VHlwZURlZmluaXRpb246IFsnZGVzY3JpcHRpb24nLCAnbmFtZScsICdpbnRlcmZhY2VzJywgJ2RpcmVjdGl2ZXMnLCAnZmllbGRzJ10sXG4gIEZpZWxkRGVmaW5pdGlvbjogWydkZXNjcmlwdGlvbicsICduYW1lJywgJ2FyZ3VtZW50cycsICd0eXBlJywgJ2RpcmVjdGl2ZXMnXSxcbiAgSW5wdXRWYWx1ZURlZmluaXRpb246IFsnZGVzY3JpcHRpb24nLCAnbmFtZScsICd0eXBlJywgJ2RlZmF1bHRWYWx1ZScsICdkaXJlY3RpdmVzJ10sXG4gIEludGVyZmFjZVR5cGVEZWZpbml0aW9uOiBbJ2Rlc2NyaXB0aW9uJywgJ25hbWUnLCAnaW50ZXJmYWNlcycsICdkaXJlY3RpdmVzJywgJ2ZpZWxkcyddLFxuICBVbmlvblR5cGVEZWZpbml0aW9uOiBbJ2Rlc2NyaXB0aW9uJywgJ25hbWUnLCAnZGlyZWN0aXZlcycsICd0eXBlcyddLFxuICBFbnVtVHlwZURlZmluaXRpb246IFsnZGVzY3JpcHRpb24nLCAnbmFtZScsICdkaXJlY3RpdmVzJywgJ3ZhbHVlcyddLFxuICBFbnVtVmFsdWVEZWZpbml0aW9uOiBbJ2Rlc2NyaXB0aW9uJywgJ25hbWUnLCAnZGlyZWN0aXZlcyddLFxuICBJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uOiBbJ2Rlc2NyaXB0aW9uJywgJ25hbWUnLCAnZGlyZWN0aXZlcycsICdmaWVsZHMnXSxcbiAgRGlyZWN0aXZlRGVmaW5pdGlvbjogWydkZXNjcmlwdGlvbicsICduYW1lJywgJ2FyZ3VtZW50cycsICdsb2NhdGlvbnMnXSxcbiAgU2NoZW1hRXh0ZW5zaW9uOiBbJ2RpcmVjdGl2ZXMnLCAnb3BlcmF0aW9uVHlwZXMnXSxcbiAgU2NhbGFyVHlwZUV4dGVuc2lvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnXSxcbiAgT2JqZWN0VHlwZUV4dGVuc2lvbjogWyduYW1lJywgJ2ludGVyZmFjZXMnLCAnZGlyZWN0aXZlcycsICdmaWVsZHMnXSxcbiAgSW50ZXJmYWNlVHlwZUV4dGVuc2lvbjogWyduYW1lJywgJ2ludGVyZmFjZXMnLCAnZGlyZWN0aXZlcycsICdmaWVsZHMnXSxcbiAgVW5pb25UeXBlRXh0ZW5zaW9uOiBbJ25hbWUnLCAnZGlyZWN0aXZlcycsICd0eXBlcyddLFxuICBFbnVtVHlwZUV4dGVuc2lvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnLCAndmFsdWVzJ10sXG4gIElucHV0T2JqZWN0VHlwZUV4dGVuc2lvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnLCAnZmllbGRzJ11cbn07XG5leHBvcnQgdmFyIEJSRUFLID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4vKipcbiAqIHZpc2l0KCkgd2lsbCB3YWxrIHRocm91Z2ggYW4gQVNUIHVzaW5nIGEgZGVwdGggZmlyc3QgdHJhdmVyc2FsLCBjYWxsaW5nXG4gKiB0aGUgdmlzaXRvcidzIGVudGVyIGZ1bmN0aW9uIGF0IGVhY2ggbm9kZSBpbiB0aGUgdHJhdmVyc2FsLCBhbmQgY2FsbGluZyB0aGVcbiAqIGxlYXZlIGZ1bmN0aW9uIGFmdGVyIHZpc2l0aW5nIHRoYXQgbm9kZSBhbmQgYWxsIG9mIGl0cyBjaGlsZCBub2Rlcy5cbiAqXG4gKiBCeSByZXR1cm5pbmcgZGlmZmVyZW50IHZhbHVlcyBmcm9tIHRoZSBlbnRlciBhbmQgbGVhdmUgZnVuY3Rpb25zLCB0aGVcbiAqIGJlaGF2aW9yIG9mIHRoZSB2aXNpdG9yIGNhbiBiZSBhbHRlcmVkLCBpbmNsdWRpbmcgc2tpcHBpbmcgb3ZlciBhIHN1Yi10cmVlIG9mXG4gKiB0aGUgQVNUIChieSByZXR1cm5pbmcgZmFsc2UpLCBlZGl0aW5nIHRoZSBBU1QgYnkgcmV0dXJuaW5nIGEgdmFsdWUgb3IgbnVsbFxuICogdG8gcmVtb3ZlIHRoZSB2YWx1ZSwgb3IgdG8gc3RvcCB0aGUgd2hvbGUgdHJhdmVyc2FsIGJ5IHJldHVybmluZyBCUkVBSy5cbiAqXG4gKiBXaGVuIHVzaW5nIHZpc2l0KCkgdG8gZWRpdCBhbiBBU1QsIHRoZSBvcmlnaW5hbCBBU1Qgd2lsbCBub3QgYmUgbW9kaWZpZWQsIGFuZFxuICogYSBuZXcgdmVyc2lvbiBvZiB0aGUgQVNUIHdpdGggdGhlIGNoYW5nZXMgYXBwbGllZCB3aWxsIGJlIHJldHVybmVkIGZyb20gdGhlXG4gKiB2aXNpdCBmdW5jdGlvbi5cbiAqXG4gKiAgICAgY29uc3QgZWRpdGVkQVNUID0gdmlzaXQoYXN0LCB7XG4gKiAgICAgICBlbnRlcihub2RlLCBrZXksIHBhcmVudCwgcGF0aCwgYW5jZXN0b3JzKSB7XG4gKiAgICAgICAgIC8vIEByZXR1cm5cbiAqICAgICAgICAgLy8gICB1bmRlZmluZWQ6IG5vIGFjdGlvblxuICogICAgICAgICAvLyAgIGZhbHNlOiBza2lwIHZpc2l0aW5nIHRoaXMgbm9kZVxuICogICAgICAgICAvLyAgIHZpc2l0b3IuQlJFQUs6IHN0b3AgdmlzaXRpbmcgYWx0b2dldGhlclxuICogICAgICAgICAvLyAgIG51bGw6IGRlbGV0ZSB0aGlzIG5vZGVcbiAqICAgICAgICAgLy8gICBhbnkgdmFsdWU6IHJlcGxhY2UgdGhpcyBub2RlIHdpdGggdGhlIHJldHVybmVkIHZhbHVlXG4gKiAgICAgICB9LFxuICogICAgICAgbGVhdmUobm9kZSwga2V5LCBwYXJlbnQsIHBhdGgsIGFuY2VzdG9ycykge1xuICogICAgICAgICAvLyBAcmV0dXJuXG4gKiAgICAgICAgIC8vICAgdW5kZWZpbmVkOiBubyBhY3Rpb25cbiAqICAgICAgICAgLy8gICBmYWxzZTogbm8gYWN0aW9uXG4gKiAgICAgICAgIC8vICAgdmlzaXRvci5CUkVBSzogc3RvcCB2aXNpdGluZyBhbHRvZ2V0aGVyXG4gKiAgICAgICAgIC8vICAgbnVsbDogZGVsZXRlIHRoaXMgbm9kZVxuICogICAgICAgICAvLyAgIGFueSB2YWx1ZTogcmVwbGFjZSB0aGlzIG5vZGUgd2l0aCB0aGUgcmV0dXJuZWQgdmFsdWVcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBBbHRlcm5hdGl2ZWx5IHRvIHByb3ZpZGluZyBlbnRlcigpIGFuZCBsZWF2ZSgpIGZ1bmN0aW9ucywgYSB2aXNpdG9yIGNhblxuICogaW5zdGVhZCBwcm92aWRlIGZ1bmN0aW9ucyBuYW1lZCB0aGUgc2FtZSBhcyB0aGUga2luZHMgb2YgQVNUIG5vZGVzLCBvclxuICogZW50ZXIvbGVhdmUgdmlzaXRvcnMgYXQgYSBuYW1lZCBrZXksIGxlYWRpbmcgdG8gZm91ciBwZXJtdXRhdGlvbnMgb2ZcbiAqIHZpc2l0b3IgQVBJOlxuICpcbiAqIDEpIE5hbWVkIHZpc2l0b3JzIHRyaWdnZXJlZCB3aGVuIGVudGVyaW5nIGEgbm9kZSBhIHNwZWNpZmljIGtpbmQuXG4gKlxuICogICAgIHZpc2l0KGFzdCwge1xuICogICAgICAgS2luZChub2RlKSB7XG4gKiAgICAgICAgIC8vIGVudGVyIHRoZSBcIktpbmRcIiBub2RlXG4gKiAgICAgICB9XG4gKiAgICAgfSlcbiAqXG4gKiAyKSBOYW1lZCB2aXNpdG9ycyB0aGF0IHRyaWdnZXIgdXBvbiBlbnRlcmluZyBhbmQgbGVhdmluZyBhIG5vZGUgb2ZcbiAqICAgIGEgc3BlY2lmaWMga2luZC5cbiAqXG4gKiAgICAgdmlzaXQoYXN0LCB7XG4gKiAgICAgICBLaW5kOiB7XG4gKiAgICAgICAgIGVudGVyKG5vZGUpIHtcbiAqICAgICAgICAgICAvLyBlbnRlciB0aGUgXCJLaW5kXCIgbm9kZVxuICogICAgICAgICB9XG4gKiAgICAgICAgIGxlYXZlKG5vZGUpIHtcbiAqICAgICAgICAgICAvLyBsZWF2ZSB0aGUgXCJLaW5kXCIgbm9kZVxuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfSlcbiAqXG4gKiAzKSBHZW5lcmljIHZpc2l0b3JzIHRoYXQgdHJpZ2dlciB1cG9uIGVudGVyaW5nIGFuZCBsZWF2aW5nIGFueSBub2RlLlxuICpcbiAqICAgICB2aXNpdChhc3QsIHtcbiAqICAgICAgIGVudGVyKG5vZGUpIHtcbiAqICAgICAgICAgLy8gZW50ZXIgYW55IG5vZGVcbiAqICAgICAgIH0sXG4gKiAgICAgICBsZWF2ZShub2RlKSB7XG4gKiAgICAgICAgIC8vIGxlYXZlIGFueSBub2RlXG4gKiAgICAgICB9XG4gKiAgICAgfSlcbiAqXG4gKiA0KSBQYXJhbGxlbCB2aXNpdG9ycyBmb3IgZW50ZXJpbmcgYW5kIGxlYXZpbmcgbm9kZXMgb2YgYSBzcGVjaWZpYyBraW5kLlxuICpcbiAqICAgICB2aXNpdChhc3QsIHtcbiAqICAgICAgIGVudGVyOiB7XG4gKiAgICAgICAgIEtpbmQobm9kZSkge1xuICogICAgICAgICAgIC8vIGVudGVyIHRoZSBcIktpbmRcIiBub2RlXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH0sXG4gKiAgICAgICBsZWF2ZToge1xuICogICAgICAgICBLaW5kKG5vZGUpIHtcbiAqICAgICAgICAgICAvLyBsZWF2ZSB0aGUgXCJLaW5kXCIgbm9kZVxuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfSlcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXQocm9vdCwgdmlzaXRvcikge1xuICB2YXIgdmlzaXRvcktleXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFF1ZXJ5RG9jdW1lbnRLZXlzO1xuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmLWluaXQgKi9cbiAgdmFyIHN0YWNrID0gdW5kZWZpbmVkO1xuICB2YXIgaW5BcnJheSA9IEFycmF5LmlzQXJyYXkocm9vdCk7XG4gIHZhciBrZXlzID0gW3Jvb3RdO1xuICB2YXIgaW5kZXggPSAtMTtcbiAgdmFyIGVkaXRzID0gW107XG4gIHZhciBub2RlID0gdW5kZWZpbmVkO1xuICB2YXIga2V5ID0gdW5kZWZpbmVkO1xuICB2YXIgcGFyZW50ID0gdW5kZWZpbmVkO1xuICB2YXIgcGF0aCA9IFtdO1xuICB2YXIgYW5jZXN0b3JzID0gW107XG4gIHZhciBuZXdSb290ID0gcm9vdDtcbiAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZi1pbml0ICovXG5cbiAgZG8ge1xuICAgIGluZGV4Kys7XG4gICAgdmFyIGlzTGVhdmluZyA9IGluZGV4ID09PSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaXNFZGl0ZWQgPSBpc0xlYXZpbmcgJiYgZWRpdHMubGVuZ3RoICE9PSAwO1xuXG4gICAgaWYgKGlzTGVhdmluZykge1xuICAgICAga2V5ID0gYW5jZXN0b3JzLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgIG5vZGUgPSBwYXJlbnQ7XG4gICAgICBwYXJlbnQgPSBhbmNlc3RvcnMucG9wKCk7XG5cbiAgICAgIGlmIChpc0VkaXRlZCkge1xuICAgICAgICBpZiAoaW5BcnJheSkge1xuICAgICAgICAgIG5vZGUgPSBub2RlLnNsaWNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNsb25lID0ge307XG5cbiAgICAgICAgICBmb3IgKHZhciBfaTIgPSAwLCBfT2JqZWN0JGtleXMyID0gT2JqZWN0LmtleXMobm9kZSk7IF9pMiA8IF9PYmplY3Qka2V5czIubGVuZ3RoOyBfaTIrKykge1xuICAgICAgICAgICAgdmFyIGsgPSBfT2JqZWN0JGtleXMyW19pMl07XG4gICAgICAgICAgICBjbG9uZVtrXSA9IG5vZGVba107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbm9kZSA9IGNsb25lO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVkaXRPZmZzZXQgPSAwO1xuXG4gICAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBlZGl0cy5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgICB2YXIgZWRpdEtleSA9IGVkaXRzW2lpXVswXTtcbiAgICAgICAgICB2YXIgZWRpdFZhbHVlID0gZWRpdHNbaWldWzFdO1xuXG4gICAgICAgICAgaWYgKGluQXJyYXkpIHtcbiAgICAgICAgICAgIGVkaXRLZXkgLT0gZWRpdE9mZnNldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaW5BcnJheSAmJiBlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuc3BsaWNlKGVkaXRLZXksIDEpO1xuICAgICAgICAgICAgZWRpdE9mZnNldCsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlW2VkaXRLZXldID0gZWRpdFZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbmRleCA9IHN0YWNrLmluZGV4O1xuICAgICAga2V5cyA9IHN0YWNrLmtleXM7XG4gICAgICBlZGl0cyA9IHN0YWNrLmVkaXRzO1xuICAgICAgaW5BcnJheSA9IHN0YWNrLmluQXJyYXk7XG4gICAgICBzdGFjayA9IHN0YWNrLnByZXY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IHBhcmVudCA/IGluQXJyYXkgPyBpbmRleCA6IGtleXNbaW5kZXhdIDogdW5kZWZpbmVkO1xuICAgICAgbm9kZSA9IHBhcmVudCA/IHBhcmVudFtrZXldIDogbmV3Um9vdDtcblxuICAgICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHBhdGgucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICAgIGlmICghaXNOb2RlKG5vZGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgQVNUIE5vZGU6IFwiLmNvbmNhdChpbnNwZWN0KG5vZGUpLCBcIi5cIikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmlzaXRGbiA9IGdldFZpc2l0Rm4odmlzaXRvciwgbm9kZS5raW5kLCBpc0xlYXZpbmcpO1xuXG4gICAgICBpZiAodmlzaXRGbikge1xuICAgICAgICByZXN1bHQgPSB2aXNpdEZuLmNhbGwodmlzaXRvciwgbm9kZSwga2V5LCBwYXJlbnQsIHBhdGgsIGFuY2VzdG9ycyk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gQlJFQUspIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKCFpc0xlYXZpbmcpIHtcbiAgICAgICAgICAgIHBhdGgucG9wKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBlZGl0cy5wdXNoKFtrZXksIHJlc3VsdF0pO1xuXG4gICAgICAgICAgaWYgKCFpc0xlYXZpbmcpIHtcbiAgICAgICAgICAgIGlmIChpc05vZGUocmVzdWx0KSkge1xuICAgICAgICAgICAgICBub2RlID0gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGF0aC5wb3AoKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkICYmIGlzRWRpdGVkKSB7XG4gICAgICBlZGl0cy5wdXNoKFtrZXksIG5vZGVdKTtcbiAgICB9XG5cbiAgICBpZiAoaXNMZWF2aW5nKSB7XG4gICAgICBwYXRoLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX3Zpc2l0b3JLZXlzJG5vZGUka2luO1xuXG4gICAgICBzdGFjayA9IHtcbiAgICAgICAgaW5BcnJheTogaW5BcnJheSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBrZXlzOiBrZXlzLFxuICAgICAgICBlZGl0czogZWRpdHMsXG4gICAgICAgIHByZXY6IHN0YWNrXG4gICAgICB9O1xuICAgICAgaW5BcnJheSA9IEFycmF5LmlzQXJyYXkobm9kZSk7XG4gICAgICBrZXlzID0gaW5BcnJheSA/IG5vZGUgOiAoX3Zpc2l0b3JLZXlzJG5vZGUka2luID0gdmlzaXRvcktleXNbbm9kZS5raW5kXSkgIT09IG51bGwgJiYgX3Zpc2l0b3JLZXlzJG5vZGUka2luICE9PSB2b2lkIDAgPyBfdmlzaXRvcktleXMkbm9kZSRraW4gOiBbXTtcbiAgICAgIGluZGV4ID0gLTE7XG4gICAgICBlZGl0cyA9IFtdO1xuXG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIGFuY2VzdG9ycy5wdXNoKHBhcmVudCk7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgfVxuICB9IHdoaWxlIChzdGFjayAhPT0gdW5kZWZpbmVkKTtcblxuICBpZiAoZWRpdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgbmV3Um9vdCA9IGVkaXRzW2VkaXRzLmxlbmd0aCAtIDFdWzFdO1xuICB9XG5cbiAgcmV0dXJuIG5ld1Jvb3Q7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmlzaXRvciBpbnN0YW5jZSB3aGljaCBkZWxlZ2F0ZXMgdG8gbWFueSB2aXNpdG9ycyB0byBydW4gaW5cbiAqIHBhcmFsbGVsLiBFYWNoIHZpc2l0b3Igd2lsbCBiZSB2aXNpdGVkIGZvciBlYWNoIG5vZGUgYmVmb3JlIG1vdmluZyBvbi5cbiAqXG4gKiBJZiBhIHByaW9yIHZpc2l0b3IgZWRpdHMgYSBub2RlLCBubyBmb2xsb3dpbmcgdmlzaXRvcnMgd2lsbCBzZWUgdGhhdCBub2RlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdEluUGFyYWxsZWwodmlzaXRvcnMpIHtcbiAgdmFyIHNraXBwaW5nID0gbmV3IEFycmF5KHZpc2l0b3JzLmxlbmd0aCk7XG4gIHJldHVybiB7XG4gICAgZW50ZXI6IGZ1bmN0aW9uIGVudGVyKG5vZGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlzaXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNraXBwaW5nW2ldID09IG51bGwpIHtcbiAgICAgICAgICB2YXIgZm4gPSBnZXRWaXNpdEZuKHZpc2l0b3JzW2ldLCBub2RlLmtpbmQsXG4gICAgICAgICAgLyogaXNMZWF2aW5nICovXG4gICAgICAgICAgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodmlzaXRvcnNbaV0sIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHNraXBwaW5nW2ldID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBCUkVBSykge1xuICAgICAgICAgICAgICBza2lwcGluZ1tpXSA9IEJSRUFLO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGVhdmU6IGZ1bmN0aW9uIGxlYXZlKG5vZGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlzaXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNraXBwaW5nW2ldID09IG51bGwpIHtcbiAgICAgICAgICB2YXIgZm4gPSBnZXRWaXNpdEZuKHZpc2l0b3JzW2ldLCBub2RlLmtpbmQsXG4gICAgICAgICAgLyogaXNMZWF2aW5nICovXG4gICAgICAgICAgdHJ1ZSk7XG5cbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh2aXNpdG9yc1tpXSwgYXJndW1lbnRzKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gQlJFQUspIHtcbiAgICAgICAgICAgICAgc2tpcHBpbmdbaV0gPSBCUkVBSztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChza2lwcGluZ1tpXSA9PT0gbm9kZSkge1xuICAgICAgICAgIHNraXBwaW5nW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbi8qKlxuICogR2l2ZW4gYSB2aXNpdG9yIGluc3RhbmNlLCBpZiBpdCBpcyBsZWF2aW5nIG9yIG5vdCwgYW5kIGEgbm9kZSBraW5kLCByZXR1cm5cbiAqIHRoZSBmdW5jdGlvbiB0aGUgdmlzaXRvciBydW50aW1lIHNob3VsZCBjYWxsLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaXNpdEZuKHZpc2l0b3IsIGtpbmQsIGlzTGVhdmluZykge1xuICB2YXIga2luZFZpc2l0b3IgPSB2aXNpdG9yW2tpbmRdO1xuXG4gIGlmIChraW5kVmlzaXRvcikge1xuICAgIGlmICghaXNMZWF2aW5nICYmIHR5cGVvZiBraW5kVmlzaXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8geyBLaW5kKCkge30gfVxuICAgICAgcmV0dXJuIGtpbmRWaXNpdG9yO1xuICAgIH1cblxuICAgIHZhciBraW5kU3BlY2lmaWNWaXNpdG9yID0gaXNMZWF2aW5nID8ga2luZFZpc2l0b3IubGVhdmUgOiBraW5kVmlzaXRvci5lbnRlcjtcblxuICAgIGlmICh0eXBlb2Yga2luZFNwZWNpZmljVmlzaXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8geyBLaW5kOiB7IGVudGVyKCkge30sIGxlYXZlKCkge30gfSB9XG4gICAgICByZXR1cm4ga2luZFNwZWNpZmljVmlzaXRvcjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNwZWNpZmljVmlzaXRvciA9IGlzTGVhdmluZyA/IHZpc2l0b3IubGVhdmUgOiB2aXNpdG9yLmVudGVyO1xuXG4gICAgaWYgKHNwZWNpZmljVmlzaXRvcikge1xuICAgICAgaWYgKHR5cGVvZiBzcGVjaWZpY1Zpc2l0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8geyBlbnRlcigpIHt9LCBsZWF2ZSgpIHt9IH1cbiAgICAgICAgcmV0dXJuIHNwZWNpZmljVmlzaXRvcjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNwZWNpZmljS2luZFZpc2l0b3IgPSBzcGVjaWZpY1Zpc2l0b3Jba2luZF07XG5cbiAgICAgIGlmICh0eXBlb2Ygc3BlY2lmaWNLaW5kVmlzaXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyB7IGVudGVyOiB7IEtpbmQoKSB7fSB9LCBsZWF2ZTogeyBLaW5kKCkge30gfSB9XG4gICAgICAgIHJldHVybiBzcGVjaWZpY0tpbmRWaXNpdG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvcGFnZXMvX2FwcCcpXG4iLCJcInVzZSBzdHJpY3RcIjsvKiBnbG9iYWxzIHNlbGYgKi92YXIgZmV0Y2g9c2VsZi5mZXRjaC5iaW5kKHNlbGYpO21vZHVsZS5leHBvcnRzPWZldGNoO21vZHVsZS5leHBvcnRzLmRlZmF1bHQ9bW9kdWxlLmV4cG9ydHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgUmVhY3QsIHsgRXJyb3JJbmZvIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICBleGVjT25jZSxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuLi9jbGllbnQvcm91dGVyJ1xuXG5leHBvcnQgeyBBcHBJbml0aWFsUHJvcHMgfVxuXG5leHBvcnQgdHlwZSBBcHBDb250ZXh0ID0gQXBwQ29udGV4dFR5cGU8Um91dGVyPlxuXG5leHBvcnQgdHlwZSBBcHBQcm9wczxQID0ge30+ID0gQXBwUHJvcHNUeXBlPFJvdXRlciwgUD5cblxuLyoqXG4gKiBgQXBwYCBjb21wb25lbnQgaXMgdXNlZCBmb3IgaW5pdGlhbGl6ZSBvZiBwYWdlcy4gSXQgYWxsb3dzIGZvciBvdmVyd3JpdGluZyBhbmQgZnVsbCBjb250cm9sIG9mIHRoZSBgcGFnZWAgaW5pdGlhbGl6YXRpb24uXG4gKiBUaGlzIGFsbG93cyBmb3Iga2VlcGluZyBzdGF0ZSBiZXR3ZWVuIG5hdmlnYXRpb24sIGN1c3RvbSBlcnJvciBoYW5kbGluZywgaW5qZWN0aW5nIGFkZGl0aW9uYWwgZGF0YS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gYXBwR2V0SW5pdGlhbFByb3BzKHtcbiAgQ29tcG9uZW50LFxuICBjdHgsXG59OiBBcHBDb250ZXh0KTogUHJvbWlzZTxBcHBJbml0aWFsUHJvcHM+IHtcbiAgY29uc3QgcGFnZVByb3BzID0gYXdhaXQgbG9hZEdldEluaXRpYWxQcm9wcyhDb21wb25lbnQsIGN0eClcbiAgcmV0dXJuIHsgcGFnZVByb3BzIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwPFAgPSB7fSwgQ1AgPSB7fSwgUyA9IHt9PiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxcbiAgUCAmIEFwcFByb3BzPENQPixcbiAgU1xuPiB7XG4gIHN0YXRpYyBvcmlnR2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzXG4gIHN0YXRpYyBnZXRJbml0aWFsUHJvcHMgPSBhcHBHZXRJbml0aWFsUHJvcHNcblxuICAvLyBLZXB0IGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAvLyBXaGVuIHNvbWVvbmUgZW5kZWQgQXBwIHRoZXkgY291bGQgY2FsbCBgc3VwZXIuY29tcG9uZW50RGlkQ2F0Y2hgLlxuICAvLyBAZGVwcmVjYXRlZCBUaGlzIG1ldGhvZCBpcyBubyBsb25nZXIgbmVlZGVkLiBFcnJvcnMgYXJlIGNhdWdodCBhdCB0aGUgdG9wIGxldmVsXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yOiBFcnJvciwgX2Vycm9ySW5mbzogRXJyb3JJbmZvKTogdm9pZCB7XG4gICAgdGhyb3cgZXJyb3JcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHJvdXRlciwgQ29tcG9uZW50LCBwYWdlUHJvcHMsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHRoaXNcbiAgICAgIC5wcm9wcyBhcyBBcHBQcm9wczxDUD5cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHsuLi5wYWdlUHJvcHN9XG4gICAgICAgIHtcbiAgICAgICAgICAvLyB3ZSBkb24ndCBhZGQgdGhlIGxlZ2FjeSBVUkwgcHJvcCBpZiBpdCdzIHVzaW5nIG5vbi1sZWdhY3lcbiAgICAgICAgICAvLyBtZXRob2RzIGxpa2UgZ2V0U3RhdGljUHJvcHMgYW5kIGdldFNlcnZlclNpZGVQcm9wc1xuICAgICAgICAgIC4uLighKF9fTl9TU0cgfHwgX19OX1NTUCkgPyB7IHVybDogY3JlYXRlVXJsKHJvdXRlcikgfSA6IHt9KVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuXG5sZXQgd2FybkNvbnRhaW5lcjogKCkgPT4gdm9pZFxubGV0IHdhcm5Vcmw6ICgpID0+IHZvaWRcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybkNvbnRhaW5lciA9IGV4ZWNPbmNlKCgpID0+IHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgV2FybmluZzogdGhlIFxcYENvbnRhaW5lclxcYCBpbiBcXGBfYXBwXFxgIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBiZSByZW1vdmVkLiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9hcHAtY29udGFpbmVyLWRlcHJlY2F0ZWRgXG4gICAgKVxuICB9KVxuXG4gIHdhcm5VcmwgPSBleGVjT25jZSgoKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGBXYXJuaW5nOiB0aGUgJ3VybCcgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvdXJsLWRlcHJlY2F0ZWRgXG4gICAgKVxuICB9KVxufVxuXG4vLyBAZGVwcmVjYXRlZCBub29wIGZvciBub3cgdW50aWwgcmVtb3ZhbFxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lcihwOiBhbnkpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5Db250YWluZXIoKVxuICByZXR1cm4gcC5jaGlsZHJlblxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsKHJvdXRlcjogUm91dGVyKSB7XG4gIC8vIFRoaXMgaXMgdG8gbWFrZSBzdXJlIHdlIGRvbid0IHJlZmVyZW5jZXMgdGhlIHJvdXRlciBvYmplY3QgYXQgY2FsbCB0aW1lXG4gIGNvbnN0IHsgcGF0aG5hbWUsIGFzUGF0aCwgcXVlcnkgfSA9IHJvdXRlclxuICByZXR1cm4ge1xuICAgIGdldCBxdWVyeSgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBxdWVyeVxuICAgIH0sXG4gICAgZ2V0IHBhdGhuYW1lKCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHBhdGhuYW1lXG4gICAgfSxcbiAgICBnZXQgYXNQYXRoKCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIGFzUGF0aFxuICAgIH0sXG4gICAgYmFjazogKCkgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcm91dGVyLmJhY2soKVxuICAgIH0sXG4gICAgcHVzaDogKHVybDogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHJvdXRlci5wdXNoKHVybCwgYXMpXG4gICAgfSxcbiAgICBwdXNoVG86IChocmVmOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICBjb25zdCBwdXNoUm91dGUgPSBhcyA/IGhyZWYgOiAnJ1xuICAgICAgY29uc3QgcHVzaFVybCA9IGFzIHx8IGhyZWZcblxuICAgICAgcmV0dXJuIHJvdXRlci5wdXNoKHB1c2hSb3V0ZSwgcHVzaFVybClcbiAgICB9LFxuICAgIHJlcGxhY2U6ICh1cmw6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiByb3V0ZXIucmVwbGFjZSh1cmwsIGFzKVxuICAgIH0sXG4gICAgcmVwbGFjZVRvOiAoaHJlZjogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgY29uc3QgcmVwbGFjZVJvdXRlID0gYXMgPyBocmVmIDogJydcbiAgICAgIGNvbnN0IHJlcGxhY2VVcmwgPSBhcyB8fCBocmVmXG5cbiAgICAgIHJldHVybiByb3V0ZXIucmVwbGFjZShyZXBsYWNlUm91dGUsIHJlcGxhY2VVcmwpXG4gICAgfSxcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2xvdCB9IGZyb20gJ0B3cnkvY29udGV4dCc7XG5leHBvcnQgeyBhc3luY0Zyb21HZW4sIGJpbmQgYXMgYmluZENvbnRleHQsIG5vQ29udGV4dCwgc2V0VGltZW91dCB9IGZyb20gJ0B3cnkvY29udGV4dCc7XG5cbmZ1bmN0aW9uIGRlZmF1bHREaXNwb3NlKCkgeyB9XHJcbnZhciBDYWNoZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENhY2hlKG1heCwgZGlzcG9zZSkge1xyXG4gICAgICAgIGlmIChtYXggPT09IHZvaWQgMCkgeyBtYXggPSBJbmZpbml0eTsgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHsgZGlzcG9zZSA9IGRlZmF1bHREaXNwb3NlOyB9XHJcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlID0gZGlzcG9zZTtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLm5ld2VzdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbGRlc3QgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgQ2FjaGUucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGtleSk7XHJcbiAgICB9O1xyXG4gICAgQ2FjaGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLmdldEVudHJ5KGtleSk7XHJcbiAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnZhbHVlO1xyXG4gICAgfTtcclxuICAgIENhY2hlLnByb3RvdHlwZS5nZXRFbnRyeSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLm1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoZW50cnkgJiYgZW50cnkgIT09IHRoaXMubmV3ZXN0KSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRlciA9IGVudHJ5Lm9sZGVyLCBuZXdlciA9IGVudHJ5Lm5ld2VyO1xyXG4gICAgICAgICAgICBpZiAobmV3ZXIpIHtcclxuICAgICAgICAgICAgICAgIG5ld2VyLm9sZGVyID0gb2xkZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRlci5uZXdlciA9IG5ld2VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVudHJ5Lm9sZGVyID0gdGhpcy5uZXdlc3Q7XHJcbiAgICAgICAgICAgIGVudHJ5Lm9sZGVyLm5ld2VyID0gZW50cnk7XHJcbiAgICAgICAgICAgIGVudHJ5Lm5ld2VyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5uZXdlc3QgPSBlbnRyeTtcclxuICAgICAgICAgICAgaWYgKGVudHJ5ID09PSB0aGlzLm9sZGVzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbGRlc3QgPSBuZXdlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICB9O1xyXG4gICAgQ2FjaGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5nZXRFbnRyeShrZXkpO1xyXG4gICAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50cnkudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW50cnkgPSB7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgIG5ld2VyOiBudWxsLFxyXG4gICAgICAgICAgICBvbGRlcjogdGhpcy5uZXdlc3RcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLm5ld2VzdCkge1xyXG4gICAgICAgICAgICB0aGlzLm5ld2VzdC5uZXdlciA9IGVudHJ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5ld2VzdCA9IGVudHJ5O1xyXG4gICAgICAgIHRoaXMub2xkZXN0ID0gdGhpcy5vbGRlc3QgfHwgZW50cnk7XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0KGtleSwgZW50cnkpO1xyXG4gICAgICAgIHJldHVybiBlbnRyeS52YWx1ZTtcclxuICAgIH07XHJcbiAgICBDYWNoZS5wcm90b3R5cGUuY2xlYW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMub2xkZXN0ICYmIHRoaXMubWFwLnNpemUgPiB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZSh0aGlzLm9sZGVzdC5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBDYWNoZS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMubWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnkgPT09IHRoaXMubmV3ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld2VzdCA9IGVudHJ5Lm9sZGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbnRyeSA9PT0gdGhpcy5vbGRlc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2xkZXN0ID0gZW50cnkubmV3ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVudHJ5Lm5ld2VyKSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS5uZXdlci5vbGRlciA9IGVudHJ5Lm9sZGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbnRyeS5vbGRlcikge1xyXG4gICAgICAgICAgICAgICAgZW50cnkub2xkZXIubmV3ZXIgPSBlbnRyeS5uZXdlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKGVudHJ5LnZhbHVlLCBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDYWNoZTtcclxufSgpKTtcblxudmFyIHBhcmVudEVudHJ5U2xvdCA9IG5ldyBTbG90KCk7XG5cbnZhciByZXVzYWJsZUVtcHR5QXJyYXkgPSBbXTtcclxudmFyIGVtcHR5U2V0UG9vbCA9IFtdO1xyXG52YXIgUE9PTF9UQVJHRVRfU0laRSA9IDEwMDtcclxuLy8gU2luY2UgdGhpcyBwYWNrYWdlIG1pZ2h0IGJlIHVzZWQgYnJvd3NlcnMsIHdlIHNob3VsZCBhdm9pZCB1c2luZyB0aGVcclxuLy8gTm9kZSBidWlsdC1pbiBhc3NlcnQgbW9kdWxlLlxyXG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBvcHRpb25hbE1lc3NhZ2UpIHtcclxuICAgIGlmICghY29uZGl0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG9wdGlvbmFsTWVzc2FnZSB8fCBcImFzc2VydGlvbiBmYWlsdXJlXCIpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHZhbHVlSXMoYSwgYikge1xyXG4gICAgdmFyIGxlbiA9IGEubGVuZ3RoO1xyXG4gICAgcmV0dXJuIChcclxuICAgIC8vIFVua25vd24gdmFsdWVzIGFyZSBub3QgZXF1YWwgdG8gZWFjaCBvdGhlci5cclxuICAgIGxlbiA+IDAgJiZcclxuICAgICAgICAvLyBCb3RoIHZhbHVlcyBtdXN0IGJlIG9yZGluYXJ5IChvciBib3RoIGV4Y2VwdGlvbmFsKSB0byBiZSBlcXVhbC5cclxuICAgICAgICBsZW4gPT09IGIubGVuZ3RoICYmXHJcbiAgICAgICAgLy8gVGhlIHVuZGVybHlpbmcgdmFsdWUgb3IgZXhjZXB0aW9uIG11c3QgYmUgdGhlIHNhbWUuXHJcbiAgICAgICAgYVtsZW4gLSAxXSA9PT0gYltsZW4gLSAxXSk7XHJcbn1cclxuZnVuY3Rpb24gdmFsdWVHZXQodmFsdWUpIHtcclxuICAgIHN3aXRjaCAodmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgY2FzZSAwOiB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHZhbHVlXCIpO1xyXG4gICAgICAgIGNhc2UgMTogcmV0dXJuIHZhbHVlWzBdO1xyXG4gICAgICAgIGNhc2UgMjogdGhyb3cgdmFsdWVbMV07XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdmFsdWVDb3B5KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCk7XHJcbn1cclxudmFyIEVudHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRW50cnkoZm4sIGFyZ3MpIHtcclxuICAgICAgICB0aGlzLmZuID0gZm47XHJcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcclxuICAgICAgICB0aGlzLnBhcmVudHMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5jaGlsZFZhbHVlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAvLyBXaGVuIHRoaXMgRW50cnkgaGFzIGNoaWxkcmVuIHRoYXQgYXJlIGRpcnR5LCB0aGlzIHByb3BlcnR5IGJlY29tZXNcclxuICAgICAgICAvLyBhIFNldCBjb250YWluaW5nIG90aGVyIEVudHJ5IG9iamVjdHMsIGJvcnJvd2VkIGZyb20gZW1wdHlTZXRQb29sLlxyXG4gICAgICAgIC8vIFdoZW4gdGhlIHNldCBiZWNvbWVzIGVtcHR5LCBpdCBnZXRzIHJlY3ljbGVkIGJhY2sgdG8gZW1wdHlTZXRQb29sLlxyXG4gICAgICAgIHRoaXMuZGlydHlDaGlsZHJlbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWNvbXB1dGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBbXTtcclxuICAgICAgICArK0VudHJ5LmNvdW50O1xyXG4gICAgfVxyXG4gICAgLy8gVGhpcyBpcyB0aGUgbW9zdCBpbXBvcnRhbnQgbWV0aG9kIG9mIHRoZSBFbnRyeSBBUEksIGJlY2F1c2UgaXRcclxuICAgIC8vIGRldGVybWluZXMgd2hldGhlciB0aGUgY2FjaGVkIHRoaXMudmFsdWUgY2FuIGJlIHJldHVybmVkIGltbWVkaWF0ZWx5LFxyXG4gICAgLy8gb3IgbXVzdCBiZSByZWNvbXB1dGVkLiBUaGUgb3ZlcmFsbCBwZXJmb3JtYW5jZSBvZiB0aGUgY2FjaGluZyBzeXN0ZW1cclxuICAgIC8vIGRlcGVuZHMgb24gdGhlIHRydXRoIG9mIHRoZSBmb2xsb3dpbmcgb2JzZXJ2YXRpb25zOiAoMSkgdGhpcy5kaXJ0eSBpc1xyXG4gICAgLy8gdXN1YWxseSBmYWxzZSwgKDIpIHRoaXMuZGlydHlDaGlsZHJlbiBpcyB1c3VhbGx5IG51bGwvZW1wdHksIGFuZCB0aHVzXHJcbiAgICAvLyAoMykgdmFsdWVHZXQodGhpcy52YWx1ZSkgaXMgdXN1YWxseSByZXR1cm5lZCB3aXRob3V0IHJlY29tcHV0YXRpb24uXHJcbiAgICBFbnRyeS5wcm90b3R5cGUucmVjb21wdXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFzc2VydCghdGhpcy5yZWNvbXB1dGluZywgXCJhbHJlYWR5IHJlY29tcHV0aW5nXCIpO1xyXG4gICAgICAgIGlmICghcmVtZW1iZXJQYXJlbnQodGhpcykgJiYgbWF5YmVSZXBvcnRPcnBoYW4odGhpcykpIHtcclxuICAgICAgICAgICAgLy8gVGhlIHJlY2lwaWVudCBvZiB0aGUgZW50cnkucmVwb3J0T3JwaGFuIGNhbGxiYWNrIGRlY2lkZWQgdG8gZGlzcG9zZVxyXG4gICAgICAgICAgICAvLyBvZiB0aGlzIG9ycGhhbiBlbnRyeSBieSBjYWxsaW5nIGVudHJ5LmRpc3Bvc2UoKSwgc28gd2UgZG9uJ3QgbmVlZCB0b1xyXG4gICAgICAgICAgICAvLyAoYW5kIHNob3VsZCBub3QpIHByb2NlZWQgd2l0aCB0aGUgcmVjb21wdXRhdGlvbi5cclxuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pZ2h0QmVEaXJ0eSh0aGlzKVxyXG4gICAgICAgICAgICA/IHJlYWxseVJlY29tcHV0ZSh0aGlzKVxyXG4gICAgICAgICAgICA6IHZhbHVlR2V0KHRoaXMudmFsdWUpO1xyXG4gICAgfTtcclxuICAgIEVudHJ5LnByb3RvdHlwZS5zZXREaXJ0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmFsdWUubGVuZ3RoID0gMDtcclxuICAgICAgICByZXBvcnREaXJ0eSh0aGlzKTtcclxuICAgICAgICAvLyBXZSBjYW4gZ28gYWhlYWQgYW5kIHVuc3Vic2NyaWJlIGhlcmUsIHNpbmNlIGFueSBmdXJ0aGVyIGRpcnR5XHJcbiAgICAgICAgLy8gbm90aWZpY2F0aW9ucyB3ZSByZWNlaXZlIHdpbGwgYmUgcmVkdW5kYW50LCBhbmQgdW5zdWJzY3JpYmluZyBtYXlcclxuICAgICAgICAvLyBmcmVlIHVwIHNvbWUgcmVzb3VyY2VzLCBlLmcuIGZpbGUgd2F0Y2hlcnMuXHJcbiAgICAgICAgbWF5YmVVbnN1YnNjcmliZSh0aGlzKTtcclxuICAgIH07XHJcbiAgICBFbnRyeS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGZvcmdldENoaWxkcmVuKHRoaXMpLmZvckVhY2gobWF5YmVSZXBvcnRPcnBoYW4pO1xyXG4gICAgICAgIG1heWJlVW5zdWJzY3JpYmUodGhpcyk7XHJcbiAgICAgICAgLy8gQmVjYXVzZSB0aGlzIGVudHJ5IGhhcyBiZWVuIGtpY2tlZCBvdXQgb2YgdGhlIGNhY2hlIChpbiBpbmRleC5qcyksXHJcbiAgICAgICAgLy8gd2UndmUgbG9zdCB0aGUgYWJpbGl0eSB0byBmaW5kIG91dCBpZi93aGVuIHRoaXMgZW50cnkgYmVjb21lcyBkaXJ0eSxcclxuICAgICAgICAvLyB3aGV0aGVyIHRoYXQgaGFwcGVucyB0aHJvdWdoIGEgc3Vic2NyaXB0aW9uLCBiZWNhdXNlIG9mIGEgZGlyZWN0IGNhbGxcclxuICAgICAgICAvLyB0byBlbnRyeS5zZXREaXJ0eSgpLCBvciBiZWNhdXNlIG9uZSBvZiBpdHMgY2hpbGRyZW4gYmVjb21lcyBkaXJ0eS5cclxuICAgICAgICAvLyBCZWNhdXNlIG9mIHRoaXMgbG9zcyBvZiBmdXR1cmUgaW5mb3JtYXRpb24sIHdlIGhhdmUgdG8gYXNzdW1lIHRoZVxyXG4gICAgICAgIC8vIHdvcnN0ICh0aGF0IHRoaXMgZW50cnkgbWlnaHQgaGF2ZSBiZWNvbWUgZGlydHkgdmVyeSBzb29uKSwgc28gd2UgbXVzdFxyXG4gICAgICAgIC8vIGltbWVkaWF0ZWx5IG1hcmsgdGhpcyBlbnRyeSdzIHBhcmVudHMgYXMgZGlydHkuIE5vcm1hbGx5IHdlIGNvdWxkXHJcbiAgICAgICAgLy8ganVzdCBjYWxsIGVudHJ5LnNldERpcnR5KCkgcmF0aGVyIHRoYW4gY2FsbGluZyBwYXJlbnQuc2V0RGlydHkoKSBmb3JcclxuICAgICAgICAvLyBlYWNoIHBhcmVudCwgYnV0IHRoYXQgd291bGQgbGVhdmUgdGhpcyBlbnRyeSBpbiBwYXJlbnQuY2hpbGRWYWx1ZXNcclxuICAgICAgICAvLyBhbmQgcGFyZW50LmRpcnR5Q2hpbGRyZW4sIHdoaWNoIHdvdWxkIHByZXZlbnQgdGhlIGNoaWxkIGZyb20gYmVpbmdcclxuICAgICAgICAvLyB0cnVseSBmb3Jnb3R0ZW4uXHJcbiAgICAgICAgdGhpcy5wYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xyXG4gICAgICAgICAgICBwYXJlbnQuc2V0RGlydHkoKTtcclxuICAgICAgICAgICAgZm9yZ2V0Q2hpbGQocGFyZW50LCBfdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgRW50cnkuY291bnQgPSAwO1xyXG4gICAgcmV0dXJuIEVudHJ5O1xyXG59KCkpO1xyXG5mdW5jdGlvbiByZW1lbWJlclBhcmVudChjaGlsZCkge1xyXG4gICAgdmFyIHBhcmVudCA9IHBhcmVudEVudHJ5U2xvdC5nZXRWYWx1ZSgpO1xyXG4gICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgIGNoaWxkLnBhcmVudHMuYWRkKHBhcmVudCk7XHJcbiAgICAgICAgaWYgKCFwYXJlbnQuY2hpbGRWYWx1ZXMuaGFzKGNoaWxkKSkge1xyXG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRWYWx1ZXMuc2V0KGNoaWxkLCBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtaWdodEJlRGlydHkoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgIHJlcG9ydERpcnR5Q2hpbGQocGFyZW50LCBjaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXBvcnRDbGVhbkNoaWxkKHBhcmVudCwgY2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlYWxseVJlY29tcHV0ZShlbnRyeSkge1xyXG4gICAgLy8gU2luY2UgdGhpcyByZWNvbXB1dGF0aW9uIGlzIGxpa2VseSB0byByZS1yZW1lbWJlciBzb21lIG9mIHRoaXNcclxuICAgIC8vIGVudHJ5J3MgY2hpbGRyZW4sIHdlIGZvcmdldCBvdXIgY2hpbGRyZW4gaGVyZSBidXQgZG8gbm90IGNhbGxcclxuICAgIC8vIG1heWJlUmVwb3J0T3JwaGFuIHVudGlsIGFmdGVyIHRoZSByZWNvbXB1dGF0aW9uIGZpbmlzaGVzLlxyXG4gICAgdmFyIG9yaWdpbmFsQ2hpbGRyZW4gPSBmb3JnZXRDaGlsZHJlbihlbnRyeSk7XHJcbiAgICAvLyBTZXQgZW50cnkgYXMgdGhlIHBhcmVudCBlbnRyeSB3aGlsZSBjYWxsaW5nIHJlY29tcHV0ZU5ld1ZhbHVlKGVudHJ5KS5cclxuICAgIHBhcmVudEVudHJ5U2xvdC53aXRoVmFsdWUoZW50cnksIHJlY29tcHV0ZU5ld1ZhbHVlLCBbZW50cnldKTtcclxuICAgIGlmIChtYXliZVN1YnNjcmliZShlbnRyeSkpIHtcclxuICAgICAgICAvLyBJZiB3ZSBzdWNjZXNzZnVsbHkgcmVjb21wdXRlZCBlbnRyeS52YWx1ZSBhbmQgZGlkIG5vdCBmYWlsIHRvXHJcbiAgICAgICAgLy8gKHJlKXN1YnNjcmliZSwgdGhlbiB0aGlzIEVudHJ5IGlzIG5vIGxvbmdlciBleHBsaWNpdGx5IGRpcnR5LlxyXG4gICAgICAgIHNldENsZWFuKGVudHJ5KTtcclxuICAgIH1cclxuICAgIC8vIE5vdyB0aGF0IHdlJ3ZlIGhhZCBhIGNoYW5jZSB0byByZS1yZW1lbWJlciBhbnkgY2hpbGRyZW4gdGhhdCB3ZXJlXHJcbiAgICAvLyBpbnZvbHZlZCBpbiB0aGUgcmVjb21wdXRhdGlvbiwgd2UgY2FuIHNhZmVseSByZXBvcnQgYW55IG9ycGhhblxyXG4gICAgLy8gY2hpbGRyZW4gdGhhdCByZW1haW4uXHJcbiAgICBvcmlnaW5hbENoaWxkcmVuLmZvckVhY2gobWF5YmVSZXBvcnRPcnBoYW4pO1xyXG4gICAgcmV0dXJuIHZhbHVlR2V0KGVudHJ5LnZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiByZWNvbXB1dGVOZXdWYWx1ZShlbnRyeSkge1xyXG4gICAgZW50cnkucmVjb21wdXRpbmcgPSB0cnVlO1xyXG4gICAgLy8gU2V0IGVudHJ5LnZhbHVlIGFzIHVua25vd24uXHJcbiAgICBlbnRyeS52YWx1ZS5sZW5ndGggPSAwO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBJZiBlbnRyeS5mbiBzdWNjZWVkcywgZW50cnkudmFsdWUgd2lsbCBiZWNvbWUgYSBub3JtYWwgVmFsdWUuXHJcbiAgICAgICAgZW50cnkudmFsdWVbMF0gPSBlbnRyeS5mbi5hcHBseShudWxsLCBlbnRyeS5hcmdzKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gSWYgZW50cnkuZm4gdGhyb3dzLCBlbnRyeS52YWx1ZSB3aWxsIGJlY29tZSBleGNlcHRpb25hbC5cclxuICAgICAgICBlbnRyeS52YWx1ZVsxXSA9IGU7XHJcbiAgICB9XHJcbiAgICAvLyBFaXRoZXIgd2F5LCB0aGlzIGxpbmUgaXMgYWx3YXlzIHJlYWNoZWQuXHJcbiAgICBlbnRyeS5yZWNvbXB1dGluZyA9IGZhbHNlO1xyXG59XHJcbmZ1bmN0aW9uIG1pZ2h0QmVEaXJ0eShlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LmRpcnR5IHx8ICEhKGVudHJ5LmRpcnR5Q2hpbGRyZW4gJiYgZW50cnkuZGlydHlDaGlsZHJlbi5zaXplKTtcclxufVxyXG5mdW5jdGlvbiBzZXRDbGVhbihlbnRyeSkge1xyXG4gICAgZW50cnkuZGlydHkgPSBmYWxzZTtcclxuICAgIGlmIChtaWdodEJlRGlydHkoZW50cnkpKSB7XHJcbiAgICAgICAgLy8gVGhpcyBFbnRyeSBtYXkgc3RpbGwgaGF2ZSBkaXJ0eSBjaGlsZHJlbiwgaW4gd2hpY2ggY2FzZSB3ZSBjYW4ndFxyXG4gICAgICAgIC8vIGxldCBvdXIgcGFyZW50cyBrbm93IHdlJ3JlIGNsZWFuIGp1c3QgeWV0LlxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlcG9ydENsZWFuKGVudHJ5KTtcclxufVxyXG5mdW5jdGlvbiByZXBvcnREaXJ0eShjaGlsZCkge1xyXG4gICAgY2hpbGQucGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJlbnQpIHsgcmV0dXJuIHJlcG9ydERpcnR5Q2hpbGQocGFyZW50LCBjaGlsZCk7IH0pO1xyXG59XHJcbmZ1bmN0aW9uIHJlcG9ydENsZWFuKGNoaWxkKSB7XHJcbiAgICBjaGlsZC5wYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkgeyByZXR1cm4gcmVwb3J0Q2xlYW5DaGlsZChwYXJlbnQsIGNoaWxkKTsgfSk7XHJcbn1cclxuLy8gTGV0IGEgcGFyZW50IEVudHJ5IGtub3cgdGhhdCBvbmUgb2YgaXRzIGNoaWxkcmVuIG1heSBiZSBkaXJ0eS5cclxuZnVuY3Rpb24gcmVwb3J0RGlydHlDaGlsZChwYXJlbnQsIGNoaWxkKSB7XHJcbiAgICAvLyBNdXN0IGhhdmUgY2FsbGVkIHJlbWVtYmVyUGFyZW50KGNoaWxkKSBiZWZvcmUgY2FsbGluZ1xyXG4gICAgLy8gcmVwb3J0RGlydHlDaGlsZChwYXJlbnQsIGNoaWxkKS5cclxuICAgIGFzc2VydChwYXJlbnQuY2hpbGRWYWx1ZXMuaGFzKGNoaWxkKSk7XHJcbiAgICBhc3NlcnQobWlnaHRCZURpcnR5KGNoaWxkKSk7XHJcbiAgICBpZiAoIXBhcmVudC5kaXJ0eUNoaWxkcmVuKSB7XHJcbiAgICAgICAgcGFyZW50LmRpcnR5Q2hpbGRyZW4gPSBlbXB0eVNldFBvb2wucG9wKCkgfHwgbmV3IFNldDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBhcmVudC5kaXJ0eUNoaWxkcmVuLmhhcyhjaGlsZCkpIHtcclxuICAgICAgICAvLyBJZiB3ZSBhbHJlYWR5IGtub3cgdGhpcyBjaGlsZCBpcyBkaXJ0eSwgdGhlbiB3ZSBtdXN0IGhhdmUgYWxyZWFkeVxyXG4gICAgICAgIC8vIGluZm9ybWVkIG91ciBvd24gcGFyZW50cyB0aGF0IHdlIGFyZSBkaXJ0eSwgc28gd2UgY2FuIHRlcm1pbmF0ZVxyXG4gICAgICAgIC8vIHRoZSByZWN1cnNpb24gZWFybHkuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcGFyZW50LmRpcnR5Q2hpbGRyZW4uYWRkKGNoaWxkKTtcclxuICAgIHJlcG9ydERpcnR5KHBhcmVudCk7XHJcbn1cclxuLy8gTGV0IGEgcGFyZW50IEVudHJ5IGtub3cgdGhhdCBvbmUgb2YgaXRzIGNoaWxkcmVuIGlzIG5vIGxvbmdlciBkaXJ0eS5cclxuZnVuY3Rpb24gcmVwb3J0Q2xlYW5DaGlsZChwYXJlbnQsIGNoaWxkKSB7XHJcbiAgICAvLyBNdXN0IGhhdmUgY2FsbGVkIHJlbWVtYmVyQ2hpbGQoY2hpbGQpIGJlZm9yZSBjYWxsaW5nXHJcbiAgICAvLyByZXBvcnRDbGVhbkNoaWxkKHBhcmVudCwgY2hpbGQpLlxyXG4gICAgYXNzZXJ0KHBhcmVudC5jaGlsZFZhbHVlcy5oYXMoY2hpbGQpKTtcclxuICAgIGFzc2VydCghbWlnaHRCZURpcnR5KGNoaWxkKSk7XHJcbiAgICB2YXIgY2hpbGRWYWx1ZSA9IHBhcmVudC5jaGlsZFZhbHVlcy5nZXQoY2hpbGQpO1xyXG4gICAgaWYgKGNoaWxkVmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcGFyZW50LmNoaWxkVmFsdWVzLnNldChjaGlsZCwgdmFsdWVDb3B5KGNoaWxkLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghdmFsdWVJcyhjaGlsZFZhbHVlLCBjaGlsZC52YWx1ZSkpIHtcclxuICAgICAgICBwYXJlbnQuc2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHJlbW92ZURpcnR5Q2hpbGQocGFyZW50LCBjaGlsZCk7XHJcbiAgICBpZiAobWlnaHRCZURpcnR5KHBhcmVudCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXBvcnRDbGVhbihwYXJlbnQpO1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZURpcnR5Q2hpbGQocGFyZW50LCBjaGlsZCkge1xyXG4gICAgdmFyIGRjID0gcGFyZW50LmRpcnR5Q2hpbGRyZW47XHJcbiAgICBpZiAoZGMpIHtcclxuICAgICAgICBkYy5kZWxldGUoY2hpbGQpO1xyXG4gICAgICAgIGlmIChkYy5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChlbXB0eVNldFBvb2wubGVuZ3RoIDwgUE9PTF9UQVJHRVRfU0laRSkge1xyXG4gICAgICAgICAgICAgICAgZW1wdHlTZXRQb29sLnB1c2goZGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcmVudC5kaXJ0eUNoaWxkcmVuID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8gSWYgdGhlIGdpdmVuIGVudHJ5IGhhcyBhIHJlcG9ydE9ycGhhbiBtZXRob2QsIGFuZCBubyByZW1haW5pbmcgcGFyZW50cyxcclxuLy8gY2FsbCBlbnRyeS5yZXBvcnRPcnBoYW4gYW5kIHJldHVybiB0cnVlIGlmZiBpdCByZXR1cm5zIHRydWUuIFRoZVxyXG4vLyByZXBvcnRPcnBoYW4gZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0cnVlIHRvIGluZGljYXRlIGVudHJ5LmRpc3Bvc2UoKVxyXG4vLyBoYXMgYmVlbiBjYWxsZWQsIGFuZCB0aGUgZW50cnkgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIGFueSBvdGhlciBjYWNoZXNcclxuLy8gKHNlZSBpbmRleC5qcyBmb3IgdGhlIG9ubHkgY3VycmVudCBleGFtcGxlKS5cclxuZnVuY3Rpb24gbWF5YmVSZXBvcnRPcnBoYW4oZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS5wYXJlbnRzLnNpemUgPT09IDAgJiZcclxuICAgICAgICB0eXBlb2YgZW50cnkucmVwb3J0T3JwaGFuID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICBlbnRyeS5yZXBvcnRPcnBoYW4oKSA9PT0gdHJ1ZTtcclxufVxyXG4vLyBSZW1vdmVzIGFsbCBjaGlsZHJlbiBmcm9tIHRoaXMgZW50cnkgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdGhlXHJcbi8vIHJlbW92ZWQgY2hpbGRyZW4uXHJcbmZ1bmN0aW9uIGZvcmdldENoaWxkcmVuKHBhcmVudCkge1xyXG4gICAgdmFyIGNoaWxkcmVuID0gcmV1c2FibGVFbXB0eUFycmF5O1xyXG4gICAgaWYgKHBhcmVudC5jaGlsZFZhbHVlcy5zaXplID4gMCkge1xyXG4gICAgICAgIGNoaWxkcmVuID0gW107XHJcbiAgICAgICAgcGFyZW50LmNoaWxkVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKF92YWx1ZSwgY2hpbGQpIHtcclxuICAgICAgICAgICAgZm9yZ2V0Q2hpbGQocGFyZW50LCBjaGlsZCk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gQWZ0ZXIgd2UgZm9yZ2V0IGFsbCBvdXIgY2hpbGRyZW4sIHRoaXMuZGlydHlDaGlsZHJlbiBtdXN0IGJlIGVtcHR5XHJcbiAgICAvLyBhbmQgdGhlcmVmb3JlIG11c3QgaGF2ZSBiZWVuIHJlc2V0IHRvIG51bGwuXHJcbiAgICBhc3NlcnQocGFyZW50LmRpcnR5Q2hpbGRyZW4gPT09IG51bGwpO1xyXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xyXG59XHJcbmZ1bmN0aW9uIGZvcmdldENoaWxkKHBhcmVudCwgY2hpbGQpIHtcclxuICAgIGNoaWxkLnBhcmVudHMuZGVsZXRlKHBhcmVudCk7XHJcbiAgICBwYXJlbnQuY2hpbGRWYWx1ZXMuZGVsZXRlKGNoaWxkKTtcclxuICAgIHJlbW92ZURpcnR5Q2hpbGQocGFyZW50LCBjaGlsZCk7XHJcbn1cclxuZnVuY3Rpb24gbWF5YmVTdWJzY3JpYmUoZW50cnkpIHtcclxuICAgIGlmICh0eXBlb2YgZW50cnkuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtYXliZVVuc3Vic2NyaWJlKGVudHJ5KTsgLy8gUHJldmVudCBkb3VibGUgc3Vic2NyaXB0aW9ucy5cclxuICAgICAgICAgICAgZW50cnkudW5zdWJzY3JpYmUgPSBlbnRyeS5zdWJzY3JpYmUuYXBwbHkobnVsbCwgZW50cnkuYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXMgRW50cnkgaGFzIGEgc3Vic2NyaWJlIGZ1bmN0aW9uIGFuZCBpdCB0aHJldyBhbiBleGNlcHRpb25cclxuICAgICAgICAgICAgLy8gKG9yIGFuIHVuc3Vic2NyaWJlIGZ1bmN0aW9uIGl0IHByZXZpb3VzbHkgcmV0dXJuZWQgbm93IHRocm93cyksXHJcbiAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZSB0byBpbmRpY2F0ZSB0aGF0IHdlIHdlcmUgbm90IGFibGUgdG8gc3Vic2NyaWJlIChvclxyXG4gICAgICAgICAgICAvLyB1bnN1YnNjcmliZSksIGFuZCB0aGlzIEVudHJ5IHNob3VsZCByZW1haW4gZGlydHkuXHJcbiAgICAgICAgICAgIGVudHJ5LnNldERpcnR5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBSZXR1cm5pbmcgdHJ1ZSBpbmRpY2F0ZXMgZWl0aGVyIHRoYXQgdGhlcmUgd2FzIG5vIGVudHJ5LnN1YnNjcmliZVxyXG4gICAgLy8gZnVuY3Rpb24gb3IgdGhhdCBpdCBzdWNjZWVkZWQuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiBtYXliZVVuc3Vic2NyaWJlKGVudHJ5KSB7XHJcbiAgICB2YXIgdW5zdWJzY3JpYmUgPSBlbnRyeS51bnN1YnNjcmliZTtcclxuICAgIGlmICh0eXBlb2YgdW5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGVudHJ5LnVuc3Vic2NyaWJlID0gdm9pZCAwO1xyXG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbn1cblxuLy8gQSB0cmllIGRhdGEgc3RydWN0dXJlIHRoYXQgaG9sZHMgb2JqZWN0IGtleXMgd2Vha2x5LCB5ZXQgY2FuIGFsc28gaG9sZFxyXG4vLyBub24tb2JqZWN0IGtleXMsIHVubGlrZSB0aGUgbmF0aXZlIGBXZWFrTWFwYC5cclxudmFyIEtleVRyaWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBLZXlUcmllKHdlYWtuZXNzKSB7XHJcbiAgICAgICAgdGhpcy53ZWFrbmVzcyA9IHdlYWtuZXNzO1xyXG4gICAgfVxyXG4gICAgS2V5VHJpZS5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFycmF5W19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvb2t1cEFycmF5KGFycmF5KTtcclxuICAgIH07XHJcbiAgICBLZXlUcmllLnByb3RvdHlwZS5sb29rdXBBcnJheSA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcztcclxuICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG5vZGUgPSBub2RlLmdldENoaWxkVHJpZShrZXkpOyB9KTtcclxuICAgICAgICByZXR1cm4gbm9kZS5kYXRhIHx8IChub2RlLmRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpKTtcclxuICAgIH07XHJcbiAgICBLZXlUcmllLnByb3RvdHlwZS5nZXRDaGlsZFRyaWUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMud2Vha25lc3MgJiYgaXNPYmpSZWYoa2V5KVxyXG4gICAgICAgICAgICA/IHRoaXMud2VhayB8fCAodGhpcy53ZWFrID0gbmV3IFdlYWtNYXAoKSlcclxuICAgICAgICAgICAgOiB0aGlzLnN0cm9uZyB8fCAodGhpcy5zdHJvbmcgPSBuZXcgTWFwKCkpO1xyXG4gICAgICAgIHZhciBjaGlsZCA9IG1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoIWNoaWxkKVxyXG4gICAgICAgICAgICBtYXAuc2V0KGtleSwgY2hpbGQgPSBuZXcgS2V5VHJpZSh0aGlzLndlYWtuZXNzKSk7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBLZXlUcmllO1xyXG59KCkpO1xyXG5mdW5jdGlvbiBpc09ialJlZih2YWx1ZSkge1xyXG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcclxuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byByZXR1cm4gdHJ1ZS4uLlxyXG4gICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxuXG4vLyBUaGUgZGVmYXVsdE1ha2VDYWNoZUtleSBmdW5jdGlvbiBpcyByZW1hcmthYmx5IHBvd2VyZnVsLCBiZWNhdXNlIGl0IGdpdmVzXHJcbi8vIGEgdW5pcXVlIG9iamVjdCBmb3IgYW55IHNoYWxsb3ctaWRlbnRpY2FsIGxpc3Qgb2YgYXJndW1lbnRzLiBJZiB5b3UgbmVlZFxyXG4vLyB0byBpbXBsZW1lbnQgYSBjdXN0b20gbWFrZUNhY2hlS2V5IGZ1bmN0aW9uLCB5b3UgbWF5IGZpbmQgaXQgaGVscGZ1bCB0b1xyXG4vLyBkZWxlZ2F0ZSB0aGUgZmluYWwgd29yayB0byBkZWZhdWx0TWFrZUNhY2hlS2V5LCB3aGljaCBpcyB3aHkgd2UgZXhwb3J0IGl0XHJcbi8vIGhlcmUuIEhvd2V2ZXIsIHlvdSBtYXkgd2FudCB0byBhdm9pZCBkZWZhdWx0TWFrZUNhY2hlS2V5IGlmIHlvdXIgcnVudGltZVxyXG4vLyBkb2VzIG5vdCBzdXBwb3J0IFdlYWtNYXAsIG9yIHlvdSBoYXZlIHRoZSBhYmlsaXR5IHRvIHJldHVybiBhIHN0cmluZyBrZXkuXHJcbi8vIEluIHRob3NlIGNhc2VzLCBqdXN0IHdyaXRlIHlvdXIgb3duIGN1c3RvbSBtYWtlQ2FjaGVLZXkgZnVuY3Rpb25zLlxyXG52YXIga2V5VHJpZSA9IG5ldyBLZXlUcmllKHR5cGVvZiBXZWFrTWFwID09PSBcImZ1bmN0aW9uXCIpO1xyXG5mdW5jdGlvbiBkZWZhdWx0TWFrZUNhY2hlS2V5KCkge1xyXG4gICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGtleVRyaWUubG9va3VwQXJyYXkoYXJncyk7XHJcbn1cclxudmFyIGNhY2hlcyA9IG5ldyBTZXQoKTtcclxuZnVuY3Rpb24gd3JhcChvcmlnaW5hbEZ1bmN0aW9uLCBvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpOyB9XHJcbiAgICB2YXIgY2FjaGUgPSBuZXcgQ2FjaGUob3B0aW9ucy5tYXggfHwgTWF0aC5wb3coMiwgMTYpLCBmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuIGVudHJ5LmRpc3Bvc2UoKTsgfSk7XHJcbiAgICB2YXIgZGlzcG9zYWJsZSA9ICEhb3B0aW9ucy5kaXNwb3NhYmxlO1xyXG4gICAgdmFyIG1ha2VDYWNoZUtleSA9IG9wdGlvbnMubWFrZUNhY2hlS2V5IHx8IGRlZmF1bHRNYWtlQ2FjaGVLZXk7XHJcbiAgICBmdW5jdGlvbiBvcHRpbWlzdGljKCkge1xyXG4gICAgICAgIGlmIChkaXNwb3NhYmxlICYmICFwYXJlbnRFbnRyeVNsb3QuaGFzVmFsdWUoKSkge1xyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIGN1cnJlbnQgcGFyZW50IGNvbXB1dGF0aW9uLCBhbmQgdGhpcyB3cmFwcGVkXHJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGlzIGRpc3Bvc2FibGUgKG1lYW5pbmcgd2UgZG9uJ3QgY2FyZSBhYm91dCBlbnRyeS52YWx1ZSxcclxuICAgICAgICAgICAgLy8ganVzdCBkZXBlbmRlbmN5IHRyYWNraW5nKSwgdGhlbiB3ZSBjYW4gc2hvcnQtY3V0IGV2ZXJ5dGhpbmcgZWxzZVxyXG4gICAgICAgICAgICAvLyBpbiB0aGlzIGZ1bmN0aW9uLCBiZWNhdXNlIGVudHJ5LnJlY29tcHV0ZSgpIGlzIGdvaW5nIHRvIHJlY3ljbGVcclxuICAgICAgICAgICAgLy8gdGhlIGVudHJ5IG9iamVjdCB3aXRob3V0IHJlY29tcHV0aW5nIGFueXRoaW5nLCBhbnl3YXkuXHJcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrZXkgPSBtYWtlQ2FjaGVLZXkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICBpZiAoa2V5ID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRnVuY3Rpb24uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgIHZhciBlbnRyeSA9IGNhY2hlLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgICAgICBlbnRyeS5hcmdzID0gYXJncztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVudHJ5ID0gbmV3IEVudHJ5KG9yaWdpbmFsRnVuY3Rpb24sIGFyZ3MpO1xyXG4gICAgICAgICAgICBjYWNoZS5zZXQoa2V5LCBlbnRyeSk7XHJcbiAgICAgICAgICAgIGVudHJ5LnN1YnNjcmliZSA9IG9wdGlvbnMuc3Vic2NyaWJlO1xyXG4gICAgICAgICAgICBpZiAoZGlzcG9zYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgZW50cnkucmVwb3J0T3JwaGFuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FjaGUuZGVsZXRlKGtleSk7IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZW50cnkucmVjb21wdXRlKCk7XHJcbiAgICAgICAgLy8gTW92ZSB0aGlzIGVudHJ5IHRvIHRoZSBmcm9udCBvZiB0aGUgbGVhc3QtcmVjZW50bHkgdXNlZCBxdWV1ZSxcclxuICAgICAgICAvLyBzaW5jZSB3ZSBqdXN0IGZpbmlzaGVkIGNvbXB1dGluZyBpdHMgdmFsdWUuXHJcbiAgICAgICAgY2FjaGUuc2V0KGtleSwgZW50cnkpO1xyXG4gICAgICAgIGNhY2hlcy5hZGQoY2FjaGUpO1xyXG4gICAgICAgIC8vIENsZWFuIHVwIGFueSBleGNlc3MgZW50cmllcyBpbiB0aGUgY2FjaGUsIGJ1dCBvbmx5IGlmIHRoZXJlIGlzIG5vXHJcbiAgICAgICAgLy8gYWN0aXZlIHBhcmVudCBlbnRyeSwgbWVhbmluZyB3ZSdyZSBub3QgaW4gdGhlIG1pZGRsZSBvZiBhIGxhcmdlclxyXG4gICAgICAgIC8vIGNvbXB1dGF0aW9uIHRoYXQgbWlnaHQgYmUgZmx1bW1veGVkIGJ5IHRoZSBjbGVhbmluZy5cclxuICAgICAgICBpZiAoIXBhcmVudEVudHJ5U2xvdC5oYXNWYWx1ZSgpKSB7XHJcbiAgICAgICAgICAgIGNhY2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChjYWNoZSkgeyByZXR1cm4gY2FjaGUuY2xlYW4oKTsgfSk7XHJcbiAgICAgICAgICAgIGNhY2hlcy5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJZiBvcHRpb25zLmRpc3Bvc2FibGUgaXMgdHJ1dGh5LCB0aGUgY2FsbGVyIG9mIHdyYXAgaXMgdGVsbGluZyB1c1xyXG4gICAgICAgIC8vIHRoZXkgZG9uJ3QgY2FyZSBhYm91dCB0aGUgcmVzdWx0IG9mIGVudHJ5LnJlY29tcHV0ZSgpLCBzbyB3ZSBzaG91bGRcclxuICAgICAgICAvLyBhdm9pZCByZXR1cm5pbmcgdGhlIHZhbHVlLCBzbyBpdCB3b24ndCBiZSBhY2NpZGVudGFsbHkgdXNlZC5cclxuICAgICAgICByZXR1cm4gZGlzcG9zYWJsZSA/IHZvaWQgMCA6IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgb3B0aW1pc3RpYy5kaXJ0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIga2V5ID0gbWFrZUNhY2hlS2V5LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgdmFyIGNoaWxkID0ga2V5ICE9PSB2b2lkIDAgJiYgY2FjaGUuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBvcHRpbWlzdGljO1xyXG59XG5cbmV4cG9ydCB7IEtleVRyaWUsIGRlZmF1bHRNYWtlQ2FjaGVLZXksIHdyYXAgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1bmRsZS5lc20uanMubWFwXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwuanMnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFN5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSAndHNsaWInO1xuXG52YXIgZ2VuZXJpY01lc3NhZ2UgPSBcIkludmFyaWFudCBWaW9sYXRpb25cIjtcclxudmFyIF9hID0gT2JqZWN0LnNldFByb3RvdHlwZU9mLCBzZXRQcm90b3R5cGVPZiA9IF9hID09PSB2b2lkIDAgPyBmdW5jdGlvbiAob2JqLCBwcm90bykge1xyXG4gICAgb2JqLl9fcHJvdG9fXyA9IHByb3RvO1xyXG4gICAgcmV0dXJuIG9iajtcclxufSA6IF9hO1xyXG52YXIgSW52YXJpYW50RXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoSW52YXJpYW50RXJyb3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBJbnZhcmlhbnRFcnJvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gZ2VuZXJpY01lc3NhZ2U7IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB0eXBlb2YgbWVzc2FnZSA9PT0gXCJudW1iZXJcIlxyXG4gICAgICAgICAgICA/IGdlbmVyaWNNZXNzYWdlICsgXCI6IFwiICsgbWVzc2FnZSArIFwiIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Fwb2xsb2dyYXBocWwvaW52YXJpYW50LXBhY2thZ2VzKVwiXHJcbiAgICAgICAgICAgIDogbWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5mcmFtZXNUb1BvcCA9IDE7XHJcbiAgICAgICAgX3RoaXMubmFtZSA9IGdlbmVyaWNNZXNzYWdlO1xyXG4gICAgICAgIHNldFByb3RvdHlwZU9mKF90aGlzLCBJbnZhcmlhbnRFcnJvci5wcm90b3R5cGUpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBJbnZhcmlhbnRFcnJvcjtcclxufShFcnJvcikpO1xyXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XHJcbiAgICBpZiAoIWNvbmRpdGlvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBJbnZhcmlhbnRFcnJvcihtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB3cmFwQ29uc29sZU1ldGhvZChtZXRob2QpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGVbbWV0aG9kXS5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufVxyXG4oZnVuY3Rpb24gKGludmFyaWFudCkge1xyXG4gICAgaW52YXJpYW50Lndhcm4gPSB3cmFwQ29uc29sZU1ldGhvZChcIndhcm5cIik7XHJcbiAgICBpbnZhcmlhbnQuZXJyb3IgPSB3cmFwQ29uc29sZU1ldGhvZChcImVycm9yXCIpO1xyXG59KShpbnZhcmlhbnQgfHwgKGludmFyaWFudCA9IHt9KSk7XHJcbi8vIENvZGUgdGhhdCB1c2VzIHRzLWludmFyaWFudCB3aXRoIHJvbGx1cC1wbHVnaW4taW52YXJpYW50IG1heSB3YW50IHRvXHJcbi8vIGltcG9ydCB0aGlzIHByb2Nlc3Mgc3R1YiB0byBhdm9pZCBlcnJvcnMgZXZhbHVhdGluZyBwcm9jZXNzLmVudi5OT0RFX0VOVi5cclxuLy8gSG93ZXZlciwgYmVjYXVzZSBtb3N0IEVTTS10by1DSlMgY29tcGlsZXJzIHdpbGwgcmV3cml0ZSB0aGUgcHJvY2VzcyBpbXBvcnRcclxuLy8gYXMgdHNJbnZhcmlhbnQucHJvY2Vzcywgd2hpY2ggcHJldmVudHMgcHJvcGVyIHJlcGxhY2VtZW50IGJ5IG1pbmlmaWVycywgd2VcclxuLy8gYWxzbyBhdHRlbXB0IHRvIGRlZmluZSB0aGUgc3R1YiBnbG9iYWxseSB3aGVuIGl0IGlzIG5vdCBhbHJlYWR5IGRlZmluZWQuXHJcbnZhciBwcm9jZXNzU3R1YiA9IHsgZW52OiB7fSB9O1xyXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIpIHtcclxuICAgIHByb2Nlc3NTdHViID0gcHJvY2VzcztcclxufVxyXG5lbHNlXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIFVzaW5nIEZ1bmN0aW9uIHRvIGV2YWx1YXRlIHRoaXMgYXNzaWdubWVudCBpbiBnbG9iYWwgc2NvcGUgYWxzbyBlc2NhcGVzXHJcbiAgICAgICAgLy8gdGhlIHN0cmljdCBtb2RlIG9mIHRoZSBjdXJyZW50IG1vZHVsZSwgdGhlcmVieSBhbGxvd2luZyB0aGUgYXNzaWdubWVudC5cclxuICAgICAgICAvLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvcHVsbC8zNjkuXHJcbiAgICAgICAgRnVuY3Rpb24oXCJzdHViXCIsIFwicHJvY2VzcyA9IHN0dWJcIikocHJvY2Vzc1N0dWIpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGF0TGVhc3RXZVRyaWVkKSB7XHJcbiAgICAgICAgLy8gVGhlIGFzc2lnbm1lbnQgY2FuIGZhaWwgaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBoZWF2eS1oYW5kZWRseVxyXG4gICAgICAgIC8vIGZvcmJpZHMgRnVuY3Rpb24gdXNhZ2UuIEluIHRob3NlIGVudmlyb25tZW50cywgZGV2ZWxvcGVycyBzaG91bGQgdGFrZVxyXG4gICAgICAgIC8vIGV4dHJhIGNhcmUgdG8gcmVwbGFjZSBwcm9jZXNzLmVudi5OT0RFX0VOViBpbiB0aGVpciBwcm9kdWN0aW9uIGJ1aWxkcyxcclxuICAgICAgICAvLyBvciBkZWZpbmUgYW4gYXBwcm9wcmlhdGUgZ2xvYmFsLnByb2Nlc3MgcG9seWZpbGwuXHJcbiAgICB9XHJcbnZhciBpbnZhcmlhbnQkMSA9IGludmFyaWFudDtcblxuZXhwb3J0IGRlZmF1bHQgaW52YXJpYW50JDE7XG5leHBvcnQgeyBJbnZhcmlhbnRFcnJvciwgaW52YXJpYW50LCBwcm9jZXNzU3R1YiBhcyBwcm9jZXNzIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnZhcmlhbnQuZXNtLmpzLm1hcFxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IHplbk9ic2VydmFibGUgZnJvbSAnemVuLW9ic2VydmFibGUnO1xuXG52YXIgT2JzZXJ2YWJsZSA9IHplbk9ic2VydmFibGU7XG5cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGU7XG5leHBvcnQgeyBPYnNlcnZhYmxlIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idW5kbGUuZXNtLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9PYnNlcnZhYmxlLmpzJykuT2JzZXJ2YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5PYnNlcnZhYmxlID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbi8vID09PSBTeW1ib2wgU3VwcG9ydCA9PT1cbnZhciBoYXNTeW1ib2xzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbnZhciBoYXNTeW1ib2wgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gaGFzU3ltYm9scygpICYmIEJvb2xlYW4oU3ltYm9sW25hbWVdKTtcbn07XG5cbnZhciBnZXRTeW1ib2wgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gaGFzU3ltYm9sKG5hbWUpID8gU3ltYm9sW25hbWVdIDogJ0BAJyArIG5hbWU7XG59O1xuXG5pZiAoaGFzU3ltYm9scygpICYmICFoYXNTeW1ib2woJ29ic2VydmFibGUnKSkge1xuICBTeW1ib2wub2JzZXJ2YWJsZSA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xufVxuXG52YXIgU3ltYm9sSXRlcmF0b3IgPSBnZXRTeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU3ltYm9sT2JzZXJ2YWJsZSA9IGdldFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xudmFyIFN5bWJvbFNwZWNpZXMgPSBnZXRTeW1ib2woJ3NwZWNpZXMnKTsgLy8gPT09IEFic3RyYWN0IE9wZXJhdGlvbnMgPT09XG5cbmZ1bmN0aW9uIGdldE1ldGhvZChvYmosIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0U3BlY2llcyhvYmopIHtcbiAgdmFyIGN0b3IgPSBvYmouY29uc3RydWN0b3I7XG5cbiAgaWYgKGN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGN0b3IgPSBjdG9yW1N5bWJvbFNwZWNpZXNdO1xuXG4gICAgaWYgKGN0b3IgPT09IG51bGwpIHtcbiAgICAgIGN0b3IgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN0b3IgIT09IHVuZGVmaW5lZCA/IGN0b3IgOiBPYnNlcnZhYmxlO1xufVxuXG5mdW5jdGlvbiBpc09ic2VydmFibGUoeCkge1xuICByZXR1cm4geCBpbnN0YW5jZW9mIE9ic2VydmFibGU7IC8vIFNQRUM6IEJyYW5kIGNoZWNrXG59XG5cbmZ1bmN0aW9uIGhvc3RSZXBvcnRFcnJvcihlKSB7XG4gIGlmIChob3N0UmVwb3J0RXJyb3IubG9nKSB7XG4gICAgaG9zdFJlcG9ydEVycm9yLmxvZyhlKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGU7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5xdWV1ZShmbikge1xuICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgZm4oKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBob3N0UmVwb3J0RXJyb3IoZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYW51cFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgdmFyIGNsZWFudXAgPSBzdWJzY3JpcHRpb24uX2NsZWFudXA7XG4gIGlmIChjbGVhbnVwID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgc3Vic2NyaXB0aW9uLl9jbGVhbnVwID0gdW5kZWZpbmVkO1xuXG4gIGlmICghY2xlYW51cCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBjbGVhbnVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1bnN1YnNjcmliZSA9IGdldE1ldGhvZChjbGVhbnVwLCAndW5zdWJzY3JpYmUnKTtcblxuICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlLmNhbGwoY2xlYW51cCk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaG9zdFJlcG9ydEVycm9yKGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbikge1xuICBzdWJzY3JpcHRpb24uX29ic2VydmVyID0gdW5kZWZpbmVkO1xuICBzdWJzY3JpcHRpb24uX3F1ZXVlID0gdW5kZWZpbmVkO1xuICBzdWJzY3JpcHRpb24uX3N0YXRlID0gJ2Nsb3NlZCc7XG59XG5cbmZ1bmN0aW9uIGZsdXNoU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbikge1xuICB2YXIgcXVldWUgPSBzdWJzY3JpcHRpb24uX3F1ZXVlO1xuXG4gIGlmICghcXVldWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdWJzY3JpcHRpb24uX3F1ZXVlID0gdW5kZWZpbmVkO1xuICBzdWJzY3JpcHRpb24uX3N0YXRlID0gJ3JlYWR5JztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgbm90aWZ5U3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgcXVldWVbaV0udHlwZSwgcXVldWVbaV0udmFsdWUpO1xuICAgIGlmIChzdWJzY3JpcHRpb24uX3N0YXRlID09PSAnY2xvc2VkJykgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbm90aWZ5U3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgdHlwZSwgdmFsdWUpIHtcbiAgc3Vic2NyaXB0aW9uLl9zdGF0ZSA9ICdydW5uaW5nJztcbiAgdmFyIG9ic2VydmVyID0gc3Vic2NyaXB0aW9uLl9vYnNlcnZlcjtcblxuICB0cnkge1xuICAgIHZhciBtID0gZ2V0TWV0aG9kKG9ic2VydmVyLCB0eXBlKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgIGlmIChtKSBtLmNhbGwob2JzZXJ2ZXIsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgY2xvc2VTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKG0pIG0uY2FsbChvYnNlcnZlciwgdmFsdWUpO2Vsc2UgdGhyb3cgdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjb21wbGV0ZSc6XG4gICAgICAgIGNsb3NlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIGlmIChtKSBtLmNhbGwob2JzZXJ2ZXIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBob3N0UmVwb3J0RXJyb3IoZSk7XG4gIH1cblxuICBpZiAoc3Vic2NyaXB0aW9uLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtlbHNlIGlmIChzdWJzY3JpcHRpb24uX3N0YXRlID09PSAncnVubmluZycpIHN1YnNjcmlwdGlvbi5fc3RhdGUgPSAncmVhZHknO1xufVxuXG5mdW5jdGlvbiBvbk5vdGlmeShzdWJzY3JpcHRpb24sIHR5cGUsIHZhbHVlKSB7XG4gIGlmIChzdWJzY3JpcHRpb24uX3N0YXRlID09PSAnY2xvc2VkJykgcmV0dXJuO1xuXG4gIGlmIChzdWJzY3JpcHRpb24uX3N0YXRlID09PSAnYnVmZmVyaW5nJykge1xuICAgIHN1YnNjcmlwdGlvbi5fcXVldWUucHVzaCh7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc3Vic2NyaXB0aW9uLl9zdGF0ZSAhPT0gJ3JlYWR5Jykge1xuICAgIHN1YnNjcmlwdGlvbi5fc3RhdGUgPSAnYnVmZmVyaW5nJztcbiAgICBzdWJzY3JpcHRpb24uX3F1ZXVlID0gW3tcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9XTtcbiAgICBlbnF1ZXVlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbHVzaFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG5vdGlmeVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIHR5cGUsIHZhbHVlKTtcbn1cblxudmFyIFN1YnNjcmlwdGlvbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihvYnNlcnZlciwgc3Vic2NyaWJlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdWJzY3JpcHRpb24pO1xuXG4gICAgLy8gQVNTRVJUOiBvYnNlcnZlciBpcyBhbiBvYmplY3RcbiAgICAvLyBBU1NFUlQ6IHN1YnNjcmliZXIgaXMgY2FsbGFibGVcbiAgICB0aGlzLl9jbGVhbnVwID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX29ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgdGhpcy5fcXVldWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc3RhdGUgPSAnaW5pdGlhbGl6aW5nJztcbiAgICB2YXIgc3Vic2NyaXB0aW9uT2JzZXJ2ZXIgPSBuZXcgU3Vic2NyaXB0aW9uT2JzZXJ2ZXIodGhpcyk7XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5fY2xlYW51cCA9IHN1YnNjcmliZXIuY2FsbCh1bmRlZmluZWQsIHN1YnNjcmlwdGlvbk9ic2VydmVyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBzdWJzY3JpcHRpb25PYnNlcnZlci5lcnJvcihlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09ICdpbml0aWFsaXppbmcnKSB0aGlzLl9zdGF0ZSA9ICdyZWFkeSc7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU3Vic2NyaXB0aW9uLCBbe1xuICAgIGtleTogXCJ1bnN1YnNjcmliZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgY2xvc2VTdWJzY3JpcHRpb24odGhpcyk7XG4gICAgICAgIGNsZWFudXBTdWJzY3JpcHRpb24odGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsb3NlZFwiLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlID09PSAnY2xvc2VkJztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpO1xuXG52YXIgU3Vic2NyaXB0aW9uT2JzZXJ2ZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdWJzY3JpcHRpb25PYnNlcnZlcihzdWJzY3JpcHRpb24pIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3Vic2NyaXB0aW9uT2JzZXJ2ZXIpO1xuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFN1YnNjcmlwdGlvbk9ic2VydmVyLCBbe1xuICAgIGtleTogXCJuZXh0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5leHQodmFsdWUpIHtcbiAgICAgIG9uTm90aWZ5KHRoaXMuX3N1YnNjcmlwdGlvbiwgJ25leHQnLCB2YWx1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKHZhbHVlKSB7XG4gICAgICBvbk5vdGlmeSh0aGlzLl9zdWJzY3JpcHRpb24sICdlcnJvcicsIHZhbHVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcGxldGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICBvbk5vdGlmeSh0aGlzLl9zdWJzY3JpcHRpb24sICdjb21wbGV0ZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbG9zZWRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpcHRpb24uX3N0YXRlID09PSAnY2xvc2VkJztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3Vic2NyaXB0aW9uT2JzZXJ2ZXI7XG59KCk7XG5cbnZhciBPYnNlcnZhYmxlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gT2JzZXJ2YWJsZShzdWJzY3JpYmVyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE9ic2VydmFibGUpO1xuXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE9ic2VydmFibGUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYnNlcnZhYmxlIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbicpO1xuICAgIGlmICh0eXBlb2Ygc3Vic2NyaWJlciAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JzZXJ2YWJsZSBpbml0aWFsaXplciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdWJzY3JpYmVyID0gc3Vic2NyaWJlcjtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhPYnNlcnZhYmxlLCBbe1xuICAgIGtleTogXCJzdWJzY3JpYmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0JyB8fCBvYnNlcnZlciA9PT0gbnVsbCkge1xuICAgICAgICBvYnNlcnZlciA9IHtcbiAgICAgICAgICBuZXh0OiBvYnNlcnZlcixcbiAgICAgICAgICBlcnJvcjogYXJndW1lbnRzWzFdLFxuICAgICAgICAgIGNvbXBsZXRlOiBhcmd1bWVudHNbMl1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb24ob2JzZXJ2ZXIsIHRoaXMuX3N1YnNjcmliZXIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmb3JFYWNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcihmbiArICcgaXMgbm90IGEgZnVuY3Rpb24nKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gX3RoaXMuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGZuKHZhbHVlLCBkb25lKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiByZWplY3QsXG4gICAgICAgICAgY29tcGxldGU6IHJlc29sdmVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibWFwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1hcChmbikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB2YXIgQyA9IGdldFNwZWNpZXModGhpcyk7XG4gICAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gZm4odmFsdWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmlsdGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpbHRlcihmbikge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB2YXIgQyA9IGdldFNwZWNpZXModGhpcyk7XG4gICAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHJldHVybiBfdGhpczMuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghZm4odmFsdWUpKSByZXR1cm47XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWR1Y2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVkdWNlKGZuKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcihmbiArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIHZhciBDID0gZ2V0U3BlY2llcyh0aGlzKTtcbiAgICAgIHZhciBoYXNTZWVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDE7XG4gICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgIHZhciBzZWVkID0gYXJndW1lbnRzWzFdO1xuICAgICAgdmFyIGFjYyA9IHNlZWQ7XG4gICAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHJldHVybiBfdGhpczQuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBmaXJzdCA9ICFoYXNWYWx1ZTtcbiAgICAgICAgICAgIGhhc1ZhbHVlID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCFmaXJzdCB8fCBoYXNTZWVkKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYWNjID0gZm4oYWNjLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFjYyA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWhhc1ZhbHVlICYmICFoYXNTZWVkKSByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IobmV3IFR5cGVFcnJvcignQ2Fubm90IHJlZHVjZSBhbiBlbXB0eSBzZXF1ZW5jZScpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYWNjKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb25jYXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29uY2F0KCkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzb3VyY2VzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBzb3VyY2VzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgQyA9IGdldFNwZWNpZXModGhpcyk7XG4gICAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgICAgZnVuY3Rpb24gc3RhcnROZXh0KG5leHQpIHtcbiAgICAgICAgICBzdWJzY3JpcHRpb24gPSBuZXh0LnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHYpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnROZXh0KEMuZnJvbShzb3VyY2VzW2luZGV4KytdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TmV4dChfdGhpczUpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmbGF0TWFwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZsYXRNYXAoZm4pIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgdmFyIEMgPSBnZXRTcGVjaWVzKHRoaXMpO1xuICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IFtdO1xuXG4gICAgICAgIHZhciBvdXRlciA9IF90aGlzNi5zdWJzY3JpYmUoe1xuICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBmbih2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGlubmVyID0gQy5mcm9tKHZhbHVlKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBzdWJzY3JpcHRpb25zLmluZGV4T2YoaW5uZXIpO1xuICAgICAgICAgICAgICAgIGlmIChpID49IDApIHN1YnNjcmlwdGlvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlSWZEb25lKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKGlubmVyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29tcGxldGVJZkRvbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlSWZEb25lKCkge1xuICAgICAgICAgIGlmIChvdXRlci5jbG9zZWQgJiYgc3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDApIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvdXRlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBTeW1ib2xPYnNlcnZhYmxlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJmcm9tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb20oeCkge1xuICAgICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBPYnNlcnZhYmxlO1xuICAgICAgaWYgKHggPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcih4ICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAgICB2YXIgbWV0aG9kID0gZ2V0TWV0aG9kKHgsIFN5bWJvbE9ic2VydmFibGUpO1xuXG4gICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbWV0aG9kLmNhbGwoeCk7XG4gICAgICAgIGlmIChPYmplY3Qob2JzZXJ2YWJsZSkgIT09IG9ic2VydmFibGUpIHRocm93IG5ldyBUeXBlRXJyb3Iob2JzZXJ2YWJsZSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlKG9ic2VydmFibGUpICYmIG9ic2VydmFibGUuY29uc3RydWN0b3IgPT09IEMpIHJldHVybiBvYnNlcnZhYmxlO1xuICAgICAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNTeW1ib2woJ2l0ZXJhdG9yJykpIHtcbiAgICAgICAgbWV0aG9kID0gZ2V0TWV0aG9kKHgsIFN5bWJvbEl0ZXJhdG9yKTtcblxuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgZW5xdWV1ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmIChvYnNlcnZlci5jbG9zZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gbWV0aG9kLmNhbGwoeClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX2l0ZW0gPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoX2l0ZW0pO1xuICAgICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNsb3NlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgICAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgZW5xdWV1ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY2xvc2VkKSByZXR1cm47XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHhbaV0pO1xuICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY2xvc2VkKSByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHggKyAnIGlzIG5vdCBvYnNlcnZhYmxlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9mXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBpdGVtcyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBpdGVtc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICB2YXIgQyA9IHR5cGVvZiB0aGlzID09PSAnZnVuY3Rpb24nID8gdGhpcyA6IE9ic2VydmFibGU7XG4gICAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIGVucXVldWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5jbG9zZWQpIHJldHVybjtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoaXRlbXNbaV0pO1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNsb3NlZCkgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBTeW1ib2xTcGVjaWVzLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE9ic2VydmFibGU7XG59KCk7XG5cbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5cbmlmIChoYXNTeW1ib2xzKCkpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9ic2VydmFibGUsIFN5bWJvbCgnZXh0ZW5zaW9ucycpLCB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHN5bWJvbDogU3ltYm9sT2JzZXJ2YWJsZSxcbiAgICAgIGhvc3RSZXBvcnRFcnJvcjogaG9zdFJlcG9ydEVycm9yXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==