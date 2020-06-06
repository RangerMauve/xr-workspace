import {XRPackageEngine, XRPackage} from 'https://xrpackage.org/xrpackage.js';

run()

async function run() {
	const pe = new XRPackageEngine();
	document.body.appendChild(pe.domElement);

	const res = await fetch('./packages/xr-terminal.wbn'); // built package stored somewhere
	const arrayBuffer = await res.arrayBuffer();
	const p = new XRPackage(new Uint8Array(arrayBuffer));

	await pe.add(p);

	window.package = p

	const frame = p.context.iframe.contentWindow

	document.body
		.addEventListener('keydown', (e) => frame.document.body.dispatchEvent(new KeyboardEvent('keydown', e)), true)
	document.body
		.addEventListener('keyup', (e) => frame.document.body.dispatchEvent(new KeyboardEvent('keyup', e)), true)
	document.body
		.addEventListener('keypress', (e) => frame.document.body.dispatchEvent(new KeyboardEvent('keypress', e)), true)
}
