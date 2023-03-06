/// <reference path="script.js" />
movieApp.factory("detailService", function ($http, $log) {
  return {
    getDetails: function (movie_id) {
      $http({
        method: "GET",
        url:
          "https://api.themoviedb.org/3/movie/" +
          movie_id +
          "?api_key=af9886f83a708b64ed6fdc586569c361",
      })
        .then(function (movieDetailResponse) { 
          $log.info(movieDetailResponse.data);
          return movieDetailResponse.data;
        })
        .catch(console.error);
    },
  };
});
