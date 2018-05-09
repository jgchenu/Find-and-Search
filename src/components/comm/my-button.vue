<template>
<!-- 自定义按钮 -->
    <div class="my-button">
        <button>
            <slot></slot>
        </button>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import '../../assets/variable';
.my-button {
    margin: 10px auto;
    button {
        background: $lizhiColor;
        color: #fff;
        outline-color: #ffffff;
        border: none;
        font-size: 26px;
        padding: 20px 60px;
        border-radius: 10px;
        cursor: pointer;
    }
}
</style>


