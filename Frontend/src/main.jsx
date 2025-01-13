import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProcterRout from './components/ProcterRout.jsx'
import {Route,RouterProvider,createRoutesFromElements} from 'react-router'
import {createBrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/features/store.js'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRouter from './pages/Admin/AdminRouter.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductLis from './pages/Admin/ProductLis.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favourite from './pages/products/Favourite.jsx'
import ProductDeteiles from './pages/products/ProductDeteiles.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import Order from './pages/Orders/Order.jsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import UserOrder from './pages/User/UserOrder.jsx'
import AdminDashBoard from './pages/Admin/AdminDashBoard.jsx'
const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path="/" element={<App />} >
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' index={true} element={<Home/>}/>
    <Route path='/favorite' element={<Favourite/>}/>
    <Route path='/product/:id' element={<ProductDeteiles/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/user-order' element={<UserOrder/>}/>

    {/* admin router */}
    <Route path='/admin' element={<AdminRouter/>}>
        <Route path="userslist" element={<UserList/>}></Route>
        <Route path="category" element={<CategoryList/>}></Route>
        <Route path="productlists/:pageNumber" element={<ProductLis/>}></Route>
        <Route path="productlists" element={<ProductLis/>}></Route>
        <Route path="allproducts" element={<AllProducts/>}></Route>
        <Route path="Product/update/:_id" element={<ProductUpdate/>}></Route>
        <Route path="dashboard" element={<AdminDashBoard  />}></Route>
    </Route>

      <Route path='' element={<ProcterRout/>}>
        <Route path='/profile' element={<Profile/>}/>   
        <Route path='/shipping' element={<Shipping/>}/>   
        <Route path='/placeorder' element={<PlaceOrder/>}/>   
        <Route path="/order/:id" element={<Order/>} />
      </Route>  
      

    </Route> 
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <PayPalScriptProvider>

<RouterProvider router={router} />
    </PayPalScriptProvider>

  </Provider>



 
)
