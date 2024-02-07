package db

import (
	"context"
	"fmt"

	"github.com/Harsh-apk/rentals/types"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type PostStore interface {
	InsertPost(context.Context, *types.Post) error
	GetPostByUserID(context.Context, *primitive.ObjectID) (*([]types.Post), error)
	UpdatePostImageLinksByID(context.Context, *primitive.ObjectID, *([]string)) error
	GetPostByFilter(context.Context, interface{}) (*([]types.Post), error)
}

type MongoPostStore struct {
	Coll *mongo.Collection
}

func NewMongoPostStore(client *mongo.Client) *MongoPostStore {
	return &MongoPostStore{
		Coll: client.Database(DBNAME).Collection(POSTCOLL),
	}
}

func (p *MongoPostStore) InsertPost(ctx context.Context, post *types.Post) error {
	res, err := p.Coll.InsertOne(ctx, post)
	if err != nil {
		return err
	}
	post.ID = res.InsertedID.(primitive.ObjectID)
	return nil
}

func (p *MongoPostStore) GetPostByUserID(ctx context.Context, id *primitive.ObjectID) (*([]types.Post), error) {
	var posts []types.Post
	cur, err := p.Coll.Find(ctx, bson.D{{Key: "userId", Value: *id}})
	if err != nil {
		if err.Error() == mongo.ErrNoDocuments.Error() {
			return nil, fmt.Errorf("empty")
		}
		return nil, err
	}
	err = cur.All(ctx, &posts)
	if err != nil {
		return nil, err
	}
	return &posts, nil

}

func (p *MongoPostStore) UpdatePostImageLinksByID(ctx context.Context, id *primitive.ObjectID, entry *([]string)) error {
	filter := bson.M{"_id": *id}
	update := bson.M{"$set": bson.M{"postImages": *entry}}
	res, err := p.Coll.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	if res.ModifiedCount < 1 {
		return fmt.Errorf("not updated")
	}
	return nil

}

func (p *MongoPostStore) GetPostByFilter(ctx context.Context, filter interface{}) (*([]types.Post), error) {
	var posts []types.Post
	cur, err := p.Coll.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	err = cur.All(ctx, &posts)
	if err != nil {
		return nil, err
	}
	return &posts, nil
}
