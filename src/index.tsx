import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
	<React.Fragment>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.Fragment>,
	document.getElementById("root")
);
