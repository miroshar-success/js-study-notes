# HTTP

  HTTP(HyperText Transfer Protocol) 超文本传输协议

  TCP/IP协议族按层次分四层: 应用层, 传输层, 网络层 和数据链路层。

## 应用层

  应用层决定了向用户提供应用服务时通信的活动。FTP(File Transfer Protocol),DNS (Domain Name System)。
  HTTP协议也处于该层。

  DNS: 提供域名到IP地址之间的解析服务。

## 传输层

  传输层对上层应用层,提供处于网络连接中的两台计算机之间的数据传输。在传输层有两个性质不同的协议
  TCP (Transmission Control Protocol) 和 UDP (User Data Protocol)

  3次握手
  用TCP协议把数据包发送出去后, 使用了TCP的标志 (SYN) synchronize。和ACK (acknowledgement)。

  发送端发送一个带有SYN 标志的数据包给对方。接收端收到后, 回传一个带有SYN/ACK标志的数据包以示传达确认信息。最后发送端再
  回传一个带ACK标志的数据包, 代表 '握手' 结束。

## 网络层

  网络层用来处理在网络上流动的数据包。数据包式网络传输的最小数据单位。该层规定了通过怎样的路径 到达对方计算机。并把数据包传递
  给对方。

  IP (Internet Protocol) / MAC (Media Access Control Address)
  IP地址指明了节点被分配到的地址。MAC地址是指网卡所属的固定地址。IP地址可以和MAC地址进行配对。IP间的通信依赖MAC地址。

  ARP (Address Resolution Protocol) 是一个以解析地址的协议。

## 链路层

  用来处理连接网络的硬件部分。包括控制操作系统, 硬件的设备驱动, NIC(Network Interface Card, 网络适配器)以及光纤等物理可见部分。硬件上的范畴均在链路层的作用范围之内。

## URI/URL

  URI (Uniform Resource Identifier) 
  URI就是由某个协议方案表示的资源的定位标识符。协议方案是指访问资源所使用的协议类型名称。

