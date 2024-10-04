export default function () {
  let contents = document.getElementById("main").children
  let extra = document.getElementsByClassName("up-float")
  let items = [...contents]
  items.push(...extra)

  for (let i = 0; i < items.length; i++) {
    setTimeout(() => {
      console.log(items[i]);
      items[i].classList.add("up-floated")
    }, i * 200)
  }
}



// export function useFloatAnimation() {
//   const contents = ref<HTMLElement[]>([]);
//   const extra = ref<HTMLElement[]>([]);
//
//   const animateItems = () => {
//     const items = [...contents.value, ...extra.value];
//     items.forEach((item, index) => {
//       setTimeout(() => {
//         console.log(item);
//         item.classList.add('up-floated');
//       }, index * 200);
//     });
//   };
//
//   onMounted(() => {
//     // Access DOM elements once the component is mounted
//     const mainElement = document.getElementById('main');
//     if (mainElement) {
//       contents.value = Array.from(mainElement.children) as HTMLElement[];
//     }
//     extra.value = Array.from(document.getElementsByClassName('up-float')) as HTMLElement[];
//
//     animateItems();
//   });
// }
