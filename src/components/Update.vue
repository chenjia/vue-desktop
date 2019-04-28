<template>
    <transition name="fade">
        <div v-if="show">
            <div class="modal"></div>
            <div class="update">
                <div class="header"><h2>应用更新</h2><i class="close" @click="close"></i></div>
                <div class="body">
                    <p>更新进度</p>
                    <p class="percentage">10%</p>
                    <div class="progress">
                        <div class="length"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "update",
        methods: {
            close() {
                this.$emit('update:show', false)
            }
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    }
</script>


<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .4;
        background: #000;
    }

    .update {
        width: 400px;
        height: 180px;
        background-color: #FFFFFF;
        border-radius: 10px;
        border: 1px solid #CCC;
        position: absolute;
        top: 40%;
        margin-top: -90px;
        left: 50%;
        margin-left: -200px;
        box-shadow: #FFFFFF 0 0 10px;
    }

    .update .header i.close {
        display: inline-block;
        position: absolute;
        top: 11px;
        right: 12px;
        width: 20px;
        height: 20px;
        background-image: url("../assets/img/close.png");
        background-size: 100%;
        cursor: pointer;
    }

    .update .header {
        border-bottom: 1px solid #ccc;
        height: 40px;
        line-height: 40px;
    }

    .update .header h2 {
        text-align: center;
        font-size: 20px;
    }

    .update .body {
        padding-top: 20px;
        text-align: center;
    }

    .update .body .percentage {
        margin-top: 20px;
    }

    .update .body .progress {
        width: 350px;
        height: 30px;
        border: 1px solid #CCCCCC;
        border-radius: 8px;
        margin: 10px auto;
    }

    .update .body .progress .length {
        background-color: #E4393c;
        border-radius: 8px;
        width: 10px;
        height: 30px;
    }
</style>