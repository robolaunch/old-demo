package main

import (
	"context"
	"fmt"

	feedbackpb "github.com/robolaunch/robolaunch/feedback/api/feedback"
	"github.com/robolaunch/robolaunch/feedback/pkg/persistance"
)

func (*server) SendFeedback(ctx context.Context, req *feedbackpb.CommentRequest) (*feedbackpb.CommentResponse, error) {
	//Check user identity!

	//Get params
	feedback := persistance.Feedback{
		Username: req.GetComment().GetUsername(),
		Name:     req.GetComment().GetName(),
		Comment:  req.GetComment().GetComment(),
		Point:    req.GetComment().GetRating(),
	}

	err := persistance.SaveFeedback(&feedback)
	if err != nil {
		fmt.Printf("Error happend saving feedback")
		return nil, err
	}

	return &feedbackpb.CommentResponse{}, nil
}
