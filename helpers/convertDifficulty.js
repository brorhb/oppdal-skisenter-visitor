export const convertDifficultyToNumber = (difficulty) => {
  if (!isNaN(difficulty)) return difficulty
  let num
  switch (difficulty) {
    case 'beginner':
      num = 1
      break;
    case 'intermediate':
      num = 2
      break;
    case 'advanced':
      num = 3
      break;
    case 'expert':
      num = 4
      break;
    case 'professional':
      num = 5
      break;
    case 'not rated':
      num = 6
      break;
    case 'terrainpark':
      num = 7
      break;
    default:
      num = 6
      break;
  }
  return num
}