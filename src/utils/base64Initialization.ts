import { decode, encode } from 'base-64';

function BtoaInitialization() {
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }
}


BtoaInitialization();



