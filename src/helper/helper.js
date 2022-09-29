import VueJwtDecode from 'vue-jwt-decode'

export function getUsernameByToken(token) {

    var descode = VueJwtDecode.decode(token)
      return descode['cognito:username'];
}