package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	feedbackpb "github.com/robolaunch/robolaunch/feedback/api/feedback"
	"github.com/robolaunch/robolaunch/feedback/pkg/persistance"
	"google.golang.org/grpc"
)

const (
	port = ":50052"
)

var connectionString = os.Getenv("MONGO_SECRET")
var mongo_collection = os.Getenv("MONGO_COLLECTION")
var mongo_db = os.Getenv("MONGO_DB")

type server struct {
	feedbackpb.UnimplementedFeedbackServer
}

func main() {
	//Create mongo connection in this place
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
	//GRPC connnection
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	feedbackpb.RegisterFeedbackServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
