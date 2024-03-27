
import React,{createContext,useState,useRef,useEffect} from 'react'
import io from 'socket.io-client';
import Peer from 'simple-peer'

const socket=io('http://localhost:5002')


const SocketContext=createContext();

const ContextProvider = ({children}) => {
    const [name, setName] = useState('');
    const [stream, setStream] = useState('');
    const [callAccepted, setCallAccepted] = useState(false);
    const [endedCall, setEndedCall] = useState(false);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    
    const myVideo=useRef();
    const userVideo=useRef();
    const connectionRef=useRef();

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);

          myVideo.current.srcObject=currentStream;
        });

        socket.on('me',(id)=> {
            setMe(id);
        })
        socket.on("callUser",({from,name,signal})=> {
            setCall({isReceived:true,from,name,signal})
        })
    }, []);
    
    const callUser=(id)=> {
        
        const peer=new Peer({initiator:true,trickle:false,stream});
        
        peer.on('signal',(data)=> {
            socket.emit('callUser',{name,signaldata:data,from:me,userToCall:id})
        })
        peer.on('stream',(currentStream)=> {
            userVideo.current.srcObject=currentStream;
        })
        socket.on('callAccepted',(signal)=> {
            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current=peer;
    }

    const answerCall=()=> {
        setCallAccepted(true);

        const peer=new Peer({initiator:false,trickle:false,stream});
        
        peer.on('signal',(data)=> {
            socket.emit('answerCall',({to:call.from,signal:data}));
        })
        peer.on('stream',(currentStream)=> {
            userVideo.current.srcObject=currentStream;
        })
        peer.signal(call.signal);
        
        connectionRef.current=peer;
    }

    const leaveCall=()=> {

        setEndedCall(true);
        connectionRef.current.destroy();

        window.location.reload();
    }


  return (
    <SocketContext.Provider value={{
        me,
        name,
        setName,
        stream,
        callAccepted,
        myVideo,
        userVideo,
        endedCall,
        call,
        callUser,
        answerCall,
        leaveCall
    }}>
        {children}
    </SocketContext.Provider>
  )
}

export {SocketContext,ContextProvider} ;