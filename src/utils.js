import { appEvents } from 'app/core/core'

const hostname = window.location.hostname
export const postgRestHost = 'http://' + hostname + ':5436/'
export const influxHost = 'http://' + hostname + ':8086/'

export const post = (url, line) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.onreadystatechange = handleResponse
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onerror = e => reject(e)
    xhr.send(line)

    function handleResponse () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // console.log('200');
          resolve(xhr.responseText)
        } else if (xhr.status === 204) {
          // console.log('204');
          resolve(xhr.responseText)
        } else if (xhr.status === 201) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })
}

export const get = url => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onreadystatechange = handleResponse
    xhr.onerror = e => reject(e)
    xhr.send()

    function handleResponse () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = JSON.parse(xhr.responseText)
          resolve(res)
        } else {
          reject(this.statusText)
        }
      }
    }
  })
}

export const update = (url, line) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('PATCH', url)
    xhr.onreadystatechange = handleResponse
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onerror = e => reject(e)
    xhr.send(line)

    function handleResponse () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // console.log('200');
          resolve(xhr.responseText)
        } else if (xhr.status === 204) {
          // console.log('204');
          resolve(xhr.responseText)
        } else if (xhr.status === 201) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })
}

export const alert = (type, title, msg) => {
  appEvents.emit('alert-' + type, [title, msg])
}

export const showModal = (html, data) => {
  appEvents.emit('show-modal', {
    src: 'public/plugins/smart-factory-prod-line-time-setter-panel/partials/' + html,
    modalClass: 'confirm-modal',
    model: data
  })
}

export const mergeColsRows = (cols, rows) => {
  const result = []
  rows.forEach(row => {
    const obj = {}
    cols.forEach((col, index) => {
      obj[col.text] = row[index]
    })
    result.push(obj)
  })
  return result
}

export const findLine = (allData, site, area, line) => {
  return allData.filter(data => data.site === site && data.area === area && data.production_line === line)[0]
}
