import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Autores from "../pages/Autores";
import Obras from "../pages/Obras";
import Login from "../pages/Login";

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route path="/login" component={Login} exact />
			<Route path="/autores" component={Autores} />
			<Route path="/obras" component={Obras} />
			<Redirect to="/login" />
		</Switch>
	);
};

export default Routes;
