import defu from 'defu'
import { Plugin } from 'vite'
import { load } from 'js-yaml'
import { getCurrentInstance } from 'vue'
import { createPluginName } from './shared/create'

type Langs = 'json' | 'yaml' | 'yml'

interface Options {
	include: Partial<{
		/**
		 * 被解析的标签
		 */
		tags: string[]
		/**
		 * 允许的解析格式
		 * @default ['json', 'yaml']
		 */
		langs: Langs[]
	}>
}

const useName = createPluginName(true)

const usePlugin = (
	options: Partial<Options> = {}
): Plugin => {
	let { include } = defu(
		{
			include: {
				tags: ['custom-block'],
				langs: ['json', 'yaml', 'yml']
			}
		},
		options
	)

	return {
		enforce: 'pre',
		name: useName('vue-custom-blocks'),
		configResolved(config) {
			const plugin = config.plugins.find(
				p => p.name === 'vite:json'
			)
			if (plugin) {
				plugin.transform = () => null
			}
		},
		transform(code, id) {
			const inTags = include.tags.some(type => {
				const reg = new RegExp(`vue&type=${type}`)
				return reg.test(id)
			})

			if (!inTags) {
				return
			}

			const inLangs = include.langs.some(type => {
				const reg = new RegExp(`lang.${type}`)
				return reg.test(id)
			})

			if (!inLangs) {
				return
			}

			const [_, lang] = id.match(/lang.(\w+)/)!

			const isJson = lang === 'json'

			if (isJson) {
				return `export default Compont => {
					Compont.CUSTOM_BLOCK = ${code}
				}`
			}

			const isYaml = lang === 'yaml' || lang === 'yml'

			if (isYaml) {
				let output = load(code)
				output = JSON.stringify(output, null, 2)
				return `export default Compont => {
					Compont.CUSTOM_BLOCK = ${output}
				}`
			}
		}
	}
}

export const useCustomBlock = () => {
	const instance = getCurrentInstance()
	// @ts-ignore
	return instance!.type.CUSTOM_BLOCK
}

export default usePlugin
