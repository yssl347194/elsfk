//	定义全局icon的清单数组
var iconList = [];

//	L形原点初始位置
class lx{
	constructor(lastOrign){
		this.name = 'lx';
		this.orign = {
			top:1,
			left:5
		}
		if(lastOrign){
			this.orign = lastOrign;
		}
		var top = this.orign.top;
		var left = this.orign.left;
		this.position = [
			{top:top-1,left:left-1},
			{top:top+0,left:left-1},
			{top:top+1,left:left-1},
			{top:top+1,left:left+0}
		]
	}
};
iconList.push(lx);

//	J形原点初始位置
class jx{
	constructor(lastOrign){
		this.name = 'jx';
		this.orign = {
			top:1,
			left:5
		}
		if(lastOrign){
			this.orign = lastOrign;
		}
		var top = this.orign.top;
		var left = this.orign.left;
		this.position = [
			{top:top-1,left:left+1},
			{top:top+0,left:left+1},
			{top:top+1,left:left+1},
			{top:top+1,left:left+0}
		]
	}
};
iconList.push(jx);

//	S形原点初始位置
class sx{
	constructor(lastOrign){
		this.name = 'sx';
		this.orign = {
			top:1,
			left:5
		}
		if(lastOrign){
			this.orign = lastOrign;
		}
		var top = this.orign.top;
		var left = this.orign.left;
		this.position = [
			{top:top-1,left:left+0},
			{top:top-1,left:left+1},
			{top:top+0,left:left-1},
			{top:top+0,left:left+0}
		]
	}
};
iconList.push(sx);

//	Z形原点初始位置
class zx{
	constructor(lastOrign){
		this.name = 'zx';
		this.orign = {
			top:1,
			left:5
		}
		if(lastOrign){
			this.orign = lastOrign;
		}
		var top = this.orign.top;
		var left = this.orign.left;
		this.position = [
			{top:top-1,left:left-1},
			{top:top-1,left:left+0},
			{top:top+0,left:left+0},
			{top:top+0,left:left+1}
		]
	}
};
iconList.push(zx);

//	三角形原点初始位置
class sjx{
	constructor(lastOrign){
		this.name = 'sjx';
		this.orign = {
			top:1,
			left:5
		}
		if(lastOrign){
			this.orign = lastOrign;
		}
		var top  = this.orign.top;
		var left = this.orign.left;
		this.position = [
			{top:top-1,left:left+0},
			{top:top+0,left:left-1},
			{top:top+0,left:left+0},
			{top:top+0,left:left+1}
		]
	}
};
iconList.push(sjx);

//	正方形原点初始位置
class zfx{
	constructor(lastOrign){
		this.name = 'zfx';
		this.orign = {
			top:0,
			left:5
		}
		if(lastOrign){
			this.orign = lastOrign;
		}
		var top = this.orign.top;
		var left = this.orign.left;
		this.position = [
			{top:top,left:left},
			{top:top,left:left+1},
			{top:top+1,left:left},
			{top:top+1,left:left+1}
		]
	}
};
iconList.push(zfx);

//	长方形【水平】原点初始位置
class cfx{
	constructor(lastOrign){
		this.name = 'cfx';
		this.orign = {
			top:0,
			left:5
		}
		if(lastOrign){
			this.orign = lastOrign;
		}
		var top = this.orign.top;
		var left = this.orign.left;
		this.position = [
			{top:top,left:left-1},
			{top:top,left:left+0},
			{top:top,left:left+1},
			{top:top,left:left+2}
		]
	}
};
iconList.push(cfx);