'use strict';

System.register(['app/core/core'], function (_export, _context) {
  "use strict";

  var appEvents, hostname, postgRestHost, influxHost, post, remove, get, update, alert, showModal, showModalWithScope, spaceCheck, mergeColsRows, findLine;
  return {
    setters: [function (_appCoreCore) {
      appEvents = _appCoreCore.appEvents;
    }],
    execute: function () {
      hostname = window.location.hostname;

      _export('postgRestHost', postgRestHost = 'http://' + hostname + ':5436/');

      _export('postgRestHost', postgRestHost);

      _export('influxHost', influxHost = 'http://' + hostname + ':8086/');

      _export('influxHost', influxHost);

      _export('post', post = function post(url, line) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          xhr.onreadystatechange = handleResponse;
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onerror = function (e) {
            return reject(e);
          };
          xhr.send(line);

          function handleResponse() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                // console.log('200');
                resolve(xhr.responseText);
              } else if (xhr.status === 204) {
                // console.log('204');
                resolve(xhr.responseText);
              } else if (xhr.status === 201) {
                resolve(xhr.responseText);
              } else {
                reject(xhr.responseText);
              }
            }
          }
        });
      });

      _export('post', post);

      _export('remove', remove = function remove(url) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('DELETE', url);
          xhr.onreadystatechange = handleResponse;
          xhr.onerror = function (e) {
            return reject(e);
          };
          xhr.send();

          function handleResponse() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                // console.log('200');
                resolve(xhr.responseText);
              } else if (xhr.status === 204) {
                // console.log('204');
                resolve(xhr.responseText);
              } else {
                reject(this.statusText);
              }
            }
          }
        });
      });

      _export('remove', remove);

      _export('get', get = function get(url) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onreadystatechange = handleResponse;
          xhr.onerror = function (e) {
            return reject(e);
          };
          xhr.send();

          function handleResponse() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                var res = JSON.parse(xhr.responseText);
                resolve(res);
              } else {
                reject(this.statusText);
              }
            }
          }
        });
      });

      _export('get', get);

      _export('update', update = function update(url, line) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('PATCH', url);
          xhr.onreadystatechange = handleResponse;
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onerror = function (e) {
            return reject(e);
          };
          xhr.send(line);

          function handleResponse() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                // console.log('200');
                resolve(xhr.responseText);
              } else if (xhr.status === 204) {
                // console.log('204');
                resolve(xhr.responseText);
              } else if (xhr.status === 201) {
                resolve(xhr.responseText);
              } else {
                reject(xhr.responseText);
              }
            }
          }
        });
      });

      _export('update', update);

      _export('alert', alert = function alert(type, title, msg) {
        appEvents.emit('alert-' + type, [title, msg]);
      });

      _export('alert', alert);

      _export('showModal', showModal = function showModal(html, data) {
        appEvents.emit('show-modal', {
          src: 'public/plugins/smart-factory-prod-line-time-setter-panel/partials/' + html,
          modalClass: 'confirm-modal',
          model: data
        });
      });

      _export('showModal', showModal);

      _export('showModalWithScope', showModalWithScope = function showModalWithScope(ctrl, scope, html) {
        ctrl.publishAppEvent('show-modal', {
          src: 'public/plugins/smart-factory-prod-line-time-setter-panel/partials/' + html,
          modalClass: 'confirm-modal',
          scope: scope
        });
      });

      _export('showModalWithScope', showModalWithScope);

      _export('spaceCheck', spaceCheck = function spaceCheck(str) {
        if (str[str.length - 1] === ' ') {
          str = str.slice(0, -1);
          return spaceCheck(str);
        }
        return str;
      });

      _export('spaceCheck', spaceCheck);

      _export('mergeColsRows', mergeColsRows = function mergeColsRows(cols, rows) {
        var result = [];
        rows.forEach(function (row) {
          var obj = {};
          cols.forEach(function (col, index) {
            obj[col.text] = row[index];
          });
          result.push(obj);
        });
        return result;
      });

      _export('mergeColsRows', mergeColsRows);

      _export('findLine', findLine = function findLine(allData, site, area, line) {
        return allData.filter(function (data) {
          return data.site === site && data.area === area && data.production_line === line;
        })[0];
      });

      _export('findLine', findLine);
    }
  };
});
//# sourceMappingURL=utils.js.map
