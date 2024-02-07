package handlers

import (
	"fmt"

	"github.com/Harsh-apk/rentals/db"
	"github.com/Harsh-apk/rentals/types"
	"github.com/Harsh-apk/rentals/utils"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserHandler struct {
	UserStore db.UserStore
}

func NewUserHandler(userStore db.UserStore) *UserHandler {
	return &UserHandler{
		UserStore: userStore,
	}
}

func (h *UserHandler) HandleCreateUser(c *fiber.Ctx) error {
	var inUser types.IncomingUser
	err := c.BodyParser(&inUser)
	if err != nil {
		return err
	}
	if inUser.Phone == "" {
		inUser.Phone = "+1 12345 67891"
	}
	user, err := utils.UserFromIncomingUser(&inUser)
	if err != nil {
		return err
	}
	err = h.UserStore.CreateUser(c.Context(), user)
	if err != nil {
		return err
	}
	cookie, err := utils.CreateCookieFromID(user.ID)
	if err == nil {
		c.Cookie(cookie)
	}
	return c.JSON(user)

}
func (h *UserHandler) HandleLoginUser(c *fiber.Ctx) error {
	var inUser types.IncomingUser
	err := c.BodyParser(&inUser)
	if err != nil {
		return err
	}
	user, err := h.UserStore.GetUserByEmail(c.Context(), &inUser.Email)
	if err != nil {
		return err
	}
	if !utils.ComparePasswords(&user.EncPw, &inUser.Password) {
		return fmt.Errorf("unauthorised")
	}
	cookie, err := utils.CreateCookieFromID(user.ID)
	if err == nil {
		c.Cookie(cookie)
	}
	return c.JSON(user)
}
func (h *UserHandler) HandleGetUser(c *fiber.Ctx) error {
	id := (c.Context().UserValue("id")).(string)
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	user, err := h.UserStore.GetUserByID(c.Context(), &oid)
	if err != nil {
		return err
	}
	return c.JSON(user)
}
