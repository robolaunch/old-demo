package persistance

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var dbClient *mongo.Client
var collection *mongo.Collection

type Feedback struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Username string             `bson:"username"`
	Name     string             `bson:"name"`
	Comment  string             `bson:"comment"`
	Rating   int32              `bson:"rating"`
}

func CreateDbConnection(ctx context.Context, connectionString string, dbName string, collectionName string) error {
	dbClient, err := mongo.Connect(ctx, options.Client().ApplyURI(connectionString))
	if err != nil {
		fmt.Println("Connection failed!")
	}
	collection = dbClient.Database(dbName).Collection(collectionName)
	return nil
}

func DisconnectDb(ctx context.Context) error {
	return dbClient.Disconnect(ctx)
}

func SaveFeedback(l *Feedback) error {
	_, err := collection.InsertOne(context.Background(), &l)
	if err != nil {
		return err
	}
	return nil
}

func ListFeedback() ([]*Feedback, error) {
	feedList := []*Feedback{}
	cur, err := collection.Find(context.Background(), primitive.D{{}})
	if err != nil {
		fmt.Println("find error", err)
		return nil, err
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		data := &Feedback{}
		err := cur.Decode(data)
		if err != nil {
			return nil, err
		}
		feedList = append(feedList, data)
	}
	return feedList, err
}

// Function will be soft delete! Data will be keeped after change
// func DeleteLaunch(l *Feedback) error {
// 	fmt.Printf("Username: %v | Instance Name:%v\n", l.Username, l.Name)
// 	filter := bson.M{"username": l.Username, "name": l.Name}
// 	resLaunch := &Feedback{}
// 	res := collection.FindOne(context.Background(), filter)
// 	if err := res.Decode(resLaunch); err != nil {
// 		fmt.Printf("Error happened: %v\n", err)
// 	}
// 	resLaunch.Status = false
// 	_, err := collection.ReplaceOne(context.Background(), filter, resLaunch)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	return nil
// }
