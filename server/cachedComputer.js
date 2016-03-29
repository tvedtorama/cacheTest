import cacheManager from 'cache-manager'
import computer from './computer'

let mainCache = cacheManager.caching({store: 'memory', max: 100, ttl: 10/*seconds*/})


export default x => new Promise((accept, reject) => {
		mainCache.wrap(x, () => {
			return computer(x)
		}).then(result => {
			accept(result)
		}, err => {
			reject(err)
		})
	})
