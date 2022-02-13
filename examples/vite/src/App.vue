<script lang="ts" setup>
import { useCustomBlock } from "vite-plugin-vue-custom-blocks"

console.log(useCustomBlock())
</script>

<template>Hello, world!!</template>

<style>
</style>

<custom-block lang="json">
{
    "foo": "bar"
}
</custom-block>