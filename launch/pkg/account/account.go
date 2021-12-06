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

func DeleteUser(u *User) error {
	// Keycloak connection part
	ctx := context.Background()
	token, err := kc.LoginAdmin(ctx, kUser, kPass, kCli)
	if err != nil {
		fmt.Println("Something wrong with the credentials or url", err)
		return err

	}
	//To find user id
	fmt.Println(u.Username)
	userInfo, err := kc.GetUsers(ctx, token.AccessToken, kRealm, gocloak.GetUsersParams{
		Username: &u.Username,
	})
	if err != nil {
		return err
	}
	//User account deletion operation
	err = kc.DeleteUser(ctx, token.AccessToken, kRealm, *userInfo[0].ID)
	if err != nil {
		fmt.Printf("User deletion failed: %v\n", err)
		return err
	}

	//Defined user group deletion
	groupInfo, err := kc.GetGroups(ctx, token.AccessToken, kRealm, gocloak.GetGroupsParams{
		Search: gocloak.StringP(u.Username + "_role"),
	})
	if err != nil {
		return err
	}
	err = kc.DeleteGroup(ctx, token.AccessToken, kRealm, *groupInfo[0].ID)
	if err != nil {
		fmt.Printf("Group deletion failed: %v\n", err)
		return err
	}
	return nil
}
