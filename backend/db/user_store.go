package db

import (
	"context"

	"github.com/Harsh-apk/rentals/types"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserStore interface {
	CreateUser(context.Context, *types.User) error
	GetUserByID(context.Context, *primitive.ObjectID) (*types.User, error)
	GetUserByEmail(context.Context, *string) (*types.User, error)
}

type MongoUserStore struct {
	Coll *mongo.Collection
}

func NewMongoUserStore(client *mongo.Client) *MongoUserStore {
	return &MongoUserStore{
		Coll: client.Database(DBNAME).Collection(USERCOLL),
	}
}

func (u *MongoUserStore) CreateUser(ctx context.Context, user *types.User) error {
	res, err := u.Coll.InsertOne(ctx, user)
	if err != nil {
		return err
	}
	user.ID = res.InsertedID.(primitive.ObjectID)
	return nil
}

func (u *MongoUserStore) GetUserByID(ctx context.Context, id *primitive.ObjectID) (*types.User, error) {
	var user types.User
	err := u.Coll.FindOne(ctx, bson.D{{Key: "_id", Value: id}}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *MongoUserStore) GetUserByEmail(ctx context.Context, email *string) (*types.User, error) {
	var user types.User
	err := u.Coll.FindOne(ctx, bson.D{{Key: "email", Value: *email}}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil

}
