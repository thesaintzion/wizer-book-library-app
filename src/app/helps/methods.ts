export function mergerLga (data1, data2) {
return  data1.map(t1 => ({...t1, ...data2.find(t2 => t2.name === t1.name)}));
}