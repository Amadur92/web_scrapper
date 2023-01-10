package main

import (
    "os"
    "fmt"
    "github.com/pdfcrowd/pdfcrowd-go"
)

func main() {
    // create the API client instance
    client := pdfcrowd.NewHtmlToPdfClient("demo", "ce544b6ea52a5621fb9d55f8b542d14d")

    // run the conversion and write the result to a file
    err := client.ConvertFileToFile("/path/to/MyLayout.html", "MyLayout.pdf")

    // check for the conversion error
    handleError(err)
}

func handleError(err error) {
    if err != nil {
        // report the error
        why, ok := err.(pdfcrowd.Error)
        if ok {
            os.Stderr.WriteString(fmt.Sprintf("Pdfcrowd Error: %s\n", why))
        } else {
            os.Stderr.WriteString(fmt.Sprintf("Generic Error: %s\n", err))
        }

        // rethrow or handle the exception
        panic(err.Error())
    }
}