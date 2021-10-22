!(function t(e, r, n) {
  function i(a, s) {
    if (!r[a]) {
      if (!e[a]) {
        var f = 'function' == typeof require && require;
        if (!s && f) return f(a, !0);
        if (o) return o(a, !0);
        var u = new Error("Cannot find module '" + a + "'");
        throw ((u.code = 'MODULE_NOT_FOUND'), u);
      }
      var c = (r[a] = { exports: {} });
      e[a][0].call(
        c.exports,
        function (t) {
          return i(e[a][1][t] || t);
        },
        c,
        c.exports,
        t,
        e,
        r,
        n
      );
    }
    return r[a].exports;
  }
  for (var o = 'function' == typeof require && require, a = 0; a < n.length; a++) i(n[a]);
  return i;
})(
  {
    1: [
      function (t, e, r) {
        'use strict';
        var n = t('@babel/runtime/helpers/interopRequireDefault');
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.setupMultiplex = function (t) {
            const e = new i.default();
            return (
              (0, o.default)(t, e, t, (t) => {
                t && console.error(t);
              }),
              e
            );
          });
        var i = n(t('obj-multiplex')),
          o = n(t('pump'));
      },
      { '@babel/runtime/helpers/interopRequireDefault': 5, 'obj-multiplex': 94, pump: 98 },
    ],
    2: [
      function (t, e, r) {
        'use strict';
        var n = t('@babel/runtime/helpers/interopRequireDefault');
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.sufficientBalance = function (t, e) {
            i.strict.equal(typeof e, 'string', 'sufficientBalance - hexBalance is not a hex string'),
              i.strict.equal(e.slice(0, 2), '0x', 'sufficientBalance - hexBalance is not a hex string');
            const r = h(e),
              n = h(t.value),
              o = h(t.gas),
              a = h(t.gasPrice),
              s = n.add(o.mul(a));
            return r.gte(s);
          }),
          (r.hexToBn = h),
          (r.BnMultiplyByFraction = function (t, e, r) {
            const n = new s.default(e),
              i = new s.default(r);
            return t.mul(n).div(i);
          }),
          (r.checkForError = function () {
            const { lastError: t } = o.default.runtime;
            if (!t) return;
            if (t.stack && t.message) return t;
            return new Error(t.message);
          }),
          (r.bnToHex = function (t) {
            return d(t.toString(16));
          }),
          (r.addHexPrefix = r.getEnvironmentType = r.getPlatform = void 0);
        var i = t('assert'),
          o = n(t('extensionizer')),
          a = t('ethereumjs-util'),
          s = n(t('bn.js')),
          f = t('lodash'),
          u = t('../../../shared/constants/app');
        const c = (0, f.memoize)((t) => {
          const e = new URL(t);
          return '/popup.html' === e.pathname
            ? u.ENVIRONMENT_TYPE_POPUP
            : ['/home.html', '/phishing.html'].includes(e.pathname)
            ? u.ENVIRONMENT_TYPE_FULLSCREEN
            : '/notification.html' === e.pathname
            ? u.ENVIRONMENT_TYPE_NOTIFICATION
            : u.ENVIRONMENT_TYPE_BACKGROUND;
        });
        r.getEnvironmentType = (t = window.location.href) => c(t);
        function h(t) {
          return new s.default((0, a.stripHexPrefix)(t), 16);
        }
        r.getPlatform = (t) => {
          const e = window.navigator.userAgent;
          return -1 === e.search('Firefox')
            ? window && window.chrome && window.chrome.ipcRenderer
              ? u.PLATFORM_BRAVE
              : -1 !== e.search('Edge')
              ? u.PLATFORM_EDGE
              : -1 !== e.search('OPR')
              ? u.PLATFORM_OPERA
              : u.PLATFORM_CHROME
            : u.PLATFORM_FIREFOX;
        };
        const d = (t) =>
          'string' != typeof t || t.match(/^-?0x/u)
            ? t
            : t.match(/^-?0X/u)
            ? t.replace('0X', '0x')
            : t.startsWith('-')
            ? t.replace('-', '-0x')
            : '0x' + t;
        r.addHexPrefix = d;
      },
      {
        '../../../shared/constants/app': 138,
        '@babel/runtime/helpers/interopRequireDefault': 5,
        assert: 13,
        'bn.js': 15,
        'ethereumjs-util': 56,
        extensionizer: 64,
        lodash: 90,
      },
    ],
    3: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var r = t('@babel/runtime/helpers/interopRequireDefault'),
            n = r(t('querystring')),
            i = r(t('extension-port-stream')),
            o = r(t('extensionizer')),
            a = r(t('../../shared/modules/random-id')),
            s = t('./lib/stream-utils'),
            f = t('./lib/util'),
            u = r(t('./platforms/extension'));
          document.addEventListener('DOMContentLoaded', function () {
            const t = window.location.hash.substring(1),
              r = n.default.parse(t);
            (document.getElementById('csdbLink').href = 'https://cryptoscamdb.org/search'),
              (e.platform = new u.default());
            const c = o.default.runtime.connect({ name: (0, f.getEnvironmentType)() }),
              h = new i.default(c),
              d = (0, s.setupMultiplex)(h).createStream('controller');
            document.getElementById('unsafe-continue').addEventListener('click', () => {
              d.write({ jsonrpc: '2.0', method: 'safelistPhishingDomain', params: [r.hostname], id: (0, a.default)() }),
                (window.location.href = r.href);
            });
          });
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      {
        '../../shared/modules/random-id': 140,
        './lib/stream-utils': 1,
        './lib/util': 2,
        './platforms/extension': 4,
        '@babel/runtime/helpers/interopRequireDefault': 5,
        'extension-port-stream': 62,
        extensionizer: 64,
        querystring: 101,
      },
    ],
    4: [
      function (t, e, r) {
        'use strict';
        var n = t('@babel/runtime/helpers/interopRequireDefault');
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
        var i = n(t('extensionizer')),
          o = t('@metamask/etherscan-link'),
          a = t('../lib/util'),
          s = t('../../../shared/constants/app'),
          f = t('../../../shared/constants/transaction');
        r.default = class {
          reload() {
            i.default.runtime.reload();
          }
          openTab(t) {
            return new Promise((e, r) => {
              i.default.tabs.create(t, (t) => {
                const n = (0, a.checkForError)();
                return n ? r(n) : e(t);
              });
            });
          }
          openWindow(t) {
            return new Promise((e, r) => {
              i.default.windows.create(t, (t) => {
                const n = (0, a.checkForError)();
                return n ? r(n) : e(t);
              });
            });
          }
          focusWindow(t) {
            return new Promise((e, r) => {
              i.default.windows.update(t, { focused: !0 }, () => {
                const t = (0, a.checkForError)();
                return t ? r(t) : e();
              });
            });
          }
          updateWindowPosition(t, e, r) {
            return new Promise((n, o) => {
              i.default.windows.update(t, { left: e, top: r }, () => {
                const t = (0, a.checkForError)();
                return t ? o(t) : n();
              });
            });
          }
          getLastFocusedWindow() {
            return new Promise((t, e) => {
              i.default.windows.getLastFocused((r) => {
                const n = (0, a.checkForError)();
                return n ? e(n) : t(r);
              });
            });
          }
          closeCurrentWindow() {
            return i.default.windows.getCurrent((t) => i.default.windows.remove(t.id));
          }
          getVersion() {
            return i.default.runtime.getManifest().version;
          }
          openExtensionInBrowser(t = null, e = null) {
            let r = i.default.runtime.getURL('home.html');
            e && (r += '?' + e),
              t && (r += '#' + t),
              this.openTab({ url: r }),
              (0, a.getEnvironmentType)() !== s.ENVIRONMENT_TYPE_BACKGROUND && window.close();
          }
          getPlatformInfo(t) {
            try {
              i.default.runtime.getPlatformInfo((e) => {
                t(null, e);
              });
            } catch (e) {
              return void t(e);
            }
          }
          showTransactionNotification(t, e) {
            const { status: r, txReceipt: { status: n } = {} } = t;
            r === f.TRANSACTION_STATUSES.CONFIRMED
              ? '0x0' === n
                ? this._showFailedTransaction(t, 'Transaction encountered an error.')
                : this._showConfirmedTransaction(t, e)
              : r === f.TRANSACTION_STATUSES.FAILED && this._showFailedTransaction(t);
          }
          getAllWindows() {
            return new Promise((t, e) => {
              i.default.windows.getAll((r) => {
                const n = (0, a.checkForError)();
                return n ? e(n) : t(r);
              });
            });
          }
          getActiveTabs() {
            return new Promise((t, e) => {
              i.default.tabs.query({ active: !0 }, (r) => {
                const n = (0, a.checkForError)();
                return n ? e(n) : t(r);
              });
            });
          }
          currentTab() {
            return new Promise((t, e) => {
              i.default.tabs.getCurrent((r) => {
                const n = (0, a.checkForError)();
                n ? e(n) : t(r);
              });
            });
          }
          switchToTab(t) {
            return new Promise((e, r) => {
              i.default.tabs.update(t, { highlighted: !0 }, (t) => {
                const n = (0, a.checkForError)();
                n ? r(n) : e(t);
              });
            });
          }
          closeTab(t) {
            return new Promise((e, r) => {
              i.default.tabs.remove(t, () => {
                const t = (0, a.checkForError)();
                t ? r(t) : e();
              });
            });
          }
          _showConfirmedTransaction(t, e) {
            this._subscribeToNotificationClicked();
            const r = (0, o.getBlockExplorerLink)(t, e),
              n = `Transaction ${parseInt(t.txParams.nonce, 16)} confirmed! ${r.length ? 'View on Etherscan' : ''}`;
            this._showNotification('Confirmed transaction', n, r);
          }
          _showFailedTransaction(t, e) {
            const r = `Transaction ${parseInt(t.txParams.nonce, 16)} failed! ${e || t.err.message}`;
            this._showNotification('Failed transaction', r);
          }
          _showNotification(t, e, r) {
            i.default.notifications.create(r, {
              type: 'basic',
              title: t,
              iconUrl: i.default.extension.getURL('../../images/icon-64.png'),
              message: e,
            });
          }
          _subscribeToNotificationClicked() {
            i.default.notifications.onClicked.hasListener(this._viewOnEtherscan) ||
              i.default.notifications.onClicked.addListener(this._viewOnEtherscan);
          }
          _viewOnEtherscan(t) {
            t.startsWith('https://') && i.default.tabs.create({ url: t });
          }
        };
      },
      {
        '../../../shared/constants/app': 138,
        '../../../shared/constants/transaction': 139,
        '../lib/util': 2,
        '@babel/runtime/helpers/interopRequireDefault': 5,
        '@metamask/etherscan-link': 9,
        extensionizer: 64,
      },
    ],
    5: [
      function (t, e, r) {
        e.exports = function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      },
      {},
    ],
    6: [
      function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getAccountLink = r.createCustomAccountLink = r.createAccountLinkForChain = r.createAccountLink = void 0);
        const i = t('./helpers'),
          o = n(t('./prefix-for-chain')),
          a = n(t('./prefix-for-network'));
        function s(t, e) {
          const r = a.default(e);
          return null === r ? '' : `https://${r}etherscan.io/address/${t}`;
        }
        function f(t, e) {
          const r = o.default(e);
          return null === r ? '' : `https://${r}etherscan.io/address/${t}`;
        }
        function u(t, e) {
          return i.addPathToUrl(e, 'address', t);
        }
        (r.createAccountLink = s),
          (r.createAccountLinkForChain = f),
          (r.createCustomAccountLink = u),
          (r.getAccountLink = function (t, e, r = {}, n = '') {
            return r.blockExplorerUrl ? u(t, r.blockExplorerUrl) : n ? s(t, n) : f(t, e);
          });
      },
      { './helpers': 8, './prefix-for-chain': 10, './prefix-for-network': 11 },
    ],
    7: [
      function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getBlockExplorerLink =
            r.createExplorerLinkForChain =
            r.createExplorerLink =
            r.createCustomExplorerLink =
              void 0);
        const i = t('./helpers'),
          o = n(t('./prefix-for-chain')),
          a = n(t('./prefix-for-network'));
        function s(t, e) {
          return i.addPathToUrl(e, 'tx', t);
        }
        function f(t, e) {
          const r = a.default(e);
          return null === r ? '' : `https://${r}etherscan.io/tx/${t}`;
        }
        function u(t, e) {
          const r = o.default(e);
          return null === r ? '' : `https://${r}etherscan.io/tx/${t}`;
        }
        (r.createCustomExplorerLink = s),
          (r.createExplorerLink = f),
          (r.createExplorerLinkForChain = u),
          (r.getBlockExplorerLink = function (t, e = {}) {
            return e.blockExplorerUrl
              ? s(t.hash, e.blockExplorerUrl)
              : t.chainId
              ? u(t.hash, t.chainId)
              : f(t.hash, t.metamaskNetworkId);
          });
      },
      { './helpers': 8, './prefix-for-chain': 10, './prefix-for-network': 11 },
    ],
    8: [
      function (t, e, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.addPathToUrl = void 0),
          (r.addPathToUrl = (t, e, r) => {
            const { username: n, password: i, protocol: o, host: a, pathname: s, search: f, hash: u } = new URL(t),
              c = s.endsWith('/') ? `${s}${e}/${r}` : `${s}/${e}/${r}`;
            return new URL(`${o}//${n ? `${n}:${i}` : ''}${a}${c}${f}${u}`).toString();
          });
      },
      {},
    ],
    9: [
      function (t, e, r) {
        'use strict';
        const n = t('./account-link'),
          i = t('./explorer-link'),
          o = t('./token-tracker-link');
        e.exports = {
          createExplorerLink: i.createExplorerLink,
          createCustomExplorerLink: i.createCustomExplorerLink,
          createExplorerLinkForChain: i.createExplorerLinkForChain,
          createAccountLink: n.createAccountLink,
          createCustomAccountLink: n.createCustomAccountLink,
          createAccountLinkForChain: n.createAccountLinkForChain,
          createTokenTrackerLink: o.createTokenTrackerLink,
          createCustomTokenTrackerLink: o.createCustomTokenTrackerLink,
          createTokenTrackerLinkForChain: o.createTokenTrackerLinkForChain,
          getBlockExplorerLink: i.getBlockExplorerLink,
          getAccountLink: n.getAccountLink,
          getTokenTrackerLink: o.getTokenTrackerLink,
        };
      },
      { './account-link': 6, './explorer-link': 7, './token-tracker-link': 12 },
    ],
    10: [
      function (t, e, r) {
        'use strict';
        e.exports = function (t) {
          let e;
          switch (t) {
            case '0x1':
              e = '';
              break;
            case '0x3':
              e = 'ropsten.';
              break;
            case '0x4':
              e = 'rinkeby.';
              break;
            case '0x5':
              e = 'goerli.';
              break;
            case '0x2a':
              e = 'kovan.';
              break;
            default:
              e = null;
          }
          return e;
        };
      },
      {},
    ],
    11: [
      function (t, e, r) {
        'use strict';
        e.exports = function (t) {
          let e;
          switch (parseInt(t)) {
            case 1:
              e = '';
              break;
            case 3:
              e = 'ropsten.';
              break;
            case 4:
              e = 'rinkeby.';
              break;
            case 5:
              e = 'goerli.';
              break;
            case 42:
              e = 'kovan.';
              break;
            default:
              e = null;
          }
          return e;
        };
      },
      {},
    ],
    12: [
      function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.getTokenTrackerLink =
            r.createTokenTrackerLinkForChain =
            r.createCustomTokenTrackerLink =
            r.createTokenTrackerLink =
              void 0);
        const i = t('./helpers'),
          o = n(t('./prefix-for-chain')),
          a = n(t('./prefix-for-network'));
        function s(t, e, r) {
          const n = a.default(e);
          return null === n ? '' : `https://${n}etherscan.io/token/${t}${r ? '?a=' + r : ''}`;
        }
        function f(t, e) {
          return i.addPathToUrl(e, 'token', t);
        }
        function u(t, e, r) {
          const n = o.default(e);
          return null === n ? '' : `https://${n}etherscan.io/token/${t}${r ? '?a=' + r : ''}`;
        }
        (r.createTokenTrackerLink = s),
          (r.createCustomTokenTrackerLink = f),
          (r.createTokenTrackerLinkForChain = u),
          (r.getTokenTrackerLink = function (t, e, r, n, i = {}) {
            return i.blockExplorerUrl ? f(t, i.blockExplorerUrl) : r ? s(t, r, n) : u(t, e, n);
          });
      },
      { './helpers': 8, './prefix-for-chain': 10, './prefix-for-network': 11 },
    ],
    13: [
      function (t, e, r) {
        (function (r) {
          'use strict';
          var n = t('object-assign');
          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
           * @license  MIT
           */ function i(t, e) {
            if (t === e) return 0;
            for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
              if (t[i] !== e[i]) {
                (r = t[i]), (n = e[i]);
                break;
              }
            return r < n ? -1 : n < r ? 1 : 0;
          }
          function o(t) {
            return r.Buffer && 'function' == typeof r.Buffer.isBuffer
              ? r.Buffer.isBuffer(t)
              : !(null == t || !t._isBuffer);
          }
          var a = t('util/'),
            s = Object.prototype.hasOwnProperty,
            f = Array.prototype.slice,
            u = 'foo' === function () {}.name;
          function c(t) {
            return Object.prototype.toString.call(t);
          }
          function h(t) {
            return (
              !o(t) &&
              'function' == typeof r.ArrayBuffer &&
              ('function' == typeof ArrayBuffer.isView
                ? ArrayBuffer.isView(t)
                : !!t && (t instanceof DataView || !!(t.buffer && t.buffer instanceof ArrayBuffer)))
            );
          }
          var d = (e.exports = g),
            l = /\s*function\s+([^\(\s]*)\s*/;
          function p(t) {
            if (a.isFunction(t)) {
              if (u) return t.name;
              var e = t.toString().match(l);
              return e && e[1];
            }
          }
          function b(t, e) {
            return 'string' == typeof t ? (t.length < e ? t : t.slice(0, e)) : t;
          }
          function m(t) {
            if (u || !a.isFunction(t)) return a.inspect(t);
            var e = p(t);
            return '[Function' + (e ? ': ' + e : '') + ']';
          }
          function v(t, e, r, n, i) {
            throw new d.AssertionError({ message: r, actual: t, expected: e, operator: n, stackStartFunction: i });
          }
          function g(t, e) {
            t || v(t, !0, e, '==', d.ok);
          }
          function y(t, e, r, n) {
            if (t === e) return !0;
            if (o(t) && o(e)) return 0 === i(t, e);
            if (a.isDate(t) && a.isDate(e)) return t.getTime() === e.getTime();
            if (a.isRegExp(t) && a.isRegExp(e))
              return (
                t.source === e.source &&
                t.global === e.global &&
                t.multiline === e.multiline &&
                t.lastIndex === e.lastIndex &&
                t.ignoreCase === e.ignoreCase
              );
            if ((null !== t && 'object' == typeof t) || (null !== e && 'object' == typeof e)) {
              if (h(t) && h(e) && c(t) === c(e) && !(t instanceof Float32Array || t instanceof Float64Array))
                return 0 === i(new Uint8Array(t.buffer), new Uint8Array(e.buffer));
              if (o(t) !== o(e)) return !1;
              var s = (n = n || { actual: [], expected: [] }).actual.indexOf(t);
              return (
                (-1 !== s && s === n.expected.indexOf(e)) ||
                (n.actual.push(t),
                n.expected.push(e),
                (function (t, e, r, n) {
                  if (null == t || null == e) return !1;
                  if (a.isPrimitive(t) || a.isPrimitive(e)) return t === e;
                  if (r && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e)) return !1;
                  var i = w(t),
                    o = w(e);
                  if ((i && !o) || (!i && o)) return !1;
                  if (i) return (t = f.call(t)), (e = f.call(e)), y(t, e, r);
                  var s,
                    u,
                    c = x(t),
                    h = x(e);
                  if (c.length !== h.length) return !1;
                  for (c.sort(), h.sort(), u = c.length - 1; u >= 0; u--) if (c[u] !== h[u]) return !1;
                  for (u = c.length - 1; u >= 0; u--) if (((s = c[u]), !y(t[s], e[s], r, n))) return !1;
                  return !0;
                })(t, e, r, n))
              );
            }
            return r ? t === e : t == e;
          }
          function w(t) {
            return '[object Arguments]' == Object.prototype.toString.call(t);
          }
          function _(t, e) {
            if (!t || !e) return !1;
            if ('[object RegExp]' == Object.prototype.toString.call(e)) return e.test(t);
            try {
              if (t instanceof e) return !0;
            } catch (t) {}
            return !Error.isPrototypeOf(e) && !0 === e.call({}, t);
          }
          function M(t, e, r, n) {
            var i;
            if ('function' != typeof e) throw new TypeError('"block" argument must be a function');
            'string' == typeof r && ((n = r), (r = null)),
              (i = (function (t) {
                var e;
                try {
                  t();
                } catch (t) {
                  e = t;
                }
                return e;
              })(e)),
              (n = (r && r.name ? ' (' + r.name + ').' : '.') + (n ? ' ' + n : '.')),
              t && !i && v(i, r, 'Missing expected exception' + n);
            var o = 'string' == typeof n,
              s = !t && i && !r;
            if (
              (((!t && a.isError(i) && o && _(i, r)) || s) && v(i, r, 'Got unwanted exception' + n),
              (t && i && r && !_(i, r)) || (!t && i))
            )
              throw i;
          }
          (d.AssertionError = function (t) {
            (this.name = 'AssertionError'),
              (this.actual = t.actual),
              (this.expected = t.expected),
              (this.operator = t.operator),
              t.message
                ? ((this.message = t.message), (this.generatedMessage = !1))
                : ((this.message = (function (t) {
                    return b(m(t.actual), 128) + ' ' + t.operator + ' ' + b(m(t.expected), 128);
                  })(this)),
                  (this.generatedMessage = !0));
            var e = t.stackStartFunction || v;
            if (Error.captureStackTrace) Error.captureStackTrace(this, e);
            else {
              var r = new Error();
              if (r.stack) {
                var n = r.stack,
                  i = p(e),
                  o = n.indexOf('\n' + i);
                if (o >= 0) {
                  var a = n.indexOf('\n', o + 1);
                  n = n.substring(a + 1);
                }
                this.stack = n;
              }
            }
          }),
            a.inherits(d.AssertionError, Error),
            (d.fail = v),
            (d.ok = g),
            (d.equal = function (t, e, r) {
              t != e && v(t, e, r, '==', d.equal);
            }),
            (d.notEqual = function (t, e, r) {
              t == e && v(t, e, r, '!=', d.notEqual);
            }),
            (d.deepEqual = function (t, e, r) {
              y(t, e, !1) || v(t, e, r, 'deepEqual', d.deepEqual);
            }),
            (d.deepStrictEqual = function (t, e, r) {
              y(t, e, !0) || v(t, e, r, 'deepStrictEqual', d.deepStrictEqual);
            }),
            (d.notDeepEqual = function (t, e, r) {
              y(t, e, !1) && v(t, e, r, 'notDeepEqual', d.notDeepEqual);
            }),
            (d.notDeepStrictEqual = function t(e, r, n) {
              y(e, r, !0) && v(e, r, n, 'notDeepStrictEqual', t);
            }),
            (d.strictEqual = function (t, e, r) {
              t !== e && v(t, e, r, '===', d.strictEqual);
            }),
            (d.notStrictEqual = function (t, e, r) {
              t === e && v(t, e, r, '!==', d.notStrictEqual);
            }),
            (d.throws = function (t, e, r) {
              M(!0, t, e, r);
            }),
            (d.doesNotThrow = function (t, e, r) {
              M(!1, t, e, r);
            }),
            (d.ifError = function (t) {
              if (t) throw t;
            }),
            (d.strict = n(
              function t(e, r) {
                e || v(e, !0, r, '==', t);
              },
              d,
              {
                equal: d.strictEqual,
                deepEqual: d.deepStrictEqual,
                notEqual: d.notStrictEqual,
                notDeepEqual: d.notDeepStrictEqual,
              }
            )),
            (d.strict.strict = d.strict);
          var x =
            Object.keys ||
            function (t) {
              var e = [];
              for (var r in t) s.call(t, r) && e.push(r);
              return e;
            };
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      { 'object-assign': 95, 'util/': 136 },
    ],
    14: [
      function (t, e, r) {
        'use strict';
        (r.byteLength = function (t) {
          var e = u(t),
            r = e[0],
            n = e[1];
          return (3 * (r + n)) / 4 - n;
        }),
          (r.toByteArray = function (t) {
            var e,
              r,
              n = u(t),
              a = n[0],
              s = n[1],
              f = new o(
                (function (t, e, r) {
                  return (3 * (e + r)) / 4 - r;
                })(0, a, s)
              ),
              c = 0,
              h = s > 0 ? a - 4 : a;
            for (r = 0; r < h; r += 4)
              (e =
                (i[t.charCodeAt(r)] << 18) |
                (i[t.charCodeAt(r + 1)] << 12) |
                (i[t.charCodeAt(r + 2)] << 6) |
                i[t.charCodeAt(r + 3)]),
                (f[c++] = (e >> 16) & 255),
                (f[c++] = (e >> 8) & 255),
                (f[c++] = 255 & e);
            2 === s && ((e = (i[t.charCodeAt(r)] << 2) | (i[t.charCodeAt(r + 1)] >> 4)), (f[c++] = 255 & e));
            1 === s &&
              ((e = (i[t.charCodeAt(r)] << 10) | (i[t.charCodeAt(r + 1)] << 4) | (i[t.charCodeAt(r + 2)] >> 2)),
              (f[c++] = (e >> 8) & 255),
              (f[c++] = 255 & e));
            return f;
          }),
          (r.fromByteArray = function (t) {
            for (var e, r = t.length, i = r % 3, o = [], a = 0, s = r - i; a < s; a += 16383)
              o.push(c(t, a, a + 16383 > s ? s : a + 16383));
            1 === i
              ? ((e = t[r - 1]), o.push(n[e >> 2] + n[(e << 4) & 63] + '=='))
              : 2 === i &&
                ((e = (t[r - 2] << 8) + t[r - 1]), o.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + '='));
            return o.join('');
          });
        for (
          var n = [],
            i = [],
            o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
            a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            s = 0,
            f = a.length;
          s < f;
          ++s
        )
          (n[s] = a[s]), (i[a.charCodeAt(s)] = s);
        function u(t) {
          var e = t.length;
          if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
          var r = t.indexOf('=');
          return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
        }
        function c(t, e, r) {
          for (var i, o, a = [], s = e; s < r; s += 3)
            (i = ((t[s] << 16) & 16711680) + ((t[s + 1] << 8) & 65280) + (255 & t[s + 2])),
              a.push(n[((o = i) >> 18) & 63] + n[(o >> 12) & 63] + n[(o >> 6) & 63] + n[63 & o]);
          return a.join('');
        }
        (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
      },
      {},
    ],
    15: [
      function (t, e, r) {
        !(function (e, r) {
          'use strict';
          function n(t, e) {
            if (!t) throw new Error(e || 'Assertion failed');
          }
          function i(t, e) {
            t.super_ = e;
            var r = function () {};
            (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
          }
          function o(t, e, r) {
            if (o.isBN(t)) return t;
            (this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== t && (('le' !== e && 'be' !== e) || ((r = e), (e = 10)), this._init(t || 0, e || 10, r || 'be'));
          }
          var a;
          'object' == typeof e ? (e.exports = o) : (r.BN = o), (o.BN = o), (o.wordSize = 26);
          try {
            a = t('buffer').Buffer;
          } catch (t) {}
          function s(t, e, r) {
            for (var n = 0, i = Math.min(t.length, r), o = e; o < i; o++) {
              var a = t.charCodeAt(o) - 48;
              (n <<= 4), (n |= a >= 49 && a <= 54 ? a - 49 + 10 : a >= 17 && a <= 22 ? a - 17 + 10 : 15 & a);
            }
            return n;
          }
          function f(t, e, r, n) {
            for (var i = 0, o = Math.min(t.length, r), a = e; a < o; a++) {
              var s = t.charCodeAt(a) - 48;
              (i *= n), (i += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s);
            }
            return i;
          }
          (o.isBN = function (t) {
            return (
              t instanceof o ||
              (null !== t && 'object' == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words))
            );
          }),
            (o.max = function (t, e) {
              return t.cmp(e) > 0 ? t : e;
            }),
            (o.min = function (t, e) {
              return t.cmp(e) < 0 ? t : e;
            }),
            (o.prototype._init = function (t, e, r) {
              if ('number' == typeof t) return this._initNumber(t, e, r);
              if ('object' == typeof t) return this._initArray(t, e, r);
              'hex' === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
              var i = 0;
              '-' === (t = t.toString().replace(/\s+/g, ''))[0] && i++,
                16 === e ? this._parseHex(t, i) : this._parseBase(t, e, i),
                '-' === t[0] && (this.negative = 1),
                this.strip(),
                'le' === r && this._initArray(this.toArray(), e, r);
            }),
            (o.prototype._initNumber = function (t, e, r) {
              t < 0 && ((this.negative = 1), (t = -t)),
                t < 67108864
                  ? ((this.words = [67108863 & t]), (this.length = 1))
                  : t < 4503599627370496
                  ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]), (this.length = 2))
                  : (n(t < 9007199254740992),
                    (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                    (this.length = 3)),
                'le' === r && this._initArray(this.toArray(), e, r);
            }),
            (o.prototype._initArray = function (t, e, r) {
              if ((n('number' == typeof t.length), t.length <= 0)) return (this.words = [0]), (this.length = 1), this;
              (this.length = Math.ceil(t.length / 3)), (this.words = new Array(this.length));
              for (var i = 0; i < this.length; i++) this.words[i] = 0;
              var o,
                a,
                s = 0;
              if ('be' === r)
                for (i = t.length - 1, o = 0; i >= 0; i -= 3)
                  (a = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
                    (this.words[o] |= (a << s) & 67108863),
                    (this.words[o + 1] = (a >>> (26 - s)) & 67108863),
                    (s += 24) >= 26 && ((s -= 26), o++);
              else if ('le' === r)
                for (i = 0, o = 0; i < t.length; i += 3)
                  (a = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
                    (this.words[o] |= (a << s) & 67108863),
                    (this.words[o + 1] = (a >>> (26 - s)) & 67108863),
                    (s += 24) >= 26 && ((s -= 26), o++);
              return this.strip();
            }),
            (o.prototype._parseHex = function (t, e) {
              (this.length = Math.ceil((t.length - e) / 6)), (this.words = new Array(this.length));
              for (var r = 0; r < this.length; r++) this.words[r] = 0;
              var n,
                i,
                o = 0;
              for (r = t.length - 6, n = 0; r >= e; r -= 6)
                (i = s(t, r, r + 6)),
                  (this.words[n] |= (i << o) & 67108863),
                  (this.words[n + 1] |= (i >>> (26 - o)) & 4194303),
                  (o += 24) >= 26 && ((o -= 26), n++);
              r + 6 !== e &&
                ((i = s(t, e, r + 6)),
                (this.words[n] |= (i << o) & 67108863),
                (this.words[n + 1] |= (i >>> (26 - o)) & 4194303)),
                this.strip();
            }),
            (o.prototype._parseBase = function (t, e, r) {
              (this.words = [0]), (this.length = 1);
              for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
              n--, (i = (i / e) | 0);
              for (var o = t.length - r, a = o % n, s = Math.min(o, o - a) + r, u = 0, c = r; c < s; c += n)
                (u = f(t, c, c + n, e)),
                  this.imuln(i),
                  this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              if (0 !== a) {
                var h = 1;
                for (u = f(t, c, t.length, e), c = 0; c < a; c++) h *= e;
                this.imuln(h), this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              }
            }),
            (o.prototype.copy = function (t) {
              t.words = new Array(this.length);
              for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
              (t.length = this.length), (t.negative = this.negative), (t.red = this.red);
            }),
            (o.prototype.clone = function () {
              var t = new o(null);
              return this.copy(t), t;
            }),
            (o.prototype._expand = function (t) {
              for (; this.length < t; ) this.words[this.length++] = 0;
              return this;
            }),
            (o.prototype.strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
              return this._normSign();
            }),
            (o.prototype._normSign = function () {
              return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
            }),
            (o.prototype.inspect = function () {
              return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
            });
          var u = [
              '',
              '0',
              '00',
              '000',
              '0000',
              '00000',
              '000000',
              '0000000',
              '00000000',
              '000000000',
              '0000000000',
              '00000000000',
              '000000000000',
              '0000000000000',
              '00000000000000',
              '000000000000000',
              '0000000000000000',
              '00000000000000000',
              '000000000000000000',
              '0000000000000000000',
              '00000000000000000000',
              '000000000000000000000',
              '0000000000000000000000',
              '00000000000000000000000',
              '000000000000000000000000',
              '0000000000000000000000000',
            ],
            c = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
              5, 5, 5,
            ],
            h = [
              0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171,
              35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632,
              6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393,
              45435424, 52521875, 60466176,
            ];
          function d(t, e, r) {
            r.negative = e.negative ^ t.negative;
            var n = (t.length + e.length) | 0;
            (r.length = n), (n = (n - 1) | 0);
            var i = 0 | t.words[0],
              o = 0 | e.words[0],
              a = i * o,
              s = 67108863 & a,
              f = (a / 67108864) | 0;
            r.words[0] = s;
            for (var u = 1; u < n; u++) {
              for (
                var c = f >>> 26, h = 67108863 & f, d = Math.min(u, e.length - 1), l = Math.max(0, u - t.length + 1);
                l <= d;
                l++
              ) {
                var p = (u - l) | 0;
                (c += ((a = (i = 0 | t.words[p]) * (o = 0 | e.words[l]) + h) / 67108864) | 0), (h = 67108863 & a);
              }
              (r.words[u] = 0 | h), (f = 0 | c);
            }
            return 0 !== f ? (r.words[u] = 0 | f) : r.length--, r.strip();
          }
          (o.prototype.toString = function (t, e) {
            var r;
            if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
              r = '';
              for (var i = 0, o = 0, a = 0; a < this.length; a++) {
                var s = this.words[a],
                  f = (16777215 & ((s << i) | o)).toString(16);
                (r =
                  0 !== (o = (s >>> (24 - i)) & 16777215) || a !== this.length - 1 ? u[6 - f.length] + f + r : f + r),
                  (i += 2) >= 26 && ((i -= 26), a--);
              }
              for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            if (t === (0 | t) && t >= 2 && t <= 36) {
              var d = c[t],
                l = h[t];
              r = '';
              var p = this.clone();
              for (p.negative = 0; !p.isZero(); ) {
                var b = p.modn(l).toString(t);
                r = (p = p.idivn(l)).isZero() ? b + r : u[d - b.length] + b + r;
              }
              for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            n(!1, 'Base should be between 2 and 36');
          }),
            (o.prototype.toNumber = function () {
              var t = this.words[0];
              return (
                2 === this.length
                  ? (t += 67108864 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                  ? (t += 4503599627370496 + 67108864 * this.words[1])
                  : this.length > 2 && n(!1, 'Number can only safely store up to 53 bits'),
                0 !== this.negative ? -t : t
              );
            }),
            (o.prototype.toJSON = function () {
              return this.toString(16);
            }),
            (o.prototype.toBuffer = function (t, e) {
              return n(void 0 !== a), this.toArrayLike(a, t, e);
            }),
            (o.prototype.toArray = function (t, e) {
              return this.toArrayLike(Array, t, e);
            }),
            (o.prototype.toArrayLike = function (t, e, r) {
              var i = this.byteLength(),
                o = r || Math.max(1, i);
              n(i <= o, 'byte array longer than desired length'), n(o > 0, 'Requested array length <= 0'), this.strip();
              var a,
                s,
                f = 'le' === e,
                u = new t(o),
                c = this.clone();
              if (f) {
                for (s = 0; !c.isZero(); s++) (a = c.andln(255)), c.iushrn(8), (u[s] = a);
                for (; s < o; s++) u[s] = 0;
              } else {
                for (s = 0; s < o - i; s++) u[s] = 0;
                for (s = 0; !c.isZero(); s++) (a = c.andln(255)), c.iushrn(8), (u[o - s - 1] = a);
              }
              return u;
            }),
            Math.clz32
              ? (o.prototype._countBits = function (t) {
                  return 32 - Math.clz32(t);
                })
              : (o.prototype._countBits = function (t) {
                  var e = t,
                    r = 0;
                  return (
                    e >= 4096 && ((r += 13), (e >>>= 13)),
                    e >= 64 && ((r += 7), (e >>>= 7)),
                    e >= 8 && ((r += 4), (e >>>= 4)),
                    e >= 2 && ((r += 2), (e >>>= 2)),
                    r + e
                  );
                }),
            (o.prototype._zeroBits = function (t) {
              if (0 === t) return 26;
              var e = t,
                r = 0;
              return (
                0 == (8191 & e) && ((r += 13), (e >>>= 13)),
                0 == (127 & e) && ((r += 7), (e >>>= 7)),
                0 == (15 & e) && ((r += 4), (e >>>= 4)),
                0 == (3 & e) && ((r += 2), (e >>>= 2)),
                0 == (1 & e) && r++,
                r
              );
            }),
            (o.prototype.bitLength = function () {
              var t = this.words[this.length - 1],
                e = this._countBits(t);
              return 26 * (this.length - 1) + e;
            }),
            (o.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var t = 0, e = 0; e < this.length; e++) {
                var r = this._zeroBits(this.words[e]);
                if (((t += r), 26 !== r)) break;
              }
              return t;
            }),
            (o.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (o.prototype.toTwos = function (t) {
              return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone();
            }),
            (o.prototype.fromTwos = function (t) {
              return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
            }),
            (o.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (o.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (o.prototype.ineg = function () {
              return this.isZero() || (this.negative ^= 1), this;
            }),
            (o.prototype.iuor = function (t) {
              for (; this.length < t.length; ) this.words[this.length++] = 0;
              for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
              return this.strip();
            }),
            (o.prototype.ior = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuor(t);
            }),
            (o.prototype.or = function (t) {
              return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this);
            }),
            (o.prototype.uor = function (t) {
              return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this);
            }),
            (o.prototype.iuand = function (t) {
              var e;
              e = this.length > t.length ? t : this;
              for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
              return (this.length = e.length), this.strip();
            }),
            (o.prototype.iand = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuand(t);
            }),
            (o.prototype.and = function (t) {
              return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this);
            }),
            (o.prototype.uand = function (t) {
              return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this);
            }),
            (o.prototype.iuxor = function (t) {
              var e, r;
              this.length > t.length ? ((e = this), (r = t)) : ((e = t), (r = this));
              for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
              if (this !== e) for (; n < e.length; n++) this.words[n] = e.words[n];
              return (this.length = e.length), this.strip();
            }),
            (o.prototype.ixor = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuxor(t);
            }),
            (o.prototype.xor = function (t) {
              return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this);
            }),
            (o.prototype.uxor = function (t) {
              return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this);
            }),
            (o.prototype.inotn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = 0 | Math.ceil(t / 26),
                r = t % 26;
              this._expand(e), r > 0 && e--;
              for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
              return r > 0 && (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))), this.strip();
            }),
            (o.prototype.notn = function (t) {
              return this.clone().inotn(t);
            }),
            (o.prototype.setn = function (t, e) {
              n('number' == typeof t && t >= 0);
              var r = (t / 26) | 0,
                i = t % 26;
              return (
                this._expand(r + 1),
                (this.words[r] = e ? this.words[r] | (1 << i) : this.words[r] & ~(1 << i)),
                this.strip()
              );
            }),
            (o.prototype.iadd = function (t) {
              var e, r, n;
              if (0 !== this.negative && 0 === t.negative)
                return (this.negative = 0), (e = this.isub(t)), (this.negative ^= 1), this._normSign();
              if (0 === this.negative && 0 !== t.negative)
                return (t.negative = 0), (e = this.isub(t)), (t.negative = 1), e._normSign();
              this.length > t.length ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var i = 0, o = 0; o < n.length; o++)
                (e = (0 | r.words[o]) + (0 | n.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              for (; 0 !== i && o < r.length; o++)
                (e = (0 | r.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              if (((this.length = r.length), 0 !== i)) (this.words[this.length] = i), this.length++;
              else if (r !== this) for (; o < r.length; o++) this.words[o] = r.words[o];
              return this;
            }),
            (o.prototype.add = function (t) {
              var e;
              return 0 !== t.negative && 0 === this.negative
                ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                : 0 === t.negative && 0 !== this.negative
                ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
                : this.length > t.length
                ? this.clone().iadd(t)
                : t.clone().iadd(this);
            }),
            (o.prototype.isub = function (t) {
              if (0 !== t.negative) {
                t.negative = 0;
                var e = this.iadd(t);
                return (t.negative = 1), e._normSign();
              }
              if (0 !== this.negative) return (this.negative = 0), this.iadd(t), (this.negative = 1), this._normSign();
              var r,
                n,
                i = this.cmp(t);
              if (0 === i) return (this.negative = 0), (this.length = 1), (this.words[0] = 0), this;
              i > 0 ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var o = 0, a = 0; a < n.length; a++)
                (o = (e = (0 | r.words[a]) - (0 | n.words[a]) + o) >> 26), (this.words[a] = 67108863 & e);
              for (; 0 !== o && a < r.length; a++)
                (o = (e = (0 | r.words[a]) + o) >> 26), (this.words[a] = 67108863 & e);
              if (0 === o && a < r.length && r !== this) for (; a < r.length; a++) this.words[a] = r.words[a];
              return (this.length = Math.max(this.length, a)), r !== this && (this.negative = 1), this.strip();
            }),
            (o.prototype.sub = function (t) {
              return this.clone().isub(t);
            });
          var l = function (t, e, r) {
            var n,
              i,
              o,
              a = t.words,
              s = e.words,
              f = r.words,
              u = 0,
              c = 0 | a[0],
              h = 8191 & c,
              d = c >>> 13,
              l = 0 | a[1],
              p = 8191 & l,
              b = l >>> 13,
              m = 0 | a[2],
              v = 8191 & m,
              g = m >>> 13,
              y = 0 | a[3],
              w = 8191 & y,
              _ = y >>> 13,
              M = 0 | a[4],
              x = 8191 & M,
              S = M >>> 13,
              A = 0 | a[5],
              E = 8191 & A,
              k = A >>> 13,
              I = 0 | a[6],
              T = 8191 & I,
              R = I >>> 13,
              j = 0 | a[7],
              O = 8191 & j,
              B = j >>> 13,
              L = 0 | a[8],
              P = 8191 & L,
              N = L >>> 13,
              C = 0 | a[9],
              z = 8191 & C,
              q = C >>> 13,
              U = 0 | s[0],
              F = 8191 & U,
              D = U >>> 13,
              K = 0 | s[1],
              H = 8191 & K,
              W = K >>> 13,
              Z = 0 | s[2],
              V = 8191 & Z,
              $ = Z >>> 13,
              Y = 0 | s[3],
              G = 8191 & Y,
              J = Y >>> 13,
              X = 0 | s[4],
              Q = 8191 & X,
              tt = X >>> 13,
              et = 0 | s[5],
              rt = 8191 & et,
              nt = et >>> 13,
              it = 0 | s[6],
              ot = 8191 & it,
              at = it >>> 13,
              st = 0 | s[7],
              ft = 8191 & st,
              ut = st >>> 13,
              ct = 0 | s[8],
              ht = 8191 & ct,
              dt = ct >>> 13,
              lt = 0 | s[9],
              pt = 8191 & lt,
              bt = lt >>> 13;
            (r.negative = t.negative ^ e.negative), (r.length = 19);
            var mt =
              (((u + (n = Math.imul(h, F))) | 0) +
                ((8191 & (i = ((i = Math.imul(h, D)) + Math.imul(d, F)) | 0)) << 13)) |
              0;
            (u = ((((o = Math.imul(d, D)) + (i >>> 13)) | 0) + (mt >>> 26)) | 0),
              (mt &= 67108863),
              (n = Math.imul(p, F)),
              (i = ((i = Math.imul(p, D)) + Math.imul(b, F)) | 0),
              (o = Math.imul(b, D));
            var vt =
              (((u + (n = (n + Math.imul(h, H)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, W)) | 0) + Math.imul(d, H)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, W)) | 0) + (i >>> 13)) | 0) + (vt >>> 26)) | 0),
              (vt &= 67108863),
              (n = Math.imul(v, F)),
              (i = ((i = Math.imul(v, D)) + Math.imul(g, F)) | 0),
              (o = Math.imul(g, D)),
              (n = (n + Math.imul(p, H)) | 0),
              (i = ((i = (i + Math.imul(p, W)) | 0) + Math.imul(b, H)) | 0),
              (o = (o + Math.imul(b, W)) | 0);
            var gt =
              (((u + (n = (n + Math.imul(h, V)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, $)) | 0) + Math.imul(d, V)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, $)) | 0) + (i >>> 13)) | 0) + (gt >>> 26)) | 0),
              (gt &= 67108863),
              (n = Math.imul(w, F)),
              (i = ((i = Math.imul(w, D)) + Math.imul(_, F)) | 0),
              (o = Math.imul(_, D)),
              (n = (n + Math.imul(v, H)) | 0),
              (i = ((i = (i + Math.imul(v, W)) | 0) + Math.imul(g, H)) | 0),
              (o = (o + Math.imul(g, W)) | 0),
              (n = (n + Math.imul(p, V)) | 0),
              (i = ((i = (i + Math.imul(p, $)) | 0) + Math.imul(b, V)) | 0),
              (o = (o + Math.imul(b, $)) | 0);
            var yt =
              (((u + (n = (n + Math.imul(h, G)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, J)) | 0) + Math.imul(d, G)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, J)) | 0) + (i >>> 13)) | 0) + (yt >>> 26)) | 0),
              (yt &= 67108863),
              (n = Math.imul(x, F)),
              (i = ((i = Math.imul(x, D)) + Math.imul(S, F)) | 0),
              (o = Math.imul(S, D)),
              (n = (n + Math.imul(w, H)) | 0),
              (i = ((i = (i + Math.imul(w, W)) | 0) + Math.imul(_, H)) | 0),
              (o = (o + Math.imul(_, W)) | 0),
              (n = (n + Math.imul(v, V)) | 0),
              (i = ((i = (i + Math.imul(v, $)) | 0) + Math.imul(g, V)) | 0),
              (o = (o + Math.imul(g, $)) | 0),
              (n = (n + Math.imul(p, G)) | 0),
              (i = ((i = (i + Math.imul(p, J)) | 0) + Math.imul(b, G)) | 0),
              (o = (o + Math.imul(b, J)) | 0);
            var wt =
              (((u + (n = (n + Math.imul(h, Q)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, tt)) | 0) + Math.imul(d, Q)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, tt)) | 0) + (i >>> 13)) | 0) + (wt >>> 26)) | 0),
              (wt &= 67108863),
              (n = Math.imul(E, F)),
              (i = ((i = Math.imul(E, D)) + Math.imul(k, F)) | 0),
              (o = Math.imul(k, D)),
              (n = (n + Math.imul(x, H)) | 0),
              (i = ((i = (i + Math.imul(x, W)) | 0) + Math.imul(S, H)) | 0),
              (o = (o + Math.imul(S, W)) | 0),
              (n = (n + Math.imul(w, V)) | 0),
              (i = ((i = (i + Math.imul(w, $)) | 0) + Math.imul(_, V)) | 0),
              (o = (o + Math.imul(_, $)) | 0),
              (n = (n + Math.imul(v, G)) | 0),
              (i = ((i = (i + Math.imul(v, J)) | 0) + Math.imul(g, G)) | 0),
              (o = (o + Math.imul(g, J)) | 0),
              (n = (n + Math.imul(p, Q)) | 0),
              (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(b, Q)) | 0),
              (o = (o + Math.imul(b, tt)) | 0);
            var _t =
              (((u + (n = (n + Math.imul(h, rt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, nt)) | 0) + Math.imul(d, rt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, nt)) | 0) + (i >>> 13)) | 0) + (_t >>> 26)) | 0),
              (_t &= 67108863),
              (n = Math.imul(T, F)),
              (i = ((i = Math.imul(T, D)) + Math.imul(R, F)) | 0),
              (o = Math.imul(R, D)),
              (n = (n + Math.imul(E, H)) | 0),
              (i = ((i = (i + Math.imul(E, W)) | 0) + Math.imul(k, H)) | 0),
              (o = (o + Math.imul(k, W)) | 0),
              (n = (n + Math.imul(x, V)) | 0),
              (i = ((i = (i + Math.imul(x, $)) | 0) + Math.imul(S, V)) | 0),
              (o = (o + Math.imul(S, $)) | 0),
              (n = (n + Math.imul(w, G)) | 0),
              (i = ((i = (i + Math.imul(w, J)) | 0) + Math.imul(_, G)) | 0),
              (o = (o + Math.imul(_, J)) | 0),
              (n = (n + Math.imul(v, Q)) | 0),
              (i = ((i = (i + Math.imul(v, tt)) | 0) + Math.imul(g, Q)) | 0),
              (o = (o + Math.imul(g, tt)) | 0),
              (n = (n + Math.imul(p, rt)) | 0),
              (i = ((i = (i + Math.imul(p, nt)) | 0) + Math.imul(b, rt)) | 0),
              (o = (o + Math.imul(b, nt)) | 0);
            var Mt =
              (((u + (n = (n + Math.imul(h, ot)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, at)) | 0) + Math.imul(d, ot)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, at)) | 0) + (i >>> 13)) | 0) + (Mt >>> 26)) | 0),
              (Mt &= 67108863),
              (n = Math.imul(O, F)),
              (i = ((i = Math.imul(O, D)) + Math.imul(B, F)) | 0),
              (o = Math.imul(B, D)),
              (n = (n + Math.imul(T, H)) | 0),
              (i = ((i = (i + Math.imul(T, W)) | 0) + Math.imul(R, H)) | 0),
              (o = (o + Math.imul(R, W)) | 0),
              (n = (n + Math.imul(E, V)) | 0),
              (i = ((i = (i + Math.imul(E, $)) | 0) + Math.imul(k, V)) | 0),
              (o = (o + Math.imul(k, $)) | 0),
              (n = (n + Math.imul(x, G)) | 0),
              (i = ((i = (i + Math.imul(x, J)) | 0) + Math.imul(S, G)) | 0),
              (o = (o + Math.imul(S, J)) | 0),
              (n = (n + Math.imul(w, Q)) | 0),
              (i = ((i = (i + Math.imul(w, tt)) | 0) + Math.imul(_, Q)) | 0),
              (o = (o + Math.imul(_, tt)) | 0),
              (n = (n + Math.imul(v, rt)) | 0),
              (i = ((i = (i + Math.imul(v, nt)) | 0) + Math.imul(g, rt)) | 0),
              (o = (o + Math.imul(g, nt)) | 0),
              (n = (n + Math.imul(p, ot)) | 0),
              (i = ((i = (i + Math.imul(p, at)) | 0) + Math.imul(b, ot)) | 0),
              (o = (o + Math.imul(b, at)) | 0);
            var xt =
              (((u + (n = (n + Math.imul(h, ft)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, ut)) | 0) + Math.imul(d, ft)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, ut)) | 0) + (i >>> 13)) | 0) + (xt >>> 26)) | 0),
              (xt &= 67108863),
              (n = Math.imul(P, F)),
              (i = ((i = Math.imul(P, D)) + Math.imul(N, F)) | 0),
              (o = Math.imul(N, D)),
              (n = (n + Math.imul(O, H)) | 0),
              (i = ((i = (i + Math.imul(O, W)) | 0) + Math.imul(B, H)) | 0),
              (o = (o + Math.imul(B, W)) | 0),
              (n = (n + Math.imul(T, V)) | 0),
              (i = ((i = (i + Math.imul(T, $)) | 0) + Math.imul(R, V)) | 0),
              (o = (o + Math.imul(R, $)) | 0),
              (n = (n + Math.imul(E, G)) | 0),
              (i = ((i = (i + Math.imul(E, J)) | 0) + Math.imul(k, G)) | 0),
              (o = (o + Math.imul(k, J)) | 0),
              (n = (n + Math.imul(x, Q)) | 0),
              (i = ((i = (i + Math.imul(x, tt)) | 0) + Math.imul(S, Q)) | 0),
              (o = (o + Math.imul(S, tt)) | 0),
              (n = (n + Math.imul(w, rt)) | 0),
              (i = ((i = (i + Math.imul(w, nt)) | 0) + Math.imul(_, rt)) | 0),
              (o = (o + Math.imul(_, nt)) | 0),
              (n = (n + Math.imul(v, ot)) | 0),
              (i = ((i = (i + Math.imul(v, at)) | 0) + Math.imul(g, ot)) | 0),
              (o = (o + Math.imul(g, at)) | 0),
              (n = (n + Math.imul(p, ft)) | 0),
              (i = ((i = (i + Math.imul(p, ut)) | 0) + Math.imul(b, ft)) | 0),
              (o = (o + Math.imul(b, ut)) | 0);
            var St =
              (((u + (n = (n + Math.imul(h, ht)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, dt)) | 0) + Math.imul(d, ht)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, dt)) | 0) + (i >>> 13)) | 0) + (St >>> 26)) | 0),
              (St &= 67108863),
              (n = Math.imul(z, F)),
              (i = ((i = Math.imul(z, D)) + Math.imul(q, F)) | 0),
              (o = Math.imul(q, D)),
              (n = (n + Math.imul(P, H)) | 0),
              (i = ((i = (i + Math.imul(P, W)) | 0) + Math.imul(N, H)) | 0),
              (o = (o + Math.imul(N, W)) | 0),
              (n = (n + Math.imul(O, V)) | 0),
              (i = ((i = (i + Math.imul(O, $)) | 0) + Math.imul(B, V)) | 0),
              (o = (o + Math.imul(B, $)) | 0),
              (n = (n + Math.imul(T, G)) | 0),
              (i = ((i = (i + Math.imul(T, J)) | 0) + Math.imul(R, G)) | 0),
              (o = (o + Math.imul(R, J)) | 0),
              (n = (n + Math.imul(E, Q)) | 0),
              (i = ((i = (i + Math.imul(E, tt)) | 0) + Math.imul(k, Q)) | 0),
              (o = (o + Math.imul(k, tt)) | 0),
              (n = (n + Math.imul(x, rt)) | 0),
              (i = ((i = (i + Math.imul(x, nt)) | 0) + Math.imul(S, rt)) | 0),
              (o = (o + Math.imul(S, nt)) | 0),
              (n = (n + Math.imul(w, ot)) | 0),
              (i = ((i = (i + Math.imul(w, at)) | 0) + Math.imul(_, ot)) | 0),
              (o = (o + Math.imul(_, at)) | 0),
              (n = (n + Math.imul(v, ft)) | 0),
              (i = ((i = (i + Math.imul(v, ut)) | 0) + Math.imul(g, ft)) | 0),
              (o = (o + Math.imul(g, ut)) | 0),
              (n = (n + Math.imul(p, ht)) | 0),
              (i = ((i = (i + Math.imul(p, dt)) | 0) + Math.imul(b, ht)) | 0),
              (o = (o + Math.imul(b, dt)) | 0);
            var At =
              (((u + (n = (n + Math.imul(h, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, bt)) | 0) + Math.imul(d, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, bt)) | 0) + (i >>> 13)) | 0) + (At >>> 26)) | 0),
              (At &= 67108863),
              (n = Math.imul(z, H)),
              (i = ((i = Math.imul(z, W)) + Math.imul(q, H)) | 0),
              (o = Math.imul(q, W)),
              (n = (n + Math.imul(P, V)) | 0),
              (i = ((i = (i + Math.imul(P, $)) | 0) + Math.imul(N, V)) | 0),
              (o = (o + Math.imul(N, $)) | 0),
              (n = (n + Math.imul(O, G)) | 0),
              (i = ((i = (i + Math.imul(O, J)) | 0) + Math.imul(B, G)) | 0),
              (o = (o + Math.imul(B, J)) | 0),
              (n = (n + Math.imul(T, Q)) | 0),
              (i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(R, Q)) | 0),
              (o = (o + Math.imul(R, tt)) | 0),
              (n = (n + Math.imul(E, rt)) | 0),
              (i = ((i = (i + Math.imul(E, nt)) | 0) + Math.imul(k, rt)) | 0),
              (o = (o + Math.imul(k, nt)) | 0),
              (n = (n + Math.imul(x, ot)) | 0),
              (i = ((i = (i + Math.imul(x, at)) | 0) + Math.imul(S, ot)) | 0),
              (o = (o + Math.imul(S, at)) | 0),
              (n = (n + Math.imul(w, ft)) | 0),
              (i = ((i = (i + Math.imul(w, ut)) | 0) + Math.imul(_, ft)) | 0),
              (o = (o + Math.imul(_, ut)) | 0),
              (n = (n + Math.imul(v, ht)) | 0),
              (i = ((i = (i + Math.imul(v, dt)) | 0) + Math.imul(g, ht)) | 0),
              (o = (o + Math.imul(g, dt)) | 0);
            var Et =
              (((u + (n = (n + Math.imul(p, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(p, bt)) | 0) + Math.imul(b, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(b, bt)) | 0) + (i >>> 13)) | 0) + (Et >>> 26)) | 0),
              (Et &= 67108863),
              (n = Math.imul(z, V)),
              (i = ((i = Math.imul(z, $)) + Math.imul(q, V)) | 0),
              (o = Math.imul(q, $)),
              (n = (n + Math.imul(P, G)) | 0),
              (i = ((i = (i + Math.imul(P, J)) | 0) + Math.imul(N, G)) | 0),
              (o = (o + Math.imul(N, J)) | 0),
              (n = (n + Math.imul(O, Q)) | 0),
              (i = ((i = (i + Math.imul(O, tt)) | 0) + Math.imul(B, Q)) | 0),
              (o = (o + Math.imul(B, tt)) | 0),
              (n = (n + Math.imul(T, rt)) | 0),
              (i = ((i = (i + Math.imul(T, nt)) | 0) + Math.imul(R, rt)) | 0),
              (o = (o + Math.imul(R, nt)) | 0),
              (n = (n + Math.imul(E, ot)) | 0),
              (i = ((i = (i + Math.imul(E, at)) | 0) + Math.imul(k, ot)) | 0),
              (o = (o + Math.imul(k, at)) | 0),
              (n = (n + Math.imul(x, ft)) | 0),
              (i = ((i = (i + Math.imul(x, ut)) | 0) + Math.imul(S, ft)) | 0),
              (o = (o + Math.imul(S, ut)) | 0),
              (n = (n + Math.imul(w, ht)) | 0),
              (i = ((i = (i + Math.imul(w, dt)) | 0) + Math.imul(_, ht)) | 0),
              (o = (o + Math.imul(_, dt)) | 0);
            var kt =
              (((u + (n = (n + Math.imul(v, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(v, bt)) | 0) + Math.imul(g, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(g, bt)) | 0) + (i >>> 13)) | 0) + (kt >>> 26)) | 0),
              (kt &= 67108863),
              (n = Math.imul(z, G)),
              (i = ((i = Math.imul(z, J)) + Math.imul(q, G)) | 0),
              (o = Math.imul(q, J)),
              (n = (n + Math.imul(P, Q)) | 0),
              (i = ((i = (i + Math.imul(P, tt)) | 0) + Math.imul(N, Q)) | 0),
              (o = (o + Math.imul(N, tt)) | 0),
              (n = (n + Math.imul(O, rt)) | 0),
              (i = ((i = (i + Math.imul(O, nt)) | 0) + Math.imul(B, rt)) | 0),
              (o = (o + Math.imul(B, nt)) | 0),
              (n = (n + Math.imul(T, ot)) | 0),
              (i = ((i = (i + Math.imul(T, at)) | 0) + Math.imul(R, ot)) | 0),
              (o = (o + Math.imul(R, at)) | 0),
              (n = (n + Math.imul(E, ft)) | 0),
              (i = ((i = (i + Math.imul(E, ut)) | 0) + Math.imul(k, ft)) | 0),
              (o = (o + Math.imul(k, ut)) | 0),
              (n = (n + Math.imul(x, ht)) | 0),
              (i = ((i = (i + Math.imul(x, dt)) | 0) + Math.imul(S, ht)) | 0),
              (o = (o + Math.imul(S, dt)) | 0);
            var It =
              (((u + (n = (n + Math.imul(w, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(w, bt)) | 0) + Math.imul(_, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(_, bt)) | 0) + (i >>> 13)) | 0) + (It >>> 26)) | 0),
              (It &= 67108863),
              (n = Math.imul(z, Q)),
              (i = ((i = Math.imul(z, tt)) + Math.imul(q, Q)) | 0),
              (o = Math.imul(q, tt)),
              (n = (n + Math.imul(P, rt)) | 0),
              (i = ((i = (i + Math.imul(P, nt)) | 0) + Math.imul(N, rt)) | 0),
              (o = (o + Math.imul(N, nt)) | 0),
              (n = (n + Math.imul(O, ot)) | 0),
              (i = ((i = (i + Math.imul(O, at)) | 0) + Math.imul(B, ot)) | 0),
              (o = (o + Math.imul(B, at)) | 0),
              (n = (n + Math.imul(T, ft)) | 0),
              (i = ((i = (i + Math.imul(T, ut)) | 0) + Math.imul(R, ft)) | 0),
              (o = (o + Math.imul(R, ut)) | 0),
              (n = (n + Math.imul(E, ht)) | 0),
              (i = ((i = (i + Math.imul(E, dt)) | 0) + Math.imul(k, ht)) | 0),
              (o = (o + Math.imul(k, dt)) | 0);
            var Tt =
              (((u + (n = (n + Math.imul(x, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(x, bt)) | 0) + Math.imul(S, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(S, bt)) | 0) + (i >>> 13)) | 0) + (Tt >>> 26)) | 0),
              (Tt &= 67108863),
              (n = Math.imul(z, rt)),
              (i = ((i = Math.imul(z, nt)) + Math.imul(q, rt)) | 0),
              (o = Math.imul(q, nt)),
              (n = (n + Math.imul(P, ot)) | 0),
              (i = ((i = (i + Math.imul(P, at)) | 0) + Math.imul(N, ot)) | 0),
              (o = (o + Math.imul(N, at)) | 0),
              (n = (n + Math.imul(O, ft)) | 0),
              (i = ((i = (i + Math.imul(O, ut)) | 0) + Math.imul(B, ft)) | 0),
              (o = (o + Math.imul(B, ut)) | 0),
              (n = (n + Math.imul(T, ht)) | 0),
              (i = ((i = (i + Math.imul(T, dt)) | 0) + Math.imul(R, ht)) | 0),
              (o = (o + Math.imul(R, dt)) | 0);
            var Rt =
              (((u + (n = (n + Math.imul(E, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(E, bt)) | 0) + Math.imul(k, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(k, bt)) | 0) + (i >>> 13)) | 0) + (Rt >>> 26)) | 0),
              (Rt &= 67108863),
              (n = Math.imul(z, ot)),
              (i = ((i = Math.imul(z, at)) + Math.imul(q, ot)) | 0),
              (o = Math.imul(q, at)),
              (n = (n + Math.imul(P, ft)) | 0),
              (i = ((i = (i + Math.imul(P, ut)) | 0) + Math.imul(N, ft)) | 0),
              (o = (o + Math.imul(N, ut)) | 0),
              (n = (n + Math.imul(O, ht)) | 0),
              (i = ((i = (i + Math.imul(O, dt)) | 0) + Math.imul(B, ht)) | 0),
              (o = (o + Math.imul(B, dt)) | 0);
            var jt =
              (((u + (n = (n + Math.imul(T, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(T, bt)) | 0) + Math.imul(R, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(R, bt)) | 0) + (i >>> 13)) | 0) + (jt >>> 26)) | 0),
              (jt &= 67108863),
              (n = Math.imul(z, ft)),
              (i = ((i = Math.imul(z, ut)) + Math.imul(q, ft)) | 0),
              (o = Math.imul(q, ut)),
              (n = (n + Math.imul(P, ht)) | 0),
              (i = ((i = (i + Math.imul(P, dt)) | 0) + Math.imul(N, ht)) | 0),
              (o = (o + Math.imul(N, dt)) | 0);
            var Ot =
              (((u + (n = (n + Math.imul(O, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(O, bt)) | 0) + Math.imul(B, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(B, bt)) | 0) + (i >>> 13)) | 0) + (Ot >>> 26)) | 0),
              (Ot &= 67108863),
              (n = Math.imul(z, ht)),
              (i = ((i = Math.imul(z, dt)) + Math.imul(q, ht)) | 0),
              (o = Math.imul(q, dt));
            var Bt =
              (((u + (n = (n + Math.imul(P, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(P, bt)) | 0) + Math.imul(N, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(N, bt)) | 0) + (i >>> 13)) | 0) + (Bt >>> 26)) | 0), (Bt &= 67108863);
            var Lt =
              (((u + (n = Math.imul(z, pt))) | 0) +
                ((8191 & (i = ((i = Math.imul(z, bt)) + Math.imul(q, pt)) | 0)) << 13)) |
              0;
            return (
              (u = ((((o = Math.imul(q, bt)) + (i >>> 13)) | 0) + (Lt >>> 26)) | 0),
              (Lt &= 67108863),
              (f[0] = mt),
              (f[1] = vt),
              (f[2] = gt),
              (f[3] = yt),
              (f[4] = wt),
              (f[5] = _t),
              (f[6] = Mt),
              (f[7] = xt),
              (f[8] = St),
              (f[9] = At),
              (f[10] = Et),
              (f[11] = kt),
              (f[12] = It),
              (f[13] = Tt),
              (f[14] = Rt),
              (f[15] = jt),
              (f[16] = Ot),
              (f[17] = Bt),
              (f[18] = Lt),
              0 !== u && ((f[19] = u), r.length++),
              r
            );
          };
          function p(t, e, r) {
            return new b().mulp(t, e, r);
          }
          function b(t, e) {
            (this.x = t), (this.y = e);
          }
          Math.imul || (l = d),
            (o.prototype.mulTo = function (t, e) {
              var r = this.length + t.length;
              return 10 === this.length && 10 === t.length
                ? l(this, t, e)
                : r < 63
                ? d(this, t, e)
                : r < 1024
                ? (function (t, e, r) {
                    (r.negative = e.negative ^ t.negative), (r.length = t.length + e.length);
                    for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
                      var a = i;
                      i = 0;
                      for (
                        var s = 67108863 & n, f = Math.min(o, e.length - 1), u = Math.max(0, o - t.length + 1);
                        u <= f;
                        u++
                      ) {
                        var c = o - u,
                          h = (0 | t.words[c]) * (0 | e.words[u]),
                          d = 67108863 & h;
                        (s = 67108863 & (d = (d + s) | 0)),
                          (i += (a = ((a = (a + ((h / 67108864) | 0)) | 0) + (d >>> 26)) | 0) >>> 26),
                          (a &= 67108863);
                      }
                      (r.words[o] = s), (n = a), (a = i);
                    }
                    return 0 !== n ? (r.words[o] = n) : r.length--, r.strip();
                  })(this, t, e)
                : p(this, t, e);
            }),
            (b.prototype.makeRBT = function (t) {
              for (var e = new Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++)
                e[n] = this.revBin(n, r, t);
              return e;
            }),
            (b.prototype.revBin = function (t, e, r) {
              if (0 === t || t === r - 1) return t;
              for (var n = 0, i = 0; i < e; i++) (n |= (1 & t) << (e - i - 1)), (t >>= 1);
              return n;
            }),
            (b.prototype.permute = function (t, e, r, n, i, o) {
              for (var a = 0; a < o; a++) (n[a] = e[t[a]]), (i[a] = r[t[a]]);
            }),
            (b.prototype.transform = function (t, e, r, n, i, o) {
              this.permute(o, t, e, r, n, i);
              for (var a = 1; a < i; a <<= 1)
                for (
                  var s = a << 1, f = Math.cos((2 * Math.PI) / s), u = Math.sin((2 * Math.PI) / s), c = 0;
                  c < i;
                  c += s
                )
                  for (var h = f, d = u, l = 0; l < a; l++) {
                    var p = r[c + l],
                      b = n[c + l],
                      m = r[c + l + a],
                      v = n[c + l + a],
                      g = h * m - d * v;
                    (v = h * v + d * m),
                      (m = g),
                      (r[c + l] = p + m),
                      (n[c + l] = b + v),
                      (r[c + l + a] = p - m),
                      (n[c + l + a] = b - v),
                      l !== s && ((g = f * h - u * d), (d = f * d + u * h), (h = g));
                  }
            }),
            (b.prototype.guessLen13b = function (t, e) {
              var r = 1 | Math.max(e, t),
                n = 1 & r,
                i = 0;
              for (r = (r / 2) | 0; r; r >>>= 1) i++;
              return 1 << (i + 1 + n);
            }),
            (b.prototype.conjugate = function (t, e, r) {
              if (!(r <= 1))
                for (var n = 0; n < r / 2; n++) {
                  var i = t[n];
                  (t[n] = t[r - n - 1]), (t[r - n - 1] = i), (i = e[n]), (e[n] = -e[r - n - 1]), (e[r - n - 1] = -i);
                }
            }),
            (b.prototype.normalize13b = function (t, e) {
              for (var r = 0, n = 0; n < e / 2; n++) {
                var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                (t[n] = 67108863 & i), (r = i < 67108864 ? 0 : (i / 67108864) | 0);
              }
              return t;
            }),
            (b.prototype.convert13b = function (t, e, r, i) {
              for (var o = 0, a = 0; a < e; a++)
                (o += 0 | t[a]), (r[2 * a] = 8191 & o), (o >>>= 13), (r[2 * a + 1] = 8191 & o), (o >>>= 13);
              for (a = 2 * e; a < i; ++a) r[a] = 0;
              n(0 === o), n(0 == (-8192 & o));
            }),
            (b.prototype.stub = function (t) {
              for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
              return e;
            }),
            (b.prototype.mulp = function (t, e, r) {
              var n = 2 * this.guessLen13b(t.length, e.length),
                i = this.makeRBT(n),
                o = this.stub(n),
                a = new Array(n),
                s = new Array(n),
                f = new Array(n),
                u = new Array(n),
                c = new Array(n),
                h = new Array(n),
                d = r.words;
              (d.length = n),
                this.convert13b(t.words, t.length, a, n),
                this.convert13b(e.words, e.length, u, n),
                this.transform(a, o, s, f, n, i),
                this.transform(u, o, c, h, n, i);
              for (var l = 0; l < n; l++) {
                var p = s[l] * c[l] - f[l] * h[l];
                (f[l] = s[l] * h[l] + f[l] * c[l]), (s[l] = p);
              }
              return (
                this.conjugate(s, f, n),
                this.transform(s, f, d, o, n, i),
                this.conjugate(d, o, n),
                this.normalize13b(d, n),
                (r.negative = t.negative ^ e.negative),
                (r.length = t.length + e.length),
                r.strip()
              );
            }),
            (o.prototype.mul = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), this.mulTo(t, e);
            }),
            (o.prototype.mulf = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), p(this, t, e);
            }),
            (o.prototype.imul = function (t) {
              return this.clone().mulTo(t, this);
            }),
            (o.prototype.imuln = function (t) {
              n('number' == typeof t), n(t < 67108864);
              for (var e = 0, r = 0; r < this.length; r++) {
                var i = (0 | this.words[r]) * t,
                  o = (67108863 & i) + (67108863 & e);
                (e >>= 26), (e += (i / 67108864) | 0), (e += o >>> 26), (this.words[r] = 67108863 & o);
              }
              return 0 !== e && ((this.words[r] = e), this.length++), this;
            }),
            (o.prototype.muln = function (t) {
              return this.clone().imuln(t);
            }),
            (o.prototype.sqr = function () {
              return this.mul(this);
            }),
            (o.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (o.prototype.pow = function (t) {
              var e = (function (t) {
                for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                  var n = (r / 26) | 0,
                    i = r % 26;
                  e[r] = (t.words[n] & (1 << i)) >>> i;
                }
                return e;
              })(t);
              if (0 === e.length) return new o(1);
              for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
              if (++n < e.length) for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
              return r;
            }),
            (o.prototype.iushln = function (t) {
              n('number' == typeof t && t >= 0);
              var e,
                r = t % 26,
                i = (t - r) / 26,
                o = (67108863 >>> (26 - r)) << (26 - r);
              if (0 !== r) {
                var a = 0;
                for (e = 0; e < this.length; e++) {
                  var s = this.words[e] & o,
                    f = ((0 | this.words[e]) - s) << r;
                  (this.words[e] = f | a), (a = s >>> (26 - r));
                }
                a && ((this.words[e] = a), this.length++);
              }
              if (0 !== i) {
                for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                for (e = 0; e < i; e++) this.words[e] = 0;
                this.length += i;
              }
              return this.strip();
            }),
            (o.prototype.ishln = function (t) {
              return n(0 === this.negative), this.iushln(t);
            }),
            (o.prototype.iushrn = function (t, e, r) {
              var i;
              n('number' == typeof t && t >= 0), (i = e ? (e - (e % 26)) / 26 : 0);
              var o = t % 26,
                a = Math.min((t - o) / 26, this.length),
                s = 67108863 ^ ((67108863 >>> o) << o),
                f = r;
              if (((i -= a), (i = Math.max(0, i)), f)) {
                for (var u = 0; u < a; u++) f.words[u] = this.words[u];
                f.length = a;
              }
              if (0 === a);
              else if (this.length > a)
                for (this.length -= a, u = 0; u < this.length; u++) this.words[u] = this.words[u + a];
              else (this.words[0] = 0), (this.length = 1);
              var c = 0;
              for (u = this.length - 1; u >= 0 && (0 !== c || u >= i); u--) {
                var h = 0 | this.words[u];
                (this.words[u] = (c << (26 - o)) | (h >>> o)), (c = h & s);
              }
              return (
                f && 0 !== c && (f.words[f.length++] = c),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this.strip()
              );
            }),
            (o.prototype.ishrn = function (t, e, r) {
              return n(0 === this.negative), this.iushrn(t, e, r);
            }),
            (o.prototype.shln = function (t) {
              return this.clone().ishln(t);
            }),
            (o.prototype.ushln = function (t) {
              return this.clone().iushln(t);
            }),
            (o.prototype.shrn = function (t) {
              return this.clone().ishrn(t);
            }),
            (o.prototype.ushrn = function (t) {
              return this.clone().iushrn(t);
            }),
            (o.prototype.testn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              return !(this.length <= r) && !!(this.words[r] & i);
            }),
            (o.prototype.imaskn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26;
              if ((n(0 === this.negative, 'imaskn works only with positive numbers'), this.length <= r)) return this;
              if ((0 !== e && r++, (this.length = Math.min(r, this.length)), 0 !== e)) {
                var i = 67108863 ^ ((67108863 >>> e) << e);
                this.words[this.length - 1] &= i;
              }
              return this.strip();
            }),
            (o.prototype.maskn = function (t) {
              return this.clone().imaskn(t);
            }),
            (o.prototype.iaddn = function (t) {
              return (
                n('number' == typeof t),
                n(t < 67108864),
                t < 0
                  ? this.isubn(-t)
                  : 0 !== this.negative
                  ? 1 === this.length && (0 | this.words[0]) < t
                    ? ((this.words[0] = t - (0 | this.words[0])), (this.negative = 0), this)
                    : ((this.negative = 0), this.isubn(t), (this.negative = 1), this)
                  : this._iaddn(t)
              );
            }),
            (o.prototype._iaddn = function (t) {
              this.words[0] += t;
              for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
                (this.words[e] -= 67108864), e === this.length - 1 ? (this.words[e + 1] = 1) : this.words[e + 1]++;
              return (this.length = Math.max(this.length, e + 1)), this;
            }),
            (o.prototype.isubn = function (t) {
              if ((n('number' == typeof t), n(t < 67108864), t < 0)) return this.iaddn(-t);
              if (0 !== this.negative) return (this.negative = 0), this.iaddn(t), (this.negative = 1), this;
              if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
                (this.words[0] = -this.words[0]), (this.negative = 1);
              else
                for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  (this.words[e] += 67108864), (this.words[e + 1] -= 1);
              return this.strip();
            }),
            (o.prototype.addn = function (t) {
              return this.clone().iaddn(t);
            }),
            (o.prototype.subn = function (t) {
              return this.clone().isubn(t);
            }),
            (o.prototype.iabs = function () {
              return (this.negative = 0), this;
            }),
            (o.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (o.prototype._ishlnsubmul = function (t, e, r) {
              var i,
                o,
                a = t.length + r;
              this._expand(a);
              var s = 0;
              for (i = 0; i < t.length; i++) {
                o = (0 | this.words[i + r]) + s;
                var f = (0 | t.words[i]) * e;
                (s = ((o -= 67108863 & f) >> 26) - ((f / 67108864) | 0)), (this.words[i + r] = 67108863 & o);
              }
              for (; i < this.length - r; i++)
                (s = (o = (0 | this.words[i + r]) + s) >> 26), (this.words[i + r] = 67108863 & o);
              if (0 === s) return this.strip();
              for (n(-1 === s), s = 0, i = 0; i < this.length; i++)
                (s = (o = -(0 | this.words[i]) + s) >> 26), (this.words[i] = 67108863 & o);
              return (this.negative = 1), this.strip();
            }),
            (o.prototype._wordDiv = function (t, e) {
              var r = (this.length, t.length),
                n = this.clone(),
                i = t,
                a = 0 | i.words[i.length - 1];
              0 !== (r = 26 - this._countBits(a)) && ((i = i.ushln(r)), n.iushln(r), (a = 0 | i.words[i.length - 1]));
              var s,
                f = n.length - i.length;
              if ('mod' !== e) {
                ((s = new o(null)).length = f + 1), (s.words = new Array(s.length));
                for (var u = 0; u < s.length; u++) s.words[u] = 0;
              }
              var c = n.clone()._ishlnsubmul(i, 1, f);
              0 === c.negative && ((n = c), s && (s.words[f] = 1));
              for (var h = f - 1; h >= 0; h--) {
                var d = 67108864 * (0 | n.words[i.length + h]) + (0 | n.words[i.length + h - 1]);
                for (d = Math.min((d / a) | 0, 67108863), n._ishlnsubmul(i, d, h); 0 !== n.negative; )
                  d--, (n.negative = 0), n._ishlnsubmul(i, 1, h), n.isZero() || (n.negative ^= 1);
                s && (s.words[h] = d);
              }
              return s && s.strip(), n.strip(), 'div' !== e && 0 !== r && n.iushrn(r), { div: s || null, mod: n };
            }),
            (o.prototype.divmod = function (t, e, r) {
              return (
                n(!t.isZero()),
                this.isZero()
                  ? { div: new o(0), mod: new o(0) }
                  : 0 !== this.negative && 0 === t.negative
                  ? ((s = this.neg().divmod(t, e)),
                    'mod' !== e && (i = s.div.neg()),
                    'div' !== e && ((a = s.mod.neg()), r && 0 !== a.negative && a.iadd(t)),
                    { div: i, mod: a })
                  : 0 === this.negative && 0 !== t.negative
                  ? ((s = this.divmod(t.neg(), e)), 'mod' !== e && (i = s.div.neg()), { div: i, mod: s.mod })
                  : 0 != (this.negative & t.negative)
                  ? ((s = this.neg().divmod(t.neg(), e)),
                    'div' !== e && ((a = s.mod.neg()), r && 0 !== a.negative && a.isub(t)),
                    { div: s.div, mod: a })
                  : t.length > this.length || this.cmp(t) < 0
                  ? { div: new o(0), mod: this }
                  : 1 === t.length
                  ? 'div' === e
                    ? { div: this.divn(t.words[0]), mod: null }
                    : 'mod' === e
                    ? { div: null, mod: new o(this.modn(t.words[0])) }
                    : { div: this.divn(t.words[0]), mod: new o(this.modn(t.words[0])) }
                  : this._wordDiv(t, e)
              );
              var i, a, s;
            }),
            (o.prototype.div = function (t) {
              return this.divmod(t, 'div', !1).div;
            }),
            (o.prototype.mod = function (t) {
              return this.divmod(t, 'mod', !1).mod;
            }),
            (o.prototype.umod = function (t) {
              return this.divmod(t, 'mod', !0).mod;
            }),
            (o.prototype.divRound = function (t) {
              var e = this.divmod(t);
              if (e.mod.isZero()) return e.div;
              var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                n = t.ushrn(1),
                i = t.andln(1),
                o = r.cmp(n);
              return o < 0 || (1 === i && 0 === o) ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1);
            }),
            (o.prototype.modn = function (t) {
              n(t <= 67108863);
              for (var e = (1 << 26) % t, r = 0, i = this.length - 1; i >= 0; i--)
                r = (e * r + (0 | this.words[i])) % t;
              return r;
            }),
            (o.prototype.idivn = function (t) {
              n(t <= 67108863);
              for (var e = 0, r = this.length - 1; r >= 0; r--) {
                var i = (0 | this.words[r]) + 67108864 * e;
                (this.words[r] = (i / t) | 0), (e = i % t);
              }
              return this.strip();
            }),
            (o.prototype.divn = function (t) {
              return this.clone().idivn(t);
            }),
            (o.prototype.egcd = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i = new o(1), a = new o(0), s = new o(0), f = new o(1), u = 0; e.isEven() && r.isEven(); )
                e.iushrn(1), r.iushrn(1), ++u;
              for (var c = r.clone(), h = e.clone(); !e.isZero(); ) {
                for (var d = 0, l = 1; 0 == (e.words[0] & l) && d < 26; ++d, l <<= 1);
                if (d > 0)
                  for (e.iushrn(d); d-- > 0; )
                    (i.isOdd() || a.isOdd()) && (i.iadd(c), a.isub(h)), i.iushrn(1), a.iushrn(1);
                for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p, b <<= 1);
                if (p > 0)
                  for (r.iushrn(p); p-- > 0; )
                    (s.isOdd() || f.isOdd()) && (s.iadd(c), f.isub(h)), s.iushrn(1), f.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), i.isub(s), a.isub(f)) : (r.isub(e), s.isub(i), f.isub(a));
              }
              return { a: s, b: f, gcd: r.iushln(u) };
            }),
            (o.prototype._invmp = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i, a = new o(1), s = new o(0), f = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
                for (var u = 0, c = 1; 0 == (e.words[0] & c) && u < 26; ++u, c <<= 1);
                if (u > 0) for (e.iushrn(u); u-- > 0; ) a.isOdd() && a.iadd(f), a.iushrn(1);
                for (var h = 0, d = 1; 0 == (r.words[0] & d) && h < 26; ++h, d <<= 1);
                if (h > 0) for (r.iushrn(h); h-- > 0; ) s.isOdd() && s.iadd(f), s.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), a.isub(s)) : (r.isub(e), s.isub(a));
              }
              return (i = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && i.iadd(t), i;
            }),
            (o.prototype.gcd = function (t) {
              if (this.isZero()) return t.abs();
              if (t.isZero()) return this.abs();
              var e = this.clone(),
                r = t.clone();
              (e.negative = 0), (r.negative = 0);
              for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
              for (;;) {
                for (; e.isEven(); ) e.iushrn(1);
                for (; r.isEven(); ) r.iushrn(1);
                var i = e.cmp(r);
                if (i < 0) {
                  var o = e;
                  (e = r), (r = o);
                } else if (0 === i || 0 === r.cmpn(1)) break;
                e.isub(r);
              }
              return r.iushln(n);
            }),
            (o.prototype.invm = function (t) {
              return this.egcd(t).a.umod(t);
            }),
            (o.prototype.isEven = function () {
              return 0 == (1 & this.words[0]);
            }),
            (o.prototype.isOdd = function () {
              return 1 == (1 & this.words[0]);
            }),
            (o.prototype.andln = function (t) {
              return this.words[0] & t;
            }),
            (o.prototype.bincn = function (t) {
              n('number' == typeof t);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              if (this.length <= r) return this._expand(r + 1), (this.words[r] |= i), this;
              for (var o = i, a = r; 0 !== o && a < this.length; a++) {
                var s = 0 | this.words[a];
                (o = (s += o) >>> 26), (s &= 67108863), (this.words[a] = s);
              }
              return 0 !== o && ((this.words[a] = o), this.length++), this;
            }),
            (o.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (o.prototype.cmpn = function (t) {
              var e,
                r = t < 0;
              if (0 !== this.negative && !r) return -1;
              if (0 === this.negative && r) return 1;
              if ((this.strip(), this.length > 1)) e = 1;
              else {
                r && (t = -t), n(t <= 67108863, 'Number is too big');
                var i = 0 | this.words[0];
                e = i === t ? 0 : i < t ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.cmp = function (t) {
              if (0 !== this.negative && 0 === t.negative) return -1;
              if (0 === this.negative && 0 !== t.negative) return 1;
              var e = this.ucmp(t);
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.ucmp = function (t) {
              if (this.length > t.length) return 1;
              if (this.length < t.length) return -1;
              for (var e = 0, r = this.length - 1; r >= 0; r--) {
                var n = 0 | this.words[r],
                  i = 0 | t.words[r];
                if (n !== i) {
                  n < i ? (e = -1) : n > i && (e = 1);
                  break;
                }
              }
              return e;
            }),
            (o.prototype.gtn = function (t) {
              return 1 === this.cmpn(t);
            }),
            (o.prototype.gt = function (t) {
              return 1 === this.cmp(t);
            }),
            (o.prototype.gten = function (t) {
              return this.cmpn(t) >= 0;
            }),
            (o.prototype.gte = function (t) {
              return this.cmp(t) >= 0;
            }),
            (o.prototype.ltn = function (t) {
              return -1 === this.cmpn(t);
            }),
            (o.prototype.lt = function (t) {
              return -1 === this.cmp(t);
            }),
            (o.prototype.lten = function (t) {
              return this.cmpn(t) <= 0;
            }),
            (o.prototype.lte = function (t) {
              return this.cmp(t) <= 0;
            }),
            (o.prototype.eqn = function (t) {
              return 0 === this.cmpn(t);
            }),
            (o.prototype.eq = function (t) {
              return 0 === this.cmp(t);
            }),
            (o.red = function (t) {
              return new M(t);
            }),
            (o.prototype.toRed = function (t) {
              return (
                n(!this.red, 'Already a number in reduction context'),
                n(0 === this.negative, 'red works only with positives'),
                t.convertTo(this)._forceRed(t)
              );
            }),
            (o.prototype.fromRed = function () {
              return n(this.red, 'fromRed works only with numbers in reduction context'), this.red.convertFrom(this);
            }),
            (o.prototype._forceRed = function (t) {
              return (this.red = t), this;
            }),
            (o.prototype.forceRed = function (t) {
              return n(!this.red, 'Already a number in reduction context'), this._forceRed(t);
            }),
            (o.prototype.redAdd = function (t) {
              return n(this.red, 'redAdd works only with red numbers'), this.red.add(this, t);
            }),
            (o.prototype.redIAdd = function (t) {
              return n(this.red, 'redIAdd works only with red numbers'), this.red.iadd(this, t);
            }),
            (o.prototype.redSub = function (t) {
              return n(this.red, 'redSub works only with red numbers'), this.red.sub(this, t);
            }),
            (o.prototype.redISub = function (t) {
              return n(this.red, 'redISub works only with red numbers'), this.red.isub(this, t);
            }),
            (o.prototype.redShl = function (t) {
              return n(this.red, 'redShl works only with red numbers'), this.red.shl(this, t);
            }),
            (o.prototype.redMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.mul(this, t)
              );
            }),
            (o.prototype.redIMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.imul(this, t)
              );
            }),
            (o.prototype.redSqr = function () {
              return n(this.red, 'redSqr works only with red numbers'), this.red._verify1(this), this.red.sqr(this);
            }),
            (o.prototype.redISqr = function () {
              return n(this.red, 'redISqr works only with red numbers'), this.red._verify1(this), this.red.isqr(this);
            }),
            (o.prototype.redSqrt = function () {
              return n(this.red, 'redSqrt works only with red numbers'), this.red._verify1(this), this.red.sqrt(this);
            }),
            (o.prototype.redInvm = function () {
              return n(this.red, 'redInvm works only with red numbers'), this.red._verify1(this), this.red.invm(this);
            }),
            (o.prototype.redNeg = function () {
              return n(this.red, 'redNeg works only with red numbers'), this.red._verify1(this), this.red.neg(this);
            }),
            (o.prototype.redPow = function (t) {
              return n(this.red && !t.red, 'redPow(normalNum)'), this.red._verify1(this), this.red.pow(this, t);
            });
          var m = { k256: null, p224: null, p192: null, p25519: null };
          function v(t, e) {
            (this.name = t),
              (this.p = new o(e, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new o(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp());
          }
          function g() {
            v.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
          }
          function y() {
            v.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
          }
          function w() {
            v.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
          }
          function _() {
            v.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
          }
          function M(t) {
            if ('string' == typeof t) {
              var e = o._prime(t);
              (this.m = e.p), (this.prime = e);
            } else n(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null);
          }
          function x(t) {
            M.call(this, t),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new o(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv));
          }
          (v.prototype._tmp = function () {
            var t = new o(null);
            return (t.words = new Array(Math.ceil(this.n / 13))), t;
          }),
            (v.prototype.ireduce = function (t) {
              var e,
                r = t;
              do {
                this.split(r, this.tmp), (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
              } while (e > this.n);
              var n = e < this.n ? -1 : r.ucmp(this.p);
              return (
                0 === n
                  ? ((r.words[0] = 0), (r.length = 1))
                  : n > 0
                  ? r.isub(this.p)
                  : void 0 !== r.strip
                  ? r.strip()
                  : r._strip(),
                r
              );
            }),
            (v.prototype.split = function (t, e) {
              t.iushrn(this.n, 0, e);
            }),
            (v.prototype.imulK = function (t) {
              return t.imul(this.k);
            }),
            i(g, v),
            (g.prototype.split = function (t, e) {
              for (var r = Math.min(t.length, 9), n = 0; n < r; n++) e.words[n] = t.words[n];
              if (((e.length = r), t.length <= 9)) return (t.words[0] = 0), void (t.length = 1);
              var i = t.words[9];
              for (e.words[e.length++] = 4194303 & i, n = 10; n < t.length; n++) {
                var o = 0 | t.words[n];
                (t.words[n - 10] = ((4194303 & o) << 4) | (i >>> 22)), (i = o);
              }
              (i >>>= 22), (t.words[n - 10] = i), 0 === i && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
            }),
            (g.prototype.imulK = function (t) {
              (t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2);
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 0 | t.words[r];
                (e += 977 * n), (t.words[r] = 67108863 & e), (e = 64 * n + ((e / 67108864) | 0));
              }
              return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t;
            }),
            i(y, v),
            i(w, v),
            i(_, v),
            (_.prototype.imulK = function (t) {
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 19 * (0 | t.words[r]) + e,
                  i = 67108863 & n;
                (n >>>= 26), (t.words[r] = i), (e = n);
              }
              return 0 !== e && (t.words[t.length++] = e), t;
            }),
            (o._prime = function (t) {
              if (m[t]) return m[t];
              var e;
              if ('k256' === t) e = new g();
              else if ('p224' === t) e = new y();
              else if ('p192' === t) e = new w();
              else {
                if ('p25519' !== t) throw new Error('Unknown prime ' + t);
                e = new _();
              }
              return (m[t] = e), e;
            }),
            (M.prototype._verify1 = function (t) {
              n(0 === t.negative, 'red works only with positives'), n(t.red, 'red works only with red numbers');
            }),
            (M.prototype._verify2 = function (t, e) {
              n(0 == (t.negative | e.negative), 'red works only with positives'),
                n(t.red && t.red === e.red, 'red works only with red numbers');
            }),
            (M.prototype.imod = function (t) {
              return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this);
            }),
            (M.prototype.neg = function (t) {
              return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
            }),
            (M.prototype.add = function (t, e) {
              this._verify2(t, e);
              var r = t.add(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
            }),
            (M.prototype.iadd = function (t, e) {
              this._verify2(t, e);
              var r = t.iadd(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r;
            }),
            (M.prototype.sub = function (t, e) {
              this._verify2(t, e);
              var r = t.sub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
            }),
            (M.prototype.isub = function (t, e) {
              this._verify2(t, e);
              var r = t.isub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r;
            }),
            (M.prototype.shl = function (t, e) {
              return this._verify1(t), this.imod(t.ushln(e));
            }),
            (M.prototype.imul = function (t, e) {
              return this._verify2(t, e), this.imod(t.imul(e));
            }),
            (M.prototype.mul = function (t, e) {
              return this._verify2(t, e), this.imod(t.mul(e));
            }),
            (M.prototype.isqr = function (t) {
              return this.imul(t, t.clone());
            }),
            (M.prototype.sqr = function (t) {
              return this.mul(t, t);
            }),
            (M.prototype.sqrt = function (t) {
              if (t.isZero()) return t.clone();
              var e = this.m.andln(3);
              if ((n(e % 2 == 1), 3 === e)) {
                var r = this.m.add(new o(1)).iushrn(2);
                return this.pow(t, r);
              }
              for (var i = this.m.subn(1), a = 0; !i.isZero() && 0 === i.andln(1); ) a++, i.iushrn(1);
              n(!i.isZero());
              var s = new o(1).toRed(this),
                f = s.redNeg(),
                u = this.m.subn(1).iushrn(1),
                c = this.m.bitLength();
              for (c = new o(2 * c * c).toRed(this); 0 !== this.pow(c, u).cmp(f); ) c.redIAdd(f);
              for (
                var h = this.pow(c, i), d = this.pow(t, i.addn(1).iushrn(1)), l = this.pow(t, i), p = a;
                0 !== l.cmp(s);

              ) {
                for (var b = l, m = 0; 0 !== b.cmp(s); m++) b = b.redSqr();
                n(m < p);
                var v = this.pow(h, new o(1).iushln(p - m - 1));
                (d = d.redMul(v)), (h = v.redSqr()), (l = l.redMul(h)), (p = m);
              }
              return d;
            }),
            (M.prototype.invm = function (t) {
              var e = t._invmp(this.m);
              return 0 !== e.negative ? ((e.negative = 0), this.imod(e).redNeg()) : this.imod(e);
            }),
            (M.prototype.pow = function (t, e) {
              if (e.isZero()) return new o(1).toRed(this);
              if (0 === e.cmpn(1)) return t.clone();
              var r = new Array(16);
              (r[0] = new o(1).toRed(this)), (r[1] = t);
              for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
              var i = r[0],
                a = 0,
                s = 0,
                f = e.bitLength() % 26;
              for (0 === f && (f = 26), n = e.length - 1; n >= 0; n--) {
                for (var u = e.words[n], c = f - 1; c >= 0; c--) {
                  var h = (u >> c) & 1;
                  i !== r[0] && (i = this.sqr(i)),
                    0 !== h || 0 !== a
                      ? ((a <<= 1),
                        (a |= h),
                        (4 === ++s || (0 === n && 0 === c)) && ((i = this.mul(i, r[a])), (s = 0), (a = 0)))
                      : (s = 0);
                }
                f = 26;
              }
              return i;
            }),
            (M.prototype.convertTo = function (t) {
              var e = t.umod(this.m);
              return e === t ? e.clone() : e;
            }),
            (M.prototype.convertFrom = function (t) {
              var e = t.clone();
              return (e.red = null), e;
            }),
            (o.mont = function (t) {
              return new x(t);
            }),
            i(x, M),
            (x.prototype.convertTo = function (t) {
              return this.imod(t.ushln(this.shift));
            }),
            (x.prototype.convertFrom = function (t) {
              var e = this.imod(t.mul(this.rinv));
              return (e.red = null), e;
            }),
            (x.prototype.imul = function (t, e) {
              if (t.isZero() || e.isZero()) return (t.words[0] = 0), (t.length = 1), t;
              var r = t.imul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                o = i;
              return (
                i.cmp(this.m) >= 0 ? (o = i.isub(this.m)) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
              );
            }),
            (x.prototype.mul = function (t, e) {
              if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
              var r = t.mul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                a = i;
              return (
                i.cmp(this.m) >= 0 ? (a = i.isub(this.m)) : i.cmpn(0) < 0 && (a = i.iadd(this.m)), a._forceRed(this)
              );
            }),
            (x.prototype.invm = function (t) {
              return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
            });
        })(void 0 === e || e, this);
      },
      { buffer: 17 },
    ],
    16: [
      function (t, e, r) {
        var n;
        function i(t) {
          this.rand = t;
        }
        if (
          ((e.exports = function (t) {
            return n || (n = new i(null)), n.generate(t);
          }),
          (e.exports.Rand = i),
          (i.prototype.generate = function (t) {
            return this._rand(t);
          }),
          (i.prototype._rand = function (t) {
            if (this.rand.getBytes) return this.rand.getBytes(t);
            for (var e = new Uint8Array(t), r = 0; r < e.length; r++) e[r] = this.rand.getByte();
            return e;
          }),
          'object' == typeof self)
        )
          self.crypto && self.crypto.getRandomValues
            ? (i.prototype._rand = function (t) {
                var e = new Uint8Array(t);
                return self.crypto.getRandomValues(e), e;
              })
            : self.msCrypto && self.msCrypto.getRandomValues
            ? (i.prototype._rand = function (t) {
                var e = new Uint8Array(t);
                return self.msCrypto.getRandomValues(e), e;
              })
            : 'object' == typeof window &&
              (i.prototype._rand = function () {
                throw new Error('Not implemented yet');
              });
        else
          try {
            var o = t('crypto');
            if ('function' != typeof o.randomBytes) throw new Error('Not supported');
            i.prototype._rand = function (t) {
              return o.randomBytes(t);
            };
          } catch (t) {}
      },
      { crypto: 17 },
    ],
    17: [function (t, e, r) {}, {}],
    18: [
      function (t, e, r) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        'use strict';
        var n = t('base64-js'),
          i = t('ieee754');
        (r.Buffer = a),
          (r.SlowBuffer = function (t) {
            +t != t && (t = 0);
            return a.alloc(+t);
          }),
          (r.INSPECT_MAX_BYTES = 50);
        function o(t) {
          if (t > 2147483647) throw new RangeError('The value "' + t + '" is invalid for option "size"');
          var e = new Uint8Array(t);
          return (e.__proto__ = a.prototype), e;
        }
        function a(t, e, r) {
          if ('number' == typeof t) {
            if ('string' == typeof e)
              throw new TypeError('The "string" argument must be of type string. Received type number');
            return u(t);
          }
          return s(t, e, r);
        }
        function s(t, e, r) {
          if ('string' == typeof t)
            return (function (t, e) {
              ('string' == typeof e && '' !== e) || (e = 'utf8');
              if (!a.isEncoding(e)) throw new TypeError('Unknown encoding: ' + e);
              var r = 0 | d(t, e),
                n = o(r),
                i = n.write(t, e);
              i !== r && (n = n.slice(0, i));
              return n;
            })(t, e);
          if (ArrayBuffer.isView(t)) return c(t);
          if (null == t)
            throw TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                typeof t
            );
          if (q(t, ArrayBuffer) || (t && q(t.buffer, ArrayBuffer)))
            return (function (t, e, r) {
              if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
              if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
              var n;
              n =
                void 0 === e && void 0 === r
                  ? new Uint8Array(t)
                  : void 0 === r
                  ? new Uint8Array(t, e)
                  : new Uint8Array(t, e, r);
              return (n.__proto__ = a.prototype), n;
            })(t, e, r);
          if ('number' == typeof t)
            throw new TypeError('The "value" argument must not be of type number. Received type number');
          var n = t.valueOf && t.valueOf();
          if (null != n && n !== t) return a.from(n, e, r);
          var i = (function (t) {
            if (a.isBuffer(t)) {
              var e = 0 | h(t.length),
                r = o(e);
              return 0 === r.length || t.copy(r, 0, 0, e), r;
            }
            if (void 0 !== t.length) return 'number' != typeof t.length || U(t.length) ? o(0) : c(t);
            if ('Buffer' === t.type && Array.isArray(t.data)) return c(t.data);
          })(t);
          if (i) return i;
          if ('undefined' != typeof Symbol && null != Symbol.toPrimitive && 'function' == typeof t[Symbol.toPrimitive])
            return a.from(t[Symbol.toPrimitive]('string'), e, r);
          throw new TypeError(
            'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
              typeof t
          );
        }
        function f(t) {
          if ('number' != typeof t) throw new TypeError('"size" argument must be of type number');
          if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
        }
        function u(t) {
          return f(t), o(t < 0 ? 0 : 0 | h(t));
        }
        function c(t) {
          for (var e = t.length < 0 ? 0 : 0 | h(t.length), r = o(e), n = 0; n < e; n += 1) r[n] = 255 & t[n];
          return r;
        }
        function h(t) {
          if (t >= 2147483647)
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' + (2147483647).toString(16) + ' bytes'
            );
          return 0 | t;
        }
        function d(t, e) {
          if (a.isBuffer(t)) return t.length;
          if (ArrayBuffer.isView(t) || q(t, ArrayBuffer)) return t.byteLength;
          if ('string' != typeof t)
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t
            );
          var r = t.length,
            n = arguments.length > 2 && !0 === arguments[2];
          if (!n && 0 === r) return 0;
          for (var i = !1; ; )
            switch (e) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return r;
              case 'utf8':
              case 'utf-8':
                return N(t).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * r;
              case 'hex':
                return r >>> 1;
              case 'base64':
                return C(t).length;
              default:
                if (i) return n ? -1 : N(t).length;
                (e = ('' + e).toLowerCase()), (i = !0);
            }
        }
        function l(t, e, r) {
          var n = !1;
          if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
          if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return '';
          if ((r >>>= 0) <= (e >>>= 0)) return '';
          for (t || (t = 'utf8'); ; )
            switch (t) {
              case 'hex':
                return k(this, e, r);
              case 'utf8':
              case 'utf-8':
                return S(this, e, r);
              case 'ascii':
                return A(this, e, r);
              case 'latin1':
              case 'binary':
                return E(this, e, r);
              case 'base64':
                return x(this, e, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return I(this, e, r);
              default:
                if (n) throw new TypeError('Unknown encoding: ' + t);
                (t = (t + '').toLowerCase()), (n = !0);
            }
        }
        function p(t, e, r) {
          var n = t[e];
          (t[e] = t[r]), (t[r] = n);
        }
        function b(t, e, r, n, i) {
          if (0 === t.length) return -1;
          if (
            ('string' == typeof r
              ? ((n = r), (r = 0))
              : r > 2147483647
              ? (r = 2147483647)
              : r < -2147483648 && (r = -2147483648),
            U((r = +r)) && (r = i ? 0 : t.length - 1),
            r < 0 && (r = t.length + r),
            r >= t.length)
          ) {
            if (i) return -1;
            r = t.length - 1;
          } else if (r < 0) {
            if (!i) return -1;
            r = 0;
          }
          if (('string' == typeof e && (e = a.from(e, n)), a.isBuffer(e)))
            return 0 === e.length ? -1 : m(t, e, r, n, i);
          if ('number' == typeof e)
            return (
              (e &= 255),
              'function' == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(t, e, r)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                : m(t, [e], r, n, i)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function m(t, e, r, n, i) {
          var o,
            a = 1,
            s = t.length,
            f = e.length;
          if (
            void 0 !== n &&
            ('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
          ) {
            if (t.length < 2 || e.length < 2) return -1;
            (a = 2), (s /= 2), (f /= 2), (r /= 2);
          }
          function u(t, e) {
            return 1 === a ? t[e] : t.readUInt16BE(e * a);
          }
          if (i) {
            var c = -1;
            for (o = r; o < s; o++)
              if (u(t, o) === u(e, -1 === c ? 0 : o - c)) {
                if ((-1 === c && (c = o), o - c + 1 === f)) return c * a;
              } else -1 !== c && (o -= o - c), (c = -1);
          } else
            for (r + f > s && (r = s - f), o = r; o >= 0; o--) {
              for (var h = !0, d = 0; d < f; d++)
                if (u(t, o + d) !== u(e, d)) {
                  h = !1;
                  break;
                }
              if (h) return o;
            }
          return -1;
        }
        function v(t, e, r, n) {
          r = Number(r) || 0;
          var i = t.length - r;
          n ? (n = Number(n)) > i && (n = i) : (n = i);
          var o = e.length;
          n > o / 2 && (n = o / 2);
          for (var a = 0; a < n; ++a) {
            var s = parseInt(e.substr(2 * a, 2), 16);
            if (U(s)) return a;
            t[r + a] = s;
          }
          return a;
        }
        function g(t, e, r, n) {
          return z(N(e, t.length - r), t, r, n);
        }
        function y(t, e, r, n) {
          return z(
            (function (t) {
              for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
              return e;
            })(e),
            t,
            r,
            n
          );
        }
        function w(t, e, r, n) {
          return y(t, e, r, n);
        }
        function _(t, e, r, n) {
          return z(C(e), t, r, n);
        }
        function M(t, e, r, n) {
          return z(
            (function (t, e) {
              for (var r, n, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); ++a)
                (r = t.charCodeAt(a)), (n = r >> 8), (i = r % 256), o.push(i), o.push(n);
              return o;
            })(e, t.length - r),
            t,
            r,
            n
          );
        }
        function x(t, e, r) {
          return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
        }
        function S(t, e, r) {
          r = Math.min(t.length, r);
          for (var n = [], i = e; i < r; ) {
            var o,
              a,
              s,
              f,
              u = t[i],
              c = null,
              h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
            if (i + h <= r)
              switch (h) {
                case 1:
                  u < 128 && (c = u);
                  break;
                case 2:
                  128 == (192 & (o = t[i + 1])) && (f = ((31 & u) << 6) | (63 & o)) > 127 && (c = f);
                  break;
                case 3:
                  (o = t[i + 1]),
                    (a = t[i + 2]),
                    128 == (192 & o) &&
                      128 == (192 & a) &&
                      (f = ((15 & u) << 12) | ((63 & o) << 6) | (63 & a)) > 2047 &&
                      (f < 55296 || f > 57343) &&
                      (c = f);
                  break;
                case 4:
                  (o = t[i + 1]),
                    (a = t[i + 2]),
                    (s = t[i + 3]),
                    128 == (192 & o) &&
                      128 == (192 & a) &&
                      128 == (192 & s) &&
                      (f = ((15 & u) << 18) | ((63 & o) << 12) | ((63 & a) << 6) | (63 & s)) > 65535 &&
                      f < 1114112 &&
                      (c = f);
              }
            null === c
              ? ((c = 65533), (h = 1))
              : c > 65535 && ((c -= 65536), n.push(((c >>> 10) & 1023) | 55296), (c = 56320 | (1023 & c))),
              n.push(c),
              (i += h);
          }
          return (function (t) {
            var e = t.length;
            if (e <= 4096) return String.fromCharCode.apply(String, t);
            var r = '',
              n = 0;
            for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += 4096)));
            return r;
          })(n);
        }
        (r.kMaxLength = 2147483647),
          (a.TYPED_ARRAY_SUPPORT = (function () {
            try {
              var t = new Uint8Array(1);
              return (
                (t.__proto__ = {
                  __proto__: Uint8Array.prototype,
                  foo: function () {
                    return 42;
                  },
                }),
                42 === t.foo()
              );
            } catch (t) {
              return !1;
            }
          })()),
          a.TYPED_ARRAY_SUPPORT ||
            'undefined' == typeof console ||
            'function' != typeof console.error ||
            console.error(
              'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
            ),
          Object.defineProperty(a.prototype, 'parent', {
            enumerable: !0,
            get: function () {
              if (a.isBuffer(this)) return this.buffer;
            },
          }),
          Object.defineProperty(a.prototype, 'offset', {
            enumerable: !0,
            get: function () {
              if (a.isBuffer(this)) return this.byteOffset;
            },
          }),
          'undefined' != typeof Symbol &&
            null != Symbol.species &&
            a[Symbol.species] === a &&
            Object.defineProperty(a, Symbol.species, { value: null, configurable: !0, enumerable: !1, writable: !1 }),
          (a.poolSize = 8192),
          (a.from = function (t, e, r) {
            return s(t, e, r);
          }),
          (a.prototype.__proto__ = Uint8Array.prototype),
          (a.__proto__ = Uint8Array),
          (a.alloc = function (t, e, r) {
            return (function (t, e, r) {
              return (
                f(t), t <= 0 ? o(t) : void 0 !== e ? ('string' == typeof r ? o(t).fill(e, r) : o(t).fill(e)) : o(t)
              );
            })(t, e, r);
          }),
          (a.allocUnsafe = function (t) {
            return u(t);
          }),
          (a.allocUnsafeSlow = function (t) {
            return u(t);
          }),
          (a.isBuffer = function (t) {
            return null != t && !0 === t._isBuffer && t !== a.prototype;
          }),
          (a.compare = function (t, e) {
            if (
              (q(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
              q(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
              !a.isBuffer(t) || !a.isBuffer(e))
            )
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === e) return 0;
            for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
              if (t[i] !== e[i]) {
                (r = t[i]), (n = e[i]);
                break;
              }
            return r < n ? -1 : n < r ? 1 : 0;
          }),
          (a.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0;
              default:
                return !1;
            }
          }),
          (a.concat = function (t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return a.alloc(0);
            var r;
            if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            var n = a.allocUnsafe(e),
              i = 0;
            for (r = 0; r < t.length; ++r) {
              var o = t[r];
              if ((q(o, Uint8Array) && (o = a.from(o)), !a.isBuffer(o)))
                throw new TypeError('"list" argument must be an Array of Buffers');
              o.copy(n, i), (i += o.length);
            }
            return n;
          }),
          (a.byteLength = d),
          (a.prototype._isBuffer = !0),
          (a.prototype.swap16 = function () {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (var e = 0; e < t; e += 2) p(this, e, e + 1);
            return this;
          }),
          (a.prototype.swap32 = function () {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (var e = 0; e < t; e += 4) p(this, e, e + 3), p(this, e + 1, e + 2);
            return this;
          }),
          (a.prototype.swap64 = function () {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (var e = 0; e < t; e += 8)
              p(this, e, e + 7), p(this, e + 1, e + 6), p(this, e + 2, e + 5), p(this, e + 3, e + 4);
            return this;
          }),
          (a.prototype.toString = function () {
            var t = this.length;
            return 0 === t ? '' : 0 === arguments.length ? S(this, 0, t) : l.apply(this, arguments);
          }),
          (a.prototype.toLocaleString = a.prototype.toString),
          (a.prototype.equals = function (t) {
            if (!a.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
            return this === t || 0 === a.compare(this, t);
          }),
          (a.prototype.inspect = function () {
            var t = '',
              e = r.INSPECT_MAX_BYTES;
            return (
              (t = this.toString('hex', 0, e)
                .replace(/(.{2})/g, '$1 ')
                .trim()),
              this.length > e && (t += ' ... '),
              '<Buffer ' + t + '>'
            );
          }),
          (a.prototype.compare = function (t, e, r, n, i) {
            if ((q(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), !a.isBuffer(t)))
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
              );
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = this.length),
              e < 0 || r > t.length || n < 0 || i > this.length)
            )
              throw new RangeError('out of range index');
            if (n >= i && e >= r) return 0;
            if (n >= i) return -1;
            if (e >= r) return 1;
            if (this === t) return 0;
            for (
              var o = (i >>>= 0) - (n >>>= 0),
                s = (r >>>= 0) - (e >>>= 0),
                f = Math.min(o, s),
                u = this.slice(n, i),
                c = t.slice(e, r),
                h = 0;
              h < f;
              ++h
            )
              if (u[h] !== c[h]) {
                (o = u[h]), (s = c[h]);
                break;
              }
            return o < s ? -1 : s < o ? 1 : 0;
          }),
          (a.prototype.includes = function (t, e, r) {
            return -1 !== this.indexOf(t, e, r);
          }),
          (a.prototype.indexOf = function (t, e, r) {
            return b(this, t, e, r, !0);
          }),
          (a.prototype.lastIndexOf = function (t, e, r) {
            return b(this, t, e, r, !1);
          }),
          (a.prototype.write = function (t, e, r, n) {
            if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0);
            else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0);
            else {
              if (!isFinite(e))
                throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
              (e >>>= 0), isFinite(r) ? ((r >>>= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0));
            }
            var i = this.length - e;
            if (((void 0 === r || r > i) && (r = i), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
              throw new RangeError('Attempt to write outside buffer bounds');
            n || (n = 'utf8');
            for (var o = !1; ; )
              switch (n) {
                case 'hex':
                  return v(this, t, e, r);
                case 'utf8':
                case 'utf-8':
                  return g(this, t, e, r);
                case 'ascii':
                  return y(this, t, e, r);
                case 'latin1':
                case 'binary':
                  return w(this, t, e, r);
                case 'base64':
                  return _(this, t, e, r);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return M(this, t, e, r);
                default:
                  if (o) throw new TypeError('Unknown encoding: ' + n);
                  (n = ('' + n).toLowerCase()), (o = !0);
              }
          }),
          (a.prototype.toJSON = function () {
            return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
          });
        function A(t, e, r) {
          var n = '';
          r = Math.min(t.length, r);
          for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
          return n;
        }
        function E(t, e, r) {
          var n = '';
          r = Math.min(t.length, r);
          for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
          return n;
        }
        function k(t, e, r) {
          var n = t.length;
          (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
          for (var i = '', o = e; o < r; ++o) i += P(t[o]);
          return i;
        }
        function I(t, e, r) {
          for (var n = t.slice(e, r), i = '', o = 0; o < n.length; o += 2)
            i += String.fromCharCode(n[o] + 256 * n[o + 1]);
          return i;
        }
        function T(t, e, r) {
          if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
          if (t + e > r) throw new RangeError('Trying to access beyond buffer length');
        }
        function R(t, e, r, n, i, o) {
          if (!a.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
          if (r + n > t.length) throw new RangeError('Index out of range');
        }
        function j(t, e, r, n, i, o) {
          if (r + n > t.length) throw new RangeError('Index out of range');
          if (r < 0) throw new RangeError('Index out of range');
        }
        function O(t, e, r, n, o) {
          return (e = +e), (r >>>= 0), o || j(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4;
        }
        function B(t, e, r, n, o) {
          return (e = +e), (r >>>= 0), o || j(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8;
        }
        (a.prototype.slice = function (t, e) {
          var r = this.length;
          (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            e < t && (e = t);
          var n = this.subarray(t, e);
          return (n.__proto__ = a.prototype), n;
        }),
          (a.prototype.readUIntLE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); ) n += this[t + o] * i;
            return n;
          }),
          (a.prototype.readUIntBE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
            for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); ) n += this[t + --e] * i;
            return n;
          }),
          (a.prototype.readUInt8 = function (t, e) {
            return (t >>>= 0), e || T(t, 1, this.length), this[t];
          }),
          (a.prototype.readUInt16LE = function (t, e) {
            return (t >>>= 0), e || T(t, 2, this.length), this[t] | (this[t + 1] << 8);
          }),
          (a.prototype.readUInt16BE = function (t, e) {
            return (t >>>= 0), e || T(t, 2, this.length), (this[t] << 8) | this[t + 1];
          }),
          (a.prototype.readUInt32LE = function (t, e) {
            return (
              (t >>>= 0),
              e || T(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
            );
          }),
          (a.prototype.readUInt32BE = function (t, e) {
            return (
              (t >>>= 0),
              e || T(t, 4, this.length),
              16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
          }),
          (a.prototype.readIntLE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); ) n += this[t + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
          }),
          (a.prototype.readIntBE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
            for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256); ) o += this[t + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
          }),
          (a.prototype.readInt8 = function (t, e) {
            return (t >>>= 0), e || T(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
          }),
          (a.prototype.readInt16LE = function (t, e) {
            (t >>>= 0), e || T(t, 2, this.length);
            var r = this[t] | (this[t + 1] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (a.prototype.readInt16BE = function (t, e) {
            (t >>>= 0), e || T(t, 2, this.length);
            var r = this[t + 1] | (this[t] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (a.prototype.readInt32LE = function (t, e) {
            return (
              (t >>>= 0),
              e || T(t, 4, this.length),
              this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
            );
          }),
          (a.prototype.readInt32BE = function (t, e) {
            return (
              (t >>>= 0),
              e || T(t, 4, this.length),
              (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
            );
          }),
          (a.prototype.readFloatLE = function (t, e) {
            return (t >>>= 0), e || T(t, 4, this.length), i.read(this, t, !0, 23, 4);
          }),
          (a.prototype.readFloatBE = function (t, e) {
            return (t >>>= 0), e || T(t, 4, this.length), i.read(this, t, !1, 23, 4);
          }),
          (a.prototype.readDoubleLE = function (t, e) {
            return (t >>>= 0), e || T(t, 8, this.length), i.read(this, t, !0, 52, 8);
          }),
          (a.prototype.readDoubleBE = function (t, e) {
            return (t >>>= 0), e || T(t, 8, this.length), i.read(this, t, !1, 52, 8);
          }),
          (a.prototype.writeUIntLE = function (t, e, r, n) {
            ((t = +t), (e >>>= 0), (r >>>= 0), n) || R(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = 1,
              o = 0;
            for (this[e] = 255 & t; ++o < r && (i *= 256); ) this[e + o] = (t / i) & 255;
            return e + r;
          }),
          (a.prototype.writeUIntBE = function (t, e, r, n) {
            ((t = +t), (e >>>= 0), (r >>>= 0), n) || R(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
            var i = r - 1,
              o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); ) this[e + i] = (t / o) & 255;
            return e + r;
          }),
          (a.prototype.writeUInt8 = function (t, e, r) {
            return (t = +t), (e >>>= 0), r || R(this, t, e, 1, 255, 0), (this[e] = 255 & t), e + 1;
          }),
          (a.prototype.writeUInt16LE = function (t, e, r) {
            return (
              (t = +t), (e >>>= 0), r || R(this, t, e, 2, 65535, 0), (this[e] = 255 & t), (this[e + 1] = t >>> 8), e + 2
            );
          }),
          (a.prototype.writeUInt16BE = function (t, e, r) {
            return (
              (t = +t), (e >>>= 0), r || R(this, t, e, 2, 65535, 0), (this[e] = t >>> 8), (this[e + 1] = 255 & t), e + 2
            );
          }),
          (a.prototype.writeUInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || R(this, t, e, 4, 4294967295, 0),
              (this[e + 3] = t >>> 24),
              (this[e + 2] = t >>> 16),
              (this[e + 1] = t >>> 8),
              (this[e] = 255 & t),
              e + 4
            );
          }),
          (a.prototype.writeUInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || R(this, t, e, 4, 4294967295, 0),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
          (a.prototype.writeIntLE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              var i = Math.pow(2, 8 * r - 1);
              R(this, t, e, r, i - 1, -i);
            }
            var o = 0,
              a = 1,
              s = 0;
            for (this[e] = 255 & t; ++o < r && (a *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), (this[e + o] = (((t / a) >> 0) - s) & 255);
            return e + r;
          }),
          (a.prototype.writeIntBE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              var i = Math.pow(2, 8 * r - 1);
              R(this, t, e, r, i - 1, -i);
            }
            var o = r - 1,
              a = 1,
              s = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), (this[e + o] = (((t / a) >> 0) - s) & 255);
            return e + r;
          }),
          (a.prototype.writeInt8 = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || R(this, t, e, 1, 127, -128),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (a.prototype.writeInt16LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || R(this, t, e, 2, 32767, -32768),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
          (a.prototype.writeInt16BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || R(this, t, e, 2, 32767, -32768),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
          (a.prototype.writeInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || R(this, t, e, 4, 2147483647, -2147483648),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              (this[e + 2] = t >>> 16),
              (this[e + 3] = t >>> 24),
              e + 4
            );
          }),
          (a.prototype.writeInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || R(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
          (a.prototype.writeFloatLE = function (t, e, r) {
            return O(this, t, e, !0, r);
          }),
          (a.prototype.writeFloatBE = function (t, e, r) {
            return O(this, t, e, !1, r);
          }),
          (a.prototype.writeDoubleLE = function (t, e, r) {
            return B(this, t, e, !0, r);
          }),
          (a.prototype.writeDoubleBE = function (t, e, r) {
            return B(this, t, e, !1, r);
          }),
          (a.prototype.copy = function (t, e, r, n) {
            if (!a.isBuffer(t)) throw new TypeError('argument should be a Buffer');
            if (
              (r || (r = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && n < r && (n = r),
              n === r)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError('targetStart out of bounds');
            if (r < 0 || r >= this.length) throw new RangeError('Index out of range');
            if (n < 0) throw new RangeError('sourceEnd out of bounds');
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            var i = n - r;
            if (this === t && 'function' == typeof Uint8Array.prototype.copyWithin) this.copyWithin(e, r, n);
            else if (this === t && r < e && e < n) for (var o = i - 1; o >= 0; --o) t[o + e] = this[o + r];
            else Uint8Array.prototype.set.call(t, this.subarray(r, n), e);
            return i;
          }),
          (a.prototype.fill = function (t, e, r, n) {
            if ('string' == typeof t) {
              if (
                ('string' == typeof e
                  ? ((n = e), (e = 0), (r = this.length))
                  : 'string' == typeof r && ((n = r), (r = this.length)),
                void 0 !== n && 'string' != typeof n)
              )
                throw new TypeError('encoding must be a string');
              if ('string' == typeof n && !a.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n);
              if (1 === t.length) {
                var i = t.charCodeAt(0);
                (('utf8' === n && i < 128) || 'latin1' === n) && (t = i);
              }
            } else 'number' == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index');
            if (r <= e) return this;
            var o;
            if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
              for (o = e; o < r; ++o) this[o] = t;
            else {
              var s = a.isBuffer(t) ? t : a.from(t, n),
                f = s.length;
              if (0 === f) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
              for (o = 0; o < r - e; ++o) this[o + e] = s[o % f];
            }
            return this;
          });
        var L = /[^+/0-9A-Za-z-_]/g;
        function P(t) {
          return t < 16 ? '0' + t.toString(16) : t.toString(16);
        }
        function N(t, e) {
          var r;
          e = e || 1 / 0;
          for (var n = t.length, i = null, o = [], a = 0; a < n; ++a) {
            if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
              if (!i) {
                if (r > 56319) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (a + 1 === n) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = r;
                continue;
              }
              if (r < 56320) {
                (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
                continue;
              }
              r = 65536 + (((i - 55296) << 10) | (r - 56320));
            } else i && (e -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), r < 128)) {
              if ((e -= 1) < 0) break;
              o.push(r);
            } else if (r < 2048) {
              if ((e -= 2) < 0) break;
              o.push((r >> 6) | 192, (63 & r) | 128);
            } else if (r < 65536) {
              if ((e -= 3) < 0) break;
              o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
            } else {
              if (!(r < 1114112)) throw new Error('Invalid code point');
              if ((e -= 4) < 0) break;
              o.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (63 & r) | 128);
            }
          }
          return o;
        }
        function C(t) {
          return n.toByteArray(
            (function (t) {
              if ((t = (t = t.split('=')[0]).trim().replace(L, '')).length < 2) return '';
              for (; t.length % 4 != 0; ) t += '=';
              return t;
            })(t)
          );
        }
        function z(t, e, r, n) {
          for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
          return i;
        }
        function q(t, e) {
          return (
            t instanceof e ||
            (null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name)
          );
        }
        function U(t) {
          return t != t;
        }
      },
      { 'base64-js': 14, ieee754: 79 },
    ],
    19: [
      function (t, e, r) {
        var n =
            Object.create ||
            function (t) {
              var e = function () {};
              return (e.prototype = t), new e();
            },
          i =
            Object.keys ||
            function (t) {
              var e = [];
              for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
              return r;
            },
          o =
            Function.prototype.bind ||
            function (t) {
              var e = this;
              return function () {
                return e.apply(t, arguments);
              };
            };
        function a() {
          (this._events && Object.prototype.hasOwnProperty.call(this, '_events')) ||
            ((this._events = n(null)), (this._eventsCount = 0)),
            (this._maxListeners = this._maxListeners || void 0);
        }
        (e.exports = a), (a.EventEmitter = a), (a.prototype._events = void 0), (a.prototype._maxListeners = void 0);
        var s,
          f = 10;
        try {
          var u = {};
          Object.defineProperty && Object.defineProperty(u, 'x', { value: 0 }), (s = 0 === u.x);
        } catch (t) {
          s = !1;
        }
        function c(t) {
          return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners;
        }
        function h(t, e, r) {
          if (e) t.call(r);
          else for (var n = t.length, i = _(t, n), o = 0; o < n; ++o) i[o].call(r);
        }
        function d(t, e, r, n) {
          if (e) t.call(r, n);
          else for (var i = t.length, o = _(t, i), a = 0; a < i; ++a) o[a].call(r, n);
        }
        function l(t, e, r, n, i) {
          if (e) t.call(r, n, i);
          else for (var o = t.length, a = _(t, o), s = 0; s < o; ++s) a[s].call(r, n, i);
        }
        function p(t, e, r, n, i, o) {
          if (e) t.call(r, n, i, o);
          else for (var a = t.length, s = _(t, a), f = 0; f < a; ++f) s[f].call(r, n, i, o);
        }
        function b(t, e, r, n) {
          if (e) t.apply(r, n);
          else for (var i = t.length, o = _(t, i), a = 0; a < i; ++a) o[a].apply(r, n);
        }
        function m(t, e, r, i) {
          var o, a, s;
          if ('function' != typeof r) throw new TypeError('"listener" argument must be a function');
          if (
            ((a = t._events)
              ? (a.newListener && (t.emit('newListener', e, r.listener ? r.listener : r), (a = t._events)), (s = a[e]))
              : ((a = t._events = n(null)), (t._eventsCount = 0)),
            s)
          ) {
            if (
              ('function' == typeof s ? (s = a[e] = i ? [r, s] : [s, r]) : i ? s.unshift(r) : s.push(r),
              !s.warned && (o = c(t)) && o > 0 && s.length > o)
            ) {
              s.warned = !0;
              var f = new Error(
                'Possible EventEmitter memory leak detected. ' +
                  s.length +
                  ' "' +
                  String(e) +
                  '" listeners added. Use emitter.setMaxListeners() to increase limit.'
              );
              (f.name = 'MaxListenersExceededWarning'),
                (f.emitter = t),
                (f.type = e),
                (f.count = s.length),
                'object' == typeof console && console.warn && console.warn('%s: %s', f.name, f.message);
            }
          } else (s = a[e] = r), ++t._eventsCount;
          return t;
        }
        function v() {
          if (!this.fired)
            switch ((this.target.removeListener(this.type, this.wrapFn), (this.fired = !0), arguments.length)) {
              case 0:
                return this.listener.call(this.target);
              case 1:
                return this.listener.call(this.target, arguments[0]);
              case 2:
                return this.listener.call(this.target, arguments[0], arguments[1]);
              case 3:
                return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
              default:
                for (var t = new Array(arguments.length), e = 0; e < t.length; ++e) t[e] = arguments[e];
                this.listener.apply(this.target, t);
            }
        }
        function g(t, e, r) {
          var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r },
            i = o.call(v, n);
          return (i.listener = r), (n.wrapFn = i), i;
        }
        function y(t, e, r) {
          var n = t._events;
          if (!n) return [];
          var i = n[e];
          return i
            ? 'function' == typeof i
              ? r
                ? [i.listener || i]
                : [i]
              : r
              ? (function (t) {
                  for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
                  return e;
                })(i)
              : _(i, i.length)
            : [];
        }
        function w(t) {
          var e = this._events;
          if (e) {
            var r = e[t];
            if ('function' == typeof r) return 1;
            if (r) return r.length;
          }
          return 0;
        }
        function _(t, e) {
          for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
          return r;
        }
        s
          ? Object.defineProperty(a, 'defaultMaxListeners', {
              enumerable: !0,
              get: function () {
                return f;
              },
              set: function (t) {
                if ('number' != typeof t || t < 0 || t != t)
                  throw new TypeError('"defaultMaxListeners" must be a positive number');
                f = t;
              },
            })
          : (a.defaultMaxListeners = f),
          (a.prototype.setMaxListeners = function (t) {
            if ('number' != typeof t || t < 0 || isNaN(t))
              throw new TypeError('"n" argument must be a positive number');
            return (this._maxListeners = t), this;
          }),
          (a.prototype.getMaxListeners = function () {
            return c(this);
          }),
          (a.prototype.emit = function (t) {
            var e,
              r,
              n,
              i,
              o,
              a,
              s = 'error' === t;
            if ((a = this._events)) s = s && null == a.error;
            else if (!s) return !1;
            if (s) {
              if ((arguments.length > 1 && (e = arguments[1]), e instanceof Error)) throw e;
              var f = new Error('Unhandled "error" event. (' + e + ')');
              throw ((f.context = e), f);
            }
            if (!(r = a[t])) return !1;
            var u = 'function' == typeof r;
            switch ((n = arguments.length)) {
              case 1:
                h(r, u, this);
                break;
              case 2:
                d(r, u, this, arguments[1]);
                break;
              case 3:
                l(r, u, this, arguments[1], arguments[2]);
                break;
              case 4:
                p(r, u, this, arguments[1], arguments[2], arguments[3]);
                break;
              default:
                for (i = new Array(n - 1), o = 1; o < n; o++) i[o - 1] = arguments[o];
                b(r, u, this, i);
            }
            return !0;
          }),
          (a.prototype.addListener = function (t, e) {
            return m(this, t, e, !1);
          }),
          (a.prototype.on = a.prototype.addListener),
          (a.prototype.prependListener = function (t, e) {
            return m(this, t, e, !0);
          }),
          (a.prototype.once = function (t, e) {
            if ('function' != typeof e) throw new TypeError('"listener" argument must be a function');
            return this.on(t, g(this, t, e)), this;
          }),
          (a.prototype.prependOnceListener = function (t, e) {
            if ('function' != typeof e) throw new TypeError('"listener" argument must be a function');
            return this.prependListener(t, g(this, t, e)), this;
          }),
          (a.prototype.removeListener = function (t, e) {
            var r, i, o, a, s;
            if ('function' != typeof e) throw new TypeError('"listener" argument must be a function');
            if (!(i = this._events)) return this;
            if (!(r = i[t])) return this;
            if (r === e || r.listener === e)
              0 == --this._eventsCount
                ? (this._events = n(null))
                : (delete i[t], i.removeListener && this.emit('removeListener', t, r.listener || e));
            else if ('function' != typeof r) {
              for (o = -1, a = r.length - 1; a >= 0; a--)
                if (r[a] === e || r[a].listener === e) {
                  (s = r[a].listener), (o = a);
                  break;
                }
              if (o < 0) return this;
              0 === o
                ? r.shift()
                : (function (t, e) {
                    for (var r = e, n = r + 1, i = t.length; n < i; r += 1, n += 1) t[r] = t[n];
                    t.pop();
                  })(r, o),
                1 === r.length && (i[t] = r[0]),
                i.removeListener && this.emit('removeListener', t, s || e);
            }
            return this;
          }),
          (a.prototype.removeAllListeners = function (t) {
            var e, r, o;
            if (!(r = this._events)) return this;
            if (!r.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = n(null)), (this._eventsCount = 0))
                  : r[t] && (0 == --this._eventsCount ? (this._events = n(null)) : delete r[t]),
                this
              );
            if (0 === arguments.length) {
              var a,
                s = i(r);
              for (o = 0; o < s.length; ++o) 'removeListener' !== (a = s[o]) && this.removeAllListeners(a);
              return this.removeAllListeners('removeListener'), (this._events = n(null)), (this._eventsCount = 0), this;
            }
            if ('function' == typeof (e = r[t])) this.removeListener(t, e);
            else if (e) for (o = e.length - 1; o >= 0; o--) this.removeListener(t, e[o]);
            return this;
          }),
          (a.prototype.listeners = function (t) {
            return y(this, t, !0);
          }),
          (a.prototype.rawListeners = function (t) {
            return y(this, t, !1);
          }),
          (a.listenerCount = function (t, e) {
            return 'function' == typeof t.listenerCount ? t.listenerCount(e) : w.call(t, e);
          }),
          (a.prototype.listenerCount = w),
          (a.prototype.eventNames = function () {
            return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
          });
      },
      {},
    ],
    20: [
      function (t, e, r) {
        var n = t('buffer'),
          i = n.Buffer;
        function o(t, e) {
          for (var r in t) e[r] = t[r];
        }
        function a(t, e, r) {
          return i(t, e, r);
        }
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? (e.exports = n) : (o(n, r), (r.Buffer = a)),
          o(i, a),
          (a.from = function (t, e, r) {
            if ('number' == typeof t) throw new TypeError('Argument must not be a number');
            return i(t, e, r);
          }),
          (a.alloc = function (t, e, r) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            var n = i(t);
            return void 0 !== e ? ('string' == typeof r ? n.fill(e, r) : n.fill(e)) : n.fill(0), n;
          }),
          (a.allocUnsafe = function (t) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            return i(t);
          }),
          (a.allocUnsafeSlow = function (t) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            return n.SlowBuffer(t);
          });
      },
      { buffer: 18 },
    ],
    21: [
      function (t, e, r) {
        'use strict';
        var n = t('safe-buffer').Buffer,
          i =
            n.isEncoding ||
            function (t) {
              switch ((t = '' + t) && t.toLowerCase()) {
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                case 'raw':
                  return !0;
                default:
                  return !1;
              }
            };
        function o(t) {
          var e;
          switch (
            ((this.encoding = (function (t) {
              var e = (function (t) {
                if (!t) return 'utf8';
                for (var e; ; )
                  switch (t) {
                    case 'utf8':
                    case 'utf-8':
                      return 'utf8';
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                      return 'utf16le';
                    case 'latin1':
                    case 'binary':
                      return 'latin1';
                    case 'base64':
                    case 'ascii':
                    case 'hex':
                      return t;
                    default:
                      if (e) return;
                      (t = ('' + t).toLowerCase()), (e = !0);
                  }
              })(t);
              if ('string' != typeof e && (n.isEncoding === i || !i(t))) throw new Error('Unknown encoding: ' + t);
              return e || t;
            })(t)),
            this.encoding)
          ) {
            case 'utf16le':
              (this.text = f), (this.end = u), (e = 4);
              break;
            case 'utf8':
              (this.fillLast = s), (e = 4);
              break;
            case 'base64':
              (this.text = c), (this.end = h), (e = 3);
              break;
            default:
              return (this.write = d), void (this.end = l);
          }
          (this.lastNeed = 0), (this.lastTotal = 0), (this.lastChar = n.allocUnsafe(e));
        }
        function a(t) {
          return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2;
        }
        function s(t) {
          var e = this.lastTotal - this.lastNeed,
            r = (function (t, e, r) {
              if (128 != (192 & e[0])) return (t.lastNeed = 0), '�';
              if (t.lastNeed > 1 && e.length > 1) {
                if (128 != (192 & e[1])) return (t.lastNeed = 1), '�';
                if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return (t.lastNeed = 2), '�';
              }
            })(this, t);
          return void 0 !== r
            ? r
            : this.lastNeed <= t.length
            ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal))
            : (t.copy(this.lastChar, e, 0, t.length), void (this.lastNeed -= t.length));
        }
        function f(t, e) {
          if ((t.length - e) % 2 == 0) {
            var r = t.toString('utf16le', e);
            if (r) {
              var n = r.charCodeAt(r.length - 1);
              if (n >= 55296 && n <= 56319)
                return (
                  (this.lastNeed = 2),
                  (this.lastTotal = 4),
                  (this.lastChar[0] = t[t.length - 2]),
                  (this.lastChar[1] = t[t.length - 1]),
                  r.slice(0, -1)
                );
            }
            return r;
          }
          return (
            (this.lastNeed = 1),
            (this.lastTotal = 2),
            (this.lastChar[0] = t[t.length - 1]),
            t.toString('utf16le', e, t.length - 1)
          );
        }
        function u(t) {
          var e = t && t.length ? this.write(t) : '';
          if (this.lastNeed) {
            var r = this.lastTotal - this.lastNeed;
            return e + this.lastChar.toString('utf16le', 0, r);
          }
          return e;
        }
        function c(t, e) {
          var r = (t.length - e) % 3;
          return 0 === r
            ? t.toString('base64', e)
            : ((this.lastNeed = 3 - r),
              (this.lastTotal = 3),
              1 === r
                ? (this.lastChar[0] = t[t.length - 1])
                : ((this.lastChar[0] = t[t.length - 2]), (this.lastChar[1] = t[t.length - 1])),
              t.toString('base64', e, t.length - r));
        }
        function h(t) {
          var e = t && t.length ? this.write(t) : '';
          return this.lastNeed ? e + this.lastChar.toString('base64', 0, 3 - this.lastNeed) : e;
        }
        function d(t) {
          return t.toString(this.encoding);
        }
        function l(t) {
          return t && t.length ? this.write(t) : '';
        }
        (r.StringDecoder = o),
          (o.prototype.write = function (t) {
            if (0 === t.length) return '';
            var e, r;
            if (this.lastNeed) {
              if (void 0 === (e = this.fillLast(t))) return '';
              (r = this.lastNeed), (this.lastNeed = 0);
            } else r = 0;
            return r < t.length ? (e ? e + this.text(t, r) : this.text(t, r)) : e || '';
          }),
          (o.prototype.end = function (t) {
            var e = t && t.length ? this.write(t) : '';
            return this.lastNeed ? e + '�' : e;
          }),
          (o.prototype.text = function (t, e) {
            var r = (function (t, e, r) {
              var n = e.length - 1;
              if (n < r) return 0;
              var i = a(e[n]);
              if (i >= 0) return i > 0 && (t.lastNeed = i - 1), i;
              if (--n < r || -2 === i) return 0;
              if ((i = a(e[n])) >= 0) return i > 0 && (t.lastNeed = i - 2), i;
              if (--n < r || -2 === i) return 0;
              if ((i = a(e[n])) >= 0) return i > 0 && (2 === i ? (i = 0) : (t.lastNeed = i - 3)), i;
              return 0;
            })(this, t, e);
            if (!this.lastNeed) return t.toString('utf8', e);
            this.lastTotal = r;
            var n = t.length - (r - this.lastNeed);
            return t.copy(this.lastChar, 0, n), t.toString('utf8', e, n);
          }),
          (o.prototype.fillLast = function (t) {
            if (this.lastNeed <= t.length)
              return (
                t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
                this.lastChar.toString(this.encoding, 0, this.lastTotal)
              );
            t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), (this.lastNeed -= t.length);
          });
      },
      { 'safe-buffer': 20 },
    ],
    22: [
      function (t, e, r) {
        var n = t('safe-buffer').Buffer,
          i = t('stream').Transform,
          o = t('string_decoder').StringDecoder;
        function a(t) {
          i.call(this),
            (this.hashMode = 'string' == typeof t),
            this.hashMode ? (this[t] = this._finalOrDigest) : (this.final = this._finalOrDigest),
            this._final && ((this.__final = this._final), (this._final = null)),
            (this._decoder = null),
            (this._encoding = null);
        }
        t('inherits')(a, i),
          (a.prototype.update = function (t, e, r) {
            'string' == typeof t && (t = n.from(t, e));
            var i = this._update(t);
            return this.hashMode ? this : (r && (i = this._toString(i, r)), i);
          }),
          (a.prototype.setAutoPadding = function () {}),
          (a.prototype.getAuthTag = function () {
            throw new Error('trying to get auth tag in unsupported state');
          }),
          (a.prototype.setAuthTag = function () {
            throw new Error('trying to set auth tag in unsupported state');
          }),
          (a.prototype.setAAD = function () {
            throw new Error('trying to set aad in unsupported state');
          }),
          (a.prototype._transform = function (t, e, r) {
            var n;
            try {
              this.hashMode ? this._update(t) : this.push(this._update(t));
            } catch (t) {
              n = t;
            } finally {
              r(n);
            }
          }),
          (a.prototype._flush = function (t) {
            var e;
            try {
              this.push(this.__final());
            } catch (t) {
              e = t;
            }
            t(e);
          }),
          (a.prototype._finalOrDigest = function (t) {
            var e = this.__final() || n.alloc(0);
            return t && (e = this._toString(e, t, !0)), e;
          }),
          (a.prototype._toString = function (t, e, r) {
            if ((this._decoder || ((this._decoder = new o(e)), (this._encoding = e)), this._encoding !== e))
              throw new Error("can't switch encodings");
            var n = this._decoder.write(t);
            return r && (n += this._decoder.end()), n;
          }),
          (e.exports = a);
      },
      { inherits: 80, 'safe-buffer': 121, stream: 130, string_decoder: 21 },
    ],
    23: [
      function (t, e, r) {
        (function (t) {
          function e(t) {
            return Object.prototype.toString.call(t);
          }
          (r.isArray = function (t) {
            return Array.isArray ? Array.isArray(t) : '[object Array]' === e(t);
          }),
            (r.isBoolean = function (t) {
              return 'boolean' == typeof t;
            }),
            (r.isNull = function (t) {
              return null === t;
            }),
            (r.isNullOrUndefined = function (t) {
              return null == t;
            }),
            (r.isNumber = function (t) {
              return 'number' == typeof t;
            }),
            (r.isString = function (t) {
              return 'string' == typeof t;
            }),
            (r.isSymbol = function (t) {
              return 'symbol' == typeof t;
            }),
            (r.isUndefined = function (t) {
              return void 0 === t;
            }),
            (r.isRegExp = function (t) {
              return '[object RegExp]' === e(t);
            }),
            (r.isObject = function (t) {
              return 'object' == typeof t && null !== t;
            }),
            (r.isDate = function (t) {
              return '[object Date]' === e(t);
            }),
            (r.isError = function (t) {
              return '[object Error]' === e(t) || t instanceof Error;
            }),
            (r.isFunction = function (t) {
              return 'function' == typeof t;
            }),
            (r.isPrimitive = function (t) {
              return (
                null === t ||
                'boolean' == typeof t ||
                'number' == typeof t ||
                'string' == typeof t ||
                'symbol' == typeof t ||
                void 0 === t
              );
            }),
            (r.isBuffer = t.isBuffer);
        }.call(this, { isBuffer: t('../../is-buffer/index.js') }));
      },
      { '../../is-buffer/index.js': 81 },
    ],
    24: [
      function (t, e, r) {
        'use strict';
        var n = t('inherits'),
          i = t('md5.js'),
          o = t('ripemd160'),
          a = t('sha.js'),
          s = t('cipher-base');
        function f(t) {
          s.call(this, 'digest'), (this._hash = t);
        }
        n(f, s),
          (f.prototype._update = function (t) {
            this._hash.update(t);
          }),
          (f.prototype._final = function () {
            return this._hash.digest();
          }),
          (e.exports = function (t) {
            return 'md5' === (t = t.toLowerCase())
              ? new i()
              : 'rmd160' === t || 'ripemd160' === t
              ? new o()
              : new f(a(t));
          });
      },
      { 'cipher-base': 22, inherits: 80, 'md5.js': 91, ripemd160: 119, 'sha.js': 123 },
    ],
    25: [
      function (t, e, r) {
        'use strict';
        var n = r;
        (n.version = t('../package.json').version),
          (n.utils = t('./elliptic/utils')),
          (n.rand = t('brorand')),
          (n.curve = t('./elliptic/curve')),
          (n.curves = t('./elliptic/curves')),
          (n.ec = t('./elliptic/ec')),
          (n.eddsa = t('./elliptic/eddsa'));
      },
      {
        '../package.json': 40,
        './elliptic/curve': 28,
        './elliptic/curves': 31,
        './elliptic/ec': 32,
        './elliptic/eddsa': 35,
        './elliptic/utils': 39,
        brorand: 16,
      },
    ],
    26: [
      function (t, e, r) {
        'use strict';
        var n = t('bn.js'),
          i = t('../utils'),
          o = i.getNAF,
          a = i.getJSF,
          s = i.assert;
        function f(t, e) {
          (this.type = t),
            (this.p = new n(e.p, 16)),
            (this.red = e.prime ? n.red(e.prime) : n.mont(this.p)),
            (this.zero = new n(0).toRed(this.red)),
            (this.one = new n(1).toRed(this.red)),
            (this.two = new n(2).toRed(this.red)),
            (this.n = e.n && new n(e.n, 16)),
            (this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
            (this._wnafT1 = new Array(4)),
            (this._wnafT2 = new Array(4)),
            (this._wnafT3 = new Array(4)),
            (this._wnafT4 = new Array(4)),
            (this._bitLength = this.n ? this.n.bitLength() : 0);
          var r = this.n && this.p.div(this.n);
          !r || r.cmpn(100) > 0
            ? (this.redN = null)
            : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
        }
        function u(t, e) {
          (this.curve = t), (this.type = e), (this.precomputed = null);
        }
        (e.exports = f),
          (f.prototype.point = function () {
            throw new Error('Not implemented');
          }),
          (f.prototype.validate = function () {
            throw new Error('Not implemented');
          }),
          (f.prototype._fixedNafMul = function (t, e) {
            s(t.precomputed);
            var r = t._getDoubles(),
              n = o(e, 1, this._bitLength),
              i = (1 << (r.step + 1)) - (r.step % 2 == 0 ? 2 : 1);
            i /= 3;
            var a,
              f,
              u = [];
            for (a = 0; a < n.length; a += r.step) {
              f = 0;
              for (var c = a + r.step - 1; c >= a; c--) f = (f << 1) + n[c];
              u.push(f);
            }
            for (var h = this.jpoint(null, null, null), d = this.jpoint(null, null, null), l = i; l > 0; l--) {
              for (a = 0; a < u.length; a++)
                (f = u[a]) === l ? (d = d.mixedAdd(r.points[a])) : f === -l && (d = d.mixedAdd(r.points[a].neg()));
              h = h.add(d);
            }
            return h.toP();
          }),
          (f.prototype._wnafMul = function (t, e) {
            var r = 4,
              n = t._getNAFPoints(r);
            r = n.wnd;
            for (
              var i = n.points, a = o(e, r, this._bitLength), f = this.jpoint(null, null, null), u = a.length - 1;
              u >= 0;
              u--
            ) {
              for (var c = 0; u >= 0 && 0 === a[u]; u--) c++;
              if ((u >= 0 && c++, (f = f.dblp(c)), u < 0)) break;
              var h = a[u];
              s(0 !== h),
                (f =
                  'affine' === t.type
                    ? h > 0
                      ? f.mixedAdd(i[(h - 1) >> 1])
                      : f.mixedAdd(i[(-h - 1) >> 1].neg())
                    : h > 0
                    ? f.add(i[(h - 1) >> 1])
                    : f.add(i[(-h - 1) >> 1].neg()));
            }
            return 'affine' === t.type ? f.toP() : f;
          }),
          (f.prototype._wnafMulAdd = function (t, e, r, n, i) {
            var s,
              f,
              u,
              c = this._wnafT1,
              h = this._wnafT2,
              d = this._wnafT3,
              l = 0;
            for (s = 0; s < n; s++) {
              var p = (u = e[s])._getNAFPoints(t);
              (c[s] = p.wnd), (h[s] = p.points);
            }
            for (s = n - 1; s >= 1; s -= 2) {
              var b = s - 1,
                m = s;
              if (1 === c[b] && 1 === c[m]) {
                var v = [e[b], null, null, e[m]];
                0 === e[b].y.cmp(e[m].y)
                  ? ((v[1] = e[b].add(e[m])), (v[2] = e[b].toJ().mixedAdd(e[m].neg())))
                  : 0 === e[b].y.cmp(e[m].y.redNeg())
                  ? ((v[1] = e[b].toJ().mixedAdd(e[m])), (v[2] = e[b].add(e[m].neg())))
                  : ((v[1] = e[b].toJ().mixedAdd(e[m])), (v[2] = e[b].toJ().mixedAdd(e[m].neg())));
                var g = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                  y = a(r[b], r[m]);
                for (l = Math.max(y[0].length, l), d[b] = new Array(l), d[m] = new Array(l), f = 0; f < l; f++) {
                  var w = 0 | y[0][f],
                    _ = 0 | y[1][f];
                  (d[b][f] = g[3 * (w + 1) + (_ + 1)]), (d[m][f] = 0), (h[b] = v);
                }
              } else
                (d[b] = o(r[b], c[b], this._bitLength)),
                  (d[m] = o(r[m], c[m], this._bitLength)),
                  (l = Math.max(d[b].length, l)),
                  (l = Math.max(d[m].length, l));
            }
            var M = this.jpoint(null, null, null),
              x = this._wnafT4;
            for (s = l; s >= 0; s--) {
              for (var S = 0; s >= 0; ) {
                var A = !0;
                for (f = 0; f < n; f++) (x[f] = 0 | d[f][s]), 0 !== x[f] && (A = !1);
                if (!A) break;
                S++, s--;
              }
              if ((s >= 0 && S++, (M = M.dblp(S)), s < 0)) break;
              for (f = 0; f < n; f++) {
                var E = x[f];
                0 !== E &&
                  (E > 0 ? (u = h[f][(E - 1) >> 1]) : E < 0 && (u = h[f][(-E - 1) >> 1].neg()),
                  (M = 'affine' === u.type ? M.mixedAdd(u) : M.add(u)));
              }
            }
            for (s = 0; s < n; s++) h[s] = null;
            return i ? M : M.toP();
          }),
          (f.BasePoint = u),
          (u.prototype.eq = function () {
            throw new Error('Not implemented');
          }),
          (u.prototype.validate = function () {
            return this.curve.validate(this);
          }),
          (f.prototype.decodePoint = function (t, e) {
            t = i.toArray(t, e);
            var r = this.p.byteLength();
            if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r)
              return (
                6 === t[0] ? s(t[t.length - 1] % 2 == 0) : 7 === t[0] && s(t[t.length - 1] % 2 == 1),
                this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r))
              );
            if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r) return this.pointFromX(t.slice(1, 1 + r), 3 === t[0]);
            throw new Error('Unknown point format');
          }),
          (u.prototype.encodeCompressed = function (t) {
            return this.encode(t, !0);
          }),
          (u.prototype._encode = function (t) {
            var e = this.curve.p.byteLength(),
              r = this.getX().toArray('be', e);
            return t ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray('be', e));
          }),
          (u.prototype.encode = function (t, e) {
            return i.encode(this._encode(e), t);
          }),
          (u.prototype.precompute = function (t) {
            if (this.precomputed) return this;
            var e = { doubles: null, naf: null, beta: null };
            return (
              (e.naf = this._getNAFPoints(8)),
              (e.doubles = this._getDoubles(4, t)),
              (e.beta = this._getBeta()),
              (this.precomputed = e),
              this
            );
          }),
          (u.prototype._hasDoubles = function (t) {
            if (!this.precomputed) return !1;
            var e = this.precomputed.doubles;
            return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step);
          }),
          (u.prototype._getDoubles = function (t, e) {
            if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
            for (var r = [this], n = this, i = 0; i < e; i += t) {
              for (var o = 0; o < t; o++) n = n.dbl();
              r.push(n);
            }
            return { step: t, points: r };
          }),
          (u.prototype._getNAFPoints = function (t) {
            if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
            for (var e = [this], r = (1 << t) - 1, n = 1 === r ? null : this.dbl(), i = 1; i < r; i++)
              e[i] = e[i - 1].add(n);
            return { wnd: t, points: e };
          }),
          (u.prototype._getBeta = function () {
            return null;
          }),
          (u.prototype.dblp = function (t) {
            for (var e = this, r = 0; r < t; r++) e = e.dbl();
            return e;
          });
      },
      { '../utils': 39, 'bn.js': 15 },
    ],
    27: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = t('bn.js'),
          o = t('inherits'),
          a = t('./base'),
          s = n.assert;
        function f(t) {
          (this.twisted = 1 != (0 | t.a)),
            (this.mOneA = this.twisted && -1 == (0 | t.a)),
            (this.extended = this.mOneA),
            a.call(this, 'edwards', t),
            (this.a = new i(t.a, 16).umod(this.red.m)),
            (this.a = this.a.toRed(this.red)),
            (this.c = new i(t.c, 16).toRed(this.red)),
            (this.c2 = this.c.redSqr()),
            (this.d = new i(t.d, 16).toRed(this.red)),
            (this.dd = this.d.redAdd(this.d)),
            s(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
            (this.oneC = 1 == (0 | t.c));
        }
        function u(t, e, r, n, o) {
          a.BasePoint.call(this, t, 'projective'),
            null === e && null === r && null === n
              ? ((this.x = this.curve.zero),
                (this.y = this.curve.one),
                (this.z = this.curve.one),
                (this.t = this.curve.zero),
                (this.zOne = !0))
              : ((this.x = new i(e, 16)),
                (this.y = new i(r, 16)),
                (this.z = n ? new i(n, 16) : this.curve.one),
                (this.t = o && new i(o, 16)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)),
                this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
                (this.zOne = this.z === this.curve.one),
                this.curve.extended &&
                  !this.t &&
                  ((this.t = this.x.redMul(this.y)), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
        }
        o(f, a),
          (e.exports = f),
          (f.prototype._mulA = function (t) {
            return this.mOneA ? t.redNeg() : this.a.redMul(t);
          }),
          (f.prototype._mulC = function (t) {
            return this.oneC ? t : this.c.redMul(t);
          }),
          (f.prototype.jpoint = function (t, e, r, n) {
            return this.point(t, e, r, n);
          }),
          (f.prototype.pointFromX = function (t, e) {
            (t = new i(t, 16)).red || (t = t.toRed(this.red));
            var r = t.redSqr(),
              n = this.c2.redSub(this.a.redMul(r)),
              o = this.one.redSub(this.c2.redMul(this.d).redMul(r)),
              a = n.redMul(o.redInvm()),
              s = a.redSqrt();
            if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error('invalid point');
            var f = s.fromRed().isOdd();
            return ((e && !f) || (!e && f)) && (s = s.redNeg()), this.point(t, s);
          }),
          (f.prototype.pointFromY = function (t, e) {
            (t = new i(t, 16)).red || (t = t.toRed(this.red));
            var r = t.redSqr(),
              n = r.redSub(this.c2),
              o = r.redMul(this.d).redMul(this.c2).redSub(this.a),
              a = n.redMul(o.redInvm());
            if (0 === a.cmp(this.zero)) {
              if (e) throw new Error('invalid point');
              return this.point(this.zero, t);
            }
            var s = a.redSqrt();
            if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error('invalid point');
            return s.fromRed().isOdd() !== e && (s = s.redNeg()), this.point(s, t);
          }),
          (f.prototype.validate = function (t) {
            if (t.isInfinity()) return !0;
            t.normalize();
            var e = t.x.redSqr(),
              r = t.y.redSqr(),
              n = e.redMul(this.a).redAdd(r),
              i = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));
            return 0 === n.cmp(i);
          }),
          o(u, a.BasePoint),
          (f.prototype.pointFromJSON = function (t) {
            return u.fromJSON(this, t);
          }),
          (f.prototype.point = function (t, e, r, n) {
            return new u(this, t, e, r, n);
          }),
          (u.fromJSON = function (t, e) {
            return new u(t, e[0], e[1], e[2]);
          }),
          (u.prototype.inspect = function () {
            return this.isInfinity()
              ? '<EC Point Infinity>'
              : '<EC Point x: ' +
                  this.x.fromRed().toString(16, 2) +
                  ' y: ' +
                  this.y.fromRed().toString(16, 2) +
                  ' z: ' +
                  this.z.fromRed().toString(16, 2) +
                  '>';
          }),
          (u.prototype.isInfinity = function () {
            return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || (this.zOne && 0 === this.y.cmp(this.curve.c)));
          }),
          (u.prototype._extDbl = function () {
            var t = this.x.redSqr(),
              e = this.y.redSqr(),
              r = this.z.redSqr();
            r = r.redIAdd(r);
            var n = this.curve._mulA(t),
              i = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
              o = n.redAdd(e),
              a = o.redSub(r),
              s = n.redSub(e),
              f = i.redMul(a),
              u = o.redMul(s),
              c = i.redMul(s),
              h = a.redMul(o);
            return this.curve.point(f, u, h, c);
          }),
          (u.prototype._projDbl = function () {
            var t,
              e,
              r,
              n,
              i,
              o,
              a = this.x.redAdd(this.y).redSqr(),
              s = this.x.redSqr(),
              f = this.y.redSqr();
            if (this.curve.twisted) {
              var u = (n = this.curve._mulA(s)).redAdd(f);
              this.zOne
                ? ((t = a.redSub(s).redSub(f).redMul(u.redSub(this.curve.two))),
                  (e = u.redMul(n.redSub(f))),
                  (r = u.redSqr().redSub(u).redSub(u)))
                : ((i = this.z.redSqr()),
                  (o = u.redSub(i).redISub(i)),
                  (t = a.redSub(s).redISub(f).redMul(o)),
                  (e = u.redMul(n.redSub(f))),
                  (r = u.redMul(o)));
            } else
              (n = s.redAdd(f)),
                (i = this.curve._mulC(this.z).redSqr()),
                (o = n.redSub(i).redSub(i)),
                (t = this.curve._mulC(a.redISub(n)).redMul(o)),
                (e = this.curve._mulC(n).redMul(s.redISub(f))),
                (r = n.redMul(o));
            return this.curve.point(t, e, r);
          }),
          (u.prototype.dbl = function () {
            return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
          }),
          (u.prototype._extAdd = function (t) {
            var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
              r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
              n = this.t.redMul(this.curve.dd).redMul(t.t),
              i = this.z.redMul(t.z.redAdd(t.z)),
              o = r.redSub(e),
              a = i.redSub(n),
              s = i.redAdd(n),
              f = r.redAdd(e),
              u = o.redMul(a),
              c = s.redMul(f),
              h = o.redMul(f),
              d = a.redMul(s);
            return this.curve.point(u, c, d, h);
          }),
          (u.prototype._projAdd = function (t) {
            var e,
              r,
              n = this.z.redMul(t.z),
              i = n.redSqr(),
              o = this.x.redMul(t.x),
              a = this.y.redMul(t.y),
              s = this.curve.d.redMul(o).redMul(a),
              f = i.redSub(s),
              u = i.redAdd(s),
              c = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(o).redISub(a),
              h = n.redMul(f).redMul(c);
            return (
              this.curve.twisted
                ? ((e = n.redMul(u).redMul(a.redSub(this.curve._mulA(o)))), (r = f.redMul(u)))
                : ((e = n.redMul(u).redMul(a.redSub(o))), (r = this.curve._mulC(f).redMul(u))),
              this.curve.point(h, e, r)
            );
          }),
          (u.prototype.add = function (t) {
            return this.isInfinity()
              ? t
              : t.isInfinity()
              ? this
              : this.curve.extended
              ? this._extAdd(t)
              : this._projAdd(t);
          }),
          (u.prototype.mul = function (t) {
            return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t);
          }),
          (u.prototype.mulAdd = function (t, e, r) {
            return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !1);
          }),
          (u.prototype.jmulAdd = function (t, e, r) {
            return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !0);
          }),
          (u.prototype.normalize = function () {
            if (this.zOne) return this;
            var t = this.z.redInvm();
            return (
              (this.x = this.x.redMul(t)),
              (this.y = this.y.redMul(t)),
              this.t && (this.t = this.t.redMul(t)),
              (this.z = this.curve.one),
              (this.zOne = !0),
              this
            );
          }),
          (u.prototype.neg = function () {
            return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg());
          }),
          (u.prototype.getX = function () {
            return this.normalize(), this.x.fromRed();
          }),
          (u.prototype.getY = function () {
            return this.normalize(), this.y.fromRed();
          }),
          (u.prototype.eq = function (t) {
            return this === t || (0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY()));
          }),
          (u.prototype.eqXToP = function (t) {
            var e = t.toRed(this.curve.red).redMul(this.z);
            if (0 === this.x.cmp(e)) return !0;
            for (var r = t.clone(), n = this.curve.redN.redMul(this.z); ; ) {
              if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1;
              if ((e.redIAdd(n), 0 === this.x.cmp(e))) return !0;
            }
          }),
          (u.prototype.toP = u.prototype.normalize),
          (u.prototype.mixedAdd = u.prototype.add);
      },
      { '../utils': 39, './base': 26, 'bn.js': 15, inherits: 80 },
    ],
    28: [
      function (t, e, r) {
        'use strict';
        var n = r;
        (n.base = t('./base')), (n.short = t('./short')), (n.mont = t('./mont')), (n.edwards = t('./edwards'));
      },
      { './base': 26, './edwards': 27, './mont': 29, './short': 30 },
    ],
    29: [
      function (t, e, r) {
        'use strict';
        var n = t('bn.js'),
          i = t('inherits'),
          o = t('./base'),
          a = t('../utils');
        function s(t) {
          o.call(this, 'mont', t),
            (this.a = new n(t.a, 16).toRed(this.red)),
            (this.b = new n(t.b, 16).toRed(this.red)),
            (this.i4 = new n(4).toRed(this.red).redInvm()),
            (this.two = new n(2).toRed(this.red)),
            (this.a24 = this.i4.redMul(this.a.redAdd(this.two)));
        }
        function f(t, e, r) {
          o.BasePoint.call(this, t, 'projective'),
            null === e && null === r
              ? ((this.x = this.curve.one), (this.z = this.curve.zero))
              : ((this.x = new n(e, 16)),
                (this.z = new n(r, 16)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)));
        }
        i(s, o),
          (e.exports = s),
          (s.prototype.validate = function (t) {
            var e = t.normalize().x,
              r = e.redSqr(),
              n = r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e);
            return 0 === n.redSqrt().redSqr().cmp(n);
          }),
          i(f, o.BasePoint),
          (s.prototype.decodePoint = function (t, e) {
            return this.point(a.toArray(t, e), 1);
          }),
          (s.prototype.point = function (t, e) {
            return new f(this, t, e);
          }),
          (s.prototype.pointFromJSON = function (t) {
            return f.fromJSON(this, t);
          }),
          (f.prototype.precompute = function () {}),
          (f.prototype._encode = function () {
            return this.getX().toArray('be', this.curve.p.byteLength());
          }),
          (f.fromJSON = function (t, e) {
            return new f(t, e[0], e[1] || t.one);
          }),
          (f.prototype.inspect = function () {
            return this.isInfinity()
              ? '<EC Point Infinity>'
              : '<EC Point x: ' + this.x.fromRed().toString(16, 2) + ' z: ' + this.z.fromRed().toString(16, 2) + '>';
          }),
          (f.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0);
          }),
          (f.prototype.dbl = function () {
            var t = this.x.redAdd(this.z).redSqr(),
              e = this.x.redSub(this.z).redSqr(),
              r = t.redSub(e),
              n = t.redMul(e),
              i = r.redMul(e.redAdd(this.curve.a24.redMul(r)));
            return this.curve.point(n, i);
          }),
          (f.prototype.add = function () {
            throw new Error('Not supported on Montgomery curve');
          }),
          (f.prototype.diffAdd = function (t, e) {
            var r = this.x.redAdd(this.z),
              n = this.x.redSub(this.z),
              i = t.x.redAdd(t.z),
              o = t.x.redSub(t.z).redMul(r),
              a = i.redMul(n),
              s = e.z.redMul(o.redAdd(a).redSqr()),
              f = e.x.redMul(o.redISub(a).redSqr());
            return this.curve.point(s, f);
          }),
          (f.prototype.mul = function (t) {
            for (var e = t.clone(), r = this, n = this.curve.point(null, null), i = []; 0 !== e.cmpn(0); e.iushrn(1))
              i.push(e.andln(1));
            for (var o = i.length - 1; o >= 0; o--)
              0 === i[o] ? ((r = r.diffAdd(n, this)), (n = n.dbl())) : ((n = r.diffAdd(n, this)), (r = r.dbl()));
            return n;
          }),
          (f.prototype.mulAdd = function () {
            throw new Error('Not supported on Montgomery curve');
          }),
          (f.prototype.jumlAdd = function () {
            throw new Error('Not supported on Montgomery curve');
          }),
          (f.prototype.eq = function (t) {
            return 0 === this.getX().cmp(t.getX());
          }),
          (f.prototype.normalize = function () {
            return (this.x = this.x.redMul(this.z.redInvm())), (this.z = this.curve.one), this;
          }),
          (f.prototype.getX = function () {
            return this.normalize(), this.x.fromRed();
          });
      },
      { '../utils': 39, './base': 26, 'bn.js': 15, inherits: 80 },
    ],
    30: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = t('bn.js'),
          o = t('inherits'),
          a = t('./base'),
          s = n.assert;
        function f(t) {
          a.call(this, 'short', t),
            (this.a = new i(t.a, 16).toRed(this.red)),
            (this.b = new i(t.b, 16).toRed(this.red)),
            (this.tinv = this.two.redInvm()),
            (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
            (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
            (this.endo = this._getEndomorphism(t)),
            (this._endoWnafT1 = new Array(4)),
            (this._endoWnafT2 = new Array(4));
        }
        function u(t, e, r, n) {
          a.BasePoint.call(this, t, 'affine'),
            null === e && null === r
              ? ((this.x = null), (this.y = null), (this.inf = !0))
              : ((this.x = new i(e, 16)),
                (this.y = new i(r, 16)),
                n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                (this.inf = !1));
        }
        function c(t, e, r, n) {
          a.BasePoint.call(this, t, 'jacobian'),
            null === e && null === r && null === n
              ? ((this.x = this.curve.one), (this.y = this.curve.one), (this.z = new i(0)))
              : ((this.x = new i(e, 16)), (this.y = new i(r, 16)), (this.z = new i(n, 16))),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)),
            (this.zOne = this.z === this.curve.one);
        }
        o(f, a),
          (e.exports = f),
          (f.prototype._getEndomorphism = function (t) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
              var e, r;
              if (t.beta) e = new i(t.beta, 16).toRed(this.red);
              else {
                var n = this._getEndoRoots(this.p);
                e = (e = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red);
              }
              if (t.lambda) r = new i(t.lambda, 16);
              else {
                var o = this._getEndoRoots(this.n);
                0 === this.g.mul(o[0]).x.cmp(this.g.x.redMul(e))
                  ? (r = o[0])
                  : ((r = o[1]), s(0 === this.g.mul(r).x.cmp(this.g.x.redMul(e))));
              }
              return {
                beta: e,
                lambda: r,
                basis: t.basis
                  ? t.basis.map(function (t) {
                      return { a: new i(t.a, 16), b: new i(t.b, 16) };
                    })
                  : this._getEndoBasis(r),
              };
            }
          }),
          (f.prototype._getEndoRoots = function (t) {
            var e = t === this.p ? this.red : i.mont(t),
              r = new i(2).toRed(e).redInvm(),
              n = r.redNeg(),
              o = new i(3).toRed(e).redNeg().redSqrt().redMul(r);
            return [n.redAdd(o).fromRed(), n.redSub(o).fromRed()];
          }),
          (f.prototype._getEndoBasis = function (t) {
            for (
              var e,
                r,
                n,
                o,
                a,
                s,
                f,
                u,
                c,
                h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
                d = t,
                l = this.n.clone(),
                p = new i(1),
                b = new i(0),
                m = new i(0),
                v = new i(1),
                g = 0;
              0 !== d.cmpn(0);

            ) {
              var y = l.div(d);
              (u = l.sub(y.mul(d))), (c = m.sub(y.mul(p)));
              var w = v.sub(y.mul(b));
              if (!n && u.cmp(h) < 0) (e = f.neg()), (r = p), (n = u.neg()), (o = c);
              else if (n && 2 == ++g) break;
              (f = u), (l = d), (d = u), (m = p), (p = c), (v = b), (b = w);
            }
            (a = u.neg()), (s = c);
            var _ = n.sqr().add(o.sqr());
            return (
              a.sqr().add(s.sqr()).cmp(_) >= 0 && ((a = e), (s = r)),
              n.negative && ((n = n.neg()), (o = o.neg())),
              a.negative && ((a = a.neg()), (s = s.neg())),
              [
                { a: n, b: o },
                { a: a, b: s },
              ]
            );
          }),
          (f.prototype._endoSplit = function (t) {
            var e = this.endo.basis,
              r = e[0],
              n = e[1],
              i = n.b.mul(t).divRound(this.n),
              o = r.b.neg().mul(t).divRound(this.n),
              a = i.mul(r.a),
              s = o.mul(n.a),
              f = i.mul(r.b),
              u = o.mul(n.b);
            return { k1: t.sub(a).sub(s), k2: f.add(u).neg() };
          }),
          (f.prototype.pointFromX = function (t, e) {
            (t = new i(t, 16)).red || (t = t.toRed(this.red));
            var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
              n = r.redSqrt();
            if (0 !== n.redSqr().redSub(r).cmp(this.zero)) throw new Error('invalid point');
            var o = n.fromRed().isOdd();
            return ((e && !o) || (!e && o)) && (n = n.redNeg()), this.point(t, n);
          }),
          (f.prototype.validate = function (t) {
            if (t.inf) return !0;
            var e = t.x,
              r = t.y,
              n = this.a.redMul(e),
              i = e.redSqr().redMul(e).redIAdd(n).redIAdd(this.b);
            return 0 === r.redSqr().redISub(i).cmpn(0);
          }),
          (f.prototype._endoWnafMulAdd = function (t, e, r) {
            for (var n = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < t.length; o++) {
              var a = this._endoSplit(e[o]),
                s = t[o],
                f = s._getBeta();
              a.k1.negative && (a.k1.ineg(), (s = s.neg(!0))),
                a.k2.negative && (a.k2.ineg(), (f = f.neg(!0))),
                (n[2 * o] = s),
                (n[2 * o + 1] = f),
                (i[2 * o] = a.k1),
                (i[2 * o + 1] = a.k2);
            }
            for (var u = this._wnafMulAdd(1, n, i, 2 * o, r), c = 0; c < 2 * o; c++) (n[c] = null), (i[c] = null);
            return u;
          }),
          o(u, a.BasePoint),
          (f.prototype.point = function (t, e, r) {
            return new u(this, t, e, r);
          }),
          (f.prototype.pointFromJSON = function (t, e) {
            return u.fromJSON(this, t, e);
          }),
          (u.prototype._getBeta = function () {
            if (this.curve.endo) {
              var t = this.precomputed;
              if (t && t.beta) return t.beta;
              var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
              if (t) {
                var r = this.curve,
                  n = function (t) {
                    return r.point(t.x.redMul(r.endo.beta), t.y);
                  };
                (t.beta = e),
                  (e.precomputed = {
                    beta: null,
                    naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(n) },
                    doubles: t.doubles && { step: t.doubles.step, points: t.doubles.points.map(n) },
                  });
              }
              return e;
            }
          }),
          (u.prototype.toJSON = function () {
            return this.precomputed
              ? [
                  this.x,
                  this.y,
                  this.precomputed && {
                    doubles: this.precomputed.doubles && {
                      step: this.precomputed.doubles.step,
                      points: this.precomputed.doubles.points.slice(1),
                    },
                    naf: this.precomputed.naf && {
                      wnd: this.precomputed.naf.wnd,
                      points: this.precomputed.naf.points.slice(1),
                    },
                  },
                ]
              : [this.x, this.y];
          }),
          (u.fromJSON = function (t, e, r) {
            'string' == typeof e && (e = JSON.parse(e));
            var n = t.point(e[0], e[1], r);
            if (!e[2]) return n;
            function i(e) {
              return t.point(e[0], e[1], r);
            }
            var o = e[2];
            return (
              (n.precomputed = {
                beta: null,
                doubles: o.doubles && { step: o.doubles.step, points: [n].concat(o.doubles.points.map(i)) },
                naf: o.naf && { wnd: o.naf.wnd, points: [n].concat(o.naf.points.map(i)) },
              }),
              n
            );
          }),
          (u.prototype.inspect = function () {
            return this.isInfinity()
              ? '<EC Point Infinity>'
              : '<EC Point x: ' + this.x.fromRed().toString(16, 2) + ' y: ' + this.y.fromRed().toString(16, 2) + '>';
          }),
          (u.prototype.isInfinity = function () {
            return this.inf;
          }),
          (u.prototype.add = function (t) {
            if (this.inf) return t;
            if (t.inf) return this;
            if (this.eq(t)) return this.dbl();
            if (this.neg().eq(t)) return this.curve.point(null, null);
            if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
            var e = this.y.redSub(t.y);
            0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
            var r = e.redSqr().redISub(this.x).redISub(t.x),
              n = e.redMul(this.x.redSub(r)).redISub(this.y);
            return this.curve.point(r, n);
          }),
          (u.prototype.dbl = function () {
            if (this.inf) return this;
            var t = this.y.redAdd(this.y);
            if (0 === t.cmpn(0)) return this.curve.point(null, null);
            var e = this.curve.a,
              r = this.x.redSqr(),
              n = t.redInvm(),
              i = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(n),
              o = i.redSqr().redISub(this.x.redAdd(this.x)),
              a = i.redMul(this.x.redSub(o)).redISub(this.y);
            return this.curve.point(o, a);
          }),
          (u.prototype.getX = function () {
            return this.x.fromRed();
          }),
          (u.prototype.getY = function () {
            return this.y.fromRed();
          }),
          (u.prototype.mul = function (t) {
            return (
              (t = new i(t, 16)),
              this.isInfinity()
                ? this
                : this._hasDoubles(t)
                ? this.curve._fixedNafMul(this, t)
                : this.curve.endo
                ? this.curve._endoWnafMulAdd([this], [t])
                : this.curve._wnafMul(this, t)
            );
          }),
          (u.prototype.mulAdd = function (t, e, r) {
            var n = [this, e],
              i = [t, r];
            return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2);
          }),
          (u.prototype.jmulAdd = function (t, e, r) {
            var n = [this, e],
              i = [t, r];
            return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !0);
          }),
          (u.prototype.eq = function (t) {
            return this === t || (this.inf === t.inf && (this.inf || (0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))));
          }),
          (u.prototype.neg = function (t) {
            if (this.inf) return this;
            var e = this.curve.point(this.x, this.y.redNeg());
            if (t && this.precomputed) {
              var r = this.precomputed,
                n = function (t) {
                  return t.neg();
                };
              e.precomputed = {
                naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(n) },
                doubles: r.doubles && { step: r.doubles.step, points: r.doubles.points.map(n) },
              };
            }
            return e;
          }),
          (u.prototype.toJ = function () {
            return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one);
          }),
          o(c, a.BasePoint),
          (f.prototype.jpoint = function (t, e, r) {
            return new c(this, t, e, r);
          }),
          (c.prototype.toP = function () {
            if (this.isInfinity()) return this.curve.point(null, null);
            var t = this.z.redInvm(),
              e = t.redSqr(),
              r = this.x.redMul(e),
              n = this.y.redMul(e).redMul(t);
            return this.curve.point(r, n);
          }),
          (c.prototype.neg = function () {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
          }),
          (c.prototype.add = function (t) {
            if (this.isInfinity()) return t;
            if (t.isInfinity()) return this;
            var e = t.z.redSqr(),
              r = this.z.redSqr(),
              n = this.x.redMul(e),
              i = t.x.redMul(r),
              o = this.y.redMul(e.redMul(t.z)),
              a = t.y.redMul(r.redMul(this.z)),
              s = n.redSub(i),
              f = o.redSub(a);
            if (0 === s.cmpn(0)) return 0 !== f.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var u = s.redSqr(),
              c = u.redMul(s),
              h = n.redMul(u),
              d = f.redSqr().redIAdd(c).redISub(h).redISub(h),
              l = f.redMul(h.redISub(d)).redISub(o.redMul(c)),
              p = this.z.redMul(t.z).redMul(s);
            return this.curve.jpoint(d, l, p);
          }),
          (c.prototype.mixedAdd = function (t) {
            if (this.isInfinity()) return t.toJ();
            if (t.isInfinity()) return this;
            var e = this.z.redSqr(),
              r = this.x,
              n = t.x.redMul(e),
              i = this.y,
              o = t.y.redMul(e).redMul(this.z),
              a = r.redSub(n),
              s = i.redSub(o);
            if (0 === a.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var f = a.redSqr(),
              u = f.redMul(a),
              c = r.redMul(f),
              h = s.redSqr().redIAdd(u).redISub(c).redISub(c),
              d = s.redMul(c.redISub(h)).redISub(i.redMul(u)),
              l = this.z.redMul(a);
            return this.curve.jpoint(h, d, l);
          }),
          (c.prototype.dblp = function (t) {
            if (0 === t) return this;
            if (this.isInfinity()) return this;
            if (!t) return this.dbl();
            var e;
            if (this.curve.zeroA || this.curve.threeA) {
              var r = this;
              for (e = 0; e < t; e++) r = r.dbl();
              return r;
            }
            var n = this.curve.a,
              i = this.curve.tinv,
              o = this.x,
              a = this.y,
              s = this.z,
              f = s.redSqr().redSqr(),
              u = a.redAdd(a);
            for (e = 0; e < t; e++) {
              var c = o.redSqr(),
                h = u.redSqr(),
                d = h.redSqr(),
                l = c.redAdd(c).redIAdd(c).redIAdd(n.redMul(f)),
                p = o.redMul(h),
                b = l.redSqr().redISub(p.redAdd(p)),
                m = p.redISub(b),
                v = l.redMul(m);
              v = v.redIAdd(v).redISub(d);
              var g = u.redMul(s);
              e + 1 < t && (f = f.redMul(d)), (o = b), (s = g), (u = v);
            }
            return this.curve.jpoint(o, u.redMul(i), s);
          }),
          (c.prototype.dbl = function () {
            return this.isInfinity()
              ? this
              : this.curve.zeroA
              ? this._zeroDbl()
              : this.curve.threeA
              ? this._threeDbl()
              : this._dbl();
          }),
          (c.prototype._zeroDbl = function () {
            var t, e, r;
            if (this.zOne) {
              var n = this.x.redSqr(),
                i = this.y.redSqr(),
                o = i.redSqr(),
                a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
              a = a.redIAdd(a);
              var s = n.redAdd(n).redIAdd(n),
                f = s.redSqr().redISub(a).redISub(a),
                u = o.redIAdd(o);
              (u = (u = u.redIAdd(u)).redIAdd(u)),
                (t = f),
                (e = s.redMul(a.redISub(f)).redISub(u)),
                (r = this.y.redAdd(this.y));
            } else {
              var c = this.x.redSqr(),
                h = this.y.redSqr(),
                d = h.redSqr(),
                l = this.x.redAdd(h).redSqr().redISub(c).redISub(d);
              l = l.redIAdd(l);
              var p = c.redAdd(c).redIAdd(c),
                b = p.redSqr(),
                m = d.redIAdd(d);
              (m = (m = m.redIAdd(m)).redIAdd(m)),
                (t = b.redISub(l).redISub(l)),
                (e = p.redMul(l.redISub(t)).redISub(m)),
                (r = (r = this.y.redMul(this.z)).redIAdd(r));
            }
            return this.curve.jpoint(t, e, r);
          }),
          (c.prototype._threeDbl = function () {
            var t, e, r;
            if (this.zOne) {
              var n = this.x.redSqr(),
                i = this.y.redSqr(),
                o = i.redSqr(),
                a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
              a = a.redIAdd(a);
              var s = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a),
                f = s.redSqr().redISub(a).redISub(a);
              t = f;
              var u = o.redIAdd(o);
              (u = (u = u.redIAdd(u)).redIAdd(u)), (e = s.redMul(a.redISub(f)).redISub(u)), (r = this.y.redAdd(this.y));
            } else {
              var c = this.z.redSqr(),
                h = this.y.redSqr(),
                d = this.x.redMul(h),
                l = this.x.redSub(c).redMul(this.x.redAdd(c));
              l = l.redAdd(l).redIAdd(l);
              var p = d.redIAdd(d),
                b = (p = p.redIAdd(p)).redAdd(p);
              (t = l.redSqr().redISub(b)), (r = this.y.redAdd(this.z).redSqr().redISub(h).redISub(c));
              var m = h.redSqr();
              (m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m)), (e = l.redMul(p.redISub(t)).redISub(m));
            }
            return this.curve.jpoint(t, e, r);
          }),
          (c.prototype._dbl = function () {
            var t = this.curve.a,
              e = this.x,
              r = this.y,
              n = this.z,
              i = n.redSqr().redSqr(),
              o = e.redSqr(),
              a = r.redSqr(),
              s = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(i)),
              f = e.redAdd(e),
              u = (f = f.redIAdd(f)).redMul(a),
              c = s.redSqr().redISub(u.redAdd(u)),
              h = u.redISub(c),
              d = a.redSqr();
            d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
            var l = s.redMul(h).redISub(d),
              p = r.redAdd(r).redMul(n);
            return this.curve.jpoint(c, l, p);
          }),
          (c.prototype.trpl = function () {
            if (!this.curve.zeroA) return this.dbl().add(this);
            var t = this.x.redSqr(),
              e = this.y.redSqr(),
              r = this.z.redSqr(),
              n = e.redSqr(),
              i = t.redAdd(t).redIAdd(t),
              o = i.redSqr(),
              a = this.x.redAdd(e).redSqr().redISub(t).redISub(n),
              s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(),
              f = n.redIAdd(n);
            f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
            var u = i.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(f),
              c = e.redMul(u);
            c = (c = c.redIAdd(c)).redIAdd(c);
            var h = this.x.redMul(s).redISub(c);
            h = (h = h.redIAdd(h)).redIAdd(h);
            var d = this.y.redMul(u.redMul(f.redISub(u)).redISub(a.redMul(s)));
            d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
            var l = this.z.redAdd(a).redSqr().redISub(r).redISub(s);
            return this.curve.jpoint(h, d, l);
          }),
          (c.prototype.mul = function (t, e) {
            return (t = new i(t, e)), this.curve._wnafMul(this, t);
          }),
          (c.prototype.eq = function (t) {
            if ('affine' === t.type) return this.eq(t.toJ());
            if (this === t) return !0;
            var e = this.z.redSqr(),
              r = t.z.redSqr();
            if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0)) return !1;
            var n = e.redMul(this.z),
              i = r.redMul(t.z);
            return 0 === this.y.redMul(i).redISub(t.y.redMul(n)).cmpn(0);
          }),
          (c.prototype.eqXToP = function (t) {
            var e = this.z.redSqr(),
              r = t.toRed(this.curve.red).redMul(e);
            if (0 === this.x.cmp(r)) return !0;
            for (var n = t.clone(), i = this.curve.redN.redMul(e); ; ) {
              if ((n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)) return !1;
              if ((r.redIAdd(i), 0 === this.x.cmp(r))) return !0;
            }
          }),
          (c.prototype.inspect = function () {
            return this.isInfinity()
              ? '<EC JPoint Infinity>'
              : '<EC JPoint x: ' +
                  this.x.toString(16, 2) +
                  ' y: ' +
                  this.y.toString(16, 2) +
                  ' z: ' +
                  this.z.toString(16, 2) +
                  '>';
          }),
          (c.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0);
          });
      },
      { '../utils': 39, './base': 26, 'bn.js': 15, inherits: 80 },
    ],
    31: [
      function (t, e, r) {
        'use strict';
        var n,
          i = r,
          o = t('hash.js'),
          a = t('./curve'),
          s = t('./utils').assert;
        function f(t) {
          'short' === t.type
            ? (this.curve = new a.short(t))
            : 'edwards' === t.type
            ? (this.curve = new a.edwards(t))
            : (this.curve = new a.mont(t)),
            (this.g = this.curve.g),
            (this.n = this.curve.n),
            (this.hash = t.hash),
            s(this.g.validate(), 'Invalid curve'),
            s(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
        }
        function u(t, e) {
          Object.defineProperty(i, t, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              var r = new f(e);
              return Object.defineProperty(i, t, { configurable: !0, enumerable: !0, value: r }), r;
            },
          });
        }
        (i.PresetCurve = f),
          u('p192', {
            type: 'short',
            prime: 'p192',
            p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
            a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
            b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
            n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
            hash: o.sha256,
            gRed: !1,
            g: [
              '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
              '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811',
            ],
          }),
          u('p224', {
            type: 'short',
            prime: 'p224',
            p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
            a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
            b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
            n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
            hash: o.sha256,
            gRed: !1,
            g: [
              'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
              'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34',
            ],
          }),
          u('p256', {
            type: 'short',
            prime: null,
            p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
            a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
            b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
            n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
            hash: o.sha256,
            gRed: !1,
            g: [
              '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
              '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5',
            ],
          }),
          u('p384', {
            type: 'short',
            prime: null,
            p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff',
            a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc',
            b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
            n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
            hash: o.sha384,
            gRed: !1,
            g: [
              'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7',
              '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f',
            ],
          }),
          u('p521', {
            type: 'short',
            prime: null,
            p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff',
            a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc',
            b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
            n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
            hash: o.sha512,
            gRed: !1,
            g: [
              '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
              '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650',
            ],
          }),
          u('curve25519', {
            type: 'mont',
            prime: 'p25519',
            p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
            a: '76d06',
            b: '1',
            n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
            hash: o.sha256,
            gRed: !1,
            g: ['9'],
          }),
          u('ed25519', {
            type: 'edwards',
            prime: 'p25519',
            p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
            a: '-1',
            c: '1',
            d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
            n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
            hash: o.sha256,
            gRed: !1,
            g: [
              '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',
              '6666666666666666666666666666666666666666666666666666666666666658',
            ],
          });
        try {
          n = t('./precomputed/secp256k1');
        } catch (t) {
          n = void 0;
        }
        u('secp256k1', {
          type: 'short',
          prime: 'k256',
          p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
          a: '0',
          b: '7',
          n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
          h: '1',
          hash: o.sha256,
          beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
          lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
          basis: [
            { a: '3086d221a7d46bcde86c90e49284eb15', b: '-e4437ed6010e88286f547fa90abfe4c3' },
            { a: '114ca50f7a8e2f3f657c1108d9d44cfd8', b: '3086d221a7d46bcde86c90e49284eb15' },
          ],
          gRed: !1,
          g: [
            '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
            '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
            n,
          ],
        });
      },
      { './curve': 28, './precomputed/secp256k1': 38, './utils': 39, 'hash.js': 66 },
    ],
    32: [
      function (t, e, r) {
        'use strict';
        var n = t('bn.js'),
          i = t('hmac-drbg'),
          o = t('../utils'),
          a = t('../curves'),
          s = t('brorand'),
          f = o.assert,
          u = t('./key'),
          c = t('./signature');
        function h(t) {
          if (!(this instanceof h)) return new h(t);
          'string' == typeof t && (f(Object.prototype.hasOwnProperty.call(a, t), 'Unknown curve ' + t), (t = a[t])),
            t instanceof a.PresetCurve && (t = { curve: t }),
            (this.curve = t.curve.curve),
            (this.n = this.curve.n),
            (this.nh = this.n.ushrn(1)),
            (this.g = this.curve.g),
            (this.g = t.curve.g),
            this.g.precompute(t.curve.n.bitLength() + 1),
            (this.hash = t.hash || t.curve.hash);
        }
        (e.exports = h),
          (h.prototype.keyPair = function (t) {
            return new u(this, t);
          }),
          (h.prototype.keyFromPrivate = function (t, e) {
            return u.fromPrivate(this, t, e);
          }),
          (h.prototype.keyFromPublic = function (t, e) {
            return u.fromPublic(this, t, e);
          }),
          (h.prototype.genKeyPair = function (t) {
            t || (t = {});
            for (
              var e = new i({
                  hash: this.hash,
                  pers: t.pers,
                  persEnc: t.persEnc || 'utf8',
                  entropy: t.entropy || s(this.hash.hmacStrength),
                  entropyEnc: (t.entropy && t.entropyEnc) || 'utf8',
                  nonce: this.n.toArray(),
                }),
                r = this.n.byteLength(),
                o = this.n.sub(new n(2));
              ;

            ) {
              var a = new n(e.generate(r));
              if (!(a.cmp(o) > 0)) return a.iaddn(1), this.keyFromPrivate(a);
            }
          }),
          (h.prototype._truncateToN = function (t, e) {
            var r = 8 * t.byteLength() - this.n.bitLength();
            return r > 0 && (t = t.ushrn(r)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
          }),
          (h.prototype.sign = function (t, e, r, o) {
            'object' == typeof r && ((o = r), (r = null)),
              o || (o = {}),
              (e = this.keyFromPrivate(e, r)),
              (t = this._truncateToN(new n(t, 16)));
            for (
              var a = this.n.byteLength(),
                s = e.getPrivate().toArray('be', a),
                f = t.toArray('be', a),
                u = new i({ hash: this.hash, entropy: s, nonce: f, pers: o.pers, persEnc: o.persEnc || 'utf8' }),
                h = this.n.sub(new n(1)),
                d = 0;
              ;
              d++
            ) {
              var l = o.k ? o.k(d) : new n(u.generate(this.n.byteLength()));
              if (!((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || l.cmp(h) >= 0)) {
                var p = this.g.mul(l);
                if (!p.isInfinity()) {
                  var b = p.getX(),
                    m = b.umod(this.n);
                  if (0 !== m.cmpn(0)) {
                    var v = l.invm(this.n).mul(m.mul(e.getPrivate()).iadd(t));
                    if (0 !== (v = v.umod(this.n)).cmpn(0)) {
                      var g = (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(m) ? 2 : 0);
                      return (
                        o.canonical && v.cmp(this.nh) > 0 && ((v = this.n.sub(v)), (g ^= 1)),
                        new c({ r: m, s: v, recoveryParam: g })
                      );
                    }
                  }
                }
              }
            }
          }),
          (h.prototype.verify = function (t, e, r, i) {
            (t = this._truncateToN(new n(t, 16))), (r = this.keyFromPublic(r, i));
            var o = (e = new c(e, 'hex')).r,
              a = e.s;
            if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
            if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
            var s,
              f = a.invm(this.n),
              u = f.mul(t).umod(this.n),
              h = f.mul(o).umod(this.n);
            return this.curve._maxwellTrick
              ? !(s = this.g.jmulAdd(u, r.getPublic(), h)).isInfinity() && s.eqXToP(o)
              : !(s = this.g.mulAdd(u, r.getPublic(), h)).isInfinity() && 0 === s.getX().umod(this.n).cmp(o);
          }),
          (h.prototype.recoverPubKey = function (t, e, r, i) {
            f((3 & r) === r, 'The recovery param is more than two bits'), (e = new c(e, i));
            var o = this.n,
              a = new n(t),
              s = e.r,
              u = e.s,
              h = 1 & r,
              d = r >> 1;
            if (s.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
              throw new Error('Unable to find sencond key candinate');
            s = d ? this.curve.pointFromX(s.add(this.curve.n), h) : this.curve.pointFromX(s, h);
            var l = e.r.invm(o),
              p = o.sub(a).mul(l).umod(o),
              b = u.mul(l).umod(o);
            return this.g.mulAdd(p, s, b);
          }),
          (h.prototype.getKeyRecoveryParam = function (t, e, r, n) {
            if (null !== (e = new c(e, n)).recoveryParam) return e.recoveryParam;
            for (var i = 0; i < 4; i++) {
              var o;
              try {
                o = this.recoverPubKey(t, e, i);
              } catch (t) {
                continue;
              }
              if (o.eq(r)) return i;
            }
            throw new Error('Unable to find valid recovery factor');
          });
      },
      { '../curves': 31, '../utils': 39, './key': 33, './signature': 34, 'bn.js': 15, brorand: 16, 'hmac-drbg': 78 },
    ],
    33: [
      function (t, e, r) {
        'use strict';
        var n = t('bn.js'),
          i = t('../utils').assert;
        function o(t, e) {
          (this.ec = t),
            (this.priv = null),
            (this.pub = null),
            e.priv && this._importPrivate(e.priv, e.privEnc),
            e.pub && this._importPublic(e.pub, e.pubEnc);
        }
        (e.exports = o),
          (o.fromPublic = function (t, e, r) {
            return e instanceof o ? e : new o(t, { pub: e, pubEnc: r });
          }),
          (o.fromPrivate = function (t, e, r) {
            return e instanceof o ? e : new o(t, { priv: e, privEnc: r });
          }),
          (o.prototype.validate = function () {
            var t = this.getPublic();
            return t.isInfinity()
              ? { result: !1, reason: 'Invalid public key' }
              : t.validate()
              ? t.mul(this.ec.curve.n).isInfinity()
                ? { result: !0, reason: null }
                : { result: !1, reason: 'Public key * N != O' }
              : { result: !1, reason: 'Public key is not a point' };
          }),
          (o.prototype.getPublic = function (t, e) {
            return (
              'string' == typeof t && ((e = t), (t = null)),
              this.pub || (this.pub = this.ec.g.mul(this.priv)),
              e ? this.pub.encode(e, t) : this.pub
            );
          }),
          (o.prototype.getPrivate = function (t) {
            return 'hex' === t ? this.priv.toString(16, 2) : this.priv;
          }),
          (o.prototype._importPrivate = function (t, e) {
            (this.priv = new n(t, e || 16)), (this.priv = this.priv.umod(this.ec.curve.n));
          }),
          (o.prototype._importPublic = function (t, e) {
            if (t.x || t.y)
              return (
                'mont' === this.ec.curve.type
                  ? i(t.x, 'Need x coordinate')
                  : ('short' !== this.ec.curve.type && 'edwards' !== this.ec.curve.type) ||
                    i(t.x && t.y, 'Need both x and y coordinate'),
                void (this.pub = this.ec.curve.point(t.x, t.y))
              );
            this.pub = this.ec.curve.decodePoint(t, e);
          }),
          (o.prototype.derive = function (t) {
            return t.validate() || i(t.validate(), 'public point not validated'), t.mul(this.priv).getX();
          }),
          (o.prototype.sign = function (t, e, r) {
            return this.ec.sign(t, this, e, r);
          }),
          (o.prototype.verify = function (t, e) {
            return this.ec.verify(t, e, this);
          }),
          (o.prototype.inspect = function () {
            return (
              '<Key priv: ' +
              (this.priv && this.priv.toString(16, 2)) +
              ' pub: ' +
              (this.pub && this.pub.inspect()) +
              ' >'
            );
          });
      },
      { '../utils': 39, 'bn.js': 15 },
    ],
    34: [
      function (t, e, r) {
        'use strict';
        var n = t('bn.js'),
          i = t('../utils'),
          o = i.assert;
        function a(t, e) {
          if (t instanceof a) return t;
          this._importDER(t, e) ||
            (o(t.r && t.s, 'Signature without r or s'),
            (this.r = new n(t.r, 16)),
            (this.s = new n(t.s, 16)),
            void 0 === t.recoveryParam ? (this.recoveryParam = null) : (this.recoveryParam = t.recoveryParam));
        }
        function s() {
          this.place = 0;
        }
        function f(t, e) {
          var r = t[e.place++];
          if (!(128 & r)) return r;
          var n = 15 & r;
          if (0 === n || n > 4) return !1;
          for (var i = 0, o = 0, a = e.place; o < n; o++, a++) (i <<= 8), (i |= t[a]), (i >>>= 0);
          return !(i <= 127) && ((e.place = a), i);
        }
        function u(t) {
          for (var e = 0, r = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < r; ) e++;
          return 0 === e ? t : t.slice(e);
        }
        function c(t, e) {
          if (e < 128) t.push(e);
          else {
            var r = 1 + ((Math.log(e) / Math.LN2) >>> 3);
            for (t.push(128 | r); --r; ) t.push((e >>> (r << 3)) & 255);
            t.push(e);
          }
        }
        (e.exports = a),
          (a.prototype._importDER = function (t, e) {
            t = i.toArray(t, e);
            var r = new s();
            if (48 !== t[r.place++]) return !1;
            var o = f(t, r);
            if (!1 === o) return !1;
            if (o + r.place !== t.length) return !1;
            if (2 !== t[r.place++]) return !1;
            var a = f(t, r);
            if (!1 === a) return !1;
            var u = t.slice(r.place, a + r.place);
            if (((r.place += a), 2 !== t[r.place++])) return !1;
            var c = f(t, r);
            if (!1 === c) return !1;
            if (t.length !== c + r.place) return !1;
            var h = t.slice(r.place, c + r.place);
            if (0 === u[0]) {
              if (!(128 & u[1])) return !1;
              u = u.slice(1);
            }
            if (0 === h[0]) {
              if (!(128 & h[1])) return !1;
              h = h.slice(1);
            }
            return (this.r = new n(u)), (this.s = new n(h)), (this.recoveryParam = null), !0;
          }),
          (a.prototype.toDER = function (t) {
            var e = this.r.toArray(),
              r = this.s.toArray();
            for (
              128 & e[0] && (e = [0].concat(e)), 128 & r[0] && (r = [0].concat(r)), e = u(e), r = u(r);
              !(r[0] || 128 & r[1]);

            )
              r = r.slice(1);
            var n = [2];
            c(n, e.length), (n = n.concat(e)).push(2), c(n, r.length);
            var o = n.concat(r),
              a = [48];
            return c(a, o.length), (a = a.concat(o)), i.encode(a, t);
          });
      },
      { '../utils': 39, 'bn.js': 15 },
    ],
    35: [
      function (t, e, r) {
        'use strict';
        var n = t('hash.js'),
          i = t('../curves'),
          o = t('../utils'),
          a = o.assert,
          s = o.parseBytes,
          f = t('./key'),
          u = t('./signature');
        function c(t) {
          if ((a('ed25519' === t, 'only tested with ed25519 so far'), !(this instanceof c))) return new c(t);
          (t = i[t].curve),
            (this.curve = t),
            (this.g = t.g),
            this.g.precompute(t.n.bitLength() + 1),
            (this.pointClass = t.point().constructor),
            (this.encodingLength = Math.ceil(t.n.bitLength() / 8)),
            (this.hash = n.sha512);
        }
        (e.exports = c),
          (c.prototype.sign = function (t, e) {
            t = s(t);
            var r = this.keyFromSecret(e),
              n = this.hashInt(r.messagePrefix(), t),
              i = this.g.mul(n),
              o = this.encodePoint(i),
              a = this.hashInt(o, r.pubBytes(), t).mul(r.priv()),
              f = n.add(a).umod(this.curve.n);
            return this.makeSignature({ R: i, S: f, Rencoded: o });
          }),
          (c.prototype.verify = function (t, e, r) {
            (t = s(t)), (e = this.makeSignature(e));
            var n = this.keyFromPublic(r),
              i = this.hashInt(e.Rencoded(), n.pubBytes(), t),
              o = this.g.mul(e.S());
            return e.R().add(n.pub().mul(i)).eq(o);
          }),
          (c.prototype.hashInt = function () {
            for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
            return o.intFromLE(t.digest()).umod(this.curve.n);
          }),
          (c.prototype.keyFromPublic = function (t) {
            return f.fromPublic(this, t);
          }),
          (c.prototype.keyFromSecret = function (t) {
            return f.fromSecret(this, t);
          }),
          (c.prototype.makeSignature = function (t) {
            return t instanceof u ? t : new u(this, t);
          }),
          (c.prototype.encodePoint = function (t) {
            var e = t.getY().toArray('le', this.encodingLength);
            return (e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0), e;
          }),
          (c.prototype.decodePoint = function (t) {
            var e = (t = o.parseBytes(t)).length - 1,
              r = t.slice(0, e).concat(-129 & t[e]),
              n = 0 != (128 & t[e]),
              i = o.intFromLE(r);
            return this.curve.pointFromY(i, n);
          }),
          (c.prototype.encodeInt = function (t) {
            return t.toArray('le', this.encodingLength);
          }),
          (c.prototype.decodeInt = function (t) {
            return o.intFromLE(t);
          }),
          (c.prototype.isPoint = function (t) {
            return t instanceof this.pointClass;
          });
      },
      { '../curves': 31, '../utils': 39, './key': 36, './signature': 37, 'hash.js': 66 },
    ],
    36: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = n.assert,
          o = n.parseBytes,
          a = n.cachedProperty;
        function s(t, e) {
          (this.eddsa = t),
            (this._secret = o(e.secret)),
            t.isPoint(e.pub) ? (this._pub = e.pub) : (this._pubBytes = o(e.pub));
        }
        (s.fromPublic = function (t, e) {
          return e instanceof s ? e : new s(t, { pub: e });
        }),
          (s.fromSecret = function (t, e) {
            return e instanceof s ? e : new s(t, { secret: e });
          }),
          (s.prototype.secret = function () {
            return this._secret;
          }),
          a(s, 'pubBytes', function () {
            return this.eddsa.encodePoint(this.pub());
          }),
          a(s, 'pub', function () {
            return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
          }),
          a(s, 'privBytes', function () {
            var t = this.eddsa,
              e = this.hash(),
              r = t.encodingLength - 1,
              n = e.slice(0, t.encodingLength);
            return (n[0] &= 248), (n[r] &= 127), (n[r] |= 64), n;
          }),
          a(s, 'priv', function () {
            return this.eddsa.decodeInt(this.privBytes());
          }),
          a(s, 'hash', function () {
            return this.eddsa.hash().update(this.secret()).digest();
          }),
          a(s, 'messagePrefix', function () {
            return this.hash().slice(this.eddsa.encodingLength);
          }),
          (s.prototype.sign = function (t) {
            return i(this._secret, 'KeyPair can only verify'), this.eddsa.sign(t, this);
          }),
          (s.prototype.verify = function (t, e) {
            return this.eddsa.verify(t, e, this);
          }),
          (s.prototype.getSecret = function (t) {
            return i(this._secret, 'KeyPair is public only'), n.encode(this.secret(), t);
          }),
          (s.prototype.getPublic = function (t) {
            return n.encode(this.pubBytes(), t);
          }),
          (e.exports = s);
      },
      { '../utils': 39 },
    ],
    37: [
      function (t, e, r) {
        'use strict';
        var n = t('bn.js'),
          i = t('../utils'),
          o = i.assert,
          a = i.cachedProperty,
          s = i.parseBytes;
        function f(t, e) {
          (this.eddsa = t),
            'object' != typeof e && (e = s(e)),
            Array.isArray(e) && (e = { R: e.slice(0, t.encodingLength), S: e.slice(t.encodingLength) }),
            o(e.R && e.S, 'Signature without R or S'),
            t.isPoint(e.R) && (this._R = e.R),
            e.S instanceof n && (this._S = e.S),
            (this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded),
            (this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded);
        }
        a(f, 'S', function () {
          return this.eddsa.decodeInt(this.Sencoded());
        }),
          a(f, 'R', function () {
            return this.eddsa.decodePoint(this.Rencoded());
          }),
          a(f, 'Rencoded', function () {
            return this.eddsa.encodePoint(this.R());
          }),
          a(f, 'Sencoded', function () {
            return this.eddsa.encodeInt(this.S());
          }),
          (f.prototype.toBytes = function () {
            return this.Rencoded().concat(this.Sencoded());
          }),
          (f.prototype.toHex = function () {
            return i.encode(this.toBytes(), 'hex').toUpperCase();
          }),
          (e.exports = f);
      },
      { '../utils': 39, 'bn.js': 15 },
    ],
    38: [
      function (t, e, r) {
        e.exports = {
          doubles: {
            step: 4,
            points: [
              [
                'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
                'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821',
              ],
              [
                '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
                '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf',
              ],
              [
                '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
                'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695',
              ],
              [
                '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
                '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9',
              ],
              [
                '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
                '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36',
              ],
              [
                '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
                '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f',
              ],
              [
                'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
                '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999',
              ],
              [
                '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
                'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09',
              ],
              [
                'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
                '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d',
              ],
              [
                'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
                'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088',
              ],
              [
                'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
                '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d',
              ],
              [
                '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
                '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8',
              ],
              [
                '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
                '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a',
              ],
              [
                '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
                '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453',
              ],
              [
                '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
                '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160',
              ],
              [
                '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
                '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0',
              ],
              [
                '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
                '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6',
              ],
              [
                '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
                '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589',
              ],
              [
                '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
                'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17',
              ],
              [
                'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
                '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda',
              ],
              [
                'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
                '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd',
              ],
              [
                '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
                '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2',
              ],
              [
                '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
                '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6',
              ],
              [
                'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
                '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f',
              ],
              [
                '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
                'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01',
              ],
              [
                'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
                '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3',
              ],
              [
                'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
                'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f',
              ],
              [
                'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
                '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7',
              ],
              [
                'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
                'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78',
              ],
              [
                'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
                '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1',
              ],
              [
                '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
                'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150',
              ],
              [
                '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
                '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82',
              ],
              [
                'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
                '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc',
              ],
              [
                '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
                'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b',
              ],
              [
                'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
                '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51',
              ],
              [
                'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
                '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45',
              ],
              [
                'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
                'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120',
              ],
              [
                '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
                '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84',
              ],
              [
                '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
                '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d',
              ],
              [
                '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
                'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d',
              ],
              [
                '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
                '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8',
              ],
              [
                'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
                '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8',
              ],
              [
                '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
                '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac',
              ],
              [
                '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
                'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f',
              ],
              [
                '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
                '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962',
              ],
              [
                'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
                '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907',
              ],
              [
                '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
                'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec',
              ],
              [
                'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
                'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d',
              ],
              [
                'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
                '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414',
              ],
              [
                '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
                'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd',
              ],
              [
                '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
                'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0',
              ],
              [
                'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
                '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811',
              ],
              [
                'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
                '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1',
              ],
              [
                'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
                '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c',
              ],
              [
                '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
                'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73',
              ],
              [
                '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
                '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd',
              ],
              [
                'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
                'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405',
              ],
              [
                '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
                'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589',
              ],
              [
                '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
                '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e',
              ],
              [
                '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
                '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27',
              ],
              [
                'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
                'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1',
              ],
              [
                '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
                '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482',
              ],
              [
                '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
                '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945',
              ],
              [
                'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
                '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573',
              ],
              [
                'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
                'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82',
              ],
            ],
          },
          naf: {
            wnd: 7,
            points: [
              [
                'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
                '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672',
              ],
              [
                '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
                'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6',
              ],
              [
                '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
                '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da',
              ],
              [
                'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
                'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37',
              ],
              [
                '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
                'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b',
              ],
              [
                'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
                'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81',
              ],
              [
                'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
                '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58',
              ],
              [
                'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
                '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77',
              ],
              [
                '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
                '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a',
              ],
              [
                '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
                '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c',
              ],
              [
                '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
                '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67',
              ],
              [
                '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
                '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402',
              ],
              [
                'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
                'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55',
              ],
              [
                'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
                '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482',
              ],
              [
                '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
                'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82',
              ],
              [
                '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
                'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396',
              ],
              [
                '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
                '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49',
              ],
              [
                '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
                '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf',
              ],
              [
                '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
                '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a',
              ],
              [
                '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
                'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7',
              ],
              [
                'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
                'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933',
              ],
              [
                '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
                '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a',
              ],
              [
                '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
                '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6',
              ],
              [
                'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
                'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37',
              ],
              [
                '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
                '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e',
              ],
              [
                'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
                'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6',
              ],
              [
                'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
                'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476',
              ],
              [
                '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
                '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40',
              ],
              [
                '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
                '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61',
              ],
              [
                '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
                '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683',
              ],
              [
                'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
                '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5',
              ],
              [
                '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
                '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b',
              ],
              [
                'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
                '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417',
              ],
              [
                '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
                'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868',
              ],
              [
                '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
                'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a',
              ],
              [
                'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
                'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6',
              ],
              [
                '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
                '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996',
              ],
              [
                '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
                'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e',
              ],
              [
                'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
                'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d',
              ],
              [
                '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
                '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2',
              ],
              [
                '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
                'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e',
              ],
              [
                '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
                '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437',
              ],
              [
                '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
                'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311',
              ],
              [
                'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
                '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4',
              ],
              [
                '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
                '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575',
              ],
              [
                '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
                'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d',
              ],
              [
                '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
                'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d',
              ],
              [
                'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
                'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629',
              ],
              [
                'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
                'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06',
              ],
              [
                '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
                '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374',
              ],
              [
                '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
                '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee',
              ],
              [
                'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
                '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1',
              ],
              [
                'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
                'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b',
              ],
              [
                '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
                '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661',
              ],
              [
                '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
                '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6',
              ],
              [
                'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
                '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e',
              ],
              [
                '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
                '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d',
              ],
              [
                'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
                'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc',
              ],
              [
                '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
                'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4',
              ],
              [
                '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
                '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c',
              ],
              [
                'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
                '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b',
              ],
              [
                'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
                '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913',
              ],
              [
                '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
                '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154',
              ],
              [
                '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
                '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865',
              ],
              [
                '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
                'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc',
              ],
              [
                '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
                'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224',
              ],
              [
                '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
                '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e',
              ],
              [
                '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
                '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6',
              ],
              [
                '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
                '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511',
              ],
              [
                '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
                'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b',
              ],
              [
                'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
                'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2',
              ],
              [
                '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
                'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c',
              ],
              [
                'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
                '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3',
              ],
              [
                'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
                '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d',
              ],
              [
                'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
                '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700',
              ],
              [
                'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
                '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4',
              ],
              [
                '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
                'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196',
              ],
              [
                '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
                '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4',
              ],
              [
                '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
                'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257',
              ],
              [
                'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
                'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13',
              ],
              [
                'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
                '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096',
              ],
              [
                'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
                'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38',
              ],
              [
                'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
                '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f',
              ],
              [
                '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
                '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448',
              ],
              [
                'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
                '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a',
              ],
              [
                'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
                '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4',
              ],
              [
                '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
                '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437',
              ],
              [
                '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
                'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7',
              ],
              [
                'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
                '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d',
              ],
              [
                'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
                '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a',
              ],
              [
                'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
                '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54',
              ],
              [
                '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
                '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77',
              ],
              [
                'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
                'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517',
              ],
              [
                '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
                'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10',
              ],
              [
                'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
                'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125',
              ],
              [
                'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
                '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e',
              ],
              [
                '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
                'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1',
              ],
              [
                'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
                '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2',
              ],
              [
                'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
                '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423',
              ],
              [
                'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
                '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8',
              ],
              [
                '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
                'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758',
              ],
              [
                '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
                'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375',
              ],
              [
                'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
                '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d',
              ],
              [
                '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
                'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec',
              ],
              [
                '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
                '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0',
              ],
              [
                '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
                'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c',
              ],
              [
                'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
                'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4',
              ],
              [
                '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
                'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f',
              ],
              [
                '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
                '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649',
              ],
              [
                '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
                'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826',
              ],
              [
                '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
                '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5',
              ],
              [
                'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
                'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87',
              ],
              [
                '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
                '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b',
              ],
              [
                'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
                '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc',
              ],
              [
                '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
                '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c',
              ],
              [
                'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
                'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f',
              ],
              [
                'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
                '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a',
              ],
              [
                'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
                'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46',
              ],
              [
                '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
                'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f',
              ],
              [
                '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
                '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03',
              ],
              [
                '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
                'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08',
              ],
              [
                '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
                '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8',
              ],
              [
                '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
                '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373',
              ],
              [
                '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
                'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3',
              ],
              [
                '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
                '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8',
              ],
              [
                '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
                '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1',
              ],
              [
                '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
                '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9',
              ],
            ],
          },
        };
      },
      {},
    ],
    39: [
      function (t, e, r) {
        'use strict';
        var n = r,
          i = t('bn.js'),
          o = t('minimalistic-assert'),
          a = t('minimalistic-crypto-utils');
        (n.assert = o),
          (n.toArray = a.toArray),
          (n.zero2 = a.zero2),
          (n.toHex = a.toHex),
          (n.encode = a.encode),
          (n.getNAF = function (t, e, r) {
            var n = new Array(Math.max(t.bitLength(), r) + 1);
            n.fill(0);
            for (var i = 1 << (e + 1), o = t.clone(), a = 0; a < n.length; a++) {
              var s,
                f = o.andln(i - 1);
              o.isOdd() ? ((s = f > (i >> 1) - 1 ? (i >> 1) - f : f), o.isubn(s)) : (s = 0), (n[a] = s), o.iushrn(1);
            }
            return n;
          }),
          (n.getJSF = function (t, e) {
            var r = [[], []];
            (t = t.clone()), (e = e.clone());
            for (var n, i = 0, o = 0; t.cmpn(-i) > 0 || e.cmpn(-o) > 0; ) {
              var a,
                s,
                f = (t.andln(3) + i) & 3,
                u = (e.andln(3) + o) & 3;
              3 === f && (f = -1),
                3 === u && (u = -1),
                (a = 0 == (1 & f) ? 0 : (3 !== (n = (t.andln(7) + i) & 7) && 5 !== n) || 2 !== u ? f : -f),
                r[0].push(a),
                (s = 0 == (1 & u) ? 0 : (3 !== (n = (e.andln(7) + o) & 7) && 5 !== n) || 2 !== f ? u : -u),
                r[1].push(s),
                2 * i === a + 1 && (i = 1 - i),
                2 * o === s + 1 && (o = 1 - o),
                t.iushrn(1),
                e.iushrn(1);
            }
            return r;
          }),
          (n.cachedProperty = function (t, e, r) {
            var n = '_' + e;
            t.prototype[e] = function () {
              return void 0 !== this[n] ? this[n] : (this[n] = r.call(this));
            };
          }),
          (n.parseBytes = function (t) {
            return 'string' == typeof t ? n.toArray(t, 'hex') : t;
          }),
          (n.intFromLE = function (t) {
            return new i(t, 'hex', 'le');
          });
      },
      { 'bn.js': 15, 'minimalistic-assert': 92, 'minimalistic-crypto-utils': 93 },
    ],
    40: [
      function (t, e, r) {
        e.exports = {
          name: 'elliptic',
          version: '6.5.4',
          description: 'EC cryptography',
          main: 'lib/elliptic.js',
          files: ['lib'],
          scripts: {
            lint: 'eslint lib test',
            'lint:fix': 'npm run lint -- --fix',
            unit: 'istanbul test _mocha --reporter=spec test/index.js',
            test: 'npm run lint && npm run unit',
            version: 'grunt dist && git add dist/',
          },
          repository: { type: 'git', url: 'git@github.com:indutny/elliptic' },
          keywords: ['EC', 'Elliptic', 'curve', 'Cryptography'],
          author: 'Fedor Indutny <fedor@indutny.com>',
          license: 'MIT',
          bugs: { url: 'https://github.com/indutny/elliptic/issues' },
          homepage: 'https://github.com/indutny/elliptic',
          devDependencies: {
            brfs: '^2.0.2',
            coveralls: '^3.1.0',
            eslint: '^7.6.0',
            grunt: '^1.2.1',
            'grunt-browserify': '^5.3.0',
            'grunt-cli': '^1.3.2',
            'grunt-contrib-connect': '^3.0.0',
            'grunt-contrib-copy': '^1.0.0',
            'grunt-contrib-uglify': '^5.0.0',
            'grunt-mocha-istanbul': '^5.0.2',
            'grunt-saucelabs': '^9.0.1',
            istanbul: '^0.4.5',
            mocha: '^8.0.1',
          },
          dependencies: {
            'bn.js': '^4.11.9',
            brorand: '^1.1.0',
            'hash.js': '^1.0.0',
            'hmac-drbg': '^1.0.1',
            inherits: '^2.0.4',
            'minimalistic-assert': '^1.0.1',
            'minimalistic-crypto-utils': '^1.0.1',
          },
        };
      },
      {},
    ],
    41: [
      function (t, e, r) {
        (function (r) {
          var n = t('once'),
            i = function () {},
            o = function (t, e, a) {
              if ('function' == typeof e) return o(t, null, e);
              e || (e = {}), (a = n(a || i));
              var s = t._writableState,
                f = t._readableState,
                u = e.readable || (!1 !== e.readable && t.readable),
                c = e.writable || (!1 !== e.writable && t.writable),
                h = !1,
                d = function () {
                  t.writable || l();
                },
                l = function () {
                  (c = !1), u || a.call(t);
                },
                p = function () {
                  (u = !1), c || a.call(t);
                },
                b = function (e) {
                  a.call(t, e ? new Error('exited with error code: ' + e) : null);
                },
                m = function (e) {
                  a.call(t, e);
                },
                v = function () {
                  r.nextTick(g);
                },
                g = function () {
                  if (!h)
                    return (!u || (f && f.ended && !f.destroyed)) && (!c || (s && s.ended && !s.destroyed))
                      ? void 0
                      : a.call(t, new Error('premature close'));
                },
                y = function () {
                  t.req.on('finish', l);
                };
              return (
                !(function (t) {
                  return t.setHeader && 'function' == typeof t.abort;
                })(t)
                  ? c && !s && (t.on('end', d), t.on('close', d))
                  : (t.on('complete', l), t.on('abort', v), t.req ? y() : t.on('request', y)),
                (function (t) {
                  return t.stdio && Array.isArray(t.stdio) && 3 === t.stdio.length;
                })(t) && t.on('exit', b),
                t.on('end', p),
                t.on('finish', l),
                !1 !== e.error && t.on('error', m),
                t.on('close', v),
                function () {
                  (h = !0),
                    t.removeListener('complete', l),
                    t.removeListener('abort', v),
                    t.removeListener('request', y),
                    t.req && t.req.removeListener('finish', l),
                    t.removeListener('end', d),
                    t.removeListener('close', d),
                    t.removeListener('finish', l),
                    t.removeListener('exit', b),
                    t.removeListener('end', p),
                    t.removeListener('error', m),
                    t.removeListener('close', v);
                }
              );
            };
          e.exports = o;
        }.call(this, t('_process')));
      },
      { _process: 97, once: 96 },
    ],
    42: [
      function (t, e, r) {
        (function (t) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.createHashFunction = function (e) {
              return function (r) {
                var n = e();
                return n.update(r), t.from(n.digest());
              };
            });
        }.call(this, t('buffer').Buffer));
      },
      { buffer: 18 },
    ],
    43: [
      function (t, e, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        var n = t('./hash-utils'),
          i = t('keccak');
        (r.keccak224 = n.createHashFunction(function () {
          return i('keccak224');
        })),
          (r.keccak256 = n.createHashFunction(function () {
            return i('keccak256');
          })),
          (r.keccak384 = n.createHashFunction(function () {
            return i('keccak384');
          })),
          (r.keccak512 = n.createHashFunction(function () {
            return i('keccak512');
          }));
      },
      { './hash-utils': 42, keccak: 84 },
    ],
    44: [
      function (t, e, r) {
        e.exports = t('./lib')(t('./lib/elliptic'));
      },
      { './lib': 46, './lib/elliptic': 45 },
    ],
    45: [
      function (t, e, r) {
        const n = new (0, t('elliptic').ec)('secp256k1'),
          i = n.curve,
          o = i.n.constructor;
        function a(t) {
          const e = t[0];
          switch (e) {
            case 2:
            case 3:
              return 33 !== t.length
                ? null
                : (function (t, e) {
                    let r = new o(e);
                    if (r.cmp(i.p) >= 0) return null;
                    r = r.toRed(i.red);
                    let a = r.redSqr().redIMul(r).redIAdd(i.b).redSqrt();
                    return (3 === t) !== a.isOdd() && (a = a.redNeg()), n.keyPair({ pub: { x: r, y: a } });
                  })(e, t.subarray(1, 33));
            case 4:
            case 6:
            case 7:
              return 65 !== t.length
                ? null
                : (function (t, e, r) {
                    let a = new o(e),
                      s = new o(r);
                    if (a.cmp(i.p) >= 0 || s.cmp(i.p) >= 0) return null;
                    if (((a = a.toRed(i.red)), (s = s.toRed(i.red)), (6 === t || 7 === t) && s.isOdd() !== (7 === t)))
                      return null;
                    const f = a.redSqr().redIMul(a);
                    return s.redSqr().redISub(f.redIAdd(i.b)).isZero() ? n.keyPair({ pub: { x: a, y: s } }) : null;
                  })(e, t.subarray(1, 33), t.subarray(33, 65));
            default:
              return null;
          }
        }
        function s(t, e) {
          const r = e.encode(null, 33 === t.length);
          for (let e = 0; e < t.length; ++e) t[e] = r[e];
        }
        e.exports = {
          contextRandomize: () => 0,
          privateKeyVerify(t) {
            const e = new o(t);
            return e.cmp(i.n) < 0 && !e.isZero() ? 0 : 1;
          },
          privateKeyNegate(t) {
            const e = new o(t),
              r = i.n.sub(e).umod(i.n).toArrayLike(Uint8Array, 'be', 32);
            return t.set(r), 0;
          },
          privateKeyTweakAdd(t, e) {
            const r = new o(e);
            if (r.cmp(i.n) >= 0) return 1;
            if ((r.iadd(new o(t)), r.cmp(i.n) >= 0 && r.isub(i.n), r.isZero())) return 1;
            const n = r.toArrayLike(Uint8Array, 'be', 32);
            return t.set(n), 0;
          },
          privateKeyTweakMul(t, e) {
            let r = new o(e);
            if (r.cmp(i.n) >= 0 || r.isZero()) return 1;
            r.imul(new o(t)), r.cmp(i.n) >= 0 && (r = r.umod(i.n));
            const n = r.toArrayLike(Uint8Array, 'be', 32);
            return t.set(n), 0;
          },
          publicKeyVerify: (t) => (null === a(t) ? 1 : 0),
          publicKeyCreate(t, e) {
            const r = new o(e);
            if (r.cmp(i.n) >= 0 || r.isZero()) return 1;
            return s(t, n.keyFromPrivate(e).getPublic()), 0;
          },
          publicKeyConvert(t, e) {
            const r = a(e);
            if (null === r) return 1;
            return s(t, r.getPublic()), 0;
          },
          publicKeyNegate(t, e) {
            const r = a(e);
            if (null === r) return 1;
            const n = r.getPublic();
            return (n.y = n.y.redNeg()), s(t, n), 0;
          },
          publicKeyCombine(t, e) {
            const r = new Array(e.length);
            for (let t = 0; t < e.length; ++t) if (((r[t] = a(e[t])), null === r[t])) return 1;
            let n = r[0].getPublic();
            for (let t = 1; t < r.length; ++t) n = n.add(r[t].pub);
            return n.isInfinity() ? 2 : (s(t, n), 0);
          },
          publicKeyTweakAdd(t, e, r) {
            const n = a(e);
            if (null === n) return 1;
            if ((r = new o(r)).cmp(i.n) >= 0) return 2;
            const f = n.getPublic().add(i.g.mul(r));
            return f.isInfinity() ? 2 : (s(t, f), 0);
          },
          publicKeyTweakMul(t, e, r) {
            const n = a(e);
            if (null === n) return 1;
            if ((r = new o(r)).cmp(i.n) >= 0 || r.isZero()) return 2;
            return s(t, n.getPublic().mul(r)), 0;
          },
          signatureNormalize(t) {
            const e = new o(t.subarray(0, 32)),
              r = new o(t.subarray(32, 64));
            return e.cmp(i.n) >= 0 || r.cmp(i.n) >= 0
              ? 1
              : (1 === r.cmp(n.nh) && t.set(i.n.sub(r).toArrayLike(Uint8Array, 'be', 32), 32), 0);
          },
          signatureExport(t, e) {
            const r = e.subarray(0, 32),
              n = e.subarray(32, 64);
            if (new o(r).cmp(i.n) >= 0) return 1;
            if (new o(n).cmp(i.n) >= 0) return 1;
            const { output: a } = t;
            let s = a.subarray(4, 37);
            (s[0] = 0), s.set(r, 1);
            let f = 33,
              u = 0;
            for (; f > 1 && 0 === s[u] && !(128 & s[u + 1]); --f, ++u);
            if (((s = s.subarray(u)), 128 & s[0])) return 1;
            if (f > 1 && 0 === s[0] && !(128 & s[1])) return 1;
            let c = a.subarray(39, 72);
            (c[0] = 0), c.set(n, 1);
            let h = 33,
              d = 0;
            for (; h > 1 && 0 === c[d] && !(128 & c[d + 1]); --h, ++d);
            return (
              (c = c.subarray(d)),
              128 & c[0] || (h > 1 && 0 === c[0] && !(128 & c[1]))
                ? 1
                : ((t.outputlen = 6 + f + h),
                  (a[0] = 48),
                  (a[1] = t.outputlen - 2),
                  (a[2] = 2),
                  (a[3] = s.length),
                  a.set(s, 4),
                  (a[4 + f] = 2),
                  (a[5 + f] = c.length),
                  a.set(c, 6 + f),
                  0)
            );
          },
          signatureImport(t, e) {
            if (e.length < 8) return 1;
            if (e.length > 72) return 1;
            if (48 !== e[0]) return 1;
            if (e[1] !== e.length - 2) return 1;
            if (2 !== e[2]) return 1;
            const r = e[3];
            if (0 === r) return 1;
            if (5 + r >= e.length) return 1;
            if (2 !== e[4 + r]) return 1;
            const n = e[5 + r];
            if (0 === n) return 1;
            if (6 + r + n !== e.length) return 1;
            if (128 & e[4]) return 1;
            if (r > 1 && 0 === e[4] && !(128 & e[5])) return 1;
            if (128 & e[r + 6]) return 1;
            if (n > 1 && 0 === e[r + 6] && !(128 & e[r + 7])) return 1;
            let a = e.subarray(4, 4 + r);
            if ((33 === a.length && 0 === a[0] && (a = a.subarray(1)), a.length > 32)) return 1;
            let s = e.subarray(6 + r);
            if ((33 === s.length && 0 === s[0] && (s = s.slice(1)), s.length > 32))
              throw new Error('S length is too long');
            let f = new o(a);
            f.cmp(i.n) >= 0 && (f = new o(0));
            let u = new o(e.subarray(6 + r));
            return (
              u.cmp(i.n) >= 0 && (u = new o(0)),
              t.set(f.toArrayLike(Uint8Array, 'be', 32), 0),
              t.set(u.toArrayLike(Uint8Array, 'be', 32), 32),
              0
            );
          },
          ecdsaSign(t, e, r, a, s) {
            if (s) {
              const t = s;
              s = (n) => {
                const i = t(e, r, null, a, n);
                if (!(i instanceof Uint8Array && 32 === i.length)) throw new Error('This is the way');
                return new o(i);
              };
            }
            const f = new o(r);
            if (f.cmp(i.n) >= 0 || f.isZero()) return 1;
            let u;
            try {
              u = n.sign(e, r, { canonical: !0, k: s, pers: a });
            } catch (t) {
              return 1;
            }
            return (
              t.signature.set(u.r.toArrayLike(Uint8Array, 'be', 32), 0),
              t.signature.set(u.s.toArrayLike(Uint8Array, 'be', 32), 32),
              (t.recid = u.recoveryParam),
              0
            );
          },
          ecdsaVerify(t, e, r) {
            const s = { r: t.subarray(0, 32), s: t.subarray(32, 64) },
              f = new o(s.r),
              u = new o(s.s);
            if (f.cmp(i.n) >= 0 || u.cmp(i.n) >= 0) return 1;
            if (1 === u.cmp(n.nh) || f.isZero() || u.isZero()) return 3;
            const c = a(r);
            if (null === c) return 2;
            const h = c.getPublic();
            return n.verify(e, s, h) ? 0 : 3;
          },
          ecdsaRecover(t, e, r, a) {
            const f = { r: e.slice(0, 32), s: e.slice(32, 64) },
              u = new o(f.r),
              c = new o(f.s);
            if (u.cmp(i.n) >= 0 || c.cmp(i.n) >= 0) return 1;
            if (u.isZero() || c.isZero()) return 2;
            let h;
            try {
              h = n.recoverPubKey(a, f, r);
            } catch (t) {
              return 2;
            }
            return s(t, h), 0;
          },
          ecdh(t, e, r, s, f, u, c) {
            const h = a(e);
            if (null === h) return 1;
            const d = new o(r);
            if (d.cmp(i.n) >= 0 || d.isZero()) return 2;
            const l = h.getPublic().mul(d);
            if (void 0 === f) {
              const e = l.encode(null, !0),
                r = n.hash().update(e).digest();
              for (let e = 0; e < 32; ++e) t[e] = r[e];
            } else {
              u || (u = new Uint8Array(32));
              const e = l.getX().toArray('be', 32);
              for (let t = 0; t < 32; ++t) u[t] = e[t];
              c || (c = new Uint8Array(32));
              const r = l.getY().toArray('be', 32);
              for (let t = 0; t < 32; ++t) c[t] = r[t];
              const n = f(u, c, s);
              if (!(n instanceof Uint8Array && n.length === t.length)) return 2;
              t.set(n);
            }
            return 0;
          },
        };
      },
      { elliptic: 25 },
    ],
    46: [
      function (t, e, r) {
        const n = 'Impossible case. Please create issue.',
          i = 'The tweak was out of range or the resulted private key is invalid',
          o = 'The tweak was out of range or equal to zero',
          a = 'Unknow error on context randomization',
          s = 'Private Key is invalid',
          f = 'Public Key could not be parsed',
          u = 'Public Key serialization error',
          c = 'The sum of the public keys is not valid',
          h = 'Signature could not be parsed',
          d = 'The nonce generation function failed, or the private key was invalid',
          l = 'Public key could not be recover',
          p = 'Scalar was invalid (zero or overflow)';
        function b(t, e) {
          if (!t) throw new Error(e);
        }
        function m(t, e, r) {
          if ((b(e instanceof Uint8Array, `Expected ${t} to be an Uint8Array`), void 0 !== r))
            if (Array.isArray(r)) {
              const n = `Expected ${t} to be an Uint8Array with length [${r.join(', ')}]`;
              b(r.includes(e.length), n);
            } else {
              const n = `Expected ${t} to be an Uint8Array with length ${r}`;
              b(e.length === r, n);
            }
        }
        function v(t) {
          b('Boolean' === y(t), 'Expected compressed to be a Boolean');
        }
        function g(t = (t) => new Uint8Array(t), e) {
          return 'function' == typeof t && (t = t(e)), m('output', t, e), t;
        }
        function y(t) {
          return Object.prototype.toString.call(t).slice(8, -1);
        }
        e.exports = (t) => ({
          contextRandomize(e) {
            switch (
              (b(null === e || e instanceof Uint8Array, 'Expected seed to be an Uint8Array or null'),
              null !== e && m('seed', e, 32),
              t.contextRandomize(e))
            ) {
              case 1:
                throw new Error(a);
            }
          },
          privateKeyVerify: (e) => (m('private key', e, 32), 0 === t.privateKeyVerify(e)),
          privateKeyNegate(e) {
            switch ((m('private key', e, 32), t.privateKeyNegate(e))) {
              case 0:
                return e;
              case 1:
                throw new Error(n);
            }
          },
          privateKeyTweakAdd(e, r) {
            switch ((m('private key', e, 32), m('tweak', r, 32), t.privateKeyTweakAdd(e, r))) {
              case 0:
                return e;
              case 1:
                throw new Error(i);
            }
          },
          privateKeyTweakMul(e, r) {
            switch ((m('private key', e, 32), m('tweak', r, 32), t.privateKeyTweakMul(e, r))) {
              case 0:
                return e;
              case 1:
                throw new Error(o);
            }
          },
          publicKeyVerify: (e) => (m('public key', e, [33, 65]), 0 === t.publicKeyVerify(e)),
          publicKeyCreate(e, r = !0, n) {
            switch ((m('private key', e, 32), v(r), (n = g(n, r ? 33 : 65)), t.publicKeyCreate(n, e))) {
              case 0:
                return n;
              case 1:
                throw new Error(s);
              case 2:
                throw new Error(u);
            }
          },
          publicKeyConvert(e, r = !0, n) {
            switch ((m('public key', e, [33, 65]), v(r), (n = g(n, r ? 33 : 65)), t.publicKeyConvert(n, e))) {
              case 0:
                return n;
              case 1:
                throw new Error(f);
              case 2:
                throw new Error(u);
            }
          },
          publicKeyNegate(e, r = !0, i) {
            switch ((m('public key', e, [33, 65]), v(r), (i = g(i, r ? 33 : 65)), t.publicKeyNegate(i, e))) {
              case 0:
                return i;
              case 1:
                throw new Error(f);
              case 2:
                throw new Error(n);
              case 3:
                throw new Error(u);
            }
          },
          publicKeyCombine(e, r = !0, n) {
            b(Array.isArray(e), 'Expected public keys to be an Array'),
              b(e.length > 0, 'Expected public keys array will have more than zero items');
            for (const t of e) m('public key', t, [33, 65]);
            switch ((v(r), (n = g(n, r ? 33 : 65)), t.publicKeyCombine(n, e))) {
              case 0:
                return n;
              case 1:
                throw new Error(f);
              case 2:
                throw new Error(c);
              case 3:
                throw new Error(u);
            }
          },
          publicKeyTweakAdd(e, r, n = !0, o) {
            switch (
              (m('public key', e, [33, 65]),
              m('tweak', r, 32),
              v(n),
              (o = g(o, n ? 33 : 65)),
              t.publicKeyTweakAdd(o, e, r))
            ) {
              case 0:
                return o;
              case 1:
                throw new Error(f);
              case 2:
                throw new Error(i);
            }
          },
          publicKeyTweakMul(e, r, n = !0, i) {
            switch (
              (m('public key', e, [33, 65]),
              m('tweak', r, 32),
              v(n),
              (i = g(i, n ? 33 : 65)),
              t.publicKeyTweakMul(i, e, r))
            ) {
              case 0:
                return i;
              case 1:
                throw new Error(f);
              case 2:
                throw new Error(o);
            }
          },
          signatureNormalize(e) {
            switch ((m('signature', e, 64), t.signatureNormalize(e))) {
              case 0:
                return e;
              case 1:
                throw new Error(h);
            }
          },
          signatureExport(e, r) {
            m('signature', e, 64);
            const i = { output: (r = g(r, 72)), outputlen: 72 };
            switch (t.signatureExport(i, e)) {
              case 0:
                return r.slice(0, i.outputlen);
              case 1:
                throw new Error(h);
              case 2:
                throw new Error(n);
            }
          },
          signatureImport(e, r) {
            switch ((m('signature', e), (r = g(r, 64)), t.signatureImport(r, e))) {
              case 0:
                return r;
              case 1:
                throw new Error(h);
              case 2:
                throw new Error(n);
            }
          },
          ecdsaSign(e, r, i = {}, o) {
            m('message', e, 32),
              m('private key', r, 32),
              b('Object' === y(i), 'Expected options to be an Object'),
              void 0 !== i.data && m('options.data', i.data),
              void 0 !== i.noncefn && b('Function' === y(i.noncefn), 'Expected options.noncefn to be a Function');
            const a = { signature: (o = g(o, 64)), recid: null };
            switch (t.ecdsaSign(a, e, r, i.data, i.noncefn)) {
              case 0:
                return a;
              case 1:
                throw new Error(d);
              case 2:
                throw new Error(n);
            }
          },
          ecdsaVerify(e, r, n) {
            switch (
              (m('signature', e, 64), m('message', r, 32), m('public key', n, [33, 65]), t.ecdsaVerify(e, r, n))
            ) {
              case 0:
                return !0;
              case 3:
                return !1;
              case 1:
                throw new Error(h);
              case 2:
                throw new Error(f);
            }
          },
          ecdsaRecover(e, r, i, o = !0, a) {
            switch (
              (m('signature', e, 64),
              b('Number' === y(r) && r >= 0 && r <= 3, 'Expected recovery id to be a Number within interval [0, 3]'),
              m('message', i, 32),
              v(o),
              (a = g(a, o ? 33 : 65)),
              t.ecdsaRecover(a, e, r, i))
            ) {
              case 0:
                return a;
              case 1:
                throw new Error(h);
              case 2:
                throw new Error(l);
              case 3:
                throw new Error(n);
            }
          },
          ecdh(e, r, n = {}, i) {
            switch (
              (m('public key', e, [33, 65]),
              m('private key', r, 32),
              b('Object' === y(n), 'Expected options to be an Object'),
              void 0 !== n.data && m('options.data', n.data),
              void 0 !== n.hashfn
                ? (b('Function' === y(n.hashfn), 'Expected options.hashfn to be a Function'),
                  void 0 !== n.xbuf && m('options.xbuf', n.xbuf, 32),
                  void 0 !== n.ybuf && m('options.ybuf', n.ybuf, 32),
                  m('output', i))
                : (i = g(i, 32)),
              t.ecdh(i, e, r, n.data, n.hashfn, n.xbuf, n.ybuf))
            ) {
              case 0:
                return i;
              case 1:
                throw new Error(f);
              case 2:
                throw new Error(p);
            }
          },
        });
      },
      {},
    ],
    47: [
      function (t, e, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 });
        var n = t('randombytes');
        (r.getRandomBytes = function (t) {
          return new Promise(function (e, r) {
            n(t, function (t, n) {
              t ? r(t) : e(n);
            });
          });
        }),
          (r.getRandomBytesSync = function (t) {
            return n(t);
          });
      },
      { randombytes: 102 },
    ],
    48: [
      function (t, e, r) {
        'use strict';
        var n =
            (this && this.__awaiter) ||
            function (t, e, r, n) {
              return new (r || (r = Promise))(function (i, o) {
                function a(t) {
                  try {
                    f(n.next(t));
                  } catch (t) {
                    o(t);
                  }
                }
                function s(t) {
                  try {
                    f(n.throw(t));
                  } catch (t) {
                    o(t);
                  }
                }
                function f(t) {
                  var e;
                  t.done
                    ? i(t.value)
                    : ((e = t.value),
                      e instanceof r
                        ? e
                        : new r(function (t) {
                            t(e);
                          })).then(a, s);
                }
                f((n = n.apply(t, e || [])).next());
              });
            },
          i =
            (this && this.__generator) ||
            function (t, e) {
              var r,
                n,
                i,
                o,
                a = {
                  label: 0,
                  sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (o = { next: s(0), throw: s(1), return: s(2) }),
                'function' == typeof Symbol &&
                  (o[Symbol.iterator] = function () {
                    return this;
                  }),
                o
              );
              function s(o) {
                return function (s) {
                  return (function (o) {
                    if (r) throw new TypeError('Generator is already executing.');
                    for (; a; )
                      try {
                        if (
                          ((r = 1),
                          n &&
                            (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) &&
                            !(i = i.call(n, o[1])).done)
                        )
                          return i;
                        switch (((n = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                          case 0:
                          case 1:
                            i = o;
                            break;
                          case 4:
                            return a.label++, { value: o[1], done: !1 };
                          case 5:
                            a.label++, (n = o[1]), (o = [0]);
                            continue;
                          case 7:
                            (o = a.ops.pop()), a.trys.pop();
                            continue;
                          default:
                            if (!((i = a.trys), (i = i.length > 0 && i[i.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                              a = 0;
                              continue;
                            }
                            if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                              a.label = o[1];
                              break;
                            }
                            if (6 === o[0] && a.label < i[1]) {
                              (a.label = i[1]), (i = o);
                              break;
                            }
                            if (i && a.label < i[2]) {
                              (a.label = i[2]), a.ops.push(o);
                              break;
                            }
                            i[2] && a.ops.pop(), a.trys.pop();
                            continue;
                        }
                        o = e.call(t, a);
                      } catch (t) {
                        (o = [6, t]), (n = 0);
                      } finally {
                        r = i = 0;
                      }
                    if (5 & o[0]) throw o[1];
                    return { value: o[0] ? o[1] : void 0, done: !0 };
                  })([o, s]);
                };
              }
            };
        Object.defineProperty(r, '__esModule', { value: !0 });
        var o = t('secp256k1'),
          a = t('./random');
        (r.createPrivateKey = function () {
          return n(this, void 0, void 0, function () {
            var t;
            return i(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, a.getRandomBytes(32)];
                case 1:
                  return (t = e.sent()), o.privateKeyVerify(t) ? [2, t] : [3, 0];
                case 2:
                  return [2];
              }
            });
          });
        }),
          (r.createPrivateKeySync = function () {
            for (;;) {
              var t = a.getRandomBytesSync(32);
              if (o.privateKeyVerify(t)) return t;
            }
          }),
          (function (t) {
            for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
          })(t('secp256k1'));
      },
      { './random': 47, secp256k1: 44 },
    ],
    49: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(t, n, {
                        enumerable: !0,
                        get: function () {
                          return e[r];
                        },
                      });
                  }
                : function (t, e, r, n) {
                    void 0 === n && (n = r), (t[n] = e[r]);
                  }),
            i =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (t, e) {
                    Object.defineProperty(t, 'default', { enumerable: !0, value: e });
                  }
                : function (t, e) {
                    t.default = e;
                  }),
            o =
              (this && this.__importStar) ||
              function (t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t) for (var r in t) 'default' !== r && Object.hasOwnProperty.call(t, r) && n(e, t, r);
                return i(e, t), e;
              },
            a =
              (this && this.__importDefault) ||
              function (t) {
                return t && t.__esModule ? t : { default: t };
              };
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.isZeroAddress =
              r.zeroAddress =
              r.importPublic =
              r.privateToAddress =
              r.privateToPublic =
              r.publicToAddress =
              r.pubToAddress =
              r.isValidPublic =
              r.isValidPrivate =
              r.generateAddress2 =
              r.generateAddress =
              r.isValidChecksumAddress =
              r.toChecksumAddress =
              r.isValidAddress =
              r.Account =
                void 0);
          const s = a(t('assert')),
            f = a(t('bn.js')),
            u = o(t('rlp')),
            c = t('ethereum-cryptography/secp256k1'),
            h = t('ethjs-util'),
            d = t('./constants'),
            l = t('./bytes'),
            p = t('./hash'),
            b = t('./helpers'),
            m = t('./types');
          class v {
            constructor(t = new f.default(0), e = new f.default(0), r = d.KECCAK256_RLP, n = d.KECCAK256_NULL) {
              (this.nonce = t), (this.balance = e), (this.stateRoot = r), (this.codeHash = n), this._validate();
            }
            static fromAccountData(t) {
              const { nonce: e, balance: r, stateRoot: n, codeHash: i } = t;
              return new v(
                e ? new f.default(l.toBuffer(e)) : void 0,
                r ? new f.default(l.toBuffer(r)) : void 0,
                n ? l.toBuffer(n) : void 0,
                i ? l.toBuffer(i) : void 0
              );
            }
            static fromRlpSerializedAccount(t) {
              const e = u.decode(t);
              if (!Array.isArray(e)) throw new Error('Invalid serialized account input. Must be array');
              return this.fromValuesArray(e);
            }
            static fromValuesArray(t) {
              const [e, r, n, i] = t;
              return new v(new f.default(e), new f.default(r), n, i);
            }
            _validate() {
              if (this.nonce.lt(new f.default(0))) throw new Error('nonce must be greater than zero');
              if (this.balance.lt(new f.default(0))) throw new Error('balance must be greater than zero');
              if (32 !== this.stateRoot.length) throw new Error('stateRoot must have a length of 32');
              if (32 !== this.codeHash.length) throw new Error('codeHash must have a length of 32');
            }
            raw() {
              return [m.bnToRlp(this.nonce), m.bnToRlp(this.balance), this.stateRoot, this.codeHash];
            }
            serialize() {
              return u.encode(this.raw());
            }
            isContract() {
              return !this.codeHash.equals(d.KECCAK256_NULL);
            }
            isEmpty() {
              return this.balance.isZero() && this.nonce.isZero() && this.codeHash.equals(d.KECCAK256_NULL);
            }
          }
          (r.Account = v),
            (r.isValidAddress = function (t) {
              try {
                b.assertIsString(t);
              } catch (t) {
                return !1;
              }
              return /^0x[0-9a-fA-F]{40}$/.test(t);
            }),
            (r.toChecksumAddress = function (t, e) {
              b.assertIsHexString(t);
              const r = h.stripHexPrefix(t).toLowerCase();
              let n = '';
              if (e) {
                n = m.toType(e, m.TypeOutput.BN).toString() + '0x';
              }
              const i = p.keccakFromString(n + r).toString('hex');
              let o = '0x';
              for (let t = 0; t < r.length; t++) parseInt(i[t], 16) >= 8 ? (o += r[t].toUpperCase()) : (o += r[t]);
              return o;
            }),
            (r.isValidChecksumAddress = function (t, e) {
              return r.isValidAddress(t) && r.toChecksumAddress(t, e) === t;
            }),
            (r.generateAddress = function (t, r) {
              b.assertIsBuffer(t), b.assertIsBuffer(r);
              const n = new f.default(r);
              return n.isZero() ? p.rlphash([t, null]).slice(-20) : p.rlphash([t, e.from(n.toArray())]).slice(-20);
            }),
            (r.generateAddress2 = function (t, r, n) {
              b.assertIsBuffer(t),
                b.assertIsBuffer(r),
                b.assertIsBuffer(n),
                s.default(20 === t.length),
                s.default(32 === r.length);
              return p.keccak256(e.concat([e.from('ff', 'hex'), t, r, p.keccak256(n)])).slice(-20);
            }),
            (r.isValidPrivate = function (t) {
              return c.privateKeyVerify(t);
            }),
            (r.isValidPublic = function (t, r = !1) {
              return (
                b.assertIsBuffer(t),
                64 === t.length ? c.publicKeyVerify(e.concat([e.from([4]), t])) : !!r && c.publicKeyVerify(t)
              );
            }),
            (r.pubToAddress = function (t, r = !1) {
              return (
                b.assertIsBuffer(t),
                r && 64 !== t.length && (t = e.from(c.publicKeyConvert(t, !1).slice(1))),
                s.default(64 === t.length),
                p.keccak(t).slice(-20)
              );
            }),
            (r.publicToAddress = r.pubToAddress),
            (r.privateToPublic = function (t) {
              return b.assertIsBuffer(t), e.from(c.publicKeyCreate(t, !1)).slice(1);
            }),
            (r.privateToAddress = function (t) {
              return r.publicToAddress(r.privateToPublic(t));
            }),
            (r.importPublic = function (t) {
              return b.assertIsBuffer(t), 64 !== t.length && (t = e.from(c.publicKeyConvert(t, !1).slice(1))), t;
            }),
            (r.zeroAddress = function () {
              const t = l.zeros(20);
              return l.bufferToHex(t);
            }),
            (r.isZeroAddress = function (t) {
              try {
                b.assertIsString(t);
              } catch (t) {
                return !1;
              }
              return r.zeroAddress() === t;
            });
        }.call(this, t('buffer').Buffer));
      },
      {
        './bytes': 51,
        './constants': 52,
        './hash': 54,
        './helpers': 55,
        './types': 59,
        assert: 13,
        'bn.js': 60,
        buffer: 18,
        'ethereum-cryptography/secp256k1': 48,
        'ethjs-util': 61,
        rlp: 120,
      },
    ],
    50: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(r, '__esModule', { value: !0 }), (r.Address = void 0);
          const i = n(t('assert')),
            o = n(t('bn.js')),
            a = t('./bytes'),
            s = t('./account');
          class f {
            constructor(t) {
              i.default(20 === t.length, 'Invalid address length'), (this.buf = t);
            }
            static zero() {
              return new f(a.zeros(20));
            }
            static fromString(t) {
              return i.default(s.isValidAddress(t), 'Invalid address'), new f(a.toBuffer(t));
            }
            static fromPublicKey(t) {
              i.default(e.isBuffer(t), 'Public key should be Buffer');
              const r = s.pubToAddress(t);
              return new f(r);
            }
            static fromPrivateKey(t) {
              i.default(e.isBuffer(t), 'Private key should be Buffer');
              const r = s.privateToAddress(t);
              return new f(r);
            }
            static generate(t, r) {
              return i.default(o.default.isBN(r)), new f(s.generateAddress(t.buf, r.toArrayLike(e)));
            }
            static generate2(t, r, n) {
              return i.default(e.isBuffer(r)), i.default(e.isBuffer(n)), new f(s.generateAddress2(t.buf, r, n));
            }
            equals(t) {
              return this.buf.equals(t.buf);
            }
            isZero() {
              return this.equals(f.zero());
            }
            isPrecompileOrSystemAddress() {
              const t = new o.default(this.buf),
                e = new o.default(0),
                r = new o.default('ffff', 'hex');
              return t.gte(e) && t.lte(r);
            }
            toString() {
              return '0x' + this.buf.toString('hex');
            }
            toBuffer() {
              return e.from(this.buf);
            }
          }
          r.Address = f;
        }.call(this, t('buffer').Buffer));
      },
      { './account': 49, './bytes': 51, assert: 13, 'bn.js': 60, buffer: 18 },
    ],
    51: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.baToJSON =
              r.addHexPrefix =
              r.toUnsigned =
              r.fromSigned =
              r.bufferToHex =
              r.bufferToInt =
              r.toBuffer =
              r.unpadHexString =
              r.unpadArray =
              r.unpadBuffer =
              r.setLengthRight =
              r.setLengthLeft =
              r.zeros =
                void 0);
          const i = n(t('bn.js')),
            o = t('ethjs-util'),
            a = t('./helpers');
          r.zeros = function (t) {
            return e.allocUnsafe(t).fill(0);
          };
          const s = function (t, e, n) {
            const i = r.zeros(e);
            return n
              ? t.length < e
                ? (t.copy(i), i)
                : t.slice(0, e)
              : t.length < e
              ? (t.copy(i, e - t.length), i)
              : t.slice(-e);
          };
          (r.setLengthLeft = function (t, e) {
            return a.assertIsBuffer(t), s(t, e, !1);
          }),
            (r.setLengthRight = function (t, e) {
              return a.assertIsBuffer(t), s(t, e, !0);
            });
          const f = function (t) {
            let e = t[0];
            for (; t.length > 0 && '0' === e.toString(); ) e = (t = t.slice(1))[0];
            return t;
          };
          (r.unpadBuffer = function (t) {
            return a.assertIsBuffer(t), f(t);
          }),
            (r.unpadArray = function (t) {
              return a.assertIsArray(t), f(t);
            }),
            (r.unpadHexString = function (t) {
              return a.assertIsHexString(t), (t = o.stripHexPrefix(t)), f(t);
            }),
            (r.toBuffer = function (t) {
              if (null == t) return e.allocUnsafe(0);
              if (e.isBuffer(t)) return e.from(t);
              if (Array.isArray(t) || t instanceof Uint8Array) return e.from(t);
              if ('string' == typeof t) {
                if (!o.isHexString(t))
                  throw new Error(
                    'Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ' +
                      t
                  );
                return e.from(o.padToEven(o.stripHexPrefix(t)), 'hex');
              }
              if ('number' == typeof t) return o.intToBuffer(t);
              if (i.default.isBN(t)) return t.toArrayLike(e);
              if (t.toArray) return e.from(t.toArray());
              if (t.toBuffer) return e.from(t.toBuffer());
              throw new Error('invalid type');
            }),
            (r.bufferToInt = function (t) {
              return new i.default(r.toBuffer(t)).toNumber();
            }),
            (r.bufferToHex = function (t) {
              return '0x' + (t = r.toBuffer(t)).toString('hex');
            }),
            (r.fromSigned = function (t) {
              return new i.default(t).fromTwos(256);
            }),
            (r.toUnsigned = function (t) {
              return e.from(t.toTwos(256).toArray());
            }),
            (r.addHexPrefix = function (t) {
              return 'string' != typeof t || o.isHexPrefixed(t) ? t : '0x' + t;
            }),
            (r.baToJSON = function (t) {
              if (e.isBuffer(t)) return '0x' + t.toString('hex');
              if (t instanceof Array) {
                const e = [];
                for (let n = 0; n < t.length; n++) e.push(r.baToJSON(t[n]));
                return e;
              }
            });
        }.call(this, t('buffer').Buffer));
      },
      { './helpers': 55, 'bn.js': 60, buffer: 18, 'ethjs-util': 61 },
    ],
    52: [
      function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.KECCAK256_RLP =
            r.KECCAK256_RLP_S =
            r.KECCAK256_RLP_ARRAY =
            r.KECCAK256_RLP_ARRAY_S =
            r.KECCAK256_NULL =
            r.KECCAK256_NULL_S =
            r.TWO_POW256 =
            r.MAX_INTEGER =
              void 0);
        const i = t('buffer').Buffer,
          o = n(t('bn.js'));
        (r.MAX_INTEGER = new o.default('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)),
          (r.TWO_POW256 = new o.default('10000000000000000000000000000000000000000000000000000000000000000', 16)),
          (r.KECCAK256_NULL_S = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'),
          (r.KECCAK256_NULL = i.from(r.KECCAK256_NULL_S, 'hex')),
          (r.KECCAK256_RLP_ARRAY_S = '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'),
          (r.KECCAK256_RLP_ARRAY = i.from(r.KECCAK256_RLP_ARRAY_S, 'hex')),
          (r.KECCAK256_RLP_S = '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'),
          (r.KECCAK256_RLP = i.from(r.KECCAK256_RLP_S, 'hex'));
      },
      { 'bn.js': 60, buffer: 18 },
    ],
    53: [
      function (t, e, r) {
        'use strict';
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, r, n) {
                  void 0 === n && (n = r),
                    Object.defineProperty(t, n, {
                      enumerable: !0,
                      get: function () {
                        return e[r];
                      },
                    });
                }
              : function (t, e, r, n) {
                  void 0 === n && (n = r), (t[n] = e[r]);
                }),
          i =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (t, e) {
                  Object.defineProperty(t, 'default', { enumerable: !0, value: e });
                }
              : function (t, e) {
                  t.default = e;
                }),
          o =
            (this && this.__importStar) ||
            function (t) {
              if (t && t.__esModule) return t;
              var e = {};
              if (null != t) for (var r in t) 'default' !== r && Object.hasOwnProperty.call(t, r) && n(e, t, r);
              return i(e, t), e;
            },
          a =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
        Object.defineProperty(r, '__esModule', { value: !0 }), (r.rlp = r.BN = void 0);
        const s = a(t('bn.js'));
        r.BN = s.default;
        const f = o(t('rlp'));
        r.rlp = f;
      },
      { 'bn.js': 60, rlp: 120 },
    ],
    54: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(t, n, {
                        enumerable: !0,
                        get: function () {
                          return e[r];
                        },
                      });
                  }
                : function (t, e, r, n) {
                    void 0 === n && (n = r), (t[n] = e[r]);
                  }),
            i =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (t, e) {
                    Object.defineProperty(t, 'default', { enumerable: !0, value: e });
                  }
                : function (t, e) {
                    t.default = e;
                  }),
            o =
              (this && this.__importStar) ||
              function (t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t) for (var r in t) 'default' !== r && Object.hasOwnProperty.call(t, r) && n(e, t, r);
                return i(e, t), e;
              };
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.rlphash =
              r.ripemd160FromArray =
              r.ripemd160FromString =
              r.ripemd160 =
              r.sha256FromArray =
              r.sha256FromString =
              r.sha256 =
              r.keccakFromArray =
              r.keccakFromHexString =
              r.keccakFromString =
              r.keccak256 =
              r.keccak =
                void 0);
          const a = t('ethereum-cryptography/keccak'),
            s = t('create-hash'),
            f = o(t('rlp')),
            u = t('./bytes'),
            c = t('./helpers');
          (r.keccak = function (t, e = 256) {
            switch ((c.assertIsBuffer(t), e)) {
              case 224:
                return a.keccak224(t);
              case 256:
                return a.keccak256(t);
              case 384:
                return a.keccak384(t);
              case 512:
                return a.keccak512(t);
              default:
                throw new Error('Invald algorithm: keccak' + e);
            }
          }),
            (r.keccak256 = function (t) {
              return r.keccak(t);
            }),
            (r.keccakFromString = function (t, n = 256) {
              c.assertIsString(t);
              const i = e.from(t, 'utf8');
              return r.keccak(i, n);
            }),
            (r.keccakFromHexString = function (t, e = 256) {
              return c.assertIsHexString(t), r.keccak(u.toBuffer(t), e);
            }),
            (r.keccakFromArray = function (t, e = 256) {
              return c.assertIsArray(t), r.keccak(u.toBuffer(t), e);
            });
          const h = function (t) {
            return (t = u.toBuffer(t)), s('sha256').update(t).digest();
          };
          (r.sha256 = function (t) {
            return c.assertIsBuffer(t), h(t);
          }),
            (r.sha256FromString = function (t) {
              return c.assertIsString(t), h(t);
            }),
            (r.sha256FromArray = function (t) {
              return c.assertIsArray(t), h(t);
            });
          const d = function (t, e) {
            t = u.toBuffer(t);
            const r = s('rmd160').update(t).digest();
            return !0 === e ? u.setLengthLeft(r, 32) : r;
          };
          (r.ripemd160 = function (t, e) {
            return c.assertIsBuffer(t), d(t, e);
          }),
            (r.ripemd160FromString = function (t, e) {
              return c.assertIsString(t), d(t, e);
            }),
            (r.ripemd160FromArray = function (t, e) {
              return c.assertIsArray(t), d(t, e);
            }),
            (r.rlphash = function (t) {
              return r.keccak(f.encode(t));
            });
        }.call(this, t('buffer').Buffer));
      },
      { './bytes': 51, './helpers': 55, buffer: 18, 'create-hash': 24, 'ethereum-cryptography/keccak': 43, rlp: 120 },
    ],
    55: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.assertIsString = r.assertIsArray = r.assertIsBuffer = r.assertIsHexString = void 0);
          const n = t('ethjs-util');
          (r.assertIsHexString = function (t) {
            if (!n.isHexString(t)) {
              throw new Error('This method only supports 0x-prefixed hex strings but input was: ' + t);
            }
          }),
            (r.assertIsBuffer = function (t) {
              if (!e.isBuffer(t)) {
                throw new Error('This method only supports Buffer but input was: ' + t);
              }
            }),
            (r.assertIsArray = function (t) {
              if (!Array.isArray(t)) {
                throw new Error('This method only supports number arrays but input was: ' + t);
              }
            }),
            (r.assertIsString = function (t) {
              if ('string' != typeof t) {
                throw new Error('This method only supports strings but input was: ' + t);
              }
            });
        }.call(this, { isBuffer: t('../../is-buffer/index.js') }));
      },
      { '../../is-buffer/index.js': 81, 'ethjs-util': 61 },
    ],
    56: [
      function (t, e, r) {
        'use strict';
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, r, n) {
                  void 0 === n && (n = r),
                    Object.defineProperty(t, n, {
                      enumerable: !0,
                      get: function () {
                        return e[r];
                      },
                    });
                }
              : function (t, e, r, n) {
                  void 0 === n && (n = r), (t[n] = e[r]);
                }),
          i =
            (this && this.__exportStar) ||
            function (t, e) {
              for (var r in t) 'default' === r || e.hasOwnProperty(r) || n(e, t, r);
            };
        Object.defineProperty(r, '__esModule', { value: !0 }),
          i(t('./constants'), r),
          i(t('./account'), r),
          i(t('./address'), r),
          i(t('./hash'), r),
          i(t('./signature'), r),
          i(t('./bytes'), r),
          i(t('./object'), r),
          i(t('./externals'), r),
          i(t('./types'), r),
          i(t('ethjs-util'), r);
      },
      {
        './account': 49,
        './address': 50,
        './bytes': 51,
        './constants': 52,
        './externals': 53,
        './hash': 54,
        './object': 57,
        './signature': 58,
        './types': 59,
        'ethjs-util': 61,
      },
    ],
    57: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(t, n, {
                        enumerable: !0,
                        get: function () {
                          return e[r];
                        },
                      });
                  }
                : function (t, e, r, n) {
                    void 0 === n && (n = r), (t[n] = e[r]);
                  }),
            i =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (t, e) {
                    Object.defineProperty(t, 'default', { enumerable: !0, value: e });
                  }
                : function (t, e) {
                    t.default = e;
                  }),
            o =
              (this && this.__importStar) ||
              function (t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t) for (var r in t) 'default' !== r && Object.hasOwnProperty.call(t, r) && n(e, t, r);
                return i(e, t), e;
              },
            a =
              (this && this.__importDefault) ||
              function (t) {
                return t && t.__esModule ? t : { default: t };
              };
          Object.defineProperty(r, '__esModule', { value: !0 }), (r.defineProperties = void 0);
          const s = a(t('assert')),
            f = o(t('ethjs-util')),
            u = o(t('rlp')),
            c = t('./bytes');
          r.defineProperties = function (t, r, n) {
            if (
              ((t.raw = []),
              (t._fields = []),
              (t.toJSON = function (e = !1) {
                if (e) {
                  const e = {};
                  return (
                    t._fields.forEach((r) => {
                      e[r] = '0x' + t[r].toString('hex');
                    }),
                    e
                  );
                }
                return c.baToJSON(t.raw);
              }),
              (t.serialize = function () {
                return u.encode(t.raw);
              }),
              r.forEach((r, n) => {
                function i() {
                  return t.raw[n];
                }
                function o(i) {
                  '00' !== (i = c.toBuffer(i)).toString('hex') || r.allowZero || (i = e.allocUnsafe(0)),
                    r.allowLess && r.length
                      ? ((i = c.unpadBuffer(i)),
                        s.default(r.length >= i.length, `The field ${r.name} must not have more ${r.length} bytes`))
                      : (r.allowZero && 0 === i.length) ||
                        !r.length ||
                        s.default(r.length === i.length, `The field ${r.name} must have byte length of ${r.length}`),
                    (t.raw[n] = i);
                }
                t._fields.push(r.name),
                  Object.defineProperty(t, r.name, { enumerable: !0, configurable: !0, get: i, set: o }),
                  r.default && (t[r.name] = r.default),
                  r.alias && Object.defineProperty(t, r.alias, { enumerable: !1, configurable: !0, set: o, get: i });
              }),
              n)
            )
              if (
                ('string' == typeof n && (n = e.from(f.stripHexPrefix(n), 'hex')),
                e.isBuffer(n) && (n = u.decode(n)),
                Array.isArray(n))
              ) {
                if (n.length > t._fields.length) throw new Error('wrong number of fields in data');
                n.forEach((e, r) => {
                  t[t._fields[r]] = c.toBuffer(e);
                });
              } else {
                if ('object' != typeof n) throw new Error('invalid data');
                {
                  const e = Object.keys(n);
                  r.forEach((r) => {
                    -1 !== e.indexOf(r.name) && (t[r.name] = n[r.name]),
                      -1 !== e.indexOf(r.alias) && (t[r.alias] = n[r.alias]);
                  });
                }
              }
          };
        }.call(this, t('buffer').Buffer));
      },
      { './bytes': 51, assert: 13, buffer: 18, 'ethjs-util': 61, rlp: 120 },
    ],
    58: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.hashPersonalMessage = r.isValidSignature = r.fromRpcSig = r.toRpcSig = r.ecrecover = r.ecsign = void 0);
          const i = t('ethereum-cryptography/secp256k1'),
            o = n(t('bn.js')),
            a = t('./bytes'),
            s = t('./hash'),
            f = t('./helpers'),
            u = t('./types');
          function c(t, e) {
            const r = u.toType(t, u.TypeOutput.BN);
            if (!e) return r.subn(27);
            const n = u.toType(e, u.TypeOutput.BN);
            return r.sub(n.muln(2).addn(35));
          }
          function h(t) {
            const e = new o.default(t);
            return e.eqn(0) || e.eqn(1);
          }
          (r.ecsign = function (t, r, n) {
            const { signature: o, recid: a } = i.ecdsaSign(t, r),
              s = e.from(o.slice(0, 32)),
              f = e.from(o.slice(32, 64));
            if (!n || 'number' == typeof n) {
              if (n && !Number.isSafeInteger(n))
                throw new Error(
                  'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                );
              return { r: s, s: f, v: n ? a + (2 * n + 35) : a + 27 };
            }
            return { r: s, s: f, v: u.toType(n, u.TypeOutput.BN).muln(2).addn(35).addn(a).toArrayLike(e) };
          }),
            (r.ecrecover = function (t, r, n, o, s) {
              const f = e.concat([a.setLengthLeft(n, 32), a.setLengthLeft(o, 32)], 64),
                u = c(r, s);
              if (!h(u)) throw new Error('Invalid signature v value');
              const d = i.ecdsaRecover(f, u.toNumber(), t);
              return e.from(i.publicKeyConvert(d, !1).slice(1));
            }),
            (r.toRpcSig = function (t, r, n, i) {
              if (!h(c(t, i))) throw new Error('Invalid signature v value');
              return a.bufferToHex(e.concat([a.setLengthLeft(r, 32), a.setLengthLeft(n, 32), a.toBuffer(t)]));
            }),
            (r.fromRpcSig = function (t) {
              const e = a.toBuffer(t);
              if (e.length < 65) throw new Error('Invalid signature length');
              let r = a.bufferToInt(e.slice(64));
              return r < 27 && (r += 27), { v: r, r: e.slice(0, 32), s: e.slice(32, 64) };
            }),
            (r.isValidSignature = function (t, e, r, n = !0, i) {
              const a = new o.default('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16),
                s = new o.default('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16);
              if (32 !== e.length || 32 !== r.length) return !1;
              if (!h(c(t, i))) return !1;
              const f = new o.default(e),
                u = new o.default(r);
              return !(f.isZero() || f.gt(s) || u.isZero() || u.gt(s)) && (!n || 1 !== u.cmp(a));
            }),
            (r.hashPersonalMessage = function (t) {
              f.assertIsBuffer(t);
              const r = e.from('Ethereum Signed Message:\n' + t.length.toString(), 'utf-8');
              return s.keccak(e.concat([r, t]));
            });
        }.call(this, t('buffer').Buffer));
      },
      {
        './bytes': 51,
        './hash': 54,
        './helpers': 55,
        './types': 59,
        'bn.js': 60,
        buffer: 18,
        'ethereum-cryptography/secp256k1': 48,
      },
    ],
    59: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.toType = r.TypeOutput = r.bnToRlp = r.bnToHex = void 0);
          const i = n(t('bn.js')),
            o = t('ethjs-util'),
            a = t('./bytes');
          var s;
          (r.bnToHex = function (t) {
            return '0x' + t.toString(16);
          }),
            (r.bnToRlp = function (t) {
              return a.unpadBuffer(t.toArrayLike(e));
            }),
            (function (t) {
              (t[(t.Number = 0)] = 'Number'),
                (t[(t.BN = 1)] = 'BN'),
                (t[(t.Buffer = 2)] = 'Buffer'),
                (t[(t.PrefixedHexString = 3)] = 'PrefixedHexString');
            })((s = r.TypeOutput || (r.TypeOutput = {}))),
            (r.toType = function (t, e) {
              if ('string' == typeof t && !o.isHexString(t))
                throw new Error('A string must be provided with a 0x-prefix, given: ' + t);
              if ('number' == typeof t && !Number.isSafeInteger(t))
                throw new Error(
                  'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                );
              if (((t = a.toBuffer(t)), e === s.Buffer)) return t;
              if (e === s.BN) return new i.default(t);
              if (e === s.Number) {
                const e = new i.default(t),
                  r = new i.default(Number.MAX_SAFE_INTEGER.toString());
                if (e.gt(r))
                  throw new Error(
                    'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
                  );
                return e.toNumber();
              }
              return '0x' + t.toString('hex');
            });
        }.call(this, t('buffer').Buffer));
      },
      { './bytes': 51, 'bn.js': 60, buffer: 18, 'ethjs-util': 61 },
    ],
    60: [
      function (t, e, r) {
        !(function (e, r) {
          'use strict';
          function n(t, e) {
            if (!t) throw new Error(e || 'Assertion failed');
          }
          function i(t, e) {
            t.super_ = e;
            var r = function () {};
            (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
          }
          function o(t, e, r) {
            if (o.isBN(t)) return t;
            (this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== t && (('le' !== e && 'be' !== e) || ((r = e), (e = 10)), this._init(t || 0, e || 10, r || 'be'));
          }
          var a;
          'object' == typeof e ? (e.exports = o) : (r.BN = o), (o.BN = o), (o.wordSize = 26);
          try {
            a = t('buffer').Buffer;
          } catch (t) {}
          function s(t, e, r) {
            for (var i = 0, o = Math.min(t.length, r), a = 0, s = e; s < o; s++) {
              var f,
                u = t.charCodeAt(s) - 48;
              (i <<= 4), (i |= f = u >= 49 && u <= 54 ? u - 49 + 10 : u >= 17 && u <= 22 ? u - 17 + 10 : u), (a |= f);
            }
            return n(!(240 & a), 'Invalid character in ' + t), i;
          }
          function f(t, e, r, i) {
            for (var o = 0, a = 0, s = Math.min(t.length, r), f = e; f < s; f++) {
              var u = t.charCodeAt(f) - 48;
              (o *= i),
                (a = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u),
                n(u >= 0 && a < i, 'Invalid character'),
                (o += a);
            }
            return o;
          }
          function u(t, e) {
            (t.words = e.words), (t.length = e.length), (t.negative = e.negative), (t.red = e.red);
          }
          if (
            ((o.isBN = function (t) {
              return (
                t instanceof o ||
                (null !== t && 'object' == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words))
              );
            }),
            (o.max = function (t, e) {
              return t.cmp(e) > 0 ? t : e;
            }),
            (o.min = function (t, e) {
              return t.cmp(e) < 0 ? t : e;
            }),
            (o.prototype._init = function (t, e, r) {
              if ('number' == typeof t) return this._initNumber(t, e, r);
              if ('object' == typeof t) return this._initArray(t, e, r);
              'hex' === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
              var i = 0;
              '-' === (t = t.toString().replace(/\s+/g, ''))[0] && i++,
                16 === e ? this._parseHex(t, i) : this._parseBase(t, e, i),
                '-' === t[0] && (this.negative = 1),
                this._strip(),
                'le' === r && this._initArray(this.toArray(), e, r);
            }),
            (o.prototype._initNumber = function (t, e, r) {
              t < 0 && ((this.negative = 1), (t = -t)),
                t < 67108864
                  ? ((this.words = [67108863 & t]), (this.length = 1))
                  : t < 4503599627370496
                  ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]), (this.length = 2))
                  : (n(t < 9007199254740992),
                    (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                    (this.length = 3)),
                'le' === r && this._initArray(this.toArray(), e, r);
            }),
            (o.prototype._initArray = function (t, e, r) {
              if ((n('number' == typeof t.length), t.length <= 0)) return (this.words = [0]), (this.length = 1), this;
              (this.length = Math.ceil(t.length / 3)), (this.words = new Array(this.length));
              for (var i = 0; i < this.length; i++) this.words[i] = 0;
              var o,
                a,
                s = 0;
              if ('be' === r)
                for (i = t.length - 1, o = 0; i >= 0; i -= 3)
                  (a = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
                    (this.words[o] |= (a << s) & 67108863),
                    (this.words[o + 1] = (a >>> (26 - s)) & 67108863),
                    (s += 24) >= 26 && ((s -= 26), o++);
              else if ('le' === r)
                for (i = 0, o = 0; i < t.length; i += 3)
                  (a = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
                    (this.words[o] |= (a << s) & 67108863),
                    (this.words[o + 1] = (a >>> (26 - s)) & 67108863),
                    (s += 24) >= 26 && ((s -= 26), o++);
              return this._strip();
            }),
            (o.prototype._parseHex = function (t, e) {
              (this.length = Math.ceil((t.length - e) / 6)), (this.words = new Array(this.length));
              for (var r = 0; r < this.length; r++) this.words[r] = 0;
              var n,
                i,
                o = 0;
              for (r = t.length - 6, n = 0; r >= e; r -= 6)
                (i = s(t, r, r + 6)),
                  (this.words[n] |= (i << o) & 67108863),
                  (this.words[n + 1] |= (i >>> (26 - o)) & 4194303),
                  (o += 24) >= 26 && ((o -= 26), n++);
              r + 6 !== e &&
                ((i = s(t, e, r + 6)),
                (this.words[n] |= (i << o) & 67108863),
                (this.words[n + 1] |= (i >>> (26 - o)) & 4194303)),
                this._strip();
            }),
            (o.prototype._parseBase = function (t, e, r) {
              (this.words = [0]), (this.length = 1);
              for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
              n--, (i = (i / e) | 0);
              for (var o = t.length - r, a = o % n, s = Math.min(o, o - a) + r, u = 0, c = r; c < s; c += n)
                (u = f(t, c, c + n, e)),
                  this.imuln(i),
                  this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              if (0 !== a) {
                var h = 1;
                for (u = f(t, c, t.length, e), c = 0; c < a; c++) h *= e;
                this.imuln(h), this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              }
            }),
            (o.prototype.copy = function (t) {
              t.words = new Array(this.length);
              for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
              (t.length = this.length), (t.negative = this.negative), (t.red = this.red);
            }),
            (o.prototype._move = function (t) {
              u(t, this);
            }),
            (o.prototype.clone = function () {
              var t = new o(null);
              return this.copy(t), t;
            }),
            (o.prototype._expand = function (t) {
              for (; this.length < t; ) this.words[this.length++] = 0;
              return this;
            }),
            (o.prototype._strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
              return this._normSign();
            }),
            (o.prototype._normSign = function () {
              return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
            }),
            'undefined' != typeof Symbol && 'function' == typeof Symbol.for)
          )
            try {
              o.prototype[Symbol.for('nodejs.util.inspect.custom')] = c;
            } catch (t) {
              o.prototype.inspect = c;
            }
          else o.prototype.inspect = c;
          function c() {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
          }
          var h = [
              '',
              '0',
              '00',
              '000',
              '0000',
              '00000',
              '000000',
              '0000000',
              '00000000',
              '000000000',
              '0000000000',
              '00000000000',
              '000000000000',
              '0000000000000',
              '00000000000000',
              '000000000000000',
              '0000000000000000',
              '00000000000000000',
              '000000000000000000',
              '0000000000000000000',
              '00000000000000000000',
              '000000000000000000000',
              '0000000000000000000000',
              '00000000000000000000000',
              '000000000000000000000000',
              '0000000000000000000000000',
            ],
            d = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
              5, 5, 5,
            ],
            l = [
              0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171,
              35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632,
              6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393,
              45435424, 52521875, 60466176,
            ];
          (o.prototype.toString = function (t, e) {
            var r;
            if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
              r = '';
              for (var i = 0, o = 0, a = 0; a < this.length; a++) {
                var s = this.words[a],
                  f = (16777215 & ((s << i) | o)).toString(16);
                (r =
                  0 !== (o = (s >>> (24 - i)) & 16777215) || a !== this.length - 1 ? h[6 - f.length] + f + r : f + r),
                  (i += 2) >= 26 && ((i -= 26), a--);
              }
              for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            if (t === (0 | t) && t >= 2 && t <= 36) {
              var u = d[t],
                c = l[t];
              r = '';
              var p = this.clone();
              for (p.negative = 0; !p.isZero(); ) {
                var b = p.modrn(c).toString(t);
                r = (p = p.idivn(c)).isZero() ? b + r : h[u - b.length] + b + r;
              }
              for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            n(!1, 'Base should be between 2 and 36');
          }),
            (o.prototype.toNumber = function () {
              var t = this.words[0];
              return (
                2 === this.length
                  ? (t += 67108864 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                  ? (t += 4503599627370496 + 67108864 * this.words[1])
                  : this.length > 2 && n(!1, 'Number can only safely store up to 53 bits'),
                0 !== this.negative ? -t : t
              );
            }),
            (o.prototype.toJSON = function () {
              return this.toString(16, 2);
            }),
            a &&
              (o.prototype.toBuffer = function (t, e) {
                return this.toArrayLike(a, t, e);
              }),
            (o.prototype.toArray = function (t, e) {
              return this.toArrayLike(Array, t, e);
            });
          function p(t, e, r) {
            r.negative = e.negative ^ t.negative;
            var n = (t.length + e.length) | 0;
            (r.length = n), (n = (n - 1) | 0);
            var i = 0 | t.words[0],
              o = 0 | e.words[0],
              a = i * o,
              s = 67108863 & a,
              f = (a / 67108864) | 0;
            r.words[0] = s;
            for (var u = 1; u < n; u++) {
              for (
                var c = f >>> 26, h = 67108863 & f, d = Math.min(u, e.length - 1), l = Math.max(0, u - t.length + 1);
                l <= d;
                l++
              ) {
                var p = (u - l) | 0;
                (c += ((a = (i = 0 | t.words[p]) * (o = 0 | e.words[l]) + h) / 67108864) | 0), (h = 67108863 & a);
              }
              (r.words[u] = 0 | h), (f = 0 | c);
            }
            return 0 !== f ? (r.words[u] = 0 | f) : r.length--, r._strip();
          }
          (o.prototype.toArrayLike = function (t, e, r) {
            this._strip();
            var i = this.byteLength(),
              o = r || Math.max(1, i);
            n(i <= o, 'byte array longer than desired length'), n(o > 0, 'Requested array length <= 0');
            var a = (function (t, e) {
              return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
            })(t, o);
            return this['_toArrayLike' + ('le' === e ? 'LE' : 'BE')](a, i), a;
          }),
            (o.prototype._toArrayLikeLE = function (t, e) {
              for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
                var a = (this.words[i] << o) | n;
                (t[r++] = 255 & a),
                  r < t.length && (t[r++] = (a >> 8) & 255),
                  r < t.length && (t[r++] = (a >> 16) & 255),
                  6 === o ? (r < t.length && (t[r++] = (a >> 24) & 255), (n = 0), (o = 0)) : ((n = a >>> 24), (o += 2));
              }
              if (r < t.length) for (t[r++] = n; r < t.length; ) t[r++] = 0;
            }),
            (o.prototype._toArrayLikeBE = function (t, e) {
              for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
                var a = (this.words[i] << o) | n;
                (t[r--] = 255 & a),
                  r >= 0 && (t[r--] = (a >> 8) & 255),
                  r >= 0 && (t[r--] = (a >> 16) & 255),
                  6 === o ? (r >= 0 && (t[r--] = (a >> 24) & 255), (n = 0), (o = 0)) : ((n = a >>> 24), (o += 2));
              }
              if (r >= 0) for (t[r--] = n; r >= 0; ) t[r--] = 0;
            }),
            Math.clz32
              ? (o.prototype._countBits = function (t) {
                  return 32 - Math.clz32(t);
                })
              : (o.prototype._countBits = function (t) {
                  var e = t,
                    r = 0;
                  return (
                    e >= 4096 && ((r += 13), (e >>>= 13)),
                    e >= 64 && ((r += 7), (e >>>= 7)),
                    e >= 8 && ((r += 4), (e >>>= 4)),
                    e >= 2 && ((r += 2), (e >>>= 2)),
                    r + e
                  );
                }),
            (o.prototype._zeroBits = function (t) {
              if (0 === t) return 26;
              var e = t,
                r = 0;
              return (
                0 == (8191 & e) && ((r += 13), (e >>>= 13)),
                0 == (127 & e) && ((r += 7), (e >>>= 7)),
                0 == (15 & e) && ((r += 4), (e >>>= 4)),
                0 == (3 & e) && ((r += 2), (e >>>= 2)),
                0 == (1 & e) && r++,
                r
              );
            }),
            (o.prototype.bitLength = function () {
              var t = this.words[this.length - 1],
                e = this._countBits(t);
              return 26 * (this.length - 1) + e;
            }),
            (o.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var t = 0, e = 0; e < this.length; e++) {
                var r = this._zeroBits(this.words[e]);
                if (((t += r), 26 !== r)) break;
              }
              return t;
            }),
            (o.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (o.prototype.toTwos = function (t) {
              return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone();
            }),
            (o.prototype.fromTwos = function (t) {
              return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
            }),
            (o.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (o.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (o.prototype.ineg = function () {
              return this.isZero() || (this.negative ^= 1), this;
            }),
            (o.prototype.iuor = function (t) {
              for (; this.length < t.length; ) this.words[this.length++] = 0;
              for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
              return this._strip();
            }),
            (o.prototype.ior = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuor(t);
            }),
            (o.prototype.or = function (t) {
              return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this);
            }),
            (o.prototype.uor = function (t) {
              return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this);
            }),
            (o.prototype.iuand = function (t) {
              var e;
              e = this.length > t.length ? t : this;
              for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
              return (this.length = e.length), this._strip();
            }),
            (o.prototype.iand = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuand(t);
            }),
            (o.prototype.and = function (t) {
              return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this);
            }),
            (o.prototype.uand = function (t) {
              return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this);
            }),
            (o.prototype.iuxor = function (t) {
              var e, r;
              this.length > t.length ? ((e = this), (r = t)) : ((e = t), (r = this));
              for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
              if (this !== e) for (; n < e.length; n++) this.words[n] = e.words[n];
              return (this.length = e.length), this._strip();
            }),
            (o.prototype.ixor = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuxor(t);
            }),
            (o.prototype.xor = function (t) {
              return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this);
            }),
            (o.prototype.uxor = function (t) {
              return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this);
            }),
            (o.prototype.inotn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = 0 | Math.ceil(t / 26),
                r = t % 26;
              this._expand(e), r > 0 && e--;
              for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
              return r > 0 && (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))), this._strip();
            }),
            (o.prototype.notn = function (t) {
              return this.clone().inotn(t);
            }),
            (o.prototype.setn = function (t, e) {
              n('number' == typeof t && t >= 0);
              var r = (t / 26) | 0,
                i = t % 26;
              return (
                this._expand(r + 1),
                (this.words[r] = e ? this.words[r] | (1 << i) : this.words[r] & ~(1 << i)),
                this._strip()
              );
            }),
            (o.prototype.iadd = function (t) {
              var e, r, n;
              if (0 !== this.negative && 0 === t.negative)
                return (this.negative = 0), (e = this.isub(t)), (this.negative ^= 1), this._normSign();
              if (0 === this.negative && 0 !== t.negative)
                return (t.negative = 0), (e = this.isub(t)), (t.negative = 1), e._normSign();
              this.length > t.length ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var i = 0, o = 0; o < n.length; o++)
                (e = (0 | r.words[o]) + (0 | n.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              for (; 0 !== i && o < r.length; o++)
                (e = (0 | r.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              if (((this.length = r.length), 0 !== i)) (this.words[this.length] = i), this.length++;
              else if (r !== this) for (; o < r.length; o++) this.words[o] = r.words[o];
              return this;
            }),
            (o.prototype.add = function (t) {
              var e;
              return 0 !== t.negative && 0 === this.negative
                ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                : 0 === t.negative && 0 !== this.negative
                ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
                : this.length > t.length
                ? this.clone().iadd(t)
                : t.clone().iadd(this);
            }),
            (o.prototype.isub = function (t) {
              if (0 !== t.negative) {
                t.negative = 0;
                var e = this.iadd(t);
                return (t.negative = 1), e._normSign();
              }
              if (0 !== this.negative) return (this.negative = 0), this.iadd(t), (this.negative = 1), this._normSign();
              var r,
                n,
                i = this.cmp(t);
              if (0 === i) return (this.negative = 0), (this.length = 1), (this.words[0] = 0), this;
              i > 0 ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var o = 0, a = 0; a < n.length; a++)
                (o = (e = (0 | r.words[a]) - (0 | n.words[a]) + o) >> 26), (this.words[a] = 67108863 & e);
              for (; 0 !== o && a < r.length; a++)
                (o = (e = (0 | r.words[a]) + o) >> 26), (this.words[a] = 67108863 & e);
              if (0 === o && a < r.length && r !== this) for (; a < r.length; a++) this.words[a] = r.words[a];
              return (this.length = Math.max(this.length, a)), r !== this && (this.negative = 1), this._strip();
            }),
            (o.prototype.sub = function (t) {
              return this.clone().isub(t);
            });
          var b = function (t, e, r) {
            var n,
              i,
              o,
              a = t.words,
              s = e.words,
              f = r.words,
              u = 0,
              c = 0 | a[0],
              h = 8191 & c,
              d = c >>> 13,
              l = 0 | a[1],
              p = 8191 & l,
              b = l >>> 13,
              m = 0 | a[2],
              v = 8191 & m,
              g = m >>> 13,
              y = 0 | a[3],
              w = 8191 & y,
              _ = y >>> 13,
              M = 0 | a[4],
              x = 8191 & M,
              S = M >>> 13,
              A = 0 | a[5],
              E = 8191 & A,
              k = A >>> 13,
              I = 0 | a[6],
              T = 8191 & I,
              R = I >>> 13,
              j = 0 | a[7],
              O = 8191 & j,
              B = j >>> 13,
              L = 0 | a[8],
              P = 8191 & L,
              N = L >>> 13,
              C = 0 | a[9],
              z = 8191 & C,
              q = C >>> 13,
              U = 0 | s[0],
              F = 8191 & U,
              D = U >>> 13,
              K = 0 | s[1],
              H = 8191 & K,
              W = K >>> 13,
              Z = 0 | s[2],
              V = 8191 & Z,
              $ = Z >>> 13,
              Y = 0 | s[3],
              G = 8191 & Y,
              J = Y >>> 13,
              X = 0 | s[4],
              Q = 8191 & X,
              tt = X >>> 13,
              et = 0 | s[5],
              rt = 8191 & et,
              nt = et >>> 13,
              it = 0 | s[6],
              ot = 8191 & it,
              at = it >>> 13,
              st = 0 | s[7],
              ft = 8191 & st,
              ut = st >>> 13,
              ct = 0 | s[8],
              ht = 8191 & ct,
              dt = ct >>> 13,
              lt = 0 | s[9],
              pt = 8191 & lt,
              bt = lt >>> 13;
            (r.negative = t.negative ^ e.negative), (r.length = 19);
            var mt =
              (((u + (n = Math.imul(h, F))) | 0) +
                ((8191 & (i = ((i = Math.imul(h, D)) + Math.imul(d, F)) | 0)) << 13)) |
              0;
            (u = ((((o = Math.imul(d, D)) + (i >>> 13)) | 0) + (mt >>> 26)) | 0),
              (mt &= 67108863),
              (n = Math.imul(p, F)),
              (i = ((i = Math.imul(p, D)) + Math.imul(b, F)) | 0),
              (o = Math.imul(b, D));
            var vt =
              (((u + (n = (n + Math.imul(h, H)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, W)) | 0) + Math.imul(d, H)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, W)) | 0) + (i >>> 13)) | 0) + (vt >>> 26)) | 0),
              (vt &= 67108863),
              (n = Math.imul(v, F)),
              (i = ((i = Math.imul(v, D)) + Math.imul(g, F)) | 0),
              (o = Math.imul(g, D)),
              (n = (n + Math.imul(p, H)) | 0),
              (i = ((i = (i + Math.imul(p, W)) | 0) + Math.imul(b, H)) | 0),
              (o = (o + Math.imul(b, W)) | 0);
            var gt =
              (((u + (n = (n + Math.imul(h, V)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, $)) | 0) + Math.imul(d, V)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, $)) | 0) + (i >>> 13)) | 0) + (gt >>> 26)) | 0),
              (gt &= 67108863),
              (n = Math.imul(w, F)),
              (i = ((i = Math.imul(w, D)) + Math.imul(_, F)) | 0),
              (o = Math.imul(_, D)),
              (n = (n + Math.imul(v, H)) | 0),
              (i = ((i = (i + Math.imul(v, W)) | 0) + Math.imul(g, H)) | 0),
              (o = (o + Math.imul(g, W)) | 0),
              (n = (n + Math.imul(p, V)) | 0),
              (i = ((i = (i + Math.imul(p, $)) | 0) + Math.imul(b, V)) | 0),
              (o = (o + Math.imul(b, $)) | 0);
            var yt =
              (((u + (n = (n + Math.imul(h, G)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, J)) | 0) + Math.imul(d, G)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, J)) | 0) + (i >>> 13)) | 0) + (yt >>> 26)) | 0),
              (yt &= 67108863),
              (n = Math.imul(x, F)),
              (i = ((i = Math.imul(x, D)) + Math.imul(S, F)) | 0),
              (o = Math.imul(S, D)),
              (n = (n + Math.imul(w, H)) | 0),
              (i = ((i = (i + Math.imul(w, W)) | 0) + Math.imul(_, H)) | 0),
              (o = (o + Math.imul(_, W)) | 0),
              (n = (n + Math.imul(v, V)) | 0),
              (i = ((i = (i + Math.imul(v, $)) | 0) + Math.imul(g, V)) | 0),
              (o = (o + Math.imul(g, $)) | 0),
              (n = (n + Math.imul(p, G)) | 0),
              (i = ((i = (i + Math.imul(p, J)) | 0) + Math.imul(b, G)) | 0),
              (o = (o + Math.imul(b, J)) | 0);
            var wt =
              (((u + (n = (n + Math.imul(h, Q)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, tt)) | 0) + Math.imul(d, Q)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, tt)) | 0) + (i >>> 13)) | 0) + (wt >>> 26)) | 0),
              (wt &= 67108863),
              (n = Math.imul(E, F)),
              (i = ((i = Math.imul(E, D)) + Math.imul(k, F)) | 0),
              (o = Math.imul(k, D)),
              (n = (n + Math.imul(x, H)) | 0),
              (i = ((i = (i + Math.imul(x, W)) | 0) + Math.imul(S, H)) | 0),
              (o = (o + Math.imul(S, W)) | 0),
              (n = (n + Math.imul(w, V)) | 0),
              (i = ((i = (i + Math.imul(w, $)) | 0) + Math.imul(_, V)) | 0),
              (o = (o + Math.imul(_, $)) | 0),
              (n = (n + Math.imul(v, G)) | 0),
              (i = ((i = (i + Math.imul(v, J)) | 0) + Math.imul(g, G)) | 0),
              (o = (o + Math.imul(g, J)) | 0),
              (n = (n + Math.imul(p, Q)) | 0),
              (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(b, Q)) | 0),
              (o = (o + Math.imul(b, tt)) | 0);
            var _t =
              (((u + (n = (n + Math.imul(h, rt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, nt)) | 0) + Math.imul(d, rt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, nt)) | 0) + (i >>> 13)) | 0) + (_t >>> 26)) | 0),
              (_t &= 67108863),
              (n = Math.imul(T, F)),
              (i = ((i = Math.imul(T, D)) + Math.imul(R, F)) | 0),
              (o = Math.imul(R, D)),
              (n = (n + Math.imul(E, H)) | 0),
              (i = ((i = (i + Math.imul(E, W)) | 0) + Math.imul(k, H)) | 0),
              (o = (o + Math.imul(k, W)) | 0),
              (n = (n + Math.imul(x, V)) | 0),
              (i = ((i = (i + Math.imul(x, $)) | 0) + Math.imul(S, V)) | 0),
              (o = (o + Math.imul(S, $)) | 0),
              (n = (n + Math.imul(w, G)) | 0),
              (i = ((i = (i + Math.imul(w, J)) | 0) + Math.imul(_, G)) | 0),
              (o = (o + Math.imul(_, J)) | 0),
              (n = (n + Math.imul(v, Q)) | 0),
              (i = ((i = (i + Math.imul(v, tt)) | 0) + Math.imul(g, Q)) | 0),
              (o = (o + Math.imul(g, tt)) | 0),
              (n = (n + Math.imul(p, rt)) | 0),
              (i = ((i = (i + Math.imul(p, nt)) | 0) + Math.imul(b, rt)) | 0),
              (o = (o + Math.imul(b, nt)) | 0);
            var Mt =
              (((u + (n = (n + Math.imul(h, ot)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, at)) | 0) + Math.imul(d, ot)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, at)) | 0) + (i >>> 13)) | 0) + (Mt >>> 26)) | 0),
              (Mt &= 67108863),
              (n = Math.imul(O, F)),
              (i = ((i = Math.imul(O, D)) + Math.imul(B, F)) | 0),
              (o = Math.imul(B, D)),
              (n = (n + Math.imul(T, H)) | 0),
              (i = ((i = (i + Math.imul(T, W)) | 0) + Math.imul(R, H)) | 0),
              (o = (o + Math.imul(R, W)) | 0),
              (n = (n + Math.imul(E, V)) | 0),
              (i = ((i = (i + Math.imul(E, $)) | 0) + Math.imul(k, V)) | 0),
              (o = (o + Math.imul(k, $)) | 0),
              (n = (n + Math.imul(x, G)) | 0),
              (i = ((i = (i + Math.imul(x, J)) | 0) + Math.imul(S, G)) | 0),
              (o = (o + Math.imul(S, J)) | 0),
              (n = (n + Math.imul(w, Q)) | 0),
              (i = ((i = (i + Math.imul(w, tt)) | 0) + Math.imul(_, Q)) | 0),
              (o = (o + Math.imul(_, tt)) | 0),
              (n = (n + Math.imul(v, rt)) | 0),
              (i = ((i = (i + Math.imul(v, nt)) | 0) + Math.imul(g, rt)) | 0),
              (o = (o + Math.imul(g, nt)) | 0),
              (n = (n + Math.imul(p, ot)) | 0),
              (i = ((i = (i + Math.imul(p, at)) | 0) + Math.imul(b, ot)) | 0),
              (o = (o + Math.imul(b, at)) | 0);
            var xt =
              (((u + (n = (n + Math.imul(h, ft)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, ut)) | 0) + Math.imul(d, ft)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, ut)) | 0) + (i >>> 13)) | 0) + (xt >>> 26)) | 0),
              (xt &= 67108863),
              (n = Math.imul(P, F)),
              (i = ((i = Math.imul(P, D)) + Math.imul(N, F)) | 0),
              (o = Math.imul(N, D)),
              (n = (n + Math.imul(O, H)) | 0),
              (i = ((i = (i + Math.imul(O, W)) | 0) + Math.imul(B, H)) | 0),
              (o = (o + Math.imul(B, W)) | 0),
              (n = (n + Math.imul(T, V)) | 0),
              (i = ((i = (i + Math.imul(T, $)) | 0) + Math.imul(R, V)) | 0),
              (o = (o + Math.imul(R, $)) | 0),
              (n = (n + Math.imul(E, G)) | 0),
              (i = ((i = (i + Math.imul(E, J)) | 0) + Math.imul(k, G)) | 0),
              (o = (o + Math.imul(k, J)) | 0),
              (n = (n + Math.imul(x, Q)) | 0),
              (i = ((i = (i + Math.imul(x, tt)) | 0) + Math.imul(S, Q)) | 0),
              (o = (o + Math.imul(S, tt)) | 0),
              (n = (n + Math.imul(w, rt)) | 0),
              (i = ((i = (i + Math.imul(w, nt)) | 0) + Math.imul(_, rt)) | 0),
              (o = (o + Math.imul(_, nt)) | 0),
              (n = (n + Math.imul(v, ot)) | 0),
              (i = ((i = (i + Math.imul(v, at)) | 0) + Math.imul(g, ot)) | 0),
              (o = (o + Math.imul(g, at)) | 0),
              (n = (n + Math.imul(p, ft)) | 0),
              (i = ((i = (i + Math.imul(p, ut)) | 0) + Math.imul(b, ft)) | 0),
              (o = (o + Math.imul(b, ut)) | 0);
            var St =
              (((u + (n = (n + Math.imul(h, ht)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, dt)) | 0) + Math.imul(d, ht)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, dt)) | 0) + (i >>> 13)) | 0) + (St >>> 26)) | 0),
              (St &= 67108863),
              (n = Math.imul(z, F)),
              (i = ((i = Math.imul(z, D)) + Math.imul(q, F)) | 0),
              (o = Math.imul(q, D)),
              (n = (n + Math.imul(P, H)) | 0),
              (i = ((i = (i + Math.imul(P, W)) | 0) + Math.imul(N, H)) | 0),
              (o = (o + Math.imul(N, W)) | 0),
              (n = (n + Math.imul(O, V)) | 0),
              (i = ((i = (i + Math.imul(O, $)) | 0) + Math.imul(B, V)) | 0),
              (o = (o + Math.imul(B, $)) | 0),
              (n = (n + Math.imul(T, G)) | 0),
              (i = ((i = (i + Math.imul(T, J)) | 0) + Math.imul(R, G)) | 0),
              (o = (o + Math.imul(R, J)) | 0),
              (n = (n + Math.imul(E, Q)) | 0),
              (i = ((i = (i + Math.imul(E, tt)) | 0) + Math.imul(k, Q)) | 0),
              (o = (o + Math.imul(k, tt)) | 0),
              (n = (n + Math.imul(x, rt)) | 0),
              (i = ((i = (i + Math.imul(x, nt)) | 0) + Math.imul(S, rt)) | 0),
              (o = (o + Math.imul(S, nt)) | 0),
              (n = (n + Math.imul(w, ot)) | 0),
              (i = ((i = (i + Math.imul(w, at)) | 0) + Math.imul(_, ot)) | 0),
              (o = (o + Math.imul(_, at)) | 0),
              (n = (n + Math.imul(v, ft)) | 0),
              (i = ((i = (i + Math.imul(v, ut)) | 0) + Math.imul(g, ft)) | 0),
              (o = (o + Math.imul(g, ut)) | 0),
              (n = (n + Math.imul(p, ht)) | 0),
              (i = ((i = (i + Math.imul(p, dt)) | 0) + Math.imul(b, ht)) | 0),
              (o = (o + Math.imul(b, dt)) | 0);
            var At =
              (((u + (n = (n + Math.imul(h, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, bt)) | 0) + Math.imul(d, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(d, bt)) | 0) + (i >>> 13)) | 0) + (At >>> 26)) | 0),
              (At &= 67108863),
              (n = Math.imul(z, H)),
              (i = ((i = Math.imul(z, W)) + Math.imul(q, H)) | 0),
              (o = Math.imul(q, W)),
              (n = (n + Math.imul(P, V)) | 0),
              (i = ((i = (i + Math.imul(P, $)) | 0) + Math.imul(N, V)) | 0),
              (o = (o + Math.imul(N, $)) | 0),
              (n = (n + Math.imul(O, G)) | 0),
              (i = ((i = (i + Math.imul(O, J)) | 0) + Math.imul(B, G)) | 0),
              (o = (o + Math.imul(B, J)) | 0),
              (n = (n + Math.imul(T, Q)) | 0),
              (i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(R, Q)) | 0),
              (o = (o + Math.imul(R, tt)) | 0),
              (n = (n + Math.imul(E, rt)) | 0),
              (i = ((i = (i + Math.imul(E, nt)) | 0) + Math.imul(k, rt)) | 0),
              (o = (o + Math.imul(k, nt)) | 0),
              (n = (n + Math.imul(x, ot)) | 0),
              (i = ((i = (i + Math.imul(x, at)) | 0) + Math.imul(S, ot)) | 0),
              (o = (o + Math.imul(S, at)) | 0),
              (n = (n + Math.imul(w, ft)) | 0),
              (i = ((i = (i + Math.imul(w, ut)) | 0) + Math.imul(_, ft)) | 0),
              (o = (o + Math.imul(_, ut)) | 0),
              (n = (n + Math.imul(v, ht)) | 0),
              (i = ((i = (i + Math.imul(v, dt)) | 0) + Math.imul(g, ht)) | 0),
              (o = (o + Math.imul(g, dt)) | 0);
            var Et =
              (((u + (n = (n + Math.imul(p, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(p, bt)) | 0) + Math.imul(b, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(b, bt)) | 0) + (i >>> 13)) | 0) + (Et >>> 26)) | 0),
              (Et &= 67108863),
              (n = Math.imul(z, V)),
              (i = ((i = Math.imul(z, $)) + Math.imul(q, V)) | 0),
              (o = Math.imul(q, $)),
              (n = (n + Math.imul(P, G)) | 0),
              (i = ((i = (i + Math.imul(P, J)) | 0) + Math.imul(N, G)) | 0),
              (o = (o + Math.imul(N, J)) | 0),
              (n = (n + Math.imul(O, Q)) | 0),
              (i = ((i = (i + Math.imul(O, tt)) | 0) + Math.imul(B, Q)) | 0),
              (o = (o + Math.imul(B, tt)) | 0),
              (n = (n + Math.imul(T, rt)) | 0),
              (i = ((i = (i + Math.imul(T, nt)) | 0) + Math.imul(R, rt)) | 0),
              (o = (o + Math.imul(R, nt)) | 0),
              (n = (n + Math.imul(E, ot)) | 0),
              (i = ((i = (i + Math.imul(E, at)) | 0) + Math.imul(k, ot)) | 0),
              (o = (o + Math.imul(k, at)) | 0),
              (n = (n + Math.imul(x, ft)) | 0),
              (i = ((i = (i + Math.imul(x, ut)) | 0) + Math.imul(S, ft)) | 0),
              (o = (o + Math.imul(S, ut)) | 0),
              (n = (n + Math.imul(w, ht)) | 0),
              (i = ((i = (i + Math.imul(w, dt)) | 0) + Math.imul(_, ht)) | 0),
              (o = (o + Math.imul(_, dt)) | 0);
            var kt =
              (((u + (n = (n + Math.imul(v, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(v, bt)) | 0) + Math.imul(g, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(g, bt)) | 0) + (i >>> 13)) | 0) + (kt >>> 26)) | 0),
              (kt &= 67108863),
              (n = Math.imul(z, G)),
              (i = ((i = Math.imul(z, J)) + Math.imul(q, G)) | 0),
              (o = Math.imul(q, J)),
              (n = (n + Math.imul(P, Q)) | 0),
              (i = ((i = (i + Math.imul(P, tt)) | 0) + Math.imul(N, Q)) | 0),
              (o = (o + Math.imul(N, tt)) | 0),
              (n = (n + Math.imul(O, rt)) | 0),
              (i = ((i = (i + Math.imul(O, nt)) | 0) + Math.imul(B, rt)) | 0),
              (o = (o + Math.imul(B, nt)) | 0),
              (n = (n + Math.imul(T, ot)) | 0),
              (i = ((i = (i + Math.imul(T, at)) | 0) + Math.imul(R, ot)) | 0),
              (o = (o + Math.imul(R, at)) | 0),
              (n = (n + Math.imul(E, ft)) | 0),
              (i = ((i = (i + Math.imul(E, ut)) | 0) + Math.imul(k, ft)) | 0),
              (o = (o + Math.imul(k, ut)) | 0),
              (n = (n + Math.imul(x, ht)) | 0),
              (i = ((i = (i + Math.imul(x, dt)) | 0) + Math.imul(S, ht)) | 0),
              (o = (o + Math.imul(S, dt)) | 0);
            var It =
              (((u + (n = (n + Math.imul(w, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(w, bt)) | 0) + Math.imul(_, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(_, bt)) | 0) + (i >>> 13)) | 0) + (It >>> 26)) | 0),
              (It &= 67108863),
              (n = Math.imul(z, Q)),
              (i = ((i = Math.imul(z, tt)) + Math.imul(q, Q)) | 0),
              (o = Math.imul(q, tt)),
              (n = (n + Math.imul(P, rt)) | 0),
              (i = ((i = (i + Math.imul(P, nt)) | 0) + Math.imul(N, rt)) | 0),
              (o = (o + Math.imul(N, nt)) | 0),
              (n = (n + Math.imul(O, ot)) | 0),
              (i = ((i = (i + Math.imul(O, at)) | 0) + Math.imul(B, ot)) | 0),
              (o = (o + Math.imul(B, at)) | 0),
              (n = (n + Math.imul(T, ft)) | 0),
              (i = ((i = (i + Math.imul(T, ut)) | 0) + Math.imul(R, ft)) | 0),
              (o = (o + Math.imul(R, ut)) | 0),
              (n = (n + Math.imul(E, ht)) | 0),
              (i = ((i = (i + Math.imul(E, dt)) | 0) + Math.imul(k, ht)) | 0),
              (o = (o + Math.imul(k, dt)) | 0);
            var Tt =
              (((u + (n = (n + Math.imul(x, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(x, bt)) | 0) + Math.imul(S, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(S, bt)) | 0) + (i >>> 13)) | 0) + (Tt >>> 26)) | 0),
              (Tt &= 67108863),
              (n = Math.imul(z, rt)),
              (i = ((i = Math.imul(z, nt)) + Math.imul(q, rt)) | 0),
              (o = Math.imul(q, nt)),
              (n = (n + Math.imul(P, ot)) | 0),
              (i = ((i = (i + Math.imul(P, at)) | 0) + Math.imul(N, ot)) | 0),
              (o = (o + Math.imul(N, at)) | 0),
              (n = (n + Math.imul(O, ft)) | 0),
              (i = ((i = (i + Math.imul(O, ut)) | 0) + Math.imul(B, ft)) | 0),
              (o = (o + Math.imul(B, ut)) | 0),
              (n = (n + Math.imul(T, ht)) | 0),
              (i = ((i = (i + Math.imul(T, dt)) | 0) + Math.imul(R, ht)) | 0),
              (o = (o + Math.imul(R, dt)) | 0);
            var Rt =
              (((u + (n = (n + Math.imul(E, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(E, bt)) | 0) + Math.imul(k, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(k, bt)) | 0) + (i >>> 13)) | 0) + (Rt >>> 26)) | 0),
              (Rt &= 67108863),
              (n = Math.imul(z, ot)),
              (i = ((i = Math.imul(z, at)) + Math.imul(q, ot)) | 0),
              (o = Math.imul(q, at)),
              (n = (n + Math.imul(P, ft)) | 0),
              (i = ((i = (i + Math.imul(P, ut)) | 0) + Math.imul(N, ft)) | 0),
              (o = (o + Math.imul(N, ut)) | 0),
              (n = (n + Math.imul(O, ht)) | 0),
              (i = ((i = (i + Math.imul(O, dt)) | 0) + Math.imul(B, ht)) | 0),
              (o = (o + Math.imul(B, dt)) | 0);
            var jt =
              (((u + (n = (n + Math.imul(T, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(T, bt)) | 0) + Math.imul(R, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(R, bt)) | 0) + (i >>> 13)) | 0) + (jt >>> 26)) | 0),
              (jt &= 67108863),
              (n = Math.imul(z, ft)),
              (i = ((i = Math.imul(z, ut)) + Math.imul(q, ft)) | 0),
              (o = Math.imul(q, ut)),
              (n = (n + Math.imul(P, ht)) | 0),
              (i = ((i = (i + Math.imul(P, dt)) | 0) + Math.imul(N, ht)) | 0),
              (o = (o + Math.imul(N, dt)) | 0);
            var Ot =
              (((u + (n = (n + Math.imul(O, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(O, bt)) | 0) + Math.imul(B, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(B, bt)) | 0) + (i >>> 13)) | 0) + (Ot >>> 26)) | 0),
              (Ot &= 67108863),
              (n = Math.imul(z, ht)),
              (i = ((i = Math.imul(z, dt)) + Math.imul(q, ht)) | 0),
              (o = Math.imul(q, dt));
            var Bt =
              (((u + (n = (n + Math.imul(P, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(P, bt)) | 0) + Math.imul(N, pt)) | 0)) << 13)) |
              0;
            (u = ((((o = (o + Math.imul(N, bt)) | 0) + (i >>> 13)) | 0) + (Bt >>> 26)) | 0), (Bt &= 67108863);
            var Lt =
              (((u + (n = Math.imul(z, pt))) | 0) +
                ((8191 & (i = ((i = Math.imul(z, bt)) + Math.imul(q, pt)) | 0)) << 13)) |
              0;
            return (
              (u = ((((o = Math.imul(q, bt)) + (i >>> 13)) | 0) + (Lt >>> 26)) | 0),
              (Lt &= 67108863),
              (f[0] = mt),
              (f[1] = vt),
              (f[2] = gt),
              (f[3] = yt),
              (f[4] = wt),
              (f[5] = _t),
              (f[6] = Mt),
              (f[7] = xt),
              (f[8] = St),
              (f[9] = At),
              (f[10] = Et),
              (f[11] = kt),
              (f[12] = It),
              (f[13] = Tt),
              (f[14] = Rt),
              (f[15] = jt),
              (f[16] = Ot),
              (f[17] = Bt),
              (f[18] = Lt),
              0 !== u && ((f[19] = u), r.length++),
              r
            );
          };
          function m(t, e, r) {
            (r.negative = e.negative ^ t.negative), (r.length = t.length + e.length);
            for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
              var a = i;
              i = 0;
              for (
                var s = 67108863 & n, f = Math.min(o, e.length - 1), u = Math.max(0, o - t.length + 1);
                u <= f;
                u++
              ) {
                var c = o - u,
                  h = (0 | t.words[c]) * (0 | e.words[u]),
                  d = 67108863 & h;
                (s = 67108863 & (d = (d + s) | 0)),
                  (i += (a = ((a = (a + ((h / 67108864) | 0)) | 0) + (d >>> 26)) | 0) >>> 26),
                  (a &= 67108863);
              }
              (r.words[o] = s), (n = a), (a = i);
            }
            return 0 !== n ? (r.words[o] = n) : r.length--, r._strip();
          }
          function v(t, e, r) {
            return m(t, e, r);
          }
          function g(t, e) {
            (this.x = t), (this.y = e);
          }
          Math.imul || (b = p),
            (o.prototype.mulTo = function (t, e) {
              var r = this.length + t.length;
              return 10 === this.length && 10 === t.length
                ? b(this, t, e)
                : r < 63
                ? p(this, t, e)
                : r < 1024
                ? m(this, t, e)
                : v(this, t, e);
            }),
            (g.prototype.makeRBT = function (t) {
              for (var e = new Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++)
                e[n] = this.revBin(n, r, t);
              return e;
            }),
            (g.prototype.revBin = function (t, e, r) {
              if (0 === t || t === r - 1) return t;
              for (var n = 0, i = 0; i < e; i++) (n |= (1 & t) << (e - i - 1)), (t >>= 1);
              return n;
            }),
            (g.prototype.permute = function (t, e, r, n, i, o) {
              for (var a = 0; a < o; a++) (n[a] = e[t[a]]), (i[a] = r[t[a]]);
            }),
            (g.prototype.transform = function (t, e, r, n, i, o) {
              this.permute(o, t, e, r, n, i);
              for (var a = 1; a < i; a <<= 1)
                for (
                  var s = a << 1, f = Math.cos((2 * Math.PI) / s), u = Math.sin((2 * Math.PI) / s), c = 0;
                  c < i;
                  c += s
                )
                  for (var h = f, d = u, l = 0; l < a; l++) {
                    var p = r[c + l],
                      b = n[c + l],
                      m = r[c + l + a],
                      v = n[c + l + a],
                      g = h * m - d * v;
                    (v = h * v + d * m),
                      (m = g),
                      (r[c + l] = p + m),
                      (n[c + l] = b + v),
                      (r[c + l + a] = p - m),
                      (n[c + l + a] = b - v),
                      l !== s && ((g = f * h - u * d), (d = f * d + u * h), (h = g));
                  }
            }),
            (g.prototype.guessLen13b = function (t, e) {
              var r = 1 | Math.max(e, t),
                n = 1 & r,
                i = 0;
              for (r = (r / 2) | 0; r; r >>>= 1) i++;
              return 1 << (i + 1 + n);
            }),
            (g.prototype.conjugate = function (t, e, r) {
              if (!(r <= 1))
                for (var n = 0; n < r / 2; n++) {
                  var i = t[n];
                  (t[n] = t[r - n - 1]), (t[r - n - 1] = i), (i = e[n]), (e[n] = -e[r - n - 1]), (e[r - n - 1] = -i);
                }
            }),
            (g.prototype.normalize13b = function (t, e) {
              for (var r = 0, n = 0; n < e / 2; n++) {
                var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                (t[n] = 67108863 & i), (r = i < 67108864 ? 0 : (i / 67108864) | 0);
              }
              return t;
            }),
            (g.prototype.convert13b = function (t, e, r, i) {
              for (var o = 0, a = 0; a < e; a++)
                (o += 0 | t[a]), (r[2 * a] = 8191 & o), (o >>>= 13), (r[2 * a + 1] = 8191 & o), (o >>>= 13);
              for (a = 2 * e; a < i; ++a) r[a] = 0;
              n(0 === o), n(0 == (-8192 & o));
            }),
            (g.prototype.stub = function (t) {
              for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
              return e;
            }),
            (g.prototype.mulp = function (t, e, r) {
              var n = 2 * this.guessLen13b(t.length, e.length),
                i = this.makeRBT(n),
                o = this.stub(n),
                a = new Array(n),
                s = new Array(n),
                f = new Array(n),
                u = new Array(n),
                c = new Array(n),
                h = new Array(n),
                d = r.words;
              (d.length = n),
                this.convert13b(t.words, t.length, a, n),
                this.convert13b(e.words, e.length, u, n),
                this.transform(a, o, s, f, n, i),
                this.transform(u, o, c, h, n, i);
              for (var l = 0; l < n; l++) {
                var p = s[l] * c[l] - f[l] * h[l];
                (f[l] = s[l] * h[l] + f[l] * c[l]), (s[l] = p);
              }
              return (
                this.conjugate(s, f, n),
                this.transform(s, f, d, o, n, i),
                this.conjugate(d, o, n),
                this.normalize13b(d, n),
                (r.negative = t.negative ^ e.negative),
                (r.length = t.length + e.length),
                r._strip()
              );
            }),
            (o.prototype.mul = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), this.mulTo(t, e);
            }),
            (o.prototype.mulf = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), v(this, t, e);
            }),
            (o.prototype.imul = function (t) {
              return this.clone().mulTo(t, this);
            }),
            (o.prototype.imuln = function (t) {
              var e = t < 0;
              e && (t = -t), n('number' == typeof t), n(t < 67108864);
              for (var r = 0, i = 0; i < this.length; i++) {
                var o = (0 | this.words[i]) * t,
                  a = (67108863 & o) + (67108863 & r);
                (r >>= 26), (r += (o / 67108864) | 0), (r += a >>> 26), (this.words[i] = 67108863 & a);
              }
              return 0 !== r && ((this.words[i] = r), this.length++), e ? this.ineg() : this;
            }),
            (o.prototype.muln = function (t) {
              return this.clone().imuln(t);
            }),
            (o.prototype.sqr = function () {
              return this.mul(this);
            }),
            (o.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (o.prototype.pow = function (t) {
              var e = (function (t) {
                for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                  var n = (r / 26) | 0,
                    i = r % 26;
                  e[r] = (t.words[n] >>> i) & 1;
                }
                return e;
              })(t);
              if (0 === e.length) return new o(1);
              for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
              if (++n < e.length) for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
              return r;
            }),
            (o.prototype.iushln = function (t) {
              n('number' == typeof t && t >= 0);
              var e,
                r = t % 26,
                i = (t - r) / 26,
                o = (67108863 >>> (26 - r)) << (26 - r);
              if (0 !== r) {
                var a = 0;
                for (e = 0; e < this.length; e++) {
                  var s = this.words[e] & o,
                    f = ((0 | this.words[e]) - s) << r;
                  (this.words[e] = f | a), (a = s >>> (26 - r));
                }
                a && ((this.words[e] = a), this.length++);
              }
              if (0 !== i) {
                for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                for (e = 0; e < i; e++) this.words[e] = 0;
                this.length += i;
              }
              return this._strip();
            }),
            (o.prototype.ishln = function (t) {
              return n(0 === this.negative), this.iushln(t);
            }),
            (o.prototype.iushrn = function (t, e, r) {
              var i;
              n('number' == typeof t && t >= 0), (i = e ? (e - (e % 26)) / 26 : 0);
              var o = t % 26,
                a = Math.min((t - o) / 26, this.length),
                s = 67108863 ^ ((67108863 >>> o) << o),
                f = r;
              if (((i -= a), (i = Math.max(0, i)), f)) {
                for (var u = 0; u < a; u++) f.words[u] = this.words[u];
                f.length = a;
              }
              if (0 === a);
              else if (this.length > a)
                for (this.length -= a, u = 0; u < this.length; u++) this.words[u] = this.words[u + a];
              else (this.words[0] = 0), (this.length = 1);
              var c = 0;
              for (u = this.length - 1; u >= 0 && (0 !== c || u >= i); u--) {
                var h = 0 | this.words[u];
                (this.words[u] = (c << (26 - o)) | (h >>> o)), (c = h & s);
              }
              return (
                f && 0 !== c && (f.words[f.length++] = c),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this._strip()
              );
            }),
            (o.prototype.ishrn = function (t, e, r) {
              return n(0 === this.negative), this.iushrn(t, e, r);
            }),
            (o.prototype.shln = function (t) {
              return this.clone().ishln(t);
            }),
            (o.prototype.ushln = function (t) {
              return this.clone().iushln(t);
            }),
            (o.prototype.shrn = function (t) {
              return this.clone().ishrn(t);
            }),
            (o.prototype.ushrn = function (t) {
              return this.clone().iushrn(t);
            }),
            (o.prototype.testn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              return !(this.length <= r) && !!(this.words[r] & i);
            }),
            (o.prototype.imaskn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26;
              if ((n(0 === this.negative, 'imaskn works only with positive numbers'), this.length <= r)) return this;
              if ((0 !== e && r++, (this.length = Math.min(r, this.length)), 0 !== e)) {
                var i = 67108863 ^ ((67108863 >>> e) << e);
                this.words[this.length - 1] &= i;
              }
              return this._strip();
            }),
            (o.prototype.maskn = function (t) {
              return this.clone().imaskn(t);
            }),
            (o.prototype.iaddn = function (t) {
              return (
                n('number' == typeof t),
                n(t < 67108864),
                t < 0
                  ? this.isubn(-t)
                  : 0 !== this.negative
                  ? 1 === this.length && (0 | this.words[0]) <= t
                    ? ((this.words[0] = t - (0 | this.words[0])), (this.negative = 0), this)
                    : ((this.negative = 0), this.isubn(t), (this.negative = 1), this)
                  : this._iaddn(t)
              );
            }),
            (o.prototype._iaddn = function (t) {
              this.words[0] += t;
              for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
                (this.words[e] -= 67108864), e === this.length - 1 ? (this.words[e + 1] = 1) : this.words[e + 1]++;
              return (this.length = Math.max(this.length, e + 1)), this;
            }),
            (o.prototype.isubn = function (t) {
              if ((n('number' == typeof t), n(t < 67108864), t < 0)) return this.iaddn(-t);
              if (0 !== this.negative) return (this.negative = 0), this.iaddn(t), (this.negative = 1), this;
              if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
                (this.words[0] = -this.words[0]), (this.negative = 1);
              else
                for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  (this.words[e] += 67108864), (this.words[e + 1] -= 1);
              return this._strip();
            }),
            (o.prototype.addn = function (t) {
              return this.clone().iaddn(t);
            }),
            (o.prototype.subn = function (t) {
              return this.clone().isubn(t);
            }),
            (o.prototype.iabs = function () {
              return (this.negative = 0), this;
            }),
            (o.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (o.prototype._ishlnsubmul = function (t, e, r) {
              var i,
                o,
                a = t.length + r;
              this._expand(a);
              var s = 0;
              for (i = 0; i < t.length; i++) {
                o = (0 | this.words[i + r]) + s;
                var f = (0 | t.words[i]) * e;
                (s = ((o -= 67108863 & f) >> 26) - ((f / 67108864) | 0)), (this.words[i + r] = 67108863 & o);
              }
              for (; i < this.length - r; i++)
                (s = (o = (0 | this.words[i + r]) + s) >> 26), (this.words[i + r] = 67108863 & o);
              if (0 === s) return this._strip();
              for (n(-1 === s), s = 0, i = 0; i < this.length; i++)
                (s = (o = -(0 | this.words[i]) + s) >> 26), (this.words[i] = 67108863 & o);
              return (this.negative = 1), this._strip();
            }),
            (o.prototype._wordDiv = function (t, e) {
              var r = (this.length, t.length),
                n = this.clone(),
                i = t,
                a = 0 | i.words[i.length - 1];
              0 !== (r = 26 - this._countBits(a)) && ((i = i.ushln(r)), n.iushln(r), (a = 0 | i.words[i.length - 1]));
              var s,
                f = n.length - i.length;
              if ('mod' !== e) {
                ((s = new o(null)).length = f + 1), (s.words = new Array(s.length));
                for (var u = 0; u < s.length; u++) s.words[u] = 0;
              }
              var c = n.clone()._ishlnsubmul(i, 1, f);
              0 === c.negative && ((n = c), s && (s.words[f] = 1));
              for (var h = f - 1; h >= 0; h--) {
                var d = 67108864 * (0 | n.words[i.length + h]) + (0 | n.words[i.length + h - 1]);
                for (d = Math.min((d / a) | 0, 67108863), n._ishlnsubmul(i, d, h); 0 !== n.negative; )
                  d--, (n.negative = 0), n._ishlnsubmul(i, 1, h), n.isZero() || (n.negative ^= 1);
                s && (s.words[h] = d);
              }
              return s && s._strip(), n._strip(), 'div' !== e && 0 !== r && n.iushrn(r), { div: s || null, mod: n };
            }),
            (o.prototype.divmod = function (t, e, r) {
              return (
                n(!t.isZero()),
                this.isZero()
                  ? { div: new o(0), mod: new o(0) }
                  : 0 !== this.negative && 0 === t.negative
                  ? ((s = this.neg().divmod(t, e)),
                    'mod' !== e && (i = s.div.neg()),
                    'div' !== e && ((a = s.mod.neg()), r && 0 !== a.negative && a.iadd(t)),
                    { div: i, mod: a })
                  : 0 === this.negative && 0 !== t.negative
                  ? ((s = this.divmod(t.neg(), e)), 'mod' !== e && (i = s.div.neg()), { div: i, mod: s.mod })
                  : 0 != (this.negative & t.negative)
                  ? ((s = this.neg().divmod(t.neg(), e)),
                    'div' !== e && ((a = s.mod.neg()), r && 0 !== a.negative && a.isub(t)),
                    { div: s.div, mod: a })
                  : t.length > this.length || this.cmp(t) < 0
                  ? { div: new o(0), mod: this }
                  : 1 === t.length
                  ? 'div' === e
                    ? { div: this.divn(t.words[0]), mod: null }
                    : 'mod' === e
                    ? { div: null, mod: new o(this.modrn(t.words[0])) }
                    : { div: this.divn(t.words[0]), mod: new o(this.modrn(t.words[0])) }
                  : this._wordDiv(t, e)
              );
              var i, a, s;
            }),
            (o.prototype.div = function (t) {
              return this.divmod(t, 'div', !1).div;
            }),
            (o.prototype.mod = function (t) {
              return this.divmod(t, 'mod', !1).mod;
            }),
            (o.prototype.umod = function (t) {
              return this.divmod(t, 'mod', !0).mod;
            }),
            (o.prototype.divRound = function (t) {
              var e = this.divmod(t);
              if (e.mod.isZero()) return e.div;
              var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                n = t.ushrn(1),
                i = t.andln(1),
                o = r.cmp(n);
              return o < 0 || (1 === i && 0 === o) ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1);
            }),
            (o.prototype.modrn = function (t) {
              var e = t < 0;
              e && (t = -t), n(t <= 67108863);
              for (var r = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--)
                i = (r * i + (0 | this.words[o])) % t;
              return e ? -i : i;
            }),
            (o.prototype.modn = function (t) {
              return this.modrn(t);
            }),
            (o.prototype.idivn = function (t) {
              var e = t < 0;
              e && (t = -t), n(t <= 67108863);
              for (var r = 0, i = this.length - 1; i >= 0; i--) {
                var o = (0 | this.words[i]) + 67108864 * r;
                (this.words[i] = (o / t) | 0), (r = o % t);
              }
              return this._strip(), e ? this.ineg() : this;
            }),
            (o.prototype.divn = function (t) {
              return this.clone().idivn(t);
            }),
            (o.prototype.egcd = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i = new o(1), a = new o(0), s = new o(0), f = new o(1), u = 0; e.isEven() && r.isEven(); )
                e.iushrn(1), r.iushrn(1), ++u;
              for (var c = r.clone(), h = e.clone(); !e.isZero(); ) {
                for (var d = 0, l = 1; 0 == (e.words[0] & l) && d < 26; ++d, l <<= 1);
                if (d > 0)
                  for (e.iushrn(d); d-- > 0; )
                    (i.isOdd() || a.isOdd()) && (i.iadd(c), a.isub(h)), i.iushrn(1), a.iushrn(1);
                for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p, b <<= 1);
                if (p > 0)
                  for (r.iushrn(p); p-- > 0; )
                    (s.isOdd() || f.isOdd()) && (s.iadd(c), f.isub(h)), s.iushrn(1), f.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), i.isub(s), a.isub(f)) : (r.isub(e), s.isub(i), f.isub(a));
              }
              return { a: s, b: f, gcd: r.iushln(u) };
            }),
            (o.prototype._invmp = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i, a = new o(1), s = new o(0), f = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
                for (var u = 0, c = 1; 0 == (e.words[0] & c) && u < 26; ++u, c <<= 1);
                if (u > 0) for (e.iushrn(u); u-- > 0; ) a.isOdd() && a.iadd(f), a.iushrn(1);
                for (var h = 0, d = 1; 0 == (r.words[0] & d) && h < 26; ++h, d <<= 1);
                if (h > 0) for (r.iushrn(h); h-- > 0; ) s.isOdd() && s.iadd(f), s.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), a.isub(s)) : (r.isub(e), s.isub(a));
              }
              return (i = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && i.iadd(t), i;
            }),
            (o.prototype.gcd = function (t) {
              if (this.isZero()) return t.abs();
              if (t.isZero()) return this.abs();
              var e = this.clone(),
                r = t.clone();
              (e.negative = 0), (r.negative = 0);
              for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
              for (;;) {
                for (; e.isEven(); ) e.iushrn(1);
                for (; r.isEven(); ) r.iushrn(1);
                var i = e.cmp(r);
                if (i < 0) {
                  var o = e;
                  (e = r), (r = o);
                } else if (0 === i || 0 === r.cmpn(1)) break;
                e.isub(r);
              }
              return r.iushln(n);
            }),
            (o.prototype.invm = function (t) {
              return this.egcd(t).a.umod(t);
            }),
            (o.prototype.isEven = function () {
              return 0 == (1 & this.words[0]);
            }),
            (o.prototype.isOdd = function () {
              return 1 == (1 & this.words[0]);
            }),
            (o.prototype.andln = function (t) {
              return this.words[0] & t;
            }),
            (o.prototype.bincn = function (t) {
              n('number' == typeof t);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              if (this.length <= r) return this._expand(r + 1), (this.words[r] |= i), this;
              for (var o = i, a = r; 0 !== o && a < this.length; a++) {
                var s = 0 | this.words[a];
                (o = (s += o) >>> 26), (s &= 67108863), (this.words[a] = s);
              }
              return 0 !== o && ((this.words[a] = o), this.length++), this;
            }),
            (o.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (o.prototype.cmpn = function (t) {
              var e,
                r = t < 0;
              if (0 !== this.negative && !r) return -1;
              if (0 === this.negative && r) return 1;
              if ((this._strip(), this.length > 1)) e = 1;
              else {
                r && (t = -t), n(t <= 67108863, 'Number is too big');
                var i = 0 | this.words[0];
                e = i === t ? 0 : i < t ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.cmp = function (t) {
              if (0 !== this.negative && 0 === t.negative) return -1;
              if (0 === this.negative && 0 !== t.negative) return 1;
              var e = this.ucmp(t);
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.ucmp = function (t) {
              if (this.length > t.length) return 1;
              if (this.length < t.length) return -1;
              for (var e = 0, r = this.length - 1; r >= 0; r--) {
                var n = 0 | this.words[r],
                  i = 0 | t.words[r];
                if (n !== i) {
                  n < i ? (e = -1) : n > i && (e = 1);
                  break;
                }
              }
              return e;
            }),
            (o.prototype.gtn = function (t) {
              return 1 === this.cmpn(t);
            }),
            (o.prototype.gt = function (t) {
              return 1 === this.cmp(t);
            }),
            (o.prototype.gten = function (t) {
              return this.cmpn(t) >= 0;
            }),
            (o.prototype.gte = function (t) {
              return this.cmp(t) >= 0;
            }),
            (o.prototype.ltn = function (t) {
              return -1 === this.cmpn(t);
            }),
            (o.prototype.lt = function (t) {
              return -1 === this.cmp(t);
            }),
            (o.prototype.lten = function (t) {
              return this.cmpn(t) <= 0;
            }),
            (o.prototype.lte = function (t) {
              return this.cmp(t) <= 0;
            }),
            (o.prototype.eqn = function (t) {
              return 0 === this.cmpn(t);
            }),
            (o.prototype.eq = function (t) {
              return 0 === this.cmp(t);
            }),
            (o.red = function (t) {
              return new A(t);
            }),
            (o.prototype.toRed = function (t) {
              return (
                n(!this.red, 'Already a number in reduction context'),
                n(0 === this.negative, 'red works only with positives'),
                t.convertTo(this)._forceRed(t)
              );
            }),
            (o.prototype.fromRed = function () {
              return n(this.red, 'fromRed works only with numbers in reduction context'), this.red.convertFrom(this);
            }),
            (o.prototype._forceRed = function (t) {
              return (this.red = t), this;
            }),
            (o.prototype.forceRed = function (t) {
              return n(!this.red, 'Already a number in reduction context'), this._forceRed(t);
            }),
            (o.prototype.redAdd = function (t) {
              return n(this.red, 'redAdd works only with red numbers'), this.red.add(this, t);
            }),
            (o.prototype.redIAdd = function (t) {
              return n(this.red, 'redIAdd works only with red numbers'), this.red.iadd(this, t);
            }),
            (o.prototype.redSub = function (t) {
              return n(this.red, 'redSub works only with red numbers'), this.red.sub(this, t);
            }),
            (o.prototype.redISub = function (t) {
              return n(this.red, 'redISub works only with red numbers'), this.red.isub(this, t);
            }),
            (o.prototype.redShl = function (t) {
              return n(this.red, 'redShl works only with red numbers'), this.red.shl(this, t);
            }),
            (o.prototype.redMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.mul(this, t)
              );
            }),
            (o.prototype.redIMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.imul(this, t)
              );
            }),
            (o.prototype.redSqr = function () {
              return n(this.red, 'redSqr works only with red numbers'), this.red._verify1(this), this.red.sqr(this);
            }),
            (o.prototype.redISqr = function () {
              return n(this.red, 'redISqr works only with red numbers'), this.red._verify1(this), this.red.isqr(this);
            }),
            (o.prototype.redSqrt = function () {
              return n(this.red, 'redSqrt works only with red numbers'), this.red._verify1(this), this.red.sqrt(this);
            }),
            (o.prototype.redInvm = function () {
              return n(this.red, 'redInvm works only with red numbers'), this.red._verify1(this), this.red.invm(this);
            }),
            (o.prototype.redNeg = function () {
              return n(this.red, 'redNeg works only with red numbers'), this.red._verify1(this), this.red.neg(this);
            }),
            (o.prototype.redPow = function (t) {
              return n(this.red && !t.red, 'redPow(normalNum)'), this.red._verify1(this), this.red.pow(this, t);
            });
          var y = { k256: null, p224: null, p192: null, p25519: null };
          function w(t, e) {
            (this.name = t),
              (this.p = new o(e, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new o(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp());
          }
          function _() {
            w.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
          }
          function M() {
            w.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
          }
          function x() {
            w.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
          }
          function S() {
            w.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
          }
          function A(t) {
            if ('string' == typeof t) {
              var e = o._prime(t);
              (this.m = e.p), (this.prime = e);
            } else n(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null);
          }
          function E(t) {
            A.call(this, t),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new o(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv));
          }
          (w.prototype._tmp = function () {
            var t = new o(null);
            return (t.words = new Array(Math.ceil(this.n / 13))), t;
          }),
            (w.prototype.ireduce = function (t) {
              var e,
                r = t;
              do {
                this.split(r, this.tmp), (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
              } while (e > this.n);
              var n = e < this.n ? -1 : r.ucmp(this.p);
              return (
                0 === n
                  ? ((r.words[0] = 0), (r.length = 1))
                  : n > 0
                  ? r.isub(this.p)
                  : void 0 !== r.strip
                  ? r.strip()
                  : r._strip(),
                r
              );
            }),
            (w.prototype.split = function (t, e) {
              t.iushrn(this.n, 0, e);
            }),
            (w.prototype.imulK = function (t) {
              return t.imul(this.k);
            }),
            i(_, w),
            (_.prototype.split = function (t, e) {
              for (var r = Math.min(t.length, 9), n = 0; n < r; n++) e.words[n] = t.words[n];
              if (((e.length = r), t.length <= 9)) return (t.words[0] = 0), void (t.length = 1);
              var i = t.words[9];
              for (e.words[e.length++] = 4194303 & i, n = 10; n < t.length; n++) {
                var o = 0 | t.words[n];
                (t.words[n - 10] = ((4194303 & o) << 4) | (i >>> 22)), (i = o);
              }
              (i >>>= 22), (t.words[n - 10] = i), 0 === i && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
            }),
            (_.prototype.imulK = function (t) {
              (t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2);
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 0 | t.words[r];
                (e += 977 * n), (t.words[r] = 67108863 & e), (e = 64 * n + ((e / 67108864) | 0));
              }
              return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t;
            }),
            i(M, w),
            i(x, w),
            i(S, w),
            (S.prototype.imulK = function (t) {
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 19 * (0 | t.words[r]) + e,
                  i = 67108863 & n;
                (n >>>= 26), (t.words[r] = i), (e = n);
              }
              return 0 !== e && (t.words[t.length++] = e), t;
            }),
            (o._prime = function (t) {
              if (y[t]) return y[t];
              var e;
              if ('k256' === t) e = new _();
              else if ('p224' === t) e = new M();
              else if ('p192' === t) e = new x();
              else {
                if ('p25519' !== t) throw new Error('Unknown prime ' + t);
                e = new S();
              }
              return (y[t] = e), e;
            }),
            (A.prototype._verify1 = function (t) {
              n(0 === t.negative, 'red works only with positives'), n(t.red, 'red works only with red numbers');
            }),
            (A.prototype._verify2 = function (t, e) {
              n(0 == (t.negative | e.negative), 'red works only with positives'),
                n(t.red && t.red === e.red, 'red works only with red numbers');
            }),
            (A.prototype.imod = function (t) {
              return this.prime ? this.prime.ireduce(t)._forceRed(this) : (u(t, t.umod(this.m)._forceRed(this)), t);
            }),
            (A.prototype.neg = function (t) {
              return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
            }),
            (A.prototype.add = function (t, e) {
              this._verify2(t, e);
              var r = t.add(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
            }),
            (A.prototype.iadd = function (t, e) {
              this._verify2(t, e);
              var r = t.iadd(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r;
            }),
            (A.prototype.sub = function (t, e) {
              this._verify2(t, e);
              var r = t.sub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
            }),
            (A.prototype.isub = function (t, e) {
              this._verify2(t, e);
              var r = t.isub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r;
            }),
            (A.prototype.shl = function (t, e) {
              return this._verify1(t), this.imod(t.ushln(e));
            }),
            (A.prototype.imul = function (t, e) {
              return this._verify2(t, e), this.imod(t.imul(e));
            }),
            (A.prototype.mul = function (t, e) {
              return this._verify2(t, e), this.imod(t.mul(e));
            }),
            (A.prototype.isqr = function (t) {
              return this.imul(t, t.clone());
            }),
            (A.prototype.sqr = function (t) {
              return this.mul(t, t);
            }),
            (A.prototype.sqrt = function (t) {
              if (t.isZero()) return t.clone();
              var e = this.m.andln(3);
              if ((n(e % 2 == 1), 3 === e)) {
                var r = this.m.add(new o(1)).iushrn(2);
                return this.pow(t, r);
              }
              for (var i = this.m.subn(1), a = 0; !i.isZero() && 0 === i.andln(1); ) a++, i.iushrn(1);
              n(!i.isZero());
              var s = new o(1).toRed(this),
                f = s.redNeg(),
                u = this.m.subn(1).iushrn(1),
                c = this.m.bitLength();
              for (c = new o(2 * c * c).toRed(this); 0 !== this.pow(c, u).cmp(f); ) c.redIAdd(f);
              for (
                var h = this.pow(c, i), d = this.pow(t, i.addn(1).iushrn(1)), l = this.pow(t, i), p = a;
                0 !== l.cmp(s);

              ) {
                for (var b = l, m = 0; 0 !== b.cmp(s); m++) b = b.redSqr();
                n(m < p);
                var v = this.pow(h, new o(1).iushln(p - m - 1));
                (d = d.redMul(v)), (h = v.redSqr()), (l = l.redMul(h)), (p = m);
              }
              return d;
            }),
            (A.prototype.invm = function (t) {
              var e = t._invmp(this.m);
              return 0 !== e.negative ? ((e.negative = 0), this.imod(e).redNeg()) : this.imod(e);
            }),
            (A.prototype.pow = function (t, e) {
              if (e.isZero()) return new o(1).toRed(this);
              if (0 === e.cmpn(1)) return t.clone();
              var r = new Array(16);
              (r[0] = new o(1).toRed(this)), (r[1] = t);
              for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
              var i = r[0],
                a = 0,
                s = 0,
                f = e.bitLength() % 26;
              for (0 === f && (f = 26), n = e.length - 1; n >= 0; n--) {
                for (var u = e.words[n], c = f - 1; c >= 0; c--) {
                  var h = (u >> c) & 1;
                  i !== r[0] && (i = this.sqr(i)),
                    0 !== h || 0 !== a
                      ? ((a <<= 1),
                        (a |= h),
                        (4 === ++s || (0 === n && 0 === c)) && ((i = this.mul(i, r[a])), (s = 0), (a = 0)))
                      : (s = 0);
                }
                f = 26;
              }
              return i;
            }),
            (A.prototype.convertTo = function (t) {
              var e = t.umod(this.m);
              return e === t ? e.clone() : e;
            }),
            (A.prototype.convertFrom = function (t) {
              var e = t.clone();
              return (e.red = null), e;
            }),
            (o.mont = function (t) {
              return new E(t);
            }),
            i(E, A),
            (E.prototype.convertTo = function (t) {
              return this.imod(t.ushln(this.shift));
            }),
            (E.prototype.convertFrom = function (t) {
              var e = this.imod(t.mul(this.rinv));
              return (e.red = null), e;
            }),
            (E.prototype.imul = function (t, e) {
              if (t.isZero() || e.isZero()) return (t.words[0] = 0), (t.length = 1), t;
              var r = t.imul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                o = i;
              return (
                i.cmp(this.m) >= 0 ? (o = i.isub(this.m)) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
              );
            }),
            (E.prototype.mul = function (t, e) {
              if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
              var r = t.mul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                a = i;
              return (
                i.cmp(this.m) >= 0 ? (a = i.isub(this.m)) : i.cmpn(0) < 0 && (a = i.iadd(this.m)), a._forceRed(this)
              );
            }),
            (E.prototype.invm = function (t) {
              return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
            });
        })(void 0 === e || e, this);
      },
      { buffer: 17 },
    ],
    61: [
      function (t, e, r) {
        (function (r) {
          'use strict';
          var n = t('is-hex-prefixed'),
            i = t('strip-hex-prefix');
          function o(t) {
            var e = t;
            if ('string' != typeof e)
              throw new Error(
                '[ethjs-util] while padding to even, value must be string, is currently ' +
                  typeof e +
                  ', while padToEven.'
              );
            return e.length % 2 && (e = '0' + e), e;
          }
          function a(t) {
            return '0x' + t.toString(16);
          }
          e.exports = {
            arrayContainsArray: function (t, e, r) {
              if (!0 !== Array.isArray(t))
                throw new Error(
                  "[ethjs-util] method arrayContainsArray requires input 'superset' to be an array got type '" +
                    typeof t +
                    "'"
                );
              if (!0 !== Array.isArray(e))
                throw new Error(
                  "[ethjs-util] method arrayContainsArray requires input 'subset' to be an array got type '" +
                    typeof e +
                    "'"
                );
              return e[Boolean(r) ? 'some' : 'every'](function (e) {
                return t.indexOf(e) >= 0;
              });
            },
            intToBuffer: function (t) {
              var e = a(t);
              return new r(o(e.slice(2)), 'hex');
            },
            getBinarySize: function (t) {
              if ('string' != typeof t)
                throw new Error(
                  "[ethjs-util] while getting binary size, method getBinarySize requires input 'str' to be type String, got '" +
                    typeof t +
                    "'."
                );
              return r.byteLength(t, 'utf8');
            },
            isHexPrefixed: n,
            stripHexPrefix: i,
            padToEven: o,
            intToHex: a,
            fromAscii: function (t) {
              for (var e = '', r = 0; r < t.length; r++) {
                var n = t.charCodeAt(r).toString(16);
                e += n.length < 2 ? '0' + n : n;
              }
              return '0x' + e;
            },
            fromUtf8: function (t) {
              return '0x' + o(new r(t, 'utf8').toString('hex')).replace(/^0+|0+$/g, '');
            },
            toAscii: function (t) {
              var e = '',
                r = 0,
                n = t.length;
              for ('0x' === t.substring(0, 2) && (r = 2); r < n; r += 2) {
                var i = parseInt(t.substr(r, 2), 16);
                e += String.fromCharCode(i);
              }
              return e;
            },
            toUtf8: function (t) {
              return new r(o(i(t).replace(/^0+|0+$/g, '')), 'hex').toString('utf8');
            },
            getKeys: function (t, e, r) {
              if (!Array.isArray(t))
                throw new Error(
                  "[ethjs-util] method getKeys expecting type Array as 'params' input, got '" + typeof t + "'"
                );
              if ('string' != typeof e)
                throw new Error(
                  "[ethjs-util] method getKeys expecting type String for input 'key' got '" + typeof e + "'."
                );
              for (var n = [], i = 0; i < t.length; i++) {
                var o = t[i][e];
                if (r && !o) o = '';
                else if ('string' != typeof o) throw new Error('invalid abi');
                n.push(o);
              }
              return n;
            },
            isHexString: function (t, e) {
              return !('string' != typeof t || !t.match(/^0x[0-9A-Fa-f]*$/)) && (!e || t.length === 2 + 2 * e);
            },
          };
        }.call(this, t('buffer').Buffer));
      },
      { buffer: 18, 'is-hex-prefixed': 82, 'strip-hex-prefix': 131 },
    ],
    62: [
      function (t, e, r) {
        (function (r) {
          'use strict';
          const n = t('stream');
          e.exports = class extends n.Duplex {
            constructor(t) {
              super({ objectMode: !0 }),
                (this._port = t),
                this._port.onMessage.addListener((t) => this._onMessage(t)),
                this._port.onDisconnect.addListener(() => this._onDisconnect());
            }
            _onMessage(t) {
              if (r.isBuffer(t)) {
                const e = r.from(t);
                this.push(e);
              } else this.push(t);
            }
            _onDisconnect() {
              this.destroy();
            }
            _read() {}
            _write(t, e, n) {
              try {
                if (r.isBuffer(t)) {
                  const e = t.toJSON();
                  (e._isBuffer = !0), this._port.postMessage(e);
                } else this._port.postMessage(t);
              } catch (t) {
                return n(new Error('PortDuplexStream - disconnected'));
              }
              return n();
            }
          };
        }.call(this, t('buffer').Buffer));
      },
      { buffer: 18, stream: 130 },
    ],
    63: [
      function (t, e, r) {
        const n = [
            'alarms',
            'bookmarks',
            'browserAction',
            'commands',
            'contextMenus',
            'cookies',
            'downloads',
            'events',
            'extension',
            'extensionTypes',
            'history',
            'i18n',
            'idle',
            'notifications',
            'pageAction',
            'runtime',
            'storage',
            'tabs',
            'webNavigation',
            'webRequest',
            'windows',
          ],
          i = 'undefined' != typeof chrome,
          o = 'undefined' != typeof window,
          a = 'undefined' != typeof browser;
        e.exports = function () {
          const t = this;
          if (
            (n.forEach(function (e) {
              if (((t[e] = null), i))
                try {
                  chrome[e] && (t[e] = chrome[e]);
                } catch (t) {}
              if (o)
                try {
                  window[e] && (t[e] = window[e]);
                } catch (t) {}
              if (a) {
                try {
                  browser[e] && (t[e] = browser[e]);
                } catch (t) {}
                try {
                  t.api = browser.extension[e];
                } catch (t) {}
              }
            }),
            a)
          ) {
            try {
              browser && browser.runtime && (this.runtime = browser.runtime);
            } catch (t) {}
            try {
              browser && browser.browserAction && (this.browserAction = browser.browserAction);
            } catch (t) {}
          }
        };
      },
      {},
    ],
    64: [
      function (t, e, r) {
        const n = t('./extension-instance');
        e.exports = new n();
      },
      { './extension-instance': 63 },
    ],
    65: [
      function (t, e, r) {
        'use strict';
        var n = t('safe-buffer').Buffer,
          i = t('stream').Transform;
        function o(t) {
          i.call(this),
            (this._block = n.allocUnsafe(t)),
            (this._blockSize = t),
            (this._blockOffset = 0),
            (this._length = [0, 0, 0, 0]),
            (this._finalized = !1);
        }
        t('inherits')(o, i),
          (o.prototype._transform = function (t, e, r) {
            var n = null;
            try {
              this.update(t, e);
            } catch (t) {
              n = t;
            }
            r(n);
          }),
          (o.prototype._flush = function (t) {
            var e = null;
            try {
              this.push(this.digest());
            } catch (t) {
              e = t;
            }
            t(e);
          }),
          (o.prototype.update = function (t, e) {
            if (
              ((function (t, e) {
                if (!n.isBuffer(t) && 'string' != typeof t) throw new TypeError(e + ' must be a string or a buffer');
              })(t, 'Data'),
              this._finalized)
            )
              throw new Error('Digest already called');
            n.isBuffer(t) || (t = n.from(t, e));
            for (var r = this._block, i = 0; this._blockOffset + t.length - i >= this._blockSize; ) {
              for (var o = this._blockOffset; o < this._blockSize; ) r[o++] = t[i++];
              this._update(), (this._blockOffset = 0);
            }
            for (; i < t.length; ) r[this._blockOffset++] = t[i++];
            for (var a = 0, s = 8 * t.length; s > 0; ++a)
              (this._length[a] += s),
                (s = (this._length[a] / 4294967296) | 0) > 0 && (this._length[a] -= 4294967296 * s);
            return this;
          }),
          (o.prototype._update = function () {
            throw new Error('_update is not implemented');
          }),
          (o.prototype.digest = function (t) {
            if (this._finalized) throw new Error('Digest already called');
            this._finalized = !0;
            var e = this._digest();
            void 0 !== t && (e = e.toString(t)), this._block.fill(0), (this._blockOffset = 0);
            for (var r = 0; r < 4; ++r) this._length[r] = 0;
            return e;
          }),
          (o.prototype._digest = function () {
            throw new Error('_digest is not implemented');
          }),
          (e.exports = o);
      },
      { inherits: 80, 'safe-buffer': 121, stream: 130 },
    ],
    66: [
      function (t, e, r) {
        var n = r;
        (n.utils = t('./hash/utils')),
          (n.common = t('./hash/common')),
          (n.sha = t('./hash/sha')),
          (n.ripemd = t('./hash/ripemd')),
          (n.hmac = t('./hash/hmac')),
          (n.sha1 = n.sha.sha1),
          (n.sha256 = n.sha.sha256),
          (n.sha224 = n.sha.sha224),
          (n.sha384 = n.sha.sha384),
          (n.sha512 = n.sha.sha512),
          (n.ripemd160 = n.ripemd.ripemd160);
      },
      { './hash/common': 67, './hash/hmac': 68, './hash/ripemd': 69, './hash/sha': 70, './hash/utils': 77 },
    ],
    67: [
      function (t, e, r) {
        'use strict';
        var n = t('./utils'),
          i = t('minimalistic-assert');
        function o() {
          (this.pending = null),
            (this.pendingTotal = 0),
            (this.blockSize = this.constructor.blockSize),
            (this.outSize = this.constructor.outSize),
            (this.hmacStrength = this.constructor.hmacStrength),
            (this.padLength = this.constructor.padLength / 8),
            (this.endian = 'big'),
            (this._delta8 = this.blockSize / 8),
            (this._delta32 = this.blockSize / 32);
        }
        (r.BlockHash = o),
          (o.prototype.update = function (t, e) {
            if (
              ((t = n.toArray(t, e)),
              this.pending ? (this.pending = this.pending.concat(t)) : (this.pending = t),
              (this.pendingTotal += t.length),
              this.pending.length >= this._delta8)
            ) {
              var r = (t = this.pending).length % this._delta8;
              (this.pending = t.slice(t.length - r, t.length)),
                0 === this.pending.length && (this.pending = null),
                (t = n.join32(t, 0, t.length - r, this.endian));
              for (var i = 0; i < t.length; i += this._delta32) this._update(t, i, i + this._delta32);
            }
            return this;
          }),
          (o.prototype.digest = function (t) {
            return this.update(this._pad()), i(null === this.pending), this._digest(t);
          }),
          (o.prototype._pad = function () {
            var t = this.pendingTotal,
              e = this._delta8,
              r = e - ((t + this.padLength) % e),
              n = new Array(r + this.padLength);
            n[0] = 128;
            for (var i = 1; i < r; i++) n[i] = 0;
            if (((t <<= 3), 'big' === this.endian)) {
              for (var o = 8; o < this.padLength; o++) n[i++] = 0;
              (n[i++] = 0),
                (n[i++] = 0),
                (n[i++] = 0),
                (n[i++] = 0),
                (n[i++] = (t >>> 24) & 255),
                (n[i++] = (t >>> 16) & 255),
                (n[i++] = (t >>> 8) & 255),
                (n[i++] = 255 & t);
            } else
              for (
                n[i++] = 255 & t,
                  n[i++] = (t >>> 8) & 255,
                  n[i++] = (t >>> 16) & 255,
                  n[i++] = (t >>> 24) & 255,
                  n[i++] = 0,
                  n[i++] = 0,
                  n[i++] = 0,
                  n[i++] = 0,
                  o = 8;
                o < this.padLength;
                o++
              )
                n[i++] = 0;
            return n;
          });
      },
      { './utils': 77, 'minimalistic-assert': 92 },
    ],
    68: [
      function (t, e, r) {
        'use strict';
        var n = t('./utils'),
          i = t('minimalistic-assert');
        function o(t, e, r) {
          if (!(this instanceof o)) return new o(t, e, r);
          (this.Hash = t),
            (this.blockSize = t.blockSize / 8),
            (this.outSize = t.outSize / 8),
            (this.inner = null),
            (this.outer = null),
            this._init(n.toArray(e, r));
        }
        (e.exports = o),
          (o.prototype._init = function (t) {
            t.length > this.blockSize && (t = new this.Hash().update(t).digest()), i(t.length <= this.blockSize);
            for (var e = t.length; e < this.blockSize; e++) t.push(0);
            for (e = 0; e < t.length; e++) t[e] ^= 54;
            for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++) t[e] ^= 106;
            this.outer = new this.Hash().update(t);
          }),
          (o.prototype.update = function (t, e) {
            return this.inner.update(t, e), this;
          }),
          (o.prototype.digest = function (t) {
            return this.outer.update(this.inner.digest()), this.outer.digest(t);
          });
      },
      { './utils': 77, 'minimalistic-assert': 92 },
    ],
    69: [
      function (t, e, r) {
        'use strict';
        var n = t('./utils'),
          i = t('./common'),
          o = n.rotl32,
          a = n.sum32,
          s = n.sum32_3,
          f = n.sum32_4,
          u = i.BlockHash;
        function c() {
          if (!(this instanceof c)) return new c();
          u.call(this),
            (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
            (this.endian = 'little');
        }
        function h(t, e, r, n) {
          return t <= 15
            ? e ^ r ^ n
            : t <= 31
            ? (e & r) | (~e & n)
            : t <= 47
            ? (e | ~r) ^ n
            : t <= 63
            ? (e & n) | (r & ~n)
            : e ^ (r | ~n);
        }
        function d(t) {
          return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838;
        }
        function l(t) {
          return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0;
        }
        n.inherits(c, u),
          (r.ripemd160 = c),
          (c.blockSize = 512),
          (c.outSize = 160),
          (c.hmacStrength = 192),
          (c.padLength = 64),
          (c.prototype._update = function (t, e) {
            for (
              var r = this.h[0],
                n = this.h[1],
                i = this.h[2],
                u = this.h[3],
                c = this.h[4],
                g = r,
                y = n,
                w = i,
                _ = u,
                M = c,
                x = 0;
              x < 80;
              x++
            ) {
              var S = a(o(f(r, h(x, n, i, u), t[p[x] + e], d(x)), m[x]), c);
              (r = c),
                (c = u),
                (u = o(i, 10)),
                (i = n),
                (n = S),
                (S = a(o(f(g, h(79 - x, y, w, _), t[b[x] + e], l(x)), v[x]), M)),
                (g = M),
                (M = _),
                (_ = o(w, 10)),
                (w = y),
                (y = S);
            }
            (S = s(this.h[1], i, _)),
              (this.h[1] = s(this.h[2], u, M)),
              (this.h[2] = s(this.h[3], c, g)),
              (this.h[3] = s(this.h[4], r, y)),
              (this.h[4] = s(this.h[0], n, w)),
              (this.h[0] = S);
          }),
          (c.prototype._digest = function (t) {
            return 'hex' === t ? n.toHex32(this.h, 'little') : n.split32(this.h, 'little');
          });
        var p = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
            3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
            4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
          ],
          b = [
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
            15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
            12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
          ],
          m = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13,
            12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6,
            5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
          ],
          v = [
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13,
            11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5,
            15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
          ];
      },
      { './common': 67, './utils': 77 },
    ],
    70: [
      function (t, e, r) {
        'use strict';
        (r.sha1 = t('./sha/1')),
          (r.sha224 = t('./sha/224')),
          (r.sha256 = t('./sha/256')),
          (r.sha384 = t('./sha/384')),
          (r.sha512 = t('./sha/512'));
      },
      { './sha/1': 71, './sha/224': 72, './sha/256': 73, './sha/384': 74, './sha/512': 75 },
    ],
    71: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = t('../common'),
          o = t('./common'),
          a = n.rotl32,
          s = n.sum32,
          f = n.sum32_5,
          u = o.ft_1,
          c = i.BlockHash,
          h = [1518500249, 1859775393, 2400959708, 3395469782];
        function d() {
          if (!(this instanceof d)) return new d();
          c.call(this),
            (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
            (this.W = new Array(80));
        }
        n.inherits(d, c),
          (e.exports = d),
          (d.blockSize = 512),
          (d.outSize = 160),
          (d.hmacStrength = 80),
          (d.padLength = 64),
          (d.prototype._update = function (t, e) {
            for (var r = this.W, n = 0; n < 16; n++) r[n] = t[e + n];
            for (; n < r.length; n++) r[n] = a(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1);
            var i = this.h[0],
              o = this.h[1],
              c = this.h[2],
              d = this.h[3],
              l = this.h[4];
            for (n = 0; n < r.length; n++) {
              var p = ~~(n / 20),
                b = f(a(i, 5), u(p, o, c, d), l, r[n], h[p]);
              (l = d), (d = c), (c = a(o, 30)), (o = i), (i = b);
            }
            (this.h[0] = s(this.h[0], i)),
              (this.h[1] = s(this.h[1], o)),
              (this.h[2] = s(this.h[2], c)),
              (this.h[3] = s(this.h[3], d)),
              (this.h[4] = s(this.h[4], l));
          }),
          (d.prototype._digest = function (t) {
            return 'hex' === t ? n.toHex32(this.h, 'big') : n.split32(this.h, 'big');
          });
      },
      { '../common': 67, '../utils': 77, './common': 76 },
    ],
    72: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = t('./256');
        function o() {
          if (!(this instanceof o)) return new o();
          i.call(this),
            (this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
        }
        n.inherits(o, i),
          (e.exports = o),
          (o.blockSize = 512),
          (o.outSize = 224),
          (o.hmacStrength = 192),
          (o.padLength = 64),
          (o.prototype._digest = function (t) {
            return 'hex' === t ? n.toHex32(this.h.slice(0, 7), 'big') : n.split32(this.h.slice(0, 7), 'big');
          });
      },
      { '../utils': 77, './256': 73 },
    ],
    73: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = t('../common'),
          o = t('./common'),
          a = t('minimalistic-assert'),
          s = n.sum32,
          f = n.sum32_4,
          u = n.sum32_5,
          c = o.ch32,
          h = o.maj32,
          d = o.s0_256,
          l = o.s1_256,
          p = o.g0_256,
          b = o.g1_256,
          m = i.BlockHash,
          v = [
            1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080,
            310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
            264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808,
            3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
            1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817,
            3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
            1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298,
          ];
        function g() {
          if (!(this instanceof g)) return new g();
          m.call(this),
            (this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
            (this.k = v),
            (this.W = new Array(64));
        }
        n.inherits(g, m),
          (e.exports = g),
          (g.blockSize = 512),
          (g.outSize = 256),
          (g.hmacStrength = 192),
          (g.padLength = 64),
          (g.prototype._update = function (t, e) {
            for (var r = this.W, n = 0; n < 16; n++) r[n] = t[e + n];
            for (; n < r.length; n++) r[n] = f(b(r[n - 2]), r[n - 7], p(r[n - 15]), r[n - 16]);
            var i = this.h[0],
              o = this.h[1],
              m = this.h[2],
              v = this.h[3],
              g = this.h[4],
              y = this.h[5],
              w = this.h[6],
              _ = this.h[7];
            for (a(this.k.length === r.length), n = 0; n < r.length; n++) {
              var M = u(_, l(g), c(g, y, w), this.k[n], r[n]),
                x = s(d(i), h(i, o, m));
              (_ = w), (w = y), (y = g), (g = s(v, M)), (v = m), (m = o), (o = i), (i = s(M, x));
            }
            (this.h[0] = s(this.h[0], i)),
              (this.h[1] = s(this.h[1], o)),
              (this.h[2] = s(this.h[2], m)),
              (this.h[3] = s(this.h[3], v)),
              (this.h[4] = s(this.h[4], g)),
              (this.h[5] = s(this.h[5], y)),
              (this.h[6] = s(this.h[6], w)),
              (this.h[7] = s(this.h[7], _));
          }),
          (g.prototype._digest = function (t) {
            return 'hex' === t ? n.toHex32(this.h, 'big') : n.split32(this.h, 'big');
          });
      },
      { '../common': 67, '../utils': 77, './common': 76, 'minimalistic-assert': 92 },
    ],
    74: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = t('./512');
        function o() {
          if (!(this instanceof o)) return new o();
          i.call(this),
            (this.h = [
              3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415,
              4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428,
            ]);
        }
        n.inherits(o, i),
          (e.exports = o),
          (o.blockSize = 1024),
          (o.outSize = 384),
          (o.hmacStrength = 192),
          (o.padLength = 128),
          (o.prototype._digest = function (t) {
            return 'hex' === t ? n.toHex32(this.h.slice(0, 12), 'big') : n.split32(this.h.slice(0, 12), 'big');
          });
      },
      { '../utils': 77, './512': 75 },
    ],
    75: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils'),
          i = t('../common'),
          o = t('minimalistic-assert'),
          a = n.rotr64_hi,
          s = n.rotr64_lo,
          f = n.shr64_hi,
          u = n.shr64_lo,
          c = n.sum64,
          h = n.sum64_hi,
          d = n.sum64_lo,
          l = n.sum64_4_hi,
          p = n.sum64_4_lo,
          b = n.sum64_5_hi,
          m = n.sum64_5_lo,
          v = i.BlockHash,
          g = [
            1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163,
            4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
            310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206,
            991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
            264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692,
            3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
            3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
            168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
            1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921,
            1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
            3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616,
            1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
            1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452,
            2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
            3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271,
            4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
            685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470,
            3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591,
          ];
        function y() {
          if (!(this instanceof y)) return new y();
          v.call(this),
            (this.h = [
              1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129,
              1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209,
            ]),
            (this.k = g),
            (this.W = new Array(160));
        }
        function w(t, e, r, n, i) {
          var o = (t & r) ^ (~t & i);
          return o < 0 && (o += 4294967296), o;
        }
        function _(t, e, r, n, i, o) {
          var a = (e & n) ^ (~e & o);
          return a < 0 && (a += 4294967296), a;
        }
        function M(t, e, r, n, i) {
          var o = (t & r) ^ (t & i) ^ (r & i);
          return o < 0 && (o += 4294967296), o;
        }
        function x(t, e, r, n, i, o) {
          var a = (e & n) ^ (e & o) ^ (n & o);
          return a < 0 && (a += 4294967296), a;
        }
        function S(t, e) {
          var r = a(t, e, 28) ^ a(e, t, 2) ^ a(e, t, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function A(t, e) {
          var r = s(t, e, 28) ^ s(e, t, 2) ^ s(e, t, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function E(t, e) {
          var r = a(t, e, 14) ^ a(t, e, 18) ^ a(e, t, 9);
          return r < 0 && (r += 4294967296), r;
        }
        function k(t, e) {
          var r = s(t, e, 14) ^ s(t, e, 18) ^ s(e, t, 9);
          return r < 0 && (r += 4294967296), r;
        }
        function I(t, e) {
          var r = a(t, e, 1) ^ a(t, e, 8) ^ f(t, e, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function T(t, e) {
          var r = s(t, e, 1) ^ s(t, e, 8) ^ u(t, e, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function R(t, e) {
          var r = a(t, e, 19) ^ a(e, t, 29) ^ f(t, e, 6);
          return r < 0 && (r += 4294967296), r;
        }
        function j(t, e) {
          var r = s(t, e, 19) ^ s(e, t, 29) ^ u(t, e, 6);
          return r < 0 && (r += 4294967296), r;
        }
        n.inherits(y, v),
          (e.exports = y),
          (y.blockSize = 1024),
          (y.outSize = 512),
          (y.hmacStrength = 192),
          (y.padLength = 128),
          (y.prototype._prepareBlock = function (t, e) {
            for (var r = this.W, n = 0; n < 32; n++) r[n] = t[e + n];
            for (; n < r.length; n += 2) {
              var i = R(r[n - 4], r[n - 3]),
                o = j(r[n - 4], r[n - 3]),
                a = r[n - 14],
                s = r[n - 13],
                f = I(r[n - 30], r[n - 29]),
                u = T(r[n - 30], r[n - 29]),
                c = r[n - 32],
                h = r[n - 31];
              (r[n] = l(i, o, a, s, f, u, c, h)), (r[n + 1] = p(i, o, a, s, f, u, c, h));
            }
          }),
          (y.prototype._update = function (t, e) {
            this._prepareBlock(t, e);
            var r = this.W,
              n = this.h[0],
              i = this.h[1],
              a = this.h[2],
              s = this.h[3],
              f = this.h[4],
              u = this.h[5],
              l = this.h[6],
              p = this.h[7],
              v = this.h[8],
              g = this.h[9],
              y = this.h[10],
              I = this.h[11],
              T = this.h[12],
              R = this.h[13],
              j = this.h[14],
              O = this.h[15];
            o(this.k.length === r.length);
            for (var B = 0; B < r.length; B += 2) {
              var L = j,
                P = O,
                N = E(v, g),
                C = k(v, g),
                z = w(v, g, y, I, T),
                q = _(v, g, y, I, T, R),
                U = this.k[B],
                F = this.k[B + 1],
                D = r[B],
                K = r[B + 1],
                H = b(L, P, N, C, z, q, U, F, D, K),
                W = m(L, P, N, C, z, q, U, F, D, K);
              (L = S(n, i)), (P = A(n, i)), (N = M(n, i, a, s, f)), (C = x(n, i, a, s, f, u));
              var Z = h(L, P, N, C),
                V = d(L, P, N, C);
              (j = T),
                (O = R),
                (T = y),
                (R = I),
                (y = v),
                (I = g),
                (v = h(l, p, H, W)),
                (g = d(p, p, H, W)),
                (l = f),
                (p = u),
                (f = a),
                (u = s),
                (a = n),
                (s = i),
                (n = h(H, W, Z, V)),
                (i = d(H, W, Z, V));
            }
            c(this.h, 0, n, i),
              c(this.h, 2, a, s),
              c(this.h, 4, f, u),
              c(this.h, 6, l, p),
              c(this.h, 8, v, g),
              c(this.h, 10, y, I),
              c(this.h, 12, T, R),
              c(this.h, 14, j, O);
          }),
          (y.prototype._digest = function (t) {
            return 'hex' === t ? n.toHex32(this.h, 'big') : n.split32(this.h, 'big');
          });
      },
      { '../common': 67, '../utils': 77, 'minimalistic-assert': 92 },
    ],
    76: [
      function (t, e, r) {
        'use strict';
        var n = t('../utils').rotr32;
        function i(t, e, r) {
          return (t & e) ^ (~t & r);
        }
        function o(t, e, r) {
          return (t & e) ^ (t & r) ^ (e & r);
        }
        function a(t, e, r) {
          return t ^ e ^ r;
        }
        (r.ft_1 = function (t, e, r, n) {
          return 0 === t ? i(e, r, n) : 1 === t || 3 === t ? a(e, r, n) : 2 === t ? o(e, r, n) : void 0;
        }),
          (r.ch32 = i),
          (r.maj32 = o),
          (r.p32 = a),
          (r.s0_256 = function (t) {
            return n(t, 2) ^ n(t, 13) ^ n(t, 22);
          }),
          (r.s1_256 = function (t) {
            return n(t, 6) ^ n(t, 11) ^ n(t, 25);
          }),
          (r.g0_256 = function (t) {
            return n(t, 7) ^ n(t, 18) ^ (t >>> 3);
          }),
          (r.g1_256 = function (t) {
            return n(t, 17) ^ n(t, 19) ^ (t >>> 10);
          });
      },
      { '../utils': 77 },
    ],
    77: [
      function (t, e, r) {
        'use strict';
        var n = t('minimalistic-assert'),
          i = t('inherits');
        function o(t, e) {
          return (
            55296 == (64512 & t.charCodeAt(e)) &&
            !(e < 0 || e + 1 >= t.length) &&
            56320 == (64512 & t.charCodeAt(e + 1))
          );
        }
        function a(t) {
          return ((t >>> 24) | ((t >>> 8) & 65280) | ((t << 8) & 16711680) | ((255 & t) << 24)) >>> 0;
        }
        function s(t) {
          return 1 === t.length ? '0' + t : t;
        }
        function f(t) {
          return 7 === t.length
            ? '0' + t
            : 6 === t.length
            ? '00' + t
            : 5 === t.length
            ? '000' + t
            : 4 === t.length
            ? '0000' + t
            : 3 === t.length
            ? '00000' + t
            : 2 === t.length
            ? '000000' + t
            : 1 === t.length
            ? '0000000' + t
            : t;
        }
        (r.inherits = i),
          (r.toArray = function (t, e) {
            if (Array.isArray(t)) return t.slice();
            if (!t) return [];
            var r = [];
            if ('string' == typeof t)
              if (e) {
                if ('hex' === e)
                  for (
                    (t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 && (t = '0' + t), i = 0;
                    i < t.length;
                    i += 2
                  )
                    r.push(parseInt(t[i] + t[i + 1], 16));
              } else
                for (var n = 0, i = 0; i < t.length; i++) {
                  var a = t.charCodeAt(i);
                  a < 128
                    ? (r[n++] = a)
                    : a < 2048
                    ? ((r[n++] = (a >> 6) | 192), (r[n++] = (63 & a) | 128))
                    : o(t, i)
                    ? ((a = 65536 + ((1023 & a) << 10) + (1023 & t.charCodeAt(++i))),
                      (r[n++] = (a >> 18) | 240),
                      (r[n++] = ((a >> 12) & 63) | 128),
                      (r[n++] = ((a >> 6) & 63) | 128),
                      (r[n++] = (63 & a) | 128))
                    : ((r[n++] = (a >> 12) | 224), (r[n++] = ((a >> 6) & 63) | 128), (r[n++] = (63 & a) | 128));
                }
            else for (i = 0; i < t.length; i++) r[i] = 0 | t[i];
            return r;
          }),
          (r.toHex = function (t) {
            for (var e = '', r = 0; r < t.length; r++) e += s(t[r].toString(16));
            return e;
          }),
          (r.htonl = a),
          (r.toHex32 = function (t, e) {
            for (var r = '', n = 0; n < t.length; n++) {
              var i = t[n];
              'little' === e && (i = a(i)), (r += f(i.toString(16)));
            }
            return r;
          }),
          (r.zero2 = s),
          (r.zero8 = f),
          (r.join32 = function (t, e, r, i) {
            var o = r - e;
            n(o % 4 == 0);
            for (var a = new Array(o / 4), s = 0, f = e; s < a.length; s++, f += 4) {
              var u;
              (u =
                'big' === i
                  ? (t[f] << 24) | (t[f + 1] << 16) | (t[f + 2] << 8) | t[f + 3]
                  : (t[f + 3] << 24) | (t[f + 2] << 16) | (t[f + 1] << 8) | t[f]),
                (a[s] = u >>> 0);
            }
            return a;
          }),
          (r.split32 = function (t, e) {
            for (var r = new Array(4 * t.length), n = 0, i = 0; n < t.length; n++, i += 4) {
              var o = t[n];
              'big' === e
                ? ((r[i] = o >>> 24), (r[i + 1] = (o >>> 16) & 255), (r[i + 2] = (o >>> 8) & 255), (r[i + 3] = 255 & o))
                : ((r[i + 3] = o >>> 24),
                  (r[i + 2] = (o >>> 16) & 255),
                  (r[i + 1] = (o >>> 8) & 255),
                  (r[i] = 255 & o));
            }
            return r;
          }),
          (r.rotr32 = function (t, e) {
            return (t >>> e) | (t << (32 - e));
          }),
          (r.rotl32 = function (t, e) {
            return (t << e) | (t >>> (32 - e));
          }),
          (r.sum32 = function (t, e) {
            return (t + e) >>> 0;
          }),
          (r.sum32_3 = function (t, e, r) {
            return (t + e + r) >>> 0;
          }),
          (r.sum32_4 = function (t, e, r, n) {
            return (t + e + r + n) >>> 0;
          }),
          (r.sum32_5 = function (t, e, r, n, i) {
            return (t + e + r + n + i) >>> 0;
          }),
          (r.sum64 = function (t, e, r, n) {
            var i = t[e],
              o = (n + t[e + 1]) >>> 0,
              a = (o < n ? 1 : 0) + r + i;
            (t[e] = a >>> 0), (t[e + 1] = o);
          }),
          (r.sum64_hi = function (t, e, r, n) {
            return (((e + n) >>> 0 < e ? 1 : 0) + t + r) >>> 0;
          }),
          (r.sum64_lo = function (t, e, r, n) {
            return (e + n) >>> 0;
          }),
          (r.sum64_4_hi = function (t, e, r, n, i, o, a, s) {
            var f = 0,
              u = e;
            return (
              (f += (u = (u + n) >>> 0) < e ? 1 : 0),
              (f += (u = (u + o) >>> 0) < o ? 1 : 0),
              (t + r + i + a + (f += (u = (u + s) >>> 0) < s ? 1 : 0)) >>> 0
            );
          }),
          (r.sum64_4_lo = function (t, e, r, n, i, o, a, s) {
            return (e + n + o + s) >>> 0;
          }),
          (r.sum64_5_hi = function (t, e, r, n, i, o, a, s, f, u) {
            var c = 0,
              h = e;
            return (
              (c += (h = (h + n) >>> 0) < e ? 1 : 0),
              (c += (h = (h + o) >>> 0) < o ? 1 : 0),
              (c += (h = (h + s) >>> 0) < s ? 1 : 0),
              (t + r + i + a + f + (c += (h = (h + u) >>> 0) < u ? 1 : 0)) >>> 0
            );
          }),
          (r.sum64_5_lo = function (t, e, r, n, i, o, a, s, f, u) {
            return (e + n + o + s + u) >>> 0;
          }),
          (r.rotr64_hi = function (t, e, r) {
            return ((e << (32 - r)) | (t >>> r)) >>> 0;
          }),
          (r.rotr64_lo = function (t, e, r) {
            return ((t << (32 - r)) | (e >>> r)) >>> 0;
          }),
          (r.shr64_hi = function (t, e, r) {
            return t >>> r;
          }),
          (r.shr64_lo = function (t, e, r) {
            return ((t << (32 - r)) | (e >>> r)) >>> 0;
          });
      },
      { inherits: 80, 'minimalistic-assert': 92 },
    ],
    78: [
      function (t, e, r) {
        'use strict';
        var n = t('hash.js'),
          i = t('minimalistic-crypto-utils'),
          o = t('minimalistic-assert');
        function a(t) {
          if (!(this instanceof a)) return new a(t);
          (this.hash = t.hash),
            (this.predResist = !!t.predResist),
            (this.outLen = this.hash.outSize),
            (this.minEntropy = t.minEntropy || this.hash.hmacStrength),
            (this._reseed = null),
            (this.reseedInterval = null),
            (this.K = null),
            (this.V = null);
          var e = i.toArray(t.entropy, t.entropyEnc || 'hex'),
            r = i.toArray(t.nonce, t.nonceEnc || 'hex'),
            n = i.toArray(t.pers, t.persEnc || 'hex');
          o(e.length >= this.minEntropy / 8, 'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'),
            this._init(e, r, n);
        }
        (e.exports = a),
          (a.prototype._init = function (t, e, r) {
            var n = t.concat(e).concat(r);
            (this.K = new Array(this.outLen / 8)), (this.V = new Array(this.outLen / 8));
            for (var i = 0; i < this.V.length; i++) (this.K[i] = 0), (this.V[i] = 1);
            this._update(n), (this._reseed = 1), (this.reseedInterval = 281474976710656);
          }),
          (a.prototype._hmac = function () {
            return new n.hmac(this.hash, this.K);
          }),
          (a.prototype._update = function (t) {
            var e = this._hmac().update(this.V).update([0]);
            t && (e = e.update(t)),
              (this.K = e.digest()),
              (this.V = this._hmac().update(this.V).digest()),
              t &&
                ((this.K = this._hmac().update(this.V).update([1]).update(t).digest()),
                (this.V = this._hmac().update(this.V).digest()));
          }),
          (a.prototype.reseed = function (t, e, r, n) {
            'string' != typeof e && ((n = r), (r = e), (e = null)),
              (t = i.toArray(t, e)),
              (r = i.toArray(r, n)),
              o(t.length >= this.minEntropy / 8, 'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'),
              this._update(t.concat(r || [])),
              (this._reseed = 1);
          }),
          (a.prototype.generate = function (t, e, r, n) {
            if (this._reseed > this.reseedInterval) throw new Error('Reseed is required');
            'string' != typeof e && ((n = r), (r = e), (e = null)),
              r && ((r = i.toArray(r, n || 'hex')), this._update(r));
            for (var o = []; o.length < t; ) (this.V = this._hmac().update(this.V).digest()), (o = o.concat(this.V));
            var a = o.slice(0, t);
            return this._update(r), this._reseed++, i.encode(a, e);
          });
      },
      { 'hash.js': 66, 'minimalistic-assert': 92, 'minimalistic-crypto-utils': 93 },
    ],
    79: [
      function (t, e, r) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        (r.read = function (t, e, r, n, i) {
          var o,
            a,
            s = 8 * i - n - 1,
            f = (1 << s) - 1,
            u = f >> 1,
            c = -7,
            h = r ? i - 1 : 0,
            d = r ? -1 : 1,
            l = t[e + h];
          for (h += d, o = l & ((1 << -c) - 1), l >>= -c, c += s; c > 0; o = 256 * o + t[e + h], h += d, c -= 8);
          for (a = o & ((1 << -c) - 1), o >>= -c, c += n; c > 0; a = 256 * a + t[e + h], h += d, c -= 8);
          if (0 === o) o = 1 - u;
          else {
            if (o === f) return a ? NaN : (1 / 0) * (l ? -1 : 1);
            (a += Math.pow(2, n)), (o -= u);
          }
          return (l ? -1 : 1) * a * Math.pow(2, o - n);
        }),
          (r.write = function (t, e, r, n, i, o) {
            var a,
              s,
              f,
              u = 8 * o - i - 1,
              c = (1 << u) - 1,
              h = c >> 1,
              d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              l = n ? 0 : o - 1,
              p = n ? 1 : -1,
              b = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
            for (
              e = Math.abs(e),
                isNaN(e) || e === 1 / 0
                  ? ((s = isNaN(e) ? 1 : 0), (a = c))
                  : ((a = Math.floor(Math.log(e) / Math.LN2)),
                    e * (f = Math.pow(2, -a)) < 1 && (a--, (f *= 2)),
                    (e += a + h >= 1 ? d / f : d * Math.pow(2, 1 - h)) * f >= 2 && (a++, (f /= 2)),
                    a + h >= c
                      ? ((s = 0), (a = c))
                      : a + h >= 1
                      ? ((s = (e * f - 1) * Math.pow(2, i)), (a += h))
                      : ((s = e * Math.pow(2, h - 1) * Math.pow(2, i)), (a = 0)));
              i >= 8;
              t[r + l] = 255 & s, l += p, s /= 256, i -= 8
            );
            for (a = (a << i) | s, u += i; u > 0; t[r + l] = 255 & a, l += p, a /= 256, u -= 8);
            t[r + l - p] |= 128 * b;
          });
      },
      {},
    ],
    80: [
      function (t, e, r) {
        'function' == typeof Object.create
          ? (e.exports = function (t, e) {
              e &&
                ((t.super_ = e),
                (t.prototype = Object.create(e.prototype, {
                  constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
                })));
            })
          : (e.exports = function (t, e) {
              if (e) {
                t.super_ = e;
                var r = function () {};
                (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
              }
            });
      },
      {},
    ],
    81: [
      function (t, e, r) {
        function n(t) {
          return !!t.constructor && 'function' == typeof t.constructor.isBuffer && t.constructor.isBuffer(t);
        }
        /*!
         * Determine if an object is a Buffer
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        e.exports = function (t) {
          return (
            null != t &&
            (n(t) ||
              (function (t) {
                return 'function' == typeof t.readFloatLE && 'function' == typeof t.slice && n(t.slice(0, 0));
              })(t) ||
              !!t._isBuffer)
          );
        };
      },
      {},
    ],
    82: [
      function (t, e, r) {
        e.exports = function (t) {
          if ('string' != typeof t)
            throw new Error(
              "[is-hex-prefixed] value must be type 'string', is currently type " +
                typeof t +
                ', while checking isHexPrefixed.'
            );
          return '0x' === t.slice(0, 2);
        };
      },
      {},
    ],
    83: [
      function (t, e, r) {
        var n = {}.toString;
        e.exports =
          Array.isArray ||
          function (t) {
            return '[object Array]' == n.call(t);
          };
      },
      {},
    ],
    84: [
      function (t, e, r) {
        e.exports = t('./lib/api')(t('./lib/keccak'));
      },
      { './lib/api': 85, './lib/keccak': 89 },
    ],
    85: [
      function (t, e, r) {
        const n = t('./keccak'),
          i = t('./shake');
        e.exports = function (t) {
          const e = n(t),
            r = i(t);
          return function (t, n) {
            switch ('string' == typeof t ? t.toLowerCase() : t) {
              case 'keccak224':
                return new e(1152, 448, null, 224, n);
              case 'keccak256':
                return new e(1088, 512, null, 256, n);
              case 'keccak384':
                return new e(832, 768, null, 384, n);
              case 'keccak512':
                return new e(576, 1024, null, 512, n);
              case 'sha3-224':
                return new e(1152, 448, 6, 224, n);
              case 'sha3-256':
                return new e(1088, 512, 6, 256, n);
              case 'sha3-384':
                return new e(832, 768, 6, 384, n);
              case 'sha3-512':
                return new e(576, 1024, 6, 512, n);
              case 'shake128':
                return new r(1344, 256, 31, n);
              case 'shake256':
                return new r(1088, 512, 31, n);
              default:
                throw new Error('Invald algorithm: ' + t);
            }
          };
        };
      },
      { './keccak': 86, './shake': 87 },
    ],
    86: [
      function (t, e, r) {
        (function (r) {
          const { Transform: n } = t('stream');
          e.exports = (t) =>
            class e extends n {
              constructor(e, r, n, i, o) {
                super(o),
                  (this._rate = e),
                  (this._capacity = r),
                  (this._delimitedSuffix = n),
                  (this._hashBitLength = i),
                  (this._options = o),
                  (this._state = new t()),
                  this._state.initialize(e, r),
                  (this._finalized = !1);
              }
              _transform(t, e, r) {
                let n = null;
                try {
                  this.update(t, e);
                } catch (t) {
                  n = t;
                }
                r(n);
              }
              _flush(t) {
                let e = null;
                try {
                  this.push(this.digest());
                } catch (t) {
                  e = t;
                }
                t(e);
              }
              update(t, e) {
                if (!r.isBuffer(t) && 'string' != typeof t) throw new TypeError('Data must be a string or a buffer');
                if (this._finalized) throw new Error('Digest already called');
                return r.isBuffer(t) || (t = r.from(t, e)), this._state.absorb(t), this;
              }
              digest(t) {
                if (this._finalized) throw new Error('Digest already called');
                (this._finalized = !0), this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);
                let e = this._state.squeeze(this._hashBitLength / 8);
                return void 0 !== t && (e = e.toString(t)), this._resetState(), e;
              }
              _resetState() {
                return this._state.initialize(this._rate, this._capacity), this;
              }
              _clone() {
                const t = new e(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);
                return this._state.copy(t._state), (t._finalized = this._finalized), t;
              }
            };
        }.call(this, t('buffer').Buffer));
      },
      { buffer: 18, stream: 130 },
    ],
    87: [
      function (t, e, r) {
        (function (r) {
          const { Transform: n } = t('stream');
          e.exports = (t) =>
            class e extends n {
              constructor(e, r, n, i) {
                super(i),
                  (this._rate = e),
                  (this._capacity = r),
                  (this._delimitedSuffix = n),
                  (this._options = i),
                  (this._state = new t()),
                  this._state.initialize(e, r),
                  (this._finalized = !1);
              }
              _transform(t, e, r) {
                let n = null;
                try {
                  this.update(t, e);
                } catch (t) {
                  n = t;
                }
                r(n);
              }
              _flush() {}
              _read(t) {
                this.push(this.squeeze(t));
              }
              update(t, e) {
                if (!r.isBuffer(t) && 'string' != typeof t) throw new TypeError('Data must be a string or a buffer');
                if (this._finalized) throw new Error('Squeeze already called');
                return r.isBuffer(t) || (t = r.from(t, e)), this._state.absorb(t), this;
              }
              squeeze(t, e) {
                this._finalized || ((this._finalized = !0), this._state.absorbLastFewBits(this._delimitedSuffix));
                let r = this._state.squeeze(t);
                return void 0 !== e && (r = r.toString(e)), r;
              }
              _resetState() {
                return this._state.initialize(this._rate, this._capacity), this;
              }
              _clone() {
                const t = new e(this._rate, this._capacity, this._delimitedSuffix, this._options);
                return this._state.copy(t._state), (t._finalized = this._finalized), t;
              }
            };
        }.call(this, t('buffer').Buffer));
      },
      { buffer: 18, stream: 130 },
    ],
    88: [
      function (t, e, r) {
        const n = [
          1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648,
          32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
          2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
          2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648,
        ];
        r.p1600 = function (t) {
          for (let e = 0; e < 24; ++e) {
            const r = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
              i = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
              o = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
              a = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
              s = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
              f = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
              u = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
              c = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
              h = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
              d = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
            let l = h ^ ((o << 1) | (a >>> 31)),
              p = d ^ ((a << 1) | (o >>> 31));
            const b = t[0] ^ l,
              m = t[1] ^ p,
              v = t[10] ^ l,
              g = t[11] ^ p,
              y = t[20] ^ l,
              w = t[21] ^ p,
              _ = t[30] ^ l,
              M = t[31] ^ p,
              x = t[40] ^ l,
              S = t[41] ^ p;
            (l = r ^ ((s << 1) | (f >>> 31))), (p = i ^ ((f << 1) | (s >>> 31)));
            const A = t[2] ^ l,
              E = t[3] ^ p,
              k = t[12] ^ l,
              I = t[13] ^ p,
              T = t[22] ^ l,
              R = t[23] ^ p,
              j = t[32] ^ l,
              O = t[33] ^ p,
              B = t[42] ^ l,
              L = t[43] ^ p;
            (l = o ^ ((u << 1) | (c >>> 31))), (p = a ^ ((c << 1) | (u >>> 31)));
            const P = t[4] ^ l,
              N = t[5] ^ p,
              C = t[14] ^ l,
              z = t[15] ^ p,
              q = t[24] ^ l,
              U = t[25] ^ p,
              F = t[34] ^ l,
              D = t[35] ^ p,
              K = t[44] ^ l,
              H = t[45] ^ p;
            (l = s ^ ((h << 1) | (d >>> 31))), (p = f ^ ((d << 1) | (h >>> 31)));
            const W = t[6] ^ l,
              Z = t[7] ^ p,
              V = t[16] ^ l,
              $ = t[17] ^ p,
              Y = t[26] ^ l,
              G = t[27] ^ p,
              J = t[36] ^ l,
              X = t[37] ^ p,
              Q = t[46] ^ l,
              tt = t[47] ^ p;
            (l = u ^ ((r << 1) | (i >>> 31))), (p = c ^ ((i << 1) | (r >>> 31)));
            const et = t[8] ^ l,
              rt = t[9] ^ p,
              nt = t[18] ^ l,
              it = t[19] ^ p,
              ot = t[28] ^ l,
              at = t[29] ^ p,
              st = t[38] ^ l,
              ft = t[39] ^ p,
              ut = t[48] ^ l,
              ct = t[49] ^ p,
              ht = b,
              dt = m,
              lt = (g << 4) | (v >>> 28),
              pt = (v << 4) | (g >>> 28),
              bt = (y << 3) | (w >>> 29),
              mt = (w << 3) | (y >>> 29),
              vt = (M << 9) | (_ >>> 23),
              gt = (_ << 9) | (M >>> 23),
              yt = (x << 18) | (S >>> 14),
              wt = (S << 18) | (x >>> 14),
              _t = (A << 1) | (E >>> 31),
              Mt = (E << 1) | (A >>> 31),
              xt = (I << 12) | (k >>> 20),
              St = (k << 12) | (I >>> 20),
              At = (T << 10) | (R >>> 22),
              Et = (R << 10) | (T >>> 22),
              kt = (O << 13) | (j >>> 19),
              It = (j << 13) | (O >>> 19),
              Tt = (B << 2) | (L >>> 30),
              Rt = (L << 2) | (B >>> 30),
              jt = (N << 30) | (P >>> 2),
              Ot = (P << 30) | (N >>> 2),
              Bt = (C << 6) | (z >>> 26),
              Lt = (z << 6) | (C >>> 26),
              Pt = (U << 11) | (q >>> 21),
              Nt = (q << 11) | (U >>> 21),
              Ct = (F << 15) | (D >>> 17),
              zt = (D << 15) | (F >>> 17),
              qt = (H << 29) | (K >>> 3),
              Ut = (K << 29) | (H >>> 3),
              Ft = (W << 28) | (Z >>> 4),
              Dt = (Z << 28) | (W >>> 4),
              Kt = ($ << 23) | (V >>> 9),
              Ht = (V << 23) | ($ >>> 9),
              Wt = (Y << 25) | (G >>> 7),
              Zt = (G << 25) | (Y >>> 7),
              Vt = (J << 21) | (X >>> 11),
              $t = (X << 21) | (J >>> 11),
              Yt = (tt << 24) | (Q >>> 8),
              Gt = (Q << 24) | (tt >>> 8),
              Jt = (et << 27) | (rt >>> 5),
              Xt = (rt << 27) | (et >>> 5),
              Qt = (nt << 20) | (it >>> 12),
              te = (it << 20) | (nt >>> 12),
              ee = (at << 7) | (ot >>> 25),
              re = (ot << 7) | (at >>> 25),
              ne = (st << 8) | (ft >>> 24),
              ie = (ft << 8) | (st >>> 24),
              oe = (ut << 14) | (ct >>> 18),
              ae = (ct << 14) | (ut >>> 18);
            (t[0] = ht ^ (~xt & Pt)),
              (t[1] = dt ^ (~St & Nt)),
              (t[10] = Ft ^ (~Qt & bt)),
              (t[11] = Dt ^ (~te & mt)),
              (t[20] = _t ^ (~Bt & Wt)),
              (t[21] = Mt ^ (~Lt & Zt)),
              (t[30] = Jt ^ (~lt & At)),
              (t[31] = Xt ^ (~pt & Et)),
              (t[40] = jt ^ (~Kt & ee)),
              (t[41] = Ot ^ (~Ht & re)),
              (t[2] = xt ^ (~Pt & Vt)),
              (t[3] = St ^ (~Nt & $t)),
              (t[12] = Qt ^ (~bt & kt)),
              (t[13] = te ^ (~mt & It)),
              (t[22] = Bt ^ (~Wt & ne)),
              (t[23] = Lt ^ (~Zt & ie)),
              (t[32] = lt ^ (~At & Ct)),
              (t[33] = pt ^ (~Et & zt)),
              (t[42] = Kt ^ (~ee & vt)),
              (t[43] = Ht ^ (~re & gt)),
              (t[4] = Pt ^ (~Vt & oe)),
              (t[5] = Nt ^ (~$t & ae)),
              (t[14] = bt ^ (~kt & qt)),
              (t[15] = mt ^ (~It & Ut)),
              (t[24] = Wt ^ (~ne & yt)),
              (t[25] = Zt ^ (~ie & wt)),
              (t[34] = At ^ (~Ct & Yt)),
              (t[35] = Et ^ (~zt & Gt)),
              (t[44] = ee ^ (~vt & Tt)),
              (t[45] = re ^ (~gt & Rt)),
              (t[6] = Vt ^ (~oe & ht)),
              (t[7] = $t ^ (~ae & dt)),
              (t[16] = kt ^ (~qt & Ft)),
              (t[17] = It ^ (~Ut & Dt)),
              (t[26] = ne ^ (~yt & _t)),
              (t[27] = ie ^ (~wt & Mt)),
              (t[36] = Ct ^ (~Yt & Jt)),
              (t[37] = zt ^ (~Gt & Xt)),
              (t[46] = vt ^ (~Tt & jt)),
              (t[47] = gt ^ (~Rt & Ot)),
              (t[8] = oe ^ (~ht & xt)),
              (t[9] = ae ^ (~dt & St)),
              (t[18] = qt ^ (~Ft & Qt)),
              (t[19] = Ut ^ (~Dt & te)),
              (t[28] = yt ^ (~_t & Bt)),
              (t[29] = wt ^ (~Mt & Lt)),
              (t[38] = Yt ^ (~Jt & lt)),
              (t[39] = Gt ^ (~Xt & pt)),
              (t[48] = Tt ^ (~jt & Kt)),
              (t[49] = Rt ^ (~Ot & Ht)),
              (t[0] ^= n[2 * e]),
              (t[1] ^= n[2 * e + 1]);
          }
        };
      },
      {},
    ],
    89: [
      function (t, e, r) {
        (function (r) {
          const n = t('./keccak-state-unroll');
          function i() {
            (this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              (this.blockSize = null),
              (this.count = 0),
              (this.squeezing = !1);
          }
          (i.prototype.initialize = function (t, e) {
            for (let t = 0; t < 50; ++t) this.state[t] = 0;
            (this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1);
          }),
            (i.prototype.absorb = function (t) {
              for (let e = 0; e < t.length; ++e)
                (this.state[~~(this.count / 4)] ^= t[e] << ((this.count % 4) * 8)),
                  (this.count += 1),
                  this.count === this.blockSize && (n.p1600(this.state), (this.count = 0));
            }),
            (i.prototype.absorbLastFewBits = function (t) {
              (this.state[~~(this.count / 4)] ^= t << ((this.count % 4) * 8)),
                0 != (128 & t) && this.count === this.blockSize - 1 && n.p1600(this.state),
                (this.state[~~((this.blockSize - 1) / 4)] ^= 128 << (((this.blockSize - 1) % 4) * 8)),
                n.p1600(this.state),
                (this.count = 0),
                (this.squeezing = !0);
            }),
            (i.prototype.squeeze = function (t) {
              this.squeezing || this.absorbLastFewBits(1);
              const e = r.alloc(t);
              for (let r = 0; r < t; ++r)
                (e[r] = (this.state[~~(this.count / 4)] >>> ((this.count % 4) * 8)) & 255),
                  (this.count += 1),
                  this.count === this.blockSize && (n.p1600(this.state), (this.count = 0));
              return e;
            }),
            (i.prototype.copy = function (t) {
              for (let e = 0; e < 50; ++e) t.state[e] = this.state[e];
              (t.blockSize = this.blockSize), (t.count = this.count), (t.squeezing = this.squeezing);
            }),
            (e.exports = i);
        }.call(this, t('buffer').Buffer));
      },
      { './keccak-state-unroll': 88, buffer: 18 },
    ],
    90: [
      function (t, e, r) {
        (function (t) {
          (function () {
            var n = 'Expected a function',
              i = '__lodash_placeholder__',
              o = [
                ['ary', 128],
                ['bind', 1],
                ['bindKey', 2],
                ['curry', 8],
                ['curryRight', 16],
                ['flip', 512],
                ['partial', 32],
                ['partialRight', 64],
                ['rearg', 256],
              ],
              a = '[object Arguments]',
              s = '[object Array]',
              f = '[object Boolean]',
              u = '[object Date]',
              c = '[object Error]',
              h = '[object Function]',
              d = '[object GeneratorFunction]',
              l = '[object Map]',
              p = '[object Number]',
              b = '[object Object]',
              m = '[object RegExp]',
              v = '[object Set]',
              g = '[object String]',
              y = '[object Symbol]',
              w = '[object WeakMap]',
              _ = '[object ArrayBuffer]',
              M = '[object DataView]',
              x = '[object Float32Array]',
              S = '[object Float64Array]',
              A = '[object Int8Array]',
              E = '[object Int16Array]',
              k = '[object Int32Array]',
              I = '[object Uint8Array]',
              T = '[object Uint16Array]',
              R = '[object Uint32Array]',
              j = /\b__p \+= '';/g,
              O = /\b(__p \+=) '' \+/g,
              B = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
              L = /&(?:amp|lt|gt|quot|#39);/g,
              P = /[&<>"']/g,
              N = RegExp(L.source),
              C = RegExp(P.source),
              z = /<%-([\s\S]+?)%>/g,
              q = /<%([\s\S]+?)%>/g,
              U = /<%=([\s\S]+?)%>/g,
              F = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
              D = /^\w*$/,
              K = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              H = /[\\^$.*+?()[\]{}|]/g,
              W = RegExp(H.source),
              Z = /^\s+/,
              V = /\s/,
              $ = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
              Y = /\{\n\/\* \[wrapped with (.+)\] \*/,
              G = /,? & /,
              J = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
              X = /[()=,{}\[\]\/\s]/,
              Q = /\\(\\)?/g,
              tt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
              et = /\w*$/,
              rt = /^[-+]0x[0-9a-f]+$/i,
              nt = /^0b[01]+$/i,
              it = /^\[object .+?Constructor\]$/,
              ot = /^0o[0-7]+$/i,
              at = /^(?:0|[1-9]\d*)$/,
              st = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
              ft = /($^)/,
              ut = /['\n\r\u2028\u2029\\]/g,
              ct = '\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff',
              ht =
                '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
              dt = '[\\ud800-\\udfff]',
              lt = '[' + ht + ']',
              pt = '[' + ct + ']',
              bt = '\\d+',
              mt = '[\\u2700-\\u27bf]',
              vt = '[a-z\\xdf-\\xf6\\xf8-\\xff]',
              gt = '[^\\ud800-\\udfff' + ht + bt + '\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]',
              yt = '\\ud83c[\\udffb-\\udfff]',
              wt = '[^\\ud800-\\udfff]',
              _t = '(?:\\ud83c[\\udde6-\\uddff]){2}',
              Mt = '[\\ud800-\\udbff][\\udc00-\\udfff]',
              xt = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
              St = '(?:' + vt + '|' + gt + ')',
              At = '(?:' + xt + '|' + gt + ')',
              Et = '(?:' + pt + '|' + yt + ')' + '?',
              kt =
                '[\\ufe0e\\ufe0f]?' +
                Et +
                ('(?:\\u200d(?:' + [wt, _t, Mt].join('|') + ')[\\ufe0e\\ufe0f]?' + Et + ')*'),
              It = '(?:' + [mt, _t, Mt].join('|') + ')' + kt,
              Tt = '(?:' + [wt + pt + '?', pt, _t, Mt, dt].join('|') + ')',
              Rt = RegExp("['’]", 'g'),
              jt = RegExp(pt, 'g'),
              Ot = RegExp(yt + '(?=' + yt + ')|' + Tt + kt, 'g'),
              Bt = RegExp(
                [
                  xt + '?' + vt + "+(?:['’](?:d|ll|m|re|s|t|ve))?(?=" + [lt, xt, '$'].join('|') + ')',
                  At + "+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=" + [lt, xt + St, '$'].join('|') + ')',
                  xt + '?' + St + "+(?:['’](?:d|ll|m|re|s|t|ve))?",
                  xt + "+(?:['’](?:D|LL|M|RE|S|T|VE))?",
                  '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
                  '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
                  bt,
                  It,
                ].join('|'),
                'g'
              ),
              Lt = RegExp('[\\u200d\\ud800-\\udfff' + ct + '\\ufe0e\\ufe0f]'),
              Pt = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
              Nt = [
                'Array',
                'Buffer',
                'DataView',
                'Date',
                'Error',
                'Float32Array',
                'Float64Array',
                'Function',
                'Int8Array',
                'Int16Array',
                'Int32Array',
                'Map',
                'Math',
                'Object',
                'Promise',
                'RegExp',
                'Set',
                'String',
                'Symbol',
                'TypeError',
                'Uint8Array',
                'Uint8ClampedArray',
                'Uint16Array',
                'Uint32Array',
                'WeakMap',
                '_',
                'clearTimeout',
                'isFinite',
                'parseInt',
                'setTimeout',
              ],
              Ct = -1,
              zt = {};
            (zt[x] = zt[S] = zt[A] = zt[E] = zt[k] = zt[I] = zt['[object Uint8ClampedArray]'] = zt[T] = zt[R] = !0),
              (zt[a] =
                zt[s] =
                zt[_] =
                zt[f] =
                zt[M] =
                zt[u] =
                zt[c] =
                zt[h] =
                zt[l] =
                zt[p] =
                zt[b] =
                zt[m] =
                zt[v] =
                zt[g] =
                zt[w] =
                  !1);
            var qt = {};
            (qt[a] =
              qt[s] =
              qt[_] =
              qt[M] =
              qt[f] =
              qt[u] =
              qt[x] =
              qt[S] =
              qt[A] =
              qt[E] =
              qt[k] =
              qt[l] =
              qt[p] =
              qt[b] =
              qt[m] =
              qt[v] =
              qt[g] =
              qt[y] =
              qt[I] =
              qt['[object Uint8ClampedArray]'] =
              qt[T] =
              qt[R] =
                !0),
              (qt[c] = qt[h] = qt[w] = !1);
            var Ut = { '\\': '\\', "'": "'", '\n': 'n', '\r': 'r', '\u2028': 'u2028', '\u2029': 'u2029' },
              Ft = parseFloat,
              Dt = parseInt,
              Kt = 'object' == typeof t && t && t.Object === Object && t,
              Ht = 'object' == typeof self && self && self.Object === Object && self,
              Wt = Kt || Ht || Function('return this')(),
              Zt = 'object' == typeof r && r && !r.nodeType && r,
              Vt = Zt && 'object' == typeof e && e && !e.nodeType && e,
              $t = Vt && Vt.exports === Zt,
              Yt = $t && Kt.process,
              Gt = (function () {
                try {
                  var t = Vt && Vt.require && Vt.require('util').types;
                  return t || (Yt && Yt.binding && Yt.binding('util'));
                } catch (t) {}
              })(),
              Jt = Gt && Gt.isArrayBuffer,
              Xt = Gt && Gt.isDate,
              Qt = Gt && Gt.isMap,
              te = Gt && Gt.isRegExp,
              ee = Gt && Gt.isSet,
              re = Gt && Gt.isTypedArray;
            function ne(t, e, r) {
              switch (r.length) {
                case 0:
                  return t.call(e);
                case 1:
                  return t.call(e, r[0]);
                case 2:
                  return t.call(e, r[0], r[1]);
                case 3:
                  return t.call(e, r[0], r[1], r[2]);
              }
              return t.apply(e, r);
            }
            function ie(t, e, r, n) {
              for (var i = -1, o = null == t ? 0 : t.length; ++i < o; ) {
                var a = t[i];
                e(n, a, r(a), t);
              }
              return n;
            }
            function oe(t, e) {
              for (var r = -1, n = null == t ? 0 : t.length; ++r < n && !1 !== e(t[r], r, t); );
              return t;
            }
            function ae(t, e) {
              for (var r = null == t ? 0 : t.length; r-- && !1 !== e(t[r], r, t); );
              return t;
            }
            function se(t, e) {
              for (var r = -1, n = null == t ? 0 : t.length; ++r < n; ) if (!e(t[r], r, t)) return !1;
              return !0;
            }
            function fe(t, e) {
              for (var r = -1, n = null == t ? 0 : t.length, i = 0, o = []; ++r < n; ) {
                var a = t[r];
                e(a, r, t) && (o[i++] = a);
              }
              return o;
            }
            function ue(t, e) {
              return !!(null == t ? 0 : t.length) && ye(t, e, 0) > -1;
            }
            function ce(t, e, r) {
              for (var n = -1, i = null == t ? 0 : t.length; ++n < i; ) if (r(e, t[n])) return !0;
              return !1;
            }
            function he(t, e) {
              for (var r = -1, n = null == t ? 0 : t.length, i = Array(n); ++r < n; ) i[r] = e(t[r], r, t);
              return i;
            }
            function de(t, e) {
              for (var r = -1, n = e.length, i = t.length; ++r < n; ) t[i + r] = e[r];
              return t;
            }
            function le(t, e, r, n) {
              var i = -1,
                o = null == t ? 0 : t.length;
              for (n && o && (r = t[++i]); ++i < o; ) r = e(r, t[i], i, t);
              return r;
            }
            function pe(t, e, r, n) {
              var i = null == t ? 0 : t.length;
              for (n && i && (r = t[--i]); i--; ) r = e(r, t[i], i, t);
              return r;
            }
            function be(t, e) {
              for (var r = -1, n = null == t ? 0 : t.length; ++r < n; ) if (e(t[r], r, t)) return !0;
              return !1;
            }
            var me = xe('length');
            function ve(t, e, r) {
              var n;
              return (
                r(t, function (t, r, i) {
                  if (e(t, r, i)) return (n = r), !1;
                }),
                n
              );
            }
            function ge(t, e, r, n) {
              for (var i = t.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; ) if (e(t[o], o, t)) return o;
              return -1;
            }
            function ye(t, e, r) {
              return e == e
                ? (function (t, e, r) {
                    var n = r - 1,
                      i = t.length;
                    for (; ++n < i; ) if (t[n] === e) return n;
                    return -1;
                  })(t, e, r)
                : ge(t, _e, r);
            }
            function we(t, e, r, n) {
              for (var i = r - 1, o = t.length; ++i < o; ) if (n(t[i], e)) return i;
              return -1;
            }
            function _e(t) {
              return t != t;
            }
            function Me(t, e) {
              var r = null == t ? 0 : t.length;
              return r ? Ee(t, e) / r : NaN;
            }
            function xe(t) {
              return function (e) {
                return null == e ? void 0 : e[t];
              };
            }
            function Se(t) {
              return function (e) {
                return null == t ? void 0 : t[e];
              };
            }
            function Ae(t, e, r, n, i) {
              return (
                i(t, function (t, i, o) {
                  r = n ? ((n = !1), t) : e(r, t, i, o);
                }),
                r
              );
            }
            function Ee(t, e) {
              for (var r, n = -1, i = t.length; ++n < i; ) {
                var o = e(t[n]);
                void 0 !== o && (r = void 0 === r ? o : r + o);
              }
              return r;
            }
            function ke(t, e) {
              for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
              return n;
            }
            function Ie(t) {
              return t ? t.slice(0, Ze(t) + 1).replace(Z, '') : t;
            }
            function Te(t) {
              return function (e) {
                return t(e);
              };
            }
            function Re(t, e) {
              return he(e, function (e) {
                return t[e];
              });
            }
            function je(t, e) {
              return t.has(e);
            }
            function Oe(t, e) {
              for (var r = -1, n = t.length; ++r < n && ye(e, t[r], 0) > -1; );
              return r;
            }
            function Be(t, e) {
              for (var r = t.length; r-- && ye(e, t[r], 0) > -1; );
              return r;
            }
            function Le(t, e) {
              for (var r = t.length, n = 0; r--; ) t[r] === e && ++n;
              return n;
            }
            var Pe = Se({
                À: 'A',
                Á: 'A',
                Â: 'A',
                Ã: 'A',
                Ä: 'A',
                Å: 'A',
                à: 'a',
                á: 'a',
                â: 'a',
                ã: 'a',
                ä: 'a',
                å: 'a',
                Ç: 'C',
                ç: 'c',
                Ð: 'D',
                ð: 'd',
                È: 'E',
                É: 'E',
                Ê: 'E',
                Ë: 'E',
                è: 'e',
                é: 'e',
                ê: 'e',
                ë: 'e',
                Ì: 'I',
                Í: 'I',
                Î: 'I',
                Ï: 'I',
                ì: 'i',
                í: 'i',
                î: 'i',
                ï: 'i',
                Ñ: 'N',
                ñ: 'n',
                Ò: 'O',
                Ó: 'O',
                Ô: 'O',
                Õ: 'O',
                Ö: 'O',
                Ø: 'O',
                ò: 'o',
                ó: 'o',
                ô: 'o',
                õ: 'o',
                ö: 'o',
                ø: 'o',
                Ù: 'U',
                Ú: 'U',
                Û: 'U',
                Ü: 'U',
                ù: 'u',
                ú: 'u',
                û: 'u',
                ü: 'u',
                Ý: 'Y',
                ý: 'y',
                ÿ: 'y',
                Æ: 'Ae',
                æ: 'ae',
                Þ: 'Th',
                þ: 'th',
                ß: 'ss',
                Ā: 'A',
                Ă: 'A',
                Ą: 'A',
                ā: 'a',
                ă: 'a',
                ą: 'a',
                Ć: 'C',
                Ĉ: 'C',
                Ċ: 'C',
                Č: 'C',
                ć: 'c',
                ĉ: 'c',
                ċ: 'c',
                č: 'c',
                Ď: 'D',
                Đ: 'D',
                ď: 'd',
                đ: 'd',
                Ē: 'E',
                Ĕ: 'E',
                Ė: 'E',
                Ę: 'E',
                Ě: 'E',
                ē: 'e',
                ĕ: 'e',
                ė: 'e',
                ę: 'e',
                ě: 'e',
                Ĝ: 'G',
                Ğ: 'G',
                Ġ: 'G',
                Ģ: 'G',
                ĝ: 'g',
                ğ: 'g',
                ġ: 'g',
                ģ: 'g',
                Ĥ: 'H',
                Ħ: 'H',
                ĥ: 'h',
                ħ: 'h',
                Ĩ: 'I',
                Ī: 'I',
                Ĭ: 'I',
                Į: 'I',
                İ: 'I',
                ĩ: 'i',
                ī: 'i',
                ĭ: 'i',
                į: 'i',
                ı: 'i',
                Ĵ: 'J',
                ĵ: 'j',
                Ķ: 'K',
                ķ: 'k',
                ĸ: 'k',
                Ĺ: 'L',
                Ļ: 'L',
                Ľ: 'L',
                Ŀ: 'L',
                Ł: 'L',
                ĺ: 'l',
                ļ: 'l',
                ľ: 'l',
                ŀ: 'l',
                ł: 'l',
                Ń: 'N',
                Ņ: 'N',
                Ň: 'N',
                Ŋ: 'N',
                ń: 'n',
                ņ: 'n',
                ň: 'n',
                ŋ: 'n',
                Ō: 'O',
                Ŏ: 'O',
                Ő: 'O',
                ō: 'o',
                ŏ: 'o',
                ő: 'o',
                Ŕ: 'R',
                Ŗ: 'R',
                Ř: 'R',
                ŕ: 'r',
                ŗ: 'r',
                ř: 'r',
                Ś: 'S',
                Ŝ: 'S',
                Ş: 'S',
                Š: 'S',
                ś: 's',
                ŝ: 's',
                ş: 's',
                š: 's',
                Ţ: 'T',
                Ť: 'T',
                Ŧ: 'T',
                ţ: 't',
                ť: 't',
                ŧ: 't',
                Ũ: 'U',
                Ū: 'U',
                Ŭ: 'U',
                Ů: 'U',
                Ű: 'U',
                Ų: 'U',
                ũ: 'u',
                ū: 'u',
                ŭ: 'u',
                ů: 'u',
                ű: 'u',
                ų: 'u',
                Ŵ: 'W',
                ŵ: 'w',
                Ŷ: 'Y',
                ŷ: 'y',
                Ÿ: 'Y',
                Ź: 'Z',
                Ż: 'Z',
                Ž: 'Z',
                ź: 'z',
                ż: 'z',
                ž: 'z',
                Ĳ: 'IJ',
                ĳ: 'ij',
                Œ: 'Oe',
                œ: 'oe',
                ŉ: "'n",
                ſ: 's',
              }),
              Ne = Se({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' });
            function Ce(t) {
              return '\\' + Ut[t];
            }
            function ze(t) {
              return Lt.test(t);
            }
            function qe(t) {
              var e = -1,
                r = Array(t.size);
              return (
                t.forEach(function (t, n) {
                  r[++e] = [n, t];
                }),
                r
              );
            }
            function Ue(t, e) {
              return function (r) {
                return t(e(r));
              };
            }
            function Fe(t, e) {
              for (var r = -1, n = t.length, o = 0, a = []; ++r < n; ) {
                var s = t[r];
                (s !== e && s !== i) || ((t[r] = i), (a[o++] = r));
              }
              return a;
            }
            function De(t) {
              var e = -1,
                r = Array(t.size);
              return (
                t.forEach(function (t) {
                  r[++e] = t;
                }),
                r
              );
            }
            function Ke(t) {
              var e = -1,
                r = Array(t.size);
              return (
                t.forEach(function (t) {
                  r[++e] = [t, t];
                }),
                r
              );
            }
            function He(t) {
              return ze(t)
                ? (function (t) {
                    var e = (Ot.lastIndex = 0);
                    for (; Ot.test(t); ) ++e;
                    return e;
                  })(t)
                : me(t);
            }
            function We(t) {
              return ze(t)
                ? (function (t) {
                    return t.match(Ot) || [];
                  })(t)
                : (function (t) {
                    return t.split('');
                  })(t);
            }
            function Ze(t) {
              for (var e = t.length; e-- && V.test(t.charAt(e)); );
              return e;
            }
            var Ve = Se({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" });
            var $e = (function t(e) {
              var r,
                V = (e = null == e ? Wt : $e.defaults(Wt.Object(), e, $e.pick(Wt, Nt))).Array,
                ct = e.Date,
                ht = e.Error,
                dt = e.Function,
                lt = e.Math,
                pt = e.Object,
                bt = e.RegExp,
                mt = e.String,
                vt = e.TypeError,
                gt = V.prototype,
                yt = dt.prototype,
                wt = pt.prototype,
                _t = e['__core-js_shared__'],
                Mt = yt.toString,
                xt = wt.hasOwnProperty,
                St = 0,
                At = (r = /[^.]+$/.exec((_t && _t.keys && _t.keys.IE_PROTO) || '')) ? 'Symbol(src)_1.' + r : '',
                Et = wt.toString,
                kt = Mt.call(pt),
                It = Wt._,
                Tt = bt(
                  '^' +
                    Mt.call(xt)
                      .replace(H, '\\$&')
                      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                    '$'
                ),
                Ot = $t ? e.Buffer : void 0,
                Lt = e.Symbol,
                Ut = e.Uint8Array,
                Kt = Ot ? Ot.allocUnsafe : void 0,
                Ht = Ue(pt.getPrototypeOf, pt),
                Zt = pt.create,
                Vt = wt.propertyIsEnumerable,
                Yt = gt.splice,
                Gt = Lt ? Lt.isConcatSpreadable : void 0,
                me = Lt ? Lt.iterator : void 0,
                Se = Lt ? Lt.toStringTag : void 0,
                Ye = (function () {
                  try {
                    var t = to(pt, 'defineProperty');
                    return t({}, '', {}), t;
                  } catch (t) {}
                })(),
                Ge = e.clearTimeout !== Wt.clearTimeout && e.clearTimeout,
                Je = ct && ct.now !== Wt.Date.now && ct.now,
                Xe = e.setTimeout !== Wt.setTimeout && e.setTimeout,
                Qe = lt.ceil,
                tr = lt.floor,
                er = pt.getOwnPropertySymbols,
                rr = Ot ? Ot.isBuffer : void 0,
                nr = e.isFinite,
                ir = gt.join,
                or = Ue(pt.keys, pt),
                ar = lt.max,
                sr = lt.min,
                fr = ct.now,
                ur = e.parseInt,
                cr = lt.random,
                hr = gt.reverse,
                dr = to(e, 'DataView'),
                lr = to(e, 'Map'),
                pr = to(e, 'Promise'),
                br = to(e, 'Set'),
                mr = to(e, 'WeakMap'),
                vr = to(pt, 'create'),
                gr = mr && new mr(),
                yr = {},
                wr = Io(dr),
                _r = Io(lr),
                Mr = Io(pr),
                xr = Io(br),
                Sr = Io(mr),
                Ar = Lt ? Lt.prototype : void 0,
                Er = Ar ? Ar.valueOf : void 0,
                kr = Ar ? Ar.toString : void 0;
              function Ir(t) {
                if (Wa(t) && !La(t) && !(t instanceof Or)) {
                  if (t instanceof jr) return t;
                  if (xt.call(t, '__wrapped__')) return To(t);
                }
                return new jr(t);
              }
              var Tr = (function () {
                function t() {}
                return function (e) {
                  if (!Ha(e)) return {};
                  if (Zt) return Zt(e);
                  t.prototype = e;
                  var r = new t();
                  return (t.prototype = void 0), r;
                };
              })();
              function Rr() {}
              function jr(t, e) {
                (this.__wrapped__ = t),
                  (this.__actions__ = []),
                  (this.__chain__ = !!e),
                  (this.__index__ = 0),
                  (this.__values__ = void 0);
              }
              function Or(t) {
                (this.__wrapped__ = t),
                  (this.__actions__ = []),
                  (this.__dir__ = 1),
                  (this.__filtered__ = !1),
                  (this.__iteratees__ = []),
                  (this.__takeCount__ = 4294967295),
                  (this.__views__ = []);
              }
              function Br(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.clear(); ++e < r; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              function Lr(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.clear(); ++e < r; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              function Pr(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.clear(); ++e < r; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              function Nr(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.__data__ = new Pr(); ++e < r; ) this.add(t[e]);
              }
              function Cr(t) {
                var e = (this.__data__ = new Lr(t));
                this.size = e.size;
              }
              function zr(t, e) {
                var r = La(t),
                  n = !r && Ba(t),
                  i = !r && !n && za(t),
                  o = !r && !n && !i && Qa(t),
                  a = r || n || i || o,
                  s = a ? ke(t.length, mt) : [],
                  f = s.length;
                for (var u in t)
                  (!e && !xt.call(t, u)) ||
                    (a &&
                      ('length' == u ||
                        (i && ('offset' == u || 'parent' == u)) ||
                        (o && ('buffer' == u || 'byteLength' == u || 'byteOffset' == u)) ||
                        so(u, f))) ||
                    s.push(u);
                return s;
              }
              function qr(t) {
                var e = t.length;
                return e ? t[Cn(0, e - 1)] : void 0;
              }
              function Ur(t, e) {
                return Ao(gi(t), Yr(e, 0, t.length));
              }
              function Fr(t) {
                return Ao(gi(t));
              }
              function Dr(t, e, r) {
                ((void 0 !== r && !Ra(t[e], r)) || (void 0 === r && !(e in t))) && Vr(t, e, r);
              }
              function Kr(t, e, r) {
                var n = t[e];
                (xt.call(t, e) && Ra(n, r) && (void 0 !== r || e in t)) || Vr(t, e, r);
              }
              function Hr(t, e) {
                for (var r = t.length; r--; ) if (Ra(t[r][0], e)) return r;
                return -1;
              }
              function Wr(t, e, r, n) {
                return (
                  tn(t, function (t, i, o) {
                    e(n, t, r(t), o);
                  }),
                  n
                );
              }
              function Zr(t, e) {
                return t && yi(e, _s(e), t);
              }
              function Vr(t, e, r) {
                '__proto__' == e && Ye
                  ? Ye(t, e, { configurable: !0, enumerable: !0, value: r, writable: !0 })
                  : (t[e] = r);
              }
              function $r(t, e) {
                for (var r = -1, n = e.length, i = V(n), o = null == t; ++r < n; ) i[r] = o ? void 0 : ms(t, e[r]);
                return i;
              }
              function Yr(t, e, r) {
                return t == t && (void 0 !== r && (t = t <= r ? t : r), void 0 !== e && (t = t >= e ? t : e)), t;
              }
              function Gr(t, e, r, n, i, o) {
                var s,
                  c = 1 & e,
                  w = 2 & e,
                  j = 4 & e;
                if ((r && (s = i ? r(t, n, i, o) : r(t)), void 0 !== s)) return s;
                if (!Ha(t)) return t;
                var O = La(t);
                if (O) {
                  if (
                    ((s = (function (t) {
                      var e = t.length,
                        r = new t.constructor(e);
                      e && 'string' == typeof t[0] && xt.call(t, 'index') && ((r.index = t.index), (r.input = t.input));
                      return r;
                    })(t)),
                    !c)
                  )
                    return gi(t, s);
                } else {
                  var B = no(t),
                    L = B == h || B == d;
                  if (za(t)) return di(t, c);
                  if (B == b || B == a || (L && !i)) {
                    if (((s = w || L ? {} : oo(t)), !c))
                      return w
                        ? (function (t, e) {
                            return yi(t, ro(t), e);
                          })(
                            t,
                            (function (t, e) {
                              return t && yi(e, Ms(e), t);
                            })(s, t)
                          )
                        : (function (t, e) {
                            return yi(t, eo(t), e);
                          })(t, Zr(s, t));
                  } else {
                    if (!qt[B]) return i ? t : {};
                    s = (function (t, e, r) {
                      var n = t.constructor;
                      switch (e) {
                        case _:
                          return li(t);
                        case f:
                        case u:
                          return new n(+t);
                        case M:
                          return (function (t, e) {
                            var r = e ? li(t.buffer) : t.buffer;
                            return new t.constructor(r, t.byteOffset, t.byteLength);
                          })(t, r);
                        case x:
                        case S:
                        case A:
                        case E:
                        case k:
                        case I:
                        case '[object Uint8ClampedArray]':
                        case T:
                        case R:
                          return pi(t, r);
                        case l:
                          return new n();
                        case p:
                        case g:
                          return new n(t);
                        case m:
                          return (function (t) {
                            var e = new t.constructor(t.source, et.exec(t));
                            return (e.lastIndex = t.lastIndex), e;
                          })(t);
                        case v:
                          return new n();
                        case y:
                          return (i = t), Er ? pt(Er.call(i)) : {};
                      }
                      var i;
                    })(t, B, c);
                  }
                }
                o || (o = new Cr());
                var P = o.get(t);
                if (P) return P;
                o.set(t, s),
                  Ga(t)
                    ? t.forEach(function (n) {
                        s.add(Gr(n, e, r, n, t, o));
                      })
                    : Za(t) &&
                      t.forEach(function (n, i) {
                        s.set(i, Gr(n, e, r, i, t, o));
                      });
                var N = O ? void 0 : (j ? (w ? Vi : Zi) : w ? Ms : _s)(t);
                return (
                  oe(N || t, function (n, i) {
                    N && (n = t[(i = n)]), Kr(s, i, Gr(n, e, r, i, t, o));
                  }),
                  s
                );
              }
              function Jr(t, e, r) {
                var n = r.length;
                if (null == t) return !n;
                for (t = pt(t); n--; ) {
                  var i = r[n],
                    o = e[i],
                    a = t[i];
                  if ((void 0 === a && !(i in t)) || !o(a)) return !1;
                }
                return !0;
              }
              function Xr(t, e, r) {
                if ('function' != typeof t) throw new vt(n);
                return _o(function () {
                  t.apply(void 0, r);
                }, e);
              }
              function Qr(t, e, r, n) {
                var i = -1,
                  o = ue,
                  a = !0,
                  s = t.length,
                  f = [],
                  u = e.length;
                if (!s) return f;
                r && (e = he(e, Te(r))),
                  n ? ((o = ce), (a = !1)) : e.length >= 200 && ((o = je), (a = !1), (e = new Nr(e)));
                t: for (; ++i < s; ) {
                  var c = t[i],
                    h = null == r ? c : r(c);
                  if (((c = n || 0 !== c ? c : 0), a && h == h)) {
                    for (var d = u; d--; ) if (e[d] === h) continue t;
                    f.push(c);
                  } else o(e, h, n) || f.push(c);
                }
                return f;
              }
              (Ir.templateSettings = { escape: z, evaluate: q, interpolate: U, variable: '', imports: { _: Ir } }),
                (Ir.prototype = Rr.prototype),
                (Ir.prototype.constructor = Ir),
                (jr.prototype = Tr(Rr.prototype)),
                (jr.prototype.constructor = jr),
                (Or.prototype = Tr(Rr.prototype)),
                (Or.prototype.constructor = Or),
                (Br.prototype.clear = function () {
                  (this.__data__ = vr ? vr(null) : {}), (this.size = 0);
                }),
                (Br.prototype.delete = function (t) {
                  var e = this.has(t) && delete this.__data__[t];
                  return (this.size -= e ? 1 : 0), e;
                }),
                (Br.prototype.get = function (t) {
                  var e = this.__data__;
                  if (vr) {
                    var r = e[t];
                    return '__lodash_hash_undefined__' === r ? void 0 : r;
                  }
                  return xt.call(e, t) ? e[t] : void 0;
                }),
                (Br.prototype.has = function (t) {
                  var e = this.__data__;
                  return vr ? void 0 !== e[t] : xt.call(e, t);
                }),
                (Br.prototype.set = function (t, e) {
                  var r = this.__data__;
                  return (
                    (this.size += this.has(t) ? 0 : 1),
                    (r[t] = vr && void 0 === e ? '__lodash_hash_undefined__' : e),
                    this
                  );
                }),
                (Lr.prototype.clear = function () {
                  (this.__data__ = []), (this.size = 0);
                }),
                (Lr.prototype.delete = function (t) {
                  var e = this.__data__,
                    r = Hr(e, t);
                  return !(r < 0) && (r == e.length - 1 ? e.pop() : Yt.call(e, r, 1), --this.size, !0);
                }),
                (Lr.prototype.get = function (t) {
                  var e = this.__data__,
                    r = Hr(e, t);
                  return r < 0 ? void 0 : e[r][1];
                }),
                (Lr.prototype.has = function (t) {
                  return Hr(this.__data__, t) > -1;
                }),
                (Lr.prototype.set = function (t, e) {
                  var r = this.__data__,
                    n = Hr(r, t);
                  return n < 0 ? (++this.size, r.push([t, e])) : (r[n][1] = e), this;
                }),
                (Pr.prototype.clear = function () {
                  (this.size = 0), (this.__data__ = { hash: new Br(), map: new (lr || Lr)(), string: new Br() });
                }),
                (Pr.prototype.delete = function (t) {
                  var e = Xi(this, t).delete(t);
                  return (this.size -= e ? 1 : 0), e;
                }),
                (Pr.prototype.get = function (t) {
                  return Xi(this, t).get(t);
                }),
                (Pr.prototype.has = function (t) {
                  return Xi(this, t).has(t);
                }),
                (Pr.prototype.set = function (t, e) {
                  var r = Xi(this, t),
                    n = r.size;
                  return r.set(t, e), (this.size += r.size == n ? 0 : 1), this;
                }),
                (Nr.prototype.add = Nr.prototype.push =
                  function (t) {
                    return this.__data__.set(t, '__lodash_hash_undefined__'), this;
                  }),
                (Nr.prototype.has = function (t) {
                  return this.__data__.has(t);
                }),
                (Cr.prototype.clear = function () {
                  (this.__data__ = new Lr()), (this.size = 0);
                }),
                (Cr.prototype.delete = function (t) {
                  var e = this.__data__,
                    r = e.delete(t);
                  return (this.size = e.size), r;
                }),
                (Cr.prototype.get = function (t) {
                  return this.__data__.get(t);
                }),
                (Cr.prototype.has = function (t) {
                  return this.__data__.has(t);
                }),
                (Cr.prototype.set = function (t, e) {
                  var r = this.__data__;
                  if (r instanceof Lr) {
                    var n = r.__data__;
                    if (!lr || n.length < 199) return n.push([t, e]), (this.size = ++r.size), this;
                    r = this.__data__ = new Pr(n);
                  }
                  return r.set(t, e), (this.size = r.size), this;
                });
              var tn = Mi(un),
                en = Mi(cn, !0);
              function rn(t, e) {
                var r = !0;
                return (
                  tn(t, function (t, n, i) {
                    return (r = !!e(t, n, i));
                  }),
                  r
                );
              }
              function nn(t, e, r) {
                for (var n = -1, i = t.length; ++n < i; ) {
                  var o = t[n],
                    a = e(o);
                  if (null != a && (void 0 === s ? a == a && !Xa(a) : r(a, s)))
                    var s = a,
                      f = o;
                }
                return f;
              }
              function on(t, e) {
                var r = [];
                return (
                  tn(t, function (t, n, i) {
                    e(t, n, i) && r.push(t);
                  }),
                  r
                );
              }
              function an(t, e, r, n, i) {
                var o = -1,
                  a = t.length;
                for (r || (r = ao), i || (i = []); ++o < a; ) {
                  var s = t[o];
                  e > 0 && r(s) ? (e > 1 ? an(s, e - 1, r, n, i) : de(i, s)) : n || (i[i.length] = s);
                }
                return i;
              }
              var sn = xi(),
                fn = xi(!0);
              function un(t, e) {
                return t && sn(t, e, _s);
              }
              function cn(t, e) {
                return t && fn(t, e, _s);
              }
              function hn(t, e) {
                return fe(e, function (e) {
                  return Fa(t[e]);
                });
              }
              function dn(t, e) {
                for (var r = 0, n = (e = fi(e, t)).length; null != t && r < n; ) t = t[ko(e[r++])];
                return r && r == n ? t : void 0;
              }
              function ln(t, e, r) {
                var n = e(t);
                return La(t) ? n : de(n, r(t));
              }
              function pn(t) {
                return null == t
                  ? void 0 === t
                    ? '[object Undefined]'
                    : '[object Null]'
                  : Se && Se in pt(t)
                  ? (function (t) {
                      var e = xt.call(t, Se),
                        r = t[Se];
                      try {
                        t[Se] = void 0;
                        var n = !0;
                      } catch (t) {}
                      var i = Et.call(t);
                      n && (e ? (t[Se] = r) : delete t[Se]);
                      return i;
                    })(t)
                  : (function (t) {
                      return Et.call(t);
                    })(t);
              }
              function bn(t, e) {
                return t > e;
              }
              function mn(t, e) {
                return null != t && xt.call(t, e);
              }
              function vn(t, e) {
                return null != t && e in pt(t);
              }
              function gn(t, e, r) {
                for (var n = r ? ce : ue, i = t[0].length, o = t.length, a = o, s = V(o), f = 1 / 0, u = []; a--; ) {
                  var c = t[a];
                  a && e && (c = he(c, Te(e))),
                    (f = sr(c.length, f)),
                    (s[a] = !r && (e || (i >= 120 && c.length >= 120)) ? new Nr(a && c) : void 0);
                }
                c = t[0];
                var h = -1,
                  d = s[0];
                t: for (; ++h < i && u.length < f; ) {
                  var l = c[h],
                    p = e ? e(l) : l;
                  if (((l = r || 0 !== l ? l : 0), !(d ? je(d, p) : n(u, p, r)))) {
                    for (a = o; --a; ) {
                      var b = s[a];
                      if (!(b ? je(b, p) : n(t[a], p, r))) continue t;
                    }
                    d && d.push(p), u.push(l);
                  }
                }
                return u;
              }
              function yn(t, e, r) {
                var n = null == (t = vo(t, (e = fi(e, t)))) ? t : t[ko(Uo(e))];
                return null == n ? void 0 : ne(n, t, r);
              }
              function wn(t) {
                return Wa(t) && pn(t) == a;
              }
              function _n(t, e, r, n, i) {
                return (
                  t === e ||
                  (null == t || null == e || (!Wa(t) && !Wa(e))
                    ? t != t && e != e
                    : (function (t, e, r, n, i, o) {
                        var h = La(t),
                          d = La(e),
                          w = h ? s : no(t),
                          x = d ? s : no(e),
                          S = (w = w == a ? b : w) == b,
                          A = (x = x == a ? b : x) == b,
                          E = w == x;
                        if (E && za(t)) {
                          if (!za(e)) return !1;
                          (h = !0), (S = !1);
                        }
                        if (E && !S)
                          return (
                            o || (o = new Cr()),
                            h || Qa(t)
                              ? Hi(t, e, r, n, i, o)
                              : (function (t, e, r, n, i, o, a) {
                                  switch (r) {
                                    case M:
                                      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                                      (t = t.buffer), (e = e.buffer);
                                    case _:
                                      return !(t.byteLength != e.byteLength || !o(new Ut(t), new Ut(e)));
                                    case f:
                                    case u:
                                    case p:
                                      return Ra(+t, +e);
                                    case c:
                                      return t.name == e.name && t.message == e.message;
                                    case m:
                                    case g:
                                      return t == e + '';
                                    case l:
                                      var s = qe;
                                    case v:
                                      var h = 1 & n;
                                      if ((s || (s = De), t.size != e.size && !h)) return !1;
                                      var d = a.get(t);
                                      if (d) return d == e;
                                      (n |= 2), a.set(t, e);
                                      var b = Hi(s(t), s(e), n, i, o, a);
                                      return a.delete(t), b;
                                    case y:
                                      if (Er) return Er.call(t) == Er.call(e);
                                  }
                                  return !1;
                                })(t, e, w, r, n, i, o)
                          );
                        if (!(1 & r)) {
                          var k = S && xt.call(t, '__wrapped__'),
                            I = A && xt.call(e, '__wrapped__');
                          if (k || I) {
                            var T = k ? t.value() : t,
                              R = I ? e.value() : e;
                            return o || (o = new Cr()), i(T, R, r, n, o);
                          }
                        }
                        if (!E) return !1;
                        return (
                          o || (o = new Cr()),
                          (function (t, e, r, n, i, o) {
                            var a = 1 & r,
                              s = Zi(t),
                              f = s.length,
                              u = Zi(e).length;
                            if (f != u && !a) return !1;
                            var c = f;
                            for (; c--; ) {
                              var h = s[c];
                              if (!(a ? h in e : xt.call(e, h))) return !1;
                            }
                            var d = o.get(t),
                              l = o.get(e);
                            if (d && l) return d == e && l == t;
                            var p = !0;
                            o.set(t, e), o.set(e, t);
                            var b = a;
                            for (; ++c < f; ) {
                              h = s[c];
                              var m = t[h],
                                v = e[h];
                              if (n) var g = a ? n(v, m, h, e, t, o) : n(m, v, h, t, e, o);
                              if (!(void 0 === g ? m === v || i(m, v, r, n, o) : g)) {
                                p = !1;
                                break;
                              }
                              b || (b = 'constructor' == h);
                            }
                            if (p && !b) {
                              var y = t.constructor,
                                w = e.constructor;
                              y == w ||
                                !('constructor' in t) ||
                                !('constructor' in e) ||
                                ('function' == typeof y &&
                                  y instanceof y &&
                                  'function' == typeof w &&
                                  w instanceof w) ||
                                (p = !1);
                            }
                            return o.delete(t), o.delete(e), p;
                          })(t, e, r, n, i, o)
                        );
                      })(t, e, r, n, _n, i))
                );
              }
              function Mn(t, e, r, n) {
                var i = r.length,
                  o = i,
                  a = !n;
                if (null == t) return !o;
                for (t = pt(t); i--; ) {
                  var s = r[i];
                  if (a && s[2] ? s[1] !== t[s[0]] : !(s[0] in t)) return !1;
                }
                for (; ++i < o; ) {
                  var f = (s = r[i])[0],
                    u = t[f],
                    c = s[1];
                  if (a && s[2]) {
                    if (void 0 === u && !(f in t)) return !1;
                  } else {
                    var h = new Cr();
                    if (n) var d = n(u, c, f, t, e, h);
                    if (!(void 0 === d ? _n(c, u, 3, n, h) : d)) return !1;
                  }
                }
                return !0;
              }
              function xn(t) {
                return !(!Ha(t) || ((e = t), At && At in e)) && (Fa(t) ? Tt : it).test(Io(t));
                var e;
              }
              function Sn(t) {
                return 'function' == typeof t
                  ? t
                  : null == t
                  ? Vs
                  : 'object' == typeof t
                  ? La(t)
                    ? Rn(t[0], t[1])
                    : Tn(t)
                  : rf(t);
              }
              function An(t) {
                if (!lo(t)) return or(t);
                var e = [];
                for (var r in pt(t)) xt.call(t, r) && 'constructor' != r && e.push(r);
                return e;
              }
              function En(t) {
                if (!Ha(t))
                  return (function (t) {
                    var e = [];
                    if (null != t) for (var r in pt(t)) e.push(r);
                    return e;
                  })(t);
                var e = lo(t),
                  r = [];
                for (var n in t) ('constructor' != n || (!e && xt.call(t, n))) && r.push(n);
                return r;
              }
              function kn(t, e) {
                return t < e;
              }
              function In(t, e) {
                var r = -1,
                  n = Na(t) ? V(t.length) : [];
                return (
                  tn(t, function (t, i, o) {
                    n[++r] = e(t, i, o);
                  }),
                  n
                );
              }
              function Tn(t) {
                var e = Qi(t);
                return 1 == e.length && e[0][2]
                  ? bo(e[0][0], e[0][1])
                  : function (r) {
                      return r === t || Mn(r, t, e);
                    };
              }
              function Rn(t, e) {
                return uo(t) && po(e)
                  ? bo(ko(t), e)
                  : function (r) {
                      var n = ms(r, t);
                      return void 0 === n && n === e ? vs(r, t) : _n(e, n, 3);
                    };
              }
              function jn(t, e, r, n, i) {
                t !== e &&
                  sn(
                    e,
                    function (o, a) {
                      if ((i || (i = new Cr()), Ha(o)))
                        !(function (t, e, r, n, i, o, a) {
                          var s = yo(t, r),
                            f = yo(e, r),
                            u = a.get(f);
                          if (u) return void Dr(t, r, u);
                          var c = o ? o(s, f, r + '', t, e, a) : void 0,
                            h = void 0 === c;
                          if (h) {
                            var d = La(f),
                              l = !d && za(f),
                              p = !d && !l && Qa(f);
                            (c = f),
                              d || l || p
                                ? La(s)
                                  ? (c = s)
                                  : Ca(s)
                                  ? (c = gi(s))
                                  : l
                                  ? ((h = !1), (c = di(f, !0)))
                                  : p
                                  ? ((h = !1), (c = pi(f, !0)))
                                  : (c = [])
                                : $a(f) || Ba(f)
                                ? ((c = s), Ba(s) ? (c = ss(s)) : (Ha(s) && !Fa(s)) || (c = oo(f)))
                                : (h = !1);
                          }
                          h && (a.set(f, c), i(c, f, n, o, a), a.delete(f));
                          Dr(t, r, c);
                        })(t, e, a, r, jn, n, i);
                      else {
                        var s = n ? n(yo(t, a), o, a + '', t, e, i) : void 0;
                        void 0 === s && (s = o), Dr(t, a, s);
                      }
                    },
                    Ms
                  );
              }
              function On(t, e) {
                var r = t.length;
                if (r) return so((e += e < 0 ? r : 0), r) ? t[e] : void 0;
              }
              function Bn(t, e, r) {
                e = e.length
                  ? he(e, function (t) {
                      return La(t)
                        ? function (e) {
                            return dn(e, 1 === t.length ? t[0] : t);
                          }
                        : t;
                    })
                  : [Vs];
                var n = -1;
                return (
                  (e = he(e, Te(Ji()))),
                  (function (t, e) {
                    var r = t.length;
                    for (t.sort(e); r--; ) t[r] = t[r].value;
                    return t;
                  })(
                    In(t, function (t, r, i) {
                      return {
                        criteria: he(e, function (e) {
                          return e(t);
                        }),
                        index: ++n,
                        value: t,
                      };
                    }),
                    function (t, e) {
                      return (function (t, e, r) {
                        var n = -1,
                          i = t.criteria,
                          o = e.criteria,
                          a = i.length,
                          s = r.length;
                        for (; ++n < a; ) {
                          var f = bi(i[n], o[n]);
                          if (f) {
                            if (n >= s) return f;
                            var u = r[n];
                            return f * ('desc' == u ? -1 : 1);
                          }
                        }
                        return t.index - e.index;
                      })(t, e, r);
                    }
                  )
                );
              }
              function Ln(t, e, r) {
                for (var n = -1, i = e.length, o = {}; ++n < i; ) {
                  var a = e[n],
                    s = dn(t, a);
                  r(s, a) && Dn(o, fi(a, t), s);
                }
                return o;
              }
              function Pn(t, e, r, n) {
                var i = n ? we : ye,
                  o = -1,
                  a = e.length,
                  s = t;
                for (t === e && (e = gi(e)), r && (s = he(t, Te(r))); ++o < a; )
                  for (var f = 0, u = e[o], c = r ? r(u) : u; (f = i(s, c, f, n)) > -1; )
                    s !== t && Yt.call(s, f, 1), Yt.call(t, f, 1);
                return t;
              }
              function Nn(t, e) {
                for (var r = t ? e.length : 0, n = r - 1; r--; ) {
                  var i = e[r];
                  if (r == n || i !== o) {
                    var o = i;
                    so(i) ? Yt.call(t, i, 1) : ti(t, i);
                  }
                }
                return t;
              }
              function Cn(t, e) {
                return t + tr(cr() * (e - t + 1));
              }
              function zn(t, e) {
                var r = '';
                if (!t || e < 1 || e > 9007199254740991) return r;
                do {
                  e % 2 && (r += t), (e = tr(e / 2)) && (t += t);
                } while (e);
                return r;
              }
              function qn(t, e) {
                return Mo(mo(t, e, Vs), t + '');
              }
              function Un(t) {
                return qr(Rs(t));
              }
              function Fn(t, e) {
                var r = Rs(t);
                return Ao(r, Yr(e, 0, r.length));
              }
              function Dn(t, e, r, n) {
                if (!Ha(t)) return t;
                for (var i = -1, o = (e = fi(e, t)).length, a = o - 1, s = t; null != s && ++i < o; ) {
                  var f = ko(e[i]),
                    u = r;
                  if ('__proto__' === f || 'constructor' === f || 'prototype' === f) return t;
                  if (i != a) {
                    var c = s[f];
                    void 0 === (u = n ? n(c, f, s) : void 0) && (u = Ha(c) ? c : so(e[i + 1]) ? [] : {});
                  }
                  Kr(s, f, u), (s = s[f]);
                }
                return t;
              }
              var Kn = gr
                  ? function (t, e) {
                      return gr.set(t, e), t;
                    }
                  : Vs,
                Hn = Ye
                  ? function (t, e) {
                      return Ye(t, 'toString', { configurable: !0, enumerable: !1, value: Hs(e), writable: !0 });
                    }
                  : Vs;
              function Wn(t) {
                return Ao(Rs(t));
              }
              function Zn(t, e, r) {
                var n = -1,
                  i = t.length;
                e < 0 && (e = -e > i ? 0 : i + e),
                  (r = r > i ? i : r) < 0 && (r += i),
                  (i = e > r ? 0 : (r - e) >>> 0),
                  (e >>>= 0);
                for (var o = V(i); ++n < i; ) o[n] = t[n + e];
                return o;
              }
              function Vn(t, e) {
                var r;
                return (
                  tn(t, function (t, n, i) {
                    return !(r = e(t, n, i));
                  }),
                  !!r
                );
              }
              function $n(t, e, r) {
                var n = 0,
                  i = null == t ? n : t.length;
                if ('number' == typeof e && e == e && i <= 2147483647) {
                  for (; n < i; ) {
                    var o = (n + i) >>> 1,
                      a = t[o];
                    null !== a && !Xa(a) && (r ? a <= e : a < e) ? (n = o + 1) : (i = o);
                  }
                  return i;
                }
                return Yn(t, e, Vs, r);
              }
              function Yn(t, e, r, n) {
                var i = 0,
                  o = null == t ? 0 : t.length;
                if (0 === o) return 0;
                for (var a = (e = r(e)) != e, s = null === e, f = Xa(e), u = void 0 === e; i < o; ) {
                  var c = tr((i + o) / 2),
                    h = r(t[c]),
                    d = void 0 !== h,
                    l = null === h,
                    p = h == h,
                    b = Xa(h);
                  if (a) var m = n || p;
                  else
                    m = u
                      ? p && (n || d)
                      : s
                      ? p && d && (n || !l)
                      : f
                      ? p && d && !l && (n || !b)
                      : !l && !b && (n ? h <= e : h < e);
                  m ? (i = c + 1) : (o = c);
                }
                return sr(o, 4294967294);
              }
              function Gn(t, e) {
                for (var r = -1, n = t.length, i = 0, o = []; ++r < n; ) {
                  var a = t[r],
                    s = e ? e(a) : a;
                  if (!r || !Ra(s, f)) {
                    var f = s;
                    o[i++] = 0 === a ? 0 : a;
                  }
                }
                return o;
              }
              function Jn(t) {
                return 'number' == typeof t ? t : Xa(t) ? NaN : +t;
              }
              function Xn(t) {
                if ('string' == typeof t) return t;
                if (La(t)) return he(t, Xn) + '';
                if (Xa(t)) return kr ? kr.call(t) : '';
                var e = t + '';
                return '0' == e && 1 / t == -1 / 0 ? '-0' : e;
              }
              function Qn(t, e, r) {
                var n = -1,
                  i = ue,
                  o = t.length,
                  a = !0,
                  s = [],
                  f = s;
                if (r) (a = !1), (i = ce);
                else if (o >= 200) {
                  var u = e ? null : zi(t);
                  if (u) return De(u);
                  (a = !1), (i = je), (f = new Nr());
                } else f = e ? [] : s;
                t: for (; ++n < o; ) {
                  var c = t[n],
                    h = e ? e(c) : c;
                  if (((c = r || 0 !== c ? c : 0), a && h == h)) {
                    for (var d = f.length; d--; ) if (f[d] === h) continue t;
                    e && f.push(h), s.push(c);
                  } else i(f, h, r) || (f !== s && f.push(h), s.push(c));
                }
                return s;
              }
              function ti(t, e) {
                return null == (t = vo(t, (e = fi(e, t)))) || delete t[ko(Uo(e))];
              }
              function ei(t, e, r, n) {
                return Dn(t, e, r(dn(t, e)), n);
              }
              function ri(t, e, r, n) {
                for (var i = t.length, o = n ? i : -1; (n ? o-- : ++o < i) && e(t[o], o, t); );
                return r ? Zn(t, n ? 0 : o, n ? o + 1 : i) : Zn(t, n ? o + 1 : 0, n ? i : o);
              }
              function ni(t, e) {
                var r = t;
                return (
                  r instanceof Or && (r = r.value()),
                  le(
                    e,
                    function (t, e) {
                      return e.func.apply(e.thisArg, de([t], e.args));
                    },
                    r
                  )
                );
              }
              function ii(t, e, r) {
                var n = t.length;
                if (n < 2) return n ? Qn(t[0]) : [];
                for (var i = -1, o = V(n); ++i < n; )
                  for (var a = t[i], s = -1; ++s < n; ) s != i && (o[i] = Qr(o[i] || a, t[s], e, r));
                return Qn(an(o, 1), e, r);
              }
              function oi(t, e, r) {
                for (var n = -1, i = t.length, o = e.length, a = {}; ++n < i; ) {
                  var s = n < o ? e[n] : void 0;
                  r(a, t[n], s);
                }
                return a;
              }
              function ai(t) {
                return Ca(t) ? t : [];
              }
              function si(t) {
                return 'function' == typeof t ? t : Vs;
              }
              function fi(t, e) {
                return La(t) ? t : uo(t, e) ? [t] : Eo(fs(t));
              }
              var ui = qn;
              function ci(t, e, r) {
                var n = t.length;
                return (r = void 0 === r ? n : r), !e && r >= n ? t : Zn(t, e, r);
              }
              var hi =
                Ge ||
                function (t) {
                  return Wt.clearTimeout(t);
                };
              function di(t, e) {
                if (e) return t.slice();
                var r = t.length,
                  n = Kt ? Kt(r) : new t.constructor(r);
                return t.copy(n), n;
              }
              function li(t) {
                var e = new t.constructor(t.byteLength);
                return new Ut(e).set(new Ut(t)), e;
              }
              function pi(t, e) {
                var r = e ? li(t.buffer) : t.buffer;
                return new t.constructor(r, t.byteOffset, t.length);
              }
              function bi(t, e) {
                if (t !== e) {
                  var r = void 0 !== t,
                    n = null === t,
                    i = t == t,
                    o = Xa(t),
                    a = void 0 !== e,
                    s = null === e,
                    f = e == e,
                    u = Xa(e);
                  if ((!s && !u && !o && t > e) || (o && a && f && !s && !u) || (n && a && f) || (!r && f) || !i)
                    return 1;
                  if ((!n && !o && !u && t < e) || (u && r && i && !n && !o) || (s && r && i) || (!a && i) || !f)
                    return -1;
                }
                return 0;
              }
              function mi(t, e, r, n) {
                for (
                  var i = -1, o = t.length, a = r.length, s = -1, f = e.length, u = ar(o - a, 0), c = V(f + u), h = !n;
                  ++s < f;

                )
                  c[s] = e[s];
                for (; ++i < a; ) (h || i < o) && (c[r[i]] = t[i]);
                for (; u--; ) c[s++] = t[i++];
                return c;
              }
              function vi(t, e, r, n) {
                for (
                  var i = -1,
                    o = t.length,
                    a = -1,
                    s = r.length,
                    f = -1,
                    u = e.length,
                    c = ar(o - s, 0),
                    h = V(c + u),
                    d = !n;
                  ++i < c;

                )
                  h[i] = t[i];
                for (var l = i; ++f < u; ) h[l + f] = e[f];
                for (; ++a < s; ) (d || i < o) && (h[l + r[a]] = t[i++]);
                return h;
              }
              function gi(t, e) {
                var r = -1,
                  n = t.length;
                for (e || (e = V(n)); ++r < n; ) e[r] = t[r];
                return e;
              }
              function yi(t, e, r, n) {
                var i = !r;
                r || (r = {});
                for (var o = -1, a = e.length; ++o < a; ) {
                  var s = e[o],
                    f = n ? n(r[s], t[s], s, r, t) : void 0;
                  void 0 === f && (f = t[s]), i ? Vr(r, s, f) : Kr(r, s, f);
                }
                return r;
              }
              function wi(t, e) {
                return function (r, n) {
                  var i = La(r) ? ie : Wr,
                    o = e ? e() : {};
                  return i(r, t, Ji(n, 2), o);
                };
              }
              function _i(t) {
                return qn(function (e, r) {
                  var n = -1,
                    i = r.length,
                    o = i > 1 ? r[i - 1] : void 0,
                    a = i > 2 ? r[2] : void 0;
                  for (
                    o = t.length > 3 && 'function' == typeof o ? (i--, o) : void 0,
                      a && fo(r[0], r[1], a) && ((o = i < 3 ? void 0 : o), (i = 1)),
                      e = pt(e);
                    ++n < i;

                  ) {
                    var s = r[n];
                    s && t(e, s, n, o);
                  }
                  return e;
                });
              }
              function Mi(t, e) {
                return function (r, n) {
                  if (null == r) return r;
                  if (!Na(r)) return t(r, n);
                  for (var i = r.length, o = e ? i : -1, a = pt(r); (e ? o-- : ++o < i) && !1 !== n(a[o], o, a); );
                  return r;
                };
              }
              function xi(t) {
                return function (e, r, n) {
                  for (var i = -1, o = pt(e), a = n(e), s = a.length; s--; ) {
                    var f = a[t ? s : ++i];
                    if (!1 === r(o[f], f, o)) break;
                  }
                  return e;
                };
              }
              function Si(t) {
                return function (e) {
                  var r = ze((e = fs(e))) ? We(e) : void 0,
                    n = r ? r[0] : e.charAt(0),
                    i = r ? ci(r, 1).join('') : e.slice(1);
                  return n[t]() + i;
                };
              }
              function Ai(t) {
                return function (e) {
                  return le(Fs(Bs(e).replace(Rt, '')), t, '');
                };
              }
              function Ei(t) {
                return function () {
                  var e = arguments;
                  switch (e.length) {
                    case 0:
                      return new t();
                    case 1:
                      return new t(e[0]);
                    case 2:
                      return new t(e[0], e[1]);
                    case 3:
                      return new t(e[0], e[1], e[2]);
                    case 4:
                      return new t(e[0], e[1], e[2], e[3]);
                    case 5:
                      return new t(e[0], e[1], e[2], e[3], e[4]);
                    case 6:
                      return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                    case 7:
                      return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
                  }
                  var r = Tr(t.prototype),
                    n = t.apply(r, e);
                  return Ha(n) ? n : r;
                };
              }
              function ki(t) {
                return function (e, r, n) {
                  var i = pt(e);
                  if (!Na(e)) {
                    var o = Ji(r, 3);
                    (e = _s(e)),
                      (r = function (t) {
                        return o(i[t], t, i);
                      });
                  }
                  var a = t(e, r, n);
                  return a > -1 ? i[o ? e[a] : a] : void 0;
                };
              }
              function Ii(t) {
                return Wi(function (e) {
                  var r = e.length,
                    i = r,
                    o = jr.prototype.thru;
                  for (t && e.reverse(); i--; ) {
                    var a = e[i];
                    if ('function' != typeof a) throw new vt(n);
                    if (o && !s && 'wrapper' == Yi(a)) var s = new jr([], !0);
                  }
                  for (i = s ? i : r; ++i < r; ) {
                    var f = Yi((a = e[i])),
                      u = 'wrapper' == f ? $i(a) : void 0;
                    s =
                      u && co(u[0]) && 424 == u[1] && !u[4].length && 1 == u[9]
                        ? s[Yi(u[0])].apply(s, u[3])
                        : 1 == a.length && co(a)
                        ? s[f]()
                        : s.thru(a);
                  }
                  return function () {
                    var t = arguments,
                      n = t[0];
                    if (s && 1 == t.length && La(n)) return s.plant(n).value();
                    for (var i = 0, o = r ? e[i].apply(this, t) : n; ++i < r; ) o = e[i].call(this, o);
                    return o;
                  };
                });
              }
              function Ti(t, e, r, n, i, o, a, s, f, u) {
                var c = 128 & e,
                  h = 1 & e,
                  d = 2 & e,
                  l = 24 & e,
                  p = 512 & e,
                  b = d ? void 0 : Ei(t);
                return function m() {
                  for (var v = arguments.length, g = V(v), y = v; y--; ) g[y] = arguments[y];
                  if (l)
                    var w = Gi(m),
                      _ = Le(g, w);
                  if ((n && (g = mi(g, n, i, l)), o && (g = vi(g, o, a, l)), (v -= _), l && v < u)) {
                    var M = Fe(g, w);
                    return Ni(t, e, Ti, m.placeholder, r, g, M, s, f, u - v);
                  }
                  var x = h ? r : this,
                    S = d ? x[t] : t;
                  return (
                    (v = g.length),
                    s ? (g = go(g, s)) : p && v > 1 && g.reverse(),
                    c && f < v && (g.length = f),
                    this && this !== Wt && this instanceof m && (S = b || Ei(S)),
                    S.apply(x, g)
                  );
                };
              }
              function Ri(t, e) {
                return function (r, n) {
                  return (function (t, e, r, n) {
                    return (
                      un(t, function (t, i, o) {
                        e(n, r(t), i, o);
                      }),
                      n
                    );
                  })(r, t, e(n), {});
                };
              }
              function ji(t, e) {
                return function (r, n) {
                  var i;
                  if (void 0 === r && void 0 === n) return e;
                  if ((void 0 !== r && (i = r), void 0 !== n)) {
                    if (void 0 === i) return n;
                    'string' == typeof r || 'string' == typeof n
                      ? ((r = Xn(r)), (n = Xn(n)))
                      : ((r = Jn(r)), (n = Jn(n))),
                      (i = t(r, n));
                  }
                  return i;
                };
              }
              function Oi(t) {
                return Wi(function (e) {
                  return (
                    (e = he(e, Te(Ji()))),
                    qn(function (r) {
                      var n = this;
                      return t(e, function (t) {
                        return ne(t, n, r);
                      });
                    })
                  );
                });
              }
              function Bi(t, e) {
                var r = (e = void 0 === e ? ' ' : Xn(e)).length;
                if (r < 2) return r ? zn(e, t) : e;
                var n = zn(e, Qe(t / He(e)));
                return ze(e) ? ci(We(n), 0, t).join('') : n.slice(0, t);
              }
              function Li(t) {
                return function (e, r, n) {
                  return (
                    n && 'number' != typeof n && fo(e, r, n) && (r = n = void 0),
                    (e = ns(e)),
                    void 0 === r ? ((r = e), (e = 0)) : (r = ns(r)),
                    (function (t, e, r, n) {
                      for (var i = -1, o = ar(Qe((e - t) / (r || 1)), 0), a = V(o); o--; )
                        (a[n ? o : ++i] = t), (t += r);
                      return a;
                    })(e, r, (n = void 0 === n ? (e < r ? 1 : -1) : ns(n)), t)
                  );
                };
              }
              function Pi(t) {
                return function (e, r) {
                  return ('string' == typeof e && 'string' == typeof r) || ((e = as(e)), (r = as(r))), t(e, r);
                };
              }
              function Ni(t, e, r, n, i, o, a, s, f, u) {
                var c = 8 & e;
                (e |= c ? 32 : 64), 4 & (e &= ~(c ? 64 : 32)) || (e &= -4);
                var h = [t, e, i, c ? o : void 0, c ? a : void 0, c ? void 0 : o, c ? void 0 : a, s, f, u],
                  d = r.apply(void 0, h);
                return co(t) && wo(d, h), (d.placeholder = n), xo(d, t, e);
              }
              function Ci(t) {
                var e = lt[t];
                return function (t, r) {
                  if (((t = as(t)), (r = null == r ? 0 : sr(is(r), 292)) && nr(t))) {
                    var n = (fs(t) + 'e').split('e');
                    return +((n = (fs(e(n[0] + 'e' + (+n[1] + r))) + 'e').split('e'))[0] + 'e' + (+n[1] - r));
                  }
                  return e(t);
                };
              }
              var zi =
                br && 1 / De(new br([, -0]))[1] == 1 / 0
                  ? function (t) {
                      return new br(t);
                    }
                  : Xs;
              function qi(t) {
                return function (e) {
                  var r = no(e);
                  return r == l
                    ? qe(e)
                    : r == v
                    ? Ke(e)
                    : (function (t, e) {
                        return he(e, function (e) {
                          return [e, t[e]];
                        });
                      })(e, t(e));
                };
              }
              function Ui(t, e, r, o, a, s, f, u) {
                var c = 2 & e;
                if (!c && 'function' != typeof t) throw new vt(n);
                var h = o ? o.length : 0;
                if (
                  (h || ((e &= -97), (o = a = void 0)),
                  (f = void 0 === f ? f : ar(is(f), 0)),
                  (u = void 0 === u ? u : is(u)),
                  (h -= a ? a.length : 0),
                  64 & e)
                ) {
                  var d = o,
                    l = a;
                  o = a = void 0;
                }
                var p = c ? void 0 : $i(t),
                  b = [t, e, r, o, a, d, l, s, f, u];
                if (
                  (p &&
                    (function (t, e) {
                      var r = t[1],
                        n = e[1],
                        o = r | n,
                        a = o < 131,
                        s =
                          (128 == n && 8 == r) ||
                          (128 == n && 256 == r && t[7].length <= e[8]) ||
                          (384 == n && e[7].length <= e[8] && 8 == r);
                      if (!a && !s) return t;
                      1 & n && ((t[2] = e[2]), (o |= 1 & r ? 0 : 4));
                      var f = e[3];
                      if (f) {
                        var u = t[3];
                        (t[3] = u ? mi(u, f, e[4]) : f), (t[4] = u ? Fe(t[3], i) : e[4]);
                      }
                      (f = e[5]) && ((u = t[5]), (t[5] = u ? vi(u, f, e[6]) : f), (t[6] = u ? Fe(t[5], i) : e[6]));
                      (f = e[7]) && (t[7] = f);
                      128 & n && (t[8] = null == t[8] ? e[8] : sr(t[8], e[8]));
                      null == t[9] && (t[9] = e[9]);
                      (t[0] = e[0]), (t[1] = o);
                    })(b, p),
                  (t = b[0]),
                  (e = b[1]),
                  (r = b[2]),
                  (o = b[3]),
                  (a = b[4]),
                  !(u = b[9] = void 0 === b[9] ? (c ? 0 : t.length) : ar(b[9] - h, 0)) && 24 & e && (e &= -25),
                  e && 1 != e)
                )
                  m =
                    8 == e || 16 == e
                      ? (function (t, e, r) {
                          var n = Ei(t);
                          return function i() {
                            for (var o = arguments.length, a = V(o), s = o, f = Gi(i); s--; ) a[s] = arguments[s];
                            var u = o < 3 && a[0] !== f && a[o - 1] !== f ? [] : Fe(a, f);
                            if ((o -= u.length) < r)
                              return Ni(t, e, Ti, i.placeholder, void 0, a, u, void 0, void 0, r - o);
                            var c = this && this !== Wt && this instanceof i ? n : t;
                            return ne(c, this, a);
                          };
                        })(t, e, u)
                      : (32 != e && 33 != e) || a.length
                      ? Ti.apply(void 0, b)
                      : (function (t, e, r, n) {
                          var i = 1 & e,
                            o = Ei(t);
                          return function e() {
                            for (
                              var a = -1,
                                s = arguments.length,
                                f = -1,
                                u = n.length,
                                c = V(u + s),
                                h = this && this !== Wt && this instanceof e ? o : t;
                              ++f < u;

                            )
                              c[f] = n[f];
                            for (; s--; ) c[f++] = arguments[++a];
                            return ne(h, i ? r : this, c);
                          };
                        })(t, e, r, o);
                else
                  var m = (function (t, e, r) {
                    var n = 1 & e,
                      i = Ei(t);
                    return function e() {
                      var o = this && this !== Wt && this instanceof e ? i : t;
                      return o.apply(n ? r : this, arguments);
                    };
                  })(t, e, r);
                return xo((p ? Kn : wo)(m, b), t, e);
              }
              function Fi(t, e, r, n) {
                return void 0 === t || (Ra(t, wt[r]) && !xt.call(n, r)) ? e : t;
              }
              function Di(t, e, r, n, i, o) {
                return Ha(t) && Ha(e) && (o.set(e, t), jn(t, e, void 0, Di, o), o.delete(e)), t;
              }
              function Ki(t) {
                return $a(t) ? void 0 : t;
              }
              function Hi(t, e, r, n, i, o) {
                var a = 1 & r,
                  s = t.length,
                  f = e.length;
                if (s != f && !(a && f > s)) return !1;
                var u = o.get(t),
                  c = o.get(e);
                if (u && c) return u == e && c == t;
                var h = -1,
                  d = !0,
                  l = 2 & r ? new Nr() : void 0;
                for (o.set(t, e), o.set(e, t); ++h < s; ) {
                  var p = t[h],
                    b = e[h];
                  if (n) var m = a ? n(b, p, h, e, t, o) : n(p, b, h, t, e, o);
                  if (void 0 !== m) {
                    if (m) continue;
                    d = !1;
                    break;
                  }
                  if (l) {
                    if (
                      !be(e, function (t, e) {
                        if (!je(l, e) && (p === t || i(p, t, r, n, o))) return l.push(e);
                      })
                    ) {
                      d = !1;
                      break;
                    }
                  } else if (p !== b && !i(p, b, r, n, o)) {
                    d = !1;
                    break;
                  }
                }
                return o.delete(t), o.delete(e), d;
              }
              function Wi(t) {
                return Mo(mo(t, void 0, Po), t + '');
              }
              function Zi(t) {
                return ln(t, _s, eo);
              }
              function Vi(t) {
                return ln(t, Ms, ro);
              }
              var $i = gr
                ? function (t) {
                    return gr.get(t);
                  }
                : Xs;
              function Yi(t) {
                for (var e = t.name + '', r = yr[e], n = xt.call(yr, e) ? r.length : 0; n--; ) {
                  var i = r[n],
                    o = i.func;
                  if (null == o || o == t) return i.name;
                }
                return e;
              }
              function Gi(t) {
                return (xt.call(Ir, 'placeholder') ? Ir : t).placeholder;
              }
              function Ji() {
                var t = Ir.iteratee || $s;
                return (t = t === $s ? Sn : t), arguments.length ? t(arguments[0], arguments[1]) : t;
              }
              function Xi(t, e) {
                var r,
                  n,
                  i = t.__data__;
                return (
                  'string' == (n = typeof (r = e)) || 'number' == n || 'symbol' == n || 'boolean' == n
                    ? '__proto__' !== r
                    : null === r
                )
                  ? i['string' == typeof e ? 'string' : 'hash']
                  : i.map;
              }
              function Qi(t) {
                for (var e = _s(t), r = e.length; r--; ) {
                  var n = e[r],
                    i = t[n];
                  e[r] = [n, i, po(i)];
                }
                return e;
              }
              function to(t, e) {
                var r = (function (t, e) {
                  return null == t ? void 0 : t[e];
                })(t, e);
                return xn(r) ? r : void 0;
              }
              var eo = er
                  ? function (t) {
                      return null == t
                        ? []
                        : ((t = pt(t)),
                          fe(er(t), function (e) {
                            return Vt.call(t, e);
                          }));
                    }
                  : af,
                ro = er
                  ? function (t) {
                      for (var e = []; t; ) de(e, eo(t)), (t = Ht(t));
                      return e;
                    }
                  : af,
                no = pn;
              function io(t, e, r) {
                for (var n = -1, i = (e = fi(e, t)).length, o = !1; ++n < i; ) {
                  var a = ko(e[n]);
                  if (!(o = null != t && r(t, a))) break;
                  t = t[a];
                }
                return o || ++n != i ? o : !!(i = null == t ? 0 : t.length) && Ka(i) && so(a, i) && (La(t) || Ba(t));
              }
              function oo(t) {
                return 'function' != typeof t.constructor || lo(t) ? {} : Tr(Ht(t));
              }
              function ao(t) {
                return La(t) || Ba(t) || !!(Gt && t && t[Gt]);
              }
              function so(t, e) {
                var r = typeof t;
                return (
                  !!(e = null == e ? 9007199254740991 : e) &&
                  ('number' == r || ('symbol' != r && at.test(t))) &&
                  t > -1 &&
                  t % 1 == 0 &&
                  t < e
                );
              }
              function fo(t, e, r) {
                if (!Ha(r)) return !1;
                var n = typeof e;
                return !!('number' == n ? Na(r) && so(e, r.length) : 'string' == n && e in r) && Ra(r[e], t);
              }
              function uo(t, e) {
                if (La(t)) return !1;
                var r = typeof t;
                return (
                  !('number' != r && 'symbol' != r && 'boolean' != r && null != t && !Xa(t)) ||
                  D.test(t) ||
                  !F.test(t) ||
                  (null != e && t in pt(e))
                );
              }
              function co(t) {
                var e = Yi(t),
                  r = Ir[e];
                if ('function' != typeof r || !(e in Or.prototype)) return !1;
                if (t === r) return !0;
                var n = $i(r);
                return !!n && t === n[0];
              }
              ((dr && no(new dr(new ArrayBuffer(1))) != M) ||
                (lr && no(new lr()) != l) ||
                (pr && '[object Promise]' != no(pr.resolve())) ||
                (br && no(new br()) != v) ||
                (mr && no(new mr()) != w)) &&
                (no = function (t) {
                  var e = pn(t),
                    r = e == b ? t.constructor : void 0,
                    n = r ? Io(r) : '';
                  if (n)
                    switch (n) {
                      case wr:
                        return M;
                      case _r:
                        return l;
                      case Mr:
                        return '[object Promise]';
                      case xr:
                        return v;
                      case Sr:
                        return w;
                    }
                  return e;
                });
              var ho = _t ? Fa : sf;
              function lo(t) {
                var e = t && t.constructor;
                return t === (('function' == typeof e && e.prototype) || wt);
              }
              function po(t) {
                return t == t && !Ha(t);
              }
              function bo(t, e) {
                return function (r) {
                  return null != r && r[t] === e && (void 0 !== e || t in pt(r));
                };
              }
              function mo(t, e, r) {
                return (
                  (e = ar(void 0 === e ? t.length - 1 : e, 0)),
                  function () {
                    for (var n = arguments, i = -1, o = ar(n.length - e, 0), a = V(o); ++i < o; ) a[i] = n[e + i];
                    i = -1;
                    for (var s = V(e + 1); ++i < e; ) s[i] = n[i];
                    return (s[e] = r(a)), ne(t, this, s);
                  }
                );
              }
              function vo(t, e) {
                return e.length < 2 ? t : dn(t, Zn(e, 0, -1));
              }
              function go(t, e) {
                for (var r = t.length, n = sr(e.length, r), i = gi(t); n--; ) {
                  var o = e[n];
                  t[n] = so(o, r) ? i[o] : void 0;
                }
                return t;
              }
              function yo(t, e) {
                if (('constructor' !== e || 'function' != typeof t[e]) && '__proto__' != e) return t[e];
              }
              var wo = So(Kn),
                _o =
                  Xe ||
                  function (t, e) {
                    return Wt.setTimeout(t, e);
                  },
                Mo = So(Hn);
              function xo(t, e, r) {
                var n = e + '';
                return Mo(
                  t,
                  (function (t, e) {
                    var r = e.length;
                    if (!r) return t;
                    var n = r - 1;
                    return (
                      (e[n] = (r > 1 ? '& ' : '') + e[n]),
                      (e = e.join(r > 2 ? ', ' : ' ')),
                      t.replace($, '{\n/* [wrapped with ' + e + '] */\n')
                    );
                  })(
                    n,
                    (function (t, e) {
                      return (
                        oe(o, function (r) {
                          var n = '_.' + r[0];
                          e & r[1] && !ue(t, n) && t.push(n);
                        }),
                        t.sort()
                      );
                    })(
                      (function (t) {
                        var e = t.match(Y);
                        return e ? e[1].split(G) : [];
                      })(n),
                      r
                    )
                  )
                );
              }
              function So(t) {
                var e = 0,
                  r = 0;
                return function () {
                  var n = fr(),
                    i = 16 - (n - r);
                  if (((r = n), i > 0)) {
                    if (++e >= 800) return arguments[0];
                  } else e = 0;
                  return t.apply(void 0, arguments);
                };
              }
              function Ao(t, e) {
                var r = -1,
                  n = t.length,
                  i = n - 1;
                for (e = void 0 === e ? n : e; ++r < e; ) {
                  var o = Cn(r, i),
                    a = t[o];
                  (t[o] = t[r]), (t[r] = a);
                }
                return (t.length = e), t;
              }
              var Eo = (function (t) {
                var e = Sa(t, function (t) {
                    return 500 === r.size && r.clear(), t;
                  }),
                  r = e.cache;
                return e;
              })(function (t) {
                var e = [];
                return (
                  46 === t.charCodeAt(0) && e.push(''),
                  t.replace(K, function (t, r, n, i) {
                    e.push(n ? i.replace(Q, '$1') : r || t);
                  }),
                  e
                );
              });
              function ko(t) {
                if ('string' == typeof t || Xa(t)) return t;
                var e = t + '';
                return '0' == e && 1 / t == -1 / 0 ? '-0' : e;
              }
              function Io(t) {
                if (null != t) {
                  try {
                    return Mt.call(t);
                  } catch (t) {}
                  try {
                    return t + '';
                  } catch (t) {}
                }
                return '';
              }
              function To(t) {
                if (t instanceof Or) return t.clone();
                var e = new jr(t.__wrapped__, t.__chain__);
                return (
                  (e.__actions__ = gi(t.__actions__)), (e.__index__ = t.__index__), (e.__values__ = t.__values__), e
                );
              }
              var Ro = qn(function (t, e) {
                  return Ca(t) ? Qr(t, an(e, 1, Ca, !0)) : [];
                }),
                jo = qn(function (t, e) {
                  var r = Uo(e);
                  return Ca(r) && (r = void 0), Ca(t) ? Qr(t, an(e, 1, Ca, !0), Ji(r, 2)) : [];
                }),
                Oo = qn(function (t, e) {
                  var r = Uo(e);
                  return Ca(r) && (r = void 0), Ca(t) ? Qr(t, an(e, 1, Ca, !0), void 0, r) : [];
                });
              function Bo(t, e, r) {
                var n = null == t ? 0 : t.length;
                if (!n) return -1;
                var i = null == r ? 0 : is(r);
                return i < 0 && (i = ar(n + i, 0)), ge(t, Ji(e, 3), i);
              }
              function Lo(t, e, r) {
                var n = null == t ? 0 : t.length;
                if (!n) return -1;
                var i = n - 1;
                return void 0 !== r && ((i = is(r)), (i = r < 0 ? ar(n + i, 0) : sr(i, n - 1))), ge(t, Ji(e, 3), i, !0);
              }
              function Po(t) {
                return (null == t ? 0 : t.length) ? an(t, 1) : [];
              }
              function No(t) {
                return t && t.length ? t[0] : void 0;
              }
              var Co = qn(function (t) {
                  var e = he(t, ai);
                  return e.length && e[0] === t[0] ? gn(e) : [];
                }),
                zo = qn(function (t) {
                  var e = Uo(t),
                    r = he(t, ai);
                  return e === Uo(r) ? (e = void 0) : r.pop(), r.length && r[0] === t[0] ? gn(r, Ji(e, 2)) : [];
                }),
                qo = qn(function (t) {
                  var e = Uo(t),
                    r = he(t, ai);
                  return (
                    (e = 'function' == typeof e ? e : void 0) && r.pop(),
                    r.length && r[0] === t[0] ? gn(r, void 0, e) : []
                  );
                });
              function Uo(t) {
                var e = null == t ? 0 : t.length;
                return e ? t[e - 1] : void 0;
              }
              var Fo = qn(Do);
              function Do(t, e) {
                return t && t.length && e && e.length ? Pn(t, e) : t;
              }
              var Ko = Wi(function (t, e) {
                var r = null == t ? 0 : t.length,
                  n = $r(t, e);
                return (
                  Nn(
                    t,
                    he(e, function (t) {
                      return so(t, r) ? +t : t;
                    }).sort(bi)
                  ),
                  n
                );
              });
              function Ho(t) {
                return null == t ? t : hr.call(t);
              }
              var Wo = qn(function (t) {
                  return Qn(an(t, 1, Ca, !0));
                }),
                Zo = qn(function (t) {
                  var e = Uo(t);
                  return Ca(e) && (e = void 0), Qn(an(t, 1, Ca, !0), Ji(e, 2));
                }),
                Vo = qn(function (t) {
                  var e = Uo(t);
                  return (e = 'function' == typeof e ? e : void 0), Qn(an(t, 1, Ca, !0), void 0, e);
                });
              function $o(t) {
                if (!t || !t.length) return [];
                var e = 0;
                return (
                  (t = fe(t, function (t) {
                    if (Ca(t)) return (e = ar(t.length, e)), !0;
                  })),
                  ke(e, function (e) {
                    return he(t, xe(e));
                  })
                );
              }
              function Yo(t, e) {
                if (!t || !t.length) return [];
                var r = $o(t);
                return null == e
                  ? r
                  : he(r, function (t) {
                      return ne(e, void 0, t);
                    });
              }
              var Go = qn(function (t, e) {
                  return Ca(t) ? Qr(t, e) : [];
                }),
                Jo = qn(function (t) {
                  return ii(fe(t, Ca));
                }),
                Xo = qn(function (t) {
                  var e = Uo(t);
                  return Ca(e) && (e = void 0), ii(fe(t, Ca), Ji(e, 2));
                }),
                Qo = qn(function (t) {
                  var e = Uo(t);
                  return (e = 'function' == typeof e ? e : void 0), ii(fe(t, Ca), void 0, e);
                }),
                ta = qn($o);
              var ea = qn(function (t) {
                var e = t.length,
                  r = e > 1 ? t[e - 1] : void 0;
                return (r = 'function' == typeof r ? (t.pop(), r) : void 0), Yo(t, r);
              });
              function ra(t) {
                var e = Ir(t);
                return (e.__chain__ = !0), e;
              }
              function na(t, e) {
                return e(t);
              }
              var ia = Wi(function (t) {
                var e = t.length,
                  r = e ? t[0] : 0,
                  n = this.__wrapped__,
                  i = function (e) {
                    return $r(e, t);
                  };
                return !(e > 1 || this.__actions__.length) && n instanceof Or && so(r)
                  ? ((n = n.slice(r, +r + (e ? 1 : 0))).__actions__.push({ func: na, args: [i], thisArg: void 0 }),
                    new jr(n, this.__chain__).thru(function (t) {
                      return e && !t.length && t.push(void 0), t;
                    }))
                  : this.thru(i);
              });
              var oa = wi(function (t, e, r) {
                xt.call(t, r) ? ++t[r] : Vr(t, r, 1);
              });
              var aa = ki(Bo),
                sa = ki(Lo);
              function fa(t, e) {
                return (La(t) ? oe : tn)(t, Ji(e, 3));
              }
              function ua(t, e) {
                return (La(t) ? ae : en)(t, Ji(e, 3));
              }
              var ca = wi(function (t, e, r) {
                xt.call(t, r) ? t[r].push(e) : Vr(t, r, [e]);
              });
              var ha = qn(function (t, e, r) {
                  var n = -1,
                    i = 'function' == typeof e,
                    o = Na(t) ? V(t.length) : [];
                  return (
                    tn(t, function (t) {
                      o[++n] = i ? ne(e, t, r) : yn(t, e, r);
                    }),
                    o
                  );
                }),
                da = wi(function (t, e, r) {
                  Vr(t, r, e);
                });
              function la(t, e) {
                return (La(t) ? he : In)(t, Ji(e, 3));
              }
              var pa = wi(
                function (t, e, r) {
                  t[r ? 0 : 1].push(e);
                },
                function () {
                  return [[], []];
                }
              );
              var ba = qn(function (t, e) {
                  if (null == t) return [];
                  var r = e.length;
                  return (
                    r > 1 && fo(t, e[0], e[1]) ? (e = []) : r > 2 && fo(e[0], e[1], e[2]) && (e = [e[0]]),
                    Bn(t, an(e, 1), [])
                  );
                }),
                ma =
                  Je ||
                  function () {
                    return Wt.Date.now();
                  };
              function va(t, e, r) {
                return (
                  (e = r ? void 0 : e), Ui(t, 128, void 0, void 0, void 0, void 0, (e = t && null == e ? t.length : e))
                );
              }
              function ga(t, e) {
                var r;
                if ('function' != typeof e) throw new vt(n);
                return (
                  (t = is(t)),
                  function () {
                    return --t > 0 && (r = e.apply(this, arguments)), t <= 1 && (e = void 0), r;
                  }
                );
              }
              var ya = qn(function (t, e, r) {
                  var n = 1;
                  if (r.length) {
                    var i = Fe(r, Gi(ya));
                    n |= 32;
                  }
                  return Ui(t, n, e, r, i);
                }),
                wa = qn(function (t, e, r) {
                  var n = 3;
                  if (r.length) {
                    var i = Fe(r, Gi(wa));
                    n |= 32;
                  }
                  return Ui(e, n, t, r, i);
                });
              function _a(t, e, r) {
                var i,
                  o,
                  a,
                  s,
                  f,
                  u,
                  c = 0,
                  h = !1,
                  d = !1,
                  l = !0;
                if ('function' != typeof t) throw new vt(n);
                function p(e) {
                  var r = i,
                    n = o;
                  return (i = o = void 0), (c = e), (s = t.apply(n, r));
                }
                function b(t) {
                  return (c = t), (f = _o(v, e)), h ? p(t) : s;
                }
                function m(t) {
                  var r = t - u;
                  return void 0 === u || r >= e || r < 0 || (d && t - c >= a);
                }
                function v() {
                  var t = ma();
                  if (m(t)) return g(t);
                  f = _o(
                    v,
                    (function (t) {
                      var r = e - (t - u);
                      return d ? sr(r, a - (t - c)) : r;
                    })(t)
                  );
                }
                function g(t) {
                  return (f = void 0), l && i ? p(t) : ((i = o = void 0), s);
                }
                function y() {
                  var t = ma(),
                    r = m(t);
                  if (((i = arguments), (o = this), (u = t), r)) {
                    if (void 0 === f) return b(u);
                    if (d) return hi(f), (f = _o(v, e)), p(u);
                  }
                  return void 0 === f && (f = _o(v, e)), s;
                }
                return (
                  (e = as(e) || 0),
                  Ha(r) &&
                    ((h = !!r.leading),
                    (a = (d = 'maxWait' in r) ? ar(as(r.maxWait) || 0, e) : a),
                    (l = 'trailing' in r ? !!r.trailing : l)),
                  (y.cancel = function () {
                    void 0 !== f && hi(f), (c = 0), (i = u = o = f = void 0);
                  }),
                  (y.flush = function () {
                    return void 0 === f ? s : g(ma());
                  }),
                  y
                );
              }
              var Ma = qn(function (t, e) {
                  return Xr(t, 1, e);
                }),
                xa = qn(function (t, e, r) {
                  return Xr(t, as(e) || 0, r);
                });
              function Sa(t, e) {
                if ('function' != typeof t || (null != e && 'function' != typeof e)) throw new vt(n);
                var r = function () {
                  var n = arguments,
                    i = e ? e.apply(this, n) : n[0],
                    o = r.cache;
                  if (o.has(i)) return o.get(i);
                  var a = t.apply(this, n);
                  return (r.cache = o.set(i, a) || o), a;
                };
                return (r.cache = new (Sa.Cache || Pr)()), r;
              }
              function Aa(t) {
                if ('function' != typeof t) throw new vt(n);
                return function () {
                  var e = arguments;
                  switch (e.length) {
                    case 0:
                      return !t.call(this);
                    case 1:
                      return !t.call(this, e[0]);
                    case 2:
                      return !t.call(this, e[0], e[1]);
                    case 3:
                      return !t.call(this, e[0], e[1], e[2]);
                  }
                  return !t.apply(this, e);
                };
              }
              Sa.Cache = Pr;
              var Ea = ui(function (t, e) {
                  var r = (e = 1 == e.length && La(e[0]) ? he(e[0], Te(Ji())) : he(an(e, 1), Te(Ji()))).length;
                  return qn(function (n) {
                    for (var i = -1, o = sr(n.length, r); ++i < o; ) n[i] = e[i].call(this, n[i]);
                    return ne(t, this, n);
                  });
                }),
                ka = qn(function (t, e) {
                  return Ui(t, 32, void 0, e, Fe(e, Gi(ka)));
                }),
                Ia = qn(function (t, e) {
                  return Ui(t, 64, void 0, e, Fe(e, Gi(Ia)));
                }),
                Ta = Wi(function (t, e) {
                  return Ui(t, 256, void 0, void 0, void 0, e);
                });
              function Ra(t, e) {
                return t === e || (t != t && e != e);
              }
              var ja = Pi(bn),
                Oa = Pi(function (t, e) {
                  return t >= e;
                }),
                Ba = wn(
                  (function () {
                    return arguments;
                  })()
                )
                  ? wn
                  : function (t) {
                      return Wa(t) && xt.call(t, 'callee') && !Vt.call(t, 'callee');
                    },
                La = V.isArray,
                Pa = Jt
                  ? Te(Jt)
                  : function (t) {
                      return Wa(t) && pn(t) == _;
                    };
              function Na(t) {
                return null != t && Ka(t.length) && !Fa(t);
              }
              function Ca(t) {
                return Wa(t) && Na(t);
              }
              var za = rr || sf,
                qa = Xt
                  ? Te(Xt)
                  : function (t) {
                      return Wa(t) && pn(t) == u;
                    };
              function Ua(t) {
                if (!Wa(t)) return !1;
                var e = pn(t);
                return (
                  e == c ||
                  '[object DOMException]' == e ||
                  ('string' == typeof t.message && 'string' == typeof t.name && !$a(t))
                );
              }
              function Fa(t) {
                if (!Ha(t)) return !1;
                var e = pn(t);
                return e == h || e == d || '[object AsyncFunction]' == e || '[object Proxy]' == e;
              }
              function Da(t) {
                return 'number' == typeof t && t == is(t);
              }
              function Ka(t) {
                return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991;
              }
              function Ha(t) {
                var e = typeof t;
                return null != t && ('object' == e || 'function' == e);
              }
              function Wa(t) {
                return null != t && 'object' == typeof t;
              }
              var Za = Qt
                ? Te(Qt)
                : function (t) {
                    return Wa(t) && no(t) == l;
                  };
              function Va(t) {
                return 'number' == typeof t || (Wa(t) && pn(t) == p);
              }
              function $a(t) {
                if (!Wa(t) || pn(t) != b) return !1;
                var e = Ht(t);
                if (null === e) return !0;
                var r = xt.call(e, 'constructor') && e.constructor;
                return 'function' == typeof r && r instanceof r && Mt.call(r) == kt;
              }
              var Ya = te
                ? Te(te)
                : function (t) {
                    return Wa(t) && pn(t) == m;
                  };
              var Ga = ee
                ? Te(ee)
                : function (t) {
                    return Wa(t) && no(t) == v;
                  };
              function Ja(t) {
                return 'string' == typeof t || (!La(t) && Wa(t) && pn(t) == g);
              }
              function Xa(t) {
                return 'symbol' == typeof t || (Wa(t) && pn(t) == y);
              }
              var Qa = re
                ? Te(re)
                : function (t) {
                    return Wa(t) && Ka(t.length) && !!zt[pn(t)];
                  };
              var ts = Pi(kn),
                es = Pi(function (t, e) {
                  return t <= e;
                });
              function rs(t) {
                if (!t) return [];
                if (Na(t)) return Ja(t) ? We(t) : gi(t);
                if (me && t[me])
                  return (function (t) {
                    for (var e, r = []; !(e = t.next()).done; ) r.push(e.value);
                    return r;
                  })(t[me]());
                var e = no(t);
                return (e == l ? qe : e == v ? De : Rs)(t);
              }
              function ns(t) {
                return t
                  ? (t = as(t)) === 1 / 0 || t === -1 / 0
                    ? 17976931348623157e292 * (t < 0 ? -1 : 1)
                    : t == t
                    ? t
                    : 0
                  : 0 === t
                  ? t
                  : 0;
              }
              function is(t) {
                var e = ns(t),
                  r = e % 1;
                return e == e ? (r ? e - r : e) : 0;
              }
              function os(t) {
                return t ? Yr(is(t), 0, 4294967295) : 0;
              }
              function as(t) {
                if ('number' == typeof t) return t;
                if (Xa(t)) return NaN;
                if (Ha(t)) {
                  var e = 'function' == typeof t.valueOf ? t.valueOf() : t;
                  t = Ha(e) ? e + '' : e;
                }
                if ('string' != typeof t) return 0 === t ? t : +t;
                t = Ie(t);
                var r = nt.test(t);
                return r || ot.test(t) ? Dt(t.slice(2), r ? 2 : 8) : rt.test(t) ? NaN : +t;
              }
              function ss(t) {
                return yi(t, Ms(t));
              }
              function fs(t) {
                return null == t ? '' : Xn(t);
              }
              var us = _i(function (t, e) {
                  if (lo(e) || Na(e)) yi(e, _s(e), t);
                  else for (var r in e) xt.call(e, r) && Kr(t, r, e[r]);
                }),
                cs = _i(function (t, e) {
                  yi(e, Ms(e), t);
                }),
                hs = _i(function (t, e, r, n) {
                  yi(e, Ms(e), t, n);
                }),
                ds = _i(function (t, e, r, n) {
                  yi(e, _s(e), t, n);
                }),
                ls = Wi($r);
              var ps = qn(function (t, e) {
                  t = pt(t);
                  var r = -1,
                    n = e.length,
                    i = n > 2 ? e[2] : void 0;
                  for (i && fo(e[0], e[1], i) && (n = 1); ++r < n; )
                    for (var o = e[r], a = Ms(o), s = -1, f = a.length; ++s < f; ) {
                      var u = a[s],
                        c = t[u];
                      (void 0 === c || (Ra(c, wt[u]) && !xt.call(t, u))) && (t[u] = o[u]);
                    }
                  return t;
                }),
                bs = qn(function (t) {
                  return t.push(void 0, Di), ne(Ss, void 0, t);
                });
              function ms(t, e, r) {
                var n = null == t ? void 0 : dn(t, e);
                return void 0 === n ? r : n;
              }
              function vs(t, e) {
                return null != t && io(t, e, vn);
              }
              var gs = Ri(function (t, e, r) {
                  null != e && 'function' != typeof e.toString && (e = Et.call(e)), (t[e] = r);
                }, Hs(Vs)),
                ys = Ri(function (t, e, r) {
                  null != e && 'function' != typeof e.toString && (e = Et.call(e)),
                    xt.call(t, e) ? t[e].push(r) : (t[e] = [r]);
                }, Ji),
                ws = qn(yn);
              function _s(t) {
                return Na(t) ? zr(t) : An(t);
              }
              function Ms(t) {
                return Na(t) ? zr(t, !0) : En(t);
              }
              var xs = _i(function (t, e, r) {
                  jn(t, e, r);
                }),
                Ss = _i(function (t, e, r, n) {
                  jn(t, e, r, n);
                }),
                As = Wi(function (t, e) {
                  var r = {};
                  if (null == t) return r;
                  var n = !1;
                  (e = he(e, function (e) {
                    return (e = fi(e, t)), n || (n = e.length > 1), e;
                  })),
                    yi(t, Vi(t), r),
                    n && (r = Gr(r, 7, Ki));
                  for (var i = e.length; i--; ) ti(r, e[i]);
                  return r;
                });
              var Es = Wi(function (t, e) {
                return null == t
                  ? {}
                  : (function (t, e) {
                      return Ln(t, e, function (e, r) {
                        return vs(t, r);
                      });
                    })(t, e);
              });
              function ks(t, e) {
                if (null == t) return {};
                var r = he(Vi(t), function (t) {
                  return [t];
                });
                return (
                  (e = Ji(e)),
                  Ln(t, r, function (t, r) {
                    return e(t, r[0]);
                  })
                );
              }
              var Is = qi(_s),
                Ts = qi(Ms);
              function Rs(t) {
                return null == t ? [] : Re(t, _s(t));
              }
              var js = Ai(function (t, e, r) {
                return (e = e.toLowerCase()), t + (r ? Os(e) : e);
              });
              function Os(t) {
                return Us(fs(t).toLowerCase());
              }
              function Bs(t) {
                return (t = fs(t)) && t.replace(st, Pe).replace(jt, '');
              }
              var Ls = Ai(function (t, e, r) {
                  return t + (r ? '-' : '') + e.toLowerCase();
                }),
                Ps = Ai(function (t, e, r) {
                  return t + (r ? ' ' : '') + e.toLowerCase();
                }),
                Ns = Si('toLowerCase');
              var Cs = Ai(function (t, e, r) {
                return t + (r ? '_' : '') + e.toLowerCase();
              });
              var zs = Ai(function (t, e, r) {
                return t + (r ? ' ' : '') + Us(e);
              });
              var qs = Ai(function (t, e, r) {
                  return t + (r ? ' ' : '') + e.toUpperCase();
                }),
                Us = Si('toUpperCase');
              function Fs(t, e, r) {
                return (
                  (t = fs(t)),
                  void 0 === (e = r ? void 0 : e)
                    ? (function (t) {
                        return Pt.test(t);
                      })(t)
                      ? (function (t) {
                          return t.match(Bt) || [];
                        })(t)
                      : (function (t) {
                          return t.match(J) || [];
                        })(t)
                    : t.match(e) || []
                );
              }
              var Ds = qn(function (t, e) {
                  try {
                    return ne(t, void 0, e);
                  } catch (t) {
                    return Ua(t) ? t : new ht(t);
                  }
                }),
                Ks = Wi(function (t, e) {
                  return (
                    oe(e, function (e) {
                      (e = ko(e)), Vr(t, e, ya(t[e], t));
                    }),
                    t
                  );
                });
              function Hs(t) {
                return function () {
                  return t;
                };
              }
              var Ws = Ii(),
                Zs = Ii(!0);
              function Vs(t) {
                return t;
              }
              function $s(t) {
                return Sn('function' == typeof t ? t : Gr(t, 1));
              }
              var Ys = qn(function (t, e) {
                  return function (r) {
                    return yn(r, t, e);
                  };
                }),
                Gs = qn(function (t, e) {
                  return function (r) {
                    return yn(t, r, e);
                  };
                });
              function Js(t, e, r) {
                var n = _s(e),
                  i = hn(e, n);
                null != r || (Ha(e) && (i.length || !n.length)) || ((r = e), (e = t), (t = this), (i = hn(e, _s(e))));
                var o = !(Ha(r) && 'chain' in r && !r.chain),
                  a = Fa(t);
                return (
                  oe(i, function (r) {
                    var n = e[r];
                    (t[r] = n),
                      a &&
                        (t.prototype[r] = function () {
                          var e = this.__chain__;
                          if (o || e) {
                            var r = t(this.__wrapped__),
                              i = (r.__actions__ = gi(this.__actions__));
                            return i.push({ func: n, args: arguments, thisArg: t }), (r.__chain__ = e), r;
                          }
                          return n.apply(t, de([this.value()], arguments));
                        });
                  }),
                  t
                );
              }
              function Xs() {}
              var Qs = Oi(he),
                tf = Oi(se),
                ef = Oi(be);
              function rf(t) {
                return uo(t)
                  ? xe(ko(t))
                  : (function (t) {
                      return function (e) {
                        return dn(e, t);
                      };
                    })(t);
              }
              var nf = Li(),
                of = Li(!0);
              function af() {
                return [];
              }
              function sf() {
                return !1;
              }
              var ff = ji(function (t, e) {
                  return t + e;
                }, 0),
                uf = Ci('ceil'),
                cf = ji(function (t, e) {
                  return t / e;
                }, 1),
                hf = Ci('floor');
              var df,
                lf = ji(function (t, e) {
                  return t * e;
                }, 1),
                pf = Ci('round'),
                bf = ji(function (t, e) {
                  return t - e;
                }, 0);
              return (
                (Ir.after = function (t, e) {
                  if ('function' != typeof e) throw new vt(n);
                  return (
                    (t = is(t)),
                    function () {
                      if (--t < 1) return e.apply(this, arguments);
                    }
                  );
                }),
                (Ir.ary = va),
                (Ir.assign = us),
                (Ir.assignIn = cs),
                (Ir.assignInWith = hs),
                (Ir.assignWith = ds),
                (Ir.at = ls),
                (Ir.before = ga),
                (Ir.bind = ya),
                (Ir.bindAll = Ks),
                (Ir.bindKey = wa),
                (Ir.castArray = function () {
                  if (!arguments.length) return [];
                  var t = arguments[0];
                  return La(t) ? t : [t];
                }),
                (Ir.chain = ra),
                (Ir.chunk = function (t, e, r) {
                  e = (r ? fo(t, e, r) : void 0 === e) ? 1 : ar(is(e), 0);
                  var n = null == t ? 0 : t.length;
                  if (!n || e < 1) return [];
                  for (var i = 0, o = 0, a = V(Qe(n / e)); i < n; ) a[o++] = Zn(t, i, (i += e));
                  return a;
                }),
                (Ir.compact = function (t) {
                  for (var e = -1, r = null == t ? 0 : t.length, n = 0, i = []; ++e < r; ) {
                    var o = t[e];
                    o && (i[n++] = o);
                  }
                  return i;
                }),
                (Ir.concat = function () {
                  var t = arguments.length;
                  if (!t) return [];
                  for (var e = V(t - 1), r = arguments[0], n = t; n--; ) e[n - 1] = arguments[n];
                  return de(La(r) ? gi(r) : [r], an(e, 1));
                }),
                (Ir.cond = function (t) {
                  var e = null == t ? 0 : t.length,
                    r = Ji();
                  return (
                    (t = e
                      ? he(t, function (t) {
                          if ('function' != typeof t[1]) throw new vt(n);
                          return [r(t[0]), t[1]];
                        })
                      : []),
                    qn(function (r) {
                      for (var n = -1; ++n < e; ) {
                        var i = t[n];
                        if (ne(i[0], this, r)) return ne(i[1], this, r);
                      }
                    })
                  );
                }),
                (Ir.conforms = function (t) {
                  return (function (t) {
                    var e = _s(t);
                    return function (r) {
                      return Jr(r, t, e);
                    };
                  })(Gr(t, 1));
                }),
                (Ir.constant = Hs),
                (Ir.countBy = oa),
                (Ir.create = function (t, e) {
                  var r = Tr(t);
                  return null == e ? r : Zr(r, e);
                }),
                (Ir.curry = function t(e, r, n) {
                  var i = Ui(e, 8, void 0, void 0, void 0, void 0, void 0, (r = n ? void 0 : r));
                  return (i.placeholder = t.placeholder), i;
                }),
                (Ir.curryRight = function t(e, r, n) {
                  var i = Ui(e, 16, void 0, void 0, void 0, void 0, void 0, (r = n ? void 0 : r));
                  return (i.placeholder = t.placeholder), i;
                }),
                (Ir.debounce = _a),
                (Ir.defaults = ps),
                (Ir.defaultsDeep = bs),
                (Ir.defer = Ma),
                (Ir.delay = xa),
                (Ir.difference = Ro),
                (Ir.differenceBy = jo),
                (Ir.differenceWith = Oo),
                (Ir.drop = function (t, e, r) {
                  var n = null == t ? 0 : t.length;
                  return n ? Zn(t, (e = r || void 0 === e ? 1 : is(e)) < 0 ? 0 : e, n) : [];
                }),
                (Ir.dropRight = function (t, e, r) {
                  var n = null == t ? 0 : t.length;
                  return n ? Zn(t, 0, (e = n - (e = r || void 0 === e ? 1 : is(e))) < 0 ? 0 : e) : [];
                }),
                (Ir.dropRightWhile = function (t, e) {
                  return t && t.length ? ri(t, Ji(e, 3), !0, !0) : [];
                }),
                (Ir.dropWhile = function (t, e) {
                  return t && t.length ? ri(t, Ji(e, 3), !0) : [];
                }),
                (Ir.fill = function (t, e, r, n) {
                  var i = null == t ? 0 : t.length;
                  return i
                    ? (r && 'number' != typeof r && fo(t, e, r) && ((r = 0), (n = i)),
                      (function (t, e, r, n) {
                        var i = t.length;
                        for (
                          (r = is(r)) < 0 && (r = -r > i ? 0 : i + r),
                            (n = void 0 === n || n > i ? i : is(n)) < 0 && (n += i),
                            n = r > n ? 0 : os(n);
                          r < n;

                        )
                          t[r++] = e;
                        return t;
                      })(t, e, r, n))
                    : [];
                }),
                (Ir.filter = function (t, e) {
                  return (La(t) ? fe : on)(t, Ji(e, 3));
                }),
                (Ir.flatMap = function (t, e) {
                  return an(la(t, e), 1);
                }),
                (Ir.flatMapDeep = function (t, e) {
                  return an(la(t, e), 1 / 0);
                }),
                (Ir.flatMapDepth = function (t, e, r) {
                  return (r = void 0 === r ? 1 : is(r)), an(la(t, e), r);
                }),
                (Ir.flatten = Po),
                (Ir.flattenDeep = function (t) {
                  return (null == t ? 0 : t.length) ? an(t, 1 / 0) : [];
                }),
                (Ir.flattenDepth = function (t, e) {
                  return (null == t ? 0 : t.length) ? an(t, (e = void 0 === e ? 1 : is(e))) : [];
                }),
                (Ir.flip = function (t) {
                  return Ui(t, 512);
                }),
                (Ir.flow = Ws),
                (Ir.flowRight = Zs),
                (Ir.fromPairs = function (t) {
                  for (var e = -1, r = null == t ? 0 : t.length, n = {}; ++e < r; ) {
                    var i = t[e];
                    n[i[0]] = i[1];
                  }
                  return n;
                }),
                (Ir.functions = function (t) {
                  return null == t ? [] : hn(t, _s(t));
                }),
                (Ir.functionsIn = function (t) {
                  return null == t ? [] : hn(t, Ms(t));
                }),
                (Ir.groupBy = ca),
                (Ir.initial = function (t) {
                  return (null == t ? 0 : t.length) ? Zn(t, 0, -1) : [];
                }),
                (Ir.intersection = Co),
                (Ir.intersectionBy = zo),
                (Ir.intersectionWith = qo),
                (Ir.invert = gs),
                (Ir.invertBy = ys),
                (Ir.invokeMap = ha),
                (Ir.iteratee = $s),
                (Ir.keyBy = da),
                (Ir.keys = _s),
                (Ir.keysIn = Ms),
                (Ir.map = la),
                (Ir.mapKeys = function (t, e) {
                  var r = {};
                  return (
                    (e = Ji(e, 3)),
                    un(t, function (t, n, i) {
                      Vr(r, e(t, n, i), t);
                    }),
                    r
                  );
                }),
                (Ir.mapValues = function (t, e) {
                  var r = {};
                  return (
                    (e = Ji(e, 3)),
                    un(t, function (t, n, i) {
                      Vr(r, n, e(t, n, i));
                    }),
                    r
                  );
                }),
                (Ir.matches = function (t) {
                  return Tn(Gr(t, 1));
                }),
                (Ir.matchesProperty = function (t, e) {
                  return Rn(t, Gr(e, 1));
                }),
                (Ir.memoize = Sa),
                (Ir.merge = xs),
                (Ir.mergeWith = Ss),
                (Ir.method = Ys),
                (Ir.methodOf = Gs),
                (Ir.mixin = Js),
                (Ir.negate = Aa),
                (Ir.nthArg = function (t) {
                  return (
                    (t = is(t)),
                    qn(function (e) {
                      return On(e, t);
                    })
                  );
                }),
                (Ir.omit = As),
                (Ir.omitBy = function (t, e) {
                  return ks(t, Aa(Ji(e)));
                }),
                (Ir.once = function (t) {
                  return ga(2, t);
                }),
                (Ir.orderBy = function (t, e, r, n) {
                  return null == t
                    ? []
                    : (La(e) || (e = null == e ? [] : [e]),
                      La((r = n ? void 0 : r)) || (r = null == r ? [] : [r]),
                      Bn(t, e, r));
                }),
                (Ir.over = Qs),
                (Ir.overArgs = Ea),
                (Ir.overEvery = tf),
                (Ir.overSome = ef),
                (Ir.partial = ka),
                (Ir.partialRight = Ia),
                (Ir.partition = pa),
                (Ir.pick = Es),
                (Ir.pickBy = ks),
                (Ir.property = rf),
                (Ir.propertyOf = function (t) {
                  return function (e) {
                    return null == t ? void 0 : dn(t, e);
                  };
                }),
                (Ir.pull = Fo),
                (Ir.pullAll = Do),
                (Ir.pullAllBy = function (t, e, r) {
                  return t && t.length && e && e.length ? Pn(t, e, Ji(r, 2)) : t;
                }),
                (Ir.pullAllWith = function (t, e, r) {
                  return t && t.length && e && e.length ? Pn(t, e, void 0, r) : t;
                }),
                (Ir.pullAt = Ko),
                (Ir.range = nf),
                (Ir.rangeRight = of),
                (Ir.rearg = Ta),
                (Ir.reject = function (t, e) {
                  return (La(t) ? fe : on)(t, Aa(Ji(e, 3)));
                }),
                (Ir.remove = function (t, e) {
                  var r = [];
                  if (!t || !t.length) return r;
                  var n = -1,
                    i = [],
                    o = t.length;
                  for (e = Ji(e, 3); ++n < o; ) {
                    var a = t[n];
                    e(a, n, t) && (r.push(a), i.push(n));
                  }
                  return Nn(t, i), r;
                }),
                (Ir.rest = function (t, e) {
                  if ('function' != typeof t) throw new vt(n);
                  return qn(t, (e = void 0 === e ? e : is(e)));
                }),
                (Ir.reverse = Ho),
                (Ir.sampleSize = function (t, e, r) {
                  return (e = (r ? fo(t, e, r) : void 0 === e) ? 1 : is(e)), (La(t) ? Ur : Fn)(t, e);
                }),
                (Ir.set = function (t, e, r) {
                  return null == t ? t : Dn(t, e, r);
                }),
                (Ir.setWith = function (t, e, r, n) {
                  return (n = 'function' == typeof n ? n : void 0), null == t ? t : Dn(t, e, r, n);
                }),
                (Ir.shuffle = function (t) {
                  return (La(t) ? Fr : Wn)(t);
                }),
                (Ir.slice = function (t, e, r) {
                  var n = null == t ? 0 : t.length;
                  return n
                    ? (r && 'number' != typeof r && fo(t, e, r)
                        ? ((e = 0), (r = n))
                        : ((e = null == e ? 0 : is(e)), (r = void 0 === r ? n : is(r))),
                      Zn(t, e, r))
                    : [];
                }),
                (Ir.sortBy = ba),
                (Ir.sortedUniq = function (t) {
                  return t && t.length ? Gn(t) : [];
                }),
                (Ir.sortedUniqBy = function (t, e) {
                  return t && t.length ? Gn(t, Ji(e, 2)) : [];
                }),
                (Ir.split = function (t, e, r) {
                  return (
                    r && 'number' != typeof r && fo(t, e, r) && (e = r = void 0),
                    (r = void 0 === r ? 4294967295 : r >>> 0)
                      ? (t = fs(t)) && ('string' == typeof e || (null != e && !Ya(e))) && !(e = Xn(e)) && ze(t)
                        ? ci(We(t), 0, r)
                        : t.split(e, r)
                      : []
                  );
                }),
                (Ir.spread = function (t, e) {
                  if ('function' != typeof t) throw new vt(n);
                  return (
                    (e = null == e ? 0 : ar(is(e), 0)),
                    qn(function (r) {
                      var n = r[e],
                        i = ci(r, 0, e);
                      return n && de(i, n), ne(t, this, i);
                    })
                  );
                }),
                (Ir.tail = function (t) {
                  var e = null == t ? 0 : t.length;
                  return e ? Zn(t, 1, e) : [];
                }),
                (Ir.take = function (t, e, r) {
                  return t && t.length ? Zn(t, 0, (e = r || void 0 === e ? 1 : is(e)) < 0 ? 0 : e) : [];
                }),
                (Ir.takeRight = function (t, e, r) {
                  var n = null == t ? 0 : t.length;
                  return n ? Zn(t, (e = n - (e = r || void 0 === e ? 1 : is(e))) < 0 ? 0 : e, n) : [];
                }),
                (Ir.takeRightWhile = function (t, e) {
                  return t && t.length ? ri(t, Ji(e, 3), !1, !0) : [];
                }),
                (Ir.takeWhile = function (t, e) {
                  return t && t.length ? ri(t, Ji(e, 3)) : [];
                }),
                (Ir.tap = function (t, e) {
                  return e(t), t;
                }),
                (Ir.throttle = function (t, e, r) {
                  var i = !0,
                    o = !0;
                  if ('function' != typeof t) throw new vt(n);
                  return (
                    Ha(r) && ((i = 'leading' in r ? !!r.leading : i), (o = 'trailing' in r ? !!r.trailing : o)),
                    _a(t, e, { leading: i, maxWait: e, trailing: o })
                  );
                }),
                (Ir.thru = na),
                (Ir.toArray = rs),
                (Ir.toPairs = Is),
                (Ir.toPairsIn = Ts),
                (Ir.toPath = function (t) {
                  return La(t) ? he(t, ko) : Xa(t) ? [t] : gi(Eo(fs(t)));
                }),
                (Ir.toPlainObject = ss),
                (Ir.transform = function (t, e, r) {
                  var n = La(t),
                    i = n || za(t) || Qa(t);
                  if (((e = Ji(e, 4)), null == r)) {
                    var o = t && t.constructor;
                    r = i ? (n ? new o() : []) : Ha(t) && Fa(o) ? Tr(Ht(t)) : {};
                  }
                  return (
                    (i ? oe : un)(t, function (t, n, i) {
                      return e(r, t, n, i);
                    }),
                    r
                  );
                }),
                (Ir.unary = function (t) {
                  return va(t, 1);
                }),
                (Ir.union = Wo),
                (Ir.unionBy = Zo),
                (Ir.unionWith = Vo),
                (Ir.uniq = function (t) {
                  return t && t.length ? Qn(t) : [];
                }),
                (Ir.uniqBy = function (t, e) {
                  return t && t.length ? Qn(t, Ji(e, 2)) : [];
                }),
                (Ir.uniqWith = function (t, e) {
                  return (e = 'function' == typeof e ? e : void 0), t && t.length ? Qn(t, void 0, e) : [];
                }),
                (Ir.unset = function (t, e) {
                  return null == t || ti(t, e);
                }),
                (Ir.unzip = $o),
                (Ir.unzipWith = Yo),
                (Ir.update = function (t, e, r) {
                  return null == t ? t : ei(t, e, si(r));
                }),
                (Ir.updateWith = function (t, e, r, n) {
                  return (n = 'function' == typeof n ? n : void 0), null == t ? t : ei(t, e, si(r), n);
                }),
                (Ir.values = Rs),
                (Ir.valuesIn = function (t) {
                  return null == t ? [] : Re(t, Ms(t));
                }),
                (Ir.without = Go),
                (Ir.words = Fs),
                (Ir.wrap = function (t, e) {
                  return ka(si(e), t);
                }),
                (Ir.xor = Jo),
                (Ir.xorBy = Xo),
                (Ir.xorWith = Qo),
                (Ir.zip = ta),
                (Ir.zipObject = function (t, e) {
                  return oi(t || [], e || [], Kr);
                }),
                (Ir.zipObjectDeep = function (t, e) {
                  return oi(t || [], e || [], Dn);
                }),
                (Ir.zipWith = ea),
                (Ir.entries = Is),
                (Ir.entriesIn = Ts),
                (Ir.extend = cs),
                (Ir.extendWith = hs),
                Js(Ir, Ir),
                (Ir.add = ff),
                (Ir.attempt = Ds),
                (Ir.camelCase = js),
                (Ir.capitalize = Os),
                (Ir.ceil = uf),
                (Ir.clamp = function (t, e, r) {
                  return (
                    void 0 === r && ((r = e), (e = void 0)),
                    void 0 !== r && (r = (r = as(r)) == r ? r : 0),
                    void 0 !== e && (e = (e = as(e)) == e ? e : 0),
                    Yr(as(t), e, r)
                  );
                }),
                (Ir.clone = function (t) {
                  return Gr(t, 4);
                }),
                (Ir.cloneDeep = function (t) {
                  return Gr(t, 5);
                }),
                (Ir.cloneDeepWith = function (t, e) {
                  return Gr(t, 5, (e = 'function' == typeof e ? e : void 0));
                }),
                (Ir.cloneWith = function (t, e) {
                  return Gr(t, 4, (e = 'function' == typeof e ? e : void 0));
                }),
                (Ir.conformsTo = function (t, e) {
                  return null == e || Jr(t, e, _s(e));
                }),
                (Ir.deburr = Bs),
                (Ir.defaultTo = function (t, e) {
                  return null == t || t != t ? e : t;
                }),
                (Ir.divide = cf),
                (Ir.endsWith = function (t, e, r) {
                  (t = fs(t)), (e = Xn(e));
                  var n = t.length,
                    i = (r = void 0 === r ? n : Yr(is(r), 0, n));
                  return (r -= e.length) >= 0 && t.slice(r, i) == e;
                }),
                (Ir.eq = Ra),
                (Ir.escape = function (t) {
                  return (t = fs(t)) && C.test(t) ? t.replace(P, Ne) : t;
                }),
                (Ir.escapeRegExp = function (t) {
                  return (t = fs(t)) && W.test(t) ? t.replace(H, '\\$&') : t;
                }),
                (Ir.every = function (t, e, r) {
                  var n = La(t) ? se : rn;
                  return r && fo(t, e, r) && (e = void 0), n(t, Ji(e, 3));
                }),
                (Ir.find = aa),
                (Ir.findIndex = Bo),
                (Ir.findKey = function (t, e) {
                  return ve(t, Ji(e, 3), un);
                }),
                (Ir.findLast = sa),
                (Ir.findLastIndex = Lo),
                (Ir.findLastKey = function (t, e) {
                  return ve(t, Ji(e, 3), cn);
                }),
                (Ir.floor = hf),
                (Ir.forEach = fa),
                (Ir.forEachRight = ua),
                (Ir.forIn = function (t, e) {
                  return null == t ? t : sn(t, Ji(e, 3), Ms);
                }),
                (Ir.forInRight = function (t, e) {
                  return null == t ? t : fn(t, Ji(e, 3), Ms);
                }),
                (Ir.forOwn = function (t, e) {
                  return t && un(t, Ji(e, 3));
                }),
                (Ir.forOwnRight = function (t, e) {
                  return t && cn(t, Ji(e, 3));
                }),
                (Ir.get = ms),
                (Ir.gt = ja),
                (Ir.gte = Oa),
                (Ir.has = function (t, e) {
                  return null != t && io(t, e, mn);
                }),
                (Ir.hasIn = vs),
                (Ir.head = No),
                (Ir.identity = Vs),
                (Ir.includes = function (t, e, r, n) {
                  (t = Na(t) ? t : Rs(t)), (r = r && !n ? is(r) : 0);
                  var i = t.length;
                  return r < 0 && (r = ar(i + r, 0)), Ja(t) ? r <= i && t.indexOf(e, r) > -1 : !!i && ye(t, e, r) > -1;
                }),
                (Ir.indexOf = function (t, e, r) {
                  var n = null == t ? 0 : t.length;
                  if (!n) return -1;
                  var i = null == r ? 0 : is(r);
                  return i < 0 && (i = ar(n + i, 0)), ye(t, e, i);
                }),
                (Ir.inRange = function (t, e, r) {
                  return (
                    (e = ns(e)),
                    void 0 === r ? ((r = e), (e = 0)) : (r = ns(r)),
                    (function (t, e, r) {
                      return t >= sr(e, r) && t < ar(e, r);
                    })((t = as(t)), e, r)
                  );
                }),
                (Ir.invoke = ws),
                (Ir.isArguments = Ba),
                (Ir.isArray = La),
                (Ir.isArrayBuffer = Pa),
                (Ir.isArrayLike = Na),
                (Ir.isArrayLikeObject = Ca),
                (Ir.isBoolean = function (t) {
                  return !0 === t || !1 === t || (Wa(t) && pn(t) == f);
                }),
                (Ir.isBuffer = za),
                (Ir.isDate = qa),
                (Ir.isElement = function (t) {
                  return Wa(t) && 1 === t.nodeType && !$a(t);
                }),
                (Ir.isEmpty = function (t) {
                  if (null == t) return !0;
                  if (
                    Na(t) &&
                    (La(t) || 'string' == typeof t || 'function' == typeof t.splice || za(t) || Qa(t) || Ba(t))
                  )
                    return !t.length;
                  var e = no(t);
                  if (e == l || e == v) return !t.size;
                  if (lo(t)) return !An(t).length;
                  for (var r in t) if (xt.call(t, r)) return !1;
                  return !0;
                }),
                (Ir.isEqual = function (t, e) {
                  return _n(t, e);
                }),
                (Ir.isEqualWith = function (t, e, r) {
                  var n = (r = 'function' == typeof r ? r : void 0) ? r(t, e) : void 0;
                  return void 0 === n ? _n(t, e, void 0, r) : !!n;
                }),
                (Ir.isError = Ua),
                (Ir.isFinite = function (t) {
                  return 'number' == typeof t && nr(t);
                }),
                (Ir.isFunction = Fa),
                (Ir.isInteger = Da),
                (Ir.isLength = Ka),
                (Ir.isMap = Za),
                (Ir.isMatch = function (t, e) {
                  return t === e || Mn(t, e, Qi(e));
                }),
                (Ir.isMatchWith = function (t, e, r) {
                  return (r = 'function' == typeof r ? r : void 0), Mn(t, e, Qi(e), r);
                }),
                (Ir.isNaN = function (t) {
                  return Va(t) && t != +t;
                }),
                (Ir.isNative = function (t) {
                  if (ho(t)) throw new ht('Unsupported core-js use. Try https://npms.io/search?q=ponyfill.');
                  return xn(t);
                }),
                (Ir.isNil = function (t) {
                  return null == t;
                }),
                (Ir.isNull = function (t) {
                  return null === t;
                }),
                (Ir.isNumber = Va),
                (Ir.isObject = Ha),
                (Ir.isObjectLike = Wa),
                (Ir.isPlainObject = $a),
                (Ir.isRegExp = Ya),
                (Ir.isSafeInteger = function (t) {
                  return Da(t) && t >= -9007199254740991 && t <= 9007199254740991;
                }),
                (Ir.isSet = Ga),
                (Ir.isString = Ja),
                (Ir.isSymbol = Xa),
                (Ir.isTypedArray = Qa),
                (Ir.isUndefined = function (t) {
                  return void 0 === t;
                }),
                (Ir.isWeakMap = function (t) {
                  return Wa(t) && no(t) == w;
                }),
                (Ir.isWeakSet = function (t) {
                  return Wa(t) && '[object WeakSet]' == pn(t);
                }),
                (Ir.join = function (t, e) {
                  return null == t ? '' : ir.call(t, e);
                }),
                (Ir.kebabCase = Ls),
                (Ir.last = Uo),
                (Ir.lastIndexOf = function (t, e, r) {
                  var n = null == t ? 0 : t.length;
                  if (!n) return -1;
                  var i = n;
                  return (
                    void 0 !== r && (i = (i = is(r)) < 0 ? ar(n + i, 0) : sr(i, n - 1)),
                    e == e
                      ? (function (t, e, r) {
                          for (var n = r + 1; n--; ) if (t[n] === e) return n;
                          return n;
                        })(t, e, i)
                      : ge(t, _e, i, !0)
                  );
                }),
                (Ir.lowerCase = Ps),
                (Ir.lowerFirst = Ns),
                (Ir.lt = ts),
                (Ir.lte = es),
                (Ir.max = function (t) {
                  return t && t.length ? nn(t, Vs, bn) : void 0;
                }),
                (Ir.maxBy = function (t, e) {
                  return t && t.length ? nn(t, Ji(e, 2), bn) : void 0;
                }),
                (Ir.mean = function (t) {
                  return Me(t, Vs);
                }),
                (Ir.meanBy = function (t, e) {
                  return Me(t, Ji(e, 2));
                }),
                (Ir.min = function (t) {
                  return t && t.length ? nn(t, Vs, kn) : void 0;
                }),
                (Ir.minBy = function (t, e) {
                  return t && t.length ? nn(t, Ji(e, 2), kn) : void 0;
                }),
                (Ir.stubArray = af),
                (Ir.stubFalse = sf),
                (Ir.stubObject = function () {
                  return {};
                }),
                (Ir.stubString = function () {
                  return '';
                }),
                (Ir.stubTrue = function () {
                  return !0;
                }),
                (Ir.multiply = lf),
                (Ir.nth = function (t, e) {
                  return t && t.length ? On(t, is(e)) : void 0;
                }),
                (Ir.noConflict = function () {
                  return Wt._ === this && (Wt._ = It), this;
                }),
                (Ir.noop = Xs),
                (Ir.now = ma),
                (Ir.pad = function (t, e, r) {
                  t = fs(t);
                  var n = (e = is(e)) ? He(t) : 0;
                  if (!e || n >= e) return t;
                  var i = (e - n) / 2;
                  return Bi(tr(i), r) + t + Bi(Qe(i), r);
                }),
                (Ir.padEnd = function (t, e, r) {
                  t = fs(t);
                  var n = (e = is(e)) ? He(t) : 0;
                  return e && n < e ? t + Bi(e - n, r) : t;
                }),
                (Ir.padStart = function (t, e, r) {
                  t = fs(t);
                  var n = (e = is(e)) ? He(t) : 0;
                  return e && n < e ? Bi(e - n, r) + t : t;
                }),
                (Ir.parseInt = function (t, e, r) {
                  return r || null == e ? (e = 0) : e && (e = +e), ur(fs(t).replace(Z, ''), e || 0);
                }),
                (Ir.random = function (t, e, r) {
                  if (
                    (r && 'boolean' != typeof r && fo(t, e, r) && (e = r = void 0),
                    void 0 === r &&
                      ('boolean' == typeof e
                        ? ((r = e), (e = void 0))
                        : 'boolean' == typeof t && ((r = t), (t = void 0))),
                    void 0 === t && void 0 === e
                      ? ((t = 0), (e = 1))
                      : ((t = ns(t)), void 0 === e ? ((e = t), (t = 0)) : (e = ns(e))),
                    t > e)
                  ) {
                    var n = t;
                    (t = e), (e = n);
                  }
                  if (r || t % 1 || e % 1) {
                    var i = cr();
                    return sr(t + i * (e - t + Ft('1e-' + ((i + '').length - 1))), e);
                  }
                  return Cn(t, e);
                }),
                (Ir.reduce = function (t, e, r) {
                  var n = La(t) ? le : Ae,
                    i = arguments.length < 3;
                  return n(t, Ji(e, 4), r, i, tn);
                }),
                (Ir.reduceRight = function (t, e, r) {
                  var n = La(t) ? pe : Ae,
                    i = arguments.length < 3;
                  return n(t, Ji(e, 4), r, i, en);
                }),
                (Ir.repeat = function (t, e, r) {
                  return (e = (r ? fo(t, e, r) : void 0 === e) ? 1 : is(e)), zn(fs(t), e);
                }),
                (Ir.replace = function () {
                  var t = arguments,
                    e = fs(t[0]);
                  return t.length < 3 ? e : e.replace(t[1], t[2]);
                }),
                (Ir.result = function (t, e, r) {
                  var n = -1,
                    i = (e = fi(e, t)).length;
                  for (i || ((i = 1), (t = void 0)); ++n < i; ) {
                    var o = null == t ? void 0 : t[ko(e[n])];
                    void 0 === o && ((n = i), (o = r)), (t = Fa(o) ? o.call(t) : o);
                  }
                  return t;
                }),
                (Ir.round = pf),
                (Ir.runInContext = t),
                (Ir.sample = function (t) {
                  return (La(t) ? qr : Un)(t);
                }),
                (Ir.size = function (t) {
                  if (null == t) return 0;
                  if (Na(t)) return Ja(t) ? He(t) : t.length;
                  var e = no(t);
                  return e == l || e == v ? t.size : An(t).length;
                }),
                (Ir.snakeCase = Cs),
                (Ir.some = function (t, e, r) {
                  var n = La(t) ? be : Vn;
                  return r && fo(t, e, r) && (e = void 0), n(t, Ji(e, 3));
                }),
                (Ir.sortedIndex = function (t, e) {
                  return $n(t, e);
                }),
                (Ir.sortedIndexBy = function (t, e, r) {
                  return Yn(t, e, Ji(r, 2));
                }),
                (Ir.sortedIndexOf = function (t, e) {
                  var r = null == t ? 0 : t.length;
                  if (r) {
                    var n = $n(t, e);
                    if (n < r && Ra(t[n], e)) return n;
                  }
                  return -1;
                }),
                (Ir.sortedLastIndex = function (t, e) {
                  return $n(t, e, !0);
                }),
                (Ir.sortedLastIndexBy = function (t, e, r) {
                  return Yn(t, e, Ji(r, 2), !0);
                }),
                (Ir.sortedLastIndexOf = function (t, e) {
                  if (null == t ? 0 : t.length) {
                    var r = $n(t, e, !0) - 1;
                    if (Ra(t[r], e)) return r;
                  }
                  return -1;
                }),
                (Ir.startCase = zs),
                (Ir.startsWith = function (t, e, r) {
                  return (
                    (t = fs(t)),
                    (r = null == r ? 0 : Yr(is(r), 0, t.length)),
                    (e = Xn(e)),
                    t.slice(r, r + e.length) == e
                  );
                }),
                (Ir.subtract = bf),
                (Ir.sum = function (t) {
                  return t && t.length ? Ee(t, Vs) : 0;
                }),
                (Ir.sumBy = function (t, e) {
                  return t && t.length ? Ee(t, Ji(e, 2)) : 0;
                }),
                (Ir.template = function (t, e, r) {
                  var n = Ir.templateSettings;
                  r && fo(t, e, r) && (e = void 0), (t = fs(t)), (e = hs({}, e, n, Fi));
                  var i,
                    o,
                    a = hs({}, e.imports, n.imports, Fi),
                    s = _s(a),
                    f = Re(a, s),
                    u = 0,
                    c = e.interpolate || ft,
                    h = "__p += '",
                    d = bt(
                      (e.escape || ft).source +
                        '|' +
                        c.source +
                        '|' +
                        (c === U ? tt : ft).source +
                        '|' +
                        (e.evaluate || ft).source +
                        '|$',
                      'g'
                    ),
                    l =
                      '//# sourceURL=' +
                      (xt.call(e, 'sourceURL')
                        ? (e.sourceURL + '').replace(/\s/g, ' ')
                        : 'lodash.templateSources[' + ++Ct + ']') +
                      '\n';
                  t.replace(d, function (e, r, n, a, s, f) {
                    return (
                      n || (n = a),
                      (h += t.slice(u, f).replace(ut, Ce)),
                      r && ((i = !0), (h += "' +\n__e(" + r + ") +\n'")),
                      s && ((o = !0), (h += "';\n" + s + ";\n__p += '")),
                      n && (h += "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"),
                      (u = f + e.length),
                      e
                    );
                  }),
                    (h += "';\n");
                  var p = xt.call(e, 'variable') && e.variable;
                  if (p) {
                    if (X.test(p)) throw new ht('Invalid `variable` option passed into `_.template`');
                  } else h = 'with (obj) {\n' + h + '\n}\n';
                  (h = (o ? h.replace(j, '') : h).replace(O, '$1').replace(B, '$1;')),
                    (h =
                      'function(' +
                      (p || 'obj') +
                      ') {\n' +
                      (p ? '' : 'obj || (obj = {});\n') +
                      "var __t, __p = ''" +
                      (i ? ', __e = _.escape' : '') +
                      (o
                        ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                        : ';\n') +
                      h +
                      'return __p\n}');
                  var b = Ds(function () {
                    return dt(s, l + 'return ' + h).apply(void 0, f);
                  });
                  if (((b.source = h), Ua(b))) throw b;
                  return b;
                }),
                (Ir.times = function (t, e) {
                  if ((t = is(t)) < 1 || t > 9007199254740991) return [];
                  var r = 4294967295,
                    n = sr(t, 4294967295);
                  t -= 4294967295;
                  for (var i = ke(n, (e = Ji(e))); ++r < t; ) e(r);
                  return i;
                }),
                (Ir.toFinite = ns),
                (Ir.toInteger = is),
                (Ir.toLength = os),
                (Ir.toLower = function (t) {
                  return fs(t).toLowerCase();
                }),
                (Ir.toNumber = as),
                (Ir.toSafeInteger = function (t) {
                  return t ? Yr(is(t), -9007199254740991, 9007199254740991) : 0 === t ? t : 0;
                }),
                (Ir.toString = fs),
                (Ir.toUpper = function (t) {
                  return fs(t).toUpperCase();
                }),
                (Ir.trim = function (t, e, r) {
                  if ((t = fs(t)) && (r || void 0 === e)) return Ie(t);
                  if (!t || !(e = Xn(e))) return t;
                  var n = We(t),
                    i = We(e);
                  return ci(n, Oe(n, i), Be(n, i) + 1).join('');
                }),
                (Ir.trimEnd = function (t, e, r) {
                  if ((t = fs(t)) && (r || void 0 === e)) return t.slice(0, Ze(t) + 1);
                  if (!t || !(e = Xn(e))) return t;
                  var n = We(t);
                  return ci(n, 0, Be(n, We(e)) + 1).join('');
                }),
                (Ir.trimStart = function (t, e, r) {
                  if ((t = fs(t)) && (r || void 0 === e)) return t.replace(Z, '');
                  if (!t || !(e = Xn(e))) return t;
                  var n = We(t);
                  return ci(n, Oe(n, We(e))).join('');
                }),
                (Ir.truncate = function (t, e) {
                  var r = 30,
                    n = '...';
                  if (Ha(e)) {
                    var i = 'separator' in e ? e.separator : i;
                    (r = 'length' in e ? is(e.length) : r), (n = 'omission' in e ? Xn(e.omission) : n);
                  }
                  var o = (t = fs(t)).length;
                  if (ze(t)) {
                    var a = We(t);
                    o = a.length;
                  }
                  if (r >= o) return t;
                  var s = r - He(n);
                  if (s < 1) return n;
                  var f = a ? ci(a, 0, s).join('') : t.slice(0, s);
                  if (void 0 === i) return f + n;
                  if ((a && (s += f.length - s), Ya(i))) {
                    if (t.slice(s).search(i)) {
                      var u,
                        c = f;
                      for (i.global || (i = bt(i.source, fs(et.exec(i)) + 'g')), i.lastIndex = 0; (u = i.exec(c)); )
                        var h = u.index;
                      f = f.slice(0, void 0 === h ? s : h);
                    }
                  } else if (t.indexOf(Xn(i), s) != s) {
                    var d = f.lastIndexOf(i);
                    d > -1 && (f = f.slice(0, d));
                  }
                  return f + n;
                }),
                (Ir.unescape = function (t) {
                  return (t = fs(t)) && N.test(t) ? t.replace(L, Ve) : t;
                }),
                (Ir.uniqueId = function (t) {
                  var e = ++St;
                  return fs(t) + e;
                }),
                (Ir.upperCase = qs),
                (Ir.upperFirst = Us),
                (Ir.each = fa),
                (Ir.eachRight = ua),
                (Ir.first = No),
                Js(
                  Ir,
                  ((df = {}),
                  un(Ir, function (t, e) {
                    xt.call(Ir.prototype, e) || (df[e] = t);
                  }),
                  df),
                  { chain: !1 }
                ),
                (Ir.VERSION = '4.17.21'),
                oe(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (t) {
                  Ir[t].placeholder = Ir;
                }),
                oe(['drop', 'take'], function (t, e) {
                  (Or.prototype[t] = function (r) {
                    r = void 0 === r ? 1 : ar(is(r), 0);
                    var n = this.__filtered__ && !e ? new Or(this) : this.clone();
                    return (
                      n.__filtered__
                        ? (n.__takeCount__ = sr(r, n.__takeCount__))
                        : n.__views__.push({ size: sr(r, 4294967295), type: t + (n.__dir__ < 0 ? 'Right' : '') }),
                      n
                    );
                  }),
                    (Or.prototype[t + 'Right'] = function (e) {
                      return this.reverse()[t](e).reverse();
                    });
                }),
                oe(['filter', 'map', 'takeWhile'], function (t, e) {
                  var r = e + 1,
                    n = 1 == r || 3 == r;
                  Or.prototype[t] = function (t) {
                    var e = this.clone();
                    return (
                      e.__iteratees__.push({ iteratee: Ji(t, 3), type: r }), (e.__filtered__ = e.__filtered__ || n), e
                    );
                  };
                }),
                oe(['head', 'last'], function (t, e) {
                  var r = 'take' + (e ? 'Right' : '');
                  Or.prototype[t] = function () {
                    return this[r](1).value()[0];
                  };
                }),
                oe(['initial', 'tail'], function (t, e) {
                  var r = 'drop' + (e ? '' : 'Right');
                  Or.prototype[t] = function () {
                    return this.__filtered__ ? new Or(this) : this[r](1);
                  };
                }),
                (Or.prototype.compact = function () {
                  return this.filter(Vs);
                }),
                (Or.prototype.find = function (t) {
                  return this.filter(t).head();
                }),
                (Or.prototype.findLast = function (t) {
                  return this.reverse().find(t);
                }),
                (Or.prototype.invokeMap = qn(function (t, e) {
                  return 'function' == typeof t
                    ? new Or(this)
                    : this.map(function (r) {
                        return yn(r, t, e);
                      });
                })),
                (Or.prototype.reject = function (t) {
                  return this.filter(Aa(Ji(t)));
                }),
                (Or.prototype.slice = function (t, e) {
                  t = is(t);
                  var r = this;
                  return r.__filtered__ && (t > 0 || e < 0)
                    ? new Or(r)
                    : (t < 0 ? (r = r.takeRight(-t)) : t && (r = r.drop(t)),
                      void 0 !== e && (r = (e = is(e)) < 0 ? r.dropRight(-e) : r.take(e - t)),
                      r);
                }),
                (Or.prototype.takeRightWhile = function (t) {
                  return this.reverse().takeWhile(t).reverse();
                }),
                (Or.prototype.toArray = function () {
                  return this.take(4294967295);
                }),
                un(Or.prototype, function (t, e) {
                  var r = /^(?:filter|find|map|reject)|While$/.test(e),
                    n = /^(?:head|last)$/.test(e),
                    i = Ir[n ? 'take' + ('last' == e ? 'Right' : '') : e],
                    o = n || /^find/.test(e);
                  i &&
                    (Ir.prototype[e] = function () {
                      var e = this.__wrapped__,
                        a = n ? [1] : arguments,
                        s = e instanceof Or,
                        f = a[0],
                        u = s || La(e),
                        c = function (t) {
                          var e = i.apply(Ir, de([t], a));
                          return n && h ? e[0] : e;
                        };
                      u && r && 'function' == typeof f && 1 != f.length && (s = u = !1);
                      var h = this.__chain__,
                        d = !!this.__actions__.length,
                        l = o && !h,
                        p = s && !d;
                      if (!o && u) {
                        e = p ? e : new Or(this);
                        var b = t.apply(e, a);
                        return b.__actions__.push({ func: na, args: [c], thisArg: void 0 }), new jr(b, h);
                      }
                      return l && p ? t.apply(this, a) : ((b = this.thru(c)), l ? (n ? b.value()[0] : b.value()) : b);
                    });
                }),
                oe(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (t) {
                  var e = gt[t],
                    r = /^(?:push|sort|unshift)$/.test(t) ? 'tap' : 'thru',
                    n = /^(?:pop|shift)$/.test(t);
                  Ir.prototype[t] = function () {
                    var t = arguments;
                    if (n && !this.__chain__) {
                      var i = this.value();
                      return e.apply(La(i) ? i : [], t);
                    }
                    return this[r](function (r) {
                      return e.apply(La(r) ? r : [], t);
                    });
                  };
                }),
                un(Or.prototype, function (t, e) {
                  var r = Ir[e];
                  if (r) {
                    var n = r.name + '';
                    xt.call(yr, n) || (yr[n] = []), yr[n].push({ name: e, func: r });
                  }
                }),
                (yr[Ti(void 0, 2).name] = [{ name: 'wrapper', func: void 0 }]),
                (Or.prototype.clone = function () {
                  var t = new Or(this.__wrapped__);
                  return (
                    (t.__actions__ = gi(this.__actions__)),
                    (t.__dir__ = this.__dir__),
                    (t.__filtered__ = this.__filtered__),
                    (t.__iteratees__ = gi(this.__iteratees__)),
                    (t.__takeCount__ = this.__takeCount__),
                    (t.__views__ = gi(this.__views__)),
                    t
                  );
                }),
                (Or.prototype.reverse = function () {
                  if (this.__filtered__) {
                    var t = new Or(this);
                    (t.__dir__ = -1), (t.__filtered__ = !0);
                  } else (t = this.clone()).__dir__ *= -1;
                  return t;
                }),
                (Or.prototype.value = function () {
                  var t = this.__wrapped__.value(),
                    e = this.__dir__,
                    r = La(t),
                    n = e < 0,
                    i = r ? t.length : 0,
                    o = (function (t, e, r) {
                      var n = -1,
                        i = r.length;
                      for (; ++n < i; ) {
                        var o = r[n],
                          a = o.size;
                        switch (o.type) {
                          case 'drop':
                            t += a;
                            break;
                          case 'dropRight':
                            e -= a;
                            break;
                          case 'take':
                            e = sr(e, t + a);
                            break;
                          case 'takeRight':
                            t = ar(t, e - a);
                        }
                      }
                      return { start: t, end: e };
                    })(0, i, this.__views__),
                    a = o.start,
                    s = o.end,
                    f = s - a,
                    u = n ? s : a - 1,
                    c = this.__iteratees__,
                    h = c.length,
                    d = 0,
                    l = sr(f, this.__takeCount__);
                  if (!r || (!n && i == f && l == f)) return ni(t, this.__actions__);
                  var p = [];
                  t: for (; f-- && d < l; ) {
                    for (var b = -1, m = t[(u += e)]; ++b < h; ) {
                      var v = c[b],
                        g = v.iteratee,
                        y = v.type,
                        w = g(m);
                      if (2 == y) m = w;
                      else if (!w) {
                        if (1 == y) continue t;
                        break t;
                      }
                    }
                    p[d++] = m;
                  }
                  return p;
                }),
                (Ir.prototype.at = ia),
                (Ir.prototype.chain = function () {
                  return ra(this);
                }),
                (Ir.prototype.commit = function () {
                  return new jr(this.value(), this.__chain__);
                }),
                (Ir.prototype.next = function () {
                  void 0 === this.__values__ && (this.__values__ = rs(this.value()));
                  var t = this.__index__ >= this.__values__.length;
                  return { done: t, value: t ? void 0 : this.__values__[this.__index__++] };
                }),
                (Ir.prototype.plant = function (t) {
                  for (var e, r = this; r instanceof Rr; ) {
                    var n = To(r);
                    (n.__index__ = 0), (n.__values__ = void 0), e ? (i.__wrapped__ = n) : (e = n);
                    var i = n;
                    r = r.__wrapped__;
                  }
                  return (i.__wrapped__ = t), e;
                }),
                (Ir.prototype.reverse = function () {
                  var t = this.__wrapped__;
                  if (t instanceof Or) {
                    var e = t;
                    return (
                      this.__actions__.length && (e = new Or(this)),
                      (e = e.reverse()).__actions__.push({ func: na, args: [Ho], thisArg: void 0 }),
                      new jr(e, this.__chain__)
                    );
                  }
                  return this.thru(Ho);
                }),
                (Ir.prototype.toJSON =
                  Ir.prototype.valueOf =
                  Ir.prototype.value =
                    function () {
                      return ni(this.__wrapped__, this.__actions__);
                    }),
                (Ir.prototype.first = Ir.prototype.head),
                me &&
                  (Ir.prototype[me] = function () {
                    return this;
                  }),
                Ir
              );
            })();
            'function' == typeof define && 'object' == typeof define.amd && define.amd
              ? ((Wt._ = $e),
                define(function () {
                  return $e;
                }))
              : Vt
              ? (((Vt.exports = $e)._ = $e), (Zt._ = $e))
              : (Wt._ = $e);
          }.call(this));
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      {},
    ],
    91: [
      function (t, e, r) {
        'use strict';
        var n = t('inherits'),
          i = t('hash-base'),
          o = t('safe-buffer').Buffer,
          a = new Array(16);
        function s() {
          i.call(this, 64),
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878);
        }
        function f(t, e) {
          return (t << e) | (t >>> (32 - e));
        }
        function u(t, e, r, n, i, o, a) {
          return (f((t + ((e & r) | (~e & n)) + i + o) | 0, a) + e) | 0;
        }
        function c(t, e, r, n, i, o, a) {
          return (f((t + ((e & n) | (r & ~n)) + i + o) | 0, a) + e) | 0;
        }
        function h(t, e, r, n, i, o, a) {
          return (f((t + (e ^ r ^ n) + i + o) | 0, a) + e) | 0;
        }
        function d(t, e, r, n, i, o, a) {
          return (f((t + (r ^ (e | ~n)) + i + o) | 0, a) + e) | 0;
        }
        n(s, i),
          (s.prototype._update = function () {
            for (var t = a, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
            var r = this._a,
              n = this._b,
              i = this._c,
              o = this._d;
            (r = u(r, n, i, o, t[0], 3614090360, 7)),
              (o = u(o, r, n, i, t[1], 3905402710, 12)),
              (i = u(i, o, r, n, t[2], 606105819, 17)),
              (n = u(n, i, o, r, t[3], 3250441966, 22)),
              (r = u(r, n, i, o, t[4], 4118548399, 7)),
              (o = u(o, r, n, i, t[5], 1200080426, 12)),
              (i = u(i, o, r, n, t[6], 2821735955, 17)),
              (n = u(n, i, o, r, t[7], 4249261313, 22)),
              (r = u(r, n, i, o, t[8], 1770035416, 7)),
              (o = u(o, r, n, i, t[9], 2336552879, 12)),
              (i = u(i, o, r, n, t[10], 4294925233, 17)),
              (n = u(n, i, o, r, t[11], 2304563134, 22)),
              (r = u(r, n, i, o, t[12], 1804603682, 7)),
              (o = u(o, r, n, i, t[13], 4254626195, 12)),
              (i = u(i, o, r, n, t[14], 2792965006, 17)),
              (r = c(r, (n = u(n, i, o, r, t[15], 1236535329, 22)), i, o, t[1], 4129170786, 5)),
              (o = c(o, r, n, i, t[6], 3225465664, 9)),
              (i = c(i, o, r, n, t[11], 643717713, 14)),
              (n = c(n, i, o, r, t[0], 3921069994, 20)),
              (r = c(r, n, i, o, t[5], 3593408605, 5)),
              (o = c(o, r, n, i, t[10], 38016083, 9)),
              (i = c(i, o, r, n, t[15], 3634488961, 14)),
              (n = c(n, i, o, r, t[4], 3889429448, 20)),
              (r = c(r, n, i, o, t[9], 568446438, 5)),
              (o = c(o, r, n, i, t[14], 3275163606, 9)),
              (i = c(i, o, r, n, t[3], 4107603335, 14)),
              (n = c(n, i, o, r, t[8], 1163531501, 20)),
              (r = c(r, n, i, o, t[13], 2850285829, 5)),
              (o = c(o, r, n, i, t[2], 4243563512, 9)),
              (i = c(i, o, r, n, t[7], 1735328473, 14)),
              (r = h(r, (n = c(n, i, o, r, t[12], 2368359562, 20)), i, o, t[5], 4294588738, 4)),
              (o = h(o, r, n, i, t[8], 2272392833, 11)),
              (i = h(i, o, r, n, t[11], 1839030562, 16)),
              (n = h(n, i, o, r, t[14], 4259657740, 23)),
              (r = h(r, n, i, o, t[1], 2763975236, 4)),
              (o = h(o, r, n, i, t[4], 1272893353, 11)),
              (i = h(i, o, r, n, t[7], 4139469664, 16)),
              (n = h(n, i, o, r, t[10], 3200236656, 23)),
              (r = h(r, n, i, o, t[13], 681279174, 4)),
              (o = h(o, r, n, i, t[0], 3936430074, 11)),
              (i = h(i, o, r, n, t[3], 3572445317, 16)),
              (n = h(n, i, o, r, t[6], 76029189, 23)),
              (r = h(r, n, i, o, t[9], 3654602809, 4)),
              (o = h(o, r, n, i, t[12], 3873151461, 11)),
              (i = h(i, o, r, n, t[15], 530742520, 16)),
              (r = d(r, (n = h(n, i, o, r, t[2], 3299628645, 23)), i, o, t[0], 4096336452, 6)),
              (o = d(o, r, n, i, t[7], 1126891415, 10)),
              (i = d(i, o, r, n, t[14], 2878612391, 15)),
              (n = d(n, i, o, r, t[5], 4237533241, 21)),
              (r = d(r, n, i, o, t[12], 1700485571, 6)),
              (o = d(o, r, n, i, t[3], 2399980690, 10)),
              (i = d(i, o, r, n, t[10], 4293915773, 15)),
              (n = d(n, i, o, r, t[1], 2240044497, 21)),
              (r = d(r, n, i, o, t[8], 1873313359, 6)),
              (o = d(o, r, n, i, t[15], 4264355552, 10)),
              (i = d(i, o, r, n, t[6], 2734768916, 15)),
              (n = d(n, i, o, r, t[13], 1309151649, 21)),
              (r = d(r, n, i, o, t[4], 4149444226, 6)),
              (o = d(o, r, n, i, t[11], 3174756917, 10)),
              (i = d(i, o, r, n, t[2], 718787259, 15)),
              (n = d(n, i, o, r, t[9], 3951481745, 21)),
              (this._a = (this._a + r) | 0),
              (this._b = (this._b + n) | 0),
              (this._c = (this._c + i) | 0),
              (this._d = (this._d + o) | 0);
          }),
          (s.prototype._digest = function () {
            (this._block[this._blockOffset++] = 128),
              this._blockOffset > 56 &&
                (this._block.fill(0, this._blockOffset, 64), this._update(), (this._blockOffset = 0)),
              this._block.fill(0, this._blockOffset, 56),
              this._block.writeUInt32LE(this._length[0], 56),
              this._block.writeUInt32LE(this._length[1], 60),
              this._update();
            var t = o.allocUnsafe(16);
            return (
              t.writeInt32LE(this._a, 0),
              t.writeInt32LE(this._b, 4),
              t.writeInt32LE(this._c, 8),
              t.writeInt32LE(this._d, 12),
              t
            );
          }),
          (e.exports = s);
      },
      { 'hash-base': 65, inherits: 80, 'safe-buffer': 121 },
    ],
    92: [
      function (t, e, r) {
        function n(t, e) {
          if (!t) throw new Error(e || 'Assertion failed');
        }
        (e.exports = n),
          (n.equal = function (t, e, r) {
            if (t != e) throw new Error(r || 'Assertion failed: ' + t + ' != ' + e);
          });
      },
      {},
    ],
    93: [
      function (t, e, r) {
        'use strict';
        var n = r;
        function i(t) {
          return 1 === t.length ? '0' + t : t;
        }
        function o(t) {
          for (var e = '', r = 0; r < t.length; r++) e += i(t[r].toString(16));
          return e;
        }
        (n.toArray = function (t, e) {
          if (Array.isArray(t)) return t.slice();
          if (!t) return [];
          var r = [];
          if ('string' != typeof t) {
            for (var n = 0; n < t.length; n++) r[n] = 0 | t[n];
            return r;
          }
          if ('hex' === e) {
            (t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 && (t = '0' + t);
            for (n = 0; n < t.length; n += 2) r.push(parseInt(t[n] + t[n + 1], 16));
          } else
            for (n = 0; n < t.length; n++) {
              var i = t.charCodeAt(n),
                o = i >> 8,
                a = 255 & i;
              o ? r.push(o, a) : r.push(a);
            }
          return r;
        }),
          (n.zero2 = i),
          (n.toHex = o),
          (n.encode = function (t, e) {
            return 'hex' === e ? o(t) : t;
          });
      },
      {},
    ],
    94: [
      function (t, e, r) {
        const { Duplex: n } = t('readable-stream'),
          i = t('end-of-stream'),
          o = t('once'),
          a = {};
        class s extends n {
          constructor({ parent: t, name: e }) {
            super({ objectMode: !0 }), (this._parent = t), (this._name = e);
          }
          _read() {}
          _write(t, e, r) {
            this._parent.push({ name: this._name, data: t }), r();
          }
        }
        e.exports = class extends n {
          constructor(t = {}) {
            super(Object.assign({}, t, { objectMode: !0 })), (this._substreams = {});
          }
          createStream(t) {
            if (!t) throw new Error('ObjectMultiplex - name must not be empty');
            if (this._substreams[t]) throw new Error('ObjectMultiplex - Substream for name "${name}" already exists');
            const e = new s({ parent: this, name: t });
            return (
              (this._substreams[t] = e),
              (function (t, e) {
                const r = o(e);
                i(t, { readable: !1 }, r), i(t, { writable: !1 }, r);
              })(this, (t) => {
                e.destroy(t);
              }),
              e
            );
          }
          ignoreStream(t) {
            if (!t) throw new Error('ObjectMultiplex - name must not be empty');
            if (this._substreams[t]) throw new Error('ObjectMultiplex - Substream for name "${name}" already exists');
            this._substreams[t] = a;
          }
          _read() {}
          _write(t, e, r) {
            const n = t.name,
              i = t.data;
            if (!n) return console.warn(`ObjectMultiplex - malformed chunk without name "${t}"`), r();
            const o = this._substreams[n];
            if (!o) return console.warn(`ObjectMultiplex - orphaned data for stream "${n}"`), r();
            o !== a && o.push(i), r();
          }
        };
      },
      { 'end-of-stream': 41, once: 96, 'readable-stream': 116 },
    ],
    95: [
      function (t, e, r) {
        /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
        'use strict';
        var n = Object.getOwnPropertySymbols,
          i = Object.prototype.hasOwnProperty,
          o = Object.prototype.propertyIsEnumerable;
        function a(t) {
          if (null == t) throw new TypeError('Object.assign cannot be called with null or undefined');
          return Object(t);
        }
        e.exports = (function () {
          try {
            if (!Object.assign) return !1;
            var t = new String('abc');
            if (((t[5] = 'de'), '5' === Object.getOwnPropertyNames(t)[0])) return !1;
            for (var e = {}, r = 0; r < 10; r++) e['_' + String.fromCharCode(r)] = r;
            if (
              '0123456789' !==
              Object.getOwnPropertyNames(e)
                .map(function (t) {
                  return e[t];
                })
                .join('')
            )
              return !1;
            var n = {};
            return (
              'abcdefghijklmnopqrst'.split('').forEach(function (t) {
                n[t] = t;
              }),
              'abcdefghijklmnopqrst' === Object.keys(Object.assign({}, n)).join('')
            );
          } catch (t) {
            return !1;
          }
        })()
          ? Object.assign
          : function (t, e) {
              for (var r, s, f = a(t), u = 1; u < arguments.length; u++) {
                for (var c in (r = Object(arguments[u]))) i.call(r, c) && (f[c] = r[c]);
                if (n) {
                  s = n(r);
                  for (var h = 0; h < s.length; h++) o.call(r, s[h]) && (f[s[h]] = r[s[h]]);
                }
              }
              return f;
            };
      },
      {},
    ],
    96: [
      function (t, e, r) {
        var n = t('wrappy');
        function i(t) {
          var e = function () {
            return e.called ? e.value : ((e.called = !0), (e.value = t.apply(this, arguments)));
          };
          return (e.called = !1), e;
        }
        function o(t) {
          var e = function () {
              if (e.called) throw new Error(e.onceError);
              return (e.called = !0), (e.value = t.apply(this, arguments));
            },
            r = t.name || 'Function wrapped with `once`';
          return (e.onceError = r + " shouldn't be called more than once"), (e.called = !1), e;
        }
        (e.exports = n(i)),
          (e.exports.strict = n(o)),
          (i.proto = i(function () {
            Object.defineProperty(Function.prototype, 'once', {
              value: function () {
                return i(this);
              },
              configurable: !0,
            }),
              Object.defineProperty(Function.prototype, 'onceStrict', {
                value: function () {
                  return o(this);
                },
                configurable: !0,
              });
          }));
      },
      { wrappy: 137 },
    ],
    97: [
      function (t, e, r) {
        var n,
          i,
          o = (e.exports = {});
        function a() {
          throw new Error('setTimeout has not been defined');
        }
        function s() {
          throw new Error('clearTimeout has not been defined');
        }
        function f(t) {
          if (n === setTimeout) return setTimeout(t, 0);
          if ((n === a || !n) && setTimeout) return (n = setTimeout), setTimeout(t, 0);
          try {
            return n(t, 0);
          } catch (e) {
            try {
              return n.call(null, t, 0);
            } catch (e) {
              return n.call(this, t, 0);
            }
          }
        }
        !(function () {
          try {
            n = 'function' == typeof setTimeout ? setTimeout : a;
          } catch (t) {
            n = a;
          }
          try {
            i = 'function' == typeof clearTimeout ? clearTimeout : s;
          } catch (t) {
            i = s;
          }
        })();
        var u,
          c = [],
          h = !1,
          d = -1;
        function l() {
          h && u && ((h = !1), u.length ? (c = u.concat(c)) : (d = -1), c.length && p());
        }
        function p() {
          if (!h) {
            var t = f(l);
            h = !0;
            for (var e = c.length; e; ) {
              for (u = c, c = []; ++d < e; ) u && u[d].run();
              (d = -1), (e = c.length);
            }
            (u = null),
              (h = !1),
              (function (t) {
                if (i === clearTimeout) return clearTimeout(t);
                if ((i === s || !i) && clearTimeout) return (i = clearTimeout), clearTimeout(t);
                try {
                  i(t);
                } catch (e) {
                  try {
                    return i.call(null, t);
                  } catch (e) {
                    return i.call(this, t);
                  }
                }
              })(t);
          }
        }
        function b(t, e) {
          (this.fun = t), (this.array = e);
        }
        function m() {}
        (o.nextTick = function (t) {
          var e = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
          c.push(new b(t, e)), 1 !== c.length || h || f(p);
        }),
          (b.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (o.title = 'browser'),
          (o.browser = !0),
          (o.env = {}),
          (o.argv = []),
          (o.version = ''),
          (o.versions = {}),
          (o.on = m),
          (o.addListener = m),
          (o.once = m),
          (o.off = m),
          (o.removeListener = m),
          (o.removeAllListeners = m),
          (o.emit = m),
          (o.prependListener = m),
          (o.prependOnceListener = m),
          (o.listeners = function (t) {
            return [];
          }),
          (o.binding = function (t) {
            throw new Error('process.binding is not supported');
          }),
          (o.cwd = function () {
            return '/';
          }),
          (o.chdir = function (t) {
            throw new Error('process.chdir is not supported');
          }),
          (o.umask = function () {
            return 0;
          });
      },
      {},
    ],
    98: [
      function (t, e, r) {
        (function (r) {
          var n = t('once'),
            i = t('end-of-stream'),
            o = t('fs'),
            a = function () {},
            s = /^v?\.0/.test(r.version),
            f = function (t) {
              return 'function' == typeof t;
            },
            u = function (t, e, r, u) {
              u = n(u);
              var c = !1;
              t.on('close', function () {
                c = !0;
              }),
                i(t, { readable: e, writable: r }, function (t) {
                  if (t) return u(t);
                  (c = !0), u();
                });
              var h = !1;
              return function (e) {
                if (!c && !h)
                  return (
                    (h = !0),
                    (function (t) {
                      return (
                        !!s &&
                        !!o &&
                        (t instanceof (o.ReadStream || a) || t instanceof (o.WriteStream || a)) &&
                        f(t.close)
                      );
                    })(t)
                      ? t.close(a)
                      : (function (t) {
                          return t.setHeader && f(t.abort);
                        })(t)
                      ? t.abort()
                      : f(t.destroy)
                      ? t.destroy()
                      : void u(e || new Error('stream was destroyed'))
                  );
              };
            },
            c = function (t) {
              t();
            },
            h = function (t, e) {
              return t.pipe(e);
            };
          e.exports = function () {
            var t,
              e = Array.prototype.slice.call(arguments),
              r = (f(e[e.length - 1] || a) && e.pop()) || a;
            if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
              throw new Error('pump requires two streams per minimum');
            var n = e.map(function (i, o) {
              var a = o < e.length - 1;
              return u(i, a, o > 0, function (e) {
                t || (t = e), e && n.forEach(c), a || (n.forEach(c), r(t));
              });
            });
            return e.reduce(h);
          };
        }.call(this, t('_process')));
      },
      { _process: 97, 'end-of-stream': 41, fs: 17, once: 96 },
    ],
    99: [
      function (t, e, r) {
        'use strict';
        function n(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }
        e.exports = function (t, e, r, o) {
          (e = e || '&'), (r = r || '=');
          var a = {};
          if ('string' != typeof t || 0 === t.length) return a;
          var s = /\+/g;
          t = t.split(e);
          var f = 1e3;
          o && 'number' == typeof o.maxKeys && (f = o.maxKeys);
          var u = t.length;
          f > 0 && u > f && (u = f);
          for (var c = 0; c < u; ++c) {
            var h,
              d,
              l,
              p,
              b = t[c].replace(s, '%20'),
              m = b.indexOf(r);
            m >= 0 ? ((h = b.substr(0, m)), (d = b.substr(m + 1))) : ((h = b), (d = '')),
              (l = decodeURIComponent(h)),
              (p = decodeURIComponent(d)),
              n(a, l) ? (i(a[l]) ? a[l].push(p) : (a[l] = [a[l], p])) : (a[l] = p);
          }
          return a;
        };
        var i =
          Array.isArray ||
          function (t) {
            return '[object Array]' === Object.prototype.toString.call(t);
          };
      },
      {},
    ],
    100: [
      function (t, e, r) {
        'use strict';
        var n = function (t) {
          switch (typeof t) {
            case 'string':
              return t;
            case 'boolean':
              return t ? 'true' : 'false';
            case 'number':
              return isFinite(t) ? t : '';
            default:
              return '';
          }
        };
        e.exports = function (t, e, r, s) {
          return (
            (e = e || '&'),
            (r = r || '='),
            null === t && (t = void 0),
            'object' == typeof t
              ? o(a(t), function (a) {
                  var s = encodeURIComponent(n(a)) + r;
                  return i(t[a])
                    ? o(t[a], function (t) {
                        return s + encodeURIComponent(n(t));
                      }).join(e)
                    : s + encodeURIComponent(n(t[a]));
                }).join(e)
              : s
              ? encodeURIComponent(n(s)) + r + encodeURIComponent(n(t))
              : ''
          );
        };
        var i =
          Array.isArray ||
          function (t) {
            return '[object Array]' === Object.prototype.toString.call(t);
          };
        function o(t, e) {
          if (t.map) return t.map(e);
          for (var r = [], n = 0; n < t.length; n++) r.push(e(t[n], n));
          return r;
        }
        var a =
          Object.keys ||
          function (t) {
            var e = [];
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
            return e;
          };
      },
      {},
    ],
    101: [
      function (t, e, r) {
        'use strict';
        (r.decode = r.parse = t('./decode')), (r.encode = r.stringify = t('./encode'));
      },
      { './decode': 99, './encode': 100 },
    ],
    102: [
      function (t, e, r) {
        (function (r, n) {
          'use strict';
          var i = t('safe-buffer').Buffer,
            o = n.crypto || n.msCrypto;
          o && o.getRandomValues
            ? (e.exports = function (t, e) {
                if (t > 4294967295) throw new RangeError('requested too many random bytes');
                var n = i.allocUnsafe(t);
                if (t > 0)
                  if (t > 65536) for (var a = 0; a < t; a += 65536) o.getRandomValues(n.slice(a, a + 65536));
                  else o.getRandomValues(n);
                if ('function' == typeof e)
                  return r.nextTick(function () {
                    e(null, n);
                  });
                return n;
              })
            : (e.exports = function () {
                throw new Error(
                  'Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11'
                );
              });
        }.call(
          this,
          t('_process'),
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      { _process: 97, 'safe-buffer': 121 },
    ],
    103: [
      function (t, e, r) {
        e.exports = t('./lib/_stream_duplex.js');
      },
      { './lib/_stream_duplex.js': 104 },
    ],
    104: [
      function (t, e, r) {
        'use strict';
        var n = t('process-nextick-args'),
          i =
            Object.keys ||
            function (t) {
              var e = [];
              for (var r in t) e.push(r);
              return e;
            };
        e.exports = h;
        var o = Object.create(t('core-util-is'));
        o.inherits = t('inherits');
        var a = t('./_stream_readable'),
          s = t('./_stream_writable');
        o.inherits(h, a);
        for (var f = i(s.prototype), u = 0; u < f.length; u++) {
          var c = f[u];
          h.prototype[c] || (h.prototype[c] = s.prototype[c]);
        }
        function h(t) {
          if (!(this instanceof h)) return new h(t);
          a.call(this, t),
            s.call(this, t),
            t && !1 === t.readable && (this.readable = !1),
            t && !1 === t.writable && (this.writable = !1),
            (this.allowHalfOpen = !0),
            t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1),
            this.once('end', d);
        }
        function d() {
          this.allowHalfOpen || this._writableState.ended || n.nextTick(l, this);
        }
        function l(t) {
          t.end();
        }
        Object.defineProperty(h.prototype, 'writableHighWaterMark', {
          enumerable: !1,
          get: function () {
            return this._writableState.highWaterMark;
          },
        }),
          Object.defineProperty(h.prototype, 'destroyed', {
            get: function () {
              return (
                void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                this._readableState.destroyed &&
                this._writableState.destroyed
              );
            },
            set: function (t) {
              void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                ((this._readableState.destroyed = t), (this._writableState.destroyed = t));
            },
          }),
          (h.prototype._destroy = function (t, e) {
            this.push(null), this.end(), n.nextTick(e, t);
          });
      },
      {
        './_stream_readable': 106,
        './_stream_writable': 108,
        'core-util-is': 23,
        inherits: 80,
        'process-nextick-args': 112,
      },
    ],
    105: [
      function (t, e, r) {
        'use strict';
        e.exports = o;
        var n = t('./_stream_transform'),
          i = Object.create(t('core-util-is'));
        function o(t) {
          if (!(this instanceof o)) return new o(t);
          n.call(this, t);
        }
        (i.inherits = t('inherits')),
          i.inherits(o, n),
          (o.prototype._transform = function (t, e, r) {
            r(null, t);
          });
      },
      { './_stream_transform': 107, 'core-util-is': 23, inherits: 80 },
    ],
    106: [
      function (t, e, r) {
        (function (r, n) {
          'use strict';
          var i = t('process-nextick-args');
          e.exports = y;
          var o,
            a = t('isarray');
          y.ReadableState = g;
          t('events').EventEmitter;
          var s = function (t, e) {
              return t.listeners(e).length;
            },
            f = t('./internal/streams/stream'),
            u = t('safe-buffer').Buffer,
            c = n.Uint8Array || function () {};
          var h = Object.create(t('core-util-is'));
          h.inherits = t('inherits');
          var d = t('util'),
            l = void 0;
          l = d && d.debuglog ? d.debuglog('stream') : function () {};
          var p,
            b = t('./internal/streams/BufferList'),
            m = t('./internal/streams/destroy');
          h.inherits(y, f);
          var v = ['error', 'close', 'destroy', 'pause', 'resume'];
          function g(e, r) {
            e = e || {};
            var n = r instanceof (o = o || t('./_stream_duplex'));
            (this.objectMode = !!e.objectMode), n && (this.objectMode = this.objectMode || !!e.readableObjectMode);
            var i = e.highWaterMark,
              a = e.readableHighWaterMark,
              s = this.objectMode ? 16 : 16384;
            (this.highWaterMark = i || 0 === i ? i : n && (a || 0 === a) ? a : s),
              (this.highWaterMark = Math.floor(this.highWaterMark)),
              (this.buffer = new b()),
              (this.length = 0),
              (this.pipes = null),
              (this.pipesCount = 0),
              (this.flowing = null),
              (this.ended = !1),
              (this.endEmitted = !1),
              (this.reading = !1),
              (this.sync = !0),
              (this.needReadable = !1),
              (this.emittedReadable = !1),
              (this.readableListening = !1),
              (this.resumeScheduled = !1),
              (this.destroyed = !1),
              (this.defaultEncoding = e.defaultEncoding || 'utf8'),
              (this.awaitDrain = 0),
              (this.readingMore = !1),
              (this.decoder = null),
              (this.encoding = null),
              e.encoding &&
                (p || (p = t('string_decoder/').StringDecoder),
                (this.decoder = new p(e.encoding)),
                (this.encoding = e.encoding));
          }
          function y(e) {
            if (((o = o || t('./_stream_duplex')), !(this instanceof y))) return new y(e);
            (this._readableState = new g(e, this)),
              (this.readable = !0),
              e &&
                ('function' == typeof e.read && (this._read = e.read),
                'function' == typeof e.destroy && (this._destroy = e.destroy)),
              f.call(this);
          }
          function w(t, e, r, n, i) {
            var o,
              a = t._readableState;
            null === e
              ? ((a.reading = !1),
                (function (t, e) {
                  if (e.ended) return;
                  if (e.decoder) {
                    var r = e.decoder.end();
                    r && r.length && (e.buffer.push(r), (e.length += e.objectMode ? 1 : r.length));
                  }
                  (e.ended = !0), x(t);
                })(t, a))
              : (i ||
                  (o = (function (t, e) {
                    var r;
                    (n = e),
                      u.isBuffer(n) ||
                        n instanceof c ||
                        'string' == typeof e ||
                        void 0 === e ||
                        t.objectMode ||
                        (r = new TypeError('Invalid non-string/buffer chunk'));
                    var n;
                    return r;
                  })(a, e)),
                o
                  ? t.emit('error', o)
                  : a.objectMode || (e && e.length > 0)
                  ? ('string' == typeof e ||
                      a.objectMode ||
                      Object.getPrototypeOf(e) === u.prototype ||
                      (e = (function (t) {
                        return u.from(t);
                      })(e)),
                    n
                      ? a.endEmitted
                        ? t.emit('error', new Error('stream.unshift() after end event'))
                        : _(t, a, e, !0)
                      : a.ended
                      ? t.emit('error', new Error('stream.push() after EOF'))
                      : ((a.reading = !1),
                        a.decoder && !r
                          ? ((e = a.decoder.write(e)), a.objectMode || 0 !== e.length ? _(t, a, e, !1) : A(t, a))
                          : _(t, a, e, !1)))
                  : n || (a.reading = !1));
            return (function (t) {
              return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length);
            })(a);
          }
          function _(t, e, r, n) {
            e.flowing && 0 === e.length && !e.sync
              ? (t.emit('data', r), t.read(0))
              : ((e.length += e.objectMode ? 1 : r.length),
                n ? e.buffer.unshift(r) : e.buffer.push(r),
                e.needReadable && x(t)),
              A(t, e);
          }
          Object.defineProperty(y.prototype, 'destroyed', {
            get: function () {
              return void 0 !== this._readableState && this._readableState.destroyed;
            },
            set: function (t) {
              this._readableState && (this._readableState.destroyed = t);
            },
          }),
            (y.prototype.destroy = m.destroy),
            (y.prototype._undestroy = m.undestroy),
            (y.prototype._destroy = function (t, e) {
              this.push(null), e(t);
            }),
            (y.prototype.push = function (t, e) {
              var r,
                n = this._readableState;
              return (
                n.objectMode
                  ? (r = !0)
                  : 'string' == typeof t &&
                    ((e = e || n.defaultEncoding) !== n.encoding && ((t = u.from(t, e)), (e = '')), (r = !0)),
                w(this, t, e, !1, r)
              );
            }),
            (y.prototype.unshift = function (t) {
              return w(this, t, null, !0, !1);
            }),
            (y.prototype.isPaused = function () {
              return !1 === this._readableState.flowing;
            }),
            (y.prototype.setEncoding = function (e) {
              return (
                p || (p = t('string_decoder/').StringDecoder),
                (this._readableState.decoder = new p(e)),
                (this._readableState.encoding = e),
                this
              );
            });
          function M(t, e) {
            return t <= 0 || (0 === e.length && e.ended)
              ? 0
              : e.objectMode
              ? 1
              : t != t
              ? e.flowing && e.length
                ? e.buffer.head.data.length
                : e.length
              : (t > e.highWaterMark &&
                  (e.highWaterMark = (function (t) {
                    return (
                      t >= 8388608
                        ? (t = 8388608)
                        : (t--, (t |= t >>> 1), (t |= t >>> 2), (t |= t >>> 4), (t |= t >>> 8), (t |= t >>> 16), t++),
                      t
                    );
                  })(t)),
                t <= e.length ? t : e.ended ? e.length : ((e.needReadable = !0), 0));
          }
          function x(t) {
            var e = t._readableState;
            (e.needReadable = !1),
              e.emittedReadable ||
                (l('emitReadable', e.flowing), (e.emittedReadable = !0), e.sync ? i.nextTick(S, t) : S(t));
          }
          function S(t) {
            l('emit readable'), t.emit('readable'), T(t);
          }
          function A(t, e) {
            e.readingMore || ((e.readingMore = !0), i.nextTick(E, t, e));
          }
          function E(t, e) {
            for (
              var r = e.length;
              !e.reading &&
              !e.flowing &&
              !e.ended &&
              e.length < e.highWaterMark &&
              (l('maybeReadMore read 0'), t.read(0), r !== e.length);

            )
              r = e.length;
            e.readingMore = !1;
          }
          function k(t) {
            l('readable nexttick read 0'), t.read(0);
          }
          function I(t, e) {
            e.reading || (l('resume read 0'), t.read(0)),
              (e.resumeScheduled = !1),
              (e.awaitDrain = 0),
              t.emit('resume'),
              T(t),
              e.flowing && !e.reading && t.read(0);
          }
          function T(t) {
            var e = t._readableState;
            for (l('flow', e.flowing); e.flowing && null !== t.read(); );
          }
          function R(t, e) {
            return 0 === e.length
              ? null
              : (e.objectMode
                  ? (r = e.buffer.shift())
                  : !t || t >= e.length
                  ? ((r = e.decoder
                      ? e.buffer.join('')
                      : 1 === e.buffer.length
                      ? e.buffer.head.data
                      : e.buffer.concat(e.length)),
                    e.buffer.clear())
                  : (r = (function (t, e, r) {
                      var n;
                      t < e.head.data.length
                        ? ((n = e.head.data.slice(0, t)), (e.head.data = e.head.data.slice(t)))
                        : (n =
                            t === e.head.data.length
                              ? e.shift()
                              : r
                              ? (function (t, e) {
                                  var r = e.head,
                                    n = 1,
                                    i = r.data;
                                  t -= i.length;
                                  for (; (r = r.next); ) {
                                    var o = r.data,
                                      a = t > o.length ? o.length : t;
                                    if ((a === o.length ? (i += o) : (i += o.slice(0, t)), 0 === (t -= a))) {
                                      a === o.length
                                        ? (++n, r.next ? (e.head = r.next) : (e.head = e.tail = null))
                                        : ((e.head = r), (r.data = o.slice(a)));
                                      break;
                                    }
                                    ++n;
                                  }
                                  return (e.length -= n), i;
                                })(t, e)
                              : (function (t, e) {
                                  var r = u.allocUnsafe(t),
                                    n = e.head,
                                    i = 1;
                                  n.data.copy(r), (t -= n.data.length);
                                  for (; (n = n.next); ) {
                                    var o = n.data,
                                      a = t > o.length ? o.length : t;
                                    if ((o.copy(r, r.length - t, 0, a), 0 === (t -= a))) {
                                      a === o.length
                                        ? (++i, n.next ? (e.head = n.next) : (e.head = e.tail = null))
                                        : ((e.head = n), (n.data = o.slice(a)));
                                      break;
                                    }
                                    ++i;
                                  }
                                  return (e.length -= i), r;
                                })(t, e));
                      return n;
                    })(t, e.buffer, e.decoder)),
                r);
            var r;
          }
          function j(t) {
            var e = t._readableState;
            if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
            e.endEmitted || ((e.ended = !0), i.nextTick(O, e, t));
          }
          function O(t, e) {
            t.endEmitted || 0 !== t.length || ((t.endEmitted = !0), (e.readable = !1), e.emit('end'));
          }
          function B(t, e) {
            for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
            return -1;
          }
          (y.prototype.read = function (t) {
            l('read', t), (t = parseInt(t, 10));
            var e = this._readableState,
              r = t;
            if (
              (0 !== t && (e.emittedReadable = !1),
              0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended))
            )
              return l('read: emitReadable', e.length, e.ended), 0 === e.length && e.ended ? j(this) : x(this), null;
            if (0 === (t = M(t, e)) && e.ended) return 0 === e.length && j(this), null;
            var n,
              i = e.needReadable;
            return (
              l('need readable', i),
              (0 === e.length || e.length - t < e.highWaterMark) && l('length less than watermark', (i = !0)),
              e.ended || e.reading
                ? l('reading or ended', (i = !1))
                : i &&
                  (l('do read'),
                  (e.reading = !0),
                  (e.sync = !0),
                  0 === e.length && (e.needReadable = !0),
                  this._read(e.highWaterMark),
                  (e.sync = !1),
                  e.reading || (t = M(r, e))),
              null === (n = t > 0 ? R(t, e) : null) ? ((e.needReadable = !0), (t = 0)) : (e.length -= t),
              0 === e.length && (e.ended || (e.needReadable = !0), r !== t && e.ended && j(this)),
              null !== n && this.emit('data', n),
              n
            );
          }),
            (y.prototype._read = function (t) {
              this.emit('error', new Error('_read() is not implemented'));
            }),
            (y.prototype.pipe = function (t, e) {
              var n = this,
                o = this._readableState;
              switch (o.pipesCount) {
                case 0:
                  o.pipes = t;
                  break;
                case 1:
                  o.pipes = [o.pipes, t];
                  break;
                default:
                  o.pipes.push(t);
              }
              (o.pipesCount += 1), l('pipe count=%d opts=%j', o.pipesCount, e);
              var f = (!e || !1 !== e.end) && t !== r.stdout && t !== r.stderr ? c : y;
              function u(e, r) {
                l('onunpipe'),
                  e === n &&
                    r &&
                    !1 === r.hasUnpiped &&
                    ((r.hasUnpiped = !0),
                    l('cleanup'),
                    t.removeListener('close', v),
                    t.removeListener('finish', g),
                    t.removeListener('drain', h),
                    t.removeListener('error', m),
                    t.removeListener('unpipe', u),
                    n.removeListener('end', c),
                    n.removeListener('end', y),
                    n.removeListener('data', b),
                    (d = !0),
                    !o.awaitDrain || (t._writableState && !t._writableState.needDrain) || h());
              }
              function c() {
                l('onend'), t.end();
              }
              o.endEmitted ? i.nextTick(f) : n.once('end', f), t.on('unpipe', u);
              var h = (function (t) {
                return function () {
                  var e = t._readableState;
                  l('pipeOnDrain', e.awaitDrain),
                    e.awaitDrain && e.awaitDrain--,
                    0 === e.awaitDrain && s(t, 'data') && ((e.flowing = !0), T(t));
                };
              })(n);
              t.on('drain', h);
              var d = !1;
              var p = !1;
              function b(e) {
                l('ondata'),
                  (p = !1),
                  !1 !== t.write(e) ||
                    p ||
                    (((1 === o.pipesCount && o.pipes === t) || (o.pipesCount > 1 && -1 !== B(o.pipes, t))) &&
                      !d &&
                      (l('false write response, pause', n._readableState.awaitDrain),
                      n._readableState.awaitDrain++,
                      (p = !0)),
                    n.pause());
              }
              function m(e) {
                l('onerror', e), y(), t.removeListener('error', m), 0 === s(t, 'error') && t.emit('error', e);
              }
              function v() {
                t.removeListener('finish', g), y();
              }
              function g() {
                l('onfinish'), t.removeListener('close', v), y();
              }
              function y() {
                l('unpipe'), n.unpipe(t);
              }
              return (
                n.on('data', b),
                (function (t, e, r) {
                  if ('function' == typeof t.prependListener) return t.prependListener(e, r);
                  t._events && t._events[e]
                    ? a(t._events[e])
                      ? t._events[e].unshift(r)
                      : (t._events[e] = [r, t._events[e]])
                    : t.on(e, r);
                })(t, 'error', m),
                t.once('close', v),
                t.once('finish', g),
                t.emit('pipe', n),
                o.flowing || (l('pipe resume'), n.resume()),
                t
              );
            }),
            (y.prototype.unpipe = function (t) {
              var e = this._readableState,
                r = { hasUnpiped: !1 };
              if (0 === e.pipesCount) return this;
              if (1 === e.pipesCount)
                return (
                  (t && t !== e.pipes) ||
                    (t || (t = e.pipes),
                    (e.pipes = null),
                    (e.pipesCount = 0),
                    (e.flowing = !1),
                    t && t.emit('unpipe', this, r)),
                  this
                );
              if (!t) {
                var n = e.pipes,
                  i = e.pipesCount;
                (e.pipes = null), (e.pipesCount = 0), (e.flowing = !1);
                for (var o = 0; o < i; o++) n[o].emit('unpipe', this, r);
                return this;
              }
              var a = B(e.pipes, t);
              return (
                -1 === a ||
                  (e.pipes.splice(a, 1),
                  (e.pipesCount -= 1),
                  1 === e.pipesCount && (e.pipes = e.pipes[0]),
                  t.emit('unpipe', this, r)),
                this
              );
            }),
            (y.prototype.on = function (t, e) {
              var r = f.prototype.on.call(this, t, e);
              if ('data' === t) !1 !== this._readableState.flowing && this.resume();
              else if ('readable' === t) {
                var n = this._readableState;
                n.endEmitted ||
                  n.readableListening ||
                  ((n.readableListening = n.needReadable = !0),
                  (n.emittedReadable = !1),
                  n.reading ? n.length && x(this) : i.nextTick(k, this));
              }
              return r;
            }),
            (y.prototype.addListener = y.prototype.on),
            (y.prototype.resume = function () {
              var t = this._readableState;
              return (
                t.flowing ||
                  (l('resume'),
                  (t.flowing = !0),
                  (function (t, e) {
                    e.resumeScheduled || ((e.resumeScheduled = !0), i.nextTick(I, t, e));
                  })(this, t)),
                this
              );
            }),
            (y.prototype.pause = function () {
              return (
                l('call pause flowing=%j', this._readableState.flowing),
                !1 !== this._readableState.flowing &&
                  (l('pause'), (this._readableState.flowing = !1), this.emit('pause')),
                this
              );
            }),
            (y.prototype.wrap = function (t) {
              var e = this,
                r = this._readableState,
                n = !1;
              for (var i in (t.on('end', function () {
                if ((l('wrapped end'), r.decoder && !r.ended)) {
                  var t = r.decoder.end();
                  t && t.length && e.push(t);
                }
                e.push(null);
              }),
              t.on('data', function (i) {
                (l('wrapped data'), r.decoder && (i = r.decoder.write(i)), r.objectMode && null == i) ||
                  ((r.objectMode || (i && i.length)) && (e.push(i) || ((n = !0), t.pause())));
              }),
              t))
                void 0 === this[i] &&
                  'function' == typeof t[i] &&
                  (this[i] = (function (e) {
                    return function () {
                      return t[e].apply(t, arguments);
                    };
                  })(i));
              for (var o = 0; o < v.length; o++) t.on(v[o], this.emit.bind(this, v[o]));
              return (
                (this._read = function (e) {
                  l('wrapped _read', e), n && ((n = !1), t.resume());
                }),
                this
              );
            }),
            Object.defineProperty(y.prototype, 'readableHighWaterMark', {
              enumerable: !1,
              get: function () {
                return this._readableState.highWaterMark;
              },
            }),
            (y._fromList = R);
        }.call(
          this,
          t('_process'),
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      {
        './_stream_duplex': 104,
        './internal/streams/BufferList': 109,
        './internal/streams/destroy': 110,
        './internal/streams/stream': 111,
        _process: 97,
        'core-util-is': 23,
        events: 19,
        inherits: 80,
        isarray: 83,
        'process-nextick-args': 112,
        'safe-buffer': 113,
        'string_decoder/': 114,
        util: 17,
      },
    ],
    107: [
      function (t, e, r) {
        'use strict';
        e.exports = a;
        var n = t('./_stream_duplex'),
          i = Object.create(t('core-util-is'));
        function o(t, e) {
          var r = this._transformState;
          r.transforming = !1;
          var n = r.writecb;
          if (!n) return this.emit('error', new Error('write callback called multiple times'));
          (r.writechunk = null), (r.writecb = null), null != e && this.push(e), n(t);
          var i = this._readableState;
          (i.reading = !1), (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
        }
        function a(t) {
          if (!(this instanceof a)) return new a(t);
          n.call(this, t),
            (this._transformState = {
              afterTransform: o.bind(this),
              needTransform: !1,
              transforming: !1,
              writecb: null,
              writechunk: null,
              writeencoding: null,
            }),
            (this._readableState.needReadable = !0),
            (this._readableState.sync = !1),
            t &&
              ('function' == typeof t.transform && (this._transform = t.transform),
              'function' == typeof t.flush && (this._flush = t.flush)),
            this.on('prefinish', s);
        }
        function s() {
          var t = this;
          'function' == typeof this._flush
            ? this._flush(function (e, r) {
                f(t, e, r);
              })
            : f(this, null, null);
        }
        function f(t, e, r) {
          if (e) return t.emit('error', e);
          if ((null != r && t.push(r), t._writableState.length))
            throw new Error('Calling transform done when ws.length != 0');
          if (t._transformState.transforming) throw new Error('Calling transform done when still transforming');
          return t.push(null);
        }
        (i.inherits = t('inherits')),
          i.inherits(a, n),
          (a.prototype.push = function (t, e) {
            return (this._transformState.needTransform = !1), n.prototype.push.call(this, t, e);
          }),
          (a.prototype._transform = function (t, e, r) {
            throw new Error('_transform() is not implemented');
          }),
          (a.prototype._write = function (t, e, r) {
            var n = this._transformState;
            if (((n.writecb = r), (n.writechunk = t), (n.writeencoding = e), !n.transforming)) {
              var i = this._readableState;
              (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
            }
          }),
          (a.prototype._read = function (t) {
            var e = this._transformState;
            null !== e.writechunk && e.writecb && !e.transforming
              ? ((e.transforming = !0), this._transform(e.writechunk, e.writeencoding, e.afterTransform))
              : (e.needTransform = !0);
          }),
          (a.prototype._destroy = function (t, e) {
            var r = this;
            n.prototype._destroy.call(this, t, function (t) {
              e(t), r.emit('close');
            });
          });
      },
      { './_stream_duplex': 104, 'core-util-is': 23, inherits: 80 },
    ],
    108: [
      function (t, e, r) {
        (function (r, n, i) {
          'use strict';
          var o = t('process-nextick-args');
          function a(t) {
            var e = this;
            (this.next = null),
              (this.entry = null),
              (this.finish = function () {
                !(function (t, e, r) {
                  var n = t.entry;
                  t.entry = null;
                  for (; n; ) {
                    var i = n.callback;
                    e.pendingcb--, i(r), (n = n.next);
                  }
                  e.corkedRequestsFree ? (e.corkedRequestsFree.next = t) : (e.corkedRequestsFree = t);
                })(e, t);
              });
          }
          e.exports = g;
          var s,
            f = !r.browser && ['v0.10', 'v0.9.'].indexOf(r.version.slice(0, 5)) > -1 ? i : o.nextTick;
          g.WritableState = v;
          var u = Object.create(t('core-util-is'));
          u.inherits = t('inherits');
          var c = { deprecate: t('util-deprecate') },
            h = t('./internal/streams/stream'),
            d = t('safe-buffer').Buffer,
            l = n.Uint8Array || function () {};
          var p,
            b = t('./internal/streams/destroy');
          function m() {}
          function v(e, r) {
            (s = s || t('./_stream_duplex')), (e = e || {});
            var n = r instanceof s;
            (this.objectMode = !!e.objectMode), n && (this.objectMode = this.objectMode || !!e.writableObjectMode);
            var i = e.highWaterMark,
              u = e.writableHighWaterMark,
              c = this.objectMode ? 16 : 16384;
            (this.highWaterMark = i || 0 === i ? i : n && (u || 0 === u) ? u : c),
              (this.highWaterMark = Math.floor(this.highWaterMark)),
              (this.finalCalled = !1),
              (this.needDrain = !1),
              (this.ending = !1),
              (this.ended = !1),
              (this.finished = !1),
              (this.destroyed = !1);
            var h = !1 === e.decodeStrings;
            (this.decodeStrings = !h),
              (this.defaultEncoding = e.defaultEncoding || 'utf8'),
              (this.length = 0),
              (this.writing = !1),
              (this.corked = 0),
              (this.sync = !0),
              (this.bufferProcessing = !1),
              (this.onwrite = function (t) {
                !(function (t, e) {
                  var r = t._writableState,
                    n = r.sync,
                    i = r.writecb;
                  if (
                    ((function (t) {
                      (t.writing = !1), (t.writecb = null), (t.length -= t.writelen), (t.writelen = 0);
                    })(r),
                    e)
                  )
                    !(function (t, e, r, n, i) {
                      --e.pendingcb,
                        r
                          ? (o.nextTick(i, n),
                            o.nextTick(S, t, e),
                            (t._writableState.errorEmitted = !0),
                            t.emit('error', n))
                          : (i(n), (t._writableState.errorEmitted = !0), t.emit('error', n), S(t, e));
                    })(t, r, n, e, i);
                  else {
                    var a = M(r);
                    a || r.corked || r.bufferProcessing || !r.bufferedRequest || _(t, r),
                      n ? f(w, t, r, a, i) : w(t, r, a, i);
                  }
                })(r, t);
              }),
              (this.writecb = null),
              (this.writelen = 0),
              (this.bufferedRequest = null),
              (this.lastBufferedRequest = null),
              (this.pendingcb = 0),
              (this.prefinished = !1),
              (this.errorEmitted = !1),
              (this.bufferedRequestCount = 0),
              (this.corkedRequestsFree = new a(this));
          }
          function g(e) {
            if (((s = s || t('./_stream_duplex')), !(p.call(g, this) || this instanceof s))) return new g(e);
            (this._writableState = new v(e, this)),
              (this.writable = !0),
              e &&
                ('function' == typeof e.write && (this._write = e.write),
                'function' == typeof e.writev && (this._writev = e.writev),
                'function' == typeof e.destroy && (this._destroy = e.destroy),
                'function' == typeof e.final && (this._final = e.final)),
              h.call(this);
          }
          function y(t, e, r, n, i, o, a) {
            (e.writelen = n),
              (e.writecb = a),
              (e.writing = !0),
              (e.sync = !0),
              r ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite),
              (e.sync = !1);
          }
          function w(t, e, r, n) {
            r ||
              (function (t, e) {
                0 === e.length && e.needDrain && ((e.needDrain = !1), t.emit('drain'));
              })(t, e),
              e.pendingcb--,
              n(),
              S(t, e);
          }
          function _(t, e) {
            e.bufferProcessing = !0;
            var r = e.bufferedRequest;
            if (t._writev && r && r.next) {
              var n = e.bufferedRequestCount,
                i = new Array(n),
                o = e.corkedRequestsFree;
              o.entry = r;
              for (var s = 0, f = !0; r; ) (i[s] = r), r.isBuf || (f = !1), (r = r.next), (s += 1);
              (i.allBuffers = f),
                y(t, e, !0, e.length, i, '', o.finish),
                e.pendingcb++,
                (e.lastBufferedRequest = null),
                o.next ? ((e.corkedRequestsFree = o.next), (o.next = null)) : (e.corkedRequestsFree = new a(e)),
                (e.bufferedRequestCount = 0);
            } else {
              for (; r; ) {
                var u = r.chunk,
                  c = r.encoding,
                  h = r.callback;
                if (
                  (y(t, e, !1, e.objectMode ? 1 : u.length, u, c, h), (r = r.next), e.bufferedRequestCount--, e.writing)
                )
                  break;
              }
              null === r && (e.lastBufferedRequest = null);
            }
            (e.bufferedRequest = r), (e.bufferProcessing = !1);
          }
          function M(t) {
            return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing;
          }
          function x(t, e) {
            t._final(function (r) {
              e.pendingcb--, r && t.emit('error', r), (e.prefinished = !0), t.emit('prefinish'), S(t, e);
            });
          }
          function S(t, e) {
            var r = M(e);
            return (
              r &&
                (!(function (t, e) {
                  e.prefinished ||
                    e.finalCalled ||
                    ('function' == typeof t._final
                      ? (e.pendingcb++, (e.finalCalled = !0), o.nextTick(x, t, e))
                      : ((e.prefinished = !0), t.emit('prefinish')));
                })(t, e),
                0 === e.pendingcb && ((e.finished = !0), t.emit('finish'))),
              r
            );
          }
          u.inherits(g, h),
            (v.prototype.getBuffer = function () {
              for (var t = this.bufferedRequest, e = []; t; ) e.push(t), (t = t.next);
              return e;
            }),
            (function () {
              try {
                Object.defineProperty(v.prototype, 'buffer', {
                  get: c.deprecate(
                    function () {
                      return this.getBuffer();
                    },
                    '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
                    'DEP0003'
                  ),
                });
              } catch (t) {}
            })(),
            'function' == typeof Symbol &&
            Symbol.hasInstance &&
            'function' == typeof Function.prototype[Symbol.hasInstance]
              ? ((p = Function.prototype[Symbol.hasInstance]),
                Object.defineProperty(g, Symbol.hasInstance, {
                  value: function (t) {
                    return !!p.call(this, t) || (this === g && t && t._writableState instanceof v);
                  },
                }))
              : (p = function (t) {
                  return t instanceof this;
                }),
            (g.prototype.pipe = function () {
              this.emit('error', new Error('Cannot pipe, not readable'));
            }),
            (g.prototype.write = function (t, e, r) {
              var n,
                i = this._writableState,
                a = !1,
                s = !i.objectMode && ((n = t), d.isBuffer(n) || n instanceof l);
              return (
                s &&
                  !d.isBuffer(t) &&
                  (t = (function (t) {
                    return d.from(t);
                  })(t)),
                'function' == typeof e && ((r = e), (e = null)),
                s ? (e = 'buffer') : e || (e = i.defaultEncoding),
                'function' != typeof r && (r = m),
                i.ended
                  ? (function (t, e) {
                      var r = new Error('write after end');
                      t.emit('error', r), o.nextTick(e, r);
                    })(this, r)
                  : (s ||
                      (function (t, e, r, n) {
                        var i = !0,
                          a = !1;
                        return (
                          null === r
                            ? (a = new TypeError('May not write null values to stream'))
                            : 'string' == typeof r ||
                              void 0 === r ||
                              e.objectMode ||
                              (a = new TypeError('Invalid non-string/buffer chunk')),
                          a && (t.emit('error', a), o.nextTick(n, a), (i = !1)),
                          i
                        );
                      })(this, i, t, r)) &&
                    (i.pendingcb++,
                    (a = (function (t, e, r, n, i, o) {
                      if (!r) {
                        var a = (function (t, e, r) {
                          t.objectMode || !1 === t.decodeStrings || 'string' != typeof e || (e = d.from(e, r));
                          return e;
                        })(e, n, i);
                        n !== a && ((r = !0), (i = 'buffer'), (n = a));
                      }
                      var s = e.objectMode ? 1 : n.length;
                      e.length += s;
                      var f = e.length < e.highWaterMark;
                      f || (e.needDrain = !0);
                      if (e.writing || e.corked) {
                        var u = e.lastBufferedRequest;
                        (e.lastBufferedRequest = { chunk: n, encoding: i, isBuf: r, callback: o, next: null }),
                          u ? (u.next = e.lastBufferedRequest) : (e.bufferedRequest = e.lastBufferedRequest),
                          (e.bufferedRequestCount += 1);
                      } else y(t, e, !1, s, n, i, o);
                      return f;
                    })(this, i, s, t, e, r))),
                a
              );
            }),
            (g.prototype.cork = function () {
              this._writableState.corked++;
            }),
            (g.prototype.uncork = function () {
              var t = this._writableState;
              t.corked &&
                (t.corked--,
                t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || _(this, t));
            }),
            (g.prototype.setDefaultEncoding = function (t) {
              if (
                ('string' == typeof t && (t = t.toLowerCase()),
                !(
                  [
                    'hex',
                    'utf8',
                    'utf-8',
                    'ascii',
                    'binary',
                    'base64',
                    'ucs2',
                    'ucs-2',
                    'utf16le',
                    'utf-16le',
                    'raw',
                  ].indexOf((t + '').toLowerCase()) > -1
                ))
              )
                throw new TypeError('Unknown encoding: ' + t);
              return (this._writableState.defaultEncoding = t), this;
            }),
            Object.defineProperty(g.prototype, 'writableHighWaterMark', {
              enumerable: !1,
              get: function () {
                return this._writableState.highWaterMark;
              },
            }),
            (g.prototype._write = function (t, e, r) {
              r(new Error('_write() is not implemented'));
            }),
            (g.prototype._writev = null),
            (g.prototype.end = function (t, e, r) {
              var n = this._writableState;
              'function' == typeof t
                ? ((r = t), (t = null), (e = null))
                : 'function' == typeof e && ((r = e), (e = null)),
                null != t && this.write(t, e),
                n.corked && ((n.corked = 1), this.uncork()),
                n.ending ||
                  n.finished ||
                  (function (t, e, r) {
                    (e.ending = !0), S(t, e), r && (e.finished ? o.nextTick(r) : t.once('finish', r));
                    (e.ended = !0), (t.writable = !1);
                  })(this, n, r);
            }),
            Object.defineProperty(g.prototype, 'destroyed', {
              get: function () {
                return void 0 !== this._writableState && this._writableState.destroyed;
              },
              set: function (t) {
                this._writableState && (this._writableState.destroyed = t);
              },
            }),
            (g.prototype.destroy = b.destroy),
            (g.prototype._undestroy = b.undestroy),
            (g.prototype._destroy = function (t, e) {
              this.end(), e(t);
            });
        }.call(
          this,
          t('_process'),
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {},
          t('timers').setImmediate
        ));
      },
      {
        './_stream_duplex': 104,
        './internal/streams/destroy': 110,
        './internal/streams/stream': 111,
        _process: 97,
        'core-util-is': 23,
        inherits: 80,
        'process-nextick-args': 112,
        'safe-buffer': 113,
        timers: 132,
        'util-deprecate': 133,
      },
    ],
    109: [
      function (t, e, r) {
        'use strict';
        var n = t('safe-buffer').Buffer,
          i = t('util');
        (e.exports = (function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this.head = null),
              (this.tail = null),
              (this.length = 0);
          }
          return (
            (t.prototype.push = function (t) {
              var e = { data: t, next: null };
              this.length > 0 ? (this.tail.next = e) : (this.head = e), (this.tail = e), ++this.length;
            }),
            (t.prototype.unshift = function (t) {
              var e = { data: t, next: this.head };
              0 === this.length && (this.tail = e), (this.head = e), ++this.length;
            }),
            (t.prototype.shift = function () {
              if (0 !== this.length) {
                var t = this.head.data;
                return (
                  1 === this.length ? (this.head = this.tail = null) : (this.head = this.head.next), --this.length, t
                );
              }
            }),
            (t.prototype.clear = function () {
              (this.head = this.tail = null), (this.length = 0);
            }),
            (t.prototype.join = function (t) {
              if (0 === this.length) return '';
              for (var e = this.head, r = '' + e.data; (e = e.next); ) r += t + e.data;
              return r;
            }),
            (t.prototype.concat = function (t) {
              if (0 === this.length) return n.alloc(0);
              if (1 === this.length) return this.head.data;
              for (var e, r, i, o = n.allocUnsafe(t >>> 0), a = this.head, s = 0; a; )
                (e = a.data), (r = o), (i = s), e.copy(r, i), (s += a.data.length), (a = a.next);
              return o;
            }),
            t
          );
        })()),
          i &&
            i.inspect &&
            i.inspect.custom &&
            (e.exports.prototype[i.inspect.custom] = function () {
              var t = i.inspect({ length: this.length });
              return this.constructor.name + ' ' + t;
            });
      },
      { 'safe-buffer': 113, util: 17 },
    ],
    110: [
      function (t, e, r) {
        'use strict';
        var n = t('process-nextick-args');
        function i(t, e) {
          t.emit('error', e);
        }
        e.exports = {
          destroy: function (t, e) {
            var r = this,
              o = this._readableState && this._readableState.destroyed,
              a = this._writableState && this._writableState.destroyed;
            return o || a
              ? (e ? e(t) : !t || (this._writableState && this._writableState.errorEmitted) || n.nextTick(i, this, t),
                this)
              : (this._readableState && (this._readableState.destroyed = !0),
                this._writableState && (this._writableState.destroyed = !0),
                this._destroy(t || null, function (t) {
                  !e && t ? (n.nextTick(i, r, t), r._writableState && (r._writableState.errorEmitted = !0)) : e && e(t);
                }),
                this);
          },
          undestroy: function () {
            this._readableState &&
              ((this._readableState.destroyed = !1),
              (this._readableState.reading = !1),
              (this._readableState.ended = !1),
              (this._readableState.endEmitted = !1)),
              this._writableState &&
                ((this._writableState.destroyed = !1),
                (this._writableState.ended = !1),
                (this._writableState.ending = !1),
                (this._writableState.finished = !1),
                (this._writableState.errorEmitted = !1));
          },
        };
      },
      { 'process-nextick-args': 112 },
    ],
    111: [
      function (t, e, r) {
        e.exports = t('events').EventEmitter;
      },
      { events: 19 },
    ],
    112: [
      function (t, e, r) {
        (function (t) {
          'use strict';
          void 0 === t ||
          !t.version ||
          0 === t.version.indexOf('v0.') ||
          (0 === t.version.indexOf('v1.') && 0 !== t.version.indexOf('v1.8.'))
            ? (e.exports = {
                nextTick: function (e, r, n, i) {
                  if ('function' != typeof e) throw new TypeError('"callback" argument must be a function');
                  var o,
                    a,
                    s = arguments.length;
                  switch (s) {
                    case 0:
                    case 1:
                      return t.nextTick(e);
                    case 2:
                      return t.nextTick(function () {
                        e.call(null, r);
                      });
                    case 3:
                      return t.nextTick(function () {
                        e.call(null, r, n);
                      });
                    case 4:
                      return t.nextTick(function () {
                        e.call(null, r, n, i);
                      });
                    default:
                      for (o = new Array(s - 1), a = 0; a < o.length; ) o[a++] = arguments[a];
                      return t.nextTick(function () {
                        e.apply(null, o);
                      });
                  }
                },
              })
            : (e.exports = t);
        }.call(this, t('_process')));
      },
      { _process: 97 },
    ],
    113: [
      function (t, e, r) {
        arguments[4][20][0].apply(r, arguments);
      },
      { buffer: 18, dup: 20 },
    ],
    114: [
      function (t, e, r) {
        arguments[4][21][0].apply(r, arguments);
      },
      { dup: 21, 'safe-buffer': 113 },
    ],
    115: [
      function (t, e, r) {
        e.exports = t('./readable').PassThrough;
      },
      { './readable': 116 },
    ],
    116: [
      function (t, e, r) {
        ((r = e.exports = t('./lib/_stream_readable.js')).Stream = r),
          (r.Readable = r),
          (r.Writable = t('./lib/_stream_writable.js')),
          (r.Duplex = t('./lib/_stream_duplex.js')),
          (r.Transform = t('./lib/_stream_transform.js')),
          (r.PassThrough = t('./lib/_stream_passthrough.js'));
      },
      {
        './lib/_stream_duplex.js': 104,
        './lib/_stream_passthrough.js': 105,
        './lib/_stream_readable.js': 106,
        './lib/_stream_transform.js': 107,
        './lib/_stream_writable.js': 108,
      },
    ],
    117: [
      function (t, e, r) {
        e.exports = t('./readable').Transform;
      },
      { './readable': 116 },
    ],
    118: [
      function (t, e, r) {
        e.exports = t('./lib/_stream_writable.js');
      },
      { './lib/_stream_writable.js': 108 },
    ],
    119: [
      function (t, e, r) {
        'use strict';
        var n = t('buffer').Buffer,
          i = t('inherits'),
          o = t('hash-base'),
          a = new Array(16),
          s = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
            3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
            4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
          ],
          f = [
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
            15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
            12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
          ],
          u = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13,
            12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6,
            5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
          ],
          c = [
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13,
            11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5,
            15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
          ],
          h = [0, 1518500249, 1859775393, 2400959708, 2840853838],
          d = [1352829926, 1548603684, 1836072691, 2053994217, 0];
        function l() {
          o.call(this, 64),
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878),
            (this._e = 3285377520);
        }
        function p(t, e) {
          return (t << e) | (t >>> (32 - e));
        }
        function b(t, e, r, n, i, o, a, s) {
          return (p((t + (e ^ r ^ n) + o + a) | 0, s) + i) | 0;
        }
        function m(t, e, r, n, i, o, a, s) {
          return (p((t + ((e & r) | (~e & n)) + o + a) | 0, s) + i) | 0;
        }
        function v(t, e, r, n, i, o, a, s) {
          return (p((t + ((e | ~r) ^ n) + o + a) | 0, s) + i) | 0;
        }
        function g(t, e, r, n, i, o, a, s) {
          return (p((t + ((e & n) | (r & ~n)) + o + a) | 0, s) + i) | 0;
        }
        function y(t, e, r, n, i, o, a, s) {
          return (p((t + (e ^ (r | ~n)) + o + a) | 0, s) + i) | 0;
        }
        i(l, o),
          (l.prototype._update = function () {
            for (var t = a, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
            for (
              var r = 0 | this._a,
                n = 0 | this._b,
                i = 0 | this._c,
                o = 0 | this._d,
                l = 0 | this._e,
                w = 0 | this._a,
                _ = 0 | this._b,
                M = 0 | this._c,
                x = 0 | this._d,
                S = 0 | this._e,
                A = 0;
              A < 80;
              A += 1
            ) {
              var E, k;
              A < 16
                ? ((E = b(r, n, i, o, l, t[s[A]], h[0], u[A])), (k = y(w, _, M, x, S, t[f[A]], d[0], c[A])))
                : A < 32
                ? ((E = m(r, n, i, o, l, t[s[A]], h[1], u[A])), (k = g(w, _, M, x, S, t[f[A]], d[1], c[A])))
                : A < 48
                ? ((E = v(r, n, i, o, l, t[s[A]], h[2], u[A])), (k = v(w, _, M, x, S, t[f[A]], d[2], c[A])))
                : A < 64
                ? ((E = g(r, n, i, o, l, t[s[A]], h[3], u[A])), (k = m(w, _, M, x, S, t[f[A]], d[3], c[A])))
                : ((E = y(r, n, i, o, l, t[s[A]], h[4], u[A])), (k = b(w, _, M, x, S, t[f[A]], d[4], c[A]))),
                (r = l),
                (l = o),
                (o = p(i, 10)),
                (i = n),
                (n = E),
                (w = S),
                (S = x),
                (x = p(M, 10)),
                (M = _),
                (_ = k);
            }
            var I = (this._b + i + x) | 0;
            (this._b = (this._c + o + S) | 0),
              (this._c = (this._d + l + w) | 0),
              (this._d = (this._e + r + _) | 0),
              (this._e = (this._a + n + M) | 0),
              (this._a = I);
          }),
          (l.prototype._digest = function () {
            (this._block[this._blockOffset++] = 128),
              this._blockOffset > 56 &&
                (this._block.fill(0, this._blockOffset, 64), this._update(), (this._blockOffset = 0)),
              this._block.fill(0, this._blockOffset, 56),
              this._block.writeUInt32LE(this._length[0], 56),
              this._block.writeUInt32LE(this._length[1], 60),
              this._update();
            var t = n.alloc ? n.alloc(20) : new n(20);
            return (
              t.writeInt32LE(this._a, 0),
              t.writeInt32LE(this._b, 4),
              t.writeInt32LE(this._c, 8),
              t.writeInt32LE(this._d, 12),
              t.writeInt32LE(this._e, 16),
              t
            );
          }),
          (e.exports = l);
      },
      { buffer: 18, 'hash-base': 65, inherits: 80 },
    ],
    120: [
      function (t, e, r) {
        (function (e) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 }), (r.getLength = r.decode = r.encode = void 0);
          var n = t('bn.js');
          function i(t, e) {
            if ('00' === t.slice(0, 2)) throw new Error('invalid RLP: extra zeros');
            return parseInt(t, e);
          }
          function o(t, r) {
            if (t < 56) return e.from([t + r]);
            var n = s(t),
              i = s(r + 55 + n.length / 2);
            return e.from(i + n, 'hex');
          }
          function a(t) {
            return '0x' === t.slice(0, 2);
          }
          function s(t) {
            if (t < 0) throw new Error('Invalid integer as argument, must be unsigned!');
            var e = t.toString(16);
            return e.length % 2 ? '0' + e : e;
          }
          function f(t) {
            if (!e.isBuffer(t)) {
              if ('string' == typeof t)
                return a(t)
                  ? e.from((i = 'string' != typeof (o = t) ? o : a(o) ? o.slice(2) : o).length % 2 ? '0' + i : i, 'hex')
                  : e.from(t);
              if ('number' == typeof t || 'bigint' == typeof t) return t ? ((r = s(t)), e.from(r, 'hex')) : e.from([]);
              if (null == t) return e.from([]);
              if (t instanceof Uint8Array) return e.from(t);
              if (n.isBN(t)) return e.from(t.toArray());
              throw new Error('invalid type');
            }
            var r, i, o;
            return t;
          }
          (r.encode = function t(r) {
            if (Array.isArray(r)) {
              for (var n = [], i = 0; i < r.length; i++) n.push(t(r[i]));
              var a = e.concat(n);
              return e.concat([o(a.length, 192), a]);
            }
            var s = f(r);
            return 1 === s.length && s[0] < 128 ? s : e.concat([o(s.length, 128), s]);
          }),
            (r.decode = function (t, r) {
              if ((void 0 === r && (r = !1), !t || 0 === t.length)) return e.from([]);
              var n = (function t(r) {
                var n,
                  o,
                  a,
                  s,
                  f,
                  u = [],
                  c = r[0];
                if (c <= 127) return { data: r.slice(0, 1), remainder: r.slice(1) };
                if (c <= 183) {
                  if (((n = c - 127), (a = 128 === c ? e.from([]) : r.slice(1, n)), 2 === n && a[0] < 128))
                    throw new Error('invalid rlp encoding: byte must be less 0x80');
                  return { data: a, remainder: r.slice(n) };
                }
                if (c <= 191) {
                  if (((o = c - 182), r.length - 1 < o))
                    throw new Error('invalid RLP: not enough bytes for string length');
                  if ((n = i(r.slice(1, o).toString('hex'), 16)) <= 55)
                    throw new Error('invalid RLP: expected string length to be greater than 55');
                  if ((a = r.slice(o, n + o)).length < n) throw new Error('invalid RLP: not enough bytes for string');
                  return { data: a, remainder: r.slice(n + o) };
                }
                if (c <= 247) {
                  for (n = c - 191, s = r.slice(1, n); s.length; ) (f = t(s)), u.push(f.data), (s = f.remainder);
                  return { data: u, remainder: r.slice(n) };
                }
                (o = c - 246), (n = i(r.slice(1, o).toString('hex'), 16));
                var h = o + n;
                if (h > r.length) throw new Error('invalid rlp: total length is larger than the data');
                if (0 === (s = r.slice(o, h)).length) throw new Error('invalid rlp, List has a invalid length');
                for (; s.length; ) (f = t(s)), u.push(f.data), (s = f.remainder);
                return { data: u, remainder: r.slice(h) };
              })(f(t));
              if (r) return n;
              if (0 !== n.remainder.length) throw new Error('invalid remainder');
              return n.data;
            }),
            (r.getLength = function (t) {
              if (!t || 0 === t.length) return e.from([]);
              var r = f(t),
                n = r[0];
              if (n <= 127) return r.length;
              if (n <= 183) return n - 127;
              if (n <= 191) return n - 182;
              if (n <= 247) return n - 191;
              var o = n - 246;
              return o + i(r.slice(1, o).toString('hex'), 16);
            });
        }.call(this, t('buffer').Buffer));
      },
      { 'bn.js': 15, buffer: 18 },
    ],
    121: [
      function (t, e, r) {
        var n = t('buffer'),
          i = n.Buffer;
        function o(t, e) {
          for (var r in t) e[r] = t[r];
        }
        function a(t, e, r) {
          return i(t, e, r);
        }
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? (e.exports = n) : (o(n, r), (r.Buffer = a)),
          (a.prototype = Object.create(i.prototype)),
          o(i, a),
          (a.from = function (t, e, r) {
            if ('number' == typeof t) throw new TypeError('Argument must not be a number');
            return i(t, e, r);
          }),
          (a.alloc = function (t, e, r) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            var n = i(t);
            return void 0 !== e ? ('string' == typeof r ? n.fill(e, r) : n.fill(e)) : n.fill(0), n;
          }),
          (a.allocUnsafe = function (t) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            return i(t);
          }),
          (a.allocUnsafeSlow = function (t) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            return n.SlowBuffer(t);
          });
      },
      { buffer: 18 },
    ],
    122: [
      function (t, e, r) {
        var n = t('safe-buffer').Buffer;
        function i(t, e) {
          (this._block = n.alloc(t)), (this._finalSize = e), (this._blockSize = t), (this._len = 0);
        }
        (i.prototype.update = function (t, e) {
          'string' == typeof t && ((e = e || 'utf8'), (t = n.from(t, e)));
          for (var r = this._block, i = this._blockSize, o = t.length, a = this._len, s = 0; s < o; ) {
            for (var f = a % i, u = Math.min(o - s, i - f), c = 0; c < u; c++) r[f + c] = t[s + c];
            (s += u), (a += u) % i == 0 && this._update(r);
          }
          return (this._len += o), this;
        }),
          (i.prototype.digest = function (t) {
            var e = this._len % this._blockSize;
            (this._block[e] = 128),
              this._block.fill(0, e + 1),
              e >= this._finalSize && (this._update(this._block), this._block.fill(0));
            var r = 8 * this._len;
            if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4);
            else {
              var n = (4294967295 & r) >>> 0,
                i = (r - n) / 4294967296;
              this._block.writeUInt32BE(i, this._blockSize - 8), this._block.writeUInt32BE(n, this._blockSize - 4);
            }
            this._update(this._block);
            var o = this._hash();
            return t ? o.toString(t) : o;
          }),
          (i.prototype._update = function () {
            throw new Error('_update must be implemented by subclass');
          }),
          (e.exports = i);
      },
      { 'safe-buffer': 121 },
    ],
    123: [
      function (t, e, r) {
        ((r = e.exports =
          function (t) {
            t = t.toLowerCase();
            var e = r[t];
            if (!e) throw new Error(t + ' is not supported (we accept pull requests)');
            return new e();
          }).sha = t('./sha')),
          (r.sha1 = t('./sha1')),
          (r.sha224 = t('./sha224')),
          (r.sha256 = t('./sha256')),
          (r.sha384 = t('./sha384')),
          (r.sha512 = t('./sha512'));
      },
      { './sha': 124, './sha1': 125, './sha224': 126, './sha256': 127, './sha384': 128, './sha512': 129 },
    ],
    124: [
      function (t, e, r) {
        var n = t('inherits'),
          i = t('./hash'),
          o = t('safe-buffer').Buffer,
          a = [1518500249, 1859775393, -1894007588, -899497514],
          s = new Array(80);
        function f() {
          this.init(), (this._w = s), i.call(this, 64, 56);
        }
        function u(t) {
          return (t << 30) | (t >>> 2);
        }
        function c(t, e, r, n) {
          return 0 === t ? (e & r) | (~e & n) : 2 === t ? (e & r) | (e & n) | (r & n) : e ^ r ^ n;
        }
        n(f, i),
          (f.prototype.init = function () {
            return (
              (this._a = 1732584193),
              (this._b = 4023233417),
              (this._c = 2562383102),
              (this._d = 271733878),
              (this._e = 3285377520),
              this
            );
          }),
          (f.prototype._update = function (t) {
            for (
              var e,
                r = this._w,
                n = 0 | this._a,
                i = 0 | this._b,
                o = 0 | this._c,
                s = 0 | this._d,
                f = 0 | this._e,
                h = 0;
              h < 16;
              ++h
            )
              r[h] = t.readInt32BE(4 * h);
            for (; h < 80; ++h) r[h] = r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16];
            for (var d = 0; d < 80; ++d) {
              var l = ~~(d / 20),
                p = 0 | ((((e = n) << 5) | (e >>> 27)) + c(l, i, o, s) + f + r[d] + a[l]);
              (f = s), (s = o), (o = u(i)), (i = n), (n = p);
            }
            (this._a = (n + this._a) | 0),
              (this._b = (i + this._b) | 0),
              (this._c = (o + this._c) | 0),
              (this._d = (s + this._d) | 0),
              (this._e = (f + this._e) | 0);
          }),
          (f.prototype._hash = function () {
            var t = o.allocUnsafe(20);
            return (
              t.writeInt32BE(0 | this._a, 0),
              t.writeInt32BE(0 | this._b, 4),
              t.writeInt32BE(0 | this._c, 8),
              t.writeInt32BE(0 | this._d, 12),
              t.writeInt32BE(0 | this._e, 16),
              t
            );
          }),
          (e.exports = f);
      },
      { './hash': 122, inherits: 80, 'safe-buffer': 121 },
    ],
    125: [
      function (t, e, r) {
        var n = t('inherits'),
          i = t('./hash'),
          o = t('safe-buffer').Buffer,
          a = [1518500249, 1859775393, -1894007588, -899497514],
          s = new Array(80);
        function f() {
          this.init(), (this._w = s), i.call(this, 64, 56);
        }
        function u(t) {
          return (t << 5) | (t >>> 27);
        }
        function c(t) {
          return (t << 30) | (t >>> 2);
        }
        function h(t, e, r, n) {
          return 0 === t ? (e & r) | (~e & n) : 2 === t ? (e & r) | (e & n) | (r & n) : e ^ r ^ n;
        }
        n(f, i),
          (f.prototype.init = function () {
            return (
              (this._a = 1732584193),
              (this._b = 4023233417),
              (this._c = 2562383102),
              (this._d = 271733878),
              (this._e = 3285377520),
              this
            );
          }),
          (f.prototype._update = function (t) {
            for (
              var e,
                r = this._w,
                n = 0 | this._a,
                i = 0 | this._b,
                o = 0 | this._c,
                s = 0 | this._d,
                f = 0 | this._e,
                d = 0;
              d < 16;
              ++d
            )
              r[d] = t.readInt32BE(4 * d);
            for (; d < 80; ++d) r[d] = ((e = r[d - 3] ^ r[d - 8] ^ r[d - 14] ^ r[d - 16]) << 1) | (e >>> 31);
            for (var l = 0; l < 80; ++l) {
              var p = ~~(l / 20),
                b = (u(n) + h(p, i, o, s) + f + r[l] + a[p]) | 0;
              (f = s), (s = o), (o = c(i)), (i = n), (n = b);
            }
            (this._a = (n + this._a) | 0),
              (this._b = (i + this._b) | 0),
              (this._c = (o + this._c) | 0),
              (this._d = (s + this._d) | 0),
              (this._e = (f + this._e) | 0);
          }),
          (f.prototype._hash = function () {
            var t = o.allocUnsafe(20);
            return (
              t.writeInt32BE(0 | this._a, 0),
              t.writeInt32BE(0 | this._b, 4),
              t.writeInt32BE(0 | this._c, 8),
              t.writeInt32BE(0 | this._d, 12),
              t.writeInt32BE(0 | this._e, 16),
              t
            );
          }),
          (e.exports = f);
      },
      { './hash': 122, inherits: 80, 'safe-buffer': 121 },
    ],
    126: [
      function (t, e, r) {
        var n = t('inherits'),
          i = t('./sha256'),
          o = t('./hash'),
          a = t('safe-buffer').Buffer,
          s = new Array(64);
        function f() {
          this.init(), (this._w = s), o.call(this, 64, 56);
        }
        n(f, i),
          (f.prototype.init = function () {
            return (
              (this._a = 3238371032),
              (this._b = 914150663),
              (this._c = 812702999),
              (this._d = 4144912697),
              (this._e = 4290775857),
              (this._f = 1750603025),
              (this._g = 1694076839),
              (this._h = 3204075428),
              this
            );
          }),
          (f.prototype._hash = function () {
            var t = a.allocUnsafe(28);
            return (
              t.writeInt32BE(this._a, 0),
              t.writeInt32BE(this._b, 4),
              t.writeInt32BE(this._c, 8),
              t.writeInt32BE(this._d, 12),
              t.writeInt32BE(this._e, 16),
              t.writeInt32BE(this._f, 20),
              t.writeInt32BE(this._g, 24),
              t
            );
          }),
          (e.exports = f);
      },
      { './hash': 122, './sha256': 127, inherits: 80, 'safe-buffer': 121 },
    ],
    127: [
      function (t, e, r) {
        var n = t('inherits'),
          i = t('./hash'),
          o = t('safe-buffer').Buffer,
          a = [
            1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080,
            310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
            264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808,
            3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
            1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817,
            3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
            1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298,
          ],
          s = new Array(64);
        function f() {
          this.init(), (this._w = s), i.call(this, 64, 56);
        }
        function u(t, e, r) {
          return r ^ (t & (e ^ r));
        }
        function c(t, e, r) {
          return (t & e) | (r & (t | e));
        }
        function h(t) {
          return ((t >>> 2) | (t << 30)) ^ ((t >>> 13) | (t << 19)) ^ ((t >>> 22) | (t << 10));
        }
        function d(t) {
          return ((t >>> 6) | (t << 26)) ^ ((t >>> 11) | (t << 21)) ^ ((t >>> 25) | (t << 7));
        }
        function l(t) {
          return ((t >>> 7) | (t << 25)) ^ ((t >>> 18) | (t << 14)) ^ (t >>> 3);
        }
        n(f, i),
          (f.prototype.init = function () {
            return (
              (this._a = 1779033703),
              (this._b = 3144134277),
              (this._c = 1013904242),
              (this._d = 2773480762),
              (this._e = 1359893119),
              (this._f = 2600822924),
              (this._g = 528734635),
              (this._h = 1541459225),
              this
            );
          }),
          (f.prototype._update = function (t) {
            for (
              var e,
                r = this._w,
                n = 0 | this._a,
                i = 0 | this._b,
                o = 0 | this._c,
                s = 0 | this._d,
                f = 0 | this._e,
                p = 0 | this._f,
                b = 0 | this._g,
                m = 0 | this._h,
                v = 0;
              v < 16;
              ++v
            )
              r[v] = t.readInt32BE(4 * v);
            for (; v < 64; ++v)
              r[v] =
                0 |
                (((((e = r[v - 2]) >>> 17) | (e << 15)) ^ ((e >>> 19) | (e << 13)) ^ (e >>> 10)) +
                  r[v - 7] +
                  l(r[v - 15]) +
                  r[v - 16]);
            for (var g = 0; g < 64; ++g) {
              var y = (m + d(f) + u(f, p, b) + a[g] + r[g]) | 0,
                w = (h(n) + c(n, i, o)) | 0;
              (m = b), (b = p), (p = f), (f = (s + y) | 0), (s = o), (o = i), (i = n), (n = (y + w) | 0);
            }
            (this._a = (n + this._a) | 0),
              (this._b = (i + this._b) | 0),
              (this._c = (o + this._c) | 0),
              (this._d = (s + this._d) | 0),
              (this._e = (f + this._e) | 0),
              (this._f = (p + this._f) | 0),
              (this._g = (b + this._g) | 0),
              (this._h = (m + this._h) | 0);
          }),
          (f.prototype._hash = function () {
            var t = o.allocUnsafe(32);
            return (
              t.writeInt32BE(this._a, 0),
              t.writeInt32BE(this._b, 4),
              t.writeInt32BE(this._c, 8),
              t.writeInt32BE(this._d, 12),
              t.writeInt32BE(this._e, 16),
              t.writeInt32BE(this._f, 20),
              t.writeInt32BE(this._g, 24),
              t.writeInt32BE(this._h, 28),
              t
            );
          }),
          (e.exports = f);
      },
      { './hash': 122, inherits: 80, 'safe-buffer': 121 },
    ],
    128: [
      function (t, e, r) {
        var n = t('inherits'),
          i = t('./sha512'),
          o = t('./hash'),
          a = t('safe-buffer').Buffer,
          s = new Array(160);
        function f() {
          this.init(), (this._w = s), o.call(this, 128, 112);
        }
        n(f, i),
          (f.prototype.init = function () {
            return (
              (this._ah = 3418070365),
              (this._bh = 1654270250),
              (this._ch = 2438529370),
              (this._dh = 355462360),
              (this._eh = 1731405415),
              (this._fh = 2394180231),
              (this._gh = 3675008525),
              (this._hh = 1203062813),
              (this._al = 3238371032),
              (this._bl = 914150663),
              (this._cl = 812702999),
              (this._dl = 4144912697),
              (this._el = 4290775857),
              (this._fl = 1750603025),
              (this._gl = 1694076839),
              (this._hl = 3204075428),
              this
            );
          }),
          (f.prototype._hash = function () {
            var t = a.allocUnsafe(48);
            function e(e, r, n) {
              t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4);
            }
            return (
              e(this._ah, this._al, 0),
              e(this._bh, this._bl, 8),
              e(this._ch, this._cl, 16),
              e(this._dh, this._dl, 24),
              e(this._eh, this._el, 32),
              e(this._fh, this._fl, 40),
              t
            );
          }),
          (e.exports = f);
      },
      { './hash': 122, './sha512': 129, inherits: 80, 'safe-buffer': 121 },
    ],
    129: [
      function (t, e, r) {
        var n = t('inherits'),
          i = t('./hash'),
          o = t('safe-buffer').Buffer,
          a = [
            1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163,
            4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
            310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206,
            991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
            264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692,
            3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
            3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
            168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
            1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921,
            1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
            3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616,
            1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
            1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452,
            2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
            3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271,
            4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
            685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470,
            3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591,
          ],
          s = new Array(160);
        function f() {
          this.init(), (this._w = s), i.call(this, 128, 112);
        }
        function u(t, e, r) {
          return r ^ (t & (e ^ r));
        }
        function c(t, e, r) {
          return (t & e) | (r & (t | e));
        }
        function h(t, e) {
          return ((t >>> 28) | (e << 4)) ^ ((e >>> 2) | (t << 30)) ^ ((e >>> 7) | (t << 25));
        }
        function d(t, e) {
          return ((t >>> 14) | (e << 18)) ^ ((t >>> 18) | (e << 14)) ^ ((e >>> 9) | (t << 23));
        }
        function l(t, e) {
          return ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ (t >>> 7);
        }
        function p(t, e) {
          return ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ ((t >>> 7) | (e << 25));
        }
        function b(t, e) {
          return ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ (t >>> 6);
        }
        function m(t, e) {
          return ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ ((t >>> 6) | (e << 26));
        }
        function v(t, e) {
          return t >>> 0 < e >>> 0 ? 1 : 0;
        }
        n(f, i),
          (f.prototype.init = function () {
            return (
              (this._ah = 1779033703),
              (this._bh = 3144134277),
              (this._ch = 1013904242),
              (this._dh = 2773480762),
              (this._eh = 1359893119),
              (this._fh = 2600822924),
              (this._gh = 528734635),
              (this._hh = 1541459225),
              (this._al = 4089235720),
              (this._bl = 2227873595),
              (this._cl = 4271175723),
              (this._dl = 1595750129),
              (this._el = 2917565137),
              (this._fl = 725511199),
              (this._gl = 4215389547),
              (this._hl = 327033209),
              this
            );
          }),
          (f.prototype._update = function (t) {
            for (
              var e = this._w,
                r = 0 | this._ah,
                n = 0 | this._bh,
                i = 0 | this._ch,
                o = 0 | this._dh,
                s = 0 | this._eh,
                f = 0 | this._fh,
                g = 0 | this._gh,
                y = 0 | this._hh,
                w = 0 | this._al,
                _ = 0 | this._bl,
                M = 0 | this._cl,
                x = 0 | this._dl,
                S = 0 | this._el,
                A = 0 | this._fl,
                E = 0 | this._gl,
                k = 0 | this._hl,
                I = 0;
              I < 32;
              I += 2
            )
              (e[I] = t.readInt32BE(4 * I)), (e[I + 1] = t.readInt32BE(4 * I + 4));
            for (; I < 160; I += 2) {
              var T = e[I - 30],
                R = e[I - 30 + 1],
                j = l(T, R),
                O = p(R, T),
                B = b((T = e[I - 4]), (R = e[I - 4 + 1])),
                L = m(R, T),
                P = e[I - 14],
                N = e[I - 14 + 1],
                C = e[I - 32],
                z = e[I - 32 + 1],
                q = (O + N) | 0,
                U = (j + P + v(q, O)) | 0;
              (U = ((U = (U + B + v((q = (q + L) | 0), L)) | 0) + C + v((q = (q + z) | 0), z)) | 0),
                (e[I] = U),
                (e[I + 1] = q);
            }
            for (var F = 0; F < 160; F += 2) {
              (U = e[F]), (q = e[F + 1]);
              var D = c(r, n, i),
                K = c(w, _, M),
                H = h(r, w),
                W = h(w, r),
                Z = d(s, S),
                V = d(S, s),
                $ = a[F],
                Y = a[F + 1],
                G = u(s, f, g),
                J = u(S, A, E),
                X = (k + V) | 0,
                Q = (y + Z + v(X, k)) | 0;
              Q =
                ((Q = ((Q = (Q + G + v((X = (X + J) | 0), J)) | 0) + $ + v((X = (X + Y) | 0), Y)) | 0) +
                  U +
                  v((X = (X + q) | 0), q)) |
                0;
              var tt = (W + K) | 0,
                et = (H + D + v(tt, W)) | 0;
              (y = g),
                (k = E),
                (g = f),
                (E = A),
                (f = s),
                (A = S),
                (s = (o + Q + v((S = (x + X) | 0), x)) | 0),
                (o = i),
                (x = M),
                (i = n),
                (M = _),
                (n = r),
                (_ = w),
                (r = (Q + et + v((w = (X + tt) | 0), X)) | 0);
            }
            (this._al = (this._al + w) | 0),
              (this._bl = (this._bl + _) | 0),
              (this._cl = (this._cl + M) | 0),
              (this._dl = (this._dl + x) | 0),
              (this._el = (this._el + S) | 0),
              (this._fl = (this._fl + A) | 0),
              (this._gl = (this._gl + E) | 0),
              (this._hl = (this._hl + k) | 0),
              (this._ah = (this._ah + r + v(this._al, w)) | 0),
              (this._bh = (this._bh + n + v(this._bl, _)) | 0),
              (this._ch = (this._ch + i + v(this._cl, M)) | 0),
              (this._dh = (this._dh + o + v(this._dl, x)) | 0),
              (this._eh = (this._eh + s + v(this._el, S)) | 0),
              (this._fh = (this._fh + f + v(this._fl, A)) | 0),
              (this._gh = (this._gh + g + v(this._gl, E)) | 0),
              (this._hh = (this._hh + y + v(this._hl, k)) | 0);
          }),
          (f.prototype._hash = function () {
            var t = o.allocUnsafe(64);
            function e(e, r, n) {
              t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4);
            }
            return (
              e(this._ah, this._al, 0),
              e(this._bh, this._bl, 8),
              e(this._ch, this._cl, 16),
              e(this._dh, this._dl, 24),
              e(this._eh, this._el, 32),
              e(this._fh, this._fl, 40),
              e(this._gh, this._gl, 48),
              e(this._hh, this._hl, 56),
              t
            );
          }),
          (e.exports = f);
      },
      { './hash': 122, inherits: 80, 'safe-buffer': 121 },
    ],
    130: [
      function (t, e, r) {
        e.exports = i;
        var n = t('events').EventEmitter;
        function i() {
          n.call(this);
        }
        t('inherits')(i, n),
          (i.Readable = t('readable-stream/readable.js')),
          (i.Writable = t('readable-stream/writable.js')),
          (i.Duplex = t('readable-stream/duplex.js')),
          (i.Transform = t('readable-stream/transform.js')),
          (i.PassThrough = t('readable-stream/passthrough.js')),
          (i.Stream = i),
          (i.prototype.pipe = function (t, e) {
            var r = this;
            function i(e) {
              t.writable && !1 === t.write(e) && r.pause && r.pause();
            }
            function o() {
              r.readable && r.resume && r.resume();
            }
            r.on('data', i), t.on('drain', o), t._isStdio || (e && !1 === e.end) || (r.on('end', s), r.on('close', f));
            var a = !1;
            function s() {
              a || ((a = !0), t.end());
            }
            function f() {
              a || ((a = !0), 'function' == typeof t.destroy && t.destroy());
            }
            function u(t) {
              if ((c(), 0 === n.listenerCount(this, 'error'))) throw t;
            }
            function c() {
              r.removeListener('data', i),
                t.removeListener('drain', o),
                r.removeListener('end', s),
                r.removeListener('close', f),
                r.removeListener('error', u),
                t.removeListener('error', u),
                r.removeListener('end', c),
                r.removeListener('close', c),
                t.removeListener('close', c);
            }
            return (
              r.on('error', u),
              t.on('error', u),
              r.on('end', c),
              r.on('close', c),
              t.on('close', c),
              t.emit('pipe', r),
              t
            );
          });
      },
      {
        events: 19,
        inherits: 80,
        'readable-stream/duplex.js': 103,
        'readable-stream/passthrough.js': 115,
        'readable-stream/readable.js': 116,
        'readable-stream/transform.js': 117,
        'readable-stream/writable.js': 118,
      },
    ],
    131: [
      function (t, e, r) {
        var n = t('is-hex-prefixed');
        e.exports = function (t) {
          return 'string' != typeof t ? t : n(t) ? t.slice(2) : t;
        };
      },
      { 'is-hex-prefixed': 82 },
    ],
    132: [
      function (t, e, r) {
        (function (e, n) {
          var i = t('process/browser.js').nextTick,
            o = Function.prototype.apply,
            a = Array.prototype.slice,
            s = {},
            f = 0;
          function u(t, e) {
            (this._id = t), (this._clearFn = e);
          }
          (r.setTimeout = function () {
            return new u(o.call(setTimeout, window, arguments), clearTimeout);
          }),
            (r.setInterval = function () {
              return new u(o.call(setInterval, window, arguments), clearInterval);
            }),
            (r.clearTimeout = r.clearInterval =
              function (t) {
                t.close();
              }),
            (u.prototype.unref = u.prototype.ref = function () {}),
            (u.prototype.close = function () {
              this._clearFn.call(window, this._id);
            }),
            (r.enroll = function (t, e) {
              clearTimeout(t._idleTimeoutId), (t._idleTimeout = e);
            }),
            (r.unenroll = function (t) {
              clearTimeout(t._idleTimeoutId), (t._idleTimeout = -1);
            }),
            (r._unrefActive = r.active =
              function (t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 &&
                  (t._idleTimeoutId = setTimeout(function () {
                    t._onTimeout && t._onTimeout();
                  }, e));
              }),
            (r.setImmediate =
              'function' == typeof e
                ? e
                : function (t) {
                    var e = f++,
                      n = !(arguments.length < 2) && a.call(arguments, 1);
                    return (
                      (s[e] = !0),
                      i(function () {
                        s[e] && (n ? t.apply(null, n) : t.call(null), r.clearImmediate(e));
                      }),
                      e
                    );
                  }),
            (r.clearImmediate =
              'function' == typeof n
                ? n
                : function (t) {
                    delete s[t];
                  });
        }.call(this, t('timers').setImmediate, t('timers').clearImmediate));
      },
      { 'process/browser.js': 97, timers: 132 },
    ],
    133: [
      function (t, e, r) {
        (function (t) {
          function r(e) {
            try {
              if (!t.localStorage) return !1;
            } catch (t) {
              return !1;
            }
            var r = t.localStorage[e];
            return null != r && 'true' === String(r).toLowerCase();
          }
          e.exports = function (t, e) {
            if (r('noDeprecation')) return t;
            var n = !1;
            return function () {
              if (!n) {
                if (r('throwDeprecation')) throw new Error(e);
                r('traceDeprecation') ? console.trace(e) : console.warn(e), (n = !0);
              }
              return t.apply(this, arguments);
            };
          };
        }.call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      {},
    ],
    134: [
      function (t, e, r) {
        'function' == typeof Object.create
          ? (e.exports = function (t, e) {
              (t.super_ = e),
                (t.prototype = Object.create(e.prototype, {
                  constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
                }));
            })
          : (e.exports = function (t, e) {
              t.super_ = e;
              var r = function () {};
              (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
            });
      },
      {},
    ],
    135: [
      function (t, e, r) {
        e.exports = function (t) {
          return (
            t &&
            'object' == typeof t &&
            'function' == typeof t.copy &&
            'function' == typeof t.fill &&
            'function' == typeof t.readUInt8
          );
        };
      },
      {},
    ],
    136: [
      function (t, e, r) {
        (function (e, n) {
          var i = /%[sdj%]/g;
          (r.format = function (t) {
            if (!v(t)) {
              for (var e = [], r = 0; r < arguments.length; r++) e.push(s(arguments[r]));
              return e.join(' ');
            }
            r = 1;
            for (
              var n = arguments,
                o = n.length,
                a = String(t).replace(i, function (t) {
                  if ('%%' === t) return '%';
                  if (r >= o) return t;
                  switch (t) {
                    case '%s':
                      return String(n[r++]);
                    case '%d':
                      return Number(n[r++]);
                    case '%j':
                      try {
                        return JSON.stringify(n[r++]);
                      } catch (t) {
                        return '[Circular]';
                      }
                    default:
                      return t;
                  }
                }),
                f = n[r];
              r < o;
              f = n[++r]
            )
              b(f) || !w(f) ? (a += ' ' + f) : (a += ' ' + s(f));
            return a;
          }),
            (r.deprecate = function (t, i) {
              if (g(n.process))
                return function () {
                  return r.deprecate(t, i).apply(this, arguments);
                };
              if (!0 === e.noDeprecation) return t;
              var o = !1;
              return function () {
                if (!o) {
                  if (e.throwDeprecation) throw new Error(i);
                  e.traceDeprecation ? console.trace(i) : console.error(i), (o = !0);
                }
                return t.apply(this, arguments);
              };
            });
          var o,
            a = {};
          function s(t, e) {
            var n = { seen: [], stylize: u };
            return (
              arguments.length >= 3 && (n.depth = arguments[2]),
              arguments.length >= 4 && (n.colors = arguments[3]),
              p(e) ? (n.showHidden = e) : e && r._extend(n, e),
              g(n.showHidden) && (n.showHidden = !1),
              g(n.depth) && (n.depth = 2),
              g(n.colors) && (n.colors = !1),
              g(n.customInspect) && (n.customInspect = !0),
              n.colors && (n.stylize = f),
              c(n, t, n.depth)
            );
          }
          function f(t, e) {
            var r = s.styles[e];
            return r ? '[' + s.colors[r][0] + 'm' + t + '[' + s.colors[r][1] + 'm' : t;
          }
          function u(t, e) {
            return t;
          }
          function c(t, e, n) {
            if (
              t.customInspect &&
              e &&
              x(e.inspect) &&
              e.inspect !== r.inspect &&
              (!e.constructor || e.constructor.prototype !== e)
            ) {
              var i = e.inspect(n, t);
              return v(i) || (i = c(t, i, n)), i;
            }
            var o = (function (t, e) {
              if (g(e)) return t.stylize('undefined', 'undefined');
              if (v(e)) {
                var r = "'" + JSON.stringify(e).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                return t.stylize(r, 'string');
              }
              if (m(e)) return t.stylize('' + e, 'number');
              if (p(e)) return t.stylize('' + e, 'boolean');
              if (b(e)) return t.stylize('null', 'null');
            })(t, e);
            if (o) return o;
            var a = Object.keys(e),
              s = (function (t) {
                var e = {};
                return (
                  t.forEach(function (t, r) {
                    e[t] = !0;
                  }),
                  e
                );
              })(a);
            if (
              (t.showHidden && (a = Object.getOwnPropertyNames(e)),
              M(e) && (a.indexOf('message') >= 0 || a.indexOf('description') >= 0))
            )
              return h(e);
            if (0 === a.length) {
              if (x(e)) {
                var f = e.name ? ': ' + e.name : '';
                return t.stylize('[Function' + f + ']', 'special');
              }
              if (y(e)) return t.stylize(RegExp.prototype.toString.call(e), 'regexp');
              if (_(e)) return t.stylize(Date.prototype.toString.call(e), 'date');
              if (M(e)) return h(e);
            }
            var u,
              w = '',
              S = !1,
              A = ['{', '}'];
            (l(e) && ((S = !0), (A = ['[', ']'])), x(e)) && (w = ' [Function' + (e.name ? ': ' + e.name : '') + ']');
            return (
              y(e) && (w = ' ' + RegExp.prototype.toString.call(e)),
              _(e) && (w = ' ' + Date.prototype.toUTCString.call(e)),
              M(e) && (w = ' ' + h(e)),
              0 !== a.length || (S && 0 != e.length)
                ? n < 0
                  ? y(e)
                    ? t.stylize(RegExp.prototype.toString.call(e), 'regexp')
                    : t.stylize('[Object]', 'special')
                  : (t.seen.push(e),
                    (u = S
                      ? (function (t, e, r, n, i) {
                          for (var o = [], a = 0, s = e.length; a < s; ++a)
                            I(e, String(a)) ? o.push(d(t, e, r, n, String(a), !0)) : o.push('');
                          return (
                            i.forEach(function (i) {
                              i.match(/^\d+$/) || o.push(d(t, e, r, n, i, !0));
                            }),
                            o
                          );
                        })(t, e, n, s, a)
                      : a.map(function (r) {
                          return d(t, e, n, s, r, S);
                        })),
                    t.seen.pop(),
                    (function (t, e, r) {
                      if (
                        t.reduce(function (t, e) {
                          return e.indexOf('\n') >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, '').length + 1;
                        }, 0) > 60
                      )
                        return r[0] + ('' === e ? '' : e + '\n ') + ' ' + t.join(',\n  ') + ' ' + r[1];
                      return r[0] + e + ' ' + t.join(', ') + ' ' + r[1];
                    })(u, w, A))
                : A[0] + w + A[1]
            );
          }
          function h(t) {
            return '[' + Error.prototype.toString.call(t) + ']';
          }
          function d(t, e, r, n, i, o) {
            var a, s, f;
            if (
              ((f = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }).get
                ? (s = f.set ? t.stylize('[Getter/Setter]', 'special') : t.stylize('[Getter]', 'special'))
                : f.set && (s = t.stylize('[Setter]', 'special')),
              I(n, i) || (a = '[' + i + ']'),
              s ||
                (t.seen.indexOf(f.value) < 0
                  ? (s = b(r) ? c(t, f.value, null) : c(t, f.value, r - 1)).indexOf('\n') > -1 &&
                    (s = o
                      ? s
                          .split('\n')
                          .map(function (t) {
                            return '  ' + t;
                          })
                          .join('\n')
                          .substr(2)
                      : '\n' +
                        s
                          .split('\n')
                          .map(function (t) {
                            return '   ' + t;
                          })
                          .join('\n'))
                  : (s = t.stylize('[Circular]', 'special'))),
              g(a))
            ) {
              if (o && i.match(/^\d+$/)) return s;
              (a = JSON.stringify('' + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
                ? ((a = a.substr(1, a.length - 2)), (a = t.stylize(a, 'name')))
                : ((a = a
                    .replace(/'/g, "\\'")
                    .replace(/\\"/g, '"')
                    .replace(/(^"|"$)/g, "'")),
                  (a = t.stylize(a, 'string')));
            }
            return a + ': ' + s;
          }
          function l(t) {
            return Array.isArray(t);
          }
          function p(t) {
            return 'boolean' == typeof t;
          }
          function b(t) {
            return null === t;
          }
          function m(t) {
            return 'number' == typeof t;
          }
          function v(t) {
            return 'string' == typeof t;
          }
          function g(t) {
            return void 0 === t;
          }
          function y(t) {
            return w(t) && '[object RegExp]' === S(t);
          }
          function w(t) {
            return 'object' == typeof t && null !== t;
          }
          function _(t) {
            return w(t) && '[object Date]' === S(t);
          }
          function M(t) {
            return w(t) && ('[object Error]' === S(t) || t instanceof Error);
          }
          function x(t) {
            return 'function' == typeof t;
          }
          function S(t) {
            return Object.prototype.toString.call(t);
          }
          function A(t) {
            return t < 10 ? '0' + t.toString(10) : t.toString(10);
          }
          (r.debuglog = function (t) {
            if ((g(o) && (o = e.env.NODE_DEBUG || ''), (t = t.toUpperCase()), !a[t]))
              if (new RegExp('\\b' + t + '\\b', 'i').test(o)) {
                var n = e.pid;
                a[t] = function () {
                  var e = r.format.apply(r, arguments);
                  console.error('%s %d: %s', t, n, e);
                };
              } else a[t] = function () {};
            return a[t];
          }),
            (r.inspect = s),
            (s.colors = {
              bold: [1, 22],
              italic: [3, 23],
              underline: [4, 24],
              inverse: [7, 27],
              white: [37, 39],
              grey: [90, 39],
              black: [30, 39],
              blue: [34, 39],
              cyan: [36, 39],
              green: [32, 39],
              magenta: [35, 39],
              red: [31, 39],
              yellow: [33, 39],
            }),
            (s.styles = {
              special: 'cyan',
              number: 'yellow',
              boolean: 'yellow',
              undefined: 'grey',
              null: 'bold',
              string: 'green',
              date: 'magenta',
              regexp: 'red',
            }),
            (r.isArray = l),
            (r.isBoolean = p),
            (r.isNull = b),
            (r.isNullOrUndefined = function (t) {
              return null == t;
            }),
            (r.isNumber = m),
            (r.isString = v),
            (r.isSymbol = function (t) {
              return 'symbol' == typeof t;
            }),
            (r.isUndefined = g),
            (r.isRegExp = y),
            (r.isObject = w),
            (r.isDate = _),
            (r.isError = M),
            (r.isFunction = x),
            (r.isPrimitive = function (t) {
              return (
                null === t ||
                'boolean' == typeof t ||
                'number' == typeof t ||
                'string' == typeof t ||
                'symbol' == typeof t ||
                void 0 === t
              );
            }),
            (r.isBuffer = t('./support/isBuffer'));
          var E = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          function k() {
            var t = new Date(),
              e = [A(t.getHours()), A(t.getMinutes()), A(t.getSeconds())].join(':');
            return [t.getDate(), E[t.getMonth()], e].join(' ');
          }
          function I(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
          }
          (r.log = function () {
            console.log('%s - %s', k(), r.format.apply(r, arguments));
          }),
            (r.inherits = t('inherits')),
            (r._extend = function (t, e) {
              if (!e || !w(e)) return t;
              for (var r = Object.keys(e), n = r.length; n--; ) t[r[n]] = e[r[n]];
              return t;
            });
        }.call(
          this,
          t('_process'),
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {}
        ));
      },
      { './support/isBuffer': 135, _process: 97, inherits: 134 },
    ],
    137: [
      function (t, e, r) {
        e.exports = function t(e, r) {
          if (e && r) return t(e)(r);
          if ('function' != typeof e) throw new TypeError('need wrapper function');
          return (
            Object.keys(e).forEach(function (t) {
              n[t] = e[t];
            }),
            n
          );
          function n() {
            for (var t = new Array(arguments.length), r = 0; r < t.length; r++) t[r] = arguments[r];
            var n = e.apply(this, t),
              i = t[t.length - 1];
            return (
              'function' == typeof n &&
                n !== i &&
                Object.keys(i).forEach(function (t) {
                  n[t] = i[t];
                }),
              n
            );
          }
        };
      },
      {},
    ],
    138: [
      function (t, e, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.MESSAGE_TYPE =
            r.PLATFORM_OPERA =
            r.PLATFORM_FIREFOX =
            r.PLATFORM_EDGE =
            r.PLATFORM_CHROME =
            r.PLATFORM_BRAVE =
            r.ENVIRONMENT_TYPE_BACKGROUND =
            r.ENVIRONMENT_TYPE_FULLSCREEN =
            r.ENVIRONMENT_TYPE_NOTIFICATION =
            r.ENVIRONMENT_TYPE_POPUP =
              void 0);
        r.ENVIRONMENT_TYPE_POPUP = 'popup';
        r.ENVIRONMENT_TYPE_NOTIFICATION = 'notification';
        r.ENVIRONMENT_TYPE_FULLSCREEN = 'fullscreen';
        r.ENVIRONMENT_TYPE_BACKGROUND = 'background';
        r.PLATFORM_BRAVE = 'Brave';
        r.PLATFORM_CHROME = 'Chrome';
        r.PLATFORM_EDGE = 'Edge';
        r.PLATFORM_FIREFOX = 'Firefox';
        r.PLATFORM_OPERA = 'Opera';
        r.MESSAGE_TYPE = {
          ETH_DECRYPT: 'eth_decrypt',
          ETH_GET_ENCRYPTION_PUBLIC_KEY: 'eth_getEncryptionPublicKey',
          ETH_SIGN: 'eth_sign',
          ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
          GET_PROVIDER_STATE: 'metamask_getProviderState',
          LOG_WEB3_SHIM_USAGE: 'metamask_logWeb3ShimUsage',
          PERSONAL_SIGN: 'personal_sign',
          WATCH_ASSET: 'wallet_watchAsset',
          WATCH_ASSET_LEGACY: 'metamask_watchAsset',
          ADD_ETHEREUM_CHAIN: 'wallet_addEthereumChain',
          SWITCH_ETHEREUM_CHAIN: 'wallet_switchEthereumChain',
        };
      },
      {},
    ],
    139: [
      function (t, e, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.TRANSACTION_GROUP_CATEGORIES =
            r.TRANSACTION_GROUP_STATUSES =
            r.TRANSACTION_STATUSES =
            r.TRANSACTION_TYPES =
              void 0);
        var n = t('./app');
        const i = {
          CANCEL: 'cancel',
          RETRY: 'retry',
          TOKEN_METHOD_TRANSFER: 'transfer',
          TOKEN_METHOD_TRANSFER_FROM: 'transferfrom',
          TOKEN_METHOD_APPROVE: 'approve',
          INCOMING: 'incoming',
          SENT_ETHER: 'sentEther',
          CONTRACT_INTERACTION: 'contractInteraction',
          DEPLOY_CONTRACT: 'contractDeployment',
          SWAP: 'swap',
          SWAP_APPROVAL: 'swapApproval',
          SIGN: n.MESSAGE_TYPE.ETH_SIGN,
          SIGN_TYPED_DATA: n.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA,
          PERSONAL_SIGN: n.MESSAGE_TYPE.PERSONAL_SIGN,
          ETH_DECRYPT: n.MESSAGE_TYPE.ETH_DECRYPT,
          ETH_GET_ENCRYPTION_PUBLIC_KEY: n.MESSAGE_TYPE.ETH_GET_ENCRYPTION_PUBLIC_KEY,
        };
        r.TRANSACTION_TYPES = i;
        r.TRANSACTION_STATUSES = {
          UNAPPROVED: 'unapproved',
          APPROVED: 'approved',
          REJECTED: 'rejected',
          SIGNED: 'signed',
          SUBMITTED: 'submitted',
          FAILED: 'failed',
          DROPPED: 'dropped',
          CONFIRMED: 'confirmed',
        };
        r.TRANSACTION_GROUP_STATUSES = { CANCELLED: 'cancelled', PENDING: 'pending' };
        r.TRANSACTION_GROUP_CATEGORIES = {
          SEND: 'send',
          RECEIVE: 'receive',
          INTERACTION: 'interaction',
          APPROVAL: 'approval',
          SIGNATURE_REQUEST: 'signature-request',
          SWAP: 'swap',
        };
      },
      { './app': 138 },
    ],
    140: [
      function (t, e, r) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
          (r.default = function () {
            return (i %= n), i++;
          });
        const n = Number.MAX_SAFE_INTEGER;
        let i = Math.round(Math.random() * n);
      },
      {},
    ],
  },
  {},
  [3]
);