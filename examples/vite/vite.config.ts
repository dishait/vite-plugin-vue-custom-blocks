import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import CustomBlocks from 'vite-plugin-vue-custom-blocks'

export default defineConfig({
	plugins: [Vue(), Inspect(), CustomBlocks()]
})
