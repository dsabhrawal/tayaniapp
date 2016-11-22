'use strict';
/**
 * @ngdoc overview
 * @name TataniApp
 * @description
 * # tayaniApp
 *
 * Main module of the application.
 */
var app = angular
  .module('tayaniApp', [
    'oc.lazyLoad',
    'ui.router',
    'ngAnimate', 'ngSanitize',
    'ui.bootstrap',
    'angular-loading-bar',
    'toaster',
    'anguFixedHeaderTable', 'ngBootstrap.dateRangePicker','ngTable',
    'underscore','mwl.confirm'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/views/auth/login.html',
      controller: 'LoginCtrl',
      data: {
          requireLogin: false
        },
      resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'tayaniApp',
              files:[
                     'scripts/controllers/main.js',
                     'scripts/controllers/authentication.js',
                     'scripts/controllers/services.js'
              ]
            })
          }
        }
    })
     .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'templates/views/dashboard/main.html',
        data: {
            requireLogin: true
          },
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'tayaniApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        data: {
            requireLogin: true
          },
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'tayaniApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
  /*    .state('login',{
        templateUrl:'views/auth/login.html',
        url:'/login'
    })*/
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'tayaniApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
        /*.state('dashboard.diesel-inflow',{
            templateUrl:'views/diesel/inflow.html',
            url:'/diesel-inflow',
            controller: 'DieselCtrl',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'tayaniApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/controllers/dieselCtrl.js',
                            'scripts/controllers/services.js'
                        ]
                    })
                }
            }
        })*/
        /*.state('dashboard.diesel-outflow',{
            templateUrl:'views/diesel/outflow.html',
            url:'/diesel-outflow',
            controller: 'DieselCtrl',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'tayaniApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/controllers/dieselCtrl.js',
                            'scripts/controllers/services.js'
                        ]
                    })
                }
            }
        })*/
         .state('dashboard.diesel-transactions',{
            templateUrl:'views/diesel/transactions.html',
            url:'/diesel-transactions',
            controller: 'DieselCtrl',
            data: {
                requireLogin: true
              },
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'tayaniApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/controllers/dieselCtrl.js',
                            'scripts/controllers/services.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.diesel-configuration',{
            templateUrl:'views/diesel/config.html',
            url:'/diesel-configuration',
            controller: 'DieselConfigCtrl',
            data: {
                requireLogin: true
              },
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'tayaniApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/controllers/dieselCtrl.js',
                            'scripts/controllers/services.js'
                        ]
                    })
                }
            }
        })
          .state('dashboard.diesel-reports',{
            templateUrl:'views/diesel/reports.html',
            url:'/diesel-reports',
            controller: 'DieselReportController',
            data: {
                requireLogin: true
              },
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'chart.js',
                        files:[
                            'bower_components/angular-chart.js/dist/angular-chart.min.js',
                            'bower_components/angular-chart.js/dist/angular-chart.css'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name:'tayaniApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/controllers/dieselReportsCtrl.js',
                            'scripts/controllers/services.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.diesel-flow-report',{
            templateUrl:'views/diesel/reports_diesel_flow.html',
            url:'/diesel-flow',
            controller: 'DieselReportController',
            data: {
                requireLogin: true
              },
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'chart.js',
                        files:[
                            'bower_components/angular-chart.js/dist/angular-chart.min.js',
                            'bower_components/angular-chart.js/dist/angular-chart.css'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name:'tayaniApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/controllers/dieselReportsCtrl.js',
                            'scripts/controllers/services.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.diesel-firm-usages',{
            templateUrl:'views/diesel/reports_firm_usages.html',
            url:'/diesel-firm-usages',
            controller: 'DieselSaleFirmReportCtrl',
            data: {
                requireLogin: true
              },
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'chart.js',
                        files:[
                            'bower_components/angular-chart.js/dist/angular-chart.min.js',
                            'bower_components/angular-chart.js/dist/angular-chart.css'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name:'tayaniApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/controllers/dieselReportsCtrl.js',
                            'scripts/controllers/services.js'
                        ]
                    })
                }
            }
        })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }])
  .constant('APP_CONSTANTS', {
	  DATE_FORMAT : 'dd MMM yyyy',
	  INPUT_DATE_FORMAT : 'yyyy-MM-dd',
	  DIESEL_NEW_TRN_TAB : 1,
	  DIESEL_UPDATE_TRN_TAB : 2,
	  DIESEL_TRN_DATE_FRMT : 'MM/dd/yyyy'
  })
  .run(function ($rootScope, authService, $window, $templateCache) {
	
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
	 console.log(toState);
	 var currentUser = authService.getCurrentUser();
	 if ($window.sessionStorage["currentUser"]) {
		 currentUser = JSON.parse($window.sessionStorage["currentUser"]);
	}
    var requireLogin = toState.data.requireLogin;
    console.log(currentUser);
    console.log(requireLogin);
    if (requireLogin && (typeof currentUser === 'undefined' || currentUser == null)) {
    	event.preventDefault();
      // get me a login modal!
    }
  });
});