<template>
    <div id="jgTable" :style="{width:width}">
        <div class="jgTable-head">
            <span>{{title}}</span>
            <slot name="jgTable-head"></slot>
        </div>
        <div class="jgTable-content">
            <slot name="jgTable-content"></slot>
        </div>
        <div class="jgTable-foot">
            <slot name="jgTable-foot"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        width: {
            default:'100%'
        },
        title:{
            default:'提示'
        }
    }
}
</script>
<style lang="scss" scoped>
    #jgTable{
        position: relative;
        min-height: 200px;
        box-shadow: 0 0 5px 5px rgba(204, 200, 200, 0.616);
        border-radius: 2px;
        padding: 10px;
        box-sizing: border-box;
    }
    .jgTable-head{
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .jgTable-content{
        margin-bottom: 50px;
    }
    .jgTable-foot{
        position: absolute;
        bottom: 0;
        width: 100%;
        height:50px;
        line-height: 50px;
        text-align: center
    }
    table {
        width: 100%;
    }
    tr {
        height: 40px;
        text-align: center;
        line-height: 40px;
        &:nth-child(2n-1){
            background: rgba(231, 239, 241, 0.568);
        }
    }

</style>
