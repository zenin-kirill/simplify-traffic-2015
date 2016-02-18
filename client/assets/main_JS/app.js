(function() {
    'use strict';

    //Indentation: Reindent lines 

    var appModule = angular.module('application', [
        'ngResource',
        'ui.router',
        'ngAnimate',

        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
        ])
    
    .config(config)
    .run(run)

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];



    function config($urlProvider, $locationProvider, $httpProvider) 
    {
        $httpProvider.defaults.headers.get = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.delete = {};

        $httpProvider.defaults.headers.get['Token'] = '12345';
        $httpProvider.defaults.headers.put['Token'] = '12345';
        $httpProvider.defaults.headers.post['Token'] = '12345';
        $httpProvider.defaults.headers.delete['Token'] = '12345';

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';

        $urlProvider.otherwise('/');

        $locationProvider.html5Mode(
        {
            enabled:false,
            requireBase: false
        });

        $locationProvider.hashPrefix('!');
    }



    function indexOfObjByVal(array, property, value) 
    {
        if (array instanceof Array)
        {
            for (var i = 0; i < array.length; i++)
            if (array[i][property] == value)
                return i;
        }
        else
            return null;
    }

    function selectObj($scope, obj)
    {
        return $scope.selectedObj = obj;
    }


    function run() {
        FastClick.attach(document.body);
    }