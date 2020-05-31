<template>
    <div id="app">
        <div>{{name}}</div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return{
                name:'VUE架构'
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">

</style>
