package main

import (
	"log"
	"net"

	launchpb "github.com/robolaunch/demo-launch/launch/api/launch"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

type server struct {
	launchpb.UnimplementedLaunchServiceServer
}

func main() {
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
