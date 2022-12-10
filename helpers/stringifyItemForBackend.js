import { convertDifficultyToNumber } from './convertDifficulty'

export const createTrackForBackend = (item) => {
  let difficulty = convertDifficultyToNumber(item.difficulty)
  let coords = `${item.coords.x}, ${item.coords.y}`
  let lifts
  if (item.lifts) {
    lifts = item.lifts.map(item => item.id)
  }
  let connected_tracks
  if (item.connected_tracks) {
    connected_tracks = item.connected_tracks.map(item => item.id)
  }
  let status = convertStatusToNumber(item.status)
  const modified = {
    ...item,
    ...{ difficulty },
    ...{ coords },
    ...{ status },
    ...{ lifts },
    ...{ connected_tracks }
  }
  return modified
}

export const createLiftForBackend = (item) => {
  let status = convertStatusToNumber(item.status)
  let type
  if (item.type) {
    type = convertLiftTypeToNumber(item.type)
  }
  let coords = `${item.coords.x}, ${item.coords.y}`

  const modified = {
    ...item,
    ...{ status },
    ...{ type },
    ...{ coords },
  }
  return modified
}

export const convertStatusToNumber = (item) => {
  let status
  if (isNaN(item)) {
    switch (item) {
      case 'open':
        status = 1
        break
      case 'closed':
        status = 2
        break
      case 'maintanence':
        status = 3
        break
    }
  } else status = item
  return status
}

const convertLiftTypeToNumber = (item) => {
  if (!isNaN(item)) return item
  switch (item) {
    case 'ufo':
      return 1
    case 'flying carpet':
      return 2
    case 't-hook':
      return 3
    case 'chairlift':
      return 4
  }
}