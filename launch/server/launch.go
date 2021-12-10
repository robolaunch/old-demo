package main

import (
	"context"
	"errors"
	"fmt"
	"log"

	launchpb "github.com/robolaunch/robolaunch/launch/api/launch"
	"github.com/robolaunch/robolaunch/launch/pkg/account"
	"github.com/robolaunch/robolaunch/launch/pkg/kubeclient"
	"github.com/robolaunch/robolaunch/launch/pkg/persistance"
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
		Username:       username,
		Name:           name,
		Namespace:      username,
		Type:           "DemoType",
		Status:         true,
		WorkloadStatus: true,
	})
	if err != nil {
		fmt.Printf("User couldn't saved: %v", err)
		return nil, err
	}
	fmt.Printf("[CreateLaunch] Completed: %v\n", username)

	return &launchpb.LaunchResponse{
		IsOk:   true,
		Launch: req.GetLaunch(),
	}, nil
}

func (*server) DeleteLaunch(ctx context.Context, req *launchpb.LaunchDeleteRequest) (*launchpb.LaunchResponse, error) {
	// Username could be used for namespace in this version.
	headers, _ := metadata.FromIncomingContext(ctx)
	//Username will be used as a namespace in this version

	//Authorization header check!
	if headers["authorization"] == nil {
		return nil, errors.New("auth: authorization header not found")
	}
	err := account.CurrentUser(headers["authorization"][0])
	if err != nil {
		return nil, err
	}
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
	err = kubeclient.DeleteDeploymentService(name, username)
	if err != nil {
		return nil, err
	}
	fmt.Printf("[DeleteLaunch] Completed: %v\n", username)
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

func (*server) GetLaunch(ctx context.Context, req *launchpb.LaunchDetailRequest) (*launchpb.LaunchDetailResponse, error) {
	// Check before list Launches
	headers, _ := metadata.FromIncomingContext(ctx)
	//Username will be used as a namespace in this version

	//Authorization header check!
	if headers["authorization"] == nil {
		return nil, errors.New("auth: authorization header not found")
	}
	err := account.CurrentUser(headers["authorization"][0])
	if err != nil {
		return nil, err
	}

	//Filter operation.
	name := req.GetName()
	//Namespace username is same in tihs version
	username := req.GetUsername()
	// namespace:= req.Namespace()

	//Only read svc would be enough
	launchSvc, err := kubeclient.GetService(name, username)
	if err != nil {
		return nil, err
	}
	var nodePort int32
	// Find webrtc port from deployment
	for _, port := range launchSvc.Spec.Ports {
		if port.Name == "http" {
			nodePort = port.NodePort
		}
	}

	return &launchpb.LaunchDetailResponse{
		Launch: &launchpb.LaunchDetail{
			Name:           name,
			Namespace:      username,
			RobotType:      "DefaultRobot", // not defined in this version
			WorkloadStatus: true,           // should be checked from deployment
			NodeIp:         "23.88.52.37",  // predefined by node affinity
			NodePort:       nodePort,
		},
	}, nil
}

func (*server) ListLaunch(ctx context.Context, req *launchpb.ListLaunchRequest) (*launchpb.ListLaunchResponse, error) {
	// Check before list Launches
	headers, _ := metadata.FromIncomingContext(ctx)
	//Username will be used as a namespace in this version

	//Authorization header check!
	if headers["authorization"] == nil {
		return nil, errors.New("auth: authorization header not found")
	}
	username, err := account.CurrentUserWithUsername(headers["authorization"][0])
	if err != nil {
		return nil, err
	}
	pureLaunches, err := kubeclient.ListDeploymentService(username)
	if err != nil {
		return nil, err
	}
	var launches []*launchpb.Launch
	for _, launch := range pureLaunches.Items {
		var status bool
		if launch.Status.AvailableReplicas > 0 {
			status = true
		} else {
			status = false
		}
		launches = append(launches, &launchpb.Launch{
			Username:       username,
			Name:           launch.Name,
			Namespace:      launch.Namespace,
			RobotType:      "DefaultType",
			WorkloadStatus: status,
		})
	}
	fmt.Printf("[ListLaunch] Completed: %v\n", username)
	return &launchpb.ListLaunchResponse{Launches: launches}, nil

}

func (*server) StartLaunch(ctx context.Context, req *launchpb.LaunchDeleteRequest) (*launchpb.LaunchResponse, error) {
	// Check before list Launches
	headers, _ := metadata.FromIncomingContext(ctx)
	//Username will be used as a namespace in this version

	//Authorization header check!
	if headers["authorization"] == nil {
		return nil, errors.New("auth: authorization header not found")
	}
	err := account.CurrentUser(headers["authorization"][0])
	if err != nil {
		return nil, err
	}

	name := req.GetName()
	// namespace := req.GetNamespace()
	username := req.GetUsername()

	//Get kubernetes deployment
	deploy, err := kubeclient.GetDeployment(name, username)
	if err != nil {
		log.Fatalf("[StartLaunch]Launch couldn't started: %v\n", err)
		return nil, err
	}
	if (*deploy.Spec.Replicas) > 0 {
		err = errors.New("launch has already")
		return nil, err
	}
	replicas := int32(1)
	deploy.Spec.Replicas = &replicas

	//Update Deployment
	_, err = kubeclient.UpdateDeployment(username, deploy)
	if err != nil {
		log.Fatalf("[StartLaunch]Launch couldn't started\n: %v", err)
		return nil, err

	}
	return &launchpb.LaunchResponse{}, nil
}

func (*server) StopLaunch(ctx context.Context, req *launchpb.LaunchDeleteRequest) (*launchpb.LaunchResponse, error) {
	// Check before list Launches
	headers, _ := metadata.FromIncomingContext(ctx)
	//Username will be used as a namespace in this version

	//Authorization header check!
	if headers["authorization"] == nil {
		return nil, errors.New("auth: authorization header not found")
	}
	err := account.CurrentUser(headers["authorization"][0])
	if err != nil {
		return nil, err
	}

	name := req.GetName()
	// namespace := req.GetNamespace()
	username := req.GetUsername()

	//Get kubernetes deployment
	deploy, err := kubeclient.GetDeployment(name, username)
	if err != nil {
		log.Fatalf("[StartLaunch]Launch couldn't started: %v\n", err)
		return nil, err
	}
	if (*deploy.Spec.Replicas) == 0 {
		err = errors.New("launch has already stopped")
		return nil, err
	}
	replicas := int32(0)
	deploy.Spec.Replicas = &replicas

	//Update Deployment
	_, err = kubeclient.UpdateDeployment(username, deploy)
	if err != nil {
		log.Fatalf("[StartLaunch]Launch couldn't started\n: %v", err)
		return nil, err

	}
	return &launchpb.LaunchResponse{}, nil
}
