"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mqtt = _interopRequireWildcard(require("mqtt"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = uri => {
  return {
    send: (topic, msg, opts) => {
      const connectOpts = { ...{},
        ...opts.connectOpts
      };
      const subscribeOpts = { ...{},
        ...opts.subscribeOpts
      };
      const publishOpts = { ...{},
        ...opts.publishOpts
      };
      return new Promise((resolve, reject) => {
        const client = _mqtt.default.connect(uri, connectOpts);

        client.on("error", err => reject(err));
        client.on("connect", () => {
          client.subscribe(topic, subscribeOpts, (err, granted) => {
            if (err) {
              reject(err);
            }

            client.publish(topic, msg, publishOpts);
            resolve(client);
          });
        });
      });
    },
    receive: (topic, handler, opts) => {
      let connectOpts = { ...{},
        ...opts.connectOpts
      };
      let subscribeOpts = { ...{},
        ...opts.subscribeOpts
      };
      return new Promise((resolve, reject) => {
        const client = _mqtt.default.connect(uri, connectOpts);

        client.on("message", handler);
        client.on("connect", () => {
          client.subscribe(topic, subscribeOpts, (err, granted) => {
            if (err) {
              reject(err);
            }

            resolve(client);
          });
        });
      });
    }
  };
};

exports.default = _default;