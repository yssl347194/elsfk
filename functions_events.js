init();

//	初始化
function init(){
	//	根据行列参数生成空白的初始化数据面板
	var row = allData[0];
	var col = allData[1];
	allData = [];
	for(var i = 0 ; i < row ; i++){
		var rowData = [];
		for(var j = 0 ; j < col ; j++){
			var colData = {};
			rowData.push(colData);
		}
		allData.push(rowData);
	}
	
	//	默认生成第1个新图形并渲染
	showNewIcon();
	
	timer = setInterval(function(){
		changeIcon(3);
	},500)
	
}

//	生成全新的图形并渲染
function showNewIcon(){
	if(icon){
		setIconBgColor(icon,2);
		showAllIcon();
		clearFullRow();
	}
	icon = createNewIcon();
	var rotateCount = Math.random();
	rotateCount = Math.ceil(rotateCount*4);
	if(icon.name != 'zfx'){
		for(var i = 1 ; i<=rotateCount;i++){
			icon = rotateIcon(icon);
		}
	}
	
	var result_CoverBounder = judgeIconCoverBounder(icon);
	if(!result_CoverBounder){
		setIconBgColor(icon,1);
		showAllIcon();
	}else{
		isGameOver = true;
		clearInterval(timer);
		alert('游戏结束！');
	}
}

//	判断并清除满行
function clearFullRow(){
	//	定义新的allData
	var newAlldata = [];
	//	找到不是满格的行，将其放到新的allData数组
	allData.forEach((row,index) => {
		var count = 0;
		row.map(col=>{
			if(col.status === 2){
				count++;
			}
		})
		if(count < row.length){
			newAlldata.push(allData[index]);
		}
	});
	
	var addNewRow = [];
	for(var i=0;i<allData.length-newAlldata.length;i++){
		var newRow = [];
		for(var j=0;j<allData[0].length;j++){
			newRow.push({});
		}
		addNewRow.push(newRow);
	}
	
	allData = addNewRow.concat(newAlldata);
}

//	-------------------操作开始-------------------

//	改变icon位置或角度
function changeIcon(direction){
	//	特殊情况：正方形无法旋转
	if(direction === 0 && icon.name === 'zfx'){
		return;
	}
	
	//	首先，根据前进方向，提前生成下一步新的icon
	var nextIcon = createNextIcon(direction);
	//	预先判断下一步的icon位置是否有超出边界
	var result_OverBounder = judgeIconOverBounder(nextIcon);
	
	//	所有操作都在不超出范围的前提下进行
	if(!result_OverBounder){
		//	再预先判断下一步的icon位置是否有覆盖情况
		var result_CoverBounder = judgeIconCoverBounder(nextIcon);
		if(!result_CoverBounder){
			//	首先清除老的icon留下的痕迹
			setIconBgColor(icon,0);
			//	然后设置下一步的icon位置
			setIconBgColor(nextIcon,1);
			//	最后显示下一个icon，并作为老的icon，同时也是刷新所有的
			showAllIcon();
			icon = nextIcon;
			
			//------------------------------------------提前判断下一步------------------------------------
			//	最最后判断刚落地的icon是否周围的下一步(左+右+下)均超出边界或无法动弹，是则直接将icon变灰色，并立马创建新的icon
			var leftIcon   = createNextIcon(1);
			var leftOver   = judgeIconOverBounder(leftIcon);
			var rightIcon  = createNextIcon(2);
			var rightOver  = judgeIconOverBounder(rightIcon);
			var topIcon    = createNextIcon(3);
			var topOver    = judgeIconOverBounder(topIcon);
			
			//	到达左下角，右边被挡住
			if(leftOver&&topOver){
				var rightCover = judgeIconCoverBounder(rightIcon);
				if(rightCover){
					showNewIcon();
				}
			}
			//	到达右下角，左边被挡住
			else if(rightOver&&topOver){
				var leftCover  = judgeIconCoverBounder(leftIcon);
				if(leftCover){
					showNewIcon();
				}
			}
			//	到达下边，左右两边被挡住
			else if(topOver){
				var leftCover  = judgeIconCoverBounder(leftIcon);
				var rightCover = judgeIconCoverBounder(rightIcon);
				if(leftCover&&rightCover){
					showNewIcon();
				}
			}
			//	到达左边，右下两边被挡住
			else if(leftOver){
				var rightCover = judgeIconCoverBounder(rightIcon);
				var topCover   = judgeIconCoverBounder(topIcon);
				if(rightCover&&topCover){
					showNewIcon();
				}
			}
			//	到达右边，左下两边被挡住
			else if(rightOver){
				var leftCover  = judgeIconCoverBounder(leftIcon);
				var topCover   = judgeIconCoverBounder(topIcon);
				if(leftCover&&topCover){
					showNewIcon();
				}
			}
			//	没有到达左右下边，但是三面都被包围
			else{
				var leftCover  = judgeIconCoverBounder(leftIcon);
				var rightCover = judgeIconCoverBounder(rightIcon);
				var topCover   = judgeIconCoverBounder(topIcon);
				if(leftCover&&rightCover&&topCover){
					showNewIcon();
				}
			}
		}else{
			//	位置被占用提示
			switch(direction){
				case 0:
					// console.log('空间不够，不能再旋转啦！');
				break;
				case 1:
					// console.log('左边位置，被占用啦！');
				break;
				case 2:
					// console.log('右边位置，被占用啦！');
				break;
				case 3:
					showNewIcon();
				break;
			}
		}
	}else{
		//	超出边界提示
		switch(direction){
			case 0:
				// console.log('再旋转，就超出边界啦！');
			break;
			case 1:
				// console.log('再往左，就撞墙啦！');
			break;
			case 2:
				// console.log('再往右，就撞墙啦！');
			break;
			case 3:
				showNewIcon();
			break;
		}
	}
}

//	随机创建新的icon
function createNewIcon(){
	iconIndex = Math.random();
	iconIndex = Math.ceil(iconIndex*iconList.length);
	//	固定生成的icon序号111111
	// iconIndex = 7;
	var randomClass = iconList[iconIndex-1];
	var newIcon = new randomClass();
	return newIcon;
}

//	根据选择方向，创建下一步的原点，并构造下一步的icon
function createNextIcon(direction){
	//	先将当前的icon复制一个新的出来
	var randomClass = iconList[iconIndex-1];
	//	之所以要创建新的对象而不是原地复制，是因为对象直接复制得到的是原对象的引用
	//	本质上对象还是同一个，所以直接new一个，避免新老两个对象属性方法相互干扰
	var nextIcon = new randomClass(icon.orign);
	nextIcon.position = icon.position;
	
	//	如果是原地旋转，则将下一步icon对象的position在上次基础上进行旋转
	if(direction === 0){
		nextIcon = rotateIcon(nextIcon);
		return nextIcon;
	}
	//	如果是原地平移，则将下一步icon对象的position在上次基础上进行平移
	else{
		nextIcon = moveIcon(nextIcon,direction);
		return nextIcon;
	}
}

//	旋转icon【本质上修改下一步icon的position】
function rotateIcon(someicon){
	//	长方形旋转规则
	if(someicon.name === 'cfx'){
		//	如果是刚生成的处在最顶部，则不支持旋转
		if(someicon.orign.top ===0){
			return someicon;
		}
		
		var top = someicon.orign.top;
		var left = someicon.orign.left;
		
		//	假如在水平状态下旋转，则原点不动，其余三个点从上到下排列
		if(someicon.position[0].top === someicon.position[1].top){
			someicon.position = [
				{top:top-1,left:left},
				{top:top+0,left:left},
				{top:top+1,left:left},
				{top:top+2,left:left}
			]
		}
		//	假如在垂直状态下旋转，则原点不动，其余三个点从左到右排列
		else{
			someicon.position = [
				{top:top,left:left-1},
				{top:top,left:left+0},
				{top:top,left:left+1},
				{top:top,left:left+2}
			]
		}
		
		return someicon;
	}
	//	其他图形旋转规则
	else{
		var len = someicon.position.length;
		var nextPosition = [];
		for(var i = 0 ; i < len ; i++){
			var top  = someicon.position[i].top;
			var left = someicon.position[i].left;
			var orignTop  = someicon.orign.top;
			var orignLeft = someicon.orign.left;
			var topDistance  = top - orignTop;
			var leftDistance = left - orignLeft;
			
			//	左上角
			if(topDistance === -1 && leftDistance === -1){
				nextPosition.push({
					top:top,
					left:left+2
				})
			}
			//	上面
			else if(topDistance === -1 && leftDistance === 0){
				nextPosition.push({
					top:top+1,
					left:left+1
				})
			}
			//	右上角
			else if(topDistance === -1 && leftDistance === 1){
				nextPosition.push({
					top:top+2,
					left:left
				})
			}
			//	左边
			else if(topDistance === 0 && leftDistance === -1){
				nextPosition.push({
					top:top-1,
					left:left+1
				})
			}
			//	右边
			else if(topDistance === 0 && leftDistance === 1){
				nextPosition.push({
					top:top+1,
					left:left-1
				})
			}
			//	左下角
			else if(topDistance === 1 && leftDistance === -1){
				nextPosition.push({
					top:top-2,
					left:left
				})
			}
			//	下面
			else if(topDistance === 1 && leftDistance === 0){
				nextPosition.push({
					top:top-1,
					left:left-1
				})
			}
			//	右下角
			else if(topDistance === 1 && leftDistance === 1){
				nextPosition.push({
					top:top,
					left:left-2
				})
			}
			//	原点本身
			else{
				nextPosition.push({
					top:top,
					left:left
				})
			}
		}
		someicon.position = nextPosition;
	}
	return someicon;
}

//	移动icon【本质上修改下一步icon的position和orign】
function moveIcon(someicon,direction){
	//	修改下一步的position
	var nextPosition = [];
	someicon.position.map(obj=>{
		var nextTop = obj.top;
		var nextLeft = obj.left;
		switch(direction){
			case 1:
				nextLeft--;
				break;
			case 2:
				nextLeft++;
				break;
			case 3:
				nextTop++; 
				break;
		}
		nextPosition.push({
			top:nextTop,
			left:nextLeft
		});
	})
	someicon.position = nextPosition;
	
	//	修改下一步的orign
	var nextTop  = icon.orign.top;
	var nextLeft = icon.orign.left;
	switch(direction){
		case 1:
			nextLeft--;
			break;
		case 2:
			nextLeft++;
			break;
		case 3:
			nextTop++; 
			break;
	}
	var nextOrign = {
		top:nextTop,
		left:nextLeft
	}
	someicon.orign = nextOrign;
	
	return someicon;
}

//	判断icon是否超出边界
function judgeIconOverBounder(someicon){
	var result = false;
	someicon.position.some((obj)=>{ // map改成some才可跳出map循环
		var top = obj.top;
		var left = obj.left;
		if(top === allData.length || left < 0 || left === allData[0].length){
			result = true;
			return result;
		}
	})
	return result;
}

//	判断icon是否与现有的覆盖
function judgeIconCoverBounder(someicon){
	var result = false;
	someicon.position.some((obj)=>{	// map改成some才可跳出map循环
		var top = obj.top;
		var left = obj.left;
		if(allData[top][left].status === 2){
			result = true;
			return result;
		}
	})
	return result;
}

//	设置icon背景颜色
function setIconBgColor(someicon,status){
	someicon.position.map(obj=>{
		allData[obj.top][obj.left].status = status;
	})
}

//	刷新整个面板的icon
function showAllIcon(){
	var table = document.getElementById("table");
	table.innerHTML = "";
	allData.map(row=>{
		var tr = document.createElement("tr");
		row.map(col => {
			var td = document.createElement("td");
			if(col.status === 1){
				td.className = 'bgRed';
			}else if(col.status === 2){
				td.className = 'bgGray'
			}else{
				td.className = '';
			}
			tr.appendChild(td);
		})
		table.appendChild(tr);
	})
}

//	-------------------绑定事件-------------------

//	点击旋转
document.getElementById("up").onclick = function(){
	if(isGameOver){
		alert('游戏结束！');
		return;
	}
	changeIcon(0);
}

//	点击向左
document.getElementById("left").onclick = function(){
	if(isGameOver){
		alert('游戏结束！');
		return;
	}
	changeIcon(1);
}

//	点击向右
document.getElementById("right").onclick = function(){
	if(isGameOver){
		alert('游戏结束！');
		return;
	}
	changeIcon(2);
}

//	点击向下
document.getElementById("down").onclick = function(){
	if(isGameOver){
		alert('游戏结束！');
		return;
	}
	changeIcon(3);
}

//	键盘事件
document.addEventListener('keydown',function(e){
	if(isGameOver){
		console.log('游戏结束！');
		return;
	}
	switch(e.code){
		case "ArrowUp":
			changeIcon(0);
		break;
		case "ArrowLeft":
			changeIcon(1);
		break;
		case "ArrowRight":
			changeIcon(2);
		break;
		case "ArrowDown":
			changeIcon(3);
		break;
		case "Space":
			if(timer){
				clearInterval(timer);
				timer = null;
			}else{
				timer = setInterval(function(){
					changeIcon(3);
				},500)
			}
		break;
	}
})