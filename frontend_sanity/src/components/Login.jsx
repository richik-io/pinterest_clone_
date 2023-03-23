import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import jwt_decode from "jwt-decode";
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle=(response)=>{
    const decodedHeader = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decodedHeader));
    const { name, sub, picture } = decodedHeader;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }
    client.createIfNotExists(doc)
      .then(() =>{
        navigate('/', { replace: true })
      })

  console.log(response);
    }
  const successGoogle = (response)=>{
    console.log(jwt_decode(response.credential));
  }
  const failureGoogle = (response)=>{
    console.log('didnt work :(');
  }
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin onSuccess={responseGoogle} onError={failureGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
