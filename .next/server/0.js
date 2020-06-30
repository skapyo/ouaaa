exports.ids = [0];
exports.modules = {

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

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


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

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ob2Mvd2l0aEFwb2xsby5qc3giLCJ3ZWJwYWNrOi8vLy4vbGliL2Fwb2xsb0NsaWVudC9hcG9sbG9DbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZXh0L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vcGFnZXMvX2FwcC50c3giXSwibmFtZXMiOlsiZ2xvYmFsQXBvbGxvQ2xpZW50IiwiaW5pdE9uQ29udGV4dCIsImN0eCIsImluQXBwQ29udGV4dCIsIkJvb2xlYW4iLCJjb25zb2xlIiwid2FybiIsImFwb2xsb0NsaWVudCIsImluaXRBcG9sbG9DbGllbnQiLCJhcG9sbG9TdGF0ZSIsInRvSlNPTiIsImluaXRpYWxTdGF0ZSIsImNyZWF0ZUFwb2xsb0NsaWVudCIsIndpdGhBcG9sbG8iLCJzc3IiLCJQYWdlQ29tcG9uZW50IiwiV2l0aEFwb2xsbyIsInBhZ2VQcm9wcyIsImNsaWVudCIsInVuZGVmaW5lZCIsImRpc3BsYXlOYW1lIiwibmFtZSIsImdldEluaXRpYWxQcm9wcyIsIkFwcCIsIkFwcFRyZWUiLCJyZXMiLCJmaW5pc2hlZCIsImdldERhdGFGcm9tVHJlZSIsInByb3BzIiwiZXJyb3IiLCJIZWFkIiwicmV3aW5kIiwiY2FjaGUiLCJleHRyYWN0IiwiZW5jaGFuY2VkRmV0Y2giLCJ1cmwiLCJpbml0IiwiZmV0Y2giLCJoZWFkZXJzIiwiQ29va2llIiwicmVxIiwiY29va2llIiwidGhlbiIsInJlc3BvbnNlIiwiQXBvbGxvQ2xpZW50Iiwic3NyTW9kZSIsImxpbmsiLCJIdHRwTGluayIsInVyaSIsImNyZWRlbnRpYWxzIiwiSW5NZW1vcnlDYWNoZSIsInJlc3RvcmUiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbXBvbmVudERpZENhdGNoIiwicmVuZGVyIiwiX19OX1NTRyIsImNyZWF0ZVVybCIsIm9yaWdHZXRJbml0aWFsUHJvcHMiLCJhcHBHZXRJbml0aWFsUHJvcHMiLCJ3YXJuQ29udGFpbmVyIiwid2FyblVybCIsInAiLCJiYWNrIiwicm91dGVyIiwicHVzaCIsInB1c2hUbyIsInB1c2hSb3V0ZSIsImFzIiwicHVzaFVybCIsInJlcGxhY2UiLCJyZXBsYWNlVG8iLCJyZXBsYWNlUm91dGUiLCJyZXBsYWNlVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0NBR0E7QUFDQTs7QUFDQSxJQUFJQSxrQkFBa0IsR0FBRyxJQUF6QjtBQUVBOzs7Ozs7O0FBTU8sTUFBTUMsYUFBYSxHQUFHQyxHQUFHLElBQUk7QUFDbEMsUUFBTUMsWUFBWSxHQUFHQyxPQUFPLENBQUNGLEdBQUcsQ0FBQ0EsR0FBTCxDQUE1QixDQURrQyxDQUdsQztBQUNBOztBQUNBLFlBQTRDO0FBQzFDLFFBQUlDLFlBQUosRUFBa0I7QUFDaEJFLGFBQU8sQ0FBQ0MsSUFBUixDQUNFLHdHQUNFLHNFQUZKO0FBSUQ7QUFDRixHQVppQyxDQWNsQzs7O0FBQ0EsUUFBTUMsWUFBWSxHQUNoQkwsR0FBRyxDQUFDSyxZQUFKLElBQ0FDLGdCQUFnQixDQUFDTixHQUFHLENBQUNPLFdBQUosSUFBbUIsRUFBcEIsRUFBd0JOLFlBQVksR0FBR0QsR0FBRyxDQUFDQSxHQUFQLEdBQWFBLEdBQWpELENBRmxCLENBZmtDLENBbUJsQztBQUNBO0FBQ0E7QUFDQTs7QUFDQUssY0FBWSxDQUFDRyxNQUFiLEdBQXNCLE1BQU0sSUFBNUIsQ0F2QmtDLENBeUJsQztBQUNBO0FBQ0E7OztBQUNBUixLQUFHLENBQUNLLFlBQUosR0FBbUJBLFlBQW5COztBQUNBLE1BQUlKLFlBQUosRUFBa0I7QUFDaEJELE9BQUcsQ0FBQ0EsR0FBSixDQUFRSyxZQUFSLEdBQXVCQSxZQUF2QjtBQUNEOztBQUVELFNBQU9MLEdBQVA7QUFDRCxDQWxDTTtBQW9DUDs7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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgQXBwIGZyb20gJ25leHQvYXBwJ1xyXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXHJcbmltcG9ydCB7IEFwb2xsb1Byb3ZpZGVyIH0gZnJvbSAnQGFwb2xsby9yZWFjdC1ob29rcydcclxuaW1wb3J0IGNyZWF0ZUFwb2xsb0NsaWVudCBmcm9tICcuLi9saWIvYXBvbGxvQ2xpZW50L2Fwb2xsb0NsaWVudCdcclxuXHJcbi8vIE9uIHRoZSBjbGllbnQsIHdlIHN0b3JlIHRoZSBBcG9sbG8gQ2xpZW50IGluIHRoZSBmb2xsb3dpbmcgdmFyaWFibGUuXHJcbi8vIFRoaXMgcHJldmVudHMgdGhlIGNsaWVudCBmcm9tIHJlaW5pdGlhbGl6aW5nIGJldHdlZW4gcGFnZSB0cmFuc2l0aW9ucy5cclxubGV0IGdsb2JhbEFwb2xsb0NsaWVudCA9IG51bGxcclxuXHJcbi8qKlxyXG4gKiBJbnN0YWxscyB0aGUgQXBvbGxvIENsaWVudCBvbiBOZXh0UGFnZUNvbnRleHRcclxuICogb3IgTmV4dEFwcENvbnRleHQuIFVzZWZ1bCBpZiB5b3Ugd2FudCB0byB1c2UgYXBvbGxvQ2xpZW50XHJcbiAqIGluc2lkZSBnZXRTdGF0aWNQcm9wcywgZ2V0U3RhdGljUGF0aHMgb3IgZ2V0U2VydmVyU2lkZVByb3BzXHJcbiAqIEBwYXJhbSB7TmV4dFBhZ2VDb250ZXh0IHwgTmV4dEFwcENvbnRleHR9IGN0eFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaXRPbkNvbnRleHQgPSBjdHggPT4ge1xyXG4gIGNvbnN0IGluQXBwQ29udGV4dCA9IEJvb2xlYW4oY3R4LmN0eClcclxuXHJcbiAgLy8gV2UgY29uc2lkZXIgaW5zdGFsbGluZyBgd2l0aEFwb2xsbyh7IHNzcjogdHJ1ZSB9KWAgb24gZ2xvYmFsIEFwcCBsZXZlbFxyXG4gIC8vIGFzIGFudGlwYXR0ZXJuIHNpbmNlIGl0IGRpc2FibGVzIHByb2plY3Qgd2lkZSBBdXRvbWF0aWMgU3RhdGljIE9wdGltaXphdGlvbi5cclxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGlmIChpbkFwcENvbnRleHQpIHtcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICdXYXJuaW5nOiBZb3UgaGF2ZSBvcHRlZC1vdXQgb2YgQXV0b21hdGljIFN0YXRpYyBPcHRpbWl6YXRpb24gZHVlIHRvIGB3aXRoQXBvbGxvYCBpbiBgcGFnZXMvX2FwcGAuXFxuJyArXHJcbiAgICAgICAgICAnUmVhZCBtb3JlOiBodHRwczovL2Vyci5zaC9uZXh0LmpzL29wdC1vdXQtYXV0by1zdGF0aWMtb3B0aW1pemF0aW9uXFxuJ1xyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBJbml0aWFsaXplIEFwb2xsb0NsaWVudCBpZiBub3QgYWxyZWFkeSBkb25lXHJcbiAgY29uc3QgYXBvbGxvQ2xpZW50ID1cclxuICAgIGN0eC5hcG9sbG9DbGllbnQgfHxcclxuICAgIGluaXRBcG9sbG9DbGllbnQoY3R4LmFwb2xsb1N0YXRlIHx8IHt9LCBpbkFwcENvbnRleHQgPyBjdHguY3R4IDogY3R4KVxyXG5cclxuICAvLyBXZSBzZW5kIHRoZSBBcG9sbG8gQ2xpZW50IGFzIGEgcHJvcCB0byB0aGUgY29tcG9uZW50IHRvIGF2b2lkIGNhbGxpbmcgaW5pdEFwb2xsbygpIHR3aWNlIGluIHRoZSBzZXJ2ZXIuXHJcbiAgLy8gT3RoZXJ3aXNlLCB0aGUgY29tcG9uZW50IHdvdWxkIGhhdmUgdG8gY2FsbCBpbml0QXBvbGxvKCkgYWdhaW4gYnV0IHRoaXNcclxuICAvLyB0aW1lIHdpdGhvdXQgdGhlIGNvbnRleHQuIE9uY2UgdGhhdCBoYXBwZW5zLCB0aGUgZm9sbG93aW5nIGNvZGUgd2lsbCBtYWtlIHN1cmUgd2Ugc2VuZFxyXG4gIC8vIHRoZSBwcm9wIGFzIGBudWxsYCB0byB0aGUgYnJvd3Nlci5cclxuICBhcG9sbG9DbGllbnQudG9KU09OID0gKCkgPT4gbnVsbFxyXG5cclxuICAvLyBBZGQgYXBvbGxvQ2xpZW50IHRvIE5leHRQYWdlQ29udGV4dCAmIE5leHRBcHBDb250ZXh0LlxyXG4gIC8vIFRoaXMgYWxsb3dzIHVzIHRvIGNvbnN1bWUgdGhlIGFwb2xsb0NsaWVudCBpbnNpZGUgb3VyXHJcbiAgLy8gY3VzdG9tIGBnZXRJbml0aWFsUHJvcHMoeyBhcG9sbG9DbGllbnQgfSlgLlxyXG4gIGN0eC5hcG9sbG9DbGllbnQgPSBhcG9sbG9DbGllbnRcclxuICBpZiAoaW5BcHBDb250ZXh0KSB7XHJcbiAgICBjdHguY3R4LmFwb2xsb0NsaWVudCA9IGFwb2xsb0NsaWVudFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGN0eFxyXG59XHJcblxyXG4vKipcclxuICogQWx3YXlzIGNyZWF0ZXMgYSBuZXcgYXBvbGxvIGNsaWVudCBvbiB0aGUgc2VydmVyXHJcbiAqIENyZWF0ZXMgb3IgcmV1c2VzIGFwb2xsbyBjbGllbnQgaW4gdGhlIGJyb3dzZXIuXHJcbiAqIEBwYXJhbSAge05vcm1hbGl6ZWRDYWNoZU9iamVjdH0gaW5pdGlhbFN0YXRlXHJcbiAqIEBwYXJhbSAge05leHRQYWdlQ29udGV4dH0gY3R4XHJcbiAqL1xyXG5jb25zdCBpbml0QXBvbGxvQ2xpZW50ID0gKGluaXRpYWxTdGF0ZSwgY3R4KSA9PiB7XHJcbiAgLy8gTWFrZSBzdXJlIHRvIGNyZWF0ZSBhIG5ldyBjbGllbnQgZm9yIGV2ZXJ5IHNlcnZlci1zaWRlIHJlcXVlc3Qgc28gdGhhdCBkYXRhXHJcbiAgLy8gaXNuJ3Qgc2hhcmVkIGJldHdlZW4gY29ubmVjdGlvbnMgKHdoaWNoIHdvdWxkIGJlIGJhZClcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHJldHVybiBjcmVhdGVBcG9sbG9DbGllbnQoaW5pdGlhbFN0YXRlLCBjdHgpXHJcbiAgfVxyXG5cclxuICAvLyBSZXVzZSBjbGllbnQgb24gdGhlIGNsaWVudC1zaWRlXHJcbiAgaWYgKCFnbG9iYWxBcG9sbG9DbGllbnQpIHtcclxuICAgIGdsb2JhbEFwb2xsb0NsaWVudCA9IGNyZWF0ZUFwb2xsb0NsaWVudChpbml0aWFsU3RhdGUsIGN0eClcclxuICB9XHJcblxyXG4gIHJldHVybiBnbG9iYWxBcG9sbG9DbGllbnRcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3aXRoQXBvbGxvIEhPQ1xyXG4gKiB0aGF0IHByb3ZpZGVzIHRoZSBhcG9sbG9Db250ZXh0XHJcbiAqIHRvIGEgbmV4dC5qcyBQYWdlIG9yIEFwcFRyZWUuXHJcbiAqIEBwYXJhbSAge09iamVjdH0gd2l0aEFwb2xsb09wdGlvbnNcclxuICogQHBhcmFtICB7Qm9vbGVhbn0gW3dpdGhBcG9sbG9PcHRpb25zLnNzcj1mYWxzZV1cclxuICogQHJldHVybnMgeyhQYWdlQ29tcG9uZW50OiBSZWFjdE5vZGUpID0+IFJlYWN0Tm9kZX1cclxuICovXHJcbmV4cG9ydCBjb25zdCB3aXRoQXBvbGxvID0gKHsgc3NyID0gZmFsc2UgfSA9IHt9KSA9PiBQYWdlQ29tcG9uZW50ID0+IHtcclxuIFxyXG4gIGNvbnN0IFdpdGhBcG9sbG8gPSAoeyBhcG9sbG9DbGllbnQsIGFwb2xsb1N0YXRlLCAuLi5wYWdlUHJvcHMgfSkgPT4ge1xyXG4gICAgbGV0IGNsaWVudFxyXG4gICAgaWYgKGFwb2xsb0NsaWVudCkge1xyXG4gICAgICAvLyBIYXBwZW5zIG9uOiBnZXREYXRhRnJvbVRyZWUgJiBuZXh0LmpzIHNzclxyXG4gICAgICBjbGllbnQgPSBhcG9sbG9DbGllbnRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEhhcHBlbnMgb246IG5leHQuanMgY3NyXHJcbiAgICAgIGNsaWVudCA9IGluaXRBcG9sbG9DbGllbnQoYXBvbGxvU3RhdGUsIHVuZGVmaW5lZClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8QXBvbGxvUHJvdmlkZXIgY2xpZW50PXtjbGllbnR9PlxyXG4gICAgICAgIDxQYWdlQ29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvQXBvbGxvUHJvdmlkZXI+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICAvLyBTZXQgdGhlIGNvcnJlY3QgZGlzcGxheU5hbWUgaW4gZGV2ZWxvcG1lbnRcclxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgY29uc3QgZGlzcGxheU5hbWUgPVxyXG4gICAgICBQYWdlQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IFBhZ2VDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50J1xyXG4gICAgV2l0aEFwb2xsby5kaXNwbGF5TmFtZSA9IGB3aXRoQXBvbGxvKCR7ZGlzcGxheU5hbWV9KWBcclxuICB9XHJcblxyXG5cclxuICBpZiAoc3NyIHx8IFBhZ2VDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKSB7XHJcbiAgICBXaXRoQXBvbGxvLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIGN0eCA9PiB7XHJcbiAgICAgIGNvbnN0IGluQXBwQ29udGV4dCA9IEJvb2xlYW4oY3R4LmN0eClcclxuICAgICAgY29uc3QgeyBhcG9sbG9DbGllbnQgfSA9IGluaXRPbkNvbnRleHQoY3R4KVxyXG5cclxuICAgICAgLy8gUnVuIHdyYXBwZWQgZ2V0SW5pdGlhbFByb3BzIG1ldGhvZHNcclxuICAgICAgbGV0IHBhZ2VQcm9wcyA9IHt9XHJcbiAgICAgIGlmIChQYWdlQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcykge1xyXG4gICAgICAgIHBhZ2VQcm9wcyA9IGF3YWl0IFBhZ2VDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eClcclxuICAgICAgfSBlbHNlIGlmIChpbkFwcENvbnRleHQpIHtcclxuICAgICAgICBwYWdlUHJvcHMgPSBhd2FpdCBBcHAuZ2V0SW5pdGlhbFByb3BzKGN0eClcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gT25seSBvbiB0aGUgc2VydmVyOlxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zdCB7IEFwcFRyZWUgfSA9IGN0eFxyXG4gICAgICAgIC8vIFdoZW4gcmVkaXJlY3RpbmcsIHRoZSByZXNwb25zZSBpcyBmaW5pc2hlZC5cclxuICAgICAgICAvLyBObyBwb2ludCBpbiBjb250aW51aW5nIHRvIHJlbmRlclxyXG4gICAgICAgIGlmIChjdHgucmVzICYmIGN0eC5yZXMuZmluaXNoZWQpIHtcclxuICAgICAgICAgIHJldHVybiBwYWdlUHJvcHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9ubHkgaWYgZGF0YUZyb21UcmVlIGlzIGVuYWJsZWRcclxuICAgICAgICBpZiAoc3NyICYmIEFwcFRyZWUpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEltcG9ydCBgQGFwb2xsby9yZWFjdC1zc3JgIGR5bmFtaWNhbGx5LlxyXG4gICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIGhhdmUgdGhpcyBpbiBvdXIgY2xpZW50IGJ1bmRsZS5cclxuICAgICAgICAgICAgY29uc3QgeyBnZXREYXRhRnJvbVRyZWUgfSA9IGF3YWl0IGltcG9ydCgnQGFwb2xsby9yZWFjdC1zc3InKVxyXG5cclxuICAgICAgICAgICAgLy8gU2luY2UgQXBwQ29tcG9uZW50cyBhbmQgUGFnZUNvbXBvbmVudHMgaGF2ZSBkaWZmZXJlbnQgY29udGV4dCB0eXBlc1xyXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIG1vZGlmeSB0aGVpciBwcm9wcyBhIGxpdHRsZS5cclxuICAgICAgICAgICAgbGV0IHByb3BzXHJcbiAgICAgICAgICAgIGlmIChpbkFwcENvbnRleHQpIHtcclxuICAgICAgICAgICAgICBwcm9wcyA9IHsgLi4ucGFnZVByb3BzLCBhcG9sbG9DbGllbnQgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHByb3BzID0geyBwYWdlUHJvcHM6IHsgLi4ucGFnZVByb3BzLCBhcG9sbG9DbGllbnQgfSB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRha2UgdGhlIE5leHQuanMgQXBwVHJlZSwgZGV0ZXJtaW5lIHdoaWNoIHF1ZXJpZXMgYXJlIG5lZWRlZCB0byByZW5kZXIsXHJcbiAgICAgICAgICAgIC8vIGFuZCBmZXRjaCB0aGVtLiBUaGlzIG1ldGhvZCBjYW4gYmUgcHJldHR5IHNsb3cgc2luY2UgaXQgcmVuZGVyc1xyXG4gICAgICAgICAgICAvLyB5b3VyIGVudGlyZSBBcHBUcmVlIG9uY2UgZm9yIGV2ZXJ5IHF1ZXJ5LiBDaGVjayBvdXQgYXBvbGxvIGZyYWdtZW50c1xyXG4gICAgICAgICAgICAvLyBpZiB5b3Ugd2FudCB0byByZWR1Y2UgdGhlIG51bWJlciBvZiByZXJlbmRlcnMuXHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvcmVhY3QvZGF0YS9mcmFnbWVudHMvXHJcbiAgICAgICAgICAgIGF3YWl0IGdldERhdGFGcm9tVHJlZSg8QXBwVHJlZSB7Li4ucHJvcHN9IC8+KVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gUHJldmVudCBBcG9sbG8gQ2xpZW50IEdyYXBoUUwgZXJyb3JzIGZyb20gY3Jhc2hpbmcgU1NSLlxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlbSBpbiBjb21wb25lbnRzIHZpYSB0aGUgZGF0YS5lcnJvciBwcm9wOlxyXG4gICAgICAgICAgICAvLyBodHRwczovL3d3dy5hcG9sbG9ncmFwaHFsLmNvbS9kb2NzL3JlYWN0L2FwaS9yZWFjdC1hcG9sbG8uaHRtbCNncmFwaHFsLXF1ZXJ5LWRhdGEtZXJyb3JcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgcnVubmluZyBgZ2V0RGF0YUZyb21UcmVlYCcsIGVycm9yKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGdldERhdGFGcm9tVHJlZSBkb2VzIG5vdCBjYWxsIGNvbXBvbmVudFdpbGxVbm1vdW50XHJcbiAgICAgICAgICAvLyBoZWFkIHNpZGUgZWZmZWN0IHRoZXJlZm9yZSBuZWVkIHRvIGJlIGNsZWFyZWQgbWFudWFsbHlcclxuICAgICAgICAgIEhlYWQucmV3aW5kKClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4ucGFnZVByb3BzLFxyXG4gICAgICAgIC8vIEV4dHJhY3QgcXVlcnkgZGF0YSBmcm9tIHRoZSBBcG9sbG8gc3RvcmVcclxuICAgICAgICBhcG9sbG9TdGF0ZTogYXBvbGxvQ2xpZW50LmNhY2hlLmV4dHJhY3QoKSxcclxuICAgICAgICAvLyBQcm92aWRlIHRoZSBjbGllbnQgZm9yIHNzci4gQXMgc29vbiBhcyB0aGlzIHBheWxvYWRcclxuICAgICAgICAvLyBnZXRzIEpTT04uc3RyaW5naWZpZWQgaXQgd2lsbCByZW1vdmUgaXRzZWxmLlxyXG4gICAgICAgIGFwb2xsb0NsaWVudDogY3R4LmFwb2xsb0NsaWVudCxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFdpdGhBcG9sbG9cclxufVxyXG4iLCJpbXBvcnQgeyBBcG9sbG9DbGllbnQgfSBmcm9tIFwiYXBvbGxvLWNsaWVudFwiXHJcbmltcG9ydCB7IEluTWVtb3J5Q2FjaGUgfSBmcm9tIFwiYXBvbGxvLWNhY2hlLWlubWVtb3J5XCJcclxuaW1wb3J0IHsgSHR0cExpbmsgfSBmcm9tIFwiYXBvbGxvLWxpbmstaHR0cFwiXHJcbmltcG9ydCBmZXRjaCBmcm9tIFwiaXNvbW9ycGhpYy11bmZldGNoXCJcclxuLy8gaW1wb3J0IHsgU2NoZW1hTGluayB9IGZyb20gJ2Fwb2xsby1saW5rLXNjaGVtYSc7XHJcbi8vIGltcG9ydCB7c2NoZW1hfSBmcm9tICdsaWIvc2VydmVyL2Fwb2xsb1NlcnZlci9zY2hlbWEnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBcG9sbG9DbGllbnQoaW5pdGlhbFN0YXRlLCBjdHgpIHtcclxuICAvLyBUaGUgYGN0eGAgKE5leHRQYWdlQ29udGV4dCkgd2lsbCBvbmx5IGJlIHByZXNlbnQgb24gdGhlIHNlcnZlci5cclxuICAvLyB1c2UgaXQgdG8gZXh0cmFjdCBhdXRoIGhlYWRlcnMgKGN0eC5yZXEpIG9yIHNpbWlsYXIuXHJcblxyXG4gIGNvbnN0IGVuY2hhbmNlZEZldGNoID0gKHVybCwgaW5pdCkgPT5cclxuICAgIGZldGNoKHVybCwge1xyXG4gICAgICAuLi5pbml0LFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLi4uaW5pdC5oZWFkZXJzLFxyXG4gICAgICAgIENvb2tpZTogY3R4LnJlcS5oZWFkZXJzLmNvb2tpZSxcclxuICAgICAgfSxcclxuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZVxyXG4gICAgfSlcclxuXHJcbiAgcmV0dXJuIG5ldyBBcG9sbG9DbGllbnQoe1xyXG4gICAgc3NyTW9kZTogQm9vbGVhbihjdHgpLFxyXG4gICAgbGluazogbmV3IEh0dHBMaW5rKHtcclxuICAgICAgdXJpOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvZ3JhcGhxbFwiLCAvLyBTZXJ2ZXIgVVJMIChtdXN0IGJlIGFic29sdXRlKVxyXG4gICAgICAvLyB1cmk6ICdodHRwczovL2FwaS5ncmFwaC5jb29sL3NpbXBsZS92MS9jaXhta3QydWwwMXEwMDEyMm1rc2c4MnBuJywgLy8gU2VydmVyIFVSTCAobXVzdCBiZSBhYnNvbHV0ZSlcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLCAvLyBBZGRpdGlvbmFsIGZldGNoKCkgb3B0aW9ucyBsaWtlIGBjcmVkZW50aWFsc2Agb3IgYGhlYWRlcnNgXHJcbiAgICAgIGZldGNoOiBjdHggPyBlbmNoYW5jZWRGZXRjaCA6IGZldGNoLFxyXG4gICAgfSksXHJcbiAgICAvLyBsaW5rOm5ldyBTY2hlbWFMaW5rKHtzY2hlbWF9KSxcclxuICAgIGNhY2hlOiBuZXcgSW5NZW1vcnlDYWNoZSgpLnJlc3RvcmUoaW5pdGlhbFN0YXRlKSxcclxuICB9KVxyXG59XHJcbiIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvcGFnZXMvX2FwcCcpXG4iLCJpbXBvcnQgUmVhY3QsIHsgRXJyb3JJbmZvIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICBleGVjT25jZSxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuLi9jbGllbnQvcm91dGVyJ1xuXG5leHBvcnQgeyBBcHBJbml0aWFsUHJvcHMgfVxuXG5leHBvcnQgdHlwZSBBcHBDb250ZXh0ID0gQXBwQ29udGV4dFR5cGU8Um91dGVyPlxuXG5leHBvcnQgdHlwZSBBcHBQcm9wczxQID0ge30+ID0gQXBwUHJvcHNUeXBlPFJvdXRlciwgUD5cblxuLyoqXG4gKiBgQXBwYCBjb21wb25lbnQgaXMgdXNlZCBmb3IgaW5pdGlhbGl6ZSBvZiBwYWdlcy4gSXQgYWxsb3dzIGZvciBvdmVyd3JpdGluZyBhbmQgZnVsbCBjb250cm9sIG9mIHRoZSBgcGFnZWAgaW5pdGlhbGl6YXRpb24uXG4gKiBUaGlzIGFsbG93cyBmb3Iga2VlcGluZyBzdGF0ZSBiZXR3ZWVuIG5hdmlnYXRpb24sIGN1c3RvbSBlcnJvciBoYW5kbGluZywgaW5qZWN0aW5nIGFkZGl0aW9uYWwgZGF0YS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gYXBwR2V0SW5pdGlhbFByb3BzKHtcbiAgQ29tcG9uZW50LFxuICBjdHgsXG59OiBBcHBDb250ZXh0KTogUHJvbWlzZTxBcHBJbml0aWFsUHJvcHM+IHtcbiAgY29uc3QgcGFnZVByb3BzID0gYXdhaXQgbG9hZEdldEluaXRpYWxQcm9wcyhDb21wb25lbnQsIGN0eClcbiAgcmV0dXJuIHsgcGFnZVByb3BzIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwPFAgPSB7fSwgQ1AgPSB7fSwgUyA9IHt9PiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxcbiAgUCAmIEFwcFByb3BzPENQPixcbiAgU1xuPiB7XG4gIHN0YXRpYyBvcmlnR2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzXG4gIHN0YXRpYyBnZXRJbml0aWFsUHJvcHMgPSBhcHBHZXRJbml0aWFsUHJvcHNcblxuICAvLyBLZXB0IGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAvLyBXaGVuIHNvbWVvbmUgZW5kZWQgQXBwIHRoZXkgY291bGQgY2FsbCBgc3VwZXIuY29tcG9uZW50RGlkQ2F0Y2hgLlxuICAvLyBAZGVwcmVjYXRlZCBUaGlzIG1ldGhvZCBpcyBubyBsb25nZXIgbmVlZGVkLiBFcnJvcnMgYXJlIGNhdWdodCBhdCB0aGUgdG9wIGxldmVsXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yOiBFcnJvciwgX2Vycm9ySW5mbzogRXJyb3JJbmZvKTogdm9pZCB7XG4gICAgdGhyb3cgZXJyb3JcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHJvdXRlciwgQ29tcG9uZW50LCBwYWdlUHJvcHMsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHRoaXNcbiAgICAgIC5wcm9wcyBhcyBBcHBQcm9wczxDUD5cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHsuLi5wYWdlUHJvcHN9XG4gICAgICAgIHtcbiAgICAgICAgICAvLyB3ZSBkb24ndCBhZGQgdGhlIGxlZ2FjeSBVUkwgcHJvcCBpZiBpdCdzIHVzaW5nIG5vbi1sZWdhY3lcbiAgICAgICAgICAvLyBtZXRob2RzIGxpa2UgZ2V0U3RhdGljUHJvcHMgYW5kIGdldFNlcnZlclNpZGVQcm9wc1xuICAgICAgICAgIC4uLighKF9fTl9TU0cgfHwgX19OX1NTUCkgPyB7IHVybDogY3JlYXRlVXJsKHJvdXRlcikgfSA6IHt9KVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuXG5sZXQgd2FybkNvbnRhaW5lcjogKCkgPT4gdm9pZFxubGV0IHdhcm5Vcmw6ICgpID0+IHZvaWRcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybkNvbnRhaW5lciA9IGV4ZWNPbmNlKCgpID0+IHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgV2FybmluZzogdGhlIFxcYENvbnRhaW5lclxcYCBpbiBcXGBfYXBwXFxgIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBiZSByZW1vdmVkLiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9hcHAtY29udGFpbmVyLWRlcHJlY2F0ZWRgXG4gICAgKVxuICB9KVxuXG4gIHdhcm5VcmwgPSBleGVjT25jZSgoKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGBXYXJuaW5nOiB0aGUgJ3VybCcgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvdXJsLWRlcHJlY2F0ZWRgXG4gICAgKVxuICB9KVxufVxuXG4vLyBAZGVwcmVjYXRlZCBub29wIGZvciBub3cgdW50aWwgcmVtb3ZhbFxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lcihwOiBhbnkpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5Db250YWluZXIoKVxuICByZXR1cm4gcC5jaGlsZHJlblxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsKHJvdXRlcjogUm91dGVyKSB7XG4gIC8vIFRoaXMgaXMgdG8gbWFrZSBzdXJlIHdlIGRvbid0IHJlZmVyZW5jZXMgdGhlIHJvdXRlciBvYmplY3QgYXQgY2FsbCB0aW1lXG4gIGNvbnN0IHsgcGF0aG5hbWUsIGFzUGF0aCwgcXVlcnkgfSA9IHJvdXRlclxuICByZXR1cm4ge1xuICAgIGdldCBxdWVyeSgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBxdWVyeVxuICAgIH0sXG4gICAgZ2V0IHBhdGhuYW1lKCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHBhdGhuYW1lXG4gICAgfSxcbiAgICBnZXQgYXNQYXRoKCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIGFzUGF0aFxuICAgIH0sXG4gICAgYmFjazogKCkgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcm91dGVyLmJhY2soKVxuICAgIH0sXG4gICAgcHVzaDogKHVybDogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHJvdXRlci5wdXNoKHVybCwgYXMpXG4gICAgfSxcbiAgICBwdXNoVG86IChocmVmOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICBjb25zdCBwdXNoUm91dGUgPSBhcyA/IGhyZWYgOiAnJ1xuICAgICAgY29uc3QgcHVzaFVybCA9IGFzIHx8IGhyZWZcblxuICAgICAgcmV0dXJuIHJvdXRlci5wdXNoKHB1c2hSb3V0ZSwgcHVzaFVybClcbiAgICB9LFxuICAgIHJlcGxhY2U6ICh1cmw6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiByb3V0ZXIucmVwbGFjZSh1cmwsIGFzKVxuICAgIH0sXG4gICAgcmVwbGFjZVRvOiAoaHJlZjogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgY29uc3QgcmVwbGFjZVJvdXRlID0gYXMgPyBocmVmIDogJydcbiAgICAgIGNvbnN0IHJlcGxhY2VVcmwgPSBhcyB8fCBocmVmXG5cbiAgICAgIHJldHVybiByb3V0ZXIucmVwbGFjZShyZXBsYWNlUm91dGUsIHJlcGxhY2VVcmwpXG4gICAgfSxcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==