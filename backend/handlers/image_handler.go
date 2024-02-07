package handlers

import (
	"fmt"
	"os"

	"github.com/Harsh-apk/rentals/db"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ImageHandler struct {
	PostStore db.PostStore
}

func NewImageHandler(postStore db.PostStore) *ImageHandler {
	return &ImageHandler{
		PostStore: postStore,
	}
}
func (i *ImageHandler) HandlePostImage(c *fiber.Ctx) error {
	var links []string
	form, err := c.MultipartForm()
	if err != nil {
		return err
	}
	files := form.File["postImages"]
	id := form.Value["id"]
	url := "/static/postImages/" + id[0]
	err = os.Mkdir(url, 0755)
	if err != nil {
		return err
	}
	for index, file := range files {
		err = c.SaveFile(file, (url + "/" + fmt.Sprint(index) + ".jpg"))
		if err != nil {
			return err
		}
		links = append(links, (url + "/" + fmt.Sprint(index) + ".jpg"))
	}
	if len(links) < 1 {
		return fmt.Errorf("no link created")
	}
	oid, err := primitive.ObjectIDFromHex(id[0])
	if err != nil {
		return err
	}
	err = i.PostStore.UpdatePostImageLinksByID(c.Context(), &oid, &links)
	if err != nil {
		return err
	}

	return c.JSON(map[string]string{"result": "success"})

}
