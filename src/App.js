import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import DetailPage from './pages/DetailPage'
import HospitalPage from './pages/hospital/HospitalPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import IndexPage from './pages/category/IndexPage'
import CreatePage from './pages/category/CreatePage'
import EditPage from './pages/category/EditPage'
import UploadPage from './pages/UploadPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import MemberPage from './pages/MemberPage'
import Cartage from './pages/Cartage'
import PrivateRoute from './guard/auth'
import UserStoreProvider from './context/UserContext'
// redux setup
//import { createStore } from 'redux'
//import rootReducer from './redux/reducers/index'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import PdfReport from './pages/Report/PdfReport'
import ChartReport from './pages/Report/ChartReport'
// thunk setup
// import {createStore , applyMiddleware} from 'redux'
//import thunk from 'redux-thunk'
//const store = createStore(rootReducer) // ของเดิมที่ไม่ได้ใช้ redux persist
const { store } = configureStore() // redux persist
const queryClient = new QueryClient()
const App = () => {
	return (
		<Provider store={store}>
			<UserStoreProvider>
				<ToastProvider
					autoDismiss
					autoDismissTimeout={3000}
					placement='top-center'
				>
					<QueryClientProvider client={queryClient}>
						<Router>
							<NavBar />
							<Switch>
								<Route exact path='/' component={HomePage} />
								<Route path='/about' component={AboutPage} />
								<Route path='/cart' component={Cartage} />
								<Route path='/product' component={ProductPage} />
								<Route path='/detail/:id/title/:title' component={DetailPage} />
								<Route path='/hospital' component={HospitalPage} />
								<Route path='/upload' component={UploadPage} />
								<Route path='/register' component={RegisterPage} />
								<Route path='/login' component={LoginPage} />
								<Route path='/pdf' component={PdfReport} />
								<Route path='/chart' component={ChartReport} />

								<PrivateRoute path='/member'>
									<MemberPage />
								</PrivateRoute>
								<Route
									path='/category'
									render={({ match: { url } }) => (
										<>
											<Route exact path={`${url}/`} component={IndexPage} />
											<Route path={`${url}/create`} component={CreatePage} />
											<Route path={`${url}/edit/:id`} component={EditPage} />
										</>
									)}
								/>
							</Switch>
							<Footer />
						</Router>
					</QueryClientProvider>
				</ToastProvider>
			</UserStoreProvider>
		</Provider>
	)
}

export default App
