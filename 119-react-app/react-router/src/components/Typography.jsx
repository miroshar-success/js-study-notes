import React, {Component} from 'react';
import {Typography} from "antd"
const {Title,Text} = Typography
class Paragraphy extends Component {
    render() {
        return (
            <div>
                <section className="title">
                    <h3>Title</h3>
                    <Title level={2}>Hello Rect</Title>
                    <Title level={3}>Kyrie Irving</Title>
                    <Title level={4}>Ant Design</Title>
                </section>
                <section className="text">
                    <Text type="secondary">Hello World!</Text>
                    <br/>
                    <Text type="warning">Warning</Text>
                    <br/>
                    <Text type={"danger"}>Danger</Text>
                    <br/>
                    <Text disabled>disabled</Text>
                    <br/>
                    <Text mark>Mark</Text>
                    <br/>
                    <Text code>Code</Text>
                    <br/>
                    <Text underline>uderline</Text>
                    <br/>
                    <Text delete>delete</Text>
                    <br/>
                    <Text strong>Strong</Text>
                </section>
            </div>
        );
    }
}
export default Paragraphy;