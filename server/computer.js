

export default x => new Promise((accept, reject) => {
		if (x == 'this will fail') {
			reject(Error('failed...'))
		}
		setTimeout(() => {
			accept(x.length)
		}, Math.random() * 1000)
	})