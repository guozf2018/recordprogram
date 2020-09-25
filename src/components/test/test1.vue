<template>
    <div>
        <div id="app">
            {{ message }}
        </div>
        <div id="app-2">
            <span v-bind:title="message">
                鼠标悬停几秒钟查看此处动态绑定的提示信息！
            </span>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "Test1",
    components: {
    },
    data(){
        return{
            message: 'Hello Vue!'
        };
    },
    methods:{
    }
}
</script>

<style>

</style>