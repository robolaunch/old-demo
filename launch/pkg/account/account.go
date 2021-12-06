package account

import (
	"context"
	"fmt"
	"os"

	"github.com/Nerzal/gocloak/v10"
)

var kUrl = os.Getenv("KEYCLOAK_URL")
var kUser = os.Getenv("KEYCLOAK_ADMIN_USERNAME")
var kPass = os.Getenv("KEYCLOAK_ADMIN_PASSWORD")
var kRealm = os.Getenv("KEYCLOAK_REALM")
var kCli = os.Getenv("KEYCLOAK_CLIENT")
var kc = gocloak.NewClient(kUrl)

type User struct {
	Username     string
	Password     string
	Email        string
	Organization string
}

func CreateUser(u *User) error {
	ctx := context.Background()
	token, err := kc.LoginAdmin(ctx, kUser, kPass, kCli)
	// To authenticate keycloak server
	if err != nil {
		fmt.Println("Something wrong with the credentials or url", err)
		return err

	}
	cred := []gocloak.CredentialRepresentation{}
	cred = append(cred,
		gocloak.CredentialRepresentation{
			Type:      gocloak.StringP("password"),
			Temporary: gocloak.BoolP(false),
			Value:     gocloak.StringP(u.Password),
		},
	)
	user := gocloak.User{
		FirstName: gocloak.StringP(""),
		LastName:  gocloak.StringP(""),
		Email:     gocloak.StringP(u.Email),
		Enabled:   gocloak.BoolP(true),
		Username:  gocloak.StringP(u.Username),
		Groups: &[]string{
			u.Username + "_role",
		},
		Credentials: &cred,
	}
	group := gocloak.Group{
		Name: gocloak.StringP(u.Username + "_role"),
	}
	_, err = kc.CreateGroup(ctx, token.AccessToken, kRealm, group)
	if err != nil {
		fmt.Printf("Oh no!, failed to create user :( %v\n", err)
		return err
	}
	_, err = kc.CreateUser(ctx, token.AccessToken, kRealm, user)

	if err != nil {
		fmt.Printf("Oh no!, failed to create user :( %v\n", err)
		return err
	}
	return nil
}
