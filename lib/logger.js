var logger = exports;
logger.debugLevel = 'info';

logger.log = function(level, message) {
  var levels = ['error', 'warn', 'info'];
  if (levels.indexOf(level) >= levels.indexOf(logger.debugLevel)) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    if (process.env.DEBUG_OMISE === 'true') {
      console.log([level, ': ', message].join(''));
    }
  }
};
