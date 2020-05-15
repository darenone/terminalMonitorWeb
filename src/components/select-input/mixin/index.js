export default {
    data () {
        return {
            timer1: false
        }
    },
    methods: {
        handleChange(list) {
            let curLength = this.selectValue.length;
            let lastLength = this.lastSelectValue.length;
            let curSelect = this.subCollection(this.selectValue, this.lastSelectValue); // 当前选的是什么
            if (curLength > lastLength) { // 增加
                // console.log('增加')
                if (curSelect === this.all_select_str) {
                    let keys = []
                    this.selectList.forEach(ele => {
                        keys.push(ele.value);
                    });
                    this.selectValue = keys;
                } else { // 判断是否已全部选中
                    if (this.selectValue.length === this.selectList.length - 1) {
                        this.selectValue.push(this.all_select_str)
                    }
                }
            } else { // 取消
                // console.log('减少')
                if (curSelect === this.all_select_str) {
                    this.selectValue = []
                } else if (this.selectValue.length === this.selectList.length - 1) {
                    this.removeArrValue(this.selectValue, this.all_select_str)
                }
            }
            this.lastSelectValue = [];
            for (let i = 0; i < this.selectValue.length; i++) {
                this.lastSelectValue.push(this.selectValue[i]);
            }
            this.selectedList = [];
            list.forEach((e, i) => {
                if (e.value !== this.all_select_str) {
                    this.selectedList.push(e)
                }
            })
            // console.log(list)
        },
        handleChange1 (item) {
            this.selectedList = []
            this.selectedList.push(item)
        },
        removeArrValue (arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                arr.splice(i, 1)
                    break
                }
            }
        },
        subCollection (src, dest) {
            var min = src
            var max = dest
            if (src.length > dest.length) {
                min = dest
                max = src
            }
            for (var i = 0; i < max.length; i++) {
                var exists = false
                for (var j = min.length - 1; j >= 0; j--) {
                    if (max[i] === min[j]) {
                        exists = true
                        break
                    }
                }
                if (!exists) {
                    return max[i]
                }
            }
        }
    }
}