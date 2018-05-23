const URL = 'http://localhost:3001/api/v1'

//https://immense-beyond-33029.herokuapp.com/api/v1
export function signUp(username, password, location, history){
  return function(dispatch){
    fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username,password,location})
    })
    .then(res => res.json())
    .then(response => {
      localStorage.setItem("token", response.jwt)
      dispatch({
        type: "GET_USER_DATA",
        payload: response
      })
    })
    .then(()=> {
      history.push('/')
    })
  }
}

export function logIn(username, password, history){
  return function(dispatch){
    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username,password})
    })
    .then(res=> res.json())
    .then(response => {
      if (response.error){
        alert(response.error)
      } else {
        localStorage.setItem("token", response.jwt)
        dispatch({
          type: "GET_USER_DATA",
          payload: response
        })
      }

    })
    .then(()=> {
      history.push('/')
    })
  }
}

export function getUser(jwt, history){
  return function(dispatch){
    fetch(`${URL}/get_user`, {
      headers: {
        "Authorization": jwt
      }
    })
    .then(res => res.json())
    .then(response => {

      dispatch({
        type: "GET_USER_DATA",
        payload: response
      })
    })
  }
}

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOG_OUT'
    })
  }
}


export const fetchGroups = (id) => {
  return (dispatch) => {
    return fetch(`${URL}/users/${id}/groups`)
    .then(resp => resp.json())
    .then(result => {
      let payload = result
      dispatch({
        type: 'LOAD_GROUPS',
        payload

      })
    })
  }
}

export const fetchCrop = (cropID) => {
  return (dispatch) => {
    return fetch(`${URL}/crops/${cropID}`)
    .then(resp => resp.json())
    .then(result => {
      let payload = result
      dispatch({
        type: 'CHOOSE_CROP',
        payload
      })
    })
  }
}


export const fetchData = (groupID) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    })

    return fetch(`${URL}/groups/${groupID}/data`)
    .then(resp => resp.json())
    .then(result => {
      let payload = result
      dispatch({
        type: 'GET_DATA',
        payload
      })
    })


  }
}

export const addGroup = (group) => {
  return (dispatch) => {
    return fetch(`${URL}/groups`, {
        method: 'POST',
        headers: {Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          user_id: group.user_id,
          crop_id: group.crop_id,
          germination_days: group.germination_days,
          propagation_days: group.propagation_days,
          production_days: group.production_days,
          expected_harvest_lbs: group.expected_harvest_lbs,
          trays: group.trays,
          location: group.location

        })
      })
      .then(resp => resp.json())
      .then(result => {
        dispatch({
          type: 'ADD_GROUP',
          payload: result
        })
      })
    }
  }

  export const patchGroup = (group) => {
    return (dispatch) => {
      return fetch(`${URL}/groups/${group.id}`, {
          method: 'PATCH',
          headers: {Accept: 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            germination_days: group.germination_days,
            propagation_days: group.propagation_days,
            production_days: group.production_days
          })
        })
        .then(resp => resp.json())
        .then(result => {
          dispatch({
            type: 'PATCH_GROUP',
            payload: result
          })
        })
      }
    }

export const addReading = (reading) => {
  return (dispatch) => {
    return fetch(`${URL}/readings`, {
        method: 'POST',
        headers: {Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          ph: reading.ph,
          ec: reading.ec,
          group_id: reading.group_id
        })
      })
      .then(resp => resp.json())
      .then(result => {
        dispatch({
          type: 'ADD_READING',
          payload: result
        })
      })
    }
  }

  export const addTask = (task) => {
    return (dispatch) => {
      return fetch(`${URL}/tasks`, {
          method: 'POST',
          headers: {Accept: 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            group_id: task.group_id,
            crop_id: task.crop_id,
            due: task.due,
            content: task.content
          })
        })
        .then(resp => resp.json())
        .then(result => {
          dispatch({
            type: 'ADD_TASK',
            payload: result
          })
        })
      }
    }


    export const patchTask = (task) => {
      return (dispatch) => {
        return fetch(`${URL}/tasks/${task.id}`, {
            method: 'PATCH',
            headers: {Accept: 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              group_id: task.group_id,
              crop_id: task.crop_id,
              due: task.due,
              content: task.content,
              done: true
            })
          })
          .then(resp => resp.json())
          .then(result => {
            dispatch({
              type: 'PATCH_TASK',
              payload: result
            })
          })
        }
      }


      export const deleteTask = (task) => {
        return (dispatch) => {
          return fetch(`${URL}/tasks/${task.id}`, {
              method: 'DELETE',
              headers: {Accept: 'application/json',
              'Content-Type': 'application/json'
              }
            })
            .then(resp => resp.json())
            .then(result => {
              dispatch({
                type: 'DELETE_TASK',
                payload: result
              })
            })
          }
        }
