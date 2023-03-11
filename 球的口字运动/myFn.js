//读取元素样式
function getStyle(el,attr){
    return window.getComputedStyle(el)[attr]
}
// function moveFn(el,attr,step,target,speed,cb){
//     step = parseFloat(getStyle(el,attr)) < target ? step : -step
//     clearInterval(timer)
//     timer = setInterval(function(){
//         let attrValue = parseFloat(getStyle(el,attr)) + step
//         if(attrValue > target && step > 0 || attrValue < target && step < 0){
//             attrValue = target
//             clearInterval(timer)
//         }
//         el.style[attr] = attrValue + 'px'
//         if(attrValue === target){
//             cb && cb()
//         }
//     },speed)
// }