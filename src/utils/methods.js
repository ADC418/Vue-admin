//以下方法多少使用

//日期选择 （新增轮播和编辑轮播）
export const pickerOptions={
    disabledDate(time){
        //添加 1000*60*60*24 ，可选今天的日期
        return time.getTime() + 1000 * 60 * 60 * 24 < Date.now();
    }
}

