export default function manageUsers (
  state = {
  loggedIn: false,
  currentUser: {},
  token: ''
  },
  action
){
  switch(action.type){

    case "GET_USER_DATA":
      return {currentUser: action.payload.user, loggedIn: true, token: action.payload.jwt}



    case "LOG_OUT":
      localStorage.removeItem('token')
      return {currentUser: null, loggedIn: false, token: ''}

    default:
      return {...state}
  }
}
