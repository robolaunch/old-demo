package main

import (
	"context"
	"fmt"

	"github.com/Nerzal/gocloak/v10"
	launchpb "github.com/robolaunch/demo-launch/launch/api/launch"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/robolaunch/demo-launch/launch/pkg/kubeclient"
)

var kc = gocloak.NewClient("https://keycloaktest.provedge.cloud")
var clientId = "master"

func (*server) CreateUser(ctx context.Context, req *launchpb.UserCreateRequest) (*launchpb.UserResponse, error) {
	newContext := context.Background()
	token, err := kc.LoginAdmin(newContext, "admin", "admin", clientId)

	if err != nil {
		fmt.Println("Something wrong with the credentials or url", err)
		return nil, err

	}
	username := req.GetUser().GetUsername()
	// password := req.GetPassword()
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
		FirstName:   gocloak.StringP(""),
		LastName:    gocloak.StringP(""),
		Email:       gocloak.StringP(email),
		Enabled:     gocloak.BoolP(true),
		Username:    gocloak.StringP(username),
		Credentials: &cred,
	}
	_, err = kc.CreateUser(ctx, token.AccessToken, "master", user)

	if err != nil {
		fmt.Printf("Oh no!, failed to create user :( %v", err)
		return nil, err
	}

	if err != nil {
		panic(err)
	}

	clientset, _ := kubeclient.GetKubeClient()
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
		panic(err)
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
	return response, nil
}
