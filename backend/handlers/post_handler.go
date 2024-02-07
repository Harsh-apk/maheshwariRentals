package handlers

import (
	"strconv"

	"github.com/Harsh-apk/rentals/db"
	"github.com/Harsh-apk/rentals/types"
	"github.com/Harsh-apk/rentals/utils"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostHandler struct {
	PostStore db.PostStore
}

func NewPostHandler(postStore db.PostStore) *PostHandler {
	return &PostHandler{
		PostStore: postStore,
	}
}

func (p *PostHandler) HandleInsertPost(c *fiber.Ctx) error {
	rent, err := strconv.Atoi(c.FormValue("rent"))
	if err != nil {
		return err
	}
	var inPost = types.IncomingPost{
		Type:        c.FormValue("type"),
		Title:       c.FormValue("title"),
		Description: c.FormValue("description"),
		City:        c.FormValue("city"),
		Area:        c.FormValue("area"),
		State:       c.FormValue("state"),
		Address:     c.FormValue("address"),
		Rent:        int32(rent),
	}
	// err := c.BodyParser(&inPost)
	// if err != nil {
	// 	return err
	// }

	id := (c.Context().UserValue("id")).(string)
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	post := utils.CreatePostfromIncomingPost(&inPost, &(oid))
	err = p.PostStore.InsertPost(c.Context(), post)
	if err != nil {
		return err
	}
	return c.JSON(post)

}
func (p *PostHandler) HandleGetPostsByUser(c *fiber.Ctx) error {
	id := c.Context().UserValue("id")
	oid, err := primitive.ObjectIDFromHex(id.(string))
	if err != nil {
		return err
	}
	posts, err := p.PostStore.GetPostByUserID(c.Context(), &oid)
	if err != nil {
		return err
	}
	return c.JSON(map[string]([]types.Post){"data": *posts})
}
func (p *PostHandler) HandleSearchUser(c *fiber.Ctx) error {
	var filterData types.IncomingPostFilter
	filter := bson.D{}
	err := c.BodyParser(&filterData)
	if err != nil {
		return err
	}
	if len(filterData.City) > 0 {
		filter = append(filter, bson.E{Key: "city", Value: filterData.City})
	}
	if filterData.Rent > 0 {
		filter = append(filter, bson.E{Key: "rent", Value: filterData.Rent})
	}
	if len(filterData.State) > 0 {
		filter = append(filter, bson.E{Key: "state", Value: filterData.State})
	}
	if len(filterData.Type) > 0 {
		filter = append(filter, bson.E{Key: "type", Value: filterData.Type})
	}
	res, err := p.PostStore.GetPostByFilter(c.Context(), &filter)
	if err != nil {
		return err
	}
	return c.JSON(res)
}
