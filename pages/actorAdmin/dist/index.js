"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var client_1 = require("@apollo/client");
var core_1 = require("@material-ui/core");
var IconButton_1 = require("@material-ui/core/IconButton");
var Paper_1 = require("@material-ui/core/Paper/Paper");
var SvgIcon_1 = require("@material-ui/core/SvgIcon/SvgIcon");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableFooter_1 = require("@material-ui/core/TableFooter");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var CheckCircle_1 = require("@material-ui/icons/CheckCircle");
var Edit_1 = require("@material-ui/icons/Edit");
var FirstPage_1 = require("@material-ui/icons/FirstPage");
var KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
var KeyboardArrowRight_1 = require("@material-ui/icons/KeyboardArrowRight");
var ActorAdminPageLayout_1 = require("containers/layouts/actorAdminPage/ActorAdminPageLayout");
var graphql_tag_1 = require("graphql-tag");
var withApollo_1 = require("hoc/withApollo");
var react_1 = require("react");
var react_moment_1 = require("react-moment");
var Link_1 = require("../../components/Link");
var session_1 = require("../../context/session/session");
var useStyles = core_1.makeStyles(function (theme) { return ({
    avatar: {
        width: '200px',
        height: '200px',
        marginBottom: theme.spacing(4)
    },
    userInfosTitle: {
        marginBottom: theme.spacing(5)
    }
}); });
var useStyles1 = core_1.makeStyles(function (theme) { return core_1.createStyles({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5)
    }
}); });
function TablePaginationActions(props) {
    var classes = useStyles1();
    var theme = core_1.useTheme();
    var count = props.count, page = props.page, rowsPerPage = props.rowsPerPage, onChangePage = props.onChangePage;
    var handleFirstPageButtonClick = function (event) {
        onChangePage(event, 0);
    };
    var handleBackButtonClick = function (event) {
        onChangePage(event, page - 1);
    };
    var handleNextButtonClick = function (event) {
        onChangePage(event, page + 1);
    };
    var handleLastPageButtonClick = function (event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (react_1["default"].createElement("div", { className: classes.root },
        react_1["default"].createElement(IconButton_1["default"], { onClick: handleFirstPageButtonClick, disabled: page === 0, "aria-label": "first page" }, theme.direction === 'rtl' ? react_1["default"].createElement(SvgIcon_1["default"], null) : react_1["default"].createElement(FirstPage_1["default"], null)),
        react_1["default"].createElement(IconButton_1["default"], { onClick: handleBackButtonClick, disabled: page === 0, "aria-label": "previous page" }, theme.direction === 'rtl' ? react_1["default"].createElement(KeyboardArrowRight_1["default"], null) : react_1["default"].createElement(KeyboardArrowLeft_1["default"], null)),
        react_1["default"].createElement(IconButton_1["default"], { onClick: handleNextButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, "aria-label": "next page" }, theme.direction === 'rtl' ? react_1["default"].createElement(KeyboardArrowLeft_1["default"], null) : react_1["default"].createElement(KeyboardArrowRight_1["default"], null)),
        react_1["default"].createElement(IconButton_1["default"], { onClick: handleLastPageButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, "aria-label": "last page" }, theme.direction === 'rtl' ? react_1["default"].createElement(FirstPage_1["default"], null) : react_1["default"].createElement(SvgIcon_1["default"], null))));
}
function createData(name, calories, fat) {
    return { name: name, calories: calories, fat: fat };
}
var useStyles2 = core_1.makeStyles({
    table: {
        minWidth: 500
    },
    gridContainer: {
        marginTop: '4px'
    },
    title: {
        fontWeight: 700
    },
    fab: {
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 1400
    },
    drawer: {
        '& .MuiDrawer-paperAnchorBottom': {
            height: '100%'
        }
    }
});
var ActorAdminPage = function () {
    var user = session_1.useSessionState();
    var GET_ACTORS = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n        query actorsAdmin (\n            $userId: String!\n        )\n        { actorsAdmin(userId: $userId)\n        {   id,\n            name,\n            address,\n            short_description,\n            createdAt,\n            updatedAt,\n            city,\n            lat,\n            lng,\n            categories{\n                label\n            }\n            referents{\n                surname,\n                lastname,\n                email,\n                phone\n            }\n            ,\n            isValidated,\n            dateValidation,\n            userValidated {\n                surname,\n                lastname,\n                email,\n                phone\n            }\n        }\n        }\n        \n    "], ["\n\n        query actorsAdmin (\n            $userId: String!\n        )\n        { actorsAdmin(userId: $userId)\n        {   id,\n            name,\n            address,\n            short_description,\n            createdAt,\n            updatedAt,\n            city,\n            lat,\n            lng,\n            categories{\n                label\n            }\n            referents{\n                surname,\n                lastname,\n                email,\n                phone\n            }\n            ,\n            isValidated,\n            dateValidation,\n            userValidated {\n                surname,\n                lastname,\n                email,\n                phone\n            }\n        }\n        }\n        \n    "])));
    var VALIDATE_ACTOR = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        mutation validateActor( $actorId: Int!, $userId: Int!) {\n            validateActor( actorId: $actorId,userId: $userId) {\n                name\n\n            }\n        }\n    "], ["\n        mutation validateActor( $actorId: Int!, $userId: Int!) {\n            validateActor( actorId: $actorId,userId: $userId) {\n                name\n\n            }\n        }\n    "])));
    var _a = client_1.useQuery(GET_ACTORS, {
        variables: {
            userId: user && user.id
        }
    }), data = _a.data, loading = _a.loading, error = _a.error, refetch = _a.refetch;
    var classes = useStyles2();
    var _b = react_1["default"].useState(0), page = _b[0], setPage = _b[1];
    var _c = react_1["default"].useState(5), rowsPerPage = _c[0], setRowsPerPage = _c[1];
    var _d = react_1["default"].useState(0), actorIdValidated = _d[0], setActorIdValidated = _d[1];
    var row = 0;
    if (typeof data !== 'undefined') {
        row = data.actorsAdmin.length;
    }
    var emptyRows = rowsPerPage - Math.min(rowsPerPage, row - page * rowsPerPage);
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var _e = react_1["default"].useState({}), state = _e[0], setState = _e[1];
    var handleChange = function (actor, event) {
        var _a;
        setState(__assign(__assign({}, state), (_a = {}, _a[actor.id.toString()] = event.target.checked, _a)));
    };
    var _f = client_1.useMutation(VALIDATE_ACTOR, {
        variables: {
            actorId: actorIdValidated,
            userId: parseInt(user && user.id)
        }
    }), validateActor = _f[0], dataValidateActor = _f[1].data;
    var validate = react_1.useCallback(function (actor) {
        if (!actor.isValidated) {
            setActorIdValidated(parseInt(actor.id));
            validateActor();
        }
    }, [validateActor]);
    react_1.useEffect(function () {
        if (dataValidateActor) {
            refetch();
        }
    }, [dataValidateActor]);
    var styles = useStyles();
    return (react_1["default"].createElement(ActorAdminPageLayout_1["default"], null,
        react_1["default"].createElement(core_1.Typography, { color: "secondary", variant: "h6", className: styles.userInfosTitle }, "Listes des acteurs dont vous \u00EAtes administrateur"),
        typeof data !== 'undefined' && (react_1["default"].createElement(TableContainer_1["default"], { component: Paper_1["default"] },
            react_1["default"].createElement(Table_1["default"], { className: classes.table, "aria-label": "custom pagination table" },
                react_1["default"].createElement(TableHead_1["default"], null,
                    react_1["default"].createElement(TableRow_1["default"], null,
                        react_1["default"].createElement(TableCell_1["default"], { component: "th", scope: "row" }, "Nom"),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Date de cr\u00E9ation"),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Derni\u00E8re date de modification"),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Ville"),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "R\u00E9f\u00E9rents"),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Lien Page acteur"),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Editer la page"),
                        user && user.role == "admin" && (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Validation"),
                            react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Date de validation"),
                            react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, "Personne ayant valid\u00E9"))))),
                react_1["default"].createElement(TableBody_1["default"], null,
                    typeof data !== 'undefined' && data.actorsAdmin.map(function (actor) { return (react_1["default"].createElement(TableRow_1["default"], { key: actor.id, hover: true },
                        react_1["default"].createElement(TableCell_1["default"], { component: "th", scope: "row" },
                            react_1["default"].createElement(Link_1["default"], { href: "/actorAdmin/actor/" + actor.id }, actor.name)),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" },
                            react_1["default"].createElement(react_moment_1["default"], { format: "DD/MM HH:mm", unix: true }, actor.createdAt / 1000)),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" },
                            react_1["default"].createElement(react_moment_1["default"], { format: "DD/MM HH:mm", unix: true }, actor.updatedAt / 1000)),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, actor.city),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, typeof actor.referents !== 'undefined' && actor.referents.map(function (referent) {
                            {
                                referent.surname;
                            }
                            {
                                referent.lastname;
                            }
                            {
                                referent.email;
                            }
                            {
                                referent.phone;
                            }
                        })),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" },
                            react_1["default"].createElement(Link_1["default"], { href: "/actor/" + actor.id }, "Lien vers page acteur")),
                        react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "right" },
                            react_1["default"].createElement(Link_1["default"], { href: "/actorAdmin/actor/" + actor.id },
                                react_1["default"].createElement(Edit_1["default"], null))),
                        user && user.role == "admin" && (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" },
                                react_1["default"].createElement(CheckCircle_1["default"], { style: { color: actor.isValidated ? "green" : "orange" }, onClick: function () { return validate(actor); } })),
                            react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" }, actor.dateValidation && (react_1["default"].createElement(react_moment_1["default"], { format: "DD/MM HH:mm", unix: true }, actor.dateValidation / 1000))),
                            react_1["default"].createElement(TableCell_1["default"], { style: { width: 160 }, align: "left" },
                                actor.userValidated && actor.userValidated.surname,
                                " ",
                                actor.userValidated && actor.userValidated.lastname))))); }),
                    react_1["default"].createElement(TableRow_1["default"], { style: { height: 53 * emptyRows } },
                        react_1["default"].createElement(TableCell_1["default"], { colSpan: 6 }))),
                react_1["default"].createElement(TableFooter_1["default"], null,
                    react_1["default"].createElement(TableRow_1["default"], null,
                        react_1["default"].createElement(TablePagination_1["default"], { rowsPerPageOptions: [5, 10, 25, { label: 'All', value: -1 }], colSpan: 3, count: typeof data !== 'undefined' ? data.actorsAdmin.length : 0, rowsPerPage: rowsPerPage, page: page, SelectProps: {
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true
                            }, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage, ActionsComponent: TablePaginationActions }))))))));
};
exports["default"] = withApollo_1.withApollo()(ActorAdminPage);
var templateObject_1, templateObject_2;
