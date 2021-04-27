
function useCounter(){
  let counter = Vue.ref(1);
  function add(){
    counter.value += 1;
  }
  let double = Vue.computed(() => counter.value * 2);
  return {counter,add,double};
}
export default useCounter;