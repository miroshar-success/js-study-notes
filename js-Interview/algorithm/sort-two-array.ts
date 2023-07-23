// --------- 排序两个升序数组 -----------
const sort_two_array = (nums1: number[], nums2: number[]): number[] => {
  const array: number[] = []
  let n1 = 0
  let n2 = 0
  const length = nums2.length + nums1.length;
  for (let i = 0; i < length; i++) {
    const item1 = nums1[n1]
    const item2 = nums2[n2]
    if (item1 && item2) {
      if (item1 > item2) {
        array.push(item2)
        n2 ++
      } else if (item1 === item2) {
        array.push(item1, item2)
        n1++
        n2++
      } else {
        array.push(item1)
        n1++
      }
    } else {
      if (item1 !== undefined) {
        array.push(item1)
        n1++
      }
      if (item2 !== undefined) {
        array.push(item2)
        n2++
      }
    }
  }
  return array
}

console.log(sort_two_array([1,3,5,7,9], [2,4,6,8,10,12,14]))