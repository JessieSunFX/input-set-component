<template>
	<div class="input-set">
		<div class="show-box">
			<i :class="currentIdx==idx ? 'getFocus' : '' " v-for="(item, idx) in inputList" :key="idx" @click="focusItem(idx)">{{item}}</i>
		</div>
		<input type="text" v-model="inputTxt" v-focus="focusStatus" @blur="inputBlurFocus" @keyup="inputKeyUp" @input="inputFun">
	</div>
</template>

<script>
	// 最终版
	export default ({
		props:['inputCount'],
		data() {
			return {
				changeType: -1, 
				focusStatus: false,
				inputTxt: "",
				currentIdx: -1,
				inputList: [],
				keyCodeList:[]
			}
		},
		methods: {
			inputBlurFocus () {
				this.currentIdx = -1;
				this.focusStatus = false;
			},
			focusItem (idx) {
				this.changeType = 0;
				this.currentIdx = idx;
				this.focusStatus = true;
				
				if (this.inputList[idx] && this.inputList[idx].length>0) {
					this.keyCodeList.splice(0,this.keyCodeList.length,'*')
				} else {
					this.keyCodeList.splice(0,this.keyCodeList.length)
				}
			},
			inputKeyUp (e) {

				if (e.keyCode != 8) {
					this.keyCodeList.push(e.keyCode);
				} else {
					if(this.keyCodeList.length > 0){
						this.keyCodeList.pop();
					} else {
						if (this.currentIdx > 0) {
							this.currentIdx--;
							this.$set (this.inputList, this.currentIdx, "");
						}
					}
				}
			},
			inputFun () {
				this.changeType = 1;
			}
		},
		directives: {
			focus: {
				update: function (el, {value}) {
					if (value) {
						el.focus();
					}
				}
			}
		},
		watch: {
			inputTxt (val, oldVal) {
				if (!this.focusStatus) {
					return;
				}
				let newVal;
				if (val.length>1) {
					newVal = val[val.length-1]
					this.inputTxt = newVal;
					if(this.keyCodeList.length > 0){
						this.keyCodeList.pop();
					}
					if (newVal != oldVal) {
						this.$set (this.inputList, this.currentIdx, this.inputTxt);
					}
				
					if (this.currentIdx < this.inputList.length-1) {
						this.currentIdx++;
					}
				} else if (val.length==0 && oldVal.length>0) {
					this.inputTxt = "";

					this.$set (this.inputList, this.currentIdx, this.inputTxt);
				} else if (val.length==1 && oldVal.length==0) {
					this.$set (this.inputList, this.currentIdx, val);
					if(this.keyCodeList.length > 0 && this.changeType == 1){
						this.keyCodeList.pop();
					}
					if (this.currentIdx < this.inputList.length-1 && this.changeType == 1) {
						this.currentIdx++;
					}
				}	
			},
			currentIdx (val) {
				if (val>-1) {
					this.inputTxt = this.inputList[val];
				}
				
			}
		},
		mounted () {
			for (let i=0; i < this.inputCount; i++) {
				this.$set (this.inputList, i, "");
			}
		}
	})
	
</script>

<style lang="less" scoped>
	.input-set {
		.show-box {
			margin-top: 30px;
			display: flex;
			display: -webkit-flex; /* Safari */
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			i {
				display:block;
				width: 40px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 20px;
				border: 1px solid #ddd;
				border-radius: 5px;
				font-style: normal;
			}
			.getFocus {
				border-color: #e70012;
			}
		}
		input {
			width: 1px;
			height: 1px;
			border:0;
			padding:0;
			margin-left:-999px;

		}
	}
</style>
