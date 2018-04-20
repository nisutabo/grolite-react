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
      return {...state, currentUser: action.payload.user, loggedIn: true, token: action.payload.jwt}



    case "LOG_OUT":
      localStorage.removeItem('token')
      return {...state, currentUser: null, loggedIn: false, token: ''}

    default:
      return {...state}
  }
}
