#pragma strict

var crate : GameObject;
var timer:float;

function Start () {
    for(var i = 0; i<5;i++){
        Instantiate(crate, Vector3(i,2,0),Quaternion.identity);
    }
    timer =0;
}

function Update () {
    timer += Time.deltaTime;
    if(timer>3){
        Instantiate(crate, Vector3(0,5,0),Quaternion.identity);
        timer =0;
    }
}