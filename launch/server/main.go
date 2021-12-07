package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	launchpb "github.com/robolaunch/demo-launch/launch/api/launch"
	"github.com/robolaunch/demo-launch/launch/pkg/persistance"
	"google.golang.org/grpc"
)

var connectionString = os.Getenv("MONGO_SECRET")
var mongo_collection = os.Getenv("MONGO_COLLECTION")
var mongo_db = os.Getenv("MONGO_DB")

const (
	port = ":50051"
)

type server struct {
	launchpb.UnimplementedLaunchServiceServer
}

func main() {

	err := persistance.CreateDbConnection(context.TODO(), connectionString, mongo_db, mongo_collection)
	if err != nil {
		fmt.Printf("Mongo connection failed: %v", err)
	}
	defer func() {
		if err := persistance.DisconnectDb(context.TODO()); err != nil {
			fmt.Println("Connection disposed")
			panic(err)
		}
	}()
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	launchpb.RegisterLaunchServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
