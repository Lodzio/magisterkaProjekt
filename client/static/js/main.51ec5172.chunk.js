(this.webpackJsonpweb = this.webpackJsonpweb || []).push([
  [0],
  {
    27: function (t, e, n) {},
    3: function (t, e, n) {
      t.exports = {
        app: "App_app__1kX79",
        sensorContent: "App_sensorContent__6fObM",
      };
    },
    48: function (t, e, n) {
      "use strict";
      n.r(e);
      var a = n(1),
        c = n(0),
        s = n.n(c),
        o = n(15),
        i = n.n(o),
        r = (n(27), n(6)),
        d = n(16),
        l = n(17),
        u = n(21),
        j = n(20),
        p = n(3),
        h = n.n(p),
        b = n(5),
        v = n(19),
        O = n.n(v),
        m = window.location.href,
        f = O.a.create({ baseURL: m }),
        x = (function (t) {
          Object(u.a)(n, t);
          var e = Object(j.a)(n);
          function n() {
            var t;
            Object(d.a)(this, n);
            for (var a = arguments.length, c = new Array(a), s = 0; s < a; s++)
              c[s] = arguments[s];
            return (
              ((t = e.call.apply(e, [this].concat(c))).state = {
                s1: [],
                s2: [],
                actualS1: "",
                actualS2: "",
              }),
              (t.parseLogs = function (t) {
                return t
                  .sort(function (t, e) {
                    return t.timestamp - e.timestamp;
                  })
                  .map(function (t) {
                    return [new Date(t.timestamp).toLocaleString(), t.value];
                  });
              }),
              (t.pompWater = function (t) {
                f.post("/pompWAter", { valveState: t });
              }),
              t
            );
          }
          return (
            Object(l.a)(n, [
              {
                key: "componentDidMount",
                value: function () {
                  var t = this;
                  f.get("/logs", { params: { id: "s1" } }).then(function (e) {
                    t.setState({
                      s1: t.parseLogs(e.data),
                      actualS1: "".concat(
                        (100 * e.data[e.data.length - 1].value).toFixed(1),
                        "%"
                      ),
                    });
                  }),
                    f.get("/logs", { params: { id: "s2" } }).then(function (e) {
                      t.setState({
                        s2: t.parseLogs(e.data),
                        actualS2: "".concat(
                          (100 * e.data[e.data.length - 1].value).toFixed(1),
                          "%"
                        ),
                      });
                    });
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this,
                    e = this.state,
                    n = e.s1,
                    c = e.s2,
                    s = e.actualS1,
                    o = e.actualS2;
                  return Object(a.jsxs)("div", {
                    className: h.a.app,
                    children: [
                      Object(a.jsxs)("div", {
                        className: h.a.sensorContent,
                        children: [
                          Object(a.jsxs)("div", {
                            children: [
                              Object(a.jsx)("div", { children: "Czujnik 1" }),
                              Object(a.jsx)("div", { children: s }),
                              Object(a.jsx)("button", {
                                onClick: function () {
                                  return t.pompWater(0);
                                },
                                children: "Podlej",
                              }),
                            ],
                          }),
                          Object(a.jsx)(b.a, {
                            width: "100%",
                            height: "100%",
                            data: [["", "wilgotno\u015b\u0107"]].concat(
                              Object(r.a)(n)
                            ),
                            chartType: "Line",
                          }),
                        ],
                      }),
                      Object(a.jsxs)("div", {
                        className: h.a.sensorContent,
                        children: [
                          Object(a.jsxs)("div", {
                            children: [
                              Object(a.jsx)("div", { children: "Czujnik 2" }),
                              Object(a.jsx)("div", { children: o }),
                              Object(a.jsx)("button", {
                                onClick: function () {
                                  return t.pompWater(1);
                                },
                                children: "Podlej",
                              }),
                            ],
                          }),
                          Object(a.jsx)(b.a, {
                            width: "100%",
                            height: "100%",
                            data: [["", "wilgotno\u015b\u0107"]].concat(
                              Object(r.a)(c)
                            ),
                            chartType: "Line",
                          }),
                        ],
                      }),
                    ],
                  });
                },
              },
            ]),
            n
          );
        })(c.Component);
      i.a.render(
        Object(a.jsx)(s.a.StrictMode, { children: Object(a.jsx)(x, {}) }),
        document.getElementById("root")
      );
    },
  },
  [[48, 1, 2]],
]);
//# sourceMappingURL=main.51ec5172.chunk.js.map
