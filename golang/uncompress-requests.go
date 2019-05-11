package main

import (
	"github.com/gin-gonic/gin"

	"compress/flate"
	// "github.com/davecgh/go-spew/spew"
	"fmt"
	// "io/ioutil"
	"bytes"
	// "flag"
	// "io"
	// "os"
	"time"
)

func main() {
	r := gin.Default()
	r.POST("/", func(c *gin.Context) {

		start := time.Now()
		// read body into byte array so we can check size
		body := c.Request.Body
		file := new(bytes.Buffer)
		file.ReadFrom(body)
		fmt.Println("Recieved data:", file.Len())

		// decompress the data
		r := flate.NewReader(file)
		buf := new(bytes.Buffer)
		buf.ReadFrom(r)
		fmt.Println("Decompressed data:", buf.Len())

		t := time.Now()
		elapsed := t.Sub(start)

		fmt.Println("Execution time (hr):", elapsed)
		// close the decompression reader
		r.Close()

		c.JSON(200, gin.H{
			"message": elapsed,
		})
	})
	r.Run(":8000") // listen and serve on 0.0.0.0:8080
}
