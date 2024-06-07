(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver(s => {
        for (const o of s)
            if (o.type === "childList")
                for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(s) {
        const o = {};
        return s.integrity && (o.integrity = s.integrity), s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? o.credentials = "include" : s.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o)
    }
})();

function ar(e, t) {
    const n = new Set(e.split(","));
    return t ? r => n.has(r.toLowerCase()) : r => n.has(r)
}
const X = {},
    bt = [],
    Ee = () => { },
    ii = () => !1,
    vn = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    fr = e => e.startsWith("onUpdate:"),
    ae = Object.assign,
    dr = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    li = Object.prototype.hasOwnProperty,
    z = (e, t) => li.call(e, t),
    D = Array.isArray,
    At = e => yn(e) === "[object Map]",
    Ds = e => yn(e) === "[object Set]",
    B = e => typeof e == "function",
    oe = e => typeof e == "string",
    Tt = e => typeof e == "symbol",
    Z = e => e !== null && typeof e == "object",
    Bs = e => (Z(e) || B(e)) && B(e.then) && B(e.catch),
    Vs = Object.prototype.toString,
    yn = e => Vs.call(e),
    ci = e => yn(e).slice(8, -1),
    Us = e => yn(e) === "[object Object]",
    hr = e => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    on = ar(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    bn = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    ui = /-(\w)/g,
    Ne = bn(e => e.replace(ui, (t, n) => n ? n.toUpperCase() : "")),
    ai = /\B([A-Z])/g,
    It = bn(e => e.replace(ai, "-$1").toLowerCase()),
    An = bn(e => e.charAt(0).toUpperCase() + e.slice(1)),
    $n = bn(e => e ? `on${An(e)}` : ""),
    et = (e, t) => !Object.is(e, t),
    Nn = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    },
    an = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    fi = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let Hr;
const zs = () => Hr || (Hr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function pr(e) {
    if (D(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                s = oe(r) ? gi(r) : pr(r);
            if (s)
                for (const o in s) t[o] = s[o]
        }
        return t
    } else if (oe(e) || Z(e)) return e
}
const di = /;(?![^(]*\))/g,
    hi = /:([^]+)/,
    pi = /\/\*[^]*?\*\//g;

function gi(e) {
    const t = {};
    return e.replace(pi, "").split(di).forEach(n => {
        if (n) {
            const r = n.split(hi);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function gr(e) {
    let t = "";
    if (oe(e)) t = e;
    else if (D(e))
        for (let n = 0; n < e.length; n++) {
            const r = gr(e[n]);
            r && (t += r + " ")
        } else if (Z(e))
        for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}
const mi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    _i = ar(mi);

function Ws(e) {
    return !!e || e === ""
}
const vi = e => oe(e) ? e : e == null ? "" : D(e) || Z(e) && (e.toString === Vs || !B(e.toString)) ? JSON.stringify(e, Ks, 2) : String(e),
    Ks = (e, t) => t && t.__v_isRef ? Ks(e, t.value) : At(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], o) => (n[jn(r, o) + " =>"] = s, n), {})
    } : Ds(t) ? {
        [`Set(${t.size})`]: [...t.values()].map(n => jn(n))
    } : Tt(t) ? jn(t) : Z(t) && !D(t) && !Us(t) ? String(t) : t,
    jn = (e, t = "") => {
        var n;
        return Tt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
    };
let be;
class yi {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = be, !t && be && (this.index = (be.scopes || (be.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = be;
            try {
                return be = this, t()
            } finally {
                be = n
            }
        }
    }
    on() {
        be = this
    }
    off() {
        be = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function bi(e, t = be) {
    t && t.active && t.effects.push(e)
}

function Qs() {
    return be
}

function Ai(e) {
    be && be.cleanups.push(e)
}
let ut;
class mr {
    constructor(t, n, r, s) {
        this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 3, this._trackId = 0, this._runnings = 0, this._queryings = 0, this._depsLength = 0, bi(this, s)
    }
    get dirty() {
        if (this._dirtyLevel === 1) {
            this._dirtyLevel = 0, this._queryings++, ht();
            for (const t of this.deps)
                if (t.computed && (wi(t.computed), this._dirtyLevel >= 2)) break;
            pt(), this._queryings--
        }
        return this._dirtyLevel >= 2
    }
    set dirty(t) {
        this._dirtyLevel = t ? 3 : 0
    }
    run() {
        if (this._dirtyLevel = 0, !this.active) return this.fn();
        let t = Ye,
            n = ut;
        try {
            return Ye = !0, ut = this, this._runnings++, Dr(this), this.fn()
        } finally {
            Br(this), this._runnings--, ut = n, Ye = t
        }
    }
    stop() {
        var t;
        this.active && (Dr(this), Br(this), (t = this.onStop) == null || t.call(this), this.active = !1)
    }
}

function wi(e) {
    return e.value
}

function Dr(e) {
    e._trackId++, e._depsLength = 0
}

function Br(e) {
    if (e.deps && e.deps.length > e._depsLength) {
        for (let t = e._depsLength; t < e.deps.length; t++) qs(e.deps[t], e);
        e.deps.length = e._depsLength
    }
}

function qs(e, t) {
    const n = e.get(t);
    n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}
let Ye = !0,
    Qn = 0;
const Gs = [];

function ht() {
    Gs.push(Ye), Ye = !1
}

function pt() {
    const e = Gs.pop();
    Ye = e === void 0 ? !0 : e
}

function _r() {
    Qn++
}

function vr() {
    for (Qn--; !Qn && qn.length;) qn.shift()()
}

function Js(e, t, n) {
    if (t.get(e) !== e._trackId) {
        t.set(e, e._trackId);
        const r = e.deps[e._depsLength];
        r !== t ? (r && qs(r, e), e.deps[e._depsLength++] = t) : e._depsLength++
    }
}
const qn = [];

function Ys(e, t, n) {
    _r();
    for (const r of e.keys())
        if (!(!r.allowRecurse && r._runnings) && r._dirtyLevel < t && (!r._runnings || t !== 2)) {
            const s = r._dirtyLevel;
            r._dirtyLevel = t, s === 0 && (!r._queryings || t !== 2) && (r.trigger(), r.scheduler && qn.push(r.scheduler))
        } vr()
}
const Xs = (e, t) => {
    const n = new Map;
    return n.cleanup = e, n.computed = t, n
},
    fn = new WeakMap,
    at = Symbol(""),
    Gn = Symbol("");

function ve(e, t, n) {
    if (Ye && ut) {
        let r = fn.get(e);
        r || fn.set(e, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = Xs(() => r.delete(n))), Js(ut, s)
    }
}

function Be(e, t, n, r, s, o) {
    const i = fn.get(e);
    if (!i) return;
    let l = [];
    if (t === "clear") l = [...i.values()];
    else if (n === "length" && D(e)) {
        const c = Number(r);
        i.forEach((u, a) => {
            (a === "length" || !Tt(a) && a >= c) && l.push(u)
        })
    } else switch (n !== void 0 && l.push(i.get(n)), t) {
        case "add":
            D(e) ? hr(n) && l.push(i.get("length")) : (l.push(i.get(at)), At(e) && l.push(i.get(Gn)));
            break;
        case "delete":
            D(e) || (l.push(i.get(at)), At(e) && l.push(i.get(Gn)));
            break;
        case "set":
            At(e) && l.push(i.get(at));
            break
    }
    _r();
    for (const c of l) c && Ys(c, 3);
    vr()
}

function Ei(e, t) {
    var n;
    return (n = fn.get(e)) == null ? void 0 : n.get(t)
}
const xi = ar("__proto__,__v_isRef,__isVue"),
    Zs = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Tt)),
    Vr = Ri();

function Ri() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function (...n) {
            const r = W(this);
            for (let o = 0, i = this.length; o < i; o++) ve(r, "get", o + "");
            const s = r[t](...n);
            return s === -1 || s === !1 ? r[t](...n.map(W)) : s
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function (...n) {
            ht(), _r();
            const r = W(this)[t].apply(this, n);
            return vr(), pt(), r
        }
    }), e
}

function Si(e) {
    const t = W(this);
    return ve(t, "has", e), t.hasOwnProperty(e)
}
class eo {
    constructor(t = !1, n = !1) {
        this._isReadonly = t, this._shallow = n
    }
    get(t, n, r) {
        const s = this._isReadonly,
            o = this._shallow;
        if (n === "__v_isReactive") return !s;
        if (n === "__v_isReadonly") return s;
        if (n === "__v_isShallow") return o;
        if (n === "__v_raw") return r === (s ? o ? Hi : so : o ? ro : no).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
        const i = D(t);
        if (!s) {
            if (i && z(Vr, n)) return Reflect.get(Vr, n, r);
            if (n === "hasOwnProperty") return Si
        }
        const l = Reflect.get(t, n, r);
        return (Tt(n) ? Zs.has(n) : xi(n)) || (s || ve(t, "get", n), o) ? l : fe(l) ? i && hr(n) ? l : l.value : Z(l) ? s ? En(l) : tt(l) : l
    }
}
class to extends eo {
    constructor(t = !1) {
        super(!1, t)
    }
    set(t, n, r, s) {
        let o = t[n];
        if (!this._shallow) {
            const c = xt(o);
            if (!dn(r) && !xt(r) && (o = W(o), r = W(r)), !D(t) && fe(o) && !fe(r)) return c ? !1 : (o.value = r, !0)
        }
        const i = D(t) && hr(n) ? Number(n) < t.length : z(t, n),
            l = Reflect.set(t, n, r, s);
        return t === W(s) && (i ? et(r, o) && Be(t, "set", n, r) : Be(t, "add", n, r)), l
    }
    deleteProperty(t, n) {
        const r = z(t, n);
        t[n];
        const s = Reflect.deleteProperty(t, n);
        return s && r && Be(t, "delete", n, void 0), s
    }
    has(t, n) {
        const r = Reflect.has(t, n);
        return (!Tt(n) || !Zs.has(n)) && ve(t, "has", n), r
    }
    ownKeys(t) {
        return ve(t, "iterate", D(t) ? "length" : at), Reflect.ownKeys(t)
    }
}
class Ci extends eo {
    constructor(t = !1) {
        super(!0, t)
    }
    set(t, n) {
        return !0
    }
    deleteProperty(t, n) {
        return !0
    }
}
const Oi = new to,
    Pi = new Ci,
    Li = new to(!0),
    yr = e => e,
    wn = e => Reflect.getPrototypeOf(e);

function Jt(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = W(e),
        o = W(t);
    n || (et(t, o) && ve(s, "get", t), ve(s, "get", o));
    const {
        has: i
    } = wn(s), l = r ? yr : n ? wr : Ut;
    if (i.call(s, t)) return l(e.get(t));
    if (i.call(s, o)) return l(e.get(o));
    e !== s && e.get(t)
}

function Yt(e, t = !1) {
    const n = this.__v_raw,
        r = W(n),
        s = W(e);
    return t || (et(e, s) && ve(r, "has", e), ve(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function Xt(e, t = !1) {
    return e = e.__v_raw, !t && ve(W(e), "iterate", at), Reflect.get(e, "size", e)
}

function Ur(e) {
    e = W(e);
    const t = W(this);
    return wn(t).has.call(t, e) || (t.add(e), Be(t, "add", e, e)), this
}

function zr(e, t) {
    t = W(t);
    const n = W(this),
        {
            has: r,
            get: s
        } = wn(n);
    let o = r.call(n, e);
    o || (e = W(e), o = r.call(n, e));
    const i = s.call(n, e);
    return n.set(e, t), o ? et(t, i) && Be(n, "set", e, t) : Be(n, "add", e, t), this
}

function Wr(e) {
    const t = W(this),
        {
            has: n,
            get: r
        } = wn(t);
    let s = n.call(t, e);
    s || (e = W(e), s = n.call(t, e)), r && r.call(t, e);
    const o = t.delete(e);
    return s && Be(t, "delete", e, void 0), o
}

function Kr() {
    const e = W(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Be(e, "clear", void 0, void 0), n
}

function Zt(e, t) {
    return function (r, s) {
        const o = this,
            i = o.__v_raw,
            l = W(i),
            c = t ? yr : e ? wr : Ut;
        return !e && ve(l, "iterate", at), i.forEach((u, a) => r.call(s, c(u), c(a), o))
    }
}

function en(e, t, n) {
    return function (...r) {
        const s = this.__v_raw,
            o = W(s),
            i = At(o),
            l = e === "entries" || e === Symbol.iterator && i,
            c = e === "keys" && i,
            u = s[e](...r),
            a = n ? yr : t ? wr : Ut;
        return !t && ve(o, "iterate", c ? Gn : at), {
            next() {
                const {
                    value: h,
                    done: p
                } = u.next();
                return p ? {
                    value: h,
                    done: p
                } : {
                    value: l ? [a(h[0]), a(h[1])] : a(h),
                    done: p
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function We(e) {
    return function (...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}

function Ti() {
    const e = {
        get(o) {
            return Jt(this, o)
        },
        get size() {
            return Xt(this)
        },
        has: Yt,
        add: Ur,
        set: zr,
        delete: Wr,
        clear: Kr,
        forEach: Zt(!1, !1)
    },
        t = {
            get(o) {
                return Jt(this, o, !1, !0)
            },
            get size() {
                return Xt(this)
            },
            has: Yt,
            add: Ur,
            set: zr,
            delete: Wr,
            clear: Kr,
            forEach: Zt(!1, !0)
        },
        n = {
            get(o) {
                return Jt(this, o, !0)
            },
            get size() {
                return Xt(this, !0)
            },
            has(o) {
                return Yt.call(this, o, !0)
            },
            add: We("add"),
            set: We("set"),
            delete: We("delete"),
            clear: We("clear"),
            forEach: Zt(!0, !1)
        },
        r = {
            get(o) {
                return Jt(this, o, !0, !0)
            },
            get size() {
                return Xt(this, !0)
            },
            has(o) {
                return Yt.call(this, o, !0)
            },
            add: We("add"),
            set: We("set"),
            delete: We("delete"),
            clear: We("clear"),
            forEach: Zt(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
        e[o] = en(o, !1, !1), n[o] = en(o, !0, !1), t[o] = en(o, !1, !0), r[o] = en(o, !0, !0)
    }), [e, n, t, r]
}
const [Ii, Mi, $i, Ni] = Ti();

function br(e, t) {
    const n = t ? e ? Ni : $i : e ? Mi : Ii;
    return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(z(n, s) && s in r ? n : r, s, o)
}
const ji = {
    get: br(!1, !1)
},
    Fi = {
        get: br(!1, !0)
    },
    ki = {
        get: br(!0, !1)
    },
    no = new WeakMap,
    ro = new WeakMap,
    so = new WeakMap,
    Hi = new WeakMap;

function Di(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function Bi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Di(ci(e))
}

function tt(e) {
    return xt(e) ? e : Ar(e, !1, Oi, ji, no)
}

function oo(e) {
    return Ar(e, !1, Li, Fi, ro)
}

function En(e) {
    return Ar(e, !0, Pi, ki, so)
}

function Ar(e, t, n, r, s) {
    if (!Z(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const o = s.get(e);
    if (o) return o;
    const i = Bi(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? r : n);
    return s.set(e, l), l
}

function wt(e) {
    return xt(e) ? wt(e.__v_raw) : !!(e && e.__v_isReactive)
}

function xt(e) {
    return !!(e && e.__v_isReadonly)
}

function dn(e) {
    return !!(e && e.__v_isShallow)
}

function io(e) {
    return wt(e) || xt(e)
}

function W(e) {
    const t = e && e.__v_raw;
    return t ? W(t) : e
}

function lo(e) {
    return an(e, "__v_skip", !0), e
}
const Ut = e => Z(e) ? tt(e) : e,
    wr = e => Z(e) ? En(e) : e;
class co {
    constructor(t, n, r, s) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new mr(() => t(this._value), () => hn(this, 1)), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r
    }
    get value() {
        const t = W(this);
        return Er(t), (!t._cacheable || t.effect.dirty) && et(t._value, t._value = t.effect.run()) && hn(t, 2), t._value
    }
    set value(t) {
        this._setter(t)
    }
    get _dirty() {
        return this.effect.dirty
    }
    set _dirty(t) {
        this.effect.dirty = t
    }
}

function Vi(e, t, n = !1) {
    let r, s;
    const o = B(e);
    return o ? (r = e, s = Ee) : (r = e.get, s = e.set), new co(r, s, o || !s, n)
}

function Er(e) {
    Ye && ut && (e = W(e), Js(ut, e.dep || (e.dep = Xs(() => e.dep = void 0, e instanceof co ? e : void 0))))
}

function hn(e, t = 3, n) {
    e = W(e);
    const r = e.dep;
    r && Ys(r, t)
}

function fe(e) {
    return !!(e && e.__v_isRef === !0)
}

function xe(e) {
    return ao(e, !1)
}

function uo(e) {
    return ao(e, !0)
}

function ao(e, t) {
    return fe(e) ? e : new Ui(e, t)
}
class Ui {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : W(t), this._value = n ? t : Ut(t)
    }
    get value() {
        return Er(this), this._value
    }
    set value(t) {
        const n = this.__v_isShallow || dn(t) || xt(t);
        t = n ? t : W(t), et(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Ut(t), hn(this, 3))
    }
}

function we(e) {
    return fe(e) ? e.value : e
}
const zi = {
    get: (e, t, n) => we(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const s = e[t];
        return fe(s) && !fe(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function fo(e) {
    return wt(e) ? e : new Proxy(e, zi)
}
class Wi {
    constructor(t) {
        this.dep = void 0, this.__v_isRef = !0;
        const {
            get: n,
            set: r
        } = t(() => Er(this), () => hn(this));
        this._get = n, this._set = r
    }
    get value() {
        return this._get()
    }
    set value(t) {
        this._set(t)
    }
}

function Ki(e) {
    return new Wi(e)
}
class Qi {
    constructor(t, n, r) {
        this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return Ei(W(this._object), this._key)
    }
}
class qi {
    constructor(t) {
        this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0
    }
    get value() {
        return this._getter()
    }
}

function Gi(e, t, n) {
    return fe(e) ? e : B(e) ? new qi(e) : Z(e) && arguments.length > 1 ? Ji(e, t, n) : xe(e)
}

function Ji(e, t, n) {
    const r = e[t];
    return fe(r) ? r : new Qi(e, t, n)
}

function Xe(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e()
    } catch (o) {
        xn(o, t, n)
    }
    return s
}

function Ce(e, t, n, r) {
    if (B(e)) {
        const o = Xe(e, t, n, r);
        return o && Bs(o) && o.catch(i => {
            xn(i, t, n)
        }), o
    }
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(Ce(e[o], t, n, r));
    return s
}

function xn(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy,
            l = `https://vuejs.org/errors/#runtime-${n}`;
        for (; o;) {
            const u = o.ec;
            if (u) {
                for (let a = 0; a < u.length; a++)
                    if (u[a](e, i, l) === !1) return
            }
            o = o.parent
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            Xe(c, null, 10, [e, i, l]);
            return
        }
    }
    Yi(e, n, s, r)
}

function Yi(e, t, n, r = !0) {
    console.error(e)
}
let zt = !1,
    Jn = !1;
const pe = [];
let $e = 0;
const Et = [];
let ke = null,
    lt = 0;
const ho = Promise.resolve();
let xr = null;

function Je(e) {
    const t = xr || ho;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Xi(e) {
    let t = $e + 1,
        n = pe.length;
    for (; t < n;) {
        const r = t + n >>> 1,
            s = pe[r],
            o = Wt(s);
        o < e || o === e && s.pre ? t = r + 1 : n = r
    }
    return t
}

function Rr(e) {
    (!pe.length || !pe.includes(e, zt && e.allowRecurse ? $e + 1 : $e)) && (e.id == null ? pe.push(e) : pe.splice(Xi(e.id), 0, e), po())
}

function po() {
    !zt && !Jn && (Jn = !0, xr = ho.then(mo))
}

function Zi(e) {
    const t = pe.indexOf(e);
    t > $e && pe.splice(t, 1)
}

function el(e) {
    D(e) ? Et.push(...e) : (!ke || !ke.includes(e, e.allowRecurse ? lt + 1 : lt)) && Et.push(e), po()
}

function Qr(e, t, n = zt ? $e + 1 : 0) {
    for (; n < pe.length; n++) {
        const r = pe[n];
        if (r && r.pre) {
            if (e && r.id !== e.uid) continue;
            pe.splice(n, 1), n--, r()
        }
    }
}

function go(e) {
    if (Et.length) {
        const t = [...new Set(Et)];
        if (Et.length = 0, ke) {
            ke.push(...t);
            return
        }
        for (ke = t, ke.sort((n, r) => Wt(n) - Wt(r)), lt = 0; lt < ke.length; lt++) ke[lt]();
        ke = null, lt = 0
    }
}
const Wt = e => e.id == null ? 1 / 0 : e.id,
    tl = (e, t) => {
        const n = Wt(e) - Wt(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return n
    };

function mo(e) {
    Jn = !1, zt = !0, pe.sort(tl);
    try {
        for ($e = 0; $e < pe.length; $e++) {
            const t = pe[$e];
            t && t.active !== !1 && Xe(t, null, 14)
        }
    } finally {
        $e = 0, pe.length = 0, go(), zt = !1, xr = null, (pe.length || Et.length) && mo()
    }
}

function nl(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || X;
    let s = n;
    const o = t.startsWith("update:"),
        i = o && t.slice(7);
    if (i && i in r) {
        const a = `${i === "modelValue" ? "model" : i}Modifiers`,
            {
                number: h,
                trim: p
            } = r[a] || X;
        p && (s = n.map(_ => oe(_) ? _.trim() : _)), h && (s = n.map(fi))
    }
    let l, c = r[l = $n(t)] || r[l = $n(Ne(t))];
    !c && o && (c = r[l = $n(It(t))]), c && Ce(c, e, 6, s);
    const u = r[l + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        e.emitted[l] = !0, Ce(u, e, 6, s)
    }
}

function _o(e, t, n = !1) {
    const r = t.emitsCache,
        s = r.get(e);
    if (s !== void 0) return s;
    const o = e.emits;
    let i = {},
        l = !1;
    if (!B(e)) {
        const c = u => {
            const a = _o(u, t, !0);
            a && (l = !0, ae(i, a))
        };
        !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c)
    }
    return !o && !l ? (Z(e) && r.set(e, null), null) : (D(o) ? o.forEach(c => i[c] = null) : ae(i, o), Z(e) && r.set(e, i), i)
}

function Rn(e, t) {
    return !e || !vn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), z(e, t[0].toLowerCase() + t.slice(1)) || z(e, It(t)) || z(e, t))
}
let Ae = null,
    vo = null;

function pn(e) {
    const t = Ae;
    return Ae = e, vo = e && e.type.__scopeId || null, t
}

function rl(e, t = Ae, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && ss(-1);
        const o = pn(t);
        let i;
        try {
            i = e(...s)
        } finally {
            pn(o), r._d && ss(1)
        }
        return i
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function Fn(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: o,
        propsOptions: [i],
        slots: l,
        attrs: c,
        emit: u,
        render: a,
        renderCache: h,
        data: p,
        setupState: _,
        ctx: R,
        inheritAttrs: P
    } = e;
    let M, L;
    const $ = pn(e);
    try {
        if (n.shapeFlag & 4) {
            const F = s || r,
                j = F;
            M = Me(a.call(j, F, h, o, _, p, R)), L = c
        } else {
            const F = t;
            M = Me(F.length > 1 ? F(o, {
                attrs: c,
                slots: l,
                emit: u
            }) : F(o, null)), L = t.props ? c : sl(c)
        }
    } catch (F) {
        Dt.length = 0, xn(F, e, 1), M = ue(dt)
    }
    let k = M;
    if (L && P !== !1) {
        const F = Object.keys(L),
            {
                shapeFlag: j
            } = k;
        F.length && j & 7 && (i && F.some(fr) && (L = ol(L, i)), k = Rt(k, L))
    }
    return n.dirs && (k = Rt(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), M = k, pn($), M
}
const sl = e => {
    let t;
    for (const n in e) (n === "class" || n === "style" || vn(n)) && ((t || (t = {}))[n] = e[n]);
    return t
},
    ol = (e, t) => {
        const n = {};
        for (const r in e) (!fr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n
    };

function il(e, t, n) {
    const {
        props: r,
        children: s,
        component: o
    } = e, {
        props: i,
        children: l,
        patchFlag: c
    } = t, u = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return r ? qr(r, i, u) : !!i;
        if (c & 8) {
            const a = t.dynamicProps;
            for (let h = 0; h < a.length; h++) {
                const p = a[h];
                if (i[p] !== r[p] && !Rn(u, p)) return !0
            }
        }
    } else return (s || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? qr(r, i, u) : !0 : !!i;
    return !1
}

function qr(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !Rn(n, o)) return !0
    }
    return !1
}

function ll({
    vnode: e,
    parent: t
}, n) {
    if (n)
        for (; t;) {
            const r = t.subTree;
            if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
            else break
        }
}
const yo = "components",
    cl = "directives";

function ul(e, t) {
    return bo(yo, e, !0, t) || e
}
const al = Symbol.for("v-ndc");

function Fa(e) {
    return bo(cl, e)
}

function bo(e, t, n = !0, r = !1) {
    const s = Ae || ce;
    if (s) {
        const o = s.type;
        if (e === yo) {
            const l = rc(o, !1);
            if (l && (l === t || l === Ne(t) || l === An(Ne(t)))) return o
        }
        const i = Gr(s[e] || o[e], t) || Gr(s.appContext[e], t);
        return !i && r ? o : i
    }
}

function Gr(e, t) {
    return e && (e[t] || e[Ne(t)] || e[An(Ne(t))])
}
const fl = e => e.__isSuspense;

function dl(e, t) {
    t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : el(e)
}

function hl(e, t) {
    return Sr(e, null, t)
}
const tn = {};

function Ze(e, t, n) {
    return Sr(e, t, n)
}

function Sr(e, t, {
    immediate: n,
    deep: r,
    flush: s,
    once: o,
    onTrack: i,
    onTrigger: l
} = X) {
    var c;
    if (t && o) {
        const j = t;
        t = (...te) => {
            j(...te), F()
        }
    }
    const u = Qs() === ((c = ce) == null ? void 0 : c.scope) ? ce : null;
    let a, h = !1,
        p = !1;
    if (fe(e) ? (a = () => e.value, h = dn(e)) : wt(e) ? (a = () => e, r = !0) : D(e) ? (p = !0, h = e.some(j => wt(j) || dn(j)), a = () => e.map(j => {
        if (fe(j)) return j.value;
        if (wt(j)) return ct(j);
        if (B(j)) return Xe(j, u, 2)
    })) : B(e) ? t ? a = () => Xe(e, u, 2) : a = () => {
        if (!(u && u.isUnmounted)) return _ && _(), Ce(e, u, 3, [R])
    } : a = Ee, t && r) {
        const j = a;
        a = () => ct(j())
    }
    let _, R = j => {
        _ = k.onStop = () => {
            Xe(j, u, 4), _ = k.onStop = void 0
        }
    },
        P;
    if (Tn)
        if (R = Ee, t ? n && Ce(t, u, 3, [a(), p ? [] : void 0, R]) : a(), s === "sync") {
            const j = ic();
            P = j.__watcherHandles || (j.__watcherHandles = [])
        } else return Ee;
    let M = p ? new Array(e.length).fill(tn) : tn;
    const L = () => {
        if (!(!k.active || !k.dirty))
            if (t) {
                const j = k.run();
                (r || h || (p ? j.some((te, re) => et(te, M[re])) : et(j, M))) && (_ && _(), Ce(t, u, 3, [j, M === tn ? void 0 : p && M[0] === tn ? [] : M, R]), M = j)
            } else k.run()
    };
    L.allowRecurse = !!t;
    let $;
    s === "sync" ? $ = L : s === "post" ? $ = () => _e(L, u && u.suspense) : (L.pre = !0, u && (L.id = u.uid), $ = () => Rr(L));
    const k = new mr(a, Ee, $),
        F = () => {
            k.stop(), u && u.scope && dr(u.scope.effects, k)
        };
    return t ? n ? L() : M = k.run() : s === "post" ? _e(k.run.bind(k), u && u.suspense) : k.run(), P && P.push(F), F
}

function pl(e, t, n) {
    const r = this.proxy,
        s = oe(e) ? e.includes(".") ? Ao(r, e) : () => r[e] : e.bind(r, r);
    let o;
    B(t) ? o = t : (o = t.handler, n = t);
    const i = ce;
    St(this);
    const l = Sr(s, o.bind(r), n);
    return i ? St(i) : ft(), l
}

function Ao(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r
    }
}

function ct(e, t) {
    if (!Z(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), fe(e)) ct(e.value, t);
    else if (D(e))
        for (let n = 0; n < e.length; n++) ct(e[n], t);
    else if (Ds(e) || At(e)) e.forEach(n => {
        ct(n, t)
    });
    else if (Us(e))
        for (const n in e) ct(e[n], t);
    return e
}

function ka(e, t) {
    const n = Ae;
    if (n === null) return e;
    const r = In(n) || n.proxy,
        s = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let [i, l, c, u = X] = t[o];
        i && (B(i) && (i = {
            mounted: i,
            updated: i
        }), i.deep && ct(l), s.push({
            dir: i,
            instance: r,
            value: l,
            oldValue: void 0,
            arg: c,
            modifiers: u
        }))
    }
    return e
}

function st(e, t, n, r) {
    const s = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const l = s[i];
        o && (l.oldValue = o[i].value);
        let c = l.dir[r];
        c && (ht(), Ce(c, n, 8, [e.el, l, e, t]), pt())
    }
} /*! #__NO_SIDE_EFFECTS__ */
function Sn(e, t) {
    return B(e) ? ae({
        name: e.name
    }, t, {
        setup: e
    }) : e
}
const ln = e => !!e.type.__asyncLoader,
    wo = e => e.type.__isKeepAlive;

function gl(e, t) {
    Eo(e, "a", t)
}

function ml(e, t) {
    Eo(e, "da", t)
}

function Eo(e, t, n = ce) {
    const r = e.__wdc || (e.__wdc = () => {
        let s = n;
        for (; s;) {
            if (s.isDeactivated) return;
            s = s.parent
        }
        return e()
    });
    if (Cn(t, r, n), n) {
        let s = n.parent;
        for (; s && s.parent;) wo(s.parent.vnode) && _l(r, t, n, s), s = s.parent
    }
}

function _l(e, t, n, r) {
    const s = Cn(t, e, r, !0);
    On(() => {
        dr(r[t], s)
    }, n)
}

function Cn(e, t, n = ce, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            o = t.__weh || (t.__weh = (...i) => {
                if (n.isUnmounted) return;
                ht(), St(n);
                const l = Ce(t, n, e, i);
                return ft(), pt(), l
            });
        return r ? s.unshift(o) : s.push(o), o
    }
}
const Ue = e => (t, n = ce) => (!Tn || e === "sp") && Cn(e, (...r) => t(...r), n),
    vl = Ue("bm"),
    qt = Ue("m"),
    yl = Ue("bu"),
    bl = Ue("u"),
    Al = Ue("bum"),
    On = Ue("um"),
    wl = Ue("sp"),
    El = Ue("rtg"),
    xl = Ue("rtc");

function Rl(e, t = ce) {
    Cn("ec", e, t)
}

function Ha(e, t, n, r) {
    let s;
    const o = n && n[r];
    if (D(e) || oe(e)) {
        s = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++) s[i] = t(e[i], i, void 0, o && o[i])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i])
    } else if (Z(e))
        if (e[Symbol.iterator]) s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
        else {
            const i = Object.keys(e);
            s = new Array(i.length);
            for (let l = 0, c = i.length; l < c; l++) {
                const u = i[l];
                s[l] = t(e[u], u, l, o && o[l])
            }
        }
    else s = [];
    return n && (n[r] = s), s
}
const Yn = e => e ? Fo(e) ? In(e) || e.proxy : Yn(e.parent) : null,
    Ht = ae(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => Yn(e.parent),
        $root: e => Yn(e.root),
        $emit: e => e.emit,
        $options: e => Cr(e),
        $forceUpdate: e => e.f || (e.f = () => {
            e.effect.dirty = !0, Rr(e.update)
        }),
        $nextTick: e => e.n || (e.n = Je.bind(e.proxy)),
        $watch: e => pl.bind(e)
    }),
    kn = (e, t) => e !== X && !e.__isScriptSetup && z(e, t),
    Sl = {
        get({
            _: e
        }, t) {
            const {
                ctx: n,
                setupState: r,
                data: s,
                props: o,
                accessCache: i,
                type: l,
                appContext: c
            } = e;
            let u;
            if (t[0] !== "$") {
                const _ = i[t];
                if (_ !== void 0) switch (_) {
                    case 1:
                        return r[t];
                    case 2:
                        return s[t];
                    case 4:
                        return n[t];
                    case 3:
                        return o[t]
                } else {
                    if (kn(r, t)) return i[t] = 1, r[t];
                    if (s !== X && z(s, t)) return i[t] = 2, s[t];
                    if ((u = e.propsOptions[0]) && z(u, t)) return i[t] = 3, o[t];
                    if (n !== X && z(n, t)) return i[t] = 4, n[t];
                    Xn && (i[t] = 0)
                }
            }
            const a = Ht[t];
            let h, p;
            if (a) return t === "$attrs" && ve(e, "get", t), a(e);
            if ((h = l.__cssModules) && (h = h[t])) return h;
            if (n !== X && z(n, t)) return i[t] = 4, n[t];
            if (p = c.config.globalProperties, z(p, t)) return p[t]
        },
        set({
            _: e
        }, t, n) {
            const {
                data: r,
                setupState: s,
                ctx: o
            } = e;
            return kn(s, t) ? (s[t] = n, !0) : r !== X && z(r, t) ? (r[t] = n, !0) : z(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: r,
                appContext: s,
                propsOptions: o
            }
        }, i) {
            let l;
            return !!n[i] || e !== X && z(e, i) || kn(t, i) || (l = o[0]) && z(l, i) || z(r, i) || z(Ht, i) || z(s.config.globalProperties, i)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : z(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };

function Jr(e) {
    return D(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}
let Xn = !0;

function Cl(e) {
    const t = Cr(e),
        n = e.proxy,
        r = e.ctx;
    Xn = !1, t.beforeCreate && Yr(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: o,
        methods: i,
        watch: l,
        provide: c,
        inject: u,
        created: a,
        beforeMount: h,
        mounted: p,
        beforeUpdate: _,
        updated: R,
        activated: P,
        deactivated: M,
        beforeDestroy: L,
        beforeUnmount: $,
        destroyed: k,
        unmounted: F,
        render: j,
        renderTracked: te,
        renderTriggered: re,
        errorCaptured: ne,
        serverPrefetch: V,
        expose: K,
        inheritAttrs: de,
        components: rt,
        directives: Pe,
        filters: Mt
    } = t;
    if (u && Ol(u, r, null), i)
        for (const J in i) {
            const Q = i[J];
            B(Q) && (r[J] = Q.bind(n))
        }
    if (s) {
        const J = s.call(n, n);
        Z(J) && (e.data = tt(J))
    }
    if (Xn = !0, o)
        for (const J in o) {
            const Q = o[J],
                je = B(Q) ? Q.bind(n, n) : B(Q.get) ? Q.get.bind(n, n) : Ee,
                ze = !B(Q) && B(Q.set) ? Q.set.bind(n) : Ee,
                Le = se({
                    get: je,
                    set: ze
                });
            Object.defineProperty(r, J, {
                enumerable: !0,
                configurable: !0,
                get: () => Le.value,
                set: me => Le.value = me
            })
        }
    if (l)
        for (const J in l) xo(l[J], r, n, J);
    if (c) {
        const J = B(c) ? c.call(n) : c;
        Reflect.ownKeys(J).forEach(Q => {
            cn(Q, J[Q])
        })
    }
    a && Yr(a, e, "c");

    function ie(J, Q) {
        D(Q) ? Q.forEach(je => J(je.bind(n))) : Q && J(Q.bind(n))
    }
    if (ie(vl, h), ie(qt, p), ie(yl, _), ie(bl, R), ie(gl, P), ie(ml, M), ie(Rl, ne), ie(xl, te), ie(El, re), ie(Al, $), ie(On, F), ie(wl, V), D(K))
        if (K.length) {
            const J = e.exposed || (e.exposed = {});
            K.forEach(Q => {
                Object.defineProperty(J, Q, {
                    get: () => n[Q],
                    set: je => n[Q] = je
                })
            })
        } else e.exposed || (e.exposed = {});
    j && e.render === Ee && (e.render = j), de != null && (e.inheritAttrs = de), rt && (e.components = rt), Pe && (e.directives = Pe)
}

function Ol(e, t, n = Ee) {
    D(e) && (e = Zn(e));
    for (const r in e) {
        const s = e[r];
        let o;
        Z(s) ? "default" in s ? o = Ve(s.from || r, s.default, !0) : o = Ve(s.from || r) : o = Ve(s), fe(o) ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: i => o.value = i
        }) : t[r] = o
    }
}

function Yr(e, t, n) {
    Ce(D(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function xo(e, t, n, r) {
    const s = r.includes(".") ? Ao(n, r) : () => n[r];
    if (oe(e)) {
        const o = t[e];
        B(o) && Ze(s, o)
    } else if (B(e)) Ze(s, e.bind(n));
    else if (Z(e))
        if (D(e)) e.forEach(o => xo(o, t, n, r));
        else {
            const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
            B(o) && Ze(s, o, e)
        }
}

function Cr(e) {
    const t = e.type,
        {
            mixins: n,
            extends: r
        } = t,
        {
            mixins: s,
            optionsCache: o,
            config: {
                optionMergeStrategies: i
            }
        } = e.appContext,
        l = o.get(t);
    let c;
    return l ? c = l : !s.length && !n && !r ? c = t : (c = {}, s.length && s.forEach(u => gn(c, u, i, !0)), gn(c, t, i)), Z(t) && o.set(t, c), c
}

function gn(e, t, n, r = !1) {
    const {
        mixins: s,
        extends: o
    } = t;
    o && gn(e, o, n, !0), s && s.forEach(i => gn(e, i, n, !0));
    for (const i in t)
        if (!(r && i === "expose")) {
            const l = Pl[i] || n && n[i];
            e[i] = l ? l(e[i], t[i]) : t[i]
        } return e
}
const Pl = {
    data: Xr,
    props: Zr,
    emits: Zr,
    methods: Ft,
    computed: Ft,
    beforeCreate: ge,
    created: ge,
    beforeMount: ge,
    mounted: ge,
    beforeUpdate: ge,
    updated: ge,
    beforeDestroy: ge,
    beforeUnmount: ge,
    destroyed: ge,
    unmounted: ge,
    activated: ge,
    deactivated: ge,
    errorCaptured: ge,
    serverPrefetch: ge,
    components: Ft,
    directives: Ft,
    watch: Tl,
    provide: Xr,
    inject: Ll
};

function Xr(e, t) {
    return t ? e ? function () {
        return ae(B(e) ? e.call(this, this) : e, B(t) ? t.call(this, this) : t)
    } : t : e
}

function Ll(e, t) {
    return Ft(Zn(e), Zn(t))
}

function Zn(e) {
    if (D(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function ge(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Ft(e, t) {
    return e ? ae(Object.create(null), e, t) : t
}

function Zr(e, t) {
    return e ? D(e) && D(t) ? [...new Set([...e, ...t])] : ae(Object.create(null), Jr(e), Jr(t ?? {})) : t
}

function Tl(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = ae(Object.create(null), e);
    for (const r in t) n[r] = ge(e[r], t[r]);
    return n
}

function Ro() {
    return {
        app: null,
        config: {
            isNativeTag: ii,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Il = 0;

function Ml(e, t) {
    return function (r, s = null) {
        B(r) || (r = ae({}, r)), s != null && !Z(s) && (s = null);
        const o = Ro(),
            i = new WeakSet;
        let l = !1;
        const c = o.app = {
            _uid: Il++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: lc,
            get config() {
                return o.config
            },
            set config(u) { },
            use(u, ...a) {
                return i.has(u) || (u && B(u.install) ? (i.add(u), u.install(c, ...a)) : B(u) && (i.add(u), u(c, ...a))), c
            },
            mixin(u) {
                return o.mixins.includes(u) || o.mixins.push(u), c
            },
            component(u, a) {
                return a ? (o.components[u] = a, c) : o.components[u]
            },
            directive(u, a) {
                return a ? (o.directives[u] = a, c) : o.directives[u]
            },
            mount(u, a, h) {
                if (!l) {
                    const p = ue(r, s);
                    return p.appContext = o, h === !0 ? h = "svg" : h === !1 && (h = void 0), a && t ? t(p, u) : e(p, u, h), l = !0, c._container = u, u.__vue_app__ = c, In(p.component) || p.component.proxy
                }
            },
            unmount() {
                l && (e(null, c._container), delete c._container.__vue_app__)
            },
            provide(u, a) {
                return o.provides[u] = a, c
            },
            runWithContext(u) {
                mn = c;
                try {
                    return u()
                } finally {
                    mn = null
                }
            }
        };
        return c
    }
}
let mn = null;

function cn(e, t) {
    if (ce) {
        let n = ce.provides;
        const r = ce.parent && ce.parent.provides;
        r === n && (n = ce.provides = Object.create(r)), n[e] = t
    }
}

function Ve(e, t, n = !1) {
    const r = ce || Ae;
    if (r || mn) {
        const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : mn._context.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && B(t) ? t.call(r && r.proxy) : t
    }
}

function $l(e, t, n, r = !1) {
    const s = {},
        o = {};
    an(o, Ln, 1), e.propsDefaults = Object.create(null), So(e, t, s, o);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? e.props = r ? s : oo(s) : e.type.props ? e.props = s : e.props = o, e.attrs = o
}

function Nl(e, t, n, r) {
    const {
        props: s,
        attrs: o,
        vnode: {
            patchFlag: i
        }
    } = e, l = W(s), [c] = e.propsOptions;
    let u = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const a = e.vnode.dynamicProps;
            for (let h = 0; h < a.length; h++) {
                let p = a[h];
                if (Rn(e.emitsOptions, p)) continue;
                const _ = t[p];
                if (c)
                    if (z(o, p)) _ !== o[p] && (o[p] = _, u = !0);
                    else {
                        const R = Ne(p);
                        s[R] = er(c, l, R, _, e, !1)
                    }
                else _ !== o[p] && (o[p] = _, u = !0)
            }
        }
    } else {
        So(e, t, s, o) && (u = !0);
        let a;
        for (const h in l) (!t || !z(t, h) && ((a = It(h)) === h || !z(t, a))) && (c ? n && (n[h] !== void 0 || n[a] !== void 0) && (s[h] = er(c, l, h, void 0, e, !0)) : delete s[h]);
        if (o !== l)
            for (const h in o) (!t || !z(t, h)) && (delete o[h], u = !0)
    }
    u && Be(e, "set", "$attrs")
}

function So(e, t, n, r) {
    const [s, o] = e.propsOptions;
    let i = !1,
        l;
    if (t)
        for (let c in t) {
            if (on(c)) continue;
            const u = t[c];
            let a;
            s && z(s, a = Ne(c)) ? !o || !o.includes(a) ? n[a] = u : (l || (l = {}))[a] = u : Rn(e.emitsOptions, c) || (!(c in r) || u !== r[c]) && (r[c] = u, i = !0)
        }
    if (o) {
        const c = W(n),
            u = l || X;
        for (let a = 0; a < o.length; a++) {
            const h = o[a];
            n[h] = er(s, c, h, u[h], e, !z(u, h))
        }
    }
    return i
}

function er(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const l = z(i, "default");
        if (l && r === void 0) {
            const c = i.default;
            if (i.type !== Function && !i.skipFactory && B(c)) {
                const {
                    propsDefaults: u
                } = s;
                n in u ? r = u[n] : (St(s), r = u[n] = c.call(null, t), ft())
            } else r = c
        }
        i[0] && (o && !l ? r = !1 : i[1] && (r === "" || r === It(n)) && (r = !0))
    }
    return r
}

function Co(e, t, n = !1) {
    const r = t.propsCache,
        s = r.get(e);
    if (s) return s;
    const o = e.props,
        i = {},
        l = [];
    let c = !1;
    if (!B(e)) {
        const a = h => {
            c = !0;
            const [p, _] = Co(h, t, !0);
            ae(i, p), _ && l.push(..._)
        };
        !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
    }
    if (!o && !c) return Z(e) && r.set(e, bt), bt;
    if (D(o))
        for (let a = 0; a < o.length; a++) {
            const h = Ne(o[a]);
            es(h) && (i[h] = X)
        } else if (o)
        for (const a in o) {
            const h = Ne(a);
            if (es(h)) {
                const p = o[a],
                    _ = i[h] = D(p) || B(p) ? {
                        type: p
                    } : ae({}, p);
                if (_) {
                    const R = rs(Boolean, _.type),
                        P = rs(String, _.type);
                    _[0] = R > -1, _[1] = P < 0 || R < P, (R > -1 || z(_, "default")) && l.push(h)
                }
            }
        }
    const u = [i, l];
    return Z(e) && r.set(e, u), u
}

function es(e) {
    return e[0] !== "$"
}

function ts(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}

function ns(e, t) {
    return ts(e) === ts(t)
}

function rs(e, t) {
    return D(t) ? t.findIndex(n => ns(n, e)) : B(t) && ns(t, e) ? 0 : -1
}
const Oo = e => e[0] === "_" || e === "$stable",
    Or = e => D(e) ? e.map(Me) : [Me(e)],
    jl = (e, t, n) => {
        if (t._n) return t;
        const r = rl((...s) => Or(t(...s)), n);
        return r._c = !1, r
    },
    Po = (e, t, n) => {
        const r = e._ctx;
        for (const s in e) {
            if (Oo(s)) continue;
            const o = e[s];
            if (B(o)) t[s] = jl(s, o, r);
            else if (o != null) {
                const i = Or(o);
                t[s] = () => i
            }
        }
    },
    Lo = (e, t) => {
        const n = Or(t);
        e.slots.default = () => n
    },
    Fl = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? (e.slots = W(t), an(t, "_", n)) : Po(t, e.slots = {})
        } else e.slots = {}, t && Lo(e, t);
        an(e.slots, Ln, 1)
    },
    kl = (e, t, n) => {
        const {
            vnode: r,
            slots: s
        } = e;
        let o = !0,
            i = X;
        if (r.shapeFlag & 32) {
            const l = t._;
            l ? n && l === 1 ? o = !1 : (ae(s, t), !n && l === 1 && delete s._) : (o = !t.$stable, Po(t, s)), i = t
        } else t && (Lo(e, t), i = {
            default: 1
        });
        if (o)
            for (const l in s) !Oo(l) && i[l] == null && delete s[l]
    };

function tr(e, t, n, r, s = !1) {
    if (D(e)) {
        e.forEach((p, _) => tr(p, t && (D(t) ? t[_] : t), n, r, s));
        return
    }
    if (ln(r) && !s) return;
    const o = r.shapeFlag & 4 ? In(r.component) || r.component.proxy : r.el,
        i = s ? null : o,
        {
            i: l,
            r: c
        } = e,
        u = t && t.r,
        a = l.refs === X ? l.refs = {} : l.refs,
        h = l.setupState;
    if (u != null && u !== c && (oe(u) ? (a[u] = null, z(h, u) && (h[u] = null)) : fe(u) && (u.value = null)), B(c)) Xe(c, l, 12, [i, a]);
    else {
        const p = oe(c),
            _ = fe(c);
        if (p || _) {
            const R = () => {
                if (e.f) {
                    const P = p ? z(h, c) ? h[c] : a[c] : c.value;
                    s ? D(P) && dr(P, o) : D(P) ? P.includes(o) || P.push(o) : p ? (a[c] = [o], z(h, c) && (h[c] = a[c])) : (c.value = [o], e.k && (a[e.k] = c.value))
                } else p ? (a[c] = i, z(h, c) && (h[c] = i)) : _ && (c.value = i, e.k && (a[e.k] = i))
            };
            i ? (R.id = -1, _e(R, n)) : R()
        }
    }
}
const _e = dl;

function Hl(e) {
    return Dl(e)
}

function Dl(e, t) {
    const n = zs();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: s,
        patchProp: o,
        createElement: i,
        createText: l,
        createComment: c,
        setText: u,
        setElementText: a,
        parentNode: h,
        nextSibling: p,
        setScopeId: _ = Ee,
        insertStaticContent: R
    } = e, P = (f, d, g, m = null, y = null, b = null, S = void 0, w = null, E = !!d.dynamicChildren) => {
        if (f === d) return;
        f && !Nt(f, d) && (m = v(f), me(f, y, b, !0), f = null), d.patchFlag === -2 && (E = !1, d.dynamicChildren = null);
        const {
            type: A,
            ref: C,
            shapeFlag: N
        } = d;
        switch (A) {
            case Pn:
                M(f, d, g, m);
                break;
            case dt:
                L(f, d, g, m);
                break;
            case Dn:
                f == null && $(d, g, m, S);
                break;
            case De:
                rt(f, d, g, m, y, b, S, w, E);
                break;
            default:
                N & 1 ? j(f, d, g, m, y, b, S, w, E) : N & 6 ? Pe(f, d, g, m, y, b, S, w, E) : (N & 64 || N & 128) && A.process(f, d, g, m, y, b, S, w, E, x)
        }
        C != null && y && tr(C, f && f.ref, b, d || f, !d)
    }, M = (f, d, g, m) => {
        if (f == null) r(d.el = l(d.children), g, m);
        else {
            const y = d.el = f.el;
            d.children !== f.children && u(y, d.children)
        }
    }, L = (f, d, g, m) => {
        f == null ? r(d.el = c(d.children || ""), g, m) : d.el = f.el
    }, $ = (f, d, g, m) => {
        [f.el, f.anchor] = R(f.children, d, g, m, f.el, f.anchor)
    }, k = ({
        el: f,
        anchor: d
    }, g, m) => {
        let y;
        for (; f && f !== d;) y = p(f), r(f, g, m), f = y;
        r(d, g, m)
    }, F = ({
        el: f,
        anchor: d
    }) => {
        let g;
        for (; f && f !== d;) g = p(f), s(f), f = g;
        s(d)
    }, j = (f, d, g, m, y, b, S, w, E) => {
        d.type === "svg" ? S = "svg" : d.type === "math" && (S = "mathml"), f == null ? te(d, g, m, y, b, S, w, E) : V(f, d, y, b, S, w, E)
    }, te = (f, d, g, m, y, b, S, w) => {
        let E, A;
        const {
            props: C,
            shapeFlag: N,
            transition: I,
            dirs: H
        } = f;
        if (E = f.el = i(f.type, b, C && C.is, C), N & 8 ? a(E, f.children) : N & 16 && ne(f.children, E, null, m, y, Hn(f, b), S, w), H && st(f, null, m, "created"), re(E, f, f.scopeId, S, m), C) {
            for (const Y in C) Y !== "value" && !on(Y) && o(E, Y, null, C[Y], b, f.children, m, y, he);
            "value" in C && o(E, "value", null, C.value, b), (A = C.onVnodeBeforeMount) && Ie(A, m, f)
        }
        H && st(f, null, m, "beforeMount");
        const U = Bl(y, I);
        U && I.beforeEnter(E), r(E, d, g), ((A = C && C.onVnodeMounted) || U || H) && _e(() => {
            A && Ie(A, m, f), U && I.enter(E), H && st(f, null, m, "mounted")
        }, y)
    }, re = (f, d, g, m, y) => {
        if (g && _(f, g), m)
            for (let b = 0; b < m.length; b++) _(f, m[b]);
        if (y) {
            let b = y.subTree;
            if (d === b) {
                const S = y.vnode;
                re(f, S, S.scopeId, S.slotScopeIds, y.parent)
            }
        }
    }, ne = (f, d, g, m, y, b, S, w, E = 0) => {
        for (let A = E; A < f.length; A++) {
            const C = f[A] = w ? Qe(f[A]) : Me(f[A]);
            P(null, C, d, g, m, y, b, S, w)
        }
    }, V = (f, d, g, m, y, b, S) => {
        const w = d.el = f.el;
        let {
            patchFlag: E,
            dynamicChildren: A,
            dirs: C
        } = d;
        E |= f.patchFlag & 16;
        const N = f.props || X,
            I = d.props || X;
        let H;
        if (g && ot(g, !1), (H = I.onVnodeBeforeUpdate) && Ie(H, g, d, f), C && st(d, f, g, "beforeUpdate"), g && ot(g, !0), A ? K(f.dynamicChildren, A, w, g, m, Hn(d, y), b) : S || Q(f, d, w, null, g, m, Hn(d, y), b, !1), E > 0) {
            if (E & 16) de(w, d, N, I, g, m, y);
            else if (E & 2 && N.class !== I.class && o(w, "class", null, I.class, y), E & 4 && o(w, "style", N.style, I.style, y), E & 8) {
                const U = d.dynamicProps;
                for (let Y = 0; Y < U.length; Y++) {
                    const ee = U[Y],
                        le = N[ee],
                        Re = I[ee];
                    (Re !== le || ee === "value") && o(w, ee, le, Re, y, f.children, g, m, he)
                }
            }
            E & 1 && f.children !== d.children && a(w, d.children)
        } else !S && A == null && de(w, d, N, I, g, m, y);
        ((H = I.onVnodeUpdated) || C) && _e(() => {
            H && Ie(H, g, d, f), C && st(d, f, g, "updated")
        }, m)
    }, K = (f, d, g, m, y, b, S) => {
        for (let w = 0; w < d.length; w++) {
            const E = f[w],
                A = d[w],
                C = E.el && (E.type === De || !Nt(E, A) || E.shapeFlag & 70) ? h(E.el) : g;
            P(E, A, C, null, m, y, b, S, !0)
        }
    }, de = (f, d, g, m, y, b, S) => {
        if (g !== m) {
            if (g !== X)
                for (const w in g) !on(w) && !(w in m) && o(f, w, g[w], null, S, d.children, y, b, he);
            for (const w in m) {
                if (on(w)) continue;
                const E = m[w],
                    A = g[w];
                E !== A && w !== "value" && o(f, w, A, E, S, d.children, y, b, he)
            }
            "value" in m && o(f, "value", g.value, m.value, S)
        }
    }, rt = (f, d, g, m, y, b, S, w, E) => {
        const A = d.el = f ? f.el : l(""),
            C = d.anchor = f ? f.anchor : l("");
        let {
            patchFlag: N,
            dynamicChildren: I,
            slotScopeIds: H
        } = d;
        H && (w = w ? w.concat(H) : H), f == null ? (r(A, g, m), r(C, g, m), ne(d.children, g, C, y, b, S, w, E)) : N > 0 && N & 64 && I && f.dynamicChildren ? (K(f.dynamicChildren, I, g, y, b, S, w), (d.key != null || y && d === y.subTree) && To(f, d, !0)) : Q(f, d, g, C, y, b, S, w, E)
    }, Pe = (f, d, g, m, y, b, S, w, E) => {
        d.slotScopeIds = w, f == null ? d.shapeFlag & 512 ? y.ctx.activate(d, g, m, S, E) : Mt(d, g, m, y, b, S, E) : gt(f, d, E)
    }, Mt = (f, d, g, m, y, b, S) => {
        const w = f.component = Xl(f, m, y);
        if (wo(f) && (w.ctx.renderer = x), Zl(w), w.asyncDep) {
            if (y && y.registerDep(w, ie), !f.el) {
                const E = w.subTree = ue(dt);
                L(null, E, d, g)
            }
        } else ie(w, f, d, g, y, b, S)
    }, gt = (f, d, g) => {
        const m = d.component = f.component;
        if (il(f, d, g))
            if (m.asyncDep && !m.asyncResolved) {
                J(m, d, g);
                return
            } else m.next = d, Zi(m.update), m.effect.dirty = !0, m.update();
        else d.el = f.el, m.vnode = d
    }, ie = (f, d, g, m, y, b, S) => {
        const w = () => {
            if (f.isMounted) {
                let {
                    next: C,
                    bu: N,
                    u: I,
                    parent: H,
                    vnode: U
                } = f; {
                    const vt = Io(f);
                    if (vt) {
                        C && (C.el = U.el, J(f, C, S)), vt.asyncDep.then(() => {
                            f.isUnmounted || w()
                        });
                        return
                    }
                }
                let Y = C,
                    ee;
                ot(f, !1), C ? (C.el = U.el, J(f, C, S)) : C = U, N && Nn(N), (ee = C.props && C.props.onVnodeBeforeUpdate) && Ie(ee, H, C, U), ot(f, !0);
                const le = Fn(f),
                    Re = f.subTree;
                f.subTree = le, P(Re, le, h(Re.el), v(Re), f, y, b), C.el = le.el, Y === null && ll(f, le.el), I && _e(I, y), (ee = C.props && C.props.onVnodeUpdated) && _e(() => Ie(ee, H, C, U), y)
            } else {
                let C;
                const {
                    el: N,
                    props: I
                } = d, {
                    bm: H,
                    m: U,
                    parent: Y
                } = f, ee = ln(d);
                if (ot(f, !1), H && Nn(H), !ee && (C = I && I.onVnodeBeforeMount) && Ie(C, Y, d), ot(f, !0), N && q) {
                    const le = () => {
                        f.subTree = Fn(f), q(N, f.subTree, f, y, null)
                    };
                    ee ? d.type.__asyncLoader().then(() => !f.isUnmounted && le()) : le()
                } else {
                    const le = f.subTree = Fn(f);
                    P(null, le, g, m, f, y, b), d.el = le.el
                }
                if (U && _e(U, y), !ee && (C = I && I.onVnodeMounted)) {
                    const le = d;
                    _e(() => Ie(C, Y, le), y)
                } (d.shapeFlag & 256 || Y && ln(Y.vnode) && Y.vnode.shapeFlag & 256) && f.a && _e(f.a, y), f.isMounted = !0, d = g = m = null
            }
        },
            E = f.effect = new mr(w, Ee, () => Rr(A), f.scope),
            A = f.update = () => {
                E.dirty && E.run()
            };
        A.id = f.uid, ot(f, !0), A()
    }, J = (f, d, g) => {
        d.component = f;
        const m = f.vnode.props;
        f.vnode = d, f.next = null, Nl(f, d.props, m, g), kl(f, d.children, g), ht(), Qr(f), pt()
    }, Q = (f, d, g, m, y, b, S, w, E = !1) => {
        const A = f && f.children,
            C = f ? f.shapeFlag : 0,
            N = d.children,
            {
                patchFlag: I,
                shapeFlag: H
            } = d;
        if (I > 0) {
            if (I & 128) {
                ze(A, N, g, m, y, b, S, w, E);
                return
            } else if (I & 256) {
                je(A, N, g, m, y, b, S, w, E);
                return
            }
        }
        H & 8 ? (C & 16 && he(A, y, b), N !== A && a(g, N)) : C & 16 ? H & 16 ? ze(A, N, g, m, y, b, S, w, E) : he(A, y, b, !0) : (C & 8 && a(g, ""), H & 16 && ne(N, g, m, y, b, S, w, E))
    }, je = (f, d, g, m, y, b, S, w, E) => {
        f = f || bt, d = d || bt;
        const A = f.length,
            C = d.length,
            N = Math.min(A, C);
        let I;
        for (I = 0; I < N; I++) {
            const H = d[I] = E ? Qe(d[I]) : Me(d[I]);
            P(f[I], H, g, null, y, b, S, w, E)
        }
        A > C ? he(f, y, b, !0, !1, N) : ne(d, g, m, y, b, S, w, E, N)
    }, ze = (f, d, g, m, y, b, S, w, E) => {
        let A = 0;
        const C = d.length;
        let N = f.length - 1,
            I = C - 1;
        for (; A <= N && A <= I;) {
            const H = f[A],
                U = d[A] = E ? Qe(d[A]) : Me(d[A]);
            if (Nt(H, U)) P(H, U, g, null, y, b, S, w, E);
            else break;
            A++
        }
        for (; A <= N && A <= I;) {
            const H = f[N],
                U = d[I] = E ? Qe(d[I]) : Me(d[I]);
            if (Nt(H, U)) P(H, U, g, null, y, b, S, w, E);
            else break;
            N--, I--
        }
        if (A > N) {
            if (A <= I) {
                const H = I + 1,
                    U = H < C ? d[H].el : m;
                for (; A <= I;) P(null, d[A] = E ? Qe(d[A]) : Me(d[A]), g, U, y, b, S, w, E), A++
            }
        } else if (A > I)
            for (; A <= N;) me(f[A], y, b, !0), A++;
        else {
            const H = A,
                U = A,
                Y = new Map;
            for (A = U; A <= I; A++) {
                const ye = d[A] = E ? Qe(d[A]) : Me(d[A]);
                ye.key != null && Y.set(ye.key, A)
            }
            let ee, le = 0;
            const Re = I - U + 1;
            let vt = !1,
                jr = 0;
            const $t = new Array(Re);
            for (A = 0; A < Re; A++) $t[A] = 0;
            for (A = H; A <= N; A++) {
                const ye = f[A];
                if (le >= Re) {
                    me(ye, y, b, !0);
                    continue
                }
                let Te;
                if (ye.key != null) Te = Y.get(ye.key);
                else
                    for (ee = U; ee <= I; ee++)
                        if ($t[ee - U] === 0 && Nt(ye, d[ee])) {
                            Te = ee;
                            break
                        } Te === void 0 ? me(ye, y, b, !0) : ($t[Te - U] = A + 1, Te >= jr ? jr = Te : vt = !0, P(ye, d[Te], g, null, y, b, S, w, E), le++)
            }
            const Fr = vt ? Vl($t) : bt;
            for (ee = Fr.length - 1, A = Re - 1; A >= 0; A--) {
                const ye = U + A,
                    Te = d[ye],
                    kr = ye + 1 < C ? d[ye + 1].el : m;
                $t[A] === 0 ? P(null, Te, g, kr, y, b, S, w, E) : vt && (ee < 0 || A !== Fr[ee] ? Le(Te, g, kr, 2) : ee--)
            }
        }
    }, Le = (f, d, g, m, y = null) => {
        const {
            el: b,
            type: S,
            transition: w,
            children: E,
            shapeFlag: A
        } = f;
        if (A & 6) {
            Le(f.component.subTree, d, g, m);
            return
        }
        if (A & 128) {
            f.suspense.move(d, g, m);
            return
        }
        if (A & 64) {
            S.move(f, d, g, x);
            return
        }
        if (S === De) {
            r(b, d, g);
            for (let N = 0; N < E.length; N++) Le(E[N], d, g, m);
            r(f.anchor, d, g);
            return
        }
        if (S === Dn) {
            k(f, d, g);
            return
        }
        if (m !== 2 && A & 1 && w)
            if (m === 0) w.beforeEnter(b), r(b, d, g), _e(() => w.enter(b), y);
            else {
                const {
                    leave: N,
                    delayLeave: I,
                    afterLeave: H
                } = w, U = () => r(b, d, g), Y = () => {
                    N(b, () => {
                        U(), H && H()
                    })
                };
                I ? I(b, U, Y) : Y()
            }
        else r(b, d, g)
    }, me = (f, d, g, m = !1, y = !1) => {
        const {
            type: b,
            props: S,
            ref: w,
            children: E,
            dynamicChildren: A,
            shapeFlag: C,
            patchFlag: N,
            dirs: I
        } = f;
        if (w != null && tr(w, null, g, f, !0), C & 256) {
            d.ctx.deactivate(f);
            return
        }
        const H = C & 1 && I,
            U = !ln(f);
        let Y;
        if (U && (Y = S && S.onVnodeBeforeUnmount) && Ie(Y, d, f), C & 6) Gt(f.component, g, m);
        else {
            if (C & 128) {
                f.suspense.unmount(g, m);
                return
            }
            H && st(f, null, d, "beforeUnmount"), C & 64 ? f.type.remove(f, d, g, y, x, m) : A && (b !== De || N > 0 && N & 64) ? he(A, d, g, !1, !0) : (b === De && N & 384 || !y && C & 16) && he(E, d, g), m && mt(f)
        } (U && (Y = S && S.onVnodeUnmounted) || H) && _e(() => {
            Y && Ie(Y, d, f), H && st(f, null, d, "unmounted")
        }, g)
    }, mt = f => {
        const {
            type: d,
            el: g,
            anchor: m,
            transition: y
        } = f;
        if (d === De) {
            _t(g, m);
            return
        }
        if (d === Dn) {
            F(f);
            return
        }
        const b = () => {
            s(g), y && !y.persisted && y.afterLeave && y.afterLeave()
        };
        if (f.shapeFlag & 1 && y && !y.persisted) {
            const {
                leave: S,
                delayLeave: w
            } = y, E = () => S(g, b);
            w ? w(f.el, b, E) : E()
        } else b()
    }, _t = (f, d) => {
        let g;
        for (; f !== d;) g = p(f), s(f), f = g;
        s(d)
    }, Gt = (f, d, g) => {
        const {
            bum: m,
            scope: y,
            update: b,
            subTree: S,
            um: w
        } = f;
        m && Nn(m), y.stop(), b && (b.active = !1, me(S, f, d, g)), w && _e(w, d), _e(() => {
            f.isUnmounted = !0
        }, d), d && d.pendingBranch && !d.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve())
    }, he = (f, d, g, m = !1, y = !1, b = 0) => {
        for (let S = b; S < f.length; S++) me(f[S], d, g, m, y)
    }, v = f => f.shapeFlag & 6 ? v(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : p(f.anchor || f.el), O = (f, d, g) => {
        f == null ? d._vnode && me(d._vnode, null, null, !0) : P(d._vnode || null, f, d, null, null, null, g), Qr(), go(), d._vnode = f
    }, x = {
        p: P,
        um: me,
        m: Le,
        r: mt,
        mt: Mt,
        mc: ne,
        pc: Q,
        pbc: K,
        n: v,
        o: e
    };
    let T, q;
    return t && ([T, q] = t(x)), {
        render: O,
        hydrate: T,
        createApp: Ml(O, T)
    }
}

function Hn({
    type: e,
    props: t
}, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
}

function ot({
    effect: e,
    update: t
}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function Bl(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function To(e, t, n = !1) {
    const r = e.children,
        s = t.children;
    if (D(r) && D(s))
        for (let o = 0; o < r.length; o++) {
            const i = r[o];
            let l = s[o];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[o] = Qe(s[o]), l.el = i.el), n || To(i, l)), l.type === Pn && (l.el = i.el)
        }
}

function Vl(e) {
    const t = e.slice(),
        n = [0];
    let r, s, o, i, l;
    const c = e.length;
    for (r = 0; r < c; r++) {
        const u = e[r];
        if (u !== 0) {
            if (s = n[n.length - 1], e[s] < u) {
                t[r] = s, n.push(r);
                continue
            }
            for (o = 0, i = n.length - 1; o < i;) l = o + i >> 1, e[n[l]] < u ? o = l + 1 : i = l;
            u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r)
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
    return n
}

function Io(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Io(t)
}
const Ul = e => e.__isTeleport,
    De = Symbol.for("v-fgt"),
    Pn = Symbol.for("v-txt"),
    dt = Symbol.for("v-cmt"),
    Dn = Symbol.for("v-stc"),
    Dt = [];
let Se = null;

function Pr(e = !1) {
    Dt.push(Se = e ? null : [])
}

function zl() {
    Dt.pop(), Se = Dt[Dt.length - 1] || null
}
let Kt = 1;

function ss(e) {
    Kt += e
}

function Mo(e) {
    return e.dynamicChildren = Kt > 0 ? Se || bt : null, zl(), Kt > 0 && Se && Se.push(e), e
}

function $o(e, t, n, r, s, o) {
    return Mo(He(e, t, n, r, s, o, !0))
}

function Wl(e, t, n, r, s) {
    return Mo(ue(e, t, n, r, s, !0))
}

function nr(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function Nt(e, t) {
    return e.type === t.type && e.key === t.key
}
const Ln = "__vInternal",
    No = ({
        key: e
    }) => e ?? null,
    un = ({
        ref: e,
        ref_key: t,
        ref_for: n
    }) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || fe(e) || B(e) ? {
        i: Ae,
        r: e,
        k: t,
        f: !!n
    } : e : null);

function He(e, t = null, n = null, r = 0, s = null, o = e === De ? 0 : 1, i = !1, l = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && No(t),
        ref: t && un(t),
        scopeId: vo,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: Ae
    };
    return l ? (Lr(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= oe(n) ? 8 : 16), Kt > 0 && !i && Se && (c.patchFlag > 0 || o & 6) && c.patchFlag !== 32 && Se.push(c), c
}
const ue = Kl;

function Kl(e, t = null, n = null, r = 0, s = null, o = !1) {
    if ((!e || e === al) && (e = dt), nr(e)) {
        const l = Rt(e, t, !0);
        return n && Lr(l, n), Kt > 0 && !o && Se && (l.shapeFlag & 6 ? Se[Se.indexOf(e)] = l : Se.push(l)), l.patchFlag |= -2, l
    }
    if (sc(e) && (e = e.__vccOpts), t) {
        t = Ql(t);
        let {
            class: l,
            style: c
        } = t;
        l && !oe(l) && (t.class = gr(l)), Z(c) && (io(c) && !D(c) && (c = ae({}, c)), t.style = pr(c))
    }
    const i = oe(e) ? 1 : fl(e) ? 128 : Ul(e) ? 64 : Z(e) ? 4 : B(e) ? 2 : 0;
    return He(e, t, n, r, s, i, o, !0)
}

function Ql(e) {
    return e ? io(e) || Ln in e ? ae({}, e) : e : null
}

function Rt(e, t, n = !1) {
    const {
        props: r,
        ref: s,
        patchFlag: o,
        children: i
    } = e, l = t ? Gl(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && No(l),
        ref: t && t.ref ? n && s ? D(s) ? s.concat(un(t)) : [s, un(t)] : un(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== De ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Rt(e.ssContent),
        ssFallback: e.ssFallback && Rt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}

function ql(e = " ", t = 0) {
    return ue(Pn, null, e, t)
}

function Da(e = "", t = !1) {
    return t ? (Pr(), Wl(dt, null, e)) : ue(dt, null, e)
}

function Me(e) {
    return e == null || typeof e == "boolean" ? ue(dt) : D(e) ? ue(De, null, e.slice()) : typeof e == "object" ? Qe(e) : ue(Pn, null, String(e))
}

function Qe(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Rt(e)
}

function Lr(e, t) {
    let n = 0;
    const {
        shapeFlag: r
    } = e;
    if (t == null) t = null;
    else if (D(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), Lr(e, s()), s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !(Ln in t) ? t._ctx = Ae : s === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else B(t) ? (t = {
        default: t,
        _ctx: Ae
    }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ql(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function Gl(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class") t.class !== r.class && (t.class = gr([t.class, r.class]));
            else if (s === "style") t.style = pr([t.style, r.style]);
            else if (vn(s)) {
                const o = t[s],
                    i = r[s];
                i && o !== i && !(D(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i)
            } else s !== "" && (t[s] = r[s])
    }
    return t
}

function Ie(e, t, n, r = null) {
    Ce(e, t, 7, [n, r])
}
const Jl = Ro();
let Yl = 0;

function Xl(e, t, n) {
    const r = e.type,
        s = (t ? t.appContext : e.appContext) || Jl,
        o = {
            uid: Yl++,
            vnode: e,
            type: r,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new yi(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(s.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Co(r, s),
            emitsOptions: _o(r, s),
            emit: null,
            emitted: null,
            propsDefaults: X,
            inheritAttrs: r.inheritAttrs,
            ctx: X,
            data: X,
            props: X,
            attrs: X,
            slots: X,
            refs: X,
            setupState: X,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return o.ctx = {
        _: o
    }, o.root = t ? t.root : o, o.emit = nl.bind(null, o), e.ce && e.ce(o), o
}
let ce = null;
const jo = () => ce || Ae;
let Tr, rr; {
    const e = zs(),
        t = (n, r) => {
            let s;
            return (s = e[n]) || (s = e[n] = []), s.push(r), o => {
                s.length > 1 ? s.forEach(i => i(o)) : s[0](o)
            }
        };
    Tr = t("__VUE_INSTANCE_SETTERS__", n => ce = n), rr = t("__VUE_SSR_SETTERS__", n => Tn = n)
}
const St = e => {
    Tr(e), e.scope.on()
},
    ft = () => {
        ce && ce.scope.off(), Tr(null)
    };

function Fo(e) {
    return e.vnode.shapeFlag & 4
}
let Tn = !1;

function Zl(e, t = !1) {
    t && rr(t);
    const {
        props: n,
        children: r
    } = e.vnode, s = Fo(e);
    $l(e, n, s, t), Fl(e, r);
    const o = s ? ec(e, t) : void 0;
    return t && rr(!1), o
}

function ec(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = lo(new Proxy(e.ctx, Sl));
    const {
        setup: r
    } = n;
    if (r) {
        const s = e.setupContext = r.length > 1 ? nc(e) : null;
        St(e), ht();
        const o = Xe(r, e, 0, [e.props, s]);
        if (pt(), ft(), Bs(o)) {
            if (o.then(ft, ft), t) return o.then(i => {
                os(e, i, t)
            }).catch(i => {
                xn(i, e, 0)
            });
            e.asyncDep = o
        } else os(e, o, t)
    } else ko(e, t)
}

function os(e, t, n) {
    B(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Z(t) && (e.setupState = fo(t)), ko(e, n)
}
let is;

function ko(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && is && !r.render) {
            const s = r.template || Cr(e).template;
            if (s) {
                const {
                    isCustomElement: o,
                    compilerOptions: i
                } = e.appContext.config, {
                    delimiters: l,
                    compilerOptions: c
                } = r, u = ae(ae({
                    isCustomElement: o,
                    delimiters: l
                }, i), c);
                r.render = is(s, u)
            }
        }
        e.render = r.render || Ee
    } {
        St(e), ht();
        try {
            Cl(e)
        } finally {
            pt(), ft()
        }
    }
}

function tc(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
        get(t, n) {
            return ve(e, "get", "$attrs"), t[n]
        }
    }))
}

function nc(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {
        get attrs() {
            return tc(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}

function In(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(fo(lo(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in Ht) return Ht[n](e)
        },
        has(t, n) {
            return n in t || n in Ht
        }
    }))
}

function rc(e, t = !0) {
    return B(e) ? e.displayName || e.name : e.name || t && e.__name
}

function sc(e) {
    return B(e) && "__vccOpts" in e
}
const se = (e, t) => Vi(e, t, Tn);

function Ho(e, t, n) {
    const r = arguments.length;
    return r === 2 ? Z(t) && !D(t) ? nr(t) ? ue(e, null, [t]) : ue(e, t) : ue(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && nr(n) && (n = [n]), ue(e, t, n))
}
const oc = Symbol.for("v-scx"),
    ic = () => Ve(oc),
    lc = "3.4.0",
    cc = "http://www.w3.org/2000/svg",
    uc = "http://www.w3.org/1998/Math/MathML",
    qe = typeof document < "u" ? document : null,
    ls = qe && qe.createElement("template"),
    ac = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const s = t === "svg" ? qe.createElementNS(cc, e) : t === "mathml" ? qe.createElementNS(uc, e) : qe.createElement(e, n ? {
                is: n
            } : void 0);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: e => qe.createTextNode(e),
        createComment: e => qe.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => qe.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, s, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === o || s.nextSibling))
                for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)););
            else {
                ls.innerHTML = r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e;
                const l = ls.content;
                if (r === "svg" || r === "mathml") {
                    const c = l.firstChild;
                    for (; c.firstChild;) l.appendChild(c.firstChild);
                    l.removeChild(c)
                }
                t.insertBefore(l, n)
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    },
    fc = Symbol("_vtc");

function dc(e, t, n) {
    const r = e[fc];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const hc = Symbol("_vod"),
    pc = Symbol("");

function gc(e, t, n) {
    const r = e.style,
        s = oe(n);
    if (n && !s) {
        if (t && !oe(t))
            for (const o in t) n[o] == null && sr(r, o, "");
        for (const o in n) sr(r, o, n[o])
    } else {
        const o = r.display;
        if (s) {
            if (t !== n) {
                const i = r[pc];
                i && (n += ";" + i), r.cssText = n
            }
        } else t && e.removeAttribute("style");
        hc in e && (r.display = o)
    }
}
const cs = /\s*!important$/;

function sr(e, t, n) {
    if (D(n)) n.forEach(r => sr(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
        const r = mc(e, t);
        cs.test(n) ? e.setProperty(It(r), n.replace(cs, ""), "important") : e[r] = n
    }
}
const us = ["Webkit", "Moz", "ms"],
    Bn = {};

function mc(e, t) {
    const n = Bn[t];
    if (n) return n;
    let r = Ne(t);
    if (r !== "filter" && r in e) return Bn[t] = r;
    r = An(r);
    for (let s = 0; s < us.length; s++) {
        const o = us[s] + r;
        if (o in e) return Bn[t] = o
    }
    return t
}
const as = "http://www.w3.org/1999/xlink";

function _c(e, t, n, r, s) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(as, t.slice(6, t.length)) : e.setAttributeNS(as, t, n);
    else {
        const o = _i(t);
        n == null || o && !Ws(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}

function vc(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o), e[t] = n ?? "";
        return
    }
    const l = e.tagName;
    if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
        e._value = n;
        const u = l === "OPTION" ? e.getAttribute("value") : e.value,
            a = n ?? "";
        u !== a && (e.value = a), n == null && e.removeAttribute(t);
        return
    }
    let c = !1;
    if (n === "" || n == null) {
        const u = typeof e[t];
        u === "boolean" ? n = Ws(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0)
    }
    try {
        e[t] = n
    } catch { }
    c && e.removeAttribute(t)
}

function yc(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function bc(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
const fs = Symbol("_vei");

function Ac(e, t, n, r, s = null) {
    const o = e[fs] || (e[fs] = {}),
        i = o[t];
    if (r && i) i.value = r;
    else {
        const [l, c] = wc(t);
        if (r) {
            const u = o[t] = Rc(r, s);
            yc(e, l, u, c)
        } else i && (bc(e, l, i, c), o[t] = void 0)
    }
}
const ds = /(?:Once|Passive|Capture)$/;

function wc(e) {
    let t;
    if (ds.test(e)) {
        t = {};
        let r;
        for (; r = e.match(ds);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : It(e.slice(2)), t]
}
let Vn = 0;
const Ec = Promise.resolve(),
    xc = () => Vn || (Ec.then(() => Vn = 0), Vn = Date.now());

function Rc(e, t) {
    const n = r => {
        if (!r._vts) r._vts = Date.now();
        else if (r._vts <= n.attached) return;
        Ce(Sc(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = xc(), n
}

function Sc(e, t) {
    if (D(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
}
const hs = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    Cc = (e, t, n, r, s, o, i, l, c) => {
        const u = s === "svg";
        t === "class" ? dc(e, r, u) : t === "style" ? gc(e, n, r) : vn(t) ? fr(t) || Ac(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Oc(e, t, r, u)) ? vc(e, t, r, o, i, l, c) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), _c(e, t, r, u))
    };

function Oc(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && hs(t) && B(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
        const s = e.tagName;
        if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1
    }
    return hs(t) && oe(n) ? !1 : t in e
}
const Pc = ae({
    patchProp: Cc
}, ac);
let ps;

function Lc() {
    return ps || (ps = Hl(Pc))
}
const Tc = (...e) => {
    const t = Lc().createApp(...e),
        {
            mount: n
        } = t;
    return t.mount = r => {
        const s = Mc(r);
        if (!s) return;
        const o = t._component;
        !B(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
        const i = n(s, !1, Ic(s));
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i
    }, t
};

function Ic(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
}

function Mc(e) {
    return oe(e) ? document.querySelector(e) : e
}
/*!
 * Vue-Lazyload.js v3.0.0
 * (c) 2023 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
function Do(e, t) {
    return t = {
        exports: {}
    }, e(t, t.exports), t.exports
}
var or = Do(function (e) {
    const t = Object.prototype.toString,
        n = Object.prototype.propertyIsEnumerable,
        r = Object.getOwnPropertySymbols;
    e.exports = (o, ...i) => {
        if (!s(o)) throw new TypeError("expected the first argument to be an object");
        if (i.length === 0 || typeof Symbol != "function" || typeof r != "function") return o;
        for (let l of i) {
            let c = r(l);
            for (let u of c) n.call(l, u) && (o[u] = l[u])
        }
        return o
    };

    function s(o) {
        return typeof o == "function" || t.call(o) === "[object Object]" || Array.isArray(o)
    }
}),
    gs = Object.freeze({
        __proto__: null,
        default: or,
        __moduleExports: or
    }),
    $c = gs && or || gs,
    ms = Do(function (e) {
        const t = Object.prototype.toString,
            n = i => i !== "__proto__" && i !== "constructor" && i !== "prototype",
            r = e.exports = (i, ...l) => {
                let c = 0;
                for (o(i) && (i = l[c++]), i || (i = {}); c < l.length; c++)
                    if (s(l[c])) {
                        for (const u of Object.keys(l[c])) n(u) && (s(i[u]) && s(l[c][u]) ? r(i[u], l[c][u]) : i[u] = l[c][u]);
                        $c(i, l[c])
                    } return i
            };

        function s(i) {
            return typeof i == "function" || t.call(i) === "[object Object]"
        }

        function o(i) {
            return typeof i == "object" ? i === null : typeof i != "function"
        }
    });
const nt = typeof window < "u" && window !== null,
    _s = Nc();

function Nc() {
    return nt && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype ? ("isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
        get: function () {
            return this.intersectionRatio > 0
        }
    }), !0) : !1
}
const it = {
    event: "event",
    observer: "observer"
};

function kt(e, t) {
    if (!e.length) return;
    const n = e.indexOf(t);
    if (n > -1) return e.splice(n, 1)
}

function vs(e, t) {
    if (e.tagName !== "IMG" || !e.getAttribute("data-srcset")) return "";
    let n = e.getAttribute("data-srcset").trim().split(",");
    const r = [],
        o = e.parentNode.offsetWidth * t;
    let i, l, c;
    n.forEach(h => {
        h = h.trim(), i = h.lastIndexOf(" "), i === -1 ? (l = h, c = 99999) : (l = h.substr(0, i), c = parseInt(h.substr(i + 1, h.length - i - 2), 10)), r.push([c, l])
    }), r.sort((h, p) => {
        if (h[0] < p[0]) return 1;
        if (h[0] > p[0]) return -1;
        if (h[0] === p[0]) {
            if (p[1].indexOf(".webp", p[1].length - 5) !== -1) return 1;
            if (h[1].indexOf(".webp", h[1].length - 5) !== -1) return -1
        }
        return 0
    });
    let u = "",
        a;
    for (let h = 0; h < r.length; h++) {
        a = r[h], u = a[1];
        const p = r[h + 1];
        if (p && p[0] < o) {
            u = a[1];
            break
        } else if (!p) {
            u = a[1];
            break
        }
    }
    return u
}
const jc = (e = 1) => nt && window.devicePixelRatio || e;

function Fc() {
    if (!nt) return !1;
    let e = !0;

    function t(n, r) {
        const s = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        },
            o = new Image;
        o.onload = function () {
            const i = o.width > 0 && o.height > 0;
            r(i)
        }, o.onerror = function () {
            r(!1)
        }, o.src = "data:image/webp;base64," + s[n]
    }
    return t("lossy", n => {
        e = n
    }), t("lossless", n => {
        e = n
    }), t("alpha", n => {
        e = n
    }), t("animation", n => {
        e = n
    }), e
}

function kc(e, t) {
    let n = null,
        r = 0;
    return function () {
        if (n) return;
        const s = Date.now() - r,
            o = this,
            i = arguments,
            l = function () {
                r = Date.now(), n = !1, e.apply(o, i)
            };
        s >= t ? l() : n = setTimeout(l, t)
    }
}

function Hc() {
    if (!nt) return !1;
    let e = !1;
    try {
        const t = Object.defineProperty({}, "passive", {
            get: function () {
                e = !0
            }
        });
        window.addEventListener("test", Ir, t)
    } catch { }
    return e
}
const Dc = Hc(),
    Bc = {
        on(e, t, n, r = !1) {
            Dc ? e.addEventListener(t, n, {
                capture: r,
                passive: !0
            }) : e.addEventListener(t, n, r)
        },
        off(e, t, n, r = !1) {
            e.removeEventListener(t, n, r)
        }
    },
    ir = (e, t, n) => {
        let r = new Image;
        if (!e || !e.src) {
            const s = new Error("image src is required");
            return n(s)
        }
        e.cors && (r.crossOrigin = e.cors), r.src = e.src, r.onload = function () {
            t({
                naturalHeight: r.naturalHeight,
                naturalWidth: r.naturalWidth,
                src: r.src
            }), r = null
        }, r.onerror = function (s) {
            n(s)
        }
    },
    Un = (e, t) => typeof getComputedStyle < "u" ? getComputedStyle(e, null).getPropertyValue(t) : e.style[t],
    Vc = e => Un(e, "overflow") + Un(e, "overflowY") + Un(e, "overflowX"),
    Uc = e => {
        if (!nt) return;
        if (!(e instanceof Element)) return window;
        let t = e;
        for (; t && !(t === document.body || t === document.documentElement || !t.parentNode);) {
            if (/(scroll|auto)/.test(Vc(t))) return t;
            t = t.parentNode
        }
        return window
    };

function zc(e) {
    return e !== null && typeof e == "object"
}

function Ir() { }
class Wc {
    constructor(t) {
        this.max = t || 100, this._caches = []
    }
    has(t) {
        return this._caches.indexOf(t) > -1
    }
    add(t) {
        this.has(t) || (this._caches.push(t), this._caches.length > this.max && this.free())
    }
    free() {
        this._caches.shift()
    }
}
class Kc {
    constructor(t, n, r, s, o, i, l, c, u, a) {
        this.el = t, this.src = n, this.error = r, this.loading = s, this.bindType = o, this.attempt = 0, this.cors = c, this.naturalHeight = 0, this.naturalWidth = 0, this.options = l, this.rect = {}, this.$parent = i, this.elRenderer = u, this._imageCache = a, this.performanceData = {
            init: Date.now(),
            loadStart: 0,
            loadEnd: 0
        }, this.filter(), this.initState(), this.render("loading", !1)
    }
    initState() {
        "dataset" in this.el ? this.el.dataset.src = this.src : this.el.setAttribute("data-src", this.src), this.state = {
            loading: !1,
            error: !1,
            loaded: !1,
            rendered: !1
        }
    }
    record(t) {
        this.performanceData[t] = Date.now()
    }
    update(t) {
        const n = this.src;
        this.src = t.src, this.loading = t.loading, this.error = t.error, this.filter(), n !== this.src && (this.attempt = 0, this.initState())
    }
    getRect() {
        this.rect = this.el.getBoundingClientRect()
    }
    checkInView() {
        return this.getRect(), this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0
    }
    filter() {
        for (const t in this.options.filter) this.options.filter[t](this, this.options)
    }
    renderLoading(t) {
        this.state.loading = !0, ir({
            src: this.loading,
            cors: this.cors
        }, () => {
            this.render("loading", !1), this.state.loading = !1, t()
        }, () => {
            t(), this.state.loading = !1, this.options.silent || console.warn(`VueLazyload log: load failed with loading image(${this.loading})`)
        })
    }
    load(t = Ir) {
        if (this.attempt > this.options.attempt - 1 && this.state.error) {
            this.options.silent || console.log(`VueLazyload log: ${this.src} tried too more than ${this.options.attempt} times`), t();
            return
        }
        if (!(this.state.rendered && this.state.loaded)) {
            if (this._imageCache.has(this.src)) return this.state.loaded = !0, this.render("loaded", !0), this.state.rendered = !0, t();
            this.renderLoading(() => {
                this.attempt++, this.options.adapter.beforeLoad && this.options.adapter.beforeLoad(this, this.options), this.record("loadStart"), ir({
                    src: this.src,
                    cors: this.cors
                }, n => {
                    this.naturalHeight = n.naturalHeight, this.naturalWidth = n.naturalWidth, this.state.loaded = !0, this.state.error = !1, this.record("loadEnd"), this.render("loaded", !1), this.state.rendered = !0, this._imageCache.add(this.src), t()
                }, n => {
                    !this.options.silent && console.error(n), this.state.error = !0, this.state.loaded = !1, this.render("error", !1)
                })
            })
        }
    }
    render(t, n) {
        this.elRenderer(this, t, n)
    }
    performance() {
        let t = "loading",
            n = 0;
        return this.state.loaded && (t = "loaded", n = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3), this.state.error && (t = "error"), {
            src: this.src,
            state: t,
            time: n
        }
    }
    $destroy() {
        this.el = null, this.src = "", this.error = null, this.loading = "", this.bindType = null, this.attempt = 0
    }
}
const ys = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    Qc = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"],
    qc = {
        rootMargin: "0px",
        threshold: 0
    };
class Gc {
    constructor({
        preLoad: t,
        error: n,
        throttleWait: r,
        preLoadTop: s,
        dispatchEvent: o,
        loading: i,
        attempt: l,
        silent: c = !0,
        scale: u,
        listenEvents: a,
        filter: h,
        adapter: p,
        observer: _,
        observerOptions: R
    }) {
        this.version = '"3.0.0"', this.lazyContainerMananger = null, this.mode = it.event, this.ListenerQueue = [], this.TargetIndex = 0, this.TargetQueue = [], this.options = {
            silent: c,
            dispatchEvent: !!o,
            throttleWait: r || 200,
            preLoad: t || 1.3,
            preLoadTop: s || 0,
            error: n || ys,
            loading: i || ys,
            attempt: l || 3,
            scale: u || jc(u),
            listenEvents: a || Qc,
            supportWebp: Fc(),
            filter: h || {},
            adapter: p || {},
            observer: !!_,
            observerOptions: R || qc
        }, this._initEvent(), this._imageCache = new Wc(200), this.lazyLoadHandler = kc(this._lazyLoadHandler.bind(this), this.options.throttleWait), this.setMode(this.options.observer ? it.observer : it.event)
    }
    performance() {
        const t = [];
        return this.ListenerQueue.map(n => t.push(n.performance())), t
    }
    addLazyBox(t) {
        this.ListenerQueue.push(t), nt && (this._addListenerTarget(window), this._observer && this._observer.observe(t.el), t.$el && t.$el.parentNode && this._addListenerTarget(t.$el.parentNode))
    }
    add(t, n, r) {
        if (this.ListenerQueue.some(c => c.el === t)) return this.update(t, n), Je(this.lazyLoadHandler);
        let {
            src: s,
            loading: o,
            error: i,
            cors: l
        } = this._valueFormatter(n.value);
        Je(() => {
            s = vs(t, this.options.scale) || s, this._observer && this._observer.observe(t);
            const c = Object.keys(n.modifiers)[0];
            let u;
            c && (u = n.instance.$refs[c], u = u ? u.el || u : document.getElementById(c)), u || (u = Uc(t));
            const a = new Kc(t, s, i, o, n.arg, u, this.options, l, this._elRenderer.bind(this), this._imageCache);
            this.ListenerQueue.push(a), nt && (this._addListenerTarget(window), this._addListenerTarget(u)), Je(this.lazyLoadHandler)
        })
    }
    update(t, n, r) {
        let {
            src: s,
            loading: o,
            error: i
        } = this._valueFormatter(n.value);
        s = vs(t, this.options.scale) || s;
        const l = this.ListenerQueue.find(c => c.el === t);
        l ? l.update({
            src: s,
            loading: o,
            error: i
        }) : (t.getAttribute("lazy") !== "loaded" || t.dataset.src !== s) && this.add(t, n, r), this._observer && (this._observer.unobserve(t), this._observer.observe(t)), Je(this.lazyLoadHandler)
    }
    remove(t) {
        if (!t) return;
        this._observer && this._observer.unobserve(t);
        const n = this.ListenerQueue.find(r => r.el === t);
        n && (this._removeListenerTarget(n.$parent), this._removeListenerTarget(window), kt(this.ListenerQueue, n), n.$destroy && n.$destroy())
    }
    removeComponent(t) {
        t && (kt(this.ListenerQueue, t), this._observer && this._observer.unobserve(t.el), t.$parent && t.$el.parentNode && this._removeListenerTarget(t.$el.parentNode), this._removeListenerTarget(window))
    }
    setMode(t) {
        !_s && t === it.observer && (t = it.event), this.mode = t, t === it.event ? (this._observer && (this.ListenerQueue.forEach(n => {
            this._observer.unobserve(n.el)
        }), this._observer = null), this.TargetQueue.forEach(n => {
            this._initListen(n.el, !0)
        })) : (this.TargetQueue.forEach(n => {
            this._initListen(n.el, !1)
        }), this._initIntersectionObserver())
    }
    _addListenerTarget(t) {
        if (!t) return;
        let n = this.TargetQueue.find(r => r.el === t);
        return n ? n.childrenCount++ : (n = {
            el: t,
            id: ++this.TargetIndex,
            childrenCount: 1,
            listened: !0
        }, this.mode === it.event && this._initListen(n.el, !0), this.TargetQueue.push(n)), this.TargetIndex
    }
    _removeListenerTarget(t) {
        this.TargetQueue.forEach((n, r) => {
            n.el === t && (n.childrenCount--, n.childrenCount || (this._initListen(n.el, !1), this.TargetQueue.splice(r, 1), n = null))
        })
    }
    _initListen(t, n) {
        this.options.listenEvents.forEach(r => Bc[n ? "on" : "off"](t, r, this.lazyLoadHandler))
    }
    _initEvent() {
        this.Event = {
            listeners: {
                loading: [],
                loaded: [],
                error: []
            }
        }, this.$on = (t, n) => {
            this.Event.listeners[t] || (this.Event.listeners[t] = []), this.Event.listeners[t].push(n)
        }, this.$once = (t, n) => {
            const r = this;

            function s() {
                r.$off(t, s), n.apply(r, arguments)
            }
            this.$on(t, s)
        }, this.$off = (t, n) => {
            if (!n) {
                if (!this.Event.listeners[t]) return;
                this.Event.listeners[t].length = 0;
                return
            }
            kt(this.Event.listeners[t], n)
        }, this.$emit = (t, n, r) => {
            this.Event.listeners[t] && this.Event.listeners[t].forEach(s => s(n, r))
        }
    }
    _lazyLoadHandler() {
        const t = [];
        this.ListenerQueue.forEach((n, r) => {
            (!n.el || !n.el.parentNode || n.state.loaded) && t.push(n), n.checkInView() && (n.state.loaded || n.load())
        }), t.forEach(n => {
            kt(this.ListenerQueue, n), n.$destroy && n.$destroy()
        })
    }
    _initIntersectionObserver() {
        _s && (this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions), this.ListenerQueue.length && this.ListenerQueue.forEach(t => {
            this._observer.observe(t.el)
        }))
    }
    _observerHandler(t) {
        t.forEach(n => {
            n.isIntersecting && this.ListenerQueue.forEach(r => {
                if (r.el === n.target) {
                    if (r.state.loaded) return this._observer.unobserve(r.el);
                    r.load()
                }
            })
        })
    }
    _elRenderer(t, n, r) {
        if (!t.el) return;
        const {
            el: s,
            bindType: o
        } = t;
        let i;
        switch (n) {
            case "loading":
                i = t.loading;
                break;
            case "error":
                i = t.error;
                break;
            default:
                i = t.src;
                break
        }
        if (o ? s.style[o] = 'url("' + i + '")' : s.getAttribute("src") !== i && s.setAttribute("src", i), s.setAttribute("lazy", n), this.$emit(n, t, r), this.options.adapter[n] && this.options.adapter[n](t, this.options), this.options.dispatchEvent) {
            const l = new CustomEvent(n, {
                detail: t
            });
            s.dispatchEvent(l)
        }
    }
    _valueFormatter(t) {
        return zc(t) ? (!t.src && !this.options.silent && console.error("Vue Lazyload warning: miss src with " + t), {
            src: t.src,
            loading: t.loading || this.options.loading,
            error: t.error || this.options.error,
            cors: this.options.cors
        }) : {
            src: t,
            loading: this.options.loading,
            error: this.options.error,
            cors: this.options.cors
        }
    }
}
const Bo = (e, t) => {
    let n = tt({});
    const r = () => {
        n = e.value.getBoundingClientRect()
    };
    return {
        rect: n,
        checkInView: () => (r(), nt && n.top < window.innerHeight * t && n.bottom > 0 && n.left < window.innerWidth * t && n.right > 0)
    }
};
var Jc = e => Sn({
    props: {
        tag: {
            type: String,
            default: "div"
        }
    },
    emits: ["show"],
    setup(t, {
        emit: n,
        slots: r
    }) {
        const s = xe(),
            o = tt({
                loaded: !1,
                error: !1,
                attempt: 0
            }),
            i = xe(!1),
            {
                rect: l,
                checkInView: c
            } = Bo(s, e.options.preLoad),
            u = () => {
                i.value = !0, o.loaded = !0, n("show", i.value)
            },
            a = se(() => ({
                el: s.value,
                rect: l,
                checkInView: c,
                load: u,
                state: o
            }));
        return qt(() => {
            e.addLazyBox(a.value), e.lazyLoadHandler()
        }), On(() => {
            e.removeComponent(a.value)
        }), () => {
            var h;
            return ue(t.tag, {
                ref: s
            }, [i.value && ((h = r.default) === null || h === void 0 ? void 0 : h.call(r))])
        }
    }
});
class Yc {
    constructor(t) {
        this.lazy = t, t.lazyContainerMananger = this, this._queue = []
    }
    bind(t, n, r) {
        const s = new Zc(t, n, r, this.lazy);
        this._queue.push(s)
    }
    update(t, n, r) {
        const s = this._queue.find(o => o.el === t);
        s && s.update(t, n)
    }
    unbind(t, n, r) {
        const s = this._queue.find(o => o.el === t);
        s && (s.clear(), kt(this._queue, s))
    }
}
const Xc = {
    selector: "img",
    error: "",
    loading: ""
};
class Zc {
    constructor(t, n, r, s) {
        this.el = t, this.vnode = r, this.binding = n, this.options = {}, this.lazy = s, this._queue = [], this.update(t, n)
    }
    update(t, n) {
        this.el = t, this.options = ms({}, Xc, n.value), this.getImgs().forEach(s => {
            this.lazy.add(s, ms({}, this.binding, {
                value: {
                    src: s.getAttribute("data-src") || s.dataset.src,
                    error: s.getAttribute("data-error") || s.dataset.error || this.options.error,
                    loading: s.getAttribute("data-loading") || s.dataset.loading || this.options.loading
                }
            }), this.vnode)
        })
    }
    getImgs() {
        return Array.from(this.el.querySelectorAll(this.options.selector))
    }
    clear() {
        this.getImgs().forEach(n => this.lazy.remove(n)), this.vnode = null, this.binding = null, this.lazy = null
    }
}
var eu = e => Sn({
    setup(t, {
        slots: n
    }) {
        const r = xe(),
            s = tt({
                src: "",
                error: "",
                loading: "",
                attempt: e.options.attempt
            }),
            o = tt({
                loaded: !1,
                error: !1,
                attempt: 0
            }),
            {
                rect: i,
                checkInView: l
            } = Bo(r, e.options.preLoad),
            c = xe(""),
            u = (p = Ir) => {
                if (o.attempt > s.attempt - 1 && o.error) return e.options.silent || console.log(`VueLazyload log: ${s.src} tried too more than ${s.attempt} times`), p();
                const _ = s.src;
                ir({
                    src: _
                }, ({
                    src: R
                }) => {
                    c.value = R, o.loaded = !0
                }, () => {
                    o.attempt++, c.value = s.error, o.error = !0
                })
            },
            a = se(() => ({
                el: r.value,
                rect: i,
                checkInView: l,
                load: u,
                state: o
            }));
        qt(() => {
            e.addLazyBox(a.value), e.lazyLoadHandler()
        }), On(() => {
            e.removeComponent(a.value)
        });
        const h = () => {
            const {
                src: p,
                loading: _,
                error: R
            } = e._valueFormatter(t.src);
            o.loaded = !1, s.src = p, s.error = R, s.loading = _, c.value = s.loading
        };
        return Ze(() => t.src, () => {
            h(), e.addLazyBox(a.value), e.lazyLoadHandler()
        }, {
            immediate: !0
        }), () => {
            var p;
            return ue(t.tag || "img", {
                src: c.value,
                ref: r
            }, [(p = n.default) === null || p === void 0 ? void 0 : p.call(n)])
        }
    }
}),
    tu = {
        install(e, t = {}) {
            const n = new Gc(t),
                r = new Yc(n);
            if (Number(e.version.split(".")[0]) < 3) return new Error("Vue version at least 3.0");
            e.config.globalProperties.$Lazyload = n, e.provide("Lazyload", n), t.lazyComponent && e.component("lazy-component", Jc(n)), t.lazyImage && e.component("lazy-image", eu(n)), e.directive("lazy", {
                beforeMount: n.add.bind(n),
                beforeUpdate: n.update.bind(n),
                updated: n.lazyLoadHandler.bind(n),
                unmounted: n.remove.bind(n)
            }), e.directive("lazy-container", {
                beforeMount: r.bind.bind(r),
                updated: r.update.bind(r),
                unmounted: r.unbind.bind(r)
            })
        }
    };

function Vo(e) {
    return Qs() ? (Ai(e), !0) : !1
}

function Ct(e) {
    return typeof e == "function" ? e() : we(e)
}
const nu = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ru = Object.prototype.toString,
    su = e => ru.call(e) === "[object Object]",
    Uo = () => { };

function ou(e, t) {
    function n(...r) {
        return new Promise((s, o) => {
            Promise.resolve(e(() => t.apply(this, r), {
                fn: t,
                thisArg: this,
                args: r
            })).then(s).catch(o)
        })
    }
    return n
}
const zo = e => e();

function iu(e = zo) {
    const t = xe(!0);

    function n() {
        t.value = !1
    }

    function r() {
        t.value = !0
    }
    const s = (...o) => {
        t.value && e(...o)
    };
    return {
        isActive: En(t),
        pause: n,
        resume: r,
        eventFilter: s
    }
}

function lu(e) {
    return e || jo()
}

function cu(...e) {
    if (e.length !== 1) return Gi(...e);
    const t = e[0];
    return typeof t == "function" ? En(Ki(() => ({
        get: t,
        set: Uo
    }))) : xe(t)
}

function uu(e, t, n = {}) {
    const {
        eventFilter: r = zo,
        ...s
    } = n;
    return Ze(e, ou(r, t), s)
}

function au(e, t, n = {}) {
    const {
        eventFilter: r,
        ...s
    } = n, {
        eventFilter: o,
        pause: i,
        resume: l,
        isActive: c
    } = iu(r);
    return {
        stop: uu(e, t, {
            ...s,
            eventFilter: o
        }),
        pause: i,
        resume: l,
        isActive: c
    }
}

function Wo(e, t = !0, n) {
    lu() ? qt(e, n) : t ? e() : Je(e)
}

function fu(e = !1, t = {}) {
    const {
        truthyValue: n = !0,
        falsyValue: r = !1
    } = t, s = fe(e), o = xe(e);

    function i(l) {
        if (arguments.length) return o.value = l, o.value; {
            const c = Ct(n);
            return o.value = o.value === c ? Ct(r) : c, o.value
        }
    }
    return s ? i : [o, i]
}

function Ko(e) {
    var t;
    const n = Ct(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n
}
const Ot = nu ? window : void 0;

function bs(...e) {
    let t, n, r, s;
    if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, s] = e, t = Ot) : [t, n, r, s] = e, !t) return Uo;
    Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
    const o = [],
        i = () => {
            o.forEach(a => a()), o.length = 0
        },
        l = (a, h, p, _) => (a.addEventListener(h, p, _), () => a.removeEventListener(h, p, _)),
        c = Ze(() => [Ko(t), Ct(s)], ([a, h]) => {
            if (i(), !a) return;
            const p = su(h) ? {
                ...h
            } : h;
            o.push(...n.flatMap(_ => r.map(R => l(a, _, R, p))))
        }, {
            immediate: !0,
            flush: "post"
        }),
        u = () => {
            c(), i()
        };
    return Vo(u), u
}

function du() {
    const e = xe(!1);
    return jo() && qt(() => {
        e.value = !0
    }), e
}

function hu(e) {
    const t = du();
    return se(() => (t.value, !!e()))
}

function pu(e, t = {}) {
    const {
        window: n = Ot
    } = t, r = hu(() => n && "matchMedia" in n && typeof n.matchMedia == "function");
    let s;
    const o = xe(!1),
        i = u => {
            o.value = u.matches
        },
        l = () => {
            s && ("removeEventListener" in s ? s.removeEventListener("change", i) : s.removeListener(i))
        },
        c = hl(() => {
            r.value && (l(), s = n.matchMedia(Ct(e)), "addEventListener" in s ? s.addEventListener("change", i) : s.addListener(i), o.value = s.matches)
        });
    return Vo(() => {
        c(), l(), s = void 0
    }), o
}
const nn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    rn = "__vueuse_ssr_handlers__",
    gu = mu();

function mu() {
    return rn in nn || (nn[rn] = nn[rn] || {}), nn[rn]
}

function Qo(e, t) {
    return gu[e] || t
}

function _u(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number"
}
const vu = {
    boolean: {
        read: e => e === "true",
        write: e => String(e)
    },
    object: {
        read: e => JSON.parse(e),
        write: e => JSON.stringify(e)
    },
    number: {
        read: e => Number.parseFloat(e),
        write: e => String(e)
    },
    any: {
        read: e => e,
        write: e => String(e)
    },
    string: {
        read: e => e,
        write: e => String(e)
    },
    map: {
        read: e => new Map(JSON.parse(e)),
        write: e => JSON.stringify(Array.from(e.entries()))
    },
    set: {
        read: e => new Set(JSON.parse(e)),
        write: e => JSON.stringify(Array.from(e))
    },
    date: {
        read: e => new Date(e),
        write: e => e.toISOString()
    }
},
    As = "vueuse-storage";

function yu(e, t, n, r = {}) {
    var s;
    const {
        flush: o = "pre",
        deep: i = !0,
        listenToStorageChanges: l = !0,
        writeDefaults: c = !0,
        mergeDefaults: u = !1,
        shallow: a,
        window: h = Ot,
        eventFilter: p,
        onError: _ = V => {
            console.error(V)
        },
        initOnMounted: R
    } = r, P = (a ? uo : xe)(typeof t == "function" ? t() : t);
    if (!n) try {
        n = Qo("getDefaultStorage", () => {
            var V;
            return (V = Ot) == null ? void 0 : V.localStorage
        })()
    } catch (V) {
        _(V)
    }
    if (!n) return P;
    const M = Ct(t),
        L = _u(M),
        $ = (s = r.serializer) != null ? s : vu[L],
        {
            pause: k,
            resume: F
        } = au(P, () => j(P.value), {
            flush: o,
            deep: i,
            eventFilter: p
        });
    return h && l && Wo(() => {
        bs(h, "storage", ne), bs(h, As, re), R && ne()
    }), R || ne(), P;

    function j(V) {
        try {
            if (V == null) n.removeItem(e);
            else {
                const K = $.write(V),
                    de = n.getItem(e);
                de !== K && (n.setItem(e, K), h && h.dispatchEvent(new CustomEvent(As, {
                    detail: {
                        key: e,
                        oldValue: de,
                        newValue: K,
                        storageArea: n
                    }
                })))
            }
        } catch (K) {
            _(K)
        }
    }

    function te(V) {
        const K = V ? V.newValue : n.getItem(e);
        if (K == null) return c && M != null && n.setItem(e, $.write(M)), M;
        if (!V && u) {
            const de = $.read(K);
            return typeof u == "function" ? u(de, M) : L === "object" && !Array.isArray(de) ? {
                ...M,
                ...de
            } : de
        } else return typeof K != "string" ? K : $.read(K)
    }

    function re(V) {
        ne(V.detail)
    }

    function ne(V) {
        if (!(V && V.storageArea !== n)) {
            if (V && V.key == null) {
                P.value = M;
                return
            }
            if (!(V && V.key !== e)) {
                k();
                try {
                    (V == null ? void 0 : V.newValue) !== $.write(P.value) && (P.value = te(V))
                } catch (K) {
                    _(K)
                } finally {
                    V ? Je(F) : F()
                }
            }
        }
    }
}

function qo(e) {
    return pu("(prefers-color-scheme: dark)", e)
}

function bu(e = {}) {
    const {
        selector: t = "html",
        attribute: n = "class",
        initialValue: r = "auto",
        window: s = Ot,
        storage: o,
        storageKey: i = "vueuse-color-scheme",
        listenToStorageChanges: l = !0,
        storageRef: c,
        emitAuto: u,
        disableTransition: a = !0
    } = e, h = {
        auto: "",
        light: "light",
        dark: "dark",
        ...e.modes || {}
    }, p = qo({
        window: s
    }), _ = se(() => p.value ? "dark" : "light"), R = c || (i == null ? cu(r) : yu(i, r, o, {
        window: s,
        listenToStorageChanges: l
    })), P = se(() => R.value === "auto" ? _.value : R.value), M = Qo("updateHTMLAttrs", (F, j, te) => {
        const re = typeof F == "string" ? s == null ? void 0 : s.document.querySelector(F) : Ko(F);
        if (!re) return;
        let ne;
        if (a) {
            ne = s.document.createElement("style");
            const V = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
            ne.appendChild(document.createTextNode(V)), s.document.head.appendChild(ne)
        }
        if (j === "class") {
            const V = te.split(/\s/g);
            Object.values(h).flatMap(K => (K || "").split(/\s/g)).filter(Boolean).forEach(K => {
                V.includes(K) ? re.classList.add(K) : re.classList.remove(K)
            })
        } else re.setAttribute(j, te);
        a && (s.getComputedStyle(ne).opacity, document.head.removeChild(ne))
    });

    function L(F) {
        var j;
        M(t, n, (j = h[F]) != null ? j : F)
    }

    function $(F) {
        e.onChanged ? e.onChanged(F, L) : L(F)
    }
    Ze(P, $, {
        flush: "post",
        immediate: !0
    }), Wo(() => $(P.value));
    const k = se({
        get() {
            return u ? R.value : P.value
        },
        set(F) {
            R.value = F
        }
    });
    try {
        return Object.assign(k, {
            store: R,
            system: _,
            state: P
        })
    } catch {
        return k
    }
}

function Au(e = {}) {
    const {
        valueDark: t = "dark",
        valueLight: n = "",
        window: r = Ot
    } = e, s = bu({
        ...e,
        onChanged: (l, c) => {
            var u;
            e.onChanged ? (u = e.onChanged) == null || u.call(e, l === "dark", c, l) : c(l)
        },
        modes: {
            dark: t,
            light: n
        }
    }), o = se(() => s.system ? s.system.value : qo({
        window: r
    }).value ? "dark" : "light");
    return se({
        get() {
            return s.value === "dark"
        },
        set(l) {
            const c = l ? "dark" : "light";
            o.value === c ? s.value = "auto" : s.value = c
        }
    })
}
const sn = {
    accessToken: "pk.eyJ1Ijoic3VuZ3VvcWkiLCJhIjoiY2xqcXlvajd0MGMxNzNtbWpoZHliaWVtYyJ9.N3bTvCedxVfugnrCSRT2kw",
    isChinese: !0,
    avatar: "./files/camera.svg",
    title: "Camera",
    link: "https://blog.sunguoqi.com",
    repo: "https://github.com/sun0225SUN/camera"
},
    wu = {
        "px-6": "",
        "py-3": "",
        "f-b-c": "",
        "h-20": ""
    },
    Eu = ["href"],
    xu = {
        "inline-flex": "",
        "gap-5": "",
        "items-center": ""
    },
    Ru = ["src"],
    Su = {
        "text-6": "",
        "font-bold": ""
    },
    Cu = {
        "inline-flex": "",
        "gap-5": ""
    },
    Ou = ["href"],
    Pu = {
        __name: "Header",
        setup(e) {
            const t = Au(),
                n = fu(t);
            return (r, s) => (Pr(), $o("div", wu, [He("a", {
                href: we(sn).link
            }, [He("div", xu, [He("img", {
                "h-6": "",
                "w-6": "",
                src: we(sn).avatar,
                alt: "avatar"
            }, null, 8, Ru), He("div", Su, vi(we(sn).title), 1)])], 8, Eu), He("div", Cu, [He("button", {
                "i-carbon-sun": "",
                "dark:i-carbon-moon": "",
                "icon-btn": "",
                onClick: s[0] || (s[0] = o => we(n)())
            }), He("a", {
                href: we(sn).repo,
                "i-carbon-logo-github": "",
                "icon-btn": ""
            }, null, 8, Ou)])]))
        }
    },
    Lu = {
        __name: "App",
        setup(e) {
            return (t, n) => {
                const r = ul("RouterView");
                return Pr(), $o("div", null, [ue(Pu), ue(r)])
            }
        }
    },
    Tu = "modulepreload",
    Iu = function (e) {
        return "/" + e
    },
    ws = {},
    Es = function (t, n, r) {
        let s = Promise.resolve();
        if (n && n.length > 0) {
            const o = document.getElementsByTagName("link");
            s = Promise.all(n.map(i => {
                if (i = Iu(i), i in ws) return;
                ws[i] = !0;
                const l = i.endsWith(".css"),
                    c = l ? '[rel="stylesheet"]' : "";
                if (!!r)
                    for (let h = o.length - 1; h >= 0; h--) {
                        const p = o[h];
                        if (p.href === i && (!l || p.rel === "stylesheet")) return
                    } else if (document.querySelector(`link[href="${i}"]${c}`)) return;
                const a = document.createElement("link");
                if (a.rel = l ? "stylesheet" : Tu, l || (a.as = "script", a.crossOrigin = ""), a.href = i, document.head.appendChild(a), l) return new Promise((h, p) => {
                    a.addEventListener("load", h), a.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${i}`)))
                })
            }))
        }
        return s.then(() => t()).catch(o => {
            const i = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (i.payload = o, window.dispatchEvent(i), !i.defaultPrevented) throw o
        })
    };
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const yt = typeof window < "u";

function Mu(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const G = Object.assign;

function zn(e, t) {
    const n = {};
    for (const r in t) {
        const s = t[r];
        n[r] = Oe(s) ? s.map(e) : e(s)
    }
    return n
}
const Bt = () => { },
    Oe = Array.isArray,
    $u = /\/$/,
    Nu = e => e.replace($u, "");

function Wn(e, t, n = "/") {
    let r, s = {},
        o = "",
        i = "";
    const l = t.indexOf("#");
    let c = t.indexOf("?");
    return l < c && l >= 0 && (c = -1), c > -1 && (r = t.slice(0, c), o = t.slice(c + 1, l > -1 ? l : t.length), s = e(o)), l > -1 && (r = r || t.slice(0, l), i = t.slice(l, t.length)), r = Hu(r ?? t, n), {
        fullPath: r + (o && "?") + o + i,
        path: r,
        query: s,
        hash: i
    }
}

function ju(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}

function xs(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function Fu(e, t, n) {
    const r = t.matched.length - 1,
        s = n.matched.length - 1;
    return r > -1 && r === s && Pt(t.matched[r], n.matched[s]) && Go(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}

function Pt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}

function Go(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e)
        if (!ku(e[n], t[n])) return !1;
    return !0
}

function ku(e, t) {
    return Oe(e) ? Rs(e, t) : Oe(t) ? Rs(t, e) : e === t
}

function Rs(e, t) {
    return Oe(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t
}

function Hu(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
        r = e.split("/"),
        s = r[r.length - 1];
    (s === ".." || s === ".") && r.push("");
    let o = n.length - 1,
        i, l;
    for (i = 0; i < r.length; i++)
        if (l = r[i], l !== ".")
            if (l === "..") o > 1 && o--;
            else break;
    return n.slice(0, o).join("/") + "/" + r.slice(i - (i === r.length ? 1 : 0)).join("/")
}
var Qt;
(function (e) {
    e.pop = "pop", e.push = "push"
})(Qt || (Qt = {}));
var Vt;
(function (e) {
    e.back = "back", e.forward = "forward", e.unknown = ""
})(Vt || (Vt = {}));

function Du(e) {
    if (!e)
        if (yt) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Nu(e)
}
const Bu = /^[^#]+#/;

function Vu(e, t) {
    return e.replace(Bu, "#") + t
}

function Uu(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        r = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: r.left - n.left - (t.left || 0),
        top: r.top - n.top - (t.top || 0)
    }
}
const Mn = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
});

function zu(e) {
    let t;
    if ("el" in e) {
        const n = e.el,
            r = typeof n == "string" && n.startsWith("#"),
            s = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!s) return;
        t = Uu(s, e)
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}

function Ss(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const lr = new Map;

function Wu(e, t) {
    lr.set(e, t)
}

function Ku(e) {
    const t = lr.get(e);
    return lr.delete(e), t
}
let Qu = () => location.protocol + "//" + location.host;

function Jo(e, t) {
    const {
        pathname: n,
        search: r,
        hash: s
    } = t, o = e.indexOf("#");
    if (o > -1) {
        let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
            c = s.slice(l);
        return c[0] !== "/" && (c = "/" + c), xs(c, "")
    }
    return xs(n, e) + r + s
}

function qu(e, t, n, r) {
    let s = [],
        o = [],
        i = null;
    const l = ({
        state: p
    }) => {
        const _ = Jo(e, location),
            R = n.value,
            P = t.value;
        let M = 0;
        if (p) {
            if (n.value = _, t.value = p, i && i === R) {
                i = null;
                return
            }
            M = P ? p.position - P.position : 0
        } else r(_);
        s.forEach(L => {
            L(n.value, R, {
                delta: M,
                type: Qt.pop,
                direction: M ? M > 0 ? Vt.forward : Vt.back : Vt.unknown
            })
        })
    };

    function c() {
        i = n.value
    }

    function u(p) {
        s.push(p);
        const _ = () => {
            const R = s.indexOf(p);
            R > -1 && s.splice(R, 1)
        };
        return o.push(_), _
    }

    function a() {
        const {
            history: p
        } = window;
        p.state && p.replaceState(G({}, p.state, {
            scroll: Mn()
        }), "")
    }

    function h() {
        for (const p of o) p();
        o = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", a)
    }
    return window.addEventListener("popstate", l), window.addEventListener("beforeunload", a, {
        passive: !0
    }), {
        pauseListeners: c,
        listen: u,
        destroy: h
    }
}

function Cs(e, t, n, r = !1, s = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: s ? Mn() : null
    }
}

function Gu(e) {
    const {
        history: t,
        location: n
    } = window, r = {
        value: Jo(e, n)
    }, s = {
        value: t.state
    };
    s.value || o(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);

    function o(c, u, a) {
        const h = e.indexOf("#"),
            p = h > -1 ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c : Qu() + e + c;
        try {
            t[a ? "replaceState" : "pushState"](u, "", p), s.value = u
        } catch (_) {
            console.error(_), n[a ? "replace" : "assign"](p)
        }
    }

    function i(c, u) {
        const a = G({}, t.state, Cs(s.value.back, c, s.value.forward, !0), u, {
            position: s.value.position
        });
        o(c, a, !0), r.value = c
    }

    function l(c, u) {
        const a = G({}, s.value, t.state, {
            forward: c,
            scroll: Mn()
        });
        o(a.current, a, !0);
        const h = G({}, Cs(r.value, c, null), {
            position: a.position + 1
        }, u);
        o(c, h, !1), r.value = c
    }
    return {
        location: r,
        state: s,
        push: l,
        replace: i
    }
}

function Ju(e) {
    e = Du(e);
    const t = Gu(e),
        n = qu(e, t.state, t.location, t.replace);

    function r(o, i = !0) {
        i || n.pauseListeners(), history.go(o)
    }
    const s = G({
        location: "",
        base: e,
        go: r,
        createHref: Vu.bind(null, e)
    }, t, n);
    return Object.defineProperty(s, "location", {
        enumerable: !0,
        get: () => t.location.value
    }), Object.defineProperty(s, "state", {
        enumerable: !0,
        get: () => t.state.value
    }), s
}

function Yu(e) {
    return typeof e == "string" || e && typeof e == "object"
}

function Yo(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const Ke = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
},
    Xo = Symbol("");
var Os;
(function (e) {
    e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})(Os || (Os = {}));

function Lt(e, t) {
    return G(new Error, {
        type: e,
        [Xo]: !0
    }, t)
}

function Fe(e, t) {
    return e instanceof Error && Xo in e && (t == null || !!(e.type & t))
}
const Ps = "[^/]+?",
    Xu = {
        sensitive: !1,
        strict: !1,
        start: !0,
        end: !0
    },
    Zu = /[.+*?^${}()[\]/\\]/g;

function ea(e, t) {
    const n = G({}, Xu, t),
        r = [];
    let s = n.start ? "^" : "";
    const o = [];
    for (const u of e) {
        const a = u.length ? [] : [90];
        n.strict && !u.length && (s += "/");
        for (let h = 0; h < u.length; h++) {
            const p = u[h];
            let _ = 40 + (n.sensitive ? .25 : 0);
            if (p.type === 0) h || (s += "/"), s += p.value.replace(Zu, "\\$&"), _ += 40;
            else if (p.type === 1) {
                const {
                    value: R,
                    repeatable: P,
                    optional: M,
                    regexp: L
                } = p;
                o.push({
                    name: R,
                    repeatable: P,
                    optional: M
                });
                const $ = L || Ps;
                if ($ !== Ps) {
                    _ += 10;
                    try {
                        new RegExp(`(${$})`)
                    } catch (F) {
                        throw new Error(`Invalid custom RegExp for param "${R}" (${$}): ` + F.message)
                    }
                }
                let k = P ? `((?:${$})(?:/(?:${$}))*)` : `(${$})`;
                h || (k = M && u.length < 2 ? `(?:/${k})` : "/" + k), M && (k += "?"), s += k, _ += 20, M && (_ += -8), P && (_ += -20), $ === ".*" && (_ += -50)
            }
            a.push(_)
        }
        r.push(a)
    }
    if (n.strict && n.end) {
        const u = r.length - 1;
        r[u][r[u].length - 1] += .7000000000000001
    }
    n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
    const i = new RegExp(s, n.sensitive ? "" : "i");

    function l(u) {
        const a = u.match(i),
            h = {};
        if (!a) return null;
        for (let p = 1; p < a.length; p++) {
            const _ = a[p] || "",
                R = o[p - 1];
            h[R.name] = _ && R.repeatable ? _.split("/") : _
        }
        return h
    }

    function c(u) {
        let a = "",
            h = !1;
        for (const p of e) {
            (!h || !a.endsWith("/")) && (a += "/"), h = !1;
            for (const _ of p)
                if (_.type === 0) a += _.value;
                else if (_.type === 1) {
                    const {
                        value: R,
                        repeatable: P,
                        optional: M
                    } = _, L = R in u ? u[R] : "";
                    if (Oe(L) && !P) throw new Error(`Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`);
                    const $ = Oe(L) ? L.join("/") : L;
                    if (!$)
                        if (M) p.length < 2 && (a.endsWith("/") ? a = a.slice(0, -1) : h = !0);
                        else throw new Error(`Missing required param "${R}"`);
                    a += $
                }
        }
        return a || "/"
    }
    return {
        re: i,
        score: r,
        keys: o,
        parse: l,
        stringify: c
    }
}

function ta(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const r = t[n] - e[n];
        if (r) return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0
}

function na(e, t) {
    let n = 0;
    const r = e.score,
        s = t.score;
    for (; n < r.length && n < s.length;) {
        const o = ta(r[n], s[n]);
        if (o) return o;
        n++
    }
    if (Math.abs(s.length - r.length) === 1) {
        if (Ls(r)) return 1;
        if (Ls(s)) return -1
    }
    return s.length - r.length
}

function Ls(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const ra = {
    type: 0,
    value: ""
},
    sa = /[a-zA-Z0-9_]/;

function oa(e) {
    if (!e) return [
        []
    ];
    if (e === "/") return [
        [ra]
    ];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

    function t(_) {
        throw new Error(`ERR (${n})/"${u}": ${_}`)
    }
    let n = 0,
        r = n;
    const s = [];
    let o;

    function i() {
        o && s.push(o), o = []
    }
    let l = 0,
        c, u = "",
        a = "";

    function h() {
        u && (n === 0 ? o.push({
            type: 0,
            value: u
        }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), o.push({
            type: 1,
            value: u,
            regexp: a,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?"
        })) : t("Invalid state to consume buffer"), u = "")
    }

    function p() {
        u += c
    }
    for (; l < e.length;) {
        if (c = e[l++], c === "\\" && n !== 2) {
            r = n, n = 4;
            continue
        }
        switch (n) {
            case 0:
                c === "/" ? (u && h(), i()) : c === ":" ? (h(), n = 1) : p();
                break;
            case 4:
                p(), n = r;
                break;
            case 1:
                c === "(" ? n = 2 : sa.test(c) ? p() : (h(), n = 0, c !== "*" && c !== "?" && c !== "+" && l--);
                break;
            case 2:
                c === ")" ? a[a.length - 1] == "\\" ? a = a.slice(0, -1) + c : n = 3 : a += c;
                break;
            case 3:
                h(), n = 0, c !== "*" && c !== "?" && c !== "+" && l--, a = "";
                break;
            default:
                t("Unknown state");
                break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), h(), i(), s
}

function ia(e, t, n) {
    const r = ea(oa(e.path), n),
        s = G(r, {
            record: e,
            parent: t,
            children: [],
            alias: []
        });
    return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s
}

function la(e, t) {
    const n = [],
        r = new Map;
    t = Ms({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);

    function s(a) {
        return r.get(a)
    }

    function o(a, h, p) {
        const _ = !p,
            R = ca(a);
        R.aliasOf = p && p.record;
        const P = Ms(t, a),
            M = [R];
        if ("alias" in a) {
            const k = typeof a.alias == "string" ? [a.alias] : a.alias;
            for (const F of k) M.push(G({}, R, {
                components: p ? p.record.components : R.components,
                path: F,
                aliasOf: p ? p.record : R
            }))
        }
        let L, $;
        for (const k of M) {
            const {
                path: F
            } = k;
            if (h && F[0] !== "/") {
                const j = h.record.path,
                    te = j[j.length - 1] === "/" ? "" : "/";
                k.path = h.record.path + (F && te + F)
            }
            if (L = ia(k, h, P), p ? p.alias.push(L) : ($ = $ || L, $ !== L && $.alias.push(L), _ && a.name && !Is(L) && i(a.name)), R.children) {
                const j = R.children;
                for (let te = 0; te < j.length; te++) o(j[te], L, p && p.children[te])
            }
            p = p || L, (L.record.components && Object.keys(L.record.components).length || L.record.name || L.record.redirect) && c(L)
        }
        return $ ? () => {
            i($)
        } : Bt
    }

    function i(a) {
        if (Yo(a)) {
            const h = r.get(a);
            h && (r.delete(a), n.splice(n.indexOf(h), 1), h.children.forEach(i), h.alias.forEach(i))
        } else {
            const h = n.indexOf(a);
            h > -1 && (n.splice(h, 1), a.record.name && r.delete(a.record.name), a.children.forEach(i), a.alias.forEach(i))
        }
    }

    function l() {
        return n
    }

    function c(a) {
        let h = 0;
        for (; h < n.length && na(a, n[h]) >= 0 && (a.record.path !== n[h].record.path || !Zo(a, n[h]));) h++;
        n.splice(h, 0, a), a.record.name && !Is(a) && r.set(a.record.name, a)
    }

    function u(a, h) {
        let p, _ = {},
            R, P;
        if ("name" in a && a.name) {
            if (p = r.get(a.name), !p) throw Lt(1, {
                location: a
            });
            P = p.record.name, _ = G(Ts(h.params, p.keys.filter($ => !$.optional).map($ => $.name)), a.params && Ts(a.params, p.keys.map($ => $.name))), R = p.stringify(_)
        } else if ("path" in a) R = a.path, p = n.find($ => $.re.test(R)), p && (_ = p.parse(R), P = p.record.name);
        else {
            if (p = h.name ? r.get(h.name) : n.find($ => $.re.test(h.path)), !p) throw Lt(1, {
                location: a,
                currentLocation: h
            });
            P = p.record.name, _ = G({}, h.params, a.params), R = p.stringify(_)
        }
        const M = [];
        let L = p;
        for (; L;) M.unshift(L.record), L = L.parent;
        return {
            name: P,
            path: R,
            params: _,
            matched: M,
            meta: aa(M)
        }
    }
    return e.forEach(a => o(a)), {
        addRoute: o,
        resolve: u,
        removeRoute: i,
        getRoutes: l,
        getRecordMatcher: s
    }
}

function Ts(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n
}

function ca(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: ua(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components" in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}

function ua(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e) t.default = n;
    else
        for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
    return t
}

function Is(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent
    }
    return !1
}

function aa(e) {
    return e.reduce((t, n) => G(t, n.meta), {})
}

function Ms(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n
}

function Zo(e, t) {
    return t.children.some(n => n === e || Zo(e, n))
}
const ei = /#/g,
    fa = /&/g,
    da = /\//g,
    ha = /=/g,
    pa = /\?/g,
    ti = /\+/g,
    ga = /%5B/g,
    ma = /%5D/g,
    ni = /%5E/g,
    _a = /%60/g,
    ri = /%7B/g,
    va = /%7C/g,
    si = /%7D/g,
    ya = /%20/g;

function Mr(e) {
    return encodeURI("" + e).replace(va, "|").replace(ga, "[").replace(ma, "]")
}

function ba(e) {
    return Mr(e).replace(ri, "{").replace(si, "}").replace(ni, "^")
}

function cr(e) {
    return Mr(e).replace(ti, "%2B").replace(ya, "+").replace(ei, "%23").replace(fa, "%26").replace(_a, "`").replace(ri, "{").replace(si, "}").replace(ni, "^")
}

function Aa(e) {
    return cr(e).replace(ha, "%3D")
}

function wa(e) {
    return Mr(e).replace(ei, "%23").replace(pa, "%3F")
}

function Ea(e) {
    return e == null ? "" : wa(e).replace(da, "%2F")
}

function _n(e) {
    try {
        return decodeURIComponent("" + e)
    } catch { }
    return "" + e
}

function xa(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let s = 0; s < r.length; ++s) {
        const o = r[s].replace(ti, " "),
            i = o.indexOf("="),
            l = _n(i < 0 ? o : o.slice(0, i)),
            c = i < 0 ? null : _n(o.slice(i + 1));
        if (l in t) {
            let u = t[l];
            Oe(u) || (u = t[l] = [u]), u.push(c)
        } else t[l] = c
    }
    return t
}

function $s(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = Aa(n), r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        } (Oe(r) ? r.map(o => o && cr(o)) : [r && cr(r)]).forEach(o => {
            o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o))
        })
    }
    return t
}

function Ra(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = Oe(r) ? r.map(s => s == null ? null : "" + s) : r == null ? r : "" + r)
    }
    return t
}
const Sa = Symbol(""),
    Ns = Symbol(""),
    $r = Symbol(""),
    oi = Symbol(""),
    ur = Symbol("");

function jt() {
    let e = [];

    function t(r) {
        return e.push(r), () => {
            const s = e.indexOf(r);
            s > -1 && e.splice(s, 1)
        }
    }

    function n() {
        e = []
    }
    return {
        add: t,
        list: () => e.slice(),
        reset: n
    }
}

function Ge(e, t, n, r, s) {
    const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
    return () => new Promise((i, l) => {
        const c = h => {
            h === !1 ? l(Lt(4, {
                from: n,
                to: t
            })) : h instanceof Error ? l(h) : Yu(h) ? l(Lt(2, {
                from: t,
                to: h
            })) : (o && r.enterCallbacks[s] === o && typeof h == "function" && o.push(h), i())
        },
            u = e.call(r && r.instances[s], t, n, c);
        let a = Promise.resolve(u);
        e.length < 3 && (a = a.then(c)), a.catch(h => l(h))
    })
}

function Kn(e, t, n, r) {
    const s = [];
    for (const o of e)
        for (const i in o.components) {
            let l = o.components[i];
            if (!(t !== "beforeRouteEnter" && !o.instances[i]))
                if (Ca(l)) {
                    const u = (l.__vccOpts || l)[t];
                    u && s.push(Ge(u, n, r, o, i))
                } else {
                    let c = l();
                    s.push(() => c.then(u => {
                        if (!u) return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));
                        const a = Mu(u) ? u.default : u;
                        o.components[i] = a;
                        const p = (a.__vccOpts || a)[t];
                        return p && Ge(p, n, r, o, i)()
                    }))
                }
        }
    return s
}

function Ca(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function js(e) {
    const t = Ve($r),
        n = Ve(oi),
        r = se(() => t.resolve(we(e.to))),
        s = se(() => {
            const {
                matched: c
            } = r.value, {
                length: u
            } = c, a = c[u - 1], h = n.matched;
            if (!a || !h.length) return -1;
            const p = h.findIndex(Pt.bind(null, a));
            if (p > -1) return p;
            const _ = Fs(c[u - 2]);
            return u > 1 && Fs(a) === _ && h[h.length - 1].path !== _ ? h.findIndex(Pt.bind(null, c[u - 2])) : p
        }),
        o = se(() => s.value > -1 && Ta(n.params, r.value.params)),
        i = se(() => s.value > -1 && s.value === n.matched.length - 1 && Go(n.params, r.value.params));

    function l(c = {}) {
        return La(c) ? t[we(e.replace) ? "replace" : "push"](we(e.to)).catch(Bt) : Promise.resolve()
    }
    return {
        route: r,
        href: se(() => r.value.href),
        isActive: o,
        isExactActive: i,
        navigate: l
    }
}
const Oa = Sn({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: js,
    setup(e, {
        slots: t
    }) {
        const n = tt(js(e)),
            {
                options: r
            } = Ve($r),
            s = se(() => ({
                [ks(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
                [ks(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
            }));
        return () => {
            const o = t.default && t.default(n);
            return e.custom ? o : Ho("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
            }, o)
        }
    }
}),
    Pa = Oa;

function La(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return
        }
        return e.preventDefault && e.preventDefault(), !0
    }
}

function Ta(e, t) {
    for (const n in t) {
        const r = t[n],
            s = e[n];
        if (typeof r == "string") {
            if (r !== s) return !1
        } else if (!Oe(s) || s.length !== r.length || r.some((o, i) => o !== s[i])) return !1
    }
    return !0
}

function Fs(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const ks = (e, t, n) => e ?? t ?? n,
    Ia = Sn({
        name: "RouterView",
        inheritAttrs: !1,
        props: {
            name: {
                type: String,
                default: "default"
            },
            route: Object
        },
        compatConfig: {
            MODE: 3
        },
        setup(e, {
            attrs: t,
            slots: n
        }) {
            const r = Ve(ur),
                s = se(() => e.route || r.value),
                o = Ve(Ns, 0),
                i = se(() => {
                    let u = we(o);
                    const {
                        matched: a
                    } = s.value;
                    let h;
                    for (;
                        (h = a[u]) && !h.components;) u++;
                    return u
                }),
                l = se(() => s.value.matched[i.value]);
            cn(Ns, se(() => i.value + 1)), cn(Sa, l), cn(ur, s);
            const c = xe();
            return Ze(() => [c.value, l.value, e.name], ([u, a, h], [p, _, R]) => {
                a && (a.instances[h] = u, _ && _ !== a && u && u === p && (a.leaveGuards.size || (a.leaveGuards = _.leaveGuards), a.updateGuards.size || (a.updateGuards = _.updateGuards))), u && a && (!_ || !Pt(a, _) || !p) && (a.enterCallbacks[h] || []).forEach(P => P(u))
            }, {
                flush: "post"
            }), () => {
                const u = s.value,
                    a = e.name,
                    h = l.value,
                    p = h && h.components[a];
                if (!p) return Hs(n.default, {
                    Component: p,
                    route: u
                });
                const _ = h.props[a],
                    R = _ ? _ === !0 ? u.params : typeof _ == "function" ? _(u) : _ : null,
                    M = Ho(p, G({}, R, t, {
                        onVnodeUnmounted: L => {
                            L.component.isUnmounted && (h.instances[a] = null)
                        },
                        ref: c
                    }));
                return Hs(n.default, {
                    Component: M,
                    route: u
                }) || M
            }
        }
    });

function Hs(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const Ma = Ia;

function $a(e) {
    const t = la(e.routes, e),
        n = e.parseQuery || xa,
        r = e.stringifyQuery || $s,
        s = e.history,
        o = jt(),
        i = jt(),
        l = jt(),
        c = uo(Ke);
    let u = Ke;
    yt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const a = zn.bind(null, v => "" + v),
        h = zn.bind(null, Ea),
        p = zn.bind(null, _n);

    function _(v, O) {
        let x, T;
        return Yo(v) ? (x = t.getRecordMatcher(v), T = O) : T = v, t.addRoute(T, x)
    }

    function R(v) {
        const O = t.getRecordMatcher(v);
        O && t.removeRoute(O)
    }

    function P() {
        return t.getRoutes().map(v => v.record)
    }

    function M(v) {
        return !!t.getRecordMatcher(v)
    }

    function L(v, O) {
        if (O = G({}, O || c.value), typeof v == "string") {
            const g = Wn(n, v, O.path),
                m = t.resolve({
                    path: g.path
                }, O),
                y = s.createHref(g.fullPath);
            return G(g, m, {
                params: p(m.params),
                hash: _n(g.hash),
                redirectedFrom: void 0,
                href: y
            })
        }
        let x;
        if ("path" in v) x = G({}, v, {
            path: Wn(n, v.path, O.path).path
        });
        else {
            const g = G({}, v.params);
            for (const m in g) g[m] == null && delete g[m];
            x = G({}, v, {
                params: h(g)
            }), O.params = h(O.params)
        }
        const T = t.resolve(x, O),
            q = v.hash || "";
        T.params = a(p(T.params));
        const f = ju(r, G({}, v, {
            hash: ba(q),
            path: T.path
        })),
            d = s.createHref(f);
        return G({
            fullPath: f,
            hash: q,
            query: r === $s ? Ra(v.query) : v.query || {}
        }, T, {
            redirectedFrom: void 0,
            href: d
        })
    }

    function $(v) {
        return typeof v == "string" ? Wn(n, v, c.value.path) : G({}, v)
    }

    function k(v, O) {
        if (u !== v) return Lt(8, {
            from: O,
            to: v
        })
    }

    function F(v) {
        return re(v)
    }

    function j(v) {
        return F(G($(v), {
            replace: !0
        }))
    }

    function te(v) {
        const O = v.matched[v.matched.length - 1];
        if (O && O.redirect) {
            const {
                redirect: x
            } = O;
            let T = typeof x == "function" ? x(v) : x;
            return typeof T == "string" && (T = T.includes("?") || T.includes("#") ? T = $(T) : {
                path: T
            }, T.params = {}), G({
                query: v.query,
                hash: v.hash,
                params: "path" in T ? {} : v.params
            }, T)
        }
    }

    function re(v, O) {
        const x = u = L(v),
            T = c.value,
            q = v.state,
            f = v.force,
            d = v.replace === !0,
            g = te(x);
        if (g) return re(G($(g), {
            state: typeof g == "object" ? G({}, q, g.state) : q,
            force: f,
            replace: d
        }), O || x);
        const m = x;
        m.redirectedFrom = O;
        let y;
        return !f && Fu(r, T, x) && (y = Lt(16, {
            to: m,
            from: T
        }), Le(T, T, !0, !1)), (y ? Promise.resolve(y) : K(m, T)).catch(b => Fe(b) ? Fe(b, 2) ? b : ze(b) : Q(b, m, T)).then(b => {
            if (b) {
                if (Fe(b, 2)) return re(G({
                    replace: d
                }, $(b.to), {
                    state: typeof b.to == "object" ? G({}, q, b.to.state) : q,
                    force: f
                }), O || m)
            } else b = rt(m, T, !0, d, q);
            return de(m, T, b), b
        })
    }

    function ne(v, O) {
        const x = k(v, O);
        return x ? Promise.reject(x) : Promise.resolve()
    }

    function V(v) {
        const O = _t.values().next().value;
        return O && typeof O.runWithContext == "function" ? O.runWithContext(v) : v()
    }

    function K(v, O) {
        let x;
        const [T, q, f] = Na(v, O);
        x = Kn(T.reverse(), "beforeRouteLeave", v, O);
        for (const g of T) g.leaveGuards.forEach(m => {
            x.push(Ge(m, v, O))
        });
        const d = ne.bind(null, v, O);
        return x.push(d), he(x).then(() => {
            x = [];
            for (const g of o.list()) x.push(Ge(g, v, O));
            return x.push(d), he(x)
        }).then(() => {
            x = Kn(q, "beforeRouteUpdate", v, O);
            for (const g of q) g.updateGuards.forEach(m => {
                x.push(Ge(m, v, O))
            });
            return x.push(d), he(x)
        }).then(() => {
            x = [];
            for (const g of f)
                if (g.beforeEnter)
                    if (Oe(g.beforeEnter))
                        for (const m of g.beforeEnter) x.push(Ge(m, v, O));
                    else x.push(Ge(g.beforeEnter, v, O));
            return x.push(d), he(x)
        }).then(() => (v.matched.forEach(g => g.enterCallbacks = {}), x = Kn(f, "beforeRouteEnter", v, O), x.push(d), he(x))).then(() => {
            x = [];
            for (const g of i.list()) x.push(Ge(g, v, O));
            return x.push(d), he(x)
        }).catch(g => Fe(g, 8) ? g : Promise.reject(g))
    }

    function de(v, O, x) {
        l.list().forEach(T => V(() => T(v, O, x)))
    }

    function rt(v, O, x, T, q) {
        const f = k(v, O);
        if (f) return f;
        const d = O === Ke,
            g = yt ? history.state : {};
        x && (T || d ? s.replace(v.fullPath, G({
            scroll: d && g && g.scroll
        }, q)) : s.push(v.fullPath, q)), c.value = v, Le(v, O, x, d), ze()
    }
    let Pe;

    function Mt() {
        Pe || (Pe = s.listen((v, O, x) => {
            if (!Gt.listening) return;
            const T = L(v),
                q = te(T);
            if (q) {
                re(G(q, {
                    replace: !0
                }), T).catch(Bt);
                return
            }
            u = T;
            const f = c.value;
            yt && Wu(Ss(f.fullPath, x.delta), Mn()), K(T, f).catch(d => Fe(d, 12) ? d : Fe(d, 2) ? (re(d.to, T).then(g => {
                Fe(g, 20) && !x.delta && x.type === Qt.pop && s.go(-1, !1)
            }).catch(Bt), Promise.reject()) : (x.delta && s.go(-x.delta, !1), Q(d, T, f))).then(d => {
                d = d || rt(T, f, !1), d && (x.delta && !Fe(d, 8) ? s.go(-x.delta, !1) : x.type === Qt.pop && Fe(d, 20) && s.go(-1, !1)), de(T, f, d)
            }).catch(Bt)
        }))
    }
    let gt = jt(),
        ie = jt(),
        J;

    function Q(v, O, x) {
        ze(v);
        const T = ie.list();
        return T.length ? T.forEach(q => q(v, O, x)) : console.error(v), Promise.reject(v)
    }

    function je() {
        return J && c.value !== Ke ? Promise.resolve() : new Promise((v, O) => {
            gt.add([v, O])
        })
    }

    function ze(v) {
        return J || (J = !v, Mt(), gt.list().forEach(([O, x]) => v ? x(v) : O()), gt.reset()), v
    }

    function Le(v, O, x, T) {
        const {
            scrollBehavior: q
        } = e;
        if (!yt || !q) return Promise.resolve();
        const f = !x && Ku(Ss(v.fullPath, 0)) || (T || !x) && history.state && history.state.scroll || null;
        return Je().then(() => q(v, O, f)).then(d => d && zu(d)).catch(d => Q(d, v, O))
    }
    const me = v => s.go(v);
    let mt;
    const _t = new Set,
        Gt = {
            currentRoute: c,
            listening: !0,
            addRoute: _,
            removeRoute: R,
            hasRoute: M,
            getRoutes: P,
            resolve: L,
            options: e,
            push: F,
            replace: j,
            go: me,
            back: () => me(-1),
            forward: () => me(1),
            beforeEach: o.add,
            beforeResolve: i.add,
            afterEach: l.add,
            onError: ie.add,
            isReady: je,
            install(v) {
                const O = this;
                v.component("RouterLink", Pa), v.component("RouterView", Ma), v.config.globalProperties.$router = O, Object.defineProperty(v.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => we(c)
                }), yt && !mt && c.value === Ke && (mt = !0, F(s.location).catch(q => { }));
                const x = {};
                for (const q in Ke) Object.defineProperty(x, q, {
                    get: () => c.value[q],
                    enumerable: !0
                });
                v.provide($r, O), v.provide(oi, oo(x)), v.provide(ur, c);
                const T = v.unmount;
                _t.add(v), v.unmount = function () {
                    _t.delete(v), _t.size < 1 && (u = Ke, Pe && Pe(), Pe = null, c.value = Ke, mt = !1, J = !1), T()
                }
            }
        };

    function he(v) {
        return v.reduce((O, x) => O.then(() => V(x)), Promise.resolve())
    }
    return Gt
}

function Na(e, t) {
    const n = [],
        r = [],
        s = [],
        o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const l = t.matched[i];
        l && (e.matched.find(u => Pt(u, l)) ? r.push(l) : n.push(l));
        const c = e.matched[i];
        c && (t.matched.find(u => Pt(u, c)) || s.push(c))
    }
    return [n, r, s]
}
const ja = $a({
    history: Ju("/"),
    routes: [{
        path: "/",
        name: "index",
        component: () => Es(() => import("./PictureView-QUD2xFr5.js"), __vite__mapDeps([]))
    }, {
        path: "/about",
        name: "about",
        component: () => Es(() => import("./AboutView-V5tnQA_K.js"), __vite__mapDeps([]))
    }]
}),
    Nr = Tc(Lu);
Nr.use(ja);
Nr.use(tu, {
    preLoad: 1,
    loading: "files/loading.gif",
    attempt: 1
});
Nr.mount("#app");
export {
    De as F, Fa as a, He as b, $o as c, Da as d, Ha as e, Pr as o, xe as r, vi as t, we as u, ka as w
};

function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = []
    }
    return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}