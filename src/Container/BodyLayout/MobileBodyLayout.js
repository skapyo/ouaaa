import React from "react";
import { Responsive, Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import { getWidth } from "./../../Utils/utils";
import ContentLayout from "./../../Components/Body/Content/ContentLayout";
import {PrivateRoute,SignedoutRoute,PrivateAdminRoute} from './../../Components/Auth/PrivateRoute';
import Login from './../../Components/Auth/Login';
import Signup from './../../Components/Auth/Signup';
import OrdersPage from "../../Components/Body/Content/Order/OrdersPage";
import OrderContainer from "../../Components/Body/Content/Order/OrderContainer";
import SendValidationEmail from './../../Components/Auth/SendValidationEmail';
import EmailValidation from './../../Components/Auth/EmailValidation';
import SendResetPasswordEmail from "../../Components/Auth/SendResetPasswordEmail";
import ResetPassword from "../../Components/Auth/ResetPassword";
import AccountPage from './../../Components/Auth/AccountPage';
import {withTracker} from "../../analyticsTracker";
const MobileBodyLayout = () => {
    return (
        <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Container>
        {/* <ContentLayout itemsPerRow={1} /> */}
        <Switch>
        <SignedoutRoute
    path="/login"
    component={() => <Login />}
    />
    <SignedoutRoute
    path="/signup"
    component={() => <Signup />}
    />
    <PrivateRoute
    path="/commandes"
    component={() => <OrdersPage />}
    />
    <PrivateRoute
    path="/commande/:orderId"
    component={() => <OrderContainer />}
    />
    <SignedoutRoute
    path="/sendValidationEmail/:email"
    component={() => <SendValidationEmail />}
    />
    <SignedoutRoute
    path="/emailValidation/:email/:token"
    component={() => <EmailValidation />}
    />
    <SignedoutRoute
    exact
    path="/resetPassword"
    component={() => <SendResetPasswordEmail />}
    />
    <SignedoutRoute
    path="/resetPassword/:email/:token"
    component={() => <ResetPassword />}
    />
    <PrivateRoute
    path="/account"
    component={() => <AccountPage />}
    />
    <Route
    path="/"
    component={() => <ContentLayout />}
    />
    </Switch>
    </Container>
    </Responsive>
);
};

export default withTracker(MobileBodyLayout);
