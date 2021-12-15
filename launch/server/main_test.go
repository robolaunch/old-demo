package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"testing"

	launchpb "github.com/robolaunch/robolaunch/launch/api/launch"
	"google.golang.org/grpc"
	"google.golang.org/grpc/test/bufconn"
)

const bufSize = 1024 * 1024

var lis *bufconn.Listener

func init() {
	lis := bufconn.Listen(bufSize)
	s := grpc.NewServer()
	launchpb.RegisterLaunchServiceServer(s, &server{})
	go func() {
		if err := s.Serve(lis); err != nil {
			log.Fatalf("Server exited with error: %v", err)
		}
	}()
	fmt.Println("INITIALEZED")

}

func bufDialer(context.Context, string) (net.Conn, error) {
	return lis.Dial()
}

type Token struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int    `json:"expires_in"`
}

func getToken() string {
	data := url.Values{}
	data.Set("grant_type", "password")
	data.Set("client_id", "Gitea")
	data.Set("username", "webrpc")
	data.Set("password", "webrpc")
	data.Set("scope", "openid")
	data.Set("response_type", "id_token")
	var myToken Token
	client := &http.Client{}
	r, _ := http.NewRequest("POST", "https://keycloaktest.provedge.cloud/auth/realms/master/protocol/openid-connect/token", strings.NewReader(data.Encode())) // URL-encoded payload
	r.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	r.Header.Add("Content-Length", strconv.Itoa(len(data.Encode())))
	res, err := client.Do(r)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(res.Status)
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	_ = json.Unmarshal(body, &myToken)
	return string(myToken.AccessToken)

}

func TestCreateRPC(t *testing.T) {
	// token := getToken()
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	fmt.Println("CONNECTION PASSED")
	// header := metadata.New(map[string]string{
	// 	"authorization": token,
	// })
	// requestCtx := metadata.NewOutgoingContext(context.Background(), header)
	client := launchpb.NewLaunchServiceClient(conn)
	// fmt.Println("CONNECTION PASSED2")

	_, err = client.CreateLaunch(ctx, &launchpb.LaunchCreateRequest{Launch: &launchpb.Launch{
		Username:  "webrpc",
		Name:      "tester-1123",
		Namespace: "webrpc",
		RobotType: "DefaultType",
	}})
	if err != nil {
		t.Fatalf("Creation failed: %v", err)
	}
	// t.Logf("Response: %+v", resp.GetIsOk())
	//Remove created RPC!!
	// client.DeleteLaunch(requestCtx, &launchpb.LaunchDeleteRequest{
	// 	Username:  "webrpc",
	// 	Name:      "tester-1123",
	// 	Namespace: "DefaultType",
	// })
}
