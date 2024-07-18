'use client';
import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Webcam from 'react-webcam'
import * as faceapi from 'face-api.js'

function Interview({params}) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("Component mounted. Interview ID:", params.interviewId);
    GetInterviewDetails();
    loadModels();
    getAvailableDevices();
  }, [])

  useEffect(() => {
    console.log("Webcam enabled state changed:", webCamEnabled);
    if (webCamEnabled) {
      console.log("Setting up face detection interval");
      const intervalId = setInterval(() => {
        console.log("Attempting face detection");
        detectFace();
      }, 1500);

      return () => {
        console.log("Clearing face detection interval");
        clearInterval(intervalId);
      };
    }
  }, [webCamEnabled]);

  const loadModels = async () => {
    console.log("Loading face-api models");
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      console.log("Face-api models loaded successfully");
    } catch (error) {
      console.error("Error loading face-api models:", error);
    }
  }

  const getAvailableDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error("Error getting available devices:", error);
    }
  }

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
    if (webCamEnabled) {
      setWebCamEnabled(false);
      setTimeout(() => setWebCamEnabled(true), 100);
    }
  }

  const detectFace = async () => {
    console.log("Detecting face...");
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const videoEl = webcamRef.current.video;
      const canvas = canvasRef.current;
      
      const videoWidth = videoEl.videoWidth;
      const videoHeight = videoEl.videoHeight;

      if (videoWidth === 0 || videoHeight === 0) {
        console.log("Video dimensions not available yet");
        return;
      }

      const displaySize = { width: videoWidth, height: videoHeight };
      if (canvas.width !== displaySize.width || canvas.height !== displaySize.height) {
        canvas.width = displaySize.width;
        canvas.height = displaySize.height;
      }
      faceapi.matchDimensions(canvas, displaySize);

      try {
        const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Mirror the context
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
        
        // Draw face landmarks
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        
        // Restore the context
        ctx.restore();

        if (detections.length > 0) {
          console.log("Face detected:", detections);
          setFaceDetected(true);
        } else {
          console.log("No face detected");
          setFaceDetected(false);
        }
      } catch (error) {
        console.error("Error during face detection:", error);
      }
    } else {
      console.log("Webcam not ready for face detection");
    }
  }

  const GetInterviewDetails = async () => {
    console.log("Fetching interview details");
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
      console.log("Interview details fetched:", result[0]);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  }

  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-5 '>
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData?.jobPosition} </h2>
            <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData?.jobDesc} </h2>
            <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData?.jobExperience} </h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'>
              <Lightbulb/><strong>Information</strong>
            </h2>
            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <div className="relative" style={{ width: '300px', height: '300px' }}>
              <Webcam
                ref={webcamRef}
                onUserMedia={() => {
                  console.log("Webcam access granted");
                  setWebCamEnabled(true);
                }}
                onUserMediaError={(error) => {
                  console.error("Webcam access error:", error);
                  setWebCamEnabled(false);
                }}
                mirrored={true}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                videoConstraints={{ deviceId: selectedDevice }}
              />
              <canvas ref={canvasRef} className="absolute top-0 left-0" style={{ width: '100%', height: '100%' }} />
            </div>
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => {
                  console.log("Enabling webcam");
                  setWebCamEnabled(true);
                }}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
          <div className="mt-4 relative">
            <select
              className="w-full p-2 pl-3 pr-10 py-2 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
              onChange={handleDeviceChange}
              value={selectedDevice || ''}
            >
              <option value="">Select a camera</option>
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${devices.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end items-end pt-4'>
        {faceDetected ? (
          <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
            <Button 
              onClick={() => console.log("Start Interview button clicked. Face detected:", faceDetected)}
            >
              Start Interview
            </Button>
          </Link>
        ) : (
          <Button 
            disabled
            onClick={() => console.log("Start Interview button clicked. Face detected:", faceDetected)}
          >
            Start Interview
          </Button>
        )}
      </div>
      <div className='mt-4 text-sm text-gray-600'>
        {faceDetected ? 
          "Face detected. You can start the interview." : 
          "Please enable your webcam and ensure your face is visible to start the interview."}
      </div>
    </div>
  )
}

export default Interview