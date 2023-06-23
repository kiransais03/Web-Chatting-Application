const socket = io();

let username ="";
document.getElementById('join-btn').addEventListener('click',(event)=>{
    event.preventDefault();  //prevents the default form behaiour which submits the data and refresh the page
    username = document.getElementById("username").value;
    if(username.trim()!="") {
        document.querySelector(".userdetails").style.display='none';
        document.querySelector(".chatroom-container").style.display='block';
        document.querySelector('.chatroomheading').innerHTML = `<h2>Chatroom 1</h2>
                                                                <p> Username: ${username} </p>`;
    }
})

let msgcount=0;

document.getElementById('sendbtn').addEventListener('click',(event)=>{
    event.preventDefault(); 
    let data= {
        username: username,
        message:(document.getElementById('chatmsg').value).trim(),
    }
    msgcount++;
    if(msgcount>=9){
    document.querySelector("#messages-div").style.position='relative';
    }

      if(data.message!=='') {
        socket.emit('message1',data);
      addMessage(data,true); //Sent by us --> true
      var sentmsg = new Audio('audio/sent.mp3');
            sentmsg.play(); 
    }
    document.getElementById('ipboxclr').reset();
})

socket.on('message1',(data)=>{
    if(data.username!==username)
    {
        msgcount++;
        if(msgcount>=9){
            document.querySelector("#messages-div").style.position='relative';
            }
            var receivedmsg = new Audio('audio/received.mp3');
            receivedmsg.play();            
        addMessage(data,false);
    }
})

function addMessage(data,checktrue_or_false) {
     // check -> true for sent
    // check -> false for recieved
    let div=document.createElement('div');
    div.innerText=`${data.username}: ${data.message}`;
    if(checktrue_or_false) {
        div.setAttribute("class",'message sent');
    }
    else {
        div.setAttribute("class",'message received');
    }
    let parent=document.getElementById('messages-div');
    parent.append(div);
    let inputelem =  document.getElementsByName('chatdata');
    inputelem.value=''
}