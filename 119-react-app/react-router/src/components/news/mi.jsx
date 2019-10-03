import React, {Component} from 'react';
import {Typography} from "antd"
const {Title,Paragraph} = Typography;

class XiaoMi extends Component {
    render() {
        return (
            <div>
                <Title level={3}>小米公司</Title>
                <Paragraph>
                    北京小米科技有限责任公司成立于2010年3月3日 [1]  ，是一家专注于智能硬件和电子产品研发的移动互联网公司，
                    同时也是一家专注于高端智能手机、互联网电视以及智能家居生态链建设的创新型科技企业。 [2]
                    为发烧而生”是小米的产品概念。小米公司创造了用互联网模式开发手机操作系统、发烧友参与开发改进的模式。
                    小米还是继苹果、三星、华为之后第四家拥有手机芯片自研能力的科技公司。
                </Paragraph>
            </div>
        );
    }
}

export default XiaoMi;