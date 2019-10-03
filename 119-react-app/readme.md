# BrowserRouter

    一个<Router>使用HTML5历史API(pushState,replaceState和popState事件)
        
    basename:string
        所有位置的基本URL
        
# NavLink

    activeClassName:string
        在活动时为元素提供的类。默认的给定的类是active。
    
    activeStyle:object
        在元素处于活动状态时应用于该元素的样式

    exact:boolean
        仅当位置完全匹配时才会应用活动样式类
        
# Redirect

    将导航到新位置。新位置将覆盖历史堆栈中的当前位置。
    to:string
        要重定向到的URL。
    push:boolean
        重定向会将新条目推送到历史记录而不是替换当前条目。
        
    
    tips:
    1. 在组件卸载,数据还未更新完的时候,会发出警告
        