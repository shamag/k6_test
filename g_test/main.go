package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"
)

type arr struct {
	Data []int `json:"data"`
}

func tomHandler(w http.ResponseWriter, r *http.Request) {

	d := json.NewDecoder(r.Body)
	p := new(arr)
	err := d.Decode(p)
	sort.Ints(p.Data)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(p)
}

func main() {
	http.HandleFunc("/sort_array", tomHandler)

	log.Println("Go!")

	http.ListenAndServe(":3004", nil)
}
