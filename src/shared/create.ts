export const createPluginName = (
	repeat: boolean = false
) => {
	let i = 0
	return (name: string) => {
		if (repeat) {
			return `vite-plugin-${name}:${i++}`
		}
		return `vite-plugin-${name}`
	}
}
