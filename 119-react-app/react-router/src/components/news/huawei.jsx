import React, {Component} from 'react';
import {Typography} from "antd"
const {Title,Paragraph} = Typography
class HuaWei extends Component {
    render() {
        return (
            <div>
                <Title>华为手机</Title>
                <Paragraph>
                    华为消费者业务产品全面覆盖手机、移动宽带终端、终端云等，凭借自身的全球化网络优势、
                    全球化运营能力，致力于将最新的科技带给消费者，让世界各地享受到技术进步的喜悦，以行践言，实现梦想。
                </Paragraph>
            </div>
        );
    }
}
export default HuaWei;