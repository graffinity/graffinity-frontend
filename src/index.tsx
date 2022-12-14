import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import setupAxiosInterceptors from "redux/services/setupAxiosInterceptors";
import { store } from "redux/store/rootReducer";
import AppRouter from "./AppRouter";
import AppTheme from "./AppTheme";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

setupAxiosInterceptors();

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ThemeProvider theme={AppTheme}>
				<AppRouter />
			</ThemeProvider>
		</Provider>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
