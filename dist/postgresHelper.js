'use strict';

System.register(['./utils'], function (_export, _context) {
  "use strict";

  var utils, getUrl, getQuery;
  return {
    setters: [function (_utils) {
      utils = _utils;
    }],
    execute: function () {
      _export('getUrl', getUrl = function getUrl(prodLine) {
        return utils.postgRestHost + 'equipment?site=eq.' + prodLine.site + '&area=eq.' + prodLine.area + '&production_line=eq.' + prodLine.production_line;
      });

      _export('getUrl', getUrl);

      _export('getQuery', getQuery = function getQuery(time) {
        return 'start_time=' + time;
      });

      _export('getQuery', getQuery);
    }
  };
});
//# sourceMappingURL=postgresHelper.js.map
