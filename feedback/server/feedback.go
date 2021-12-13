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
		Rating:   req.GetComment().GetRating(),
	}

	err := persistance.SaveFeedback(&feedback)
	if err != nil {
		fmt.Printf("Error happend saving feedback")
		return nil, err
	}

	return &feedbackpb.CommentResponse{}, nil
}

func (*server) ListFeedback(ctx context.Context, req *feedbackpb.ListFeedbackRequest) (*feedbackpb.ListFeedbackResponse, error) {
	//Check user identity!

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
