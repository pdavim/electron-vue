// @ts-check

import { defineStore } from "pinia";
import axios from "axios";

export const googlenewsstore = defineStore({
  id: "googlenews",
  state: () => ({
    latestNews: null,
    query: "covid",
    pageNumber: "1",
    pageSize: "20",
    safeSearch: "false",
    autoCorrect: "false",
  }),

  getters: {},

  actions: {
    //get latest news
    getLatestNews() {
      axios({
        method: "GET",
        url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "a611b00886msh77f2d1161d08a19p1d5678jsn0fa1490821df",
        },
        params: {
          autoCorrect: this.autoCorrect,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          q: this.query,
          safeSearch: this.safeSearch,
        },
      })
        .then((response) => {
          console.log("getLatestNews ", response);
          this.latestNews = response;
        })
        .catch((error) => {
          console.log("getLatestNews error ", error);
        });
    },
  },
});
