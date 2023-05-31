// classnames 源码
(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

// ------------- css命名技巧 Block(模块名) Element(节点名) Modifier(状态) -----------------------
const ClassName = () => {
  return (
    <>
      <button className={window.classNames({
        'btn': true,
      })}>class</button>
      <button className={window.classNames(['primary-button', 'button'])}>hello world</button>
      <button className={window.classNames('primary', 'danger', 'default')}>58924</button>
    </>
  )
}

const App = () => (
  <ClassName/>
)

createRoot(document.getElementById('class-app')).render(
  <App/>
)

/**
 * react-css-modules
*/