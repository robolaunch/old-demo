package main

import (
	"context"
	"fmt"

	launchpb "github.com/robolaunch/demo-launch/launch/api/launch"
	"github.com/robolaunch/demo-launch/launch/pkg/account"
	"github.com/robolaunch/demo-launch/launch/pkg/kubeclient"
	"github.com/robolaunch/demo-launch/launch/pkg/persistance"
	"google.golang.org/grpc/metadata"
)

//This function should create deployment & service for this version
//TODO: Implement helm chart for it.
func (*server) CreateLaunch(ctx context.Context, req *launchpb.LaunchCreateRequest) (*launchpb.LaunchResponse, error) {
	// Username could be used for namespace in this version.

	// User check service implemented user cannot access without login!
	headers, _ := metadata.FromIncomingContext(ctx)
	err := account.CurrentUser(headers["authorization"][0])
	if err != nil {
		return nil, err
	}

	username := req.GetLaunch().GetUsername()

	// namespace := req.GetLaunch().GetNamespace()

	//Launch Name
	name := req.GetLaunch().GetName()

	// Predefined deployment and docker templates.
	// Not implemented yet.
	// robotType := req.GetLaunch().GetRobotType()

	err = kubeclient.CreateDeploymentService(name, username)
	if err != nil {
		return nil, err
	}

	// Save user instance into MongoDB
	err = persistance.SaveLaunch(&persistance.Launch{
		Username:  username,
		Name:      name,
		Namespace: username,
		Type:      "DemoType",
		Status:    true,
	})
	if err != nil {
		fmt.Printf("User couldn't saved: %v", err)
		return nil, err
	}
	return &launchpb.LaunchResponse{
		IsOk:   true,
		Launch: req.GetLaunch(),
	}, nil
}

func (*server) DeleteLaunch(ctx context.Context, req *launchpb.LaunchDeleteRequest) (*launchpb.LaunchResponse, error) {
	// Username could be used for namespace in this version.
	username := req.GetUsername()
	// namespace := req.GetLaunch().GetNamespace()

	//Launch Name
	name := req.GetName()

	//TODO: Check user is available before creation

	//Predefined deployment and docker templates.
	// Not implemented yet.
	// robotType := req.GetLaunch().GetRobotType()
	persistance.DeleteLaunch(&persistance.Launch{
		Username:  username,
		Name:      name,
		Namespace: username,
	})
	err := kubeclient.DeleteDeploymentService(name, username)
	if err != nil {
		return nil, err
	}
	return &launchpb.LaunchResponse{
		IsOk: true,
		Launch: &launchpb.Launch{
			Username:  username,
			Namespace: username,
			RobotType: "default",
			Name:      name,
		},
	}, nil
}
