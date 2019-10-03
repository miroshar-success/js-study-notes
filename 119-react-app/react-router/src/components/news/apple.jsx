import React, {Component} from 'react';
import {Typography} from "antd"
const {Title,Paragraph} = Typography;
class Apple extends Component {
    render() {
        return (
            <div>
                <Title level={2}>苹果公司</Title>
                <Paragraph>苹果公司（Apple Inc. ）是美国一家高科技公司。由史蒂夫·乔布斯、斯蒂夫·沃兹尼亚克和罗·韦恩(Ron
                    Wayne)等人于1976年4月1日创立，并命名为美国苹果电脑公司（Apple Computer Inc. ）
                    2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。
                </Paragraph>
            </div>
        );
    }
}

export default Apple;