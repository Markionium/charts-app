  import { Subject } from 'rxjs';

  export const authSubject$ = new Subject();
  
  /***** START BOILERPLATE CODE: Load client library, authorize user. *****/

  // Global variables for GoogleAuth object, auth status.
  var GoogleAuth;
  var isAuthorized;

  /**
   * Load the API's client and auth2 modules.
   * Call the initClient function after the modules load.
   */
  function handleClientLoad() {
      return new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
            initClient()
                .then(resolve)
                .catch(reject);
        });
      });
  }

  function initClient() {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes

    return gapi.auth2.init({
        'clientId': '565877926053-ksuj1kmkm9jtundmdhnravb5te5tnta0.apps.googleusercontent.com',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        'scope': 'https://www.googleapis.com/auth/youtube.readonly'
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      return setSigninStatus();
    })
    .then(() => {
      if (isAuthorized) {
        return Promise.resolve();
      }
      return Promise.reject();
    });
  }

  function handleAuthClick(event) {
    // Sign user in after click on auth button.
    GoogleAuth.signIn();
  }

  function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.readonly');
    
    console.log(isAuthorized);
    // Toggle button text and displayed statement based on current auth status.
    if (isAuthorized) {
        console.log('Ready to request data!');
        return Promise.resolve();
    } else {
        console.log('Requesting permission!');
        return Promise.reject();
    }
  }

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();

    if (isSignedIn) {
      authSubject.next(GoogleAuth.currentUser.get());
    }
  }

  function createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
      var value = properties[p];
      if (p && p.substr(-2, 2) == '[]') {
        var adjustedName = p.replace('[]', '');
        if (value) {
          normalizedProps[adjustedName] = value.split(',');
        }
        delete normalizedProps[p];
      }
    }
    for (var p in normalizedProps) {
      // Leave properties that don't have values out of inserted resource.
      if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
        var propArray = p.split('.');
        var ref = resource;
        for (var pa = 0; pa < propArray.length; pa++) {
          var key = propArray[pa];
          if (pa == propArray.length - 1) {
            ref[key] = normalizedProps[p];
          } else {
            ref = ref[key] = ref[key] || {};
          }
        }
      };
    }
    return resource;
  }

  function removeEmptyParams(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
  }

  function executeRequest(request) {
    return new Promise((resolve, reject) => {
      request.execute(function(response) {
        resolve(response);
      });
    });
  }

  function buildApiRequest(requestMethod, path, params, properties) {
    params = removeEmptyParams(params);
    var request;
    if (properties) {
      var resource = createResource(properties);
      request = gapi.client.request({
          'body': resource,
          'method': requestMethod,
          'path': path,
          'params': params
      });
    } else {
      request = gapi.client.request({
          'method': requestMethod,
          'path': path,
          'params': params
      });
    }
    return executeRequest(request);
  }

  /***** END BOILERPLATE CODE *****/

  
  function defineRequest(query) {
    // See full sample for buildApiRequest() code, which is not 
// specific to a particular API or API method.

return buildApiRequest('GET',
                '/youtube/v3/search',
                {'maxResults': '10',
                 'part': 'snippet',
                 'q': query,
                 'type': 'video'});

  }

// <button id="execute-request-button">Authorize</button>

// <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
// <script async defer src="https://apis.google.com/js/api.js" 
//         onload="this.onload=function(){};handleClientLoad()" 
//         onreadystatechange="if (this.readyState === 'complete') this.onload()">
// </script>

export function askForGooglePermission() {
    return handleClientLoad();
}

export function searchYouTubeFor(searchValue) {
    return defineRequest(searchValue);
}

export function checkIfAuthorized() {
  if (!GoogleAuth) {
    return false;
  }
  GoogleAuth = gapi.auth2.getAuthInstance();
  var user = GoogleAuth.currentUser.get();

  if (user) {

  }

  return user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.readonly');
}

export function handleLogin() {
  return GoogleAuth.signIn().then((googleAccount) => console.log("account", googleAccount));
}