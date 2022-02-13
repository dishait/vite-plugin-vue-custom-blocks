# vite-plugin-vue-custom-blocks

vue sfc 的自定义块 `vite` 插件

<br />

## Motivation 🐇

有时候我们想要在单文件组件 `SFC` 内进行设置一些对象，但是写到 `setup` 中又太拥挤了。所以有了这个自定义块的插件 🤗🤗 

<br />
<br />

## Features 🦖

- json 解析
- yaml 解析


<br />
<br />

## 使用 🦕

### 安装

```shell
pnpm i vite-plugin-vue-custom-blocks -D

# npm i vite-plugin-vue-custom-blocks -D
# yarn add vite-plugin-vue-custom-blocks -D
```

<br />

### 配置插件

```ts
// vite.config.ts 或者 vite.config.js

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import CustomBlocks from 'vite-plugin-vue-custom-blocks'

export default defineConfig({
    plugins: [
        Vue(), 
        CustomBlocks()
    ]
})
```

#### 具体配置

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import CustomBlocks from 'vite-plugin-vue-custom-blocks'

export default defineConfig({
    plugins: [
        Vue(), 
        CustomBlocks({
            include: {
                tags: ['custom-block'], // 标签名, 默认只解析 custom-block
                langs: ['json', 'yaml'] // 允许的解析方式，默认支持 json 和 yaml 解析
            }
        })
    ]
})
```

<br />

### `SFC` 模板中

#### json 解析

```html
<script lang="ts" setup>
import { useCustomBlock } from "vite-plugin-vue-custom-blocks"

const block = useCustomBlock()

console.log(block) // 将输出 { foo: 'bar' }
</script>

<template>Hello, world!!</template>

<style>
</style>

<custom-block lang="json">
{
    "foo": "bar"
}
</custom-block>
```

#### yaml 解析

```html
<script lang="ts" setup>
import { useCustomBlock } from "vite-plugin-vue-custom-blocks"

const block = useCustomBlock()

console.log(block) // 将输出 { foo: 'bar' }
</script>

<template>Hello, world!!</template>

<style>
</style>

<custom-block lang="yaml">
foo:
    bar
</custom-block>
```

<br />
<br />


## License

Made with markthree

Published under [MIT License](./LICENSE).

<br />