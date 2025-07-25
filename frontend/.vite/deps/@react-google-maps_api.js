import {
  require_react_dom
} from "./chunk-5HNGYYSW.js";
import {
  require_react
} from "./chunk-TVFQMRVC.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          self,
          source,
          getOwner(),
          maybeKey,
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
      }
      var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      Symbol.for("react.provider");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React = {
        "react-stack-bottom-frame": function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(
        React,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          source,
          self,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          source,
          self,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/@react-google-maps/api/dist/esm.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());
var import_react_dom = __toESM(require_react_dom());
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function getDefaultExportFromCjs$1(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var invariant_1;
var hasRequiredInvariant;
function requireInvariant() {
  if (hasRequiredInvariant) return invariant_1;
  hasRequiredInvariant = 1;
  var NODE_ENV = "development";
  var invariant2 = function invariant3(condition, format, a, b, c, d, e, f) {
    if (NODE_ENV !== "production") {
      if (format === void 0) {
        throw new Error("invariant requires an error message argument");
      }
    }
    if (!condition) {
      var error;
      if (format === void 0) {
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function() {
          return args[argIndex++];
        }));
        error.name = "Invariant Violation";
      }
      error.framesToPop = 1;
      throw error;
    }
  };
  invariant_1 = invariant2;
  return invariant_1;
}
var invariantExports = requireInvariant();
var invariant = getDefaultExportFromCjs$1(invariantExports);
var MapContext = (0, import_react.createContext)(null);
function useGoogleMap() {
  invariant(!!import_react.useContext, "useGoogleMap is React hook and requires React version 16.8+");
  var map = (0, import_react.useContext)(MapContext);
  invariant(!!map, "useGoogleMap needs a GoogleMap available up in the tree");
  return map;
}
function reduce(obj, fn, acc) {
  return Object.keys(obj).reduce(function reducer(newAcc, key) {
    return fn(newAcc, obj[key], key);
  }, acc);
}
function forEach(obj, fn) {
  Object.keys(obj).forEach((key) => {
    return fn(obj[key], key);
  });
}
function applyUpdaterToNextProps(updaterMap2, prevProps, nextProps, instance) {
  var map = {};
  var iter = (fn, key) => {
    var nextValue = nextProps[key];
    if (nextValue !== prevProps[key]) {
      map[key] = nextValue;
      fn(instance, nextValue);
    }
  };
  forEach(updaterMap2, iter);
  return map;
}
function registerEvents(props, instance, eventMap2) {
  var registeredList = reduce(eventMap2, function reducer(acc, googleEventName, onEventName) {
    if (typeof props[onEventName] === "function") {
      acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
    }
    return acc;
  }, []);
  return registeredList;
}
function unregisterEvent(registered) {
  google.maps.event.removeListener(registered);
}
function unregisterEvents() {
  var events = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  events.forEach(unregisterEvent);
}
function applyUpdatersToPropsAndRegisterEvents(_ref) {
  var {
    updaterMap: updaterMap2,
    eventMap: eventMap2,
    prevProps,
    nextProps,
    instance
  } = _ref;
  var registeredEvents = registerEvents(nextProps, instance, eventMap2);
  applyUpdaterToNextProps(updaterMap2, prevProps, nextProps, instance);
  return registeredEvents;
}
var eventMap$i = {
  onDblClick: "dblclick",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMapTypeIdChanged: "maptypeid_changed",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onRightClick: "rightclick",
  onTilesLoaded: "tilesloaded",
  onBoundsChanged: "bounds_changed",
  onCenterChanged: "center_changed",
  onClick: "click",
  onDrag: "drag",
  onHeadingChanged: "heading_changed",
  onIdle: "idle",
  onProjectionChanged: "projection_changed",
  onResize: "resize",
  onTiltChanged: "tilt_changed",
  onZoomChanged: "zoom_changed"
};
var updaterMap$i = {
  extraMapTypes(map, extra) {
    extra.forEach(function forEachExtra(it, i) {
      map.mapTypes.set(String(i), it);
    });
  },
  center(map, center) {
    map.setCenter(center);
  },
  clickableIcons(map, clickable) {
    map.setClickableIcons(clickable);
  },
  heading(map, heading) {
    map.setHeading(heading);
  },
  mapTypeId(map, mapTypeId) {
    map.setMapTypeId(mapTypeId);
  },
  options(map, options) {
    map.setOptions(options);
  },
  streetView(map, streetView) {
    map.setStreetView(streetView);
  },
  tilt(map, tilt) {
    map.setTilt(tilt);
  },
  zoom(map, zoom) {
    map.setZoom(zoom);
  }
};
function GoogleMapFunctional(_ref) {
  var {
    children,
    options,
    id,
    mapContainerStyle,
    mapContainerClassName,
    center,
    // clickableIcons,
    // extraMapTypes,
    // heading,
    // mapTypeId,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseDown,
    onMouseUp,
    onRightClick,
    // onMapTypeIdChanged,
    // onTilesLoaded,
    // onBoundsChanged,
    onCenterChanged,
    // onHeadingChanged,
    // onIdle,
    // onProjectionChanged,
    // onResize,
    // onTiltChanged,
    // onZoomChanged,
    onLoad,
    onUnmount
  } = _ref;
  var [map, setMap] = (0, import_react.useState)(null);
  var ref = (0, import_react.useRef)(null);
  var [centerChangedListener, setCenterChangedListener] = (0, import_react.useState)(null);
  var [dblclickListener, setDblclickListener] = (0, import_react.useState)(null);
  var [dragendListener, setDragendListener] = (0, import_react.useState)(null);
  var [dragstartListener, setDragstartListener] = (0, import_react.useState)(null);
  var [mousedownListener, setMousedownListener] = (0, import_react.useState)(null);
  var [mousemoveListener, setMousemoveListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  var [mouseupListener, setMouseupListener] = (0, import_react.useState)(null);
  var [rightclickListener, setRightclickListener] = (0, import_react.useState)(null);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [dragListener, setDragListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (options && map !== null) {
      map.setOptions(options);
    }
  }, [map, options]);
  (0, import_react.useEffect)(() => {
    if (map !== null && typeof center !== "undefined") {
      map.setCenter(center);
    }
  }, [map, center]);
  (0, import_react.useEffect)(() => {
    if (map && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(map, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  (0, import_react.useEffect)(() => {
    if (map && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(map, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  (0, import_react.useEffect)(() => {
    if (map && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(map, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  (0, import_react.useEffect)(() => {
    if (map && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(map, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  (0, import_react.useEffect)(() => {
    if (map && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(map, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  (0, import_react.useEffect)(() => {
    if (map && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(map, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (map && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(map, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (map && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(map, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  (0, import_react.useEffect)(() => {
    if (map && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(map, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  (0, import_react.useEffect)(() => {
    if (map && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(map, "click", onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (map && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(map, "drag", onDrag));
    }
  }, [onDrag]);
  (0, import_react.useEffect)(() => {
    if (map && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      setCenterChangedListener(google.maps.event.addListener(map, "center_changed", onCenterChanged));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    var map2 = ref.current === null ? null : new google.maps.Map(ref.current, options);
    setMap(map2);
    if (map2 !== null && onLoad) {
      onLoad(map2);
    }
    return () => {
      if (map2 !== null) {
        if (onUnmount) {
          onUnmount(map2);
        }
      }
    };
  }, []);
  return (0, import_jsx_runtime.jsx)("div", {
    id,
    ref,
    style: mapContainerStyle,
    className: mapContainerClassName,
    children: (0, import_jsx_runtime.jsx)(MapContext.Provider, {
      value: map,
      children: map !== null ? children : null
    })
  });
}
(0, import_react.memo)(GoogleMapFunctional);
var GoogleMap = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      map: null
    });
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "mapRef", null);
    _defineProperty(this, "getInstance", () => {
      if (this.mapRef === null) {
        return null;
      }
      return new google.maps.Map(this.mapRef, this.props.options);
    });
    _defineProperty(this, "panTo", (latLng) => {
      var map = this.getInstance();
      if (map) {
        map.panTo(latLng);
      }
    });
    _defineProperty(this, "setMapCallback", () => {
      if (this.state.map !== null) {
        if (this.props.onLoad) {
          this.props.onLoad(this.state.map);
        }
      }
    });
    _defineProperty(this, "getRef", (ref) => {
      this.mapRef = ref;
    });
  }
  componentDidMount() {
    var map = this.getInstance();
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$i,
      eventMap: eventMap$i,
      prevProps: {},
      nextProps: this.props,
      instance: map
    });
    this.setState(function setMap() {
      return {
        map
      };
    }, this.setMapCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.map !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$i,
        eventMap: eventMap$i,
        prevProps,
        nextProps: this.props,
        instance: this.state.map
      });
    }
  }
  componentWillUnmount() {
    if (this.state.map !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.map);
      }
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return (0, import_jsx_runtime.jsx)("div", {
      id: this.props.id,
      ref: this.getRef,
      style: this.props.mapContainerStyle,
      className: this.props.mapContainerClassName,
      children: (0, import_jsx_runtime.jsx)(MapContext.Provider, {
        value: this.state.map,
        children: this.state.map !== null ? this.props.children : null
      })
    });
  }
};
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), u = i.value;
  } catch (n2) {
    return void e(n2);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}
function makeLoadScriptUrl(_ref) {
  var {
    googleMapsApiKey,
    googleMapsClientId,
    version = "weekly",
    language,
    region,
    libraries,
    channel,
    mapIds,
    authReferrerPolicy,
    apiUrl = "https://maps.googleapis.com"
  } = _ref;
  var params = [];
  invariant(googleMapsApiKey && googleMapsClientId || !(googleMapsApiKey && googleMapsClientId), "You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.");
  if (googleMapsApiKey) {
    params.push("key=".concat(googleMapsApiKey));
  } else if (googleMapsClientId) {
    params.push("client=".concat(googleMapsClientId));
  }
  if (version) {
    params.push("v=".concat(version));
  }
  if (language) {
    params.push("language=".concat(language));
  }
  if (region) {
    params.push("region=".concat(region));
  }
  if (libraries && libraries.length) {
    params.push("libraries=".concat(libraries.sort().join(",")));
  }
  if (channel) {
    params.push("channel=".concat(channel));
  }
  if (mapIds && mapIds.length) {
    params.push("map_ids=".concat(mapIds.join(",")));
  }
  if (authReferrerPolicy) {
    params.push("auth_referrer_policy=".concat(authReferrerPolicy));
  }
  params.push("loading=async");
  params.push("callback=initMap");
  return "".concat(apiUrl, "/maps/api/js?").concat(params.join("&"));
}
var isBrowser = typeof document !== "undefined";
function injectScript(_ref) {
  var {
    url,
    id,
    nonce
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = _ref;
  if (!isBrowser) {
    return Promise.reject(new Error("document is undefined"));
  }
  return new Promise(function injectScriptCallback(resolve, reject) {
    var existingScript = document.getElementById(id);
    var windowWithGoogleMap = window;
    if (existingScript) {
      var dataStateAttribute = existingScript.getAttribute("data-state");
      if (existingScript.src === url && dataStateAttribute !== "error") {
        if (dataStateAttribute === "ready") {
          return resolve(id);
        } else {
          var originalInitMap = windowWithGoogleMap.initMap;
          var originalErrorCallback = existingScript.onerror;
          windowWithGoogleMap.initMap = function initMap() {
            if (originalInitMap) {
              originalInitMap();
            }
            resolve(id);
          };
          existingScript.onerror = function(err) {
            if (originalErrorCallback) {
              originalErrorCallback(err);
            }
            reject(err);
          };
          return;
        }
      } else {
        existingScript.remove();
      }
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;
    script.async = true;
    script.nonce = nonce || "";
    script.onerror = function onerror(err) {
      script.setAttribute("data-state", "error");
      reject(err);
    };
    windowWithGoogleMap.initMap = function onload() {
      script.setAttribute("data-state", "ready");
      resolve(id);
    };
    document.head.appendChild(script);
  }).catch((err) => {
    console.error("injectScript error: ", err);
    throw err;
  });
}
function isGoogleFontStyle(element) {
  var href = element.href;
  if (href && (href.indexOf("https://fonts.googleapis.com/css?family=Roboto") === 0 || href.indexOf("https://fonts.googleapis.com/css?family=Google+Sans+Text") === 0)) {
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText.replace("\r\n", "").indexOf(".gm-style") === 0
  ) {
    element.styleSheet.cssText = "";
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML.replace("\r\n", "").indexOf(".gm-style") === 0
  ) {
    element.innerHTML = "";
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === "style" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !element.styleSheet && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !element.innerHTML
  ) {
    return true;
  }
  return false;
}
function preventGoogleFonts() {
  var head = document.getElementsByTagName("head")[0];
  if (head) {
    var trueInsertBefore = head.insertBefore.bind(head);
    head.insertBefore = function insertBefore(newElement, referenceElement) {
      if (!isGoogleFontStyle(newElement)) {
        Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
      }
      return newElement;
    };
    var trueAppend = head.appendChild.bind(head);
    head.appendChild = function appendChild(textNode) {
      if (!isGoogleFontStyle(textNode)) {
        Reflect.apply(trueAppend, head, [textNode]);
      }
      return textNode;
    };
  }
}
var cleaningUp = false;
function DefaultLoadingElement() {
  return (0, import_jsx_runtime.jsx)("div", {
    children: "Loading..."
  });
}
var defaultLoadScriptProps = {
  id: "script-loader",
  version: "weekly"
};
var LoadScript = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "check", null);
    _defineProperty(this, "state", {
      loaded: false
    });
    _defineProperty(this, "cleanupCallback", () => {
      delete window.google.maps;
      this.injectScript();
    });
    _defineProperty(this, "isCleaningUp", _asyncToGenerator(function* () {
      function promiseCallback(resolve) {
        if (!cleaningUp) {
          resolve();
        } else {
          if (isBrowser) {
            var timer = window.setInterval(function interval() {
              if (!cleaningUp) {
                window.clearInterval(timer);
                resolve();
              }
            }, 1);
          }
        }
        return;
      }
      return new Promise(promiseCallback);
    }));
    _defineProperty(this, "cleanup", () => {
      cleaningUp = true;
      var script = document.getElementById(this.props.id);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      Array.prototype.slice.call(document.getElementsByTagName("script")).filter(function filter(script2) {
        return typeof script2.src === "string" && script2.src.includes("maps.googleapis");
      }).forEach(function forEach2(script2) {
        if (script2.parentNode) {
          script2.parentNode.removeChild(script2);
        }
      });
      Array.prototype.slice.call(document.getElementsByTagName("link")).filter(function filter(link) {
        return link.href === "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans";
      }).forEach(function forEach2(link) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      Array.prototype.slice.call(document.getElementsByTagName("style")).filter(function filter(style) {
        return style.innerText !== void 0 && style.innerText.length > 0 && style.innerText.includes(".gm-");
      }).forEach(function forEach2(style) {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
    });
    _defineProperty(this, "injectScript", () => {
      if (this.props.preventGoogleFontsLoading) {
        preventGoogleFonts();
      }
      invariant(!!this.props.id, 'LoadScript requires "id" prop to be a string: %s', this.props.id);
      var injectScriptOptions = {
        id: this.props.id,
        nonce: this.props.nonce,
        url: makeLoadScriptUrl(this.props)
      };
      injectScript(injectScriptOptions).then(() => {
        if (this.props.onLoad) {
          this.props.onLoad();
        }
        this.setState(function setLoaded() {
          return {
            loaded: true
          };
        });
        return;
      }).catch((err) => {
        if (this.props.onError) {
          this.props.onError(err);
        }
        console.error("\n          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (".concat(this.props.googleMapsApiKey || "-", ") or Client ID (").concat(this.props.googleMapsClientId || "-", ") to <LoadScript />\n          Otherwise it is a Network issue.\n        "));
      });
    });
    _defineProperty(this, "getRef", (el) => {
      this.check = el;
    });
  }
  componentDidMount() {
    if (isBrowser) {
      if (window.google && window.google.maps && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }
      this.isCleaningUp().then(this.injectScript).catch(function error(err) {
        console.error("Error at injecting script after cleaning up: ", err);
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.libraries !== prevProps.libraries) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    if (isBrowser && prevProps.language !== this.props.language) {
      this.cleanup();
      this.setState(function setLoaded() {
        return {
          loaded: false
        };
      }, this.cleanupCallback);
    }
  }
  componentWillUnmount() {
    if (isBrowser) {
      this.cleanup();
      var timeoutCallback = () => {
        if (!this.check) {
          delete window.google;
          cleaningUp = false;
        }
      };
      window.setTimeout(timeoutCallback, 1);
      if (this.props.onUnmount) {
        this.props.onUnmount();
      }
    }
  }
  render() {
    return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [(0, import_jsx_runtime.jsx)("div", {
        ref: this.getRef
      }), this.state.loaded ? this.props.children : this.props.loadingElement || (0, import_jsx_runtime.jsx)(DefaultLoadingElement, {})]
    });
  }
};
_defineProperty(LoadScript, "defaultProps", defaultLoadScriptProps);
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
var previouslyLoadedUrl;
function useLoadScript(_ref) {
  var {
    id = defaultLoadScriptProps.id,
    version = defaultLoadScriptProps.version,
    nonce,
    googleMapsApiKey,
    googleMapsClientId,
    language,
    region,
    libraries,
    preventGoogleFontsLoading,
    channel,
    mapIds,
    authReferrerPolicy,
    apiUrl = "https://maps.googleapis.com"
  } = _ref;
  var isMounted = (0, import_react.useRef)(false);
  var [isLoaded, setLoaded] = (0, import_react.useState)(false);
  var [loadError, setLoadError] = (0, import_react.useState)(void 0);
  (0, import_react.useEffect)(function trackMountedState() {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  (0, import_react.useEffect)(function applyPreventGoogleFonts() {
    if (isBrowser && preventGoogleFontsLoading) {
      preventGoogleFonts();
    }
  }, [preventGoogleFontsLoading]);
  (0, import_react.useEffect)(function validateLoadedState() {
    if (isLoaded) {
      invariant(!!window.google, "useLoadScript was marked as loaded, but window.google is not present. Something went wrong.");
    }
  }, [isLoaded]);
  var url = makeLoadScriptUrl({
    version,
    googleMapsApiKey,
    googleMapsClientId,
    language,
    region,
    libraries,
    channel,
    mapIds,
    authReferrerPolicy,
    apiUrl
  });
  (0, import_react.useEffect)(function loadScriptAndModifyLoadedState() {
    if (!isBrowser) {
      return;
    }
    function setLoadedIfMounted() {
      if (isMounted.current) {
        setLoaded(true);
        previouslyLoadedUrl = url;
      }
    }
    if (window.google && window.google.maps && previouslyLoadedUrl === url) {
      setLoadedIfMounted();
      return;
    }
    injectScript({
      id,
      url,
      nonce
    }).then(setLoadedIfMounted).catch(function handleInjectError(err) {
      if (isMounted.current) {
        setLoadError(err);
      }
      console.warn("\n        There has been an Error with loading Google Maps API script, please check that you provided correct google API key (".concat(googleMapsApiKey || "-", ") or Client ID (").concat(googleMapsClientId || "-", ")\n        Otherwise it is a Network issue.\n      "));
      console.error(err);
    });
  }, [id, url, nonce]);
  var prevLibraries = (0, import_react.useRef)(void 0);
  (0, import_react.useEffect)(function checkPerformance() {
    if (prevLibraries.current && libraries !== prevLibraries.current) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    prevLibraries.current = libraries;
  }, [libraries]);
  return {
    isLoaded,
    loadError,
    url
  };
}
var _excluded$1 = ["loadingElement", "onLoad", "onError", "onUnmount", "children"];
var defaultLoadingElement = (0, import_jsx_runtime.jsx)(DefaultLoadingElement, {});
function LoadScriptNext(_ref) {
  var {
    loadingElement,
    onLoad,
    onError,
    onUnmount,
    children
  } = _ref, hookOptions = _objectWithoutProperties(_ref, _excluded$1);
  var {
    isLoaded,
    loadError
  } = useLoadScript(hookOptions);
  (0, import_react.useEffect)(function handleOnLoad() {
    if (isLoaded && typeof onLoad === "function") {
      onLoad();
    }
  }, [isLoaded, onLoad]);
  (0, import_react.useEffect)(function handleOnError() {
    if (loadError && typeof onError === "function") {
      onError(loadError);
    }
  }, [loadError, onError]);
  (0, import_react.useEffect)(function handleOnUnmount() {
    return () => {
      if (onUnmount) {
        onUnmount();
      }
    };
  }, [onUnmount]);
  return isLoaded ? children : loadingElement || defaultLoadingElement;
}
var LoadScriptNext$1 = (0, import_react.memo)(LoadScriptNext);
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, [])).next());
  });
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var fastDeepEqual$1 = function equal(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0; ) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
};
var isEqual = getDefaultExportFromCjs(fastDeepEqual$1);
var DEFAULT_ID = "__googleMapsScriptId";
var LoaderStatus;
(function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
  LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
  LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
  LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
var Loader = class _Loader {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor(_ref) {
    var {
      apiKey,
      authReferrerPolicy,
      channel,
      client,
      id = DEFAULT_ID,
      language,
      libraries = [],
      mapIds,
      nonce,
      region,
      retries = 3,
      url = "https://maps.googleapis.com/maps/api/js",
      version
    } = _ref;
    this.callbacks = [];
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.apiKey = apiKey;
    this.authReferrerPolicy = authReferrerPolicy;
    this.channel = channel;
    this.client = client;
    this.id = id || DEFAULT_ID;
    this.language = language;
    this.libraries = libraries;
    this.mapIds = mapIds;
    this.nonce = nonce;
    this.region = region;
    this.retries = retries;
    this.url = url;
    this.version = version;
    if (_Loader.instance) {
      if (!isEqual(this.options, _Loader.instance.options)) {
        throw new Error("Loader must not be called again with different options. ".concat(JSON.stringify(this.options), " !== ").concat(JSON.stringify(_Loader.instance.options)));
      }
      return _Loader.instance;
    }
    _Loader.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    if (this.errors.length) {
      return LoaderStatus.FAILURE;
    }
    if (this.done) {
      return LoaderStatus.SUCCESS;
    }
    if (this.loading) {
      return LoaderStatus.LOADING;
    }
    return LoaderStatus.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   * @deprecated
   */
  createUrl() {
    var url = this.url;
    url += "?callback=__googleMapsCallback&loading=async";
    if (this.apiKey) {
      url += "&key=".concat(this.apiKey);
    }
    if (this.channel) {
      url += "&channel=".concat(this.channel);
    }
    if (this.client) {
      url += "&client=".concat(this.client);
    }
    if (this.libraries.length > 0) {
      url += "&libraries=".concat(this.libraries.join(","));
    }
    if (this.language) {
      url += "&language=".concat(this.language);
    }
    if (this.region) {
      url += "&region=".concat(this.region);
    }
    if (this.version) {
      url += "&v=".concat(this.version);
    }
    if (this.mapIds) {
      url += "&map_ids=".concat(this.mapIds.join(","));
    }
    if (this.authReferrerPolicy) {
      url += "&auth_referrer_policy=".concat(this.authReferrerPolicy);
    }
    return url;
  }
  deleteScript() {
    var script = document.getElementById(this.id);
    if (script) {
      script.remove();
    }
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   * @deprecated, use importLibrary() instead.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   * @deprecated, use importLibrary() instead.
   */
  loadPromise() {
    return new Promise((resolve, reject) => {
      this.loadCallback((err) => {
        if (!err) {
          resolve(window.google);
        } else {
          reject(err.error);
        }
      });
    });
  }
  importLibrary(name) {
    this.execute();
    return google.maps.importLibrary(name);
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   * @deprecated, use importLibrary() instead.
   */
  loadCallback(fn) {
    this.callbacks.push(fn);
    this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    var _a, _b;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    var params = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length && this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(params).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key) => !params[key] && delete params[key]
    );
    if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
      ((g) => {
        var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}), r = /* @__PURE__ */ new Set(), e = new URLSearchParams(), u = () => (
          // @ts-ignore
          h || (h = new Promise((f, n) => __awaiter(this, void 0, void 0, function* () {
            var _a2;
            yield a = m.createElement("script");
            a.id = this.id;
            e.set("libraries", [...r] + "");
            for (k in g) e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = this.url + "?" + e;
            d[q] = f;
            a.onerror = () => h = n(Error(p + " could not load."));
            a.nonce = this.nonce || ((_a2 = m.querySelector("script[nonce]")) === null || _a2 === void 0 ? void 0 : _a2.nonce) || "";
            m.head.append(a);
          })))
        );
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = function(f) {
          for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            n[_key - 1] = arguments[_key];
          }
          return r.add(f) && u().then(() => d[l](f, ...n));
        };
      })(params);
    }
    var libraryPromises = this.libraries.map((library) => this.importLibrary(library));
    if (!libraryPromises.length) {
      libraryPromises.push(this.importLibrary("core"));
    }
    Promise.all(libraryPromises).then(() => this.callback(), (error) => {
      var event = new ErrorEvent("error", {
        error
      });
      this.loadErrorCallback(event);
    });
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript();
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    if (this.failed) {
      this.reset();
    }
  }
  loadErrorCallback(e) {
    this.errors.push(e);
    if (this.errors.length <= this.retries) {
      var delay = this.errors.length * Math.pow(2, this.errors.length);
      console.error("Failed to load Google Maps script, retrying in ".concat(delay, " ms."));
      setTimeout(() => {
        this.deleteScript();
        this.setScript();
      }, delay);
    } else {
      this.onerrorEvent = e;
      this.callback();
    }
  }
  callback() {
    this.done = true;
    this.loading = false;
    this.callbacks.forEach((cb) => {
      cb(this.onerrorEvent);
    });
    this.callbacks = [];
  }
  execute() {
    this.resetIfRetryingFailed();
    if (this.loading) {
      return;
    }
    if (this.done) {
      this.callback();
    } else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match.");
        this.callback();
        return;
      }
      this.loading = true;
      this.setScript();
    }
  }
};
var defaultLibraries = ["maps"];
function useJsApiLoader(_ref) {
  var {
    id = defaultLoadScriptProps.id,
    version = defaultLoadScriptProps.version,
    nonce,
    googleMapsApiKey,
    // googleMapsClientId,
    language,
    region,
    libraries = defaultLibraries,
    preventGoogleFontsLoading,
    // channel,
    mapIds,
    authReferrerPolicy
  } = _ref;
  var isMounted = (0, import_react.useRef)(false);
  var [isLoaded, setLoaded] = (0, import_react.useState)(false);
  var [loadError, setLoadError] = (0, import_react.useState)(void 0);
  (0, import_react.useEffect)(function trackMountedState() {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  var loader = (0, import_react.useMemo)(() => {
    return new Loader({
      id,
      apiKey: googleMapsApiKey,
      version,
      libraries,
      language: language || "en",
      region: region || "US",
      mapIds: mapIds || [],
      nonce: nonce || "",
      authReferrerPolicy: authReferrerPolicy || "origin"
    });
  }, [id, googleMapsApiKey, version, libraries, language, region, mapIds, nonce, authReferrerPolicy]);
  (0, import_react.useEffect)(function effect() {
    if (isLoaded) {
      return;
    } else {
      loader.load().then(() => {
        if (isMounted.current) {
          setLoaded(true);
        }
        return;
      }).catch((error) => {
        setLoadError(error);
      });
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (isBrowser && preventGoogleFontsLoading) {
      preventGoogleFonts();
    }
  }, [preventGoogleFontsLoading]);
  var prevLibraries = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    if (prevLibraries.current && libraries !== prevLibraries.current) {
      console.warn("Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables");
    }
    prevLibraries.current = libraries;
  }, [libraries]);
  return {
    isLoaded,
    loadError
  };
}
function ownKeys$f(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$f(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$f(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$h = {};
var updaterMap$h = {
  options(instance, options) {
    instance.setOptions(options);
  }
};
function TrafficLayerFunctional(_ref) {
  var {
    options,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    var trafficLayer = new google.maps.TrafficLayer(_objectSpread$f(_objectSpread$f({}, options), {}, {
      map
    }));
    setInstance(trafficLayer);
    if (onLoad) {
      onLoad(trafficLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
var TrafficLayerF = (0, import_react.memo)(TrafficLayerFunctional);
var TrafficLayer = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      trafficLayer: null
    });
    _defineProperty(this, "setTrafficLayerCallback", () => {
      if (this.state.trafficLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.trafficLayer);
      }
    });
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var trafficLayer = new google.maps.TrafficLayer(_objectSpread$f(_objectSpread$f({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$h,
      eventMap: eventMap$h,
      prevProps: {},
      nextProps: this.props,
      instance: trafficLayer
    });
    this.setState(function setTrafficLayer() {
      return {
        trafficLayer
      };
    }, this.setTrafficLayerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.trafficLayer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$h,
        eventMap: eventMap$h,
        prevProps,
        nextProps: this.props,
        instance: this.state.trafficLayer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.trafficLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.trafficLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.trafficLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(TrafficLayer, "contextType", MapContext);
function BicyclingLayerFunctional(_ref) {
  var {
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    var bicyclingLayer = new google.maps.BicyclingLayer();
    setInstance(bicyclingLayer);
    bicyclingLayer.setMap(map);
    if (onLoad) {
      onLoad(bicyclingLayer);
    }
    return () => {
      if (bicyclingLayer !== null) {
        if (onUnmount) {
          onUnmount(bicyclingLayer);
        }
        bicyclingLayer.setMap(null);
      }
    };
  }, []);
  return null;
}
var BicyclingLayerF = (0, import_react.memo)(BicyclingLayerFunctional);
var BicyclingLayer = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      bicyclingLayer: null
    });
    _defineProperty(this, "setBicyclingLayerCallback", () => {
      if (this.state.bicyclingLayer !== null) {
        this.state.bicyclingLayer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.bicyclingLayer);
        }
      }
    });
  }
  componentDidMount() {
    var bicyclingLayer = new google.maps.BicyclingLayer();
    this.setState(() => {
      return {
        bicyclingLayer
      };
    }, this.setBicyclingLayerCallback);
  }
  componentWillUnmount() {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.bicyclingLayer);
      }
      this.state.bicyclingLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(BicyclingLayer, "contextType", MapContext);
function TransitLayerFunctional(_ref) {
  var {
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    var transitLayer = new google.maps.TransitLayer();
    setInstance(transitLayer);
    transitLayer.setMap(map);
    if (onLoad) {
      onLoad(transitLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
var TransitLayerF = (0, import_react.memo)(TransitLayerFunctional);
var TransitLayer = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      transitLayer: null
    });
    _defineProperty(this, "setTransitLayerCallback", () => {
      if (this.state.transitLayer !== null) {
        this.state.transitLayer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.transitLayer);
        }
      }
    });
  }
  componentDidMount() {
    var transitLayer = new google.maps.TransitLayer();
    this.setState(function setTransitLayer() {
      return {
        transitLayer
      };
    }, this.setTransitLayerCallback);
  }
  componentWillUnmount() {
    if (this.state.transitLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.transitLayer);
      }
      this.state.transitLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(TransitLayer, "contextType", MapContext);
function ownKeys$e(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$e(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$e(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$g = {
  onCircleComplete: "circlecomplete",
  onMarkerComplete: "markercomplete",
  onOverlayComplete: "overlaycomplete",
  onPolygonComplete: "polygoncomplete",
  onPolylineComplete: "polylinecomplete",
  onRectangleComplete: "rectanglecomplete"
};
var updaterMap$g = {
  drawingMode(instance, drawingMode) {
    instance.setDrawingMode(drawingMode);
  },
  options(instance, options) {
    instance.setOptions(options);
  }
};
function DrawingManagerFunctional(_ref) {
  var {
    options,
    drawingMode,
    onCircleComplete,
    onMarkerComplete,
    onOverlayComplete,
    onPolygonComplete,
    onPolylineComplete,
    onRectangleComplete,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [circlecompleteListener, setCircleCompleteListener] = (0, import_react.useState)(null);
  var [markercompleteListener, setMarkerCompleteListener] = (0, import_react.useState)(null);
  var [overlaycompleteListener, setOverlayCompleteListener] = (0, import_react.useState)(null);
  var [polygoncompleteListener, setPolygonCompleteListener] = (0, import_react.useState)(null);
  var [polylinecompleteListener, setPolylineCompleteListener] = (0, import_react.useState)(null);
  var [rectanglecompleteListener, setRectangleCompleteListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setDrawingMode(drawingMode !== null && drawingMode !== void 0 ? drawingMode : null);
    }
  }, [instance, drawingMode]);
  (0, import_react.useEffect)(() => {
    if (instance && onCircleComplete) {
      if (circlecompleteListener !== null) {
        google.maps.event.removeListener(circlecompleteListener);
      }
      setCircleCompleteListener(google.maps.event.addListener(instance, "circlecomplete", onCircleComplete));
    }
  }, [instance, onCircleComplete]);
  (0, import_react.useEffect)(() => {
    if (instance && onMarkerComplete) {
      if (markercompleteListener !== null) {
        google.maps.event.removeListener(markercompleteListener);
      }
      setMarkerCompleteListener(google.maps.event.addListener(instance, "markercomplete", onMarkerComplete));
    }
  }, [instance, onMarkerComplete]);
  (0, import_react.useEffect)(() => {
    if (instance && onOverlayComplete) {
      if (overlaycompleteListener !== null) {
        google.maps.event.removeListener(overlaycompleteListener);
      }
      setOverlayCompleteListener(google.maps.event.addListener(instance, "overlaycomplete", onOverlayComplete));
    }
  }, [instance, onOverlayComplete]);
  (0, import_react.useEffect)(() => {
    if (instance && onPolygonComplete) {
      if (polygoncompleteListener !== null) {
        google.maps.event.removeListener(polygoncompleteListener);
      }
      setPolygonCompleteListener(google.maps.event.addListener(instance, "polygoncomplete", onPolygonComplete));
    }
  }, [instance, onPolygonComplete]);
  (0, import_react.useEffect)(() => {
    if (instance && onPolylineComplete) {
      if (polylinecompleteListener !== null) {
        google.maps.event.removeListener(polylinecompleteListener);
      }
      setPolylineCompleteListener(google.maps.event.addListener(instance, "polylinecomplete", onPolylineComplete));
    }
  }, [instance, onPolylineComplete]);
  (0, import_react.useEffect)(() => {
    if (instance && onRectangleComplete) {
      if (rectanglecompleteListener !== null) {
        google.maps.event.removeListener(rectanglecompleteListener);
      }
      setRectangleCompleteListener(google.maps.event.addListener(instance, "rectanglecomplete", onRectangleComplete));
    }
  }, [instance, onRectangleComplete]);
  (0, import_react.useEffect)(() => {
    invariant(!!google.maps.drawing, "Did you include prop libraries={['drawing']} in the URL? %s", google.maps.drawing);
    var drawingManager = new google.maps.drawing.DrawingManager(_objectSpread$e(_objectSpread$e({}, options), {}, {
      map
    }));
    if (drawingMode) {
      drawingManager.setDrawingMode(drawingMode);
    }
    if (onCircleComplete) {
      setCircleCompleteListener(google.maps.event.addListener(drawingManager, "circlecomplete", onCircleComplete));
    }
    if (onMarkerComplete) {
      setMarkerCompleteListener(google.maps.event.addListener(drawingManager, "markercomplete", onMarkerComplete));
    }
    if (onOverlayComplete) {
      setOverlayCompleteListener(google.maps.event.addListener(drawingManager, "overlaycomplete", onOverlayComplete));
    }
    if (onPolygonComplete) {
      setPolygonCompleteListener(google.maps.event.addListener(drawingManager, "polygoncomplete", onPolygonComplete));
    }
    if (onPolylineComplete) {
      setPolylineCompleteListener(google.maps.event.addListener(drawingManager, "polylinecomplete", onPolylineComplete));
    }
    if (onRectangleComplete) {
      setRectangleCompleteListener(google.maps.event.addListener(drawingManager, "rectanglecomplete", onRectangleComplete));
    }
    setInstance(drawingManager);
    if (onLoad) {
      onLoad(drawingManager);
    }
    return () => {
      if (instance !== null) {
        if (circlecompleteListener) {
          google.maps.event.removeListener(circlecompleteListener);
        }
        if (markercompleteListener) {
          google.maps.event.removeListener(markercompleteListener);
        }
        if (overlaycompleteListener) {
          google.maps.event.removeListener(overlaycompleteListener);
        }
        if (polygoncompleteListener) {
          google.maps.event.removeListener(polygoncompleteListener);
        }
        if (polylinecompleteListener) {
          google.maps.event.removeListener(polylinecompleteListener);
        }
        if (rectanglecompleteListener) {
          google.maps.event.removeListener(rectanglecompleteListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
var DrawingManagerF = (0, import_react.memo)(DrawingManagerFunctional);
var DrawingManager = class extends import_react.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      drawingManager: null
    });
    _defineProperty(this, "setDrawingManagerCallback", () => {
      if (this.state.drawingManager !== null && this.props.onLoad) {
        this.props.onLoad(this.state.drawingManager);
      }
    });
    invariant(!!google.maps.drawing, "Did you include prop libraries={['drawing']} in the URL? %s", google.maps.drawing);
  }
  componentDidMount() {
    var drawingManager = new google.maps.drawing.DrawingManager(_objectSpread$e(_objectSpread$e({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$g,
      eventMap: eventMap$g,
      prevProps: {},
      nextProps: this.props,
      instance: drawingManager
    });
    this.setState(function setDrawingManager() {
      return {
        drawingManager
      };
    }, this.setDrawingManagerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.drawingManager !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$g,
        eventMap: eventMap$g,
        prevProps,
        nextProps: this.props,
        instance: this.state.drawingManager
      });
    }
  }
  componentWillUnmount() {
    if (this.state.drawingManager !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.drawingManager);
      }
      unregisterEvents(this.registeredEvents);
      this.state.drawingManager.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(DrawingManager, "contextType", MapContext);
function ownKeys$d(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$d(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$d(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$f = {
  onAnimationChanged: "animation_changed",
  onClick: "click",
  onClickableChanged: "clickable_changed",
  onCursorChanged: "cursor_changed",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDraggableChanged: "draggable_changed",
  onDragStart: "dragstart",
  onFlatChanged: "flat_changed",
  onIconChanged: "icon_changed",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onPositionChanged: "position_changed",
  onRightClick: "rightclick",
  onShapeChanged: "shape_changed",
  onTitleChanged: "title_changed",
  onVisibleChanged: "visible_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$f = {
  animation(instance, animation) {
    instance.setAnimation(animation);
  },
  clickable(instance, clickable) {
    instance.setClickable(clickable);
  },
  cursor(instance, cursor) {
    instance.setCursor(cursor);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  icon(instance, icon) {
    instance.setIcon(icon);
  },
  label(instance, label) {
    instance.setLabel(label);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  opacity(instance, opacity) {
    instance.setOpacity(opacity);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position) {
    instance.setPosition(position);
  },
  shape(instance, shape) {
    instance.setShape(shape);
  },
  title(instance, title) {
    instance.setTitle(title);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
var defaultOptions$5 = {};
function MarkerFunctional(_ref) {
  var {
    position,
    options,
    clusterer,
    noClustererRedraw,
    children,
    draggable,
    visible,
    animation,
    clickable,
    cursor,
    icon,
    label,
    opacity,
    shape,
    title,
    zIndex,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onMouseDown,
    onRightClick,
    onClickableChanged,
    onCursorChanged,
    onAnimationChanged,
    onDraggableChanged,
    onFlatChanged,
    onIconChanged,
    onPositionChanged,
    onShapeChanged,
    onTitleChanged,
    onVisibleChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [dblclickListener, setDblclickListener] = (0, import_react.useState)(null);
  var [dragendListener, setDragendListener] = (0, import_react.useState)(null);
  var [dragstartListener, setDragstartListener] = (0, import_react.useState)(null);
  var [mousedownListener, setMousedownListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  var [mouseupListener, setMouseupListener] = (0, import_react.useState)(null);
  var [rightclickListener, setRightclickListener] = (0, import_react.useState)(null);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [dragListener, setDragListener] = (0, import_react.useState)(null);
  var [clickableChangedListener, setClickableChangedListener] = (0, import_react.useState)(null);
  var [cursorChangedListener, setCursorChangedListener] = (0, import_react.useState)(null);
  var [animationChangedListener, setAnimationChangedListener] = (0, import_react.useState)(null);
  var [draggableChangedListener, setDraggableChangedListener] = (0, import_react.useState)(null);
  var [flatChangedListener, setFlatChangedListener] = (0, import_react.useState)(null);
  var [iconChangedListener, setIconChangedListener] = (0, import_react.useState)(null);
  var [positionChangedListener, setPositionChangedListener] = (0, import_react.useState)(null);
  var [shapeChangedListener, setShapeChangedListener] = (0, import_react.useState)(null);
  var [titleChangedListener, setTitleChangedListener] = (0, import_react.useState)(null);
  var [visibleChangedListener, setVisibleChangedListener] = (0, import_react.useState)(null);
  var [zIndexChangedListener, setZindexChangedListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  (0, import_react.useEffect)(() => {
    if (position && instance !== null) {
      instance.setPosition(position);
    }
  }, [instance, position]);
  (0, import_react.useEffect)(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  (0, import_react.useEffect)(() => {
    instance === null || instance === void 0 || instance.setAnimation(animation);
  }, [instance, animation]);
  (0, import_react.useEffect)(() => {
    if (instance && clickable !== void 0) {
      instance.setClickable(clickable);
    }
  }, [instance, clickable]);
  (0, import_react.useEffect)(() => {
    if (instance && cursor !== void 0) {
      instance.setCursor(cursor);
    }
  }, [instance, cursor]);
  (0, import_react.useEffect)(() => {
    if (instance && icon !== void 0) {
      instance.setIcon(icon);
    }
  }, [instance, icon]);
  (0, import_react.useEffect)(() => {
    if (instance && label !== void 0) {
      instance.setLabel(label);
    }
  }, [instance, label]);
  (0, import_react.useEffect)(() => {
    if (instance && opacity !== void 0) {
      instance.setOpacity(opacity);
    }
  }, [instance, opacity]);
  (0, import_react.useEffect)(() => {
    if (instance && shape !== void 0) {
      instance.setShape(shape);
    }
  }, [instance, shape]);
  (0, import_react.useEffect)(() => {
    if (instance && title !== void 0) {
      instance.setTitle(title);
    }
  }, [instance, title]);
  (0, import_react.useEffect)(() => {
    if (instance && zIndex !== void 0) {
      instance.setZIndex(zIndex);
    }
  }, [instance, zIndex]);
  (0, import_react.useEffect)(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  (0, import_react.useEffect)(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  (0, import_react.useEffect)(() => {
    if (instance && onClickableChanged) {
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }
      setClickableChangedListener(google.maps.event.addListener(instance, "clickable_changed", onClickableChanged));
    }
  }, [onClickableChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onCursorChanged) {
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }
      setCursorChangedListener(google.maps.event.addListener(instance, "cursor_changed", onCursorChanged));
    }
  }, [onCursorChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onAnimationChanged) {
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }
      setAnimationChangedListener(google.maps.event.addListener(instance, "animation_changed", onAnimationChanged));
    }
  }, [onAnimationChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onDraggableChanged) {
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }
      setDraggableChangedListener(google.maps.event.addListener(instance, "draggable_changed", onDraggableChanged));
    }
  }, [onDraggableChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onFlatChanged) {
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }
      setFlatChangedListener(google.maps.event.addListener(instance, "flat_changed", onFlatChanged));
    }
  }, [onFlatChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onIconChanged) {
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }
      setIconChangedListener(google.maps.event.addListener(instance, "icon_changed", onIconChanged));
    }
  }, [onIconChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onPositionChanged) {
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }
      setPositionChangedListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onShapeChanged) {
      if (shapeChangedListener !== null) {
        google.maps.event.removeListener(shapeChangedListener);
      }
      setShapeChangedListener(google.maps.event.addListener(instance, "shape_changed", onShapeChanged));
    }
  }, [onShapeChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onTitleChanged) {
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }
      setTitleChangedListener(google.maps.event.addListener(instance, "title_changed", onTitleChanged));
    }
  }, [onTitleChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onVisibleChanged) {
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }
      setVisibleChangedListener(google.maps.event.addListener(instance, "visible_changed", onVisibleChanged));
    }
  }, [onVisibleChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }
      setZindexChangedListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  (0, import_react.useEffect)(() => {
    var markerOptions = _objectSpread$d(_objectSpread$d(_objectSpread$d({}, options || defaultOptions$5), clusterer ? defaultOptions$5 : {
      map
    }), {}, {
      position
    });
    var marker = new google.maps.Marker(markerOptions);
    if (clusterer) {
      clusterer.addMarker(marker, !!noClustererRedraw);
    } else {
      marker.setMap(map);
    }
    if (position) {
      marker.setPosition(position);
    }
    if (typeof visible !== "undefined") {
      marker.setVisible(visible);
    }
    if (typeof draggable !== "undefined") {
      marker.setDraggable(draggable);
    }
    if (typeof clickable !== "undefined") {
      marker.setClickable(clickable);
    }
    if (typeof cursor === "string") {
      marker.setCursor(cursor);
    }
    if (icon) {
      marker.setIcon(icon);
    }
    if (typeof label !== "undefined") {
      marker.setLabel(label);
    }
    if (typeof opacity !== "undefined") {
      marker.setOpacity(opacity);
    }
    if (shape) {
      marker.setShape(shape);
    }
    if (typeof title === "string") {
      marker.setTitle(title);
    }
    if (typeof zIndex === "number") {
      marker.setZIndex(zIndex);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(marker, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(marker, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(marker, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(marker, "mousedown", onMouseDown));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(marker, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(marker, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(marker, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(marker, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(marker, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(marker, "drag", onDrag));
    }
    if (onClickableChanged) {
      setClickableChangedListener(google.maps.event.addListener(marker, "clickable_changed", onClickableChanged));
    }
    if (onCursorChanged) {
      setCursorChangedListener(google.maps.event.addListener(marker, "cursor_changed", onCursorChanged));
    }
    if (onAnimationChanged) {
      setAnimationChangedListener(google.maps.event.addListener(marker, "animation_changed", onAnimationChanged));
    }
    if (onDraggableChanged) {
      setDraggableChangedListener(google.maps.event.addListener(marker, "draggable_changed", onDraggableChanged));
    }
    if (onFlatChanged) {
      setFlatChangedListener(google.maps.event.addListener(marker, "flat_changed", onFlatChanged));
    }
    if (onIconChanged) {
      setIconChangedListener(google.maps.event.addListener(marker, "icon_changed", onIconChanged));
    }
    if (onPositionChanged) {
      setPositionChangedListener(google.maps.event.addListener(marker, "position_changed", onPositionChanged));
    }
    if (onShapeChanged) {
      setShapeChangedListener(google.maps.event.addListener(marker, "shape_changed", onShapeChanged));
    }
    if (onTitleChanged) {
      setTitleChangedListener(google.maps.event.addListener(marker, "title_changed", onTitleChanged));
    }
    if (onVisibleChanged) {
      setVisibleChangedListener(google.maps.event.addListener(marker, "visible_changed", onVisibleChanged));
    }
    if (onZindexChanged) {
      setZindexChangedListener(google.maps.event.addListener(marker, "zindex_changed", onZindexChanged));
    }
    setInstance(marker);
    if (onLoad) {
      onLoad(marker);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }
      if (onUnmount) {
        onUnmount(marker);
      }
      if (clusterer) {
        clusterer.removeMarker(marker, !!noClustererRedraw);
      } else if (marker) {
        marker.setMap(null);
      }
    };
  }, []);
  var chx = (0, import_react.useMemo)(() => {
    return children ? import_react.Children.map(children, (child) => {
      if (!(0, import_react.isValidElement)(child)) {
        return child;
      }
      var elementChild = child;
      return (0, import_react.cloneElement)(elementChild, {
        anchor: instance
      });
    }) : null;
  }, [children, instance]);
  return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: chx
  }) || null;
}
var MarkerF = (0, import_react.memo)(MarkerFunctional);
var Marker = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var _this = this;
    return _asyncToGenerator(function* () {
      var markerOptions = _objectSpread$d(_objectSpread$d(_objectSpread$d({}, _this.props.options || defaultOptions$5), _this.props.clusterer ? defaultOptions$5 : {
        map: _this.context
      }), {}, {
        position: _this.props.position
      });
      _this.marker = new google.maps.Marker(markerOptions);
      if (_this.props.clusterer) {
        _this.props.clusterer.addMarker(_this.marker, !!_this.props.noClustererRedraw);
      } else {
        _this.marker.setMap(_this.context);
      }
      _this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$f,
        eventMap: eventMap$f,
        prevProps: {},
        nextProps: _this.props,
        instance: _this.marker
      });
      if (_this.props.onLoad) {
        _this.props.onLoad(_this.marker);
      }
    })();
  }
  componentDidUpdate(prevProps) {
    if (this.marker) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$f,
        eventMap: eventMap$f,
        prevProps,
        nextProps: this.props,
        instance: this.marker
      });
    }
  }
  componentWillUnmount() {
    if (!this.marker) {
      return;
    }
    if (this.props.onUnmount) {
      this.props.onUnmount(this.marker);
    }
    unregisterEvents(this.registeredEvents);
    if (this.props.clusterer) {
      this.props.clusterer.removeMarker(this.marker, !!this.props.noClustererRedraw);
    } else if (this.marker) {
      this.marker.setMap(null);
    }
  }
  render() {
    var children = this.props.children ? import_react.Children.map(this.props.children, (child) => {
      if (!(0, import_react.isValidElement)(child)) {
        return child;
      }
      var elementChild = child;
      return (0, import_react.cloneElement)(elementChild, {
        anchor: this.marker
      });
    }) : null;
    return children || null;
  }
};
_defineProperty(Marker, "contextType", MapContext);
var ClusterIcon = (
  /** @class */
  function() {
    function ClusterIcon2(cluster, styles) {
      cluster.getClusterer().extend(ClusterIcon2, google.maps.OverlayView);
      this.cluster = cluster;
      this.clusterClassName = this.cluster.getClusterer().getClusterClass();
      this.className = this.clusterClassName;
      this.styles = styles;
      this.center = void 0;
      this.div = null;
      this.sums = null;
      this.visible = false;
      this.boundsChangedListener = null;
      this.url = "";
      this.height = 0;
      this.width = 0;
      this.anchorText = [0, 0];
      this.anchorIcon = [0, 0];
      this.textColor = "black";
      this.textSize = 11;
      this.textDecoration = "none";
      this.fontWeight = "bold";
      this.fontStyle = "normal";
      this.fontFamily = "Arial,sans-serif";
      this.backgroundPosition = "0 0";
      this.cMouseDownInCluster = null;
      this.cDraggingMapByCluster = null;
      this.timeOut = null;
      this.setMap(cluster.getMap());
      this.onBoundsChanged = this.onBoundsChanged.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onMouseOver = this.onMouseOver.bind(this);
      this.onMouseOut = this.onMouseOut.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.draw = this.draw.bind(this);
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this.useStyle = this.useStyle.bind(this);
      this.setCenter = this.setCenter.bind(this);
      this.getPosFromLatLng = this.getPosFromLatLng.bind(this);
    }
    ClusterIcon2.prototype.onBoundsChanged = function() {
      this.cDraggingMapByCluster = this.cMouseDownInCluster;
    };
    ClusterIcon2.prototype.onMouseDown = function() {
      this.cMouseDownInCluster = true;
      this.cDraggingMapByCluster = false;
    };
    ClusterIcon2.prototype.onClick = function(event) {
      this.cMouseDownInCluster = false;
      if (!this.cDraggingMapByCluster) {
        var markerClusterer_1 = this.cluster.getClusterer();
        google.maps.event.trigger(markerClusterer_1, "click", this.cluster);
        google.maps.event.trigger(markerClusterer_1, "clusterclick", this.cluster);
        if (markerClusterer_1.getZoomOnClick()) {
          var maxZoom_1 = markerClusterer_1.getMaxZoom();
          var bounds_1 = this.cluster.getBounds();
          var map = markerClusterer_1.getMap();
          if (map !== null && "fitBounds" in map) {
            map.fitBounds(bounds_1);
          }
          this.timeOut = window.setTimeout(function() {
            var map2 = markerClusterer_1.getMap();
            if (map2 !== null) {
              if ("fitBounds" in map2) {
                map2.fitBounds(bounds_1);
              }
              var zoom = map2.getZoom() || 0;
              if (maxZoom_1 !== null && zoom > maxZoom_1) {
                map2.setZoom(maxZoom_1 + 1);
              }
            }
          }, 100);
        }
        event.cancelBubble = true;
        if (event.stopPropagation) {
          event.stopPropagation();
        }
      }
    };
    ClusterIcon2.prototype.onMouseOver = function() {
      google.maps.event.trigger(this.cluster.getClusterer(), "mouseover", this.cluster);
    };
    ClusterIcon2.prototype.onMouseOut = function() {
      google.maps.event.trigger(this.cluster.getClusterer(), "mouseout", this.cluster);
    };
    ClusterIcon2.prototype.onAdd = function() {
      var _a;
      this.div = document.createElement("div");
      this.div.className = this.className;
      if (this.visible) {
        this.show();
      }
      (_a = this.getPanes()) === null || _a === void 0 ? void 0 : _a.overlayMouseTarget.appendChild(this.div);
      var map = this.getMap();
      if (map !== null) {
        this.boundsChangedListener = google.maps.event.addListener(map, "bounds_changed", this.onBoundsChanged);
        this.div.addEventListener("mousedown", this.onMouseDown);
        this.div.addEventListener("click", this.onClick);
        this.div.addEventListener("mouseover", this.onMouseOver);
        this.div.addEventListener("mouseout", this.onMouseOut);
      }
    };
    ClusterIcon2.prototype.onRemove = function() {
      if (this.div && this.div.parentNode) {
        this.hide();
        if (this.boundsChangedListener !== null) {
          google.maps.event.removeListener(this.boundsChangedListener);
        }
        this.div.removeEventListener("mousedown", this.onMouseDown);
        this.div.removeEventListener("click", this.onClick);
        this.div.removeEventListener("mouseover", this.onMouseOver);
        this.div.removeEventListener("mouseout", this.onMouseOut);
        this.div.parentNode.removeChild(this.div);
        if (this.timeOut !== null) {
          window.clearTimeout(this.timeOut);
          this.timeOut = null;
        }
        this.div = null;
      }
    };
    ClusterIcon2.prototype.draw = function() {
      if (this.visible && this.div !== null && this.center) {
        var pos = this.getPosFromLatLng(this.center);
        this.div.style.top = pos !== null ? "".concat(pos.y, "px") : "0";
        this.div.style.left = pos !== null ? "".concat(pos.x, "px") : "0";
      }
    };
    ClusterIcon2.prototype.hide = function() {
      if (this.div) {
        this.div.style.display = "none";
      }
      this.visible = false;
    };
    ClusterIcon2.prototype.show = function() {
      var _a, _b, _c, _d, _e, _f;
      if (this.div && this.center) {
        var divTitle = this.sums === null || typeof this.sums.title === "undefined" || this.sums.title === "" ? this.cluster.getClusterer().getTitle() : this.sums.title;
        var bp = this.backgroundPosition.split(" ");
        var spriteH = parseInt(((_a = bp[0]) === null || _a === void 0 ? void 0 : _a.replace(/^\s+|\s+$/g, "")) || "0", 10);
        var spriteV = parseInt(((_b = bp[1]) === null || _b === void 0 ? void 0 : _b.replace(/^\s+|\s+$/g, "")) || "0", 10);
        var pos = this.getPosFromLatLng(this.center);
        this.div.className = this.className;
        this.div.setAttribute("style", "cursor: pointer; position: absolute; top: ".concat(pos !== null ? "".concat(pos.y, "px") : "0", "; left: ").concat(pos !== null ? "".concat(pos.x, "px") : "0", "; width: ").concat(this.width, "px; height: ").concat(this.height, "px; "));
        var img = document.createElement("img");
        img.alt = divTitle;
        img.src = this.url;
        img.width = this.width;
        img.height = this.height;
        img.setAttribute("style", "position: absolute; top: ".concat(spriteV, "px; left: ").concat(spriteH, "px"));
        if (!this.cluster.getClusterer().enableRetinaIcons) {
          img.style.clip = "rect(-".concat(spriteV, "px, -").concat(spriteH + this.width, "px, -").concat(spriteV + this.height, ", -").concat(spriteH, ")");
        }
        var textElm = document.createElement("div");
        textElm.setAttribute("style", "position: absolute; top: ".concat(this.anchorText[0], "px; left: ").concat(this.anchorText[1], "px; color: ").concat(this.textColor, "; font-size: ").concat(this.textSize, "px; font-family: ").concat(this.fontFamily, "; font-weight: ").concat(this.fontWeight, "; fontStyle: ").concat(this.fontStyle, "; text-decoration: ").concat(this.textDecoration, "; text-align: center; width: ").concat(this.width, "px; line-height: ").concat(this.height, "px"));
        if ((_c = this.sums) === null || _c === void 0 ? void 0 : _c.text) textElm.innerText = "".concat((_d = this.sums) === null || _d === void 0 ? void 0 : _d.text);
        if ((_e = this.sums) === null || _e === void 0 ? void 0 : _e.html) textElm.innerHTML = "".concat((_f = this.sums) === null || _f === void 0 ? void 0 : _f.html);
        this.div.innerHTML = "";
        this.div.appendChild(img);
        this.div.appendChild(textElm);
        this.div.title = divTitle;
        this.div.style.display = "";
      }
      this.visible = true;
    };
    ClusterIcon2.prototype.useStyle = function(sums) {
      this.sums = sums;
      var styles = this.cluster.getClusterer().getStyles();
      var style = styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))];
      if (style) {
        this.url = style.url;
        this.height = style.height;
        this.width = style.width;
        if (style.className) {
          this.className = "".concat(this.clusterClassName, " ").concat(style.className);
        }
        this.anchorText = style.anchorText || [0, 0];
        this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2];
        this.textColor = style.textColor || "black";
        this.textSize = style.textSize || 11;
        this.textDecoration = style.textDecoration || "none";
        this.fontWeight = style.fontWeight || "bold";
        this.fontStyle = style.fontStyle || "normal";
        this.fontFamily = style.fontFamily || "Arial,sans-serif";
        this.backgroundPosition = style.backgroundPosition || "0 0";
      }
    };
    ClusterIcon2.prototype.setCenter = function(center) {
      this.center = center;
    };
    ClusterIcon2.prototype.getPosFromLatLng = function(latlng) {
      var pos = this.getProjection().fromLatLngToDivPixel(latlng);
      if (pos !== null) {
        pos.x -= this.anchorIcon[1];
        pos.y -= this.anchorIcon[0];
      }
      return pos;
    };
    return ClusterIcon2;
  }()
);
var Cluster$1 = (
  /** @class */
  function() {
    function Cluster2(markerClusterer) {
      this.markerClusterer = markerClusterer;
      this.map = this.markerClusterer.getMap();
      this.gridSize = this.markerClusterer.getGridSize();
      this.minClusterSize = this.markerClusterer.getMinimumClusterSize();
      this.averageCenter = this.markerClusterer.getAverageCenter();
      this.markers = [];
      this.center = void 0;
      this.bounds = null;
      this.clusterIcon = new ClusterIcon(this, this.markerClusterer.getStyles());
      this.getSize = this.getSize.bind(this);
      this.getMarkers = this.getMarkers.bind(this);
      this.getCenter = this.getCenter.bind(this);
      this.getMap = this.getMap.bind(this);
      this.getClusterer = this.getClusterer.bind(this);
      this.getBounds = this.getBounds.bind(this);
      this.remove = this.remove.bind(this);
      this.addMarker = this.addMarker.bind(this);
      this.isMarkerInClusterBounds = this.isMarkerInClusterBounds.bind(this);
      this.calculateBounds = this.calculateBounds.bind(this);
      this.updateIcon = this.updateIcon.bind(this);
      this.isMarkerAlreadyAdded = this.isMarkerAlreadyAdded.bind(this);
    }
    Cluster2.prototype.getSize = function() {
      return this.markers.length;
    };
    Cluster2.prototype.getMarkers = function() {
      return this.markers;
    };
    Cluster2.prototype.getCenter = function() {
      return this.center;
    };
    Cluster2.prototype.getMap = function() {
      return this.map;
    };
    Cluster2.prototype.getClusterer = function() {
      return this.markerClusterer;
    };
    Cluster2.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds(this.center, this.center);
      var markers = this.getMarkers();
      for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
        var marker = markers_1[_i];
        var position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      }
      return bounds;
    };
    Cluster2.prototype.remove = function() {
      this.clusterIcon.setMap(null);
      this.markers = [];
      delete this.markers;
    };
    Cluster2.prototype.addMarker = function(marker) {
      var _a;
      if (this.isMarkerAlreadyAdded(marker)) {
        return false;
      }
      if (!this.center) {
        var position = marker.getPosition();
        if (position) {
          this.center = position;
          this.calculateBounds();
        }
      } else {
        if (this.averageCenter) {
          var position = marker.getPosition();
          if (position) {
            var length_1 = this.markers.length + 1;
            this.center = new google.maps.LatLng((this.center.lat() * (length_1 - 1) + position.lat()) / length_1, (this.center.lng() * (length_1 - 1) + position.lng()) / length_1);
            this.calculateBounds();
          }
        }
      }
      marker.isAdded = true;
      this.markers.push(marker);
      var mCount = this.markers.length;
      var maxZoom = this.markerClusterer.getMaxZoom();
      var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
      if (maxZoom !== null && typeof zoom !== "undefined" && zoom > maxZoom) {
        if (marker.getMap() !== this.map) {
          marker.setMap(this.map);
        }
      } else if (mCount < this.minClusterSize) {
        if (marker.getMap() !== this.map) {
          marker.setMap(this.map);
        }
      } else if (mCount === this.minClusterSize) {
        for (var _i = 0, _b = this.markers; _i < _b.length; _i++) {
          var markerElement = _b[_i];
          markerElement.setMap(null);
        }
      } else {
        marker.setMap(null);
      }
      return true;
    };
    Cluster2.prototype.isMarkerInClusterBounds = function(marker) {
      if (this.bounds !== null) {
        var position = marker.getPosition();
        if (position) {
          return this.bounds.contains(position);
        }
      }
      return false;
    };
    Cluster2.prototype.calculateBounds = function() {
      this.bounds = this.markerClusterer.getExtendedBounds(new google.maps.LatLngBounds(this.center, this.center));
    };
    Cluster2.prototype.updateIcon = function() {
      var _a;
      var mCount = this.markers.length;
      var maxZoom = this.markerClusterer.getMaxZoom();
      var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
      if (maxZoom !== null && typeof zoom !== "undefined" && zoom > maxZoom) {
        this.clusterIcon.hide();
        return;
      }
      if (mCount < this.minClusterSize) {
        this.clusterIcon.hide();
        return;
      }
      if (this.center) {
        this.clusterIcon.setCenter(this.center);
      }
      this.clusterIcon.useStyle(this.markerClusterer.getCalculator()(this.markers, this.markerClusterer.getStyles().length));
      this.clusterIcon.show();
    };
    Cluster2.prototype.isMarkerAlreadyAdded = function(marker) {
      if (this.markers.includes) {
        return this.markers.includes(marker);
      }
      for (var i = 0; i < this.markers.length; i++) {
        if (marker === this.markers[i]) {
          return true;
        }
      }
      return false;
    };
    return Cluster2;
  }()
);
function CALCULATOR(markers, numStyles) {
  var count = markers.length;
  var numberOfDigits = count.toString().length;
  var index = Math.min(numberOfDigits, numStyles);
  return {
    text: count.toString(),
    index,
    title: ""
  };
}
var BATCH_SIZE = 2e3;
var BATCH_SIZE_IE = 500;
var IMAGE_PATH = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
var IMAGE_EXTENSION = "png";
var IMAGE_SIZES = [53, 56, 66, 78, 90];
var CLUSTERER_CLASS = "cluster";
var Clusterer = (
  /** @class */
  function() {
    function Clusterer2(map, optMarkers, optOptions) {
      if (optMarkers === void 0) {
        optMarkers = [];
      }
      if (optOptions === void 0) {
        optOptions = {};
      }
      this.getMinimumClusterSize = this.getMinimumClusterSize.bind(this);
      this.setMinimumClusterSize = this.setMinimumClusterSize.bind(this);
      this.getEnableRetinaIcons = this.getEnableRetinaIcons.bind(this);
      this.setEnableRetinaIcons = this.setEnableRetinaIcons.bind(this);
      this.addToClosestCluster = this.addToClosestCluster.bind(this);
      this.getImageExtension = this.getImageExtension.bind(this);
      this.setImageExtension = this.setImageExtension.bind(this);
      this.getExtendedBounds = this.getExtendedBounds.bind(this);
      this.getAverageCenter = this.getAverageCenter.bind(this);
      this.setAverageCenter = this.setAverageCenter.bind(this);
      this.getTotalClusters = this.getTotalClusters.bind(this);
      this.fitMapToMarkers = this.fitMapToMarkers.bind(this);
      this.getIgnoreHidden = this.getIgnoreHidden.bind(this);
      this.setIgnoreHidden = this.setIgnoreHidden.bind(this);
      this.getClusterClass = this.getClusterClass.bind(this);
      this.setClusterClass = this.setClusterClass.bind(this);
      this.getTotalMarkers = this.getTotalMarkers.bind(this);
      this.getZoomOnClick = this.getZoomOnClick.bind(this);
      this.setZoomOnClick = this.setZoomOnClick.bind(this);
      this.getBatchSizeIE = this.getBatchSizeIE.bind(this);
      this.setBatchSizeIE = this.setBatchSizeIE.bind(this);
      this.createClusters = this.createClusters.bind(this);
      this.onZoomChanged = this.onZoomChanged.bind(this);
      this.getImageSizes = this.getImageSizes.bind(this);
      this.setImageSizes = this.setImageSizes.bind(this);
      this.getCalculator = this.getCalculator.bind(this);
      this.setCalculator = this.setCalculator.bind(this);
      this.removeMarkers = this.removeMarkers.bind(this);
      this.resetViewport = this.resetViewport.bind(this);
      this.getImagePath = this.getImagePath.bind(this);
      this.setImagePath = this.setImagePath.bind(this);
      this.pushMarkerTo = this.pushMarkerTo.bind(this);
      this.removeMarker = this.removeMarker.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.setupStyles = this.setupStyles.bind(this);
      this.getGridSize = this.getGridSize.bind(this);
      this.setGridSize = this.setGridSize.bind(this);
      this.getClusters = this.getClusters.bind(this);
      this.getMaxZoom = this.getMaxZoom.bind(this);
      this.setMaxZoom = this.setMaxZoom.bind(this);
      this.getMarkers = this.getMarkers.bind(this);
      this.addMarkers = this.addMarkers.bind(this);
      this.getStyles = this.getStyles.bind(this);
      this.setStyles = this.setStyles.bind(this);
      this.addMarker = this.addMarker.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.getTitle = this.getTitle.bind(this);
      this.setTitle = this.setTitle.bind(this);
      this.repaint = this.repaint.bind(this);
      this.onIdle = this.onIdle.bind(this);
      this.redraw = this.redraw.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.draw = this.draw.bind(this);
      this.extend = this.extend.bind(this);
      this.extend(Clusterer2, google.maps.OverlayView);
      this.markers = [];
      this.clusters = [];
      this.listeners = [];
      this.activeMap = null;
      this.ready = false;
      this.gridSize = optOptions.gridSize || 60;
      this.minClusterSize = optOptions.minimumClusterSize || 2;
      this.maxZoom = optOptions.maxZoom || null;
      this.styles = optOptions.styles || [];
      this.title = optOptions.title || "";
      this.zoomOnClick = true;
      if (optOptions.zoomOnClick !== void 0) {
        this.zoomOnClick = optOptions.zoomOnClick;
      }
      this.averageCenter = false;
      if (optOptions.averageCenter !== void 0) {
        this.averageCenter = optOptions.averageCenter;
      }
      this.ignoreHidden = false;
      if (optOptions.ignoreHidden !== void 0) {
        this.ignoreHidden = optOptions.ignoreHidden;
      }
      this.enableRetinaIcons = false;
      if (optOptions.enableRetinaIcons !== void 0) {
        this.enableRetinaIcons = optOptions.enableRetinaIcons;
      }
      this.imagePath = optOptions.imagePath || IMAGE_PATH;
      this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION;
      this.imageSizes = optOptions.imageSizes || IMAGE_SIZES;
      this.calculator = optOptions.calculator || CALCULATOR;
      this.batchSize = optOptions.batchSize || BATCH_SIZE;
      this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE;
      this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS;
      if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
        this.batchSize = this.batchSizeIE;
      }
      this.timerRefStatic = null;
      this.setupStyles();
      this.addMarkers(optMarkers, true);
      this.setMap(map);
    }
    Clusterer2.prototype.onZoomChanged = function() {
      var _a, _b;
      this.resetViewport(false);
      if (((_a = this.getMap()) === null || _a === void 0 ? void 0 : _a.getZoom()) === (this.get("minZoom") || 0) || ((_b = this.getMap()) === null || _b === void 0 ? void 0 : _b.getZoom()) === this.get("maxZoom")) {
        google.maps.event.trigger(this, "idle");
      }
    };
    Clusterer2.prototype.onIdle = function() {
      this.redraw();
    };
    Clusterer2.prototype.onAdd = function() {
      var map = this.getMap();
      this.activeMap = map;
      this.ready = true;
      this.repaint();
      if (map !== null) {
        this.listeners = [google.maps.event.addListener(map, "zoom_changed", this.onZoomChanged), google.maps.event.addListener(map, "idle", this.onIdle)];
      }
    };
    Clusterer2.prototype.onRemove = function() {
      for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
        var marker = _a[_i];
        if (marker.getMap() !== this.activeMap) {
          marker.setMap(this.activeMap);
        }
      }
      for (var _b = 0, _c = this.clusters; _b < _c.length; _b++) {
        var cluster = _c[_b];
        cluster.remove();
      }
      this.clusters = [];
      for (var _d = 0, _e = this.listeners; _d < _e.length; _d++) {
        var listener = _e[_d];
        google.maps.event.removeListener(listener);
      }
      this.listeners = [];
      this.activeMap = null;
      this.ready = false;
    };
    Clusterer2.prototype.draw = function() {
      return;
    };
    Clusterer2.prototype.getMap = function() {
      return null;
    };
    Clusterer2.prototype.getPanes = function() {
      return null;
    };
    Clusterer2.prototype.getProjection = function() {
      return {
        fromContainerPixelToLatLng: function fromContainerPixelToLatLng() {
          return null;
        },
        fromDivPixelToLatLng: function fromDivPixelToLatLng() {
          return null;
        },
        fromLatLngToContainerPixel: function fromLatLngToContainerPixel() {
          return null;
        },
        fromLatLngToDivPixel: function fromLatLngToDivPixel() {
          return null;
        },
        getVisibleRegion: function getVisibleRegion() {
          return null;
        },
        getWorldWidth: function getWorldWidth() {
          return 0;
        }
      };
    };
    Clusterer2.prototype.setMap = function() {
      return;
    };
    Clusterer2.prototype.addListener = function() {
      return {
        remove: function remove() {
          return;
        }
      };
    };
    Clusterer2.prototype.bindTo = function() {
      return;
    };
    Clusterer2.prototype.get = function() {
      return;
    };
    Clusterer2.prototype.notify = function() {
      return;
    };
    Clusterer2.prototype.set = function() {
      return;
    };
    Clusterer2.prototype.setValues = function() {
      return;
    };
    Clusterer2.prototype.unbind = function() {
      return;
    };
    Clusterer2.prototype.unbindAll = function() {
      return;
    };
    Clusterer2.prototype.setupStyles = function() {
      if (this.styles.length > 0) {
        return;
      }
      for (var i = 0; i < this.imageSizes.length; i++) {
        this.styles.push({
          url: "".concat(this.imagePath + (i + 1), ".").concat(this.imageExtension),
          height: this.imageSizes[i] || 0,
          width: this.imageSizes[i] || 0
        });
      }
    };
    Clusterer2.prototype.fitMapToMarkers = function() {
      var markers = this.getMarkers();
      var bounds = new google.maps.LatLngBounds();
      for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
        var marker = markers_1[_i];
        var position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      }
      var map = this.getMap();
      if (map !== null && "fitBounds" in map) {
        map.fitBounds(bounds);
      }
    };
    Clusterer2.prototype.getGridSize = function() {
      return this.gridSize;
    };
    Clusterer2.prototype.setGridSize = function(gridSize) {
      this.gridSize = gridSize;
    };
    Clusterer2.prototype.getMinimumClusterSize = function() {
      return this.minClusterSize;
    };
    Clusterer2.prototype.setMinimumClusterSize = function(minimumClusterSize) {
      this.minClusterSize = minimumClusterSize;
    };
    Clusterer2.prototype.getMaxZoom = function() {
      return this.maxZoom;
    };
    Clusterer2.prototype.setMaxZoom = function(maxZoom) {
      this.maxZoom = maxZoom;
    };
    Clusterer2.prototype.getStyles = function() {
      return this.styles;
    };
    Clusterer2.prototype.setStyles = function(styles) {
      this.styles = styles;
    };
    Clusterer2.prototype.getTitle = function() {
      return this.title;
    };
    Clusterer2.prototype.setTitle = function(title) {
      this.title = title;
    };
    Clusterer2.prototype.getZoomOnClick = function() {
      return this.zoomOnClick;
    };
    Clusterer2.prototype.setZoomOnClick = function(zoomOnClick) {
      this.zoomOnClick = zoomOnClick;
    };
    Clusterer2.prototype.getAverageCenter = function() {
      return this.averageCenter;
    };
    Clusterer2.prototype.setAverageCenter = function(averageCenter) {
      this.averageCenter = averageCenter;
    };
    Clusterer2.prototype.getIgnoreHidden = function() {
      return this.ignoreHidden;
    };
    Clusterer2.prototype.setIgnoreHidden = function(ignoreHidden) {
      this.ignoreHidden = ignoreHidden;
    };
    Clusterer2.prototype.getEnableRetinaIcons = function() {
      return this.enableRetinaIcons;
    };
    Clusterer2.prototype.setEnableRetinaIcons = function(enableRetinaIcons) {
      this.enableRetinaIcons = enableRetinaIcons;
    };
    Clusterer2.prototype.getImageExtension = function() {
      return this.imageExtension;
    };
    Clusterer2.prototype.setImageExtension = function(imageExtension) {
      this.imageExtension = imageExtension;
    };
    Clusterer2.prototype.getImagePath = function() {
      return this.imagePath;
    };
    Clusterer2.prototype.setImagePath = function(imagePath) {
      this.imagePath = imagePath;
    };
    Clusterer2.prototype.getImageSizes = function() {
      return this.imageSizes;
    };
    Clusterer2.prototype.setImageSizes = function(imageSizes) {
      this.imageSizes = imageSizes;
    };
    Clusterer2.prototype.getCalculator = function() {
      return this.calculator;
    };
    Clusterer2.prototype.setCalculator = function(calculator) {
      this.calculator = calculator;
    };
    Clusterer2.prototype.getBatchSizeIE = function() {
      return this.batchSizeIE;
    };
    Clusterer2.prototype.setBatchSizeIE = function(batchSizeIE) {
      this.batchSizeIE = batchSizeIE;
    };
    Clusterer2.prototype.getClusterClass = function() {
      return this.clusterClass;
    };
    Clusterer2.prototype.setClusterClass = function(clusterClass) {
      this.clusterClass = clusterClass;
    };
    Clusterer2.prototype.getMarkers = function() {
      return this.markers;
    };
    Clusterer2.prototype.getTotalMarkers = function() {
      return this.markers.length;
    };
    Clusterer2.prototype.getClusters = function() {
      return this.clusters;
    };
    Clusterer2.prototype.getTotalClusters = function() {
      return this.clusters.length;
    };
    Clusterer2.prototype.addMarker = function(marker, optNoDraw) {
      this.pushMarkerTo(marker);
      if (!optNoDraw) {
        this.redraw();
      }
    };
    Clusterer2.prototype.addMarkers = function(markers, optNoDraw) {
      for (var key in markers) {
        if (Object.prototype.hasOwnProperty.call(markers, key)) {
          var marker = markers[key];
          if (marker) {
            this.pushMarkerTo(marker);
          }
        }
      }
      if (!optNoDraw) {
        this.redraw();
      }
    };
    Clusterer2.prototype.pushMarkerTo = function(marker) {
      var _this = this;
      if (marker.getDraggable()) {
        google.maps.event.addListener(marker, "dragend", function() {
          if (_this.ready) {
            marker.isAdded = false;
            _this.repaint();
          }
        });
      }
      marker.isAdded = false;
      this.markers.push(marker);
    };
    Clusterer2.prototype.removeMarker_ = function(marker) {
      var index = -1;
      if (this.markers.indexOf) {
        index = this.markers.indexOf(marker);
      } else {
        for (var i = 0; i < this.markers.length; i++) {
          if (marker === this.markers[i]) {
            index = i;
            break;
          }
        }
      }
      if (index === -1) {
        return false;
      }
      marker.setMap(null);
      this.markers.splice(index, 1);
      return true;
    };
    Clusterer2.prototype.removeMarker = function(marker, optNoDraw) {
      var removed = this.removeMarker_(marker);
      if (!optNoDraw && removed) {
        this.repaint();
      }
      return removed;
    };
    Clusterer2.prototype.removeMarkers = function(markers, optNoDraw) {
      var removed = false;
      for (var _i = 0, markers_2 = markers; _i < markers_2.length; _i++) {
        var marker = markers_2[_i];
        removed = removed || this.removeMarker_(marker);
      }
      if (!optNoDraw && removed) {
        this.repaint();
      }
      return removed;
    };
    Clusterer2.prototype.clearMarkers = function() {
      this.resetViewport(true);
      this.markers = [];
    };
    Clusterer2.prototype.repaint = function() {
      var oldClusters = this.clusters.slice();
      this.clusters = [];
      this.resetViewport(false);
      this.redraw();
      setTimeout(function timeout() {
        for (var _i = 0, oldClusters_1 = oldClusters; _i < oldClusters_1.length; _i++) {
          var oldCluster = oldClusters_1[_i];
          oldCluster.remove();
        }
      }, 0);
    };
    Clusterer2.prototype.getExtendedBounds = function(bounds) {
      var projection = this.getProjection();
      var trPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng())
      );
      if (trPix !== null) {
        trPix.x += this.gridSize;
        trPix.y -= this.gridSize;
      }
      var blPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng())
      );
      if (blPix !== null) {
        blPix.x -= this.gridSize;
        blPix.y += this.gridSize;
      }
      if (trPix !== null) {
        var point1 = projection.fromDivPixelToLatLng(trPix);
        if (point1 !== null) {
          bounds.extend(point1);
        }
      }
      if (blPix !== null) {
        var point2 = projection.fromDivPixelToLatLng(blPix);
        if (point2 !== null) {
          bounds.extend(point2);
        }
      }
      return bounds;
    };
    Clusterer2.prototype.redraw = function() {
      this.createClusters(0);
    };
    Clusterer2.prototype.resetViewport = function(optHide) {
      for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
        var cluster = _a[_i];
        cluster.remove();
      }
      this.clusters = [];
      for (var _b = 0, _c = this.markers; _b < _c.length; _b++) {
        var marker = _c[_b];
        marker.isAdded = false;
        if (optHide) {
          marker.setMap(null);
        }
      }
    };
    Clusterer2.prototype.distanceBetweenPoints = function(p1, p2) {
      var R = 6371;
      var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
      var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };
    Clusterer2.prototype.isMarkerInBounds = function(marker, bounds) {
      var position = marker.getPosition();
      if (position) {
        return bounds.contains(position);
      }
      return false;
    };
    Clusterer2.prototype.addToClosestCluster = function(marker) {
      var cluster;
      var distance = 4e4;
      var clusterToAddTo = null;
      for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
        var clusterElement = _a[_i];
        cluster = clusterElement;
        var center = cluster.getCenter();
        var position = marker.getPosition();
        if (center && position) {
          var d = this.distanceBetweenPoints(center, position);
          if (d < distance) {
            distance = d;
            clusterToAddTo = cluster;
          }
        }
      }
      if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
      } else {
        cluster = new Cluster$1(this);
        cluster.addMarker(marker);
        this.clusters.push(cluster);
      }
    };
    Clusterer2.prototype.createClusters = function(iFirst) {
      var _this = this;
      if (!this.ready) {
        return;
      }
      if (iFirst === 0) {
        google.maps.event.trigger(this, "clusteringbegin", this);
        if (this.timerRefStatic !== null) {
          window.clearTimeout(this.timerRefStatic);
          delete this.timerRefStatic;
        }
      }
      var map = this.getMap();
      var bounds = map !== null && "getBounds" in map ? map.getBounds() : null;
      var zoom = (map === null || map === void 0 ? void 0 : map.getZoom()) || 0;
      var mapBounds = zoom > 3 ? new google.maps.LatLngBounds(bounds === null || bounds === void 0 ? void 0 : bounds.getSouthWest(), bounds === null || bounds === void 0 ? void 0 : bounds.getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
      var extendedMapBounds = this.getExtendedBounds(mapBounds);
      var iLast = Math.min(iFirst + this.batchSize, this.markers.length);
      for (var i = iFirst; i < iLast; i++) {
        var marker = this.markers[i];
        if (marker && !marker.isAdded && this.isMarkerInBounds(marker, extendedMapBounds) && (!this.ignoreHidden || this.ignoreHidden && marker.getVisible())) {
          this.addToClosestCluster(marker);
        }
      }
      if (iLast < this.markers.length) {
        this.timerRefStatic = window.setTimeout(function() {
          _this.createClusters(iLast);
        }, 0);
      } else {
        this.timerRefStatic = null;
        google.maps.event.trigger(this, "clusteringend", this);
        for (var _i = 0, _a = this.clusters; _i < _a.length; _i++) {
          var cluster = _a[_i];
          cluster.updateIcon();
        }
      }
    };
    Clusterer2.prototype.extend = function(obj1, obj2) {
      return (function applyExtend(object) {
        for (var property in object.prototype) {
          var prop = property;
          this.prototype[prop] = object.prototype[prop];
        }
        return this;
      }).apply(obj1, [obj2]);
    };
    return Clusterer2;
  }()
);
function ownKeys$c(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$c(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$c(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$e = {
  onClick: "click",
  onClusteringBegin: "clusteringbegin",
  onClusteringEnd: "clusteringend",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover"
};
var updaterMap$e = {
  averageCenter(instance, averageCenter) {
    instance.setAverageCenter(averageCenter);
  },
  batchSizeIE(instance, batchSizeIE) {
    instance.setBatchSizeIE(batchSizeIE);
  },
  calculator(instance, calculator) {
    instance.setCalculator(calculator);
  },
  clusterClass(instance, clusterClass) {
    instance.setClusterClass(clusterClass);
  },
  enableRetinaIcons(instance, enableRetinaIcons) {
    instance.setEnableRetinaIcons(enableRetinaIcons);
  },
  gridSize(instance, gridSize) {
    instance.setGridSize(gridSize);
  },
  ignoreHidden(instance, ignoreHidden) {
    instance.setIgnoreHidden(ignoreHidden);
  },
  imageExtension(instance, imageExtension) {
    instance.setImageExtension(imageExtension);
  },
  imagePath(instance, imagePath) {
    instance.setImagePath(imagePath);
  },
  imageSizes(instance, imageSizes) {
    instance.setImageSizes(imageSizes);
  },
  maxZoom(instance, maxZoom) {
    instance.setMaxZoom(maxZoom);
  },
  minimumClusterSize(instance, minimumClusterSize) {
    instance.setMinimumClusterSize(minimumClusterSize);
  },
  styles(instance, styles) {
    instance.setStyles(styles);
  },
  title(instance, title) {
    instance.setTitle(title);
  },
  zoomOnClick(instance, zoomOnClick) {
    instance.setZoomOnClick(zoomOnClick);
  }
};
var defaultOptions$4 = {};
function MarkerClustererFunctional(props) {
  var {
    children,
    options,
    averageCenter,
    batchSizeIE,
    calculator,
    clusterClass,
    enableRetinaIcons,
    gridSize,
    ignoreHidden,
    imageExtension,
    imagePath,
    imageSizes,
    maxZoom,
    minimumClusterSize,
    styles,
    title,
    zoomOnClick,
    onClick,
    onClusteringBegin,
    onClusteringEnd,
    onMouseOver,
    onMouseOut,
    onLoad,
    onUnmount
  } = props;
  var [instance, setInstance] = (0, import_react.useState)(null);
  var map = (0, import_react.useContext)(MapContext);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [clusteringBeginListener, setClusteringBeginListener] = (0, import_react.useState)(null);
  var [clusteringEndListener, setClusteringEndListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, eventMap$e.onMouseOut, onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, eventMap$e.onMouseOver, onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, eventMap$e.onClick, onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onClusteringBegin) {
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }
      setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringBegin, onClusteringBegin));
    }
  }, [onClusteringBegin]);
  (0, import_react.useEffect)(() => {
    if (instance && onClusteringEnd) {
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }
      setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringEnd, onClusteringEnd));
    }
  }, [onClusteringEnd]);
  (0, import_react.useEffect)(() => {
    if (typeof averageCenter !== "undefined" && instance !== null) {
      updaterMap$e.averageCenter(instance, averageCenter);
    }
  }, [instance, averageCenter]);
  (0, import_react.useEffect)(() => {
    if (typeof batchSizeIE !== "undefined" && instance !== null) {
      updaterMap$e.batchSizeIE(instance, batchSizeIE);
    }
  }, [instance, batchSizeIE]);
  (0, import_react.useEffect)(() => {
    if (typeof calculator !== "undefined" && instance !== null) {
      updaterMap$e.calculator(instance, calculator);
    }
  }, [instance, calculator]);
  (0, import_react.useEffect)(() => {
    if (typeof clusterClass !== "undefined" && instance !== null) {
      updaterMap$e.clusterClass(instance, clusterClass);
    }
  }, [instance, clusterClass]);
  (0, import_react.useEffect)(() => {
    if (typeof enableRetinaIcons !== "undefined" && instance !== null) {
      updaterMap$e.enableRetinaIcons(instance, enableRetinaIcons);
    }
  }, [instance, enableRetinaIcons]);
  (0, import_react.useEffect)(() => {
    if (typeof gridSize !== "undefined" && instance !== null) {
      updaterMap$e.gridSize(instance, gridSize);
    }
  }, [instance, gridSize]);
  (0, import_react.useEffect)(() => {
    if (typeof ignoreHidden !== "undefined" && instance !== null) {
      updaterMap$e.ignoreHidden(instance, ignoreHidden);
    }
  }, [instance, ignoreHidden]);
  (0, import_react.useEffect)(() => {
    if (typeof imageExtension !== "undefined" && instance !== null) {
      updaterMap$e.imageExtension(instance, imageExtension);
    }
  }, [instance, imageExtension]);
  (0, import_react.useEffect)(() => {
    if (typeof imagePath !== "undefined" && instance !== null) {
      updaterMap$e.imagePath(instance, imagePath);
    }
  }, [instance, imagePath]);
  (0, import_react.useEffect)(() => {
    if (typeof imageSizes !== "undefined" && instance !== null) {
      updaterMap$e.imageSizes(instance, imageSizes);
    }
  }, [instance, imageSizes]);
  (0, import_react.useEffect)(() => {
    if (typeof maxZoom !== "undefined" && instance !== null) {
      updaterMap$e.maxZoom(instance, maxZoom);
    }
  }, [instance, maxZoom]);
  (0, import_react.useEffect)(() => {
    if (typeof minimumClusterSize !== "undefined" && instance !== null) {
      updaterMap$e.minimumClusterSize(instance, minimumClusterSize);
    }
  }, [instance, minimumClusterSize]);
  (0, import_react.useEffect)(() => {
    if (typeof styles !== "undefined" && instance !== null) {
      updaterMap$e.styles(instance, styles);
    }
  }, [instance, styles]);
  (0, import_react.useEffect)(() => {
    if (typeof title !== "undefined" && instance !== null) {
      updaterMap$e.title(instance, title);
    }
  }, [instance, title]);
  (0, import_react.useEffect)(() => {
    if (typeof zoomOnClick !== "undefined" && instance !== null) {
      updaterMap$e.zoomOnClick(instance, zoomOnClick);
    }
  }, [instance, zoomOnClick]);
  (0, import_react.useEffect)(() => {
    if (!map) return;
    var clustererOptions = _objectSpread$c({}, options || defaultOptions$4);
    var clusterer = new Clusterer(map, [], clustererOptions);
    if (averageCenter) {
      updaterMap$e.averageCenter(clusterer, averageCenter);
    }
    if (batchSizeIE) {
      updaterMap$e.batchSizeIE(clusterer, batchSizeIE);
    }
    if (calculator) {
      updaterMap$e.calculator(clusterer, calculator);
    }
    if (clusterClass) {
      updaterMap$e.clusterClass(clusterer, clusterClass);
    }
    if (enableRetinaIcons) {
      updaterMap$e.enableRetinaIcons(clusterer, enableRetinaIcons);
    }
    if (gridSize) {
      updaterMap$e.gridSize(clusterer, gridSize);
    }
    if (ignoreHidden) {
      updaterMap$e.ignoreHidden(clusterer, ignoreHidden);
    }
    if (imageExtension) {
      updaterMap$e.imageExtension(clusterer, imageExtension);
    }
    if (imagePath) {
      updaterMap$e.imagePath(clusterer, imagePath);
    }
    if (imageSizes) {
      updaterMap$e.imageSizes(clusterer, imageSizes);
    }
    if (maxZoom) {
      updaterMap$e.maxZoom(clusterer, maxZoom);
    }
    if (minimumClusterSize) {
      updaterMap$e.minimumClusterSize(clusterer, minimumClusterSize);
    }
    if (styles) {
      updaterMap$e.styles(clusterer, styles);
    }
    if (title) {
      updaterMap$e.title(clusterer, title);
    }
    if (zoomOnClick) {
      updaterMap$e.zoomOnClick(clusterer, zoomOnClick);
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOut, onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOver, onMouseOver));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(clusterer, eventMap$e.onClick, onClick));
    }
    if (onClusteringBegin) {
      setClusteringBeginListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringBegin, onClusteringBegin));
    }
    if (onClusteringEnd) {
      setClusteringEndListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringEnd, onClusteringEnd));
    }
    setInstance(clusterer);
    if (onLoad) {
      onLoad(clusterer);
    }
    return () => {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }
      if (onUnmount) {
        onUnmount(clusterer);
      }
    };
  }, []);
  return instance !== null ? children(instance) || null : null;
}
var MarkerClustererF = (0, import_react.memo)(MarkerClustererFunctional);
var ClustererComponent = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      markerClusterer: null
    });
    _defineProperty(this, "setClustererCallback", () => {
      if (this.state.markerClusterer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.markerClusterer);
      }
    });
  }
  componentDidMount() {
    if (this.context) {
      var markerClusterer = new Clusterer(this.context, [], this.props.options);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$e,
        eventMap: eventMap$e,
        prevProps: {},
        nextProps: this.props,
        instance: markerClusterer
      });
      this.setState(() => {
        return {
          markerClusterer
        };
      }, this.setClustererCallback);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.markerClusterer) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$e,
        eventMap: eventMap$e,
        prevProps,
        nextProps: this.props,
        instance: this.state.markerClusterer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.markerClusterer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.markerClusterer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.markerClusterer.setMap(null);
    }
  }
  render() {
    return this.state.markerClusterer !== null ? this.props.children(this.state.markerClusterer) : null;
  }
};
_defineProperty(ClustererComponent, "contextType", MapContext);
function cancelHandler(event) {
  event.cancelBubble = true;
  if (event.stopPropagation) {
    event.stopPropagation();
  }
}
var InfoBox = (
  /** @class */
  function() {
    function InfoBox2(options) {
      if (options === void 0) {
        options = {};
      }
      this.getCloseClickHandler = this.getCloseClickHandler.bind(this);
      this.closeClickHandler = this.closeClickHandler.bind(this);
      this.createInfoBoxDiv = this.createInfoBoxDiv.bind(this);
      this.addClickHandler = this.addClickHandler.bind(this);
      this.getCloseBoxImg = this.getCloseBoxImg.bind(this);
      this.getBoxWidths = this.getBoxWidths.bind(this);
      this.setBoxStyle = this.setBoxStyle.bind(this);
      this.setPosition = this.setPosition.bind(this);
      this.getPosition = this.getPosition.bind(this);
      this.setOptions = this.setOptions.bind(this);
      this.setContent = this.setContent.bind(this);
      this.setVisible = this.setVisible.bind(this);
      this.getContent = this.getContent.bind(this);
      this.getVisible = this.getVisible.bind(this);
      this.setZIndex = this.setZIndex.bind(this);
      this.getZIndex = this.getZIndex.bind(this);
      this.onRemove = this.onRemove.bind(this);
      this.panBox = this.panBox.bind(this);
      this.extend = this.extend.bind(this);
      this.close = this.close.bind(this);
      this.draw = this.draw.bind(this);
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.open = this.open.bind(this);
      this.extend(InfoBox2, google.maps.OverlayView);
      this.content = options.content || "";
      this.disableAutoPan = options.disableAutoPan || false;
      this.maxWidth = options.maxWidth || 0;
      this.pixelOffset = options.pixelOffset || new google.maps.Size(0, 0);
      this.position = options.position || new google.maps.LatLng(0, 0);
      this.zIndex = options.zIndex || null;
      this.boxClass = options.boxClass || "infoBox";
      this.boxStyle = options.boxStyle || {};
      this.closeBoxMargin = options.closeBoxMargin || "2px";
      this.closeBoxURL = options.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
      if (options.closeBoxURL === "") {
        this.closeBoxURL = "";
      }
      this.infoBoxClearance = options.infoBoxClearance || new google.maps.Size(1, 1);
      if (typeof options.visible === "undefined") {
        if (typeof options.isHidden === "undefined") {
          options.visible = true;
        } else {
          options.visible = !options.isHidden;
        }
      }
      this.isHidden = !options.visible;
      this.alignBottom = options.alignBottom || false;
      this.pane = options.pane || "floatPane";
      this.enableEventPropagation = options.enableEventPropagation || false;
      this.div = null;
      this.closeListener = null;
      this.moveListener = null;
      this.mapListener = null;
      this.contextListener = null;
      this.eventListeners = null;
      this.fixedWidthSet = null;
    }
    InfoBox2.prototype.createInfoBoxDiv = function() {
      var _this = this;
      var ignoreHandler = function ignoreHandler2(event) {
        event.returnValue = false;
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (!_this.enableEventPropagation) {
          cancelHandler(event);
        }
      };
      if (!this.div) {
        this.div = document.createElement("div");
        this.setBoxStyle();
        if (typeof this.content === "string") {
          this.div.innerHTML = this.getCloseBoxImg() + this.content;
        } else {
          this.div.innerHTML = this.getCloseBoxImg();
          this.div.appendChild(this.content);
        }
        var panes = this.getPanes();
        if (panes !== null) {
          panes[this.pane].appendChild(this.div);
        }
        this.addClickHandler();
        if (this.div.style.width) {
          this.fixedWidthSet = true;
        } else {
          if (this.maxWidth !== 0 && this.div.offsetWidth > this.maxWidth) {
            this.div.style.width = this.maxWidth + "px";
            this.fixedWidthSet = true;
          } else {
            var bw = this.getBoxWidths();
            this.div.style.width = this.div.offsetWidth - bw.left - bw.right + "px";
            this.fixedWidthSet = false;
          }
        }
        this.panBox(this.disableAutoPan);
        if (!this.enableEventPropagation) {
          this.eventListeners = [];
          var events = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"];
          for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            this.eventListeners.push(google.maps.event.addListener(this.div, event_1, cancelHandler));
          }
          this.eventListeners.push(google.maps.event.addListener(this.div, "mouseover", function() {
            if (_this.div) {
              _this.div.style.cursor = "default";
            }
          }));
        }
        this.contextListener = google.maps.event.addListener(this.div, "contextmenu", ignoreHandler);
        google.maps.event.trigger(this, "domready");
      }
    };
    InfoBox2.prototype.getCloseBoxImg = function() {
      var img = "";
      if (this.closeBoxURL !== "") {
        img = '<img alt=""';
        img += ' aria-hidden="true"';
        img += " src='" + this.closeBoxURL + "'";
        img += " align=right";
        img += " style='";
        img += " position: relative;";
        img += " cursor: pointer;";
        img += " margin: " + this.closeBoxMargin + ";";
        img += "'>";
      }
      return img;
    };
    InfoBox2.prototype.addClickHandler = function() {
      this.closeListener = this.div && this.div.firstChild && this.closeBoxURL !== "" ? google.maps.event.addListener(this.div.firstChild, "click", this.getCloseClickHandler()) : null;
    };
    InfoBox2.prototype.closeClickHandler = function(event) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      google.maps.event.trigger(this, "closeclick");
      this.close();
    };
    InfoBox2.prototype.getCloseClickHandler = function() {
      return this.closeClickHandler;
    };
    InfoBox2.prototype.panBox = function(disablePan) {
      if (this.div && !disablePan) {
        var map = this.getMap();
        if (map instanceof google.maps.Map) {
          var xOffset = 0;
          var yOffset = 0;
          var bounds = map.getBounds();
          if (bounds && !bounds.contains(this.position)) {
            map.setCenter(this.position);
          }
          var mapDiv = map.getDiv();
          var mapWidth = mapDiv.offsetWidth;
          var mapHeight = mapDiv.offsetHeight;
          var iwOffsetX = this.pixelOffset.width;
          var iwOffsetY = this.pixelOffset.height;
          var iwWidth = this.div.offsetWidth;
          var iwHeight = this.div.offsetHeight;
          var padX = this.infoBoxClearance.width;
          var padY = this.infoBoxClearance.height;
          var projection = this.getProjection();
          var pixPosition = projection.fromLatLngToContainerPixel(this.position);
          if (pixPosition !== null) {
            if (pixPosition.x < -iwOffsetX + padX) {
              xOffset = pixPosition.x + iwOffsetX - padX;
            } else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
              xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
            }
            if (this.alignBottom) {
              if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
                yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
              } else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
                yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
              }
            } else {
              if (pixPosition.y < -iwOffsetY + padY) {
                yOffset = pixPosition.y + iwOffsetY - padY;
              } else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
                yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
              }
            }
          }
          if (!(xOffset === 0 && yOffset === 0)) {
            map.panBy(xOffset, yOffset);
          }
        }
      }
    };
    InfoBox2.prototype.setBoxStyle = function() {
      if (this.div) {
        this.div.className = this.boxClass;
        this.div.style.cssText = "";
        var boxStyle = this.boxStyle;
        for (var i in boxStyle) {
          if (Object.prototype.hasOwnProperty.call(boxStyle, i)) {
            this.div.style[i] = boxStyle[i];
          }
        }
        this.div.style.webkitTransform = "translateZ(0)";
        if (typeof this.div.style.opacity !== "undefined" && this.div.style.opacity !== "") {
          var opacity = parseFloat(this.div.style.opacity || "");
          this.div.style.msFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')"';
          this.div.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }
        this.div.style.position = "absolute";
        this.div.style.visibility = "hidden";
        if (this.zIndex !== null) {
          this.div.style.zIndex = this.zIndex + "";
        }
        if (!this.div.style.overflow) {
          this.div.style.overflow = "auto";
        }
      }
    };
    InfoBox2.prototype.getBoxWidths = function() {
      var bw = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
      if (!this.div) {
        return bw;
      }
      if (document.defaultView) {
        var ownerDocument = this.div.ownerDocument;
        var computedStyle = ownerDocument && ownerDocument.defaultView ? ownerDocument.defaultView.getComputedStyle(this.div, "") : null;
        if (computedStyle) {
          bw.top = parseInt(computedStyle.borderTopWidth || "", 10) || 0;
          bw.bottom = parseInt(computedStyle.borderBottomWidth || "", 10) || 0;
          bw.left = parseInt(computedStyle.borderLeftWidth || "", 10) || 0;
          bw.right = parseInt(computedStyle.borderRightWidth || "", 10) || 0;
        }
      } else if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.documentElement.currentStyle
      ) {
        var currentStyle = this.div.currentStyle;
        if (currentStyle) {
          bw.top = parseInt(currentStyle.borderTopWidth || "", 10) || 0;
          bw.bottom = parseInt(currentStyle.borderBottomWidth || "", 10) || 0;
          bw.left = parseInt(currentStyle.borderLeftWidth || "", 10) || 0;
          bw.right = parseInt(currentStyle.borderRightWidth || "", 10) || 0;
        }
      }
      return bw;
    };
    InfoBox2.prototype.onRemove = function() {
      if (this.div && this.div.parentNode) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    };
    InfoBox2.prototype.draw = function() {
      this.createInfoBoxDiv();
      if (this.div) {
        var projection = this.getProjection();
        var pixPosition = projection.fromLatLngToDivPixel(this.position);
        if (pixPosition !== null) {
          this.div.style.left = pixPosition.x + this.pixelOffset.width + "px";
          if (this.alignBottom) {
            this.div.style.bottom = -(pixPosition.y + this.pixelOffset.height) + "px";
          } else {
            this.div.style.top = pixPosition.y + this.pixelOffset.height + "px";
          }
        }
        if (this.isHidden) {
          this.div.style.visibility = "hidden";
        } else {
          this.div.style.visibility = "visible";
        }
      }
    };
    InfoBox2.prototype.setOptions = function(options) {
      if (options === void 0) {
        options = {};
      }
      if (typeof options.boxClass !== "undefined") {
        this.boxClass = options.boxClass;
        this.setBoxStyle();
      }
      if (typeof options.boxStyle !== "undefined") {
        this.boxStyle = options.boxStyle;
        this.setBoxStyle();
      }
      if (typeof options.content !== "undefined") {
        this.setContent(options.content);
      }
      if (typeof options.disableAutoPan !== "undefined") {
        this.disableAutoPan = options.disableAutoPan;
      }
      if (typeof options.maxWidth !== "undefined") {
        this.maxWidth = options.maxWidth;
      }
      if (typeof options.pixelOffset !== "undefined") {
        this.pixelOffset = options.pixelOffset;
      }
      if (typeof options.alignBottom !== "undefined") {
        this.alignBottom = options.alignBottom;
      }
      if (typeof options.position !== "undefined") {
        this.setPosition(options.position);
      }
      if (typeof options.zIndex !== "undefined") {
        this.setZIndex(options.zIndex);
      }
      if (typeof options.closeBoxMargin !== "undefined") {
        this.closeBoxMargin = options.closeBoxMargin;
      }
      if (typeof options.closeBoxURL !== "undefined") {
        this.closeBoxURL = options.closeBoxURL;
      }
      if (typeof options.infoBoxClearance !== "undefined") {
        this.infoBoxClearance = options.infoBoxClearance;
      }
      if (typeof options.isHidden !== "undefined") {
        this.isHidden = options.isHidden;
      }
      if (typeof options.visible !== "undefined") {
        this.isHidden = !options.visible;
      }
      if (typeof options.enableEventPropagation !== "undefined") {
        this.enableEventPropagation = options.enableEventPropagation;
      }
      if (this.div) {
        this.draw();
      }
    };
    InfoBox2.prototype.setContent = function(content) {
      this.content = content;
      if (this.div) {
        if (this.closeListener) {
          google.maps.event.removeListener(this.closeListener);
          this.closeListener = null;
        }
        if (!this.fixedWidthSet) {
          this.div.style.width = "";
        }
        if (typeof content === "string") {
          this.div.innerHTML = this.getCloseBoxImg() + content;
        } else {
          this.div.innerHTML = this.getCloseBoxImg();
          this.div.appendChild(content);
        }
        if (!this.fixedWidthSet) {
          this.div.style.width = this.div.offsetWidth + "px";
          if (typeof content === "string") {
            this.div.innerHTML = this.getCloseBoxImg() + content;
          } else {
            this.div.innerHTML = this.getCloseBoxImg();
            this.div.appendChild(content);
          }
        }
        this.addClickHandler();
      }
      google.maps.event.trigger(this, "content_changed");
    };
    InfoBox2.prototype.setPosition = function(latLng) {
      this.position = latLng;
      if (this.div) {
        this.draw();
      }
      google.maps.event.trigger(this, "position_changed");
    };
    InfoBox2.prototype.setVisible = function(isVisible) {
      this.isHidden = !isVisible;
      if (this.div) {
        this.div.style.visibility = this.isHidden ? "hidden" : "visible";
      }
    };
    InfoBox2.prototype.setZIndex = function(index) {
      this.zIndex = index;
      if (this.div) {
        this.div.style.zIndex = index + "";
      }
      google.maps.event.trigger(this, "zindex_changed");
    };
    InfoBox2.prototype.getContent = function() {
      return this.content;
    };
    InfoBox2.prototype.getPosition = function() {
      return this.position;
    };
    InfoBox2.prototype.getZIndex = function() {
      return this.zIndex;
    };
    InfoBox2.prototype.getVisible = function() {
      var map = this.getMap();
      return typeof map === "undefined" || map === null ? false : !this.isHidden;
    };
    InfoBox2.prototype.show = function() {
      this.isHidden = false;
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    };
    InfoBox2.prototype.hide = function() {
      this.isHidden = true;
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    };
    InfoBox2.prototype.open = function(map, anchor) {
      var _this = this;
      if (anchor) {
        this.position = anchor.getPosition();
        this.moveListener = google.maps.event.addListener(anchor, "position_changed", function() {
          var position = anchor.getPosition();
          _this.setPosition(position);
        });
        this.mapListener = google.maps.event.addListener(anchor, "map_changed", function() {
          _this.setMap(anchor.map);
        });
      }
      this.setMap(map);
      if (this.div) {
        this.panBox();
      }
    };
    InfoBox2.prototype.close = function() {
      if (this.closeListener) {
        google.maps.event.removeListener(this.closeListener);
        this.closeListener = null;
      }
      if (this.eventListeners) {
        for (var _i = 0, _a = this.eventListeners; _i < _a.length; _i++) {
          var eventListener = _a[_i];
          google.maps.event.removeListener(eventListener);
        }
        this.eventListeners = null;
      }
      if (this.moveListener) {
        google.maps.event.removeListener(this.moveListener);
        this.moveListener = null;
      }
      if (this.mapListener) {
        google.maps.event.removeListener(this.mapListener);
        this.mapListener = null;
      }
      if (this.contextListener) {
        google.maps.event.removeListener(this.contextListener);
        this.contextListener = null;
      }
      this.setMap(null);
    };
    InfoBox2.prototype.extend = function(obj1, obj2) {
      return (function applyExtend(object) {
        for (var property in object.prototype) {
          if (!Object.prototype.hasOwnProperty.call(this, property)) {
            this.prototype[property] = object.prototype[property];
          }
        }
        return this;
      }).apply(obj1, [obj2]);
    };
    return InfoBox2;
  }()
);
var _excluded = ["position"];
var _excluded2 = ["position"];
function ownKeys$b(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$b(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$b(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$d = {
  onCloseClick: "closeclick",
  onContentChanged: "content_changed",
  onDomReady: "domready",
  onPositionChanged: "position_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$d = {
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position) {
    if (position instanceof google.maps.LatLng) {
      instance.setPosition(position);
    } else {
      instance.setPosition(new google.maps.LatLng(position.lat, position.lng));
    }
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
var defaultOptions$3 = {};
function InfoBoxFunctional(_ref) {
  var {
    children,
    anchor,
    options,
    position,
    zIndex,
    onCloseClick,
    onDomReady,
    onContentChanged,
    onPositionChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [closeClickListener, setCloseClickListener] = (0, import_react.useState)(null);
  var [domReadyClickListener, setDomReadyClickListener] = (0, import_react.useState)(null);
  var [contentChangedClickListener, setContentChangedClickListener] = (0, import_react.useState)(null);
  var [positionChangedClickListener, setPositionChangedClickListener] = (0, import_react.useState)(null);
  var [zIndexChangedClickListener, setZindexChangedClickListener] = (0, import_react.useState)(null);
  var containerElementRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (map && instance !== null) {
      instance.close();
      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);
  (0, import_react.useEffect)(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (position && instance !== null) {
      var positionLatLng = position instanceof google.maps.LatLng ? position : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new google.maps.LatLng(position.lat, position.lng)
      );
      instance.setPosition(positionLatLng);
    }
  }, [position]);
  (0, import_react.useEffect)(() => {
    if (typeof zIndex === "number" && instance !== null) {
      instance.setZIndex(zIndex);
    }
  }, [zIndex]);
  (0, import_react.useEffect)(() => {
    if (instance && onCloseClick) {
      if (closeClickListener !== null) {
        google.maps.event.removeListener(closeClickListener);
      }
      setCloseClickListener(google.maps.event.addListener(instance, "closeclick", onCloseClick));
    }
  }, [onCloseClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDomReady) {
      if (domReadyClickListener !== null) {
        google.maps.event.removeListener(domReadyClickListener);
      }
      setDomReadyClickListener(google.maps.event.addListener(instance, "domready", onDomReady));
    }
  }, [onDomReady]);
  (0, import_react.useEffect)(() => {
    if (instance && onContentChanged) {
      if (contentChangedClickListener !== null) {
        google.maps.event.removeListener(contentChangedClickListener);
      }
      setContentChangedClickListener(google.maps.event.addListener(instance, "content_changed", onContentChanged));
    }
  }, [onContentChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onPositionChanged) {
      if (positionChangedClickListener !== null) {
        google.maps.event.removeListener(positionChangedClickListener);
      }
      setPositionChangedClickListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedClickListener !== null) {
        google.maps.event.removeListener(zIndexChangedClickListener);
      }
      setZindexChangedClickListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  (0, import_react.useEffect)(() => {
    if (map) {
      var _ref2 = options || defaultOptions$3, {
        position: _position
      } = _ref2, infoBoxOptions = _objectWithoutProperties(_ref2, _excluded);
      var positionLatLng;
      if (_position && !(_position instanceof google.maps.LatLng)) {
        positionLatLng = new google.maps.LatLng(_position.lat, _position.lng);
      }
      var infoBox = new InfoBox(_objectSpread$b(_objectSpread$b({}, infoBoxOptions), positionLatLng ? {
        position: positionLatLng
      } : {}));
      containerElementRef.current = document.createElement("div");
      setInstance(infoBox);
      if (onCloseClick) {
        setCloseClickListener(google.maps.event.addListener(infoBox, "closeclick", onCloseClick));
      }
      if (onDomReady) {
        setDomReadyClickListener(google.maps.event.addListener(infoBox, "domready", onDomReady));
      }
      if (onContentChanged) {
        setContentChangedClickListener(google.maps.event.addListener(infoBox, "content_changed", onContentChanged));
      }
      if (onPositionChanged) {
        setPositionChangedClickListener(google.maps.event.addListener(infoBox, "position_changed", onPositionChanged));
      }
      if (onZindexChanged) {
        setZindexChangedClickListener(google.maps.event.addListener(infoBox, "zindex_changed", onZindexChanged));
      }
      infoBox.setContent(containerElementRef.current);
      if (anchor) {
        infoBox.open(map, anchor);
      } else if (infoBox.getPosition()) {
        infoBox.open(map);
      } else {
        invariant(false, "You must provide either an anchor or a position prop for <InfoBox>.");
      }
      if (onLoad) {
        onLoad(infoBox);
      }
    }
    return () => {
      if (instance !== null) {
        if (closeClickListener) {
          google.maps.event.removeListener(closeClickListener);
        }
        if (contentChangedClickListener) {
          google.maps.event.removeListener(contentChangedClickListener);
        }
        if (domReadyClickListener) {
          google.maps.event.removeListener(domReadyClickListener);
        }
        if (positionChangedClickListener) {
          google.maps.event.removeListener(positionChangedClickListener);
        }
        if (zIndexChangedClickListener) {
          google.maps.event.removeListener(zIndexChangedClickListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.close();
      }
    };
  }, []);
  return containerElementRef.current ? (0, import_react_dom.createPortal)(import_react.Children.only(children), containerElementRef.current) : null;
}
var InfoBoxF = (0, import_react.memo)(InfoBoxFunctional);
var InfoBoxComponent = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", null);
    _defineProperty(this, "state", {
      infoBox: null
    });
    _defineProperty(this, "open", (infoBox, anchor) => {
      if (anchor) {
        if (this.context !== null) {
          infoBox.open(this.context, anchor);
        }
      } else if (infoBox.getPosition()) {
        if (this.context !== null) {
          infoBox.open(this.context);
        }
      } else {
        invariant(false, "You must provide either an anchor or a position prop for <InfoBox>.");
      }
    });
    _defineProperty(this, "setInfoBoxCallback", () => {
      if (this.state.infoBox !== null && this.containerElement !== null) {
        this.state.infoBox.setContent(this.containerElement);
        this.open(this.state.infoBox, this.props.anchor);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.infoBox);
        }
      }
    });
  }
  componentDidMount() {
    var _ref3 = this.props.options || {}, {
      position
    } = _ref3, infoBoxOptions = _objectWithoutProperties(_ref3, _excluded2);
    var positionLatLng;
    if (position && !(position instanceof google.maps.LatLng)) {
      positionLatLng = new google.maps.LatLng(position.lat, position.lng);
    }
    var infoBox = new InfoBox(_objectSpread$b(_objectSpread$b({}, infoBoxOptions), positionLatLng ? {
      position: positionLatLng
    } : {}));
    this.containerElement = document.createElement("div");
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$d,
      eventMap: eventMap$d,
      prevProps: {},
      nextProps: this.props,
      instance: infoBox
    });
    this.setState({
      infoBox
    }, this.setInfoBoxCallback);
  }
  componentDidUpdate(prevProps) {
    var {
      infoBox
    } = this.state;
    if (infoBox !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$d,
        eventMap: eventMap$d,
        prevProps,
        nextProps: this.props,
        instance: infoBox
      });
    }
  }
  componentWillUnmount() {
    var {
      onUnmount
    } = this.props;
    var {
      infoBox
    } = this.state;
    if (infoBox !== null) {
      if (onUnmount) {
        onUnmount(infoBox);
      }
      unregisterEvents(this.registeredEvents);
      infoBox.close();
    }
  }
  render() {
    return this.containerElement ? (0, import_react_dom.createPortal)(import_react.Children.only(this.props.children), this.containerElement) : null;
  }
};
_defineProperty(InfoBoxComponent, "contextType", MapContext);
var fastDeepEqual;
var hasRequiredFastDeepEqual;
function requireFastDeepEqual() {
  if (hasRequiredFastDeepEqual) return fastDeepEqual;
  hasRequiredFastDeepEqual = 1;
  fastDeepEqual = function equal3(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; ) if (!equal3(a[i], b[i])) return false;
        return true;
      }
      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal3(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  return fastDeepEqual;
}
var fastDeepEqualExports = requireFastDeepEqual();
var equal2 = getDefaultExportFromCjs$1(fastDeepEqualExports);
var ARRAY_TYPES = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
var VERSION = 1;
var HEADER_SIZE = 8;
var KDBush = class _KDBush {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(data) {
    if (!(data instanceof ArrayBuffer)) {
      throw new Error("Data must be an instance of ArrayBuffer.");
    }
    var [magic, versionAndType] = new Uint8Array(data, 0, 2);
    if (magic !== 219) {
      throw new Error("Data does not appear to be in a KDBush format.");
    }
    var version = versionAndType >> 4;
    if (version !== VERSION) {
      throw new Error("Got v".concat(version, " data when expected v").concat(VERSION, "."));
    }
    var ArrayType = ARRAY_TYPES[versionAndType & 15];
    if (!ArrayType) {
      throw new Error("Unrecognized array type.");
    }
    var [nodeSize] = new Uint16Array(data, 2, 1);
    var [numItems] = new Uint32Array(data, 4, 1);
    return new _KDBush(numItems, nodeSize, ArrayType, data);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(numItems) {
    var nodeSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 64;
    var ArrayType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Float64Array;
    var data = arguments.length > 3 ? arguments[3] : void 0;
    if (isNaN(numItems) || numItems < 0) throw new Error("Unpexpected numItems value: ".concat(numItems, "."));
    this.numItems = +numItems;
    this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
    this.ArrayType = ArrayType;
    this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;
    var arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
    var coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
    var idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
    var padCoords = (8 - idsByteSize % 8) % 8;
    if (arrayTypeIndex < 0) {
      throw new Error("Unexpected typed array class: ".concat(ArrayType, "."));
    }
    if (data && data instanceof ArrayBuffer) {
      this.data = data;
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = numItems * 2;
      this._finished = true;
    } else {
      this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
      this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
      this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
      this._pos = 0;
      this._finished = false;
      new Uint8Array(this.data, 0, 2).set([219, (VERSION << 4) + arrayTypeIndex]);
      new Uint16Array(this.data, 2, 1)[0] = nodeSize;
      new Uint32Array(this.data, 4, 1)[0] = numItems;
    }
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(x, y) {
    var index = this._pos >> 1;
    this.ids[index] = index;
    this.coords[this._pos++] = x;
    this.coords[this._pos++] = y;
    return index;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    var numAdded = this._pos >> 1;
    if (numAdded !== this.numItems) {
      throw new Error("Added ".concat(numAdded, " items when expected ").concat(this.numItems, "."));
    }
    sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);
    this._finished = true;
    return this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(minX, minY, maxX, maxY) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    var {
      ids,
      coords,
      nodeSize
    } = this;
    var stack = [0, ids.length - 1, 0];
    var result = [];
    while (stack.length) {
      var axis = stack.pop() || 0;
      var right = stack.pop() || 0;
      var left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (var i = left; i <= right; i++) {
          var _x = coords[2 * i];
          var _y = coords[2 * i + 1];
          if (_x >= minX && _x <= maxX && _y >= minY && _y <= maxY) result.push(ids[i]);
        }
        continue;
      }
      var m = left + right >> 1;
      var x = coords[2 * m];
      var y = coords[2 * m + 1];
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
      if (axis === 0 ? minX <= x : minY <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? maxX >= x : maxY >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(qx, qy, r) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    var {
      ids,
      coords,
      nodeSize
    } = this;
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var r2 = r * r;
    while (stack.length) {
      var axis = stack.pop() || 0;
      var right = stack.pop() || 0;
      var left = stack.pop() || 0;
      if (right - left <= nodeSize) {
        for (var i = left; i <= right; i++) {
          if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
        }
        continue;
      }
      var m = left + right >> 1;
      var x = coords[2 * m];
      var y = coords[2 * m + 1];
      if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
      if (axis === 0 ? qx - r <= x : qy - r <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(1 - axis);
      }
      if (axis === 0 ? qx + r >= x : qy + r >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(1 - axis);
      }
    }
    return result;
  }
};
function sort(ids, coords, nodeSize, left, right, axis) {
  if (right - left <= nodeSize) return;
  var m = left + right >> 1;
  select(ids, coords, m, left, right, axis);
  sort(ids, coords, nodeSize, left, m - 1, 1 - axis);
  sort(ids, coords, nodeSize, m + 1, right, 1 - axis);
}
function select(ids, coords, k, left, right, axis) {
  while (right > left) {
    if (right - left > 600) {
      var n = right - left + 1;
      var m = k - left + 1;
      var z = Math.log(n);
      var s = 0.5 * Math.exp(2 * z / 3);
      var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      select(ids, coords, k, newLeft, newRight, axis);
    }
    var t = coords[2 * k + axis];
    var i = left;
    var j = right;
    swapItem(ids, coords, left, k);
    if (coords[2 * right + axis] > t) swapItem(ids, coords, left, right);
    while (i < j) {
      swapItem(ids, coords, i, j);
      i++;
      j--;
      while (coords[2 * i + axis] < t) i++;
      while (coords[2 * j + axis] > t) j--;
    }
    if (coords[2 * left + axis] === t) swapItem(ids, coords, left, j);
    else {
      j++;
      swapItem(ids, coords, j, right);
    }
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}
function swapItem(ids, coords, i, j) {
  swap(ids, i, j);
  swap(coords, 2 * i, 2 * j);
  swap(coords, 2 * i + 1, 2 * j + 1);
}
function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
function sqDist(ax, ay, bx, by) {
  var dx = ax - bx;
  var dy = ay - by;
  return dx * dx + dy * dy;
}
var defaultOptions$2 = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: false,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: false,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (props) => props
  // props => ({sum: props.my_value})
};
var fround = Math.fround || /* @__PURE__ */ ((tmp) => (x) => {
  tmp[0] = +x;
  return tmp[0];
})(new Float32Array(1));
var OFFSET_ZOOM = 2;
var OFFSET_ID = 3;
var OFFSET_PARENT = 4;
var OFFSET_NUM = 5;
var OFFSET_PROP = 6;
var Supercluster = class {
  constructor(options) {
    this.options = Object.assign(Object.create(defaultOptions$2), options);
    this.trees = new Array(this.options.maxZoom + 1);
    this.stride = this.options.reduce ? 7 : 6;
    this.clusterProps = [];
  }
  load(points) {
    var {
      log,
      minZoom,
      maxZoom
    } = this.options;
    if (log) console.time("total time");
    var timerId = "prepare ".concat(points.length, " points");
    if (log) console.time(timerId);
    this.points = points;
    var data = [];
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      if (!p.geometry) continue;
      var [lng, lat] = p.geometry.coordinates;
      var x = fround(lngX(lng));
      var y = fround(latY(lat));
      data.push(
        x,
        y,
        // projected point coordinates
        Infinity,
        // the last zoom the point was processed at
        i,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      );
      if (this.options.reduce) data.push(0);
    }
    var tree = this.trees[maxZoom + 1] = this._createTree(data);
    if (log) console.timeEnd(timerId);
    for (var z = maxZoom; z >= minZoom; z--) {
      var now = +Date.now();
      tree = this.trees[z] = this._createTree(this._cluster(tree, z));
      if (log) console.log("z%d: %d clusters in %dms", z, tree.numItems, +Date.now() - now);
    }
    if (log) console.timeEnd("total time");
    return this;
  }
  getClusters(bbox, zoom) {
    var minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    var minLat = Math.max(-90, Math.min(90, bbox[1]));
    var maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    var maxLat = Math.max(-90, Math.min(90, bbox[3]));
    if (bbox[2] - bbox[0] >= 360) {
      minLng = -180;
      maxLng = 180;
    } else if (minLng > maxLng) {
      var easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
      var westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
      return easternHem.concat(westernHem);
    }
    var tree = this.trees[this._limitZoom(zoom)];
    var ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    var data = tree.data;
    var clusters = [];
    for (var id of ids) {
      var k = this.stride * id;
      clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
    }
    return clusters;
  }
  getChildren(clusterId) {
    var originId = this._getOriginId(clusterId);
    var originZoom = this._getOriginZoom(clusterId);
    var errorMsg = "No cluster with the specified id.";
    var tree = this.trees[originZoom];
    if (!tree) throw new Error(errorMsg);
    var data = tree.data;
    if (originId * this.stride >= data.length) throw new Error(errorMsg);
    var r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    var x = data[originId * this.stride];
    var y = data[originId * this.stride + 1];
    var ids = tree.within(x, y, r);
    var children = [];
    for (var id of ids) {
      var k = id * this.stride;
      if (data[k + OFFSET_PARENT] === clusterId) {
        children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
      }
    }
    if (children.length === 0) throw new Error(errorMsg);
    return children;
  }
  getLeaves(clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;
    var leaves = [];
    this._appendLeaves(leaves, clusterId, limit, offset, 0);
    return leaves;
  }
  getTile(z, x, y) {
    var tree = this.trees[this._limitZoom(z)];
    var z2 = Math.pow(2, z);
    var {
      extent,
      radius
    } = this.options;
    var p = radius / extent;
    var top = (y - p) / z2;
    var bottom = (y + 1 + p) / z2;
    var tile = {
      features: []
    };
    this._addTileFeatures(tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom), tree.data, x, y, z2, tile);
    if (x === 0) {
      this._addTileFeatures(tree.range(1 - p / z2, top, 1, bottom), tree.data, z2, y, z2, tile);
    }
    if (x === z2 - 1) {
      this._addTileFeatures(tree.range(0, top, p / z2, bottom), tree.data, -1, y, z2, tile);
    }
    return tile.features.length ? tile : null;
  }
  getClusterExpansionZoom(clusterId) {
    var expansionZoom = this._getOriginZoom(clusterId) - 1;
    while (expansionZoom <= this.options.maxZoom) {
      var children = this.getChildren(clusterId);
      expansionZoom++;
      if (children.length !== 1) break;
      clusterId = children[0].properties.cluster_id;
    }
    return expansionZoom;
  }
  _appendLeaves(result, clusterId, limit, offset, skipped) {
    var children = this.getChildren(clusterId);
    for (var child of children) {
      var props = child.properties;
      if (props && props.cluster) {
        if (skipped + props.point_count <= offset) {
          skipped += props.point_count;
        } else {
          skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
        }
      } else if (skipped < offset) {
        skipped++;
      } else {
        result.push(child);
      }
      if (result.length === limit) break;
    }
    return skipped;
  }
  _createTree(data) {
    var tree = new KDBush(data.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (var i = 0; i < data.length; i += this.stride) tree.add(data[i], data[i + 1]);
    tree.finish();
    tree.data = data;
    return tree;
  }
  _addTileFeatures(ids, data, x, y, z2, tile) {
    for (var i of ids) {
      var k = i * this.stride;
      var isCluster = data[k + OFFSET_NUM] > 1;
      var tags = void 0, px = void 0, py = void 0;
      if (isCluster) {
        tags = getClusterProperties(data, k, this.clusterProps);
        px = data[k];
        py = data[k + 1];
      } else {
        var p = this.points[data[k + OFFSET_ID]];
        tags = p.properties;
        var [lng, lat] = p.geometry.coordinates;
        px = lngX(lng);
        py = latY(lat);
      }
      var f = {
        type: 1,
        geometry: [[Math.round(this.options.extent * (px * z2 - x)), Math.round(this.options.extent * (py * z2 - y))]],
        tags
      };
      var id = void 0;
      if (isCluster || this.options.generateId) {
        id = data[k + OFFSET_ID];
      } else {
        id = this.points[data[k + OFFSET_ID]].id;
      }
      if (id !== void 0) f.id = id;
      tile.features.push(f);
    }
  }
  _limitZoom(z) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
  }
  _cluster(tree, zoom) {
    var {
      radius,
      extent,
      reduce: reduce2,
      minPoints
    } = this.options;
    var r = radius / (extent * Math.pow(2, zoom));
    var data = tree.data;
    var nextData = [];
    var stride = this.stride;
    for (var i = 0; i < data.length; i += stride) {
      if (data[i + OFFSET_ZOOM] <= zoom) continue;
      data[i + OFFSET_ZOOM] = zoom;
      var x = data[i];
      var y = data[i + 1];
      var neighborIds = tree.within(data[i], data[i + 1], r);
      var numPointsOrigin = data[i + OFFSET_NUM];
      var numPoints = numPointsOrigin;
      for (var neighborId of neighborIds) {
        var k = neighborId * stride;
        if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
      }
      if (numPoints > numPointsOrigin && numPoints >= minPoints) {
        var wx = x * numPointsOrigin;
        var wy = y * numPointsOrigin;
        var clusterProperties = void 0;
        var clusterPropIndex = -1;
        var id = ((i / stride | 0) << 5) + (zoom + 1) + this.points.length;
        for (var _neighborId of neighborIds) {
          var _k = _neighborId * stride;
          if (data[_k + OFFSET_ZOOM] <= zoom) continue;
          data[_k + OFFSET_ZOOM] = zoom;
          var numPoints2 = data[_k + OFFSET_NUM];
          wx += data[_k] * numPoints2;
          wy += data[_k + 1] * numPoints2;
          data[_k + OFFSET_PARENT] = id;
          if (reduce2) {
            if (!clusterProperties) {
              clusterProperties = this._map(data, i, true);
              clusterPropIndex = this.clusterProps.length;
              this.clusterProps.push(clusterProperties);
            }
            reduce2(clusterProperties, this._map(data, _k));
          }
        }
        data[i + OFFSET_PARENT] = id;
        nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
        if (reduce2) nextData.push(clusterPropIndex);
      } else {
        for (var j = 0; j < stride; j++) nextData.push(data[i + j]);
        if (numPoints > 1) {
          for (var _neighborId2 of neighborIds) {
            var _k2 = _neighborId2 * stride;
            if (data[_k2 + OFFSET_ZOOM] <= zoom) continue;
            data[_k2 + OFFSET_ZOOM] = zoom;
            for (var _j = 0; _j < stride; _j++) nextData.push(data[_k2 + _j]);
          }
        }
      }
    }
    return nextData;
  }
  // get index of the point from which the cluster originated
  _getOriginId(clusterId) {
    return clusterId - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(clusterId) {
    return (clusterId - this.points.length) % 32;
  }
  _map(data, i, clone) {
    if (data[i + OFFSET_NUM] > 1) {
      var props = this.clusterProps[data[i + OFFSET_PROP]];
      return clone ? Object.assign({}, props) : props;
    }
    var original = this.points[data[i + OFFSET_ID]].properties;
    var result = this.options.map(original);
    return clone && result === original ? Object.assign({}, result) : result;
  }
};
function getClusterJSON(data, i, clusterProps) {
  return {
    type: "Feature",
    id: data[i + OFFSET_ID],
    properties: getClusterProperties(data, i, clusterProps),
    geometry: {
      type: "Point",
      coordinates: [xLng(data[i]), yLat(data[i + 1])]
    }
  };
}
function getClusterProperties(data, i, clusterProps) {
  var count = data[i + OFFSET_NUM];
  var abbrev = count >= 1e4 ? "".concat(Math.round(count / 1e3), "k") : count >= 1e3 ? "".concat(Math.round(count / 100) / 10, "k") : count;
  var propIndex = data[i + OFFSET_PROP];
  var properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
  return Object.assign(properties, {
    cluster: true,
    cluster_id: data[i + OFFSET_ID],
    point_count: count,
    point_count_abbreviated: abbrev
  });
}
function lngX(lng) {
  return lng / 360 + 0.5;
}
function latY(lat) {
  var sin = Math.sin(lat * Math.PI / 180);
  var y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
  return y < 0 ? 0 : y > 1 ? 1 : y;
}
function xLng(x) {
  return (x - 0.5) * 360;
}
function yLat(y) {
  var y2 = (180 - y * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
var MarkerUtils = class {
  static isAdvancedMarkerAvailable(map) {
    return google.maps.marker && map.getMapCapabilities().isAdvancedMarkersAvailable === true;
  }
  static isAdvancedMarker(marker) {
    return google.maps.marker && marker instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(marker, map) {
    if (this.isAdvancedMarker(marker)) {
      marker.map = map;
    } else {
      marker.setMap(map);
    }
  }
  static getPosition(marker) {
    if (this.isAdvancedMarker(marker)) {
      if (marker.position) {
        if (marker.position instanceof google.maps.LatLng) {
          return marker.position;
        }
        if (marker.position.lat && marker.position.lng) {
          return new google.maps.LatLng(marker.position.lat, marker.position.lng);
        }
      }
      return new google.maps.LatLng(null);
    }
    return marker.getPosition();
  }
  static getVisible(marker) {
    if (this.isAdvancedMarker(marker)) {
      return true;
    }
    return marker.getVisible();
  }
};
var Cluster = class {
  constructor(_ref) {
    var {
      markers,
      position
    } = _ref;
    this.markers = markers;
    if (position) {
      if (position instanceof google.maps.LatLng) {
        this._position = position;
      } else {
        this._position = new google.maps.LatLng(position);
      }
    }
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position) {
      return;
    }
    var bounds = new google.maps.LatLngBounds(this._position, this._position);
    for (var marker of this.markers) {
      bounds.extend(MarkerUtils.getPosition(marker));
    }
    return bounds;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((m) => MarkerUtils.getVisible(m)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(marker) {
    this.markers.push(marker);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    if (this.marker) {
      MarkerUtils.setMap(this.marker, null);
      this.marker = void 0;
    }
    this.markers.length = 0;
  }
};
var filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPaddingPixels) => {
  var extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPaddingPixels);
  return markers.filter((marker) => extendedMapBounds.contains(MarkerUtils.getPosition(marker)));
};
var extendBoundsToPaddedViewport = (bounds, projection, numPixels) => {
  var {
    northEast,
    southWest
  } = latLngBoundsToPixelBounds(bounds, projection);
  var extendedPixelBounds = extendPixelBounds({
    northEast,
    southWest
  }, numPixels);
  return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
var getPaddedViewport = (bounds, projection, pixels) => {
  var extended = extendBoundsToPaddedViewport(bounds, projection, pixels);
  var ne = extended.getNorthEast();
  var sw = extended.getSouthWest();
  return [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
};
var distanceBetweenPoints = (p1, p2) => {
  var R = 6371;
  var dLat = (p2.lat - p1.lat) * Math.PI / 180;
  var dLon = (p2.lng - p1.lng) * Math.PI / 180;
  var sinDLat = Math.sin(dLat / 2);
  var sinDLon = Math.sin(dLon / 2);
  var a = sinDLat * sinDLat + Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * sinDLon * sinDLon;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
var latLngBoundsToPixelBounds = (bounds, projection) => {
  return {
    northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
    southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest())
  };
};
var extendPixelBounds = (_ref2, numPixels) => {
  var {
    northEast,
    southWest
  } = _ref2;
  northEast.x += numPixels;
  northEast.y -= numPixels;
  southWest.x -= numPixels;
  southWest.y += numPixels;
  return {
    northEast,
    southWest
  };
};
var pixelBoundsToLatLngBounds = (_ref3, projection) => {
  var {
    northEast,
    southWest
  } = _ref3;
  var sw = projection.fromDivPixelToLatLng(southWest);
  var ne = projection.fromDivPixelToLatLng(northEast);
  return new google.maps.LatLngBounds(sw, ne);
};
var AbstractAlgorithm = class {
  constructor(_ref4) {
    var {
      maxZoom = 16
    } = _ref4;
    this.maxZoom = maxZoom;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop(_ref5) {
    var {
      markers
    } = _ref5;
    return noop$1(markers);
  }
};
var AbstractViewportAlgorithm = class extends AbstractAlgorithm {
  constructor(_a) {
    var {
      viewportPadding = 60
    } = _a, options = __rest(_a, ["viewportPadding"]);
    super(options);
    this.viewportPadding = 60;
    this.viewportPadding = viewportPadding;
  }
  calculate(_ref6) {
    var {
      markers,
      map,
      mapCanvasProjection
    } = _ref6;
    if (map.getZoom() >= this.maxZoom) {
      return {
        clusters: this.noop({
          markers
        }),
        changed: false
      };
    }
    return {
      clusters: this.cluster({
        markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
        map,
        mapCanvasProjection
      })
    };
  }
};
var noop$1 = (markers) => {
  var clusters = markers.map((marker) => new Cluster({
    position: MarkerUtils.getPosition(marker),
    markers: [marker]
  }));
  return clusters;
};
var GridAlgorithm = class extends AbstractViewportAlgorithm {
  constructor(_a) {
    var {
      maxDistance = 4e4,
      gridSize = 40
    } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
    super(options);
    this.clusters = [];
    this.state = {
      zoom: -1
    };
    this.maxDistance = maxDistance;
    this.gridSize = gridSize;
  }
  calculate(_ref7) {
    var {
      markers,
      map,
      mapCanvasProjection
    } = _ref7;
    var state = {
      zoom: map.getZoom()
    };
    var changed = false;
    if (this.state.zoom >= this.maxZoom && state.zoom >= this.maxZoom) ;
    else {
      changed = !equal2(this.state, state);
    }
    this.state = state;
    if (map.getZoom() >= this.maxZoom) {
      return {
        clusters: this.noop({
          markers
        }),
        changed
      };
    }
    return {
      clusters: this.cluster({
        markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
        map,
        mapCanvasProjection
      })
    };
  }
  cluster(_ref8) {
    var {
      markers,
      map,
      mapCanvasProjection
    } = _ref8;
    this.clusters = [];
    markers.forEach((marker) => {
      this.addToClosestCluster(marker, map, mapCanvasProjection);
    });
    return this.clusters;
  }
  addToClosestCluster(marker, map, projection) {
    var maxDistance = this.maxDistance;
    var cluster = null;
    for (var i = 0; i < this.clusters.length; i++) {
      var candidate = this.clusters[i];
      var distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), MarkerUtils.getPosition(marker).toJSON());
      if (distance < maxDistance) {
        maxDistance = distance;
        cluster = candidate;
      }
    }
    if (cluster && extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(MarkerUtils.getPosition(marker))) {
      cluster.push(marker);
    } else {
      var _cluster = new Cluster({
        markers: [marker]
      });
      this.clusters.push(_cluster);
    }
  }
};
var NoopAlgorithm = class extends AbstractAlgorithm {
  constructor(_a) {
    var options = __rest(_a, []);
    super(options);
  }
  calculate(_ref9) {
    var {
      markers,
      map,
      mapCanvasProjection
    } = _ref9;
    return {
      clusters: this.cluster({
        markers,
        map,
        mapCanvasProjection
      }),
      changed: false
    };
  }
  cluster(input) {
    return this.noop(input);
  }
};
var SuperClusterAlgorithm = class extends AbstractAlgorithm {
  constructor(_a) {
    var {
      maxZoom,
      radius = 60
    } = _a, options = __rest(_a, ["maxZoom", "radius"]);
    super({
      maxZoom
    });
    this.state = {
      zoom: -1
    };
    this.superCluster = new Supercluster(Object.assign({
      maxZoom: this.maxZoom,
      radius
    }, options));
  }
  calculate(input) {
    var changed = false;
    var state = {
      zoom: input.map.getZoom()
    };
    if (!equal2(input.markers, this.markers)) {
      changed = true;
      this.markers = [...input.markers];
      var points = this.markers.map((marker) => {
        var position = MarkerUtils.getPosition(marker);
        var coordinates = [position.lng(), position.lat()];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates
          },
          properties: {
            marker
          }
        };
      });
      this.superCluster.load(points);
    }
    if (!changed) {
      if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
        changed = !equal2(this.state, state);
      }
    }
    this.state = state;
    if (changed) {
      this.clusters = this.cluster(input);
    }
    return {
      clusters: this.clusters,
      changed
    };
  }
  cluster(_ref10) {
    var {
      map
    } = _ref10;
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(map.getZoom())).map((feature) => this.transformCluster(feature));
  }
  transformCluster(_ref11) {
    var {
      geometry: {
        coordinates: [lng, lat]
      },
      properties
    } = _ref11;
    if (properties.cluster) {
      return new Cluster({
        markers: this.superCluster.getLeaves(properties.cluster_id, Infinity).map((leaf) => leaf.properties.marker),
        position: {
          lat,
          lng
        }
      });
    }
    var marker = properties.marker;
    return new Cluster({
      markers: [marker],
      position: MarkerUtils.getPosition(marker)
    });
  }
};
var SuperClusterViewportAlgorithm = class extends AbstractViewportAlgorithm {
  constructor(_a) {
    var {
      maxZoom,
      radius = 60,
      viewportPadding = 60
    } = _a, options = __rest(_a, ["maxZoom", "radius", "viewportPadding"]);
    super({
      maxZoom,
      viewportPadding
    });
    this.superCluster = new Supercluster(Object.assign({
      maxZoom: this.maxZoom,
      radius
    }, options));
    this.state = {
      zoom: -1,
      view: [0, 0, 0, 0]
    };
  }
  calculate(input) {
    var state = {
      zoom: Math.round(input.map.getZoom()),
      view: getPaddedViewport(input.map.getBounds(), input.mapCanvasProjection, this.viewportPadding)
    };
    var changed = !equal2(this.state, state);
    if (!equal2(input.markers, this.markers)) {
      changed = true;
      this.markers = [...input.markers];
      var points = this.markers.map((marker) => {
        var position = MarkerUtils.getPosition(marker);
        var coordinates = [position.lng(), position.lat()];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates
          },
          properties: {
            marker
          }
        };
      });
      this.superCluster.load(points);
    }
    if (changed) {
      this.clusters = this.cluster(input);
      this.state = state;
    }
    return {
      clusters: this.clusters,
      changed
    };
  }
  cluster(_ref12) {
    var {
      map,
      mapCanvasProjection
    } = _ref12;
    var state = {
      zoom: Math.round(map.getZoom()),
      view: getPaddedViewport(map.getBounds(), mapCanvasProjection, this.viewportPadding)
    };
    return this.superCluster.getClusters(state.view, state.zoom).map((feature) => this.transformCluster(feature));
  }
  transformCluster(_ref13) {
    var {
      geometry: {
        coordinates: [lng, lat]
      },
      properties
    } = _ref13;
    if (properties.cluster) {
      return new Cluster({
        markers: this.superCluster.getLeaves(properties.cluster_id, Infinity).map((leaf) => leaf.properties.marker),
        position: {
          lat,
          lng
        }
      });
    }
    var marker = properties.marker;
    return new Cluster({
      markers: [marker],
      position: MarkerUtils.getPosition(marker)
    });
  }
};
var ClusterStats = class {
  constructor(markers, clusters) {
    this.markers = {
      sum: markers.length
    };
    var clusterMarkerCounts = clusters.map((a) => a.count);
    var clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
    this.clusters = {
      count: clusters.length,
      markers: {
        mean: clusterMarkerSum / clusters.length,
        sum: clusterMarkerSum,
        min: Math.min(...clusterMarkerCounts),
        max: Math.max(...clusterMarkerCounts)
      }
    };
  }
};
var DefaultRenderer = class {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render(_ref14, stats, map) {
    var {
      count,
      position
    } = _ref14;
    var color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
    var svg = '<svg fill="'.concat(color, '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">\n<circle cx="120" cy="120" opacity=".6" r="70" />\n<circle cx="120" cy="120" opacity=".3" r="90" />\n<circle cx="120" cy="120" opacity=".2" r="110" />\n<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">').concat(count, "</text>\n</svg>");
    var title = "Cluster of ".concat(count, " markers"), zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
    if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
      var parser = new DOMParser();
      var svgEl = parser.parseFromString(svg, "image/svg+xml").documentElement;
      svgEl.setAttribute("transform", "translate(0 25)");
      var _clusterOptions = {
        map,
        position,
        zIndex,
        title,
        content: svgEl
      };
      return new google.maps.marker.AdvancedMarkerElement(_clusterOptions);
    }
    var clusterOptions = {
      position,
      zIndex,
      title,
      icon: {
        url: "data:image/svg+xml;base64,".concat(btoa(svg)),
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(clusterOptions);
  }
};
function extend(type1, type2) {
  for (var property in type2.prototype) {
    type1.prototype[property] = type2.prototype[property];
  }
}
var OverlayViewSafe = class _OverlayViewSafe {
  constructor() {
    extend(_OverlayViewSafe, google.maps.OverlayView);
  }
};
var MarkerClustererEvents;
(function(MarkerClustererEvents2) {
  MarkerClustererEvents2["CLUSTERING_BEGIN"] = "clusteringbegin";
  MarkerClustererEvents2["CLUSTERING_END"] = "clusteringend";
  MarkerClustererEvents2["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
var defaultOnClusterClickHandler = (_, cluster, map) => {
  map.fitBounds(cluster.bounds);
};
var MarkerClusterer = class extends OverlayViewSafe {
  constructor(_ref15) {
    var {
      map,
      markers = [],
      algorithmOptions = {},
      algorithm = new SuperClusterAlgorithm(algorithmOptions),
      renderer = new DefaultRenderer(),
      onClusterClick = defaultOnClusterClickHandler
    } = _ref15;
    super();
    this.markers = [...markers];
    this.clusters = [];
    this.algorithm = algorithm;
    this.renderer = renderer;
    this.onClusterClick = onClusterClick;
    if (map) {
      this.setMap(map);
    }
  }
  addMarker(marker, noDraw) {
    if (this.markers.includes(marker)) {
      return;
    }
    this.markers.push(marker);
    if (!noDraw) {
      this.render();
    }
  }
  addMarkers(markers, noDraw) {
    markers.forEach((marker) => {
      this.addMarker(marker, true);
    });
    if (!noDraw) {
      this.render();
    }
  }
  removeMarker(marker, noDraw) {
    var index = this.markers.indexOf(marker);
    if (index === -1) {
      return false;
    }
    MarkerUtils.setMap(marker, null);
    this.markers.splice(index, 1);
    if (!noDraw) {
      this.render();
    }
    return true;
  }
  removeMarkers(markers, noDraw) {
    var removed = false;
    markers.forEach((marker) => {
      removed = this.removeMarker(marker, true) || removed;
    });
    if (removed && !noDraw) {
      this.render();
    }
    return removed;
  }
  clearMarkers(noDraw) {
    this.markers.length = 0;
    if (!noDraw) {
      this.render();
    }
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    var map = this.getMap();
    if (map instanceof google.maps.Map && map.getProjection()) {
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
      var {
        clusters,
        changed
      } = this.algorithm.calculate({
        markers: this.markers,
        map,
        mapCanvasProjection: this.getProjection()
      });
      if (changed || changed == void 0) {
        var singleMarker = /* @__PURE__ */ new Set();
        for (var cluster of clusters) {
          if (cluster.markers.length == 1) {
            singleMarker.add(cluster.markers[0]);
          }
        }
        var groupMarkers = [];
        for (var _cluster2 of this.clusters) {
          if (_cluster2.marker == null) {
            continue;
          }
          if (_cluster2.markers.length == 1) {
            if (!singleMarker.has(_cluster2.marker)) {
              MarkerUtils.setMap(_cluster2.marker, null);
            }
          } else {
            groupMarkers.push(_cluster2.marker);
          }
        }
        this.clusters = clusters;
        this.renderClusters();
        requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
      }
      google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
    this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener);
    this.reset();
  }
  reset() {
    this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
    this.clusters.forEach((cluster) => cluster.delete());
    this.clusters = [];
  }
  renderClusters() {
    var stats = new ClusterStats(this.markers, this.clusters);
    var map = this.getMap();
    this.clusters.forEach((cluster) => {
      if (cluster.markers.length === 1) {
        cluster.marker = cluster.markers[0];
      } else {
        cluster.marker = this.renderer.render(cluster, stats, map);
        cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
        if (this.onClusterClick) {
          cluster.marker.addListener(
            "click",
            /* istanbul ignore next */
            (event) => {
              google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
              this.onClusterClick(event, cluster, map);
            }
          );
        }
      }
      MarkerUtils.setMap(cluster.marker, map);
    });
  }
};
var index_esm = Object.freeze({
  __proto__: null,
  AbstractAlgorithm,
  AbstractViewportAlgorithm,
  Cluster,
  ClusterStats,
  DefaultRenderer,
  GridAlgorithm,
  MarkerClusterer,
  get MarkerClustererEvents() {
    return MarkerClustererEvents;
  },
  MarkerUtils,
  NoopAlgorithm,
  SuperClusterAlgorithm,
  SuperClusterViewportAlgorithm,
  defaultOnClusterClickHandler,
  distanceBetweenPoints,
  extendBoundsToPaddedViewport,
  extendPixelBounds,
  filterMarkersToPaddedViewport,
  getPaddedViewport,
  noop: noop$1,
  pixelBoundsToLatLngBounds
});
function ownKeys$a(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$a(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$a(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function useGoogleMarkerClusterer(options) {
  var map = useGoogleMap();
  var [markerClusterer, setMarkerClusterer] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (map && markerClusterer === null) {
      var markerCluster = new MarkerClusterer(_objectSpread$a(_objectSpread$a({}, options), {}, {
        map
      }));
      setMarkerClusterer(markerCluster);
    }
  }, [map]);
  return markerClusterer;
}
function GoogleMarkerClusterer(_ref) {
  var {
    children,
    options
  } = _ref;
  var markerClusterer = useGoogleMarkerClusterer(options);
  return markerClusterer !== null ? children(markerClusterer) : null;
}
var GoogleMarkerClusterer$1 = (0, import_react.memo)(GoogleMarkerClusterer);
var eventMap$c = {
  onCloseClick: "closeclick",
  onContentChanged: "content_changed",
  onDomReady: "domready",
  onPositionChanged: "position_changed",
  onZindexChanged: "zindex_changed"
};
var updaterMap$c = {
  options(instance, options) {
    instance.setOptions(options);
  },
  position(instance, position) {
    instance.setPosition(position);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
function InfoWindowFunctional(_ref) {
  var {
    children,
    anchor,
    options,
    position,
    zIndex,
    onCloseClick,
    onDomReady,
    onContentChanged,
    onPositionChanged,
    onZindexChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [closeclickListener, setCloseClickListener] = (0, import_react.useState)(null);
  var [domreadyclickListener, setDomReadyClickListener] = (0, import_react.useState)(null);
  var [contentchangedclickListener, setContentChangedClickListener] = (0, import_react.useState)(null);
  var [positionchangedclickListener, setPositionChangedClickListener] = (0, import_react.useState)(null);
  var [zindexchangedclickListener, setZindexChangedClickListener] = (0, import_react.useState)(null);
  var containerElementRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.close();
      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);
  (0, import_react.useEffect)(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (position && instance !== null) {
      instance.setPosition(position);
    }
  }, [position]);
  (0, import_react.useEffect)(() => {
    if (typeof zIndex === "number" && instance !== null) {
      instance.setZIndex(zIndex);
    }
  }, [zIndex]);
  (0, import_react.useEffect)(() => {
    if (instance && onCloseClick) {
      if (closeclickListener !== null) {
        google.maps.event.removeListener(closeclickListener);
      }
      setCloseClickListener(google.maps.event.addListener(instance, "closeclick", onCloseClick));
    }
  }, [onCloseClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDomReady) {
      if (domreadyclickListener !== null) {
        google.maps.event.removeListener(domreadyclickListener);
      }
      setDomReadyClickListener(google.maps.event.addListener(instance, "domready", onDomReady));
    }
  }, [onDomReady]);
  (0, import_react.useEffect)(() => {
    if (instance && onContentChanged) {
      if (contentchangedclickListener !== null) {
        google.maps.event.removeListener(contentchangedclickListener);
      }
      setContentChangedClickListener(google.maps.event.addListener(instance, "content_changed", onContentChanged));
    }
  }, [onContentChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onPositionChanged) {
      if (positionchangedclickListener !== null) {
        google.maps.event.removeListener(positionchangedclickListener);
      }
      setPositionChangedClickListener(google.maps.event.addListener(instance, "position_changed", onPositionChanged));
    }
  }, [onPositionChanged]);
  (0, import_react.useEffect)(() => {
    if (instance && onZindexChanged) {
      if (zindexchangedclickListener !== null) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }
      setZindexChangedClickListener(google.maps.event.addListener(instance, "zindex_changed", onZindexChanged));
    }
  }, [onZindexChanged]);
  (0, import_react.useEffect)(() => {
    var infoWindow = new google.maps.InfoWindow(options);
    setInstance(infoWindow);
    containerElementRef.current = document.createElement("div");
    if (onCloseClick) {
      setCloseClickListener(google.maps.event.addListener(infoWindow, "closeclick", onCloseClick));
    }
    if (onDomReady) {
      setDomReadyClickListener(google.maps.event.addListener(infoWindow, "domready", onDomReady));
    }
    if (onContentChanged) {
      setContentChangedClickListener(google.maps.event.addListener(infoWindow, "content_changed", onContentChanged));
    }
    if (onPositionChanged) {
      setPositionChangedClickListener(google.maps.event.addListener(infoWindow, "position_changed", onPositionChanged));
    }
    if (onZindexChanged) {
      setZindexChangedClickListener(google.maps.event.addListener(infoWindow, "zindex_changed", onZindexChanged));
    }
    infoWindow.setContent(containerElementRef.current);
    if (position) {
      infoWindow.setPosition(position);
    }
    if (zIndex) {
      infoWindow.setZIndex(zIndex);
    }
    if (anchor) {
      infoWindow.open(map, anchor);
    } else if (infoWindow.getPosition()) {
      infoWindow.open(map);
    } else {
      invariant(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
    }
    if (onLoad) {
      onLoad(infoWindow);
    }
    return () => {
      if (closeclickListener) {
        google.maps.event.removeListener(closeclickListener);
      }
      if (contentchangedclickListener) {
        google.maps.event.removeListener(contentchangedclickListener);
      }
      if (domreadyclickListener) {
        google.maps.event.removeListener(domreadyclickListener);
      }
      if (positionchangedclickListener) {
        google.maps.event.removeListener(positionchangedclickListener);
      }
      if (zindexchangedclickListener) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }
      if (onUnmount) {
        onUnmount(infoWindow);
      }
      infoWindow.close();
    };
  }, []);
  return containerElementRef.current ? (0, import_react_dom.createPortal)(import_react.Children.only(children), containerElementRef.current) : null;
}
var InfoWindowF = (0, import_react.memo)(InfoWindowFunctional);
var InfoWindow = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", null);
    _defineProperty(this, "state", {
      infoWindow: null
    });
    _defineProperty(this, "open", (infoWindow, anchor) => {
      if (anchor) {
        infoWindow.open(this.context, anchor);
      } else if (infoWindow.getPosition()) {
        infoWindow.open(this.context);
      } else {
        invariant(false, "You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.");
      }
    });
    _defineProperty(this, "setInfoWindowCallback", () => {
      if (this.state.infoWindow !== null && this.containerElement !== null) {
        this.state.infoWindow.setContent(this.containerElement);
        this.open(this.state.infoWindow, this.props.anchor);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.infoWindow);
        }
      }
    });
  }
  componentDidMount() {
    var infoWindow = new google.maps.InfoWindow(this.props.options);
    this.containerElement = document.createElement("div");
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$c,
      eventMap: eventMap$c,
      prevProps: {},
      nextProps: this.props,
      instance: infoWindow
    });
    this.setState(() => {
      return {
        infoWindow
      };
    }, this.setInfoWindowCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$c,
        eventMap: eventMap$c,
        prevProps,
        nextProps: this.props,
        instance: this.state.infoWindow
      });
    }
  }
  componentWillUnmount() {
    if (this.state.infoWindow !== null) {
      unregisterEvents(this.registeredEvents);
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.infoWindow);
      }
      this.state.infoWindow.close();
    }
  }
  render() {
    return this.containerElement ? (0, import_react_dom.createPortal)(import_react.Children.only(this.props.children), this.containerElement) : null;
  }
};
_defineProperty(InfoWindow, "contextType", MapContext);
function ownKeys$9(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$9(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$9(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$b = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$b = {
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  path(instance, path) {
    instance.setPath(path);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
var defaultOptions$1 = {};
function PolylineFunctional(_ref) {
  var {
    options,
    draggable,
    editable,
    visible,
    path,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [dblclickListener, setDblclickListener] = (0, import_react.useState)(null);
  var [dragendListener, setDragendListener] = (0, import_react.useState)(null);
  var [dragstartListener, setDragstartListener] = (0, import_react.useState)(null);
  var [mousedownListener, setMousedownListener] = (0, import_react.useState)(null);
  var [mousemoveListener, setMousemoveListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  var [mouseupListener, setMouseupListener] = (0, import_react.useState)(null);
  var [rightclickListener, setRightclickListener] = (0, import_react.useState)(null);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [dragListener, setDragListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  (0, import_react.useEffect)(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  (0, import_react.useEffect)(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  (0, import_react.useEffect)(() => {
    if (typeof path !== "undefined" && instance !== null) {
      instance.setPath(path);
    }
  }, [instance, path]);
  (0, import_react.useEffect)(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  (0, import_react.useEffect)(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  (0, import_react.useEffect)(() => {
    var polyline = new google.maps.Polyline(_objectSpread$9(_objectSpread$9({}, options || defaultOptions$1), {}, {
      map
    }));
    if (path) {
      polyline.setPath(path);
    }
    if (typeof visible !== "undefined") {
      polyline.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      polyline.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      polyline.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polyline, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polyline, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polyline, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polyline, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polyline, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polyline, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polyline, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polyline, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polyline, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(polyline, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(polyline, "drag", onDrag));
    }
    setInstance(polyline);
    if (onLoad) {
      onLoad(polyline);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (onUnmount) {
        onUnmount(polyline);
      }
      polyline.setMap(null);
    };
  }, []);
  return null;
}
var PolylineF = (0, import_react.memo)(PolylineFunctional);
var Polyline = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      polyline: null
    });
    _defineProperty(this, "setPolylineCallback", () => {
      if (this.state.polyline !== null && this.props.onLoad) {
        this.props.onLoad(this.state.polyline);
      }
    });
  }
  componentDidMount() {
    var polyline = new google.maps.Polyline(_objectSpread$9(_objectSpread$9({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$b,
      eventMap: eventMap$b,
      prevProps: {},
      nextProps: this.props,
      instance: polyline
    });
    this.setState(function setPolyline() {
      return {
        polyline
      };
    }, this.setPolylineCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.polyline !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$b,
        eventMap: eventMap$b,
        prevProps,
        nextProps: this.props,
        instance: this.state.polyline
      });
    }
  }
  componentWillUnmount() {
    if (this.state.polyline === null) {
      return;
    }
    if (this.props.onUnmount) {
      this.props.onUnmount(this.state.polyline);
    }
    unregisterEvents(this.registeredEvents);
    this.state.polyline.setMap(null);
  }
  render() {
    return null;
  }
};
_defineProperty(Polyline, "contextType", MapContext);
function ownKeys$8(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$8(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$8(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$a = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$a = {
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  path(instance, path) {
    instance.setPath(path);
  },
  paths(instance, paths) {
    instance.setPaths(paths);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
function PolygonFunctional(_ref) {
  var {
    options,
    draggable,
    editable,
    visible,
    path,
    paths,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onLoad,
    onUnmount,
    onEdit
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [dblclickListener, setDblclickListener] = (0, import_react.useState)(null);
  var [dragendListener, setDragendListener] = (0, import_react.useState)(null);
  var [dragstartListener, setDragstartListener] = (0, import_react.useState)(null);
  var [mousedownListener, setMousedownListener] = (0, import_react.useState)(null);
  var [mousemoveListener, setMousemoveListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  var [mouseupListener, setMouseupListener] = (0, import_react.useState)(null);
  var [rightclickListener, setRightclickListener] = (0, import_react.useState)(null);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [dragListener, setDragListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  (0, import_react.useEffect)(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  (0, import_react.useEffect)(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  (0, import_react.useEffect)(() => {
    if (typeof path !== "undefined" && instance !== null) {
      instance.setPath(path);
    }
  }, [instance, path]);
  (0, import_react.useEffect)(() => {
    if (typeof paths !== "undefined" && instance !== null) {
      instance.setPaths(paths);
    }
  }, [instance, paths]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onDblClick === "function") {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  (0, import_react.useEffect)(() => {
    if (!instance) {
      return;
    }
    google.maps.event.addListener(instance.getPath(), "insert_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
    google.maps.event.addListener(instance.getPath(), "set_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
    google.maps.event.addListener(instance.getPath(), "remove_at", () => {
      onEdit === null || onEdit === void 0 || onEdit(instance);
    });
  }, [instance, onEdit]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onDragEnd === "function") {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onDragStart === "function") {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onMouseDown === "function") {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onMouseMove === "function") {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onMouseOut === "function") {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onMouseOver === "function") {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onMouseUp === "function") {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onRightClick === "function") {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onClick === "function") {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && typeof onDrag === "function") {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  (0, import_react.useEffect)(() => {
    var polygon = new google.maps.Polygon(_objectSpread$8(_objectSpread$8({}, options), {}, {
      map
    }));
    if (path) {
      polygon.setPath(path);
    }
    if (paths) {
      polygon.setPaths(paths);
    }
    if (typeof visible !== "undefined") {
      polygon.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      polygon.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      polygon.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polygon, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polygon, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polygon, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polygon, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polygon, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polygon, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polygon, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polygon, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polygon, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(polygon, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(polygon, "drag", onDrag));
    }
    setInstance(polygon);
    if (onLoad) {
      onLoad(polygon);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (onUnmount) {
        onUnmount(polygon);
      }
      polygon.setMap(null);
    };
  }, []);
  return null;
}
var PolygonF = (0, import_react.memo)(PolygonFunctional);
var Polygon = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
  }
  componentDidMount() {
    var polygonOptions = this.props.options || {};
    this.polygon = new google.maps.Polygon(polygonOptions);
    this.polygon.setMap(this.context);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$a,
      eventMap: eventMap$a,
      prevProps: {},
      nextProps: this.props,
      instance: this.polygon
    });
    if (this.props.onLoad) {
      this.props.onLoad(this.polygon);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.polygon) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$a,
        eventMap: eventMap$a,
        prevProps,
        nextProps: this.props,
        instance: this.polygon
      });
    }
  }
  componentWillUnmount() {
    if (this.polygon) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.polygon);
      }
      unregisterEvents(this.registeredEvents);
      if (this.polygon) {
        this.polygon.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
};
_defineProperty(Polygon, "contextType", MapContext);
function ownKeys$7(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$7(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$7(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$9 = {
  onBoundsChanged: "bounds_changed",
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$9 = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
function RectangleFunctional(_ref) {
  var {
    options,
    bounds,
    draggable,
    editable,
    visible,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onBoundsChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [dblclickListener, setDblclickListener] = (0, import_react.useState)(null);
  var [dragendListener, setDragendListener] = (0, import_react.useState)(null);
  var [dragstartListener, setDragstartListener] = (0, import_react.useState)(null);
  var [mousedownListener, setMousedownListener] = (0, import_react.useState)(null);
  var [mousemoveListener, setMousemoveListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  var [mouseupListener, setMouseupListener] = (0, import_react.useState)(null);
  var [rightClickListener, setRightClickListener] = (0, import_react.useState)(null);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [dragListener, setDragListener] = (0, import_react.useState)(null);
  var [boundsChangedListener, setBoundsChangedListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  (0, import_react.useEffect)(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  (0, import_react.useEffect)(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  (0, import_react.useEffect)(() => {
    if (typeof bounds !== "undefined" && instance !== null) {
      instance.setBounds(bounds);
    }
  }, [instance, bounds]);
  (0, import_react.useEffect)(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  (0, import_react.useEffect)(() => {
    if (instance && onRightClick) {
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }
      setRightClickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  (0, import_react.useEffect)(() => {
    if (instance && onBoundsChanged) {
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }
      setBoundsChangedListener(google.maps.event.addListener(instance, "bounds_changed", onBoundsChanged));
    }
  }, [onBoundsChanged]);
  (0, import_react.useEffect)(() => {
    var rectangle = new google.maps.Rectangle(_objectSpread$7(_objectSpread$7({}, options), {}, {
      map
    }));
    if (typeof visible !== "undefined") {
      rectangle.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      rectangle.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      rectangle.setDraggable(draggable);
    }
    if (typeof bounds !== "undefined") {
      rectangle.setBounds(bounds);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(rectangle, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(rectangle, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(rectangle, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(rectangle, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(rectangle, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(rectangle, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(rectangle, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(rectangle, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightClickListener(google.maps.event.addListener(rectangle, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(rectangle, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(rectangle, "drag", onDrag));
    }
    if (onBoundsChanged) {
      setBoundsChangedListener(google.maps.event.addListener(rectangle, "bounds_changed", onBoundsChanged));
    }
    setInstance(rectangle);
    if (onLoad) {
      onLoad(rectangle);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }
      if (onUnmount) {
        onUnmount(rectangle);
      }
      rectangle.setMap(null);
    };
  }, []);
  return null;
}
var RectangleF = (0, import_react.memo)(RectangleFunctional);
var Rectangle = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      rectangle: null
    });
    _defineProperty(this, "setRectangleCallback", () => {
      if (this.state.rectangle !== null && this.props.onLoad) {
        this.props.onLoad(this.state.rectangle);
      }
    });
  }
  componentDidMount() {
    var rectangle = new google.maps.Rectangle(_objectSpread$7(_objectSpread$7({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$9,
      eventMap: eventMap$9,
      prevProps: {},
      nextProps: this.props,
      instance: rectangle
    });
    this.setState(function setRectangle() {
      return {
        rectangle
      };
    }, this.setRectangleCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.rectangle !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$9,
        eventMap: eventMap$9,
        prevProps,
        nextProps: this.props,
        instance: this.state.rectangle
      });
    }
  }
  componentWillUnmount() {
    if (this.state.rectangle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.rectangle);
      }
      unregisterEvents(this.registeredEvents);
      this.state.rectangle.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(Rectangle, "contextType", MapContext);
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$8 = {
  onCenterChanged: "center_changed",
  onRadiusChanged: "radius_changed",
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
};
var updaterMap$8 = {
  center(instance, center) {
    instance.setCenter(center);
  },
  draggable(instance, draggable) {
    instance.setDraggable(draggable);
  },
  editable(instance, editable) {
    instance.setEditable(editable);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  radius(instance, radius) {
    instance.setRadius(radius);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  }
};
var defaultOptions = {};
function CircleFunctional(_ref) {
  var {
    options,
    center,
    radius,
    draggable,
    editable,
    visible,
    onDblClick,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onClick,
    onDrag,
    onCenterChanged,
    onRadiusChanged,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [dblclickListener, setDblclickListener] = (0, import_react.useState)(null);
  var [dragendListener, setDragendListener] = (0, import_react.useState)(null);
  var [dragstartListener, setDragstartListener] = (0, import_react.useState)(null);
  var [mousedownListener, setMousedownListener] = (0, import_react.useState)(null);
  var [mousemoveListener, setMousemoveListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  var [mouseupListener, setMouseupListener] = (0, import_react.useState)(null);
  var [rightclickListener, setRightclickListener] = (0, import_react.useState)(null);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [dragListener, setDragListener] = (0, import_react.useState)(null);
  var [centerChangedListener, setCenterChangedListener] = (0, import_react.useState)(null);
  var [radiusChangedListener, setRadiusChangedListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (typeof options !== "undefined" && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    if (typeof draggable !== "undefined" && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);
  (0, import_react.useEffect)(() => {
    if (typeof editable !== "undefined" && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);
  (0, import_react.useEffect)(() => {
    if (typeof visible !== "undefined" && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);
  (0, import_react.useEffect)(() => {
    if (typeof radius === "number" && instance !== null) {
      instance.setRadius(radius);
    }
  }, [instance, radius]);
  (0, import_react.useEffect)(() => {
    if (typeof center !== "undefined" && instance !== null) {
      instance.setCenter(center);
    }
  }, [instance, center]);
  (0, import_react.useEffect)(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      setDragendListener(google.maps.event.addListener(instance, "dragend", onDragEnd));
    }
  }, [onDragEnd]);
  (0, import_react.useEffect)(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      setDragstartListener(google.maps.event.addListener(instance, "dragstart", onDragStart));
    }
  }, [onDragStart]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  (0, import_react.useEffect)(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }
      setDragListener(google.maps.event.addListener(instance, "drag", onDrag));
    }
  }, [onDrag]);
  (0, import_react.useEffect)(() => {
    if (instance && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      setCenterChangedListener(google.maps.event.addListener(instance, "center_changed", onCenterChanged));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onRadiusChanged) {
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }
      setRadiusChangedListener(google.maps.event.addListener(instance, "radius_changed", onRadiusChanged));
    }
  }, [onRadiusChanged]);
  (0, import_react.useEffect)(() => {
    var circle = new google.maps.Circle(_objectSpread$6(_objectSpread$6({}, options || defaultOptions), {}, {
      map
    }));
    if (typeof radius === "number") {
      circle.setRadius(radius);
    }
    if (typeof center !== "undefined") {
      circle.setCenter(center);
    }
    if (typeof radius === "number") {
      circle.setRadius(radius);
    }
    if (typeof visible !== "undefined") {
      circle.setVisible(visible);
    }
    if (typeof editable !== "undefined") {
      circle.setEditable(editable);
    }
    if (typeof draggable !== "undefined") {
      circle.setDraggable(draggable);
    }
    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(circle, "dblclick", onDblClick));
    }
    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(circle, "dragend", onDragEnd));
    }
    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(circle, "dragstart", onDragStart));
    }
    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(circle, "mousedown", onMouseDown));
    }
    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(circle, "mousemove", onMouseMove));
    }
    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(circle, "mouseout", onMouseOut));
    }
    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(circle, "mouseover", onMouseOver));
    }
    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(circle, "mouseup", onMouseUp));
    }
    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(circle, "rightclick", onRightClick));
    }
    if (onClick) {
      setClickListener(google.maps.event.addListener(circle, "click", onClick));
    }
    if (onDrag) {
      setDragListener(google.maps.event.addListener(circle, "drag", onDrag));
    }
    if (onCenterChanged) {
      setCenterChangedListener(google.maps.event.addListener(circle, "center_changed", onCenterChanged));
    }
    if (onRadiusChanged) {
      setRadiusChangedListener(google.maps.event.addListener(circle, "radius_changed", onRadiusChanged));
    }
    setInstance(circle);
    if (onLoad) {
      onLoad(circle);
    }
    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }
      if (onUnmount) {
        onUnmount(circle);
      }
      circle.setMap(null);
    };
  }, []);
  return null;
}
var CircleF = (0, import_react.memo)(CircleFunctional);
var Circle = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      circle: null
    });
    _defineProperty(this, "setCircleCallback", () => {
      if (this.state.circle !== null && this.props.onLoad) {
        this.props.onLoad(this.state.circle);
      }
    });
  }
  componentDidMount() {
    var circle = new google.maps.Circle(_objectSpread$6(_objectSpread$6({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$8,
      eventMap: eventMap$8,
      prevProps: {},
      nextProps: this.props,
      instance: circle
    });
    this.setState(function setCircle() {
      return {
        circle
      };
    }, this.setCircleCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.circle !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$8,
        eventMap: eventMap$8,
        prevProps,
        nextProps: this.props,
        instance: this.state.circle
      });
    }
  }
  componentWillUnmount() {
    if (this.state.circle !== null) {
      var _this$state$circle;
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.circle);
      }
      unregisterEvents(this.registeredEvents);
      (_this$state$circle = this.state.circle) === null || _this$state$circle === void 0 || _this$state$circle.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(Circle, "contextType", MapContext);
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$7 = {
  onClick: "click",
  onDblClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick",
  onAddFeature: "addfeature",
  onRemoveFeature: "removefeature",
  onRemoveProperty: "removeproperty",
  onSetGeometry: "setgeometry",
  onSetProperty: "setproperty"
};
var updaterMap$7 = {
  add(instance, feature) {
    instance.add(feature);
  },
  addgeojson(instance, geojson, options) {
    instance.addGeoJson(geojson, options);
  },
  contains(instance, feature) {
    instance.contains(feature);
  },
  foreach(instance, callback) {
    instance.forEach(callback);
  },
  loadgeojson(instance, url, options, callback) {
    instance.loadGeoJson(url, options, callback);
  },
  overridestyle(instance, feature, style) {
    instance.overrideStyle(feature, style);
  },
  remove(instance, feature) {
    instance.remove(feature);
  },
  revertstyle(instance, feature) {
    instance.revertStyle(feature);
  },
  controlposition(instance, controlPosition) {
    instance.setControlPosition(controlPosition);
  },
  controls(instance, controls) {
    instance.setControls(controls);
  },
  drawingmode(instance, mode) {
    instance.setDrawingMode(mode);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  style(instance, style) {
    instance.setStyle(style);
  },
  togeojson(instance, callback) {
    instance.toGeoJson(callback);
  }
};
function DataFunctional(_ref) {
  var {
    options,
    onClick,
    onDblClick,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onAddFeature,
    onRemoveFeature,
    onRemoveProperty,
    onSetGeometry,
    onSetProperty,
    onLoad,
    onUnmount
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  var [dblclickListener, setDblclickListener] = (0, import_react.useState)(null);
  var [mousedownListener, setMousedownListener] = (0, import_react.useState)(null);
  var [mousemoveListener, setMousemoveListener] = (0, import_react.useState)(null);
  var [mouseoutListener, setMouseoutListener] = (0, import_react.useState)(null);
  var [mouseoverListener, setMouseoverListener] = (0, import_react.useState)(null);
  var [mouseupListener, setMouseupListener] = (0, import_react.useState)(null);
  var [rightclickListener, setRightclickListener] = (0, import_react.useState)(null);
  var [clickListener, setClickListener] = (0, import_react.useState)(null);
  var [addFeatureListener, setAddFeatureListener] = (0, import_react.useState)(null);
  var [removeFeatureListener, setRemoveFeatureListener] = (0, import_react.useState)(null);
  var [removePropertyListener, setRemovePropertyListener] = (0, import_react.useState)(null);
  var [setGeometryListener, setSetGeometryListener] = (0, import_react.useState)(null);
  var [setPropertyListener, setSetPropertyListener] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }
      setDblclickListener(google.maps.event.addListener(instance, "dblclick", onDblClick));
    }
  }, [onDblClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }
      setMousedownListener(google.maps.event.addListener(instance, "mousedown", onMouseDown));
    }
  }, [onMouseDown]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }
      setMousemoveListener(google.maps.event.addListener(instance, "mousemove", onMouseMove));
    }
  }, [onMouseMove]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }
      setMouseoutListener(google.maps.event.addListener(instance, "mouseout", onMouseOut));
    }
  }, [onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }
      setMouseoverListener(google.maps.event.addListener(instance, "mouseover", onMouseOver));
    }
  }, [onMouseOver]);
  (0, import_react.useEffect)(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }
      setMouseupListener(google.maps.event.addListener(instance, "mouseup", onMouseUp));
    }
  }, [onMouseUp]);
  (0, import_react.useEffect)(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }
      setRightclickListener(google.maps.event.addListener(instance, "rightclick", onRightClick));
    }
  }, [onRightClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }
      setClickListener(google.maps.event.addListener(instance, "click", onClick));
    }
  }, [onClick]);
  (0, import_react.useEffect)(() => {
    if (instance && onAddFeature) {
      if (addFeatureListener !== null) {
        google.maps.event.removeListener(addFeatureListener);
      }
      setAddFeatureListener(google.maps.event.addListener(instance, "addfeature", onAddFeature));
    }
  }, [onAddFeature]);
  (0, import_react.useEffect)(() => {
    if (instance && onRemoveFeature) {
      if (removeFeatureListener !== null) {
        google.maps.event.removeListener(removeFeatureListener);
      }
      setRemoveFeatureListener(google.maps.event.addListener(instance, "removefeature", onRemoveFeature));
    }
  }, [onRemoveFeature]);
  (0, import_react.useEffect)(() => {
    if (instance && onRemoveProperty) {
      if (removePropertyListener !== null) {
        google.maps.event.removeListener(removePropertyListener);
      }
      setRemovePropertyListener(google.maps.event.addListener(instance, "removeproperty", onRemoveProperty));
    }
  }, [onRemoveProperty]);
  (0, import_react.useEffect)(() => {
    if (instance && onSetGeometry) {
      if (setGeometryListener !== null) {
        google.maps.event.removeListener(setGeometryListener);
      }
      setSetGeometryListener(google.maps.event.addListener(instance, "setgeometry", onSetGeometry));
    }
  }, [onSetGeometry]);
  (0, import_react.useEffect)(() => {
    if (instance && onSetProperty) {
      if (setPropertyListener !== null) {
        google.maps.event.removeListener(setPropertyListener);
      }
      setSetPropertyListener(google.maps.event.addListener(instance, "setproperty", onSetProperty));
    }
  }, [onSetProperty]);
  (0, import_react.useEffect)(() => {
    if (map !== null) {
      var data = new google.maps.Data(_objectSpread$5(_objectSpread$5({}, options), {}, {
        map
      }));
      if (onDblClick) {
        setDblclickListener(google.maps.event.addListener(data, "dblclick", onDblClick));
      }
      if (onMouseDown) {
        setMousedownListener(google.maps.event.addListener(data, "mousedown", onMouseDown));
      }
      if (onMouseMove) {
        setMousemoveListener(google.maps.event.addListener(data, "mousemove", onMouseMove));
      }
      if (onMouseOut) {
        setMouseoutListener(google.maps.event.addListener(data, "mouseout", onMouseOut));
      }
      if (onMouseOver) {
        setMouseoverListener(google.maps.event.addListener(data, "mouseover", onMouseOver));
      }
      if (onMouseUp) {
        setMouseupListener(google.maps.event.addListener(data, "mouseup", onMouseUp));
      }
      if (onRightClick) {
        setRightclickListener(google.maps.event.addListener(data, "rightclick", onRightClick));
      }
      if (onClick) {
        setClickListener(google.maps.event.addListener(data, "click", onClick));
      }
      if (onAddFeature) {
        setAddFeatureListener(google.maps.event.addListener(data, "addfeature", onAddFeature));
      }
      if (onRemoveFeature) {
        setRemoveFeatureListener(google.maps.event.addListener(data, "removefeature", onRemoveFeature));
      }
      if (onRemoveProperty) {
        setRemovePropertyListener(google.maps.event.addListener(data, "removeproperty", onRemoveProperty));
      }
      if (onSetGeometry) {
        setSetGeometryListener(google.maps.event.addListener(data, "setgeometry", onSetGeometry));
      }
      if (onSetProperty) {
        setSetPropertyListener(google.maps.event.addListener(data, "setproperty", onSetProperty));
      }
      setInstance(data);
      if (onLoad) {
        onLoad(data);
      }
    }
    return () => {
      if (instance) {
        if (dblclickListener !== null) {
          google.maps.event.removeListener(dblclickListener);
        }
        if (mousedownListener !== null) {
          google.maps.event.removeListener(mousedownListener);
        }
        if (mousemoveListener !== null) {
          google.maps.event.removeListener(mousemoveListener);
        }
        if (mouseoutListener !== null) {
          google.maps.event.removeListener(mouseoutListener);
        }
        if (mouseoverListener !== null) {
          google.maps.event.removeListener(mouseoverListener);
        }
        if (mouseupListener !== null) {
          google.maps.event.removeListener(mouseupListener);
        }
        if (rightclickListener !== null) {
          google.maps.event.removeListener(rightclickListener);
        }
        if (clickListener !== null) {
          google.maps.event.removeListener(clickListener);
        }
        if (addFeatureListener !== null) {
          google.maps.event.removeListener(addFeatureListener);
        }
        if (removeFeatureListener !== null) {
          google.maps.event.removeListener(removeFeatureListener);
        }
        if (removePropertyListener !== null) {
          google.maps.event.removeListener(removePropertyListener);
        }
        if (setGeometryListener !== null) {
          google.maps.event.removeListener(setGeometryListener);
        }
        if (setPropertyListener !== null) {
          google.maps.event.removeListener(setPropertyListener);
        }
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
var DataF = (0, import_react.memo)(DataFunctional);
var Data = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      data: null
    });
    _defineProperty(this, "setDataCallback", () => {
      if (this.state.data !== null && this.props.onLoad) {
        this.props.onLoad(this.state.data);
      }
    });
  }
  componentDidMount() {
    if (this.context !== null) {
      var data = new google.maps.Data(_objectSpread$5(_objectSpread$5({}, this.props.options), {}, {
        map: this.context
      }));
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$7,
        eventMap: eventMap$7,
        prevProps: {},
        nextProps: this.props,
        instance: data
      });
      this.setState(() => {
        return {
          data
        };
      }, this.setDataCallback);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.data !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$7,
        eventMap: eventMap$7,
        prevProps,
        nextProps: this.props,
        instance: this.state.data
      });
    }
  }
  componentWillUnmount() {
    if (this.state.data !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.data);
      }
      unregisterEvents(this.registeredEvents);
      if (this.state.data) {
        this.state.data.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
};
_defineProperty(Data, "contextType", MapContext);
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$6 = {
  onClick: "click",
  onDefaultViewportChanged: "defaultviewport_changed",
  onStatusChanged: "status_changed"
};
var updaterMap$6 = {
  options(instance, options) {
    instance.setOptions(options);
  },
  url(instance, url) {
    instance.setUrl(url);
  },
  zIndex(instance, zIndex) {
    instance.setZIndex(zIndex);
  }
};
var KmlLayer = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      kmlLayer: null
    });
    _defineProperty(this, "setKmlLayerCallback", () => {
      if (this.state.kmlLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.kmlLayer);
      }
    });
  }
  componentDidMount() {
    var kmlLayer = new google.maps.KmlLayer(_objectSpread$4(_objectSpread$4({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$6,
      eventMap: eventMap$6,
      prevProps: {},
      nextProps: this.props,
      instance: kmlLayer
    });
    this.setState(function setLmlLayer() {
      return {
        kmlLayer
      };
    }, this.setKmlLayerCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.kmlLayer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$6,
        eventMap: eventMap$6,
        prevProps,
        nextProps: this.props,
        instance: this.state.kmlLayer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.kmlLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.kmlLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.kmlLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(KmlLayer, "contextType", MapContext);
function getOffsetOverride(containerElement, getPixelPositionOffset) {
  return typeof getPixelPositionOffset === "function" ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight) : {
    x: 0,
    y: 0
  };
}
function createLatLng(inst, Type) {
  return new Type(inst.lat, inst.lng);
}
function createLatLngBounds(inst, Type) {
  return new Type(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
}
function ensureOfType(inst, type, factory) {
  return inst instanceof type ? inst : factory(inst, type);
}
function ensureOfTypeBounds(inst, type, factory) {
  return inst instanceof type ? inst : factory(inst, type);
}
function getLayoutStylesByBounds(mapCanvasProjection, offset, bounds) {
  var ne = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
  var sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
  if (ne && sw) {
    return {
      left: "".concat(sw.x + offset.x, "px"),
      top: "".concat(ne.y + offset.y, "px"),
      width: "".concat(ne.x - sw.x - offset.x, "px"),
      height: "".concat(sw.y - ne.y - offset.y, "px")
    };
  }
  return {
    left: "-9999px",
    top: "-9999px"
  };
}
function getLayoutStylesByPosition(mapCanvasProjection, offset, position) {
  var point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position);
  if (point) {
    var {
      x,
      y
    } = point;
    return {
      left: "".concat(x + offset.x, "px"),
      top: "".concat(y + offset.y, "px")
    };
  }
  return {
    left: "-9999px",
    top: "-9999px"
  };
}
function getLayoutStyles(mapCanvasProjection, offset, bounds, position) {
  return bounds !== void 0 ? getLayoutStylesByBounds(mapCanvasProjection, offset, ensureOfTypeBounds(bounds, google.maps.LatLngBounds, createLatLngBounds)) : getLayoutStylesByPosition(mapCanvasProjection, offset, ensureOfType(position, google.maps.LatLng, createLatLng));
}
function arePositionsEqual(currentPosition, previousPosition) {
  return currentPosition.left === previousPosition.left && currentPosition.top === previousPosition.top && currentPosition.width === previousPosition.height && currentPosition.height === previousPosition.height;
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function createOverlay(container, pane, position, bounds, getPixelPositionOffset) {
  class Overlay extends google.maps.OverlayView {
    constructor(container2, pane2, position2, bounds2) {
      super();
      this.container = container2;
      this.pane = pane2;
      this.position = position2;
      this.bounds = bounds2;
    }
    onAdd() {
      var _this$getPanes;
      var pane2 = (_this$getPanes = this.getPanes()) === null || _this$getPanes === void 0 ? void 0 : _this$getPanes[this.pane];
      pane2 === null || pane2 === void 0 || pane2.appendChild(this.container);
    }
    draw() {
      var projection = this.getProjection();
      var offset = _objectSpread$3({}, this.container ? getOffsetOverride(this.container, getPixelPositionOffset) : {
        x: 0,
        y: 0
      });
      var layoutStyles = getLayoutStyles(projection, offset, this.bounds, this.position);
      for (var [key, value] of Object.entries(layoutStyles)) {
        this.container.style[key] = value;
      }
    }
    onRemove() {
      if (this.container.parentNode !== null) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }
  return new Overlay(container, pane, position, bounds);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function convertToLatLngString(latLngLike) {
  if (!latLngLike) {
    return "";
  }
  var latLng = latLngLike instanceof google.maps.LatLng ? latLngLike : new google.maps.LatLng(latLngLike.lat, latLngLike.lng);
  return latLng + "";
}
function convertToLatLngBoundsString(latLngBoundsLike) {
  if (!latLngBoundsLike) {
    return "";
  }
  var latLngBounds = latLngBoundsLike instanceof google.maps.LatLngBounds ? latLngBoundsLike : new google.maps.LatLngBounds(new google.maps.LatLng(latLngBoundsLike.south, latLngBoundsLike.east), new google.maps.LatLng(latLngBoundsLike.north, latLngBoundsLike.west));
  return latLngBounds + "";
}
var FLOAT_PANE = "floatPane";
var MAP_PANE = "mapPane";
var MARKER_LAYER = "markerLayer";
var OVERLAY_LAYER = "overlayLayer";
var OVERLAY_MOUSE_TARGET = "overlayMouseTarget";
function OverlayViewFunctional(_ref) {
  var {
    position,
    bounds,
    mapPaneName,
    zIndex,
    onLoad,
    onUnmount,
    getPixelPositionOffset,
    children
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var container = (0, import_react.useMemo)(() => {
    var div = document.createElement("div");
    div.style.position = "absolute";
    return div;
  }, []);
  var overlay = (0, import_react.useMemo)(() => {
    return createOverlay(container, mapPaneName, position, bounds, getPixelPositionOffset);
  }, [container, mapPaneName, position, bounds]);
  (0, import_react.useEffect)(() => {
    onLoad === null || onLoad === void 0 || onLoad(overlay);
    overlay === null || overlay === void 0 || overlay.setMap(map);
    return () => {
      onUnmount === null || onUnmount === void 0 || onUnmount(overlay);
      overlay === null || overlay === void 0 || overlay.setMap(null);
    };
  }, [map, overlay]);
  (0, import_react.useEffect)(() => {
    container.style.zIndex = "".concat(zIndex);
  }, [zIndex, container]);
  return ReactDOM.createPortal(children, container);
}
var OverlayViewF = (0, import_react.memo)(OverlayViewFunctional);
var OverlayView = class extends import_react.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "state", {
      paneEl: null,
      containerStyle: {
        // set initial position
        position: "absolute"
      }
    });
    _defineProperty(this, "updatePane", () => {
      var mapPaneName = this.props.mapPaneName;
      var mapPanes = this.overlayView.getPanes();
      invariant(!!mapPaneName, "OverlayView requires props.mapPaneName but got %s", mapPaneName);
      if (mapPanes) {
        this.setState({
          paneEl: mapPanes[mapPaneName]
        });
      } else {
        this.setState({
          paneEl: null
        });
      }
    });
    _defineProperty(this, "onAdd", () => {
      var _this$props$onLoad, _this$props;
      this.updatePane();
      (_this$props$onLoad = (_this$props = this.props).onLoad) === null || _this$props$onLoad === void 0 || _this$props$onLoad.call(_this$props, this.overlayView);
    });
    _defineProperty(this, "onPositionElement", () => {
      var mapCanvasProjection = this.overlayView.getProjection();
      var offset = _objectSpread$2({
        x: 0,
        y: 0
      }, this.containerRef.current ? getOffsetOverride(this.containerRef.current, this.props.getPixelPositionOffset) : {});
      var layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props.bounds, this.props.position);
      if (!arePositionsEqual(layoutStyles, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        left: this.state.containerStyle.left,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        top: this.state.containerStyle.top,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        width: this.state.containerStyle.width,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        height: this.state.containerStyle.height
      })) {
        var _layoutStyles$top, _layoutStyles$left, _layoutStyles$width, _layoutStyles$height;
        this.setState({
          containerStyle: {
            top: (_layoutStyles$top = layoutStyles.top) !== null && _layoutStyles$top !== void 0 ? _layoutStyles$top : 0,
            left: (_layoutStyles$left = layoutStyles.left) !== null && _layoutStyles$left !== void 0 ? _layoutStyles$left : 0,
            width: (_layoutStyles$width = layoutStyles.width) !== null && _layoutStyles$width !== void 0 ? _layoutStyles$width : 0,
            height: (_layoutStyles$height = layoutStyles.height) !== null && _layoutStyles$height !== void 0 ? _layoutStyles$height : 0,
            position: "absolute"
          }
        });
      }
    });
    _defineProperty(this, "draw", () => {
      this.onPositionElement();
    });
    _defineProperty(this, "onRemove", () => {
      var _this$props$onUnmount, _this$props2;
      this.setState(() => ({
        paneEl: null
      }));
      (_this$props$onUnmount = (_this$props2 = this.props).onUnmount) === null || _this$props$onUnmount === void 0 || _this$props$onUnmount.call(_this$props2, this.overlayView);
    });
    this.containerRef = (0, import_react.createRef)();
    var overlayView = new google.maps.OverlayView();
    overlayView.onAdd = this.onAdd;
    overlayView.draw = this.draw;
    overlayView.onRemove = this.onRemove;
    this.overlayView = overlayView;
  }
  componentDidMount() {
    this.overlayView.setMap(this.context);
  }
  componentDidUpdate(prevProps) {
    var prevPositionString = convertToLatLngString(prevProps.position);
    var positionString = convertToLatLngString(this.props.position);
    var prevBoundsString = convertToLatLngBoundsString(prevProps.bounds);
    var boundsString = convertToLatLngBoundsString(this.props.bounds);
    if (prevPositionString !== positionString || prevBoundsString !== boundsString) {
      this.overlayView.draw();
    }
    if (prevProps.mapPaneName !== this.props.mapPaneName) {
      this.updatePane();
    }
  }
  componentWillUnmount() {
    this.overlayView.setMap(null);
  }
  render() {
    var paneEl = this.state.paneEl;
    if (paneEl) {
      return ReactDOM.createPortal((0, import_jsx_runtime.jsx)("div", {
        ref: this.containerRef,
        style: this.state.containerStyle,
        children: import_react.Children.only(this.props.children)
      }), paneEl);
    } else {
      return null;
    }
  }
};
_defineProperty(OverlayView, "FLOAT_PANE", "floatPane");
_defineProperty(OverlayView, "MAP_PANE", "mapPane");
_defineProperty(OverlayView, "MARKER_LAYER", "markerLayer");
_defineProperty(OverlayView, "OVERLAY_LAYER", "overlayLayer");
_defineProperty(OverlayView, "OVERLAY_MOUSE_TARGET", "overlayMouseTarget");
_defineProperty(OverlayView, "contextType", MapContext);
function noop() {
  return;
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$5 = {
  onDblClick: "dblclick",
  onClick: "click"
};
var updaterMap$5 = {
  opacity(instance, opacity) {
    instance.setOpacity(opacity);
  }
};
function GroundOverlayFunctional(_ref) {
  var {
    url,
    bounds,
    options,
    visible
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
  var groundOverlay = (0, import_react.useMemo)(() => {
    return new google.maps.GroundOverlay(url, imageBounds, options);
  }, []);
  (0, import_react.useEffect)(() => {
    if (groundOverlay !== null) {
      groundOverlay.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (typeof url !== "undefined" && groundOverlay !== null) {
      groundOverlay.set("url", url);
      groundOverlay.setMap(map);
    }
  }, [groundOverlay, url]);
  (0, import_react.useEffect)(() => {
    if (typeof visible !== "undefined" && groundOverlay !== null) {
      groundOverlay.setOpacity(visible ? 1 : 0);
    }
  }, [groundOverlay, visible]);
  (0, import_react.useEffect)(() => {
    var newBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
    if (typeof bounds !== "undefined" && groundOverlay !== null) {
      groundOverlay.set("bounds", newBounds);
      groundOverlay.setMap(map);
    }
  }, [groundOverlay, bounds]);
  return null;
}
var GroundOverlayF = (0, import_react.memo)(GroundOverlayFunctional);
var GroundOverlay = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      groundOverlay: null
    });
    _defineProperty(this, "setGroundOverlayCallback", () => {
      if (this.state.groundOverlay !== null && this.props.onLoad) {
        this.props.onLoad(this.state.groundOverlay);
      }
    });
  }
  componentDidMount() {
    invariant(!!this.props.url || !!this.props.bounds, "For GroundOverlay, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by `react-google-maps-api`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just `key={url}` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655");
    var groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, _objectSpread$1(_objectSpread$1({}, this.props.options), {}, {
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$5,
      eventMap: eventMap$5,
      prevProps: {},
      nextProps: this.props,
      instance: groundOverlay
    });
    this.setState(function setGroundOverlay() {
      return {
        groundOverlay
      };
    }, this.setGroundOverlayCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.groundOverlay !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$5,
        eventMap: eventMap$5,
        prevProps,
        nextProps: this.props,
        instance: this.state.groundOverlay
      });
    }
  }
  componentWillUnmount() {
    if (this.state.groundOverlay) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.groundOverlay);
      }
      this.state.groundOverlay.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(GroundOverlay, "defaultProps", {
  onLoad: noop
});
_defineProperty(GroundOverlay, "contextType", MapContext);
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var eventMap$4 = {};
var updaterMap$4 = {
  data(instance, data) {
    instance.setData(data);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  }
};
function HeatmapLayerFunctional(_ref) {
  var {
    data,
    onLoad,
    onUnmount,
    options
  } = _ref;
  var map = (0, import_react.useContext)(MapContext);
  var [instance, setInstance] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (!google.maps.visualization) {
      invariant(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} in useJsApiScript? %s', google.maps.visualization);
    }
  }, []);
  (0, import_react.useEffect)(() => {
    invariant(!!data, "data property is required in HeatmapLayer %s", data);
  }, [data]);
  (0, import_react.useEffect)(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);
  (0, import_react.useEffect)(() => {
    var heatmapLayer = new google.maps.visualization.HeatmapLayer(_objectSpread(_objectSpread({}, options), {}, {
      data,
      map
    }));
    setInstance(heatmapLayer);
    if (onLoad) {
      onLoad(heatmapLayer);
    }
    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }
        instance.setMap(null);
      }
    };
  }, []);
  return null;
}
var HeatmapLayerF = (0, import_react.memo)(HeatmapLayerFunctional);
var HeatmapLayer = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      heatmapLayer: null
    });
    _defineProperty(this, "setHeatmapLayerCallback", () => {
      if (this.state.heatmapLayer !== null && this.props.onLoad) {
        this.props.onLoad(this.state.heatmapLayer);
      }
    });
  }
  componentDidMount() {
    invariant(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} to <LoadScript />? %s', google.maps.visualization);
    invariant(!!this.props.data, "data property is required in HeatmapLayer %s", this.props.data);
    var heatmapLayer = new google.maps.visualization.HeatmapLayer(_objectSpread(_objectSpread({}, this.props.options), {}, {
      data: this.props.data,
      map: this.context
    }));
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$4,
      eventMap: eventMap$4,
      prevProps: {},
      nextProps: this.props,
      instance: heatmapLayer
    });
    this.setState(function setHeatmapLayer() {
      return {
        heatmapLayer
      };
    }, this.setHeatmapLayerCallback);
  }
  componentDidUpdate(prevProps) {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$4,
      eventMap: eventMap$4,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer
    });
  }
  componentWillUnmount() {
    if (this.state.heatmapLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.heatmapLayer);
      }
      unregisterEvents(this.registeredEvents);
      this.state.heatmapLayer.setMap(null);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(HeatmapLayer, "contextType", MapContext);
var eventMap$3 = {
  onCloseClick: "closeclick",
  onPanoChanged: "pano_changed",
  onPositionChanged: "position_changed",
  onPovChanged: "pov_changed",
  onResize: "resize",
  onStatusChanged: "status_changed",
  onVisibleChanged: "visible_changed",
  onZoomChanged: "zoom_changed"
};
var updaterMap$3 = {
  register(instance, provider, options) {
    instance.registerPanoProvider(provider, options);
  },
  links(instance, links) {
    instance.setLinks(links);
  },
  motionTracking(instance, motionTracking) {
    instance.setMotionTracking(motionTracking);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  pano(instance, pano) {
    instance.setPano(pano);
  },
  position(instance, position) {
    instance.setPosition(position);
  },
  pov(instance, pov) {
    instance.setPov(pov);
  },
  visible(instance, visible) {
    instance.setVisible(visible);
  },
  zoom(instance, zoom) {
    instance.setZoom(zoom);
  }
};
var StreetViewPanorama = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      streetViewPanorama: null
    });
    _defineProperty(this, "setStreetViewPanoramaCallback", () => {
      if (this.state.streetViewPanorama !== null && this.props.onLoad) {
        this.props.onLoad(this.state.streetViewPanorama);
      }
    });
  }
  componentDidMount() {
    var _this$context$getStre, _this$context;
    var streetViewPanorama = (_this$context$getStre = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.getStreetView()) !== null && _this$context$getStre !== void 0 ? _this$context$getStre : null;
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$3,
      eventMap: eventMap$3,
      prevProps: {},
      nextProps: this.props,
      instance: streetViewPanorama
    });
    this.setState(() => {
      return {
        streetViewPanorama
      };
    }, this.setStreetViewPanoramaCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.streetViewPanorama !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$3,
        eventMap: eventMap$3,
        prevProps,
        nextProps: this.props,
        instance: this.state.streetViewPanorama
      });
    }
  }
  componentWillUnmount() {
    if (this.state.streetViewPanorama !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.streetViewPanorama);
      }
      unregisterEvents(this.registeredEvents);
      this.state.streetViewPanorama.setVisible(false);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(StreetViewPanorama, "contextType", MapContext);
var StreetViewService = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      streetViewService: null
    });
    _defineProperty(this, "setStreetViewServiceCallback", () => {
      if (this.state.streetViewService !== null && this.props.onLoad) {
        this.props.onLoad(this.state.streetViewService);
      }
    });
  }
  componentDidMount() {
    var streetViewService = new google.maps.StreetViewService();
    this.setState(function setStreetViewService() {
      return {
        streetViewService
      };
    }, this.setStreetViewServiceCallback);
  }
  componentWillUnmount() {
    if (this.state.streetViewService !== null && this.props.onUnmount) {
      this.props.onUnmount(this.state.streetViewService);
    }
  }
  render() {
    return null;
  }
};
_defineProperty(StreetViewService, "contextType", MapContext);
var DirectionsService = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      directionsService: null
    });
    _defineProperty(this, "setDirectionsServiceCallback", () => {
      if (this.state.directionsService !== null && this.props.onLoad) {
        this.props.onLoad(this.state.directionsService);
      }
    });
  }
  componentDidMount() {
    invariant(!!this.props.options, "DirectionsService expected options object as parameter, but got %s", this.props.options);
    var directionsService = new google.maps.DirectionsService();
    this.setState(function setDirectionsService() {
      return {
        directionsService
      };
    }, this.setDirectionsServiceCallback);
  }
  componentDidUpdate() {
    if (this.state.directionsService !== null) {
      this.state.directionsService.route(this.props.options, this.props.callback);
    }
  }
  componentWillUnmount() {
    if (this.state.directionsService !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.directionsService);
      }
    }
  }
  render() {
    return null;
  }
};
var eventMap$2 = {
  onDirectionsChanged: "directions_changed"
};
var updaterMap$2 = {
  directions(instance, directions) {
    instance.setDirections(directions);
  },
  map(instance, map) {
    instance.setMap(map);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  panel(instance, panel) {
    instance.setPanel(panel);
  },
  routeIndex(instance, routeIndex) {
    instance.setRouteIndex(routeIndex);
  }
};
var DirectionsRenderer = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "state", {
      directionsRenderer: null
    });
    _defineProperty(this, "setDirectionsRendererCallback", () => {
      if (this.state.directionsRenderer !== null) {
        this.state.directionsRenderer.setMap(this.context);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.directionsRenderer);
        }
      }
    });
  }
  componentDidMount() {
    var directionsRenderer = new google.maps.DirectionsRenderer(this.props.options);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap: updaterMap$2,
      eventMap: eventMap$2,
      prevProps: {},
      nextProps: this.props,
      instance: directionsRenderer
    });
    this.setState(function setDirectionsRenderer() {
      return {
        directionsRenderer
      };
    }, this.setDirectionsRendererCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.state.directionsRenderer !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$2,
        eventMap: eventMap$2,
        prevProps,
        nextProps: this.props,
        instance: this.state.directionsRenderer
      });
    }
  }
  componentWillUnmount() {
    if (this.state.directionsRenderer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.directionsRenderer);
      }
      unregisterEvents(this.registeredEvents);
      if (this.state.directionsRenderer) {
        this.state.directionsRenderer.setMap(null);
      }
    }
  }
  render() {
    return null;
  }
};
_defineProperty(DirectionsRenderer, "contextType", MapContext);
var DistanceMatrixService = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      distanceMatrixService: null
    });
    _defineProperty(this, "setDistanceMatrixServiceCallback", () => {
      if (this.state.distanceMatrixService !== null && this.props.onLoad) {
        this.props.onLoad(this.state.distanceMatrixService);
      }
    });
  }
  componentDidMount() {
    invariant(!!this.props.options, "DistanceMatrixService expected options object as parameter, but go %s", this.props.options);
    var distanceMatrixService = new google.maps.DistanceMatrixService();
    this.setState(function setDistanceMatrixService() {
      return {
        distanceMatrixService
      };
    }, this.setDistanceMatrixServiceCallback);
  }
  componentDidUpdate() {
    if (this.state.distanceMatrixService !== null) {
      this.state.distanceMatrixService.getDistanceMatrix(this.props.options, this.props.callback);
    }
  }
  componentWillUnmount() {
    if (this.state.distanceMatrixService !== null && this.props.onUnmount) {
      this.props.onUnmount(this.state.distanceMatrixService);
    }
  }
  render() {
    return null;
  }
};
var eventMap$1 = {
  onPlacesChanged: "places_changed"
};
var updaterMap$1 = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  }
};
var StandaloneSearchBox = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", (0, import_react.createRef)());
    _defineProperty(this, "state", {
      searchBox: null
    });
    _defineProperty(this, "setSearchBoxCallback", () => {
      if (this.state.searchBox !== null && this.props.onLoad) {
        this.props.onLoad(this.state.searchBox);
      }
    });
  }
  componentDidMount() {
    invariant(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
    if (this.containerElement !== null && this.containerElement.current !== null) {
      var input = this.containerElement.current.querySelector("input");
      if (input !== null) {
        var searchBox = new google.maps.places.SearchBox(input, this.props.options);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap: updaterMap$1,
          eventMap: eventMap$1,
          prevProps: {},
          nextProps: this.props,
          instance: searchBox
        });
        this.setState(function setSearchBox() {
          return {
            searchBox
          };
        }, this.setSearchBoxCallback);
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.searchBox !== null) {
      unregisterEvents(this.registeredEvents);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap: updaterMap$1,
        eventMap: eventMap$1,
        prevProps,
        nextProps: this.props,
        instance: this.state.searchBox
      });
    }
  }
  componentWillUnmount() {
    if (this.state.searchBox !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.searchBox);
      }
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return (0, import_jsx_runtime.jsx)("div", {
      ref: this.containerElement,
      children: import_react.Children.only(this.props.children)
    });
  }
};
_defineProperty(StandaloneSearchBox, "contextType", MapContext);
var eventMap = {
  onPlaceChanged: "place_changed"
};
var updaterMap = {
  bounds(instance, bounds) {
    instance.setBounds(bounds);
  },
  restrictions(instance, restrictions) {
    instance.setComponentRestrictions(restrictions);
  },
  fields(instance, fields) {
    instance.setFields(fields);
  },
  options(instance, options) {
    instance.setOptions(options);
  },
  types(instance, types) {
    instance.setTypes(types);
  }
};
var Autocomplete = class extends import_react.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "registeredEvents", []);
    _defineProperty(this, "containerElement", (0, import_react.createRef)());
    _defineProperty(this, "state", {
      autocomplete: null
    });
    _defineProperty(this, "setAutocompleteCallback", () => {
      if (this.state.autocomplete !== null && this.props.onLoad) {
        this.props.onLoad(this.state.autocomplete);
      }
    });
  }
  componentDidMount() {
    var _this$containerElemen;
    invariant(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
    var input = (_this$containerElemen = this.containerElement.current) === null || _this$containerElemen === void 0 ? void 0 : _this$containerElemen.querySelector("input");
    if (input) {
      var autocomplete = new google.maps.places.Autocomplete(input, this.props.options);
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: autocomplete
      });
      this.setState(() => {
        return {
          autocomplete
        };
      }, this.setAutocompleteCallback);
    }
  }
  componentDidUpdate(prevProps) {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.autocomplete
    });
  }
  componentWillUnmount() {
    if (this.state.autocomplete !== null) {
      unregisterEvents(this.registeredEvents);
    }
  }
  render() {
    return (0, import_jsx_runtime.jsx)("div", {
      ref: this.containerElement,
      className: this.props.className,
      children: import_react.Children.only(this.props.children)
    });
  }
};
_defineProperty(Autocomplete, "defaultProps", {
  className: ""
});
_defineProperty(Autocomplete, "contextType", MapContext);
export {
  Autocomplete,
  BicyclingLayer,
  BicyclingLayerF,
  Circle,
  CircleF,
  Data,
  DataF,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  DrawingManager,
  DrawingManagerF,
  FLOAT_PANE,
  GoogleMap,
  index_esm as GoogleMapsMarkerClusterer,
  GoogleMarkerClusterer$1 as GoogleMarkerClusterer,
  GroundOverlay,
  GroundOverlayF,
  HeatmapLayer,
  HeatmapLayerF,
  InfoBoxComponent as InfoBox,
  InfoBoxF,
  InfoWindow,
  InfoWindowF,
  KmlLayer,
  LoadScript,
  LoadScriptNext$1 as LoadScriptNext,
  MAP_PANE,
  MARKER_LAYER,
  MapContext,
  Marker,
  ClustererComponent as MarkerClusterer,
  MarkerClustererF,
  MarkerF,
  OVERLAY_LAYER,
  OVERLAY_MOUSE_TARGET,
  OverlayView,
  OverlayViewF,
  Polygon,
  PolygonF,
  Polyline,
  PolylineF,
  Rectangle,
  RectangleF,
  StandaloneSearchBox,
  StreetViewPanorama,
  StreetViewService,
  TrafficLayer,
  TrafficLayerF,
  TransitLayer,
  TransitLayerF,
  useGoogleMap,
  useJsApiLoader,
  useLoadScript
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@react-google-maps/api/dist/esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=@react-google-maps_api.js.map
