'use strict';

System.register(['./utils', './postgresHelper'], function (_export, _context) {
  "use strict";

  var utils, postgres, _createClass, TimeSetterCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_utils) {
      utils = _utils;
    }, function (_postgresHelper) {
      postgres = _postgresHelper;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('TimeSetterCtrl', TimeSetterCtrl = function () {

        /** @ngInject */
        function TimeSetterCtrl(ctrl, data) {
          _classCallCheck(this, TimeSetterCtrl);

          this.panelCtrl = ctrl;
          this.panelCtrl.productionLine = data;
          this.panelCtrl.submit = this.submit();
          this.panelCtrl.initTimer = this.tryInitForm();
        }

        _createClass(TimeSetterCtrl, [{
          key: 'showForm',
          value: function showForm() {
            utils.showModal('setter_form.html', this.panelCtrl);
            this.panelCtrl.tryCount = 1;
          }
        }, {
          key: 'tryInitForm',
          value: function tryInitForm() {
            var _this = this;

            setTimeout(function () {
              try {
                _this.startInitForm();
              } catch (e) {
                if (_this.panelCtrl.tryCount < 15) {
                  _this.panelCtrl.tryCount++;
                  _this.tryInitForm();
                } else {
                  _this.closeForm();
                  utils.alert('error', 'Error', 'Form initialisation failed due to "' + e + '", please try agian');
                }
              }
            }, 200);
          }
        }, {
          key: 'startInitForm',
          value: function startInitForm() {
            $('#start-time-picker').timepicker({
              showMeridian: false,
              showSeconds: true,
              maxHours: 24,
              minuteStep: 1,
              secondStep: 1,
              defaultTime: this.panelCtrl.productionLine.start_time || '6:00:00',
              icons: {
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down'
              }
            });
          }
        }, {
          key: 'closeForm',
          value: function closeForm() {
            $('#prodLine-ts-form-close-btn').trigger('click');
          }
        }, {
          key: 'submit',
          value: function submit() {
            var _this2 = this;

            return function () {
              var site = _this2.panelCtrl.productionLine.site;
              var area = _this2.panelCtrl.productionLine.area;
              var line = _this2.panelCtrl.productionLine.production_line;
              var time = _this2.panelCtrl.productionLine.start_time;

              if (!_this2.isTimeValid(time)) {
                utils.alert('warning', 'Time Format Invalid', 'The Time Format is invvalid, please enter a valid time Format h:mm:ss');
                return;
              }

              var url = postgres.getUrl(_this2.panelCtrl.productionLine);
              var query = postgres.getQuery(time);

              utils.update(url, query).then(function (res) {
                _this2.closeForm();
                utils.alert('success', 'Successful', 'The start time for ' + site + ' | ' + area + ' | ' + line + ' has been set to ' + time);
                _this2.panelCtrl.timeSrv.refreshDashboard();
              }).catch(function (e) {
                _this2.closeForm();
                utils.alert('error', 'Error', 'Start time update failed due to "' + e + '", please try agian');
                _this2.panelCtrl.timeSrv.refreshDashboard();
              });
            };
          }
        }, {
          key: 'isTimeValid',
          value: function isTimeValid(time) {
            if (time === '') {
              return false;
            }
            var items = time.split(':');
            if (items.length !== 3) {
              return false;
            }
            return true;
          }
        }]);

        return TimeSetterCtrl;
      }());

      _export('TimeSetterCtrl', TimeSetterCtrl);
    }
  };
});
//# sourceMappingURL=time_setter_ctrl.js.map
