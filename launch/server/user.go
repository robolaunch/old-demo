package main

import (
	"context"
	"fmt"

	launchpb "github.com/robolaunch/demo-launch/launch/api/launch"

	"github.com/robolaunch/demo-launch/launch/pkg/account"
	"github.com/robolaunch/demo-launch/launch/pkg/kubeclient"
)

func (*server) CreateUser(ctx context.Context, req *launchpb.UserCreateRequest) (*launchpb.UserResponse, error) {

	//Get User information from endpoint.
	username := req.GetUser().GetUsername()
	email := req.GetUser().GetEmail()
	password := req.GetUser().GetPassword()
	organization := req.GetUser().GetOrganization()

	// Create user on Keycloak
	err := account.CreateUser(&account.User{
		Username:     username,
		Email:        email,
		Password:     password,
		Organization: organization,
	})
	if err != nil {
		fmt.Printf("User creation failed: %v\n", err)
		return nil, err
	}

	//Create namespace for user
	err = kubeclient.CreateNamespace(username)
	if err != nil {
		fmt.Printf("Namespace creation failed!: %v\n", err)
		return nil, err

	}

	//Create user response to reach information.
	response := &launchpb.UserResponse{
		IsOk: true,
		User: &launchpb.User{
			Username:     username,
			Password:     "",
			Email:        email,
			Organization: organization,
		},
	}
	fmt.Printf("User created: %v", username)
	err = kubeclient.CreateUserRole(username)
	if err != nil {
		fmt.Printf("Role creation error failed!: %v\n", err)
		return nil, err

	}
	return response, nil
}

func (*server) DeleteUser(ctx context.Context, req *launchpb.UserDeleteRequest) (*launchpb.UserResponse, error) {

	//Get User information from endpoint.
	username := req.GetUsername()

	// Create user on Keycloak
	err := account.DeleteUser(&account.User{
		Username: username,
	})
	if err != nil {
		fmt.Printf("User deletion failed: %v\n", err)
		return nil, err
	}

	//Create namespace for user
	err = kubeclient.DeleteNamespace(username)
	if err != nil {
		fmt.Printf("Namespace deletion failed!: %v\n", err)
		return nil, err

	}

	//Create user response to reach information.
	response := &launchpb.UserResponse{
		IsOk: true,
		User: &launchpb.User{
			Username:     username,
			Password:     "",
			Email:        "",
			Organization: "",
		},
	}
	fmt.Printf("User deleted: %v", username)

	return response, nil
}
