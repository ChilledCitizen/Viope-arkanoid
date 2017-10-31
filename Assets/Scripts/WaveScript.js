#pragma strict

var mesh : Mesh;
var scale : float = 1000.0;
var segments : int = 32;
var amplitude : float = 3.0;
var velocity : float = 2.0;

private var vertices : Vector3[];
private var uvs : Vector2[];
private var triangles : int[];

function Start()
{
// Get the Mesh component and clear it
mesh = gameObject.GetComponent(MeshFilter).mesh;
mesh.Clear();

// Failsafe, segments must be positive
if (segments < 1){
segments = 1;
}
// Calculate the vertices after this comment line
vertices = new Vector3[(segments+1)*(segments+1)];
triangles = new int[segments*segments*6];

var v = 0;
var t = 0;
var x : int;
var y : int;

for ( x = 0; x <= segments; x++) {
	for ( y = 0; y <= segments; y++) {
		vertices[v] = new Vector3 (x, -7, y);
		v++;
	}

}

v =0;

for ( x = 0; x < segments; x++) {
	for ( y = 0; y < segments; y++) {
		triangles[t] = v;
		triangles[t+1] = triangles[t+4] = v+1;
		triangles[t+2] = triangles[t+3] = v+(segments+1);
		triangles[t+5] = v+(segments+1)+1;
		v++;
		t+=6;

	}
	v++;

}





}

function Update()
{
// Reposition the object
transform.localScale = new Vector3(scale, 1, scale);
transform.position.x = -scale * 0.5;
transform.position.z = scale * 0.5;

 // Calculate new height for each vertex

for (var v = 0; v < vertices.Length; v++)
{
vertices[v].y = amplitude * Mathf.Cos(0.5 * Time.time * velocity + 0.5 * v);
}
// Assign the changes to the mesh
mesh.vertices = vertices;
mesh.uv = uvs;
mesh.triangles = triangles;
mesh.RecalculateBounds();
mesh.RecalculateNormals();

}