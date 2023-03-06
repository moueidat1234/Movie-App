/// <reference path="angular.min.js" />
/// <reference path="angular-route.min.js" />

var movieApp = angular
  .module("movieModule", ["ngRoute"])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "html/home.html",
        controller: "movieController",
      })
      .when("/movie-details", {
        templateUrl: "html/movieDetails.html",
        controller: "movieDetailsController",
      })
      .when("/movie-details/:id", {
        templateUrl: "html/movieDetails.html",
        controller: "movieDetailsController",
      })
      .otherwise({
        redirectTo: "/home",
      });
    $locationProvider.html5Mode(true);
  })
  .controller(
    "movieController",
    function ($scope, $http, $log, $location, $anchorScroll, detailService) {
      $scope.scrollTo = function (scrollLocation) {
        $location.hash(scrollLocation);
        $anchorScroll();
      };
      $scope.homeComponent = "html/home.html";
      $scope.movieDetailComponent = "movieDetails.html";

      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=af9886f83a708b64ed6fdc586569c361",
      }).then(function (response) {
        $scope.topRatedMovies = response.data.results;
      });
    
  
  
    }
  )
  .controller(
    "movieDetailsController",
    function ($scope, $http, $log, $routeParams) {
      $http({
        params: { id: $routeParams.id },
        url:
          "https://api.themoviedb.org/3/movie/" +
          $routeParams.id +
          "?api_key=af9886f83a708b64ed6fdc586569c361",
        method: "GET",
      }).then(function (response) {
        $scope.movieDetail = response.data;
        $log.info($scope.movieDetail);
      });
      $http({
        params: { id: $routeParams.id },
        url:
          "https://api.themoviedb.org/3/movie/" +
          $routeParams.id +
          "/keywords?api_key=af9886f83a708b64ed6fdc586569c361",
        method: "GET",
      }).then(function (response) {
        $scope.movieTags = response.data.keywords;
        $log.info($scope.movieTags);
      });
 
     
    }
  );
