
// convert object to request params
export function objectToParams(object) {
    let params = [];
    for (const key in object) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
    }
    return params.join('&');
}

// extract request params from url link and convert it to an object
export function paramsToObject(url) {
	const queryString = url.split('?')[1].split('#')[0];

	const query = {};
	queryString.split('&').forEach((param) => {
	    const dict = param.split('=');
	    query[dict[0]] = dict[1];
	});

	return query;
}


