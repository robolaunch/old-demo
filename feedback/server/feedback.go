package main

import (
	"context"
	"errors"
	"fmt"

	feedbackpb "github.com/robolaunch/robolaunch/feedback/api/feedback"
	"github.com/robolaunch/robolaunch/feedback/pkg/account"
	"github.com/robolaunch/robolaunch/feedback/pkg/persistance"
	"google.golang.org/grpc/metadata"
)

func (*server) SendFeedback(ctx context.Context, req *feedbackpb.CommentRequest) (*feedbackpb.CommentResponse, error) {
	//Check user identity!
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
	//Get params
	feedback := persistance.Feedback{
		Username: req.GetComment().GetUsername(),
		Name:     req.GetComment().GetName(),
		Comment:  req.GetComment().GetComment(),
		Rating:   req.GetComment().GetRating(),
	}

	err = persistance.SaveFeedback(&feedback)
	if err != nil {
		fmt.Printf("Error happend saving feedback")
		return nil, err
	}

	return &feedbackpb.CommentResponse{}, nil
}

func (*server) ListFeedback(ctx context.Context, req *feedbackpb.ListFeedbackRequest) (*feedbackpb.ListFeedbackResponse, error) {
	//Check user identity!
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

	//No params added for now!

	data, err := persistance.ListFeedback()
	if err != nil {
		fmt.Printf("Error happend getting feedback")
		return nil, err
	}
	feedList := []*feedbackpb.Comment{}
	for _, feed := range data {
		feedList = append(feedList, &feedbackpb.Comment{
			Username: feed.Username,
			Name:     feed.Name,
			Comment:  feed.Comment,
			Rating:   feed.Rating,
		})
	}

	return &feedbackpb.ListFeedbackResponse{Comment: feedList}, nil
}
