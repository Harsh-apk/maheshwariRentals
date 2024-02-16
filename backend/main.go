package main

import (
	"context"
	"os"
	"github.com/Harsh-apk/rentals/db"
	"github.com/Harsh-apk/rentals/handlers"
	"github.com/Harsh-apk/rentals/middleware"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var config = fiber.Config{
	// Override default error handler
	ErrorHandler: func(c *fiber.Ctx, err error) error {
		return c.JSON(map[string]string{"error": err.Error()})
	},
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = ":10000"
	}
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(db.DBURI))
	if err != nil {
		panic(err)
	}
	postStore := db.NewMongoPostStore(client)
	userHandler := handlers.NewUserHandler(db.NewMongoUserStore(client))
	postHandler := handlers.NewPostHandler(postStore)
	imageHandler := handlers.NewImageHandler(postStore)

	app := fiber.New(config)
	apiv1 := app.Group("/api/v1", middleware.JwtAuth)

	//PROTECTED ROUTES
	apiv1.Get("/home", userHandler.HandleGetUser)
	apiv1.Get("/accountposts", postHandler.HandleGetPostsByUser)
	apiv1.Post("/post", postHandler.HandleInsertPost)
	apiv1.Post("/postImages", imageHandler.HandlePostImage)
	apiv1.Post("/search", postHandler.HandleSearchUser)

	//UNPROTECTED ROUTES
	app.Post("/signup", userHandler.HandleCreateUser)
	app.Post("/login", userHandler.HandleLoginUser)
	app.Static("/", "./public/build")
	app.Static("/static", "./files")
	app.Listen(port)

}
