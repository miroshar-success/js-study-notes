// 管理路由
import Home from "../components/Home";
import Article from "../components/Article";
import Website from "../components/Website";
import About from "../components/About";
const routes = [
    {
        path:"/",
        exact:true,
        component:Home
    },
    {
        path:"/article",
        component:Article
    },
    {
        path:"/website",
        component:Website
    },
    {
        path:"/about",
        component:About
    }
]
export default routes