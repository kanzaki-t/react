tool:
chrome://inspect/#devices
React Developer Tools


//1.初始poiS就为2，
      此时endDay就是””，
              isShutDown就是true
componentDidUpdate不需要任何处理
//2.初始poiS不是2，
      此时endDay就是””，
              isShutDown就是false
然后poiS变成2，需要isShutDown变成true
componentDidUpdate 需要isShutDown变成true

if(poiS === 2 && endDay === “” && isShutDown){
return
}else if(poiS === 2 && endDay === “”){
  this.setstate({
           isShutDown:true
  })
}else if(poiS === 2){
 this.setstate({
           endDay:””,
           isShutDown:true
  })
}