/*!
 * wavesurfer.js timeline plugin 4.1.1 (2020-09-25)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
!(function (e, t) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define("timeline", [], t)
        : "object" == typeof exports
        ? (exports.timeline = t())
        : ((e.WaveSurfer = e.WaveSurfer || {}), (e.WaveSurfer.timeline = t()));
})(this, function () {
    return (function (e) {
        var t = {};
        function a(r) {
            if (t[r]) return t[r].exports;
            var n = (t[r] = { i: r, l: !1, exports: {} });
            return e[r].call(n.exports, n, n.exports, a), (n.l = !0), n.exports;
        }
        return (
            (a.m = e),
            (a.c = t),
            (a.d = function (e, t, r) {
                a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
            }),
            (a.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (a.t = function (e, t) {
                if ((1 & t && (e = a(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var r = Object.create(null);
                if ((a.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                    for (var n in e)
                        a.d(
                            r,
                            n,
                            function (t) {
                                return e[t];
                            }.bind(null, n)
                        );
                return r;
            }),
            (a.n = function (e) {
                var t =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return a.d(t, "a", t), t;
            }),
            (a.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (a.p = "localhost:8080/dist/plugin/"),
            a((a.s = 9))
        );
    })({
        9: function (e, t, a) {
            "use strict";
            function r(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var r = t[a];
                    (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                }
            }
            function n(e, t, a) {
                return t && r(e.prototype, t), a && r(e, a), e;
            }
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
            var i = (function () {
                function e(t, a) {
                    var r = this;
                    if (
                        ((function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        })(this, e),
                        o.call(this),
                        (this.container = "string" == typeof t.container ? document.querySelector(t.container) : t.container),
                        !this.container)
                    )
                        throw new Error("No container for wavesurfer timeline");
                    (this.wavesurfer = a),
                        (this.util = a.util),
                        (this.params = Object.assign(
                            {},
                            {
                                height: 20,
                                notchPercentHeight: 90,
                                labelPadding: 5,
                                unlabeledNotchColor: "#c0c0c0",
                                primaryColor: "#000",
                                secondaryColor: "#c0c0c0",
                                primaryFontColor: "#000",
                                secondaryFontColor: "#000",
                                fontFamily: "Arial",
                                fontSize: 10,
                                duration: null,
                                zoomDebounce: !1,
                                formatTimeCallback: this.defaultFormatTimeCallback,
                                timeInterval: this.defaultTimeInterval,
                                primaryLabelInterval: this.defaultPrimaryLabelInterval,
                                secondaryLabelInterval: this.defaultSecondaryLabelInterval,
                                offset: 0,
                            },
                            t
                        )),
                        (this.canvases = []),
                        (this.wrapper = null),
                        (this.drawer = null),
                        (this.pixelRatio = null),
                        (this.maxCanvasWidth = null),
                        (this.maxCanvasElementWidth = null),
                        (this._onZoom = this.params.zoomDebounce
                            ? this.wavesurfer.util.debounce(function () {
                                  return r.render();
                              }, this.params.zoomDebounce)
                            : function () {
                                  return r.render();
                              });
                }
                return (
                    n(e, null, [
                        {
                            key: "create",
                            value: function (t) {
                                return { name: "timeline", deferInit: !(!t || !t.deferInit) && t.deferInit, params: t, instance: e };
                            },
                        },
                    ]),
                    n(e, [
                        {
                            key: "init",
                            value: function () {
                                this.wavesurfer.isReady ? this._onReady() : this.wavesurfer.once("ready", this._onReady);
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                this.unAll(),
                                    this.wavesurfer.un("redraw", this._onRedraw),
                                    this.wavesurfer.un("zoom", this._onZoom),
                                    this.wavesurfer.un("ready", this._onReady),
                                    this.wavesurfer.drawer.wrapper.removeEventListener("scroll", this._onScroll),
                                    this.wrapper && this.wrapper.parentNode && (this.wrapper.removeEventListener("click", this._onWrapperClick), this.wrapper.parentNode.removeChild(this.wrapper), (this.wrapper = null));
                            },
                        },
                        {
                            key: "createWrapper",
                            value: function () {
                                var e = this.wavesurfer.params;
                                (this.container.innerHTML = ""),
                                    (this.wrapper = this.container.appendChild(document.createElement("timeline"))),
                                    this.util.style(this.wrapper, { display: "block", position: "relative", userSelect: "none", webkitUserSelect: "none", height: "".concat(this.params.height, "px") }),
                                    (e.fillParent || e.scrollParent) && this.util.style(this.wrapper, { width: "100%", overflowX: "hidden", overflowY: "hidden" }),
                                    this.wrapper.addEventListener("click", this._onWrapperClick);
                            },
                        },
                        {
                            key: "render",
                            value: function () {
                                this.wrapper || this.createWrapper(), this.updateCanvases(), this.updateCanvasesPositioning(), this.renderCanvases();
                            },
                        },
                        {
                            key: "addCanvas",
                            value: function () {
                                var e = this.wrapper.appendChild(document.createElement("canvas"));
                                this.canvases.push(e), this.util.style(e, { position: "absolute", zIndex: 4 });
                            },
                        },
                        {
                            key: "removeCanvas",
                            value: function () {
                                var e = this.canvases.pop();
                                e.parentElement.removeChild(e);
                            },
                        },
                        {
                            key: "updateCanvases",
                            value: function () {
                                for (var e = Math.round(this.drawer.wrapper.scrollWidth), t = Math.ceil(e / this.maxCanvasElementWidth); this.canvases.length < t; ) this.addCanvas();
                                for (; this.canvases.length > t; ) this.removeCanvas();
                            },
                        },
                        {
                            key: "updateCanvasesPositioning",
                            value: function () {
                                var e = this,
                                    t = this.canvases.length;
                                this.canvases.forEach(function (a, r) {
                                    var n = r === t - 1 ? e.drawer.wrapper.scrollWidth - e.maxCanvasElementWidth * (t - 1) : e.maxCanvasElementWidth;
                                    (a.width = n * e.pixelRatio),
                                        (a.height = (e.params.height + 1) * e.pixelRatio),
                                        e.util.style(a, { width: "".concat(n, "px"), height: "".concat(e.params.height, "px"), left: "".concat(r * e.maxCanvasElementWidth, "px") });
                                });
                            },
                        },
                        {
                            key: "renderCanvases",
                            value: function () {
                                var e = this,
                                    t = this.params.duration || this.wavesurfer.backend.getDuration();
                                if (!(t <= 0)) {
                                    var a,
                                        r = this.wavesurfer.params,
                                        n = this.params.fontSize * r.pixelRatio,
                                        i = parseInt(t, 10) + 1,
                                        o = r.fillParent && !r.scrollParent ? this.drawer.getWidth() : this.drawer.wrapper.scrollWidth * r.pixelRatio,
                                        s = this.params.height * this.pixelRatio,
                                        l = this.params.height * (this.params.notchPercentHeight / 100) * this.pixelRatio,
                                        c = o / t,
                                        u = this.params.formatTimeCallback,
                                        h = function (e) {
                                            return "function" == typeof e ? e(c) : e;
                                        },
                                        f = h(this.params.timeInterval),
                                        p = h(this.params.primaryLabelInterval),
                                        d = h(this.params.secondaryLabelInterval),
                                        v = c * this.params.offset,
                                        m = 0,
                                        y = [];
                                    for (a = 0; a < i / f; a++) y.push([a, m, v]), (m += f), (v += c * f);
                                    var w = function (e) {
                                        y.forEach(function (t) {
                                            e(t[0], t[1], t[2]);
                                        });
                                    };
                                    this.setFillStyles(this.params.primaryColor),
                                        this.setFonts("".concat(n, "px ").concat(this.params.fontFamily)),
                                        this.setFillStyles(this.params.primaryFontColor),
                                        w(function (t, a, r) {
                                            t % p == 0 && (e.fillRect(r, 0, 1, s), e.fillText(u(a, c), r + e.params.labelPadding * e.pixelRatio, s));
                                        }),
                                        this.setFillStyles(this.params.secondaryColor),
                                        this.setFonts("".concat(n, "px ").concat(this.params.fontFamily)),
                                        this.setFillStyles(this.params.secondaryFontColor),
                                        w(function (t, a, r) {
                                            t % d == 0 && (e.fillRect(r, 0, 1, s), e.fillText(u(a, c), r + e.params.labelPadding * e.pixelRatio, s));
                                        }),
                                        this.setFillStyles(this.params.unlabeledNotchColor),
                                        w(function (t, a, r) {
                                            t % d != 0 && t % p != 0 && e.fillRect(r, 0, 1, l);
                                        });
                                }
                            },
                        },
                        {
                            key: "setFillStyles",
                            value: function (e) {
                                this.canvases.forEach(function (t) {
                                    t.getContext("2d").fillStyle = e;
                                });
                            },
                        },
                        {
                            key: "setFonts",
                            value: function (e) {
                                this.canvases.forEach(function (t) {
                                    t.getContext("2d").font = e;
                                });
                            },
                        },
                        {
                            key: "fillRect",
                            value: function (e, t, a, r) {
                                var n = this;

                                this.canvases.forEach(function (i, o) {
                                    var s = o * n.maxCanvasWidth,
                                        l = { x1: Math.max(e, o * n.maxCanvasWidth), y1: t, x2: Math.min(e + a, o * n.maxCanvasWidth + i.width), y2: t + r };
                                    l.x1 < l.x2 && i.getContext("2d").fillRect(l.x1 - s, l.y1, (l.x2 + 0) - l.x1, (l.y2 - l.y1 + 2));
                                });
                            },
                        },
                        {
                            key: "fillText",
                            value: function (e, t, a) {
                                var r,
                                    n = 0;
                                this.canvases.forEach(function (i) {
                                    var o = i.getContext("2d"),
                                        s = o.canvas.width;
                                    n > t + r || (n + s > t && ((r = o.measureText(e).width), o.fillText(e, t - n, a)), (n += s));
                                });
                            },
                        },
                        {
                            key: "defaultFormatTimeCallback",
                            value: function (e, t) {
                                if (e / 60 > 1) {
                                    var a = parseInt(e / 60, 10);
                                    return (e = (e = parseInt(e % 60, 10)) < 10 ? "0" + e : e), "".concat(a, ":").concat(e);
                                }
                                return Math.round(1e3 * e) / 1e3;
                            },
                        },
                        {
                            key: "defaultTimeInterval",
                            value: function (e) {
                                return e >= 25 ? 1 : 5 * e >= 25 ? 5 : 15 * e >= 25 ? 15 : 60 * Math.ceil(0.5 / e);
                            },
                        },
                        {
                            key: "defaultPrimaryLabelInterval",
                            value: function (e) {
                                return e >= 25 ? 10 : 5 * e >= 25 ? 6 : 4;
                            },
                        },
                        {
                            key: "defaultSecondaryLabelInterval",
                            value: function (e) {
                                return e >= 25 ? 5 : 2;
                            },
                        },
                    ]),
                    e
                );
            })();
            t.default = i;
            var o = function () {
                var e = this;
                (this._onScroll = function () {
                    e.wrapper && e.drawer.wrapper && (e.wrapper.scrollLeft = e.drawer.wrapper.scrollLeft);
                }),
                    (this._onRedraw = function () {
                        return e.render();
                    }),
                    (this._onReady = function () {
                        var t = e.wavesurfer;
                        (e.drawer = t.drawer),
                            (e.pixelRatio = t.drawer.params.pixelRatio),
                            (e.maxCanvasWidth = t.drawer.maxCanvasWidth || t.drawer.width),
                            (e.maxCanvasElementWidth = t.drawer.maxCanvasElementWidth || Math.round(e.maxCanvasWidth / e.pixelRatio)),
                            t.drawer.wrapper.addEventListener("scroll", e._onScroll),
                            t.on("redraw", e._onRedraw),
                            t.on("zoom", e._onZoom),
                            e.render();
                    }),
                    (this._onWrapperClick = function (t) {
                        t.preventDefault();
                        var a = "offsetX" in t ? t.offsetX : t.layerX;
                        e.fireEvent("click", a / e.wrapper.scrollWidth || 0);
                    });
            };
            e.exports = t.default;
        },
    });
});
//# sourceMappingURL=wavesurfer.timeline.min.js.map
