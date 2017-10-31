 var stuckPos:Transform;
 private var velocity : Vector3;
 var speed: float;
 private var life : int = 3;
 var wallsound : AudioClip;
 var padsound : AudioClip;
 var stuck :boolean;
 var timer : float;
 var timelimit : float;
 var force : float;
  var prevLoc : Vector3 = Vector3.zero;

 function Start () {
        stuckPos =GameObject.FindWithTag("Pad").transform.Find("Stuck").transform;
        BallStuck();
 }

 function FixedUpdate () {

	timer += Time.deltaTime;
	var curVel : Vector3 = (transform.position - prevLoc) / Time.deltaTime;
	if (timer >= timelimit && curVel.z < 0)
	{
		GetComponent(Rigidbody).AddForce(0,0,-force,ForceMode.VelocityChange);
		timer = 0;
	}


	else{
        GetComponent(Rigidbody).MovePosition(GetComponent(Rigidbody).position + velocity);
        }

     prevLoc = transform.position;
 }

 function Update(){
        if(stuck){
               if( Input.GetMouseButtonDown(1)){
                      transform.parent = null;
                      GetComponent.<Rigidbody>().isKinematic = false;
                      velocity = Vector3(0,0,speed);
                      stuck = false;

                  }
        }
 }

 function OnCollisionEnter(other : Collision){
        var norm : Vector3 = other.contacts[0].normal;
        if(other.gameObject.tag == "Side"){ 
              velocity = velocity - 2 * norm * Vector3.Dot(velocity,norm.normalized);
              velocity.y = 0;
              AudioSource.PlayClipAtPoint(wallsound,transform.position,0.5f); 
        }else if(other.gameObject.tag =="Pad"){
              velocity = velocity - 2 * norm * Vector3.Dot(velocity, norm.normalized);
              velocity.y = 0;
              AudioSource.PlayClipAtPoint(padsound,transform.position,0.5f);
        }
 }

 function OnTriggerEnter(other:Collider){
        if(other.gameObject.name == "DeathZone"){
              life -=1;
              BallStuck();
        }
 } 

 function BallStuck(){ 
        transform.position = stuckPos.position;
        transform.parent = stuckPos;
        GetComponent.<Rigidbody>().isKinematic = true;
        velocity = Vector3.zero;
        stuck =true;
 }
