package types

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*
	USER
*/

// const (
// 	SingleRoom int = 0
// 	Bhk1       int = 1
// 	Bhk2       int = 2
// 	Bhk3       int = 3
// 	Bhk4       int = 4
// 	Pg         int = 5
// )

type User struct {
	ID            primitive.ObjectID   `bson:"_id,omitempty" json:"id,omitempty"`
	Email         string               `bson:"email,omitempty" json:"email,omitempty"`
	EmailVerified bool                 `bson:"emailVerified,omitempty" json:"emailVerified,omitempty"`
	Name          string               `bson:"name,omitempty" json:"name,omitempty"`
	EncPw         string               `bson:"encPw,omitempty" json:"encPw,omitempty"`
	Phone         string               `bson:"phone,omitempty" json:"phone,omitempty"`
	Profile       string               `bson:"profile,omitempty" json:"profile,omitempty"`
	Saved         []primitive.ObjectID `bson:"saved,omitempty" json:"saved,omitempty"`
}
type IncomingUser struct {
	Email    string `json:"email,omitempty"`
	Name     string `json:"name,omitempty"`
	Phone    string `json:"phone,omitempty"`
	Password string `bson:"password,omitempty" json:"password,omitempty"`
}

/*
	POST
*/

type Post struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserID      primitive.ObjectID `bson:"userId,omitempty" json:"userId,omitempty"`
	Title       string             `bson:"title,omitempty" json:"title,omitempty"`
	Description string             `bson:"description,omitempty" json:"description,omitempty"`
	Type        string             `bson:"type,omitempty" json:"type,omitempty"`
	City        string             `bson:"city,omitempty" json:"city,omitempty"`
	Area        string             `bson:"area,omitempty" json:"area,omitempty"`
	State       string             `bson:"state,omitempty" json:"state,omitempty"`
	Address     string             `bson:"address,omitempty" json:"address,omitempty"`
	Rent        int32              `bson:"rent,omitempty" json:"rent,omitempty"`
	PostImages  []string           `json:"postImages" bson:"postImages"`
}

type IncomingPost struct {
	Type        string `json:"type,omitempty"`
	Title       string `json:"title,omitempty"`
	Description string `json:"description,omitempty"`
	City        string `json:"city,omitempty"`
	Area        string `json:"area,omitempty"`
	State       string `json:"state,omitempty"`
	Address     string `json:"address,omitempty"`
	Rent        int32  `json:"rent,omitempty"`
}

type IncomingPostFilter struct {
	Rent  int32  `json:"rent,omitempty"`
	Type  string `json:"type,omitempty"`
	City  string `json:"city,omitempty"`
	State string `json:"state,omitempty"`
}
