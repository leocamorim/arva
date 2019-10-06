var ws = new WebSocket("ws://8p5o7.sse.codesandbox.io");

ws.onopen = function() {
    ws.send("Hello");
  };
  ws.onmessage = function(e) {
    // Receives a message.
    console.log(JSON.parse(e.data));
    let data = {
        camera: {
            position: camera.attributes.position ? camera.attributes.position.value : null,
            rotation: camera.attributes.rotation ? camera.attributes.rotation.value : null
        },
        lhand: {
            position: lhand.attributes.position ? lhand.attributes.position.value : null,
            rotation: lhand.attributes.rotation ? lhand.attributes.rotation.value : null
        },
        rhand: {
            position: rhand.attributes.position ? rhand.attributes.position.value : null,
            rotation: rhand.attributes.rotation ? rhand.attributes.rotation.value : null
        }
    }
    console.log(data)
    ws.send(JSON.stringify({type: "position", data: data}));
  };
  ws.onclose = function() {
    alert("closed");
  };

function startApp(data){
  
  var myBoxColor = '#222'
  var currentUser = client.record.getRecord('user/'+ data.id);
  currentUser.whenReady(function() {
    currentUser.set({
    	type: 'a-box',
    	attr: {
    		position: "-2.503 0.6 -0.658",
    		rotation: "0 0 0",
    		color: myBoxColor,
    		id: data.id,
    		depth: "1",
    		height: "1",
    		width: "1"
    	}
   })
   var camera = document.getElementById('camera');
    
   //update camera position 
   var networkTick = function() {
     var latestPosition = camera.getAttribute('position');
     var latestRotation = camera.getAttribute('rotation');
     currentUser.set({
       attr: {
         position: latestPosition,
         rotation: latestRotation
       }
     });
   };
   setInterval(networkTick, 100);
  })

  //deepstream's presence feature  
  client.presence.getAll(function(ids) {
    ids.forEach(subscribeToAvatarChanges)
  });
 
  client.presence.subscribe((userId, isOnline) => {
	if( isOnline ) {
      subscribeToAvatarChanges(userId)
	} else{
		removeAvatar(userId)
	}
  });  
}

function avatarExists(id) {
  return avatars.hasOwnProperty(id);
}

function subscribeToAvatarChanges(id){
  var newUser = client.record.getRecord('user/'+id);
  newUser.whenReady(function() {
    newUser.subscribe('attr', (attr) => {
      if (avatarExists(id)) {
        updateAvatar(id, newUser);
      }
      else {
        createAvatar(id, newUser);	
      }
    })
  })
}

function createAvatar (id, rec) {	
	var attr = rec.get('attr')
	var type = rec.get('type')
	var newBox = document.createElement(type);
	for( var name in attr ) {
		newBox.setAttribute( name, attr[ name ] );
	}
  
  //compute and assign position values to other parts of the avatar
  //wrt the box
	var leye = document.createElement('a-entity')
	leye.setAttribute('mixin','eye')
	var reye = document.createElement('a-entity')
	reye.setAttribute('mixin','eye')
	

	var lpupil = document.createElement('a-entity')
	lpupil.setAttribute('mixin','pupil')
	var rpupil = document.createElement('a-entity')
	rpupil.setAttribute('mixin','pupil')

	var larm = document.createElement('a-entity')
	larm.setAttribute('mixin','arm')
	var rarm = document.createElement('a-entity')
	rarm.setAttribute('mixin','arm')

	var x= attr.position.x;
	var y= 0;
	var z= 0;

	var leyex = x+0.25
	var leyey = y+0.20
	var leyez = z-0.6

	var reyex = x-0.25
	var reyey = y+0.20
	var reyez = z-0.6


	var lpx = x+0.25
	var lpy = y+0.20
	var lpz = z-0.8

	var rpx = x-0.25
	var rpy = y+0.20
	var rpz = z-0.8

	leye.setAttribute('position', leyex + " "+ leyey + " " + leyez)
	leye.setAttribute('id','leye'+id)
	reye.setAttribute('position', reyex + " "+ reyey + " " + reyez)
	reye.setAttribute('id','reye'+id)

	lpupil.setAttribute('position', lpx + " "+ lpy + " " + lpz)
	lpupil.setAttribute('id','lpupil'+id)
	rpupil.setAttribute('position', rpx + " "+ rpy + " " + rpz)
	rpupil.setAttribute('id','rpupil'+id)

	var larmx = x-0.5
	var larmy = y-1.8
	var larmz = z

	var rarmx = x+0.5
	var rarmy = y-1.8
	var rarmz = z

	larm.setAttribute('position', larmx + " "+ larmy + " " + larmz)
	larm.setAttribute('id','larm'+id)
	larm.setAttribute('rotation','0 0 -10')
	rarm.setAttribute('position', rarmx + " "+ rarmy + " " + rarmz)
	rarm.setAttribute('id','rarm'+id)
	rarm.setAttribute('rotation','0 0 10')

    //wrap the whole avatar inside a single entity
    var avatarRoot = document.createElement('a-entity');
	avatarRoot.appendChild(newBox);
	avatarRoot.appendChild(leye);
	avatarRoot.appendChild(reye);
	avatarRoot.appendChild(lpupil);
	avatarRoot.appendChild(rpupil);
	avatarRoot.appendChild(larm);
	avatarRoot.appendChild(rarm);
  
    var scene = document.getElementById('scene');
    scene.appendChild(avatarRoot);
  
    avatars[id] = avatarRoot;
}

function updateAvatar(id, userRecord) {
  var avatar = avatars[id];
  var position = userRecord.get('attr.position');
  var rotation = userRecord.get('attr.rotation');
  
  avatar.setAttribute('position', position);
  avatar.setAttribute('rotation', rotation);
}

function removeAvatar(id){
   var scene = document.getElementById('scene');
   scene.removeChild(avatars[id]);
   client.record.getRecord('user/'+id).delete();
}