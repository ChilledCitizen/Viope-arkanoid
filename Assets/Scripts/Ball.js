﻿#pragma strict
var hit :AudioClip;
var bounce:AudioClip;

function Update () {
    Destroy(gameObject,2.0f);
}

function OnCollisionEnter(other:Collision){
    if(other.gameObject.tag == "Crate"){
        AudioSource.PlayClipAtPoint(hit,transform.position);
        Destroy(other.gameObject);
        Destroy(gameObject);
    } else if (other.gameObject.tag=="Ground")
    AudioSource.PlayClipAtPoint(bounce,transform.position);
}