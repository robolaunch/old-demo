package persistance

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var dbClient *mongo.Client
var collection *mongo.Collection

type Launch struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Username  string             `bson:"username"`
	Name      string             `bson:"name"`
	Namespace string             `bson:"namespace"`
	Type      string             `bson:"type"`
	Status    bool               `bson:"status"`
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

func SaveLaunch(l *Launch) error {
	res, err := collection.InsertOne(context.Background(), &l)
	if err != nil {
		return err
	}
	fmt.Println(res)
	return nil
}

// Function will be soft delete! Data will be keeped after change
func DeleteLaunch(l *Launch) error {
	fmt.Printf("Username: %v\t Instance Name:%v\n", l.Username, l.Name)
	filter := bson.M{"username": l.Username, "name": l.Name}
	resLaunch := &Launch{}
	res := collection.FindOne(context.Background(), filter)
	if err := res.Decode(resLaunch); err != nil {
		fmt.Printf("Error happened: %v\n", err)
	}
	fmt.Println(resLaunch)
	resLaunch.Status = false
	_, err := collection.ReplaceOne(context.Background(), filter, resLaunch)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}
