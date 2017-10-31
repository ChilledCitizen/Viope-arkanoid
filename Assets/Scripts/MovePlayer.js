#pragma strict

 var speed = 5.0f;
 var rotateSpeed:float;

 var ballPrefab:Transform;
 var ballSpeed:float = 200; 

 var jumpDelay : boolean;
 var doubleJump : int = 0;
 var jumpHeight : int = 5;
 var sec : float = 1.0f;

var bounce : boolean = false;
var bounceAmount : float = 100;
var down : boolean = false;
var jump : AudioClip;
var trmp : AudioClip;
 var prevLoc : Vector3 = Vector3.zero;

 function Update () {

 	  
      transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical")) * Time.deltaTime * speed);
      transform.Rotate(Vector3(0, Input.GetAxis("Horizontal"), 0) * Time.deltaTime * rotateSpeed);
      if(Input.GetKeyDown(KeyCode.Space)){
            var ball :Transform= Instantiate(ballPrefab, 
                transform.Find("SpawnPoint").transform.position, Quaternion.identity);
            ball.GetComponent(Rigidbody).AddForce(transform.forward*ballSpeed); 
      }

      if( Input.GetKeyDown(KeyCode.LeftShift) && jumpDelay == false)
        {
        		AudioSource.PlayClipAtPoint(trmp,transform.position);
               Jump();                    
     	}

     	var curVel : Vector3 = (transform.position - prevLoc) / Time.deltaTime;
     if(curVel.y < 0)
     {
        down = true;
     } else {
         down = false;
     }
     prevLoc = transform.position;

     	if(bounce == true && down == true) 
    {
		//Player.GetComponent(Rigidbody).velocity.y = 0;    
		GetComponent(Rigidbody).AddForce(0,bounceAmount,0,ForceMode.Impulse);
		AudioSource.PlayClipAtPoint(trmp,transform.position);
		bounce = false;
    }

     
 }

     	
 

  function Jump()
        {
                if (doubleJump <= 1)
        {
             GetComponent(Rigidbody).velocity.y = jumpHeight;
                 jumpTimer();
     }
 }
 
     function jumpTimer()
        {
          if (Input.GetKeyDown(KeyCode.LeftShift))
        {
                  doubleJump ++;
          }
          
                  if (doubleJump > 1)
                      {
                          doubleJump = 0;
                              jumpDelay = true;
                                yield WaitForSeconds(sec);
                                  jumpDelay = false;
             }
         }

 
function OnCollisionEnter (other : Collision) {
    if(other.gameObject.tag == "Crate") {
        bounce = true;
    }
}
 
