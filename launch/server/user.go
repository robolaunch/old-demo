package main

import (
	"context"
	"fmt"
	"os"

	"github.com/Nerzal/gocloak/v10"
	launchpb "github.com/robolaunch/demo-launch/launch/api/launch"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/robolaunch/demo-launch/launch/pkg/kubeclient"
)

var kUrl = os.Getenv("KEYCLOAK_URL")
var kUser = os.Getenv("KEYCLOAK_ADMIN_USERNAME")
var kPass = os.Getenv("KEYCLOAK_ADMIN_PASSWORD")
var kRealm = os.Getenv("KEYCLOAK_REALM")
var kCli = os.Getenv("KEYCLOAK_CLIENT")
var kc = gocloak.NewClient(kUrl)

func (*server) CreateUser(ctx context.Context, req *launchpb.UserCreateRequest) (*launchpb.UserResponse, error) {
	errUsr := &launchpb.UserResponse{
		IsOk: false,
		User: &launchpb.User{
			Username:     "",
			Password:     "",
			Email:        "",
			Organization: "",
		},
	}

	newContext := context.Background()
	// To authenticate keycloak server
	token, err := kc.LoginAdmin(newContext, kUser, kPass, kCli)
	if err != nil {
		fmt.Println("Something wrong with the credentials or url", err)
		return errUsr, err

	}
	//Get User information from endpoint.
	username := req.GetUser().GetUsername()
	email := req.GetUser().GetEmail()
	password := req.GetUser().GetPassword()
	organization := req.GetUser().GetOrganization()
	cred := []gocloak.CredentialRepresentation{}
	cred = append(cred,
		gocloak.CredentialRepresentation{
			Type:      gocloak.StringP("password"),
			Temporary: gocloak.BoolP(false),
			Value:     gocloak.StringP(password),
		},
	)
	user := gocloak.User{
		FirstName: gocloak.StringP(""),
		LastName:  gocloak.StringP(""),
		Email:     gocloak.StringP(email),
		Enabled:   gocloak.BoolP(true),
		Username:  gocloak.StringP(username),
		Groups: &[]string{
			username + "_role",
		},
		Credentials: &cred,
	}
	group := gocloak.Group{
		Name: gocloak.StringP(username + "_role"),
	}
	_, err = kc.CreateGroup(ctx, token.AccessToken, kRealm, group)
	if err != nil {
		fmt.Printf("Oh no!, failed to create user :( %v\n", err)
		return errUsr, err
	}
	_, err = kc.CreateUser(ctx, token.AccessToken, kRealm, user)

	if err != nil {
		fmt.Printf("Oh no!, failed to create user :( %v\n", err)
		return errUsr, err
	}

	clientset, err := kubeclient.GetKubeClient()
	if err != nil {
		fmt.Printf("Kubernetes client connection failed: %v\n", err)
		return errUsr, err

	}
	ns := clientset.CoreV1().Namespaces()
	nd := &v1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: username,
			Labels: map[string]string{
				username: "created",
			},
		},
	}

	_, err = ns.Create(context.TODO(), nd, metav1.CreateOptions{})
	if err != nil {
		fmt.Printf("Namespace creation failed!: %v\n", err)
		return errUsr, err

	}
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
		return errUsr, err

	}
	return response, nil
}
