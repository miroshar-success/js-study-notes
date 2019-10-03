import Tacos from "../components/Tacos";
import Sandwiches from "../components/Sandwiches";
import Bus from "../components/Bus";
import Cart from "../components/Cart";

const routes = [
    {
        path:"/tacos",
        component:Tacos,
        routes:[
            {
                path:"/tacos/bus",
                component:Bus
            },
            {
                path:"/tacos/cart",
                component:Cart
            }
        ]
    },
    {
        path:"/sandwiches",
        component:Sandwiches
    }
]

export default routes