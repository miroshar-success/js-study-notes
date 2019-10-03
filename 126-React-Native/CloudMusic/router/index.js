import {createBottomTabNavigator} from "react-navigation";
import HomeScreen from "../components/Home/index.js"
import VideoScreen from "../components/Video/index.js"
import MineScreen from "../components/Mine/index.js"
import FriendScreen from "../components/Friend/index.js";
import AccountScreen from "../components/Account/index.js";
export default createBottomTabNavigator(
    {
        Home:HomeScreen,
        Video:VideoScreen,
        Mine:MineScreen,
        Friend:FriendScreen,
        Account:AccountScreen
    },
    {
        tabBarOptions:{
            activeTintColor:"#ec3f2a",
            inactiveTintColor:"#8d8c8c",
            style:{
                height:50
            },
            labelStyle:{
                fontSize:14
            }
        }
    }
)
