import { isEmpty } from './extensions/objectExtensions';
export class Middlewares {

	static middlewareError(next: any, error: any) {
		if (!isEmpty(error)) { next() }
	}

}
