package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	trip "coolcar/tripservice"
	"log"
	"net"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/encoding/protojson"
)

func main() {
	log.SetFlags(log.Lshortfile) //打印出的日志样式 带文件和行数
	go startGRPCGateway()
	lis,err:=net.Listen("tcp",":8081")
	if err != nil {
		log.Fatalf("failed to listen:%v",err) 
	}

	s:=grpc.NewServer()
	trippb.RegisterTripServiceServer(s,&trip.Service{})
	log.Fatal(s.Serve(lis))
}
// startGRPCGateway 这个函数 连接了GRPCgateway和内部的GRPC
func startGRPCGateway(){
	c:=context.Background() //生成一个没内容的上下文
	c,cancel:=context.WithCancel(c) //具有cancel功能方法的环境 cancel是个函数 可以调用 调用了就断开上面的连接
	defer cancel()

	//这个是以后连接多个内部服务也要用到的  放外面
	// 参数里面是 GRPC转到json 的操作配置
	mux:=runtime.NewServeMux(runtime.WithMarshalerOption(
		
		runtime.MIMEWildcard,&runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				UseEnumNumbers: true,// 这个是操作是把枚举Enum类型的字符串变成本质的Num
				UseProtoNames: true,// 显示proto里面的名字 也就是下划线形式
			},
		},
	))


	// 下面这个函数是yaml生成的
	err:=trippb.RegisterTripServiceHandlerFromEndpoint(
		c,
		// mux : multiplexer 分发到内部的GRPC
		mux,
		"127.0.0.1:8081",
		[]grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())},
	)
	if err != nil {
		log.Fatalf("cannot start grpc gateway:%v",err)
	}
	http.ListenAndServe(":8080",mux)
	if err != nil {
		log.Fatalf("cannot listen and service :%v",err)
	}
}