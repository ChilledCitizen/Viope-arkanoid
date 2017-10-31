#pragma strict

var mesh:Mesh;
var vertices:Vector3[];
function Start () {
    mesh= gameObject.GetComponent(MeshFilter).mesh;
    vertices=mesh.vertices;
    gameObject.AddComponent(MeshCollider); 
}
function Update(){
    for(var v = 0;v<vertices.Length;v++)
        vertices[v].y = 5*Mathf.Cos(0.5*Time.time+0.5*v);
    mesh.vertices = vertices;
    mesh.RecalculateBounds();
    mesh.RecalculateNormals();
}