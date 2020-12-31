var dog, happyDog, dogImage;
var database, foodS, foodStock;
var Food;
var feedPet, addFood;
var foodObj;
var fedTime, lastFed;

function preload()
{
  dogImage = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');

}

function setup() {
  createCanvas(500,500);
  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(250,250,50,100);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  text("foodRemaining:"+foodS, 100, 400);
  fill(255,255,255);
  textSize(15);
  if(lastFed>=12){
    text("Last feed:"+ lastFed%12+ "PM", 350, 30);
  } else if(lastFed == 0){
    text("Last feed: 12 AM", 350, 30);
  }else{
    text("last feed:" + lastFed + "AM", 350, 30);
  }
    
  

  foodObj.display();

  drawSprites();
}

function readStock(){
  foodS = data.val();
}

function writeStock(){

  database.ref('/').update({
    Food: x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getStock()-1)
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}