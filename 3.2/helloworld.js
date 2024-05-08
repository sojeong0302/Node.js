function helloWorld() {
  console.log("Hello World");
  helloNode(); //2번
}

function helloNode() {
  console.log("Hello Node"); //3번
}

helloWorld(); //1번
