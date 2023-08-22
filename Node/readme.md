# Node.js

1. APM(应用监控 Application Performance Management) 包括Agent(上报数据)/Monitor(收集数据)/Dashboard(展示数据)
  概念 / 搭建 / AliNode
2. 高可用
  负载均衡(服务负载均衡和RPC负载均衡) / 灰度发布 / 优雅退出
3. 日志
  日志原理 / 日志分析 / 日志监控 / 日志收集与处理
  ELK架构 Sentry日志收集平台
4. 稳定性
  安全风险 / 限流 / 错误处理
5. 测试
  单元测试 / 代码质量 / 性能测试
  Code Smell 以及代码质量检查工具 SonarQube
6. 内存泄露
  内存回收原理 / 内存问题排查实战
7. 灰度发布机制与健康检查
8. 安全风险防范
9. 异常处理

## USE Method

  Utilization: 利用率 (以资源一个时间段内被使用的百分比来表示)
  Saturation  饱和度  (某个资源排队的数量)
  Errors      误差    (出现异常的数量)

  计算密集型: 计算/逻辑判断量非常大并且集中的类型,因为主要占用CPU资源所以又叫CPU密集型,当计算任务数等于CPU核心数的时候,是CPU运行效率最高的时候。

  I/O 密集型: 当磁盘的读取数据和输出数据非常大的类型。由于I/O操作的运行时间远远大于CPU,内存运行时间,所以任务的大部分时间都是在
  等待IO操作完成,I/O的特点是CPU消耗小。

  rss: Resident Set Size: 为进程执行分配的总内存
  heapTotal:    V8分配的堆总大小
  heapUsed:     V8执行期间实际使用的内存


  autocannon (压力测试)
  clinic

  https://gitee.com/node-apm/nodejs-memory-leak/blob/master/index.js

## QPS(Query Per Second)

  用来衡量服务的性能。QPS指每秒钟能执行的query。QPS的数值越高,server能处理的request越多。

  峰值QPS: 每天80%的访问集中在20%的时间里, 这20%的时间叫做峰值时间。

  RT: (Response-time) 响应时间: 执行一个请求从开始到最后收到响应数据所花费的总体时间, 即从客户端发起请求到收到服务器响应结果的时间。

  并发数指系统同时能处理的请求数量, 反应了系统的负载能力。

  Graphite / Grafana 监控Node.js应用