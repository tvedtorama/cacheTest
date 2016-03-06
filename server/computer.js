

export default x => new Promise((accept, reject) => {
		setTimeout(() => {
			accept(x.length)
		}, Math.random() * 1000)
	})