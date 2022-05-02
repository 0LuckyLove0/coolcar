package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	"fmt"
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	log.SetFlags(log.Lshortfile)
	conn, err := grpc.Dial("127.0.0.1:8081",grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("cannot connect server:%v", err)
	}

	tsClient := trippb.NewTripServiceClient(conn)
	r, err := tsClient.GetTrip(context.Background(), &trippb.GetTripRequest{
		Id: "trip789",
	})
	if err != nil {
		log.Fatalf("cannot call GetTrip:%v", err)
	}
	fmt.Println(r)
}
