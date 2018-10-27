(function (window,Vue) {
	/*
	1.自己准备一个数组
	2.在data中添加数组
	3.section 和footer两个区域显示
	4.根据数组渲染页面
	5.每一个li中的input和lable进行联动
	6.自动获取光标
	7.增加一个TODO
		向数组中加一个数据即可
		首先content是从input中获得
		其次isFinish:false
		id:进行排序然后加1
		使用键盘事件

	8.持久化存储
	添加一个  要存 
	删除一个  要存
	isFinish  改变要存
	content  改变要存


	9.统计有多少个isFinish的值为true
	使用computed和filter


	10.全选按钮的显示与隐藏
	显示:datalist  里面至少一个isFinish是true
	隐藏:dataList里面全是false


	11.删除所有true
	遍历数组,把每个isFinish为true的删除
	剩余的是为false
	筛选出isFinish为false的新数组重新赋值个datalist



	12.全选和反选
	全选按钮的显示问题
	在每个是否完成按钮改变的时候就要遍历一个数组,看看是否是true
	 */
	var arr = [
		{
			id:1,
			content:'aaa',
			isFinish:true
		},
		{
			id:2,
			content:'aaa',
			isFinish:true
		},
		{
			id:3,
			content:'aaa',
			isFinish:false
		},
		{
			id:4,
			content:'aaa',
			isFinish:true
		}
	]

	new Vue ({
		el:'#app',
		data:{
			dataList:JSON.parse(window.localStorage.getItem('dataList')) || [],
			newTodo:''

		},
		methods: {
			addTodo(){
				if( !this.newTodo.trim()) return;
				// console.log(this.newTodo.trim());
				var obj = {
					content:this.newTodo.trim(),
					isFinish:false,
					id:this.dataList.length ? this.dataList.sort((a,b) =>a.id - b.id)[this.dataList.length-1]['id']+1:1
				}
				this.dataList.push(obj);
				this.newTodo = '';
			},
			removeTodo(i){
				this.dataList.splice(i,1);
			},
			removeAll(){
				this.dataList = this.dataList.filter(item =>!item.isFinish);
			}

		},
		directives: {
			focus:{
				inserted(el){
					el.focus();
				}
				
			}
		},
		watch:{
			dataList:{
				handler(newArr){
					// console.log(newArr);
					window.localStorage.setItem('dataList',JSON.stringify(newArr));
				},
				deep:true
			}
		},
		computed: {
			activeNum (){
				return this.dataList.filter(v =>v.isFinish === false).length
			},
			toggleAll:{
				get(){
					return this.dataList.every(v =>v.isFinish)
				},
				set(val){
					this.dataList.forEach(v =>v.isFinish = val)
				}
			}
		}
	})
})(window,Vue);

