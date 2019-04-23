import * as utils from './utils'

export const getUrl = prodLine => {
  return (
    utils.postgRestHost +
    'equipment?site=eq.' +
    prodLine.site +
    '&area=eq.' +
    prodLine.area +
    '&production_line=eq.' +
    prodLine.production_line
  )
}

export const getQuery = (time) => {
  return 'start_time=' + time
}
