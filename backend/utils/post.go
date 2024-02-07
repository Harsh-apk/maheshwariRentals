package utils

import (
	"github.com/Harsh-apk/rentals/types"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreatePostfromIncomingPost(inPost *types.IncomingPost, userId *primitive.ObjectID) *types.Post {
	return &types.Post{
		UserID:      *userId,
		Title:       inPost.Title,
		Description: inPost.Description,
		Type:        inPost.Type,
		City:        inPost.City,
		State:       inPost.State,
		Area:        inPost.Area,
		Address:     inPost.Address,
		Rent:        inPost.Rent,
	}
}
