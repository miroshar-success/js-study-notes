import React, {Component} from 'react';
import {Button,Icon} from "antd"
import "antd/dist/antd.css"
class Btn extends Component {
    constructor(props){
        super(props)
        this.state = {
            size:"default",
            loading:false
        }
    }
    handleChangeSize = (e) => {
        console.log(e.target.value);
        this.setState({
            size: e.target.value
        })
    }
    handleLoading = (e) => {
        this.setState({
            loading:true
        })
    }
    render() {
        let size = this.state.size
        return (
            <div>
                <section className="type">
                    <h3>按钮类型</h3>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type={"dashed"}>Dashed</Button>
                    <Button type={"danger"}>Danger</Button>
                    <Button type={"link"}>Link</Button>
                </section>
                <section className="iconBtn">
                    <h3>Icon-Button</h3>
                    <Button type="primary" icon={"search"}>Search</Button>
                    <Button type="dashed" icon="search">Search</Button>
                </section>
                <section className="size">
                    <h3>Change Size</h3>
                    <div>
                        <p>Large:<input
                            name="size"
                            type="radio"
                            value="large"
                            onChange={this.handleChangeSize}
                        /></p>
                        <p>Normal:<input
                            name="size"
                            type="radio"
                            value="default"
                            onChange={this.handleChangeSize}
                        /></p>
                        <p>Small:<input
                            name="size"
                            type="radio"
                            value="small"
                            onChange={this.handleChangeSize}
                        /></p>
                    </div>
                    <Button type="primary" size={size}>Primary</Button>
                    <Button type="default" size={size}>Default</Button>
                    <Button type="link" size={size}>Link</Button>
                    <Button type="danger" size={size}>Danger</Button>
                    <br/>
                    <Button type="primary" icon={"download"} shape={"circle"}></Button>
                    <Button type="primary" icon={"download"}>DownLoad</Button>
                    <br/>
                    <Button type="primary" disabled>Primary</Button>
                    <Button type="default" disabled>Default</Button>
                    <Button type="danger" disabled>Danger</Button>
                    <br/>
                    <Button type="primary" ghost>Primary</Button>
                    <Button type="default" ghost>Default</Button>
                    <Button type="danger" ghost>Danger</Button>
                    <br/>
                    <Button.Group>
                        <Button>A</Button>
                        <Button>B</Button>
                        <Button>C</Button>
                    </Button.Group>
                    <Button.Group>
                        <Button disabled>A</Button>
                        <Button disabled>B</Button>
                        <Button disabled>C</Button>
                    </Button.Group>
                    <Button.Group>
                        <Button type="danger">
                            Go back
                            <Icon type="left"/>
                        </Button>
                        <Button type="danger">
                            Go forward
                            <Icon type="right"/>
                        </Button>
                    </Button.Group>
                </section>
                <section className="load">
                    <Button.Group>
                        <Button
                            loading={this.state.loading}
                            icon="poweroff"
                            onClick={this.handleLoading}
                        >Click Me!</Button>
                    </Button.Group>
                </section>
            </div>
        );
    }
}
export default Btn;