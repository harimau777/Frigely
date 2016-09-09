angular.module('fridgely.auth', [])
  .controller('AuthController', function($scope) {
		// login-stuff

    $scope.signUp = function() {
      if ($scope.validate()) {
        // process signup
        // forward
      }
    };

    $scope.login = function() {
      if ($scope.validate()) {
        // forward
      }
    };

    $scope.validate = function() {
      // verify username
      var username = $scope.username;
      var usernameIsValid = username !== undefined && username !== '';
      if (!usernameIsValid) {
        $scope.usernameMessage = 'Please enter a valid username.';
      } else {
        $scope.usernameMessage = '';
      }

      // verify password
      var password = $scope.password;
      var passwordIsValid = password !== undefined && password !== '';
      if (!passwordIsValid) {
        $scope.passwordMessage = 'Please enter a valid password.';
      } else {
        $scope.passwordMessage = '';
      }
         
      // confirm password
      var confirmpassword = $scope.confirmPassword;
      var confirmpasswordsMatch = confirmpassword === password;
      if (!confirmpasswordsMatch) {
        $scope.confirmpasswordMessage = 'Please retype the same password.';
      } else {
        $scope.confirmpasswordMessage = '';
      }

      return usernameIsValid && passwordIsValid && confirmpasswordsMatch;
    };
  });