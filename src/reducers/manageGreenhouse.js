export default function manageGreenhouse (
  state = {
    crops: [],
    groups: [],
    crop: {},
    group: {},
    total_value: 0,
    loading: false,
    data: {}

  },
  action
) {
  switch (action.type) {

    case 'LOAD_GROUPS':
    return {
      ...state,
      crops: action.payload.crops,
      groups: action.payload.groups
    }

    case 'GET_USER_DATA':
    return {
      ...state,
      groups: action.payload.groups,
      crops: action.payload.crops,
      total_value: action.payload.total_value
    }

    case 'LOADING':
    return {
      ...state,
      loading: !state.loading
    }

    case 'ADD_GROUP':
    return {
      ...state,
      groups: [...state.groups, action.payload]
    }

    case 'GET_DATA':
    return {
      ...state,
      data: action.payload.data,
      crop: action.payload.crop,
      group: action.payload.group,
      loading: !state.loading
    }
    case 'ADD_READING':
    return {
      ...state,
      data: {...state.data, readings: [...state.data.readings, action.payload]}
    }
    case 'ADD_TASK':
    let tasks = [...state.data.tasks, action.payload]
    return {
      ...state,
      data: {...state.data, tasks: tasks}
    }
    case 'PATCH_TASK':
     let id = action.payload.id
     let task = state.data.tasks.find(task => parseInt(task.id, 10) === parseInt(id, 10))
     let index = state.data.tasks.indexOf(task)
     task.done = true
     let newTasks = state.data.tasks.slice()
     newTasks[index] = task
    return {
      ...state,
      data: {...state.data, tasks: newTasks}
    }

    default:
    return state
  }

}
