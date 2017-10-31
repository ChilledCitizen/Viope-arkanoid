#pragma strict

var mesh:Mesh;
var vertices:Vector3[];
function Start () {
    mesh= gameObject.GetComponent(MeshFilter).mesh;
    vertices=mesh.vertices;
    for(var i = 0; i<vertices.Length; i++){
        vertices[i].y = Random.Range(0,11);
    }
    mesh.vertices =vertices;
    mesh.RecalculateBounds();
    mesh.RecalculateNormals();
    gameObject.AddComponent(MeshCollider); 
}