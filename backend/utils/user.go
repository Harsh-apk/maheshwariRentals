package utils

import (
	"github.com/Harsh-apk/rentals/types"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

const BcryptCost = 12
const defaultProfilePic string = "http://127.0.0.1:5000/defaultImages/profilePic.jpg"

func EncPwFromPw(password *string) (*string, error) {
	encPw, err := bcrypt.GenerateFromPassword([]byte(*password), BcryptCost)
	if err != nil {
		return nil, err
	}
	ret := string(encPw)
	return &ret, nil
}
func ComparePasswords(encPw *string, password *string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(*encPw), []byte(*password))
	return err == nil
}

func UserFromIncomingUser(inUser *types.IncomingUser) (*types.User, error) {
	encPw, err := EncPwFromPw(&(inUser.Password))
	if err != nil {
		return nil, err
	}
	return &types.User{
		Name:          inUser.Name,
		Email:         inUser.Email,
		Phone:         inUser.Phone,
		EncPw:         *encPw,
		Profile:       defaultProfilePic,
		EmailVerified: false,
		Saved:         []primitive.ObjectID{},
	}, nil
}
