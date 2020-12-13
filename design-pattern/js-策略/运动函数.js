/*
@param t:运动的时间		b：起始位置		c:目标位置		d:总时间 
*/
const tween = {
	linear:function(t,b,c,d){
		return c * t/d + b;
	},
	easeIn:function(t,b,c,d){
		return c * (t /= d) *t + b;
	},
	strongEaseIn:function(t,b,c,d){
		return c * (t /= d) * t * t * t * t + b;
	}
}