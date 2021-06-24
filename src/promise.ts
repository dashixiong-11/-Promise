
class Promise2 {
	succeed = null
	fail = null
	callbacks = []
	state = 'pending'
	resolve(result) {
		if (this.state !== 'pending') return
		this.state = 'fulfilled'
		setTimeout(() => {
			this.callbacks.forEach(handle => {
				handle[0] && handle[0](result)
			})
		}, 0)
	}
	reject(reason) {
		if (this.state !== 'pending') return
		this.state = 'rejected'
		setTimeout(() => {
			this.callbacks.forEach(handle => {
				handle[1] && handle[1](reason)
			})
		}, 0)
	}
	constructor(fn) {
		if (typeof fn !== 'function') {
			throw new Error('必须传一个函数')
		}
		fn(this.resolve.bind(this), this.reject.bind(this))
	}
	then(succeed?, fail?) {
		const handle = []
		if (typeof succeed === 'function') {
			handle[0] = succeed
		}
		if (typeof fail === 'function') {
			handle[1] = succeed
		}
		this.callbacks.push(handle)
	}
}

export default Promise2